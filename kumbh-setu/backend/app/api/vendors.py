"""
Kumbh Setu — Vendors API
Vendor registration, verification queue.
"""
from fastapi import APIRouter, Query, Depends, HTTPException, Body
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timezone
from ..schemas.schemas import VendorRegistration, VendorResponse, VerificationStatus
from ..core.security import require_nashikkar, CurrentUser
from ..db.supabase_client import get_connection, now_iso, rows_to_list
import uuid
import json

router = APIRouter(prefix="/vendors", tags=["Vendors"])


@router.post("/register")
async def register_vendor(vendor: VendorRegistration):
    """Self-registration for vendors."""
    conn = get_connection()
    now = now_iso()
    vendor_id = str(uuid.uuid4())

    embedding_json = json.dumps(vendor.selfie_embedding) if vendor.selfie_embedding else None

    conn.execute("""
        INSERT INTO vendors (
            id, name, business_name, category, phone, govt_id,
            address, selfie_embedding, identity_confirmed,
            verification_status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        vendor_id, vendor.name, vendor.business_name, vendor.category.value,
        vendor.phone, vendor.govt_id, vendor.address,
        embedding_json, 1 if vendor.selfie_embedding else 0,
        VerificationStatus.PENDING.value, now
    ))
    conn.commit()

    return {"id": vendor_id, "message": "Registration submitted", "status": "Pending Verification"}


@router.get("/registrations")
async def get_registrations(
    status: Optional[VerificationStatus] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    user: CurrentUser = Depends(require_nashikkar)
):
    """Get vendor registration queue — Nashikkar only."""
    conn = get_connection()
    conditions = []
    params = []

    if status:
        conditions.append("verification_status = ?")
        params.append(status.value)

    where = "WHERE " + " AND ".join(conditions) if conditions else ""
    offset = (page - 1) * page_size

    total = conn.execute(f"SELECT COUNT(*) as total FROM vendors {where}", params).fetchone()["total"]
    params.extend([page_size, offset])
    rows = rows_to_list(conn.execute(
        f"SELECT id, name, business_name, category, phone, govt_id, identity_confirmed, verification_status, created_at FROM vendors {where} ORDER BY created_at DESC LIMIT ? OFFSET ?",
        params
    ))

    return {"vendors": rows, "total": total, "page": page, "page_size": page_size}


@router.put("/{vendor_id}/verify")
async def verify_vendor(
    vendor_id: str,
    verification_status: VerificationStatus,
    user: CurrentUser = Depends(require_nashikkar)
):
    """Update vendor verification status — Nashikkar only."""
    conn = get_connection()
    row = conn.execute("SELECT * FROM vendors WHERE id = ?", (vendor_id,)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Vendor not found")

    conn.execute(
        "UPDATE vendors SET verification_status = ? WHERE id = ?",
        (verification_status.value, vendor_id)
    )
    conn.commit()
    return {"message": f"Vendor status updated to {verification_status.value}", "id": vendor_id}


class VendorNoteRequest(BaseModel):
    note: str
    author: Optional[str] = "Nashikkar Citizen"


@router.post("/{vendor_id}/note")
async def add_vendor_note(vendor_id: str, req: VendorNoteRequest = Body(...)):
    """Add a citizen advisory note to a vendor/stall and sync with listings."""
    conn = get_connection()
    now = now_iso()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS vendor_notes (
            id TEXT PRIMARY KEY,
            vendor_id TEXT NOT NULL,
            note TEXT NOT NULL,
            author TEXT DEFAULT 'Nashikkar Citizen',
            created_at TEXT NOT NULL
        )
    """)
    note_id = f"vn-{uuid.uuid4().hex[:8]}"
    conn.execute("""
        INSERT INTO vendor_notes (id, vendor_id, note, author, created_at)
        VALUES (?, ?, ?, ?, ?)
    """, (note_id, vendor_id, req.note, req.author or "Nashikkar Citizen", now))

    # Update listings table if column exists or add column
    try:
        conn.execute("ALTER TABLE listings ADD COLUMN nashikkar_notes TEXT")
    except Exception:
        pass
    try:
        conn.execute("ALTER TABLE listings ADD COLUMN nashikkar_verified INTEGER DEFAULT 0")
    except Exception:
        pass

    conn.execute("""
        UPDATE listings SET nashikkar_notes = ?, updated_at = ?
        WHERE id = ? OR name LIKE ? OR subcategory LIKE ?
    """, (req.note, now, vendor_id, f"%{vendor_id}%", f"%{vendor_id}%"))
    conn.commit()

    return {
        "status": "success",
        "id": note_id,
        "vendor_id": vendor_id,
        "note": req.note,
        "author": req.author,
        "created_at": now
    }


@router.get("/{vendor_id}/notes")
async def get_vendor_notes(vendor_id: str):
    """Retrieve citizen notes for a vendor/stall."""
    conn = get_connection()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS vendor_notes (
            id TEXT PRIMARY KEY,
            vendor_id TEXT NOT NULL,
            note TEXT NOT NULL,
            author TEXT DEFAULT 'Nashikkar Citizen',
            created_at TEXT NOT NULL
        )
    """)
    rows = rows_to_list(conn.execute("""
        SELECT * FROM vendor_notes WHERE vendor_id = ? OR vendor_id LIKE ? ORDER BY created_at DESC
    """, (vendor_id, f"%{vendor_id}%")))
    return {"notes": rows}


@router.put("/{vendor_id}/verify-nashikkar")
async def verify_vendor_as_nashikkar(vendor_id: str):
    """Verify vendor as a Nashikkar resident watchdog."""
    conn = get_connection()
    now = now_iso()
    try:
        conn.execute("ALTER TABLE vendors ADD COLUMN nashikkar_verified INTEGER DEFAULT 0")
    except Exception:
        pass
    try:
        conn.execute("ALTER TABLE vendors ADD COLUMN updated_at TEXT")
    except Exception:
        pass
    try:
        conn.execute("ALTER TABLE listings ADD COLUMN nashikkar_verified INTEGER DEFAULT 0")
    except Exception:
        pass
    try:
        conn.execute("ALTER TABLE listings ADD COLUMN verification_status TEXT DEFAULT 'Pending Verification'")
    except Exception:
        pass

    try:
        conn.execute("UPDATE vendors SET verification_status = 'Nashikkar Verified' WHERE id = ? OR name LIKE ?", (vendor_id, f"%{vendor_id}%"))
    except Exception:
        pass

    try:
        conn.execute("UPDATE listings SET verification_status = 'Nashikkar Verified', nashikkar_verified = 1 WHERE id = ? OR name LIKE ?", (vendor_id, f"%{vendor_id}%"))
    except Exception:
        pass

    conn.commit()
    return {"status": "success", "vendor_id": vendor_id, "verification_status": "Nashikkar Verified"}



# =========================================================================
# VENDOR STALL INVENTORY & ORDER MANAGEMENT (PERSISTENT BACKEND)
# =========================================================================

DEFAULT_STALL_PRODUCTS = [
    {
        "id": "prod-14-1",
        "vendor_id": "v-1049",
        "name": "Hand-Cast Brass Diya (Set of 2)",
        "category": "bazaar",
        "subcategory": "Puja Samagri",
        "price": 210.0,
        "reference_price": 240.0,
        "stock": 45,
        "is_available": 1,
        "image_url": "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=300&q=80"
    },
    {
        "id": "prod-14-2",
        "vendor_id": "v-1049",
        "name": "Pure Copper Snan Kalash (1L)",
        "category": "bazaar",
        "subcategory": "Sacred Vessels",
        "price": 320.0,
        "reference_price": 380.0,
        "stock": 28,
        "is_available": 1,
        "image_url": "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=300&q=80"
    },
    {
        "id": "prod-14-3",
        "vendor_id": "v-1049",
        "name": "Certified 5-Mukhi Rudraksha (108 Beads)",
        "category": "bazaar",
        "subcategory": "Spiritual Items",
        "price": 120.0,
        "reference_price": 150.0,
        "stock": 80,
        "is_available": 1,
        "image_url": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=300&q=80"
    },
    {
        "id": "prod-14-4",
        "vendor_id": "v-1049",
        "name": "Hammered Pure Tamra-Patra Thali",
        "category": "bazaar",
        "subcategory": "Traditional Brass & Copper",
        "price": 380.0,
        "reference_price": 490.0,
        "stock": 15,
        "is_available": 1,
        "image_url": "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=300&q=80"
    }
]

DEFAULT_STALL_ORDERS = [
    {
        "id": "ORD-8491",
        "vendor_id": "v-1049",
        "customer_name": "Amitabh Verma",
        "customer_phone": "+91 98220 14890",
        "items": "2x Hand-Cast Brass Diya, 1x Copper Kalash",
        "total_amount": 640.0,
        "pickup_slot": "Ramkund Ghat Main Steps (Sector 2)",
        "status": "ready_for_pickup"
    },
    {
        "id": "ORD-8472",
        "vendor_id": "v-1049",
        "customer_name": "Meenakshi Sundaram",
        "customer_phone": "+91 94440 28190",
        "items": "1x Certified 5-Mukhi Rudraksha Mala",
        "total_amount": 120.0,
        "pickup_slot": "Ramkund Ghat Main Steps (Sector 2)",
        "status": "completed"
    }
]


@router.get("/{vendor_id}/products")
async def get_vendor_products(vendor_id: str):
    """Retrieve all inventory products for vendor stall (persistent)."""
    conn = get_connection()
    rows = rows_to_list(conn.execute(
        "SELECT * FROM vendor_products WHERE vendor_id = ? ORDER BY created_at ASC", (vendor_id,)
    ))

    if not rows and vendor_id in ["v-1049", "default", "14"]:
        # Seed defaults
        now = now_iso()
        for p in DEFAULT_STALL_PRODUCTS:
            conn.execute("""
                INSERT OR IGNORE INTO vendor_products (
                    id, vendor_id, name, category, subcategory, price, reference_price, stock, is_available, image_url, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                p["id"], vendor_id, p["name"], p["category"], p["subcategory"],
                p["price"], p["reference_price"], p["stock"], p["is_available"],
                p["image_url"], now, now
            ))
        conn.commit()
        rows = rows_to_list(conn.execute(
            "SELECT * FROM vendor_products WHERE vendor_id = ? ORDER BY created_at ASC", (vendor_id,)
        ))

    return {"vendor_id": vendor_id, "products": rows, "count": len(rows)}


@router.post("/{vendor_id}/products")
async def add_vendor_product(vendor_id: str, data: dict = Body(...)):
    """Add a new item to sell — persistent in vendor_products and listings tables."""
    conn = get_connection()
    now = now_iso()
    pid = data.get("id") or f"prod-{uuid.uuid4().hex[:6]}"
    name = data.get("name", "New Artisan Item").strip()
    category = data.get("category", "bazaar")
    subcategory = data.get("subcategory", "Artisan Craft")
    price = float(data.get("price") or data.get("reported_price") or 200.0)
    ref_price = float(data.get("reference_price") or price)
    stock = int(data.get("stock") or data.get("stock_count") or 30)
    img = data.get("image_url") or "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=300&q=80"
    desc = data.get("description", f"Handcrafted item by vendor {vendor_id}")
    address = data.get("address", "Ramkund Main Ghat, Sector 2, Stall #14")
    phone = data.get("phone", "+91 98220 10492")

    # Insert into vendor_products
    conn.execute("""
        INSERT INTO vendor_products (
            id, vendor_id, name, category, subcategory, price, reference_price, stock, is_available, image_url, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)
    """, (pid, vendor_id, name, category, subcategory, price, ref_price, stock, img, now, now))

    # Also synchronize into listings table so Yatris see it on marketplace.html
    listing_id = f"item-{uuid.uuid4().hex[:6]}"
    conn.execute("""
        INSERT INTO listings (
            id, name, category, subcategory, description, address, phone,
            reported_price, reference_price, image_url, verification_status,
            price_flagged, price_delta_percent, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Kumbhveer Verified', 0, 0.0, ?, ?)
    """, (listing_id, name, category, subcategory, desc, address, phone, price, ref_price, img, now, now))

    conn.commit()

    return {
        "status": "created",
        "id": pid,
        "listing_id": listing_id,
        "message": "Product saved to database and live in marketplace",
        "product": {
            "id": pid,
            "vendor_id": vendor_id,
            "name": name,
            "price": price,
            "stock": stock,
            "is_available": 1,
            "updated_at": now
        }
    }


@router.patch("/{vendor_id}/products/{product_id}/price")
async def update_vendor_product_price(vendor_id: str, product_id: str, data: dict = Body(...)):
    """Update active stall price — reflects immediately and persists upon reload."""
    conn = get_connection()
    now = now_iso()
    new_price = float(data.get("price") or data.get("reported_price") or 0.0)
    if new_price <= 0:
        raise HTTPException(status_code=400, detail="Invalid price value")

    # Look up product
    row = conn.execute("SELECT * FROM vendor_products WHERE id = ? OR name = ?", (product_id, product_id)).fetchone()
    p_name = None
    if row:
        p_name = row["name"]
        conn.execute(
            "UPDATE vendor_products SET price = ?, updated_at = ? WHERE id = ?",
            (new_price, now, row["id"])
        )
    else:
        # Insert if not present
        p_name = product_id
        conn.execute("""
            INSERT INTO vendor_products (id, vendor_id, name, category, price, reference_price, created_at, updated_at)
            VALUES (?, ?, ?, 'bazaar', ?, ?, ?, ?)
        """, (f"prod-{uuid.uuid4().hex[:6]}", vendor_id, p_name, new_price, new_price, now, now))

    # Synchronize to listings table
    if p_name:
        conn.execute(
            "UPDATE listings SET reported_price = ?, updated_at = ? WHERE name LIKE ? OR id = ?",
            (new_price, now, f"%{p_name}%", product_id)
        )

    conn.commit()
    return {"status": "updated", "id": product_id, "price": new_price, "updated_at": now}


@router.patch("/{vendor_id}/products/{product_id}/stock")
async def update_vendor_product_stock(vendor_id: str, product_id: str, data: dict = Body(...)):
    """Toggle in-stock / out-of-stock availability."""
    conn = get_connection()
    now = now_iso()
    is_available = 1 if data.get("is_available") or data.get("available") else 0
    stock_delta = data.get("stock")

    row = conn.execute("SELECT * FROM vendor_products WHERE id = ? OR name = ?", (product_id, product_id)).fetchone()
    if row:
        if stock_delta is not None:
            conn.execute(
                "UPDATE vendor_products SET is_available = ?, stock = ?, updated_at = ? WHERE id = ?",
                (is_available, int(stock_delta), now, row["id"])
            )
        else:
            conn.execute(
                "UPDATE vendor_products SET is_available = ?, updated_at = ? WHERE id = ?",
                (is_available, now, row["id"])
            )
    else:
        conn.execute("""
            INSERT INTO vendor_products (id, vendor_id, name, category, price, is_available, created_at, updated_at)
            VALUES (?, ?, ?, 'bazaar', 200.0, ?, ?, ?)
        """, (f"prod-{uuid.uuid4().hex[:6]}", vendor_id, product_id, is_available, now, now))

    conn.commit()
    return {"status": "updated", "id": product_id, "is_available": is_available, "updated_at": now}


@router.get("/{vendor_id}/orders")
async def get_vendor_orders(vendor_id: str):
    """Retrieve all customer orders for stall (persistent)."""
    conn = get_connection()
    rows = rows_to_list(conn.execute(
        "SELECT * FROM vendor_orders WHERE vendor_id = ? ORDER BY created_at DESC", (vendor_id,)
    ))

    if not rows and vendor_id in ["v-1049", "default", "14"]:
        now = now_iso()
        for o in DEFAULT_STALL_ORDERS:
            conn.execute("""
                INSERT OR IGNORE INTO vendor_orders (
                    id, vendor_id, customer_name, customer_phone, items, total_amount, pickup_slot, status, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                o["id"], vendor_id, o["customer_name"], o["customer_phone"],
                o["items"], o["total_amount"], o["pickup_slot"], o["status"],
                now, now
            ))
        conn.commit()
        rows = rows_to_list(conn.execute(
            "SELECT * FROM vendor_orders WHERE vendor_id = ? ORDER BY created_at DESC", (vendor_id,)
        ))

    return {"vendor_id": vendor_id, "orders": rows, "count": len(rows)}


@router.patch("/{vendor_id}/orders/{order_id}/status")
async def update_vendor_order_status(vendor_id: str, order_id: str, data: dict = Body(...)):
    """Update order status (e.g. ready_for_pickup -> completed)."""
    conn = get_connection()
    now = now_iso()
    new_status = data.get("status", "completed").strip().lower()

    conn.execute(
        "UPDATE vendor_orders SET status = ?, updated_at = ? WHERE id = ?",
        (new_status, now, order_id)
    )
    conn.commit()
    return {"status": "updated", "order_id": order_id, "order_status": new_status, "updated_at": now}


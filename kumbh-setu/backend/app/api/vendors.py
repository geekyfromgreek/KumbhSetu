"""
Kumbh Setu — Vendors API
Vendor registration, verification queue.
"""
from fastapi import APIRouter, Query, Depends, HTTPException
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

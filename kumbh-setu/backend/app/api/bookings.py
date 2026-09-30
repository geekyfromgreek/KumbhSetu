"""
Kumbh Setu — Bookings API
Lightweight booking requests — no payment processing.
"""
from fastapi import APIRouter, Query, Depends, HTTPException
from typing import Optional
from datetime import datetime, timezone
from ..schemas.schemas import BookingCreate, BookingResponse, BookingStatusUpdate, BookingStatus
from ..core.security import verify_jwt, require_nashikkar, CurrentUser
from ..db.supabase_client import get_connection, now_iso, rows_to_list
import uuid

router = APIRouter(prefix="/bookings", tags=["Bookings"])


def _time_ago(iso_str: str) -> str:
    """Convert ISO timestamp to human-readable time-ago string."""
    try:
        dt = datetime.fromisoformat(iso_str.replace("Z", "+00:00"))
        now = datetime.now(timezone.utc)
        diff = now - dt
        minutes = int(diff.total_seconds() / 60)
        if minutes < 1:
            return "just now"
        elif minutes < 60:
            return f"{minutes} min ago"
        elif minutes < 1440:
            return f"{minutes // 60} hr ago"
        else:
            return f"{minutes // 1440} day(s) ago"
    except Exception:
        return ""


@router.post("/", response_model=BookingResponse)
async def create_booking(booking: BookingCreate):
    """
    Create a booking request — no authentication required (Yatri).
    Booking is routed to Nashikkar's queue for accept/decline.
    """
    conn = get_connection()
    now = now_iso()
    booking_id = str(uuid.uuid4())

    # Verify listing exists
    listing = conn.execute("SELECT name FROM listings WHERE id = ?", (booking.listing_id,)).fetchone()
    listing_name = booking.listing_name or (listing["name"] if listing else "Unknown")

    conn.execute("""
        INSERT INTO bookings (
            id, listing_id, listing_name, category, guest_name, guest_phone,
            guest_count, check_in, check_out, special_requests,
            status, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        booking_id, booking.listing_id, listing_name, booking.category.value,
        booking.guest_name, booking.guest_phone, booking.guest_count,
        booking.check_in, booking.check_out, booking.special_requests,
        BookingStatus.PENDING.value, now, now
    ))
    conn.commit()

    return BookingResponse(
        id=booking_id,
        listing_id=booking.listing_id,
        listing_name=listing_name,
        category=booking.category,
        guest_name=booking.guest_name,
        guest_phone=booking.guest_phone,
        guest_count=booking.guest_count or 1,
        check_in=booking.check_in,
        check_out=booking.check_out,
        special_requests=booking.special_requests,
        status=BookingStatus.PENDING,
        created_at=datetime.fromisoformat(now),
        updated_at=datetime.fromisoformat(now),
        time_ago="just now"
    )


@router.get("/")
async def get_bookings(
    status: Optional[str] = None,
    category: Optional[str] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    user: Optional[CurrentUser] = Depends(verify_jwt)
):
    """Get all bookings — accessible for Nashikkar & Local Guide dashboards."""
    conn = get_connection()
    conditions = []
    params = []

    if status:
        conditions.append("status LIKE ?")
        params.append(f"%{status}%")

    if category:
        conditions.append("category = ?")
        params.append(category)

    where = "WHERE " + " AND ".join(conditions) if conditions else ""
    offset = (page - 1) * page_size

    total = conn.execute(f"SELECT COUNT(*) as total FROM bookings {where}", params).fetchone()["total"]
    params.extend([page_size, offset])
    rows = rows_to_list(conn.execute(
        f"SELECT * FROM bookings {where} ORDER BY created_at DESC LIMIT ? OFFSET ?", params
    ))

    for row in rows:
        row["time_ago"] = _time_ago(row.get("created_at", ""))

    return {"bookings": rows, "total": total, "page": page, "page_size": page_size}


@router.put("/{booking_id}")
async def update_booking_status(
    booking_id: str,
    update: BookingStatusUpdate,
    user: Optional[CurrentUser] = Depends(verify_jwt)
):
    """Accept or decline a booking."""
    conn = get_connection()
    row = conn.execute("SELECT * FROM bookings WHERE id = ?", (booking_id,)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Booking not found")

    now = now_iso()
    conn.execute(
        "UPDATE bookings SET status = ?, notes = ?, updated_at = ? WHERE id = ?",
        (update.status.value, update.notes, now, booking_id)
    )
    conn.commit()
    return {"message": f"Booking {update.status.value}", "id": booking_id, "status": update.status.value}


@router.patch("/{booking_id}/status")
async def patch_booking_status(
    booking_id: str,
    data: dict,
    user: Optional[CurrentUser] = Depends(verify_jwt)
):
    """Accept, confirm, or decline a tour booking (Local Guide & Nashikkar action)."""
    conn = get_connection()
    row = conn.execute("SELECT * FROM bookings WHERE id = ? OR listing_id = ?", (booking_id, booking_id)).fetchone()
    if not row:
        # Check if booking exists in localStorage format or insert as tracked
        now = now_iso()
        st = data.get("status", "Confirmed")
        conn.execute("""
            INSERT OR REPLACE INTO bookings (id, listing_id, listing_name, category, guest_name, guest_phone, status, created_at, updated_at)
            VALUES (?, ?, ?, 'guide', ?, ?, ?, ?, ?)
        """, (booking_id, booking_id, data.get("tour_title", "Local Guide Tour"), data.get("guest_name", "Pilgrim"), data.get("guest_phone", "+919829012344"), st, now, now))
        conn.commit()
        return {"status": "created_and_updated", "id": booking_id, "booking_status": st}

    now = now_iso()
    new_status = data.get("status") or "Confirmed"
    notes = data.get("notes")
    bid = row["id"]
    conn.execute(
        "UPDATE bookings SET status = ?, notes = coalesce(?, notes), updated_at = ? WHERE id = ?",
        (new_status, notes, now, bid)
    )
    conn.commit()
    return {"status": "updated", "id": bid, "booking_status": new_status, "updated_at": now}



@router.get("/stats")
async def get_booking_stats(user: CurrentUser = Depends(require_nashikkar)):
    """Get booking statistics for dashboard."""
    conn = get_connection()
    stats = {}
    for status_val in ["Pending", "Accepted", "Declined"]:
        count = conn.execute(
            "SELECT COUNT(*) as c FROM bookings WHERE status = ?", (status_val,)
        ).fetchone()["c"]
        stats[status_val.lower()] = count

    stats["total"] = conn.execute("SELECT COUNT(*) as c FROM bookings").fetchone()["c"]

    # Today's bookings
    today = datetime.now(timezone.utc).date().isoformat()
    stats["today"] = conn.execute(
        "SELECT COUNT(*) as c FROM bookings WHERE created_at LIKE ?", (f"{today}%",)
    ).fetchone()["c"]

    return stats

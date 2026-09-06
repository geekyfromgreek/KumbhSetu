"""
Kumbh Setu — Police API
Escalations feed, case management, case log.
"""
from fastapi import APIRouter, Query, Depends, HTTPException
from typing import Optional
from datetime import datetime, timezone
from ..schemas.schemas import EscalationResponse, EscalationUpdate, CaseStatus
from ..core.security import require_police, CurrentUser
from ..db.supabase_client import get_connection, now_iso, rows_to_list
import uuid

router = APIRouter(prefix="/police", tags=["Police"])


def _time_since(iso_str: str) -> str:
    """Time since escalation in human-readable format."""
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


@router.get("/escalations")
async def get_escalations(
    status: Optional[CaseStatus] = None,
    priority: Optional[str] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    user: CurrentUser = Depends(require_police)
):
    """Get escalations feed — Police only."""
    conn = get_connection()
    conditions = []
    params = []

    if status:
        conditions.append("status = ?")
        params.append(status.value)

    if priority:
        conditions.append("priority = ?")
        params.append(priority)

    where = "WHERE " + " AND ".join(conditions) if conditions else ""
    offset = (page - 1) * page_size

    total = conn.execute(f"SELECT COUNT(*) as total FROM escalations {where}", params).fetchone()["total"]
    params.extend([page_size, offset])
    rows = rows_to_list(conn.execute(
        f"SELECT * FROM escalations {where} ORDER BY escalated_at DESC LIMIT ? OFFSET ?", params
    ))

    for row in rows:
        row["time_since_escalation"] = _time_since(row.get("escalated_at", ""))

    return {"escalations": rows, "total": total, "page": page, "page_size": page_size}


@router.get("/escalations/{escalation_id}")
async def get_escalation(escalation_id: str, user: CurrentUser = Depends(require_police)):
    """Get escalation detail — Police only."""
    conn = get_connection()
    row = conn.execute("SELECT * FROM escalations WHERE id = ?", (escalation_id,)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Escalation not found")

    result = dict(row)
    result["time_since_escalation"] = _time_since(result.get("escalated_at", ""))

    # Get original report details
    report = conn.execute("SELECT * FROM reports WHERE id = ?", (result["report_id"],)).fetchone()
    if report:
        result["original_report"] = dict(report)

    return result


@router.put("/escalations/{escalation_id}")
async def update_escalation(
    escalation_id: str,
    update: EscalationUpdate,
    user: CurrentUser = Depends(require_police)
):
    """
    Update escalation — Police only.
    Actions: Acknowledge, Assign, Forward to Fact-Check, Resolve.
    """
    conn = get_connection()
    row = conn.execute("SELECT * FROM escalations WHERE id = ?", (escalation_id,)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Escalation not found")

    now = now_iso()
    updates = {"updated_at": now}

    if update.status:
        updates["status"] = update.status.value
    if update.assigned_to:
        updates["assigned_to"] = update.assigned_to
    if update.notes:
        existing_notes = row["notes"] or ""
        updates["notes"] = f"{existing_notes}\n[{now}] {update.notes}".strip()

    set_clause = ", ".join(f"{k} = ?" for k in updates.keys())
    values = list(updates.values()) + [escalation_id]
    conn.execute(f"UPDATE escalations SET {set_clause} WHERE id = ?", values)

    # If forwarded to fact-check, update the original report too
    if update.status == CaseStatus.FORWARDED:
        conn.execute(
            "UPDATE reports SET status = ?, updated_at = ? WHERE id = ?",
            ("Forwarded to Fact-Check", now, row["report_id"])
        )

    conn.commit()
    return {"message": f"Escalation updated", "id": escalation_id}


@router.get("/case-log")
async def get_case_log(
    search: Optional[str] = None,
    status: Optional[CaseStatus] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    user: CurrentUser = Depends(require_police)
):
    """Searchable/filterable case log — Police only."""
    conn = get_connection()
    conditions = []
    params = []

    if search:
        conditions.append("(category LIKE ? OR listing_name LIKE ? OR description LIKE ? OR notes LIKE ?)")
        term = f"%{search}%"
        params.extend([term, term, term, term])

    if status:
        conditions.append("status = ?")
        params.append(status.value)

    where = "WHERE " + " AND ".join(conditions) if conditions else ""
    offset = (page - 1) * page_size

    total = conn.execute(f"SELECT COUNT(*) as total FROM escalations {where}", params).fetchone()["total"]
    params.extend([page_size, offset])
    rows = rows_to_list(conn.execute(
        f"SELECT * FROM escalations {where} ORDER BY escalated_at DESC LIMIT ? OFFSET ?", params
    ))

    for row in rows:
        row["time_since_escalation"] = _time_since(row.get("escalated_at", ""))

    return {"cases": rows, "total": total, "page": page, "page_size": page_size}


@router.get("/stats")
async def get_police_stats(user: CurrentUser = Depends(require_police)):
    """Get police dashboard statistics."""
    conn = get_connection()
    stats = {}
    for status_val in ["New", "Under Review", "Forwarded to Fact-Check", "Resolved"]:
        count = conn.execute(
            "SELECT COUNT(*) as c FROM escalations WHERE status = ?", (status_val,)
        ).fetchone()["c"]
        stats[status_val.lower().replace(" ", "_").replace("-", "")] = count

    stats["total"] = conn.execute("SELECT COUNT(*) as c FROM escalations").fetchone()["c"]
    return stats

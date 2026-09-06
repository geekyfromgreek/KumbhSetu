"""
Kumbh Setu — Reports API
Issue reporting (no auth for Yatri), review pipeline for Nashikkar.
"""
from fastapi import APIRouter, Query, Depends, HTTPException
from typing import Optional
from datetime import datetime, timezone
from ..schemas.schemas import (
    ReportCreate, ReportResponse, ReportStatusUpdate, ReportStatus,
    EscalationPriority
)
from ..core.security import verify_jwt, require_nashikkar, CurrentUser
from ..db.supabase_client import get_connection, now_iso, rows_to_list
import uuid

router = APIRouter(prefix="/reports", tags=["Reports"])


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
            hours = minutes // 60
            return f"{hours} hr ago"
        else:
            days = minutes // 1440
            return f"{days} day{'s' if days > 1 else ''} ago"
    except Exception:
        return ""


@router.post("/", response_model=ReportResponse)
async def submit_report(report: ReportCreate):
    """
    Submit an issue report — no authentication required (Yatri).
    Reports are reviewed as quickly as possible.
    """
    conn = get_connection()
    now = now_iso()
    report_id = str(uuid.uuid4())

    conn.execute("""
        INSERT INTO reports (
            id, category, listing_id, listing_name, issue_type,
            description, photo_url, reporter_phone, status,
            created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        report_id, report.category, report.listing_id, report.listing_name,
        report.issue_type, report.description, report.photo_url,
        report.reporter_phone, ReportStatus.NEW.value,
        now, now
    ))
    conn.commit()

    return ReportResponse(
        id=report_id,
        category=report.category,
        listing_id=report.listing_id,
        listing_name=report.listing_name,
        issue_type=report.issue_type,
        description=report.description,
        photo_url=report.photo_url,
        status=ReportStatus.NEW,
        created_at=datetime.fromisoformat(now),
        updated_at=datetime.fromisoformat(now),
        time_ago="just now"
    )


@router.get("/")
async def get_reports(
    status: Optional[ReportStatus] = None,
    category: Optional[str] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    user: CurrentUser = Depends(require_nashikkar)
):
    """Get all reports — Nashikkar only."""
    conn = get_connection()
    conditions = []
    params = []

    if status:
        conditions.append("status = ?")
        params.append(status.value)

    if category:
        conditions.append("category = ?")
        params.append(category)

    where = "WHERE " + " AND ".join(conditions) if conditions else ""
    offset = (page - 1) * page_size

    total = conn.execute(f"SELECT COUNT(*) as total FROM reports {where}", params).fetchone()["total"]

    query = f"SELECT * FROM reports {where} ORDER BY created_at DESC LIMIT ? OFFSET ?"
    params.extend([page_size, offset])
    rows = rows_to_list(conn.execute(query, params))

    reports = []
    for row in rows:
        row["time_ago"] = _time_ago(row.get("created_at", ""))
        reports.append(row)

    return {"reports": reports, "total": total, "page": page, "page_size": page_size}


@router.put("/{report_id}/status")
async def update_report_status(
    report_id: str,
    update: ReportStatusUpdate,
    user: CurrentUser = Depends(require_nashikkar)
):
    """
    Update report status — Nashikkar only.
    Escalating to Police creates an escalation record.
    """
    conn = get_connection()
    row = conn.execute("SELECT * FROM reports WHERE id = ?", (report_id,)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Report not found")

    now = now_iso()

    conn.execute(
        "UPDATE reports SET status = ?, notes = ?, updated_at = ? WHERE id = ?",
        (update.status.value, update.notes, now, report_id)
    )

    # If escalating to police, create an escalation record
    if update.status == ReportStatus.ESCALATED:
        esc_id = str(uuid.uuid4())
        conn.execute("""
            INSERT INTO escalations (
                id, report_id, category, listing_name, issue_type,
                description, priority, status, escalated_by,
                escalated_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            esc_id, report_id, row["category"], row["listing_name"],
            row["issue_type"], row["description"],
            EscalationPriority.MEDIUM.value, "New",
            user.user_id, now, now
        ))

    conn.commit()
    return {"message": f"Report status updated to {update.status.value}", "id": report_id}


@router.get("/stats")
async def get_report_stats(user: CurrentUser = Depends(require_nashikkar)):
    """Get report statistics for dashboard."""
    conn = get_connection()
    stats = {}
    for status_val in ["New", "Under Review", "Resolved", "Escalated to Police"]:
        count = conn.execute(
            "SELECT COUNT(*) as c FROM reports WHERE status = ?", (status_val,)
        ).fetchone()["c"]
        stats[status_val.lower().replace(" ", "_")] = count

    stats["total"] = conn.execute("SELECT COUNT(*) as c FROM reports").fetchone()["c"]
    return stats

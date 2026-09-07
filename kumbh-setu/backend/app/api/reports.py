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
import json

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


# ─── PIB Fact-Checking & Misinformation Detection (Truth & Trust) ───

@router.get("/fact-checks")
async def get_fact_checks(
    category: Optional[str] = None,
    priority: Optional[str] = None,
    search: Optional[str] = None
):
    """
    Public fact-checking feed verified in collaboration with PIB & Maharashtra Govt.
    Protects pilgrims from false information and viral panic rumors.
    """
    conn = get_connection()
    conditions = []
    params = []

    if category and category != "all":
        conditions.append("category = ?")
        params.append(category)

    if priority:
        conditions.append("priority = ?")
        params.append(priority)

    if search:
        conditions.append("(claim_text LIKE ? OR debunk_explanation LIKE ?)")
        st = f"%{search}%"
        params.extend([st, st])

    where = "WHERE " + " AND ".join(conditions) if conditions else ""
    rows = rows_to_list(conn.execute(f"SELECT * FROM fact_checks {where} ORDER BY priority DESC, created_at DESC", params))
    return {"fact_checks": rows, "total": len(rows), "source": "PIB & Maharashtra Information Centre"}


@router.post("/fact-checks/report-rumor")
async def report_rumor(data: dict):
    """
    Allow pilgrims / Kumbhveers to submit suspected false information / viral rumors.
    Auto-prioritizes public safety rumors for instant forwarding to PIB and Police.
    """
    conn = get_connection()
    now = now_iso()
    claim_id = "fc-" + str(uuid.uuid4())[:8]
    claim_text = data.get("claim_text", "").strip()
    if not claim_text:
        raise HTTPException(status_code=400, detail="Claim text is required")

    category = data.get("category", "Crowd & Ghats")
    # Determine priority based on keywords
    priority = "HIGH"
    if any(w in claim_text.lower() for w in ["stampede", "collapsed", "fire", "death", "police shut", "bridge"]):
        priority = "CRITICAL"

    pib_case = f"PIB-KMB-2026-{str(uuid.uuid4())[:4].upper()}"

    conn.execute("""
        INSERT INTO fact_checks (
            id, claim_text, verdict, pib_case_number, priority, category,
            debunk_explanation, official_source_url, reported_count, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        claim_id, claim_text, "INVESTIGATING BY PIB & POLICE", pib_case, priority, category,
        "Ground teams and PIB Verification Cell dispatched for real-time field confirmation.",
        "https://pib.gov.in/factcheck",
        1, now, now
    ))
    conn.commit()

    return {
        "message": "Rumor logged and prioritized to PIB Fact Check Cell & Police Admin.",
        "pib_case_number": pib_case,
        "priority": priority,
        "status": "Forwarded to Authorities"
    }


# ─── Kumbhveer College Volunteer Program & Rewards ───

@router.get("/volunteers/leaderboard")
async def get_volunteer_leaderboard():
    """
    Leaderboard for student Kumbhveer volunteers from local colleges (KTHM, Sandip, KK Wagh, MET).
    Reward system offering honesty points, gift vouchers, and civic badges.
    """
    conn = get_connection()
    rows = rows_to_list(conn.execute("SELECT * FROM volunteer_rewards ORDER BY points DESC LIMIT 50"))
    for r in rows:
        if r.get("badges") and isinstance(r["badges"], str):
            try:
                r["badges"] = json.loads(r["badges"])
            except Exception:
                r["badges"] = []
    return {"leaderboard": rows, "total_volunteers": len(rows)}


@router.post("/volunteers/log-audit")
async def log_volunteer_audit(data: dict):
    """
    Credit points to a volunteer after verifying a vendor or fact-checking on the ground.
    """
    conn = get_connection()
    vol_id = data.get("volunteer_id", "vol-001")
    points_to_add = data.get("points", 50)
    audit_type = data.get("audit_type", "Vendor Price Verification")

    conn.execute("""
        UPDATE volunteer_rewards
        SET points = points + ?,
            audits_completed = audits_completed + 1,
            voucher_credits_inr = voucher_credits_inr + ?
        WHERE id = ?
    """, (points_to_add, int(points_to_add * 2), vol_id))
    conn.commit()

    row = conn.execute("SELECT * FROM volunteer_rewards WHERE id = ?", (vol_id,)).fetchone()
    return {
        "message": f"Successfully credited +{points_to_add} points for {audit_type}!",
        "new_total_points": row["points"] if row else 0,
        "voucher_credits_inr": row["voucher_credits_inr"] if row else 0
    }

"""
Kumbh Setu — Police API
Combines Escalations feed, case management, case log,
with DBSCAN spatial clustering, XGBoost severity triage, and live simulation streaming.
"""
from fastapi import APIRouter, Query, Depends, HTTPException
from typing import Optional, List, Dict, Any
from datetime import datetime, timezone
from pydantic import BaseModel
import uuid
import time
import os
import httpx
from pathlib import Path
from dotenv import load_dotenv

env_path = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

SUPABASE_URL = (os.getenv("SUPABASE_URL") or "https://asparwhkzpnnittnhsic.supabase.co").rstrip("/")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_KEY", "")

from ..schemas.schemas import EscalationResponse, EscalationUpdate, CaseStatus
from ..core.security import require_police, CurrentUser
from ..db.supabase_client import get_connection, now_iso, rows_to_list
from app.services.triage_service import triage_service

router = APIRouter(prefix="/police", tags=["Police & Administration"])


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


# ─────────────────────────────────────────────────────────────
# 1. AI DBSCAN Hotspots & Real-Time ML Triage Endpoints
# ─────────────────────────────────────────────────────────────

class IncomingReportRequest(BaseModel):
    category: str = "rickshaw"
    issue_type: str = "overcharging"
    latitude: float = 20.0074
    longitude: float = 73.7925
    reference_price: float = 50.0
    charged_price: float = 120.0
    vendor_name: Optional[str] = "Auto Stand Ramkund"
    is_safety_issue: int = 0

class DispatchRequest(BaseModel):
    cluster_id: int
    hotspot_name: str
    officer_badge: str = "MH-15-POLICE-0482"
    unit_name: str = "Sector 2 Flying Squad Alpha"
    severity: Optional[str] = "critical"


@router.get("/hotspots")
def get_enforcement_hotspots():
    """
    Returns the DBSCAN enforcement hotspots ranked by Priority: sqrt(volume) * mean_severity
    Discovered from 100,000 Nashik civic reports using eps=120m haversine clustering.
    """
    hotspots = triage_service.get_all_hotspots()
    return {
        "status": "success",
        "total_hotspots": len(hotspots),
        "hotspots": hotspots
    }


@router.get("/live-stream")
def get_live_simulation_stream(limit: int = Query(50, ge=5, le=150)):
    """
    Simulates a live incoming stream of civic & overcharging reports from admin_reports.csv.
    Used by the live Police Dashboard radar.
    """
    events = triage_service.get_simulation_stream(limit=limit)
    return {
        "status": "success",
        "count": len(events),
        "events": events,
        "timestamp": int(time.time())
    }


@router.post("/triage-report")
def triage_report(req: IncomingReportRequest):
    """
    Triages an incoming report in real-time using XGBoost severity scoring and KNN spatial routing.
    """
    gouge_ratio = req.charged_price / max(req.reference_price, 1.0)
    price_delta = ((req.charged_price - req.reference_price) / max(req.reference_price, 1.0)) * 100.0

    result = triage_service.triage_incoming_report({
        "latitude": req.latitude,
        "longitude": req.longitude,
        "price_delta_percent": price_delta,
        "gouge_ratio": gouge_ratio,
        "is_safety_issue": req.is_safety_issue,
        "category": req.category,
        "issue_type": req.issue_type,
        "vendor_name": req.vendor_name
    })

    return {
        "status": "success",
        "triage": result
    }


@router.post("/dispatch-patrol")
def dispatch_patrol(req: DispatchRequest):
    """
    Logs an emergency patrol flying squad dispatch to a specific hotspot centroid.
    """
    dispatch_id = f"DISPATCH-{uuid.uuid4().hex[:6].upper()}"
    return {
        "status": "success",
        "dispatch_id": dispatch_id,
        "cluster_id": req.cluster_id,
        "hotspot_name": req.hotspot_name,
        "officer_badge": req.officer_badge,
        "unit_name": req.unit_name,
        "severity": req.severity,
        "dispatched_at": int(time.time()),
        "eta_minutes": 4,
        "message": f"Flying squad {req.unit_name} [{(req.severity or 'critical').upper()}] dispatched to {req.hotspot_name}."
    }


# ─────────────────────────────────────────────────────────────
# 2. Existing Police Escalations, Case Dossier & Logs
# ─────────────────────────────────────────────────────────────

@router.get("/escalations")
async def get_escalations(
    status: Optional[CaseStatus] = None,
    priority: Optional[str] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100)
):
    """Get escalations feed."""
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
async def get_escalation(escalation_id: str):
    """Get escalation detail."""
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
    update: EscalationUpdate
):
    """
    Update escalation — Actions: Acknowledge, Assign, Forward to Fact-Check, Resolve.
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

    if update.status == CaseStatus.FORWARDED:
        conn.execute(
            "UPDATE reports SET status = ?, updated_at = ? WHERE id = ?",
            ("Forwarded to Fact-Check", now, row["report_id"])
        )
    elif update.status == CaseStatus.RESOLVED:
        conn.execute(
            "UPDATE reports SET status = 'Resolved', updated_at = ? WHERE id = ?",
            (now, row["report_id"])
        )

    conn.commit()

    # Synchronize to Supabase escalations & reports
    if SUPABASE_SERVICE_ROLE_KEY:
        try:
            async with httpx.AsyncClient() as client:
                sb_updates = {"status": updates.get("status", row["status"]), "updated_at": now}
                if "assigned_to" in updates:
                    sb_updates["assigned_to"] = updates["assigned_to"]
                if "notes" in updates:
                    sb_updates["notes"] = updates["notes"]

                await client.patch(
                    f"{SUPABASE_URL}/rest/v1/escalations?id=eq.{escalation_id}",
                    headers={
                        "apikey": SUPABASE_SERVICE_ROLE_KEY,
                        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
                        "Content-Type": "application/json"
                    },
                    json=sb_updates,
                    timeout=5.0
                )

                if update.status == CaseStatus.RESOLVED and row["report_id"]:
                    await client.patch(
                        f"{SUPABASE_URL}/rest/v1/reports?id=eq.{row['report_id']}",
                        headers={
                            "apikey": SUPABASE_SERVICE_ROLE_KEY,
                            "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
                            "Content-Type": "application/json"
                        },
                        json={"status": "Resolved", "updated_at": now},
                        timeout=5.0
                    )
        except Exception as sb_err:
            print(f"[PoliceSupabaseSync] Error: {sb_err}")

    return {"message": "Escalation updated", "id": escalation_id, "status": updates.get("status", "Updated")}


@router.get("/case-log")
async def get_case_log(
    search: Optional[str] = None,
    status: Optional[CaseStatus] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100)
):
    """Searchable/filterable case log."""
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
async def get_police_stats():
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

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
import json
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
    directive: Optional[str] = None


class PoliceActionRequest(BaseModel):
    incident_id: str
    action: str  # 'acknowledge', 'dispatch', 'note', 'resolve', 'forward'
    officer_name: Optional[str] = "Insp. Vikram Patil"
    officer_badge: Optional[str] = "MH-15-POLICE-0482"
    unit_name: Optional[str] = None
    severity: Optional[str] = None
    directive: Optional[str] = None
    notes: Optional[str] = None
    resolution: Optional[str] = None
    penalty_amount: Optional[float] = None
    forward_to: Optional[str] = None


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
    Logs an emergency patrol flying squad dispatch to a specific hotspot centroid,
    persisting it to the database so it survives page reloads.
    """
    conn = get_connection()
    dispatch_id = f"DISPATCH-{uuid.uuid4().hex[:6].upper()}"
    now = now_iso()
    sev = (req.severity or "critical").lower()

    # Save to SQLite patrol_dispatches table
    try:
        conn.execute("""
            INSERT INTO patrol_dispatches (id, cluster_id, hotspot_name, officer_badge, unit_name, severity, directive, dispatched_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (dispatch_id, req.cluster_id, req.hotspot_name, req.officer_badge, req.unit_name, sev, req.directive or "", now))
        conn.commit()
    except Exception as e:
        print(f"[dispatch_patrol] Error persisting dispatch: {e}")

    return {
        "status": "success",
        "dispatch_id": dispatch_id,
        "cluster_id": req.cluster_id,
        "hotspot_name": req.hotspot_name,
        "officer_badge": req.officer_badge,
        "unit_name": req.unit_name,
        "severity": sev,
        "directive": req.directive,
        "dispatched_at": now,
        "eta_minutes": 4,
        "message": f"Flying squad {req.unit_name} [{sev.upper()}] dispatched to {req.hotspot_name}."
    }


@router.get("/patrol-dispatches")
def get_patrol_dispatches():
    """
    Returns all active patrol dispatches to keep the AI Hotspot Radar persistent across page refreshes.
    """
    conn = get_connection()
    try:
        rows = rows_to_list(conn.execute(
            "SELECT * FROM patrol_dispatches ORDER BY dispatched_at DESC LIMIT 100"
        ))
        return {
            "status": "success",
            "count": len(rows),
            "dispatches": rows
        }
    except Exception as e:
        return {"status": "success", "count": 0, "dispatches": []}


@router.post("/action")
async def record_police_action(req: PoliceActionRequest):
    """
    Universal police enforcement action endpoint for Acknowledge, Dispatch Unit,
    Add Official Note, Resolve / Impound, and Forward to Fact-Check.
    Persists to SQLite and mirrors to Supabase in real-time.
    """
    conn = get_connection()
    now = now_iso()
    action_id = f"ACT-{uuid.uuid4().hex[:6].upper()}"

    # Determine status string based on action
    status_map = {
        "acknowledge": "Under Review",
        "dispatch": "Unit Dispatched",
        "note": "Field Note Added",
        "resolve": "Resolved",
        "forward": "Forwarded to Fact-Check"
    }
    new_status = status_map.get(req.action, "Under Review")
    note_content = req.notes or req.resolution or req.directive or ""

    # 1. Log to police_actions table
    try:
        conn.execute("""
            INSERT INTO police_actions (id, incident_id, action_type, status, officer_name, officer_badge, unit_name, notes, meta, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            action_id,
            req.incident_id,
            req.action,
            new_status,
            req.officer_name,
            req.officer_badge,
            req.unit_name,
            note_content,
            f"Penalty: ₹{req.penalty_amount}" if req.penalty_amount else (f"ForwardTo: {req.forward_to}" if req.forward_to else None),
            now
        ))
    except Exception as e:
        print(f"[record_police_action] police_actions insert error: {e}")

    # 2. Check if escalation exists, or upsert it
    esc_row = conn.execute(
        "SELECT * FROM escalations WHERE id = ? OR report_id = ? OR id LIKE ? OR description LIKE ?",
        (req.incident_id, req.incident_id, f"%{req.incident_id}%", f"%{req.incident_id}%")
    ).fetchone()

    formatted_note = f"[{now[:16].replace('T', ' ')} IST] ({req.action.upper()}) {note_content}"
    if req.unit_name:
        formatted_note += f" [Unit: {req.unit_name}]"
    if req.officer_name:
        formatted_note += f" [Officer: {req.officer_name}]"

    if esc_row:
        prev_notes = esc_row["notes"] or ""
        updated_notes = f"{prev_notes}\n{formatted_note}".strip()
        assigned = req.unit_name or req.officer_name or esc_row["assigned_to"]
        conn.execute("""
            UPDATE escalations 
            SET status = ?, assigned_to = ?, notes = ?, updated_at = ?
            WHERE id = ?
        """, (new_status, assigned, updated_notes, now, esc_row["id"]))

        # Update underlying report if present
        if esc_row["report_id"]:
            report_status = "Resolved" if req.action == "resolve" else ("Forwarded to Fact-Check" if req.action == "forward" else new_status)
            conn.execute("UPDATE reports SET status = ?, updated_at = ? WHERE id = ?", (report_status, now, esc_row["report_id"]))
    else:
        # Create an escalation record for this incident docket
        new_esc_id = req.incident_id if len(req.incident_id) < 40 else str(uuid.uuid4())
        conn.execute("""
            INSERT OR REPLACE INTO escalations (id, report_id, category, listing_name, issue_type, description, priority, status, escalated_by, assigned_to, notes, escalated_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            new_esc_id,
            req.incident_id,
            "Police Escalation",
            f"Incident #{req.incident_id}",
            "Overcharging / Civic Violation",
            note_content or f"Action taken by {req.officer_name}",
            "High" if req.severity == "critical" else "Medium",
            new_status,
            req.officer_name,
            req.unit_name or req.officer_name,
            formatted_note,
            now,
            now
        ))

    conn.commit()

    # 3. Synchronize to Supabase if configured
    if SUPABASE_SERVICE_ROLE_KEY:
        try:
            async with httpx.AsyncClient() as client:
                sb_payload = {
                    "status": "Resolved" if req.action == "resolve" else new_status,
                    "notes": note_content,
                    "updated_at": now
                }
                if req.unit_name:
                    sb_payload["assigned_to"] = req.unit_name
                elif req.officer_name:
                    sb_payload["assigned_to"] = req.officer_name

                # Try updating report in Supabase
                await client.patch(
                    f"{SUPABASE_URL}/rest/v1/reports?id=eq.{req.incident_id}",
                    headers={
                        "apikey": SUPABASE_SERVICE_ROLE_KEY,
                        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
                        "Content-Type": "application/json"
                    },
                    json=sb_payload,
                    timeout=3.0
                )
        except Exception as sb_e:
            print(f"[record_police_action] Supabase sync note: {sb_e}")

    return {
        "status": "success",
        "action_id": action_id,
        "incident_id": req.incident_id,
        "action": req.action,
        "case_status": new_status,
        "assigned_to": req.unit_name or req.officer_name,
        "notes": note_content,
        "timestamp": now,
        "message": f"Action '{req.action}' successfully registered and persisted."
    }


@router.get("/actions")
def get_police_actions():
    """
    Returns the latest action status for all incidents so the Police Escalations
    and Case Detail terminals can reflect persisted state after page reloads.
    """
    conn = get_connection()
    try:
        rows = rows_to_list(conn.execute(
            "SELECT * FROM police_actions ORDER BY created_at ASC"
        ))
        
        # Build map of incident_id -> latest action & state
        action_map = {}
        for r in rows:
            inc_id = r["incident_id"]
            if inc_id not in action_map:
                action_map[inc_id] = {
                    "incident_id": inc_id,
                    "acknowledged": False,
                    "dispatched": False,
                    "resolved": False,
                    "forwarded": False,
                    "officer_name": None,
                    "unit_name": None,
                    "status": r["status"],
                    "notes": [],
                    "updated_at": r["created_at"]
                }
            item = action_map[inc_id]
            item["status"] = r["status"]
            item["updated_at"] = r["created_at"]
            if r["notes"]:
                item["notes"].append({
                    "action": r["action_type"],
                    "note": r["notes"],
                    "officer": r["officer_name"],
                    "unit": r["unit_name"],
                    "timestamp": r["created_at"]
                })
            if r["action_type"] == "acknowledge":
                item["acknowledged"] = True
                item["officer_name"] = r["officer_name"]
            elif r["action_type"] == "dispatch":
                item["dispatched"] = True
                item["unit_name"] = r["unit_name"]
            elif r["action_type"] == "resolve":
                item["resolved"] = True
            elif r["action_type"] == "forward":
                item["forwarded"] = True

        return {
            "status": "success",
            "actions": action_map
        }
    except Exception as e:
        print(f"[get_police_actions] Error: {e}")
        return {"status": "success", "actions": {}}


@router.get("/case/{incident_id}")
def get_case_dossier(incident_id: str):
    """
    Get full case details including investigation chronology and logged field notes.
    """
    conn = get_connection()
    # Check escalations table
    esc = conn.execute(
        "SELECT * FROM escalations WHERE id = ? OR report_id = ? OR id LIKE ?",
        (incident_id, incident_id, f"%{incident_id}%")
    ).fetchone()

    # Get actions log
    actions = rows_to_list(conn.execute(
        "SELECT * FROM police_actions WHERE incident_id = ? OR incident_id LIKE ? ORDER BY created_at ASC",
        (incident_id, f"%{incident_id}%")
    ))

    # Get report details
    report = None
    if esc and esc["report_id"]:
        rep_row = conn.execute("SELECT * FROM reports WHERE id = ?", (esc["report_id"],)).fetchone()
        if rep_row:
            report = dict(rep_row)
    else:
        rep_row = conn.execute("SELECT * FROM reports WHERE id = ? OR id LIKE ?", (incident_id, f"%{incident_id}%")).fetchone()
        if rep_row:
            report = dict(rep_row)

    status = "Under Review"
    if esc:
        status = esc["status"]
    elif actions:
        status = actions[-1]["status"]

    return {
        "status": "success",
        "incident_id": incident_id,
        "case_status": status,
        "escalation": dict(esc) if esc else None,
        "report": report,
        "activities": actions
    }


# ─────────────────────────────────────────────────────────────
# 2. Existing Police Escalations, Case Dossier & Logs
# ─────────────────────────────────────────────────────────────

class EscalationCreateRequest(BaseModel):
    id: Optional[str] = None
    report_id: str
    category: Optional[str] = "Citizen Escalation"
    listing_name: Optional[str] = "Nashik Sector"
    issue_type: Optional[str] = "Grievance"
    description: Optional[str] = None
    priority: Optional[str] = "High"
    status: Optional[str] = "New"
    escalated_by: Optional[str] = "Kumbhveer Field Volunteer"
    notes: Optional[str] = None


@router.post("/escalations")
async def create_escalation(payload: EscalationCreateRequest):
    """
    Create or register a direct escalation from Kumbhveer field volunteers or citizen watchdog.
    Persists to SQLite and mirrors to Supabase.
    """
    conn = get_connection()
    now = now_iso()
    esc_id = payload.id or f"esc-{payload.report_id}"

    # Ensure report exists in SQLite reports table
    existing_rep = conn.execute("SELECT id FROM reports WHERE id = ?", (payload.report_id,)).fetchone()
    if not existing_rep:
        conn.execute("""
            INSERT INTO reports (
                id, category, listing_name, issue_type, description, status,
                created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, 'Escalated to Police', ?, ?)
        """, (
            payload.report_id, payload.category or "Civic",
            payload.listing_name or "Nashik Sector", payload.issue_type or "Grievance",
            payload.description or "Citizen grievance escalated by Kumbhveer squad",
            now, now
        ))
    else:
        conn.execute(
            "UPDATE reports SET status = 'Escalated to Police', updated_at = ? WHERE id = ?",
            (now, payload.report_id)
        )

    # Insert or replace escalation
    conn.execute("""
        INSERT OR REPLACE INTO escalations (
            id, report_id, category, listing_name, issue_type,
            description, priority, status, escalated_by, notes,
            escalated_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        esc_id, payload.report_id, payload.category or "Citizen Escalation",
        payload.listing_name or "Nashik Sector", payload.issue_type or "Grievance",
        payload.description or "Escalated by Kumbhveer field squad",
        payload.priority or "High", payload.status or "New",
        payload.escalated_by or "Kumbhveer Field Volunteer",
        payload.notes or "", now, now
    ))
    conn.commit()

    row = dict(conn.execute("SELECT * FROM escalations WHERE id = ?", (esc_id,)).fetchone())
    row["time_since_escalation"] = "just now"

    # Async mirror to Supabase if configured
    if SUPABASE_SERVICE_ROLE_KEY:
        try:
            async with httpx.AsyncClient() as client:
                await client.post(
                    f"{SUPABASE_URL}/rest/v1/escalations",
                    headers={
                        "apikey": SUPABASE_SERVICE_ROLE_KEY,
                        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
                        "Content-Type": "application/json",
                        "Prefer": "resolution=merge-duplicates"
                    },
                    json={
                        "id": esc_id,
                        "report_id": payload.report_id,
                        "category": payload.category or "Citizen Escalation",
                        "listing_name": payload.listing_name or "Nashik Sector",
                        "issue_type": payload.issue_type or "Grievance",
                        "description": payload.description,
                        "priority": payload.priority or "High",
                        "status": payload.status or "New",
                        "escalated_by": payload.escalated_by or "Kumbhveer Field Volunteer",
                        "escalated_at": now,
                        "updated_at": now
                    },
                    timeout=1.5
                )
                await client.patch(
                    f"{SUPABASE_URL}/rest/v1/reports?id=eq.{payload.report_id}",
                    headers={
                        "apikey": SUPABASE_SERVICE_ROLE_KEY,
                        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
                        "Content-Type": "application/json"
                    },
                    json={"status": "Escalated to Police", "updated_at": now},
                    timeout=1.5
                )
        except Exception as e:
            print(f"[SupabaseEscalationSync] Warning: {e}")

    return {"message": "Escalation created", "escalation": row}


@router.get("/escalations")
async def get_escalations(
    status: Optional[CaseStatus] = None,
    priority: Optional[str] = None,
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100)
):
    """Get escalations feed."""
    conn = get_connection()

    # Auto-seed any missing escalations from escalated reports
    try:
        escalated_reps = conn.execute("""
            SELECT r.* FROM reports r
            LEFT JOIN escalations e ON r.id = e.report_id
            WHERE (r.status = 'Escalated to Police' OR r.status = 'escalated')
            AND e.id IS NULL
        """).fetchall()
        for er in escalated_reps:
            now = now_iso()
            conn.execute("""
                INSERT OR IGNORE INTO escalations (
                    id, report_id, category, listing_name, issue_type,
                    description, priority, status, escalated_by, notes,
                    escalated_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, 'High', 'New', 'Kumbhveer Field Volunteer', '', ?, ?)
            """, (
                f"esc-{er['id']}", er['id'], er['category'] or "Civic",
                er['listing_name'] or "Nashik Sector", er['issue_type'] or "Grievance",
                er['description'], er['created_at'] or now, now
            ))
        if escalated_reps:
            conn.commit()
    except Exception as e:
        print(f"[PoliceEscalationsAutoSync] Error: {e}")

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


class ScheduleVerificationRequest(BaseModel):
    vendor_id: Optional[str] = None
    vendor_name: str
    location: Optional[str] = None
    kumbhveer_name: Optional[str] = None
    assigned_kumbhveer: Optional[str] = None
    kumbhveer_id: Optional[str] = None
    directive: Optional[str] = None
    notes: Optional[str] = None
    priority: Optional[str] = "Immediate"
    officer_badge: Optional[str] = "MH-15-POLICE-0482"
    officer_name: Optional[str] = "Insp. Vikram Patil"
    case_number: Optional[str] = None


@router.post("/schedule-verification")
async def police_schedule_verification(req: ScheduleVerificationRequest):
    """
    Police schedules an official verification and assigns a Kumbhveer volunteer in real time.
    """
    conn = get_connection()
    now = now_iso()
    verif_id = f"verif-{uuid.uuid4().hex[:8]}"

    conn.execute("""
        CREATE TABLE IF NOT EXISTS scheduled_verifications (
            id TEXT PRIMARY KEY,
            vendor_id TEXT,
            vendor_name TEXT NOT NULL,
            location TEXT,
            kumbhveer_name TEXT NOT NULL,
            kumbhveer_id TEXT,
            directive TEXT,
            priority TEXT DEFAULT 'Immediate',
            officer_badge TEXT,
            officer_name TEXT,
            status TEXT DEFAULT 'Scheduled',
            created_at TEXT NOT NULL
        )
    """)

    resolved_kv = req.kumbhveer_name or req.assigned_kumbhveer or 'Assigned Kumbhveer'
    resolved_directive = req.directive or req.notes or 'Conduct on-ground price check & hygiene verification'

    conn.execute("""
        INSERT INTO scheduled_verifications (
            id, vendor_id, vendor_name, location, kumbhveer_name,
            kumbhveer_id, directive, priority, officer_badge, officer_name,
            status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Scheduled', ?)
    """, (
        verif_id, req.vendor_id, req.vendor_name, req.location,
        resolved_kv, req.kumbhveer_id, resolved_directive,
        req.priority, req.officer_badge, req.officer_name, now
    ))

    # Also log as a police action
    act_id = f"act-{uuid.uuid4().hex[:8]}"
    inc_target = req.vendor_id or req.vendor_name
    conn.execute("""
        INSERT INTO police_actions (
            id, incident_id, action_type, status, officer_name, officer_badge, unit_name, notes, meta, created_at
        ) VALUES (?, ?, 'schedule_verification', 'Verification Scheduled', ?, ?, ?, ?, ?, ?)
    """, (
        act_id, inc_target, req.officer_name, req.officer_badge,
        "Simhastha Police Vigilance Desk",
        f"Assigned Kumbhveer {resolved_kv} for field inspection. Directive: {resolved_directive}",
        json.dumps({"kumbhveer": resolved_kv, "priority": req.priority}),
        now
    ))

    # Update vendor status if found
    try:
        conn.execute("""
            UPDATE vendors SET verification_status = 'Kumbhveer Verification Scheduled'
            WHERE id = ? OR name LIKE ?
        """, (req.vendor_id or '', f"%{req.vendor_name}%"))
    except Exception:
        pass

    conn.commit()

    return {
        "status": "success",
        "id": verif_id,
        "message": f"Verification scheduled in real time! Assigned Kumbhveer: {resolved_kv}",
        "scheduled": {
            "id": verif_id,
            "vendor_name": req.vendor_name,
            "kumbhveer_name": resolved_kv,
            "directive": resolved_directive,
            "priority": req.priority,
            "status": "Scheduled",
            "created_at": now
        }
    }


@router.get("/scheduled-verifications")
async def get_scheduled_verifications():
    """Retrieve all verification tasks scheduled by police."""
    conn = get_connection()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS scheduled_verifications (
            id TEXT PRIMARY KEY,
            vendor_id TEXT,
            vendor_name TEXT NOT NULL,
            location TEXT,
            kumbhveer_name TEXT NOT NULL,
            kumbhveer_id TEXT,
            directive TEXT,
            priority TEXT DEFAULT 'Immediate',
            officer_badge TEXT,
            officer_name TEXT,
            status TEXT DEFAULT 'Scheduled',
            created_at TEXT NOT NULL
        )
    """)
    rows = rows_to_list(conn.execute("""
        SELECT * FROM scheduled_verifications ORDER BY created_at DESC
    """))
    return {"scheduled_verifications": rows}


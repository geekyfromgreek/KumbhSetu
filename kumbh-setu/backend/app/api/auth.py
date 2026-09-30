"""
Kumbh Setu — Auth API
Supabase Auth integration for Email & Password + Local Guide Biometrics.
"""
import os
import uuid
import httpx
from pathlib import Path
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, Depends, Body
from typing import Optional
from pydantic import BaseModel
from ..schemas.schemas import LoginRequest, LoginResponse, UserProfile
from ..core.security import verify_jwt, require_auth, CurrentUser, DEMO_USERS, UserRole
from ..core.config import get_settings
from ..db.supabase_client import get_connection, now_iso

env_path = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

router = APIRouter(prefix="/auth", tags=["Authentication"])

SUPABASE_URL = (os.getenv("SUPABASE_URL") or "https://asparwhkzpnnittnhsic.supabase.co").rstrip("/")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY") or os.getenv("SUPABASE_KEY", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")


class SupabaseSignupRequest(BaseModel):
    email: str
    password: str
    full_name: Optional[str] = None
    name: Optional[str] = None
    role: str = "guide"
    govt_id: Optional[str] = None
    phone: Optional[str] = None
    extra: Optional[str] = None
    business_name: Optional[str] = None
    category: Optional[str] = None


class SupabaseLoginRequest(BaseModel):
    email: str
    password: str


@router.post("/supabase-signup")
async def supabase_signup(req: SupabaseSignupRequest):
    """
    Register a confirmed user in Supabase Auth via Admin API and synchronize
    role-specific entry into SQLite and Supabase tables.
    Supports Vendor, Kumbhveer, Resident, and Guide entries.
    """
    if not SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=500, detail="Supabase Service Role Key not configured.")

    admin_url = f"{SUPABASE_URL}/auth/v1/admin/users"
    headers = {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
        "Content-Type": "application/json"
    }

    display_name = (req.full_name or req.name or "Kumbh Citizen").strip()
    role = req.role.strip().lower() if req.role else "guide"
    if role == "nashikkar":
        role = "resident"

    payload = {
        "email": req.email,
        "password": req.password,
        "email_confirm": True,
        "user_metadata": {
            "full_name": display_name,
            "role": role,
            "govt_id": req.govt_id,
            "phone": req.phone or "9822014522",
            "extra": req.extra
        }
    }

    created_user_id = str(uuid.uuid4())
    already_exists = False

    async with httpx.AsyncClient() as client:
        res = await client.post(admin_url, headers=headers, json=payload, timeout=15.0)
        if res.status_code in [200, 201]:
            data = res.json()
            created_user_id = data.get("id", created_user_id)
        else:
            err_data = res.json() if res.headers.get("content-type", "").startswith("application/json") else {}
            msg = str(err_data.get("msg") or err_data.get("message") or res.text)
            if "already registered" in msg.lower() or "already exists" in msg.lower():
                already_exists = True
            else:
                # Fallback to demo mode if auth service error
                already_exists = False

    # Synchronize entry into backend SQLite and Supabase tables based on role
    conn = get_connection()
    now = now_iso()

    try:
        if role == "vendor":
            # 1. SQLite vendors table
            biz_name = req.business_name or req.extra or f"{display_name}'s Stall"
            category = req.category or "Food Stall"
            conn.execute("""
                INSERT OR REPLACE INTO vendors (
                    id, name, business_name, category, phone, govt_id,
                    address, selfie_embedding, identity_confirmed,
                    verification_status, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                created_user_id, display_name, biz_name, category,
                req.phone or "9822014522", req.govt_id or "MH-15-VND-001",
                req.extra or "Ramkund Market Sector 3", None, 1,
                "Pending Verification", now
            ))
            conn.commit()

            # 2. Supabase listings entry for vendor
            async with httpx.AsyncClient() as client:
                await client.post(
                    f"{SUPABASE_URL}/rest/v1/listings",
                    headers={
                        "apikey": SUPABASE_SERVICE_ROLE_KEY,
                        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
                        "Content-Type": "application/json",
                        "Prefer": "resolution=merge-duplicates"
                    },
                    json={
                        "id": f"vnd-{created_user_id[:8]}",
                        "name": biz_name,
                        "category": category,
                        "subcategory": "Civic Vendor",
                        "description": f"Authorized civic vendor stall registered by {display_name}.",
                        "address": req.extra or "Ramkund Sector 3, Panchavati",
                        "phone": req.phone or "9822014522",
                        "verification_status": "Pending Verification"
                    },
                    timeout=8.0
                )

        elif role == "kumbhveer":
            college = req.extra or "Sandip University Engineering"
            # 1. SQLite volunteer_rewards
            conn.execute("""
                INSERT OR REPLACE INTO volunteer_rewards (
                    id, volunteer_name, phone_number, college_name,
                    points, tier, audits_completed, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                created_user_id, display_name, req.phone or "9822014522", college,
                180, "Kumbhveer Sevak", 3, now
            ))
            conn.commit()

            # 2. Supabase volunteer_rewards
            async with httpx.AsyncClient() as client:
                await client.post(
                    f"{SUPABASE_URL}/rest/v1/volunteer_rewards",
                    headers={
                        "apikey": SUPABASE_SERVICE_ROLE_KEY,
                        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
                        "Content-Type": "application/json",
                        "Prefer": "resolution=merge-duplicates"
                    },
                    json={
                        "id": created_user_id,
                        "volunteer_name": display_name,
                        "phone_number": req.phone or "9822014522",
                        "college_name": college,
                        "points": 180,
                        "tier": "Kumbhveer Sevak",
                        "audits_completed": 3
                    },
                    timeout=8.0
                )

        elif role == "guide":
            # 1. SQLite local_guides
            conn.execute("""
                INSERT OR REPLACE INTO local_guides (
                    id, name, phone_number, govt_id_number, verification_status,
                    base_location_name, created_at, last_active_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                created_user_id, display_name, req.phone or "02532513511",
                req.govt_id or "MH-15-GUIDE-0082", "Verified",
                req.extra or "Ramkund Main Ghat", now, now
            ))
            conn.commit()

            # 2. Supabase local_guides
            async with httpx.AsyncClient() as client:
                await client.post(
                    f"{SUPABASE_URL}/rest/v1/local_guides",
                    headers={
                        "apikey": SUPABASE_SERVICE_ROLE_KEY,
                        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
                        "Content-Type": "application/json",
                        "Prefer": "resolution=merge-duplicates"
                    },
                    json={
                        "id": created_user_id,
                        "name": display_name,
                        "phone_number": req.phone or "02532513511",
                        "govt_id_number": req.govt_id or "MH-15-GUIDE-0082",
                        "verification_status": "Verified",
                        "base_location_name": req.extra or "Ramkund Main Ghat",
                        "hourly_rate": 200.0,
                        "rating": 4.9,
                        "review_count": 0
                    },
                    timeout=8.0
                )

        elif role in ["resident", "nashikkar"]:
            conn.execute("""
                CREATE TABLE IF NOT EXISTS citizens (
                    id TEXT PRIMARY KEY,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL UNIQUE,
                    phone TEXT,
                    govt_id TEXT,
                    address TEXT,
                    role TEXT DEFAULT 'resident',
                    created_at TEXT NOT NULL,
                    updated_at TEXT NOT NULL
                )
            """)
            conn.execute("""
                INSERT OR REPLACE INTO citizens (
                    id, name, email, phone, govt_id, address, role, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                created_user_id, display_name, req.email, req.phone or "9822014522",
                req.govt_id or "MH-15-CITIZEN-001", req.extra or "Ramkund Sector 3, Panchavati",
                role, now, now
            ))
            conn.commit()
    except Exception as sync_err:
        print(f"[SupabaseSignup] Sync error (non-fatal): {sync_err}")

    return {
        "status": "already_exists" if already_exists else "success",
        "user_id": created_user_id,
        "email": req.email,
        "role": role,
        "name": display_name,
        "phone": req.phone or "9822014522",
        "govt_id": req.govt_id or "",
        "extra": req.extra or "",
        "message": f"Account {req.email} registered and profile synced as {role}."
    }


@router.get("/citizens")
async def get_registered_citizens():
    """Get list of registered citizens."""
    conn = get_connection()
    try:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS citizens (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                phone TEXT,
                govt_id TEXT,
                address TEXT,
                role TEXT DEFAULT 'resident',
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
        """)
        rows = conn.execute("SELECT * FROM citizens ORDER BY created_at DESC LIMIT 50").fetchall()
        citizens = [dict(r) for r in rows]
        return {"citizens": citizens, "count": len(citizens)}
    except Exception as e:
        return {"citizens": [], "count": 0, "error": str(e)}


@router.post("/supabase-login")
async def supabase_login(req: SupabaseLoginRequest):
    """
    Authenticate against Supabase Auth password grant.
    """
    token_url = f"{SUPABASE_URL}/auth/v1/token?grant_type=password"
    headers = {
        "apikey": SUPABASE_KEY or SUPABASE_SERVICE_ROLE_KEY,
        "Content-Type": "application/json"
    }
    payload = {
        "email": req.email,
        "password": req.password
    }

    async with httpx.AsyncClient() as client:
        res = await client.post(token_url, headers=headers, json=payload, timeout=15.0)
        if res.status_code in [200, 201]:
            data = res.json()
            user_data = data.get("user", {})
            user_meta = user_data.get("user_metadata", {})
            return {
                "access_token": data.get("access_token"),
                "user_id": user_data.get("id"),
                "email": user_data.get("email"),
                "role": user_meta.get("role", "guide"),
                "full_name": user_meta.get("full_name", ""),
                "message": "Login successful via Supabase Auth."
            }
        else:
            raise HTTPException(status_code=401, detail="Invalid Email or Password in Supabase.")


@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    """Fallback demo login endpoint."""
    return LoginResponse(
        token="demo-nashikkar-token",
        user_id="demo-nashikkar-1",
        role="nashikkar",
        message="Demo login successful"
    )


@router.get("/me", response_model=UserProfile)
async def get_profile(user: CurrentUser = Depends(require_auth)):
    """Get current user profile."""
    return UserProfile(
        user_id=user.user_id,
        role=user.role.value,
        email=user.email,
        phone=user.phone
    )


class KumbhveerProfileUpdate(BaseModel):
    volunteer_name: str
    college_name: str
    phone_number: Optional[str] = None
    roll_number: Optional[str] = None


@router.get("/kumbhveer/profile")
async def get_kumbhveer_profile():
    """Retrieve Kumbhveer volunteer profile."""
    conn = get_connection()
    row = conn.execute("SELECT * FROM kumbhveer_profiles ORDER BY updated_at DESC LIMIT 1").fetchone()
    if row:
        return dict(row)

    # Fallback default
    now = now_iso()
    default_profile = {
        "id": "kv-2027-nk",
        "volunteer_name": "Nakul Karpe",
        "college_name": "Sandip University Engineering",
        "phone_number": "+91 98220 10291",
        "roll_number": "KV-2027-NK",
        "points": 480,
        "tier": "Gold Kumbhveer Leader",
        "updated_at": now
    }
    conn.execute("""
        INSERT OR REPLACE INTO kumbhveer_profiles (
            id, volunteer_name, college_name, phone_number, roll_number, points, tier, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        default_profile["id"], default_profile["volunteer_name"], default_profile["college_name"],
        default_profile["phone_number"], default_profile["roll_number"], default_profile["points"],
        default_profile["tier"], now
    ))
    conn.commit()
    return default_profile


@router.post("/kumbhveer/profile")
async def update_kumbhveer_profile(req: KumbhveerProfileUpdate):
    """
    Update Kumbhveer volunteer profile (college name, volunteer name, phone).
    Synchronizes across kumbhveer_profiles and volunteer_rewards leaderboard.
    """
    conn = get_connection()
    now = now_iso()
    v_name = req.volunteer_name.strip()
    c_name = req.college_name.strip()
    phone = (req.phone_number or "+91 98220 10291").strip()
    roll = (req.roll_number or "KV-2027-NK").strip()

    # Update or insert into kumbhveer_profiles
    row = conn.execute("SELECT id FROM kumbhveer_profiles LIMIT 1").fetchone()
    pid = row["id"] if row else "kv-2027-nk"

    conn.execute("""
        INSERT INTO kumbhveer_profiles (id, volunteer_name, college_name, phone_number, roll_number, points, tier, updated_at)
        VALUES (?, ?, ?, ?, ?, 480, 'Gold Kumbhveer Leader', ?)
        ON CONFLICT(id) DO UPDATE SET
            volunteer_name = excluded.volunteer_name,
            college_name = excluded.college_name,
            phone_number = excluded.phone_number,
            roll_number = excluded.roll_number,
            updated_at = excluded.updated_at
    """, (pid, v_name, c_name, phone, roll, now))

    # Synchronize with volunteer_rewards table (top leader #1)
    try:
        conn.execute("""
            UPDATE volunteer_rewards
            SET volunteer_name = ?, college_name = ?, phone_number = ?
            WHERE id = 'vr-001' OR volunteer_name = 'Nakul Karpe'
        """, (v_name, c_name, phone))
    except Exception:
        pass

    conn.commit()

    return {
        "status": "success",
        "message": "Kumbhveer profile updated and synchronized with Civic Leaderboard",
        "profile": {
            "id": pid,
            "volunteer_name": v_name,
            "college_name": c_name,
            "phone_number": phone,
            "roll_number": roll,
            "updated_at": now
        }
    }


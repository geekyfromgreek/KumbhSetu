"""
Kumbh Setu — Auth API
Supabase Auth integration for Email & Password + Local Guide Biometrics.
"""
import os
import httpx
from fastapi import APIRouter, HTTPException, Depends, Body
from typing import Optional
from pydantic import BaseModel
from ..schemas.schemas import LoginRequest, LoginResponse, UserProfile
from ..core.security import verify_jwt, require_auth, CurrentUser, DEMO_USERS, UserRole
from ..core.config import get_settings

router = APIRouter(prefix="/auth", tags=["Authentication"])

SUPABASE_URL = os.getenv("SUPABASE_URL", "https://asparwhkzpnnittnhsic.supabase.co").rstrip("/")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")


class SupabaseSignupRequest(BaseModel):
    email: str
    password: str
    full_name: str
    role: str = "guide"
    govt_id: Optional[str] = None


class SupabaseLoginRequest(BaseModel):
    email: str
    password: str


@router.post("/supabase-signup")
async def supabase_signup(req: SupabaseSignupRequest):
    """
    Register a confirmed user in Supabase Auth via Admin API.
    Bypasses SMTP rate limits and domain validation.
    """
    if not SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(status_code=500, detail="Supabase Service Role Key not configured.")

    admin_url = f"{SUPABASE_URL}/auth/v1/admin/users"
    headers = {
        "apikey": SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_ROLE_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "email": req.email,
        "password": req.password,
        "email_confirm": True,
        "user_metadata": {
            "full_name": req.full_name,
            "role": req.role,
            "govt_id": req.govt_id
        }
    }

    async with httpx.AsyncClient() as client:
        res = await client.post(admin_url, headers=headers, json=payload, timeout=15.0)
        if res.status_code in [200, 201]:
            data = res.json()
            return {
                "status": "success",
                "user_id": data.get("id"),
                "email": req.email,
                "role": req.role,
                "message": "User registered and confirmed in Supabase Auth."
            }
        else:
            # If user already exists, return friendly message
            err_data = res.json() if res.headers.get("content-type", "").startswith("application/json") else {}
            msg = err_data.get("msg") or err_data.get("message") or res.text
            if "already registered" in msg.lower() or "already exists" in msg.lower():
                return {
                    "status": "already_exists",
                    "email": req.email,
                    "message": "Account already registered in Supabase. Please login."
                }
            raise HTTPException(status_code=res.status_code, detail=msg)


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

"""
Kumbh Setu — Security utilities
JWT verification, role enforcement, rate limiting.
"""
from datetime import datetime, timezone
from enum import Enum
from typing import Optional
from fastapi import Depends, HTTPException, Header, status
from jose import JWTError, jwt
from .config import get_settings


class UserRole(str, Enum):
    YATRI = "yatri"
    NASHIKKAR = "nashikkar"
    POLICE = "police"


class CurrentUser:
    """Represents the authenticated user context."""
    def __init__(self, user_id: str, role: UserRole, email: Optional[str] = None, phone: Optional[str] = None):
        self.user_id = user_id
        self.role = role
        self.email = email
        self.phone = phone


# --- Demo users for hackathon (no live Supabase needed) ---
DEMO_USERS = {
    "demo-nashikkar-1": CurrentUser(
        user_id="demo-nashikkar-1",
        role=UserRole.NASHIKKAR,
        email="admin@kumbhsetu.in",
        phone="+919876543210"
    ),
    "demo-police-1": CurrentUser(
        user_id="demo-police-1",
        role=UserRole.POLICE,
        email="officer@nashikpolice.gov.in",
        phone="+919876543211"
    ),
}

DEMO_TOKEN_MAP = {
    "demo-nashikkar-token": "demo-nashikkar-1",
    "demo-police-token": "demo-police-1",
}


async def verify_jwt(authorization: Optional[str] = Header(None)) -> Optional[CurrentUser]:
    """
    Verify incoming JWT from Supabase Auth.
    Falls back to demo tokens for hackathon mode.
    """
    if not authorization:
        return None

    token = authorization.replace("Bearer ", "").strip()

    # Demo mode: check demo tokens first
    if token in DEMO_TOKEN_MAP:
        user_id = DEMO_TOKEN_MAP[token]
        return DEMO_USERS[user_id]

    # Production mode: verify Supabase JWT
    settings = get_settings()
    if not settings.SUPABASE_JWT_SECRET:
        return None

    try:
        payload = jwt.decode(
            token,
            settings.SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            audience="authenticated"
        )
        user_id = payload.get("sub")
        role_str = payload.get("user_metadata", {}).get("role", "yatri")
        role = UserRole(role_str)
        return CurrentUser(
            user_id=user_id,
            role=role,
            email=payload.get("email"),
            phone=payload.get("phone")
        )
    except (JWTError, ValueError, KeyError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token"
        )


async def require_auth(user: Optional[CurrentUser] = Depends(verify_jwt)) -> CurrentUser:
    """Dependency: requires authentication."""
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required"
        )
    return user


async def require_nashikkar(user: CurrentUser = Depends(require_auth)) -> CurrentUser:
    """Dependency: requires Nashikkar role."""
    if user.role != UserRole.NASHIKKAR:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Nashikkar access required"
        )
    return user


async def require_police(user: CurrentUser = Depends(require_auth)) -> CurrentUser:
    """Dependency: requires Police role."""
    if user.role != UserRole.POLICE:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Police access required"
        )
    return user

"""
Kumbh Setu — Auth API
Login, OTP verification, profile endpoints.
Demo mode supports mock tokens for hackathon.
"""
from fastapi import APIRouter, HTTPException, Depends
from ..schemas.schemas import LoginRequest, LoginResponse, UserProfile
from ..core.security import verify_jwt, require_auth, CurrentUser, DEMO_USERS, UserRole

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    """
    Login endpoint. In demo mode, returns a demo token.
    In production, proxies to Supabase Auth (phone OTP / email).
    """
    # Demo mode: return demo tokens based on phone/email
    if request.phone == "+919876543210" or request.email == "admin@kumbhsetu.in":
        return LoginResponse(
            token="demo-nashikkar-token",
            user_id="demo-nashikkar-1",
            role="nashikkar",
            message="Demo login successful (Nashikkar)"
        )
    elif request.phone == "+919876543211" or request.email == "officer@nashikpolice.gov.in":
        return LoginResponse(
            token="demo-police-token",
            user_id="demo-police-1",
            role="police",
            message="Demo login successful (Police)"
        )
    else:
        # In demo mode, any phone/email gets a Nashikkar token
        return LoginResponse(
            token="demo-nashikkar-token",
            user_id="demo-nashikkar-1",
            role="nashikkar",
            message="Demo login successful"
        )


@router.post("/verify-otp")
async def verify_otp(phone: str, otp: str):
    """Verify OTP — demo mode always succeeds."""
    return {"verified": True, "token": "demo-nashikkar-token", "message": "OTP verified (demo mode)"}


@router.get("/me", response_model=UserProfile)
async def get_profile(user: CurrentUser = Depends(require_auth)):
    """Get current user profile."""
    return UserProfile(
        user_id=user.user_id,
        role=user.role.value,
        email=user.email,
        phone=user.phone
    )


@router.get("/demo-tokens")
async def get_demo_tokens():
    """List available demo tokens for testing."""
    return {
        "nashikkar": {
            "token": "demo-nashikkar-token",
            "email": "admin@kumbhsetu.in",
            "phone": "+919876543210"
        },
        "police": {
            "token": "demo-police-token",
            "email": "officer@nashikpolice.gov.in",
            "phone": "+919876543211"
        },
        "usage": "Set header: Authorization: Bearer <token>"
    }

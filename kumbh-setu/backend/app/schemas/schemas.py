"""
Kumbh Setu — Pydantic Schemas
Request/response validation models for all API endpoints.
"""
from datetime import datetime
from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field


# ─── Enums ───────────────────────────────────────────────

class ListingCategory(str, Enum):
    EATERY = "eatery"
    HOTEL = "hotel"
    RICKSHAW_BUS = "rickshaw_bus"
    LOCAL_GUIDE = "local_guide"
    GUIDE = "guide"
    BAZAAR = "bazaar"
    PUJA_SAMAGRI = "puja_samagri"
    GOODS = "goods"
    STALL = "stall"
    FOOD = "food"
    STAY = "stay"
    TRANSPORT = "transport"
    INFRASTRUCTURE = "infrastructure"


class VerificationStatus(str, Enum):
    KUMBHVEER_VERIFIED = "Kumbhveer Verified"
    PENDING = "Pending Verification"
    FLAGGED = "Flagged — Info Incomplete"


class ReportStatus(str, Enum):
    NEW = "New"
    UNDER_REVIEW = "Under Review"
    RESOLVED = "Resolved"
    ESCALATED = "Escalated to Police"
    FORWARDED = "Forwarded to Fact-Check"


class BookingStatus(str, Enum):
    PENDING = "Pending"
    ACCEPTED = "Accepted"
    DECLINED = "Declined"


class EscalationPriority(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    CRITICAL = "Critical"


class CaseStatus(str, Enum):
    NEW = "New"
    UNDER_REVIEW = "Under Review"
    FORWARDED = "Forwarded to Fact-Check"
    RESOLVED = "Resolved"


# ─── Listings ────────────────────────────────────────────

class ListingBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)
    category: ListingCategory
    subcategory: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    maps_link: Optional[str] = None
    reference_price: Optional[float] = Field(None, ge=0, description="Baseline/expected price")
    reported_price: Optional[float] = Field(None, ge=0, description="Current vendor-submitted price")
    rating: Optional[float] = Field(None, ge=0, le=5)
    review_count: Optional[int] = Field(None, ge=0)
    opening_hours: Optional[str] = None
    known_for: Optional[str] = None
    image_url: Optional[str] = None


class ListingCreate(ListingBase):
    pass


class ListingUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    reference_price: Optional[float] = None
    reported_price: Optional[float] = None
    verification_status: Optional[VerificationStatus] = None
    opening_hours: Optional[str] = None


class ListingResponse(ListingBase):
    id: str
    verification_status: VerificationStatus = VerificationStatus.PENDING
    price_flagged: bool = False
    price_delta_percent: Optional[float] = None
    distance_km: Optional[float] = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ListingListResponse(BaseModel):
    listings: list[ListingResponse]
    total: int
    page: int
    page_size: int


# ─── Reports ────────────────────────────────────────────

class ReportCreate(BaseModel):
    category: str = Field(..., min_length=1)
    listing_id: Optional[str] = None
    listing_name: Optional[str] = None
    issue_type: str = Field(..., min_length=1)
    description: Optional[str] = None
    photo_url: Optional[str] = None
    reporter_phone: Optional[str] = None


class ReportStatusUpdate(BaseModel):
    status: ReportStatus
    notes: Optional[str] = None


class ReportResponse(BaseModel):
    id: str
    category: str
    listing_id: Optional[str] = None
    listing_name: Optional[str] = None
    issue_type: str
    description: Optional[str] = None
    photo_url: Optional[str] = None
    status: ReportStatus
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    time_ago: Optional[str] = None

    class Config:
        from_attributes = True


# ─── Bookings ───────────────────────────────────────────

class BookingCreate(BaseModel):
    listing_id: str
    listing_name: Optional[str] = None
    category: ListingCategory
    guest_name: str = Field(..., min_length=1)
    guest_phone: str = Field(..., min_length=10)
    guest_count: Optional[int] = Field(1, ge=1)
    check_in: Optional[str] = None
    check_out: Optional[str] = None
    special_requests: Optional[str] = None


class BookingStatusUpdate(BaseModel):
    status: BookingStatus
    notes: Optional[str] = None


class BookingResponse(BaseModel):
    id: str
    listing_id: str
    listing_name: Optional[str] = None
    category: ListingCategory
    guest_name: str
    guest_phone: str
    guest_count: int = 1
    check_in: Optional[str] = None
    check_out: Optional[str] = None
    special_requests: Optional[str] = None
    status: BookingStatus
    notes: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    time_ago: Optional[str] = None

    class Config:
        from_attributes = True


# ─── Auth ────────────────────────────────────────────────

class LoginRequest(BaseModel):
    phone: Optional[str] = None
    email: Optional[str] = None


class LoginResponse(BaseModel):
    token: str
    user_id: str
    role: str
    message: str


class UserProfile(BaseModel):
    user_id: str
    role: str
    email: Optional[str] = None
    phone: Optional[str] = None


# ─── Police / Escalations ───────────────────────────────

class EscalationResponse(BaseModel):
    id: str
    report_id: str
    category: str
    listing_name: Optional[str] = None
    issue_type: str
    description: Optional[str] = None
    priority: EscalationPriority
    status: CaseStatus
    escalated_by: Optional[str] = None
    assigned_to: Optional[str] = None
    escalated_at: datetime
    updated_at: datetime
    time_since_escalation: Optional[str] = None

    class Config:
        from_attributes = True


class EscalationUpdate(BaseModel):
    status: Optional[CaseStatus] = None
    assigned_to: Optional[str] = None
    notes: Optional[str] = None


# ─── Vendor Registration ────────────────────────────────

class VendorRegistration(BaseModel):
    name: str = Field(..., min_length=1)
    business_name: str = Field(..., min_length=1)
    category: ListingCategory
    phone: str = Field(..., min_length=10)
    govt_id: Optional[str] = None
    address: Optional[str] = None
    selfie_embedding: Optional[list[float]] = None


class VendorResponse(BaseModel):
    id: str
    name: str
    business_name: str
    category: ListingCategory
    phone: str
    govt_id: Optional[str] = None
    identity_confirmed: bool = False
    verification_status: VerificationStatus
    created_at: datetime

    class Config:
        from_attributes = True


# ─── Verification ───────────────────────────────────────

class EmbeddingResponse(BaseModel):
    embedding: list[float]
    model_used: str
    message: str = "Embedding generated. Raw image has been discarded."


class VerifyIdentityRequest(BaseModel):
    stored_embedding: list[float]
    new_embedding: list[float]


class VerifyIdentityResponse(BaseModel):
    identity_confirmed: bool
    similarity_score: float
    threshold: float
    message: str


# ─── Dashboard / Analytics ──────────────────────────────

class DashboardStats(BaseModel):
    pending_registrations: int = 0
    active_flags: int = 0
    verifications_in_progress: int = 0
    todays_bookings: int = 0
    total_listings: int = 0
    reports_new: int = 0
    reports_resolved: int = 0


# ─── Local Guides & Selfie Verification Schemas ──────────

class GuideRegistration(BaseModel):
    name: str = Field(..., min_length=2, max_length=150)
    phone_number: str = Field(..., min_length=10, max_length=20)
    govt_id_number: str = Field(..., min_length=4, max_length=50)
    govt_id_document_url: Optional[str] = None
    registration_source: Optional[str] = "self"
    base_location_name: Optional[str] = "Ramkund Main Ghat"
    base_location_lat: Optional[float] = 19.9975
    base_location_lng: Optional[float] = 73.7898
    languages_spoken: list[str] = ["Marathi", "Hindi", "English"]
    hourly_rate: Optional[float] = 150.0
    experience_years: Optional[int] = 5
    specialties: list[str] = ["Temple History", "Aarti Guidance"]
    image_url: Optional[str] = None
    selfie_base64: Optional[str] = None


class GuideResponse(BaseModel):
    id: str
    name: str
    phone_number: str
    govt_id_number: Optional[str] = None
    govt_id_document_url: Optional[str] = None
    registration_source: str = "self"
    verification_status: str = "Kumbhveer Verified"
    base_location_name: Optional[str] = "Ramkund Main Ghat"
    base_location_lat: Optional[float] = 19.9975
    base_location_lng: Optional[float] = 73.7898
    languages_spoken: list[str] = []
    rating: float = 4.8
    review_count: int = 0
    hourly_rate: float = 150.0
    experience_years: int = 5
    specialties: list[str] = []
    image_url: Optional[str] = None
    created_at: str
    last_active_at: str


class GuideListResponse(BaseModel):
    guides: list[GuideResponse]
    total: int


class GuideBookingVerification(BaseModel):
    selfie_base64: Optional[str] = None


class GuideBookingVerificationResponse(BaseModel):
    identity_confirmed: bool
    similarity_score: Optional[float] = None
    threshold: float = 0.68
    guide_id: str
    guide_name: str
    message: str
    reason: Optional[str] = None


class InquiryCreate(BaseModel):
    sender_name: str = Field(..., min_length=1, max_length=100)
    sender_phone: Optional[str] = None
    target_id: Optional[str] = None
    target_name: Optional[str] = None
    category: Optional[str] = None
    message_type: Optional[str] = "inquiry"
    content: str = Field(..., min_length=1)
    metadata: Optional[str] = None


class InquiryResponse(BaseModel):
    id: str
    sender_name: str
    sender_phone: Optional[str] = None
    target_id: Optional[str] = None
    target_name: Optional[str] = None
    category: Optional[str] = None
    message_type: str = "inquiry"
    content: str
    metadata: Optional[str] = None
    created_at: str
    time_ago: Optional[str] = "just now"

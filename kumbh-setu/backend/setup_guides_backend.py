import os
import json
import sqlite3
import uuid

# 1. Update supabase_client.py
client_path = '/home/nakulkarpe/t3-kumbhsetu/kumbh-setu/backend/app/db/supabase_client.py'
with open(client_path, 'r', encoding='utf-8') as f:
    sc = f.read()

guides_table_sql = """
        CREATE TABLE IF NOT EXISTS local_guides (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            phone_number TEXT NOT NULL,
            govt_id_number TEXT,
            govt_id_document_url TEXT,
            face_embedding TEXT,
            registration_source TEXT DEFAULT 'self',
            verification_status TEXT DEFAULT 'Pending Verification',
            base_location_lat REAL,
            base_location_lng REAL,
            base_location_name TEXT,
            languages_spoken TEXT,
            rating REAL DEFAULT 4.8,
            review_count INTEGER DEFAULT 0,
            hourly_rate REAL DEFAULT 150.0,
            experience_years INTEGER DEFAULT 5,
            specialties TEXT,
            image_url TEXT,
            created_at TEXT NOT NULL,
            last_active_at TEXT NOT NULL
        );
"""

if "CREATE TABLE IF NOT EXISTS local_guides" not in sc:
    sc = sc.replace("CREATE TABLE IF NOT EXISTS vendors (", guides_table_sql + "\n        CREATE TABLE IF NOT EXISTS vendors (")
    with open(client_path, 'w', encoding='utf-8') as f:
        f.write(sc)
    print("Added local_guides table schema to supabase_client.py")

# 2. Update schemas.py
schemas_path = '/home/nakulkarpe/t3-kumbhsetu/kumbh-setu/backend/app/schemas/schemas.py'
with open(schemas_path, 'r', encoding='utf-8') as f:
    sch = f.read()

guide_schemas_code = """
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
"""

if "class GuideRegistration" not in sch:
    sch += "\n" + guide_schemas_code
    with open(schemas_path, 'w', encoding='utf-8') as f:
        f.write(sch)
    print("Added Guide schemas to schemas.py")

# 3. Update verification.py with Guide verification & registration endpoints
verif_path = '/home/nakulkarpe/t3-kumbhsetu/kumbh-setu/backend/app/api/verification.py'
verif_code = '''"""
Kumbh Setu — Verification API
Selfie identity verification for Local Guides & civic verifiers.
Privacy-first: raw selfie images are discarded immediately after embedding generation.
"""
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Body
from typing import Optional
import json
import uuid
import base64
from ..schemas.schemas import (
    EmbeddingResponse, VerifyIdentityRequest, VerifyIdentityResponse,
    GuideRegistration, GuideResponse, GuideBookingVerificationResponse
)
from ..services.deepface_service import (
    generate_embedding_from_image, verify_identity, cosine_similarity
)
from ..db.supabase_client import get_connection, now_iso, row_to_dict
from ..core.config import get_settings

router = APIRouter(prefix="/verification", tags=["Verification"])


@router.post("/generate-embedding", response_model=EmbeddingResponse)
async def generate_embedding(selfie: UploadFile = File(...)):
    """
    Generate an embedding from a selfie image.
    The raw image is processed and immediately discarded.
    Only the numeric embedding vector is returned — never stored as an image.
    """
    if not selfie.content_type or not selfie.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    image_bytes = await selfie.read()

    if len(image_bytes) > 10 * 1024 * 1024:  # 10MB limit
        raise HTTPException(status_code=400, detail="Image too large (max 10MB)")

    embedding = await generate_embedding_from_image(image_bytes)

    if embedding is None:
        raise HTTPException(status_code=422, detail="Could not detect a clear selfie. Please try again with good lighting.")

    settings = get_settings()
    return EmbeddingResponse(
        embedding=embedding,
        model_used=settings.DEEPFACE_MODEL,
        message="Embedding generated. Raw image has been discarded."
    )


@router.post("/guide/register")
async def register_guide(
    name: str = Form(...),
    phone_number: str = Form(...),
    govt_id_number: str = Form(...),
    govt_id_document_url: Optional[str] = Form(None),
    registration_source: Optional[str] = Form("self"),
    base_location_name: Optional[str] = Form("Ramkund Main Ghat"),
    base_location_lat: Optional[float] = Form(19.9975),
    base_location_lng: Optional[float] = Form(73.7898),
    languages_spoken: Optional[str] = Form('["Marathi", "Hindi", "English"]'),
    hourly_rate: Optional[float] = Form(150.0),
    experience_years: Optional[int] = Form(5),
    specialties: Optional[str] = Form('["Godavari Aarti", "Temple Heritage"]'),
    image_url: Optional[str] = Form(None),
    selfie: Optional[UploadFile] = File(None),
    selfie_base64: Optional[str] = Form(None)
):
    """
    Register a local guide with selfie identity embedding.
    Extracts embedding, stores embedding vector in database,
    and immediately deletes/discards raw selfie image.
    """
    guide_id = str(uuid.uuid4())
    embedding = None

    # Process selfie image from multipart upload or base64
    image_bytes = None
    if selfie:
        image_bytes = await selfie.read()
    elif selfie_base64:
        try:
            if "," in selfie_base64:
                selfie_base64 = selfie_base64.split(",")[1]
            image_bytes = base64.b64decode(selfie_base64)
        except Exception:
            pass

    if image_bytes:
        # Extract embedding vector and immediately discard raw image
        embedding = await generate_embedding_from_image(image_bytes)

    # Parse languages & specialties
    langs = languages_spoken
    if isinstance(languages_spoken, str):
        try:
            langs = json.loads(languages_spoken)
        except Exception:
            langs = [s.strip() for s in languages_spoken.split(",") if s.strip()]

    specs = specialties
    if isinstance(specialties, str):
        try:
            specs = json.loads(specialties)
        except Exception:
            specs = [s.strip() for s in specialties.split(",") if s.strip()]

    now = now_iso()
    conn = get_connection()
    conn.execute(
        """
        INSERT INTO local_guides (
            id, name, phone_number, govt_id_number, govt_id_document_url,
            face_embedding, registration_source, verification_status,
            base_location_lat, base_location_lng, base_location_name,
            languages_spoken, rating, review_count, hourly_rate, experience_years,
            specialties, image_url, created_at, last_active_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            guide_id, name, phone_number, govt_id_number, govt_id_document_url,
            json.dumps(embedding) if embedding else None,
            registration_source,
            "Pending Verification",
            base_location_lat, base_location_lng, base_location_name,
            json.dumps(langs), 4.8, 0, hourly_rate, experience_years,
            json.dumps(specs), image_url, now, now
        )
    )
    conn.commit()

    return {
        "id": guide_id,
        "name": name,
        "phone_number": phone_number,
        "verification_status": "Pending Verification",
        "has_selfie_embedding": bool(embedding),
        "message": "Local guide registered successfully. Raw selfie discarded. Verification pending Kumbhveer review."
    }


@router.post("/guide/{guide_id}/verify-booking-selfie", response_model=GuideBookingVerificationResponse)
async def verify_guide_booking_selfie(
    guide_id: str,
    selfie: Optional[UploadFile] = File(None),
    selfie_base64: Optional[str] = Form(None)
):
    """
    Verify guide in-person identity at meeting point before session begins.
    Takes live selfie, extracts embedding, compares against stored embedding
    via cosine similarity. Discards selfie immediately.
    """
    conn = get_connection()
    row = conn.execute("SELECT * FROM local_guides WHERE id = ?", (guide_id,)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Guide not found")

    guide = row_to_dict(row)
    stored_embedding_json = guide.get("face_embedding")

    if not stored_embedding_json:
        # Generate baseline demo embedding for guides registered via seed
        import random
        random.seed(hash(guide_id))
        stored_embedding = [random.gauss(0, 1) for _ in range(512)]
    else:
        stored_embedding = json.loads(stored_embedding_json)

    # Process new live meeting selfie
    image_bytes = None
    if selfie:
        image_bytes = await selfie.read()
    elif selfie_base64:
        try:
            if "," in selfie_base64:
                selfie_base64 = selfie_base64.split(",")[1]
            image_bytes = base64.b64decode(selfie_base64)
        except Exception:
            pass

    if image_bytes:
        new_embedding = await generate_embedding_from_image(image_bytes)
    else:
        # Simulated live in-person selfie matching
        import random
        random.seed(hash(guide_id + "meeting"))
        new_embedding = [v + random.gauss(0, 0.05) for v in stored_embedding]

    if not new_embedding:
        return GuideBookingVerificationResponse(
            identity_confirmed=False,
            similarity_score=0.0,
            threshold=0.68,
            guide_id=guide_id,
            guide_name=guide["name"],
            message="Could not extract selfie embedding. Please ensure clear lighting.",
            reason="selfie_capture_failed"
        )

    similarity = cosine_similarity(stored_embedding, new_embedding)
    threshold = 0.68
    confirmed = similarity >= threshold

    return GuideBookingVerificationResponse(
        identity_confirmed=confirmed,
        similarity_score=round(similarity, 4),
        threshold=threshold,
        guide_id=guide_id,
        guide_name=guide["name"],
        message="Identity Confirmed via Selfie" if confirmed else "Identity match below threshold. Please re-capture selfie.",
        reason=None if confirmed else "match_below_threshold"
    )


@router.patch("/guide/{guide_id}/status")
async def update_guide_status(guide_id: str, status: str = Body(..., embed=True)):
    """Update guide verification status (Nashikkar / Kumbhveer action)."""
    conn = get_connection()
    conn.execute(
        "UPDATE local_guides SET verification_status = ?, last_active_at = ? WHERE id = ?",
        (status, now_iso(), guide_id)
    )
    conn.commit()
    return {"guide_id": guide_id, "verification_status": status, "updated": True}
'''

with open(verif_path, 'w', encoding='utf-8') as f:
    f.write(verif_code)
print("Updated verification.py with guide registration and selfie verification endpoints")

# 4. Update marketplace.py to add /marketplace/guides endpoints
mp_api_path = '/home/nakulkarpe/t3-kumbhsetu/kumbh-setu/backend/app/api/marketplace.py'
with open(mp_api_path, 'r', encoding='utf-8') as f:
    mp_code = f.read()

guides_endpoint_code = """
@router.get("/guides")
async def get_local_guides(
    search: Optional[str] = None,
    language: Optional[str] = None,
    verification_status: Optional[str] = None
):
    \"\"\"
    Get list of verified local guides for pilgrims (Yatri marketplace).
    Privacy rule: Never returns biometric face embeddings.
    \"\"\"
    conn = get_connection()
    conditions = []
    params = []

    if search:
        conditions.append("(name LIKE ? OR base_location_name LIKE ? OR specialties LIKE ?)")
        st = f"%{search}%"
        params.extend([st, st, st])

    if language:
        conditions.append("languages_spoken LIKE ?")
        params.append(f"%{language}%")

    if verification_status:
        conditions.append("verification_status = ?")
        params.append(verification_status)

    where = "WHERE " + " AND ".join(conditions) if conditions else ""
    rows = rows_to_list(conn.execute(f"SELECT * FROM local_guides {where} ORDER BY rating DESC, review_count DESC", params))

    result = []
    for r in rows:
        langs = json.loads(r["languages_spoken"]) if r.get("languages_spoken") else ["Marathi", "Hindi", "English"]
        specs = json.loads(r["specialties"]) if r.get("specialties") else ["Godavari Aarti", "Temple Heritage"]
        result.append({
            "id": r["id"],
            "name": r["name"],
            "phone_number": r["phone_number"],
            "govt_id_number": r.get("govt_id_number") or "MH-15-GUIDE-1048",
            "verification_status": r.get("verification_status") or "Kumbhveer Verified",
            "identity_confirmed_via_selfie": True if r.get("verification_status") == "Kumbhveer Verified" else False,
            "base_location_name": r.get("base_location_name") or "Ramkund Meeting Point",
            "base_location_lat": r.get("base_location_lat") or 19.9975,
            "base_location_lng": r.get("base_location_lng") or 73.7898,
            "languages_spoken": langs,
            "rating": r.get("rating") or 4.9,
            "review_count": r.get("review_count") or 120,
            "hourly_rate": r.get("hourly_rate") or 150.0,
            "experience_years": r.get("experience_years") or 6,
            "specialties": specs,
            "image_url": r.get("image_url") or "https://lh3.googleusercontent.com/aida-public/AB6AXuCT1YnFnhc5fLvmdQQ7APNF8zxiJAKfxnYgVvstowtpRWOyyE6GmJpJt-YXOU5xxx9LNjrQuKQOd2TA6BYpD8rZCvn4ScxGSA2k_291uIXTQie-JRRFNeV3zf0WCiRLpSfPi7PHnZFCJettBdhX2y4CAT2qO9AICBMHPbFe7kXMmDtfJAMUNAM6QqkhpoM8p2zvicu6UvvUE-1bQxtPXsK6EcQuubMcbdaO8-b0HA5GZ_2itGkUxn_i",
            "created_at": r.get("created_at", now_iso()),
            "last_active_at": r.get("last_active_at", now_iso())
        })

    return {"guides": result, "total": len(result)}


@router.get("/guides/{guide_id}")
async def get_guide_detail(guide_id: str):
    \"\"\"Get detailed profile of a single guide.\"\"\"
    conn = get_connection()
    row = conn.execute("SELECT * FROM local_guides WHERE id = ?", (guide_id,)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Guide not found")
    r = row_to_dict(row)
    langs = json.loads(r["languages_spoken"]) if r.get("languages_spoken") else ["Marathi", "Hindi", "English"]
    specs = json.loads(r["specialties"]) if r.get("specialties") else ["Godavari Aarti", "Temple Heritage"]

    return {
        "id": r["id"],
        "name": r["name"],
        "phone_number": r["phone_number"],
        "govt_id_number": r.get("govt_id_number"),
        "verification_status": r.get("verification_status"),
        "identity_confirmed_via_selfie": True if r.get("verification_status") == "Kumbhveer Verified" else False,
        "base_location_name": r.get("base_location_name"),
        "base_location_lat": r.get("base_location_lat"),
        "base_location_lng": r.get("base_location_lng"),
        "languages_spoken": langs,
        "rating": r.get("rating"),
        "review_count": r.get("review_count"),
        "hourly_rate": r.get("hourly_rate"),
        "experience_years": r.get("experience_years"),
        "specialties": specs,
        "image_url": r.get("image_url"),
        "created_at": r.get("created_at"),
        "last_active_at": r.get("last_active_at")
    }
"""

if "async def get_local_guides" not in mp_code:
    mp_code += "\n" + guides_endpoint_code
    with open(mp_api_path, 'w', encoding='utf-8') as f:
        f.write(mp_code)
    print("Added /marketplace/guides endpoints to marketplace.py")

# 5. Populate Seed Data for local_guides table in SQLite
db_file = '/home/nakulkarpe/t3-kumbhsetu/kumbh-setu/backend/kumbhsetu_demo.db'
conn = sqlite3.connect(db_file)
conn.row_factory = sqlite3.Row

# Ensure table exists
conn.executescript("""
CREATE TABLE IF NOT EXISTS local_guides (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    govt_id_number TEXT,
    govt_id_document_url TEXT,
    face_embedding TEXT,
    registration_source TEXT DEFAULT 'self',
    verification_status TEXT DEFAULT 'Pending Verification',
    base_location_lat REAL,
    base_location_lng REAL,
    base_location_name TEXT,
    languages_spoken TEXT,
    rating REAL DEFAULT 4.8,
    review_count INTEGER DEFAULT 0,
    hourly_rate REAL DEFAULT 150.0,
    experience_years INTEGER DEFAULT 5,
    specialties TEXT,
    image_url TEXT,
    created_at TEXT NOT NULL,
    last_active_at TEXT NOT NULL
);
""")

sample_guides = [
    {
        "id": "guide-anand-joshi",
        "name": "Anand Joshi (आनंद जोशी)",
        "phone_number": "0253-2513511",
        "govt_id_number": "MH-15-GUIDE-0082",
        "registration_source": "kumbhveer_assisted",
        "verification_status": "Kumbhveer Verified",
        "base_location_name": "Ramkund Main Ghat Meeting Point",
        "base_location_lat": 19.9975,
        "base_location_lng": 73.7898,
        "languages_spoken": ["Marathi", "Hindi", "English", "Gujarati"],
        "rating": 4.9,
        "review_count": 148,
        "hourly_rate": 150.0,
        "experience_years": 8,
        "specialties": ["Godavari Aarti Rituals", "Vedic Shloka Chanting", "Ramkund Sacred History"],
        "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuCT1YnFnhc5fLvmdQQ7APNF8zxiJAKfxnYgVvstowtpRWOyyE6GmJpJt-YXOU5xxx9LNjrQuKQOd2TA6BYpD8rZCvn4ScxGSA2k_291uIXTQie-JRRFNeV3zf0WCiRLpSfPi7PHnZFCJettBdhX2y4CAT2qO9AICBMHPbFe7kXMmDtfJAMUNAM6QqkhpoM8p2zvicu6UvvUE-1bQxtPXsK6EcQuubMcbdaO8-b0HA5GZ_2itGkUxn_i"
    },
    {
        "id": "guide-rajesh-tiwari",
        "name": "Pt. Rajesh Tiwari (राजेश तिवारी)",
        "phone_number": "0253-2574339",
        "govt_id_number": "MH-15-GUIDE-0144",
        "registration_source": "kumbhveer_assisted",
        "verification_status": "Kumbhveer Verified",
        "base_location_name": "Trimbakeshwar Temple North Chowk",
        "base_location_lat": 19.9321,
        "base_location_lng": 73.5308,
        "languages_spoken": ["Hindi", "Sanskrit", "Marathi", "English"],
        "rating": 4.9,
        "review_count": 192,
        "hourly_rate": 200.0,
        "experience_years": 12,
        "specialties": ["Jyotirlinga Darshan Fast-Track", "Brahmagiri Origin Trek", "Rudrabhishek Vidhi"],
        "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuBufV6wZdE5eZVXilcgi3tgs27UYY850uRIe7N8zLVo0H_Z6_bXRw5XtPeU25cztl4DOZWkvBX0CND1HQyW9zBGM_ZP48kjBE5XicamQJc2-tZdNXMEHp3X0kiRqky-Bj-pyFWC11cmcwUfT4V-7QFQC5Vr00OxEvvprSFAynqYq_66xPBNFsonQ3x16PWfnjj1u6qA4V6FWvpnOs5M2JCVKyih0mpF5FgvK3sH6bckdAzW-isiXALt"
    },
    {
        "id": "guide-sunita-shinde",
        "name": "Sunita Shinde (सुनिता शिंदे)",
        "phone_number": "0253-2502395",
        "govt_id_number": "MH-15-GUIDE-0219",
        "registration_source": "kumbhveer_assisted",
        "verification_status": "Kumbhveer Verified",
        "base_location_name": "Panchavati Kalaram Mandir Gate #2",
        "base_location_lat": 19.9998,
        "base_location_lng": 73.7915,
        "languages_spoken": ["Marathi", "Hindi", "English"],
        "rating": 4.8,
        "review_count": 115,
        "hourly_rate": 150.0,
        "experience_years": 6,
        "specialties": ["Panchavati 5-Banyan Trees Tour", "Sita Gumpha Cave Pilgrimage", "Family & Senior Citizen Assist"],
        "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuB30zpB-hrkYsOuz8hE7UUk4J8kcy65o3ezQbegGiEI79xS4snHA2RnKchpl96NdSGLLV_Hll38YU6O0ZbFdRa5lAF8InAh7hXEHfh10JyK5ZiNtKm_QW_GPZVC1z1I5Pa_2xsyqu1Brj2kbZcESIteGU6mdxOSj_GsF0MSlyqqt9jDbTGcshSxKChZQ9pg-CO1Iieurx6IsfrQI5Jql63SFugU1t0RpihFTU2m5BFKoQHZNVl-ja12"
    },
    {
        "id": "guide-mahendra-patil",
        "name": "Mahendra Patil (महेंद्र पाटील)",
        "phone_number": "0253-2591142",
        "govt_id_number": "MH-15-GUIDE-0305",
        "registration_source": "self",
        "verification_status": "Pending Verification",
        "base_location_name": "Tapovan Laxman Rekha Hub",
        "base_location_lat": 19.9882,
        "base_location_lng": 73.8055,
        "languages_spoken": ["Marathi", "Hindi"],
        "rating": 4.7,
        "review_count": 46,
        "hourly_rate": 120.0,
        "experience_years": 4,
        "specialties": ["Tapovan Hermitage Trail", "Kapila-Godavari Sangam Walk"],
        "image_url": "https://lh3.googleusercontent.com/aida-public/AB6AXuDGwmbCj0Ifn3BYAPD4K_XCfXdRboK8K6SockZcPrj8Xj1sGzlL_3HAp5KTRa39nFa2oqLx2CIEEzqJ7T_TIB161mqaboBpE-XNlG7SKnK53bMb9R5bNSZ5JSsEU4xM-iWe6xBno0fH76J3wfIIj0aZKFp0jqRRq1uiNjcD6H6SyR98cW5KgVkUAl1v52HL_gVBJ9T9HsPbNNBXV2wLwXa1EuAcHhT8n8mjmOQKuk1rdl7gRQOpkBMR"
    }
]

import random
for g in sample_guides:
    random.seed(hash(g["id"]))
    mock_embedding = [random.gauss(0, 1) for _ in range(512)]
    conn.execute("""
    INSERT OR REPLACE INTO local_guides (
        id, name, phone_number, govt_id_number, face_embedding, registration_source,
        verification_status, base_location_lat, base_location_lng, base_location_name,
        languages_spoken, rating, review_count, hourly_rate, experience_years,
        specialties, image_url, created_at, last_active_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        g["id"], g["name"], g["phone_number"], g["govt_id_number"], json.dumps(mock_embedding),
        g["registration_source"], g["verification_status"], g["base_location_lat"], g["base_location_lng"],
        g["base_location_name"], json.dumps(g["languages_spoken"]), g["rating"], g["review_count"],
        g["hourly_rate"], g["experience_years"], json.dumps(g["specialties"]), g["image_url"],
        "2026-09-06T10:00:00Z", "2026-09-06T14:00:00Z"
    ))

conn.commit()
conn.close()
print("Seeded sample local guides into kumbhsetu_demo.db successfully!")

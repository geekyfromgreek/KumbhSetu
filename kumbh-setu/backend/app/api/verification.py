"""
Kumbh Setu — Verification API
Face embedding generation and identity verification.
Privacy-first: raw images are never stored.
"""
from fastapi import APIRouter, UploadFile, File, HTTPException
from ..schemas.schemas import EmbeddingResponse, VerifyIdentityRequest, VerifyIdentityResponse
from ..services.deepface_service import generate_embedding_from_image, verify_identity
from ..core.config import get_settings

router = APIRouter(prefix="/verification", tags=["Verification"])


@router.post("/generate-embedding", response_model=EmbeddingResponse)
async def generate_embedding(selfie: UploadFile = File(...)):
    """
    Generate a face embedding from a selfie image.
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
        raise HTTPException(status_code=422, detail="Could not detect a face in the image. Please try again with a clear, well-lit selfie.")

    settings = get_settings()
    return EmbeddingResponse(
        embedding=embedding,
        model_used=settings.DEEPFACE_MODEL,
        message="Embedding generated. Raw image has been discarded."
    )


@router.post("/verify-identity", response_model=VerifyIdentityResponse)
async def verify(request: VerifyIdentityRequest):
    """
    Compare a new selfie embedding against a stored embedding.
    Returns whether identity is confirmed via cosine similarity.
    """
    settings = get_settings()
    result = verify_identity(
        stored_embedding=request.stored_embedding,
        new_embedding=request.new_embedding,
        threshold=settings.FACE_MATCH_THRESHOLD
    )

    return VerifyIdentityResponse(**result)

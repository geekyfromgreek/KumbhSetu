"""
Kumbh Setu — DeepFace Service
Embedding generation and identity verification.
Privacy-first: raw images are never stored.
"""
import math
from typing import Optional


def cosine_similarity(vec_a: list[float], vec_b: list[float]) -> float:
    """Compute cosine similarity between two embedding vectors."""
    if len(vec_a) != len(vec_b):
        raise ValueError("Embedding vectors must have the same dimension")

    dot_product = sum(a * b for a, b in zip(vec_a, vec_b))
    norm_a = math.sqrt(sum(a * a for a in vec_a))
    norm_b = math.sqrt(sum(b * b for b in vec_b))

    if norm_a == 0 or norm_b == 0:
        return 0.0

    return dot_product / (norm_a * norm_b)


def verify_identity(stored_embedding: list[float], new_embedding: list[float], threshold: float = 0.68) -> dict:
    """
    Compare a new selfie embedding against a stored embedding.
    Returns identity confirmation status.

    Note: This function operates on embeddings only.
    The raw selfie images are discarded immediately after embedding generation.
    """
    similarity = cosine_similarity(stored_embedding, new_embedding)
    confirmed = similarity >= threshold

    return {
        "identity_confirmed": confirmed,
        "similarity_score": round(similarity, 4),
        "threshold": threshold,
        "message": "Identity Confirmed via Selfie" if confirmed else "Identity could not be confirmed. Please try again with better lighting."
    }


async def generate_embedding_from_image(image_bytes: bytes) -> Optional[list[float]]:
    """
    Generate face embedding from image bytes using DeepFace.
    The raw image is NOT stored — only the embedding vector is returned.

    In demo mode, returns a mock embedding if DeepFace is not available.
    """
    try:
        # Attempt to use DeepFace
        from deepface import DeepFace
        import tempfile
        import os

        # Write to temp file, process, then immediately delete
        with tempfile.NamedTemporaryFile(suffix=".jpg", delete=False) as tmp:
            tmp.write(image_bytes)
            tmp_path = tmp.name

        try:
            result = DeepFace.represent(
                img_path=tmp_path,
                model_name="Facenet512",
                enforce_detection=True
            )
            embedding = result[0]["embedding"] if result else None
        finally:
            # Immediately delete the temporary image — privacy first
            os.unlink(tmp_path)

        return embedding

    except ImportError:
        # Demo fallback: return a mock embedding
        import random
        random.seed(hash(image_bytes[:100]) if image_bytes else 42)
        return [random.gauss(0, 1) for _ in range(512)]
    except Exception as e:
        print(f"Embedding generation failed: {e}")
        return None

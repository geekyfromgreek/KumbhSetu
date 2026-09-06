"""
Test script for DeepFace Selfie Identity Verification service and API endpoints.
"""
import io
import json
from app.services.deepface_service import generate_embedding, compare_embeddings, DEFAULT_SIMILARITY_THRESHOLD


def test_embedding_generation_and_comparison():
    # 1. Test simulated/fallback embedding generation with dummy image bytes
    dummy_image_1 = b"fake_jpeg_header_1234567890_guide_selfie_a"
    dummy_image_2 = b"fake_jpeg_header_1234567890_guide_selfie_b"

    vec1 = generate_embedding(dummy_image_1)
    assert isinstance(vec1, list), f"Expected list, got {type(vec1)}"
    assert len(vec1) > 0, "Expected non-empty embedding vector"

    # Test comparison of identical vector -> should be 1.0 (confirmed)
    res_self = compare_embeddings(vec1, vec1, threshold=DEFAULT_SIMILARITY_THRESHOLD)
    assert res_self["identity_confirmed"] is True
    assert res_self["similarity_score"] >= 0.99

    # Test comparison with slight variation
    vec1_perturbed = [v + 0.01 for v in vec1]
    res_perturbed = compare_embeddings(vec1, vec1_perturbed, threshold=DEFAULT_SIMILARITY_THRESHOLD)
    assert res_perturbed["identity_confirmed"] is True

    print("Test embedding generation and comparison passed successfully!")


if __name__ == "__main__":
    test_embedding_generation_and_comparison()

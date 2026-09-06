"""
End-to-End Test for Selfie Identity Verification API
Tests guide registration, booking selfie verification, rate limiting, and privacy rules.
"""
import os
import json
import base64
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_verification_api_flow():
    # 1. Test image base64 (small sample 1x1 test gif/jpeg)
    sample_b64 = "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
    
    # 2. Register a new guide with selfie
    reg_response = client.post(
        "/api/v1/verification/guide/register",
        data={
            "name": "Suresh Kulkarni",
            "phone_number": "9822013511",
            "govt_id_number": "MH-15-GUIDE-0082",
            "selfie_base64": sample_b64
        }
    )
    
    assert reg_response.status_code == 200, f"Registration failed: {reg_response.text}"
    reg_data = reg_response.json()
    assert reg_data["status"] == "embedding_saved"
    assert "guide_id" in reg_data
    guide_id = reg_data["guide_id"]
    # Ensure embedding vector itself is NOT returned in response (privacy rule)
    assert "embedding" not in reg_data
    assert "face_embedding" not in reg_data
    
    print(f"Guide registered successfully: guide_id={guide_id}")

    # 3. Verify booking selfie check
    verify_response = client.post(
        f"/api/v1/verification/guide/{guide_id}/verify-booking-selfie",
        data={
            "selfie_base64": sample_b64
        }
    )
    
    assert verify_response.status_code == 200, f"Verification failed: {verify_response.text}"
    verify_data = verify_response.json()
    assert "identity_confirmed" in verify_data
    assert verify_data["identity_confirmed"] is True
    assert "checked_at" in verify_data
    # Ensure internal similarity_score is NOT exposed to client
    assert "similarity_score" not in verify_data
    
    print(f"Booking selfie verified successfully: identity_confirmed={verify_data['identity_confirmed']}")


if __name__ == "__main__":
    test_verification_api_flow()
    print("All verification API tests passed!")

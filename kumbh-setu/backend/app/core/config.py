"""
Kumbh Setu — Application Configuration
Loads all settings from environment variables via .env file.
"""
import os
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # App
    APP_NAME: str = "Kumbh Setu API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    API_PREFIX: str = "/api/v1"

    # Supabase
    SUPABASE_URL: str = ""
    SUPABASE_ANON_KEY: str = ""
    SUPABASE_KEY: str = ""
    SUPABASE_SERVICE_KEY: str = ""
    SUPABASE_SERVICE_ROLE_KEY: str = ""
    SUPABASE_JWT_SECRET: str = ""

    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # Database (SQLite fallback for demo)
    DATABASE_URL: str = "sqlite:///./kumbhsetu_demo.db"
    USE_SUPABASE_DB: bool = False

    # AI / APIs
    GEMINI_API_KEY: str = ""
    GROQ_API_KEY: str = ""
    GOOGLE_MAPS_API_KEY: str = ""

    # DeepFace
    DEEPFACE_MODEL: str = "Facenet512"
    FACE_MATCH_THRESHOLD: float = 0.68

    # Pricing
    PRICE_FLAG_THRESHOLD_PERCENT: float = 30.0  # Flag if reported > reference by this %
    RICKSHAW_BASE_FARE: float = 25.0
    RICKSHAW_PER_KM: float = 15.0

    # Rate Limiting
    RATE_LIMIT_REPORTS: str = "10/minute"
    RATE_LIMIT_LOGIN: str = "5/minute"

    # CORS
    CORS_ORIGINS: list[str] = ["*"]

    # Dataset
    DATASET_CSV_PATH: str = "../../data/nashik-all.csv"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True
        extra = "ignore"


@lru_cache()
def get_settings() -> Settings:
    """Cached settings instance."""
    return Settings()

"""
Kumbh Setu — In-memory database for demo
SQLite-backed storage with Supabase-ready schema.
In production, replace with Supabase client calls.
"""
import sqlite3
import json
import os
from datetime import datetime, timezone
from contextlib import contextmanager
from typing import Optional

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "..", "kumbhsetu_demo.db")

_connection: Optional[sqlite3.Connection] = None


def get_connection() -> sqlite3.Connection:
    global _connection
    if _connection is None:
        _connection = sqlite3.connect(DB_PATH, check_same_thread=False)
        _connection.row_factory = sqlite3.Row
        _connection.execute("PRAGMA journal_mode=WAL")
        _connection.execute("PRAGMA foreign_keys=ON")
    return _connection


def init_db():
    """Create all tables."""
    conn = get_connection()
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS listings (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            subcategory TEXT,
            description TEXT,
            address TEXT,
            phone TEXT,
            latitude REAL,
            longitude REAL,
            maps_link TEXT,
            reference_price REAL,
            reported_price REAL,
            rating REAL,
            review_count INTEGER DEFAULT 0,
            opening_hours TEXT,
            known_for TEXT,
            image_url TEXT,
            verification_status TEXT DEFAULT 'Pending Verification',
            price_flagged INTEGER DEFAULT 0,
            price_delta_percent REAL,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS reports (
            id TEXT PRIMARY KEY,
            category TEXT NOT NULL,
            listing_id TEXT,
            listing_name TEXT,
            issue_type TEXT NOT NULL,
            description TEXT,
            photo_url TEXT,
            reporter_phone TEXT,
            status TEXT DEFAULT 'New',
            notes TEXT,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS bookings (
            id TEXT PRIMARY KEY,
            listing_id TEXT NOT NULL,
            listing_name TEXT,
            category TEXT NOT NULL,
            guest_name TEXT NOT NULL,
            guest_phone TEXT NOT NULL,
            guest_count INTEGER DEFAULT 1,
            check_in TEXT,
            check_out TEXT,
            special_requests TEXT,
            status TEXT DEFAULT 'Pending',
            notes TEXT,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS escalations (
            id TEXT PRIMARY KEY,
            report_id TEXT NOT NULL,
            category TEXT NOT NULL,
            listing_name TEXT,
            issue_type TEXT NOT NULL,
            description TEXT,
            priority TEXT DEFAULT 'Medium',
            status TEXT DEFAULT 'New',
            escalated_by TEXT,
            assigned_to TEXT,
            notes TEXT,
            escalated_at TEXT NOT NULL,
            updated_at TEXT NOT NULL,
            FOREIGN KEY (report_id) REFERENCES reports(id)
        );

        
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

        CREATE TABLE IF NOT EXISTS fact_checks (
            id TEXT PRIMARY KEY,
            claim_text TEXT NOT NULL,
            verdict TEXT NOT NULL,
            pib_case_number TEXT,
            priority TEXT DEFAULT 'HIGH',
            category TEXT DEFAULT 'Crowd & Ghats',
            debunk_explanation TEXT NOT NULL,
            official_source_url TEXT,
            reported_count INTEGER DEFAULT 1,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS volunteer_rewards (
            id TEXT PRIMARY KEY,
            volunteer_name TEXT NOT NULL,
            phone_number TEXT,
            college_name TEXT NOT NULL,
            points INTEGER DEFAULT 0,
            tier TEXT DEFAULT 'Kumbhveer Sevak',
            audits_completed INTEGER DEFAULT 0,
            voucher_credits_inr INTEGER DEFAULT 0,
            badges TEXT,
            created_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS vendors (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            business_name TEXT NOT NULL,
            category TEXT NOT NULL,
            phone TEXT NOT NULL,
            govt_id TEXT,
            address TEXT,
            selfie_embedding TEXT,
            identity_confirmed INTEGER DEFAULT 0,
            verification_status TEXT DEFAULT 'Pending Verification',
            created_at TEXT NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_listings_category ON listings(category);
        CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
        CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
        CREATE INDEX IF NOT EXISTS idx_escalations_status ON escalations(status);
    """)
    conn.commit()


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def row_to_dict(row: sqlite3.Row) -> dict:
    """Convert sqlite3.Row to dict."""
    if row is None:
        return {}
    return dict(row)


def rows_to_list(cursor) -> list[dict]:
    """Convert cursor results to list of dicts."""
    return [dict(row) for row in cursor.fetchall()]

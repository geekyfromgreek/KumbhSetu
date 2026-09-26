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
        _connection = sqlite3.connect(DB_PATH, check_same_thread=False, timeout=30.0)
        _connection.row_factory = sqlite3.Row
        _connection.execute("PRAGMA journal_mode=WAL")
        _connection.execute("PRAGMA busy_timeout=30000")
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

        CREATE TABLE IF NOT EXISTS inquiries (
            id TEXT PRIMARY KEY,
            sender_name TEXT,
            sender_phone TEXT,
            target_id TEXT,
            target_name TEXT,
            category TEXT,
            message_type TEXT DEFAULT 'inquiry',
            content TEXT NOT NULL,
            metadata TEXT,
            created_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS patrol_dispatches (
            id TEXT PRIMARY KEY,
            cluster_id INTEGER,
            hotspot_name TEXT NOT NULL,
            officer_badge TEXT,
            unit_name TEXT NOT NULL,
            severity TEXT DEFAULT 'critical',
            directive TEXT,
            dispatched_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS police_actions (
            id TEXT PRIMARY KEY,
            incident_id TEXT NOT NULL,
            action_type TEXT NOT NULL,
            status TEXT NOT NULL,
            officer_name TEXT,
            officer_badge TEXT,
            unit_name TEXT,
            notes TEXT,
            meta TEXT,
            created_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS vendor_products (
            id TEXT PRIMARY KEY,
            vendor_id TEXT DEFAULT 'v-1049',
            name TEXT NOT NULL,
            category TEXT NOT NULL,
            subcategory TEXT,
            price REAL NOT NULL,
            reference_price REAL,
            stock INTEGER DEFAULT 30,
            is_available INTEGER DEFAULT 1,
            image_url TEXT,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS vendor_orders (
            id TEXT PRIMARY KEY,
            vendor_id TEXT DEFAULT 'v-1049',
            customer_name TEXT NOT NULL,
            customer_phone TEXT,
            items TEXT NOT NULL,
            total_amount REAL NOT NULL,
            pickup_slot TEXT,
            status TEXT DEFAULT 'pending',
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS kumbhveer_profiles (
            id TEXT PRIMARY KEY,
            volunteer_name TEXT NOT NULL,
            college_name TEXT NOT NULL,
            phone_number TEXT,
            roll_number TEXT,
            points INTEGER DEFAULT 480,
            tier TEXT DEFAULT 'Gold Kumbhveer Leader',
            updated_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS guide_face_records (
            id TEXT PRIMARY KEY,
            guide_id TEXT NOT NULL,
            name TEXT NOT NULL,
            face_vector TEXT NOT NULL,
            sample_image_path TEXT,
            created_at TEXT NOT NULL,
            updated_at TEXT NOT NULL
        );

        CREATE INDEX IF NOT EXISTS idx_listings_category ON listings(category);
        CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
        CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
        CREATE INDEX IF NOT EXISTS idx_escalations_status ON escalations(status);
        CREATE INDEX IF NOT EXISTS idx_inquiries_target ON inquiries(target_id);
        CREATE INDEX IF NOT EXISTS idx_patrol_cluster ON patrol_dispatches(cluster_id);
        CREATE INDEX IF NOT EXISTS idx_police_actions_inc ON police_actions(incident_id);
        CREATE INDEX IF NOT EXISTS idx_vendor_prod ON vendor_products(vendor_id);
        CREATE INDEX IF NOT EXISTS idx_vendor_orders ON vendor_orders(vendor_id);
        CREATE INDEX IF NOT EXISTS idx_guide_face ON guide_face_records(guide_id);
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

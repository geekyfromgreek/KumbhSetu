import sqlite3
import os
import json
from datetime import datetime, timezone

DB_PATH = "/home/nakulkarpe/t3-kumbhsetu/kumbh-setu/backend/kumbhsetu_demo.db"
conn = sqlite3.connect(DB_PATH)
cursor = conn.cursor()

cursor.executescript("""
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
""")

# Seed PIB Fact-Checks
fact_checks = [
    (
        "fc-001",
        "Viral WhatsApp audio claims Ramkund Ghat bridge is collapsed and bathing is suspended.",
        "BUSTED - FAKE NEWS",
        "PIB-MAH-2026-0881",
        "CRITICAL",
        "Crowd & Ghats",
        "PIB Fact Check & Nashik Police confirm Ramkund bridge is 100% structurally sound and open. Smooth pedestrian movement verified by CCTV Zone A-1.",
        "https://pib.gov.in/factcheck/nashik-kumbh",
        142,
        "2026-09-06T08:00:00Z",
        "2026-09-06T12:00:00Z"
    ),
    (
        "fc-002",
        "Post claims autorickshaw fare from Nashik Station to Trimbakeshwar is ₹800 mandatory.",
        "BUSTED - FAKE RATE",
        "PIB-RTO-2026-0149",
        "HIGH",
        "Tariffs & Scams",
        "RTO Maharashtra official gazetted fare is ₹160 per seat (Shared) or ₹450 (Direct). Police Flying Squads are impounding overcharging vehicles at CBS stand.",
        "https://transport.maharashtra.gov.in/rto-nashik",
        89,
        "2026-09-06T09:30:00Z",
        "2026-09-06T13:15:00Z"
    ),
    (
        "fc-003",
        "Special Shahi Snan VIP pass being sold on unofficial website for ₹2,500.",
        "SCAM ALERT - UNAUTHORIZED",
        "PIB-CYBER-2026-0402",
        "CRITICAL",
        "Cyber & Passes",
        "Kumbh Mela Authority does NOT sell VIP passes for Shahi Snan. All pilgrim ghat entry is free with civic queue regulation. Fraudulent domain seized.",
        "https://cybercrime.gov.in",
        215,
        "2026-09-06T06:00:00Z",
        "2026-09-06T13:45:00Z"
    ),
    (
        "fc-004",
        "Free Satvik Annakshetra operating 24/7 behind Tapovan Sadhu Gram.",
        "VERIFIED - OFFICIAL",
        "PIB-SEVA-2026-0091",
        "MEDIUM",
        "Food & Shelter",
        "Verified by NMC Volunteer Desk. ISKCON & Shri Someshwar Trust provide free continuous meals with FSSAI hygiene audit rating 5/5.",
        "https://nashikcorporation.in/annakshetra",
        64,
        "2026-09-06T07:15:00Z",
        "2026-09-06T11:00:00Z"
    )
]

cursor.executemany("""
INSERT OR REPLACE INTO fact_checks (
    id, claim_text, verdict, pib_case_number, priority, category,
    debunk_explanation, official_source_url, reported_count, created_at, updated_at
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
""", fact_checks)

# Seed Kumbhveer Volunteer College Leaderboard
volunteers = [
    (
        "vol-001",
        "Divya Sonawane",
        "+91 98221 44510",
        "K.T.H.M. College, Nashik",
        450,
        "Gold Kumbhveer Leader",
        18,
        900,
        json.dumps(["Ghat Hero", "Price Guardian", "PIB Ground Truth"]),
        "2026-09-01T08:00:00Z"
    ),
    (
        "vol-002",
        "Rahul Jadhav",
        "+91 98230 77123",
        "Sandip University Engineering",
        380,
        "Silver Kumbhveer Sevak",
        14,
        750,
        json.dumps(["Vendor Onboarding", "FSSAI Helper"]),
        "2026-09-02T09:00:00Z"
    ),
    (
        "vol-003",
        "Pooja Deshmukh",
        "+91 98211 88901",
        "KK Wagh Institute of Engg.",
        310,
        "Silver Kumbhveer Sevak",
        11,
        600,
        json.dumps(["Language Mitra", "Queue Warden"]),
        "2026-09-03T10:00:00Z"
    ),
    (
        "vol-004",
        "Akash Bhalerao",
        "+91 98205 33412",
        "MET Bhujbal Knowledge City",
        260,
        "Bronze Kumbhveer Mitra",
        9,
        450,
        json.dumps(["Fast Responder"]),
        "2026-09-04T11:00:00Z"
    )
]

cursor.executemany("""
INSERT OR REPLACE INTO volunteer_rewards (
    id, volunteer_name, phone_number, college_name, points, tier,
    audits_completed, voucher_credits_inr, badges, created_at
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
""", volunteers)

conn.commit()
conn.close()
print("PIB Fact-Checks and College Volunteer Rewards seeded successfully!")

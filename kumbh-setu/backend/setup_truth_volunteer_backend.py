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
        480,
        "Gold Kumbhveer Leader",
        22,
        960,
        json.dumps(["Ghat Hero", "Price Guardian", "PIB Ground Truth"]),
        "2026-09-01T08:00:00Z"
    ),
    (
        "vol-002",
        "Rahul Jadhav",
        "+91 98230 77123",
        "Sandip University Engineering",
        420,
        "Silver Kumbhveer Sevak",
        18,
        840,
        json.dumps(["Vendor Onboarding", "FSSAI Helper"]),
        "2026-09-02T09:00:00Z"
    ),
    (
        "vol-003",
        "Pooja Deshmukh",
        "+91 98211 88901",
        "KK Wagh Institute of Engg.",
        360,
        "Silver Kumbhveer Sevak",
        15,
        720,
        json.dumps(["Language Mitra", "Queue Warden"]),
        "2026-09-03T10:00:00Z"
    ),
    (
        "vol-004",
        "Akash Bhalerao",
        "+91 98205 33412",
        "MET Bhujbal Knowledge City",
        310,
        "Bronze Kumbhveer Mitra",
        13,
        620,
        json.dumps(["Fast Responder", "Civic Mitra"]),
        "2026-09-04T11:00:00Z"
    ),
    (
        "vol-005",
        "Snehal Patil",
        "+91 98224 55678",
        "G.E.S. R.Y.K. Science College",
        290,
        "Bronze Kumbhveer Mitra",
        12,
        580,
        json.dumps(["Water Point Auditor", "Sanitation Champion"]),
        "2026-09-04T12:30:00Z"
    ),
    (
        "vol-006",
        "Aditya Shinde",
        "+91 98233 11223",
        "NDMVP Samaj's College of Engg.",
        275,
        "Bronze Kumbhveer Mitra",
        11,
        550,
        json.dumps(["Tariff Guardian", "Lost & Found Scout"]),
        "2026-09-04T14:00:00Z"
    ),
    (
        "vol-007",
        "Tanvi Kulkarni",
        "+91 98219 99887",
        "Government Polytechnic Nashik",
        260,
        "Bronze Kumbhveer Mitra",
        10,
        520,
        json.dumps(["Yatri Sahayak", "First Aid Trained"]),
        "2026-09-04T15:15:00Z"
    ),
    (
        "vol-008",
        "Omkar Gite",
        "+91 98222 44331",
        "Guru Gobind Singh College of Engg.",
        245,
        "Kumbhveer Sevak",
        9,
        490,
        json.dumps(["Auto Fare Inspector", "Sector 3 Lead"]),
        "2026-09-05T09:00:00Z"
    ),
    (
        "vol-009",
        "Priyanka Gaikwad",
        "+91 98201 77654",
        "H.P.T. Arts & R.Y.K. Science",
        230,
        "Kumbhveer Sevak",
        9,
        460,
        json.dumps(["Women Safety Mitra", "Heritage Guide"]),
        "2026-09-05T10:30:00Z"
    ),
    (
        "vol-010",
        "Chetan Wagh",
        "+91 98234 88765",
        "Matoshri College of Engg., Eklahare",
        215,
        "Kumbhveer Sevak",
        8,
        430,
        json.dumps(["Crowd Flow Monitor", "Ghat Warden"]),
        "2026-09-05T11:45:00Z"
    ),
    (
        "vol-011",
        "Neha Borde",
        "+91 98212 33445",
        "SNJB KBJ College of Engineering",
        200,
        "Kumbhveer Sevak",
        8,
        400,
        json.dumps(["Fact-Check Seva", "Digital Mitra"]),
        "2026-09-05T13:00:00Z"
    ),
    (
        "vol-012",
        "Pratik Pawar",
        "+91 98227 66554",
        "B.Y.K. College of Commerce",
        190,
        "Kumbhveer Sevak",
        7,
        380,
        json.dumps(["Bazaar Price Verifier", "Fair Trade Mitra"]),
        "2026-09-05T14:15:00Z"
    ),
    (
        "vol-013",
        "Sayali More",
        "+91 98235 22119",
        "Sapkal Knowledge Hub, Nashik",
        175,
        "Kumbhveer Sevak",
        7,
        350,
        json.dumps(["Prasad Hygiene Auditor", "FSSAI Helper"]),
        "2026-09-05T15:30:00Z"
    ),
    (
        "vol-014",
        "Kunal Chaudhari",
        "+91 98208 99001",
        "Sinhgad Institute of Tech Nashik",
        165,
        "Kumbhveer Sevak",
        6,
        330,
        json.dumps(["GPS Transit Tracker", "Bus Mitra"]),
        "2026-09-05T16:45:00Z"
    ),
    (
        "vol-015",
        "Rutuja Joshi",
        "+91 98217 55443",
        "K.V.N. Naik Institute of Engg.",
        150,
        "Kumbhveer Mitra",
        6,
        300,
        json.dumps(["Medical Seva Volunteer", "Emergency Mitra"]),
        "2026-09-06T08:30:00Z"
    ),
    (
        "vol-016",
        "Saurabh Pagare",
        "+91 98229 11882",
        "K.T.H.M. College (NSS Wing)",
        140,
        "Kumbhveer Mitra",
        5,
        280,
        json.dumps(["Tapovan Camp Warden", "Night Vigil"]),
        "2026-09-06T09:45:00Z"
    ),
    (
        "vol-017",
        "Aniket Gangurde",
        "+91 98231 44776",
        "Sandip Polytechnic, Mahiravani",
        130,
        "Kumbhveer Mitra",
        5,
        260,
        json.dumps(["Route Signage Guide", "Language Mitra"]),
        "2026-09-06T11:00:00Z"
    ),
    (
        "vol-018",
        "Shreya Mahajan",
        "+91 98203 88112",
        "Symbiosis Operations Mgmt Nashik",
        120,
        "Kumbhveer Mitra",
        4,
        240,
        json.dumps(["Logistics Assistant", "Audit Analyst"]),
        "2026-09-06T12:15:00Z"
    ),
    (
        "vol-019",
        "Rohit Tambe",
        "+91 98226 77990",
        "MGV Pharmacy College Panchavati",
        110,
        "Kumbhveer Mitra",
        4,
        220,
        json.dumps(["Clean Ghats Volunteer", "Medicine Desk"]),
        "2026-09-06T13:30:00Z"
    ),
    (
        "vol-020",
        "Manasi Dhole",
        "+91 98238 66221",
        "MET Institute of Technology",
        100,
        "Kumbhveer Mitra",
        4,
        200,
        json.dumps(["Information Desk Mitra", "Yatri Guide"]),
        "2026-09-06T14:45:00Z"
    ),
    (
        "vol-021",
        "Harshada Khairnar",
        "+91 98214 99332",
        "Shatabdi Institute of Tech",
        90,
        "Kumbhveer Mitra",
        3,
        180,
        json.dumps(["Eco-Kumbh Green Scout", "River Guard"]),
        "2026-09-06T16:00:00Z"
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

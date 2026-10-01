# 🕉️ KumbhSetu • Full-Stack Platform Documentation (`kumbh-setu/`)

> 🏆 **1st Prize Winner — KIM Ignite 2026 Hackathon (Nashik Edition)**  
> Organized by **Kirloskar Institute of Management (KIM)** at **Kirloskar Oil Engines Ltd (KOEL), Ambad, Nashik**.  
> **Unified Civic Trust, Fair Pricing, and Verified Pilgrim Safety Ecosystem engineered for the Simhastha Maha Kumbh Mela (Nashik–Trimbakeshwar 2027).**

[![KIM Ignite 2026 Winner](https://img.shields.io/badge/🏆_KIM_Ignite_2026-1st_Prize_Winner-gold?style=for-the-badge&labelColor=1a1a1a)](https://kim.edu.in)

---

## 🏗️ Directory Overview

This sub-tree contains the active development codebase of KumbhSetu:

```
kumbh-setu/
├── backend/                   # FastAPI Python Microservices (Port: 8000)
│   ├── app/
│   │   ├── main.py            # App lifecycle, CORS, route registry & DeepFace model warmup
│   │   ├── api/               # API Routers (auth, marketplace, bookings, reports, police, verification)
│   │   ├── services/          # DeepFace Facenet, Face ID, maps, pricing & translation
│   │   ├── db/                # Supabase PostgreSQL client & SQLite fallback
│   │   └── ml_artifacts/      # Trained DBSCAN centroids & XGBoost model weights
│   ├── supabase/migrations/   # SQL migrations, pgvector 128-d tables & RPC functions
│   ├── requirements.txt       # Production dependencies (opencv-python-headless, pillow, etc.)
│   └── tests/                 # Unit & integration test suites
│
├── frontend/                  # 24-Screen High-Fidelity Web PWA Suite (Port: 3000)
│   ├── i18n.js                # Trilingual translation engine (EN / MR / HI)
│   ├── supabase.js            # Supabase client & real-time channel wrappers
│   ├── index.html             # Multi-persona portal gateway & language selector
│   ├── yatri_home.html        # Pilgrim home, ghat capacity & rumor buster
│   ├── marketplace.html       # 5,441 verified listings & fair rate cards
│   ├── listing_detail.html    # Stall & hotel detail with direct booking
│   ├── guide_detail.html      # Guide booking & live selfie verification handshake
│   ├── report_issue.html      # Citizen overcharging report flow with dynamic DB autocomplete
│   ├── food_finder.html       # Free Annakshetras & ₹40 Satvik thali locator
│   ├── emergency_sos.html     # 1-tap SOS dialer (112/108/100) & medical camp routing
│   ├── nashikkar_login.html   # Merchant, resident & volunteer authentication
│   ├── nashikkar_overview.html# Civic trust dashboard (98.4%) & price flags
│   ├── nashikkar_volunteers.html # Volunteer coordination & inspection assignments
│   ├── kumbhveer_portal.html  # Student volunteer audit desk & points ledger
│   ├── police_login.html      # Police outpost beat officer login
│   ├── police_escalations.html# Live prioritized police escalation card feed
│   ├── police_case_detail.html# Investigation dossier with persistent status & fines
│   ├── police_case_log.html   # 142 case resolution archive (128 resolved)
│   └── police_hotspots.html   # DBSCAN AI spatial hotspot radar
│
├── yatri-nashikkar-app/       # Expo Router Native Mobile App for Pilgrims & Merchants
│   ├── app/
│   │   ├── _layout.tsx        # Root theme & session hydration
│   │   ├── index.tsx          # Persona selection portal
│   │   ├── yatri/             # /yatri/* public pilgrim routes (home, marketplace, report, sos)
│   │   ├── nashikkar/         # /nashikkar/* protected merchant routes (overview, flags, volunteers)
│   │   └── kumbhveer/         # /kumbhveer/* student volunteer routes (login, portal, audits)
│   └── components/
│       └── SelfieCapture.tsx  # Cross-platform live selfie verification component
│
└── police-app/                # Standalone Expo Router Police Terminal
    └── app/                   # Beat officer login, escalation feed, cases & hotspots
```

---

## ⚡ Local Quickstart

### 1. Unified Launcher (Backend + Web Frontend)
```bash
cd kumbh-setu

# Linux / macOS:
./launch_localhost.sh

# Windows:
launch_localhost.bat
```
- **Web Frontend**: [http://localhost:3000](http://localhost:3000)
- **FastAPI Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

### 2. Running Expo Mobile Apps
```bash
# Main Yatri & Nashikkar App
cd yatri-nashikkar-app
npm install
npx expo start

# Police Terminal App
cd ../police-app
npm install
npx expo start
```

---

## 🔄 Core Workflows & Cross-Role Interactions

### 1. Civic Vigilance & Police Escalation
1. **Pilgrim** files grievance on `/yatri/report` (`report_issue.html`). Record is inserted into Supabase `reports`.
2. **Nashikkar Hub** (`/nashikkar/flags` / `price_flags.html`) receives instant Realtime update.
3. Merchant/Operator can either resolve locally (refund/warning) or click **"1-Tap Escalate to Police"**.
4. Escalation is created in Supabase `escalations` with priority tag (`HIGH`/`MED`).
5. **Police Terminal** (`police_escalations.html`) receives real-time alert, beat officer dispatches squad, levies spot challan, and marks docket resolved.

### 2. Fair Price Booking & Selfie Identity Verification
1. **Pilgrim** books certified heritage guide on `/yatri/guide/[id]` (`guide_detail.html`).
2. At meeting point, guide triggers **Selfie Handshake**.
3. Reusable `SelfieCapture.tsx` captures live 640px JPEG with 3s liveness check.
4. FastAPI `POST /verification/guide/{id}/verify` runs warmed DeepFace Facenet model (2–3s latency).
5. Compares against reference 128-d vector in Supabase using `match_guide_selfie_embedding`.
6. Raw photo is wiped from ephemeral storage in `finally:`.
7. Realtime broadcast updates both screens with badge: **"Identity Confirmed via Selfie"**.

### 3. Student Volunteer Field Audits
1. Coordinator assigns stall rate board audit from `/nashikkar/volunteers`.
2. **Volunteer** sees task on `/kumbhveer/portal`, inspects stall, uploads GPS coordinates and rate-board photo.
3. Successful audit updates stall trust score and credits +50 Karma Points to volunteer ledger.

---

## 🔒 Biometric Privacy & Mandatory Standards
- **Rule 1**: The phrase **"face recognition" is strictly prohibited**. Use **"selfie identity verification"** and UI badge **"Identity Confirmed via Selfie"**.
- **Rule 2**: **Zero Raw Photo Storage**. Ephemeral in-memory/tempfile processing only. Only 128-d vectors stored in PostgreSQL `vector(128)`.
- **Rule 3**: Zero raw embeddings or confidence distances exposed to the client. Responses adhere to `{ identity_confirmed: bool, checked_at: str }`.

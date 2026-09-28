# Kumbh Setu (कुंभसेतु) — Progress Tracker
Civic Trust & Fair Pricing Platform for Kumbh Mela 2027, Nashik

## Completed
- [x] **Project Scaffolding**: Structured repo with backend, yatri-nashikkar-app, and police-app.
- [x] **FastAPI Backend**:
  - Live on `http://localhost:8000`
  - 5,441 Real Nashik Listings seeded from dataset (Eateries, Hotels, Auto/Bus, Infrastructure)
  - Modules: Auth (JWT), Marketplace & Categories, Bookings, Reports, Police Escalations, Vendor Management, Emergency Services
  - Pricing reference ceilings & surge detection algorithms
  - SQLite demo mode with pre-seeded demo users & tokens
- [x] **Selfie Identity Verification Module (DeepFace + Supabase pgvector)**:
  - Service: `backend/app/services/deepface_service.py` with `generate_embedding()` (Facenet) and `compare_embeddings()` (cosine metric comparison with default threshold `0.68`).
  - Endpoints in `backend/app/api/verification.py`:
    - `POST /api/v1/verification/guide/register`: Extracts mathematical embedding vector, stores in database column, and immediately deletes temporary file in a `try/finally` block.
    - `POST /api/v1/verification/guide/{guide_id}/verify-booking-selfie`: Evaluates booking-time selfie against registered guide embedding, rate-limited against brute-force probing, returns boolean `identity_confirmed`.
  - Privacy Architecture: Raw selfie photos are NEVER permanently stored. Embeddings and similarity scores are kept internal.
  - **Note on One-Time Setup**: DeepFace automatically downloads model weights (`Facenet`) on its initial invocation. This is an expected one-time background download step and not a build or runtime failure.
- [x] **Frontend (Pixel-Perfect from stitch_kumbh_setu_civic_platform.zip)**:
  - All 20 screens extracted and mounted directly from the user's exact zip files.
  - 100% faithful to the PNG designs (Tailwind CSS, Plus Jakarta Sans & Inter fonts, Material Symbols, Google CDN photography, and color tokens).
  - Wired with bidirectional navigation, real-time filters, issue reporting, and 1-tap police escalation.
  - Served directly via FastAPI at `http://localhost:8000/` and via standalone `npm start` on port 3000.
  - Y6: Emergency SOS & Infrastructure locator (one-tap 112/108/100 dialer, ghat advisories, nearest hospitals and police chowkis)
  - N0: Nashikkar Citizen & Vendor Login with 1-click demo access + New Registration tab with face biometric scan
  - N1: Nashikkar Overview Dashboard with Civic Trust Score (98.4%), metrics, and administration notices
  - N2: Fair Pricing Pledge & Verified Green Badge Certificate generation with printable QR chart
  - N3: Marketplace Rate Card Management & reference ceiling compliance checker
  - N4: Live Pilgrim Bookings Queue with accept/reject/complete workflow & dialer + guide operations desk
  - N5: Price Flag Review with 1-tap statutory Police Escalation
- [x] **Police Terminal App (Expo Router — Standalone)**:
  - P0: Police Duty Login with Outpost/Sector selector (Ramkund, Panchavati, CBS, Trimbak) & demo bypass
  - P1: Live Escalations Feed with real-time severity badges, price surge delta indicators, and Quick Dispatch
  - P2: Investigation Dossier with complainant details, 1-tap call yatri, route patrol, summons notice, and compound fine penalty execution
  - P3: Case Log & Resolution Archive with search and penalty audit counters
- [x] **Essential Pilgrim Services (4 Tiles Fully Utilizing Dataset)**:
  - **Local Market (`marketplace.html`)**: Connects to live backend API serving all 5,441 records (Transport, Hotels/Dharamshalas, Food/Bazaars, Local Guides) with search, price ceiling caps, and links to `listing_detail.html` and `booking_confirmation.html`.
  - **Food Finder (`food_finder.html`)**: Dynamically loads real Nashik eateries from the dataset + official Annachhatras (Shri Ram, Godavari Satvik, Mahavir Jain), with live category filters ("All", "Free Annachhatra", "Satvik Thali", "Jain", "Budget"), live search, digital meal token generation, and direct navigation.
  - **Report Issue (`report_issue.html`)**: Connected to backend `POST /api/v1/reports/`, generates real tracked ticket IDs (e.g., `#KS-XXXXX`), records grievance into SQLite, and provides direct link to the Police Escalations dashboard.
  - **Emergency SOS (`emergency_sos.html`)**: Dynamically fetches from the 2,165 infrastructure points (47 Police Stations & Outposts, 495 Hospitals & Clinics, 79 Ambulances, 10 Fire Stations) with exact distance calculation, 1-tap dialer (`tel:`), and Google Maps navigation.

## 5-Phase Execution Plan (Routing, Supabase & Selfie Identity Verification)
- [x] **Phase 1: Route Audit & Navigation Isolation**
  - [x] Create `/kumbhveer/` layout, login, and portal in `yatri-nashikkar-app/app/kumbhveer/`
  - [x] Add `/nashikkar/volunteers.tsx` in `yatri-nashikkar-app/app/nashikkar/`
  - [x] Update Web HTML navigation links (Yatri reports to `report_issue.html`; Nashikkar volunteers to `nashikkar_volunteers.html`)
  - [x] Verify complete route isolation between Yatri, Nashikkar, Kumbhveer, and Police
- [x] **Phase 2: Supabase Schema Migration (9 Tables + pgvector)**
  - [x] Create `backend/supabase/migrations/20260928_full_kumbh_schema.sql`
  - [x] Deploy tables: `profiles`, `listings`, `local_guides`, `bookings`, `reports`, `escalations`, `price_flags`, `volunteer_records`, `verification_logs`
  - [x] Define `match_guide_selfie_embedding` vector cosine RPC
  - [x] Configure Row Level Security (RLS) policies
- [x] **Phase 3: Supabase Realtime Synchronization Matrix**
  - [x] Wire realtime listeners in `frontend/supabase_realtime.js`
  - [x] Wire realtime listeners in `yatri-nashikkar-app/utils/supabase.ts`
  - [x] Test cross-client real-time synchronization on reports, escalations, and bookings
- [x] **Phase 4: Selfie Identity Verification Backend & DeepFace Pipeline**
  - [x] Add lifespan warmup in `backend/app/main.py` (Facenet + OpenCV/YuNet)
  - [x] Enforce anti-spoofing and ephemeral image destruction in `finally:`
  - [x] Conform API to `{ identity_confirmed: bool, checked_at: str }`
- [x] **Phase 5: Cross-Platform SelfieCapture.tsx Component & Badge**
  - [x] Implement `SelfieCapture.tsx` supporting `expo-camera` and web `getUserMedia`
  - [x] Oval face alignment guide with 3-second liveness check
  - [x] Realtime badge reflection: "Identity Confirmed via Selfie"

## Ready for Evaluation
- Frontend UI (Stitch Pixel-Perfect): Running on `http://localhost:3000/` and `http://localhost:8000/`
- Backend API: Running on `http://localhost:8000` (`http://localhost:8000/docs`)
- Yatri-Nashikkar App: Ready for `npx expo start` in `kumbh-setu/yatri-nashikkar-app`
- Police App: Ready for `npx expo start` in `kumbh-setu/police-app`

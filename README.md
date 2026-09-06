# 🕉️ KumbhSetu (कुंभसेतु) • Simhastha Maha Kumbh Mela Ecosystem 2027

> **A Unified Civic Trust, Fair-Pricing, and Verified Pilgrim Safety Ecosystem engineered for the Simhastha Maha Kumbh Mela (Nashik–Trimbakeshwar).**

---

## 🌟 Overview: What is KumbhSetu?

During mega-pilgrimages like the Simhastha Kumbh Mela—where over 80 million Yatris visit the holy Godavari Ghats—pilgrims face predatory surge pricing, unverified tour operators, counterfeit religious goods, rumors, and fragmented emergency assistance. 

**KumbhSetu** establishes end-to-end civic trust and fair pricing through a unified, trilingual (**English, मराठी, हिंदी**) multi-tiered platform serving four key stakeholders:
1. **🪔 Pilgrims (Yatri)**: Transparent transit rates, bazaar fair ranges, ghat crowd flows, food finder, rumor verification, and 1-tap emergency dispatch.
2. **🏪 Local Citizens & Merchants (Nashikkar)**: Verified vendor permits, stall catalog management, fair-price pledge compliance, and customer bookings.
3. **🛡️ Police Commissionerate & Administration**: Real-time AI spatial hotspot radar (DBSCAN clustering), rapid patrol dispatch, incident escalation logs, and spot compound fines.
4. **🤝 Kumbhveer Student Volunteers**: Field assistance, on-ground fact checking, and citizen help desks.

---

## 📱 Two Distinct User Interfaces: v1 (Testing UI) vs v2 (Production Mobile)

This repository houses two complementary implementations of the KumbhSetu ecosystem:

```
┌─────────────────────────────────────────────────────────────────────────────────────────┐
│                                   KUMBHSETU ECOSYSTEM                                   │
├────────────────────────────────────────────┬────────────────────────────────────────────┤
│   v1: Web PWA Suite (Testing & Sandbox)    │    v2: React Native Expo (Production App)  │
│   Directory: kumbh-setu/                   │    Directory: KumbhSetu-Expo/              │
├────────────────────────────────────────────┼────────────────────────────────────────────┤
│ • 23 high-fidelity HTML5 / Tailwind screens│ • Polished mobile application              │
│ • Rapid prototyping, testing & validation  │ • Built with Expo SDK 52 & React Native    │
│ • Client-side CV face detection engine     │ • Native hardware camera & haptic feedback │
│ • Live DBSCAN AI Hotspot Radar simulation  │ • Smooth native gesture transitions        │
│ • Complete browser accessibility on any OS │ • Companion Apps: Admins, Bazaar, KumbhVeer│
│ • Offline PWA caching via Service Worker   │ • Tailored for pilgrim smartphone use      │
└────────────────────────────────────────────┴────────────────────────────────────────────┘
```

### 1. KumbhSetu v1 — Testing, Prototyping & Validation Suite (`kumbh-setu/`)
* **Role**: The testing ground and validation suite for judges, administrators, and evaluators.
* **Architecture**: Responsive HTML5, Tailwind CSS, Leaflet.js, CartoDB Voyager daylight maps, client-side Computer Vision (`tracking.js`), and FastAPI backend.
* **23 Connected Screens**: Covers every single pilgrim journey, vendor hub, admin inspection, and police command scenario.
* **Instant Verification**: Runs immediately in any browser with zero mobile compilation delays, seeded with 12,128 civic coordinates and 1,000+ administrative incident reports.
* **Comprehensive Trilingual Engine (`i18n.js`)**: Real-time seamless switching between **English, Marathi, and Hindi** across all 23 screens, text nodes, forms, placeholders, and dynamic cards with `MutationObserver`.

### 2. KumbhSetu v2 — Production Polished Mobile App (`KumbhSetu-Expo/`)
* **Role**: The production-ready mobile application designed for deployment to Google Play Store and Apple App Store.
* **Architecture**: React Native 0.76+, Expo SDK 52+, TypeScript, NativeWind, React Navigation, and native hardware bindings.
* **Production Refinement**: Smooth mobile interactions, native camera hardware access for selfie identity verification, offline caching, and unified civic services.
* **Companion Sub-Apps**:
  * `KumbhSetu-Admins`: Native mobile administrative inspection portal.
  * `KumbhSetu-LocalBazaar`: Native merchant stall and order management app.
  * `KumbhVeer`: Dedicated volunteer and field patrol app.

---

## 🏛️ System Architecture & ML Innovations

```
                                  ┌────────────────────────┐
                                  │   Supabase PostgreSQL  │
                                  │   + pgvector (128-d)   │
                                  └───────────┬────────────┘
                                              │
                    ┌─────────────────────────┴─────────────────────────┐
                    │                                                   │
          ┌─────────▼──────────┐                             ┌──────────▼─────────┐
          │  FastAPI Backend   │                             │ Client-side CV &   │
          │  (Python 3.10+)    │                             │ DBSCAN ML Engine   │
          │  Port: 8000        │                             │                    │
          └─────────┬──────────┘                             └──────────┬─────────┘
                    │                                                   │
        ┌───────────┴───────────────────────┐               ┌───────────┴───────────────────────┐
        │                                   │               │                                   │
┌───────▼────────────────┐         ┌────────▼───────────┐   │                                   │
│  v1: Web PWA Suite     │         │ v2: Mobile App     │   │                                   │
│  kumbh-setu/frontend   │         │ KumbhSetu-Expo/    │   │                                   │
│  (Port: 3000)          │         │ (Expo SDK 52)      │   │                                   │
└────────────────────────┘         └────────────────────┘   └───────────────────────────────────┘
```

### 1. DBSCAN Spatial Incident Clustering (from `kumbhathon-model.ipynb`)
* **Model**: Density-Based Spatial Clustering of Applications with Noise (DBSCAN) using Haversine metric (`eps=0.003`, `min_samples=3`).
* **Features**: Latitude, Longitude, Overcharge Ratio, Severity, Timestamp, and Crowd Density.
* **Visualization**: Interactive Daylight Hotspot Radar (`police_hotspots.html`) showing live incident cluster markers, intensity heat circles, and 1-tap police patrol dispatch.

### 2. Computer Vision Personal Selfie Identity Verification
* **Model**: Client-side Face Detection (`tracking.js`) + 128-dimensional mathematical vector embeddings (DeepFace / Facenet compliant).
* **Privacy by Design**: Compares live selfie against certified municipal guide records using vector cosine distance without storing raw biometric photographs.

### 3. Trilingual Translation Engine (`i18n.js`)
* **Languages**: English (`en`), Marathi (`mr` / स्थानिक भाषा), Hindi (`hi` / राष्ट्रीय भाषा).
* **Automatic TreeWalker & MutationObserver**: Translates headers, cards, badges, form placeholders, and dynamically fetched content without page reload.
* **Persistent State**: Caches language preference in `localStorage` and synchronizes across all 23 screens.

---

## 📂 Repository Layout

```
t3-kumbhsetu/
├── README.md                      # Unified documentation
├── launch_localhost.sh            # 1-click Linux/Mac launcher for v1
├── launch_localhost.bat           # 1-click Windows launcher for v1
├── kumbhathon-model.ipynb         # DBSCAN spatial incident clustering notebook
├── admin_reports.csv              # Nashik administrative incident dataset
├── supabase_schema.sql            # PostgreSQL schema with pgvector
│
├── kumbh-setu/                    # ─── KumbhSetu v1 (Testing & Validation Web Suite) ───
│   ├── backend/                   # FastAPI Python backend (Port: 8000)
│   │   ├── app/main.py            # API endpoints & DBSCAN hotspot clustering
│   │   └── requirements.txt       # Python dependencies
│   └── frontend/                  # 23-Screen Web App (Port: 3000)
│       ├── i18n.js                # Trilingual translation engine (EN / MR / HI)
│       ├── yatri_home.html        # Pilgrim home & live crowd flow
│       ├── marketplace.html       # Bazaar & stall catalog with estimated ranges
│       ├── marketplace_management.html # Vendor stall hub & catalog manager
│       ├── vendor_registration.html    # Stall directory & permit verification
│       ├── fare_board.html        # Real-time transit fare estimator
│       ├── food_finder.html       # Free Annakshetra & digital meal passes
│       ├── emergency_sos.html     # 1-tap emergency dispatch & GPS coordinates
│       ├── report_issue.html      # Civic vigilance & price gouging reports
│       ├── police_hotspots.html   # AI spatial DBSCAN hotspot radar
│       ├── police_escalations.html# High-priority patrol dispatch feed
│       ├── police_case_log.html   # Prosecution dossier archive
│       └── sw.js                  # Service Worker for offline PWA support
│
├── KumbhSetu-Expo/                # ─── KumbhSetu v2 (Production Mobile App - Expo) ───
│   ├── app.json                   # Expo SDK configuration
│   ├── package.json               # React Native dependencies
│   └── src/                       # Production TypeScript mobile components
│
├── KumbhSetu-Admins/              # Companion Mobile App for RTO & Municipal Inspectors
├── KumbhSetu-LocalBazaar/         # Companion Mobile App for Local Merchants & Stalls
└── KumbhVeer/                     # Companion Mobile App for Field Volunteers
```

---

## 🚀 How to Run

### ⚡ Running KumbhSetu v1 (Testing Web Suite)

#### Option A: One-Click Launcher (Recommended)
```bash
# Linux / macOS
./launch_localhost.sh

# Windows
launch_localhost.bat
```
* **Pilgrim Gateway**: [http://localhost:3000/index.html](http://localhost:3000/index.html)
* **Yatri Home Screen**: [http://localhost:3000/yatri_home.html](http://localhost:3000/yatri_home.html)
* **Marketplace & Stalls**: [http://localhost:3000/marketplace.html](http://localhost:3000/marketplace.html)
* **AI Hotspot Radar**: [http://localhost:3000/police_hotspots.html](http://localhost:3000/police_hotspots.html)
* **FastAPI Interactive Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

#### Option B: Manual Start
```bash
# 1. Start Backend
cd kumbh-setu/backend
pip install -r requirements.txt
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload

# 2. Start Frontend (in a new terminal)
cd kumbh-setu/frontend
npm start
# Serves on http://localhost:3000
```

---

### 📱 Running KumbhSetu v2 (Production React Native Expo App)

```bash
cd KumbhSetu-Expo
npm install
npx expo start
```
* Press `a` for Android Emulator.
* Press `i` for iOS Simulator.
* Scan the QR code with **Expo Go** on your physical smartphone.

To run the companion apps:
```bash
# Administration Inspector App
cd KumbhSetu-Admins && npx expo start

# Local Merchant & Stall App
cd KumbhSetu-LocalBazaar && npx expo start

# Volunteer Field Patrol App
cd KumbhVeer && npx expo start
```

---

## 🧪 Comprehensive Screen Matrix (v1 Testing UI)

| # | Screen Name | File | Primary Function | Trilingual Support |
|---|---|---|---|:---:|
| **01** | **Role Selector** | [`index.html`](http://localhost:3000/index.html) | Gateway for Yatris, Nashikkars, Police & Volunteers | ✅ EN / MR / HI |
| **02** | **Yatri Home** | [`yatri_home.html`](http://localhost:3000/yatri_home.html) | Ramkund crowd flow, PIB Fact Checks, Rumor Buster, Face Verification | ✅ EN / MR / HI |
| **03** | **Marketplace** | [`marketplace.html`](http://localhost:3000/marketplace.html) | Stalls, puja brassware, estimated fair ranges, WhatsApp ordering | ✅ EN / MR / HI |
| **04** | **Vendor Stall Hub** | [`marketplace_management.html`](http://localhost:3000/marketplace_management.html) | Stall catalog, customer orders, daily sales, compliance audits | ✅ EN / MR / HI |
| **05** | **Listing Detail** | [`listing_detail.html`](http://localhost:3000/listing_detail.html) | Photo gallery, price benchmark, verified reviews, room booking | ✅ EN / MR / HI |
| **06** | **Guide Profile** | [`guide_detail.html`](http://localhost:3000/guide_detail.html) | Credentials, hourly rates, live selfie identity confirmation | ✅ EN / MR / HI |
| **07** | **Booking Confirmation** | [`booking_confirmation.html`](http://localhost:3000/booking_confirmation.html) | Digital QR pass, SMS token, vendor contact details | ✅ EN / MR / HI |
| **08** | **Fare Board** | [`fare_board.html`](http://localhost:3000/fare_board.html) | Real-time RTO auto/bus tariff calculator & surge reporting | ✅ EN / MR / HI |
| **09** | **Food Finder** | [`food_finder.html`](http://localhost:3000/food_finder.html) | Free Annakshetras, Satvik meals, digital meal passes | ✅ EN / MR / HI |
| **10** | **Emergency SOS** | [`emergency_sos.html`](http://localhost:3000/emergency_sos.html) | 1-tap dialer (112, 108), GPS coordinates, medical camp map | ✅ EN / MR / HI |
| **11** | **Report Issue** | [`report_issue.html`](http://localhost:3000/report_issue.html) | Overcharge reporting, photo evidence, civic vigilance tracking | ✅ EN / MR / HI |
| **12** | **Nashikkar Login** | [`nashikkar_login.html`](http://localhost:3000/nashikkar_login.html) | Supabase Auth login/register across 4 citizen roles | ✅ EN / MR / HI |
| **13** | **Nashikkar Hub** | [`nashikkar_overview.html`](http://localhost:3000/nashikkar_overview.html) | Civic trust score, registered listings, active bookings | ✅ EN / MR / HI |
| **14** | **Bookings Queue** | [`bookings_queue.html`](http://localhost:3000/bookings_queue.html) | Real-time reservation requests with accept/reject actions | ✅ EN / MR / HI |
| **15** | **Price Flag Audit** | [`price_flags.html`](http://localhost:3000/price_flags.html) | Customer overcharge flag resolution before police escalation | ✅ EN / MR / HI |
| **16** | **Reports Analytics** | [`reports_analytics.html`](http://localhost:3000/reports_analytics.html) | Violation heatmaps, resolution velocity, civic compliance | ✅ EN / MR / HI |
| **17** | **Vendor Directory** | [`vendor_registration.html`](http://localhost:3000/vendor_registration.html) | Stall directory, permit verification, Fair-Price pledge audit | ✅ EN / MR / HI |
| **18** | **Police Login** | [`police_login.html`](http://localhost:3000/police_login.html) | Secure officer duty outpost authentication | ✅ EN / MR / HI |
| **19** | **AI Hotspot Radar** | [`police_hotspots.html`](http://localhost:3000/police_hotspots.html) | Live DBSCAN spatial incident clustering & patrol dispatch | ✅ EN / MR / HI |
| **20** | **Escalations Feed** | [`police_escalations.html`](http://localhost:3000/police_escalations.html) | Urgent price-gouging violation alerts & patrol routing | ✅ EN / MR / HI |
| **21** | **Case Detail** | [`police_case_detail.html`](http://localhost:3000/police_case_detail.html) | Investigation dossier, evidence photos, spot compound fines | ✅ EN / MR / HI |
| **22** | **Case Log Archive** | [`police_case_log.html`](http://localhost:3000/police_case_log.html) | Searchable prosecution archive with docket tracking | ✅ EN / MR / HI |
| **23** | **Police Settings** | [`police_settings.html`](http://localhost:3000/police_settings.html) | Sector broadcast radio & emergency notification controls | ✅ EN / MR / HI |

---

## 🔑 Demo Credentials

Judges and evaluators can log in using these pre-configured accounts:

| Portal | Role | Username / Identifier | Password / PIN |
|---|---|---|---|
| **Nashikkar Portal** | Certified Guide | `guide.suresh@kumbhsetu.org` | `KumbhSetu@2027` |
| **Nashikkar Portal** | Civic Stall Vendor | `vendor.godavari@kumbhsetu.org` | `KumbhSetu@2027` |
| **Nashikkar Portal** | Kumbhveer Volunteer | `kumbhveer.kthm@kumbhsetu.org` | `KumbhSetu@2027` |
| **Nashikkar Portal** | Resident | `resident.panchavati@kumbhsetu.org` | `KumbhSetu@2027` |
| **Police Command** | Field Beat Officer | Badge ID: `MH-15-POLICE-0482` | PIN: `9999` |

---

## 📜 Civic Licensing & Copyright

Developed for the **Simhastha Kumbh Mela 2027 Nashik-Trimbakeshwar**. Built under the guidance of the Kumbhathon Innovation Foundation and District Administration.
All rights reserved © 2026-2027.

# KumbhSetu (कुंभसेतु) — Connecting Truth, Trust & Fairness
**Simhastha Kumbh Mela 2027, Nashik**

---

## 👥 Team & Project Information

* **Team Name**: **KumbhSetu**
* **Project Title**: **KumbhSetu - Connecting Truth, Trust & Fairness**
* **Tower**: **Tower 3 — Civic Tech, Smart Governance & Crowd Safety**
* **Repository**: `Kumbhathon-Innovation-Foundation/t3-kumbhsetu`
* **GitHub Usernames of Team Members**:
  * [@geekyfromgreek](https://github.com/geekyfromgreek)
  * [@AkhileshNagargoje](https://github.com/AkhileshNagargoje)
  * [@atharvyeole-11](https://github.com/atharvyeole-11)
  * [@Gauruuu](https://github.com/Gauruuu)
  * [@royalvedant](https://github.com/royalvedant)

### 🙏 Acknowledgement
We express our heartfelt gratitude to **Kumbhathon Innovation Foundation**, the **Nashik Police Commissionerate**, the **Nashik Municipal Corporation (NMC)**, and the local citizens of Nashik for their invaluable dataset insights, domain mentoring, and support in building this civic trust architecture for Kumbh Mela 2027.

---

## 📖 What It Does

**Kumbh Setu** is a unified, trilingual (English, Marathi, Hindi) civic trust, fair-pricing, and verified pilgrim service ecosystem engineered specifically for the **Simhastha Kumbh Mela 2027 in Nashik-Trimbakeshwar**.

During mega-pilgrimage events where tens of millions of Yatris gather, pilgrims face predatory surge pricing, unverified tour operators, counterfeit religious goods, and fragmented emergency assistance. Kumbh Setu eliminates unfair exploitation and establishes end-to-end civic trust across 4 unified user personas:

---

### 🌟 Core Capabilities & Innovations

1. **🪔 Yatri (Pilgrim Experience & Fair Market)**:
   * **Real-Time Transit Fare Board**: Official RTO meter tariffs & shared route fare calculator for Private Auto-Rickshaws, Shared Kali-Peeli, Citylink Electric Buses, and E-Rickshaws with live surge alerts.
   * **Verified Marketplace & Puja Samagri Catalog**: Direct connection to verified local Nashik artisans and puja vendors with fair-price caps, inventory availability, and 1-tap WhatsApp ordering.
   * **Certified Guide Booking with Selfie Identity Verification**: Real-time camera selfie verification comparing 128-dimensional mathematical vector embeddings against certified municipal guide records (zero raw photo storage for maximum privacy).
   * **Food Finder & Annachhatra Directory**: Live listing of Free Annadanam centers, Satvik bhojanalayas, and Jain meal hubs with hygiene ratings.
   * **1-Tap Emergency SOS**: Instant connectivity to Nashik Police (112), Ambulance (108), Medical Ghat Posts, and 2,165 verified civic emergency coordinates.
   * **Rumor Buster & Fact-Check Radar**: Crowdsourced misinformation reporting with verified police debunks.

2. **🏪 Nashikkar (Local Residents, Guides & Civic Vendors)**:
   * **Role-Based Supabase Authentication**: Secure Email & OTP signup for Local Guides, Civic Vendors, Kumbhveer Volunteers, and Nashik Residents.
   * **Merchant Trust Dashboard**: Monitor Fair-Price Pledge compliance, incoming booking queues, customer reviews, and civic ratings.
   * **Self-Resolution Portal**: Audit and resolve customer price flags before automated escalation to law enforcement.

3. **🛡️ Police Commissionerate & Administration Command**:
   * **Real-Time Escalation Feed**: Algorithmic detection and prioritization of repeat price gouging and rogue operators.
   * **Rapid Patrol Dispatch**: 1-click GPS route dispatch for on-duty beat officers.
   * **Case Dossier & Evidence Vault**: Auditable citizen reports, time-stamped incident logs, and route history.
   * **Instant Spot Enforcement**: Digital compound fine issuance (₹5,000) and temporary permit suspensions.
   * **Emergency Broadcast Channel**: Real-time sector alerts and crowd diversion advisories.

4. **📱 Offline-Ready Mobile Experience & Cloud Database**:
   * **Cloud Supabase PostgreSQL + `pgvector`**: 12,128 seeded civic coordinates, service listings, and vector embeddings.
   * **PWA Standalone Mobile App**: Installable on Android & iOS with offline service worker caching for low-connectivity Ghat zones.
   * **One-Click Android APK Builder**: Bundled Capacitor configuration for native Android APK generation.

---

## 🚀 Quick Start & How to Run

### Prerequisites
* Python 3.10+
* Node.js 18+ & npm

---

### Option A: One-Click Local Full-Stack Launcher (Recommended)
```bash
./launch_localhost.sh
```
* **PC Web Interface**: [http://localhost:3000/yatri_home.html](http://localhost:3000/yatri_home.html)
* **Mobile Phone (Same Wi-Fi)**: `http://<YOUR_LAN_IP>:3000/yatri_home.html`
* **FastAPI Interactive Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### Option B: Manual Setup

#### 1. Start the FastAPI Backend
```bash
cd kumbh-setu/backend
pip install -r requirements.txt
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

#### 2. Start the Frontend Web App
```bash
cd kumbh-setu/frontend
npm start
# App serves on http://localhost:3000
```

---

## 📱 Mobile APK Generation (Android)

To bundle Kumbh Setu into a native Android APK:
```bash
./build_mobile_apk.sh
```
* Generates an Android Studio project in `kumbh-setu/frontend/android`.
* Run `cd kumbh-setu/frontend/android && ./gradlew assembleDebug` to build `app-debug.apk`.

---

## ☁️ 1-Click Cloud Deployment (Vercel & Render)

* **Frontend on Vercel**: Connect your GitHub repo to [Vercel](https://vercel.com). Root configuration is pre-configured in `vercel.json`.
* **Backend on Render**: Connect your GitHub repo to [Render](https://render.com) using Blueprint mode. It automatically reads `render.yaml`.

---

## 🧪 Testing Guide & Demo Credentials

Judges and testers can evaluate the end-to-end flow using the pre-seeded accounts:

### 1. 🪔 Pilgrim (Yatri) Testing Flow
* **URL**: [http://localhost:3000/yatri_home.html](http://localhost:3000/yatri_home.html)
* **Actions**:
  1. Open **"Fare Board"** (`fare_board.html`) → Calculate Auto/Bus fares between Nashik Road and Ramkund.
  2. Open **"Marketplace"** (`marketplace.html`) → Browse authentic Puja Samagri, view fair price caps, and tap **"Order via WhatsApp"**.
  3. Open **"Guide Verification"** (`guide_detail.html?id=guide-101`) → Click **"Verify Guide Identity"**, open live camera, take selfie, and see real-time 128-d AI vector identity confirmation.
  4. Open **"Food Finder"** (`food_finder.html`) → Search free Annachhatra and Satvik dining.
  5. Open **"Emergency SOS"** (`emergency_sos.html`) → View 2,165 verified emergency spots with 1-tap dialer.

### 2. 🏪 Nashikkar (Vendor & Guide) Portal
* **URL**: [http://localhost:3000/nashikkar_login.html](http://localhost:3000/nashikkar_login.html)
* **Pre-seeded Accounts**:
  * **Certified Guide**: `guide.suresh@kumbhsetu.org` / `KumbhSetu@2027`
  * **Civic Vendor**: `vendor.godavari@kumbhsetu.org` / `KumbhSetu@2027`
  * **Kumbhveer Volunteer**: `kumbhveer.kthm@kumbhsetu.org` / `KumbhSetu@2027`
  * **Resident**: `resident.panchavati@kumbhsetu.org` / `KumbhSetu@2027`

### 3. 🛡️ Police Commissionerate Command Flow
* **URL**: [http://localhost:3000/police_login.html](http://localhost:3000/police_login.html)
* **Badge ID**: `MH-15-POLICE-0482` | **PIN**: `9999`
* **Actions**:
  1. Open **Escalations Feed** (`police_escalations.html`) to review surge gouging flags and click **"Dispatch Patrol"**.
  2. Open **Case Dossier** (`police_case_detail.html`) to review evidence and issue spot compound fines.

---

## 📱 Pixel-Perfect Screens Matrix

| # | Screen Name | Route | Core Functionality |
|---|---|---|---|
| **01** | **Role Selector** | [`index.html`](http://localhost:3000/index.html) | Trilingual landing portal (English, Marathi, Hindi) |
| **02** | **Yatri Home** | [`yatri_home.html`](http://localhost:3000/yatri_home.html) | Live Ramkund crowd gauge, price ticker, emergency tiles |
| **03** | **Fare Board** | [`fare_board.html`](http://localhost:3000/fare_board.html) | Real-time transit fare estimator & RTO tariff card |
| **04** | **Marketplace** | [`marketplace.html`](http://localhost:3000/marketplace.html) | Puja Samagri, local brassware, artisans & guides catalog |
| **05** | **Listing Detail** | [`listing_detail.html`](http://localhost:3000/listing_detail.html) | Product gallery, price caps, package contents, WhatsApp order |
| **06** | **Guide Detail** | [`guide_detail.html`](http://localhost:3000/guide_detail.html) | Guide credentials & live camera selfie identity verification |
| **07** | **Booking Confirmation** | [`booking_confirmation.html`](http://localhost:3000/booking_confirmation.html) | Digital QR pass, SMS receipt, direct vendor calling |
| **08** | **Food Finder** | [`food_finder.html`](http://localhost:3000/food_finder.html) | Annachhatra, Satvik Bhojanalayas, Jain meals, FSSAI hygiene |
| **09** | **Emergency SOS** | [`emergency_sos.html`](http://localhost:3000/emergency_sos.html) | 1-tap dialer (112, 108, 100), 2,165 real emergency coordinates |
| **10** | **Report Issue** | [`report_issue.html`](http://localhost:3000/report_issue.html) | Overcharging & civic issue logger with instant tracking ID |
| **11** | **Nashikkar Login** | [`nashikkar_login.html`](http://localhost:3000/nashikkar_login.html) | Supabase Auth login & signup across 4 citizen roles |
| **12** | **Nashikkar Overview** | [`nashikkar_overview.html`](http://localhost:3000/nashikkar_overview.html) | Vendor civic trust score, earnings, and active listings |
| **13** | **Bookings Queue** | [`bookings_queue.html`](http://localhost:3000/bookings_queue.html) | Vendor reservations queue with instant accept/decline |
| **14** | **Price Flag Audit** | [`price_flags.html`](http://localhost:3000/price_flags.html) | Audit customer price reports with 1-tap police escalation |
| **15** | **Reports Analytics** | [`reports_analytics.html`](http://localhost:3000/reports_analytics.html) | Heatmaps of rate gouging violations and resolution metrics |
| **16** | **Marketplace Admin** | [`marketplace_management.html`](http://localhost:3000/marketplace_management.html) | Municipal gazette rate registry & ceiling configuration |
| **17** | **Vendor Registration** | [`vendor_registration.html`](http://localhost:3000/vendor_registration.html) | Vendor permit audit, selfie registration, Fair-Price pledge |
| **18** | **Police Duty Login** | [`police_login.html`](http://localhost:3000/police_login.html) | Secure officer duty outpost authentication |
| **19** | **Escalations Feed** | [`police_escalations.html`](http://localhost:3000/police_escalations.html) | Priority violation alerts and instant patrol dispatch |
| **20** | **Police Case Detail** | [`police_case_detail.html`](http://localhost:3000/police_case_detail.html) | Investigation dossier, evidence vault, summons & fines |
| **21** | **Police Case Log** | [`police_case_log.html`](http://localhost:3000/police_case_log.html) | Searchable prosecution archive and audit trail |
| **22** | **Police Settings** | [`police_settings.html`](http://localhost:3000/police_settings.html) | Radio channel and emergency broadcast controls |

---

## 🗄️ Dataset & Technical Architecture

* **Database & Vector Store**: **Supabase PostgreSQL** with `pgvector` enabled:
  * **12,128 Seeded Listings**: Eateries, Dharamshalas, Corridors, Puja vendors, and Civic posts.
  * **128-Dimension Embeddings**: Mathematical feature vectors for identity confirmation.
* **Backend Architecture**: Asynchronous **FastAPI** Python service with Pydantic schemas, JWT authentication, and Facenet vector similarity.
* **Frontend Architecture**: Pure HTML5, CSS3, JavaScript, Tailwind, and Leaflet Maps with zero heavyweight runtime overhead.
* **Mobile Ready**: Progressive Web App (PWA) with Service Worker caching and Capacitor Android configuration.


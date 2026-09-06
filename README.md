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

**Kumbh Setu** is a unified trilingual (English, Marathi, Hindi) civic trust and fair-pricing ecosystem engineered specifically for the **Simhastha Kumbh Mela 2027 in Nashik-Trimbakeshwar**.

During mega-pilgrimage events, millions of yatris face predatory surge pricing, fake tour guides, and fragmented emergency assistance. Kumbh Setu eliminates unfair exploitation and establishes civic accountability across three interconnected roles:

1. **Yatris (Pilgrims)**:
   * Real-time crowd density gauge for **Ramkund** & **Trimbakeshwar Ghats**.
   * Live Municipal Gazette Fair-Price Ticker & Surge Comparison.
   * Verified booking for Auto-Rickshaws, Hotels, Dharamshalas, and Certified Guides.
   * **Food Finder**: Discover Free Annachhatra, Satvik, and Jain meals with FSSAI hygiene ratings.
   * **1-Tap Emergency SOS**: Instant connection to Police (112), Ambulance (108), Medical Ghat Posts, and 2,165 verified civic points.
   * Frictionless civic issue & overcharging reporting with automated tracking IDs.

2. **Nashikkars (Local Citizens & Verified Vendors)**:
   * Fair-Price Pledge verification and official QR Trust Badges.
   * Real-time reservation queue management (accept, reject, direct call).
   * Transparent municipal ceiling rate compliance.
   * Self-resolution portal for customer rate flags before police escalation.

3. **Nashik Police Commissionerate & Administration**:
   * **Real-time Escalation Feed**: Algorithmic prioritization of repeat gouging & rogue operators.
   * **1-Click Rapid Patrol Dispatch**: Instant route deployment to reported GPS locations.
   * **Case Dossier & Evidence Vault**: Auditable citizen reports, witness logs, and route history.
   * **Instant Enforcement**: On-the-spot compound challan issuance and vendor permit suspension.
   * **Emergency Broadcast System**: Sector-wide alerts and crowd diversion orders.

---

## 🚀 How to Run Kumbh Setu

### Prerequisites
* Python 3.10+
* Node.js 18+ & npm

---

### Step 1: Start the FastAPI Backend Server
The backend automatically initializes and seeds the SQLite database with **5,441 verified Nashik coordinates & services**.

```bash
cd kumbh-setu/backend
pip install -r requirements.txt
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
* **API & Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
* **Backend Health**: [http://localhost:8000/api/v1/marketplace/listings](http://localhost:8000/api/v1/marketplace/listings)

---

### Step 2: Start the Frontend Web App
```bash
cd kumbh-setu/frontend
npm start
# Server starts on http://localhost:3000
```

> **Direct Access**: The complete application is accessible on [http://localhost:3000](http://localhost:3000).

---

## 🧪 Judges' Testing Guide & Credentials

Judges can test the entire end-to-end workflow across all three user personas using the pre-seeded dataset:

### 1. 🪔 Yatri (Pilgrim) Flow
* **URL**: [http://localhost:3000/yatri_home.html](http://localhost:3000/yatri_home.html)
* **Actions to Test**:
  1. Click **"Local Market"** → Filter by Rickshaw, Hotel, Guide, or Food. Observe official gazette price vs. reported surge.
  2. Click any listing card → Review verified badges, price ceiling breakdown, and tap **"Book at Fair Rate"**.
  3. Click **"Food Finder"** → Filter by *Free Annachhatra*, *Satvik Meal*, or *Jain Thali*. Click *"Book Free Token"* or *"Navigate"*.
  4. Click **"Report Issue"** → Select issue type (Overcharging), enter demanded price, and tap **"Submit Civic Report"** to generate a real tracking ticket (`#KS-XXXX`).
  5. Click **"Emergency SOS"** → View 2,165 real emergency coordinates categorized into Police Stations, Hospitals, Ambulances, and Ghat Medical Posts.

### 2. 🏪 Nashikkar (Vendor & Citizen) Flow
* **URL**: [http://localhost:3000/nashikkar_login.html](http://localhost:3000/nashikkar_login.html)
* **Demo Credentials**:
  * **Phone**: `9876543210` (or tap *"Auto-Fill Demo Vendor"*)
  * **PIN / OTP**: `1234`
* **Actions to Test**:
  1. Access **Vendor Dashboard** ([nashikkar_overview.html](http://localhost:3000/nashikkar_overview.html)) to monitor Trust Score (98.4%) and active listings.
  2. Open **Bookings Queue** ([bookings_queue.html](http://localhost:3000/bookings_queue.html)) to confirm or decline incoming reservations.
  3. Open **Price Flags** ([price_flags.html](http://localhost:3000/price_flags.html)) to review pricing audits with **1-Tap Escalate to Police**.

### 3. 🛡️ Police Commissionerate Flow
* **URL**: [http://localhost:3000/police_login.html](http://localhost:3000/police_login.html)
* **Demo Credentials**:
  * **Badge ID**: `MH-15-POLICE-0482` (or tap *"One-Click Duty Login"*)
  * **Sector**: `Panchavati Ghat Central Command`
  * **PIN**: `9999`
* **Actions to Test**:
  1. Open **Escalations Feed** ([police_escalations.html](http://localhost:3000/police_escalations.html)) → Review high-priority surge gouging cases and click **"Dispatch Patrol"**.
  2. Open **Case Dossier #0482** ([police_case_detail.html](http://localhost:3000/police_case_detail.html)) → Review evidence, summon operator, or issue a spot **₹5,000 Compound Fine / License Suspension**.
  3. Open **Case Log Archive** ([police_case_log.html](http://localhost:3000/police_case_log.html)) → Search past resolved cases, collected fines, and prosecution metrics.

---

## 📱 20 Pixel-Perfect Screens Matrix

| # | Screen Name | Route | Key Feature |
|---|---|---|---|
| **01** | **Role Selector** | [`index.html`](http://localhost:3000/index.html) | Trilingual entry portal (English, Marathi, Hindi) |
| **02** | **Yatri Home** | [`yatri_home.html`](http://localhost:3000/yatri_home.html) | Ramkund crowd meter, live rate ticker, quick service tiles |
| **03** | **Marketplace** | [`marketplace.html`](http://localhost:3000/marketplace.html) | Category filtering, gazette tariff compliance, distance sorting |
| **04** | **Listing Detail** | [`listing_detail.html`](http://localhost:3000/listing_detail.html) | Verified badge, rate card, reviews, sticky book button |
| **05** | **Booking Confirmation** | [`booking_confirmation.html`](http://localhost:3000/booking_confirmation.html) | Digital QR pass, SMS receipt, direct vendor call |
| **06** | **Report an Issue** | [`report_issue.html`](http://localhost:3000/report_issue.html) | Frictionless rate gouging & hygiene complaint logging |
| **07** | **Food Finder** | [`food_finder.html`](http://localhost:3000/food_finder.html) | Free Annachhatra, Satvik, Jain thali, FSSAI hygiene grades |
| **08** | **Emergency SOS** | [`emergency_sos.html`](http://localhost:3000/emergency_sos.html) | 1-tap dialer (112, 108, 100), 2,165 real emergency coordinates |
| **09** | **Nashikkar Login** | [`nashikkar_login.html`](http://localhost:3000/nashikkar_login.html) | Fast OTP & PIN authentication for registered citizens |
| **10** | **Nashikkar Overview** | [`nashikkar_overview.html`](http://localhost:3000/nashikkar_overview.html) | Merchant civic trust dashboard & earnings |
| **11** | **Marketplace Admin** | [`marketplace_management.html`](http://localhost:3000/marketplace_management.html) | Municipal gazette rate registry & ceiling configuration |
| **12** | **Vendor Registration** | [`vendor_registration.html`](http://localhost:3000/vendor_registration.html) | Vendor Aadhaar/permit auditing and Fair-Price pledge |
| **13** | **Bookings Queue** | [`bookings_queue.html`](http://localhost:3000/bookings_queue.html) | Vendor reservations queue with instant accept/reject |
| **14** | **Price Flag Review** | [`price_flags.html`](http://localhost:3000/price_flags.html) | Audit price gouging flags with 1-tap police escalation |
| **15** | **Reports & Analytics** | [`reports_analytics.html`](http://localhost:3000/reports_analytics.html) | Surge violation heatmaps and resolution metrics |
| **16** | **Police Duty Login** | [`police_login.html`](http://localhost:3000/police_login.html) | Secure officer duty outpost authentication |
| **17** | **Escalations Feed** | [`police_escalations.html`](http://localhost:3000/police_escalations.html) | Priority violation alerts and instant patrol dispatch |
| **18** | **Police Case Detail** | [`police_case_detail.html`](http://localhost:3000/police_case_detail.html) | Investigation dossier, evidence vault, summons & fines |
| **19** | **Police Case Log** | [`police_case_log.html`](http://localhost:3000/police_case_log.html) | Searchable prosecution archive and audit trail |
| **20** | **Police Settings** | [`police_settings.html`](http://localhost:3000/police_settings.html) | Radio frequency channel & emergency broadcast control |

---

## 🗄️ Dataset & Technical Architecture

* **Nashik Dataset Seed**: 5,441 verified geo-tagged entries loaded from `data/nashik-all.csv`:
  * **860 Eateries** (Annachhatras, Bhojanalayas, Satvik restaurants)
  * **370 Hotels & Lodges** (Dharamshalas, Ashrams, Budget Stays)
  * **2,046 Transit Corridors** (Pre-fixed Auto Rickshaw & Ring Road Bus routes)
  * **2,165 Civic Points** (Police outposts, medical centers, ambulance hubs, public toilets)
* **Backend Architecture**: Asynchronous FastAPI Python backend with Pydantic validation, token auth, and SQLite persistence.
* **Frontend Architecture**: Tailored responsive CSS design system matching Google Stitch specifications with zero external framework overhead.
* **Mobile Ready**: Includes Expo React Native app templates in `yatri-nashikkar-app/` and `police-app/`.

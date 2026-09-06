# 🕉️ KumbhSetu 2026: Unified Ecosystem Documentation

**Maha Kumbh Mela Nashik–Trimbakeshwar 2026 — 4-App Connected Digital Backbone**

---

## 📌 1. Ecosystem Overview

The **KumbhSetu 2026 Ecosystem** is a multi-role, real-time platform built for the Maha Kumbh Mela. It connects 4 specialized applications through a single Supabase backend (`xqzmzdmcwmhscgfbfuca.supabase.co`) with Postgres Realtime replication, secure safe-storage auth, and media streaming.

```
                           ┌────────────────────────────────────────┐
                           │            SUPABASE CLOUD              │
                           │  • PostgreSQL + Realtime Publications  │
                           │  • 'kumbh-media' Storage Bucket        │
                           │  • Automatic Rating Triggers & RLS     │
                           └──────────────────┬─────────────────────┘
                                              │
         ┌───────────────────┬────────────────┴───────────────────┬───────────────────┐
         │                   │                                    │                   │
         ▼                   ▼                                    ▼                   ▼
┌─────────────────┐ ┌─────────────────┐                  ┌─────────────────┐ ┌─────────────────┐
│ KumbhSetu-Expo  │ │KumbhSetu-Admins │                  │ KumbhSetu-Local │ │    KumbhVeer    │
│  (Pilgrim App)  │ │ (Admin Portal)  │                  │     Bazaar      │ │(Volunteer App)  │
│                 │ │                 │                  │ (Merchant App)  │ │                 │
│ • Transit Fares │ │ • Tariff Caps   │                  │ • Stall Listing │ │ • Duty Patrol   │
│ • Bazaar Market │ │ • Price Ceilings│                  │ • Menu Catalog  │ │ • Ground Check  │
│ • Grievance Rep │ │ • Stall Audits  │                  │ • Open/Closed   │ │ • Swipe Resolve │
│ • Fact-Check    │ │ • Rumor Verdict │                  │ • Inquiries     │ │ • Rumor Debunk  │
└─────────────────┘ └─────────────────┘                  └─────────────────┘ └─────────────────┘
```

---

## 📱 2. The 4 Applications & Feature Matrix

| Feature / Domain | KumbhSetu-Expo (Pilgrims) | KumbhSetu-Admins (RTO & DBA) | KumbhSetu-LocalBazaar (Merchants) | KumbhVeer (Ground Volunteers) |
| :--- | :--- | :--- | :--- | :--- |
| **Transit Tariffs** | Live view of RTO route fares & mode breakdown | Create, edit, and delete transit price caps | — | — |
| **Price Ceilings** | View ceiling rates for water, milk, prasad, thali | Enforce & update Section 3 price caps | — | — |
| **Marketplace** | Browse verified stalls, open/closed, call, rate | Audit stalls (Approve, Revoke, Delete) | Register stall, manage items, toggle Open | — |
| **Shop Ratings** | Submit 1–5★ rating; auto-ranks marketplace | Monitor merchant compliance & warnings | View rating & review count | — |
| **Incidents & Safety** | File overcharging & emergency reports | Monitor incidents, dispatch flying squads | — | Claim alert, inspect spot, Swipe-to-Resolve |
| **Rumor Fact-Check** | Submit suspicious claims & view debunks | Issue official administration verdicts | — | Ground physical verification & debunking |
| **Direct Inquiries** | Send WhatsApp / in-app message to shop | — | Receive & respond to customer messages | — |

---

## 🏛️ 3. Application Deep-Dives

### 1. `KumbhSetu-Expo` (Main Pilgrim Application)
- **Directory**: `d:\t3-kumbhsetu\KumbhSetu-Expo`
- **Target Users**: Millions of Yatris visiting Ramkund, Trimbakeshwar, Panchavati, and Tapovan.
- **Key Tabs & Modules**:
  1. **Home Tab**: Snan shahi calendar, auspicious muhurat, crowd density meter, emergency SOS button.
  2. **Fares Tab (`FareGuideTab.tsx`)**:
     - Live display of all routes created by Admin (`tariff_routes`).
     - Real-time breakdown: Shared Auto, Kumbh City Bus, Private Auto, Taxi/Cab.
     - Search bar to filter by stop/landmark (e.g., *Ramkund, CBS, Trimbak, Station*).
     - Essential commodity price index (Section 3 Price Mandate).
  3. **Marketplace Tab (`MarketplaceTab.tsx`)**:
     - Streams **only Admin-verified stalls** (`is_verified = true`).
     - **OPEN NOW / CLOSED** real-time status pill.
     - Cross-device photos, FSSAI verification badge, sector address.
     - Direct WhatsApp & Phone Call integration.
     - Star rating modal $\rightarrow$ writes to `shop_reviews` and dynamically sorts stalls by rating descending.
  4. **Complaints & Rumors Tab (`ComplaintsAndSafetyTab.tsx`)**:
     - File overcharging grievance with vehicle/shop number and photo.
     - Submit suspicious rumors to Kumbh Fact-Check Unit.
     - View verified truths vs debunked fake news.

---

### 2. `KumbhSetu-Admins` (District Administration & RTO Portal)
- **Directory**: `d:\t3-kumbhsetu\KumbhSetu-Admins`
- **Target Users**: District Magistrate, RTO Officers, Municipal Corporation Auditors, Police Control Room.
- **Default Login Credentials**:
  - **Officer ID**: `Gaurang` (or `ADM-108`)
  - **Passcode**: `pass123` (or `1008`)
- **Key Tabs & Modules**:
  1. **Dashboard Overview**: Active pilgrim count, registered stalls, active transit routes, open safety tickets.
  2. **Tariff Management (`TariffManagementTab.tsx`)**:
     - Create, update, or remove transit routes with custom rates for Auto, Bus, Private, Taxi.
     - Set and regulate maximum ceiling rates for essential food items.
  3. **Bazaar Audit & Verification (`BazaarManagementTab.tsx`)**:
     - View all merchant registrations.
     - **Approve & Verify**: Instantly verifies the stall, publishing it to the Pilgrim app.
     - **Reject / Revoke**: Revokes approval and hides stall from the public directory.
     - **Delete Stall**: Permanently deletes stall record from Supabase.
  4. **Fact-Check Dispatch (`FactCheckDispatchTab.tsx`)**:
     - Review citizen-submitted rumors and issue official verdicts (`TRUE` / `FALSE`).
  5. **Grievance Enforcement (`GrievanceEnforcementTab.tsx`)**:
     - Track pilgrim complaints, dispatch flying squads, levy fines, and mark resolved.

---

### 3. `KumbhSetu-LocalBazaar` (Merchants & Local Eateries App)
- **Directory**: `d:\t3-kumbhsetu\KumbhSetu-LocalBazaar`
- **Target Users**: Bhojanalayas, sweet shops, puja stores, dharamshalas, agro merchants.
- **Login / Registration**:
  - Register with business name, category, scale, address, FSSAI license, and storefront photo.
  - Sign in directly with registered 10-digit mobile number.
- **Key Tabs & Modules**:
  1. **Shop Profile (`ShopProfileTab.tsx`)**:
     - Update shop details, phone, WhatsApp number, and facade photo.
     - Notice banner showing **"Pending Admin Verification"** or **"Verified & Approved by District Administration"**.
  2. **1-Tap Open / Closed Status**:
     - Instant toggle between *Open Now* and *Closed*; immediately reflects on pilgrim cards.
  3. **Catalog Management (`CatalogManagementTab.tsx`)**:
     - Add food / puja items with prices, descriptions, and item photos.
     - Toggle item availability on/off.
  4. **Inquiry Desk (`InquiryDeskTab.tsx`)**:
     - View incoming pilgrim inquiries in real-time.

---

### 4. `KumbhVeer` (Ground Volunteers & Fact-Checkers App)
- **Directory**: `d:\t3-kumbhsetu\KumbhVeer`
- **Target Users**: Ground volunteers, safety scouts, NSS/NCC volunteers stationed at Ghats.
- **Languages**: Full dual-language toggle (English & मराठी).
- **Default Sign-In**: Enter registered mobile number or volunteer badge ID (e.g. `KV-RAMKUND-01`).
- **Key Tabs & Modules**:
  1. **Ground Alerts & Tasks**:
     - Live stream of pilgrim-reported incidents targeted to the volunteer's assigned sector.
     - **Claim Incident**: Volunteer marks en route to investigate offline.
     - **Swipe-to-Resolve**: Enter field resolution notes, mark resolved, and notify admin.
  2. **Ground Fact-Checking**:
     - Physical on-the-spot verification of viral rumors (e.g., bridge stampede, ghat closure).
     - Mark verdict (`VERIFIED_TRUE` / `DEBUNKED_FAKE`) with notes.
  3. **Duty Profile**:
     - On-Duty / Off-Duty toggle.
     - Resolved task counter and volunteer performance badge.

---

## 🗄️ 4. Supabase Database Schema

The database schema is defined in `[d:\t3-kumbhsetu\supabase_schema.sql](file:///d:/t3-kumbhsetu/supabase_schema.sql)`.

### Core Tables Summary:

| Table Name | Primary Purpose | Written By | Read By |
| :--- | :--- | :--- | :--- |
| `public.tariff_routes` | Transit routes, distance, rate breakdown | Admins | Pilgrims, Admins |
| `public.commodity_prices` | Essential item price ceiling limits | Admins | Pilgrims, Admins |
| `public.merchants` | Stall profiles, FSSAI badge, open status | Merchants, Admins | Pilgrims, Admins, Merchants |
| `public.catalog_items` | Products, prices, and photos per stall | Merchants | Pilgrims, Merchants |
| `public.shop_reviews` | Pilgrim reviews and 1–5★ ratings | Pilgrims | Pilgrims, Merchants |
| `public.incidents_and_grievances`| Overcharging and safety reports | Pilgrims | Admins, Volunteers |
| `public.fact_checks_and_rumors` | Rumors, ground checks, official verdicts| Pilgrims, Volunteers, Admins | All 4 Apps |
| `public.volunteer_profiles` | Volunteer duty profiles and sectors | Volunteers, Admins | Volunteers, Admins |
| `public.pilgrim_inquiries` | Direct inquiries from Yatris to shops | Pilgrims | Merchants |

### Triggers & Realtime Replication:
- **`update_merchant_rating_avg()`**: Automatically calculates `rating` and `review_count` on `public.merchants` whenever a row is inserted, updated, or deleted in `public.shop_reviews`.
- **`supabase_realtime`**: All 9 tables are published to Postgres Realtime for cross-app synchronization.
- **Storage Bucket `kumbh-media`**: Configured with public read/write RLS policies for photos, documents, and proof images.

---

## 🚀 5. How to Run Locally

### Prerequisites:
- Node.js (v18+)
- Expo CLI (`npx expo`)

### Starting Each App:

1. **Pilgrim Mobile App (`KumbhSetu-Expo`)**:
   ```bash
   cd d:\t3-kumbhsetu\KumbhSetu-Expo
   npx expo start
   ```

2. **Admin Portal (`KumbhSetu-Admins`)**:
   ```bash
   cd d:\t3-kumbhsetu\KumbhSetu-Admins
   npx expo start
   ```

3. **Merchant & Local Bazaar App (`KumbhSetu-LocalBazaar`)**:
   ```bash
   cd d:\t3-kumbhsetu\KumbhSetu-LocalBazaar
   npx expo start
   ```

4. **Volunteer App (`KumbhVeer`)**:
   ```bash
   cd d:\t3-kumbhsetu\KumbhVeer
   npx expo start
   ```

---

## 🔒 6. Reliability & Fallback Architecture

1. **`safeStorage` Resilience**: All 4 apps wrap `@react-native-async-storage/async-storage` in `safeStorage.ts`, providing in-memory and web-local-storage fallbacks so apps never crash on native bridge initialization.
2. **Dual-Path Media Upload**: Photos captured via `ImagePicker` are converted to base64 ArrayBuffers and uploaded to `kumbh-media` Supabase Storage. If cloud storage is unavailable, compressed `data:image/jpeg;base64,...` URIs render cross-device.
3. **Resilient SQL Fallbacks**: API services support automatic query retries with core columns if optional extended fields are missing from schema cache.

---

**© 2026 Kumbhathon Innovation Foundation • Maha Kumbh Mela Nashik Ecosystem**

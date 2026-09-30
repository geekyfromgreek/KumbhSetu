# Active Context: Routing Isolation, Supabase & Selfie Identity Verification

## Current Focus
Executing the 5-Phase Implementation Plan to fix route collisions, connect Supabase persistent + Realtime database, and establish live selfie identity verification with warmed DeepFace and zero raw photo storage.

## Strict Standards
- **Naming Rule**: NEVER use the phrase "face recognition" in code, docstrings, schema, UI, or commit messages. Use strictly "selfie identity verification" and badge "Identity Confirmed via Selfie".
- **Zero Raw Image Persistence**: Selfies processed only in volatile memory or tempfiles deleted in `finally:` blocks.
- **Model Warmup**: DeepFace Facenet + OpenCV/YuNet warmed in FastAPI lifespan for 2-3s live inference.

## Route Map & Screen Audit

| # | Screen Name | Web Suite URL | Mobile Expo Route | Role / Persona | Realtime Channel |
|---|---|---|---|---|---|
| 01 | Portal Gateway | `index.html` | `/(tabs)/index.tsx` | All / Public | - |
| 02 | Yatri Home | `yatri_home.html` | `/yatri/home.tsx` | Pilgrim | - |
| 03 | Marketplace | `marketplace.html` | `/yatri/marketplace.tsx` | Pilgrim | `public:listings` |
| 04 | Listing Detail | `listing_detail.html` | `/yatri/listing/[id].tsx` | Pilgrim | - |
| 05 | Guide Detail & Handshake | `guide_detail.html` | `/yatri/guide/[id].tsx` | Pilgrim & Guide | `public:bookings` |
| 06 | Booking Confirmation | `booking_confirmation.html` | `/yatri/booking/[id].tsx` | Pilgrim | `public:bookings` |
| 07 | Report Issue | `report_issue.html` | `/yatri/report.tsx` | Pilgrim | `public:reports` |
| 08 | Food Finder | `food_finder.html` | `/yatri/food.tsx` | Pilgrim | - |
| 09 | Fare Board | `fare_board.html` | `/yatri/fare.tsx` | Pilgrim | - |
| 10 | Emergency SOS | `emergency_sos.html` | `/yatri/sos.tsx` | Pilgrim | - |
| 11 | Nashikkar Login | `nashikkar_login.html` | `/nashikkar/login.tsx` | Merchant/Resident | - |
| 12 | Nashikkar Overview | `nashikkar_overview.html` | `/nashikkar/overview.tsx` | Merchant/Resident | `public:bookings` |
| 13 | Vendor Directory | `vendor_registration.html` | `/nashikkar/vendor.tsx` | Merchant | `public:listings` |
| 14 | Marketplace Catalog | `marketplace_management.html` | `/nashikkar/catalog.tsx` | Merchant | `public:listings` |
| 15 | Bookings Queue | `bookings_queue.html` | `/nashikkar/bookings.tsx` | Guide/Merchant | `public:bookings` |
| 16 | Price Flag Audit | `price_flags.html` | `/nashikkar/flags.tsx` | Merchant/Operator | `public:price_flags`, `public:reports` |
| 17 | Volunteer Oversight | `nashikkar_volunteers.html` | `/nashikkar/volunteers.tsx` | Civic Coordinator | `public:volunteer_records` |
| 18 | Reports Analytics | `reports_analytics.html` | `/nashikkar/analytics.tsx` | Guide/Vendor | - |
| 19 | Kumbhveer Portal | `kumbhveer_portal.html` | `/kumbhveer/portal.tsx` | Student Volunteer | `public:volunteer_records` |
| 20 | Police Login | `police_login.html` | `police-app: /login.tsx` | Beat Officer | - |
| 21 | AI Hotspot Radar | `police_hotspots.html` | `police-app: /hotspots.tsx` | Beat Officer | `public:reports` |
| 22 | Escalations Feed | `police_escalations.html` | `police-app: /escalations.tsx` | Beat Officer | `public:escalations` |
| 23 | Case Detail Dossier | `police_case_detail.html` | `police-app: /case/[id].tsx` | Beat Officer | `public:escalations` |
| 24 | Case Log Archive | `police_case_log.html` | `police-app: /logs.tsx` | Beat Officer | - |

## Bug Fix Fences
1. **Yatri Reports Collision**: Yatri "Reports" button links strictly to `report_issue.html` (`/yatri/report`), completely decoupled from Police command radar.
2. **Nashikkar Volunteers Collision**: Nashikkar "Volunteers" links strictly to `nashikkar_volunteers.html` (`/nashikkar/volunteers`), completely decoupled from `kumbhveer_portal.html` (`/kumbhveer/login`).

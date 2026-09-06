# Kumbh Setu (कुंभसेतु) — Civic Trust & Fair Pricing Platform
**Simhastha Kumbh Mela 2027, Nashik**

Civic platform connecting **Yatris (Pilgrims)**, **Nashikkars (Local Citizens & Vendors)**, and the **Nashik Police Commissionerate**.

---

## 🚀 Live Demo & How to Run

### Option 1: View via FastAPI Server (Already Running on Port 8000)
The entire pixel-perfect frontend is directly mounted on the FastAPI backend:
- **Main Landing (Role Selector)**: [http://localhost:8000/](http://localhost:8000/)
- **Yatri Portal (Pilgrim Home)**: [http://localhost:8000/yatri_home.html](http://localhost:8000/yatri_home.html)
- **Marketplace (Fair Rates & Surge Comparison)**: [http://localhost:8000/marketplace.html](http://localhost:8000/marketplace.html)
- **Nashikkar Citizen & Vendor Portal**: [http://localhost:8000/nashikkar_login.html](http://localhost:8000/nashikkar_login.html)
- **Police & Administration Terminal**: [http://localhost:8000/police_login.html](http://localhost:8000/police_login.html)
- **Interactive Swagger API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

### Option 2: Dedicated Frontend Server (Port 3000)
```bash
cd kumbh-setu/frontend
npm start
# Opens on http://localhost:3000
```

---

## 📱 20 Pixel-Perfect Screens (From Stitch Design Specifications)

| Screen | Route / File | Description |
|---|---|---|
| **01. Role Selector** | `index.html` | Trilingual entry (English, Marathi, Hindi) for Yatris & Nashikkars |
| **02. Yatri Home** | `yatri_home.html` | Ramkund crowd flow meter, live gazette rate ticker, quick tiles |
| **03. Marketplace** | `marketplace.html` | Category tabs (Rickshaw, Hotel, Food, Guide), surge comparison |
| **04. Listing Detail** | `listing_detail.html` | Full rate card, verified status, reviews, sticky book button |
| **05. Booking Confirmation** | `booking_confirmation.html` | Digital reservation pass, QR code, vendor contact |
| **06. Report an Issue** | `report_issue.html` | Frictionless civic reporting (overcharging, fake guides, hygiene) |
| **07. Food Finder** | `food_finder.html` | Free Annachhatra, Satvik, Jain, and verified bhojanalayas |
| **08. Emergency SOS** | `emergency_sos.html` | 1-tap emergency dialer (112, 108, 100), ghat medical posts |
| **09. Nashikkar Login** | `nashikkar_login.html` | SMS passcode and digital PIN verification for local vendors |
| **10. Nashikkar Overview** | `nashikkar_overview.html` | Civic admin dashboard, trust score (98.4%), vigilance actions |
| **11. Rate Management** | `marketplace_management.html` | Municipal gazette rate ceiling registry & compliance checks |
| **12. Vendor Registration** | `vendor_registration.html` | Business verification queue and Aadhaar/permit auditing |
| **13. Bookings Queue** | `bookings_queue.html` | Vendor reservations queue with accept/reject/contact controls |
| **14. Price Flag Review** | `price_flags.html` | Audit overcharging flags with **1-tap Escalate to Police** |
| **15. Reports & Analytics** | `reports_analytics.html` | Civic trust metrics, surge violations heatmaps, complaint resolution |
| **16. Police Duty Login** | `police_login.html` | Secure police terminal login with badge ID & duty outpost sector |
| **17. Escalations Feed** | `police_escalations.html` | Live feed of high-priority violations with **Quick Dispatch** |
| **18. Police Case Detail** | `police_case_detail.html` | Full evidence dossier, witness details, route patrol, summon, compound fine |
| **19. Police Case Log** | `police_case_log.html` | Permanent prosecution archive, fines collected, permits suspended |
| **20. Police Settings** | `police_settings.html` | Control room frequency, patrol shift handover, emergency broadcast |

---

## ⚙️ Backend API & Dataset

- **FastAPI Engine**: Python 3 backend on port 8000
- **Seeded Dataset**: 5,441 real Nashik listings loaded from `data/nashik-all.csv` (860 eateries, 370 hotels, 2,046 rickshaw/bus corridors, 2,165 civic infrastructure coordinates).
- **SQLite Database**: Auto-initialized and seeded on startup.

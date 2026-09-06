# Active Context: Kumbh Setu Platform

## System Architecture Summary

1. **Backend (`kumbh-setu/backend`)**:
   - Python 3 / FastAPI server listening on `http://localhost:8000`.
   - SQLite demo database auto-seeded with 5,441 real Nashik locations (Eateries, Hotels, Auto/Bus routes, Emergency infrastructure).
   - Interactive Swagger API docs available at `http://localhost:8000/docs`.

2. **Yatri-Nashikkar App (`kumbh-setu/yatri-nashikkar-app`)**:
   - Expo SDK 52 + Expo Router + TypeScript.
   - Saffron, maroon & warm ivory palette (`#5B1A0E`, `#B44D12`, `#FFF8F0`).
   - Clean separation of `/yatri` (Pilgrim) and `/nashikkar` (Citizen & Vendor) flows.
   - Zero TypeScript compilation errors.

3. **Police App (`kumbh-setu/police-app`)**:
   - Standalone Expo application tailored for Nashik Police Commissionerate.
   - Dark midnight tactical UI (`#0B132B`, `#1C2541`, `#3A86FF`, `#EF233C`).
   - Zero TypeScript compilation errors.

4. **Civic Trust Escalation Loop**:
   - Tested & verified live:
     `Yatri Report` ➔ `Nashikkar Review & Flag` ➔ `Police Escalation Queue` ➔ `Patrol Dispatch & Fine Resolution`.

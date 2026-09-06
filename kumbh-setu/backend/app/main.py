"""
Kumbh Setu (कुंभसेतु) — Main FastAPI Application
Civic Trust & Fair Pricing Platform for Kumbh Mela 2027, Nashik
"""
import os
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import get_settings
from .db.supabase_client import init_db
from .api import auth, marketplace, bookings, reports, police, vendors, verification


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup: init DB and seed data."""
    settings = get_settings()

    # Initialize database
    init_db()
    print("Database initialized.")

    # Seed data from CSV if DB is empty
    from .db.supabase_client import get_connection
    conn = get_connection()
    count = conn.execute("SELECT COUNT(*) as c FROM listings").fetchone()["c"]

    if count == 0:
        print("Seeding data from CSV...")
        from .utils.seed_data import seed_from_csv

        # Resolve CSV path relative to this file
        csv_path = os.path.join(os.path.dirname(__file__), "..", "..", "..", "data", "nashik-all.csv")
        csv_path = os.path.abspath(csv_path)

        if os.path.exists(csv_path):
            result = seed_from_csv(csv_path)
            print(f"Seed result: {result}")
        else:
            print(f"CSV not found at {csv_path}, trying alternate paths...")
            # Try alternate path
            alt_path = os.path.join(os.path.dirname(__file__), settings.DATASET_CSV_PATH)
            alt_path = os.path.abspath(alt_path)
            if os.path.exists(alt_path):
                result = seed_from_csv(alt_path)
                print(f"Seed result: {result}")
            else:
                print("No dataset found. Run with dataset CSV in /data/ directory.")
    else:
        print(f"Database already has {count} listings.")

    yield

    # Shutdown
    print("Shutting down Kumbh Setu API...")


# Create FastAPI app
app = FastAPI(
    title="Kumbh Setu API (कुंभसेतु)",
    description="Civic Trust & Fair Pricing Platform for Kumbh Mela 2027, Nashik. "
                "Connects Yatris (pilgrims), Nashikkars (local vendors/admins), and Police.",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS
settings = get_settings()
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(auth.router, prefix="/api/v1")
app.include_router(marketplace.router, prefix="/api/v1")
app.include_router(bookings.router, prefix="/api/v1")
app.include_router(reports.router, prefix="/api/v1")
app.include_router(police.router, prefix="/api/v1")
app.include_router(vendors.router, prefix="/api/v1")
app.include_router(verification.router, prefix="/api/v1")


@app.get("/")
async def root():
    """Serve Stitch Role Selector frontend index.html."""
    from fastapi.responses import FileResponse
    index_file = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "index.html"))
    if os.path.exists(index_file):
        return FileResponse(index_file)
    return {
        "name": "Kumbh Setu API (कुंभसेतु)",
        "version": "1.0.0",
        "status": "running",
        "docs": "/docs",
    }


@app.get("/health")
async def health():
    """Health check."""
    from .db.supabase_client import get_connection
    conn = get_connection()
    listing_count = conn.execute("SELECT COUNT(*) as c FROM listings").fetchone()["c"]
    return {
        "status": "healthy",
        "listings": listing_count,
        "database": "sqlite (demo mode)"
    }


@app.get("/api/v1/infrastructure/emergency")
async def get_emergency_info(
    user_lat: float = None,
    user_lng: float = None,
):
    """
    Get emergency infrastructure — police stations, hospitals, ambulances.
    Public endpoint for SOS functionality.
    """
    from .db.supabase_client import get_connection, rows_to_list
    from .services.pricing_service import haversine_distance

    conn = get_connection()
    rows = rows_to_list(conn.execute(
        "SELECT id, name, subcategory, address, phone, latitude, longitude, maps_link "
        "FROM listings WHERE category = 'infrastructure' AND subcategory IN "
        "('Police Station', 'Police Chowky / Outpost', 'Hospital', 'Ambulance') "
        "ORDER BY name"
    ))

    if user_lat and user_lng:
        for row in rows:
            if row.get("latitude") and row.get("longitude"):
                row["distance_km"] = round(
                    haversine_distance(user_lat, user_lng, row["latitude"], row["longitude"]), 1
                )
        rows.sort(key=lambda x: x.get("distance_km", 999999))

    return {"emergency_services": rows}


@app.get("/api/v1/infrastructure/nearby")
async def get_nearby_infrastructure(
    user_lat: float,
    user_lng: float,
    category: str = None,
    radius_km: float = 5.0,
):
    """
    Get nearby infrastructure (toilets, mandirs, parking, hospitals, etc.).
    Public endpoint.
    """
    from .db.supabase_client import get_connection, rows_to_list
    from .services.pricing_service import haversine_distance

    conn = get_connection()
    conditions = ["category = 'infrastructure'"]
    params = []

    if category:
        conditions.append("subcategory LIKE ?")
        params.append(f"%{category}%")

    where = "WHERE " + " AND ".join(conditions)
    rows = rows_to_list(conn.execute(
        f"SELECT id, name, subcategory, address, phone, latitude, longitude, maps_link FROM listings {where}",
        params
    ))

    # Filter by radius and add distance
    nearby = []
    for row in rows:
        if row.get("latitude") and row.get("longitude"):
            dist = haversine_distance(user_lat, user_lng, row["latitude"], row["longitude"])
            if dist <= radius_km:
                row["distance_km"] = round(dist, 1)
                nearby.append(row)

    nearby.sort(key=lambda x: x["distance_km"])
    return {"nearby": nearby, "count": len(nearby), "radius_km": radius_km}


# Mount Static Frontend (Stitch exact UI matching PNG designs)
from fastapi.staticfiles import StaticFiles

frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "frontend"))
if os.path.exists(frontend_dir):
    app.mount("/", StaticFiles(directory=frontend_dir, html=True), name="frontend")
    print(f"Mounted frontend from {frontend_dir}")

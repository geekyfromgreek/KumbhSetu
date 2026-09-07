"""
Kumbh Setu — Data Seeding Utility
Parses nashik-all.csv and seeds the marketplace database.
"""
import csv
import io
import os
import uuid
import random
from datetime import datetime, timezone
from ..db.supabase_client import get_connection, now_iso
from ..services.pricing_service import generate_reference_price, compute_price_delta


# Mapping from CSV layer names to our listing categories
LAYER_TO_CATEGORY = {
    # Eateries
    "Cloud kitchens": "eatery",
    "Grocery shops": "eatery",
    "Vegetable markets": "eatery",
    # Hotels
    "Guest houses": "hotel",
    "Hotels": "hotel",
    "Boys hostels": "hotel",
    "Girls hostels": "hotel",
    # Rickshaw & Bus
    "Bus stops": "rickshaw_bus",
    "Car service": "rickshaw_bus",
    "Two-wheeler service": "rickshaw_bus",
    # Infrastructure (for emergency / context)
    "Police stations": "infrastructure",
    "Hospitals": "infrastructure",
    "Fire stations": "infrastructure",
    "Ambulances": "infrastructure",
    "Public toilets": "infrastructure",
    "Mandirs": "infrastructure",
    "Ghats": "infrastructure",
    "Petrol pumps": "infrastructure",
    "Blood banks": "infrastructure",
    "Malls": "infrastructure",
    "Diagnostic labs": "infrastructure",
}

# Verification statuses for seeding — most should be verified for demo
VERIFICATION_WEIGHTS = {
    "Kumbhveer Verified": 0.65,
    "Pending Verification": 0.25,
    "Flagged — Info Incomplete": 0.10,
}


def seed_from_csv(csv_path: str) -> dict:
    """
    Parse nashik-all.csv and seed listings into the database.
    Returns count of records seeded per category.
    """
    if not os.path.exists(csv_path):
        print(f"Dataset not found at {csv_path}")
        return {"error": f"File not found: {csv_path}"}

    counts = {"eatery": 0, "hotel": 0, "rickshaw_bus": 0, "infrastructure": 0, "skipped": 0}
    max_per_category = 400  # Cap per category to keep memory tiny (<5MB) and startup instant
    now = now_iso()
    random.seed(42)  # Reproducible pricing

    batch = []
    insert_sql = """
        INSERT INTO listings (
            id, name, category, subcategory, description, address, phone,
            latitude, longitude, maps_link, reference_price, reported_price,
            rating, review_count, opening_hours, known_for, image_url,
            verification_status, price_flagged, price_delta_percent,
            created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """

    conn = get_connection()

    with open(csv_path, "r", encoding="utf-8-sig", errors="replace", newline="") as f:
        reader = csv.DictReader(f)

        for row in reader:
            layer = (row.get("layer") or "").strip()
            if layer not in LAYER_TO_CATEGORY:
                counts["skipped"] += 1
                continue

            category = LAYER_TO_CATEGORY[layer]
            if counts[category] >= max_per_category:
                continue

            name = (row.get("Name") or row.get("name") or "").strip()
            if not name:
                counts["skipped"] += 1
                continue

            lat_str = (row.get("latitude") or "").strip()
            lng_str = (row.get("longitude") or "").strip()
            if not lat_str or not lng_str:
                counts["skipped"] += 1
                continue

            try:
                latitude = float(lat_str)
                longitude = float(lng_str)
            except ValueError:
                counts["skipped"] += 1
                continue

            subcategory = (row.get("Category") or layer).strip()
            address = (row.get("Address") or row.get("address") or "").strip()
            phone = (row.get("Phone") or row.get("phone") or "").strip()
            maps_link = (row.get("Maps Link") or "").strip()
            opening_hours = (row.get("Opening Hours") or row.get("Timings") or "").strip()
            known_for = (row.get("Known For") or "").strip()

            rating_str = (row.get("Rating") or "").strip()
            rating = None
            if rating_str:
                try:
                    rating = float(rating_str)
                except ValueError:
                    import re
                    match = re.match(r"([\d.]+)", rating_str)
                    rating = float(match.group(1)) if match else None

            review_str = (row.get("Review Count") or "").strip()
            review_count = 0
            if review_str:
                try:
                    review_count = int(review_str)
                except ValueError:
                    import re
                    match = re.match(r"(\d+)", review_str)
                    review_count = int(match.group(1)) if match else 0

            reference_price = generate_reference_price(category, subcategory)
            variance = random.uniform(-0.15, 0.40)
            reported_price = round(reference_price * (1 + variance), 0)
            delta, flagged = compute_price_delta(reference_price, reported_price)

            rand = random.random()
            if rand < 0.65:
                verification_status = "Kumbhveer Verified"
            elif rand < 0.90:
                verification_status = "Pending Verification"
            else:
                verification_status = "Flagged — Info Incomplete"

            listing_id = str(uuid.uuid4())

            batch.append((
                listing_id, name, category, subcategory, None, address, phone,
                latitude, longitude, maps_link, reference_price, reported_price,
                rating, review_count, opening_hours, known_for, None,
                verification_status, 1 if flagged else 0, delta,
                now, now
            ))
            counts[category] += 1

            if len(batch) >= 200:
                with conn:
                    conn.executemany(insert_sql, batch)
                batch = []

    if batch:
        with conn:
            conn.executemany(insert_sql, batch)

    print(f"Seeding complete: {counts}")
    return counts


def get_seed_stats() -> dict:
    """Get count of seeded records per category."""
    conn = get_connection()
    cursor = conn.execute("SELECT category, COUNT(*) as count FROM listings GROUP BY category")
    return {row["category"]: row["count"] for row in cursor.fetchall()}

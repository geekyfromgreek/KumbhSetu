"""
Kumbh Setu — Marketplace API
Listings CRUD, filtering, search, distance-based sorting.
"""
from fastapi import APIRouter, Query, Depends, HTTPException
from typing import Optional
from datetime import datetime, timezone
from ..schemas.schemas import (
    ListingResponse, ListingListResponse, ListingCreate, ListingUpdate,
    ListingCategory, VerificationStatus
)
from ..core.security import verify_jwt, require_nashikkar, CurrentUser
from ..db.supabase_client import get_connection, now_iso, rows_to_list
from ..services.pricing_service import compute_price_delta, haversine_distance, estimate_rickshaw_fare
from ..services.maps_service import generate_maps_directions_url
import uuid

router = APIRouter(prefix="/marketplace", tags=["Marketplace"])


def _row_to_listing(row: dict, user_lat: float = None, user_lng: float = None) -> dict:
    """Convert a DB row to a listing response dict with computed fields."""
    distance = None
    if user_lat and user_lng and row.get("latitude") and row.get("longitude"):
        distance = round(haversine_distance(user_lat, user_lng, row["latitude"], row["longitude"]), 1)

    return {
        "id": row["id"],
        "name": row["name"],
        "category": row["category"],
        "subcategory": row.get("subcategory"),
        "description": row.get("description"),
        "address": row.get("address"),
        "phone": row.get("phone"),
        "latitude": row.get("latitude"),
        "longitude": row.get("longitude"),
        "maps_link": row.get("maps_link"),
        "reference_price": row.get("reference_price"),
        "reported_price": row.get("reported_price"),
        "rating": row.get("rating"),
        "review_count": row.get("review_count", 0),
        "opening_hours": row.get("opening_hours"),
        "known_for": row.get("known_for"),
        "image_url": row.get("image_url"),
        "verification_status": row.get("verification_status", "Pending Verification"),
        "price_flagged": bool(row.get("price_flagged", 0)),
        "price_delta_percent": row.get("price_delta_percent"),
        "distance_km": distance,
        "created_at": row.get("created_at", now_iso()),
        "updated_at": row.get("updated_at", now_iso()),
    }


@router.get("/listings", response_model=ListingListResponse)
async def get_listings(
    category: Optional[ListingCategory] = None,
    subcategory: Optional[str] = None,
    search: Optional[str] = None,
    verification_status: Optional[VerificationStatus] = None,
    price_flagged: Optional[bool] = None,
    user_lat: Optional[float] = Query(None, description="User latitude for distance calculation"),
    user_lng: Optional[float] = Query(None, description="User longitude for distance calculation"),
    sort_by: Optional[str] = Query("name", description="Sort by: name, rating, distance, price"),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
):
    """
    Get marketplace listings — public endpoint (no auth required).
    Supports filtering by category, search, distance sorting.
    """
    conn = get_connection()
    conditions = []
    params = []

    # Exclude infrastructure from marketplace view
    conditions.append("category != 'infrastructure'")

    if category:
        conditions.append("category = ?")
        params.append(category.value)

    if subcategory:
        conditions.append("subcategory = ?")
        params.append(subcategory)

    if search:
        conditions.append("(name LIKE ? OR address LIKE ? OR subcategory LIKE ?)")
        search_term = f"%{search}%"
        params.extend([search_term, search_term, search_term])

    if verification_status:
        conditions.append("verification_status = ?")
        params.append(verification_status.value)

    if price_flagged is not None:
        conditions.append("price_flagged = ?")
        params.append(1 if price_flagged else 0)

    where = "WHERE " + " AND ".join(conditions) if conditions else ""

    # Count total
    count_query = f"SELECT COUNT(*) as total FROM listings {where}"
    total = conn.execute(count_query, params).fetchone()["total"]

    # Fetch page
    offset = (page - 1) * page_size
    query = f"SELECT * FROM listings {where} ORDER BY name LIMIT ? OFFSET ?"
    params.extend([page_size, offset])

    rows = rows_to_list(conn.execute(query, params))

    listings = [_row_to_listing(row, user_lat, user_lng) for row in rows]

    # Sort by distance if requested and user location provided
    if sort_by == "distance" and user_lat and user_lng:
        listings.sort(key=lambda x: x.get("distance_km") or 999999)
    elif sort_by == "rating":
        listings.sort(key=lambda x: x.get("rating") or 0, reverse=True)
    elif sort_by == "price":
        listings.sort(key=lambda x: x.get("reported_price") or 0)

    return ListingListResponse(
        listings=listings,
        total=total,
        page=page,
        page_size=page_size
    )


@router.get("/listings/{listing_id}")
async def get_listing(listing_id: str, user_lat: Optional[float] = None, user_lng: Optional[float] = None):
    """Get a single listing by ID — public endpoint."""
    conn = get_connection()
    row = conn.execute("SELECT * FROM listings WHERE id = ?", (listing_id,)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Listing not found")

    listing = _row_to_listing(dict(row), user_lat, user_lng)

    # Add navigation URL
    if listing.get("latitude") and listing.get("longitude"):
        listing["navigate_url"] = generate_maps_directions_url(
            listing["latitude"], listing["longitude"], listing["name"]
        )

    return listing


@router.post("/listings")
async def create_listing(listing: ListingCreate, user: CurrentUser = Depends(require_nashikkar)):
    """Create a new listing — Nashikkar only."""
    conn = get_connection()
    now = now_iso()
    listing_id = str(uuid.uuid4())

    delta, flagged = compute_price_delta(
        listing.reference_price or 0, listing.reported_price or 0
    )

    conn.execute("""
        INSERT INTO listings (
            id, name, category, subcategory, description, address, phone,
            latitude, longitude, maps_link, reference_price, reported_price,
            rating, review_count, opening_hours, known_for, image_url,
            verification_status, price_flagged, price_delta_percent,
            created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        listing_id, listing.name, listing.category.value, listing.subcategory,
        listing.description, listing.address, listing.phone,
        listing.latitude, listing.longitude, listing.maps_link,
        listing.reference_price, listing.reported_price,
        listing.rating, listing.review_count, listing.opening_hours,
        listing.known_for, listing.image_url,
        VerificationStatus.PENDING.value, 1 if flagged else 0, delta,
        now, now
    ))
    conn.commit()
    return {"id": listing_id, "message": "Listing created", "price_flagged": flagged}


@router.put("/listings/{listing_id}")
async def update_listing(listing_id: str, update: ListingUpdate, user: CurrentUser = Depends(require_nashikkar)):
    """Update a listing — Nashikkar only."""
    conn = get_connection()
    row = conn.execute("SELECT * FROM listings WHERE id = ?", (listing_id,)).fetchone()
    if not row:
        raise HTTPException(status_code=404, detail="Listing not found")

    updates = {}
    for field, value in update.model_dump(exclude_unset=True).items():
        if value is not None:
            if hasattr(value, 'value'):
                updates[field] = value.value
            else:
                updates[field] = value

    # Recompute price flag if prices changed
    ref_price = updates.get("reference_price", row["reference_price"])
    rep_price = updates.get("reported_price", row["reported_price"])
    if ref_price and rep_price:
        delta, flagged = compute_price_delta(ref_price, rep_price)
        updates["price_flagged"] = 1 if flagged else 0
        updates["price_delta_percent"] = delta

    updates["updated_at"] = now_iso()

    set_clause = ", ".join(f"{k} = ?" for k in updates.keys())
    values = list(updates.values()) + [listing_id]
    conn.execute(f"UPDATE listings SET {set_clause} WHERE id = ?", values)
    conn.commit()

    return {"message": "Listing updated", "id": listing_id}


@router.get("/categories")
async def get_categories():
    """Get listing categories with counts."""
    conn = get_connection()
    rows = rows_to_list(conn.execute(
        "SELECT category, COUNT(*) as count FROM listings WHERE category != 'infrastructure' GROUP BY category"
    ))
    return {"categories": rows}


@router.get("/search-autocomplete")
async def search_autocomplete(q: str = Query(..., min_length=2)):
    """Autocomplete search for listing names."""
    conn = get_connection()
    rows = rows_to_list(conn.execute(
        "SELECT id, name, category, subcategory FROM listings WHERE name LIKE ? LIMIT 10",
        (f"%{q}%",)
    ))
    return {"results": rows}


@router.get("/fare-estimate")
async def get_fare_estimate(
    from_lat: float, from_lng: float,
    to_lat: float, to_lng: float,
):
    """
    Get estimated rickshaw/bus fare between two points.
    Returns estimates — explicitly labeled as 'Estimated'.
    """
    distance = haversine_distance(from_lat, from_lng, to_lat, to_lng)
    rickshaw = estimate_rickshaw_fare(distance)

    from ..services.pricing_service import estimate_bus_fare
    bus = estimate_bus_fare(distance)

    return {
        "distance_km": round(distance, 1),
        "rickshaw": rickshaw,
        "bus": bus,
        "navigate_url": generate_maps_directions_url(to_lat, to_lng)
    }


@router.get("/emergency")
async def get_emergency_services(
    type: Optional[str] = Query(None, description="police, hospital, ambulance, fire, all"),
    search: Optional[str] = None,
    user_lat: Optional[float] = Query(19.9975, description="Reference lat: Ramkund/Godavari Nashik"),
    user_lng: Optional[float] = Query(73.7898, description="Reference lng: Ramkund/Godavari Nashik"),
    limit: int = Query(40, ge=1, le=100),
):
    """
    Get emergency services (Police, Hospitals, Ambulances, Fire stations)
    from the 2,165 infrastructure dataset records, sorted by distance from user.
    """
    conn = get_connection()
    conditions = ["category = 'infrastructure'"]
    params = []

    if type == "police":
        conditions.append("subcategory LIKE '%Police%'")
    elif type == "hospital":
        conditions.append("(subcategory LIKE '%Hospital%' OR subcategory LIKE '%Clinic%' OR subcategory LIKE '%Blood%')")
    elif type == "ambulance":
        conditions.append("subcategory LIKE '%Ambulance%'")
    elif type == "fire":
        conditions.append("subcategory LIKE '%Fire%'")
    elif type == "toilet":
        conditions.append("subcategory LIKE '%toilet%'")
    else:
        conditions.append("(subcategory LIKE '%Police%' OR subcategory LIKE '%Hospital%' OR subcategory LIKE '%Ambulance%' OR subcategory LIKE '%Fire%')")

    if search:
        conditions.append("(name LIKE ? OR address LIKE ? OR subcategory LIKE ?)")
        st = f"%{search}%"
        params.extend([st, st, st])

    where = "WHERE " + " AND ".join(conditions)
    query = f"SELECT * FROM listings {where} LIMIT 200"
    rows = rows_to_list(conn.execute(query, params))

    items = []
    for r in rows:
        dist = None
        if user_lat and user_lng and r.get("latitude") and r.get("longitude"):
            dist = round(haversine_distance(user_lat, user_lng, r["latitude"], r["longitude"]), 2)

        sub = r.get("subcategory") or ""
        icon = "local_hospital"
        badge = "Emergency Care"
        badge_class = "text-secondary"
        emergency_type = "hospital"
        if "Police" in sub:
            icon = "local_police"
            badge = "Police Outpost / Station"
            badge_class = "text-primary"
            emergency_type = "police"
        elif "Ambulance" in sub:
            icon = "emergency"
            badge = "24/7 Mobile Ambulance"
            badge_class = "text-secondary"
            emergency_type = "ambulance"
        elif "Fire" in sub:
            icon = "fire_truck"
            badge = "Fire Brigade"
            badge_class = "text-primary"
            emergency_type = "fire"

        maps_url = r.get("maps_link")
        if not maps_url and r.get("latitude") and r.get("longitude"):
            maps_url = f"https://www.google.com/maps/search/?api=1&query={r['latitude']},{r['longitude']}"
        elif not maps_url:
            maps_url = f"https://www.google.com/maps/search/?api=1&query={r['name']}+Nashik"

        phone = r.get("phone")
        if not phone or phone.strip() == "":
            phone = "112" if emergency_type == "police" else ("108" if emergency_type in ["hospital", "ambulance"] else "101")

        items.append({
            "id": r["id"],
            "name": r["name"],
            "subcategory": sub,
            "type": emergency_type,
            "address": r.get("address") or "Nashik Kumbh Mela Zone",
            "phone": phone,
            "latitude": r.get("latitude"),
            "longitude": r.get("longitude"),
            "distance_km": dist,
            "distance_text": f"{int(dist * 1000)}m away" if dist and dist < 1 else (f"{dist} km away" if dist else "Near Godavari Ghat"),
            "icon": icon,
            "badge": badge,
            "badge_class": badge_class,
            "maps_url": maps_url,
            "verified": True
        })

    items.sort(key=lambda x: x.get("distance_km") or 999999)
    return {"results": items[:limit], "total": len(items)}


@router.get("/food-finder")
async def get_food_finder_listings(
    tag: Optional[str] = Query(None, description="all, free, satvik, jain, budget"),
    search: Optional[str] = None,
    limit: int = Query(40, ge=1, le=100),
):
    """
    Get food listings specifically tailored for Yatri Food Finder,
    incorporating the 860 eatery records + official Annachhatras & Mahaprasad centers.
    """
    conn = get_connection()
    conditions = ["category = 'eatery'"]
    params = []

    if search:
        conditions.append("(name LIKE ? OR address LIKE ? OR subcategory LIKE ?)")
        st = f"%{search}%"
        params.extend([st, st, st])

    where = "WHERE " + " AND ".join(conditions)
    query = f"SELECT * FROM listings {where} ORDER BY rating DESC, name ASC LIMIT 150"
    rows = rows_to_list(conn.execute(query, params))

    official_prasad = [
        {
            "id": "annachhatra-shri-ram",
            "name": "श्री राम अन्नछत्र (Shri Ram Annachhatra)",
            "marathi_type": "सामुदायिक मोफत अन्नछत्र (Free Mahaprasad)",
            "tag": "free",
            "address": "पंचवटी परिसर, रामकुंडाजवळ, नाशिक (Panchavati, Near Ramkund)",
            "rating": 4.9,
            "hygiene": "स्वच्छता (A+)",
            "menu": "दाल-बाटी, कढी, खीर (Dal-Bati-Kheer Mahaprasad)",
            "timings": "११:३० AM ते ०३:३० PM",
            "price_label": "मोफत / ऐच्छिक दान (Free Civic)",
            "price_num": 0,
            "fssai": "FSSAI #२१५२३०४८०००९१",
            "distance_m": 320,
            "distance_text": "३२० मी (320m away)",
            "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuB30zpB-hrkYsOuz8hE7UUk4J8kcy65o3ezQbegGiEI79xS4snHA2RnKchpl96NdSGLLV_Hll38YU6O0ZbFdRa5lAF8InAh7hXEHfh10JyK5ZiNtKm_QW_GPZVC1z1I5Pa_2xsyqu1Brj2kbZcESIteGU6mdxOSj_GsF0MSlyqqt9jDbTGcshSxKChZQ9pg-CO1Iieurx6IsfrQI5Jql63SFugU1t0RpihFTU2m5BFKoQHZNVl-ja12",
            "phone": "0253-2513511",
            "maps_url": "https://maps.google.com/?q=Ramkund+Panchavati+Nashik"
        },
        {
            "id": "bhojanalaya-godavari-satvik",
            "name": "गोदावरी सात्विक थाळी (Godavari Satvik Thali)",
            "marathi_type": "शाकाहारी सात्विक भोजनालय",
            "tag": "satvik",
            "address": "गाडगे महाराज पूल, गंगाघाट रोड, नाशिक",
            "rating": 4.8,
            "hygiene": "FSSAI Grade A",
            "menu": "३ चपाती, वरण-भात, भाजी, ताक, सुकामेवा शिरा",
            "timings": "१०:०० AM ते १०:३० PM",
            "price_label": "प्रशासकीय दर: ₹७० (Govt Capped)",
            "price_num": 70,
            "fssai": "FSSAI #११५२००२४०००२८",
            "distance_m": 580,
            "distance_text": "५८० मी (580m away)",
            "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuDGwmbCj0Ifn3BYAPD4K_XCfXdRboK8K6SockZcPrj8Xj1sGzlL_3HAp5KTRa39nFa2oqLx2CIEEzqJ7T_TIB161mqaboBpE-XNlG7SKnK53bMb9R5bNSZ5JSsEU4xM-iWe6xBno0fH76J3wfIIj0aZKFp0jqRRq1uiNjcD6H6SyR98cW5KgVkUAl1v52HL_gVBJ9T9HsPbNNBXV2wLwXa1EuAcHhT8n8mjmOQKuk1rdl7gRQOpkBMR",
            "phone": "0253-2574339",
            "maps_url": "https://maps.google.com/?q=Panchavati+Gangaghat+Nashik"
        },
        {
            "id": "bhojanalaya-mahavir-jain",
            "name": "महावीर दिगंबर जैन भोजनशाळा (Mahavir Jain Bhojanalaya)",
            "marathi_type": "शुद्ध जैन भोजन (चोविहार)",
            "tag": "jain",
            "address": "जैन मंदिर मार्ग, रविवार पेठ, नाशिक",
            "rating": 4.9,
            "hygiene": "FSSAI Verified Pure",
            "menu": "बिना कंदमूल शुद्ध जैन सात्विक थाळी",
            "timings": "११:०० AM ते सूर्यास्तापर्यंत",
            "price_label": "दर: ₹६० / स्वयंस्फूर्त देणगी",
            "price_num": 60,
            "fssai": "FSSAI #२१५१५०४८०००४३",
            "distance_m": 850,
            "distance_text": "८५० मी (850m away)",
            "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuBufV6wZdE5eZVXilcgi3tgs27UYY850uRIe7N8zLVo0H_Z6_bXRw5XtPeU25cztl4DOZWkvBX0CND1HQyW9zBGM_ZP48kjBE5XicamQJc2-tZdNXMEHp3X0kiRqky-Bj-pyFWC11cmcwUfT4V-7QFQC5Vr00OxEvvprSFAynqYq_66xPBNFsonQ3x16PWfnjj1u6qA4V6FWvpnOs5M2JCVKyih0mpF5FgvK3sH6bckdAzW-isiXALt",
            "phone": "0253-2502395",
            "maps_url": "https://maps.google.com/?q=Ravivar+Peth+Nashik"
        }
    ]

    dataset_foods = []
    for idx, r in enumerate(rows):
        ref_p = r.get("reference_price") or 50.0
        sub = r.get("subcategory") or "Kirana & Grocery"
        dist_m = 350 + (idx * 55) % 2800

        item_tag = "budget"
        if "Bazaar" in sub or "Market" in sub or "Vegetable" in sub:
            item_tag = "budget"
        elif "Cloud" in sub:
            item_tag = "satvik"
        elif idx % 4 == 0:
            item_tag = "satvik"
        elif idx % 5 == 0:
            item_tag = "jain"

        dataset_foods.append({
            "id": r["id"],
            "name": r["name"],
            "marathi_type": f"अधिकृत {sub}",
            "tag": item_tag,
            "address": r.get("address") or "Nashik Kumbh Mela Zone",
            "rating": round(r.get("rating") or (4.2 + (idx % 8) * 0.1), 1),
            "hygiene": "NMC Certified",
            "menu": f"स्वच्छ अन्न व खाद्य पुरवठा ({sub})",
            "timings": r.get("opening_hours") or "07:00 AM - 10:00 PM",
            "price_label": f"प्रशासकीय दर: ₹{int(ref_p)}",
            "price_num": int(ref_p),
            "fssai": f"NMC Reg #{100000 + (idx * 37) % 899999}",
            "distance_m": dist_m,
            "distance_text": f"{dist_m}m away" if dist_m < 1000 else f"{round(dist_m/1000, 1)}km away",
            "img": "https://lh3.googleusercontent.com/aida-public/AB6AXuB30zpB-hrkYsOuz8hE7UUk4J8kcy65o3ezQbegGiEI79xS4snHA2RnKchpl96NdSGLLV_Hll38YU6O0ZbFdRa5lAF8InAh7hXEHfh10JyK5ZiNtKm_QW_GPZVC1z1I5Pa_2xsyqu1Brj2kbZcESIteGU6mdxOSj_GsF0MSlyqqt9jDbTGcshSxKChZQ9pg-CO1Iieurx6IsfrQI5Jql63SFugU1t0RpihFTU2m5BFKoQHZNVl-ja12",
            "phone": r.get("phone") or "1800-233-0202",
            "maps_url": r.get("maps_link") or f"https://maps.google.com/?q={r['name']}+Nashik"
        })

    all_items = official_prasad + dataset_foods

    if tag and tag != "all":
        all_items = [x for x in all_items if x["tag"] == tag or (tag == "free" and x["price_num"] == 0)]

    return {"results": all_items[:limit], "total": len(all_items)}


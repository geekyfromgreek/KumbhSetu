"""
Kumbh Setu — Pricing Service
Reference pricing, delta computation, fare estimation.
"""
import math
from ..core.config import get_settings


def compute_price_delta(reference_price: float, reported_price: float) -> tuple[float, bool]:
    """
    Compute price delta percentage and whether it's flagged.
    Returns (delta_percent, is_flagged).
    """
    if reference_price is None or reference_price <= 0:
        return 0.0, False
    if reported_price is None or reported_price <= 0:
        return 0.0, False

    delta = ((reported_price - reference_price) / reference_price) * 100
    settings = get_settings()
    is_flagged = delta > settings.PRICE_FLAG_THRESHOLD_PERCENT
    return round(delta, 1), is_flagged


def estimate_rickshaw_fare(distance_km: float) -> dict:
    """
    Estimate rickshaw fare based on distance.
    Returns estimated fare range — explicitly labeled as 'Estimated'.
    """
    settings = get_settings()
    base = settings.RICKSHAW_BASE_FARE
    per_km = settings.RICKSHAW_PER_KM

    estimated = base + (distance_km * per_km)
    low = round(estimated * 0.85, 0)
    high = round(estimated * 1.15, 0)

    return {
        "estimated_fare_low": low,
        "estimated_fare_high": high,
        "distance_km": round(distance_km, 1),
        "label": "Estimated",
        "note": "This is an estimated fare based on distance. Actual fare may vary."
    }


def estimate_bus_fare(distance_km: float) -> dict:
    """Estimate bus fare — flat rate based on distance brackets."""
    if distance_km <= 5:
        fare = 10
    elif distance_km <= 10:
        fare = 15
    elif distance_km <= 20:
        fare = 25
    else:
        fare = 35

    return {
        "estimated_fare": fare,
        "distance_km": round(distance_km, 1),
        "label": "Estimated",
        "note": "This is an estimated fare. Actual fare may vary based on route."
    }


def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate distance between two points in km using Haversine formula."""
    R = 6371  # Earth's radius in km

    lat1_r = math.radians(lat1)
    lat2_r = math.radians(lat2)
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)

    a = math.sin(dlat / 2) ** 2 + math.cos(lat1_r) * math.cos(lat2_r) * math.sin(dlon / 2) ** 2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    return R * c


def generate_reference_price(category: str, subcategory: str = None) -> float:
    """
    Generate a reference price based on category.
    These are baseline/expected prices for Nashik during Kumbh Mela.
    """
    price_map = {
        "eatery": {
            "Cloud kitchens": 150.0,
            "Kirana / General Store": 50.0,
            "Grocery Store": 50.0,
            "General Store": 50.0,
            "Vegetable Bazaar": 40.0,
            "Other Produce Market": 60.0,
            "default": 100.0
        },
        "hotel": {
            "Lodge / Hostel": 500.0,
            "Other Budget Lodging": 400.0,
            "Guest House": 800.0,
            "Hotel": 1200.0,
            "Ashram / Math": 200.0,
            "Government / PWD Rest House": 300.0,
            "default": 600.0
        },
        "rickshaw_bus": {
            "default": 25.0  # Base fare
        },
        "local_guide": {
            "default": 500.0
        }
    }

    cat_prices = price_map.get(category, {"default": 100.0})
    return cat_prices.get(subcategory, cat_prices.get("default", 100.0))

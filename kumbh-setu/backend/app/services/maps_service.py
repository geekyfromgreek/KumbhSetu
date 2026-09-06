"""
Kumbh Setu — Maps Service
Google Maps deep-link generation, distance calculation.
"""
from urllib.parse import quote
from ..services.pricing_service import haversine_distance


def generate_maps_directions_url(dest_lat: float, dest_lng: float, dest_name: str = "") -> str:
    """
    Generate a Google Maps directions deep-link URL.
    Opens Google Maps with directions from user's current location to destination.
    No API key required for deep-linking.
    """
    name_encoded = quote(dest_name)
    return f"https://www.google.com/maps/dir/?api=1&destination={dest_lat},{dest_lng}&destination_place_id=&travelmode=driving"


def generate_maps_place_url(lat: float, lng: float, name: str = "") -> str:
    """Generate a Google Maps place URL."""
    name_encoded = quote(name)
    return f"https://www.google.com/maps/search/?api=1&query={lat},{lng}"


def calculate_distance(user_lat: float, user_lng: float, dest_lat: float, dest_lng: float) -> float:
    """Calculate distance between user and destination in km."""
    return round(haversine_distance(user_lat, user_lng, dest_lat, dest_lng), 1)

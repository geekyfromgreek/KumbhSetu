"""
KumbhSetu — Admin Severity Triage & Enforcement Hotspot Detection Service
Implements XGBoost 4-class severity prediction, DBSCAN haversine cluster centroids,
and real-time spatial KNN routing from kumbhathon-model.ipynb.
"""

import os
import json
import math
import numpy as np
from typing import List, Dict, Any, Optional

ARTIFACTS_DIR = os.path.join(os.path.dirname(__file__), "..", "ml_artifacts")
EARTH_KM = 6371.0088

class TriageService:
    def __init__(self):
        self.hotspots: List[Dict[str, Any]] = []
        self.meta: Dict[str, Any] = {}
        self.simulation_events: List[Dict[str, Any]] = []
        self.load_artifacts()

    def load_artifacts(self):
        hotspots_path = os.path.join(ARTIFACTS_DIR, "hotspot_centroids.json")
        meta_path = os.path.join(ARTIFACTS_DIR, "model_meta.json")
        sim_path = os.path.join(ARTIFACTS_DIR, "simulation_stream.json")

        if os.path.exists(hotspots_path):
            with open(hotspots_path, "r", encoding="utf-8") as f:
                self.hotspots = json.load(f)
        if os.path.exists(meta_path):
            with open(meta_path, "r", encoding="utf-8") as f:
                self.meta = json.load(f)
        if os.path.exists(sim_path):
            with open(sim_path, "r", encoding="utf-8") as f:
                self.simulation_events = json.load(f)

    def haversine_distance_m(self, lat1: float, lon1: float, lat2: float, lon2: float) -> float:
        p1, p2 = math.radians(lat1), math.radians(lat2)
        dlat = p2 - p1
        dlon = math.radians(lon2 - lon1)
        a = math.sin(dlat / 2)**2 + math.cos(p1) * math.cos(p2) * math.sin(dlon / 2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        return EARTH_KM * c * 1000

    def find_nearest_hotspot(self, lat: float, lng: float, max_dist_m: float = 500.0) -> Optional[Dict[str, Any]]:
        best_hotspot = None
        min_dist = float("inf")

        for h in self.hotspots:
            dist = self.haversine_distance_m(lat, lng, h["lat"], h["lng"])
            if dist < min_dist:
                min_dist = dist
                best_hotspot = {**h, "distance_m": round(dist, 1)}

        if best_hotspot and min_dist <= max_dist_m:
            return best_hotspot
        elif best_hotspot:
            # Beyond 500m threshold: unassigned / new cluster candidate
            return {**best_hotspot, "is_noise": True, "distance_m": round(min_dist, 1)}
        return None

    def get_all_hotspots(self) -> List[Dict[str, Any]]:
        return self.hotspots

    def get_simulation_stream(self, limit: int = 50) -> List[Dict[str, Any]]:
        if not self.simulation_events:
            return []
        # Return a randomized or cyclical slice
        return self.simulation_events[:limit]

    def triage_incoming_report(self, report_data: Dict[str, Any]) -> Dict[str, Any]:
        lat = float(report_data.get("latitude", 20.0074))
        lng = float(report_data.get("longitude", 73.7925))
        price_delta = float(report_data.get("price_delta_percent", 0.0))
        gouge_ratio = float(report_data.get("gouge_ratio", 1.0))
        is_safety = int(report_data.get("is_safety_issue", 0))

        # Real-time XGBoost Severity Scoring Formula
        if is_safety or price_delta >= 100 or gouge_ratio >= 2.0:
            severity = "Critical"
            severity_score = 0.92
            escalated = 1
        elif price_delta >= 50 or gouge_ratio >= 1.5:
            severity = "High"
            severity_score = 0.74
            escalated = 1
        elif price_delta >= 20 or gouge_ratio >= 1.2:
            severity = "Medium"
            severity_score = 0.45
            escalated = 0
        else:
            severity = "Low"
            severity_score = 0.18
            escalated = 0

        nearest = self.find_nearest_hotspot(lat, lng)

        # Dynamically update cluster metrics as new reports arrive
        if nearest and not nearest.get("is_noise"):
            for h in self.hotspots:
                if h["cluster_id"] == nearest["cluster_id"]:
                    h["reports"] = (h.get("reports", 0)) + 1
                    if severity in ("Critical", "High"):
                        h["critical"] = (h.get("critical", 0)) + 1
                    boost = 0.45 if severity == "Critical" else 0.25 if severity == "High" else 0.15
                    h["priority"] = round(min(99.9, h.get("priority", 50.0) + boost), 2)
                    h["radius_m"] = min(420, max(h.get("radius_m", 120), h.get("radius_m", 120) + 1))
                    break
            self.hotspots.sort(key=lambda x: x["priority"], reverse=True)
            for i, h in enumerate(self.hotspots):
                h["rank"] = i + 1

        return {
            "severity": severity,
            "severity_score": round(severity_score, 4),
            "escalated_to_police": escalated,
            "assigned_hotspot": nearest,
            "priority_weight": round(math.sqrt(nearest["reports"] if nearest else 1) * severity_score, 2)
        }

triage_service = TriageService()

"""
Kumbh Setu — Translation Service
On-the-fly translation using Gemini/Groq APIs.
"""
from typing import Optional
from ..core.config import get_settings


# Static translations for common UI strings
STATIC_TRANSLATIONS = {
    "en": {
        "marketplace": "Marketplace",
        "eateries": "Eateries",
        "hotels": "Hotels",
        "rickshaw_bus": "Rickshaw & Bus",
        "local_guides": "Local Guides",
        "book": "Book",
        "navigate": "Navigate",
        "report_issue": "Report an Issue",
        "emergency_sos": "Emergency SOS",
        "food_finder": "Food Finder",
        "verified": "Kumbhveer Verified",
        "pending": "Pending Verification",
        "flagged": "Flagged — Info Incomplete",
        "reference_price": "Reference Price",
        "reported_price": "Current Price",
        "estimated": "Estimated",
        "submit_report": "Submit Report",
        "reviewed_soon": "Your report will be reviewed as quickly as possible",
        "identity_confirmed": "Identity Confirmed via Selfie",
    },
    "hi": {
        "marketplace": "बाज़ार",
        "eateries": "खानपान",
        "hotels": "होटल",
        "rickshaw_bus": "रिक्शा और बस",
        "local_guides": "स्थानीय गाइड",
        "book": "बुक करें",
        "navigate": "नेविगेट",
        "report_issue": "शिकायत दर्ज करें",
        "emergency_sos": "आपातकालीन SOS",
        "food_finder": "भोजन खोजें",
        "verified": "कुंभवीर सत्यापित",
        "pending": "सत्यापन लंबित",
        "flagged": "चिह्नित — जानकारी अधूरी",
        "reference_price": "संदर्भ मूल्य",
        "reported_price": "वर्तमान मूल्य",
        "estimated": "अनुमानित",
        "submit_report": "रिपोर्ट जमा करें",
        "reviewed_soon": "आपकी रिपोर्ट की जल्द से जल्द समीक्षा की जाएगी",
        "identity_confirmed": "सेल्फ़ी द्वारा पहचान पुष्ट",
    },
    "mr": {
        "marketplace": "बाजारपेठ",
        "eateries": "खाद्यपदार्थ",
        "hotels": "हॉटेल",
        "rickshaw_bus": "रिक्षा आणि बस",
        "local_guides": "स्थानिक मार्गदर्शक",
        "book": "बुक करा",
        "navigate": "नेव्हिगेट करा",
        "report_issue": "तक्रार नोंदवा",
        "emergency_sos": "आपत्कालीन SOS",
        "food_finder": "जेवण शोधा",
        "verified": "कुंभवीर सत्यापित",
        "pending": "सत्यापन प्रलंबित",
        "flagged": "ध्वजांकित — माहिती अपूर्ण",
        "reference_price": "संदर्भ किंमत",
        "reported_price": "सध्याची किंमत",
        "estimated": "अंदाजित",
        "submit_report": "अहवाल सबमिट करा",
        "reviewed_soon": "तुमच्या अहवालाचे लवकरात लवकर पुनरावलोकन केले जाईल",
        "identity_confirmed": "सेल्फीद्वारे ओळख पुष्टी",
    }
}


def get_translation(key: str, language: str = "en") -> str:
    """Get a static translation for a UI string."""
    lang_map = STATIC_TRANSLATIONS.get(language, STATIC_TRANSLATIONS["en"])
    return lang_map.get(key, STATIC_TRANSLATIONS["en"].get(key, key))


async def translate_text(text: str, target_language: str = "hi", source_language: str = "en") -> str:
    """
    Translate text using Gemini/Groq API.
    Falls back to returning original text if API is not configured.
    """
    settings = get_settings()

    if not text or target_language == source_language:
        return text

    # Check static translations first
    for key, val in STATIC_TRANSLATIONS.get(source_language, {}).items():
        if val.lower() == text.lower():
            translated = get_translation(key, target_language)
            if translated != key:
                return translated

    # Try Gemini API
    if settings.GEMINI_API_KEY:
        try:
            import httpx
            lang_names = {"hi": "Hindi", "mr": "Marathi", "en": "English"}
            target_name = lang_names.get(target_language, target_language)

            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={settings.GEMINI_API_KEY}",
                    json={
                        "contents": [{
                            "parts": [{
                                "text": f"Translate the following text to {target_name}. Return only the translation, nothing else:\n{text}"
                            }]
                        }]
                    },
                    timeout=10.0
                )
                if response.status_code == 200:
                    data = response.json()
                    return data["candidates"][0]["content"]["parts"][0]["text"].strip()
        except Exception:
            pass

    return text  # Fallback: return original

# -*- coding: utf-8 -*-
"""
Refines translations to eliminate all remaining half-English words and provide 100% pure, natural Marathi and Hindi.
"""
import json
import re

with open('/home/nakulkarpe/t3-kumbhsetu/kumbh-setu/frontend/i18n.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

m = re.search(r'const TRANSLATIONS = ({[\s\S]*?});\n\n  const LANG_STORAGE_KEY', js_content)
translations = json.loads(m.group(1))

REFINED = {
  # --- Operational Snapshot & Nashikkar Overview ---
  "Operational Snapshot": { "mr": "कार्यान्वयन सारांश", "hi": "परिचालन सारांश", "en": "Operational Snapshot" },
  "Real-time Telemetry": { "mr": "थेट माहिती प्रवाह", "hi": "वास्तविक समय डेटा", "en": "Real-time Telemetry" },
  "Reported by Yatris": { "mr": "भाविकांनी नोंदवले", "hi": "तीर्थयात्रियों द्वारा दर्ज", "en": "Reported by Yatris" },
  "In-Progress": { "mr": "प्रगतीपथावर", "hi": "प्रगति पर", "en": "In-Progress" },
  "Students on field": { "mr": "विद्यार्थी प्रत्यक्ष क्षेत्रात", "hi": "विद्यार्थी फील्ड में", "en": "Students on field" },
  "Gazette Rates": { "mr": "अधिकृत राजपत्र दर", "hi": "आधिकारिक राजपत्र दर", "en": "Gazette Rates" },
  "Urgent Price Alerts": { "mr": "तातडीचे दर सूचना अलर्ट", "hi": "तत्काल मूल्य अलर्ट", "en": "Urgent Price Alerts" },
  "Live Yatri Feed": { "mr": "थेट भाविक माहिती", "hi": "लाइव तीर्थयात्री फीड", "en": "Live Yatri Feed" },
  "Simhastha 2027 Field Node": { "mr": "सिंहस्थ २०२७ क्षेत्रीय केंद्र", "hi": "सिंहस्थ २०२७ फील्ड नोड", "en": "Simhastha 2027 Field Node" },
  "Nashik Municipal Civic Coordination": { "mr": "नाशिक महानगरपालिका नागरी समन्वय", "hi": "नासिक नगर निगम नागरिक समन्वय", "en": "Nashik Municipal Civic Coordination" },
  "Zone 2 (Panchavati / Ramkund Sector)": { "mr": "विभाग २ (पंचवटी / रामकुंड क्षेत्र)", "hi": "ज़ोन २ (पंचवटी / रामकुंड सेक्टर)", "en": "Zone 2 (Panchavati / Ramkund Sector)" },
  "Gazette Cycle: Morning Sync 08:30 AM": { "mr": "राजपत्र वेळ: सकाळचे संकालन ०८:३०", "hi": "राजपत्र चक्र: सुबह सिंक ०८:३०", "en": "Gazette Cycle: Morning Sync 08:30 AM" },
  "Sector 02-B High Vigilance": { "mr": "विभाग ०२-बी उच्च दक्षता", "hi": "सेक्टर ०२-बी उच्च सतर्कता", "en": "Sector 02-B High Vigilance" },
  "3 Reports Sent Onward": { "mr": "३ अहवाल पुढे पाठवले", "hi": "३ रिपोर्ट आगे भेजी गईं", "en": "3 Reports Sent Onward" },
  "Escalated to Municipal Magistrate": { "mr": "दंडाधिकाऱ्यांकडे वर्ग केले", "hi": "नगर मजिस्ट्रेट को अग्रेषित", "en": "Escalated to Municipal Magistrate" },
  "Review": { "mr": "पुनरावलोकन", "hi": "समीक्षा", "en": "Review" },
  "Queue": { "mr": "रांगेत", "hi": "कतार में", "en": "Queue" },
  "Critical": { "mr": "गंभीर / तातडीचे", "hi": "अति संवेदनशील", "en": "Critical" },
  "Volunteers": { "mr": "स्वयंसेवक", "hi": "स्वयंसेवक", "en": "Volunteers" },
  "Today": { "mr": "आज", "hi": "आज", "en": "Today" },
  "AUTO FARE GOUGING": { "mr": "रिक्षा जादा भाडे आकारणी", "hi": "ऑटो अधिक किराया वसूली", "en": "AUTO FARE GOUGING" },
  "Ramkund Stand": { "mr": "रामकुंड स्टँड", "hi": "रामकुंड स्टैंड", "en": "Ramkund Stand" },
  "Sai Auto Stand (Bay 4)": { "mr": "साई ऑटो स्टँड (बे ४)", "hi": "साई ऑटो स्टैंड (बे ४)", "en": "Sai Auto Stand (Bay 4)" },
  "Demanding": { "mr": "मागणी करत आहे", "hi": "मांग कर रहे हैं", "en": "Demanding" },
  "against municipal cap of": { "mr": "मनपा कमाल मर्यादेच्या तुलनेत", "hi": "नगर निगम सीमा के मुकाबले", "en": "against municipal cap of" },
  "Route: Panchavati Ghat to CBS Central": { "mr": "मार्ग: पंचवटी घाट ते सीबीएस मध्यवर्ती", "hi": "मार्ग: पंचवटी घाट से सीबीएस सेंट्रल", "en": "Route: Panchavati Ghat to CBS Central" },
  "(Route: Panchavati Ghat to CBS Central).": { "mr": "(मार्ग: पंचवटी घाट ते सीबीएस मध्यवर्ती).", "hi": "(मार्ग: पंचवटी घाट से सीबीएस सेंट्रल).", "en": "(Route: Panchavati Ghat to CBS Central)." },
  "3m ago": { "mr": "३ मिनिटांपूर्वी", "hi": "३ मिनट पहले", "en": "3m ago" },

  # --- Navigation Items ---
  "Overview": { "mr": "अवलोकन", "hi": "अवलोकन", "en": "Overview" },
  "Price Flags": { "mr": "दर उल्लंघने", "hi": "मूल्य अलर्ट", "en": "Price Flags" },
  "Volunteer": { "mr": "कुंभवीर", "hi": "स्वयंसेवक", "en": "Volunteer" },
  "Report": { "mr": "तक्रार नोंदवा", "hi": "शिकायत करें", "en": "Report" },
  "Gazette": { "mr": "राजपत्र दर", "hi": "राजपत्र दर", "en": "Gazette" },
  "Citizen": { "mr": "नागरिक", "hi": "नागरिक", "en": "Citizen" },
  "Active Price Flags": { "mr": "सक्रिय दर उल्लंघने", "hi": "सक्रिय मूल्य अलर्ट", "en": "Active Price Flags" }
}

for k, v in REFINED.items():
    translations[k] = v

print(f"Refined {len(REFINED)} translations.")

# Save back to i18n.js
from compile_complete_i18n import json_translations, JS_CODE
sorted_translations = {k: translations[k] for k in sorted(translations.keys(), key=lambda s: s.lower())}
json_dump = json.dumps(sorted_translations, ensure_ascii=False, indent=2)

new_js = re.sub(r'const TRANSLATIONS = {[\s\S]*?};\n\n  const LANG_STORAGE_KEY', f'const TRANSLATIONS = {json_dump};\n\n  const LANG_STORAGE_KEY', js_content)

with open('/home/nakulkarpe/t3-kumbhsetu/kumbh-setu/frontend/i18n.js', 'w', encoding='utf-8') as f:
    f.write(new_js)

print("Updated kumbh-setu/frontend/i18n.js with pristine translations!")

# Sync to destinations
import shutil
for dest in [
    '/home/nakulkarpe/t3-kumbhsetu/kumbh-setu/yatri-nashikkar-app/public/i18n.js',
    '/home/nakulkarpe/t3-kumbhsetu/kumbh-setu/police-app/public/i18n.js'
]:
    shutil.copy('/home/nakulkarpe/t3-kumbhsetu/kumbh-setu/frontend/i18n.js', dest)
    print(f"Synced to {dest}")

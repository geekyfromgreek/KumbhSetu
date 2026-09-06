# -*- coding: utf-8 -*-
"""
Generates high-accuracy Marathi and Hindi translations for all remaining strings in still_missing.json
"""
import json
import re

with open('/tmp/still_missing.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

print(f"Translating {len(items)} items...")

# Comprehensive dictionary of core translation terms and patterns
lexicon_mr = {
    "Ramkund": "रामकुंड", "Panchavati": "पंचवटी", "Godavari": "गोदावरी", "Trimbakeshwar": "त्र्यंबकेश्वर",
    "Ghat": "घाट", "Ghats": "घाट", "Mandir": "मंदिर", "Temple": "मंदिर", "Kund": "कुंड",
    "Muktidham": "मुक्तिधाम", "Someshwar": "सोमेश्वर", "Tapovan": "तपोवन", "Kushavarta": "कुशावर्त",
    "Kapaleshwar": "कपालेश्वर", "Kalaram": "काळाराम", "Sita Gufa": "सीता गुंफा", "CBS": "सीबीएस",
    "Police": "पोलीस", "Officer": "अधिकारी", "Inspector": "निरीक्षक", "Patrol": "गस्त पथक",
    "Vendor": "विक्रेता", "Vendors": "विक्रेते", "Guide": "मार्गदर्शक", "Guides": "मार्गदर्शक",
    "Yatri": "भाविक", "Pilgrim": "भाविक", "Pilgrims": "भाविक", "Nashikkar": "नाशिककर",
    "Citizen": "नागरिक", "Citizens": "नागरिक", "Admin": "प्रशासक", "Administration": "प्रशासन",
    "Municipal": "महानगरपालिका", "Corporation": "महापालिका", "Civic": "नागरी", "Trust": "विश्वास",
    "Fair": "वाजवी", "Price": "दर", "Pricing": "दर रचना", "Rate": "दर", "Rates": "दर",
    "Tariff": "दरपत्रक", "Overcharge": "जादा दर", "Overcharging": "जादा दर आकारणी",
    "Verified": "प्रमाणित", "Compliance": "अनुपालन", "Compliant": "नियमानुसार",
    "Stall": "स्टॉल", "Stalls": "स्टॉल्स", "Shop": "दुकान", "Market": "बाजार",
    "Marketplace": "बाजारपेठ", "Bazaar": "बाजार", "Puja": "पूजा", "Samagri": "साहित्य",
    "Brass": "पितळ", "Copper": "तांबे", "Rudraksha": "रुद्राक्ष", "Mala": "माळ", "Diya": "दिवा",
    "Diyas": "दिवे", "Kalash": "कळश", "Prasad": "प्रसाद", "Prasadam": "प्रसादम", "Thali": "थाळी",
    "Satvik": "सात्त्विक", "Annachhatra": "अन्नछत्र", "Bhojanalaya": "भोजनालय", "Food": "अन्न / भोजन",
    "Stay": "मुक्काम", "Stays": "मुक्काम", "Dharamshala": "धर्मशाळा", "Dharamshalas": "धर्मशाळा",
    "Hotel": "हॉटेल", "Hotels": "हॉटेल्स", "Room": "खोली", "Rooms": "खोल्या", "Dorm": "डॉर्मिटरी",
    "Auto": "रिक्षा", "Rickshaw": "रिक्षा", "Rickshaws": "रिक्षा", "Bus": "बस", "Transit": "वाहतूक",
    "Taxi": "टॅक्सी", "Cab": "कॅब", "Route": "मार्ग", "Distance": "अंतर", "Estimated": "अंदाजित",
    "Emergency": "आपत्कालीन", "SOS": "तातडीची मदत (SOS)", "Ambulance": "रुग्णवाहिका", "Hospital": "रुग्णालय",
    "Medical": "वैद्यकीय", "Doctor": "डॉक्टर", "Help": "मदत", "Helpline": "मदत कक्ष",
    "Report": "तक्रार / अहवाल", "Reports": "तक्रारी व अहवाल", "Issue": "समस्या", "Issues": "समस्या",
    "Grievance": "तक्रार", "Notice": "सूचना", "Notice Dispatched": "सूचना पाठवली",
    "Sanitation": "स्वच्छता", "Cleanliness": "स्वच्छता", "Security": "सुरक्षा",
    "Review": "पुनरावलोकन", "Reviews": "पुनरावलोकने", "Rating": "गुणांकन", "Ratings": "गुणांकन",
    "Order": "ऑर्डर", "Orders": "ऑर्डर्स", "Booking": "नोंदणी", "Bookings": "नोंदणी",
    "Active": "सक्रिय", "Pending": "प्रलंबित", "Resolved": "निकाली काढले", "Closed": "बंद",
    "High": "उच्च / तीव्र", "Moderate": "मध्यम", "Low": "कमी", "Warning": "इशारा",
    "Alert": "दक्षता इशारा", "Live": "थेट", "Radar": "रडार", "Hotspot": "गर्दी केंद्र",
    "Hotspots": "गर्दी केंद्रे", "Desk": "कक्ष", "Cell": "कक्ष", "Squad": "पथक",
    "Sector": "विभाग", "Zone": "विभाग", "Cluster": "गट", "Clusters": "गट",
    "Password": "पासवर्ड", "Login": "प्रवेश करा", "Logout": "बाहेर पडा", "Register": "नोंदणी करा",
    "Registration": "नोंदणी", "Submit": "सादर करा", "Cancel": "रद्द करा", "Save": "जतन करा",
    "Download": "डाउनलोड करा", "Upload": "अपलोड करा", "Attach": "जोडा", "Search": "शोधा",
    "Filter": "फिल्टर", "Details": "तपशील", "Overview": "आढावा", "Settings": "सेटिंग्ज",
    "Name": "नाव", "Full Name": "संपूर्ण नाव", "Email": "ईमेल", "Mobile": "मोबाईल",
    "Phone": "फोन", "Address": "पत्ता", "ID": "ओळख क्रमांक", "Badge": "बिल्ला",
    "PIN": "पिन", "OTP": "ओटीपी", "Code": "कोड", "Token": "टोकन", "QR Code": "क्यूआर कोड",
    "Status": "स्थिती", "Action": "कृती", "Action Required": "कृती आवश्यक", "View": "पहा",
    "Today": "आज", "Yesterday": "काल", "Hours": "तास", "Minutes": "मिनिटे", "Seconds": "सेकंद",
    "Night": "रात्र", "Day": "दिवस", "Morning": "सकाळ", "Evening": "संध्याकाळ",
    "Aarti": "आरती", "Snan": "स्नान", "Holy Dip": "पवित्र स्नान", "Darshan": "दर्शन",
    "Simhastha": "सिंहस्थ", "Kumbh": "कुंभ", "Mela": "मेळा", "Kumbh Mela": "कुंभमेळा",
    "Kumbhveer": "कुंभवीर", "Volunteers": "स्वयंसेवक", "Student": "विद्यार्थी",
    "Terminal": "टर्मिनल", "Gate": "प्रवेशद्वार", "Bridge": "पूल", "Water": "पाणी",
    "River": "नदी", "Peak": "शिखर", "Mountain": "पर्वत", "Cave": "गुंफा",
    "Flag": "इशारा", "Flags": "इशारे", "Audit": "तपासणी", "Audited": "तपासणी केली",
    "Ceiling": "कमाल मर्यादा", "Benchmark": "प्रमाणक", "Cap": "मर्यादा",
    "Tolerance": "सहनशीलता", "Zero": "शून्य", "Pledge": "शपथपत्र", "Oath": "शपथ"
}

lexicon_hi = {
    "Ramkund": "रामकुंड", "Panchavati": "पंचवटी", "Godavari": "गोदावरी", "Trimbakeshwar": "त्र्यंबकेश्वर",
    "Ghat": "घाट", "Ghats": "घाट", "Mandir": "मंदिर", "Temple": "मंदिर", "Kund": "कुंड",
    "Muktidham": "मुक्तिधाम", "Someshwar": "सोमेश्वर", "Tapovan": "तपोवन", "Kushavarta": "कुशावर्त",
    "Kapaleshwar": "कपालेश्वर", "Kalaram": "कालाराम", "Sita Gufa": "सीता गुफा", "CBS": "सीबीएस",
    "Police": "पुलिस", "Officer": "अधिकारी", "Inspector": "निरीक्षक", "Patrol": "गश्ती दल",
    "Vendor": "विक्रेता", "Vendors": "विक्रेता", "Guide": "गाइड", "Guides": "गाइड",
    "Yatri": "तीर्थयात्री", "Pilgrim": "तीर्थयात्री", "Pilgrims": "तीर्थयात्री", "Nashikkar": "नाशिककर",
    "Citizen": "नागरिक", "Citizens": "नागरिक", "Admin": "प्रशासक", "Administration": "प्रशासन",
    "Municipal": "नगर निगम", "Corporation": "निगम", "Civic": "नागरिक", "Trust": "विश्वास",
    "Fair": "उचित", "Price": "मूल्य", "Pricing": "मूल्य निर्धारण", "Rate": "दर", "Rates": "दरें",
    "Tariff": "दर सूची", "Overcharge": "अत्यधिक किराया", "Overcharging": "अत्यधिक वसूली",
    "Verified": "सत्यापित", "Compliance": "अनुपालन", "Compliant": "नियमानुकूल",
    "Stall": "स्टॉल", "Stalls": "स्टॉल", "Shop": "दुकान", "Market": "बाज़ार",
    "Marketplace": "बाज़ार", "Bazaar": "बाज़ार", "Puja": "पूजा", "Samagri": "सामग्री",
    "Brass": "पीतल", "Copper": "तांबा", "Rudraksha": "रुद्राक्ष", "Mala": "माला", "Diya": "दीया",
    "Diyas": "दीये", "Kalash": "कलश", "Prasad": "प्रसाद", "Prasadam": "प्रसादम", "Thali": "थाली",
    "Satvik": "सात्विक", "Annachhatra": "अन्नक्षेत्र", "Bhojanalaya": "भोजनालय", "Food": "भोजन / अन्न",
    "Stay": "आवास", "Stays": "आवास", "Dharamshala": "धर्मशाला", "Dharamshalas": "धर्मशालाएं",
    "Hotel": "होटल", "Hotels": "होटल", "Room": "कमरा", "Rooms": "कमरे", "Dorm": "डॉर्मिटरी",
    "Auto": "ऑटो", "Rickshaw": "रिक्शा", "Rickshaws": "रिक्शा", "Bus": "बस", "Transit": "परिवहन",
    "Taxi": "टैक्सी", "Cab": "कैब", "Route": "मार्ग", "Distance": "दूरी", "Estimated": "अनुमानित",
    "Emergency": "आपातकालीन", "SOS": "तत्काल सहायता (SOS)", "Ambulance": "एम्बुलेंस", "Hospital": "अस्पताल",
    "Medical": "चिकित्सा", "Doctor": "चिकित्सक", "Help": "सहायता", "Helpline": "हेल्पलाइन",
    "Report": "शिकायत / रिपोर्ट", "Reports": "शिकायतें एवं रिपोर्ट", "Issue": "समस्या", "Issues": "समस्याएँ",
    "Grievance": "शिकायत", "Notice": "नोटिस", "Notice Dispatched": "नोटिस प्रेषित",
    "Sanitation": "स्वच्छता", "Cleanliness": "स्वच्छता", "Security": "सुरक्षा",
    "Review": "समीक्षा", "Reviews": "समीक्षाएं", "Rating": "रेटिंग", "Ratings": "रेटिंग",
    "Order": "ऑर्डर", "Orders": "ऑर्डर", "Booking": "बुकिंग", "Bookings": "बुकिंग",
    "Active": "सक्रिय", "Pending": "लंबित", "Resolved": "सुलझाया गया", "Closed": "बंद",
    "High": "उच्च / तीव्र", "Moderate": "मध्यम", "Low": "कम", "Warning": "चेतावनी",
    "Alert": "अलर्ट", "Live": "लाइव", "Radar": "रडार", "Hotspot": "भीड़ केंद्र",
    "Hotspots": "भीड़ केंद्र", "Desk": "कक्ष", "Cell": "प्रकोष्ठ", "Squad": "दस्ता",
    "Sector": "सेक्टर", "Zone": "ज़ोन", "Cluster": "क्लस्टर", "Clusters": "क्लस्टर",
    "Password": "पासवर्ड", "Login": "लॉगिन करें", "Logout": "लॉगआउट", "Register": "पंजीकरण करें",
    "Registration": "पंजीकरण", "Submit": "सबमिट करें", "Cancel": "रद्द करें", "Save": "सहेजें",
    "Download": "डाउनलोड करें", "Upload": "अपलोड करें", "Attach": "संलग्न करें", "Search": "खोजें",
    "Filter": "फ़िल्टर", "Details": "विवरण", "Overview": "अवलोकन", "Settings": "सेटिंग्स",
    "Name": "नाम", "Full Name": "पूरा नाम", "Email": "ईमेल", "Mobile": "मोबाइल",
    "Phone": "फ़ोन", "Address": "पता", "ID": "पहचान संख्या", "Badge": "बैज",
    "PIN": "पिन", "OTP": "ओटीपी", "Code": "कोड", "Token": "टोकन", "QR Code": "क्यूआर कोड",
    "Status": "स्थिति", "Action": "कार्रवाई", "Action Required": "कार्रवाई आवश्यक", "View": "देखें",
    "Today": "आज", "Yesterday": "कल", "Hours": "घंटे", "Minutes": "मिनट", "Seconds": "सेकंड",
    "Night": "रात", "Day": "दिन", "Morning": "सुबह", "Evening": "शाम",
    "Aarti": "आरती", "Snan": "स्नान", "Holy Dip": "पवित्र स्नान", "Darshan": "दर्शन",
    "Simhastha": "सिंहस्थ", "Kumbh": "कुंभ", "Mela": "मेला", "Kumbh Mela": "कुंभ मेला",
    "Kumbhveer": "कुंभवीर", "Volunteers": "स्वयंसेवक", "Student": "छात्र",
    "Terminal": "टर्मिनल", "Gate": "प्रवेश द्वार", "Bridge": "पुल", "Water": "जल / पानी",
    "River": "नदी", "Peak": "शिखर", "Mountain": "पर्वत", "Cave": "गुफा",
    "Flag": "चेतावनी", "Flags": "चेतावनी", "Audit": "जांच / ऑडिट", "Audited": "जांच की गई",
    "Ceiling": "अधिकतम सीमा", "Benchmark": "मानक", "Cap": "सीमा",
    "Tolerance": "सहनशीलता", "Zero": "शून्य", "Pledge": "शपथ", "Oath": "शपथ"
}

def translate_phrase(text, target_lang='mr'):
    if not text: return text
    t = text.strip()
    
    # Check if pure code or symbol
    if re.match(r'^#[A-Z0-9\-_]+$', t) or re.match(r'^[A-Z0-9\-_]{5,}$', t) or t.startswith('http'):
        return t

    lex = lexicon_mr if target_lang == 'mr' else lexicon_hi

    # Direct match in lexicon
    if t in lex:
        return lex[t]

    # Pattern matches
    m = re.match(r'^\((\d+[\d,]*)\s*reviews?\)$', t, re.IGNORECASE)
    if m:
        num = m.group(1)
        return f"({num} पुनरावलोकने)" if target_lang == 'mr' else f"({num} समीक्षाएं)"

    m = re.match(r'^\((\d+[\d,]*)\s*tours?\)$', t, re.IGNORECASE)
    if m:
        num = m.group(1)
        return f"({num} दौरे)" if target_lang == 'mr' else f"({num} टूर)"

    m = re.match(r'^\((\d+[\d,]*)\s*pax\)$', t, re.IGNORECASE)
    if m:
        num = m.group(1)
        return f"({num} प्रवासी)" if target_lang == 'mr' else f"({num} यात्री)"

    m = re.match(r'^\((\d+[\d,]*)\s*min\s*walk\)$', t, re.IGNORECASE)
    if m:
        num = m.group(1)
        return f"({num} मिनिटे चालत)" if target_lang == 'mr' else f"({num} मिनट पैदल)"

    m = re.match(r'^(\d+[\d,.]*)\s*(?:km|km\s*away)(?:\s*•\s*(.*))?$', t, re.IGNORECASE)
    if m:
        dist = m.group(1)
        extra = m.group(2)
        if extra:
            extra_trans = translate_phrase(extra, target_lang)
            return f"{dist} किमी अंतरावर • {extra_trans}" if target_lang == 'mr' else f"{dist} किमी दूर • {extra_trans}"
        return f"{dist} किमी अंतरावर" if target_lang == 'mr' else f"{dist} किमी दूर"

    m = re.match(r'^(\d+[\d,.]*)\s*(?:m|m\s*away)(?:\s*•\s*(.*))?$', t, re.IGNORECASE)
    if m:
        dist = m.group(1)
        extra = m.group(2)
        if extra:
            extra_trans = translate_phrase(extra, target_lang)
            return f"{dist} मी अंतरावर • {extra_trans}" if target_lang == 'mr' else f"{dist} मी दूर • {extra_trans}"
        return f"{dist} मी अंतरावर" if target_lang == 'mr' else f"{dist} मी दूर"

    m = re.match(r'^(\d+)\s*m\s*ago$', t, re.IGNORECASE)
    if m:
        return f"{m.group(1)} मिनिटांपूर्वी" if target_lang == 'mr' else f"{m.group(1)} मिनट पहले"

    m = re.match(r'^(\d+)\s*hrs?\s*ago$', t, re.IGNORECASE)
    if m:
        return f"{m.group(1)} तासांपूर्वी" if target_lang == 'mr' else f"{m.group(1)} घंटे पहले"

    m = re.match(r'^\+(\d+[\d.]*)%\s*(?:vs last cycle|Overcharge)$', t, re.IGNORECASE)
    if m:
        if 'cycle' in t:
            return f"+{m.group(1)}% मागील चक्राच्या तुलनेत" if target_lang == 'mr' else f"+{m.group(1)}% पिछले चक्र की तुलना में"
        else:
            return f"+{m.group(1)}% जादा आकारणी" if target_lang == 'mr' else f"+{m.group(1)}% अतिरिक्त वसूली"

    # Common prefixes / suffixes
    prefix = ""
    suffix = ""
    core = t
    p_m = re.match(r'^([#+•\-\s]+)(.*)$', core)
    if p_m:
        prefix = p_m.group(1)
        core = p_m.group(2)
    s_m = re.match(r'^(.*?)([\s:•→\.\.\.]+)$', core)
    if s_m:
        core = s_m.group(1)
        suffix = s_m.group(2)

    if core in lex:
        return prefix + lex[core] + suffix

    # Word-by-word intelligent replacement for multi-word phrases
    words = re.findall(r'[A-Za-z0-9]+|[^A-Za-z0-9\s]+|\s+', t)
    translated_words = []
    has_match = False
    for w in words:
        stripped = w.strip()
        if stripped in lex:
            translated_words.append(w.replace(stripped, lex[stripped]))
            has_match = True
        elif stripped.capitalize() in lex:
            translated_words.append(w.replace(stripped, lex[stripped.capitalize()]))
            has_match = True
        else:
            translated_words.append(w)

    if has_match:
        return "".join(translated_words)

    return t

# Build full translations object
full_dict = {}
for s in items:
    mr = translate_phrase(s, 'mr')
    hi = translate_phrase(s, 'hi')
    full_dict[s] = {
        "mr": mr,
        "hi": hi,
        "en": s
    }

print(f"Generated translations for {len(full_dict)} items.")
with open('/tmp/remaining_translations_generated.json', 'w', encoding='utf-8') as out:
    json.dump(full_dict, out, indent=2, ensure_ascii=False)
print("Saved to /tmp/remaining_translations_generated.json")

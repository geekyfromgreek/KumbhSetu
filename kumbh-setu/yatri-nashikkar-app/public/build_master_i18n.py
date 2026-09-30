# -*- coding: utf-8 -*-
"""
Master Translation Generator for KumbhSetu (कुंभसेतु)
Translates all 678 missing strings across all 24 screens into authentic Marathi (मराठी) and Hindi (हिंदी).
"""
import json
import re

# Load existing translations
with open('/home/nakulkarpe/t3-kumbhsetu/kumbh-setu/frontend/i18n.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

m = re.search(r'const TRANSLATIONS = ({[\s\S]*?});\n\n  const LANG_STORAGE_KEY', js_content)
if not m:
    print("Error: Could not extract TRANSLATIONS")
    exit(1)

translations = json.loads(m.group(1))
print(f"Loaded {len(translations)} existing translations")

with open('/tmp/all_untranslated_unique.json', 'r', encoding='utf-8') as f:
    missing_strings = json.load(f)

# Define translations for all missing strings
NEW_TRANSLATIONS = {
  # --- KUMBHVEER VOLUNTEER DESK & LEADERBOARD ---
  "KumbhSetu — Kumbhveer Volunteer Verification Desk": {
    "mr": "कुंभसेतु — कुंभवीर स्वयंसेवक पडताळणी कक्ष",
    "hi": "कुंभसेतु — कुंभवीर स्वयंसेवक सत्यापन डेस्क",
    "en": "KumbhSetu — Kumbhveer Volunteer Verification Desk"
  },
  "कुंभवीर कक्ष • Volunteer Desk": {
    "mr": "कुंभवीर कक्ष • स्वयंसेवक कक्ष",
    "hi": "कुंभवीर कक्ष • वॉलंटियर डेस्क",
    "en": "Kumbhveer Desk • Volunteer Desk"
  },
  "SEC-04": { "mr": "विभाग-०४", "hi": "सेक्टर-०४", "en": "SEC-04" },
  "Ramkund & Panchavati Field Verification": {
    "mr": "रामकुंड व पंचवटी क्षेत्रीय पडताळणी",
    "hi": "रामकुंड एवं पंचवटी फील्ड सत्यापन",
    "en": "Ramkund & Panchavati Field Verification"
  },
  "Rohit Shinde": { "mr": "रोहित शिंदे", "hi": "रोहित शिंदे", "en": "Rohit Shinde" },
  "Kumbhveer #KV-204": { "mr": "कुंभवीर #KV-२०४", "hi": "कुंभवीर #KV-२०४", "en": "Kumbhveer #KV-204" },
  "KTHM College Nashik • Sector 4 Field Audit Hub": {
    "mr": "के.टी.एच.एम. महाविद्यालय नाशिक • विभाग ४ तपासणी केंद्र",
    "hi": "के.टी.एच.एम. कॉलेज नासिक • सेक्टर ४ फील्ड ऑडिट केंद्र",
    "en": "KTHM College Nashik • Sector 4 Field Audit Hub"
  },
  "Upload Audit Proof": { "mr": "तपासणी पुरावा अपलोड करा", "hi": "ऑडिट प्रमाण अपलोड करें", "en": "Upload Audit Proof" },
  "Today's Audits": { "mr": "आजच्या तपासण्या", "hi": "आज के ऑडिट", "en": "Today's Audits" },
  "Seva Points": { "mr": "सेवा गुण", "hi": "सेवा अंक", "en": "Seva Points" },
  "College Rank": { "mr": "महाविद्यालय क्रमांक", "hi": "कॉलेज रैंक", "en": "College Rank" },
  "#4": { "mr": "#४", "hi": "#४", "en": "#4" },
  "in Nashik": { "mr": "नाशिकमध्ये", "hi": "नासिक में", "en": "in Nashik" },
  "Field Audits to Verify": { "mr": "पडताळणीसाठी क्षेत्रीय तपासण्या", "hi": "सत्यापन के लिए फील्ड ऑडिट", "en": "Field Audits to Verify" },
  "Upload Photo Proof": { "mr": "छायाचित्र पुरावा जोडा", "hi": "फोटो प्रमाण अपलोड करें", "en": "Upload Photo Proof" },
  "PIB Truth Desk": { "mr": "पीआयबी सत्यता कक्ष", "hi": "पीआईबी सत्यता डेस्क", "en": "PIB Truth Desk" },
  "Volunteer Leaderboard": { "mr": "स्वयंसेवक मानांकन तक्ता", "hi": "स्वयंसेवक लीडरबोर्ड", "en": "Volunteer Leaderboard" },
  "Bazaars": { "mr": "बाजारपेठ", "hi": "बाज़ार", "en": "Bazaars" },
  "Pooja & Flowers": { "mr": "पूजा व फुले", "hi": "पूजा एवं फूल", "en": "Pooja & Flowers" },
  "Food & Milk": { "mr": "अन्न व दुग्धपदार्थ", "hi": "भोजन एवं दूध", "en": "Food & Milk" },
  "Transit Stands": { "mr": "वाहतूक थांबे", "hi": "परिवहन स्टैंड", "en": "Transit Stands" },
  "Kumbhveer Verification Protocol:": {
    "mr": "कुंभवीर पडताळणी नियमावली:",
    "hi": "कुंभवीर सत्यापन प्रोटोकॉल:",
    "en": "Kumbhveer Verification Protocol:"
  },
  "Inspect stall rate board visibility, digital payment QR, and hygiene conditions. Tap": {
    "mr": "स्टॉलवरील दरफलक, डिजिटल क्यूआर आणि स्वच्छता तपासा. स्पर्श करा:",
    "hi": "स्टॉल का रेट बोर्ड, डिजिटल क्यूआर और स्वच्छता जांचें। टैप करें:",
    "en": "Inspect stall rate board visibility, digital payment QR, and hygiene conditions. Tap"
  },
  "Verify On-Site": { "mr": "स्थळावर पडताळा", "hi": "स्थल पर सत्यापित करें", "en": "Verify On-Site" },
  "to authenticate compliance (+50 points).": {
    "mr": "नियमांचे प्रमाणीकरण करण्यासाठी (+५० गुण).",
    "hi": "अनुपालन प्रमाणित करने के लिए (+५० अंक)।",
    "en": "to authenticate compliance (+50 points)."
  },
  "Submit On-Site Stall Photo & Audit Evidence": {
    "mr": "स्टॉल छायाचित्र व तपासणी पुरावा सादर करा",
    "hi": "स्टॉल फोटो एवं ऑडिट प्रमाण जमा करें",
    "en": "Submit On-Site Stall Photo & Audit Evidence"
  },
  "Live geo-tagged photos prove authentic Simhastha price compliance (+75 Seva Pts).": {
    "mr": "स्थाननिर्देशित छायाचित्रांमुळे सिंहस्थ दरांचे पालन सिद्ध होते (+७५ सेवा गुण).",
    "hi": "जियो-टैग फोटो से सिंहस्थ मूल्य अनुपालन साबित होता है (+७५ सेवा अंक)।",
    "en": "Live geo-tagged photos prove authentic Simhastha price compliance (+75 Seva Pts)."
  },
  "Select Stall or Lodging to Audit*": {
    "mr": "तपासणीसाठी स्टॉल किंवा धर्मशाळा निवडा*",
    "hi": "ऑडिट के लिए स्टॉल या धर्मशाला चुनें*",
    "en": "Select Stall or Lodging to Audit*"
  },
  "-- Choose from Sector 4 Registry --": {
    "mr": "-- विभाग ४ नोंदणीतून निवडा --",
    "hi": "-- सेक्टर ४ रजिस्ट्री से चुनें --",
    "en": "-- Choose from Sector 4 Registry --"
  },
  "Godavari Yatri Niwas (#NSK-GH-409, Trimbak Road)": {
    "mr": "गोदावरी यात्री निवास (#NSK-GH-४०९, त्र्यंबक रोड)",
    "hi": "गोदावरी यात्री निवास (#NSK-GH-४०९, त्र्यंबक रोड)",
    "en": "Godavari Yatri Niwas (#NSK-GH-409, Trimbak Road)"
  },
  "Shri Krishna Pooja Bhandar (#NSK-BZ-102, Panchavati Steps)": {
    "mr": "श्री कृष्ण पूजा भांडार (#NSK-BZ-१०२, पंचवटी पायऱ्या)",
    "hi": "श्री कृष्ण पूजा भंडार (#NSK-BZ-१०२, पंचवटी सीढ़ियां)",
    "en": "Shri Krishna Pooja Bhandar (#NSK-BZ-102, Panchavati Steps)"
  },
  "Balaji Prasad Ladoos (#NSK-BZ-118, Ramkund East)": {
    "mr": "बालाजी प्रसाद लाडू (#NSK-BZ-११८, रामकुंड पूर्व)",
    "hi": "बालाजी प्रसाद लड्डू (#NSK-BZ-११८, रामकुंड पूर्व)",
    "en": "Balaji Prasad Ladoos (#NSK-BZ-118, Ramkund East)"
  },
  "Sai Auto Stand (#NSK-TR-04, Panchavati Ghat)": {
    "mr": "साई ऑटो स्टँड (#NSK-TR-०४, पंचवटी घाट)",
    "hi": "साई ऑटो स्टैंड (#NSK-TR-०४, पंचवटी घाट)",
    "en": "Sai Auto Stand (#NSK-TR-04, Panchavati Ghat)"
  },
  "Panchavati Bhojnalaya (#NSK-FD-205, Sita Gufa Road)": {
    "mr": "पंचवटी भोजनालय (#NSK-FD-२०५, सीता गुंफा रोड)",
    "hi": "पंचवटी भोजनालय (#NSK-FD-२०५, सीता गुफा रोड)",
    "en": "Panchavati Bhojnalaya (#NSK-FD-205, Sita Gufa Road)"
  },
  "Trimbak Floral Vender Stalls (#NSK-BZ-144, Kushavarta)": {
    "mr": "त्र्यंबक पुष्प विक्रेते स्टॉल्स (#NSK-BZ-१४४, कुशावर्त)",
    "hi": "त्र्यंबक पुष्प विक्रेता स्टॉल (#NSK-BZ-१४४, कुशावर्त)",
    "en": "Trimbak Floral Vender Stalls (#NSK-BZ-144, Kushavarta)"
  },
  "Other Unlisted Local Stall / Shop": {
    "mr": "इतर अनिबंधित स्थानिक स्टॉल / दुकान",
    "hi": "अन्य असूचीबद्ध स्थानीय स्टॉल / दुकान",
    "en": "Other Unlisted Local Stall / Shop"
  },
  "Sector & Location Lane": { "mr": "विभाग व रस्ता/गल्ली", "hi": "सेक्टर एवं स्थान लेन", "en": "Sector & Location Lane" },
  "Audit Type": { "mr": "तपासणी प्रकार", "hi": "ऑडिट का प्रकार", "en": "Audit Type" },
  "Rate Card Public Display Inspection": {
    "mr": "दरफलक सार्वजनिक प्रदर्शन तपासणी",
    "hi": "रेट कार्ड सार्वजनिक प्रदर्शन जांच",
    "en": "Rate Card Public Display Inspection"
  },
  "Hygiene & Free Drinking Water": {
    "mr": "स्वच्छता व मोफत पिण्याचे पाणी",
    "hi": "स्वच्छता एवं निःशुल्क पेयजल",
    "en": "Hygiene & Free Drinking Water"
  },
  "Zero Overcharging Price Check": {
    "mr": "अवाजवी दर आकारणी तपासणी",
    "hi": "अतिरिक्त वसूली मूल्य जांच",
    "en": "Zero Overcharging Price Check"
  },
  "Digital Payment / QR Code Active": {
    "mr": "डिजिटल पेमेंट / क्यूआर कोड सक्रिय",
    "hi": "डिजिटल भुगतान / क्यूआर कोड सक्रिय",
    "en": "Digital Payment / QR Code Active"
  },
  "On-Site Stall / Rate Board Photo*": {
    "mr": "स्थळावरील स्टॉल / दरफलकाचे छायाचित्र*",
    "hi": "ऑन-साइट स्टॉल / रेट बोर्ड फोटो*",
    "en": "On-Site Stall / Rate Board Photo*"
  },
  "Tap to capture camera photo or browse files": {
    "mr": "कॅमेरा सुरू करण्यासाठी किंवा फाइल निवडण्यासाठी स्पर्श करा",
    "hi": "कैमरा फोटो खींचने या फाइल चुनने के लिए टैप करें",
    "en": "Tap to capture camera photo or browse files"
  },
  "PNG, JPG up to 10MB • Auto GPS stamped": {
    "mr": "PNG, JPG १०MB पर्यंत • आपोआप GPS नोंद",
    "hi": "PNG, JPG १०MB तक • स्वतः GPS अंकित",
    "en": "PNG, JPG up to 10MB • Auto GPS stamped"
  },
  "Volunteer On-Site Checklist:": {
    "mr": "स्वयंसेवक ऑन-साइट तपासणी यादी:",
    "hi": "स्वयंसेवक ऑन-साइट चेकलिस्ट:",
    "en": "Volunteer On-Site Checklist:"
  },
  "Official gazetted rate card is clearly visible to pilgrims": {
    "mr": "अधिकृत शासन राजपत्रातील दरफलक भाविकांना स्पष्ट दिसत आहे",
    "hi": "आधिकारिक राजपत्रित रेट कार्ड तीर्थयात्रियों को स्पष्ट दिखाई दे रहा है",
    "en": "Official gazetted rate card is clearly visible to pilgrims"
  },
  "No unauthorized festival surcharge or arbitrary bargaining detected": {
    "mr": "कोणताही अनधिकृत सण अधिभार किंवा मनमानी दर आकारणी आढळली नाही",
    "hi": "कोई अनधिकृत त्योहार अधिभार या मनमानी सौदेबाजी नहीं पाई गई",
    "en": "No unauthorized festival surcharge or arbitrary bargaining detected"
  },
  "Clean premises & potable water available for pilgrims": {
    "mr": "भाविकांसाठी स्वच्छ परिसर व पिण्यायोग्य पाणी उपलब्ध आहे",
    "hi": "तीर्थयात्रियों के लिए स्वच्छ परिसर और पीने योग्य पानी उपलब्ध है",
    "en": "Clean premises & potable water available for pilgrims"
  },
  "Kumbhveer Field Notes (Optional)": {
    "mr": "कुंभवीर क्षेत्रीय नोंदी (ऐच्छिक)",
    "hi": "कुंभवीर फील्ड नोट्स (वैकल्पिक)",
    "en": "Kumbhveer Field Notes (Optional)"
  },
  "Submit Verified Field Evidence (+75 Points)": {
    "mr": "पडताळणी केलेला पुरावा सादर करा (+७५ गुण)",
    "hi": "सत्यापित फील्ड प्रमाण जमा करें (+७५ अंक)",
    "en": "Submit Verified Field Evidence (+75 Points)"
  },
  "Recent Field Photos Audited Today": {
    "mr": "आज तपासलेली ताजी क्षेत्रीय छायाचित्रे",
    "hi": "आज ऑडिट किए गए हालिया फील्ड फोटो",
    "en": "Recent Field Photos Audited Today"
  },
  "Pooja Samagri Stall #4": { "mr": "पूजा सामग्री स्टॉल #४", "hi": "पूजा सामग्री स्टॉल #४", "en": "Pooja Samagri Stall #4" },
  "Verified 12m ago": { "mr": "१२ मिनिटांपूर्वी पडताळले", "hi": "१२ मिनट पहले सत्यापित", "en": "Verified 12m ago" },
  "Godavari Bhawan": { "mr": "गोदावरी भवन", "hi": "गोदावरी भवन", "en": "Godavari Bhawan" },
  "Verified 28m ago": { "mr": "२८ मिनिटांपूर्वी पडताळले", "hi": "२८ मिनट पहले सत्यापित", "en": "Verified 28m ago" },
  "Panchavati Sweets": { "mr": "पंचवटी स्वीट्स", "hi": "पंचवटी स्वीट्स", "en": "Panchavati Sweets" },
  "Verified 45m ago": { "mr": "४५ मिनिटांपूर्वी पडताळले", "hi": "४५ मिनट पहले सत्यापित", "en": "Verified 45m ago" },
  "Auto Bay 4 Rate Card": { "mr": "ऑटो बे ४ दरफलक", "hi": "ऑटो बे ४ रेट कार्ड", "en": "Auto Bay 4 Rate Card" },
  "Verified 1h ago": { "mr": "१ तासापूर्वी पडताळले", "hi": "१ घंटे पहले सत्यापित", "en": "Verified 1h ago" },
  "PIB & District Police Ground Truth Desk": {
    "mr": "पीआयबी व जिल्हा पोलीस सत्यता कक्ष",
    "hi": "पीआईबी एवं जिला पुलिस ग्राउंड ट्रुथ डेस्क",
    "en": "PIB & District Police Ground Truth Desk"
  },
  "Kumbhveers actively debunk social media rumors, verify on-ground reality at ghats, and protect pilgrims from misinformation.": {
    "mr": "कुंभवीर सोशल मीडियावरील अफवांचे खंडन करतात, घाटांवरील प्रत्यक्ष स्थिती पडताळतात आणि भाविकांचे संरक्षण करतात.",
    "hi": "कुंभवीर सोशल मीडिया की अफवाहों का खंडन करते हैं, घाटों पर जमीनी हकीकत जांचते हैं और श्रद्धालुओं को बचाते हैं।",
    "en": "Kumbhveers actively debunk social media rumors, verify on-ground reality at ghats, and protect pilgrims from misinformation."
  },
  "Viral WhatsApp Message": { "mr": "व्हाट्सॲपवरील व्हायरल संदेश", "hi": "वायरल व्हाट्सएप संदेश", "en": "Viral WhatsApp Message" },
  "Spotted 15m ago": { "mr": "१५ मिनिटांपूर्वी आढळले", "hi": "१५ मिनट पहले देखा गया", "en": "Spotted 15m ago" },
  "\"VIP Ramkund Bathing Passes being sold for ₹2,000 near CBS stand.\"": {
    "mr": "\"सीबीएस स्टँडजवळ रामकुंड व्हीआयपी स्नान पास ₹२,००० मध्ये विकले जात आहेत.\"",
    "hi": "\"सीबीएस स्टैंड के पास वीआईपी रामकुंड स्नान पास ₹२,००० में बेचे जा रहे हैं।\"",
    "en": "\"VIP Ramkund Bathing Passes being sold for ₹2,000 near CBS stand.\""
  },
  "Ground Truth (PIB Verified):": { "mr": "सत्यता (पीआयबी द्वारे पडताळणीकृत):", "hi": "जमीनी सच (पीआईबी सत्यापित):", "en": "Ground Truth (PIB Verified):" },
  "100% FALSE. Simhastha holy dips across all 24 Nashik & Trimbak ghats are strictly free and open to all citizens. Anyone selling passes is arrested under BNS.": {
    "mr": "१००% खोटे. नाशिक व त्र्यंबकेश्वरच्या सर्व २४ घाटांवर स्नान पूर्णपणे मोफत आहे. पासेस विकणाऱ्यावर त्वरित गुन्हा दाखल केला जात आहे.",
    "hi": "१००% झूठ। नासिक और त्र्यंबक के सभी २४ घाटों पर पवित्र स्नान पूरी तरह निःशुल्क है। पास बेचने वालों पर तत्काल कानूनी कार्रवाई हो रही है।",
    "en": "100% FALSE. Simhastha holy dips across all 24 Nashik & Trimbak ghats are strictly free and open to all citizens. Anyone selling passes is arrested under BNS."
  },
  "Debunked by Kumbhveer Squad #4": { "mr": "कुंभवीर पथक #४ द्वारे खंडित", "hi": "कुंभवीर स्क्वॉड #४ द्वारा खंडित", "en": "Debunked by Kumbhveer Squad #4" },
  "Share Clarification": { "mr": "स्पष्टीकरण शेअर करा", "hi": "स्पष्टीकरण साझा करें", "en": "Share Clarification" },
  "Social Media Post": { "mr": "सोशल मीडिया पोस्ट", "hi": "सोशल मीडिया पोस्ट", "en": "Social Media Post" },
  "Spotted 40m ago": { "mr": "४० मिनिटांपूर्वी आढळले", "hi": "४० मिनट पहले देखा गया", "en": "Spotted 40m ago" },
  "\"Water shortage in Tapovan Sadhu Gram Sector 3 camp.\"": {
    "mr": "\"तपोवन साधू ग्राम विभाग ३ छावणीत पाण्याची टंचाई.\"",
    "hi": "\"तपोवन साधु ग्राम सेक्टर ३ शिविर में पानी की कमी।\"",
    "en": "\"Water shortage in Tapovan Sadhu Gram Sector 3 camp.\""
  },
  "Ground Truth (Volunteer Verified):": { "mr": "सत्यता (स्वयंसेवकांनी पडताळणीकृत):", "hi": "जमीनी सच (वॉलंटियर सत्यापित):", "en": "Ground Truth (Volunteer Verified):" },
  "100% FALSE. Municipal water supply pipelines are functional with 18 mobile tankers stationed at Sector 3.": {
    "mr": "१००% खोटे. महापालिकेची पाणीपुरवठा वाहिनी सुरळीत असून विभाग ३ मध्ये १८ पाण्याचे टँकर्स तैनात आहेत.",
    "hi": "१००% झूठ। नगर निगम की जल आपूर्ति पाइपलाइन चालू है और सेक्टर ३ में १८ मोबाइल टैंकर तैनात हैं।",
    "en": "100% FALSE. Municipal water supply pipelines are functional with 18 mobile tankers stationed at Sector 3."
  },
  "Verified by Kumbhveer Tanmay K.": { "mr": "कुंभवीर तन्मय के. द्वारे पडताळणीकृत", "hi": "कुंभवीर तन्मय के. द्वारा सत्यापित", "en": "Verified by Kumbhveer Tanmay K." },
  "Live Field Alert": { "mr": "थेट क्षेत्रीय सूचना", "hi": "लाइव फील्ड अलर्ट", "en": "Live Field Alert" },
  "Spotted 1h ago": { "mr": "१ तासापूर्वी आढळले", "hi": "१ घंटे पहले देखा गया", "en": "Spotted 1h ago" },
  "\"Trimbak road bus service suspended due to rain.\"": {
    "mr": "\"पावसामुळे त्र्यंबक रोड बस सेवा स्थगित.\"",
    "hi": "\"बारिश के कारण त्र्यंबक रोड बस सेवा निलंबित।\"",
    "en": "\"Trimbak road bus service suspended due to rain.\""
  },
  "Ground Truth (MSRTC Verified):": { "mr": "सत्यता (एसटी महामंडळ पडताळणीकृत):", "hi": "जमीनी सच (एमएसआरटीसी सत्यापित):", "en": "Ground Truth (MSRTC Verified):" },
  "FALSE. Normal 10-minute interval shuttle buses are operating continuously from CBS to Trimbakeshwar.": {
    "mr": "खोटे. सीबीएस ते त्र्यंबकेश्वर दरम्यान दर १० मिनिटांनी शटल बसेस अखंड सुरू आहेत.",
    "hi": "झूठ। सीबीएस से त्र्यंबकेश्वर के लिए हर १० मिनट पर शटल बसें लगातार चल रही हैं।",
    "en": "FALSE. Normal 10-minute interval shuttle buses are operating continuously from CBS to Trimbakeshwar."
  },
  "Verified by CBS Desk": { "mr": "सीबीएस कक्षाद्वारे पडताळणीकृत", "hi": "सीबीएस डेस्क द्वारा सत्यापित", "en": "Verified by CBS Desk" },
  "Simhastha Volunteer Honour Roll 2027": {
    "mr": "सिंहस्थ स्वयंसेवक सन्मान सूची २०२७",
    "hi": "सिंहस्थ स्वयंसेवक सम्मान सूची २०२७",
    "en": "Simhastha Volunteer Honour Roll 2027"
  },
  "Top volunteers receive the Nashik Municipal Apex Gold Seva Medal.": {
    "mr": "सर्वोत्कृष्ट स्वयंसेवकांना नाशिक मनपा सुवर्ण सेवा पदक प्रदान केले जाते.",
    "hi": "शीर्ष स्वयंसेवकों को नासिक नगर निगम स्वर्ण सेवा पदक दिया जाता है।",
    "en": "Top volunteers receive the Nashik Municipal Apex Gold Seva Medal."
  },
  "Sneha Joshi": { "mr": "स्नेहा जोशी", "hi": "स्नेहा जोशी", "en": "Sneha Joshi" },
  "Sandip Univ": { "mr": "संदीप युनिव्हर्सिटी", "hi": "संदीप यूनिवर्सिटी", "en": "Sandip Univ" },
  "2,850 pts": { "mr": "२,८५० गुण", "hi": "२,८५० अंक", "en": "2,850 pts" },
  "58 Audits": { "mr": "५८ तपासण्या", "hi": "५८ ऑडिट", "en": "58 Audits" },
  "Tanmay Kadam": { "mr": "तन्मय कदम", "hi": "तन्मय कदम", "en": "Tanmay Kadam" },
  "KK Wagh Engg": { "mr": "के.के. वाघ इंजिनिअरिंग", "hi": "के.के. वाघ इंजीनियरिंग", "en": "KK Wagh Engg" },
  "3,120 pts": { "mr": "३,१२० गुण", "hi": "३,१२० अंक", "en": "3,120 pts" },
  "64 Audits": { "mr": "६४ तपासण्या", "hi": "६४ ऑडिट", "en": "64 Audits" },
  "Pooja Deshmukh": { "mr": "पूजा देशमुख", "hi": "पूजा देशमुख", "en": "Pooja Deshmukh" },
  "MET Bhujbal": { "mr": "एमईटी भुजबळ नॉलेज सिटी", "hi": "एमईटी भुजबल कॉलेज", "en": "MET Bhujbal" },
  "2,610 pts": { "mr": "२,६१० गुण", "hi": "२,६१० अंक", "en": "2,610 pts" },
  "52 Audits": { "mr": "५२ तपासण्या", "hi": "५२ ऑडिट", "en": "52 Audits" },
  "Rank & Volunteer": { "mr": "क्रमांक व स्वयंसेवक", "hi": "रैंक एवं स्वयंसेवक", "en": "Rank & Volunteer" },
  "Verified • Points": { "mr": "पडताळणी • गुण", "hi": "सत्यापित • अंक", "en": "Verified • Points" },
  "Audits": { "mr": "तपासण्या", "hi": "ऑडिट", "en": "Audits" },
  "Upload Proof": { "mr": "पुरावा जोडा", "hi": "प्रमाण अपलोड करें", "en": "Upload Proof" },
  "Truth Cell": { "mr": "सत्यता कक्ष", "hi": "ट्रुथ सेल", "en": "Truth Cell" },
  "Leaderboard": { "mr": "मानांकन", "hi": "लीडरबोर्ड", "en": "Leaderboard" },
  "Action recorded successfully!": { "mr": "कृती यशस्वीरीत्या नोंदवली!", "hi": "कार्रवाई सफलतापूर्वक दर्ज की गई!", "en": "Action recorded successfully!" },

  # --- NASHIKKAR CITIZEN PORTAL & CIVIC ACTIONS ---
  "Active Field Audits": { "mr": "सक्रिय क्षेत्रीय तपासण्या", "hi": "सक्रिय फील्ड ऑडिट", "en": "Active Field Audits" },
  "Report Civic Issue": { "mr": "नागरी तक्रार नोंदवा", "hi": "नागरिक शिकायत दर्ज करें", "en": "Report Civic Issue" },
  "+ Report Civic Issue": { "mr": "+ नागरी तक्रार नोंदवा", "hi": "+ नागरिक समस्या दर्ज करें", "en": "+ Report Civic Issue" },
  "Community Audits": { "mr": "सामुदायिक तपासण्या", "hi": "सामुदायिक ऑडिट", "en": "Community Audits" },
  "Verified Complaints": { "mr": "पडताळणीकृत तक्रारी", "hi": "सत्यापित शिकायतें", "en": "Verified Complaints" },
  "Volunteer Desk": { "mr": "स्वयंसेवक कक्ष", "hi": "वॉलंटियर डेस्क", "en": "Volunteer Desk" },
  "Civic Grievances": { "mr": "नागरी तक्रारी", "hi": "नागरिक शिकायतें", "en": "Civic Grievances" },
  "Municipal review queue": { "mr": "मनपा पुनरावलोकन रांग", "hi": "नगर निगम समीक्षा कतार", "en": "Municipal review queue" },
  "Auto, stays & food rates": { "mr": "रिक्षा, निवास व भोजन दर", "hi": "ऑटो, आवास एवं भोजन दर", "en": "Auto, stays & food rates" },
  "Inspect Price Flags (6)": { "mr": "दर उल्लंघने तपासा (६)", "hi": "मूल्य उल्लंघन जांचें (६)", "en": "Inspect Price Flags (6)" },
  "Top Verifiers across 15+ Nashik Colleges": {
    "mr": "नाशिकमधील १५+ महाविद्यालयांतील अव्वल पडताळणीकर्ते",
    "hi": "नासिक के १५+ कॉलेजों के शीर्ष सत्यापनकर्ता",
    "en": "Top Verifiers across 15+ Nashik Colleges"
  },
  "Honesty Points & Rewards": { "mr": "प्रामाणिक सेवा गुण व पारितोषिके", "hi": "सत्यता अंक एवं पुरस्कार", "en": "Honesty Points & Rewards" },
  "View All 21 Kumbhveers": { "mr": "सर्व २१ कुंभवीर पहा", "hi": "सभी २१ कुंभवीर देखें", "en": "View All 21 Kumbhveers" },
  "Show Top 5 Kumbhveers": { "mr": "शीर्ष ५ कुंभवीर पहा", "hi": "शीर्ष ५ कुंभवीर देखें", "en": "Show Top 5 Kumbhveers" },
  "Verification Action Recorded Successfully": {
    "mr": "पडताळणी कृती यशस्वीरीत्या नोंदवली गेली",
    "hi": "सत्यापन कार्रवाई सफलतापूर्वक दर्ज हुई",
    "en": "Verification Action Recorded Successfully"
  },
  "Verify as Citizen (Forward to Police Desk)": {
    "mr": "नागरिक म्हणून पडताळा (पोलीस कक्षाकडे पाठवा)",
    "hi": "नागरिक के रूप में सत्यापित करें (पुलिस डेस्क को भेजें)",
    "en": "Verify as Citizen (Forward to Police Desk)"
  },
  "Citizen Verified • Sent to Police": {
    "mr": "नागरिक पडताळणी पूर्ण • पोलिसांकडे वर्ग",
    "hi": "नागरिक सत्यापित • पुलिस को प्रेषित",
    "en": "Citizen Verified • Sent to Police"
  },
  "Request Volunteer Audit": { "mr": "स्वयंसेवक तपासणीची विनंती करा", "hi": "स्वयंसेवक ऑडिट का अनुरोध करें", "en": "Request Volunteer Audit" },
  "Audit Requested": { "mr": "तपासणी विनंती पाठवली", "hi": "ऑडिट अनुरोध भेजा गया", "en": "Audit Requested" },
  "View Official Tariff": { "mr": "अधिकृत दरपत्रक पहा", "hi": "आधिकारिक दर सूची देखें", "en": "View Official Tariff" },
  "Opening Gazette...": { "mr": "राजपत्र उघडत आहे...", "hi": "राजपत्र खुल रहा है...", "en": "Opening Gazette..." },
  "Penalty Imposed & Closed": { "mr": "दंड आकारून बंद केले", "hi": "जुर्माना लगाकर समाप्त किया", "en": "Penalty Imposed & Closed" },
  "Law Enforcement Interlock": { "mr": "पोलीस नियंत्रण समन्वय", "hi": "कानून प्रवर्तन समन्वय", "en": "Law Enforcement Interlock" },
  "Call Stand Leader": { "mr": "स्टँड प्रमुखांना कॉल करा", "hi": "स्टैंड प्रमुख को कॉल करें", "en": "Call Stand Leader" },
  "Slip & Fare Meter Evidence": { "mr": "पावती व मीटर पुरावा", "hi": "रसीद एवं मीटर प्रमाण", "en": "Slip & Fare Meter Evidence" },
  "Reported Violation:": { "mr": "नोंदवलेले उल्लंघन:", "hi": "दर्ज उल्लंघन:", "en": "Reported Violation:" },
  "Refunded & Gazette Re-affirmed": { "mr": "परतावा केला व अधिकृत दर लागू", "hi": "धनवापसी हुई एवं राजपत्र दर बहाल", "en": "Refunded & Gazette Re-affirmed" },
  "Docket #NSK-2026-904": { "mr": "दोषारोप #NSK-२०२६-९०४", "hi": "दस्तावेज़ #NSK-२०२६-९०४", "en": "Docket #NSK-2026-904" },

  # --- MANDIR NAMES & SACRED PLACES ---
  "Navshya Ganpati Mandir": { "mr": "नवश्या गणपती मंदिर", "hi": "नवश्या गणपति मंदिर", "en": "Navshya Ganpati Mandir" },
  "Sundarnarayan Mandir": { "mr": "सुंदरनारायण मंदिर", "hi": "सुंदरनारायण मंदिर", "en": "Sundarnarayan Mandir" },
  "Kalaram Mandir": { "mr": "काळाराम मंदिर", "hi": "कालाराम मंदिर", "en": "Kalaram Mandir" },
  "Kapaleshwar Mandir": { "mr": "कपालेश्वर मंदिर", "hi": "कपालेश्वर मंदिर", "en": "Kapaleshwar Mandir" },
  "Muktidham Mandir": { "mr": "मुक्तिधाम मंदिर", "hi": "मुक्तिधाम मंदिर", "en": "Muktidham Mandir" },
  "Trimbakeshwar Jyotirlinga Mandir": { "mr": "त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर", "hi": "त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर", "en": "Trimbakeshwar Jyotirlinga Mandir" },
  "Someshwar Mahadev Mandir": { "mr": "सोमेश्वर महादेव मंदिर", "hi": "सोमेश्वर महादेव मंदिर", "en": "Someshwar Mahadev Mandir" },
  "Bhakti Dham": { "mr": "भक्ती धाम", "hi": "भक्ति धाम", "en": "Bhakti Dham" },
  "Coin Museum (Anjaneri)": { "mr": "नाणे संग्रहालय (अंजनेरी)", "hi": "सिक्का संग्रहालय (अंजनेरी)", "en": "Coin Museum (Anjaneri)" },
  "Anjaneri Birthplace": { "mr": "अंजनेरी जन्मस्थान", "hi": "अंजनेरी जन्मस्थान", "en": "Anjaneri Birthplace" },
  "Pandavleni Caves": { "mr": "पांडवलेणी लेणी", "hi": "पांडवलेनी गुफाएं", "en": "Pandavleni Caves" },
  "1. Ramkund": { "mr": "१. रामकुंड", "hi": "१. रामकुंड", "en": "1. Ramkund" },
  "2. Kapaleshwar": { "mr": "२. कपालेश्वर", "hi": "२. कपालेश्वर", "en": "2. Kapaleshwar" },
  "3. Sita Gufa": { "mr": "३. सीता गुंफा", "hi": "३. सीता गुफा", "en": "3. Sita Gufa" },
  "4. Tapovan": { "mr": "४. तपोवन", "hi": "४. तपोवन", "en": "4. Tapovan" },
  "5. Kushavarta": { "mr": "५. कुशावर्त", "hi": "५. कुशावर्त", "en": "5. Kushavarta" },
  "6. Brahmagiri": { "mr": "६. ब्रह्मगिरी", "hi": "६. ब्रह्मगिरी", "en": "6. Brahmagiri" },
  "6 Sacred Stops": { "mr": "६ पवित्र स्थाने", "hi": "६ पवित्र पड़ाव", "en": "6 Sacred Stops" },
  "Holy Route": { "mr": "पवित्र मार्ग", "hi": "पवित्र मार्ग", "en": "Holy Route" },
  "Sita Gufa Lane": { "mr": "सीता गुंफा गल्ली", "hi": "सीता गुफा लेन", "en": "Sita Gufa Lane" },
  "Ward 12, Panchavati Chowk": { "mr": "प्रभाग १२, पंचवटी चौक", "hi": "वार्ड १२, पंचवटी चौक", "en": "Ward 12, Panchavati Chowk" },
  "Panchavati Guest House": { "mr": "पंचवटी गेस्ट हाऊस", "hi": "पंचवटी गेस्ट हाउस", "en": "Panchavati Guest House" },
  "Godavari Satvik Thali": { "mr": "गोदावरी सात्विक थाळी", "hi": "गोदावरी सात्विक थाली", "en": "Godavari Satvik Thali" },

  # --- REPORT ISSUE PAGE CATEGORIES & FORMS ---
  "1. Select Categories": { "mr": "१. वर्गवारी निवडा", "hi": "१. श्रेणियां चुनें", "en": "1. Select Categories" },
  "(Select one or more)": { "mr": "(एक किंवा अधिक निवडा)", "hi": "(एक या अधिक चुनें)", "en": "(Select one or more)" },
  "1 Selected": { "mr": "१ निवडले", "hi": "१ चुना गया", "en": "1 Selected" },
  "3. Issue Classification & Grievance Categories": {
    "mr": "३. समस्येचे वर्गीकरण व तक्रार प्रकार",
    "hi": "३. समस्या वर्गीकरण एवं शिकायत श्रेणियां",
    "en": "3. Issue Classification & Grievance Categories"
  },
  "5. Languages Spoken & Base Point": {
    "mr": "५. बोलल्या जाणाऱ्या भाषा व कार्यक्षेत्र",
    "hi": "५. बोली जाने वाली भाषाएं एवं आधार बिंदु",
    "en": "5. Languages Spoken & Base Point"
  },
  "Annachhatra, satvik, Jain & pure veg food.": {
    "mr": "अन्नछत्र, सात्विक, जैन व शुद्ध शाकाहारी भोजन.",
    "hi": "अन्नक्षेत्र, सात्विक, जैन एवं शुद्ध शाकाहारी भोजन।",
    "en": "Annachhatra, satvik, Jain & pure veg food."
  },
  "Annakshetra & Meals": { "mr": "अन्नक्षेत्र व भोजन", "hi": "अन्नक्षेत्र एवं भोजन", "en": "Annakshetra & Meals" },
  "Ashram & Dharamshala Stay": { "mr": "आश्रम व धर्मशाळा निवास", "hi": "आश्रम एवं धर्मशाला प्रवास", "en": "Ashram & Dharamshala Stay" },
  "Call & Stand Hire Only:": { "mr": "केवळ कॉल किंवा थेट स्टँडवरून बुकिंग:", "hi": "केवल कॉल या स्टैंड से सीधी बुकिंग:", "en": "Call & Stand Hire Only:" },
  "Caves & Sacred Grove Tour": { "mr": "लेणी व देवराई दर्शन दौरा", "hi": "गुफाएं एवं पवित्र वन दर्शन टूर", "en": "Caves & Sacred Grove Tour" },
  "Cow Ghee Peda & Prasad Box": { "mr": "शुद्ध देशी तुपातील पेढे व प्रसाद पेटी", "hi": "शुद्ध गाय के घी के पेड़े एवं प्रसाद डिब्बा", "en": "Cow Ghee Peda & Prasad Box" },
  "Click for Direct Navigation to Meeting Point →": {
    "mr": "भेटण्याच्या ठिकाणासाठी थेट नकाशा मार्ग पहा →",
    "hi": "मिलने के स्थान के लिए सीधा नेविगेशन देखें →",
    "en": "Click for Direct Navigation to Meeting Point →"
  },
  "Current Mode: Free CartoDB / OSM (Zero API key needed)": {
    "mr": "सध्याचा नकाशा: विनामूल्य CartoDB / OSM (कोणत्याही की ची गरज नाही)",
    "hi": "वर्तमान मोड: निःशुल्क CartoDB / OSM (किसी एपीआई कुंजी की आवश्यकता नहीं)",
    "en": "Current Mode: Free CartoDB / OSM (Zero API key needed)"
  },
  "Direct transparent agreement with the service provider. You only pay upon arrival after verifying services.": {
    "mr": "सेवादात्याशी थेट व पारदर्शक व्यवहार. सेवा पडताळणीनंतरच पोहचल्यावर थेट पैसे द्या.",
    "hi": "सेवा प्रदाता के साथ सीधा और पारदर्शी समझौता। सेवा की जांच के बाद पहुंचने पर ही भुगतान करें।",
    "en": "Direct transparent agreement with the service provider. You only pay upon arrival after verifying services."
  },
  "Direct-contact only via Call/WhatsApp or on-site visit. In-app booking is disabled for places and rides.": {
    "mr": "कॉल/व्हॉट्सॲप किंवा प्रत्यक्ष भेटीद्वारे थेट संपर्क. मध्यस्थ किंवा कमिशन नाही.",
    "hi": "कॉल/व्हाट्सएप या स्थल पर जाकर सीधा संपर्क करें। बिचौलिया या कमीशन मुक्त।",
    "en": "Direct-contact only via Call/WhatsApp or on-site visit. In-app booking is disabled for places and rides."
  },
  ". Stays, food stalls, and auto rides are direct-contact only.": {
    "mr": ". निवास, खाद्य स्टॉल्स व रिक्षा सेवा केवळ थेट संपर्काने उपलब्ध आहेत.",
    "hi": "। आवास, भोजन स्टॉल और ऑटो यात्राएं केवल सीधे संपर्क से उपलब्ध हैं।",
    "en": ". Stays, food stalls, and auto rides are direct-contact only."
  },

  # --- MARKETPLACE & MERCHANDISE ITEMS ---
  "5-Mukhi Rudraksha Mala (108)": { "mr": "५-मुखी रुद्राक्ष माळ (१०८ मणी)", "hi": "५-मुखी रुद्राक्ष माला (१०८)", "en": "5-Mukhi Rudraksha Mala (108)" },
  "100% Pure": { "mr": "१००% शुद्ध", "hi": "१००% शुद्ध", "en": "100% Pure" },
  "100% Pure Cotton": { "mr": "१००% शुद्ध सुती कापड", "hi": "१००% शुद्ध सूती", "en": "100% Pure Cotton" },
  "Copper Pooja Kalash (Heavy Gauge)": { "mr": "तांब्याचा पूजा कलश (मजबूत)", "hi": "तांबे का पूजा कलश (भारी गेज)", "en": "Copper Pooja Kalash (Heavy Gauge)" },
  "Pure Gangajal Bottle (500ml)": { "mr": "पवित्र गंगाजल बाटली (५०० मिली)", "hi": "शुद्ध गंगाजल बोतल (५०० मिली)", "en": "Pure Gangajal Bottle (500ml)" },
  "Sandalwood Tilak Paste (Original)": { "mr": "शुद्ध चंदन टिळा लेप", "hi": "शुद्ध चंदन तिलक पेस्ट", "en": "Sandalwood Tilak Paste (Original)" },
  "Brass Aarti Diya with Handle": { "mr": "पितळी आरती दिवा (मुठीसह)", "hi": "पीतल की आरती दीया (हैंडल सहित)", "en": "Brass Aarti Diya with Handle" },
  "Handcrafted Wooden Japa Bag": { "mr": "हस्तनिर्मित लाकडी जप पिशवी/गोमुखी", "hi": "हस्तनिर्मित जप माला थैली (गोमुखी)", "en": "Handcrafted Wooden Japa Bag" },
  "Simhastha Kumbh Memorial Shawl": { "mr": "सिंहस्थ कुंभ स्मृती शाल", "hi": "सिंहस्थ कुंभ स्मृति शॉल", "en": "Simhastha Kumbh Memorial Shawl" },
  "6 Items Listed": { "mr": "६ वस्तू सूचीबद्ध", "hi": "६ वस्तुएं सूचीबद्ध", "en": "6 Items Listed" },
  "24+ Products": { "mr": "२४+ उत्पादने", "hi": "२४+ उत्पाद", "en": "24+ Products" },
  "Add Item": { "mr": "वस्तू जोडा", "hi": "वस्तु जोड़ें", "en": "Add Item" },
  "Add New Item to Sell": { "mr": "विक्रीसाठी नवीन वस्तू जोडा", "hi": "बिक्री के लिए नई वस्तु जोड़ें", "en": "Add New Item to Sell" },
  "Add Category": { "mr": "वर्गवारी जोडा", "hi": "श्रेणी जोड़ें", "en": "Add Category" },
  "Add Custom Category (User Input)": { "mr": "स्वतःची वर्गवारी प्रविष्ट करा", "hi": "कस्टम श्रेणी दर्ज करें", "en": "Add Custom Category (User Input)" },

  # --- POLICE & ESALATIONS ---
  "Beat Constable Deshmukh dispatched to Bay 4. Interception in progress.": {
    "mr": "बीट कॉन्स्टेबल देशमुख बे ४ कडे रवाना. कारवाई सुरू.",
    "hi": "बीट कांस्टेबल देशमुख बे ४ पर रवाना। कार्रवाई जारी।",
    "en": "Beat Constable Deshmukh dispatched to Bay 4. Interception in progress."
  },
  "ASI K. Shinde": { "mr": "सहायक पोलीस उपनिरीक्षक के. शिंदे", "hi": "सहायक उपनिरीक्षक के. शिंदे", "en": "ASI K. Shinde" },
  "Export Docket": { "mr": "दोषारोप नोंद निर्यात करा", "hi": "दस्तावेज़ निर्यात करें", "en": "Export Docket" },
  "Filed Evidence (2)": { "mr": "दाखल पुरावे (२)", "hi": "दर्ज प्रमाण (२)", "en": "Filed Evidence (2)" },
  "Request Resubmission": { "mr": "पुन्हा सादर करण्याची विनंती करा", "hi": "पुनः जमा करने का अनुरोध करें", "en": "Request Resubmission" },
  "4 Inspected": { "mr": "४ तपासणी पूर्ण", "hi": "४ निरीक्षण पूर्ण", "en": "4 Inspected" },
  "4 under inspection": { "mr": "४ तपासणी सुरू", "hi": "४ जांच के अधीन", "en": "4 under inspection" },
  "3 Actionable": { "mr": "३ कारवाईयोग्य", "hi": "३ कार्रवाई योग्य", "en": "3 Actionable" },
  "4 Open Inquiries": { "mr": "४ खुली चौकशी प्रकरणे", "hi": "४ खुली जांच", "en": "4 Open Inquiries" },
  "1. New": { "mr": "१. नवीन", "hi": "१. नया", "en": "1. New" },
  "3. Fact-Chk": { "mr": "३. सत्यता पडताळणी", "hi": "३. तथ्य जांच", "en": "3. Fact-Chk" },
  "4. Solved": { "mr": "४. निकाली", "hi": "४. समाधान हुआ", "en": "4. Solved" },
  "#POL-NSK-2027-0482": { "mr": "#POL-NSK-२०२७-०४८२", "hi": "#POL-NSK-२०२७-०४८२", "en": "#POL-NSK-2027-0482" },

  # --- GUIDE & TOUR DETAILS ---
  "Accept Tour": { "mr": "दौरा स्वीकारा", "hi": "टूर स्वीकारें", "en": "Accept Tour" },
  "Accepted Tour • Dispatched": { "mr": "दौरा स्वीकारला • रवाना", "hi": "टूर स्वीकृत • रवाना", "en": "Accepted Tour • Dispatched" },
  "Accepted / Confirmed (": { "mr": "स्वीकृत / निश्चित (", "hi": "स्वीकृत / पुष्ट (", "en": "Accepted / Confirmed (" },
  "Acknowledge": { "mr": "पोहोच द्या", "hi": "स्वीकार करें", "en": "Acknowledge" },
  "8 Years Experience": { "mr": "८ वर्षांचा अनुभव", "hi": "८ वर्षों का अनुभव", "en": "8 Years Experience" },
  "6 Family Members": { "mr": "६ कुटुंब सदस्य", "hi": "६ परिवार के सदस्य", "en": "6 Family Members" },
  "2 Guests": { "mr": "२ पाहुणे", "hi": "२ अतिथि", "en": "2 Guests" },
  "2 Persons": { "mr": "२ व्यक्ती", "hi": "२ व्यक्ति", "en": "2 Persons" },
  "2 Nights (Check-in 11:00 AM)": { "mr": "२ रात्री (चेक-इन सकाळी ११:००)", "hi": "२ रातें (चेक-इन सुबह ११:००)", "en": "2 Nights (Check-in 11:00 AM)" },
  "2 Photos": { "mr": "२ छायाचित्रे", "hi": "२ तस्वीरें", "en": "2 Photos" },
  "21 Active": { "mr": "२१ सक्रिय", "hi": "२१ सक्रिय", "en": "21 Active" },
  "28% capacity (~240/m² safe)": { "mr": "२८% क्षमता (~२४०/मी² सुरक्षित)", "hi": "२८% क्षमता (~२४०/मी² सुरक्षित)", "en": "28% capacity (~240/m² safe)" },
  "412 GPS-calibrated autos": { "mr": "४१२ जीपीएस प्रमाणित रिक्षा", "hi": "४१२ जीपीएस कैलिब्रेटेड ऑटो", "en": "412 GPS-calibrated autos" },
  "4:00 AM - 10:00 AM": { "mr": "पहाटे ४:०० - सकाळी १०:००", "hi": "सुबह ४:०० - सुबह १०:००", "en": "4:00 AM - 10:00 AM" },
  "08:00 AM – 08:00 PM": { "mr": "सकाळी ०८:०० – रात्री ०८:००", "hi": "सुबह ०८:०० – रात ०८:००", "en": "08:00 AM – 08:00 PM" },
  "14 Feb 2027": { "mr": "१४ फेब्रुवारी २०२७", "hi": "१४ फरवरी २०२७", "en": "14 Feb 2027" },
  "14–16 Feb '27": { "mr": "१४–१६ फेब्रु '२७", "hi": "१४–१६ फर '२७", "en": "14–16 Feb '27" },
  "15–17 Feb 2027 (2 nights)": { "mr": "१५–१७ फेब्रुवारी २०२७ (२ रात्री)", "hi": "१५–१७ फरवरी २०२७ (२ रातें)", "en": "15–17 Feb 2027 (2 nights)" },
  "18 Feb 2027 • 8:00 AM to 2:00 PM": { "mr": "१८ फेब्रुवारी २०२७ • सकाळी ८:०० ते दुपारी २:००", "hi": "१८ फरवरी २०२७ • सुबह ८:०० से दोपहर २:००", "en": "18 Feb 2027 • 8:00 AM to 2:00 PM" },
  "3.5 km east": { "mr": "३.५ किमी पूर्व", "hi": "३.५ किमी पूर्व", "en": "3.5 km east" },
  "🕯️ 06:30 PM – 08:30 PM: Godavari Sandhya Deepotsav (2 hrs - ₹300)": {
    "mr": "🕯️ सायं ०६:३० – रात्री ०८:३०: गोदावरी संध्या दीपोत्सव (२ तास - ₹३००)",
    "hi": "🕯️ शाम ०६:३० – रात ०८:३०: गोदावरी संध्या दीपोत्सव (२ घंटे - ₹३००)",
    "en": "🕯️ 06:30 PM – 08:30 PM: Godavari Sandhya Deepotsav (2 hrs - ₹300)"
  },
  "K.T.H.M. College (NSS Wing) • 390m away": {
    "mr": "के.टी.एच.एम. महाविद्यालय (रा.से.यो. विभाग) • ३९० मी अंतरावर",
    "hi": "के.टी.एच.एम. कॉलेज (एनएसएस विंग) • ३९० मी दूर",
    "en": "K.T.H.M. College (NSS Wing) • 390m away"
  },
  "Mapbox (Enter Access Token)": { "mr": "मॅपबॉक्स (प्रवेश टोकन प्रविष्ट करा)", "hi": "मैपबॉक्स (एक्सेस टोकन दर्ज करें)", "en": "Mapbox (Enter Access Token)" },
  "cloud.maptiler.com": { "mr": "cloud.maptiler.com", "hi": "cloud.maptiler.com", "en": "cloud.maptiler.com" },
  "256-BIT ENCRYPTION": { "mr": "२५६-बिट सुरक्षित एन्क्रिप्शन", "hi": "२५६-बिट सुरक्षित एन्क्रिप्शन", "en": "256-BIT ENCRYPTION" },
  "(128-d Vector extracted)": { "mr": "(१२८-डी बायोमेट्रिक वेक्टर प्राप्त)", "hi": "(१२८-डी बायोमेट्रिक वेक्टर निकाला गया)", "en": "(128-d Vector extracted)" },
  "Dismiss": { "mr": "रद्द करा / दुर्लक्ष करा", "hi": "खारिज करें", "en": "Dismiss" },
  "Protected": { "mr": "संरक्षित", "hi": "सुरक्षित", "en": "Protected" },
  "Real-time Flow": { "mr": "थेट प्रवाह", "hi": "वास्तविक समय प्रवाह", "en": "Real-time Flow" },
  "Target: 98%": { "mr": "उद्दिष्ट: ९८%", "hi": "लक्ष्य: ९८%", "en": "Target: 98%" },
  "Typical": { "mr": "नेहमीचे", "hi": "सामान्य", "en": "Typical" },
  "Live": { "mr": "थेट / प्रत्यक्ष", "hi": "लाइव", "en": "Live" },
  "Navigate": { "mr": "मार्ग दाखवा", "hi": "दिशा-निर्देश", "en": "Navigate" },
  "Pilgrim": { "mr": "भाविक / यात्रेकरू", "hi": "तीर्थयात्री", "en": "Pilgrim" },
  "Aditya Shinde": { "mr": "आदित्य शिंदे", "hi": "आदित्य शिंदे", "en": "Aditya Shinde" },
  "Akash Bhalerao": { "mr": "आकाश भालेराव", "hi": "आकाश भालेराव", "en": "Akash Bhalerao" },
  "Saurabh Pagare": { "mr": "सौरभ पगारे", "hi": "सौरभ पगारे", "en": "Saurabh Pagare" },
  "Snehal Patil": { "mr": "स्नेहल पाटील", "hi": "स्नेहल पाटिल", "en": "Snehal Patil" },
  "Sunita Deshmukh": { "mr": "सुनिता देशमुख", "hi": "सुनीता देशमुख", "en": "Sunita Deshmukh" },
  "Stall #24 • Pt. Narayan Shastri": { "mr": "स्टॉल #२४ • पं. नारायण शास्त्री", "hi": "स्टॉल #२४ • पं. नारायण शास्त्री", "en": "Stall #24 • Pt. Narayan Shastri" },
  "Add to My Trip / Offline Saved": { "mr": "माझ्या यात्रेत जोडा / ऑफलाइन जतन करा", "hi": "मेरी यात्रा में जोड़ें / ऑफ़लाइन सहेजें", "en": "Add to My Trip / Offline Saved" },
  "(Ahmedabad, Gujarat)": { "mr": "(अहमदाबाद, गुजरात)", "hi": "(अहमदाबाद, गुजरात)", "en": "(Ahmedabad, Gujarat)" },
  "(Chennai)": { "mr": "(चेन्नई)", "hi": "(चेन्नई)", "en": "(Chennai)" },
  "(Chennai, TN)": { "mr": "(चेन्नई, तमिळनाडू)", "hi": "(चेन्नई, तमिलनाडु)", "en": "(Chennai, TN)" },
  "(Jaipur, Rajasthan)": { "mr": "(जयपूर, राजस्थान)", "hi": "(जयपुर, राजस्थान)", "en": "(Jaipur, Rajasthan)" },
  "(Lucknow, UP)": { "mr": "(लखनौ, उत्तर प्रदेश)", "hi": "(लखनऊ, उप्र)", "en": "(Lucknow, UP)" },
  "(Nagpur)": { "mr": "(नागपूर)", "hi": "(नागपुर)", "en": "(Nagpur)" },
  "(New Delhi)": { "mr": "(नवी दिल्ली)", "hi": "(नई दिल्ली)", "en": "(New Delhi)" },
  "(Pune)": { "mr": "(पुणे)", "hi": "(पुणे)", "en": "(Pune)" },
  "(Surat)": { "mr": "(सुरत)", "hi": "(सूरत)", "en": "(Surat)" },
  "• License:": { "mr": "• परवाना क्रमांक:", "hi": "• लाइसेंस क्रमांक:", "en": "• License:" },
  "/ ritual set": { "mr": "/ पूजा संच", "hi": "/ अनुष्ठान सेट", "en": "/ ritual set" },
  "/ 26 Raised": { "mr": "/ २६ उपस्थित", "hi": "/ २६ उठाए गए", "en": "/ 26 Raised" },
  "/nt": { "mr": "/रात्र", "hi": "/रात", "en": "/nt" }
}

# Merge new translations into translations dict
for k, v in NEW_TRANSLATIONS.items():
    translations[k] = v

print(f"Total translations after manual additions: {len(translations)}")

# Now process any remaining missing strings automatically using pattern matching or base terms
unhandled = []
for s in missing_strings:
    if s not in translations and s.lower() not in [k.lower() for k in translations]:
        unhandled.append(s)

print(f"Remaining unhandled strings: {len(unhandled)}")
with open('/tmp/unhandled_remaining.json', 'w', encoding='utf-8') as f:
    json.dump(unhandled, f, ensure_ascii=False, indent=2)

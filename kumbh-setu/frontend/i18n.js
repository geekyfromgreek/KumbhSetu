/**
 * KumbhSetu (कुंभसेतु) — Comprehensive Trilingual Translation Engine
 * Official Languages:
 *   - English (en)
 *   - Marathi (mr / मराठी)
 *   - Hindi (hi / हिंदी)
 *
 * Provides accurate, natural, culturally respectful translations across all 23 screens:
 * Pilgrims (Yatri), Local Citizens & Vendors (Nashikkar), Police & Administration.
 */

(function () {
  'use strict';

  const TRANSLATIONS = {
    "Official Portal": {
        "mr": "अधिकृत पोर्टल",
        "hi": "आधिकारिक पोर्टल",
        "en": "Official Portal"
    },
    "Nashik Municipal Corporation & District Apex": {
        "mr": "नाशिक महानगरपालिका व जिल्हा प्रशासन",
        "hi": "नासिक नगर निगम एवं जिला प्रशासन",
        "en": "Nashik Municipal Corporation & District Apex"
    },
    "Nashik Municipal Corporation": {
        "mr": "नाशिक महानगरपालिका",
        "hi": "नासिक नगर निगम",
        "en": "Nashik Municipal Corporation"
    },
    "Simhastha Kumbh 2027": {
        "mr": "सिंहस्थ कुंभ २०२७",
        "hi": "सिंहस्थ कुंभ २०२७",
        "en": "Simhastha Kumbh 2027"
    },
    "Simhastha Kumbh Mela 2027": {
        "mr": "सिंहस्थ कुंभमेळा २०२७",
        "hi": "सिंहस्थ कुंभ मेला २०२७",
        "en": "Simhastha Kumbh Mela 2027"
    },
    "Nashik 2027": {
        "mr": "नाशिक २०२७",
        "hi": "नासिक २०२७",
        "en": "Nashik 2027"
    },
    "कुंभ सेतू": {
        "mr": "कुंभसेतु",
        "hi": "कुंभसेतु",
        "en": "Kumbh Setu"
    },
    "KUMBH SETU": {
        "mr": "कुंभसेतु",
        "hi": "कुंभसेतु",
        "en": "Kumbh Setu"
    },
    "कुंभसेतु": {
        "mr": "कुंभसेतु",
        "hi": "कुंभसेतु",
        "en": "Kumbh Setu"
    },
    "Kumbh Setu": {
        "mr": "कुंभसेतु",
        "hi": "कुंभसेतु",
        "en": "Kumbh Setu"
    },
    "Civic Trust & Fair Pricing • Nashik 2027": {
        "mr": "नागरी विश्वास आणि वाजवी दर • नाशिक २०२७",
        "hi": "नागरिक विश्वास एवं उचित मूल्य • नासिक २०२७",
        "en": "Civic Trust & Fair Pricing • Nashik 2027"
    },
    "Civic Trust & Fair Pricing": {
        "mr": "नागरी विश्वास आणि वाजवी दर",
        "hi": "नागरिक विश्वास एवं उचित मूल्य",
        "en": "Civic Trust & Fair Pricing"
    },
    "Truth, trust, and fair prices for sacred journeys.": {
        "mr": "पवित्र यात्रेसाठी सत्य, विश्वास आणि वाजवी दर.",
        "hi": "पवित्र यात्रा के लिए सत्य, विश्वास और उचित मूल्य।",
        "en": "Truth, trust, and fair prices for sacred journeys."
    },
    "Simhastha Kumbh Mela Authority • Government of Maharashtra": {
        "mr": "सिंहस्थ कुंभमेळा प्राधिकरण • महाराष्ट्र शासन",
        "hi": "सिंहस्थ कुंभ मेला प्राधिकरण • महाराष्ट्र शासन",
        "en": "Simhastha Kumbh Mela Authority • Government of Maharashtra"
    },
    "Police & Administration Terminal →": {
        "mr": "पोलीस व प्रशासन टर्मिनल →",
        "hi": "पुलिस एवं प्रशासन टर्मिनल →",
        "en": "Police & Administration Terminal →"
    },
    "Police & Administration Terminal": {
        "mr": "पोलीस व प्रशासन टर्मिनल",
        "hi": "पुलिस एवं प्रशासन टर्मिनल",
        "en": "Police & Administration Terminal"
    },
    "Change Role": {
        "mr": "भूमिका बदला",
        "hi": "भूमिका बदलें",
        "en": "Change Role"
    },
    "Official Gazette": {
        "mr": "अधिकृत राजपत्रातील दर",
        "hi": "आधिकारिक राजपत्र दर",
        "en": "Official Gazette"
    },
    "Public Access": {
        "mr": "सार्वजनिक प्रवेश",
        "hi": "सार्वजनिक प्रवेश",
        "en": "Public Access"
    },
    "Restricted Civic Access": {
        "mr": "मर्यादित नागरी प्रवेश",
        "hi": "प्रतिबंधित नागरिक प्रवेश",
        "en": "Restricted Civic Access"
    },
    "Trust & Dignity in Civic Service": {
        "mr": "नागरी सेवेत विश्वास आणि सन्मान",
        "hi": "नागरिक सेवा में विश्वास एवं सम्मान",
        "en": "Trust & Dignity in Civic Service"
    },
    "Admin": {
        "mr": "प्रशासक",
        "hi": "प्रशासक",
        "en": "Admin"
    },
    "I'm a Yatri": {
        "mr": "मी एक भाविक / यात्री आहे",
        "hi": "मैं एक तीर्थयात्री हूँ",
        "en": "I'm a Yatri"
    },
    "तीर्थयात्री": {
        "mr": "तीर्थयात्री",
        "hi": "तीर्थयात्री",
        "en": "Pilgrim / Yatri"
    },
    "Public access — Fair marketplace rates, Ghat crowd status, food finder, issue reporting & emergency support. No login needed.": {
        "mr": "सार्वजनिक प्रवेश — वाजवी बाजार दर, घाट गर्दी स्थिती, अन्नक्षेत्र शोधक, तक्रार नोंदणी व आपत्कालीन मदत. लॉगिनची गरज नाही.",
        "hi": "सार्वजनिक प्रवेश — उचित बाज़ार दर, घाट भीड़ स्थिति, अन्नक्षेत्र खोज, शिकायत दर्ज व आपातकालीन सहायता। लॉगिन की आवश्यकता नहीं।",
        "en": "Public access — Fair marketplace rates, Ghat crowd status, food finder, issue reporting & emergency support. No login needed."
    },
    "Certified Caps": {
        "mr": "प्रमाणित कमाल दर",
        "hi": "प्रमाणित अधिकतम दर",
        "en": "Certified Caps"
    },
    "Ghat Live": {
        "mr": "घाट थेट स्थिती",
        "hi": "घाट लाइव स्थिति",
        "en": "Ghat Live"
    },
    "Annakshetra": {
        "mr": "अन्नक्षेत्र",
        "hi": "अन्नक्षेत्र",
        "en": "Annakshetra"
    },
    "Enter as Yatri": {
        "mr": "यात्री म्हणून प्रवेश करा",
        "hi": "यात्री के रूप में प्रवेश करें",
        "en": "Enter as Yatri"
    },
    "I'm a Nashikkar": {
        "mr": "मी नाशिककर आहे",
        "hi": "मैं नाशिककर हूँ",
        "en": "I'm a Nashikkar"
    },
    "स्थानिक नागरिक": {
        "mr": "स्थानिक नागरिक",
        "hi": "स्थानीय नागरिक",
        "en": "Local Citizen"
    },
    "Civic Verification": {
        "mr": "नागरी पडताळणी",
        "hi": "नागरिक सत्यापन",
        "en": "Civic Verification"
    },
    "For registered vendors, local guides, transport operators & civic verifiers. Manage listings & verified prices.": {
        "mr": "नोंदणीकृत विक्रेते, स्थानिक मार्गदर्शक, वाहतूकदार व नागरी पडताळणीसाठी. दर व नोंदी व्यवस्थापित करा.",
        "hi": "पंजीकृत विक्रेताओं, स्थानीय गाइडों, परिवहन चालकों और नागरिक निरीक्षकों के लिए। दरें व लिस्टिंग प्रबंधित करें।",
        "en": "For registered vendors, local guides, transport operators & civic verifiers. Manage listings & verified prices."
    },
    "Vendor ID": {
        "mr": "विक्रेता ओळख क्रमांक",
        "hi": "विक्रेता पहचान पत्र",
        "en": "Vendor ID"
    },
    "Rate Registry": {
        "mr": "दर नोंदवही",
        "hi": "दर पंजी",
        "en": "Rate Registry"
    },
    "Inspector Portal": {
        "mr": "निरीक्षक पोर्टल",
        "hi": "निरीक्षक पोर्टल",
        "en": "Inspector Portal"
    },
    "Vendor & Admin Login": {
        "mr": "विक्रेता व प्रशासक लॉगिन",
        "hi": "विक्रेता एवं प्रशासक लॉगिन",
        "en": "Vendor & Admin Login"
    },
    "Kumbh Mela 2027 Live Portal": {
        "mr": "कुंभमेळा २०२७ थेट पोर्टल",
        "hi": "कुंभ मेला २०२७ लाइव पोर्टल",
        "en": "Kumbh Mela 2027 Live Portal"
    },
    "Namaste, Yatri": {
        "mr": "नमस्ते, भाविक",
        "hi": "नमस्ते, तीर्थयात्री",
        "en": "Namaste, Yatri"
    },
    "Namaste, Yatri / शुभ यात्रा": {
        "mr": "नमस्ते, भाविक / शुभ यात्रा",
        "hi": "नमस्ते, तीर्थयात्री / शुभ यात्रा",
        "en": "Namaste, Yatri / Safe Journey"
    },
    "Ramkund & Godavari Ghats, Nashik": {
        "mr": "रामकुंड आणि गोदावरी घाट, नाशिक",
        "hi": "रामकुंड एवं गोदावरी घाट, नासिक",
        "en": "Ramkund & Godavari Ghats, Nashik"
    },
    "Zone A-1": {
        "mr": "विभाग A-1",
        "hi": "ज़ोन A-1",
        "en": "Zone A-1"
    },
    "28°C • Pleasant": {
        "mr": "२८°C • आल्हाददायक",
        "hi": "२८°C • सुहावना मौसम",
        "en": "28°C • Pleasant"
    },
    "Ramkund Ghat Flow": {
        "mr": "रामकुंड घाट गर्दी प्रवाह",
        "hi": "रामकुंड घाट भीड़ प्रवाह",
        "en": "Ramkund Ghat Flow"
    },
    "सुगम संचार • Moderate Flow": {
        "mr": "सुगम संचार • मध्यम प्रवाह",
        "hi": "सुगम संचार • मध्यम प्रवाह",
        "en": "Smooth Flow • Moderate"
    },
    "Moderate Flow": {
        "mr": "मध्यम प्रवाह",
        "hi": "मध्यम प्रवाह",
        "en": "Moderate Flow"
    },
    "High Flow": {
        "mr": "तीव्र गर्दी प्रवाह",
        "hi": "भारी भीड़ प्रवाह",
        "en": "High Flow"
    },
    "Low Flow": {
        "mr": "कमी गर्दी प्रवाह",
        "hi": "कम भीड़ प्रवाह",
        "en": "Low Flow"
    },
    "Smooth Flow": {
        "mr": "सुगम संचार",
        "hi": "सुगम प्रवाह",
        "en": "Smooth Flow"
    },
    "Optimal holy dip window: Next 45 mins": {
        "mr": "पवित्र स्नानासाठी उत्तम वेळ: पुढील ४५ मिनिटे",
        "hi": "पवित्र स्नान हेतु उत्तम समय: अगले ४५ मिनट",
        "en": "Optimal holy dip window: Next 45 mins"
    },
    "Updated 2m ago": {
        "mr": "२ मिनिटांपूर्वी अद्यतनित",
        "hi": "२ मिनट पहले अपडेट",
        "en": "Updated 2m ago"
    },
    "Rate Gazette": {
        "mr": "अधिकृत दरपत्रक",
        "hi": "आधिकारिक दर सूची",
        "en": "Rate Gazette"
    },
    "Auto (Station ➔ Ramkund):": {
        "mr": "रिक्षा (रेल्वे स्टेशन ➔ रामकुंड):",
        "hi": "ऑटो (रेलवे स्टेशन ➔ रामकुंड):",
        "en": "Auto (Station ➔ Ramkund):"
    },
    "Official Dorm Bed:": {
        "mr": "शासकीय डॉर्मिटरी बेड:",
        "hi": "आधिकारिक डॉर्मिटरी बेड:",
        "en": "Official Dorm Bed:"
    },
    "Authentic Thali:": {
        "mr": "पौष्टिक शाकाहारी थाळी:",
        "hi": "पौष्टिक शाकाहारी थाली:",
        "en": "Authentic Thali:"
    },
    "cap": {
        "mr": "कमाल मर्यादा",
        "hi": "अधिकतम सीमा",
        "en": "cap"
    },
    "standard": {
        "mr": "प्रमाणित दर",
        "hi": "मानक दर",
        "en": "standard"
    },
    "/night": {
        "mr": "/रात्र",
        "hi": "/रात",
        "en": "/night"
    },
    "Essential Pilgrim Services": {
        "mr": "महत्त्वाच्या यात्री सेवा",
        "hi": "प्रमुख तीर्थयात्री सेवाएँ",
        "en": "Essential Pilgrim Services"
    },
    "Verified by NMC": {
        "mr": "मनपा द्वारे प्रमाणित",
        "hi": "मनपा द्वारा प्रमाणित",
        "en": "Verified by NMC"
    },
    "Local Market": {
        "mr": "स्थानिक बाजार",
        "hi": "स्थानीय बाज़ार",
        "en": "Local Market"
    },
    "Compare fair rickshaws, hotels, stay, & licensed guides.": {
        "mr": "रिक्षा, हॉटेल्स, धर्मशाळा व परवानाधारक मार्गदर्शकांचे वाजवी दर तपासा.",
        "hi": "रिक्षा, होटल, धर्मशाला और अधिकृत गाइडों के उचित दर देखें।",
        "en": "Compare fair rickshaws, hotels, stay, & licensed guides."
    },
    "Compare Rates": {
        "mr": "दर तपासा",
        "hi": "दर तुलना करें",
        "en": "Compare Rates"
    },
    "Food Finder": {
        "mr": "अन्न शोधक / अन्नक्षेत्र",
        "hi": "अन्नक्षेत्र एवं भोजन खोज",
        "en": "Food Finder"
    },
    "Locate free Annakshetras, langars, & standard thalis.": {
        "mr": "मोफत अन्नछत्रे, लंगर आणि वाजवी थाळी केंद्रे शोधा.",
        "hi": "मुफ्त अन्नक्षेत्र, लंगर और प्रमाणित थाली केंद्र खोजें।",
        "en": "Locate free Annakshetras, langars, & standard thalis."
    },
    "Find Free Meals": {
        "mr": "भोजन शोधा",
        "hi": "भोजन खोजें",
        "en": "Find Free Meals"
    },
    "Free & Subsidized": {
        "mr": "मोफत व सवलतीच्या दरात",
        "hi": "मुफ्त एवं रियायती",
        "en": "Free & Subsidized"
    },
    "Report Issue": {
        "mr": "तक्रार नोंदवा",
        "hi": "शिकायत दर्ज करें",
        "en": "Report Issue"
    },
    "Flag overcharging, sanitation issues, or fake info.": {
        "mr": "जादा दर, अस्वच्छता किंवा बनावट माहितीची तक्रार करा.",
        "hi": "अधिक किराया/दाम, गंदगी या भ्रामक जानकारी की शिकायत करें।",
        "en": "Flag overcharging, sanitation issues, or fake info."
    },
    "File a Report": {
        "mr": "तक्रार दाखल करा",
        "hi": "शिकायत दर्ज करें",
        "en": "File a Report"
    },
    "Direct Dispatch": {
        "mr": "थेट कारवाई",
        "hi": "सीधी कार्रवाई",
        "en": "Direct Dispatch"
    },
    "Emergency SOS": {
        "mr": "आपत्कालीन मदत (SOS)",
        "hi": "आपातकालीन सहायता (SOS)",
        "en": "Emergency SOS"
    },
    "Instant dispatch: Police, Medical, Lost & Found, Rescue.": {
        "mr": "तातडीची मदत: पोलीस, रुग्णवाहिका, हरवले-सापडले, बचाव पथक.",
        "hi": "त्वरित सहायता: पुलिस, एम्बुलेंस, खोया-पाया, आपदा बचाव।",
        "en": "Instant dispatch: Police, Medical, Lost & Found, Rescue."
    },
    "Get Help Now": {
        "mr": "तातडीने मदत मिळवा",
        "hi": "तुरंत सहायता पाएं",
        "en": "Get Help Now"
    },
    "Instant Help": {
        "mr": "तातडीची मदत",
        "hi": "त्वरित सहायता",
        "en": "Instant Help"
    },
    "Official Cap Rates": {
        "mr": "शासकीय कमाल दर",
        "hi": "सरकारी अधिकतम दर",
        "en": "Official Cap Rates"
    },
    "Municipal gazette limits": {
        "mr": "महानगरपालिका अधिकृत मर्यादा",
        "hi": "नगर निगम आधिकारिक सीमा",
        "en": "Municipal gazette limits"
    },
    "Shared Auto": {
        "mr": "शेअर रिक्षा",
        "hi": "शेयर ऑटो",
        "en": "Shared Auto"
    },
    "Station to Ghat": {
        "mr": "रेल्वे स्टेशन ते घाट",
        "hi": "रेलवे स्टेशन से घाट",
        "en": "Station to Ghat"
    },
    "Dormitory Bed": {
        "mr": "डॉर्मिटरी बेड",
        "hi": "डॉर्मिटरी बेड",
        "en": "Dormitory Bed"
    },
    "Verified Ashrams": {
        "mr": "प्रमाणित आश्रम",
        "hi": "प्रमाणित आश्रम",
        "en": "Verified Ashrams"
    },
    "Standard Veg Thali": {
        "mr": "साधी शाकाहारी थाळी",
        "hi": "सादा शाकाहारी थाली",
        "en": "Standard Veg Thali"
    },
    "Approved pricing": {
        "mr": "मंजूर दर",
        "hi": "स्वीकृत मूल्य",
        "en": "Approved pricing"
    },
    "Local Guide": {
        "mr": "स्थानिक मार्गदर्शक",
        "hi": "स्थानीय गाइड",
        "en": "Local Guide"
    },
    "Certified per hour": {
        "mr": "प्रमाणित प्रति तास",
        "hi": "प्रमाणित प्रति घंटा",
        "en": "Certified per hour"
    },
    "View Full Price Matrix": {
        "mr": "संपूर्ण दरपत्रक पहा",
        "hi": "पूरी दर सूची देखें",
        "en": "View Full Price Matrix"
    },
    "Quick Emergency Access": {
        "mr": "तातडीची मदत संपर्क",
        "hi": "त्वरित आपातकालीन संपर्क",
        "en": "Quick Emergency Access"
    },
    "Police Control": {
        "mr": "पोलीस नियंत्रण कक्ष",
        "hi": "पुलिस कंट्रोल रूम",
        "en": "Police Control"
    },
    "Ambulance": {
        "mr": "रुग्णवाहिका",
        "hi": "एम्बुलेंस",
        "en": "Ambulance"
    },
    "Lost & Found": {
        "mr": "हरवले-सापडले कक्ष",
        "hi": "खोया-पाया केंद्र",
        "en": "Lost & Found"
    },
    "Disaster Helpline": {
        "mr": "आपत्ती निवारण मदत कक्ष",
        "hi": "आपदा प्रबंधन हेल्पलाइन",
        "en": "Disaster Helpline"
    },
    "Toll Free 24x7": {
        "mr": "टोल फ्री २४x७",
        "hi": "टोल फ्री २४x७",
        "en": "Toll Free 24x7"
    },
    "Full SOS Center": {
        "mr": "संपूर्ण आपत्कालीन कक्ष",
        "hi": "संपूर्ण आपातकालीन केंद्र",
        "en": "Full SOS Center"
    },
    "PIB BUSTS / Verified Fact Checks": {
        "mr": "पीआयबी पडताळणी / अधिकृत तथ्य तपासणी",
        "hi": "पीआईबी पड़ताल / आधिकारिक तथ्य जांच",
        "en": "PIB BUSTS / Verified Fact Checks"
    },
    "PIB BUSTS": {
        "mr": "पीआयबी पडताळणी",
        "hi": "पीआईबी पड़ताल",
        "en": "PIB BUSTS"
    },
    "NMC Fact-Check Cell": {
        "mr": "मनपा तथ्य-तपासणी कक्ष",
        "hi": "मनपा तथ्य-जांच प्रकोष्ठ",
        "en": "NMC Fact-Check Cell"
    },
    "Official Simhastha News": {
        "mr": "अधिकृत सिंहस्थ वृत्त",
        "hi": "आधिकारिक सिंहस्थ समाचार",
        "en": "Official Simhastha News"
    },
    "Report a Suspicious Rumor": {
        "mr": "संशयास्पद अफवेची माहिती द्या",
        "hi": "संदिग्ध अफवाह की सूचना दें",
        "en": "Report a Suspicious Rumor"
    },
    "View All Verified News": {
        "mr": "सर्व पडताळणी झालेल्या बातम्या पहा",
        "hi": "सभी सत्यापित समाचार देखें",
        "en": "View All Verified News"
    },
    "Report Rumor": {
        "mr": "अफवेची तक्रार करा",
        "hi": "अफवाह दर्ज करें",
        "en": "Report Rumor"
    },
    "Verified Facts": {
        "mr": "पडताळणी झालेले तथ्य",
        "hi": "सत्यापित तथ्य",
        "en": "Verified Facts"
    },
    "Fact Check Details": {
        "mr": "तथ्य पडताळणी तपशील",
        "hi": "तथ्य जांच विवरण",
        "en": "Fact Check Details"
    },
    "Submit Rumor for Verification": {
        "mr": "पडताळणीसाठी पाठवा",
        "hi": "सत्यापन हेतु भेजें",
        "en": "Submit Rumor for Verification"
    },
    "Rumor Description": {
        "mr": "अफवेचा तपशील",
        "hi": "अफवाह का विवरण",
        "en": "Rumor Description"
    },
    "Source / Platform": {
        "mr": "माहितीचा स्रोत / माध्यम",
        "hi": "सूचना का स्रोत / माध्यम",
        "en": "Source / Platform"
    },
    "Debunked": {
        "mr": "खोटे सिद्ध झाले",
        "hi": "झूठा साबित",
        "en": "Debunked"
    },
    "Confirmed True": {
        "mr": "सत्य प्रमाणित",
        "hi": "सत्य प्रमाणित",
        "en": "Confirmed True"
    },
    "Investigating": {
        "mr": "तपास सुरू आहे",
        "hi": "जांच जारी है",
        "en": "Investigating"
    },
    "Personal Face ID Verification": {
        "mr": "वैयक्तिक चेहरा ओळख पडताळणी",
        "hi": "व्यक्तिगत चेहरा पहचान सत्यापन",
        "en": "Personal Face ID Verification"
    },
    "Selfie Identity Verification": {
        "mr": "सेल्फी ओळख पडताळणी",
        "hi": "सेल्फी पहचान सत्यापन",
        "en": "Selfie Identity Verification"
    },
    "Personal Face CV Verification (Guide Only)": {
        "mr": "वैयक्तिक चेहरा पडताळणी (केवळ मार्गदर्शक)",
        "hi": "व्यक्तिगत चेहरा सत्यापन (केवल गाइड)",
        "en": "Personal Face CV Verification (Guide Only)"
    },
    "Ready to Scan": {
        "mr": "स्कॅन करण्यास सज्ज",
        "hi": "स्कैन के लिए तैयार",
        "en": "Ready to Scan"
    },
    "Face Detected": {
        "mr": "चेहरा आढळला",
        "hi": "चेहरा पहचाना गया",
        "en": "Face Detected"
    },
    "Align Single Face": {
        "mr": "फक्त एक चेहरा समोर ठेवा",
        "hi": "केवल एक चेहरा सामने रखें",
        "en": "Align Single Face"
    },
    "Identity Confirmed": {
        "mr": "ओळख प्रमाणित झाली",
        "hi": "पहचान प्रमाणित हुई",
        "en": "Identity Confirmed"
    },
    "Capture & Verify Identity": {
        "mr": "फोटो घ्या व पडताळणी करा",
        "hi": "फोटो लें एवं सत्यापन करें",
        "en": "Capture & Verify Identity"
    },
    "Open Camera": {
        "mr": "कॅमेरा सुरू करा",
        "hi": "कैमरा खोलें",
        "en": "Open Camera"
    },
    "Switch Camera": {
        "mr": "कॅमेरा बदला",
        "hi": "कैमरा बदलें",
        "en": "Switch Camera"
    },
    "Close Camera": {
        "mr": "कॅमेरा बंद करा",
        "hi": "कैमरा बंद करें",
        "en": "Close Camera"
    },
    "Take Live Selfie": {
        "mr": "थेट सेल्फी घ्या",
        "hi": "लाइव सेल्फी लें",
        "en": "Take Live Selfie"
    },
    "Verify Guide Identity": {
        "mr": "मार्गदर्शकाची ओळख तपासा",
        "hi": "गाइड की पहचान सत्यापित करें",
        "en": "Verify Guide Identity"
    },
    "Selfie Verified Guide": {
        "mr": "सेल्फी प्रमाणित मार्गदर्शक",
        "hi": "सेल्फी सत्यापित गाइड",
        "en": "Selfie Verified Guide"
    },
    "128-d Vector extracted": {
        "mr": "१२८-डी व्हेक्टर पडताळणी पूर्ण",
        "hi": "१२८-डी वेक्टर सत्यापन पूर्ण",
        "en": "128-d Vector extracted"
    },
    "Home": {
        "mr": "मुख्यपृष्ठ",
        "hi": "मुख्य",
        "en": "Home"
    },
    "Marketplace": {
        "mr": "बाजारपेठ",
        "hi": "बाज़ार",
        "en": "Marketplace"
    },
    "Market": {
        "mr": "बाजारपेठ",
        "hi": "बाज़ार",
        "en": "Market"
    },
    "Food": {
        "mr": "अन्नक्षेत्र",
        "hi": "भोजन",
        "en": "Food"
    },
    "Report": {
        "mr": "तक्रार",
        "hi": "शिकायत",
        "en": "Report"
    },
    "Emergency": {
        "mr": "आपत्कालीन",
        "hi": "आपातकाल",
        "en": "Emergency"
    },
    "SOS": {
        "mr": "मदत (SOS)",
        "hi": "सहायता (SOS)",
        "en": "SOS"
    },
    "Overview": {
        "mr": "आढावा",
        "hi": "अवलोकन",
        "en": "Overview"
    },
    "Vendors": {
        "mr": "विक्रेते",
        "hi": "विक्रेता",
        "en": "Vendors"
    },
    "Bookings": {
        "mr": "बुकिंग",
        "hi": "बुकिंग",
        "en": "Bookings"
    },
    "Reports": {
        "mr": "अहवाल",
        "hi": "रिपोर्ट्स",
        "en": "Reports"
    },
    "Escalations": {
        "mr": "तक्रारी",
        "hi": "शिकायतें",
        "en": "Escalations"
    },
    "Case Detail": {
        "mr": "तपशील",
        "hi": "केस विवरण",
        "en": "Case Detail"
    },
    "Case Log": {
        "mr": "प्रकरण नोंदवही",
        "hi": "केस लॉग",
        "en": "Case Log"
    },
    "Settings": {
        "mr": "सेटिंग्ज",
        "hi": "सेटिंग्स",
        "en": "Settings"
    },
    "Hotspots": {
        "mr": "हॉटस्पॉट",
        "hi": "हॉटस्पॉट",
        "en": "Hotspots"
    },
    "Radar": {
        "mr": "रडार",
        "hi": "रडार",
        "en": "Radar"
    },
    "Nashik Fair Marketplace": {
        "mr": "नाशिक वाजवी दर बाजारपेठ",
        "hi": "नासिक उचित मूल्य बाज़ार",
        "en": "Nashik Fair Marketplace"
    },
    "Bazaar & Stall Finder": {
        "mr": "बाजार व स्टॉल शोधक",
        "hi": "बाज़ार एवं स्टॉल खोज",
        "en": "Bazaar & Stall Finder"
    },
    "Categories": {
        "mr": "वर्गवारी",
        "hi": "श्रेणियाँ",
        "en": "Categories"
    },
    "All": {
        "mr": "सर्व",
        "hi": "सभी",
        "en": "All"
    },
    "All Items": {
        "mr": "सर्व वस्तू",
        "hi": "सभी वस्तुएं",
        "en": "All Items"
    },
    "Stays / Ashrams": {
        "mr": "निवास / आश्रम",
        "hi": "आवास / आश्रम",
        "en": "Stays / Ashrams"
    },
    "Food & Meals": {
        "mr": "भोजन व खानपान",
        "hi": "भोजन एवं खानपान",
        "en": "Food & Meals"
    },
    "Transport / Auto": {
        "mr": "वाहतूक / रिक्षा",
        "hi": "परिवहन / ऑटो",
        "en": "Transport / Auto"
    },
    "Puja & Essentials": {
        "mr": "पूजा व धार्मिक साहित्य",
        "hi": "पूजा एवं धार्मिक सामग्री",
        "en": "Puja & Essentials"
    },
    "Temple Offerings": {
        "mr": "मंदिरातील अर्पण साहित्य",
        "hi": "मंदिर चढ़ावा सामग्री",
        "en": "Temple Offerings"
    },
    "Traditional Crafts": {
        "mr": "पारंपरिक हस्तकला",
        "hi": "पारंपरिक हस्तशिल्प",
        "en": "Traditional Crafts"
    },
    "Prasadam & Food": {
        "mr": "प्रसाद आणि भोजन",
        "hi": "प्रसाद एवं भोजन",
        "en": "Prasadam & Food"
    },
    "Devotional Books": {
        "mr": "धार्मिक पुस्तके",
        "hi": "धार्मिक पुस्तकें",
        "en": "Devotional Books"
    },
    "Filter by Category": {
        "mr": "वर्गवारीनुसार निवडा",
        "hi": "श्रेणी अनुसार चुनें",
        "en": "Filter by Category"
    },
    "Filter by Zone": {
        "mr": "विभागानुसार निवडा",
        "hi": "ज़ोन अनुसार चुनें",
        "en": "Filter by Zone"
    },
    "Search products, stalls, local artisans...": {
        "mr": "वस्तू, स्टॉल, स्थानिक कारागीर शोधा...",
        "hi": "सामग्री, स्टॉल, स्थानीय कारीगर खोजें...",
        "en": "Search products, stalls, local artisans..."
    },
    "Search verified services, stay, transport...": {
        "mr": "प्रमाणित सेवा, मुक्काम, वाहतूक शोधा...",
        "hi": "प्रमाणित सेवाएँ, आवास, परिवहन खोजें...",
        "en": "Search verified services, stay, transport..."
    },
    "Search listings...": {
        "mr": "नोंदी शोधा...",
        "hi": "लिस्टिंग खोजें...",
        "en": "Search listings..."
    },
    "NMC Certified Fair Price": {
        "mr": "मनपा प्रमाणित वाजवी दर",
        "hi": "मनपा प्रमाणित उचित मूल्य",
        "en": "NMC Certified Fair Price"
    },
    "Verified Rate": {
        "mr": "सत्यापित दर",
        "hi": "सत्यापित दर",
        "en": "Verified Rate"
    },
    "Cap Price": {
        "mr": "कमाल मर्यादा",
        "hi": "अधिकतम सीमा",
        "en": "Cap Price"
    },
    "Book Now": {
        "mr": "आता बुक करा",
        "hi": "अभी बुक करें",
        "en": "Book Now"
    },
    "View Details": {
        "mr": "तपशील पहा",
        "hi": "विवरण देखें",
        "en": "View Details"
    },
    "Price Cap Guarantee": {
        "mr": "वाजवी दर हमी",
        "hi": "उचित मूल्य गारंटी",
        "en": "Price Cap Guarantee"
    },
    "All prices are capped by Nashik Municipal Corporation. Overcharging is strictly prohibited.": {
        "mr": "सर्व दर नाशिक महानगरपालिकेने निश्चित केलेले आहेत. जादा दर आकारण्यास सक्त मनाई आहे.",
        "hi": "सभी दरें नासिक नगर निगम द्वारा निर्धारित हैं। अधिक दाम वसूलना सख्त मना है।",
        "en": "All prices are capped by Nashik Municipal Corporation. Overcharging is strictly prohibited."
    },
    "Available": {
        "mr": "उपलब्ध",
        "hi": "उपलब्ध",
        "en": "Available"
    },
    "Directions": {
        "mr": "दिशा / रस्ता",
        "hi": "दिशा-निर्देश",
        "en": "Directions"
    },
    "Navigate (Map)": {
        "mr": "नकाशा मार्ग (Navigate)",
        "hi": "मानचित्र दिशा (Navigate)",
        "en": "Navigate (Map)"
    },
    "Order via WhatsApp": {
        "mr": "व्हॉट्सॲपवर ऑर्डर करा",
        "hi": "व्हाट्सएप पर ऑर्डर करें",
        "en": "Order via WhatsApp"
    },
    "Hand-Cast Brass Diya": {
        "mr": "हस्तनिर्मित पितळी दिवा",
        "hi": "हस्तनिर्मित पीतल दीया",
        "en": "Hand-Cast Brass Diya"
    },
    "Nashik Poha & Misal Pav": {
        "mr": "नाशिक पोहा आणि मिसळ पाव",
        "hi": "नासिक पोहा एवं मिसल पाव",
        "en": "Nashik Poha & Misal Pav"
    },
    "Copper Puja Lota & Arghya Set": {
        "mr": "तांब्याचा पूजा लोटा व अर्घ्य संच",
        "hi": "तांबे का पूजा लोटा एवं अर्घ्य सेट",
        "en": "Copper Puja Lota & Arghya Set"
    },
    "Pure Chanderi Paithani Stole": {
        "mr": "शुद्ध चंदेरी पैठणी शेला",
        "hi": "शुद्ध चंदेरी पैठणी दुपट्टा",
        "en": "Pure Chanderi Paithani Stole"
    },
    "Ayurvedic Godavari Herbal Dhoop & Havan Samagri": {
        "mr": "आयुर्वेदिक गोदावरी धूप व हवन साहित्य",
        "hi": "आयुर्वेदिक गोदावरी हर्बल धूप एवं हवन सामग्री",
        "en": "Ayurvedic Godavari Herbal Dhoop & Havan Samagri"
    },
    "Handmade Rudraksha Japa Mala (108 beads)": {
        "mr": "हस्तनिर्मित रुद्राक्ष जपमाळ (१०८ मणी)",
        "hi": "हस्तनिर्मित रुद्राक्ष जप माला (१०८ मनके)",
        "en": "Handmade Rudraksha Japa Mala (108 beads)"
    },
    "Sacred Nashik Clay Diya Set (Pack of 11)": {
        "mr": "पवित्र नाशिक मातीचे दिवे संच (११ चा संच)",
        "hi": "पवित्र नासिक मिट्टी दीया सेट (११ का सेट)",
        "en": "Sacred Nashik Clay Diya Set (Pack of 11)"
    },
    "Pure Brass Pooja Ghanti (Ritual Bell)": {
        "mr": "शुद्ध पितळी पूजा घंटी",
        "hi": "शुद्ध पीतल पूजा घंटी",
        "en": "Pure Brass Pooja Ghanti (Ritual Bell)"
    },
    "Zone A - Ramkund Ghat Stalls": {
        "mr": "विभाग A - रामकुंड घाट स्टॉल्स",
        "hi": "ज़ोन A - रामकुंड घाट स्टॉल",
        "en": "Zone A - Ramkund Ghat Stalls"
    },
    "Zone B - Panchavati Market": {
        "mr": "विभाग B - पंचवटी बाजार",
        "hi": "ज़ोन B - पंचवटी बाज़ार",
        "en": "Zone B - Panchavati Market"
    },
    "Zone C - Kapileshwar Temple Lane": {
        "mr": "विभाग C - कपिलेश्वर मंदिर गल्ली",
        "hi": "ज़ोन C - कपिलेश्वर मंदिर गली",
        "en": "Zone C - Kapileshwar Temple Lane"
    },
    "Zone D - Tapovan Marg": {
        "mr": "विभाग D - तपोवन मार्ग",
        "hi": "ज़ोन D - तपोवन मार्ग",
        "en": "Zone D - Tapovan Marg"
    },
    "Vendor Stall Hub": {
        "mr": "विक्रेता स्टॉल केंद्र",
        "hi": "विक्रेता स्टॉल हब",
        "en": "Vendor Stall Hub"
    },
    "My Stall & Product Catalog": {
        "mr": "माझे स्टॉल आणि उत्पादन सूची",
        "hi": "मेरा स्टॉल एवं उत्पाद सूची",
        "en": "My Stall & Product Catalog"
    },
    "Add New Item": {
        "mr": "नवीन वस्तू जोडा",
        "hi": "नई वस्तु जोड़ें",
        "en": "Add New Item"
    },
    "Active Listings": {
        "mr": "सक्रिय उत्पादने",
        "hi": "सक्रिय उत्पाद",
        "en": "Active Listings"
    },
    "Customer Orders": {
        "mr": "ग्राहकांच्या ऑर्डर्स",
        "hi": "ग्राहकों के ऑर्डर",
        "en": "Customer Orders"
    },
    "Daily Sales": {
        "mr": "दैनिक विक्री",
        "hi": "दैनिक बिक्री",
        "en": "Daily Sales"
    },
    "Pending Reviews": {
        "mr": "प्रलंबित पुनरावलोकने",
        "hi": "लंबित समीक्षाएँ",
        "en": "Pending Reviews"
    },
    "Fair Price Compliance": {
        "mr": "वाजवी दर पालन",
        "hi": "उचित मूल्य अनुपालन",
        "en": "Fair Price Compliance"
    },
    "Stall ID": {
        "mr": "स्टॉल ओळख क्र.",
        "hi": "स्टॉल पहचान सं.",
        "en": "Stall ID"
    },
    "Stall Location": {
        "mr": "स्टॉलचे ठिकाण",
        "hi": "स्टॉल का स्थान",
        "en": "Stall Location"
    },
    "Upload Stall Photo": {
        "mr": "स्टॉलचा फोटो अपलोड करा",
        "hi": "स्टॉल का फोटो अपलोड करें",
        "en": "Upload Stall Photo"
    },
    "Business Name": {
        "mr": "दुकानाचे / व्यवसायाचे नाव",
        "hi": "दुकान / व्यवसाय का नाम",
        "en": "Business Name"
    },
    "Owner Name": {
        "mr": "मालकाचे नाव",
        "hi": "मालिक का नाम",
        "en": "Owner Name"
    },
    "Contact Number": {
        "mr": "संपर्क क्रमांक",
        "hi": "संपर्क नंबर",
        "en": "Contact Number"
    },
    "Aadhaar / ID Proof": {
        "mr": "आधार / ओळख पुरावा",
        "hi": "आधार / पहचान प्रमाण",
        "en": "Aadhaar / ID Proof"
    },
    "Vendor Directory": {
        "mr": "विक्रेता नोंदणी डिरेक्टरी",
        "hi": "विक्रेता निर्देशिका",
        "en": "Vendor Directory"
    },
    "Register New Vendor": {
        "mr": "नवीन विक्रेता नोंदवा",
        "hi": "नया विक्रेता पंजीकृत करें",
        "en": "Register New Vendor"
    },
    "Register Vendor": {
        "mr": "विक्रेता नोंदणी करा",
        "hi": "विक्रेता पंजीकरण करें",
        "en": "Register Vendor"
    },
    "+ Register Vendor": {
        "mr": "+ विक्रेता नोंदणी करा",
        "hi": "+ विक्रेता पंजीकरण करें",
        "en": "+ Register Vendor"
    },
    "Verified Kumbh Stall": {
        "mr": "सत्यापित कुंभ स्टॉल",
        "hi": "सत्यापित कुंभ स्टॉल",
        "en": "Verified Kumbh Stall"
    },
    "Application Under Review": {
        "mr": "अर्ज पुनरावलोकनाधीन आहे",
        "hi": "आवेदन समीक्षाधीन है",
        "en": "Application Under Review"
    },
    "Estimated Fair Range": {
        "mr": "अंदाजे वाजवी दर मर्यादा",
        "hi": "अनुमानित उचित दर सीमा",
        "en": "Estimated Fair Range"
    },
    "Typical Fair Range": {
        "mr": "सर्वसाधारण वाजवी दर",
        "hi": "सामान्य उचित दर सीमा",
        "en": "Typical Fair Range"
    },
    "Indicative Price Range": {
        "mr": "अंदाजे वाजवी दर मर्यादा",
        "hi": "अनुमानित उचित दर सीमा",
        "en": "Indicative Price Range"
    },
    "Indicative Fair Range": {
        "mr": "अंदाजे वाजवी दर",
        "hi": "अनुमानित उचित दर",
        "en": "Indicative Fair Range"
    },
    "Community Reference Range": {
        "mr": "नागरी संदर्भ दर मर्यादा",
        "hi": "सामुदायिक संदर्भ दर सीमा",
        "en": "Community Reference Range"
    },
    "Prices are indicative community ranges. Govt does not guarantee or fix prices.": {
        "mr": "दर केवळ मार्गदर्शक आहेत. प्रशासन दर हमी किंवा निश्चित करत नाही.",
        "hi": "दरें केवल सांकेतिक हैं। प्रशासन मूल्य निर्धारित या गारंटी नहीं देता।",
        "en": "Prices are indicative community ranges. Govt does not guarantee or fix prices."
    },
    "Listed Range": {
        "mr": "अंदाजे दर मर्यादा",
        "hi": "अनुमानित मूल्य सीमा",
        "en": "Listed Range"
    },
    "Vendor Listed Range": {
        "mr": "विक्रेता दर मर्यादा",
        "hi": "विक्रेता मूल्य सीमा",
        "en": "Vendor Listed Range"
    },
    "Listed Price": {
        "mr": "विक्रेता नोंदवलेला दर",
        "hi": "विक्रेता सूचीबद्ध दर",
        "en": "Listed Price"
    },
    "Vendor Listed Price": {
        "mr": "विक्रेता नोंदवलेला दर",
        "hi": "विक्रेता द्वारा सूचीबद्ध मूल्य",
        "en": "Vendor Listed Price"
    },
    "Zero Overcharge Protection": {
        "mr": "वाजवी दर मार्गदर्शक माहिती",
        "hi": "उचित दर मार्गदर्शक जानकारी",
        "en": "Indicative Fair Price Guidance"
    },
    "Fair Category • Verified by Kumbhveer & Pilgrims": {
        "mr": "वाजवी वर्गवारी • कुंभवीर व यात्री संदर्भ",
        "hi": "उचित श्रेणी • कुंभवीर व तीर्थयात्री संदर्भ",
        "en": "Fair Category • Verified by Kumbhveer & Pilgrims"
    },
    "100% Fair": {
        "mr": "वाजवी श्रेणी",
        "hi": "उचित श्रेणी",
        "en": "Fair Category"
    },
    "Nashik Annakshetra & Food Finder": {
        "mr": "नाशिक अन्नक्षेत्र व भोजन शोधक",
        "hi": "नासिक अन्नक्षेत्र एवं भोजन खोज",
        "en": "Nashik Annakshetra & Food Finder"
    },
    "Food Finder & Annakshetra": {
        "mr": "अन्न शोधक व अन्नक्षेत्र",
        "hi": "भोजन खोज एवं अन्नक्षेत्र",
        "en": "Food Finder & Annakshetra"
    },
    "Locate free community kitchens (Annakshetra), langars, & subsidized food distribution.": {
        "mr": "मोफत अन्नछत्रे, लंगर आणि सवलतीच्या दरातील भोजन वितरण केंद्रे शोधा.",
        "hi": "मुफ्त अन्नक्षेत्र, लंगर और रियायती भोजन वितरण केंद्र खोजें।",
        "en": "Locate free community kitchens (Annakshetra), langars, & subsidized food distribution."
    },
    "Free Annakshetras & Bhojanalayas": {
        "mr": "मोफत अन्नछत्रे व भोजनालये",
        "hi": "मुफ्त अन्नक्षेत्र व भोजनालय",
        "en": "Free Annakshetras & Bhojanalayas"
    },
    "Free Bhandara": {
        "mr": "मोफत महाप्रसाद / भंडारा",
        "hi": "मुफ्त महाप्रसाद / भंडारा",
        "en": "Free Bhandara"
    },
    "Subsidized Bhojanalay": {
        "mr": "सवलतीचे भोजनालय",
        "hi": "रियायती भोजनालय",
        "en": "Subsidized Bhojanalay"
    },
    "Certified Pure Veg": {
        "mr": "प्रमाणित शुद्ध शाकाहारी",
        "hi": "प्रमाणित शुद्ध शाकाहारी",
        "en": "Certified Pure Veg"
    },
    "Get Directions": {
        "mr": "रस्ता पहा (दिशा)",
        "hi": "दिशा-निर्देश प्राप्त करें",
        "en": "Get Directions"
    },
    "Live Crowd Status": {
        "mr": "थेट गर्दी स्थिती",
        "hi": "लाइव भीड़ स्थिति",
        "en": "Live Crowd Status"
    },
    "Open Now": {
        "mr": "सध्या सुरू आहे",
        "hi": "अभी खुला है",
        "en": "Open Now"
    },
    "Meals Served Daily": {
        "mr": "दररोज भोजन वाटप",
        "hi": "दैनिक भोजन वितरण",
        "en": "Meals Served Daily"
    },
    "Free": {
        "mr": "मोफत",
        "hi": "मुफ्त",
        "en": "Free"
    },
    "Subsidized": {
        "mr": "सवलतीचे",
        "hi": "रियायती",
        "en": "Subsidized"
    },
    "Timing:": {
        "mr": "वेळ:",
        "hi": "समय:",
        "en": "Timing:"
    },
    "Timing": {
        "mr": "वेळ",
        "hi": "समय",
        "en": "Timing"
    },
    "Distance:": {
        "mr": "अंतर:",
        "hi": "दूरी:",
        "en": "Distance:"
    },
    "Distance": {
        "mr": "अंतर",
        "hi": "दूरी",
        "en": "Distance"
    },
    "Anchor Location": {
        "mr": "स्थान बिंदू",
        "hi": "मुख्य स्थान",
        "en": "Anchor Location"
    },
    "Within 1 km": {
        "mr": "१ किमी च्या आत",
        "hi": "१ किमी के भीतर",
        "en": "Within 1 km"
    },
    "Search Annakshetra, Thali, Bhojanalaya, Grocery, Fruits...": {
        "mr": "अन्नछत्र, थाळी, भोजनालय, किराणा, फळे शोधा...",
        "hi": "अन्नक्षेत्र, थाली, भोजनालय, राशन, फल खोजें...",
        "en": "Search Annakshetra, Thali, Bhojanalaya, Grocery, Fruits..."
    },
    "All Foods": {
        "mr": "सर्व खाद्यपदार्थ",
        "hi": "सभी खाद्य",
        "en": "All Foods"
    },
    "Free Annakshetra": {
        "mr": "मोफत अन्नछत्र",
        "hi": "मुफ्त अन्नक्षेत्र",
        "en": "Free Annakshetra"
    },
    "Pure Satvik": {
        "mr": "शुद्ध सात्विक",
        "hi": "शुद्ध सात्विक",
        "en": "Pure Satvik"
    },
    "Jain Bhojanalay": {
        "mr": "जैन भोजनालय",
        "hi": "जैन भोजनालय",
        "en": "Jain Bhojanalay"
    },
    "Budget Thali (₹200)": {
        "mr": "किफायतशीर थाळी (₹२००)",
        "hi": "किफायती थाली (₹२००)",
        "en": "Budget Thali (₹200)"
    },
    "Map View": {
        "mr": "नकाशा पहा",
        "hi": "मानचित्र देखें",
        "en": "Map View"
    },
    "Hide Map": {
        "mr": "नकाशा लपवा",
        "hi": "मानचित्र छुपाएँ",
        "en": "Hide Map"
    },
    "Digital Meal Pass": {
        "mr": "डिजिटल भोजन पास",
        "hi": "डिजिटल भोजन पास",
        "en": "Digital Meal Pass"
    },
    "Get Digital Pass": {
        "mr": "डिजिटल पास मिळवा",
        "hi": "डिजिटल पास प्राप्त करें",
        "en": "Get Digital Pass"
    },
    "Generate Digital Pass": {
        "mr": "पास तयार करा",
        "hi": "पास बनाएं",
        "en": "Generate Digital Pass"
    },
    "Number of Yatris:": {
        "mr": "यात्री संख्या:",
        "hi": "तीर्थयात्रियों की संख्या:",
        "en": "Number of Yatris:"
    },
    "Number of Yatris": {
        "mr": "यात्री संख्या",
        "hi": "तीर्थयात्रियों की संख्या",
        "en": "Number of Yatris"
    },
    "Estimated Waiting Time:": {
        "mr": "अनुमानित प्रतीक्षा वेळ:",
        "hi": "अनुमानित प्रतीक्षा समय:",
        "en": "Estimated Waiting Time:"
    },
    "Estimated Waiting Time": {
        "mr": "अनुमानित प्रतीक्षा वेळ",
        "hi": "अनुमानित प्रतीक्षा समय",
        "en": "Estimated Waiting Time"
    },
    "Next 15 mins": {
        "mr": "पुढील १५ मिनिटे",
        "hi": "अगले १५ मिनट",
        "en": "Next 15 mins"
    },
    "Today's Menu / Prasadam:": {
        "mr": "आजचा मेनू / महाप्रसाद:",
        "hi": "आज का मेनू / महाप्रसाद:",
        "en": "Today's Menu / Prasadam:"
    },
    "Distribution Timings:": {
        "mr": "भोजन वितरण वेळ:",
        "hi": "भोजन वितरण समय:",
        "en": "Distribution Timings:"
    },
    "Free Prasadam": {
        "mr": "मोफत महाप्रसाद",
        "hi": "मुफ्त महाप्रसाद",
        "en": "Free Prasadam"
    },
    "Pure Satvik Bhojan": {
        "mr": "शुद्ध सात्विक भोजन",
        "hi": "शुद्ध सात्विक भोजन",
        "en": "Pure Satvik Bhojan"
    },
    "Real-Time Fare Board & Transit Rates": {
        "mr": "थेट दर फलक व वाहतूक दर",
        "hi": "लाइव किराया बोर्ड एवं परिवहन दर",
        "en": "Real-Time Fare Board & Transit Rates"
    },
    "Fare Board": {
        "mr": "दर फलक",
        "hi": "किराया बोर्ड",
        "en": "Fare Board"
    },
    "RTO Gazetted Rates 2027": {
        "mr": "आरटीओ अधिकृत राजपत्र दर २०२७",
        "hi": "आरटीओ आधिकारिक राजपत्र दर २०२७",
        "en": "RTO Gazetted Rates 2027"
    },
    "कुंभ सेतू • Fare Board": {
        "mr": "कुंभसेतु • वाहतूक दर फलक",
        "hi": "कुंभसेतु • किराया बोर्ड",
        "en": "Kumbh Setu • Fare Board"
    },
    "Auto Rickshaw": {
        "mr": "ऑटो रिक्षा",
        "hi": "ऑटो रिक्शा",
        "en": "Auto Rickshaw"
    },
    "Taxi / Cab": {
        "mr": "टॅक्सी / कॅब",
        "hi": "टैक्सी / कैब",
        "en": "Taxi / Cab"
    },
    "City Bus": {
        "mr": "सिटी बस (सिटीलिंक)",
        "hi": "सिटी बस (सिटीलिंक)",
        "en": "City Bus"
    },
    "Shared E-Rickshaw": {
        "mr": "शेअर ई-रिक्षा",
        "hi": "शेयर ई-रिक्शा",
        "en": "Shared E-Rickshaw"
    },
    "Base Fare": {
        "mr": "किमान भाडे",
        "hi": "मूल किराया",
        "en": "Base Fare"
    },
    "Per Km Rate": {
        "mr": "प्रति किमी दर",
        "hi": "प्रति किमी दर",
        "en": "Per Km Rate"
    },
    "Night Surcharge": {
        "mr": "रात्रीचे जादा शुल्क",
        "hi": "रात्रि अधिभार",
        "en": "Night Surcharge"
    },
    "Approved Corridor Routes": {
        "mr": "मंजूर मार्ग व भाडे",
        "hi": "स्वीकृत कॉरिडोर मार्ग",
        "en": "Approved Corridor Routes"
    },
    "Report Overcharging": {
        "mr": "जादा दराची तक्रार करा",
        "hi": "अधिक किराए की शिकायत करें",
        "en": "Report Overcharging"
    },
    "Calculate Route Fare": {
        "mr": "भाडे मोजा",
        "hi": "किराया गणना करें",
        "en": "Calculate Route Fare"
    },
    "Origin Point": {
        "mr": "सुरुवातीचे ठिकाण",
        "hi": "आरंभिक स्थान",
        "en": "Origin Point"
    },
    "Destination Point": {
        "mr": "गंतव्य ठिकाण",
        "hi": "गंतव्य स्थान",
        "en": "Destination Point"
    },
    "Estimated Fare": {
        "mr": "अंदाजे भाडे",
        "hi": "अनुमानित किराया",
        "en": "Estimated Fare"
    },
    "Civic Vigilance & Fair-Price Complaint": {
        "mr": "नागरी दक्षता व वाजवी दर तक्रार निवारण",
        "hi": "नागरिक सतर्कता एवं उचित मूल्य शिकायत",
        "en": "Civic Vigilance & Fair-Price Complaint"
    },
    "Report an Issue": {
        "mr": "तक्रार नोंदवा",
        "hi": "शिकायत दर्ज करें",
        "en": "Report an Issue"
    },
    "Issue Category": {
        "mr": "तक्रारीचा प्रकार",
        "hi": "शिकायत की श्रेणी",
        "en": "Issue Category"
    },
    "Price Gouging / Overcharging": {
        "mr": "जादा दर / नफेखोरी",
        "hi": "अधिक वसूली / कालाबाज़ारी",
        "en": "Price Gouging / Overcharging"
    },
    "Sanitation / Cleanliness": {
        "mr": "स्वच्छता व कचरा व्यवस्थापन",
        "hi": "स्वच्छता एवं कचरा प्रबंधन",
        "en": "Sanitation / Cleanliness"
    },
    "Crowd Hazard / Bottleneck": {
        "mr": "गर्दीचा अडथळा व धोका",
        "hi": "भीड़ का दबाव / रुकावट",
        "en": "Crowd Hazard / Bottleneck"
    },
    "Vendor Misconduct": {
        "mr": "विक्रेत्याचे गैरवर्तन",
        "hi": "विक्रेता का दुर्व्यवहार",
        "en": "Vendor Misconduct"
    },
    "Other Grievance": {
        "mr": "इतर तक्रार",
        "hi": "अन्य समस्या",
        "en": "Other Grievance"
    },
    "Location / Ghat": {
        "mr": "ठिकाण / घाट",
        "hi": "स्थान / घाट",
        "en": "Location / Ghat"
    },
    "Select Location...": {
        "mr": "ठिकाण निवडा...",
        "hi": "स्थान चुनें...",
        "en": "Select Location..."
    },
    "Description": {
        "mr": "तक्रारीचा तपशील",
        "hi": "शिकायत का विवरण",
        "en": "Description"
    },
    "Describe the issue in detail...": {
        "mr": "तक्रारीचे सविस्तर वर्णन करा...",
        "hi": "समस्या का विस्तार से वर्णन करें...",
        "en": "Describe the issue in detail..."
    },
    "Upload Photo Evidence": {
        "mr": "पुराव्यासाठी फोटो जोडा",
        "hi": "साक्ष्य हेतु फोटो संलग्न करें",
        "en": "Upload Photo Evidence"
    },
    "Submit Report": {
        "mr": "तक्रार दाखल करा",
        "hi": "शिकायत दर्ज करें",
        "en": "Submit Report"
    },
    "Submit to Civic Vigilance": {
        "mr": "नागरी दक्षता कक्षाकडे पाठवा",
        "hi": "नागरिक सतर्कता विभाग को भेजें",
        "en": "Submit to Civic Vigilance"
    },
    "Your report will be reviewed as quickly as possible": {
        "mr": "तुमच्या तक्रारीचे त्वरित पुनरावलोकन केले जाईल",
        "hi": "आपकी शिकायत की शीघ्र समीक्षा की जाएगी",
        "en": "Your report will be reviewed as quickly as possible"
    },
    "Report Submitted Successfully": {
        "mr": "तक्रार यशस्वीरित्या नोंदवली गेली",
        "hi": "शिकायत सफलतापूर्वक दर्ज की गई",
        "en": "Report Submitted Successfully"
    },
    "Emergency Dispatch & Safety Hub": {
        "mr": "आपत्कालीन नियंत्रण व सुरक्षा केंद्र",
        "hi": "आपातकालीन नियंत्रण एवं सुरक्षा केंद्र",
        "en": "Emergency Dispatch & Safety Hub"
    },
    "One-Touch Emergency Dispatch": {
        "mr": "एका स्पर्शात तातडीची मदत",
        "hi": "एक स्पर्श आपातकालीन सहायता",
        "en": "One-Touch Emergency Dispatch"
    },
    "Call 112 (Police & Disaster)": {
        "mr": "११२ वर संपर्क करा (पोलीस व आपत्ती)",
        "hi": "११२ पर कॉल करें (पुलिस एवं आपदा)",
        "en": "Call 112 (Police & Disaster)"
    },
    "Call 108 (Ambulance)": {
        "mr": "१०८ वर संपर्क करा (रुग्णवाहिका)",
        "hi": "१०८ पर कॉल करें (एम्बुलेंस)",
        "en": "Call 108 (Ambulance)"
    },
    "Medical Outposts": {
        "mr": "वैद्यकीय मदत केंद्रे",
        "hi": "चिकित्सा सहायता केंद्र",
        "en": "Medical Outposts"
    },
    "Lost Persons Helpdesk": {
        "mr": "हरवले-सापडले व्यक्ती कक्ष",
        "hi": "लापता व्यक्ति सहायता केंद्र",
        "en": "Lost Persons Helpdesk"
    },
    "Ghat Lifeguard Force": {
        "mr": "घाट जीवरक्षक दल",
        "hi": "घाट जीवन रक्षक दल",
        "en": "Ghat Lifeguard Force"
    },
    "Your Live GPS Coordinates": {
        "mr": "तुमचे थेट जीपीएस स्थान",
        "hi": "आपकी वर्तमान जीपीएस स्थिति",
        "en": "Your Live GPS Coordinates"
    },
    "Send Emergency Distress Alert": {
        "mr": "तातडीचा धोक्याचा इशारा पाठवा",
        "hi": "तत्काल आपातकालीन अलर्ट भेजें",
        "en": "Send Emergency Distress Alert"
    },
    "Disaster Helpline (1077)": {
        "mr": "आपत्ती निवारण मदत कक्ष (१०७७)",
        "hi": "आपदा प्रबंधन हेल्पलाइन (१०७७)",
        "en": "Disaster Helpline (1077)"
    },
    "Fire Brigade (101)": {
        "mr": "अग्निशामक दल (१०१)",
        "hi": "अग्निशमन दल (१०१)",
        "en": "Fire Brigade (101)"
    },
    "Women Safety (1091)": {
        "mr": "महिला सुरक्षा हेल्पलाइन (१०९१)",
        "hi": "महिला सुरक्षा हेल्पलाइन (१०९१)",
        "en": "Women Safety (1091)"
    },
    "Nashikkar Portal": {
        "mr": "नाशिककर पोर्टल",
        "hi": "नाशिककर पोर्टल",
        "en": "Nashikkar Portal"
    },
    "Vendor Portal": {
        "mr": "विक्रेता पोर्टल",
        "hi": "विक्रेता पोर्टल",
        "en": "Vendor Portal"
    },
    "Nashikkar Civic Hub": {
        "mr": "नाशिककर नागरी केंद्र",
        "hi": "नाशिककर नागरिक केंद्र",
        "en": "Nashikkar Civic Hub"
    },
    "Nashikkar Civic & Guide Portal": {
        "mr": "नाशिककर नागरी व मार्गदर्शक पोर्टल",
        "hi": "नाशिककर नागरिक एवं गाइड पोर्टल",
        "en": "Nashikkar Civic & Guide Portal"
    },
    "Civic Pledge": {
        "mr": "नागरी निष्ठा शपथ",
        "hi": "नागरिक निष्ठा शपथ",
        "en": "Civic Pledge"
    },
    "Registered Listings": {
        "mr": "नोंदणीकृत सेवा",
        "hi": "पंजीकृत सेवाएँ",
        "en": "Registered Listings"
    },
    "Active Bookings": {
        "mr": "सक्रिय बुकिंग",
        "hi": "सक्रिय बुकिंग",
        "en": "Active Bookings"
    },
    "Price Compliance Score": {
        "mr": "दर compliance गुण",
        "hi": "मूल्य अनुपालन स्कोर",
        "en": "Price Compliance Score"
    },
    "Register New Vendor / Service": {
        "mr": "नवीन विक्रेता / सेवा नोंदवा",
        "hi": "नया विक्रेता / सेवा पंजीकृत करें",
        "en": "Register New Vendor / Service"
    },
    "Civic Trust Score": {
        "mr": "नागरी विश्वास निर्देशांक",
        "hi": "नागरिक विश्वास स्कोर",
        "en": "Civic Trust Score"
    },
    "Kumbhveer Verified": {
        "mr": "कुंभवीर सत्यापित",
        "hi": "कुंभवीर सत्यापित",
        "en": "Kumbhveer Verified"
    },
    "Pending Verification": {
        "mr": "सत्यापन प्रलंबित",
        "hi": "सत्यापन लंबित",
        "en": "Pending Verification"
    },
    "Flagged — Info Incomplete": {
        "mr": "ध्वजांकित — माहिती अपूर्ण",
        "hi": "चिह्नित — जानकारी अधूरी",
        "en": "Flagged — Info Incomplete"
    },
    "Total Revenue": {
        "mr": "एकूण महसूल",
        "hi": "कुल आय",
        "en": "Total Revenue"
    },
    "Recent Bookings": {
        "mr": "अलीकडील बुकिंग",
        "hi": "हाल की बुकिंग",
        "en": "Recent Bookings"
    },
    "Log In as Nashikkar": {
        "mr": "नाशिककर म्हणून लॉगिन करा",
        "hi": "नाशिककर के रूप में लॉगिन करें",
        "en": "Log In as Nashikkar"
    },
    "Mobile Number / Vendor ID": {
        "mr": "मोबाईल क्रमांक / विक्रेता ओळख क्रमांक",
        "hi": "मोबाइल नंबर / विक्रेता पहचान संख्या",
        "en": "Mobile Number / Vendor ID"
    },
    "Enter PIN / OTP": {
        "mr": "पिन / ओटीपी टाका",
        "hi": "पिन / ओटीपी दर्ज करें",
        "en": "Enter PIN / OTP"
    },
    "Existing Login": {
        "mr": "लॉगिन करा",
        "hi": "लॉगिन करें",
        "en": "Existing Login"
    },
    "New Registration": {
        "mr": "नवीन नोंदणी",
        "hi": "नया पंजीकरण",
        "en": "New Registration"
    },
    "Email ID & Password": {
        "mr": "ईमेल आयडी आणि पासवर्ड",
        "hi": "ईमेल आईडी एवं पासवर्ड",
        "en": "Email ID & Password"
    },
    "Police Command Terminal": {
        "mr": "पोलीस नियंत्रण कक्ष टर्मिनल",
        "hi": "पुलिस कमांड टर्मिनल",
        "en": "Police Command Terminal"
    },
    "Simhastha Security Apex": {
        "mr": "सिंहस्थ सुरक्षा सर्वोच्च केंद्र",
        "hi": "सिंहस्थ सुरक्षा शीर्ष केंद्र",
        "en": "Simhastha Security Apex"
    },
    "Nashik 2027 • Police Unit": {
        "mr": "नाशिक २०२७ • पोलीस दल",
        "hi": "नासिक २०२७ • पुलिस दल",
        "en": "Nashik 2027 • Police Unit"
    },
    "Simhastha Police Command — AI Spatial Hotspot Radar": {
        "mr": "सिंहस्थ पोलीस नियंत्रण कक्ष — एआय हॉटस्पॉट रडार",
        "hi": "सिंहस्थ पुलिस कमांड — एआई हॉटस्पॉट रडार",
        "en": "Simhastha Police Command — AI Spatial Hotspot Radar"
    },
    "Hotspot Radar": {
        "mr": "हॉटस्पॉट रडार",
        "hi": "हॉटस्पॉट रडार",
        "en": "Hotspot Radar"
    },
    "Live DBSCAN Incident Clustering": {
        "mr": "थेट डीबीस्कॅन घटना क्लस्टरिंग",
        "hi": "लाइव डीबीस्कैन घटना क्लस्टरिंग",
        "en": "Live DBSCAN Incident Clustering"
    },
    "Hotspot Clusters": {
        "mr": "हॉटस्पॉट क्लस्टर्स",
        "hi": "हॉटस्पॉट क्लस्टर्स",
        "en": "Hotspot Clusters"
    },
    "Live Alerts": {
        "mr": "थेट सूचना व इशारे",
        "hi": "लाइव अलर्ट एवं सूचनाएं",
        "en": "Live Alerts"
    },
    "Density Map": {
        "mr": "गर्दी घनता नकाशा",
        "hi": "भीड़ घनत्व मानचित्र",
        "en": "Density Map"
    },
    "Dispatch Patrol": {
        "mr": "गस्त पथक रवाना करा",
        "hi": "गश्ती दल रवाना करें",
        "en": "Dispatch Patrol"
    },
    "High Density": {
        "mr": "उच्च घनता",
        "hi": "उच्च घनत्व",
        "en": "High Density"
    },
    "Medium Density": {
        "mr": "मध्यम घनता",
        "hi": "मध्यम घनत्व",
        "en": "Medium Density"
    },
    "Low Density": {
        "mr": "कमी घनता",
        "hi": "कम घनत्व",
        "en": "Low Density"
    },
    "Patrol Dispatched": {
        "mr": "गस्त पथक रवाना केले",
        "hi": "गश्ती दल रवाना किया गया",
        "en": "Patrol Dispatched"
    },
    "Crowd Control Protocol": {
        "mr": "गर्दी नियंत्रण नियमावली",
        "hi": "भीड़ नियंत्रण नियमावली",
        "en": "Crowd Control Protocol"
    },
    "Active Escalations": {
        "mr": "सक्रिय तक्रारी व गुन्हे",
        "hi": "सक्रिय मामले एवं शिकायतें",
        "en": "Active Escalations"
    },
    "Officer Settings": {
        "mr": "अधिकारी सेटिंग्ज",
        "hi": "अधिकारी सेटिंग्स",
        "en": "Officer Settings"
    },
    "Severity: High": {
        "mr": "तीव्रता: अति तातडीची",
        "hi": "गंभीरता: उच्च",
        "en": "Severity: High"
    },
    "Severity: Medium": {
        "mr": "तीव्रता: मध्यम",
        "hi": "गंभीरता: मध्यम",
        "en": "Severity: Medium"
    },
    "Severity: Low": {
        "mr": "तीव्रता: सामान्य",
        "hi": "गंभीरता: सामान्य",
        "en": "Severity: Low"
    },
    "Dispatch Officer": {
        "mr": "अधिकारी रवाना करा",
        "hi": "अधिकारी रवाना करें",
        "en": "Dispatch Officer"
    },
    "Resolve Case": {
        "mr": "प्रकरण निकाली काढा",
        "hi": "मामला हल करें",
        "en": "Resolve Case"
    },
    "Mark as Resolved": {
        "mr": "निकाली काढल्याची नोंद करा",
        "hi": "निस्तारित के रूप में चिह्नित करें",
        "en": "Mark as Resolved"
    },
    "Investigation Notes": {
        "mr": "तपास अहवाल / टिपण",
        "hi": "जांच रिपोर्ट / टिप्पणी",
        "en": "Investigation Notes"
    },
    "Log In to Command Terminal": {
        "mr": "कमांड टर्मिनलमध्ये प्रवेश करा",
        "hi": "कमांड टर्मिनल में लॉगिन करें",
        "en": "Log In to Command Terminal"
    },
    "Officer Badge ID / Metal No.": {
        "mr": "अधिकारी बॅज क्रमांक / मेटल क्र.",
        "hi": "अधिकारी बैज नंबर / मेटल क्र.",
        "en": "Officer Badge ID / Metal No."
    },
    "Security PIN": {
        "mr": "सुरक्षा पिन",
        "hi": "सुरक्षा पिन",
        "en": "Security PIN"
    },
    "Rapid Field Resolution": {
        "mr": "त्वरित घटना निवारण",
        "hi": "त्वरित मैदानी निस्तारण",
        "en": "Rapid Field Resolution"
    },
    "On-Ground Direct Clearance": {
        "mr": "थेट जागीच निपटारा",
        "hi": "सीधे मौके पर निपटारा",
        "en": "On-Ground Direct Clearance"
    },
    "All Cases": {
        "mr": "सर्व प्रकरणे",
        "hi": "सभी मामले",
        "en": "All Cases"
    },
    "Resolved": {
        "mr": "निकाली काढले",
        "hi": "निस्तारित",
        "en": "Resolved"
    },
    "Pending": {
        "mr": "प्रलंबित",
        "hi": "लंबित",
        "en": "Pending"
    },
    "Under Review": {
        "mr": "पुनरावलोकनाधीन",
        "hi": "समीक्षाधीन",
        "en": "Under Review"
    },
    "Escalated": {
        "mr": "वरिष्ठांकडे पाठवले",
        "hi": "उच्च स्तर पर भेजा गया",
        "en": "Escalated"
    },
    "Incident Details": {
        "mr": "घटनेचा तपशील",
        "hi": "घटना का विवरण",
        "en": "Incident Details"
    },
    "Sector 04 Log Archive": {
        "mr": "विभाग ०४ नोंदणी अभिलेख",
        "hi": "सेक्टर ०४ लॉग अभिलेख",
        "en": "Sector 04 Log Archive"
    },
    "Live Synchronized": {
        "mr": "थेट समक्रमित",
        "hi": "लाइव सिंक्रनाइज़्ड",
        "en": "Live Synchronized"
    },
    "Vendor Details": {
        "mr": "विक्रेत्याचा तपशील",
        "hi": "विक्रेता विवरण",
        "en": "Vendor Details"
    },
    "Official Fair-Tariff Registry": {
        "mr": "अधिकृत वाजवी दर नोंदणी",
        "hi": "आधिकारिक उचित दर पंजी",
        "en": "Official Fair-Tariff Registry"
    },
    "Reference Token": {
        "mr": "संदर्भ टोकन क्रमांक",
        "hi": "संदर्भ टोकन संख्या",
        "en": "Reference Token"
    },
    "Request Sent": {
        "mr": "विनंती पाठवली गेली",
        "hi": "अनुरोध भेजा गया",
        "en": "Request Sent"
    },
    "Civic Verified Service": {
        "mr": "नागरी प्रमाणित सेवा",
        "hi": "नागरिक सत्यापित सेवा",
        "en": "Civic Verified Service"
    },
    "Local Guide Profile": {
        "mr": "स्थानिक मार्गदर्शक माहिती",
        "hi": "स्थानीय गाइड प्रोफाइल",
        "en": "Local Guide Profile"
    },
    "Guide Credentials": {
        "mr": "मार्गदर्शक प्रमाणपत्र",
        "hi": "गाइड प्रमाण पत्र",
        "en": "Guide Credentials"
    },
    "Licensed by NMC": {
        "mr": "मनपा परवानाधारक",
        "hi": "मनपा लाइसेंस प्राप्त",
        "en": "Licensed by NMC"
    },
    "Languages:": {
        "mr": "भाषा:",
        "hi": "भाषाएं:",
        "en": "Languages:"
    },
    "Experience:": {
        "mr": "अनुभव:",
        "hi": "अनुभव:",
        "en": "Experience:"
    },
    "Rate per Hour:": {
        "mr": "प्रति तास दर:",
        "hi": "प्रति घंटा दर:",
        "en": "Rate per Hour:"
    },
    "Central Courtyard": {
        "mr": "मध्यवर्ती प्रांगण",
        "hi": "केंद्रीय प्रांगण",
        "en": "Central Courtyard"
    },
    "Standard Twin Room": {
        "mr": "प्रमाणित ट्विन रूम",
        "hi": "मानक ट्विन रूम",
        "en": "Standard Twin Room"
    },
    "Ramkund River View": {
        "mr": "रामकुंड नदी दृश्य",
        "hi": "रामकुंड नदी दृश्य",
        "en": "Ramkund River View"
    },
    "Search": {
        "mr": "शोधा",
        "hi": "खोजें",
        "en": "Search"
    },
    "Submit": {
        "mr": "सादर करा",
        "hi": "जमा करें",
        "en": "Submit"
    },
    "Cancel": {
        "mr": "रद्द करा",
        "hi": "रद्द करें",
        "en": "Cancel"
    },
    "Close": {
        "mr": "बंद करा",
        "hi": "बंद करें",
        "en": "Close"
    },
    "Save": {
        "mr": "जतन करा",
        "hi": "सुरक्षित करें",
        "en": "Save"
    },
    "Filter": {
        "mr": "फिल्टर",
        "hi": "फ़िल्टर",
        "en": "Filter"
    },
    "Back": {
        "mr": "मागे",
        "hi": "पीछे",
        "en": "Back"
    },
    "Next": {
        "mr": "पुढे",
        "hi": "आगे",
        "en": "Next"
    },
    "Confirm": {
        "mr": "पुष्टी करा",
        "hi": "पुष्टि करें",
        "en": "Confirm"
    },
    "Clear": {
        "mr": "साफ करा",
        "hi": "हटाएं",
        "en": "Clear"
    },
    "Login": {
        "mr": "लॉगिन",
        "hi": "लॉगिन",
        "en": "Login"
    },
    "Logout": {
        "mr": "लॉगआउट",
        "hi": "लॉगआउट",
        "en": "Logout"
    },
    "Register": {
        "mr": "नोंदणी करा",
        "hi": "पंजीकरण करें",
        "en": "Register"
    },
    "Upload": {
        "mr": "अपलोड करा",
        "hi": "अपलोड करें",
        "en": "Upload"
    },
    "Download": {
        "mr": "डाउनलोड करा",
        "hi": "डाउनलोड करें",
        "en": "Download"
    },
    "Copy": {
        "mr": "कॉपी करा",
        "hi": "कॉपी करें",
        "en": "Copy"
    },
    "Verify": {
        "mr": "पडताळणी करा",
        "hi": "सत्यापित करें",
        "en": "Verify"
    },
    "Apply": {
        "mr": "लागू करा",
        "hi": "लागू करें",
        "en": "Apply"
    },
    "View All": {
        "mr": "सर्व पहा",
        "hi": "सभी देखें",
        "en": "View All"
    },
    "Read More": {
        "mr": "अधिक वाचा",
        "hi": "और पढ़ें",
        "en": "Read More"
    },
    "Loading...": {
        "mr": "लोड होत आहे...",
        "hi": "लोड हो रहा है...",
        "en": "Loading..."
    },
    "Please wait...": {
        "mr": "कृपया प्रतीक्षा करा...",
        "hi": "कृपया प्रतीक्षा करें...",
        "en": "Please wait..."
    },
    "Success": {
        "mr": "यशस्वी",
        "hi": "सफल",
        "en": "Success"
    },
    "Error": {
        "mr": "त्रुटी",
        "hi": "त्रुटि",
        "en": "Error"
    },
    "Language": {
        "mr": "भाषा",
        "hi": "भाषा",
        "en": "Language"
    },
    "Select Language": {
        "mr": "भाषा निवडा",
        "hi": "भाषा चुनें",
        "en": "Select Language"
    },
    "Select Language / भाषा निवडा": {
        "mr": "भाषा निवडा",
        "hi": "भाषा चुनें",
        "en": "Select Language"
    },
    "Default Global": {
        "mr": "डीफॉल्ट जागतिक",
        "hi": "डिफ़ॉल्ट वैश्विक",
        "en": "Default Global"
    },
    "स्थानिक भाषा / Regional": {
        "mr": "स्थानिक भाषा",
        "hi": "क्षेत्रीय भाषा",
        "en": "Regional Language"
    },
    "राष्ट्रीय भाषा / National": {
        "mr": "राष्ट्रीय भाषा",
        "hi": "राष्ट्रीय भाषा",
        "en": "National Language"
    },
    "English": {
        "mr": "English",
        "hi": "English",
        "en": "English"
    },
    "मराठी (Marathi)": {
        "mr": "मराठी (Marathi)",
        "hi": "मराठी (Marathi)",
        "en": "मराठी (Marathi)"
    },
    "हिंदी (Hindi)": {
        "mr": "हिंदी (Hindi)",
        "hi": "हिंदी (Hindi)",
        "en": "हिंदी (Hindi)"
    },
    "मराठी": {
        "mr": "मराठी",
        "hi": "मराठी",
        "en": "मराठी"
    },
    "हिंदी": {
        "mr": "हिंदी",
        "hi": "हिंदी",
        "en": "हिंदी"
    },
    "EN | मरा": {
        "mr": "मराठी",
        "hi": "हिंदी",
        "en": "English"
    },
    "मरा / EN": {
        "mr": "मराठी",
        "hi": "हिंदी",
        "en": "English"
    },
    "mins avg": {
        "mr": "सरासरी मिनिटे",
        "hi": "औसत मिनट",
        "en": "mins avg"
    },
    "Optional": {
        "mr": "ऐच्छिक",
        "hi": "वैकल्पिक",
        "en": "Optional"
    }
};

  const LANG_STORAGE_KEY = 'kumbhsetu_lang';
  const SUPPORTED_LANGS = ['en', 'mr', 'hi'];

  function getSavedLang() {
    let saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (!saved || !SUPPORTED_LANGS.includes(saved)) {
      saved = 'en';
    }
    return saved;
  }

  function saveLang(lang) {
    if (SUPPORTED_LANGS.includes(lang)) {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
      document.documentElement.lang = lang;
      applyTranslations(lang);
      updateLanguageUIElements(lang);
      window.dispatchEvent(new CustomEvent('kumbh_language_changed', { detail: { lang } }));
    }
  }

  function translateText(str, targetLang) {
    if (!str || typeof str !== 'string') return str;
    const trimmed = str.trim();
    if (!trimmed) return str;

    // 1. Direct dictionary match
    if (TRANSLATIONS[trimmed] && TRANSLATIONS[trimmed][targetLang]) {
      return TRANSLATIONS[trimmed][targetLang];
    }

    // 2. Case-insensitive dictionary match
    const lower = trimmed.toLowerCase();
    for (const key in TRANSLATIONS) {
      if (key.toLowerCase() === lower) {
        return TRANSLATIONS[key][targetLang] || TRANSLATIONS[key].en || trimmed;
      }
    }

    // 3. Reverse lookup (if node is currently in mr or hi)
    for (const key in TRANSLATIONS) {
      const entry = TRANSLATIONS[key];
      if (entry.en === trimmed || entry.mr === trimmed || entry.hi === trimmed ||
          (entry.en && entry.en.toLowerCase() === lower) ||
          (entry.mr && entry.mr.toLowerCase() === lower) ||
          (entry.hi && entry.hi.toLowerCase() === lower)) {
        return entry[targetLang] || entry.en || trimmed;
      }
    }

    // 4. Smart suffix handling (colon, arrow, bullet, ellipsis)
    const suffixMatch = trimmed.match(/^(.*?)([\s]*[:•→]+|\{3\}|\.\.\.)$/);
    if (suffixMatch) {
      const base = suffixMatch[1].trim();
      const punct = suffixMatch[2];
      const transBase = translateText(base, targetLang);
      if (transBase && transBase !== base) {
        return transBase + punct;
      }
    }

    // 5. Smart prefix handling (+, bullet, hash)
    const prefixMatch = trimmed.match(/^([+•\-\s#]+)(.*)$/);
    if (prefixMatch) {
      const prefix = prefixMatch[1];
      const base = prefixMatch[2].trim();
      const transBase = translateText(base, targetLang);
      if (transBase && transBase !== base) {
        return prefix + transBase;
      }
    }

    // 6. Parenthetical phrases: "(Optional)" -> "(ऐच्छिक)"
    const parenMatch = trimmed.match(/^\((.*?)\)$/);
    if (parenMatch) {
      const inner = parenMatch[1].trim();
      const transInner = translateText(inner, targetLang);
      if (transInner && transInner !== inner) {
        return `(${transInner})`;
      }
    }

    return trimmed;
  }

  let isApplying = false;

  function applyTranslations(lang) {
    if (isApplying) return;
    isApplying = true;

    try {
      // 1. Translate Page Title
      if (document.title) {
        if (!document._kumbhOrigTitle) {
          document._kumbhOrigTitle = document.title;
        }
        const translatedTitle = translateText(document._kumbhOrigTitle, lang);
        if (translatedTitle) document.title = translatedTitle;
      }

      // 2. Translate explicit data-i18n elements
      const elements = document.querySelectorAll('[data-i18n]');
      elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (key && TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
          el.textContent = TRANSLATIONS[key][lang];
        }
      });

      // 3. Translate all standard input & textarea placeholders
      const inputs = document.querySelectorAll('input[placeholder], textarea[placeholder]');
      inputs.forEach(el => {
        if (typeof el._kumbhOrigPlaceholder !== 'string') {
          el._kumbhOrigPlaceholder = el.getAttribute('placeholder') || '';
        }
        const orig = el._kumbhOrigPlaceholder;
        if (!orig) return;
        if (lang === 'en') {
          el.setAttribute('placeholder', orig);
        } else {
          const trans = translateText(orig, lang);
          if (trans) el.setAttribute('placeholder', trans);
        }
      });

      // 4. Translate select options
      const options = document.querySelectorAll('select option');
      options.forEach(opt => {
        if (typeof opt._kumbhOrigText !== 'string') {
          opt._kumbhOrigText = opt.text.trim();
        }
        const orig = opt._kumbhOrigText;
        if (!orig) return;
        if (lang === 'en') {
          opt.text = orig;
        } else {
          const trans = translateText(orig, lang);
          if (trans) opt.text = trans;
        }
      });

      // 5. Scan & translate all standard text nodes using TreeWalker
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: function (node) {
            if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            const parentTag = parent.tagName.toLowerCase();
            if (['script', 'style', 'noscript', 'textarea', 'code', 'pre'].includes(parentTag)) {
              return NodeFilter.FILTER_REJECT;
            }
            // Skip icons, language modal, and segmented language buttons on index page
            if (parent.closest('.material-symbols-outlined, .material-icons, .material-symbols-rounded, #kumbh-lang-modal, #lang-switch-group, svg')) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );

      const nodesToUpdate = [];
      while (walker.nextNode()) {
        nodesToUpdate.push(walker.currentNode);
      }

      nodesToUpdate.forEach(node => {
        const currentVal = node.nodeValue.trim();
        if (!currentVal) return;

        // Initialize canonical original source
        if (typeof node._kumbhOrig !== 'string') {
          let canonical = currentVal;
          for (const key in TRANSLATIONS) {
            const entry = TRANSLATIONS[key];
            if (entry.mr === currentVal || entry.hi === currentVal) {
              canonical = entry.en || key;
              break;
            }
          }
          node._kumbhOrig = canonical;
        }

        const orig = node._kumbhOrig;
        let targetText = orig;

        if (lang === 'en') {
          targetText = orig;
        } else {
          targetText = translateText(orig, lang);
        }

        if (targetText && targetText !== currentVal) {
          const leading = node.nodeValue.match(/^\s*/)[0] || '';
          const trailing = node.nodeValue.match(/\s*$/)[0] || '';
          node.nodeValue = leading + targetText + trailing;
        }
      });
    } finally {
      isApplying = false;
    }
  }

  function updateLanguageUIElements(lang) {
    // 1. Segmented switcher on index.html
    const segmentButtons = document.querySelectorAll('.lang-btn');
    segmentButtons.forEach(btn => {
      const onclickAttr = btn.getAttribute('onclick') || '';
      const isCurrent = (onclickAttr.includes(`'${lang}'`) || onclickAttr.includes(`"${lang}"`));
      if (isCurrent) {
        btn.classList.add('bg-surface-container-lowest', 'text-primary', 'shadow-sm');
        btn.classList.remove('text-on-surface-variant');
      } else {
        btn.classList.remove('bg-surface-container-lowest', 'text-primary', 'shadow-sm');
        btn.classList.add('text-on-surface-variant');
      }
    });

    // 2. Header language dropdown / pill button on inner pages
    const headerButtons = document.querySelectorAll('header button, [aria-label*="Language" i], [aria-label*="language" i], .lang-dropdown-trigger');
    const langLabels = { en: 'English', mr: 'मराठी', hi: 'हिंदी' };

    headerButtons.forEach(btn => {
      // Skip segmented buttons
      if (btn.classList.contains('lang-btn') || btn.closest('#lang-switch-group')) return;
      const textSpan = btn.querySelector('span:not(.material-symbols-outlined):not(.material-icons)');
      if (textSpan) {
        textSpan.textContent = langLabels[lang] || 'English';
      }
    });

    // 3. Floating language pill if active
    const floatText = document.querySelector('#kumbh-floating-lang-btn .kumbh-float-lang-text');
    if (floatText) {
      floatText.textContent = langLabels[lang] || 'English';
    }
  }

  // Language Switcher Modal
  function createLanguageModal() {
    if (document.getElementById('kumbh-lang-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'kumbh-lang-modal';
    modal.className = 'fixed inset-0 bg-black/70 backdrop-blur-md z-[999999] hidden items-center justify-center p-4 transition-opacity duration-200 opacity-0';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 999999;';
    modal.innerHTML = `
      <div class="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-outline-variant/30 transform scale-95 transition-transform duration-200" id="kumbh-lang-modal-content" style="background-color: #ffffff; color: #1b1b20;">
        <div class="flex items-center justify-between pb-4 border-b border-surface-container-high mb-4">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[24px]">translate</span>
            <h3 class="font-headline-sm text-on-surface font-bold text-lg">Select Language / भाषा निवडा</h3>
          </div>
          <button type="button" class="text-on-surface-variant hover:text-on-surface p-1 rounded-full cursor-pointer" onclick="window.KumbhI18n.closeModal()">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        
        <div class="flex flex-col gap-2.5">
          <button type="button" onclick="window.KumbhI18n.setLanguage('en')" class="lang-modal-opt flex items-center justify-between p-3.5 rounded-xl border border-surface-container-high hover:border-primary hover:bg-surface-container-low transition-all cursor-pointer" data-lang="en">
            <div class="flex items-center gap-3">
              <span class="text-2xl">🇬🇧</span>
              <div class="text-left">
                <div class="font-bold text-on-surface text-base">English</div>
                <div class="text-xs text-on-surface-variant">Default Global</div>
              </div>
            </div>
            <span class="check-icon material-symbols-outlined text-primary opacity-0 text-[20px]">check_circle</span>
          </button>

          <button type="button" onclick="window.KumbhI18n.setLanguage('mr')" class="lang-modal-opt flex items-center justify-between p-3.5 rounded-xl border border-surface-container-high hover:border-primary hover:bg-surface-container-low transition-all cursor-pointer" data-lang="mr">
            <div class="flex items-center gap-3">
              <span class="text-2xl">🇮🇳</span>
              <div class="text-left">
                <div class="font-bold text-on-surface text-base">मराठी (Marathi)</div>
                <div class="text-xs text-on-surface-variant">स्थानिक भाषा / Regional</div>
              </div>
            </div>
            <span class="check-icon material-symbols-outlined text-primary opacity-0 text-[20px]">check_circle</span>
          </button>

          <button type="button" onclick="window.KumbhI18n.setLanguage('hi')" class="lang-modal-opt flex items-center justify-between p-3.5 rounded-xl border border-surface-container-high hover:border-primary hover:bg-surface-container-low transition-all cursor-pointer" data-lang="hi">
            <div class="flex items-center gap-3">
              <span class="text-2xl">🇮🇳</span>
              <div class="text-left">
                <div class="font-bold text-on-surface text-base">हिंदी (Hindi)</div>
                <div class="text-xs text-on-surface-variant">राष्ट्रीय भाषा / National</div>
              </div>
            </div>
            <span class="check-icon material-symbols-outlined text-primary opacity-0 text-[20px]">check_circle</span>
          </button>
        </div>

        <div class="mt-5 pt-3 text-center border-t border-surface-container-high">
          <p class="text-xs text-on-surface-variant">कुंभसेतु • Simhastha Kumbh Mela 2027</p>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        window.KumbhI18n.closeModal();
      }
    });
  }

  function openLanguageModal() {
    createLanguageModal();
    const modal = document.getElementById('kumbh-lang-modal');
    const content = document.getElementById('kumbh-lang-modal-content');
    if (!modal) return;
    const currentLang = getSavedLang();

    const options = modal.querySelectorAll('.lang-modal-opt');
    options.forEach(opt => {
      const optLang = opt.getAttribute('data-lang');
      const check = opt.querySelector('.check-icon');
      if (optLang === currentLang) {
        opt.classList.add('border-primary', 'bg-primary/5');
        if (check) check.classList.remove('opacity-0');
      } else {
        opt.classList.remove('border-primary', 'bg-primary/5');
        if (check) check.classList.add('opacity-0');
      }
    });

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      if (content) {
        content.classList.remove('scale-95');
        content.classList.add('scale-100');
      }
    }, 10);
  }

  function closeLanguageModal() {
    const modal = document.getElementById('kumbh-lang-modal');
    const content = document.getElementById('kumbh-lang-modal-content');
    if (!modal) return;

    modal.classList.add('opacity-0');
    if (content) {
      content.classList.remove('scale-100');
      content.classList.add('scale-95');
    }
    setTimeout(() => {
      modal.classList.remove('flex');
      modal.classList.add('hidden');
    }, 200);
  }

  function cycleLanguage() {
    const current = getSavedLang();
    const next = current === 'en' ? 'mr' : (current === 'mr' ? 'hi' : 'en');
    window.KumbhI18n.setLanguage(next);
  }

  function isLangButton(el) {
    if (!el) return false;
    // Don't intercept clicks inside the modal itself
    if (el.closest('#kumbh-lang-modal')) return false;

    // Don't intercept clicks on segmented index.html buttons
    if (el.closest('#lang-switch-group') || el.classList.contains('lang-btn')) {
      return false;
    }

    const btn = el.closest('button, a, .lang-dropdown-trigger, [aria-label*="Language" i], [aria-label*="language" i], [aria-label*="Translate" i]');
    if (!btn) return false;

    const ariaLabel = (btn.getAttribute('aria-label') || '').toLowerCase();
    if (ariaLabel.includes('language') || ariaLabel.includes('lang') || ariaLabel.includes('translate')) {
      return true;
    }

    const html = btn.innerHTML || '';
    const txt = (btn.textContent || '').trim();
    if (html.includes('translate') || txt.includes('मरा') || txt.includes('हिंदी') || txt.includes('English') || txt.includes('मराठी')) {
      return true;
    }
    return false;
  }

  // Global document click delegation for 100% reliable click response on any language button
  document.addEventListener('click', function (e) {
    const target = e.target;
    if (isLangButton(target)) {
      e.preventDefault();
      e.stopPropagation();
      openLanguageModal();
    }
  }, true);

  // Auto-mount language trigger button if missing on page
  function ensureLanguageButtonOnPage() {
    // If index page segmented switcher exists, no need for extra button
    if (document.getElementById('lang-switch-group')) return;

    const existingBtn = document.querySelector('[aria-label*="Language" i], [aria-label*="language" i], .lang-dropdown-trigger, header button .material-symbols-outlined');
    const header = document.querySelector('header');

    if (header) {
      const headerRight = header.querySelector('.flex.items-center:last-child');
      if (headerRight && !headerRight.querySelector('[aria-label*="Language" i], .lang-dropdown-trigger')) {
        // Check if there's already a button containing 'translate'
        let hasTranslate = false;
        headerRight.querySelectorAll('button').forEach(b => {
          if (b.innerHTML.includes('translate') || b.textContent.includes('मरा') || b.textContent.includes('English')) hasTranslate = true;
        });
        if (!hasTranslate) {
          const langPill = document.createElement('button');
          langPill.type = 'button';
          langPill.setAttribute('aria-label', 'Toggle Language');
          langPill.className = 'lang-dropdown-trigger h-9 px-space-xs rounded-full bg-surface-container-high flex items-center gap-space-2xs text-on-surface font-label-sm text-label-sm cursor-pointer hover:bg-surface-container';
          langPill.innerHTML = `
            <span class="material-symbols-outlined text-primary text-[16px]">translate</span>
            <span>${getSavedLang() === 'mr' ? 'मराठी' : (getSavedLang() === 'hi' ? 'हिंदी' : 'English')}</span>
            <span class="material-symbols-outlined text-outline text-[16px]">expand_more</span>
          `;
          headerRight.insertBefore(langPill, headerRight.firstChild);
        }
      }
    } else {
      // If page has NO header (e.g. login pages), inject floating top-right pill
      if (!document.getElementById('kumbh-floating-lang-btn')) {
        const floatContainer = document.createElement('div');
        floatContainer.id = 'kumbh-floating-lang-btn';
        floatContainer.className = 'fixed top-3 right-3 z-50';
        floatContainer.innerHTML = `
          <button type="button" aria-label="Toggle Language" class="lang-dropdown-trigger flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high/95 backdrop-blur-md text-on-surface shadow-md border border-outline-variant/30 text-xs font-semibold hover:bg-surface-container cursor-pointer transition-all">
            <span class="material-symbols-outlined text-primary text-[16px]">translate</span>
            <span class="kumbh-float-lang-text">${getSavedLang() === 'mr' ? 'मराठी' : (getSavedLang() === 'hi' ? 'हिंदी' : 'English')}</span>
          </button>
        `;
        document.body.appendChild(floatContainer);
      }
    }
  }

  // Seamless MutationObserver for Dynamic Content (cards, tables, modals rendered via async fetch)
  let mutationTimeout = null;
  const domObserver = new MutationObserver(function (mutations) {
    const currentLang = getSavedLang();
    if (currentLang === 'en') return;

    let hasAddedNodes = false;
    for (let i = 0; i < mutations.length; i++) {
      const m = mutations[i];
      if (m.target && (m.target.id === 'kumbh-lang-modal' || m.target.closest?.('#kumbh-lang-modal') || m.target.closest?.('#lang-switch-group'))) {
        continue;
      }
      if (m.addedNodes.length > 0) {
        hasAddedNodes = true;
        break;
      }
    }

    if (hasAddedNodes) {
      clearTimeout(mutationTimeout);
      mutationTimeout = setTimeout(function () {
        domObserver.disconnect();
        applyTranslations(currentLang);
        domObserver.observe(document.body, { childList: true, subtree: true });
      }, 50);
    }
  });

  // Global window API
  window.KumbhI18n = {
    setLanguage: function (lang) {
      saveLang(lang);
      closeLanguageModal();
    },
    getLanguage: getSavedLang,
    openModal: openLanguageModal,
    closeModal: closeLanguageModal,
    cycleLanguage: cycleLanguage,
    translate: translateText,
    apply: function () {
      const current = getSavedLang();
      applyTranslations(current);
      updateLanguageUIElements(current);
    }
  };

  // Global helpers
  window.toggleLanguage = openLanguageModal;
  window.toggleLanguageModal = openLanguageModal;
  window.openLanguageModal = openLanguageModal;
  window.cycleLanguage = cycleLanguage;
  window.setLang = function (btn, langCode) {
    window.KumbhI18n.setLanguage(langCode);
  };
  window.switchLang = function (langCode) {
    window.KumbhI18n.setLanguage(langCode);
  };

  // Initialize
  function init() {
    createLanguageModal();
    ensureLanguageButtonOnPage();
    const currentLang = getSavedLang();
    document.documentElement.lang = currentLang;
    applyTranslations(currentLang);
    updateLanguageUIElements(currentLang);

    // Start observing DOM changes for dynamic content
    try {
      domObserver.observe(document.body, { childList: true, subtree: true });
    } catch (e) {
      console.warn('MutationObserver not attached:', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

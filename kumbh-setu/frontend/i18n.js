/**
 * KumbhSetu (कुंभसेतु) — Complete Trilingual Translation Engine
 * Official Languages: English (en), Marathi (mr / मराठी), Hindi (hi / हिंदी)
 * Covers all 23 screens with 1689+ verified entries and dynamic pattern matching.
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
    "mr": "बाजार",
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
    "mr": "सर्वसमावेशक आढावा",
    "hi": "अवलोकन",
    "en": "Overview"
  },
  "Vendors": {
    "mr": "विक्रेते",
    "hi": "विक्रेता",
    "en": "Vendors"
  },
  "Bookings": {
    "mr": "नोंदणी",
    "hi": "बुकिंग",
    "en": "Bookings"
  },
  "Reports": {
    "mr": "तक्रारी व अहवाल",
    "hi": "रिपोर्ट्स",
    "en": "Reports"
  },
  "Escalations": {
    "mr": "तातडीच्या तक्रारी (Escalations)",
    "hi": "त्वरित मामले (Escalations)",
    "en": "Escalations"
  },
  "Case Detail": {
    "mr": "प्रकरणाचा तपशील",
    "hi": "केस का विवरण",
    "en": "Case Detail"
  },
  "Case Log": {
    "mr": "नोंदवलेले खटले",
    "hi": "केस रजिस्टर",
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
    "mr": "+ नवीन विक्रेता नोंदणी",
    "hi": "+ नया विक्रेता पंजीकरण",
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
  "Fares": {
    "mr": "दर फलक",
    "hi": "किराया",
    "en": "Fares"
  },
  "Set Pickup": {
    "mr": "सुरुवात निवडा",
    "hi": "पिकअप चुनें",
    "en": "Set Pickup"
  },
  "Set Destination": {
    "mr": "गंतव्य निवडा",
    "hi": "गंतव्य चुनें",
    "en": "Set Destination"
  },
  "My Location": {
    "mr": "माझे स्थान",
    "hi": "मेरा स्थान",
    "en": "My Location"
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
    "mr": "स्वच्छता / आरोग्य",
    "hi": "स्वच्छता / स्वास्थ्य",
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
    "hi": "सुलझाया गया",
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
  },
  "\"Action Required: Upload approved rate card signed by auto rickshaw union secretary before permit dispatch.\"": {
    "mr": "\"कृती Required: अपलोड करा approved दर card signed by रिक्षा रिक्षा union secretary before permit dispatch.\"",
    "hi": "\"कार्रवाई Required: अपलोड करें approved दर card signed by ऑटो रिक्शा union secretary before permit dispatch.\"",
    "en": "\"Action Required: Upload approved rate card signed by auto rickshaw union secretary before permit dispatch.\""
  },
  "\"Authentic pure copper kalash. Tested it with Ganga-jal and water at the ghat, pure hammered copper. Highly recommended.\"": {
    "mr": "\"Authentic pure तांबे कळश. Tested it with Ganga-jal and पाणी at the घाट, pure hammered तांबे. Highly recommended.\"",
    "hi": "\"Authentic pure तांबा कलश. Tested it with Ganga-jal and जल / पानी at the घाट, pure hammered तांबा. Highly recommended.\"",
    "en": "\"Authentic pure copper kalash. Tested it with Ganga-jal and water at the ghat, pure hammered copper. Highly recommended.\""
  },
  "\"Fixed fair price with zero bargaining hassle. Very polite uncle and gave genuine guidance on the Godavari Aarti timings.\"": {
    "mr": "\"Fixed वाजवी दर with शून्य bargaining hassle. Very polite uncle and gave genuine guidance on the गोदावरी आरती timings.\"",
    "hi": "\"Fixed उचित मूल्य with शून्य bargaining hassle. Very polite uncle and gave genuine guidance on the गोदावरी आरती timings.\"",
    "en": "\"Fixed fair price with zero bargaining hassle. Very polite uncle and gave genuine guidance on the Godavari Aarti timings.\""
  },
  "\"Namaskar Kulkarni ji, do you have large 7-wick aarti diyas available for tomorrow morning's Godavari snan?\"": {
    "mr": "\"Namaskar Kulkarni ji, do you have large 7-wick आरती दिवे available for tomorrow सकाळ's गोदावरी स्नान?\"",
    "hi": "\"Namaskar Kulkarni ji, do you have large 7-wick आरती दीये available for tomorrow सुबह's गोदावरी स्नान?\"",
    "en": "\"Namaskar Kulkarni ji, do you have large 7-wick aarti diyas available for tomorrow morning's Godavari snan?\""
  },
  "\"Very honest vendor at Ramkund main ghat. Charged ₹210 for brass diya, completely within the estimated fair range. High quality finish and packed nicely for our train journey.\"": {
    "mr": "\"Very honest विक्रेता at रामकुंड main घाट. Charged ₹210 for पितळ दिवा, completely within the अंदाजित वाजवी range. उच्च / तीव्र quality finish and packed nicely for our train journey.\"",
    "hi": "\"Very honest विक्रेता at रामकुंड main घाट. Charged ₹210 for पीतल दीया, completely within the अनुमानित उचित range. उच्च / तीव्र quality finish and packed nicely for our train journey.\"",
    "en": "\"Very honest vendor at Ramkund main ghat. Charged ₹210 for brass diya, completely within the estimated fair range. High quality finish and packed nicely for our train journey.\""
  },
  "#FTC-2027-RAMKUND-14": {
    "mr": "#FTC-2027-RAMKUND-14",
    "hi": "#FTC-2027-RAMKUND-14",
    "en": "#FTC-2027-RAMKUND-14"
  },
  "#KS-27-8910": {
    "mr": "#KS-27-8910",
    "hi": "#KS-27-8910",
    "en": "#KS-27-8910"
  },
  "#NMC-STALL-1049": {
    "mr": "#NMC-STALL-1049",
    "hi": "#NMC-STALL-1049",
    "en": "#NMC-STALL-1049"
  },
  "#NSK-AUTO-012": {
    "mr": "#NSK-AUTO-012",
    "hi": "#NSK-AUTO-012",
    "en": "#NSK-AUTO-012"
  },
  "#NSK-BZ-014": {
    "mr": "#NSK-BZ-014",
    "hi": "#NSK-BZ-014",
    "en": "#NSK-BZ-014"
  },
  "#NSK-FOOD-112": {
    "mr": "#NSK-FOOD-112",
    "hi": "#NSK-FOOD-112",
    "en": "#NSK-FOOD-112"
  },
  "#NSK-GD-089": {
    "mr": "#NSK-GD-089",
    "hi": "#NSK-GD-089",
    "en": "#NSK-GD-089"
  },
  "#NSK-GH-409": {
    "mr": "#NSK-GH-409",
    "hi": "#NSK-GH-409",
    "en": "#NSK-GH-409"
  },
  "#ORD-8472": {
    "mr": "#ORD-8472",
    "hi": "#ORD-8472",
    "en": "#ORD-8472"
  },
  "#ORD-8491": {
    "mr": "#ORD-8491",
    "hi": "#ORD-8491",
    "en": "#ORD-8491"
  },
  "#POL-NSK-2027-0482": {
    "mr": "#POL-NSK-2027-0482",
    "hi": "#POL-NSK-2027-0482",
    "en": "#POL-NSK-2027-0482"
  },
  "(1,042 reviews)": {
    "mr": "(1,042 पुनरावलोकने)",
    "hi": "(1,042 समीक्षाएं)",
    "en": "(1,042 reviews)"
  },
  "(128 reviews)": {
    "mr": "(128 पुनरावलोकने)",
    "hi": "(128 समीक्षाएं)",
    "en": "(128 reviews)"
  },
  "(128-d Vector extracted)": {
    "mr": "(128-d Vector extracted)",
    "hi": "(128-d Vector extracted)",
    "en": "(128-d Vector extracted)"
  },
  "(148 reviews)": {
    "mr": "(148 पुनरावलोकने)",
    "hi": "(148 समीक्षाएं)",
    "en": "(148 reviews)"
  },
  "(184 tours)": {
    "mr": "(184 दौरे)",
    "hi": "(184 टूर)",
    "en": "(184 tours)"
  },
  "(3 pax)": {
    "mr": "(3 प्रवासी)",
    "hi": "(3 यात्री)",
    "en": "(3 pax)"
  },
  "(318 reviews)": {
    "mr": "(318 पुनरावलोकने)",
    "hi": "(318 समीक्षाएं)",
    "en": "(318 reviews)"
  },
  "(7 min walk)": {
    "mr": "(7 मिनिटे चालत)",
    "hi": "(7 मिनट पैदल)",
    "en": "(7 min walk)"
  },
  "(Ahmedabad, Gujarat)": {
    "mr": "(Ahmedabad, Gujarat)",
    "hi": "(Ahmedabad, Gujarat)",
    "en": "(Ahmedabad, Gujarat)"
  },
  "(Chennai)": {
    "mr": "(Chennai)",
    "hi": "(Chennai)",
    "en": "(Chennai)"
  },
  "(Chennai, TN)": {
    "mr": "(Chennai, TN)",
    "hi": "(Chennai, TN)",
    "en": "(Chennai, TN)"
  },
  "(Jaipur, Rajasthan)": {
    "mr": "(Jaipur, Rajasthan)",
    "hi": "(Jaipur, Rajasthan)",
    "en": "(Jaipur, Rajasthan)"
  },
  "(K.T.H.M. College)": {
    "mr": "(K.T.H.M. College)",
    "hi": "(K.T.H.M. College)",
    "en": "(K.T.H.M. College)"
  },
  "(Lucknow, UP)": {
    "mr": "(Lucknow, UP)",
    "hi": "(Lucknow, UP)",
    "en": "(Lucknow, UP)"
  },
  "(Nagpur)": {
    "mr": "(Nagpur)",
    "hi": "(Nagpur)",
    "en": "(Nagpur)"
  },
  "(New Delhi)": {
    "mr": "(New Delhi)",
    "hi": "(New Delhi)",
    "en": "(New Delhi)"
  },
  "(Optional)": {
    "mr": "(Optional)",
    "hi": "(Optional)",
    "en": "(Optional)"
  },
  "(Panchavati Resident)": {
    "mr": "(पंचवटी Resident)",
    "hi": "(पंचवटी Resident)",
    "en": "(Panchavati Resident)"
  },
  "(Pune)": {
    "mr": "(Pune)",
    "hi": "(Pune)",
    "en": "(Pune)"
  },
  "(Route: Panchavati Ghat to CBS Central).": {
    "mr": "(मार्ग: पंचवटी घाट to सीबीएस Central).",
    "hi": "(मार्ग: पंचवटी घाट to सीबीएस Central).",
    "en": "(Route: Panchavati Ghat to CBS Central)."
  },
  "(Surat)": {
    "mr": "(Surat)",
    "hi": "(Surat)",
    "en": "(Surat)"
  },
  "+4.1% vs last cycle": {
    "mr": "+4.1% मागील चक्राच्या तुलनेत",
    "hi": "+4.1% पिछले चक्र की तुलना में",
    "en": "+4.1% vs last cycle"
  },
  "+63.6% Overcharge": {
    "mr": "+63.6% जादा आकारणी",
    "hi": "+63.6% अतिरिक्त वसूली",
    "en": "+63.6% Overcharge"
  },
  "+91 98210 44192 • Yatri Transit Pass #7721": {
    "mr": "+91 98210 44192 • भाविक वाहतूक Pass #7721",
    "hi": "+91 98210 44192 • तीर्थयात्री परिवहन Pass #7721",
    "en": "+91 98210 44192 • Yatri Transit Pass #7721"
  },
  "+₹600 (+67% over benchmark)": {
    "mr": "+₹600 (+67% over प्रमाणक)",
    "hi": "+₹600 (+67% over मानक)",
    "en": "+₹600 (+67% over benchmark)"
  },
  "+₹70 Overcharge": {
    "mr": "+₹70 जादा दर",
    "hi": "+₹70 अत्यधिक किराया",
    "en": "+₹70 Overcharge"
  },
  ", portal listed": {
    "mr": ", portal listed",
    "hi": ", portal listed",
    "en": ", portal listed"
  },
  ". Missing driver union rate card endorsement for corridor pass.": {
    "mr": ". Missing driver union दर card endorsement for corridor pass.",
    "hi": ". Missing driver union दर card endorsement for corridor pass.",
    "en": ". Missing driver union rate card endorsement for corridor pass."
  },
  "/ 2 hours tour": {
    "mr": "/ 2 तास tour",
    "hi": "/ 2 घंटे tour",
    "en": "/ 2 hours tour"
  },
  "/ 26 Raised": {
    "mr": "/ 26 Raised",
    "hi": "/ 26 Raised",
    "en": "/ 26 Raised"
  },
  "/ day statutory cap": {
    "mr": "/ दिवस statutory मर्यादा",
    "hi": "/ दिन statutory सीमा",
    "en": "/ day statutory cap"
  },
  "/ full half-day tour": {
    "mr": "/ full half-दिवस tour",
    "hi": "/ full half-दिन tour",
    "en": "/ full half-day tour"
  },
  "/ group total (fair indicative locked)": {
    "mr": "/ group total (वाजवी indicative locked)",
    "hi": "/ group total (उचित indicative locked)",
    "en": "/ group total (fair indicative locked)"
  },
  "/ hour (Pre-Paid Fixed Tariff)": {
    "mr": "/ hour (Pre-Paid Fixed दरपत्रक)",
    "hi": "/ hour (Pre-Paid Fixed दर सूची)",
    "en": "/ hour (Pre-Paid Fixed Tariff)"
  },
  "/ night": {
    "mr": "/ रात्र",
    "hi": "/ रात",
    "en": "/ night"
  },
  "/ ritual set": {
    "mr": "/ ritual set",
    "hi": "/ ritual set",
    "en": "/ ritual set"
  },
  "/ satvik thali": {
    "mr": "/ सात्त्विक थाळी",
    "hi": "/ सात्विक थाली",
    "en": "/ satvik thali"
  },
  "/nt": {
    "mr": "/nt",
    "hi": "/nt",
    "en": "/nt"
  },
  "0 Flags": {
    "mr": "0 इशारे",
    "hi": "0 चेतावनी",
    "en": "0 Flags"
  },
  "08:00 AM – 08:00 PM": {
    "mr": "08:00 AM – 08:00 PM",
    "hi": "08:00 AM – 08:00 PM",
    "en": "08:00 AM – 08:00 PM"
  },
  "1,280 / 1,520 Verified": {
    "mr": "1,280 / 1,520 प्रमाणित",
    "hi": "1,280 / 1,520 सत्यापित",
    "en": "1,280 / 1,520 Verified"
  },
  "1. New": {
    "mr": "1. New",
    "hi": "1. New",
    "en": "1. New"
  },
  "1.2 km away • Ramkund Northern Ghat": {
    "mr": "1.2 किमी अंतरावर • रामकुंड Northern घाट",
    "hi": "1.2 किमी दूर • रामकुंड Northern घाट",
    "en": "1.2 km away • Ramkund Northern Ghat"
  },
  "1.2 km from Kushavarta Ghat": {
    "mr": "1.2 km from कुशावर्त घाट",
    "hi": "1.2 km from कुशावर्त घाट",
    "en": "1.2 km from Kushavarta Ghat"
  },
  "100% Compliant": {
    "mr": "100% नियमानुसार",
    "hi": "100% नियमानुकूल",
    "en": "100% Compliant"
  },
  "100% Digital Auditable": {
    "mr": "100% Digital Auditable",
    "hi": "100% Digital Auditable",
    "en": "100% Digital Auditable"
  },
  "100% Fixed Dakshina display": {
    "mr": "100% Fixed Dakshina display",
    "hi": "100% Fixed Dakshina display",
    "en": "100% Fixed Dakshina display"
  },
  "120m away": {
    "mr": "120 मी अंतरावर",
    "hi": "120 मी दूर",
    "en": "120m away"
  },
  "12m ago": {
    "mr": "12 मिनिटांपूर्वी",
    "hi": "12 मिनट पहले",
    "en": "12m ago"
  },
  "14 Active": {
    "mr": "14 सक्रिय",
    "hi": "14 सक्रिय",
    "en": "14 Active"
  },
  "14 Active Volunteers": {
    "mr": "14 सक्रिय स्वयंसेवक",
    "hi": "14 सक्रिय स्वयंसेवक",
    "en": "14 Active Volunteers"
  },
  "14 Feb 2027": {
    "mr": "14 Feb 2027",
    "hi": "14 Feb 2027",
    "en": "14 Feb 2027"
  },
  "14:15 IST • Escalation": {
    "mr": "14:15 IST • Escalation",
    "hi": "14:15 IST • Escalation",
    "en": "14:15 IST • Escalation"
  },
  "14:22 IST • Patrol Dispatch": {
    "mr": "14:22 IST • गस्त पथक Dispatch",
    "hi": "14:22 IST • गश्ती दल Dispatch",
    "en": "14:22 IST • Patrol Dispatch"
  },
  "14m ago": {
    "mr": "14 मिनिटांपूर्वी",
    "hi": "14 मिनट पहले",
    "en": "14m ago"
  },
  "14–16 Feb '27": {
    "mr": "14–16 Feb '27",
    "hi": "14–16 Feb '27",
    "en": "14–16 Feb '27"
  },
  "150m from Ghat": {
    "mr": "150m from घाट",
    "hi": "150m from घाट",
    "en": "150m from Ghat"
  },
  "15–17 Feb 2027 (2 nights)": {
    "mr": "15–17 Feb 2027 (2 nights)",
    "hi": "15–17 Feb 2027 (2 nights)",
    "en": "15–17 Feb 2027 (2 nights)"
  },
  "17 Clusters": {
    "mr": "17 गट",
    "hi": "17 क्लस्टर",
    "en": "17 Clusters"
  },
  "17 Clusters Live": {
    "mr": "17 गट थेट",
    "hi": "17 क्लस्टर लाइव",
    "en": "17 Clusters Live"
  },
  "18 Feb 2027 • 8:00 AM to 2:00 PM": {
    "mr": "18 Feb 2027 • 8:00 AM to 2:00 PM",
    "hi": "18 Feb 2027 • 8:00 AM to 2:00 PM",
    "en": "18 Feb 2027 • 8:00 AM to 2:00 PM"
  },
  "18 Standard, 4 Dorm": {
    "mr": "18 Standard, 4 डॉर्मिटरी",
    "hi": "18 Standard, 4 डॉर्मिटरी",
    "en": "18 Standard, 4 Dorm"
  },
  "18m ago": {
    "mr": "18 मिनिटांपूर्वी",
    "hi": "18 मिनट पहले",
    "en": "18m ago"
  },
  "19.9975° N, 73.7898° E": {
    "mr": "19.9975° N, 73.7898° E",
    "hi": "19.9975° N, 73.7898° E",
    "en": "19.9975° N, 73.7898° E"
  },
  "19.9982° N, 73.7915° E": {
    "mr": "19.9982° N, 73.7915° E",
    "hi": "19.9982° N, 73.7915° E",
    "en": "19.9982° N, 73.7915° E"
  },
  "1h 10m ago": {
    "mr": "1h 10m ago",
    "hi": "1h 10m ago",
    "en": "1h 10m ago"
  },
  "1x Certified 5-Mukhi Rudraksha Mala": {
    "mr": "1x Certified 5-Mukhi रुद्राक्ष माळ",
    "hi": "1x Certified 5-Mukhi रुद्राक्ष माला",
    "en": "1x Certified 5-Mukhi Rudraksha Mala"
  },
  "2 Guests": {
    "mr": "2 Guests",
    "hi": "2 Guests",
    "en": "2 Guests"
  },
  "2 Nights (Check-in 11:00 AM)": {
    "mr": "2 Nights (Check-in 11:00 AM)",
    "hi": "2 Nights (Check-in 11:00 AM)",
    "en": "2 Nights (Check-in 11:00 AM)"
  },
  "2 Photos": {
    "mr": "2 Photos",
    "hi": "2 Photos",
    "en": "2 Photos"
  },
  "2 Pilgrims": {
    "mr": "2 भाविक",
    "hi": "2 तीर्थयात्री",
    "en": "2 Pilgrims"
  },
  "2 hrs ago": {
    "mr": "2 तासांपूर्वी",
    "hi": "2 घंटे पहले",
    "en": "2 hrs ago"
  },
  "2. Review": {
    "mr": "2. पुनरावलोकन",
    "hi": "2. समीक्षा",
    "en": "2. Review"
  },
  "2.5 hrs": {
    "mr": "2.5 hrs",
    "hi": "2.5 hrs",
    "en": "2.5 hrs"
  },
  "256-BIT ENCRYPTION": {
    "mr": "256-BIT ENCRYPTION",
    "hi": "256-BIT ENCRYPTION",
    "en": "256-BIT ENCRYPTION"
  },
  "25m ago": {
    "mr": "25 मिनिटांपूर्वी",
    "hi": "25 मिनट पहले",
    "en": "25m ago"
  },
  "28 Minutes": {
    "mr": "28 मिनिटे",
    "hi": "28 मिनट",
    "en": "28 Minutes"
  },
  "28.0 km": {
    "mr": "28.0 किमी अंतरावर",
    "hi": "28.0 किमी दूर",
    "en": "28.0 km"
  },
  "2x Hand-Cast Brass Diya, 1x Copper Kalash": {
    "mr": "2x Hand-Cast पितळ दिवा, 1x तांबे कळश",
    "hi": "2x Hand-Cast पीतल दीया, 1x तांबा कलश",
    "en": "2x Hand-Cast Brass Diya, 1x Copper Kalash"
  },
  "3 Actionable": {
    "mr": "3 Actionable",
    "hi": "3 Actionable",
    "en": "3 Actionable"
  },
  "3 Active Orders": {
    "mr": "3 सक्रिय ऑर्डर्स",
    "hi": "3 सक्रिय ऑर्डर",
    "en": "3 Active Orders"
  },
  "3 Reports Sent Onward": {
    "mr": "3 तक्रारी व अहवाल Sent Onward",
    "hi": "3 शिकायतें एवं रिपोर्ट Sent Onward",
    "en": "3 Reports Sent Onward"
  },
  "3 corroborating Yatri digital receipts attached": {
    "mr": "3 corroborating भाविक digital receipts attached",
    "hi": "3 corroborating तीर्थयात्री digital receipts attached",
    "en": "3 corroborating Yatri digital receipts attached"
  },
  "3 verified yatri complaints received in past 30 minutes": {
    "mr": "3 प्रमाणित भाविक complaints received in past 30 मिनिटे",
    "hi": "3 सत्यापित तीर्थयात्री complaints received in past 30 मिनट",
    "en": "3 verified yatri complaints received in past 30 minutes"
  },
  "3. Create Password (पासवर्ड)": {
    "mr": "3. Create पासवर्ड (पासवर्ड)",
    "hi": "3. Create पासवर्ड (पासवर्ड)",
    "en": "3. Create Password (पासवर्ड)"
  },
  "3. Fact-Chk": {
    "mr": "3. Fact-Chk",
    "hi": "3. Fact-Chk",
    "en": "3. Fact-Chk"
  },
  "3.5 km east": {
    "mr": "3.5 km east",
    "hi": "3.5 km east",
    "en": "3.5 km east"
  },
  "300m from Ramkund": {
    "mr": "300m from रामकुंड",
    "hi": "300m from रामकुंड",
    "en": "300m from Ramkund"
  },
  "310 pts": {
    "mr": "310 pts",
    "hi": "310 pts",
    "en": "310 pts"
  },
  "380 pts": {
    "mr": "380 pts",
    "hi": "380 pts",
    "en": "380 pts"
  },
  "3h ago": {
    "mr": "3h ago",
    "hi": "3h ago",
    "en": "3h ago"
  },
  "3m ago": {
    "mr": "3 मिनिटांपूर्वी",
    "hi": "3 मिनट पहले",
    "en": "3m ago"
  },
  "4 Inspected": {
    "mr": "4 Inspected",
    "hi": "4 Inspected",
    "en": "4 Inspected"
  },
  "4 Open Inquiries": {
    "mr": "4 Open Inquiries",
    "hi": "4 Open Inquiries",
    "en": "4 Open Inquiries"
  },
  "4 Pilgrims": {
    "mr": "4 भाविक",
    "hi": "4 तीर्थयात्री",
    "en": "4 Pilgrims"
  },
  "4 under inspection": {
    "mr": "4 under inspection",
    "hi": "4 under inspection",
    "en": "4 under inspection"
  },
  "4. Government Guide Badge / Aadhaar No.": {
    "mr": "4. Government मार्गदर्शक बिल्ला / Aadhaar No.",
    "hi": "4. Government गाइड बैज / Aadhaar No.",
    "en": "4. Government Guide Badge / Aadhaar No."
  },
  "4. Solved": {
    "mr": "4. Solved",
    "hi": "4. Solved",
    "en": "4. Solved"
  },
  "4.8m": {
    "mr": "4.8 मी अंतरावर",
    "hi": "4.8 मी दूर",
    "en": "4.8m"
  },
  "412 GPS-calibrated autos": {
    "mr": "412 GPS-calibrated autos",
    "hi": "412 GPS-calibrated autos",
    "en": "412 GPS-calibrated autos"
  },
  "450 pts": {
    "mr": "450 pts",
    "hi": "450 pts",
    "en": "450 pts"
  },
  "450m away • Panchavati Bazar Lane": {
    "mr": "450 मी अंतरावर • पंचवटी Bazar Lane",
    "hi": "450 मी दूर • पंचवटी Bazar Lane",
    "en": "450m away • Panchavati Bazar Lane"
  },
  "48m ago": {
    "mr": "48 मिनिटांपूर्वी",
    "hi": "48 मिनट पहले",
    "en": "48m ago"
  },
  "4:00 AM - 10:00 AM": {
    "mr": "4:00 AM - 10:00 AM",
    "hi": "4:00 AM - 10:00 AM",
    "en": "4:00 AM - 10:00 AM"
  },
  "5. Languages Spoken & Base Point": {
    "mr": "5. Languages Spoken & Base Point",
    "hi": "5. Languages Spoken & Base Point",
    "en": "5. Languages Spoken & Base Point"
  },
  "6 Family Members": {
    "mr": "6 Family Members",
    "hi": "6 Family Members",
    "en": "6 Family Members"
  },
  "6 Items Listed": {
    "mr": "6 Items Listed",
    "hi": "6 Items Listed",
    "en": "6 Items Listed"
  },
  "6. Personal Face CV Verification (Guide Only)": {
    "mr": "6. Personal Face CV Verification (मार्गदर्शक Only)",
    "hi": "6. Personal Face CV Verification (गाइड Only)",
    "en": "6. Personal Face CV Verification (Guide Only)"
  },
  "6. Profile & Verification Photo Upload": {
    "mr": "6. Profile & Verification Photo अपलोड करा",
    "hi": "6. Profile & Verification Photo अपलोड करें",
    "en": "6. Profile & Verification Photo Upload"
  },
  "7-Day Trend": {
    "mr": "7-दिवस Trend",
    "hi": "7-दिन Trend",
    "en": "7-Day Trend"
  },
  "7.4 km estimated route • Stand #04": {
    "mr": "7.4 km अंदाजित मार्ग • Stand #04",
    "hi": "7.4 km अनुमानित मार्ग • Stand #04",
    "en": "7.4 km estimated route • Stand #04"
  },
  "8 Years Experience": {
    "mr": "8 Years Experience",
    "hi": "8 Years Experience",
    "en": "8 Years Experience"
  },
  "84.6% Resolution Rate": {
    "mr": "84.6% Resolution दर",
    "hi": "84.6% Resolution दर",
    "en": "84.6% Resolution Rate"
  },
  "850 meters from Ramkund Ghat": {
    "mr": "850 meters from रामकुंड घाट",
    "hi": "850 meters from रामकुंड घाट",
    "en": "850 meters from Ramkund Ghat"
  },
  "96.8% positive field feedback": {
    "mr": "96.8% positive field feedback",
    "hi": "96.8% positive field feedback",
    "en": "96.8% positive field feedback"
  },
  "98% Verified Compliance": {
    "mr": "98% प्रमाणित अनुपालन",
    "hi": "98% सत्यापित अनुपालन",
    "en": "98% Verified Compliance"
  },
  "99.8% of pilgrims who scanned your stall QR code verified that they were charged within the agreed fair range.": {
    "mr": "99.8% of भाविक who scanned your स्टॉल QR कोड प्रमाणित that they were charged within the agreed वाजवी range.",
    "hi": "99.8% of तीर्थयात्री who scanned your स्टॉल QR कोड सत्यापित that they were charged within the agreed उचित range.",
    "en": "99.8% of pilgrims who scanned your stall QR code verified that they were charged within the agreed fair range."
  },
  "A certified student": {
    "mr": "A certified विद्यार्थी",
    "hi": "A certified छात्र",
    "en": "A certified student"
  },
  "AI Enforcement Hotspot Radar": {
    "mr": "AI Enforcement गर्दी केंद्र रडार",
    "hi": "AI Enforcement भीड़ केंद्र रडार",
    "en": "AI Enforcement Hotspot Radar"
  },
  "AI Enforcement Hotspots & Live Incident Stream": {
    "mr": "AI Enforcement गर्दी केंद्रे & थेट Incident Stream",
    "hi": "AI Enforcement भीड़ केंद्र & लाइव Incident Stream",
    "en": "AI Enforcement Hotspots & Live Incident Stream"
  },
  "AI Hotspot Radar": {
    "mr": "AI गर्दी केंद्र रडार",
    "hi": "AI भीड़ केंद्र रडार",
    "en": "AI Hotspot Radar"
  },
  "ASI K. Shinde": {
    "mr": "ASI K. Shinde",
    "hi": "ASI K. Shinde",
    "en": "ASI K. Shinde"
  },
  "Above Ramkund": {
    "mr": "Above रामकुंड",
    "hi": "Above रामकुंड",
    "en": "Above Ramkund"
  },
  "Accept Tour": {
    "mr": "Accept Tour",
    "hi": "Accept Tour",
    "en": "Accept Tour"
  },
  "Accepted / Confirmed (": {
    "mr": "Accepted / Confirmed (",
    "hi": "Accepted / Confirmed (",
    "en": "Accepted / Confirmed ("
  },
  "Accepted Tour • Dispatched": {
    "mr": "Accepted Tour • Dispatched",
    "hi": "Accepted Tour • Dispatched",
    "en": "Accepted Tour • Dispatched"
  },
  "Acknowledge": {
    "mr": "Acknowledge",
    "hi": "Acknowledge",
    "en": "Acknowledge"
  },
  "Action Dispatched Successfully": {
    "mr": "कृती Dispatched Successfully",
    "hi": "कार्रवाई Dispatched Successfully",
    "en": "Action Dispatched Successfully"
  },
  "Action Order:": {
    "mr": "कृती ऑर्डर:",
    "hi": "कार्रवाई ऑर्डर:",
    "en": "Action Order:"
  },
  "Action Taken & Refund": {
    "mr": "कृती Taken & Refund",
    "hi": "कार्रवाई Taken & Refund",
    "en": "Action Taken & Refund"
  },
  "Action completed successfully.": {
    "mr": "कृती completed successfully.",
    "hi": "कार्रवाई completed successfully.",
    "en": "Action completed successfully."
  },
  "Action logged:": {
    "mr": "कृती logged:",
    "hi": "कार्रवाई logged:",
    "en": "Action logged:"
  },
  "Active Hotspot: Elevated Pilgrim Volume reported": {
    "mr": "सक्रिय गर्दी केंद्र: Elevated भाविक Volume reported",
    "hi": "सक्रिय भीड़ केंद्र: Elevated तीर्थयात्री Volume reported",
    "en": "Active Hotspot: Elevated Pilgrim Volume reported"
  },
  "Active Price Flags": {
    "mr": "सक्रिय दर इशारे",
    "hi": "सक्रिय मूल्य चेतावनी",
    "en": "Active Price Flags"
  },
  "Active Volunteers": {
    "mr": "सक्रिय स्वयंसेवक",
    "hi": "सक्रिय स्वयंसेवक",
    "en": "Active Volunteers"
  },
  "Active civic watchdog queue for immediate rate enforcement across pilgrim touchpoints.": {
    "mr": "सक्रिय नागरी watchdog queue for immediate दर enforcement across भाविक touchpoints.",
    "hi": "सक्रिय नागरिक watchdog queue for immediate दर enforcement across तीर्थयात्री touchpoints.",
    "en": "Active civic watchdog queue for immediate rate enforcement across pilgrim touchpoints."
  },
  "Add Item": {
    "mr": "Add Item",
    "hi": "Add Item",
    "en": "Add Item"
  },
  "Add Officer Field Observation": {
    "mr": "Add अधिकारी Field Observation",
    "hi": "Add अधिकारी Field Observation",
    "en": "Add Officer Field Observation"
  },
  "Add to My Trip / Offline Saved": {
    "mr": "Add to My Trip / Offline Saved",
    "hi": "Add to My Trip / Offline Saved",
    "en": "Add to My Trip / Offline Saved"
  },
  "Admin Desk": {
    "mr": "प्रशासक कक्ष",
    "hi": "प्रशासक कक्ष",
    "en": "Admin Desk"
  },
  "All (": {
    "mr": "All (",
    "hi": "All (",
    "en": "All ("
  },
  "All Entries": {
    "mr": "All Entries",
    "hi": "All Entries",
    "en": "All Entries"
  },
  "All Flags": {
    "mr": "All इशारे",
    "hi": "All चेतावनी",
    "en": "All Flags"
  },
  "All In Stock": {
    "mr": "All In Stock",
    "hi": "All In Stock",
    "en": "All In Stock"
  },
  "All Priority": {
    "mr": "All Priority",
    "hi": "All Priority",
    "en": "All Priority"
  },
  "Amitabh Verma": {
    "mr": "Amitabh Verma",
    "hi": "Amitabh Verma",
    "en": "Amitabh Verma"
  },
  "Amount:": {
    "mr": "Amount:",
    "hi": "Amount:",
    "en": "Amount:"
  },
  "Anand Joshi (आनंद जोशी)": {
    "mr": "Anand Joshi (आनंद जोशी)",
    "hi": "Anand Joshi (आनंद जोशी)",
    "en": "Anand Joshi (आनंद जोशी)"
  },
  "Anand Keshav Kulkarni": {
    "mr": "Anand Keshav Kulkarni",
    "hi": "Anand Keshav Kulkarni",
    "en": "Anand Keshav Kulkarni"
  },
  "Apex Committee Inspection Alert": {
    "mr": "Apex Committee Inspection दक्षता इशारा",
    "hi": "Apex Committee Inspection अलर्ट",
    "en": "Apex Committee Inspection Alert"
  },
  "Apex Municipal Magistrate Desk": {
    "mr": "Apex महानगरपालिका Magistrate कक्ष",
    "hi": "Apex नगर निगम Magistrate कक्ष",
    "en": "Apex Municipal Magistrate Desk"
  },
  "Applicant:": {
    "mr": "Applicant:",
    "hi": "Applicant:",
    "en": "Applicant:"
  },
  "Arvindbhai Patel": {
    "mr": "Arvindbhai Patel",
    "hi": "Arvindbhai Patel",
    "en": "Arvindbhai Patel"
  },
  "Assign Flying Squad Unit:": {
    "mr": "Assign Flying पथक Unit:",
    "hi": "Assign Flying दस्ता Unit:",
    "en": "Assign Flying Squad Unit:"
  },
  "Assign Kumbhveer": {
    "mr": "Assign कुंभवीर",
    "hi": "Assign कुंभवीर",
    "en": "Assign Kumbhveer"
  },
  "Assign Unit": {
    "mr": "Assign Unit",
    "hi": "Assign Unit",
    "en": "Assign Unit"
  },
  "Assigned Officer": {
    "mr": "Assigned अधिकारी",
    "hi": "Assigned अधिकारी",
    "en": "Assigned Officer"
  },
  "Assigned Post": {
    "mr": "Assigned Post",
    "hi": "Assigned Post",
    "en": "Assigned Post"
  },
  "Assistance Toll Free": {
    "mr": "Assistance Toll Free",
    "hi": "Assistance Toll Free",
    "en": "Assistance Toll Free"
  },
  "Audit Log": {
    "mr": "तपासणी Log",
    "hi": "जांच / ऑडिट Log",
    "en": "Audit Log"
  },
  "Audit Parameters": {
    "mr": "तपासणी Parameters",
    "hi": "जांच / ऑडिट Parameters",
    "en": "Audit Parameters"
  },
  "Audited Feedback": {
    "mr": "तपासणी केली Feedback",
    "hi": "जांच की गई Feedback",
    "en": "Audited Feedback"
  },
  "Audited on-site by Kumbhveer Divya S. (KTHM College)": {
    "mr": "तपासणी केली on-site by कुंभवीर Divya S. (KTHM College)",
    "hi": "जांच की गई on-site by कुंभवीर Divya S. (KTHM College)",
    "en": "Audited on-site by Kumbhveer Divya S. (KTHM College)"
  },
  "Authenticate & Open Field Terminal": {
    "mr": "Authenticate & Open Field टर्मिनल",
    "hi": "Authenticate & Open Field टर्मिनल",
    "en": "Authenticate & Open Field Terminal"
  },
  "Auto Fare Gouging": {
    "mr": "रिक्षा Fare Gouging",
    "hi": "ऑटो Fare Gouging",
    "en": "Auto Fare Gouging"
  },
  "Auto Rides Booked": {
    "mr": "रिक्षा Rides Booked",
    "hi": "ऑटो Rides Booked",
    "en": "Auto Rides Booked"
  },
  "Auto Stand #12": {
    "mr": "रिक्षा Stand #12",
    "hi": "ऑटो Stand #12",
    "en": "Auto Stand #12"
  },
  "Auto, stays & food": {
    "mr": "रिक्षा, मुक्काम & अन्न / भोजन",
    "hi": "ऑटो, आवास & भोजन / अन्न",
    "en": "Auto, stays & food"
  },
  "Auto-fill Demo Credential:": {
    "mr": "रिक्षा-fill Demo Credential:",
    "hi": "ऑटो-fill Demo Credential:",
    "en": "Auto-fill Demo Credential:"
  },
  "Available:": {
    "mr": "Available:",
    "hi": "Available:",
    "en": "Available:"
  },
  "Average response time: 4.8 minutes. Fast tour confirmations boost your verified trust score and ensure pilgrims find their guide safely at the ghats.": {
    "mr": "Average response time: 4.8 मिनिटे. Fast tour confirmations boost your प्रमाणित विश्वास score and ensure भाविक find their मार्गदर्शक safely at the घाट.",
    "hi": "Average response time: 4.8 मिनट. Fast tour confirmations boost your सत्यापित विश्वास score and ensure तीर्थयात्री find their गाइड safely at the घाट.",
    "en": "Average response time: 4.8 minutes. Fast tour confirmations boost your verified trust score and ensure pilgrims find their guide safely at the ghats."
  },
  "Avg Redressal": {
    "mr": "Avg Redressal",
    "hi": "Avg Redressal",
    "en": "Avg Redressal"
  },
  "Badge Certified": {
    "mr": "बिल्ला Certified",
    "hi": "बैज Certified",
    "en": "Badge Certified"
  },
  "Balaji Auto Rickshaw Union • Permit #BK-918": {
    "mr": "Balaji रिक्षा रिक्षा Union • Permit #BK-918",
    "hi": "Balaji ऑटो रिक्शा Union • Permit #BK-918",
    "en": "Balaji Auto Rickshaw Union • Permit #BK-918"
  },
  "Base Meeting Point": {
    "mr": "Base Meeting Point",
    "hi": "Base Meeting Point",
    "en": "Base Meeting Point"
  },
  "Base Meeting Point / Ghat Location *": {
    "mr": "Base Meeting Point / घाट Location *",
    "hi": "Base Meeting Point / घाट Location *",
    "en": "Base Meeting Point / Ghat Location *"
  },
  "Based on 128 verified Yatri visits": {
    "mr": "Based on 128 प्रमाणित भाविक visits",
    "hi": "Based on 128 सत्यापित तीर्थयात्री visits",
    "en": "Based on 128 verified Yatri visits"
  },
  "Based on 3,420 QR Verifications": {
    "mr": "Based on 3,420 QR Verifications",
    "hi": "Based on 3,420 QR Verifications",
    "en": "Based on 3,420 QR Verifications"
  },
  "Bay 4, Ramkund West Gate": {
    "mr": "Bay 4, रामकुंड West प्रवेशद्वार",
    "hi": "Bay 4, रामकुंड West प्रवेश द्वार",
    "en": "Bay 4, Ramkund West Gate"
  },
  "Bazaar & Stalls": {
    "mr": "बाजार & स्टॉल्स",
    "hi": "बाज़ार & स्टॉल",
    "en": "Bazaar & Stalls"
  },
  "Beat Const. Deshmukh": {
    "mr": "Beat Const. Deshmukh",
    "hi": "Beat Const. Deshmukh",
    "en": "Beat Const. Deshmukh"
  },
  "Beat Constable Deshmukh dispatched to Bay 4. Interception in progress.": {
    "mr": "Beat Constable Deshmukh dispatched to Bay 4. Interception in progress.",
    "hi": "Beat Constable Deshmukh dispatched to Bay 4. Interception in progress.",
    "en": "Beat Constable Deshmukh dispatched to Bay 4. Interception in progress."
  },
  "Bengali / English": {
    "mr": "Bengali / English",
    "hi": "Bengali / English",
    "en": "Bengali / English"
  },
  "Bilingual QR Card": {
    "mr": "Bilingual QR Card",
    "hi": "Bilingual QR Card",
    "en": "Bilingual QR Card"
  },
  "Biometric Police ID Pass": {
    "mr": "Biometric पोलीस ओळख क्रमांक Pass",
    "hi": "Biometric पुलिस पहचान संख्या Pass",
    "en": "Biometric Police ID Pass"
  },
  "Bookings Queue": {
    "mr": "नोंदणी Queue",
    "hi": "बुकिंग Queue",
    "en": "Bookings Queue"
  },
  "Bridge is operating normally with 4 pedestrian channels": {
    "mr": "पूल is operating normally with 4 pedestrian channels",
    "hi": "पुल is operating normally with 4 pedestrian channels",
    "en": "Bridge is operating normally with 4 pedestrian channels"
  },
  "Broadcasting GPS coordinates to Ramkund Central Control": {
    "mr": "Broadcasting GPS coordinates to रामकुंड Central Control",
    "hi": "Broadcasting GPS coordinates to रामकुंड Central Control",
    "en": "Broadcasting GPS coordinates to Ramkund Central Control"
  },
  "CCTV Locked Bags": {
    "mr": "CCTV Locked Bags",
    "hi": "CCTV Locked Bags",
    "en": "CCTV Locked Bags"
  },
  "CCTV Pole #C-18 Feed OK": {
    "mr": "CCTV Pole #C-18 Feed OK",
    "hi": "CCTV Pole #C-18 Feed OK",
    "en": "CCTV Pole #C-18 Feed OK"
  },
  "CV v2.4 Active": {
    "mr": "CV v2.4 सक्रिय",
    "hi": "CV v2.4 सक्रिय",
    "en": "CV v2.4 Active"
  },
  "Call": {
    "mr": "Call",
    "hi": "Call",
    "en": "Call"
  },
  "Call Desk": {
    "mr": "Call कक्ष",
    "hi": "Call कक्ष",
    "en": "Call Desk"
  },
  "Call Owner": {
    "mr": "Call Owner",
    "hi": "Call Owner",
    "en": "Call Owner"
  },
  "Call Stand Leader": {
    "mr": "Call Stand Leader",
    "hi": "Call Stand Leader",
    "en": "Call Stand Leader"
  },
  "Call Yatri": {
    "mr": "Call भाविक",
    "hi": "Call तीर्थयात्री",
    "en": "Call Yatri"
  },
  "Camera Verified": {
    "mr": "Camera प्रमाणित",
    "hi": "Camera सत्यापित",
    "en": "Camera Verified"
  },
  "Camp Orientation & Distance": {
    "mr": "Camp Orientation & अंतर",
    "hi": "Camp Orientation & दूरी",
    "en": "Camp Orientation & Distance"
  },
  "Cancel & Stay On Duty": {
    "mr": "रद्द करा & मुक्काम On Duty",
    "hi": "रद्द करें & आवास On Duty",
    "en": "Cancel & Stay On Duty"
  },
  "Cap-compliant tariff bookings": {
    "mr": "मर्यादा-नियमानुसार दरपत्रक नोंदणी",
    "hi": "सीमा-नियमानुकूल दर सूची बुकिंग",
    "en": "Cap-compliant tariff bookings"
  },
  "Capture guide profile and selfie. Selfie is converted into a privacy-preserving numeric vector and raw image is wiped immediately.": {
    "mr": "Capture मार्गदर्शक profile and selfie. Selfie is converted into a privacy-preserving numeric vector and raw image is wiped immediately.",
    "hi": "Capture गाइड profile and selfie. Selfie is converted into a privacy-preserving numeric vector and raw image is wiped immediately.",
    "en": "Capture guide profile and selfie. Selfie is converted into a privacy-preserving numeric vector and raw image is wiped immediately."
  },
  "Captured by Pilgrim Ramesh Patil via QR Scanner": {
    "mr": "Captured by भाविक Ramesh Patil via QR Scanner",
    "hi": "Captured by तीर्थयात्री Ramesh Patil via QR Scanner",
    "en": "Captured by Pilgrim Ramesh Patil via QR Scanner"
  },
  "Carry a physical government photo ID (Aadhaar / Voter Card) during check-in for mandatory police verification.": {
    "mr": "Carry a physical government photo ओळख क्रमांक (Aadhaar / Voter Card) during check-in for mandatory पोलीस verification.",
    "hi": "Carry a physical government photo पहचान संख्या (Aadhaar / Voter Card) during check-in for mandatory पुलिस verification.",
    "en": "Carry a physical government photo ID (Aadhaar / Voter Card) during check-in for mandatory police verification."
  },
  "Case Detail: Illegal Surge Tariff & Driver Defiance": {
    "mr": "Case Detail: Illegal Surge दरपत्रक & Driver Defiance",
    "hi": "Case Detail: Illegal Surge दर सूची & Driver Defiance",
    "en": "Case Detail: Illegal Surge Tariff & Driver Defiance"
  },
  "Case Logs": {
    "mr": "Case Logs",
    "hi": "Case Logs",
    "en": "Case Logs"
  },
  "Case status successfully updated.": {
    "mr": "Case स्थिती successfully updated.",
    "hi": "Case स्थिति successfully updated.",
    "en": "Case status successfully updated."
  },
  "Category Compliance Breakdown": {
    "mr": "Category अनुपालन Breakdown",
    "hi": "Category अनुपालन Breakdown",
    "en": "Category Compliance Breakdown"
  },
  "Caves & Sacred Grove Tour": {
    "mr": "Caves & Sacred Grove Tour",
    "hi": "Caves & Sacred Grove Tour",
    "en": "Caves & Sacred Grove Tour"
  },
  "Certified 5-Mukhi Rudraksha (108 Beads)": {
    "mr": "Certified 5-Mukhi रुद्राक्ष (108 Beads)",
    "hi": "Certified 5-Mukhi रुद्राक्ष (108 Beads)",
    "en": "Certified 5-Mukhi Rudraksha (108 Beads)"
  },
  "Certified for Nashik Collectorate & Municipal Apex Committee review": {
    "mr": "Certified for Nashik Collectorate & महानगरपालिका Apex Committee पुनरावलोकन",
    "hi": "Certified for Nashik Collectorate & नगर निगम Apex Committee समीक्षा",
    "en": "Certified for Nashik Collectorate & Municipal Apex Committee review"
  },
  "Challan Issued": {
    "mr": "Challan Issued",
    "hi": "Challan Issued",
    "en": "Challan Issued"
  },
  "Change": {
    "mr": "Change",
    "hi": "Change",
    "en": "Change"
  },
  "Channel Diverted": {
    "mr": "Channel Diverted",
    "hi": "Channel Diverted",
    "en": "Channel Diverted"
  },
  "Choose image file (PNG, JPG, WEBP)": {
    "mr": "Choose image file (PNG, JPG, WEBP)",
    "hi": "Choose image file (PNG, JPG, WEBP)",
    "en": "Choose image file (PNG, JPG, WEBP)"
  },
  "Civic Dispute Resolution Guarantee": {
    "mr": "नागरी Dispute Resolution Guarantee",
    "hi": "नागरिक Dispute Resolution Guarantee",
    "en": "Civic Dispute Resolution Guarantee"
  },
  "Civic Registered Dharamshala / Guest House": {
    "mr": "नागरी Registered धर्मशाळा / Guest House",
    "hi": "नागरिक Registered धर्मशाला / Guest House",
    "en": "Civic Registered Dharamshala / Guest House"
  },
  "Civic Verified Amenities": {
    "mr": "नागरी प्रमाणित Amenities",
    "hi": "नागरिक सत्यापित Amenities",
    "en": "Civic Verified Amenities"
  },
  "Civic annachatras & bhojanalayas": {
    "mr": "नागरी annachatras & bhojanalayas",
    "hi": "नागरिक annachatras & bhojanalayas",
    "en": "Civic annachatras & bhojanalayas"
  },
  "Claim: \"Lakshman Jhula barricaded due to high Godavari current\"": {
    "mr": "Claim: \"Lakshman Jhula barricaded due to उच्च / तीव्र गोदावरी current\"",
    "hi": "Claim: \"Lakshman Jhula barricaded due to उच्च / तीव्र गोदावरी current\"",
    "en": "Claim: \"Lakshman Jhula barricaded due to high Godavari current\""
  },
  "Click \"Open Camera\" to track personal face and align inside the guide reticle": {
    "mr": "Click \"Open Camera\" to track personal face and align inside the मार्गदर्शक reticle",
    "hi": "Click \"Open Camera\" to track personal face and align inside the गाइड reticle",
    "en": "Click \"Open Camera\" to track personal face and align inside the guide reticle"
  },
  "Click 'Start Camera' or 'Upload Selfie'": {
    "mr": "Click 'Start Camera' or 'अपलोड करा Selfie'",
    "hi": "Click 'Start Camera' or 'अपलोड करें Selfie'",
    "en": "Click 'Start Camera' or 'Upload Selfie'"
  },
  "Click cluster to view details & dispatch": {
    "mr": "Click गट to पहा तपशील & dispatch",
    "hi": "Click क्लस्टर to देखें विवरण & dispatch",
    "en": "Click cluster to view details & dispatch"
  },
  "Click for Direct Navigation to Meeting Point →": {
    "mr": "Click for Direct Navigation to Meeting Point →",
    "hi": "Click for Direct Navigation to Meeting Point →",
    "en": "Click for Direct Navigation to Meeting Point →"
  },
  "Cloakroom": {
    "mr": "Cloakroom",
    "hi": "Cloakroom",
    "en": "Cloakroom"
  },
  "Closed by": {
    "mr": "बंद by",
    "hi": "बंद by",
    "en": "Closed by"
  },
  "Community Benchmark": {
    "mr": "Community प्रमाणक",
    "hi": "Community मानक",
    "en": "Community Benchmark"
  },
  "Community reference price ranges. Indicative rates submitted by daily pilgrim check-ins and verified stands.": {
    "mr": "Community reference दर ranges. Indicative दर submitted by daily भाविक check-ins and प्रमाणित stands.",
    "hi": "Community reference मूल्य ranges. Indicative दरें submitted by daily तीर्थयात्री check-ins and सत्यापित stands.",
    "en": "Community reference price ranges. Indicative rates submitted by daily pilgrim check-ins and verified stands."
  },
  "Complainant Yatri": {
    "mr": "Complainant भाविक",
    "hi": "Complainant तीर्थयात्री",
    "en": "Complainant Yatri"
  },
  "Completed ✓": {
    "mr": "Completed ✓",
    "hi": "Completed ✓",
    "en": "Completed ✓"
  },
  "Computer Vision Personal Face Scanner": {
    "mr": "Computer Vision Personal Face Scanner",
    "hi": "Computer Vision Personal Face Scanner",
    "en": "Computer Vision Personal Face Scanner"
  },
  "Confirm Dispatch": {
    "mr": "Confirm Dispatch",
    "hi": "Confirm Dispatch",
    "en": "Confirm Dispatch"
  },
  "Confirm Sign Out": {
    "mr": "Confirm Sign Out",
    "hi": "Confirm Sign Out",
    "en": "Confirm Sign Out"
  },
  "Confirmed ✓": {
    "mr": "Confirmed ✓",
    "hi": "Confirmed ✓",
    "en": "Confirmed ✓"
  },
  "Continuous background queue listener": {
    "mr": "Continuous background queue listener",
    "hi": "Continuous background queue listener",
    "en": "Continuous background queue listener"
  },
  "Corrected unapproved ₹20 extra packaging charge. Spot check by Inspector G. Kulkarni confirmed menu card update.": {
    "mr": "Corrected unapproved ₹20 extra packaging charge. Spot check by निरीक्षक G. Kulkarni confirmed menu card update.",
    "hi": "Corrected unapproved ₹20 extra packaging charge. Spot check by निरीक्षक G. Kulkarni confirmed menu card update.",
    "en": "Corrected unapproved ₹20 extra packaging charge. Spot check by Inspector G. Kulkarni confirmed menu card update."
  },
  "Create Account & Enter Portal": {
    "mr": "Create Account & Enter Portal",
    "hi": "Create Account & Enter Portal",
    "en": "Create Account & Enter Portal"
  },
  "Critical": {
    "mr": "Critical",
    "hi": "Critical",
    "en": "Critical"
  },
  "Customer Orders (3)": {
    "mr": "Customer ऑर्डर्स (3)",
    "hi": "Customer ऑर्डर (3)",
    "en": "Customer Orders (3)"
  },
  "Customer Pickups & Yatri Inquiries": {
    "mr": "Customer Pickups & भाविक Inquiries",
    "hi": "Customer Pickups & तीर्थयात्री Inquiries",
    "en": "Customer Pickups & Yatri Inquiries"
  },
  "Customer Price Feedback": {
    "mr": "Customer दर Feedback",
    "hi": "Customer मूल्य Feedback",
    "en": "Customer Price Feedback"
  },
  "Cyber Cell DySP R. Gite": {
    "mr": "Cyber कक्ष DySP R. Gite",
    "hi": "Cyber प्रकोष्ठ DySP R. Gite",
    "en": "Cyber Cell DySP R. Gite"
  },
  "Cycle #KMB-27": {
    "mr": "Cycle #KMB-27",
    "hi": "Cycle #KMB-27",
    "en": "Cycle #KMB-27"
  },
  "DBSCAN Spatial Clustering + XGBoost Severity Triage from 100,000 Nashik civic reports.": {
    "mr": "DBSCAN Spatial Clustering + XGBoost Severity Triage from 100,000 Nashik नागरी तक्रारी व अहवाल.",
    "hi": "DBSCAN Spatial Clustering + XGBoost Severity Triage from 100,000 Nashik नागरिक शिकायतें एवं रिपोर्ट.",
    "en": "DBSCAN Spatial Clustering + XGBoost Severity Triage from 100,000 Nashik civic reports."
  },
  "DBSCAN Spatial Hotspot Clusters": {
    "mr": "DBSCAN Spatial गर्दी केंद्र गट",
    "hi": "DBSCAN Spatial भीड़ केंद्र क्लस्टर",
    "en": "DBSCAN Spatial Hotspot Clusters"
  },
  "DBSCAN haversine clustering & XGBoost severity triage streaming live from Nashik admin records.": {
    "mr": "DBSCAN haversine clustering & XGBoost severity triage streaming थेट from Nashik प्रशासक records.",
    "hi": "DBSCAN haversine clustering & XGBoost severity triage streaming लाइव from Nashik प्रशासक records.",
    "en": "DBSCAN haversine clustering & XGBoost severity triage streaming live from Nashik admin records."
  },
  "DBSCAN ε=120m": {
    "mr": "DBSCAN ε=120m",
    "hi": "DBSCAN ε=120m",
    "en": "DBSCAN ε=120m"
  },
  "DHARAMSHALA": {
    "mr": "DHARAMSHALA",
    "hi": "DHARAMSHALA",
    "en": "DHARAMSHALA"
  },
  "Daily Audited": {
    "mr": "Daily तपासणी केली",
    "hi": "Daily जांच की गई",
    "en": "Daily Audited"
  },
  "Daily Booking Volume by Sector": {
    "mr": "Daily नोंदणी Volume by विभाग",
    "hi": "Daily बुकिंग Volume by सेक्टर",
    "en": "Daily Booking Volume by Sector"
  },
  "Dates of Stay": {
    "mr": "Dates of मुक्काम",
    "hi": "Dates of आवास",
    "en": "Dates of Stay"
  },
  "Decline": {
    "mr": "Decline",
    "hi": "Decline",
    "en": "Decline"
  },
  "Declined (": {
    "mr": "Declined (",
    "hi": "Declined (",
    "en": "Declined ("
  },
  "Defiant meter readout": {
    "mr": "Defiant meter readout",
    "hi": "Defiant meter readout",
    "en": "Defiant meter readout"
  },
  "Demanded Fare (Meter)": {
    "mr": "Demanded Fare (Meter)",
    "hi": "Demanded Fare (Meter)",
    "en": "Demanded Fare (Meter)"
  },
  "Demanded Rate": {
    "mr": "Demanded दर",
    "hi": "Demanded दर",
    "en": "Demanded Rate"
  },
  "Demanded: ₹180": {
    "mr": "Demanded: ₹180",
    "hi": "Demanded: ₹180",
    "en": "Demanded: ₹180"
  },
  "Demanding": {
    "mr": "Demanding",
    "hi": "Demanding",
    "en": "Demanding"
  },
  "Dense Bottleneck at Ramkund Step-way": {
    "mr": "Dense Bottleneck at रामकुंड Step-way",
    "hi": "Dense Bottleneck at रामकुंड Step-way",
    "en": "Dense Bottleneck at Ramkund Step-way"
  },
  "Details": {
    "mr": "तपशील",
    "hi": "विवरण",
    "en": "Details"
  },
  "Device & Dispatch Controls": {
    "mr": "Device & Dispatch Controls",
    "hi": "Device & Dispatch Controls",
    "en": "Device & Dispatch Controls"
  },
  "Dharamshala Nights": {
    "mr": "धर्मशाळा Nights",
    "hi": "धर्मशाला Nights",
    "en": "Dharamshala Nights"
  },
  "Direct Agreed Rate": {
    "mr": "Direct Agreed दर",
    "hi": "Direct Agreed दर",
    "en": "Direct Agreed Rate"
  },
  "Direct Booking": {
    "mr": "Direct नोंदणी",
    "hi": "Direct बुकिंग",
    "en": "Direct Booking"
  },
  "Direct Vendor Rate & Reference": {
    "mr": "Direct विक्रेता दर & Reference",
    "hi": "Direct विक्रेता दर & Reference",
    "en": "Direct Vendor Rate & Reference"
  },
  "Direct stone-paved route to Ramkund": {
    "mr": "Direct stone-paved मार्ग to रामकुंड",
    "hi": "Direct stone-paved मार्ग to रामकुंड",
    "en": "Direct stone-paved route to Ramkund"
  },
  "Direct transparent agreement with the service provider. You only pay upon arrival after verifying services.": {
    "mr": "Direct transparent agreement with the service provider. You only pay upon arrival after verifying services.",
    "hi": "Direct transparent agreement with the service provider. You only pay upon arrival after verifying services.",
    "en": "Direct transparent agreement with the service provider. You only pay upon arrival after verifying services."
  },
  "Discovered Hotspots": {
    "mr": "Discovered गर्दी केंद्रे",
    "hi": "Discovered भीड़ केंद्र",
    "en": "Discovered Hotspots"
  },
  "Disinformation Control": {
    "mr": "Disinformation Control",
    "hi": "Disinformation Control",
    "en": "Disinformation Control"
  },
  "Dismiss": {
    "mr": "Dismiss",
    "hi": "Dismiss",
    "en": "Dismiss"
  },
  "Dispatch Audio Alert": {
    "mr": "Dispatch Audio दक्षता इशारा",
    "hi": "Dispatch Audio अलर्ट",
    "en": "Dispatch Audio Alert"
  },
  "Dispatch Check": {
    "mr": "Dispatch Check",
    "hi": "Dispatch Check",
    "en": "Dispatch Check"
  },
  "Dispatch Squad": {
    "mr": "Dispatch पथक",
    "hi": "Dispatch दस्ता",
    "en": "Dispatch Squad"
  },
  "Dispatch Volunteer": {
    "mr": "Dispatch Volunteer",
    "hi": "Dispatch Volunteer",
    "en": "Dispatch Volunteer"
  },
  "Divya Sonawane": {
    "mr": "Divya Sonawane",
    "hi": "Divya Sonawane",
    "en": "Divya Sonawane"
  },
  "Docket #NSK-2026-904": {
    "mr": "Docket #NSK-2026-904",
    "hi": "Docket #NSK-2026-904",
    "en": "Docket #NSK-2026-904"
  },
  "Dormitory Bed (Air-Cooled)": {
    "mr": "Dormitory Bed (Air-Cooled)",
    "hi": "Dormitory Bed (Air-Cooled)",
    "en": "Dormitory Bed (Air-Cooled)"
  },
  "Double Room": {
    "mr": "Double खोली",
    "hi": "Double कमरा",
    "en": "Double Room"
  },
  "Download Official Gazette Compliance PDF": {
    "mr": "डाउनलोड करा Official Gazette अनुपालन PDF",
    "hi": "डाउनलोड करें Official Gazette अनुपालन PDF",
    "en": "Download Official Gazette Compliance PDF"
  },
  "Dr. Ananya Roy": {
    "mr": "Dr. Ananya Roy",
    "hi": "Dr. Ananya Roy",
    "en": "Dr. Ananya Roy"
  },
  "Duty Station / Ghat Sector": {
    "mr": "Duty Station / घाट विभाग",
    "hi": "Duty Station / घाट सेक्टर",
    "en": "Duty Station / Ghat Sector"
  },
  "Duty Verified": {
    "mr": "Duty प्रमाणित",
    "hi": "Duty सत्यापित",
    "en": "Duty Verified"
  },
  "EATERY / STALL": {
    "mr": "EATERY / स्टॉल",
    "hi": "EATERY / स्टॉल",
    "en": "EATERY / STALL"
  },
  "Eatery": {
    "mr": "Eatery",
    "hi": "Eatery",
    "en": "Eatery"
  },
  "Edit My Price": {
    "mr": "Edit My दर",
    "hi": "Edit My मूल्य",
    "en": "Edit My Price"
  },
  "Email ID & Password authentication for verified Local Guides, Civic Vendors, Kumbhveer Student Volunteers & Citizens.": {
    "mr": "ईमेल ओळख क्रमांक & पासवर्ड authentication for प्रमाणित Local मार्गदर्शक, नागरी विक्रेते, कुंभवीर विद्यार्थी स्वयंसेवक & नागरिक.",
    "hi": "ईमेल पहचान संख्या & पासवर्ड authentication for सत्यापित Local गाइड, नागरिक विक्रेता, कुंभवीर छात्र स्वयंसेवक & नागरिक.",
    "en": "Email ID & Password authentication for verified Local Guides, Civic Vendors, Kumbhveer Student Volunteers & Citizens."
  },
  "Email ID (ईमेल पत्ता)": {
    "mr": "ईमेल ओळख क्रमांक (ईमेल पत्ता)",
    "hi": "ईमेल पहचान संख्या (ईमेल पत्ता)",
    "en": "Email ID (ईमेल पत्ता)"
  },
  "Email ID, Password, Govt ID & Live Face Biometrics": {
    "mr": "ईमेल ओळख क्रमांक, पासवर्ड, Govt ओळख क्रमांक & थेट Face Biometrics",
    "hi": "ईमेल पहचान संख्या, पासवर्ड, Govt पहचान संख्या & लाइव Face Biometrics",
    "en": "Email ID, Password, Govt ID & Live Face Biometrics"
  },
  "Emergency Escalation Protocols": {
    "mr": "आपत्कालीन Escalation Protocols",
    "hi": "आपातकालीन Escalation Protocols",
    "en": "Emergency Escalation Protocols"
  },
  "Emergency Field Hotline:": {
    "mr": "आपत्कालीन Field Hotline:",
    "hi": "आपातकालीन Field Hotline:",
    "en": "Emergency Field Hotline:"
  },
  "Enabled": {
    "mr": "Enabled",
    "hi": "Enabled",
    "en": "Enabled"
  },
  "Encrypted Link 142.8 MHz": {
    "mr": "Encrypted Link 142.8 MHz",
    "hi": "Encrypted Link 142.8 MHz",
    "en": "Encrypted Link 142.8 MHz"
  },
  "Enforce statutory rate ceiling, issue digital compound fine (₹5,000) for repeat price gouging, and disperse rogue touts.": {
    "mr": "Enforce statutory दर कमाल मर्यादा, समस्या digital compound fine (₹5,000) for repeat दर gouging, and disperse rogue touts.",
    "hi": "Enforce statutory दर अधिकतम सीमा, समस्या digital compound fine (₹5,000) for repeat मूल्य gouging, and disperse rogue touts.",
    "en": "Enforce statutory rate ceiling, issue digital compound fine (₹5,000) for repeat price gouging, and disperse rogue touts."
  },
  "Enforcement & Escalation Desk": {
    "mr": "Enforcement & Escalation कक्ष",
    "hi": "Enforcement & Escalation कक्ष",
    "en": "Enforcement & Escalation Desk"
  },
  "Enforcement Resolution": {
    "mr": "Enforcement Resolution",
    "hi": "Enforcement Resolution",
    "en": "Enforcement Resolution"
  },
  "English (Global)": {
    "mr": "English (Global)",
    "hi": "English (Global)",
    "en": "English (Global)"
  },
  "English, Marathi, Hindi • Trimbakeshwar Route": {
    "mr": "English, Marathi, Hindi • त्र्यंबकेश्वर मार्ग",
    "hi": "English, Marathi, Hindi • त्र्यंबकेश्वर मार्ग",
    "en": "English, Marathi, Hindi • Trimbakeshwar Route"
  },
  "Enter 10-digit mobile number": {
    "mr": "Enter 10-digit मोबाईल number",
    "hi": "Enter 10-digit मोबाइल number",
    "en": "Enter 10-digit mobile number"
  },
  "Enter official CID, Beat or Traffic Division ID": {
    "mr": "Enter official CID, Beat or Traffic Division ओळख क्रमांक",
    "hi": "Enter official CID, Beat or Traffic Division पहचान संख्या",
    "en": "Enter official CID, Beat or Traffic Division ID"
  },
  "Enter your password": {
    "mr": "Enter your पासवर्ड",
    "hi": "Enter your पासवर्ड",
    "en": "Enter your password"
  },
  "Escalate to Police Desk": {
    "mr": "Escalate to पोलीस कक्ष",
    "hi": "Escalate to पुलिस कक्ष",
    "en": "Escalate to Police Desk"
  },
  "Escalated by Nashikkar Admin Officer Divya S. High defiance recorded at Ramkund Bay 4.": {
    "mr": "Escalated by नाशिककर प्रशासक अधिकारी Divya S. उच्च / तीव्र defiance recorded at रामकुंड Bay 4.",
    "hi": "Escalated by नाशिककर प्रशासक अधिकारी Divya S. उच्च / तीव्र defiance recorded at रामकुंड Bay 4.",
    "en": "Escalated by Nashikkar Admin Officer Divya S. High defiance recorded at Ramkund Bay 4."
  },
  "Escalated to Municipal Magistrate": {
    "mr": "Escalated to महानगरपालिका Magistrate",
    "hi": "Escalated to नगर निगम Magistrate",
    "en": "Escalated to Municipal Magistrate"
  },
  "Escalating transfers this docket immediately into the dedicated Nashik Police Kumbh Mela Unit queue. Field officers receive automated GPS coordinates and vendor permit references for instantaneous on-site summons.": {
    "mr": "Escalating transfers this docket immediately into the dedicated Nashik पोलीस कुंभ मेळा Unit queue. Field officers receive automated GPS coordinates and विक्रेता permit references for instantaneous on-site summons.",
    "hi": "Escalating transfers this docket immediately into the dedicated Nashik पुलिस कुंभ मेला Unit queue. Field officers receive automated GPS coordinates and विक्रेता permit references for instantaneous on-site summons.",
    "en": "Escalating transfers this docket immediately into the dedicated Nashik Police Kumbh Mela Unit queue. Field officers receive automated GPS coordinates and vendor permit references for instantaneous on-site summons."
  },
  "Escalation acknowledged. Sector Unit notified.": {
    "mr": "Escalation acknowledged. विभाग Unit notified.",
    "hi": "Escalation acknowledged. सेक्टर Unit notified.",
    "en": "Escalation acknowledged. Sector Unit notified."
  },
  "Estimated Fair Guidance:": {
    "mr": "अंदाजित वाजवी Guidance:",
    "hi": "अनुमानित उचित Guidance:",
    "en": "Estimated Fair Guidance:"
  },
  "Estimated Fair Range (No fixed cap enforced)": {
    "mr": "अंदाजित वाजवी Range (No fixed मर्यादा enforced)",
    "hi": "अनुमानित उचित Range (No fixed सीमा enforced)",
    "en": "Estimated Fair Range (No fixed cap enforced)"
  },
  "Estimated Fair Range (अंदाजे दर):": {
    "mr": "अंदाजित वाजवी Range (अंदाजे दर):",
    "hi": "अनुमानित उचित Range (अंदाजे दर):",
    "en": "Estimated Fair Range (अंदाजे दर):"
  },
  "Estimated Fair Range (स्थानिक बाजार भाव):": {
    "mr": "अंदाजित वाजवी Range (स्थानिक बाजार भाव):",
    "hi": "अनुमानित उचित Range (स्थानिक बाजार भाव):",
    "en": "Estimated Fair Range (स्थानिक बाजार भाव):"
  },
  "Estimated Fair Range:": {
    "mr": "अंदाजित वाजवी Range:",
    "hi": "अनुमानित उचित Range:",
    "en": "Estimated Fair Range:"
  },
  "Estimated Range Stalls": {
    "mr": "अंदाजित Range स्टॉल्स",
    "hi": "अनुमानित Range स्टॉल",
    "en": "Estimated Range Stalls"
  },
  "Estimated Resolution": {
    "mr": "अंदाजित Resolution",
    "hi": "अनुमानित Resolution",
    "en": "Estimated Resolution"
  },
  "Estimated Shuttle Rate:": {
    "mr": "अंदाजित Shuttle दर:",
    "hi": "अनुमानित Shuttle दर:",
    "en": "Estimated Shuttle Rate:"
  },
  "Exactly 1 individual face is verified against govt guide credentials.": {
    "mr": "Exactly 1 individual face is प्रमाणित against govt मार्गदर्शक credentials.",
    "hi": "Exactly 1 individual face is सत्यापित against govt गाइड credentials.",
    "en": "Exactly 1 individual face is verified against govt guide credentials."
  },
  "Excess Above Benchmark:": {
    "mr": "Excess Above प्रमाणक:",
    "hi": "Excess Above मानक:",
    "en": "Excess Above Benchmark:"
  },
  "Export Docket": {
    "mr": "Export Docket",
    "hi": "Export Docket",
    "en": "Export Docket"
  },
  "FSSAI #21519...03": {
    "mr": "FSSAI #21519...03",
    "hi": "FSSAI #21519...03",
    "en": "FSSAI #21519...03"
  },
  "FSSAI #2151900382 submitted • Awaiting on-ground Kumbhveer hygiene check": {
    "mr": "FSSAI #2151900382 submitted • Awaiting on-ground कुंभवीर hygiene check",
    "hi": "FSSAI #2151900382 submitted • Awaiting on-ground कुंभवीर hygiene check",
    "en": "FSSAI #2151900382 submitted • Awaiting on-ground Kumbhveer hygiene check"
  },
  "FSSAI Kitchen": {
    "mr": "FSSAI Kitchen",
    "hi": "FSSAI Kitchen",
    "en": "FSSAI Kitchen"
  },
  "Face Biometrics Verified (98.6%)": {
    "mr": "Face Biometrics प्रमाणित (98.6%)",
    "hi": "Face Biometrics सत्यापित (98.6%)",
    "en": "Face Biometrics Verified (98.6%)"
  },
  "Face Handshake": {
    "mr": "Face Handshake",
    "hi": "Face Handshake",
    "en": "Face Handshake"
  },
  "Fact-Check Alert": {
    "mr": "Fact-Check दक्षता इशारा",
    "hi": "Fact-Check अलर्ट",
    "en": "Fact-Check Alert"
  },
  "Fair Category": {
    "mr": "वाजवी Category",
    "hi": "उचित Category",
    "en": "Fair Category"
  },
  "Fair Price Reference": {
    "mr": "वाजवी दर Reference",
    "hi": "उचित मूल्य Reference",
    "en": "Fair Price Reference"
  },
  "Fair Range ✓": {
    "mr": "वाजवी Range ✓",
    "hi": "उचित Range ✓",
    "en": "Fair Range ✓"
  },
  "Fair-Price Health": {
    "mr": "वाजवी-दर Health",
    "hi": "उचित-मूल्य Health",
    "en": "Fair-Price Health"
  },
  "Fair-Price Verified": {
    "mr": "वाजवी-दर प्रमाणित",
    "hi": "उचित-मूल्य सत्यापित",
    "en": "Fair-Price Verified"
  },
  "Fair-Pricing Compliance & Overpricing Status": {
    "mr": "वाजवी-दर रचना अनुपालन & Overpricing स्थिती",
    "hi": "उचित-मूल्य निर्धारण अनुपालन & Overpricing स्थिति",
    "en": "Fair-Pricing Compliance & Overpricing Status"
  },
  "False / Rumors": {
    "mr": "False / Rumors",
    "hi": "False / Rumors",
    "en": "False / Rumors"
  },
  "False claims are cross-checked by Kumbhveer volunteers before civic escalation. Thank you for protecting fellow yatris.": {
    "mr": "False claims are cross-checked by कुंभवीर स्वयंसेवक before नागरी escalation. Thank you for protecting fellow yatris.",
    "hi": "False claims are cross-checked by कुंभवीर स्वयंसेवक before नागरिक escalation. Thank you for protecting fellow yatris.",
    "en": "False claims are cross-checked by Kumbhveer volunteers before civic escalation. Thank you for protecting fellow yatris."
  },
  "False panic narrative spreading on regional messaging channels": {
    "mr": "False panic narrative spreading on regional messaging channels",
    "hi": "False panic narrative spreading on regional messaging channels",
    "en": "False panic narrative spreading on regional messaging channels"
  },
  "Fare Slip": {
    "mr": "Fare Slip",
    "hi": "Fare Slip",
    "en": "Fare Slip"
  },
  "Feb 2027": {
    "mr": "Feb 2027",
    "hi": "Feb 2027",
    "en": "Feb 2027"
  },
  "Field-audited by": {
    "mr": "Field-तपासणी केली by",
    "hi": "Field-जांच की गई by",
    "en": "Field-audited by"
  },
  "File Upload": {
    "mr": "File अपलोड करा",
    "hi": "File अपलोड करें",
    "en": "File Upload"
  },
  "Filed Evidence (2)": {
    "mr": "Filed Evidence (2)",
    "hi": "Filed Evidence (2)",
    "en": "Filed Evidence (2)"
  },
  "Fill Demo Guide Account": {
    "mr": "Fill Demo मार्गदर्शक Account",
    "hi": "Fill Demo गाइड Account",
    "en": "Fill Demo Guide Account"
  },
  "Fixed Pre-Paid Corridor": {
    "mr": "Fixed Pre-Paid Corridor",
    "hi": "Fixed Pre-Paid Corridor",
    "en": "Fixed Pre-Paid Corridor"
  },
  "Fixed in 14m": {
    "mr": "Fixed in 14m",
    "hi": "Fixed in 14m",
    "en": "Fixed in 14m"
  },
  "Fixed in 22m": {
    "mr": "Fixed in 22m",
    "hi": "Fixed in 22m",
    "en": "Fixed in 22m"
  },
  "Food & Bhojanalayas": {
    "mr": "अन्न / भोजन & Bhojanalayas",
    "hi": "भोजन / अन्न & Bhojanalayas",
    "en": "Food & Bhojanalayas"
  },
  "Food & Dining": {
    "mr": "अन्न / भोजन & Dining",
    "hi": "भोजन / अन्न & Dining",
    "en": "Food & Dining"
  },
  "Food License on File": {
    "mr": "अन्न / भोजन License on File",
    "hi": "भोजन / अन्न License on File",
    "en": "Food License on File"
  },
  "Food Stall": {
    "mr": "अन्न / भोजन स्टॉल",
    "hi": "भोजन / अन्न स्टॉल",
    "en": "Food Stall"
  },
  "Forward to Fact-Check": {
    "mr": "Forward to Fact-Check",
    "hi": "Forward to Fact-Check",
    "en": "Forward to Fact-Check"
  },
  "Forwarded": {
    "mr": "Forwarded",
    "hi": "Forwarded",
    "en": "Forwarded"
  },
  "Full Name *": {
    "mr": "Full नाव *",
    "hi": "Full नाम *",
    "en": "Full Name *"
  },
  "Ganga Ghat Guesthouse": {
    "mr": "Ganga घाट Guesthouse",
    "hi": "Ganga घाट Guesthouse",
    "en": "Ganga Ghat Guesthouse"
  },
  "Gazette Cap": {
    "mr": "Gazette मर्यादा",
    "hi": "Gazette सीमा",
    "en": "Gazette Cap"
  },
  "Gazette Cycle: Morning Sync 08:30 AM": {
    "mr": "Gazette Cycle: सकाळ Sync 08:30 AM",
    "hi": "Gazette Cycle: सुबह Sync 08:30 AM",
    "en": "Gazette Cycle: Morning Sync 08:30 AM"
  },
  "Gazette Rates": {
    "mr": "Gazette दर",
    "hi": "Gazette दरें",
    "en": "Gazette Rates"
  },
  "Gazette Ref: #402-N": {
    "mr": "Gazette Ref: #402-N",
    "hi": "Gazette Ref: #402-N",
    "en": "Gazette Ref: #402-N"
  },
  "Gazette Sec-02": {
    "mr": "Gazette Sec-02",
    "hi": "Gazette Sec-02",
    "en": "Gazette Sec-02"
  },
  "Geo-stamped at 14:11 IST": {
    "mr": "Geo-stamped at 14:11 IST",
    "hi": "Geo-stamped at 14:11 IST",
    "en": "Geo-stamped at 14:11 IST"
  },
  "Get Help": {
    "mr": "Get मदत",
    "hi": "Get सहायता",
    "en": "Get Help"
  },
  "Ghat Accessibility": {
    "mr": "घाट Accessibility",
    "hi": "घाट Accessibility",
    "en": "Ghat Accessibility"
  },
  "Ghat Mesh Node #042 Sync": {
    "mr": "घाट Mesh Node #042 Sync",
    "hi": "घाट Mesh Node #042 Sync",
    "en": "Ghat Mesh Node #042 Sync"
  },
  "Godavari Maha Aarti Evening Walk": {
    "mr": "गोदावरी Maha आरती संध्याकाळ Walk",
    "hi": "गोदावरी Maha आरती शाम Walk",
    "en": "Godavari Maha Aarti Evening Walk"
  },
  "Godavari Riverfront Precinct • Sector 2 Rapid Intervention Zone": {
    "mr": "गोदावरी Riverfront Precinct • विभाग 2 Rapid Intervention विभाग",
    "hi": "गोदावरी Riverfront Precinct • सेक्टर 2 Rapid Intervention ज़ोन",
    "en": "Godavari Riverfront Precinct • Sector 2 Rapid Intervention Zone"
  },
  "Godavari Satvik Thali": {
    "mr": "गोदावरी सात्त्विक थाळी",
    "hi": "गोदावरी सात्विक थाली",
    "en": "Godavari Satvik Thali"
  },
  "Godavari Yatri Niwas": {
    "mr": "गोदावरी भाविक Niwas",
    "hi": "गोदावरी तीर्थयात्री Niwas",
    "en": "Godavari Yatri Niwas"
  },
  "Govt Aadhaar & Tourism Department Badge Verified": {
    "mr": "Govt Aadhaar & Tourism Department बिल्ला प्रमाणित",
    "hi": "Govt Aadhaar & Tourism Department बैज सत्यापित",
    "en": "Govt Aadhaar & Tourism Department Badge Verified"
  },
  "Govt Authorized Guide Reg #MH-15-GUIDE-0082": {
    "mr": "Govt Authorized मार्गदर्शक Reg #MH-15-मार्गदर्शक-0082",
    "hi": "Govt Authorized गाइड Reg #MH-15-गाइड-0082",
    "en": "Govt Authorized Guide Reg #MH-15-GUIDE-0082"
  },
  "Govt ID Number *": {
    "mr": "Govt ओळख क्रमांक Number *",
    "hi": "Govt पहचान संख्या Number *",
    "en": "Govt ID Number *"
  },
  "Govt ID: MH-15-GUIDE-0082": {
    "mr": "Govt ओळख क्रमांक: MH-15-मार्गदर्शक-0082",
    "hi": "Govt पहचान संख्या: MH-15-गाइड-0082",
    "en": "Govt ID: MH-15-GUIDE-0082"
  },
  "Govt OTP / Secure Token": {
    "mr": "Govt ओटीपी / Secure टोकन",
    "hi": "Govt ओटीपी / Secure टोकन",
    "en": "Govt OTP / Secure Token"
  },
  "Ground Level Ramp": {
    "mr": "Ground Level Ramp",
    "hi": "Ground Level Ramp",
    "en": "Ground Level Ramp"
  },
  "Guide": {
    "mr": "मार्गदर्शक",
    "hi": "गाइड",
    "en": "Guide"
  },
  "Guide / Priest": {
    "mr": "मार्गदर्शक / Priest",
    "hi": "गाइड / Priest",
    "en": "Guide / Priest"
  },
  "Guided Pilgrim Walks": {
    "mr": "Guided भाविक Walks",
    "hi": "Guided तीर्थयात्री Walks",
    "en": "Guided Pilgrim Walks"
  },
  "Gujarati": {
    "mr": "Gujarati",
    "hi": "Gujarati",
    "en": "Gujarati"
  },
  "Hammered Pure Tamra-Patra Thali": {
    "mr": "Hammered Pure Tamra-Patra थाळी",
    "hi": "Hammered Pure Tamra-Patra थाली",
    "en": "Hammered Pure Tamra-Patra Thali"
  },
  "Hand-Cast Brass Diya (Set of 2)": {
    "mr": "Hand-Cast पितळ दिवा (Set of 2)",
    "hi": "Hand-Cast पीतल दीया (Set of 2)",
    "en": "Hand-Cast Brass Diya (Set of 2)"
  },
  "Handover Done": {
    "mr": "Handover Done",
    "hi": "Handover Done",
    "en": "Handover Done"
  },
  "Have a pricing question or feedback?": {
    "mr": "Have a दर रचना question or feedback?",
    "hi": "Have a मूल्य निर्धारण question or feedback?",
    "en": "Have a pricing question or feedback?"
  },
  "Heritage & Ghat Guide": {
    "mr": "Heritage & घाट मार्गदर्शक",
    "hi": "Heritage & घाट गाइड",
    "en": "Heritage & Ghat Guide"
  },
  "High": {
    "mr": "उच्च / तीव्र",
    "hi": "उच्च / तीव्र",
    "en": "High"
  },
  "High Priority": {
    "mr": "उच्च / तीव्र Priority",
    "hi": "उच्च / तीव्र Priority",
    "en": "High Priority"
  },
  "High Volume Beep + Dual Pulse Vibration": {
    "mr": "उच्च / तीव्र Volume Beep + Dual Pulse Vibration",
    "hi": "उच्च / तीव्र Volume Beep + Dual Pulse Vibration",
    "en": "High Volume Beep + Dual Pulse Vibration"
  },
  "Hindi (राष्ट्रीय)": {
    "mr": "Hindi (राष्ट्रीय)",
    "hi": "Hindi (राष्ट्रीय)",
    "en": "Hindi (राष्ट्रीय)"
  },
  "Honesty Points": {
    "mr": "Honesty Points",
    "hi": "Honesty Points",
    "en": "Honesty Points"
  },
  "Hot Water": {
    "mr": "Hot पाणी",
    "hi": "Hot जल / पानी",
    "en": "Hot Water"
  },
  "Hotel / Lodging": {
    "mr": "हॉटेल / Lodging",
    "hi": "होटल / Lodging",
    "en": "Hotel / Lodging"
  },
  "Hotel / Niwas": {
    "mr": "हॉटेल / Niwas",
    "hi": "होटल / Niwas",
    "en": "Hotel / Niwas"
  },
  "Hotels & Dharamshalas": {
    "mr": "हॉटेल्स & धर्मशाळा",
    "hi": "होटल & धर्मशालाएं",
    "en": "Hotels & Dharamshalas"
  },
  "ID: MH-NSK-POL-8841": {
    "mr": "ओळख क्रमांक: MH-NSK-POL-8841",
    "hi": "पहचान संख्या: MH-NSK-POL-8841",
    "en": "ID: MH-NSK-POL-8841"
  },
  "IMG_2027_0814_bill.jpg": {
    "mr": "IMG_2027_0814_bill.jpg",
    "hi": "IMG_2027_0814_bill.jpg",
    "en": "IMG_2027_0814_bill.jpg"
  },
  "INR": {
    "mr": "INR",
    "hi": "INR",
    "en": "INR"
  },
  "Identity Confirmed via Selfie": {
    "mr": "Identity Confirmed via Selfie",
    "hi": "Identity Confirmed via Selfie",
    "en": "Identity Confirmed via Selfie"
  },
  "Identity Confirmed via Selfie (Match Score: 99.8%)": {
    "mr": "Identity Confirmed via Selfie (Match Score: 99.8%)",
    "hi": "Identity Confirmed via Selfie (Match Score: 99.8%)",
    "en": "Identity Confirmed via Selfie (Match Score: 99.8%)"
  },
  "If a yatri ever queries a price, you get a 15-minute amicable clarification window before any municipal escalation is triggered.": {
    "mr": "If a भाविक ever queries a दर, you get a 15-minute amicable clarification window before any महानगरपालिका escalation is triggered.",
    "hi": "If a तीर्थयात्री ever queries a मूल्य, you get a 15-minute amicable clarification window before any नगर निगम escalation is triggered.",
    "en": "If a yatri ever queries a price, you get a 15-minute amicable clarification window before any municipal escalation is triggered."
  },
  "Important Pilgrim Notice": {
    "mr": "Important भाविक सूचना",
    "hi": "Important तीर्थयात्री नोटिस",
    "en": "Important Pilgrim Notice"
  },
  "In Stock (15)": {
    "mr": "In Stock (15)",
    "hi": "In Stock (15)",
    "en": "In Stock (15)"
  },
  "In Stock (28)": {
    "mr": "In Stock (28)",
    "hi": "In Stock (28)",
    "en": "In Stock (28)"
  },
  "In Stock (45)": {
    "mr": "In Stock (45)",
    "hi": "In Stock (45)",
    "en": "In Stock (45)"
  },
  "In Stock (80)": {
    "mr": "In Stock (80)",
    "hi": "In Stock (80)",
    "en": "In Stock (80)"
  },
  "In-Person Computer Vision Match": {
    "mr": "In-Person Computer Vision Match",
    "hi": "In-Person Computer Vision Match",
    "en": "In-Person Computer Vision Match"
  },
  "In-Progress": {
    "mr": "In-Progress",
    "hi": "In-Progress",
    "en": "In-Progress"
  },
  "In-person municipal inspection complete": {
    "mr": "In-person महानगरपालिका inspection complete",
    "hi": "In-person नगर निगम inspection complete",
    "en": "In-person municipal inspection complete"
  },
  "Incoming Pilgrim Requests": {
    "mr": "Incoming भाविक Requests",
    "hi": "Incoming तीर्थयात्री Requests",
    "en": "Incoming Pilgrim Requests"
  },
  "Incomplete": {
    "mr": "Incomplete",
    "hi": "Incomplete",
    "en": "Incomplete"
  },
  "Indicative Fair Ranges:": {
    "mr": "Indicative वाजवी Ranges:",
    "hi": "Indicative उचित Ranges:",
    "en": "Indicative Fair Ranges:"
  },
  "Indicative Range": {
    "mr": "Indicative Range",
    "hi": "Indicative Range",
    "en": "Indicative Range"
  },
  "Inflow: 1 event / 2.5s": {
    "mr": "Inflow: 1 event / 2.5s",
    "hi": "Inflow: 1 event / 2.5s",
    "en": "Inflow: 1 event / 2.5s"
  },
  "Insp. V. Patil": {
    "mr": "Insp. V. Patil",
    "hi": "Insp. V. Patil",
    "en": "Insp. V. Patil"
  },
  "Insp. Vikram Patil": {
    "mr": "Insp. Vikram Patil",
    "hi": "Insp. Vikram Patil",
    "en": "Insp. Vikram Patil"
  },
  "Inspect Price Flags (6)": {
    "mr": "Inspect दर इशारे (6)",
    "hi": "Inspect मूल्य चेतावनी (6)",
    "en": "Inspect Price Flags (6)"
  },
  "Inspector Patil, confirming sign-out marks Badge MH-NSK-POL-8841 off-duty for Ramkund Central Ghats.": {
    "mr": "निरीक्षक Patil, confirming sign-out marks बिल्ला MH-NSK-POL-8841 off-duty for रामकुंड Central घाट.",
    "hi": "निरीक्षक Patil, confirming sign-out marks बैज MH-NSK-POL-8841 off-duty for रामकुंड Central घाट.",
    "en": "Inspector Patil, confirming sign-out marks Badge MH-NSK-POL-8841 off-duty for Ramkund Central Ghats."
  },
  "Inspector Vikram Patil": {
    "mr": "निरीक्षक Vikram Patil",
    "hi": "निरीक्षक Vikram Patil",
    "en": "Inspector Vikram Patil"
  },
  "Investigation Chronology": {
    "mr": "Investigation Chronology",
    "hi": "Investigation Chronology",
    "en": "Investigation Chronology"
  },
  "Investigation Pipeline": {
    "mr": "Investigation Pipeline",
    "hi": "Investigation Pipeline",
    "en": "Investigation Pipeline"
  },
  "Issue Notice": {
    "mr": "समस्या सूचना",
    "hi": "समस्या नोटिस",
    "en": "Issue Notice"
  },
  "Items:": {
    "mr": "Items:",
    "hi": "Items:",
    "en": "Items:"
  },
  "Judicial Override": {
    "mr": "Judicial Override",
    "hi": "Judicial Override",
    "en": "Judicial Override"
  },
  "Just Now (3m ago)": {
    "mr": "Just Now (3m ago)",
    "hi": "Just Now (3m ago)",
    "en": "Just Now (3m ago)"
  },
  "Jyotirlinga & Sacred Origin Circuit": {
    "mr": "Jyotirlinga & Sacred Origin Circuit",
    "hi": "Jyotirlinga & Sacred Origin Circuit",
    "en": "Jyotirlinga & Sacred Origin Circuit"
  },
  "K.T.H.M. College • 18 field audits": {
    "mr": "K.T.H.M. College • 18 field audits",
    "hi": "K.T.H.M. College • 18 field audits",
    "en": "K.T.H.M. College • 18 field audits"
  },
  "KK Wagh Institute of Engg. • 11 audits": {
    "mr": "KK Wagh Institute of Engg. • 11 audits",
    "hi": "KK Wagh Institute of Engg. • 11 audits",
    "en": "KK Wagh Institute of Engg. • 11 audits"
  },
  "KNN k=15": {
    "mr": "KNN k=15",
    "hi": "KNN k=15",
    "en": "KNN k=15"
  },
  "KTHM College • 450m away": {
    "mr": "KTHM College • 450m away",
    "hi": "KTHM College • 450m away",
    "en": "KTHM College • 450m away"
  },
  "KV": {
    "mr": "KV",
    "hi": "KV",
    "en": "KV"
  },
  "Kalaram Temple East Gate": {
    "mr": "काळाराम मंदिर East प्रवेशद्वार",
    "hi": "कालाराम मंदिर East प्रवेश द्वार",
    "en": "Kalaram Temple East Gate"
  },
  "Kalaram Temple North Lane": {
    "mr": "काळाराम मंदिर North Lane",
    "hi": "कालाराम मंदिर North Lane",
    "en": "Kalaram Temple North Lane"
  },
  "Kapaleshwar Stand": {
    "mr": "कपालेश्वर Stand",
    "hi": "कपालेश्वर Stand",
    "en": "Kapaleshwar Stand"
  },
  "Keep this Kumbh Setu digital token handy if any tariff dispute or unauthorized surcharges arise at the desk.": {
    "mr": "Keep this कुंभ Setu digital टोकन handy if any दरपत्रक dispute or unauthorized surcharges arise at the कक्ष.",
    "hi": "Keep this कुंभ Setu digital टोकन handy if any दर सूची dispute or unauthorized surcharges arise at the कक्ष.",
    "en": "Keep this Kumbh Setu digital token handy if any tariff dispute or unauthorized surcharges arise at the desk."
  },
  "Kumbh Mela Fair-Pricing Act Mandate": {
    "mr": "कुंभ मेळा वाजवी-दर रचना Act Mandate",
    "hi": "कुंभ मेला उचित-मूल्य निर्धारण Act Mandate",
    "en": "Kumbh Mela Fair-Pricing Act Mandate"
  },
  "Kumbh Mela Fair-Pricing Index": {
    "mr": "कुंभ मेळा वाजवी-दर रचना Index",
    "hi": "कुंभ मेला उचित-मूल्य निर्धारण Index",
    "en": "Kumbh Mela Fair-Pricing Index"
  },
  "Kumbh Setu Locked": {
    "mr": "कुंभ Setu Locked",
    "hi": "कुंभ Setu Locked",
    "en": "Kumbh Setu Locked"
  },
  "KumbhSetu Fair-Price Helpline assists within minutes.": {
    "mr": "KumbhSetu वाजवी-दर मदत कक्ष assists within मिनिटे.",
    "hi": "KumbhSetu उचित-मूल्य हेल्पलाइन assists within मिनट.",
    "en": "KumbhSetu Fair-Price Helpline assists within minutes."
  },
  "KumbhSetu — Police AI Hotspot Radar & Live Triage": {
    "mr": "KumbhSetu — पोलीस AI गर्दी केंद्र रडार & थेट Triage",
    "hi": "KumbhSetu — पुलिस AI भीड़ केंद्र रडार & लाइव Triage",
    "en": "KumbhSetu — Police AI Hotspot Radar & Live Triage"
  },
  "KumbhSetu — Vendor Stall & Customer Hub": {
    "mr": "KumbhSetu — विक्रेता स्टॉल & Customer Hub",
    "hi": "KumbhSetu — विक्रेता स्टॉल & Customer Hub",
    "en": "KumbhSetu — Vendor Stall & Customer Hub"
  },
  "Kumbhveer Certified Stay": {
    "mr": "कुंभवीर Certified मुक्काम",
    "hi": "कुंभवीर Certified आवास",
    "en": "Kumbhveer Certified Stay"
  },
  "Kumbhveer College Leaderboard": {
    "mr": "कुंभवीर College Leaderboard",
    "hi": "कुंभवीर College Leaderboard",
    "en": "Kumbhveer College Leaderboard"
  },
  "Kumbhveer Divya Shinde": {
    "mr": "कुंभवीर Divya Shinde",
    "hi": "कुंभवीर Divya Shinde",
    "en": "Kumbhveer Divya Shinde"
  },
  "Kumbhveer Field Inspection": {
    "mr": "कुंभवीर Field Inspection",
    "hi": "कुंभवीर Field Inspection",
    "en": "Kumbhveer Field Inspection"
  },
  "Kumbhveer Stall Photo Upload": {
    "mr": "कुंभवीर स्टॉल Photo अपलोड करा",
    "hi": "कुंभवीर स्टॉल Photo अपलोड करें",
    "en": "Kumbhveer Stall Photo Upload"
  },
  "Kumbhveer Verified Stand": {
    "mr": "कुंभवीर प्रमाणित Stand",
    "hi": "कुंभवीर सत्यापित Stand",
    "en": "Kumbhveer Verified Stand"
  },
  "Kumbhveer queued": {
    "mr": "कुंभवीर queued",
    "hi": "कुंभवीर queued",
    "en": "Kumbhveer queued"
  },
  "Kumbhveer volunteer": {
    "mr": "कुंभवीर volunteer",
    "hi": "कुंभवीर volunteer",
    "en": "Kumbhveer volunteer"
  },
  "Kumbhveer volunteers can upload on-site audit photos directly from gallery or storage. No live camera facial verification is required.": {
    "mr": "कुंभवीर स्वयंसेवक can अपलोड करा on-site तपासणी photos directly from gallery or storage. No थेट camera facial verification is required.",
    "hi": "कुंभवीर स्वयंसेवक can अपलोड करें on-site जांच / ऑडिट photos directly from gallery or storage. No लाइव camera facial verification is required.",
    "en": "Kumbhveer volunteers can upload on-site audit photos directly from gallery or storage. No live camera facial verification is required."
  },
  "Kumbhveers": {
    "mr": "Kumbhveers",
    "hi": "Kumbhveers",
    "en": "Kumbhveers"
  },
  "LOCAL BAZAAR STALL": {
    "mr": "LOCAL बाजार स्टॉल",
    "hi": "LOCAL बाज़ार स्टॉल",
    "en": "LOCAL BAZAAR STALL"
  },
  "Lang: English, Tamil": {
    "mr": "Lang: English, Tamil",
    "hi": "Lang: English, Tamil",
    "en": "Lang: English, Tamil"
  },
  "Lang: Gujarati, Hindi": {
    "mr": "Lang: Gujarati, Hindi",
    "hi": "Lang: Gujarati, Hindi",
    "en": "Lang: Gujarati, Hindi"
  },
  "Lang: Hindi, English": {
    "mr": "Lang: Hindi, English",
    "hi": "Lang: Hindi, English",
    "en": "Lang: Hindi, English"
  },
  "Languages Spoken": {
    "mr": "Languages Spoken",
    "hi": "Languages Spoken",
    "en": "Languages Spoken"
  },
  "Languages Spoken (comma separated) *": {
    "mr": "Languages Spoken (comma separated) *",
    "hi": "Languages Spoken (comma separated) *",
    "en": "Languages Spoken (comma separated) *"
  },
  "Languages: Marathi, Hindi, English": {
    "mr": "Languages: Marathi, Hindi, English",
    "hi": "Languages: Marathi, Hindi, English",
    "en": "Languages: Marathi, Hindi, English"
  },
  "Latency: 28ms • Simhastha Net": {
    "mr": "Latency: 28ms • सिंहस्थ Net",
    "hi": "Latency: 28ms • सिंहस्थ Net",
    "en": "Latency: 28ms • Simhastha Net"
  },
  "Law Enforcement Interlock": {
    "mr": "Law Enforcement Interlock",
    "hi": "Law Enforcement Interlock",
    "en": "Law Enforcement Interlock"
  },
  "Live 24x7": {
    "mr": "थेट 24x7",
    "hi": "लाइव 24x7",
    "en": "Live 24x7"
  },
  "Live Camera Selfie Identity Confirmed": {
    "mr": "थेट Camera Selfie Identity Confirmed",
    "hi": "लाइव Camera Selfie Identity Confirmed",
    "en": "Live Camera Selfie Identity Confirmed"
  },
  "Live Case": {
    "mr": "थेट Case",
    "hi": "लाइव Case",
    "en": "Live Case"
  },
  "Live Dispatch": {
    "mr": "थेट Dispatch",
    "hi": "लाइव Dispatch",
    "en": "Live Dispatch"
  },
  "Live Feed": {
    "mr": "थेट Feed",
    "hi": "लाइव Feed",
    "en": "Live Feed"
  },
  "Live ML Hotspot Radar Active": {
    "mr": "थेट ML गर्दी केंद्र रडार सक्रिय",
    "hi": "लाइव ML भीड़ केंद्र रडार सक्रिय",
    "en": "Live ML Hotspot Radar Active"
  },
  "Live Overcharging & Civic Incident Stream": {
    "mr": "थेट जादा दर आकारणी & नागरी Incident Stream",
    "hi": "लाइव अत्यधिक वसूली & नागरिक Incident Stream",
    "en": "Live Overcharging & Civic Incident Stream"
  },
  "Live Stream": {
    "mr": "थेट Stream",
    "hi": "लाइव Stream",
    "en": "Live Stream"
  },
  "Live Tool": {
    "mr": "थेट Tool",
    "hi": "लाइव Tool",
    "en": "Live Tool"
  },
  "Live Yatri Feed": {
    "mr": "थेट भाविक Feed",
    "hi": "लाइव तीर्थयात्री Feed",
    "en": "Live Yatri Feed"
  },
  "Live camera capture or upload for vector extraction": {
    "mr": "थेट camera capture or अपलोड करा for vector extraction",
    "hi": "लाइव camera capture or अपलोड करें for vector extraction",
    "en": "Live camera capture or upload for vector extraction"
  },
  "Live camera stream analyzes facial landmarks and runs biometric embedding match with official Kumbhveer registry.": {
    "mr": "थेट camera stream analyzes facial landmarks and runs biometric embedding match with official कुंभवीर registry.",
    "hi": "लाइव camera stream analyzes facial landmarks and runs biometric embedding match with official कुंभवीर registry.",
    "en": "Live camera stream analyzes facial landmarks and runs biometric embedding match with official Kumbhveer registry."
  },
  "Loading discovered DBSCAN hotspots...": {
    "mr": "Loading discovered DBSCAN गर्दी केंद्रे...",
    "hi": "Loading discovered DBSCAN भीड़ केंद्र...",
    "en": "Loading discovered DBSCAN hotspots..."
  },
  "Local Guide Tour Request": {
    "mr": "Local मार्गदर्शक Tour Request",
    "hi": "Local गाइड Tour Request",
    "en": "Local Guide Tour Request"
  },
  "Local Guides (Purohits & Docents)": {
    "mr": "Local मार्गदर्शक (Purohits & Docents)",
    "hi": "Local गाइड (Purohits & Docents)",
    "en": "Local Guides (Purohits & Docents)"
  },
  "Located inside Pilgrim Footwear-Free Pedestrian Zone": {
    "mr": "Located inside भाविक Footwear-Free Pedestrian विभाग",
    "hi": "Located inside तीर्थयात्री Footwear-Free Pedestrian ज़ोन",
    "en": "Located inside Pilgrim Footwear-Free Pedestrian Zone"
  },
  "Log Details & Witness Disclosures": {
    "mr": "Log तपशील & Witness Disclosures",
    "hi": "Log विवरण & Witness Disclosures",
    "en": "Log Details & Witness Disclosures"
  },
  "Log Out of Duty Terminal": {
    "mr": "Log Out of Duty टर्मिनल",
    "hi": "Log Out of Duty टर्मिनल",
    "en": "Log Out of Duty Terminal"
  },
  "Login with Supabase": {
    "mr": "प्रवेश करा with Supabase",
    "hi": "लॉगिन करें with Supabase",
    "en": "Login with Supabase"
  },
  "Lost & Found / Child Cell": {
    "mr": "Lost & Found / Child कक्ष",
    "hi": "Lost & Found / Child प्रकोष्ठ",
    "en": "Lost & Found / Child Cell"
  },
  "MH-15-TC-4902": {
    "mr": "MH-15-TC-4902",
    "hi": "MH-15-TC-4902",
    "en": "MH-15-TC-4902"
  },
  "MIS-102": {
    "mr": "MIS-102",
    "hi": "MIS-102",
    "en": "MIS-102"
  },
  "ML Radar Active": {
    "mr": "ML रडार सक्रिय",
    "hi": "ML रडार सक्रिय",
    "en": "ML Radar Active"
  },
  "Maheshwari Jain Bhojanalaya": {
    "mr": "Maheshwari Jain भोजनालय",
    "hi": "Maheshwari Jain भोजनालय",
    "en": "Maheshwari Jain Bhojanalaya"
  },
  "Manage your prices and stock status visible to Yatris on the Kumbh Bazaar.": {
    "mr": "Manage your prices and stock स्थिती visible to Yatris on the कुंभ बाजार.",
    "hi": "Manage your prices and stock स्थिति visible to Yatris on the कुंभ बाज़ार.",
    "en": "Manage your prices and stock status visible to Yatris on the Kumbh Bazaar."
  },
  "Marathi (स्थानिक)": {
    "mr": "Marathi (स्थानिक)",
    "hi": "Marathi (स्थानिक)",
    "en": "Marathi (स्थानिक)"
  },
  "Marathi, Hindi, English": {
    "mr": "Marathi, Hindi, English",
    "hi": "Marathi, Hindi, English",
    "en": "Marathi, Hindi, English"
  },
  "Mark Resolved": {
    "mr": "Mark निकाली काढले",
    "hi": "Mark सुलझाया गया",
    "en": "Mark Resolved"
  },
  "Medical Camp: 180m Ahead": {
    "mr": "वैद्यकीय Camp: 180m Ahead",
    "hi": "चिकित्सा Camp: 180m Ahead",
    "en": "Medical Camp: 180m Ahead"
  },
  "Medium": {
    "mr": "Medium",
    "hi": "Medium",
    "en": "Medium"
  },
  "Medium Priority": {
    "mr": "Medium Priority",
    "hi": "Medium Priority",
    "en": "Medium Priority"
  },
  "Meenakshi Sundaram": {
    "mr": "Meenakshi Sundaram",
    "hi": "Meenakshi Sundaram",
    "en": "Meenakshi Sundaram"
  },
  "Meet: Kalaram Temple East Gate": {
    "mr": "Meet: काळाराम मंदिर East प्रवेशद्वार",
    "hi": "Meet: कालाराम मंदिर East प्रवेश द्वार",
    "en": "Meet: Kalaram Temple East Gate"
  },
  "Meter Shot": {
    "mr": "Meter Shot",
    "hi": "Meter Shot",
    "en": "Meter Shot"
  },
  "Min 6 characters": {
    "mr": "Min 6 characters",
    "hi": "Min 6 characters",
    "en": "Min 6 characters"
  },
  "Mobile Unit Alpha-2 nearby (320m)": {
    "mr": "मोबाईल Unit Alpha-2 nearby (320m)",
    "hi": "मोबाइल Unit Alpha-2 nearby (320m)",
    "en": "Mobile Unit Alpha-2 nearby (320m)"
  },
  "Municipal Gazette Ceiling Cap:": {
    "mr": "महानगरपालिका Gazette कमाल मर्यादा मर्यादा:",
    "hi": "नगर निगम Gazette अधिकतम सीमा सीमा:",
    "en": "Municipal Gazette Ceiling Cap:"
  },
  "Municipal License": {
    "mr": "महानगरपालिका License",
    "hi": "नगर निगम License",
    "en": "Municipal License"
  },
  "Municipal Public Grievance Protocol • Nashik 2027": {
    "mr": "महानगरपालिका Public तक्रार Protocol • Nashik 2027",
    "hi": "नगर निगम Public शिकायत Protocol • Nashik 2027",
    "en": "Municipal Public Grievance Protocol • Nashik 2027"
  },
  "My Active Rate:": {
    "mr": "My सक्रिय दर:",
    "hi": "My सक्रिय दर:",
    "en": "My Active Rate:"
  },
  "My Products (6)": {
    "mr": "My Products (6)",
    "hi": "My Products (6)",
    "en": "My Products (6)"
  },
  "My Stall Active Price (₹):": {
    "mr": "My स्टॉल सक्रिय दर (₹):",
    "hi": "My स्टॉल सक्रिय मूल्य (₹):",
    "en": "My Stall Active Price (₹):"
  },
  "My Stall Dashboard": {
    "mr": "My स्टॉल Dashboard",
    "hi": "My स्टॉल Dashboard",
    "en": "My Stall Dashboard"
  },
  "NMC Gazette Cap": {
    "mr": "NMC Gazette मर्यादा",
    "hi": "NMC Gazette सीमा",
    "en": "NMC Gazette Cap"
  },
  "NMC/2026/G-881": {
    "mr": "NMC/2026/G-881",
    "hi": "NMC/2026/G-881",
    "en": "NMC/2026/G-881"
  },
  "NR": {
    "mr": "NR",
    "hi": "NR",
    "en": "NR"
  },
  "Nashik 2027 Disaster Control Grid Active": {
    "mr": "Nashik 2027 Disaster Control Grid सक्रिय",
    "hi": "Nashik 2027 Disaster Control Grid सक्रिय",
    "en": "Nashik 2027 Disaster Control Grid Active"
  },
  "Nashik Admin": {
    "mr": "Nashik प्रशासक",
    "hi": "Nashik प्रशासक",
    "en": "Nashik Admin"
  },
  "Nashik City Police • Simhastha Special Cell": {
    "mr": "Nashik City पोलीस • सिंहस्थ Special कक्ष",
    "hi": "Nashik City पुलिस • सिंहस्थ Special प्रकोष्ठ",
    "en": "Nashik City Police • Simhastha Special Cell"
  },
  "Nashik Municipal Civic Coordination": {
    "mr": "Nashik महानगरपालिका नागरी Coordination",
    "hi": "Nashik नगर निगम नागरिक Coordination",
    "en": "Nashik Municipal Civic Coordination"
  },
  "Nashik Municipal Corp": {
    "mr": "Nashik महानगरपालिका Corp",
    "hi": "Nashik नगर निगम Corp",
    "en": "Nashik Municipal Corp"
  },
  "Nashik Municipal Corporation & Kumbh Police Control syncs automatically every 30 seconds.": {
    "mr": "Nashik महानगरपालिका महापालिका & कुंभ पोलीस Control syncs automatically every 30 सेकंद.",
    "hi": "Nashik नगर निगम निगम & कुंभ पुलिस Control syncs automatically every 30 सेकंड.",
    "en": "Nashik Municipal Corporation & Kumbh Police Control syncs automatically every 30 seconds."
  },
  "Nashik Road Stn → Ramkund Ghat": {
    "mr": "Nashik Road Stn → रामकुंड घाट",
    "hi": "Nashik Road Stn → रामकुंड घाट",
    "en": "Nashik Road Stn → Ramkund Ghat"
  },
  "Nashikkar": {
    "mr": "नाशिककर",
    "hi": "नाशिककर",
    "en": "Nashikkar"
  },
  "Nashikkar Admin Escalation": {
    "mr": "नाशिककर प्रशासक Escalation",
    "hi": "नाशिककर प्रशासक Escalation",
    "en": "Nashikkar Admin Escalation"
  },
  "Nashikkar Rohan Joshi": {
    "mr": "नाशिककर Rohan Joshi",
    "hi": "नाशिककर Rohan Joshi",
    "en": "Nashikkar Rohan Joshi"
  },
  "Nashikkar Verified": {
    "mr": "नाशिककर प्रमाणित",
    "hi": "नाशिककर सत्यापित",
    "en": "Nashikkar Verified"
  },
  "Nashikkar citizen": {
    "mr": "नाशिककर नागरिक",
    "hi": "नाशिककर नागरिक",
    "en": "Nashikkar citizen"
  },
  "Navigate": {
    "mr": "Navigate",
    "hi": "Navigate",
    "en": "Navigate"
  },
  "Navigate Base": {
    "mr": "Navigate Base",
    "hi": "Navigate Base",
    "en": "Navigate Base"
  },
  "Navigate Stand": {
    "mr": "Navigate Stand",
    "hi": "Navigate Stand",
    "en": "Navigate Stand"
  },
  "Navigate to Location (Google Maps)": {
    "mr": "Navigate to Location (Google Maps)",
    "hi": "Navigate to Location (Google Maps)",
    "en": "Navigate to Location (Google Maps)"
  },
  "Near Panchavati Bridge, Pillar #12 (Sector 4)": {
    "mr": "Near पंचवटी पूल, Pillar #12 (विभाग 4)",
    "hi": "Near पंचवटी पुल, Pillar #12 (सेक्टर 4)",
    "en": "Near Panchavati Bridge, Pillar #12 (Sector 4)"
  },
  "Near you:": {
    "mr": "Near you:",
    "hi": "Near you:",
    "en": "Near you:"
  },
  "Nearest Municipal Help Points": {
    "mr": "Nearest महानगरपालिका मदत Points",
    "hi": "Nearest नगर निगम सहायता Points",
    "en": "Nearest Municipal Help Points"
  },
  "New": {
    "mr": "New",
    "hi": "New",
    "en": "New"
  },
  "New Requests (": {
    "mr": "New Requests (",
    "hi": "New Requests (",
    "en": "New Requests ("
  },
  "No QR Badge": {
    "mr": "No QR बिल्ला",
    "hi": "No QR बैज",
    "en": "No QR Badge"
  },
  "No Vendor Records Found": {
    "mr": "No विक्रेता Records Found",
    "hi": "No विक्रेता Records Found",
    "en": "No Vendor Records Found"
  },
  "No advance payment required.": {
    "mr": "No advance payment required.",
    "hi": "No advance payment required.",
    "en": "No advance payment required."
  },
  "No matching dockets found": {
    "mr": "No matching dockets found",
    "hi": "No matching dockets found",
    "en": "No matching dockets found"
  },
  "OK": {
    "mr": "OK",
    "hi": "OK",
    "en": "OK"
  },
  "Officer Enforcement Controls": {
    "mr": "अधिकारी Enforcement Controls",
    "hi": "अधिकारी Enforcement Controls",
    "en": "Officer Enforcement Controls"
  },
  "Official Cap Voucher": {
    "mr": "Official मर्यादा Voucher",
    "hi": "Official सीमा Voucher",
    "en": "Official Cap Voucher"
  },
  "Official Gazetted Cap": {
    "mr": "Official Gazetted मर्यादा",
    "hi": "Official Gazetted सीमा",
    "en": "Official Gazetted Cap"
  },
  "Official Kumbh Municipal Fair-Trade Certificate:": {
    "mr": "Official कुंभ महानगरपालिका वाजवी-Trade Certificate:",
    "hi": "Official कुंभ नगर निगम उचित-Trade Certificate:",
    "en": "Official Kumbh Municipal Fair-Trade Certificate:"
  },
  "Official Police Log": {
    "mr": "Official पोलीस Log",
    "hi": "Official पुलिस Log",
    "en": "Official Police Log"
  },
  "Official Simhastha Kumbh 2027 dispatch queue. Accept or reject incoming pilgrim tour bookings in real-time.": {
    "mr": "Official सिंहस्थ कुंभ 2027 dispatch queue. Accept or reject incoming भाविक tour नोंदणी in real-time.",
    "hi": "Official सिंहस्थ कुंभ 2027 dispatch queue. Accept or reject incoming तीर्थयात्री tour बुकिंग in real-time.",
    "en": "Official Simhastha Kumbh 2027 dispatch queue. Accept or reject incoming pilgrim tour bookings in real-time."
  },
  "Official license warning issued to vendor. Excess ₹40 directly refunded to pilgrim on site.": {
    "mr": "Official license इशारा issued to विक्रेता. Excess ₹40 directly refunded to भाविक on site.",
    "hi": "Official license चेतावनी issued to विक्रेता. Excess ₹40 directly refunded to तीर्थयात्री on site.",
    "en": "Official license warning issued to vendor. Excess ₹40 directly refunded to pilgrim on site."
  },
  "Official municipal rate cap: ₹450 / day": {
    "mr": "Official महानगरपालिका दर मर्यादा: ₹450 / दिवस",
    "hi": "Official नगर निगम दर सीमा: ₹450 / दिन",
    "en": "Official municipal rate cap: ₹450 / day"
  },
  "On Duty / Active Dispatch": {
    "mr": "On Duty / सक्रिय Dispatch",
    "hi": "On Duty / सक्रिय Dispatch",
    "en": "On Duty / Active Dispatch"
  },
  "On-site stall photo uploaded by Kumbhveer Rohan J.": {
    "mr": "On-site स्टॉल photo uploaded by कुंभवीर Rohan J.",
    "hi": "On-site स्टॉल photo uploaded by कुंभवीर Rohan J.",
    "en": "On-site stall photo uploaded by Kumbhveer Rohan J."
  },
  "Open for Yatris": {
    "mr": "Open for Yatris",
    "hi": "Open for Yatris",
    "en": "Open for Yatris"
  },
  "Open spatial cluster map and real-time overcharging triage stream.": {
    "mr": "Open spatial गट map and real-time जादा दर आकारणी triage stream.",
    "hi": "Open spatial क्लस्टर map and real-time अत्यधिक वसूली triage stream.",
    "en": "Open spatial cluster map and real-time overcharging triage stream."
  },
  "Operational Ledger": {
    "mr": "Operational Ledger",
    "hi": "Operational Ledger",
    "en": "Operational Ledger"
  },
  "Operational Snapshot": {
    "mr": "Operational Snapshot",
    "hi": "Operational Snapshot",
    "en": "Operational Snapshot"
  },
  "Order:": {
    "mr": "ऑर्डर:",
    "hi": "ऑर्डर:",
    "en": "Order:"
  },
  "Organized Auto Fare Extortion (+63% over gazette cap)": {
    "mr": "Organized रिक्षा Fare Extortion (+63% over gazette मर्यादा)",
    "hi": "Organized ऑटो Fare Extortion (+63% over gazette सीमा)",
    "en": "Organized Auto Fare Extortion (+63% over gazette cap)"
  },
  "Overcharging Flags & Inquiries": {
    "mr": "जादा दर आकारणी इशारे & Inquiries",
    "hi": "अत्यधिक वसूली चेतावनी & Inquiries",
    "en": "Overcharging Flags & Inquiries"
  },
  "Overcharging at Prasad Stall #18": {
    "mr": "जादा दर आकारणी at प्रसाद स्टॉल #18",
    "hi": "अत्यधिक वसूली at प्रसाद स्टॉल #18",
    "en": "Overcharging at Prasad Stall #18"
  },
  "Owner:": {
    "mr": "Owner:",
    "hi": "Owner:",
    "en": "Owner:"
  },
  "PA speaker alerts across all sectors": {
    "mr": "PA speaker alerts across all sectors",
    "hi": "PA speaker alerts across all sectors",
    "en": "PA speaker alerts across all sectors"
  },
  "PIB & Nashik Police Advisory Prepared": {
    "mr": "PIB & Nashik पोलीस Advisory Prepared",
    "hi": "PIB & Nashik पुलिस Advisory Prepared",
    "en": "PIB & Nashik Police Advisory Prepared"
  },
  "PIB Fact-Check & Public Broadcast": {
    "mr": "PIB Fact-Check & Public Broadcast",
    "hi": "PIB Fact-Check & Public Broadcast",
    "en": "PIB Fact-Check & Public Broadcast"
  },
  "PIB Fact-Check Maharashtra": {
    "mr": "PIB Fact-Check Maharashtra",
    "hi": "PIB Fact-Check Maharashtra",
    "en": "PIB Fact-Check Maharashtra"
  },
  "POL-NET INTRANET SECURE": {
    "mr": "POL-NET INTRANET SECURE",
    "hi": "POL-NET INTRANET SECURE",
    "en": "POL-NET INTRANET SECURE"
  },
  "PSI S. More": {
    "mr": "PSI S. More",
    "hi": "PSI S. More",
    "en": "PSI S. More"
  },
  "Paid & Received": {
    "mr": "Paid & Received",
    "hi": "Paid & Received",
    "en": "Paid & Received"
  },
  "Paired with MH-Govt Token Hub": {
    "mr": "Paired with MH-Govt टोकन Hub",
    "hi": "Paired with MH-Govt टोकन Hub",
    "en": "Paired with MH-Govt Token Hub"
  },
  "Panchavati Brassware & Puja Samagri": {
    "mr": "पंचवटी Brassware & पूजा साहित्य",
    "hi": "पंचवटी Brassware & पूजा सामग्री",
    "en": "Panchavati Brassware & Puja Samagri"
  },
  "Panchavati Brassware & Puja Stall #14": {
    "mr": "पंचवटी Brassware & पूजा स्टॉल #14",
    "hi": "पंचवटी Brassware & पूजा स्टॉल #14",
    "en": "Panchavati Brassware & Puja Stall #14"
  },
  "Panchavati Ghat cluster": {
    "mr": "पंचवटी घाट गट",
    "hi": "पंचवटी घाट क्लस्टर",
    "en": "Panchavati Ghat cluster"
  },
  "Panchavati Guest House": {
    "mr": "पंचवटी Guest House",
    "hi": "पंचवटी Guest House",
    "en": "Panchavati Guest House"
  },
  "Panchavati Heritage & Ramkund Snan Walk": {
    "mr": "पंचवटी Heritage & रामकुंड स्नान Walk",
    "hi": "पंचवटी Heritage & रामकुंड स्नान Walk",
    "en": "Panchavati Heritage & Ramkund Snan Walk"
  },
  "Panchavati Rapid Enforcement Unit (Patrol Van 112)": {
    "mr": "पंचवटी Rapid Enforcement Unit (गस्त पथक Van 112)",
    "hi": "पंचवटी Rapid Enforcement Unit (गश्ती दल Van 112)",
    "en": "Panchavati Rapid Enforcement Unit (Patrol Van 112)"
  },
  "Panchavati Sector 4 ·": {
    "mr": "पंचवटी विभाग 4 ·",
    "hi": "पंचवटी सेक्टर 4 ·",
    "en": "Panchavati Sector 4 ·"
  },
  "Panchavati Sector Squad 4 has been notified. A Kumbhveer squad will cross-verify rates at Godavari Yatri Niwas within 2 hours.": {
    "mr": "पंचवटी विभाग पथक 4 has been notified. A कुंभवीर पथक will cross-verify दर at गोदावरी भाविक Niwas within 2 तास.",
    "hi": "पंचवटी सेक्टर दस्ता 4 has been notified. A कुंभवीर दस्ता will cross-verify दरें at गोदावरी तीर्थयात्री Niwas within 2 घंटे.",
    "en": "Panchavati Sector Squad 4 has been notified. A Kumbhveer squad will cross-verify rates at Godavari Yatri Niwas within 2 hours."
  },
  "Paramedics, ICU boats & stretchers": {
    "mr": "Paramedics, ICU boats & stretchers",
    "hi": "Paramedics, ICU boats & stretchers",
    "en": "Paramedics, ICU boats & stretchers"
  },
  "Password (पासवर्ड)": {
    "mr": "पासवर्ड (पासवर्ड)",
    "hi": "पासवर्ड (पासवर्ड)",
    "en": "Password (पासवर्ड)"
  },
  "Patrol Priority Leaderboard": {
    "mr": "गस्त पथक Priority Leaderboard",
    "hi": "गश्ती दल Priority Leaderboard",
    "en": "Patrol Priority Leaderboard"
  },
  "Penalties Levied": {
    "mr": "Penalties Levied",
    "hi": "Penalties Levied",
    "en": "Penalties Levied"
  },
  "Pending Audit": {
    "mr": "प्रलंबित तपासणी",
    "hi": "लंबित जांच / ऑडिट",
    "en": "Pending Audit"
  },
  "Pending Reg.": {
    "mr": "प्रलंबित Reg.",
    "hi": "लंबित Reg.",
    "en": "Pending Reg."
  },
  "Personal Face Only:": {
    "mr": "Personal Face Only:",
    "hi": "Personal Face Only:",
    "en": "Personal Face Only:"
  },
  "Phase 2 of 4 Active": {
    "mr": "Phase 2 of 4 सक्रिय",
    "hi": "Phase 2 of 4 सक्रिय",
    "en": "Phase 2 of 4 Active"
  },
  "Phone Number *": {
    "mr": "फोन Number *",
    "hi": "फ़ोन Number *",
    "en": "Phone Number *"
  },
  "Photo On File": {
    "mr": "Photo On File",
    "hi": "Photo On File",
    "en": "Photo On File"
  },
  "Photo logged by Officer KV-12": {
    "mr": "Photo logged by अधिकारी KV-12",
    "hi": "Photo logged by अधिकारी KV-12",
    "en": "Photo logged by Officer KV-12"
  },
  "Picked up 42m ago": {
    "mr": "Picked up 42m ago",
    "hi": "Picked up 42m ago",
    "en": "Picked up 42m ago"
  },
  "Pickup Stand: 120m away": {
    "mr": "Pickup Stand: 120m away",
    "hi": "Pickup Stand: 120m away",
    "en": "Pickup Stand: 120m away"
  },
  "Pilgrim & Kumbhveer Logged": {
    "mr": "भाविक & कुंभवीर Logged",
    "hi": "तीर्थयात्री & कुंभवीर Logged",
    "en": "Pilgrim & Kumbhveer Logged"
  },
  "Pilgrim Satvik Dining Stall": {
    "mr": "भाविक सात्त्विक Dining स्टॉल",
    "hi": "तीर्थयात्री सात्विक Dining स्टॉल",
    "en": "Pilgrim Satvik Dining Stall"
  },
  "Pilgrim Yatri Niwas": {
    "mr": "भाविक भाविक Niwas",
    "hi": "तीर्थयात्री तीर्थयात्री Niwas",
    "en": "Pilgrim Yatri Niwas"
  },
  "Pilgrim:": {
    "mr": "भाविक:",
    "hi": "तीर्थयात्री:",
    "en": "Pilgrim:"
  },
  "Pole #C-18 (Online)": {
    "mr": "Pole #C-18 (Online)",
    "hi": "Pole #C-18 (Online)",
    "en": "Pole #C-18 (Online)"
  },
  "Police Badge No. / Officer ID": {
    "mr": "पोलीस बिल्ला No. / अधिकारी ओळख क्रमांक",
    "hi": "पुलिस बैज No. / अधिकारी पहचान संख्या",
    "en": "Police Badge No. / Officer ID"
  },
  "Police Command Control Center (Ashok Stambh HQ)": {
    "mr": "पोलीस Command Control Center (Ashok Stambh HQ)",
    "hi": "पुलिस Command Control Center (Ashok Stambh HQ)",
    "en": "Police Command Control Center (Ashok Stambh HQ)"
  },
  "Police Kiosk: 120m": {
    "mr": "पोलीस Kiosk: 120m",
    "hi": "पुलिस Kiosk: 120m",
    "en": "Police Kiosk: 120m"
  },
  "Police Settings": {
    "mr": "पोलीस सेटिंग्ज",
    "hi": "पुलिस सेटिंग्स",
    "en": "Police Settings"
  },
  "Pooja Deshmukh": {
    "mr": "Pooja Deshmukh",
    "hi": "Pooja Deshmukh",
    "en": "Pooja Deshmukh"
  },
  "Prepaid (UPI)": {
    "mr": "Prepaid (UPI)",
    "hi": "Prepaid (UPI)",
    "en": "Prepaid (UPI)"
  },
  "Price Flag & Grievance Review": {
    "mr": "दर इशारा & तक्रार पुनरावलोकन",
    "hi": "मूल्य चेतावनी & शिकायत समीक्षा",
    "en": "Price Flag & Grievance Review"
  },
  "Price Guidance & Reference Range": {
    "mr": "दर Guidance & Reference Range",
    "hi": "मूल्य Guidance & Reference Range",
    "en": "Price Guidance & Reference Range"
  },
  "Prices are indicative community ranges. Administration does not fix or guarantee individual vendor prices.": {
    "mr": "Prices are indicative community ranges. प्रशासन does not fix or guarantee individual विक्रेता prices.",
    "hi": "Prices are indicative community ranges. प्रशासन does not fix or guarantee individual विक्रेता prices.",
    "en": "Prices are indicative community ranges. Administration does not fix or guarantee individual vendor prices."
  },
  "Pricing Health": {
    "mr": "दर रचना Health",
    "hi": "मूल्य निर्धारण Health",
    "en": "Pricing Health"
  },
  "Pricing Structure:": {
    "mr": "दर रचना Structure:",
    "hi": "मूल्य निर्धारण Structure:",
    "en": "Pricing Structure:"
  },
  "Priority 2 • Field Surge": {
    "mr": "Priority 2 • Field Surge",
    "hi": "Priority 2 • Field Surge",
    "en": "Priority 2 • Field Surge"
  },
  "Priority 30–50 (High)": {
    "mr": "Priority 30–50 (उच्च / तीव्र)",
    "hi": "Priority 30–50 (उच्च / तीव्र)",
    "en": "Priority 30–50 (High)"
  },
  "Priority < 30 (Moderate)": {
    "mr": "Priority < 30 (मध्यम)",
    "hi": "Priority < 30 (मध्यम)",
    "en": "Priority < 30 (Moderate)"
  },
  "Priority > 50 (Critical)": {
    "mr": "Priority > 50 (Critical)",
    "hi": "Priority > 50 (Critical)",
    "en": "Priority > 50 (Critical)"
  },
  "Priya Sharma": {
    "mr": "Priya Sharma",
    "hi": "Priya Sharma",
    "en": "Priya Sharma"
  },
  "Protected": {
    "mr": "Protected",
    "hi": "Protected",
    "en": "Protected"
  },
  "Protected Law Enforcement Network": {
    "mr": "Protected Law Enforcement Network",
    "hi": "Protected Law Enforcement Network",
    "en": "Protected Law Enforcement Network"
  },
  "Puja Samagri": {
    "mr": "पूजा साहित्य",
    "hi": "पूजा सामग्री",
    "en": "Puja Samagri"
  },
  "Pure Copper Snan Kalash (1L)": {
    "mr": "Pure तांबे स्नान कळश (1L)",
    "hi": "Pure तांबा स्नान कलश (1L)",
    "en": "Pure Copper Snan Kalash (1L)"
  },
  "Push Notification Sync": {
    "mr": "Push Notification Sync",
    "hi": "Push Notification Sync",
    "en": "Push Notification Sync"
  },
  "Queue": {
    "mr": "Queue",
    "hi": "Queue",
    "en": "Queue"
  },
  "Queue barrier Gate 4B unsealed; steady pedestrian cycle restored with no incident.": {
    "mr": "Queue barrier प्रवेशद्वार 4B unsealed; steady pedestrian cycle restored with no incident.",
    "hi": "Queue barrier प्रवेश द्वार 4B unsealed; steady pedestrian cycle restored with no incident.",
    "en": "Queue barrier Gate 4B unsealed; steady pedestrian cycle restored with no incident."
  },
  "RO Filtered Water Provided Free": {
    "mr": "RO Filtered पाणी Provided Free",
    "hi": "RO Filtered जल / पानी Provided Free",
    "en": "RO Filtered Water Provided Free"
  },
  "RYK Science Inst. • 800m away": {
    "mr": "RYK Science Inst. • 800m away",
    "hi": "RYK Science Inst. • 800m away",
    "en": "RYK Science Inst. • 800m away"
  },
  "Radio Grid 2": {
    "mr": "Radio Grid 2",
    "hi": "Radio Grid 2",
    "en": "Radio Grid 2"
  },
  "Rahul Jadhav": {
    "mr": "Rahul Jadhav",
    "hi": "Rahul Jadhav",
    "en": "Rahul Jadhav"
  },
  "Rajendra B. Maheshwari": {
    "mr": "Rajendra B. Maheshwari",
    "hi": "Rajendra B. Maheshwari",
    "en": "Rajendra B. Maheshwari"
  },
  "Rajesh & Sunita Aggarwal": {
    "mr": "Rajesh & Sunita Aggarwal",
    "hi": "Rajesh & Sunita Aggarwal",
    "en": "Rajesh & Sunita Aggarwal"
  },
  "Rajesh Patel": {
    "mr": "Rajesh Patel",
    "hi": "Rajesh Patel",
    "en": "Rajesh Patel"
  },
  "Ramesh Sharma": {
    "mr": "Ramesh Sharma",
    "hi": "Ramesh Sharma",
    "en": "Ramesh Sharma"
  },
  "Rameshwar Kulkarni": {
    "mr": "Rameshwar Kulkarni",
    "hi": "Rameshwar Kulkarni",
    "en": "Rameshwar Kulkarni"
  },
  "Ramkund - Panchavati Field Verification Hub": {
    "mr": "रामकुंड - पंचवटी Field Verification Hub",
    "hi": "रामकुंड - पंचवटी Field Verification Hub",
    "en": "Ramkund - Panchavati Field Verification Hub"
  },
  "Ramkund Approach Lane": {
    "mr": "रामकुंड Approach Lane",
    "hi": "रामकुंड Approach Lane",
    "en": "Ramkund Approach Lane"
  },
  "Ramkund Evening Aarti Circuit": {
    "mr": "रामकुंड संध्याकाळ आरती Circuit",
    "hi": "रामकुंड शाम आरती Circuit",
    "en": "Ramkund Evening Aarti Circuit"
  },
  "Ramkund Ghat Central Hub": {
    "mr": "रामकुंड घाट Central Hub",
    "hi": "रामकुंड घाट Central Hub",
    "en": "Ramkund Ghat Central Hub"
  },
  "Ramkund Ghat Mobile Task Force": {
    "mr": "रामकुंड घाट मोबाईल Task Force",
    "hi": "रामकुंड घाट मोबाइल Task Force",
    "en": "Ramkund Ghat Mobile Task Force"
  },
  "Ramkund Lane": {
    "mr": "रामकुंड Lane",
    "hi": "रामकुंड Lane",
    "en": "Ramkund Lane"
  },
  "Ramkund Main Ghat (Sector 2)": {
    "mr": "रामकुंड Main घाट (विभाग 2)",
    "hi": "रामकुंड Main घाट (सेक्टर 2)",
    "en": "Ramkund Main Ghat (Sector 2)"
  },
  "Ramkund Main Ghat Meeting Point": {
    "mr": "रामकुंड Main घाट Meeting Point",
    "hi": "रामकुंड Main घाट Meeting Point",
    "en": "Ramkund Main Ghat Meeting Point"
  },
  "Ramkund Main Ghat Meeting Point (Near Panchavati Bridge Pillar #12)": {
    "mr": "रामकुंड Main घाट Meeting Point (Near पंचवटी पूल Pillar #12)",
    "hi": "रामकुंड Main घाट Meeting Point (Near पंचवटी पुल Pillar #12)",
    "en": "Ramkund Main Ghat Meeting Point (Near Panchavati Bridge Pillar #12)"
  },
  "Ramkund Main Steps": {
    "mr": "रामकुंड Main Steps",
    "hi": "रामकुंड Main Steps",
    "en": "Ramkund Main Steps"
  },
  "Ramkund North": {
    "mr": "रामकुंड North",
    "hi": "रामकुंड North",
    "en": "Ramkund North"
  },
  "Ramkund Sector 3": {
    "mr": "रामकुंड विभाग 3",
    "hi": "रामकुंड सेक्टर 3",
    "en": "Ramkund Sector 3"
  },
  "Ramkund Stand": {
    "mr": "रामकुंड Stand",
    "hi": "रामकुंड Stand",
    "en": "Ramkund Stand"
  },
  "Ramkund Steps Gate 2": {
    "mr": "रामकुंड Steps प्रवेशद्वार 2",
    "hi": "रामकुंड Steps प्रवेश द्वार 2",
    "en": "Ramkund Steps Gate 2"
  },
  "Ramkund West Bay #4 • Sector 2 Outpost": {
    "mr": "रामकुंड West Bay #4 • विभाग 2 Outpost",
    "hi": "रामकुंड West Bay #4 • सेक्टर 2 Outpost",
    "en": "Ramkund West Bay #4 • Sector 2 Outpost"
  },
  "Ramkund to Tapovan official circuit": {
    "mr": "रामकुंड to तपोवन official circuit",
    "hi": "रामकुंड to तपोवन official circuit",
    "en": "Ramkund to Tapovan official circuit"
  },
  "Rapid Patrol Dispatch": {
    "mr": "Rapid गस्त पथक Dispatch",
    "hi": "Rapid गश्ती दल Dispatch",
    "en": "Rapid Patrol Dispatch"
  },
  "Rate Card Capped": {
    "mr": "दर Card Capped",
    "hi": "दर Card Capped",
    "en": "Rate Card Capped"
  },
  "Rate confirmed by": {
    "mr": "दर confirmed by",
    "hi": "दर confirmed by",
    "en": "Rate confirmed by"
  },
  "Rates shown are community reference ranges and vendor-declared rates. Administration does not fix or guarantee prices.": {
    "mr": "दर shown are community reference ranges and विक्रेता-declared दर. प्रशासन does not fix or guarantee prices.",
    "hi": "दरें shown are community reference ranges and विक्रेता-declared दरें. प्रशासन does not fix or guarantee prices.",
    "en": "Rates shown are community reference ranges and vendor-declared rates. Administration does not fix or guarantee prices."
  },
  "Read Gazette Standard Operating Procedure": {
    "mr": "Read Gazette Standard Operating Procedure",
    "hi": "Read Gazette Standard Operating Procedure",
    "en": "Read Gazette Standard Operating Procedure"
  },
  "Ready for Pickup": {
    "mr": "Ready for Pickup",
    "hi": "Ready for Pickup",
    "en": "Ready for Pickup"
  },
  "Ready for audit": {
    "mr": "Ready for तपासणी",
    "hi": "Ready for जांच / ऑडिट",
    "en": "Ready for audit"
  },
  "Real-time Flow": {
    "mr": "Real-time Flow",
    "hi": "Real-time Flow",
    "en": "Real-time Flow"
  },
  "Real-time Telemetry": {
    "mr": "Real-time Telemetry",
    "hi": "Real-time Telemetry",
    "en": "Real-time Telemetry"
  },
  "Real-time fair-pricing enforcement data under the Nashik Municipal Act & Kumbh Area High-Power Committee directives.": {
    "mr": "Real-time वाजवी-दर रचना enforcement data under the Nashik महानगरपालिका Act & कुंभ Area उच्च / तीव्र-Power Committee directives.",
    "hi": "Real-time उचित-मूल्य निर्धारण enforcement data under the Nashik नगर निगम Act & कुंभ Area उच्च / तीव्र-Power Committee directives.",
    "en": "Real-time fair-pricing enforcement data under the Nashik Municipal Act & Kumbh Area High-Power Committee directives."
  },
  "Receive ticket number and police dispatch notification status.": {
    "mr": "Receive ticket number and पोलीस dispatch notification स्थिती.",
    "hi": "Receive ticket number and पुलिस dispatch notification स्थिति.",
    "en": "Receive ticket number and police dispatch notification status."
  },
  "Reference Benchmark (संदर्भ दर)": {
    "mr": "Reference प्रमाणक (संदर्भ दर)",
    "hi": "Reference मानक (संदर्भ दर)",
    "en": "Reference Benchmark (संदर्भ दर)"
  },
  "Refunded & Gazette Re-affirmed": {
    "mr": "Refunded & Gazette Re-affirmed",
    "hi": "Refunded & Gazette Re-affirmed",
    "en": "Refunded & Gazette Re-affirmed"
  },
  "Reg #NSK-2027-DH089": {
    "mr": "Reg #NSK-2027-DH089",
    "hi": "Reg #NSK-2027-DH089",
    "en": "Reg #NSK-2027-DH089"
  },
  "Register Guide (Camera AR)": {
    "mr": "नोंदणी करा मार्गदर्शक (Camera AR)",
    "hi": "पंजीकरण करें गाइड (Camera AR)",
    "en": "Register Guide (Camera AR)"
  },
  "Register Local Guide": {
    "mr": "नोंदणी करा Local मार्गदर्शक",
    "hi": "पंजीकरण करें Local गाइड",
    "en": "Register Local Guide"
  },
  "Register with": {
    "mr": "नोंदणी करा with",
    "hi": "पंजीकरण करें with",
    "en": "Register with"
  },
  "Relinquish Shift Post?": {
    "mr": "Relinquish Shift Post?",
    "hi": "Relinquish Shift Post?",
    "en": "Relinquish Shift Post?"
  },
  "Reply to Yatri": {
    "mr": "Reply to भाविक",
    "hi": "Reply to तीर्थयात्री",
    "en": "Reply to Yatri"
  },
  "Report Registered #KS-8492": {
    "mr": "तक्रार / अहवाल Registered #KS-8492",
    "hi": "शिकायत / रिपोर्ट Registered #KS-8492",
    "en": "Report Registered #KS-8492"
  },
  "Report incorrect price": {
    "mr": "तक्रार / अहवाल incorrect दर",
    "hi": "शिकायत / रिपोर्ट incorrect मूल्य",
    "en": "Report incorrect price"
  },
  "Reported 1h 15m ago": {
    "mr": "Reported 1h 15m ago",
    "hi": "Reported 1h 15m ago",
    "en": "Reported 1h 15m ago"
  },
  "Reported 24m ago": {
    "mr": "Reported 24m ago",
    "hi": "Reported 24m ago",
    "en": "Reported 24m ago"
  },
  "Reported Rate": {
    "mr": "Reported दर",
    "hi": "Reported दर",
    "en": "Reported Rate"
  },
  "Reported Transporter": {
    "mr": "Reported Transporter",
    "hi": "Reported Transporter",
    "en": "Reported Transporter"
  },
  "Reported Violation:": {
    "mr": "Reported Violation:",
    "hi": "Reported Violation:",
    "en": "Reported Violation:"
  },
  "Reported by Yatris": {
    "mr": "Reported by Yatris",
    "hi": "Reported by Yatris",
    "en": "Reported by Yatris"
  },
  "Reporting desk opened": {
    "mr": "Reporting कक्ष opened",
    "hi": "Reporting कक्ष opened",
    "en": "Reporting desk opened"
  },
  "Request Guide": {
    "mr": "Request मार्गदर्शक",
    "hi": "Request गाइड",
    "en": "Request Guide"
  },
  "Request Resubmission": {
    "mr": "Request Resubmission",
    "hi": "Request Resubmission",
    "en": "Request Resubmission"
  },
  "Request Ride": {
    "mr": "Request Ride",
    "hi": "Request Ride",
    "en": "Request Ride"
  },
  "Required": {
    "mr": "Required",
    "hi": "Required",
    "en": "Required"
  },
  "Resend Token": {
    "mr": "Resend टोकन",
    "hi": "Resend टोकन",
    "en": "Resend Token"
  },
  "Reservation saved for offline access!": {
    "mr": "Reservation saved for offline access!",
    "hi": "Reservation saved for offline access!",
    "en": "Reservation saved for offline access!"
  },
  "Reserve Table": {
    "mr": "Reserve Table",
    "hi": "Reserve Table",
    "en": "Reserve Table"
  },
  "Reset All Filters": {
    "mr": "Reset All Filters",
    "hi": "Reset All Filters",
    "en": "Reset All Filters"
  },
  "Reset Filters": {
    "mr": "Reset Filters",
    "hi": "Reset Filters",
    "en": "Reset Filters"
  },
  "Resolve / Impound": {
    "mr": "Resolve / Impound",
    "hi": "Resolve / Impound",
    "en": "Resolve / Impound"
  },
  "Resolved 3h ago": {
    "mr": "निकाली काढले 3h ago",
    "hi": "सुलझाया गया 3h ago",
    "en": "Resolved 3h ago"
  },
  "Resolved ✓": {
    "mr": "निकाली काढले ✓",
    "hi": "सुलझाया गया ✓",
    "en": "Resolved ✓"
  },
  "Restricted access for field officers, beat inspectors & designated civic magistrates.": {
    "mr": "Restricted access for field officers, beat inspectors & designated नागरी magistrates.",
    "hi": "Restricted access for field officers, beat inspectors & designated नागरिक magistrates.",
    "en": "Restricted access for field officers, beat inspectors & designated civic magistrates."
  },
  "Resubmission Notice": {
    "mr": "Resubmission सूचना",
    "hi": "Resubmission नोटिस",
    "en": "Resubmission Notice"
  },
  "Review": {
    "mr": "पुनरावलोकन",
    "hi": "समीक्षा",
    "en": "Review"
  },
  "Review Flag": {
    "mr": "पुनरावलोकन इशारा",
    "hi": "समीक्षा चेतावनी",
    "en": "Review Flag"
  },
  "Revised rate schedule verified 04:00 hrs today": {
    "mr": "Revised दर schedule प्रमाणित 04:00 hrs आज",
    "hi": "Revised दर schedule सत्यापित 04:00 hrs आज",
    "en": "Revised rate schedule verified 04:00 hrs today"
  },
  "Reward Credits Active": {
    "mr": "Reward Credits सक्रिय",
    "hi": "Reward Credits सक्रिय",
    "en": "Reward Credits Active"
  },
  "River police divers & lifebuoy units": {
    "mr": "नदी पोलीस divers & lifebuoy units",
    "hi": "नदी पुलिस divers & lifebuoy units",
    "en": "River police divers & lifebuoy units"
  },
  "Rohit Deshmukh": {
    "mr": "Rohit Deshmukh",
    "hi": "Rohit Deshmukh",
    "en": "Rohit Deshmukh"
  },
  "Room & Yatris": {
    "mr": "खोली & Yatris",
    "hi": "कमरा & Yatris",
    "en": "Room & Yatris"
  },
  "Room Inventory": {
    "mr": "खोली Inventory",
    "hi": "कमरा Inventory",
    "en": "Room Inventory"
  },
  "Route": {
    "mr": "मार्ग",
    "hi": "मार्ग",
    "en": "Route"
  },
  "Rumor: Stampede Alert near Tapovan": {
    "mr": "Rumor: Stampede दक्षता इशारा near तपोवन",
    "hi": "Rumor: Stampede अलर्ट near तपोवन",
    "en": "Rumor: Stampede Alert near Tapovan"
  },
  "SEC-04": {
    "mr": "SEC-04",
    "hi": "SEC-04",
    "en": "SEC-04"
  },
  "SMS द्वारे माहितीसाठी": {
    "mr": "SMS द्वारे माहितीसाठी",
    "hi": "SMS द्वारे माहितीसाठी",
    "en": "SMS द्वारे माहितीसाठी"
  },
  "SOS Dispatch": {
    "mr": "तातडीची मदत (SOS) Dispatch",
    "hi": "तत्काल सहायता (SOS) Dispatch",
    "en": "SOS Dispatch"
  },
  "SOS-8987": {
    "mr": "SOS-8987",
    "hi": "SOS-8987",
    "en": "SOS-8987"
  },
  "SOS-9041": {
    "mr": "SOS-9041",
    "hi": "SOS-9041",
    "en": "SOS-9041"
  },
  "Sacred Vessels": {
    "mr": "Sacred Vessels",
    "hi": "Sacred Vessels",
    "en": "Sacred Vessels"
  },
  "Sai Auto Stand": {
    "mr": "Sai रिक्षा Stand",
    "hi": "Sai ऑटो Stand",
    "en": "Sai Auto Stand"
  },
  "Sai Auto Stand (Bay 4)": {
    "mr": "Sai रिक्षा Stand (Bay 4)",
    "hi": "Sai ऑटो Stand (Bay 4)",
    "en": "Sai Auto Stand (Bay 4)"
  },
  "Sai Auto Stand (Bay 4, Ramkund West)": {
    "mr": "Sai रिक्षा Stand (Bay 4, रामकुंड West)",
    "hi": "Sai ऑटो Stand (Bay 4, रामकुंड West)",
    "en": "Sai Auto Stand (Bay 4, Ramkund West)"
  },
  "Sandip University Engg. • 14 audits": {
    "mr": "Sandip University Engg. • 14 audits",
    "hi": "Sandip University Engg. • 14 audits",
    "en": "Sandip University Engg. • 14 audits"
  },
  "Sanitation & Ghat Amenities": {
    "mr": "स्वच्छता & घाट Amenities",
    "hi": "स्वच्छता & घाट Amenities",
    "en": "Sanitation & Ghat Amenities"
  },
  "Satvik Meals Reserved": {
    "mr": "सात्त्विक Meals Reserved",
    "hi": "सात्विक Meals Reserved",
    "en": "Satvik Meals Reserved"
  },
  "Satvik Meals ₹60": {
    "mr": "सात्त्विक Meals ₹60",
    "hi": "सात्विक Meals ₹60",
    "en": "Satvik Meals ₹60"
  },
  "Satvik Pure Veg": {
    "mr": "सात्त्विक Pure Veg",
    "hi": "सात्विक Pure Veg",
    "en": "Satvik Pure Veg"
  },
  "Scan Thumb": {
    "mr": "Scan Thumb",
    "hi": "Scan Thumb",
    "en": "Scan Thumb"
  },
  "Search docket #, vendor, plate, officer...": {
    "mr": "शोधा docket #, विक्रेता, plate, अधिकारी...",
    "hi": "खोजें docket #, विक्रेता, plate, अधिकारी...",
    "en": "Search docket #, vendor, plate, officer..."
  },
  "Search establishment name or ghat location": {
    "mr": "शोधा establishment नाव or घाट location",
    "hi": "खोजें establishment नाम or घाट location",
    "en": "Search establishment name or ghat location"
  },
  "Search routes, stays, thalis, or guides...": {
    "mr": "शोधा routes, मुक्काम, thalis, or मार्गदर्शक...",
    "hi": "खोजें routes, आवास, thalis, or गाइड...",
    "en": "Search routes, stays, thalis, or guides..."
  },
  "Search shop, stall, guide name, token ID...": {
    "mr": "शोधा दुकान, स्टॉल, मार्गदर्शक नाव, टोकन ओळख क्रमांक...",
    "hi": "खोजें दुकान, स्टॉल, गाइड नाम, टोकन पहचान संख्या...",
    "en": "Search shop, stall, guide name, token ID..."
  },
  "Section 14-B requires every active stall to exhibit the official stamped bilingual QR card. Unverified or overcharging entities face immediate temporary permit suspension.": {
    "mr": "Section 14-B requires every सक्रिय स्टॉल to exhibit the official stamped bilingual QR card. Unverified or जादा दर आकारणी entities face immediate temporary permit suspension.",
    "hi": "Section 14-B requires every सक्रिय स्टॉल to exhibit the official stamped bilingual QR card. Unverified or अत्यधिक वसूली entities face immediate temporary permit suspension.",
    "en": "Section 14-B requires every active stall to exhibit the official stamped bilingual QR card. Unverified or overcharging entities face immediate temporary permit suspension."
  },
  "Section 144 Municipal Price Protection Gazette Live Monitoring": {
    "mr": "Section 144 महानगरपालिका दर Protection Gazette थेट Monitoring",
    "hi": "Section 144 नगर निगम मूल्य Protection Gazette लाइव Monitoring",
    "en": "Section 144 Municipal Price Protection Gazette Live Monitoring"
  },
  "Sector 02-B High Vigilance": {
    "mr": "विभाग 02-B उच्च / तीव्र Vigilance",
    "hi": "सेक्टर 02-B उच्च / तीव्र Vigilance",
    "en": "Sector 02-B High Vigilance"
  },
  "Sector 1 — Tapovan Transit Camp & North Ridge": {
    "mr": "विभाग 1 — तपोवन वाहतूक Camp & North Ridge",
    "hi": "सेक्टर 1 — तपोवन परिवहन Camp & North Ridge",
    "en": "Sector 1 — Tapovan Transit Camp & North Ridge"
  },
  "Sector 2 Beat 4 Flying Squad Alpha (2 bikes, 4 officers)": {
    "mr": "विभाग 2 Beat 4 Flying पथक Alpha (2 bikes, 4 officers)",
    "hi": "सेक्टर 2 Beat 4 Flying दस्ता Alpha (2 bikes, 4 officers)",
    "en": "Sector 2 Beat 4 Flying Squad Alpha (2 bikes, 4 officers)"
  },
  "Sector 2 Command Connected": {
    "mr": "विभाग 2 Command Connected",
    "hi": "सेक्टर 2 Command Connected",
    "en": "Sector 2 Command Connected"
  },
  "Sector 2 Command Post (Ramkund Central Ghats)": {
    "mr": "विभाग 2 Command Post (रामकुंड Central घाट)",
    "hi": "सेक्टर 2 Command Post (रामकुंड Central घाट)",
    "en": "Sector 2 Command Post (Ramkund Central Ghats)"
  },
  "Sector 2 Desk • Duty Active (Shift B)": {
    "mr": "विभाग 2 कक्ष • Duty सक्रिय (Shift B)",
    "hi": "सेक्टर 2 कक्ष • Duty सक्रिय (Shift B)",
    "en": "Sector 2 Desk • Duty Active (Shift B)"
  },
  "Sector 2 Heatmap": {
    "mr": "विभाग 2 Heatmap",
    "hi": "सेक्टर 2 Heatmap",
    "en": "Sector 2 Heatmap"
  },
  "Sector 2 Ramkund": {
    "mr": "विभाग 2 रामकुंड",
    "hi": "सेक्टर 2 रामकुंड",
    "en": "Sector 2 Ramkund"
  },
  "Sector 2 — Ramkund & Panchavati Outpost": {
    "mr": "विभाग 2 — रामकुंड & पंचवटी Outpost",
    "hi": "सेक्टर 2 — रामकुंड & पंचवटी Outpost",
    "en": "Sector 2 — Ramkund & Panchavati Outpost"
  },
  "Sector 3 Benchmark (₹800-₹900)": {
    "mr": "विभाग 3 प्रमाणक (₹800-₹900)",
    "hi": "सेक्टर 3 मानक (₹800-₹900)",
    "en": "Sector 3 Benchmark (₹800-₹900)"
  },
  "Sector 3 — Laxman Kund & Godavari Ghat Center": {
    "mr": "विभाग 3 — Laxman कुंड & गोदावरी घाट Center",
    "hi": "सेक्टर 3 — Laxman कुंड & गोदावरी घाट Center",
    "en": "Sector 3 — Laxman Kund & Godavari Ghat Center"
  },
  "Sector 4 Registry Desk": {
    "mr": "विभाग 4 Registry कक्ष",
    "hi": "सेक्टर 4 Registry कक्ष",
    "en": "Sector 4 Registry Desk"
  },
  "Sector 4 Transit Gate": {
    "mr": "विभाग 4 वाहतूक प्रवेशद्वार",
    "hi": "सेक्टर 4 परिवहन प्रवेश द्वार",
    "en": "Sector 4 Transit Gate"
  },
  "Sector 4 — Trimbakeshwar High-Capacity Corridor": {
    "mr": "विभाग 4 — त्र्यंबकेश्वर उच्च / तीव्र-Capacity Corridor",
    "hi": "सेक्टर 4 — त्र्यंबकेश्वर उच्च / तीव्र-Capacity Corridor",
    "en": "Sector 4 — Trimbakeshwar High-Capacity Corridor"
  },
  "Sector 4, Trimbak Road, Old Camp Zone": {
    "mr": "विभाग 4, Trimbak Road, Old Camp विभाग",
    "hi": "सेक्टर 4, Trimbak Road, Old Camp ज़ोन",
    "en": "Sector 4, Trimbak Road, Old Camp Zone"
  },
  "Sector 5 — Nashik Road Railway Holding Area": {
    "mr": "विभाग 5 — Nashik Road Railway Holding Area",
    "hi": "सेक्टर 5 — Nashik Road Railway Holding Area",
    "en": "Sector 5 — Nashik Road Railway Holding Area"
  },
  "Sector Feed": {
    "mr": "विभाग Feed",
    "hi": "सेक्टर Feed",
    "en": "Sector Feed"
  },
  "Secured with Supabase Auth & TLS Encryption": {
    "mr": "Secured with Supabase Auth & TLS Encryption",
    "hi": "Secured with Supabase Auth & TLS Encryption",
    "en": "Secured with Supabase Auth & TLS Encryption"
  },
  "Select Stall / Product Photo": {
    "mr": "Select स्टॉल / Product Photo",
    "hi": "Select स्टॉल / Product Photo",
    "en": "Select Stall / Product Photo"
  },
  "Select Your Role (तुमची भूमिका निवडा)": {
    "mr": "Select Your Role (तुमची भूमिका निवडा)",
    "hi": "Select Your Role (तुमची भूमिका निवडा)",
    "en": "Select Your Role (तुमची भूमिका निवडा)"
  },
  "Select an available on-ground volunteer for in-person kitchen inspection at": {
    "mr": "Select an available on-ground volunteer for in-person kitchen inspection at",
    "hi": "Select an available on-ground volunteer for in-person kitchen inspection at",
    "en": "Select an available on-ground volunteer for in-person kitchen inspection at"
  },
  "Select image from gallery or documents (No live camera needed)": {
    "mr": "Select image from gallery or documents (No थेट camera needed)",
    "hi": "Select image from gallery or documents (No लाइव camera needed)",
    "en": "Select image from gallery or documents (No live camera needed)"
  },
  "Send SMS Notice": {
    "mr": "Send SMS सूचना",
    "hi": "Send SMS नोटिस",
    "en": "Send SMS Notice"
  },
  "Sending direct municipal SMS & portal notification to vendor contact regarding deficiency:": {
    "mr": "Sending direct महानगरपालिका SMS & portal notification to विक्रेता contact regarding deficiency:",
    "hi": "Sending direct नगर निगम SMS & portal notification to विक्रेता contact regarding deficiency:",
    "en": "Sending direct municipal SMS & portal notification to vendor contact regarding deficiency:"
  },
  "Session terminates secure field radio binding. Sector 2 desk will be notified.": {
    "mr": "Session terminates secure field radio binding. विभाग 2 कक्ष will be notified.",
    "hi": "Session terminates secure field radio binding. सेक्टर 2 कक्ष will be notified.",
    "en": "Session terminates secure field radio binding. Sector 2 desk will be notified."
  },
  "Set Drop-off": {
    "mr": "Set Drop-off",
    "hi": "Set Drop-off",
    "en": "Set Drop-off"
  },
  "Set your rate within or close to the estimated fair range.": {
    "mr": "Set your दर within or close to the अंदाजित वाजवी range.",
    "hi": "Set your दर within or close to the अनुमानित उचित range.",
    "en": "Set your rate within or close to the estimated fair range."
  },
  "Share via SMS": {
    "mr": "Share via SMS",
    "hi": "Share via SMS",
    "en": "Share via SMS"
  },
  "Shift Schedule": {
    "mr": "Shift Schedule",
    "hi": "Shift Schedule",
    "en": "Shift Schedule"
  },
  "Show Stall & Registration Details": {
    "mr": "Show स्टॉल & नोंदणी तपशील",
    "hi": "Show स्टॉल & पंजीकरण विवरण",
    "en": "Show Stall & Registration Details"
  },
  "Show-Cause Pending": {
    "mr": "Show-Cause प्रलंबित",
    "hi": "Show-Cause लंबित",
    "en": "Show-Cause Pending"
  },
  "Showing official records verified by Nashik Municipal Police Desk.": {
    "mr": "Showing official records प्रमाणित by Nashik महानगरपालिका पोलीस कक्ष.",
    "hi": "Showing official records सत्यापित by Nashik नगर निगम पुलिस कक्ष.",
    "en": "Showing official records verified by Nashik Municipal Police Desk."
  },
  "Shri Balaji Shared Auto Stand #12": {
    "mr": "Shri Balaji Shared रिक्षा Stand #12",
    "hi": "Shri Balaji Shared ऑटो Stand #12",
    "en": "Shri Balaji Shared Auto Stand #12"
  },
  "Shri Krishna Pure Veg Bhojanalaya": {
    "mr": "Shri Krishna Pure Veg भोजनालय",
    "hi": "Shri Krishna Pure Veg भोजनालय",
    "en": "Shri Krishna Pure Veg Bhojanalaya"
  },
  "Simhastha 2027 Field Node": {
    "mr": "सिंहस्थ 2027 Field Node",
    "hi": "सिंहस्थ 2027 Field Node",
    "en": "Simhastha 2027 Field Node"
  },
  "Simhastha Day 4": {
    "mr": "सिंहस्थ दिवस 4",
    "hi": "सिंहस्थ दिन 4",
    "en": "Simhastha Day 4"
  },
  "Simhastha Estimated Fair Range:": {
    "mr": "सिंहस्थ अंदाजित वाजवी Range:",
    "hi": "सिंहस्थ अनुमानित उचित Range:",
    "en": "Simhastha Estimated Fair Range:"
  },
  "Simhastha Kumbh Bazaar": {
    "mr": "सिंहस्थ कुंभ बाजार",
    "hi": "सिंहस्थ कुंभ बाज़ार",
    "en": "Simhastha Kumbh Bazaar"
  },
  "Simhastha Municipal Digital Protocol 4.2 Secured": {
    "mr": "सिंहस्थ महानगरपालिका Digital Protocol 4.2 Secured",
    "hi": "सिंहस्थ नगर निगम Digital Protocol 4.2 Secured",
    "en": "Simhastha Municipal Digital Protocol 4.2 Secured"
  },
  "Simhastha Parvani Protocol active. Fair-Price Act enforcement order #NSK-2024-884 is strictly in effect across all 14 Ghat sectors.": {
    "mr": "सिंहस्थ Parvani Protocol सक्रिय. वाजवी-दर Act enforcement ऑर्डर #NSK-2024-884 is strictly in effect across all 14 घाट sectors.",
    "hi": "सिंहस्थ Parvani Protocol सक्रिय. उचित-मूल्य Act enforcement ऑर्डर #NSK-2024-884 is strictly in effect across all 14 घाट sectors.",
    "en": "Simhastha Parvani Protocol active. Fair-Price Act enforcement order #NSK-2024-884 is strictly in effect across all 14 Ghat sectors."
  },
  "Sita Gufa Chowk, Ghat Approach Road": {
    "mr": "Sita Gufa Chowk, घाट Approach Road",
    "hi": "Sita Gufa Chowk, घाट Approach Road",
    "en": "Sita Gufa Chowk, Ghat Approach Road"
  },
  "Sita Gufa Lane": {
    "mr": "Sita Gufa Lane",
    "hi": "Sita Gufa Lane",
    "en": "Sita Gufa Lane"
  },
  "Sita Gumpha Gate 1": {
    "mr": "Sita Gumpha प्रवेशद्वार 1",
    "hi": "Sita Gumpha प्रवेश द्वार 1",
    "en": "Sita Gumpha Gate 1"
  },
  "Slip & Fare Meter Evidence": {
    "mr": "Slip & Fare Meter Evidence",
    "hi": "Slip & Fare Meter Evidence",
    "en": "Slip & Fare Meter Evidence"
  },
  "Smt. Meenakshi Sundaram": {
    "mr": "Smt. Meenakshi Sundaram",
    "hi": "Smt. Meenakshi Sundaram",
    "en": "Smt. Meenakshi Sundaram"
  },
  "Social Media Clip": {
    "mr": "Social Media Clip",
    "hi": "Social Media Clip",
    "en": "Social Media Clip"
  },
  "Social Media Intelligence Grid (7.4k shares)": {
    "mr": "Social Media Intelligence Grid (7.4k shares)",
    "hi": "Social Media Intelligence Grid (7.4k shares)",
    "en": "Social Media Intelligence Grid (7.4k shares)"
  },
  "Solar Hot Water • Luggage Lockers": {
    "mr": "Solar Hot पाणी • Luggage Lockers",
    "hi": "Solar Hot जल / पानी • Luggage Lockers",
    "en": "Solar Hot Water • Luggage Lockers"
  },
  "Source: System Rate Scrape & Kumbhveer Spot Check": {
    "mr": "Source: System दर Scrape & कुंभवीर Spot Check",
    "hi": "Source: System दर Scrape & कुंभवीर Spot Check",
    "en": "Source: System Rate Scrape & Kumbhveer Spot Check"
  },
  "Spherical Haversine (ε=120m)": {
    "mr": "Spherical Haversine (ε=120m)",
    "hi": "Spherical Haversine (ε=120m)",
    "en": "Spherical Haversine (ε=120m)"
  },
  "Spiritual Items": {
    "mr": "Spiritual Items",
    "hi": "Spiritual Items",
    "en": "Spiritual Items"
  },
  "Stall / Vendor Name": {
    "mr": "स्टॉल / विक्रेता नाव",
    "hi": "स्टॉल / विक्रेता नाम",
    "en": "Stall / Vendor Name"
  },
  "Stall Audited": {
    "mr": "स्टॉल तपासणी केली",
    "hi": "स्टॉल जांच की गई",
    "en": "Stall Audited"
  },
  "Stall Category:": {
    "mr": "स्टॉल Category:",
    "hi": "स्टॉल Category:",
    "en": "Stall Category:"
  },
  "Stall Inventory & Estimated Fair Ranges": {
    "mr": "स्टॉल Inventory & अंदाजित वाजवी Ranges",
    "hi": "स्टॉल Inventory & अनुमानित उचित Ranges",
    "en": "Stall Inventory & Estimated Fair Ranges"
  },
  "Stall Products": {
    "mr": "स्टॉल Products",
    "hi": "स्टॉल Products",
    "en": "Stall Products"
  },
  "Standard Dorm Bed mismatch. Asking ₹650/night offline; registered Simhastha Portal cap ₹350/night.": {
    "mr": "Standard डॉर्मिटरी Bed mismatch. Asking ₹650/रात्र offline; registered सिंहस्थ Portal मर्यादा ₹350/रात्र.",
    "hi": "Standard डॉर्मिटरी Bed mismatch. Asking ₹650/रात offline; registered सिंहस्थ Portal सीमा ₹350/रात.",
    "en": "Standard Dorm Bed mismatch. Asking ₹650/night offline; registered Simhastha Portal cap ₹350/night."
  },
  "Standard Dorm bed priced at": {
    "mr": "Standard डॉर्मिटरी bed priced at",
    "hi": "Standard डॉर्मिटरी bed priced at",
    "en": "Standard Dorm bed priced at"
  },
  "Standard Double Room": {
    "mr": "Standard Double खोली",
    "hi": "Standard Double कमरा",
    "en": "Standard Double Room"
  },
  "Standard Non-AC · 2 Guests": {
    "mr": "Standard Non-AC · 2 Guests",
    "hi": "Standard Non-AC · 2 Guests",
    "en": "Standard Non-AC · 2 Guests"
  },
  "Standardized meter & prepaid coupon": {
    "mr": "Standardized meter & prepaid coupon",
    "hi": "Standardized meter & prepaid coupon",
    "en": "Standardized meter & prepaid coupon"
  },
  "Start Camera": {
    "mr": "Start Camera",
    "hi": "Start Camera",
    "en": "Start Camera"
  },
  "Statutory Audit": {
    "mr": "Statutory तपासणी",
    "hi": "Statutory जांच / ऑडिट",
    "en": "Statutory Audit"
  },
  "Statutory Gazette Feed • NMC Apex Oversight": {
    "mr": "Statutory Gazette Feed • NMC Apex Oversight",
    "hi": "Statutory Gazette Feed • NMC Apex Oversight",
    "en": "Statutory Gazette Feed • NMC Apex Oversight"
  },
  "Stay Tariff Gap": {
    "mr": "मुक्काम दरपत्रक Gap",
    "hi": "आवास दर सूची Gap",
    "en": "Stay Tariff Gap"
  },
  "Stay calm. If crowd surges occur, proceed away from the river barricade toward Panchavati Main Square or contact any Kumbhveer squad.": {
    "mr": "मुक्काम calm. If crowd surges occur, proceed away from the नदी barricade toward पंचवटी Main Square or contact any कुंभवीर पथक.",
    "hi": "आवास calm. If crowd surges occur, proceed away from the नदी barricade toward पंचवटी Main Square or contact any कुंभवीर दस्ता.",
    "en": "Stay calm. If crowd surges occur, proceed away from the river barricade toward Panchavati Main Square or contact any Kumbhveer squad."
  },
  "Strictly authorized personnel only. System activity logged, geo-tagged, and monitored under the Maharashtra Police Act, 1951 & IT Act 2000.": {
    "mr": "Strictly authorized personnel only. System activity logged, geo-tagged, and monitored under the Maharashtra पोलीस Act, 1951 & IT Act 2000.",
    "hi": "Strictly authorized personnel only. System activity logged, geo-tagged, and monitored under the Maharashtra पुलिस Act, 1951 & IT Act 2000.",
    "en": "Strictly authorized personnel only. System activity logged, geo-tagged, and monitored under the Maharashtra Police Act, 1951 & IT Act 2000."
  },
  "Students on field": {
    "mr": "Students on field",
    "hi": "Students on field",
    "en": "Students on field"
  },
  "Subject escorted out, ₹500 penalty receipt logged, barred from sanctum ghat sector.": {
    "mr": "Subject escorted out, ₹500 penalty receipt logged, barred from sanctum घाट विभाग.",
    "hi": "Subject escorted out, ₹500 penalty receipt logged, barred from sanctum घाट सेक्टर.",
    "en": "Subject escorted out, ₹500 penalty receipt logged, barred from sanctum ghat sector."
  },
  "Submit Civic Report (तक्रार दाखल करा)": {
    "mr": "सादर करा नागरी तक्रार / अहवाल (तक्रार दाखल करा)",
    "hi": "सबमिट करें नागरिक शिकायत / रिपोर्ट (तक्रार दाखल करा)",
    "en": "Submit Civic Report (तक्रार दाखल करा)"
  },
  "Submit to Dossier": {
    "mr": "सादर करा to Dossier",
    "hi": "सबमिट करें to Dossier",
    "en": "Submit to Dossier"
  },
  "Sunil Joshi": {
    "mr": "Sunil Joshi",
    "hi": "Sunil Joshi",
    "en": "Sunil Joshi"
  },
  "Sunita Deshmukh": {
    "mr": "Sunita Deshmukh",
    "hi": "Sunita Deshmukh",
    "en": "Sunita Deshmukh"
  },
  "Supabase Auth": {
    "mr": "Supabase Auth",
    "hi": "Supabase Auth",
    "en": "Supabase Auth"
  },
  "Suresh Kulkarni": {
    "mr": "Suresh Kulkarni",
    "hi": "Suresh Kulkarni",
    "en": "Suresh Kulkarni"
  },
  "Suresh Kulkarni (Panchavati Heritage)": {
    "mr": "Suresh Kulkarni (पंचवटी Heritage)",
    "hi": "Suresh Kulkarni (पंचवटी Heritage)",
    "en": "Suresh Kulkarni (Panchavati Heritage)"
  },
  "Suresh M.": {
    "mr": "Suresh M.",
    "hi": "Suresh M.",
    "en": "Suresh M."
  },
  "System Flag": {
    "mr": "System इशारा",
    "hi": "System चेतावनी",
    "en": "System Flag"
  },
  "Tap to open camera or gallery (JPG, PNG)": {
    "mr": "Tap to open camera or gallery (JPG, PNG)",
    "hi": "Tap to open camera or gallery (JPG, PNG)",
    "en": "Tap to open camera or gallery (JPG, PNG)"
  },
  "Tapovan Bus Terminus to Ghat Gate 3": {
    "mr": "तपोवन बस Terminus to घाट प्रवेशद्वार 3",
    "hi": "तपोवन बस Terminus to घाट प्रवेश द्वार 3",
    "en": "Tapovan Bus Terminus to Ghat Gate 3"
  },
  "Tapovan Lane 3": {
    "mr": "तपोवन Lane 3",
    "hi": "तपोवन Lane 3",
    "en": "Tapovan Lane 3"
  },
  "Tapovan Parking Zone 2": {
    "mr": "तपोवन Parking विभाग 2",
    "hi": "तपोवन Parking ज़ोन 2",
    "en": "Tapovan Parking Zone 2"
  },
  "Tapovan Shed 4": {
    "mr": "तपोवन Shed 4",
    "hi": "तपोवन Shed 4",
    "en": "Tapovan Shed 4"
  },
  "Tapovan, Sita Gumpha & Laxman Rekha": {
    "mr": "तपोवन, Sita Gumpha & Laxman Rekha",
    "hi": "तपोवन, Sita Gumpha & Laxman Rekha",
    "en": "Tapovan, Sita Gumpha & Laxman Rekha"
  },
  "Target Hotspot:": {
    "mr": "Target गर्दी केंद्र:",
    "hi": "Target भीड़ केंद्र:",
    "en": "Target Hotspot:"
  },
  "Target Location & Tactical Post": {
    "mr": "Target Location & Tactical Post",
    "hi": "Target Location & Tactical Post",
    "en": "Target Location & Tactical Post"
  },
  "Target: 90%": {
    "mr": "Target: 90%",
    "hi": "Target: 90%",
    "en": "Target: 90%"
  },
  "Target: 95%": {
    "mr": "Target: 95%",
    "hi": "Target: 95%",
    "en": "Target: 95%"
  },
  "Target: 98%": {
    "mr": "Target: 98%",
    "hi": "Target: 98%",
    "en": "Target: 98%"
  },
  "Tariff Violation Check": {
    "mr": "दरपत्रक Violation Check",
    "hi": "दर सूची Violation Check",
    "en": "Tariff Violation Check"
  },
  "Terminal Build: v4.8.2-KMBH • Node: NSK-GT-02": {
    "mr": "टर्मिनल Build: v4.8.2-KMBH • Node: NSK-GT-02",
    "hi": "टर्मिनल Build: v4.8.2-KMBH • Node: NSK-GT-02",
    "en": "Terminal Build: v4.8.2-KMBH • Node: NSK-GT-02"
  },
  "Terminal Language": {
    "mr": "टर्मिनल Language",
    "hi": "टर्मिनल Language",
    "en": "Terminal Language"
  },
  "Today": {
    "mr": "आज",
    "hi": "आज",
    "en": "Today"
  },
  "Today 11:20 AM": {
    "mr": "आज 11:20 AM",
    "hi": "आज 11:20 AM",
    "en": "Today 11:20 AM"
  },
  "Today 4:00 PM (Evening Sunset Tour)": {
    "mr": "आज 4:00 PM (संध्याकाळ Sunset Tour)",
    "hi": "आज 4:00 PM (शाम Sunset Tour)",
    "en": "Today 4:00 PM (Evening Sunset Tour)"
  },
  "Today by 3:30 PM": {
    "mr": "आज by 3:30 PM",
    "hi": "आज by 3:30 PM",
    "en": "Today by 3:30 PM"
  },
  "Today's Inquiries": {
    "mr": "आज's Inquiries",
    "hi": "आज's Inquiries",
    "en": "Today's Inquiries"
  },
  "Token dispatched to registered CUG SIM": {
    "mr": "टोकन dispatched to registered CUG SIM",
    "hi": "टोकन dispatched to registered CUG SIM",
    "en": "Token dispatched to registered CUG SIM"
  },
  "Toll-Free • 24x7 Priority Line": {
    "mr": "Toll-Free • 24x7 Priority Line",
    "hi": "Toll-Free • 24x7 Priority Line",
    "en": "Toll-Free • 24x7 Priority Line"
  },
  "Tomorrow 6:30 AM (3 Hours Heritage Circuit)": {
    "mr": "Tomorrow 6:30 AM (3 तास Heritage Circuit)",
    "hi": "Tomorrow 6:30 AM (3 घंटे Heritage Circuit)",
    "en": "Tomorrow 6:30 AM (3 Hours Heritage Circuit)"
  },
  "Top Priority Zone": {
    "mr": "Top Priority विभाग",
    "hi": "Top Priority ज़ोन",
    "en": "Top Priority Zone"
  },
  "Top Student Verifiers (KTHM, Sandip, KK Wagh)": {
    "mr": "Top विद्यार्थी Verifiers (KTHM, Sandip, KK Wagh)",
    "hi": "Top छात्र Verifiers (KTHM, Sandip, KK Wagh)",
    "en": "Top Student Verifiers (KTHM, Sandip, KK Wagh)"
  },
  "Top Verified Guide Response": {
    "mr": "Top प्रमाणित मार्गदर्शक Response",
    "hi": "Top सत्यापित गाइड Response",
    "en": "Top Verified Guide Response"
  },
  "Total Payable at Service Desk": {
    "mr": "Total Payable at Service कक्ष",
    "hi": "Total Payable at Service कक्ष",
    "en": "Total Payable at Service Desk"
  },
  "Total Verified Transactions: 1,289": {
    "mr": "Total प्रमाणित Transactions: 1,289",
    "hi": "Total सत्यापित Transactions: 1,289",
    "en": "Total Verified Transactions: 1,289"
  },
  "Tracking...": {
    "mr": "Tracking...",
    "hi": "Tracking...",
    "en": "Tracking..."
  },
  "Traditional Brass & Copper": {
    "mr": "Traditional पितळ & तांबे",
    "hi": "Traditional पीतल & तांबा",
    "en": "Traditional Brass & Copper"
  },
  "Transport & Rickshaws": {
    "mr": "Transport & रिक्षा",
    "hi": "Transport & रिक्शा",
    "en": "Transport & Rickshaws"
  },
  "Transport / Rickshaw": {
    "mr": "Transport / रिक्षा",
    "hi": "Transport / रिक्शा",
    "en": "Transport / Rickshaw"
  },
  "Triage AI Model": {
    "mr": "Triage AI Model",
    "hi": "Triage AI Model",
    "en": "Triage AI Model"
  },
  "Triaged Incidents": {
    "mr": "Triaged Incidents",
    "hi": "Triaged Incidents",
    "en": "Triaged Incidents"
  },
  "Trimbak Bus Stand East": {
    "mr": "Trimbak बस Stand East",
    "hi": "Trimbak बस Stand East",
    "en": "Trimbak Bus Stand East"
  },
  "Trimbak Road, near Ramkund Ghat": {
    "mr": "Trimbak Road, near रामकुंड घाट",
    "hi": "Trimbak Road, near रामकुंड घाट",
    "en": "Trimbak Road, near Ramkund Ghat"
  },
  "Trimbakeshwar & Brahmagiri Yatra": {
    "mr": "त्र्यंबकेश्वर & Brahmagiri Yatra",
    "hi": "त्र्यंबकेश्वर & Brahmagiri Yatra",
    "en": "Trimbakeshwar & Brahmagiri Yatra"
  },
  "Try relaxing search keywords or clear current status filter to view entries.": {
    "mr": "Try relaxing शोधा keywords or clear current स्थिती फिल्टर to पहा entries.",
    "hi": "Try relaxing खोजें keywords or clear current स्थिति फ़िल्टर to देखें entries.",
    "en": "Try relaxing search keywords or clear current status filter to view entries."
  },
  "Try verifying the incident number, vendor name, or officer credential tag.": {
    "mr": "Try verifying the incident number, विक्रेता नाव, or अधिकारी credential tag.",
    "hi": "Try verifying the incident number, विक्रेता नाम, or अधिकारी credential tag.",
    "en": "Try verifying the incident number, vendor name, or officer credential tag."
  },
  "Typical": {
    "mr": "Typical",
    "hi": "Typical",
    "en": "Typical"
  },
  "Typical Range": {
    "mr": "Typical Range",
    "hi": "Typical Range",
    "en": "Typical Range"
  },
  "Typical Variance": {
    "mr": "Typical Variance",
    "hi": "Typical Variance",
    "en": "Typical Variance"
  },
  "Unauthorized Private Dharamshala charging ₹2,500 without tariff seal": {
    "mr": "Unauthorized Private धर्मशाळा charging ₹2,500 without दरपत्रक seal",
    "hi": "Unauthorized Private धर्मशाला charging ₹2,500 without दर सूची seal",
    "en": "Unauthorized Private Dharamshala charging ₹2,500 without tariff seal"
  },
  "Unauthorized Purohit Operation": {
    "mr": "Unauthorized Purohit Operation",
    "hi": "Unauthorized Purohit Operation",
    "en": "Unauthorized Purohit Operation"
  },
  "Undo": {
    "mr": "Undo",
    "hi": "Undo",
    "en": "Undo"
  },
  "Update Price": {
    "mr": "Update दर",
    "hi": "Update मूल्य",
    "en": "Update Price"
  },
  "Update Stall Photo": {
    "mr": "Update स्टॉल Photo",
    "hi": "Update स्टॉल Photo",
    "en": "Update Stall Photo"
  },
  "Updated 12m ago": {
    "mr": "Updated 12m ago",
    "hi": "Updated 12m ago",
    "en": "Updated 12m ago"
  },
  "Upload & Save Audit": {
    "mr": "अपलोड करा & जतन करा तपासणी",
    "hi": "अपलोड करें & सहेजें जांच / ऑडिट",
    "en": "Upload & Save Audit"
  },
  "Upload Photo or ID Document": {
    "mr": "अपलोड करा Photo or ओळख क्रमांक Document",
    "hi": "अपलोड करें Photo or पहचान संख्या Document",
    "en": "Upload Photo or ID Document"
  },
  "Urgent Price Alerts": {
    "mr": "Urgent दर Alerts",
    "hi": "Urgent मूल्य Alerts",
    "en": "Urgent Price Alerts"
  },
  "VP": {
    "mr": "VP",
    "hi": "VP",
    "en": "VP"
  },
  "Vahan Record": {
    "mr": "Vahan Record",
    "hi": "Vahan Record",
    "en": "Vahan Record"
  },
  "Validating Badge & Token...": {
    "mr": "Validating बिल्ला & टोकन...",
    "hi": "Validating बैज & टोकन...",
    "en": "Validating Badge & Token..."
  },
  "Vendor": {
    "mr": "विक्रेता",
    "hi": "विक्रेता",
    "en": "Vendor"
  },
  "Vendor Front Desk": {
    "mr": "विक्रेता Front कक्ष",
    "hi": "विक्रेता Front कक्ष",
    "en": "Vendor Front Desk"
  },
  "Vendor Listed Rate": {
    "mr": "विक्रेता Listed दर",
    "hi": "विक्रेता Listed दर",
    "en": "Vendor Listed Rate"
  },
  "Verification Completion Rate": {
    "mr": "Verification Completion दर",
    "hi": "Verification Completion दर",
    "en": "Verification Completion Rate"
  },
  "Verified": {
    "mr": "प्रमाणित",
    "hi": "सत्यापित",
    "en": "Verified"
  },
  "Verified Aadhaar Pilgrim": {
    "mr": "प्रमाणित Aadhaar भाविक",
    "hi": "सत्यापित Aadhaar तीर्थयात्री",
    "en": "Verified Aadhaar Pilgrim"
  },
  "Verified Bookings": {
    "mr": "प्रमाणित नोंदणी",
    "hi": "सत्यापित बुकिंग",
    "en": "Verified Bookings"
  },
  "Verified Stalls": {
    "mr": "प्रमाणित स्टॉल्स",
    "hi": "सत्यापित स्टॉल",
    "en": "Verified Stalls"
  },
  "Verified Today": {
    "mr": "प्रमाणित आज",
    "hi": "सत्यापित आज",
    "en": "Verified Today"
  },
  "Verified false archival video. Official rebuttal broadcasted immediately via Yatri portal & ghat public address audio.": {
    "mr": "प्रमाणित false archival video. Official rebuttal broadcasted immediately via भाविक portal & घाट public पत्ता audio.",
    "hi": "सत्यापित false archival video. Official rebuttal broadcasted immediately via तीर्थयात्री portal & घाट public पता audio.",
    "en": "Verified false archival video. Official rebuttal broadcasted immediately via Yatri portal & ghat public address audio."
  },
  "Verify Face": {
    "mr": "Verify Face",
    "hi": "Verify Face",
    "en": "Verify Face"
  },
  "Verify Guide Selfie at Meeting Point": {
    "mr": "Verify मार्गदर्शक Selfie at Meeting Point",
    "hi": "Verify गाइड Selfie at Meeting Point",
    "en": "Verify Guide Selfie at Meeting Point"
  },
  "Verify On-Site": {
    "mr": "Verify On-Site",
    "hi": "Verify On-Site",
    "en": "Verify On-Site"
  },
  "Verify Personal Face": {
    "mr": "Verify Personal Face",
    "hi": "Verify Personal Face",
    "en": "Verify Personal Face"
  },
  "Verify Rate": {
    "mr": "Verify दर",
    "hi": "Verify दर",
    "en": "Verify Rate"
  },
  "Vibe": {
    "mr": "Vibe",
    "hi": "Vibe",
    "en": "Vibe"
  },
  "View": {
    "mr": "पहा",
    "hi": "देखें",
    "en": "View"
  },
  "View Bills": {
    "mr": "पहा Bills",
    "hi": "देखें Bills",
    "en": "View Bills"
  },
  "View Documents": {
    "mr": "पहा Documents",
    "hi": "देखें Documents",
    "en": "View Documents"
  },
  "View ID": {
    "mr": "पहा ओळख क्रमांक",
    "hi": "देखें पहचान संख्या",
    "en": "View ID"
  },
  "View Municipal QR Card": {
    "mr": "पहा महानगरपालिका QR Card",
    "hi": "देखें नगर निगम QR Card",
    "en": "View Municipal QR Card"
  },
  "View PIB Verification": {
    "mr": "पहा PIB Verification",
    "hi": "देखें PIB Verification",
    "en": "View PIB Verification"
  },
  "View Radar": {
    "mr": "पहा रडार",
    "hi": "देखें रडार",
    "en": "View Radar"
  },
  "View in Police Escalations Dashboard": {
    "mr": "पहा in पोलीस Escalations Dashboard",
    "hi": "देखें in पुलिस Escalations Dashboard",
    "en": "View in Police Escalations Dashboard"
  },
  "Viral social media post alleging bridge closure at Ramkund": {
    "mr": "Viral social media post alleging पूल closure at रामकुंड",
    "hi": "Viral social media post alleging पुल closure at रामकुंड",
    "en": "Viral social media post alleging bridge closure at Ramkund"
  },
  "Visited 2 days ago • Verified Yatri Purchase": {
    "mr": "Visited 2 days ago • प्रमाणित भाविक Purchase",
    "hi": "Visited 2 days ago • सत्यापित तीर्थयात्री Purchase",
    "en": "Visited 2 days ago • Verified Yatri Purchase"
  },
  "Visited 3 days ago": {
    "mr": "Visited 3 days ago",
    "hi": "Visited 3 days ago",
    "en": "Visited 3 days ago"
  },
  "Visited yesterday • Verified Yatri": {
    "mr": "Visited काल • प्रमाणित भाविक",
    "hi": "Visited कल • सत्यापित तीर्थयात्री",
    "en": "Visited yesterday • Verified Yatri"
  },
  "Volunteers": {
    "mr": "स्वयंसेवक",
    "hi": "स्वयंसेवक",
    "en": "Volunteers"
  },
  "Ward 12, Panchavati Chowk": {
    "mr": "Ward 12, पंचवटी Chowk",
    "hi": "Ward 12, पंचवटी Chowk",
    "en": "Ward 12, Panchavati Chowk"
  },
  "Ward 2 flying squad dispatched 3 spot-check teams at Ramkund Ghat area regarding temporary lodging surge pricing. No severe infractions discovered; 4 warning notices served.": {
    "mr": "Ward 2 flying पथक dispatched 3 spot-check teams at रामकुंड घाट area regarding temporary lodging surge दर रचना. No severe infractions discovered; 4 इशारा notices served.",
    "hi": "Ward 2 flying दस्ता dispatched 3 spot-check teams at रामकुंड घाट area regarding temporary lodging surge मूल्य निर्धारण. No severe infractions discovered; 4 चेतावनी notices served.",
    "en": "Ward 2 flying squad dispatched 3 spot-check teams at Ramkund Ghat area regarding temporary lodging surge pricing. No severe infractions discovered; 4 warning notices served."
  },
  "Ward Flying Squad": {
    "mr": "Ward Flying पथक",
    "hi": "Ward Flying दस्ता",
    "en": "Ward Flying Squad"
  },
  "Ward: Zone 2 Panchavati": {
    "mr": "Ward: विभाग 2 पंचवटी",
    "hi": "Ward: ज़ोन 2 पंचवटी",
    "en": "Ward: Zone 2 Panchavati"
  },
  "What does Verified mean?": {
    "mr": "What does प्रमाणित mean?",
    "hi": "What does सत्यापित mean?",
    "en": "What does Verified mean?"
  },
  "WhatsApp": {
    "mr": "WhatsApp",
    "hi": "WhatsApp",
    "en": "WhatsApp"
  },
  "Wheelchair Access": {
    "mr": "Wheelchair Access",
    "hi": "Wheelchair Access",
    "en": "Wheelchair Access"
  },
  "Within Range": {
    "mr": "Within Range",
    "hi": "Within Range",
    "en": "Within Range"
  },
  "XGBoost v2.1": {
    "mr": "XGBoost v2.1",
    "hi": "XGBoost v2.1",
    "en": "XGBoost v2.1"
  },
  "Yatri Fair Price Trust Score": {
    "mr": "भाविक वाजवी दर विश्वास Score",
    "hi": "तीर्थयात्री उचित मूल्य विश्वास Score",
    "en": "Yatri Fair Price Trust Score"
  },
  "Yatri Inquiry": {
    "mr": "भाविक Inquiry",
    "hi": "तीर्थयात्री Inquiry",
    "en": "Yatri Inquiry"
  },
  "Yatri Rating": {
    "mr": "भाविक गुणांकन",
    "hi": "तीर्थयात्री रेटिंग",
    "en": "Yatri Rating"
  },
  "Yatri Report • Slip #NK-8842": {
    "mr": "भाविक तक्रार / अहवाल • Slip #NK-8842",
    "hi": "तीर्थयात्री शिकायत / रिपोर्ट • Slip #NK-8842",
    "en": "Yatri Report • Slip #NK-8842"
  },
  "Yatri Reviews (128)": {
    "mr": "भाविक पुनरावलोकने (128)",
    "hi": "तीर्थयात्री समीक्षाएं (128)",
    "en": "Yatri Reviews (128)"
  },
  "Yatri Stay • Double Room": {
    "mr": "भाविक मुक्काम • Double खोली",
    "hi": "तीर्थयात्री आवास • Double कमरा",
    "en": "Yatri Stay • Double Room"
  },
  "Yatris": {
    "mr": "Yatris",
    "hi": "Yatris",
    "en": "Yatris"
  },
  "Yatris recommend this stall": {
    "mr": "Yatris recommend this स्टॉल",
    "hi": "Yatris recommend this स्टॉल",
    "en": "Yatris recommend this stall"
  },
  "Yatris who reserved or bought items from your stall via KumbhSetu.": {
    "mr": "Yatris who reserved or bought items from your स्टॉल via KumbhSetu.",
    "hi": "Yatris who reserved or bought items from your स्टॉल via KumbhSetu.",
    "en": "Yatris who reserved or bought items from your stall via KumbhSetu."
  },
  "Yesterday 14:10": {
    "mr": "काल 14:10",
    "hi": "कल 14:10",
    "en": "Yesterday 14:10"
  },
  "Yesterday 18:45": {
    "mr": "काल 18:45",
    "hi": "कल 18:45",
    "en": "Yesterday 18:45"
  },
  "You are here: Pillar 12": {
    "mr": "You are here: Pillar 12",
    "hi": "You are here: Pillar 12",
    "en": "You are here: Pillar 12"
  },
  "Your guide's identity is confirmed via selfie at the meeting point before your session begins. Click below to verify in person.": {
    "mr": "Your मार्गदर्शक's identity is confirmed via selfie at the meeting point before your session begins. Click below to verify in person.",
    "hi": "Your गाइड's identity is confirmed via selfie at the meeting point before your session begins. Click below to verify in person.",
    "en": "Your guide's identity is confirmed via selfie at the meeting point before your session begins. Click below to verify in person."
  },
  "Your report will be reviewed by on-ground civic teams as quickly as possible (typically within 2–4 hours). No login required.": {
    "mr": "Your तक्रार / अहवाल will be reviewed by on-ground नागरी teams as quickly as possible (typically within 2–4 तास). No प्रवेश करा required.",
    "hi": "Your शिकायत / रिपोर्ट will be reviewed by on-ground नागरिक teams as quickly as possible (typically within 2–4 घंटे). No लॉगिन करें required.",
    "en": "Your report will be reviewed by on-ground civic teams as quickly as possible (typically within 2–4 hours). No login required."
  },
  "Your stall (#NSK-STALL-14) is in full compliance with the Simhastha Fair Price standards. All your items are priced within the estimated fair range (₹180 – ₹260). No police alerts or municipal flags exist on your business.": {
    "mr": "Your स्टॉल (#NSK-स्टॉल-14) is in full अनुपालन with the सिंहस्थ वाजवी दर standards. All your items are priced within the अंदाजित वाजवी range (₹180 – ₹260). No पोलीस alerts or महानगरपालिका इशारे exist on your business.",
    "hi": "Your स्टॉल (#NSK-स्टॉल-14) is in full अनुपालन with the सिंहस्थ उचित मूल्य standards. All your items are priced within the अनुमानित उचित range (₹180 – ₹260). No पुलिस alerts or नगर निगम चेतावनी exist on your business.",
    "en": "Your stall (#NSK-STALL-14) is in full compliance with the Simhastha Fair Price standards. All your items are priced within the estimated fair range (₹180 – ₹260). No police alerts or municipal flags exist on your business."
  },
  "Zero Overcharging Complaints in Last 30 Days": {
    "mr": "शून्य जादा दर आकारणी Complaints in Last 30 Days",
    "hi": "शून्य अत्यधिक वसूली Complaints in Last 30 Days",
    "en": "Zero Overcharging Complaints in Last 30 Days"
  },
  "Zero adulteration notices": {
    "mr": "शून्य adulteration notices",
    "hi": "शून्य adulteration notices",
    "en": "Zero adulteration notices"
  },
  "Zone 1 • Panchavati Ring": {
    "mr": "विभाग 1 • पंचवटी Ring",
    "hi": "ज़ोन 1 • पंचवटी Ring",
    "en": "Zone 1 • Panchavati Ring"
  },
  "Zone 2 (Panchavati / Ramkund Sector)": {
    "mr": "विभाग 2 (पंचवटी / रामकुंड विभाग)",
    "hi": "ज़ोन 2 (पंचवटी / रामकुंड सेक्टर)",
    "en": "Zone 2 (Panchavati / Ramkund Sector)"
  },
  "Zone 2 Compliance Gazette": {
    "mr": "विभाग 2 अनुपालन Gazette",
    "hi": "ज़ोन 2 अनुपालन Gazette",
    "en": "Zone 2 Compliance Gazette"
  },
  "Zone A-4 Desk": {
    "mr": "विभाग A-4 कक्ष",
    "hi": "ज़ोन A-4 कक्ष",
    "en": "Zone A-4 Desk"
  },
  "Zone Green": {
    "mr": "विभाग Green",
    "hi": "ज़ोन Green",
    "en": "Zone Green"
  },
  "Zone: Ramkund / Panchavati Core • Priority: 74.87": {
    "mr": "विभाग: रामकुंड / पंचवटी Core • Priority: 74.87",
    "hi": "ज़ोन: रामकुंड / पंचवटी Core • Priority: 74.87",
    "en": "Zone: Ramkund / Panchavati Core • Priority: 74.87"
  },
  "accessible": {
    "mr": "accessible",
    "hi": "accessible",
    "en": "accessible"
  },
  "add": {
    "mr": "add",
    "hi": "add",
    "en": "add"
  },
  "against municipal cap of": {
    "mr": "against महानगरपालिका मर्यादा of",
    "hi": "against नगर निगम सीमा of",
    "en": "against municipal cap of"
  },
  "apartment": {
    "mr": "apartment",
    "hi": "apartment",
    "en": "apartment"
  },
  "assignment": {
    "mr": "assignment",
    "hi": "assignment",
    "en": "assignment"
  },
  "balance": {
    "mr": "balance",
    "hi": "balance",
    "en": "balance"
  },
  "block": {
    "mr": "block",
    "hi": "block",
    "en": "block"
  },
  "bolt": {
    "mr": "bolt",
    "hi": "bolt",
    "en": "bolt"
  },
  "chat": {
    "mr": "chat",
    "hi": "chat",
    "en": "chat"
  },
  "check": {
    "mr": "check",
    "hi": "check",
    "en": "check"
  },
  "confirmed fair market price": {
    "mr": "confirmed वाजवी बाजार दर",
    "hi": "confirmed उचित बाज़ार मूल्य",
    "en": "confirmed fair market price"
  },
  "e.g. 02532513511": {
    "mr": "e.g. 02532513511",
    "hi": "e.g. 02532513511",
    "en": "e.g. 02532513511"
  },
  "e.g. Anand Joshi": {
    "mr": "e.g. Anand Joshi",
    "hi": "e.g. Anand Joshi",
    "en": "e.g. Anand Joshi"
  },
  "e.g. Counter attendant denied standard dorm pricing and insisted on cash only.": {
    "mr": "e.g. Counter attendant denied standard डॉर्मिटरी दर रचना and insisted on cash only.",
    "hi": "e.g. Counter attendant denied standard डॉर्मिटरी मूल्य निर्धारण and insisted on cash only.",
    "en": "e.g. Counter attendant denied standard dorm pricing and insisted on cash only."
  },
  "e.g. MH-15-GUIDE-0082": {
    "mr": "e.g. MH-15-मार्गदर्शक-0082",
    "hi": "e.g. MH-15-गाइड-0082",
    "en": "e.g. MH-15-GUIDE-0082"
  },
  "e.g. MH-NSK-POL-8841": {
    "mr": "e.g. MH-NSK-POL-8841",
    "hi": "e.g. MH-NSK-POL-8841",
    "en": "e.g. MH-NSK-POL-8841"
  },
  "e.g. Marathi, Hindi, English • Ramkund Ghat": {
    "mr": "e.g. Marathi, Hindi, English • रामकुंड घाट",
    "hi": "e.g. Marathi, Hindi, English • रामकुंड घाट",
    "en": "e.g. Marathi, Hindi, English • Ramkund Ghat"
  },
  "e.g. Rameshwar Vinayak Pathak": {
    "mr": "e.g. Rameshwar Vinayak Pathak",
    "hi": "e.g. Rameshwar Vinayak Pathak",
    "en": "e.g. Rameshwar Vinayak Pathak"
  },
  "e.g. guide@kumbhsetu.in": {
    "mr": "e.g. मार्गदर्शक@kumbhsetu.in",
    "hi": "e.g. गाइड@kumbhsetu.in",
    "en": "e.g. guide@kumbhsetu.in"
  },
  "e.g. rameshwar.guide@kumbhsetu.in": {
    "mr": "e.g. rameshwar.मार्गदर्शक@kumbhsetu.in",
    "hi": "e.g. rameshwar.गाइड@kumbhsetu.in",
    "en": "e.g. rameshwar.guide@kumbhsetu.in"
  },
  "e.g., Driver apprehended at Bay 4 kiosk. Overcharge refunded to yatri...": {
    "mr": "e.g., Driver apprehended at Bay 4 kiosk. जादा दर refunded to भाविक...",
    "hi": "e.g., Driver apprehended at Bay 4 kiosk. अत्यधिक किराया refunded to तीर्थयात्री...",
    "en": "e.g., Driver apprehended at Bay 4 kiosk. Overcharge refunded to yatri..."
  },
  "eco": {
    "mr": "eco",
    "hi": "eco",
    "en": "eco"
  },
  "edit": {
    "mr": "edit",
    "hi": "edit",
    "en": "edit"
  },
  "face": {
    "mr": "face",
    "hi": "face",
    "en": "face"
  },
  "fingerprint": {
    "mr": "fingerprint",
    "hi": "fingerprint",
    "en": "fingerprint"
  },
  "forest": {
    "mr": "forest",
    "hi": "forest",
    "en": "forest"
  },
  "group": {
    "mr": "group",
    "hi": "group",
    "en": "group"
  },
  "handshake": {
    "mr": "handshake",
    "hi": "handshake",
    "en": "handshake"
  },
  "hiking": {
    "mr": "hiking",
    "hi": "hiking",
    "en": "hiking"
  },
  "hub": {
    "mr": "hub",
    "hi": "hub",
    "en": "hub"
  },
  "inbox": {
    "mr": "inbox",
    "hi": "inbox",
    "en": "inbox"
  },
  "luggage": {
    "mr": "luggage",
    "hi": "luggage",
    "en": "luggage"
  },
  "mail": {
    "mr": "mail",
    "hi": "mail",
    "en": "mail"
  },
  "mic": {
    "mr": "mic",
    "hi": "mic",
    "en": "mic"
  },
  "or local": {
    "mr": "or local",
    "hi": "or local",
    "en": "or local"
  },
  "or misleading information": {
    "mr": "or misleading information",
    "hi": "or misleading information",
    "en": "or misleading information"
  },
  "payments": {
    "mr": "payments",
    "hi": "payments",
    "en": "payments"
  },
  "phone": {
    "mr": "फोन",
    "hi": "फ़ोन",
    "en": "phone"
  },
  "place": {
    "mr": "place",
    "hi": "place",
    "en": "place"
  },
  "policy": {
    "mr": "policy",
    "hi": "policy",
    "en": "policy"
  },
  "refresh": {
    "mr": "refresh",
    "hi": "refresh",
    "en": "refresh"
  },
  "reply": {
    "mr": "reply",
    "hi": "reply",
    "en": "reply"
  },
  "sailing": {
    "mr": "sailing",
    "hi": "sailing",
    "en": "sailing"
  },
  "school": {
    "mr": "school",
    "hi": "school",
    "en": "school"
  },
  "sell": {
    "mr": "sell",
    "hi": "sell",
    "en": "sell"
  },
  "sensors": {
    "mr": "sensors",
    "hi": "sensors",
    "en": "sensors"
  },
  "share": {
    "mr": "share",
    "hi": "share",
    "en": "share"
  },
  "sms": {
    "mr": "sms",
    "hi": "sms",
    "en": "sms"
  },
  "spa": {
    "mr": "spa",
    "hi": "spa",
    "en": "spa"
  },
  "straighten": {
    "mr": "straighten",
    "hi": "straighten",
    "en": "straighten"
  },
  "summarize": {
    "mr": "summarize",
    "hi": "summarize",
    "en": "summarize"
  },
  "sync": {
    "mr": "sync",
    "hi": "sync",
    "en": "sync"
  },
  "timer": {
    "mr": "timer",
    "hi": "timer",
    "en": "timer"
  },
  "tour": {
    "mr": "tour",
    "hi": "tour",
    "en": "tour"
  },
  "translate": {
    "mr": "translate",
    "hi": "translate",
    "en": "translate"
  },
  "videocam": {
    "mr": "videocam",
    "hi": "videocam",
    "en": "videocam"
  },
  "visited this premises in person, validated municipal registration certificates, inspected fair rates, and logged authorized tariff caps directly to the Kumbh Setu fair pricing ledger.": {
    "mr": "visited this premises in person, validated महानगरपालिका नोंदणी certificates, inspected वाजवी दर, and logged authorized दरपत्रक caps directly to the कुंभ Setu वाजवी दर रचना ledger.",
    "hi": "visited this premises in person, validated नगर निगम पंजीकरण certificates, inspected उचित दरें, and logged authorized दर सूची caps directly to the कुंभ Setu उचित मूल्य निर्धारण ledger.",
    "en": "visited this premises in person, validated municipal registration certificates, inspected fair rates, and logged authorized tariff caps directly to the Kumbh Setu fair pricing ledger."
  },
  "water": {
    "mr": "पाणी",
    "hi": "जल / पानी",
    "en": "water"
  },
  "waves": {
    "mr": "waves",
    "hi": "waves",
    "en": "waves"
  },
  "yard": {
    "mr": "yard",
    "hi": "yard",
    "en": "yard"
  },
  "~45 mins travel": {
    "mr": "~45 mins travel",
    "hi": "~45 mins travel",
    "en": "~45 mins travel"
  },
  "अग्निशामक (Fire)": {
    "mr": "अग्निशामक (Fire)",
    "hi": "अग्निशामक (Fire)",
    "en": "अग्निशामक (Fire)"
  },
  "जनमित्र संरक्षण कक्ष": {
    "mr": "जनमित्र संरक्षण कक्ष",
    "hi": "जनमित्र संरक्षण कक्ष",
    "en": "जनमित्र संरक्षण कक्ष"
  },
  "जवळचे आपत्कालीन केंद्र शोधत आहे (Locating nearest stations)...": {
    "mr": "जवळचे आपत्कालीन केंद्र शोधत आहे (Locating nearest stations)...",
    "hi": "जवळचे आपत्कालीन केंद्र शोधत आहे (Locating nearest stations)...",
    "en": "जवळचे आपत्कालीन केंद्र शोधत आहे (Locating nearest stations)..."
  },
  "तक्रारीचा प्रकार": {
    "mr": "तक्रारीचा प्रकार",
    "hi": "तक्रारीचा प्रकार",
    "en": "तक्रारीचा प्रकार"
  },
  "तपशील": {
    "mr": "तपशील",
    "hi": "तपशील",
    "en": "तपशील"
  },
  "धर्मशाळा / लॉज": {
    "mr": "धर्मशाळा / लॉज",
    "hi": "धर्मशाळा / लॉज",
    "en": "धर्मशाळा / लॉज"
  },
  "पावती / फलक फोटो": {
    "mr": "पावती / फलक फोटो",
    "hi": "पावती / फलक फोटो",
    "en": "पावती / फलक फोटो"
  },
  "पोलीस (Police)": {
    "mr": "पोलीस (पोलीस)",
    "hi": "पोलीस (पुलिस)",
    "en": "पोलीस (Police)"
  },
  "प्रसाद / भोजनालय": {
    "mr": "प्रसाद / भोजनालय",
    "hi": "प्रसाद / भोजनालय",
    "en": "प्रसाद / भोजनालय"
  },
  "मार्गदर्शक / पुरोहित": {
    "mr": "मार्गदर्शक / पुरोहित",
    "hi": "मार्गदर्शक / पुरोहित",
    "en": "मार्गदर्शक / पुरोहित"
  },
  "रिक्षा व वाहतूक": {
    "mr": "रिक्षा व वाहतूक",
    "hi": "रिक्षा व वाहतूक",
    "en": "रिक्षा व वाहतूक"
  },
  "रुग्णवाहिका (Ambulance)": {
    "mr": "रुग्णवाहिका (रुग्णवाहिका)",
    "hi": "रुग्णवाहिका (एम्बुलेंस)",
    "en": "रुग्णवाहिका (Ambulance)"
  },
  "रुग्णालये (Hospitals)": {
    "mr": "रुग्णालये (Hospitals)",
    "hi": "रुग्णालये (Hospitals)",
    "en": "रुग्णालये (Hospitals)"
  },
  "विभाग निवडा": {
    "mr": "विभाग निवडा",
    "hi": "विभाग निवडा",
    "en": "विभाग निवडा"
  },
  "सर्व (All Emergency)": {
    "mr": "सर्व (All आपत्कालीन)",
    "hi": "सर्व (All आपातकालीन)",
    "en": "सर्व (All Emergency)"
  },
  "स्थान किंवा संस्था": {
    "mr": "स्थान किंवा संस्था",
    "hi": "स्थान किंवा संस्था",
    "en": "स्थान किंवा संस्था"
  },
  "स्वच्छता गृह व इतर सेवा": {
    "mr": "स्वच्छता गृह व इतर सेवा",
    "hi": "स्वच्छता गृह व इतर सेवा",
    "en": "स्वच्छता गृह व इतर सेवा"
  },
  "• 1.4 km radius": {
    "mr": "• 1.4 km radius",
    "hi": "• 1.4 km radius",
    "en": "• 1.4 km radius"
  },
  "• 4.9★ (142 Yatri Reviews)": {
    "mr": "• 4.9★ (142 भाविक पुनरावलोकने)",
    "hi": "• 4.9★ (142 तीर्थयात्री समीक्षाएं)",
    "en": "• 4.9★ (142 Yatri Reviews)"
  },
  "• License:": {
    "mr": "• License:",
    "hi": "• License:",
    "en": "• License:"
  },
  "• RTO Nashik Registered": {
    "mr": "• RTO Nashik Registered",
    "hi": "• RTO Nashik Registered",
    "en": "• RTO Nashik Registered"
  },
  "• Selfie & Govt ID Verified": {
    "mr": "• Selfie & Govt ओळख क्रमांक प्रमाणित",
    "hi": "• Selfie & Govt पहचान संख्या सत्यापित",
    "en": "• Selfie & Govt ID Verified"
  },
  "• Tariff Bound": {
    "mr": "• दरपत्रक Bound",
    "hi": "• दर सूची Bound",
    "en": "• Tariff Bound"
  },
  "₹180 – ₹240": {
    "mr": "₹180 – ₹240",
    "hi": "₹180 – ₹240",
    "en": "₹180 – ₹240"
  },
  "₹180 – ₹260": {
    "mr": "₹180 – ₹260",
    "hi": "₹180 – ₹260",
    "en": "₹180 – ₹260"
  },
  "₹20 – ₹30": {
    "mr": "₹20 – ₹30",
    "hi": "₹20 – ₹30",
    "en": "₹20 – ₹30"
  },
  "₹280 – ₹380": {
    "mr": "₹280 – ₹380",
    "hi": "₹280 – ₹380",
    "en": "₹280 – ₹380"
  },
  "₹350 – ₹450": {
    "mr": "₹350 – ₹450",
    "hi": "₹350 – ₹450",
    "en": "₹350 – ₹450"
  },
  "₹350 – ₹450 / half-day": {
    "mr": "₹350 – ₹450 / half-दिवस",
    "hi": "₹350 – ₹450 / half-दिन",
    "en": "₹350 – ₹450 / half-day"
  },
  "₹350 – ₹490": {
    "mr": "₹350 – ₹490",
    "hi": "₹350 – ₹490",
    "en": "₹350 – ₹490"
  },
  "₹40 Thali Gazette": {
    "mr": "₹40 थाळी Gazette",
    "hi": "₹40 थाली Gazette",
    "en": "₹40 Thali Gazette"
  },
  "₹500 locked": {
    "mr": "₹500 locked",
    "hi": "₹500 locked",
    "en": "₹500 locked"
  },
  "₹600 Voucher": {
    "mr": "₹600 Voucher",
    "hi": "₹600 Voucher",
    "en": "₹600 Voucher"
  },
  "₹650 offline": {
    "mr": "₹650 offline",
    "hi": "₹650 offline",
    "en": "₹650 offline"
  },
  "₹70 Surge Demanded": {
    "mr": "₹70 Surge Demanded",
    "hi": "₹70 Surge Demanded",
    "en": "₹70 Surge Demanded"
  },
  "₹70 – ₹90": {
    "mr": "₹70 – ₹90",
    "hi": "₹70 – ₹90",
    "en": "₹70 – ₹90"
  },
  "₹750 Voucher": {
    "mr": "₹750 Voucher",
    "hi": "₹750 Voucher",
    "en": "₹750 Voucher"
  },
  "₹850 - ₹1,000 / nt": {
    "mr": "₹850 - ₹1,000 / nt",
    "hi": "₹850 - ₹1,000 / nt",
    "en": "₹850 - ₹1,000 / nt"
  },
  "₹90 – ₹150": {
    "mr": "₹90 – ₹150",
    "hi": "₹90 – ₹150",
    "en": "₹90 – ₹150"
  },
  "₹900 Voucher": {
    "mr": "₹900 Voucher",
    "hi": "₹900 Voucher",
    "en": "₹900 Voucher"
  },
  "₹950 / night": {
    "mr": "₹950 / रात्र",
    "hi": "₹950 / रात",
    "en": "₹950 / night"
  },
  "√Vol × Severity": {
    "mr": "√Vol × Severity",
    "hi": "√Vol × Severity",
    "en": "√Vol × Severity"
  },
  "🏛️": {
    "mr": "🏛️",
    "hi": "🏛️",
    "en": "🏛️"
  },
  "Select your dedicated role below. Each persona has its own specialized interface and verification flow.": {
    "mr": "खाली आपली योग्य भूमिका निवडा. प्रत्येक घटकासाठी स्वतंत्र इंटरफेस आणि पडताळणी प्रक्रिया आहे.",
    "hi": "नीचे अपनी विशिष्ट भूमिका चुनें। प्रत्येक व्यक्ति के लिए समर्पित इंटरफेस और सत्यापन प्रक्रिया है।",
    "en": "Select your dedicated role below. Each persona has its own specialized interface and verification flow."
  },
  "Civic & Field Portals": {
    "mr": "नागरी व क्षेत्रीय पोर्टल्स",
    "hi": "नागरिक एवं क्षेत्रीय पोर्टल",
    "en": "Civic & Field Portals"
  },
  "Operator & Citizen Gateway": {
    "mr": "चालक व नागरिक प्रवेशद्वार",
    "hi": "संचालक एवं नागरिक प्रवेशद्वार",
    "en": "Operator & Citizen Gateway"
  },
  "Nashik Resident": {
    "mr": "स्थानिक नाशिककर",
    "hi": "स्थानीय नाशिककर",
    "en": "Nashik Resident"
  },
  "Civic Vendor": {
    "mr": "नोंदणीकृत नागरी विक्रेता",
    "hi": "पंजीकृत नागरिक विक्रेता",
    "en": "Civic Vendor"
  },
  "Trust & Community Watch": {
    "mr": "नागरी विश्वास आणि दक्षता",
    "hi": "नागरिक विश्वास एवं निगरानी",
    "en": "Trust & Community Watch"
  },
  "AR Camera Verification": {
    "mr": "एआर कॅमेरा पडताळणी",
    "hi": "एआर कैमरा सत्यापन",
    "en": "AR Camera Verification"
  },
  "Audit Desk & Photos": {
    "mr": "तपासणी कक्ष व छायाचित्रे",
    "hi": "लेखापरीक्षा कक्ष एवं फ़ोटो",
    "en": "Audit Desk & Photos"
  },
  "Estimated Range Pricing": {
    "mr": "अंदाजित वाजवी दर श्रेणी",
    "hi": "अनुमानित उचित मूल्य दायरा",
    "en": "Estimated Range Pricing"
  },
  "Login to Operator Portal": {
    "mr": "चालक पोर्टलवर लॉगिन करा",
    "hi": "ऑपरेटर पोर्टल पर लॉगिन करें",
    "en": "Login to Operator Portal"
  },
  "Kumbhveer": {
    "mr": "कुंभवीर स्वयंसेवक",
    "hi": "कुंभवीर स्वयंसेवक",
    "en": "Kumbhveer"
  },
  "Action completed": {
    "mr": "कृती यशस्वीरीत्या पूर्ण झाली",
    "hi": "कार्रवाई सफलतापूर्वक पूर्ण हुई",
    "en": "Action completed"
  },
  "Action completed successfully!": {
    "mr": "कृती यशस्वीरीत्या पूर्ण झाली!",
    "hi": "कार्रवाई सफलतापूर्वक संपन्न हुई!",
    "en": "Action completed successfully!"
  },
  "Pins are draggable": {
    "mr": "पिन हलवता येतात",
    "hi": "पिन खींचकर बदले जा सकते हैं",
    "en": "Pins are draggable"
  },
  "All Transit": {
    "mr": "सर्व वाहतूक साधने",
    "hi": "सभी परिवहन साधन",
    "en": "All Transit"
  },
  "From": {
    "mr": "येथून (सुरुवात)",
    "hi": "कहाँ से (शुरुआत)",
    "en": "From"
  },
  "To": {
    "mr": "येथे (गंतव्य)",
    "hi": "कहाँ तक (गंतव्य)",
    "en": "To"
  },
  "Active Now": {
    "mr": "सध्या कार्यरत",
    "hi": "अभी सक्रिय",
    "en": "Active Now"
  },
  "Audited 1h ago": {
    "mr": "१ तासापूर्वी तपासणी झाली",
    "hi": "१ घंटे पहले जांच हुई",
    "en": "Audited 1h ago"
  },
  "Avg Reported": {
    "mr": "नोंदवलेला सरासरी दर",
    "hi": "दर्ज किया गया औसत दर",
    "en": "Avg Reported"
  },
  "Verified Stays": {
    "mr": "प्रमाणित मुक्काम",
    "hi": "सत्यापित आवास",
    "en": "Verified Stays"
  },
  "Hotel & Ashram Stays": {
    "mr": "हॉटेल्स, आश्रम व धर्मशाळा",
    "hi": "होटल, आश्रम एवं धर्मशाला",
    "en": "Hotel & Ashram Stays"
  },
  "Dharamshalas, ashrams, budget hotels & tent cities with verified rates.": {
    "mr": "प्रमाणित दरांसह धर्मशाळा, आश्रम, बजेट हॉटेल्स आणि तंबू शहरे.",
    "hi": "सत्यापित दरों के साथ धर्मशालाएं, आश्रम, बजट होटल और तंबू शहर।",
    "en": "Dharamshalas, ashrams, budget hotels & tent cities with verified rates."
  },
  "Find Stays": {
    "mr": "मुक्काम शोधा",
    "hi": "आवास खोजें",
    "en": "Find Stays"
  },
  "Fast Action": {
    "mr": "तातडीने कारवाई",
    "hi": "त्वरित कार्रवाई",
    "en": "Fast Action"
  },
  "File Notice": {
    "mr": "तक्रार नोंदवा",
    "hi": "नोटिस दर्ज करें",
    "en": "File Notice"
  },
  "Find Meals": {
    "mr": "भोजन शोधा",
    "hi": "भोजन खोजें",
    "en": "Find Meals"
  },
  "Local Bazaar & Puja Stalls": {
    "mr": "स्थानिक बाजार आणि पूजा दुकाने",
    "hi": "स्थानीय बाज़ार एवं पूजा दुकानें",
    "en": "Local Bazaar & Puja Stalls"
  },
  "Local Stays & Dharamshalas": {
    "mr": "स्थानिक मुक्काम आणि धर्मशाळा",
    "hi": "स्थानीय आवास एवं धर्मशाला",
    "en": "Local Stays & Dharamshalas"
  },
  "Pre-Paid Transit & Fares": {
    "mr": "प्री-पेड वाहतूक आणि दर",
    "hi": "प्री-पेड परिवहन एवं किराया",
    "en": "Pre-Paid Transit & Fares"
  },
  "Zero Overcharging Tolerance:": {
    "mr": "जादा दर आकारणीस शून्य सहनशीलता:",
    "hi": "अधिक किराया वसूली पर शून्य सहनशीलता:",
    "en": "Zero Overcharging Tolerance:"
  },
  "Meter Compliance:": {
    "mr": "मीटर नियमांचे पालन:",
    "hi": "मीटर नियमों का अनुपालन:",
    "en": "Meter Compliance:"
  },
  "Report Price": {
    "mr": "दर तक्रार नोंदवा",
    "hi": "मूल्य रिपोर्ट करें",
    "en": "Report Price"
  },
  "Report Transit Price": {
    "mr": "प्रवास दर तक्रार नोंदवा",
    "hi": "सफ़र किराया रिपोर्ट करें",
    "en": "Report Transit Price"
  },
  "Submit Community Report": {
    "mr": "नागरी अहवाल सादर करा",
    "hi": "सामुदायिक रिपोर्ट सबमिट करें",
    "en": "Submit Community Report"
  },
  "RTO Toll-Free 1800-233-1048": {
    "mr": "आरटीओ टोल-फ्री १८००-२३३-१०४८",
    "hi": "आरटीओ टोल-फ्री १८००-२३३-१०४८",
    "en": "RTO Toll-Free 1800-233-1048"
  },
  "Helpline: 1800-233-0202": {
    "mr": "हेल्पलाइन: १८००-२३३-०२०२",
    "hi": "हेल्पलाइन: १८००-२३३-०२०२",
    "en": "Helpline: 1800-233-0202"
  },
  "1920 (Kumbh Helpline)": {
    "mr": "१९२० (कुंभ मदत कक्ष)",
    "hi": "१९२० (कुंभ हेल्पलाइन)",
    "en": "1920 (Kumbh Helpline)"
  },
  "/ शुभ यात्रा": {
    "mr": "/ शुभ यात्रा",
    "hi": "/ शुभ यात्रा",
    "en": "/ Safe Journey"
  },
  "Annachhatra, satvik, Jain & pure veg verified bhojanalayas.": {
    "mr": "अन्नछत्रे, सात्त्विक, जैन आणि शुद्ध शाकाहारी प्रमाणित भोजनालये.",
    "hi": "अन्नक्षेत्र, सात्विक, जैन और शुद्ध शाकाहारी प्रमाणित भोजनालय।",
    "en": "Annachhatra, satvik, Jain & pure veg verified bhojanalayas."
  },
  "Annakshetra & Food": {
    "mr": "अन्नक्षेत्र आणि महाप्रसाद",
    "hi": "अन्नक्षेत्र एवं महाप्रसाद",
    "en": "Annakshetra & Food"
  },
  "Auspicious Snan Timings:": {
    "mr": "शुभ स्नान वेळापत्रक:",
    "hi": "शुभ स्नान समय सारणी:",
    "en": "Auspicious Snan Timings:"
  },
  "Brahma Muhurta Snan: 04:00 AM – 07:30 AM | Mahasnan & Sandhya Deepotsav: 06:15 PM – 08:30 PM.": {
    "mr": "ब्राह्म मुहूर्त स्नान: पहाटे ०४:०० – सकाळी ०७:३० | महास्नान व संध्या दीपोत्सव: संध्याकाळी ०६:१५ – रात्री ०८:३०.",
    "hi": "ब्रह्म मुहूर्त स्नान: प्रातः ०४:०० – सुबह ०७:३० | महास्नान एवं संध्या दीपोत्सव: सायं ०६:१५ – रात्रि ०८:३०।",
    "en": "Brahma Muhurta Snan: 04:00 AM – 07:30 AM | Mahasnan & Sandhya Deepotsav: 06:15 PM – 08:30 PM."
  },
  "Brahmagiri Mountain Source": {
    "mr": "ब्रह्मगिरी पर्वत उगमस्थान",
    "hi": "ब्रह्मगिरि पर्वत उद्गम स्थल",
    "en": "Brahmagiri Mountain Source"
  },
  "Choose a Guide for this Circuit": {
    "mr": "या परिक्रमेसाठी मार्गदर्शक निवडा",
    "hi": "इस परिक्रमा के लिए गाइड चुनें",
    "en": "Choose a Guide for this Circuit"
  },
  "Complete Kumbh Experience": {
    "mr": "संपूर्ण कुंभ अनुभव",
    "hi": "सम्पूर्ण कुंभ अनुभव",
    "en": "Complete Kumbh Experience"
  },
  "Complete Kumbh Pilgrimage Roadmap": {
    "mr": "संपूर्ण कुंभ तीर्थयात्रा मार्गदर्शिका",
    "hi": "सम्पूर्ण कुंभ तीर्थयात्रा रोडमैप",
    "en": "Complete Kumbh Pilgrimage Roadmap"
  },
  "Confluence of Kapila and Godavari rivers where ancient sages and Rishis performed penance.": {
    "mr": "कपिला व गोदावरी नद्यांचा संगम जेथे प्राचीन ऋषी-मुनींनी तपश्चर्या केली.",
    "hi": "कपिला और गोदावरी नदियों का संगम जहाँ प्राचीन ऋषियों ने तपस्या की।",
    "en": "Confluence of Kapila and Godavari rivers where ancient sages and Rishis performed penance."
  },
  "Darshan & Pradakshina": {
    "mr": "दर्शन आणि प्रदक्षिणा",
    "hi": "दर्शन एवं परिक्रमा",
    "en": "Darshan & Pradakshina"
  },
  "Darshan & Rudrabhishek": {
    "mr": "दर्शन आणि रुद्राभिषेक",
    "hi": "दर्शन एवं रुद्राभिषेक",
    "en": "Darshan & Rudrabhishek"
  },
  "Fair Range Guidance": {
    "mr": "वाजवी दर मार्गदर्शन",
    "hi": "उचित मूल्य मार्गदर्शन",
    "en": "Fair Range Guidance"
  },
  "First Aid Post": {
    "mr": "प्रथमोपचार केंद्र",
    "hi": "प्राथमिक चिकित्सा केंद्र",
    "en": "First Aid Post"
  },
  "Flag rate gouging, fake guides or sanitation alerts directly.": {
    "mr": "जादा दर, बनावट मार्गदर्शक किंवा अस्वच्छतेची तक्रार थेट नोंदवा.",
    "hi": "अत्यधिक किराया, फर्जी गाइड या अस्वच्छता की शिकायत सीधे दर्ज करें।",
    "en": "Flag rate gouging, fake guides or sanitation alerts directly."
  },
  "Govt Fact Cell": {
    "mr": "शासकीय तथ्य तपासणी कक्ष",
    "hi": "शासकीय तथ्य जांच प्रकोष्ठ",
    "en": "Govt Fact Cell"
  },
  "Holy Dip & Ganga Godavari Aarti": {
    "mr": "पवित्र स्नान आणि गंगा गोदावरी आरती",
    "hi": "पवित्र स्नान एवं गंगा गोदावरी आरती",
    "en": "Holy Dip & Ganga Godavari Aarti"
  },
  "Holy Ghats Pilgrimage Roadmap": {
    "mr": "पवित्र घाट तीर्थयात्रा मार्गदर्शिका",
    "hi": "पवित्र घाट तीर्थयात्रा रोडमैप",
    "en": "Holy Ghats Pilgrimage Roadmap"
  },
  "Holy Ghats Roadmap": {
    "mr": "पवित्र घाट मार्ग नकाशा",
    "hi": "पवित्र घाट मार्ग मानचित्र",
    "en": "Holy Ghats Roadmap"
  },
  "Immediate distress call, ambulance & nearest police outpost map.": {
    "mr": "तातडीचा मदत कॉल, रुग्णवाहिका आणि जवळच्या पोलीस चौकीचा नकाशा.",
    "hi": "तत्काल आपातकालीन कॉल, एम्बुलेंस और निकटतम पुलिस चौकी का नक्शा।",
    "en": "Immediate distress call, ambulance & nearest police outpost map."
  },
  "Kapaleshwar Mahadev Mandir": {
    "mr": "कपालेश्वर महादेव मंदिर",
    "hi": "कपालेश्वर महादेव मंदिर",
    "en": "Kapaleshwar Mahadev Mandir"
  },
  "Kumbhveer Civic Assistance": {
    "mr": "कुंभवीर नागरी साहाय्य",
    "hi": "कुंभवीर नागरिक सहायता",
    "en": "Kumbhveer Civic Assistance"
  },
  "Kushavarta Kund (Trimbakeshwar)": {
    "mr": "कुशावर्त कुंड (त्र्यंबकेश्वर)",
    "hi": "कुशावर्त कुंड (त्र्यंबकेश्वर)",
    "en": "Kushavarta Kund (Trimbakeshwar)"
  },
  "Lakshman Ghat & Sita Gufa": {
    "mr": "लक्ष्मण घाट आणि सीता गुंफा",
    "hi": "लक्ष्मण घाट एवं सीता गुफा",
    "en": "Lakshman Ghat & Sita Gufa"
  },
  "Marketplace rates represent indicative fair price ranges and vendor declarations. Administration does not guarantee or fix prices. Emergency facilities and civic helplines operate 24x7.": {
    "mr": "बाजारपेठेतील दर हे मार्गदर्शक वाजवी दर आणि विक्रेत्यांचे स्वयंघोषणापत्र आहेत. प्रशासन दर निश्चित करत नाही. आपत्कालीन सुविधा व मदत कक्ष २४ तास कार्यरत आहेत.",
    "hi": "बाज़ार की दरें सांकेतिक उचित मूल्य दायरा और विक्रेताओं की घोषणाएं हैं। प्रशासन मूल्य निर्धारित नहीं करता। आपातकालीन सेवाएँ २४ घंटे उपलब्ध हैं।",
    "en": "Marketplace rates represent indicative fair price ranges and vendor declarations. Administration does not guarantee or fix prices. Emergency facilities and civic helplines operate 24x7."
  },
  "Nashik & Trimbakeshwar Holy Ghats Circuit": {
    "mr": "नाशिक व त्र्यंबकेश्वर पवित्र घाट परिक्रमा",
    "hi": "नासिक एवं त्र्यंबकेश्वर पवित्र घाट परिक्रमा",
    "en": "Nashik & Trimbakeshwar Holy Ghats Circuit"
  },
  "Next 45 mins": {
    "mr": "पुढील ४५ मिनिटे",
    "hi": "अगले ४५ मिनट",
    "en": "Next 45 mins"
  },
  "Optimal": {
    "mr": "उत्तम वेळ",
    "hi": "उत्तम समय",
    "en": "Optimal"
  },
  "Optimal holy dip window:": {
    "mr": "पवित्र स्नानासाठी उत्तम वेळ:",
    "hi": "पवित्र स्नान हेतु उत्तम समय:",
    "en": "Optimal holy dip window:"
  },
  "Origin of Godavari at Ganga Dwar. Ancient hill pilgrimage where Sage Gautama worshipped.": {
    "mr": "गंगाद्वार येथे गोदावरी नदीचा उगम. प्राचीन पर्वत जेथे गौतम ऋषींनी आराधना केली.",
    "hi": "गंगाद्वार पर गोदावरी नदी का उद्गम। प्राचीन तीर्थ जहाँ गौतम ऋषि ने तपस्या की।",
    "en": "Origin of Godavari at Ganga Dwar. Ancient hill pilgrimage where Sage Gautama worshipped."
  },
  "PIB BUSTS: Ramkund bridge is NOT closed, bathing is normal": {
    "mr": "पीआयबी सत्यता पडताळणी: रामकुंड पूल बंद नाही, स्नान सुरळीत सुरू आहे",
    "hi": "पीआईबी तथ्य जांच: रामकुंड पुल बंद नहीं है, स्नान सामान्य रूप से जारी है",
    "en": "PIB BUSTS: Ramkund bridge is NOT closed, bathing is normal"
  },
  "PIB FACT CHECK • सत्यमेव जयते": {
    "mr": "पीआयबी तथ्य पडताळणी • सत्यमेव जयते",
    "hi": "पीआईबी फैक्ट चेक • सत्यमेव जयते",
    "en": "PIB FACT CHECK • Satyameva Jayate"
  },
  "PIB Fact-Check & Truth Feed": {
    "mr": "पीआयबी सत्यता पडताळणी व अधिकृत माहिती",
    "hi": "पीआईबी तथ्य जांच एवं आधिकारिक सूचना",
    "en": "PIB Fact-Check & Truth Feed"
  },
  "Panchavati": {
    "mr": "पंचवटी",
    "hi": "पंचवटी",
    "en": "Panchavati"
  },
  "Paste the WhatsApp message, video link, or verbal claim you heard. We forward high-priority claims immediately to the PIB & Police Ground Cell.": {
    "mr": "व्हाट्सअ‍ॅप संदेश, व्हिडिओ लिंक किंवा अफवा येथे टाका. आम्ही तत्काळ पीआयबी आणि पोलीस नियंत्रण कक्षाकडे पाठवू.",
    "hi": "व्हाट्सएप संदेश, वीडियो लिंक या सुनी हुई बात यहाँ साझा करें। हम तत्काल पीआईबी एवं पुलिस ग्राउंड सेल को भेजेंगे।",
    "en": "Paste the WhatsApp message, video link, or verbal claim you heard. We forward high-priority claims immediately to the PIB & Police Ground Cell."
  },
  "Ramkund Main Holy Snan Ghat": {
    "mr": "रामकुंड मुख्य पवित्र स्नान घाट",
    "hi": "रामकुंड मुख्य पवित्र स्नान घाट",
    "en": "Ramkund Main Holy Snan Ghat"
  },
  "Report a Rumor / Fake News": {
    "mr": "अफवा / खोटी बातमी कळवा",
    "hi": "अफवाह / झूठी खबर रिपोर्ट करें",
    "en": "Report a Rumor / Fake News"
  },
  "Sacred Peak": {
    "mr": "पवित्र शिखर",
    "hi": "पवित्र शिखर",
    "en": "Sacred Peak"
  },
  "Sacred central tank where Lord Rama performed Pitru Tarpan. Main Simhastha Kumbh Snan site.": {
    "mr": "पवित्र कुंड जेथे प्रभू श्रीरामाने पितृतर्पण केले. सिंहस्थ कुंभमेळ्याचे मुख्य स्नान स्थळ.",
    "hi": "पवित्र कुंड जहाँ प्रभु श्रीराम ने पितृ तर्पण किया था। सिंहस्थ कुंभ का मुख्य स्नान स्थल।",
    "en": "Sacred central tank where Lord Rama performed Pitru Tarpan. Main Simhastha Kumbh Snan site."
  },
  "Sangam Snan & Laxman Temple": {
    "mr": "संगम स्नान आणि लक्ष्मण मंदिर",
    "hi": "संगम स्नान एवं लक्ष्मण मंदिर",
    "en": "Sangam Snan & Laxman Temple"
  },
  "Shahi Snan Ghat & Jyotirlinga": {
    "mr": "शाही स्नान घाट आणि ज्योतिर्लिंग",
    "hi": "शाही स्नान घाट एवं ज्योतिर्लिंग",
    "en": "Shahi Snan Ghat & Jyotirlinga"
  },
  "Submit Suspicious Claim": {
    "mr": "संशयास्पद दावा सादर करा",
    "hi": "संदिग्ध सूचना दर्ज करें",
    "en": "Submit Suspicious Claim"
  },
  "Submit to PIB": {
    "mr": "पीआयबीकडे पाठवा",
    "hi": "पीआईबी को भेजें",
    "en": "Submit to PIB"
  },
  "Tapovan & Kapila Sangam": {
    "mr": "तपोवन आणि कपिला संगम",
    "hi": "तपोवन एवं कपिला संगम",
    "en": "Tapovan & Kapila Sangam"
  },
  "The holy pond from which River Godavari emerges into plains. Sacred bathing pool of Akhadas during Shahi Snan.": {
    "mr": "पवित्र कुंड जेथून गोदावरी नदी भूभागावर वाहते. शाही स्नानावेळी आखाड्यांचे पवित्र स्नान कुंड.",
    "hi": "पवित्र कुंड जहाँ से गोदावरी नदी मैदान में प्रवाहित होती है। शाही स्नान के समय अखाड़ों का मुख्य स्नान स्थल।",
    "en": "The holy pond from which River Godavari emerges into plains. Sacred bathing pool of Akhadas during Shahi Snan."
  },
  "The sacred 5 Banyan trees (Panch-Vat) and ancient cave where Devi Sita worshipped.": {
    "mr": "पवित्र ५ वटवृक्ष (पंचवटी) आणि प्राचीन गुंफा जेथे सीतामातेने पूजन केले.",
    "hi": "पवित्र ५ वटवृक्ष (पंचवटी) और प्राचीन गुफा जहाँ माता सीता ने पूजन किया था।",
    "en": "The sacred 5 Banyan trees (Panch-Vat) and ancient cave where Devi Sita worshipped."
  },
  "Trek & Gangadwar Darshan": {
    "mr": "गंगद्वार पदयात्रा आणि दर्शन",
    "hi": "गंगाद्वार पदयात्रा एवं दर्शन",
    "en": "Trek & Gangadwar Darshan"
  },
  "Trimbak": {
    "mr": "त्र्यंबकेश्वर",
    "hi": "त्र्यंबकेश्वर",
    "en": "Trimbak"
  },
  "Unique ancient Shiva temple where Lord Shiva did penance; only Shiva temple in India without Nandi.": {
    "mr": "भगवान शिवांचे एकमेव मंदिर जेथे नंदीची मूर्ती नाही; कपालेश्वर महादेवाने येथे प्रायश्चित्त केले.",
    "hi": "भगवान शिव का अद्वितीय प्राचीन मंदिर जहाँ नंदी की मूर्ति नहीं है; यहाँ शिवजी ने तपस्या की थी।",
    "en": "Unique ancient Shiva temple where Lord Shiva did penance; only Shiva temple in India without Nandi."
  },
  "View Roadmap": {
    "mr": "मार्गदर्शिका पहा",
    "hi": "रोडमैप देखें",
    "en": "View Roadmap"
  },
  "Viral WhatsApp rumor debunked. Structural safety certified by Nashik Municipal Corp & Police CCTV Zone A-1.": {
    "mr": "व्हाट्सअ‍ॅपवरील अफवेचे खंडन. नाशिक मनपा व पोलीस पथकाने पुलाची सुरक्षा प्रमाणित केली आहे.",
    "hi": "व्हाट्सएप अफवाह का खंडन। नासिक नगर निगम एवं पुलिस नियंत्रण कक्ष द्वारा सुरक्षा प्रमाणित की गई।",
    "en": "Viral WhatsApp rumor debunked. Structural safety certified by Nashik Municipal Corp & Police CCTV Zone A-1."
  },
  "Water Flow": {
    "mr": "नदी पाणी प्रवाह",
    "hi": "जल प्रवाह",
    "en": "Water Flow"
  },
  "e.g. Someone is claiming on WhatsApp that Godavari water level is unsafe and ghats are closed...": {
    "mr": "उदा. व्हाट्सअ‍ॅपवर दावा केला जात आहे की गोदावरीची पातळी वाढली असून घाट बंद आहेत...",
    "hi": "उदा. व्हाट्सएप पर दावा किया जा रहा है कि गोदावरी का जलस्तर बढ़ गया है और घाट बंद हैं...",
    "en": "e.g. Someone is claiming on WhatsApp that Godavari water level is unsafe and ghats are closed..."
  },
  "Real-Time Fare Board & Transit Rates - Kumbh Setu": {
    "mr": "थेट दर फलक व अधिकृत वाहतूक दर - कुंभसेतु",
    "hi": "लाइव किराया बोर्ड एवं अधिकृत परिवहन दरें - कुंभसेतु",
    "en": "Real-Time Fare Board & Transit Rates - Kumbh Setu"
  },
  "Auto, Bus & Transit Fares": {
    "mr": "रिक्षा, बस आणि वाहतूक दर",
    "hi": "ऑटो, बस एवं परिवहन किराया",
    "en": "Auto, Bus & Transit Fares"
  },
  "Interactive Route Map": {
    "mr": "परस्परसंवादी मार्ग नकाशा",
    "hi": "इंटरैक्टिव रूट मैप",
    "en": "Interactive Route Map"
  },
  "Explore the live map freely, pick any pickup and destination, and get official RTO fare predictions.": {
    "mr": "नकाशावर मुक्तपणे फिरवा, सुरुवात व गंतव्य ठिकाण निवडा आणि आरटीओ अधिकृत भाडे अंदाज मिळवा.",
    "hi": "नक्शे का स्वतंत्र उपयोग करें, पिकअप एवं गंतव्य चुनें और आरटीओ अधिकृत किराया अनुमान प्राप्त करें।",
    "en": "Explore the live map freely, pick any pickup and destination, and get official RTO fare predictions."
  },
  "Tap anywhere on map to move": {
    "mr": "हलवण्यासाठी नकाशावर कुठेही स्पर्श करा",
    "hi": "बदलने के लिए नक्शे पर कहीं भी टैप करें",
    "en": "Tap anywhere on map to move"
  },
  "Drop-off 🚩": {
    "mr": "गंतव्य स्थान 🚩",
    "hi": "गंतव्य स्थान 🚩",
    "en": "Drop-off 🚩"
  },
  "Quick Pilgrimage & Transit Hubs (Tap to set)": {
    "mr": "प्रमुख तीर्थक्षेत्रे व वाहतूक केंद्रे (निवडण्यासाठी टॅप करा)",
    "hi": "प्रमुख तीर्थस्थल एवं परिवहन केंद्र (चुनने हेतु टैप करें)",
    "en": "Quick Pilgrimage & Transit Hubs (Tap to set)"
  },
  "Ramkund Main Ghat (Panchavati)": {
    "mr": "रामकुंड मुख्य घाट (पंचवटी)",
    "hi": "रामकुंड मुख्य घाट (पंचवटी)",
    "en": "Ramkund Main Ghat (Panchavati)"
  },
  "Nashik Road Railway Station": {
    "mr": "नाशिक रोड रेल्वे स्थानक",
    "hi": "नासिक रोड रेलवे स्टेशन",
    "en": "Nashik Road Railway Station"
  },
  "CBS Central Bus Stand": {
    "mr": "सीबीएस मध्यवर्ती बस स्थानक",
    "hi": "सीबीएस सेंट्रल बस स्टैंड",
    "en": "CBS Central Bus Stand"
  },
  "CBS Central Bus Stand (4 km)": {
    "mr": "सीबीएस मध्यवर्ती बस स्थानक (४ किमी)",
    "hi": "सीबीएस सेंट्रल बस स्टैंड (४ किमी)",
    "en": "CBS Central Bus Stand (4 km)"
  },
  "Trimbakeshwar Temple": {
    "mr": "त्र्यंबकेश्वर मंदिर",
    "hi": "त्र्यंबकेश्वर मंदिर",
    "en": "Trimbakeshwar Temple"
  },
  "Trimbakeshwar Temple (28 km)": {
    "mr": "त्र्यंबकेश्वर मंदिर (२८ किमी)",
    "hi": "त्र्यंबकेश्वर मंदिर (२८ किमी)",
    "en": "Trimbakeshwar Temple (28 km)"
  },
  "Tapovan Sadhu Gram Hub": {
    "mr": "तपोवन साधू ग्राम केंद्र",
    "hi": "तपोवन साधु ग्राम केंद्र",
    "en": "Tapovan Sadhu Gram Hub"
  },
  "Tapovan Sadhu Gram (3.2 km)": {
    "mr": "तपोवन साधू ग्राम (३.२ किमी)",
    "hi": "तपोवन साधु ग्राम (३.२ किमी)",
    "en": "Tapovan Sadhu Gram (3.2 km)"
  },
  "Muktidham Temple": {
    "mr": "मुक्तिधाम मंदिर",
    "hi": "मुक्तिधाम मंदिर",
    "en": "Muktidham Temple"
  },
  "Muktidham Temple (9 km)": {
    "mr": "मुक्तिधाम मंदिर (९ किमी)",
    "hi": "मुक्तिधाम मंदिर (९ किमी)",
    "en": "Muktidham Temple (9 km)"
  },
  "Someshwar Waterfalls": {
    "mr": "सोमेश्वर धबधबा",
    "hi": "सोमेश्वर जलप्रपात",
    "en": "Someshwar Waterfalls"
  },
  "Someshwar Waterfalls (11 km)": {
    "mr": "सोमेश्वर धबधबा (११ किमी)",
    "hi": "सोमेश्वर जलप्रपात (११ किमी)",
    "en": "Someshwar Waterfalls (11 km)"
  },
  "Shree Kalaram Mandir": {
    "mr": "श्री काळाराम मंदिर",
    "hi": "श्री कालाराम मंदिर",
    "en": "Shree Kalaram Mandir"
  },
  "📍 Custom Pinned Location": {
    "mr": "📍 नकाशावर निवडलेले स्थान",
    "hi": "📍 मैप पर चुना गया स्थान",
    "en": "📍 Custom Pinned Location"
  },
  "Ramkund Ghat": {
    "mr": "रामकुंड घाट",
    "hi": "रामकुंड घाट",
    "en": "Ramkund Ghat"
  },
  "Nashik Rd Stn": {
    "mr": "नाशिक रोड स्थानक",
    "hi": "नासिक रोड स्टेशन",
    "en": "Nashik Rd Stn"
  },
  "CBS Bus Stand": {
    "mr": "सीबीएस बस स्थानक",
    "hi": "सीबीएस बस स्टैंड",
    "en": "CBS Bus Stand"
  },
  "Trimbakeshwar": {
    "mr": "त्र्यंबकेश्वर",
    "hi": "त्र्यंबकेश्वर",
    "en": "Trimbakeshwar"
  },
  "Tapovan Sadhugram": {
    "mr": "तपोवन साधूग्राम",
    "hi": "तपोवन साधुग्राम",
    "en": "Tapovan Sadhugram"
  },
  "Muktidham": {
    "mr": "मुक्तिधाम",
    "hi": "मुक्तिधाम",
    "en": "Muktidham"
  },
  "Someshwar": {
    "mr": "सोमेश्वर",
    "hi": "सोमेश्वर",
    "en": "Someshwar"
  },
  "Kalaram Mandir": {
    "mr": "काळाराम मंदिर",
    "hi": "कालाराम मंदिर",
    "en": "Kalaram Mandir"
  },
  "Transit Mode": {
    "mr": "प्रवास साधन",
    "hi": "परिवहन साधन",
    "en": "Transit Mode"
  },
  "Calculated Distance:": {
    "mr": "अंदाजित अंतर:",
    "hi": "अनुमानित दूरी:",
    "en": "Calculated Distance:"
  },
  "Live Route Predictor": {
    "mr": "थेट मार्ग व भाडे अंदाज",
    "hi": "लाइव रूट एवं किराया अनुमान",
    "en": "Live Route Predictor"
  },
  "Auto Rickshaw (Private Metered)": {
    "mr": "रिक्षा (स्वतंत्र मिटरप्रमाणे)",
    "hi": "ऑटो रिक्शा (व्यक्तिगत मीटर द्वारा)",
    "en": "Auto Rickshaw (Private Metered)"
  },
  "Shared Auto (Per Seat)": {
    "mr": "शेअर रिक्षा (प्रति सीट)",
    "hi": "शेयर ऑटो (प्रति सीट)",
    "en": "Shared Auto (Per Seat)"
  },
  "Citylink Municipal Bus": {
    "mr": "सिटीलिंक मनपा बस",
    "hi": "सिटीलिंक नगर बस",
    "en": "Citylink Municipal Bus"
  },
  "City Bus (Citylink)": {
    "mr": "सिटीलिंक बस",
    "hi": "सिटीलिंक बस",
    "en": "City Bus (Citylink)"
  },
  "E-Rickshaw (Green Zone)": {
    "mr": "ई-रिक्षा (हरित क्षेत्र)",
    "hi": "ई-रिक्शा (हरित क्षेत्र)",
    "en": "E-Rickshaw (Green Zone)"
  },
  "E-Rickshaw": {
    "mr": "ई-रिक्षा",
    "hi": "ई-रिक्शा",
    "en": "E-Rickshaw"
  },
  "Kumbh Cab / Taxi": {
    "mr": "कुंभ कॅब / टॅक्सी",
    "hi": "कुंभ कैब / टैक्सी",
    "en": "Kumbh Cab / Taxi"
  },
  "Kumbh Cab": {
    "mr": "कुंभ कॅब",
    "hi": "कुंभ कैब",
    "en": "Kumbh Cab"
  },
  "Private Auto": {
    "mr": "स्वतंत्र रिक्षा",
    "hi": "व्यक्तिगत ऑटो",
    "en": "Private Auto"
  },
  "Official RTO Tariff (₹)": {
    "mr": "अधिकृत आरटीओ दर (₹)",
    "hi": "अधिकृत आरटीओ किराया (₹)",
    "en": "Official RTO Tariff (₹)"
  },
  "Simhastha Municipal RTO Advisory 2027": {
    "mr": "सिंहस्थ मनपा व आरटीओ सूचना २०२७",
    "hi": "सिंहस्थ नगर निगम एवं आरटीओ परामर्श २०२७",
    "en": "Simhastha Municipal RTO Advisory 2027"
  },
  "Auto Rickshaws within Nashik city limits must charge strictly according to calibrated meter tariffs (₹26 base + ₹16.50/km).": {
    "mr": "नाशिक शहरात रिक्षाचालकांनी प्रमाणित मीटरनुसारच दर आकारणे बंधनकारक आहे (मूळ दर ₹२६ + ₹१६.५०/किमी).",
    "hi": "नासिक शहर में ऑटो चालकों द्वारा प्रमाणित मीटर के अनुसार ही किराया लेना अनिवार्य है (मूल ₹२६ + ₹१६.५०/किमी)।",
    "en": "Auto Rickshaws within Nashik city limits must charge strictly according to calibrated meter tariffs (₹26 base + ₹16.50/km)."
  },
  "Night Surcharge (12:00 AM – 05:00 AM):": {
    "mr": "रात्रीचा जादा दर (मध्यरात्री १२:०० – पहाटे ०५:००):",
    "hi": "रात्रि अधिभार (मध्यरात्रि १२:०० – प्रातः ०५:००):",
    "en": "Night Surcharge (12:00 AM – 05:00 AM):"
  },
  "Maximum 25% surcharge applicable over regular daytime fare.": {
    "mr": "नियमित दिवसाच्या दरापेक्षा जास्तीत जास्त २५% जादा दर लागू.",
    "hi": "नियमित दिन के किराए पर अधिकतम २५% अधिभार लागू।",
    "en": "Maximum 25% surcharge applicable over regular daytime fare."
  },
  "In case of meter refusal or demanding arbitrary prices, tap": {
    "mr": "मीटर नाकारल्यास किंवा अवाजवी भाडे मागितल्यास स्पर्श करा",
    "hi": "मीटर से मना करने या मनमाना किराया मांगने पर टैप करें",
    "en": "In case of meter refusal or demanding arbitrary prices, tap"
  },
  "or dial": {
    "mr": "किंवा फोन करा",
    "hi": "अथवा कॉल करें",
    "en": "or dial"
  },
  "Vehicle Plate / Auto Number (Optional)": {
    "mr": "रिक्षा किंवा गाडी क्रमांक (ऐच्छिक)",
    "hi": "गाड़ी या ऑटो नंबर (वैकल्पिक)",
    "en": "Vehicle Plate / Auto Number (Optional)"
  },
  "Price Demanded / Paid (₹)*": {
    "mr": "मागितलेली किंवा दिलेली रक्कम (₹)*",
    "hi": "मांगा गया या दिया गया किराया (₹)*",
    "en": "Price Demanded / Paid (₹)*"
  },
  "e.g. MH-15-AB-1234": {
    "mr": "उदा. MH-15-AB-1234",
    "hi": "उदा. MH-15-AB-1234",
    "en": "e.g. MH-15-AB-1234"
  },
  "e.g. 700": {
    "mr": "उदा. ७००",
    "hi": "उदा. ७००",
    "en": "e.g. 700"
  },
  "Discover verified local stalls, sacred puja samagri, pilgrim dharamshalas, satvik eateries & certified guides at fair market rates.": {
    "mr": "प्रमाणित स्थानिक दुकाने, पवित्र पूजा साहित्य, धर्मशाळा, सात्त्विक भोजनालये व परवानाधारक मार्गदर्शक वाजवी दरात शोधा.",
    "hi": "सत्यापित स्थानीय दुकानें, पवित्र पूजा सामग्री, धर्मशालाएं, सात्विक भोजनालय और प्रमाणित गाइड उचित मूल्य पर खोजें।",
    "en": "Discover verified local stalls, sacred puja samagri, pilgrim dharamshalas, satvik eateries & certified guides at fair market rates."
  },
  "All Services": {
    "mr": "सर्व सेवा",
    "hi": "सभी सेवाएँ",
    "en": "All Services"
  },
  "Local Bazaar & Stalls": {
    "mr": "स्थानिक बाजार व दुकाने",
    "hi": "स्थानीय बाज़ार एवं दुकानें",
    "en": "Local Bazaar & Stalls"
  },
  "Local Guides": {
    "mr": "स्थानिक मार्गदर्शक",
    "hi": "स्थानीय गाइड",
    "en": "Local Guides"
  },
  "Rickshaws & Transit": {
    "mr": "रिक्षा आणि वाहतूक",
    "hi": "ऑटो एवं परिवहन",
    "en": "Rickshaws & Transit"
  },
  "Eateries & Prasad": {
    "mr": "भोजनालये आणि प्रसाद",
    "hi": "भोजनालय एवं प्रसाद",
    "en": "Eateries & Prasad"
  },
  "Book Room": {
    "mr": "खोली आरक्षित करा",
    "hi": "कमरा बुक करें",
    "en": "Book Room"
  },
  "Verified Guide": {
    "mr": "प्रमाणित मार्गदर्शक",
    "hi": "प्रमाणित गाइड",
    "en": "Verified Guide"
  },
  "Contact Guide": {
    "mr": "मार्गदर्शकाशी संपर्क",
    "hi": "गाइड से संपर्क",
    "en": "Contact Guide"
  },
  "Base Point:": {
    "mr": "सुरुवात ठिकाण:",
    "hi": "आरंभ स्थल:",
    "en": "Base Point:"
  },
  "Base Point: Sita Gufa Chowk (300m)": {
    "mr": "सुरुवात: सीता गुंफा चौक (३०० मी)",
    "hi": "आरंभ स्थल: सीता गुफा चौक (३०० मी)",
    "en": "Base Point: Sita Gufa Chowk (300m)"
  },
  "Civic Food Feedback & Rate Desk": {
    "mr": "नागरी अन्न अभिप्राय व दर कक्ष",
    "hi": "नागरिक भोजन फीडबैक एवं दर प्रकोष्ठ",
    "en": "Civic Food Feedback & Rate Desk"
  },
  "Open Civic Feedback & Grievance": {
    "mr": "नागरी अभिप्राय व तक्रार नोंदवा",
    "hi": "नागरिक फीडबैक एवं शिकायत दर्ज करें",
    "en": "Open Civic Feedback & Grievance"
  },
  "Click for Direct Navigation →": {
    "mr": "थेट मार्गदर्शनासाठी येथे टॅप करा →",
    "hi": "सीधे रास्ते के लिए यहाँ टैप करें →",
    "en": "Click for Direct Navigation →"
  },
  "Ramkund Food & Prasadam Hub": {
    "mr": "रामकुंड अन्न व प्रसादम केंद्र",
    "hi": "रामकुंड भोजन एवं प्रसादम केंद्र",
    "en": "Ramkund Food & Prasadam Hub"
  },
  "Ramkund Ghat, Panchavati": {
    "mr": "रामकुंड घाट, पंचवटी",
    "hi": "रामकुंड घाट, पंचवटी",
    "en": "Ramkund Ghat, Panchavati"
  },
  "Ramkund, Nashik": {
    "mr": "रामकुंड, नाशिक",
    "hi": "रामकुंड, नासिक",
    "en": "Ramkund, Nashik"
  },
  "Verified Centers": {
    "mr": "प्रमाणित अन्नछत्रे",
    "hi": "प्रमाणित अन्नक्षेत्र",
    "en": "Verified Centers"
  },
  "Prices shown are vendor-declared and indicative community ranges. Administration does not guarantee or fix prices. If an eatery charges exorbitantly outside fair ranges, share civic feedback.": {
    "mr": "दर्शवलेले दर विक्रेत्यांनी जाहीर केलेले मार्गदर्शक दर आहेत. प्रशासन दर ठरवत नाही. कोणी जादा दर आकारल्यास नागरी अभिप्राय नोंदवा.",
    "hi": "प्रदर्शित दरें विक्रेताओं द्वारा घोषित सांकेतिक दरें हैं। प्रशासन मूल्य तय नहीं करता। यदि कोई अधिक दाम वसूले तो नागरिक फीडबैक दें।",
    "en": "Prices shown are vendor-declared and indicative community ranges. Administration does not guarantee or fix prices. If an eatery charges exorbitantly outside fair ranges, share civic feedback."
  },
  "Ambulance & Medical (108)": {
    "mr": "रुग्णवाहिका व वैद्यकीय मदत (१०८)",
    "hi": "एम्बुलेंस एवं चिकित्सा सहायता (१०८)",
    "en": "Ambulance & Medical (108)"
  },
  "CALL 112 / DISASTER DESK": {
    "mr": "११२ / आपत्ती कक्षाशी संपर्क करा",
    "hi": "११२ / आपदा प्रकोष्ठ से संपर्क करें",
    "en": "CALL 112 / DISASTER DESK"
  },
  "Average dispatch pickup: under 10 seconds": {
    "mr": "सरासरी कॉल उचलण्याचा वेळ: १० सेकंदांपेक्षा कमी",
    "hi": "औसत कॉल प्रतिक्रिया समय: १० सेकंड से कम",
    "en": "Average dispatch pickup: under 10 seconds"
  },
  "Civic Grid Nashik (2,165 Points)": {
    "mr": "नाशिक नागरी ग्रीड (२,१६५ मदत केंद्रे)",
    "hi": "नासिक नागरिक ग्रिड (२,१६५ सहायता केंद्र)",
    "en": "Civic Grid Nashik (2,165 Points)"
  },
  "Coordinates copied to clipboard": {
    "mr": "स्थान निर्देशांक कॉपी केले",
    "hi": "स्थान निर्देशांक कॉपी किए गए",
    "en": "Coordinates copied to clipboard"
  },
  "Direct Sector Channels": {
    "mr": "थेट क्षेत्रीय मदत वाहिन्या",
    "hi": "सीधे क्षेत्रीय सहायता चैनल",
    "en": "Direct Sector Channels"
  },
  "Emergency Assistance": {
    "mr": "आपत्कालीन साहाय्य",
    "hi": "आपातकालीन सहायता",
    "en": "Emergency Assistance"
  },
  "Emergency responders synced along Godavari Ghats": {
    "mr": "गोदावरी घाटावर आपत्कालीन रक्षक तैनात",
    "hi": "गोदावरी घाट पर आपातकालीन दल तैनात",
    "en": "Emergency responders synced along Godavari Ghats"
  },
  "GPS Locked": {
    "mr": "जीपीएस स्थान निश्चित",
    "hi": "जीपीएस लॉक",
    "en": "GPS Locked"
  },
  "Ghat Rescue Squad": {
    "mr": "घाट बचाव पथक",
    "hi": "घाट बचाव दल",
    "en": "Ghat Rescue Squad"
  },
  "Immediate Crisis Map": {
    "mr": "तातडीचा मदत नकाशा",
    "hi": "तत्काल सहायता नक्शा",
    "en": "Immediate Crisis Map"
  },
  "Instant one-touch dispatch to Nashik Kumbh Central Command & Municipal Safety Unit.": {
    "mr": "नाशिक कुंभ मध्यवर्ती नियंत्रण कक्ष व मनपा सुरक्षा पथकास एका स्पर्शात संपर्क.",
    "hi": "नासिक कुंभ केंद्रीय नियंत्रण कक्ष एवं नगर निगम सुरक्षा इकाई को एक स्पर्श में संदेश।",
    "en": "Instant one-touch dispatch to Nashik Kumbh Central Command & Municipal Safety Unit."
  },
  "Live Pilgrim Coordinates": {
    "mr": "थेट भाविक स्थान निर्देशांक",
    "hi": "लाइव तीर्थयात्री निर्देशांक",
    "en": "Live Pilgrim Coordinates"
  },
  "Dial": {
    "mr": "कॉल करा",
    "hi": "कॉल करें",
    "en": "Dial"
  },
  "1. Select Category": {
    "mr": "१. तक्रार प्रकार निवडा",
    "hi": "१. श्रेणी चुनें",
    "en": "1. Select Category"
  },
  "2. Establishment or Location": {
    "mr": "२. ठिकाण किंवा आस्थापना",
    "hi": "२. प्रतिष्ठान या स्थान",
    "en": "2. Establishment or Location"
  },
  "3. Issue Classification": {
    "mr": "३. समस्येचे स्वरूप",
    "hi": "३. समस्या का वर्गीकरण",
    "en": "3. Issue Classification"
  },
  "5. Proof / Photo Evidence": {
    "mr": "५. पुरावा / फोटो पुरावा",
    "hi": "५. प्रमाण / फ़ोटो साक्ष्य",
    "en": "5. Proof / Photo Evidence"
  },
  "6. Incident Details (Optional)": {
    "mr": "६. घटनेचा तपशील (ऐच्छिक)",
    "hi": "६. घटना का विवरण (वैकल्पिक)",
    "en": "6. Incident Details (Optional)"
  },
  "7. Mobile for Tracking (Optional)": {
    "mr": "७. मोबाईल क्रमांक (ट्रॅकिंगसाठी, ऐच्छिक)",
    "hi": "७. मोबाइल नंबर (ट्रैकिंग हेतु, वैकल्पिक)",
    "en": "7. Mobile for Tracking (Optional)"
  },
  "Attach Receipt, Meter, or Bill Board": {
    "mr": "पावती, मीटर किंवा दरफलकाचा फोटो जोडा",
    "hi": "रसीद, मीटर या दर बोर्ड का फ़ोटो जोड़ें",
    "en": "Attach Receipt, Meter, or Bill Board"
  },
  "Auto / Transport": {
    "mr": "रिक्षा / वाहतूक",
    "hi": "ऑटो / परिवहन",
    "en": "Auto / Transport"
  },
  "Civic Verification Protocol": {
    "mr": "नागरी पडताळणी नियमावली",
    "hi": "नागरिक सत्यापन नियमावली",
    "en": "Civic Verification Protocol"
  },
  "Community Range Comparison": {
    "mr": "समुदाय दर तुलना",
    "hi": "सामुदायिक दर तुलना",
    "en": "Community Range Comparison"
  },
  "Demanded (मागितलेली रक्कम)": {
    "mr": "मागितलेली रक्कम",
    "hi": "मांगी गई राशि",
    "en": "Demanded (मागितलेली रक्कम)"
  },
  "Dispatched to Squad": {
    "mr": "दक्षता पथकाकडे वर्ग",
    "hi": "दस्ता दल को प्रेषित",
    "en": "Dispatched to Squad"
  },
  "Done & Return to Home": {
    "mr": "पूर्ण करा व मुख्यपृष्ठावर जा",
    "hi": "पूर्ण करें और मुख्यपृष्ठ पर लौटें",
    "en": "Done & Return to Home"
  },
  "Establishment Name or Stall ID": {
    "mr": "दुकान / स्टॉलचे नाव किंवा क्रमांक",
    "hi": "दुकान / स्टॉल का नाम या नंबर",
    "en": "Establishment Name or Stall ID"
  },
  "False Information": {
    "mr": "खोटी / दिशाभूल करणारी माहिती",
    "hi": "झूठी / भ्रामक जानकारी",
    "en": "False Information"
  },
  "Immediate Help Call 112": {
    "mr": "तातडीच्या मदतीसाठी ११२ वर कॉल करा",
    "hi": "तत्काल सहायता हेतु ११२ पर कॉल करें",
    "en": "Immediate Help Call 112"
  },
  "In Audit": {
    "mr": "तपासणी सुरू",
    "hi": "जांच जारी",
    "en": "In Audit"
  },
  "Location / Sector": {
    "mr": "ठिकाण / विभाग",
    "hi": "स्थान / सेक्टर",
    "en": "Location / Sector"
  },
  "Mobile Number (Optional)": {
    "mr": "मोबाईल नंबर (ऐच्छिक)",
    "hi": "मोबाइल नंबर (वैकल्पिक)",
    "en": "Mobile Number (Optional)"
  },
  "Notice Dispatched to Zone Squad": {
    "mr": "क्षेत्रीय भरारी पथकाकडे सूचना पाठवली",
    "hi": "क्षेत्रीय उड़न दस्ते को नोटिस भेजा गया",
    "en": "Notice Dispatched to Zone Squad"
  },
  "Official / Fair Ceiling (प्रमाणित कमाल दर)": {
    "mr": "अधिकृत / प्रमाणित कमाल दर",
    "hi": "आधिकारिक / प्रमाणित अधिकतम दर",
    "en": "Official / Fair Ceiling (प्रमाणित कमाल दर)"
  },
  "Overcharging / Gouging": {
    "mr": "जादा दर आकारणी / फसवणूक",
    "hi": "अत्यधिक मूल्य वसूली / धोखाधड़ी",
    "en": "Overcharging / Gouging"
  },
  "Photo / Receipt Evidence": {
    "mr": "फोटो / पावती पुरावा",
    "hi": "फ़ोटो / रसीद साक्ष्य",
    "en": "Photo / Receipt Evidence"
  },
  "Pooja Samagri / Vendor": {
    "mr": "पूजा साहित्य / विक्रेता",
    "hi": "पूजा सामग्री / विक्रेता",
    "en": "Pooja Samagri / Vendor"
  },
  "Refused Standard Rate": {
    "mr": "प्रमाणित दर देण्यास नकार",
    "hi": "मानक दर लेने से इनकार",
    "en": "Refused Standard Rate"
  },
  "Report Submitted to Civic Squad": {
    "mr": "तक्रार नागरी पथकाकडे नोंदवली",
    "hi": "शिकायत नागरिक दस्ते को दर्ज कराई गई",
    "en": "Report Submitted to Civic Squad"
  },
  "Room / Stay": {
    "mr": "खोली / धर्मशाळा मुक्काम",
    "hi": "कमरा / धर्मशाला आवास",
    "en": "Room / Stay"
  },
  "Security & Lost / Found": {
    "mr": "सुरक्षा आणि हरवले / सापडले",
    "hi": "सुरक्षा एवं खोया / पाया",
    "en": "Security & Lost / Found"
  },
  "Submit Grievance": {
    "mr": "तक्रार नोंदवा",
    "hi": "शिकायत दर्ज करें",
    "en": "Submit Grievance"
  },
  "Submit Notice": {
    "mr": "सूचना सादर करा",
    "hi": "नोटिस सबमिट करें",
    "en": "Submit Notice"
  },
  "Submitted": {
    "mr": "नोंदणी झाली",
    "hi": "दर्ज की गई",
    "en": "Submitted"
  },
  "Tap to take picture or upload receipt": {
    "mr": "फोटो काढण्यासाठी किंवा पावती जोडण्यासाठी टॅप करा",
    "hi": "फ़ोटो खींचने या रसीद अपलोड करने हेतु टैप करें",
    "en": "Tap to take picture or upload receipt"
  },
  "Tracking Token:": {
    "mr": "तक्रार ट्रॅकिंग क्रमांक:",
    "hi": "शिकायत ट्रैकिंग नंबर:",
    "en": "Tracking Token:"
  },
  "Unhygienic / Unsafe": {
    "mr": "अस्वच्छ / असुरक्षित परिस्थिती",
    "hi": "अस्वच्छ / असुरक्षित स्थिति",
    "en": "Unhygienic / Unsafe"
  },
  "Upload / Take Photo": {
    "mr": "फोटो अपलोड करा / काढा",
    "hi": "फ़ोटो अपलोड करें / खींचें",
    "en": "Upload / Take Photo"
  },
  "Upload Photo / Bill (Optional)": {
    "mr": "फोटो / बिल जोडा (ऐच्छिक)",
    "hi": "फ़ोटो / बिल अपलोड करें (वैकल्पिक)",
    "en": "Upload Photo / Bill (Optional)"
  },
  "Your report has been logged and shared with NMC Squad A-1. You will receive an SMS update if contact details were provided.": {
    "mr": "आपली तक्रार मनपा पथक A-1 कडे नोंदवली आहे. मोबाईल नंबर दिला असल्यास आपल्याला एसएमएस पाठवला जाईल.",
    "hi": "आपकी शिकायत नगर निगम दस्ते A-1 को दर्ज करा दी गई है। यदि मोबाइल नंबर दिया है तो एसएमएस भेजा जाएगा।",
    "en": "Your report has been logged and shared with NMC Squad A-1. You will receive an SMS update if contact details were provided."
  },
  "Booking Confirmed": {
    "mr": "नोंदणी निश्चित झाली",
    "hi": "बुकिंग पक्की हुई",
    "en": "Booking Confirmed"
  },
  "Booking ID:": {
    "mr": "नोंदणी क्रमांक:",
    "hi": "बुकिंग आईडी:",
    "en": "Booking ID:"
  },
  "Fair Price Verified": {
    "mr": "वाजवी दर प्रमाणित",
    "hi": "उचित मूल्य सत्यापित",
    "en": "Fair Price Verified"
  },
  "Official Civic Voucher": {
    "mr": "अधिकृत नागरी व्हाऊचर",
    "hi": "आधिकारिक नागरिक वाउचर",
    "en": "Official Civic Voucher"
  },
  "Download Pass / PDF": {
    "mr": "पास / पावती डाउनलोड करा",
    "hi": "पास / रसीद डाउनलोड करें",
    "en": "Download Pass / PDF"
  },
  "Share via WhatsApp": {
    "mr": "व्हाट्सअ‍ॅपवर शेअर करा",
    "hi": "व्हाट्सएप पर साझा करें",
    "en": "Share via WhatsApp"
  },
  "Back to Marketplace": {
    "mr": "बाजारपेठेकडे परत जा",
    "hi": "बाज़ार पर वापस जाएं",
    "en": "Back to Marketplace"
  },
  "Return to Home": {
    "mr": "मुख्यपृष्ठावर परत जा",
    "hi": "मुख्यपृष्ठ पर वापस जाएं",
    "en": "Return to Home"
  },
  "Civic Operator & Vendor Portal": {
    "mr": "नागरी चालक व विक्रेता पोर्टल",
    "hi": "नागरिक संचालक एवं विक्रेता पोर्टल",
    "en": "Civic Operator & Vendor Portal"
  },
  "Manage Stall, Rate Benchmarks & Orders": {
    "mr": "स्टॉल, दर मानक आणि ऑर्डर व्यवस्थापन",
    "hi": "स्टॉल, दर मानक एवं ऑर्डर प्रबंधन",
    "en": "Manage Stall, Rate Benchmarks & Orders"
  },
  "My Stall": {
    "mr": "माझा स्टॉल",
    "hi": "मेरा स्टॉल",
    "en": "My Stall"
  },
  "Orders": {
    "mr": "मागण्या / ऑर्डर्स",
    "hi": "ऑर्डर्स / मांग",
    "en": "Orders"
  },
  "Reviews": {
    "mr": "अभिप्राय / पुनरावलोकने",
    "hi": "समीक्षाएं / रेटिंग",
    "en": "Reviews"
  },
  "Fair Price": {
    "mr": "वाजवी दर",
    "hi": "उचित मूल्य",
    "en": "Fair Price"
  },
  "Exit": {
    "mr": "बाहेर पडा",
    "hi": "बाहर निकलें",
    "en": "Exit"
  },
  "1. Full Name (संपूर्ण नाव)": {
    "mr": "१. संपूर्ण नाव",
    "hi": "१. पूरा नाम",
    "en": "1. Full Name (संपूर्ण नाव)"
  },
  "2. Email ID (ईमेल पत्ता)": {
    "mr": "२. ईमेल पत्ता",
    "hi": "२. ईमेल पता",
    "en": "2. Email ID (ईमेल पत्ता)"
  },
  "3. Mobile Number (मोबाईल क्रमांक)": {
    "mr": "३. मोबाईल क्रमांक",
    "hi": "३. मोबाइल नंबर",
    "en": "3. Mobile Number (मोबाईल क्रमांक)"
  },
  "4. Business / Stall Name (व्यवसाय / दुकानाचे नाव)": {
    "mr": "४. व्यवसाय / दुकानाचे नाव",
    "hi": "४. व्यवसाय / दुकान का नाम",
    "en": "4. Business / Stall Name"
  },
  "5. Stall Category (स्टॉल प्रकार)": {
    "mr": "५. स्टॉल प्रकार",
    "hi": "५. स्टॉल श्रेणी",
    "en": "5. Stall Category"
  },
  "6. Nashik Address / Sector (पत्ता / विभाग)": {
    "mr": "६. नाशिक पत्ता / विभाग",
    "hi": "६. नासिक पता / सेक्टर",
    "en": "6. Nashik Address / Sector"
  },
  "7. Fair Price Pledge (वाजवी दर शपथपत्र)": {
    "mr": "७. वाजवी दर शपथपत्र",
    "hi": "७. उचित मूल्य शपथ",
    "en": "7. Fair Price Pledge"
  },
  "I solemnly swear to adhere to certified statutory caps and never gouge pilgrims.": {
    "mr": "मी गांभीर्याने शपथ घेतो की मी प्रमाणित कमाल दरांचे पालन करेन आणि भाविकांकडून जादा दर घेणार नाही.",
    "hi": "मैं सत्यनिष्ठा से शपथ लेता हूँ कि मैं प्रमाणित अधिकतम दरों का पालन करूँगा और तीर्थयात्रियों से अधिक मूल्य नहीं वसूलूँगा।",
    "en": "I solemnly swear to adhere to certified statutory caps and never gouge pilgrims."
  },
  "Submit Vendor Registration": {
    "mr": "विक्रेता नोंदणी अर्ज सादर करा",
    "hi": "विक्रेता पंजीकरण आवेदन जमा करें",
    "en": "Submit Vendor Registration"
  },
  "Vendor ID / Registration No.": {
    "mr": "विक्रेता ओळख / नोंदणी क्रमांक",
    "hi": "विक्रेता पहचान / पंजीकरण संख्या",
    "en": "Vendor ID / Registration No."
  },
  "Registered Mobile Number": {
    "mr": "नोंदणीकृत मोबाईल क्रमांक",
    "hi": "पंजीकृत मोबाइल नंबर",
    "en": "Registered Mobile Number"
  },
  "Send OTP": {
    "mr": "ओटीपी पाठवा",
    "hi": "ओटीपी भेजें",
    "en": "Send OTP"
  },
  "Verify & Login": {
    "mr": "पडताळणी करा व प्रवेश करा",
    "hi": "सत्यापित करें और लॉगिन करें",
    "en": "Verify & Login"
  },
  "Active Stall Listings": {
    "mr": "सक्रिय स्टॉल नोंदी",
    "hi": "सक्रिय स्टॉल लिस्टिंग",
    "en": "Active Stall Listings"
  },
  "Total Orders Today": {
    "mr": "आजच्या एकूण ऑर्डर्स",
    "hi": "आज के कुल ऑर्डर्स",
    "en": "Total Orders Today"
  },
  "Fair Price Compliance Score": {
    "mr": "वाजवी दर अनुपालन गुण",
    "hi": "उचित मूल्य अनुपालन स्कोर",
    "en": "Fair Price Compliance Score"
  },
  "Customer Ratings": {
    "mr": "ग्राहक अभिप्राय",
    "hi": "ग्राहक रेटिंग",
    "en": "Customer Ratings"
  },
  "Statutory Fair Price Guidelines 2027": {
    "mr": "वैधानिक वाजवी दर मार्गदर्शक तत्त्वे २०२७",
    "hi": "वैधानिक उचित मूल्य दिशा-निर्देश २०२७",
    "en": "Statutory Fair Price Guidelines 2027"
  },
  "Reported Price Inconsistencies": {
    "mr": "नोंदवलेल्या दर विसंगती",
    "hi": "रिपोर्ट की गई मूल्य विसंगतियां",
    "en": "Reported Price Inconsistencies"
  },
  "Price Flags": {
    "mr": "दर इशारे",
    "hi": "मूल्य चेतावनी",
    "en": "Price Flags"
  },
  "Resolve Flag": {
    "mr": "समस्या निवारण करा",
    "hi": "समस्या का समाधान करें",
    "en": "Resolve Flag"
  },
  "Pending Review": {
    "mr": "तपासणी प्रलंबित",
    "hi": "समीक्षा लंबित",
    "en": "Pending Review"
  },
  "Verified Merchant": {
    "mr": "प्रमाणित व्यापारी",
    "hi": "सत्यापित व्यापारी",
    "en": "Verified Merchant"
  },
  "Police & Security Administration Terminal": {
    "mr": "पोलीस व सुरक्षा प्रशासन टर्मिनल",
    "hi": "पुलिस एवं सुरक्षा प्रशासन टर्मिनल",
    "en": "Police & Security Administration Terminal"
  },
  "Simhastha Apex Security Unit • Zone A-1": {
    "mr": "सिंहस्थ सर्वोच्च सुरक्षा पथक • विभाग A-1",
    "hi": "सिंहस्थ शीर्ष सुरक्षा इकाई • ज़ोन A-1",
    "en": "Simhastha Apex Security Unit • Zone A-1"
  },
  "Officer Badge / ID": {
    "mr": "अधिकारी बिल्ला / ओळख क्रमांक",
    "hi": "अधिकारी बैज / आईडी",
    "en": "Officer Badge / ID"
  },
  "Official Secure PIN": {
    "mr": "अधिकृत सुरक्षा पिन",
    "hi": "आधिकारिक सुरक्षा पिन",
    "en": "Official Secure PIN"
  },
  "Duty Terminal Login": {
    "mr": "ड्युटी टर्मिनल लॉगिन",
    "hi": "ड्यूटी टर्मिनल लॉगिन",
    "en": "Duty Terminal Login"
  },
  "AI Radar": {
    "mr": "एआय गर्दी रडार",
    "hi": "एआई भीड़ रडार",
    "en": "AI Radar"
  },
  "Live Escalation Feed": {
    "mr": "थेट तक्रार प्रवाह",
    "hi": "लाइव शिकायत प्रवाह",
    "en": "Live Escalation Feed"
  },
  "Investigate": {
    "mr": "चौकशी करा",
    "hi": "जांच करें",
    "en": "Investigate"
  },
  "Close Case": {
    "mr": "खटला निकाली काढा",
    "hi": "केस बंद करें",
    "en": "Close Case"
  },
  "High Alert": {
    "mr": "अतिदक्षतेचा इशारा",
    "hi": "हाई अलर्ट",
    "en": "High Alert"
  },
  "Moderate": {
    "mr": "मध्यम",
    "hi": "मध्यम",
    "en": "Moderate"
  },
  "Active Hotspots": {
    "mr": "सक्रिय गर्दी क्षेत्रे",
    "hi": "सक्रिय भीड़ क्षेत्र",
    "en": "Active Hotspots"
  },
  "Crowd Density Live": {
    "mr": "थेट गर्दी घनता",
    "hi": "लाइव भीड़ घनत्व",
    "en": "Crowd Density Live"
  },
  "Facial Recognition Vector Match": {
    "mr": "चेहरा ओळख पडताळणी",
    "hi": "चेहरा पहचान मिलान",
    "en": "Facial Recognition Vector Match"
  },
  "+ Add Officer Field Note": {
    "mr": "+ अधिकारी क्षेत्रीय नोंद जोडा",
    "hi": "+ अधिकारी फील्ड नोट जोड़ें",
    "en": "+ Add Officer Field Note"
  },
  "Police Terminal Settings": {
    "mr": "पोलीस टर्मिनल सेटिंग्ज",
    "hi": "पुलिस टर्मिनल सेटिंग्स",
    "en": "Police Terminal Settings"
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

  // Core Pattern Matcher for Dynamic Content (Reviews, Distances, Times, Rates)
  function matchDynamicPattern(str, targetLang) {
    if (!str || typeof str !== 'string') return null;
    const t = str.trim();

    // 1. Reviews: "(1,042 reviews)"
    let m = t.match(/^\((\d+[\d,]*)\s*reviews?\)$/i);
    if (m) {
      return targetLang === 'mr' ? `(${m[1]} पुनरावलोकने)` : (targetLang === 'hi' ? `(${m[1]} समीक्षाएं)` : `(${m[1]} reviews)`);
    }

    // 2. Tours: "(184 tours)"
    m = t.match(/^\((\d+[\d,]*)\s*tours?\)$/i);
    if (m) {
      return targetLang === 'mr' ? `(${m[1]} दौरे)` : (targetLang === 'hi' ? `(${m[1]} टूर)` : `(${m[1]} tours)`);
    }

    // 3. Pax: "(3 pax)"
    m = t.match(/^\((\d+[\d,]*)\s*pax\)$/i);
    if (m) {
      return targetLang === 'mr' ? `(${m[1]} प्रवासी)` : (targetLang === 'hi' ? `(${m[1]} यात्री)` : `(${m[1]} pax)`);
    }

    // 4. Walking distance: "(7 min walk)"
    m = t.match(/^\((\d+[\d,]*)\s*mins?\s*walk\)$/i);
    if (m) {
      return targetLang === 'mr' ? `(${m[1]} मिनिटे चालत)` : (targetLang === 'hi' ? `(${m[1]} मिनट पैदल)` : `(${m[1]} min walk)`);
    }

    // 5. Distance: "1.2 km away" or "120m away"
    m = t.match(/^(\d+[\d,.]*)\s*(?:km|km\s*away)(?:\s*•\s*(.*))?$/i);
    if (m) {
      const extra = m[2] ? translateText(m[2], targetLang) : '';
      if (targetLang === 'mr') return extra ? `${m[1]} किमी अंतरावर • ${extra}` : `${m[1]} किमी अंतरावर`;
      if (targetLang === 'hi') return extra ? `${m[1]} किमी दूर • ${extra}` : `${m[1]} किमी दूर`;
      return t;
    }

    m = t.match(/^(\d+[\d,.]*)\s*(?:m|m\s*away)(?:\s*•\s*(.*))?$/i);
    if (m) {
      const extra = m[2] ? translateText(m[2], targetLang) : '';
      if (targetLang === 'mr') return extra ? `${m[1]} मी अंतरावर • ${extra}` : `${m[1]} मी अंतरावर`;
      if (targetLang === 'hi') return extra ? `${m[1]} मी दूर • ${extra}` : `${m[1]} मी दूर`;
      return t;
    }

    // 6. Time ago: "12m ago", "2 hrs ago"
    m = t.match(/^(\d+)\s*m\s*ago$/i);
    if (m) {
      return targetLang === 'mr' ? `${m[1]} मिनिटांपूर्वी` : (targetLang === 'hi' ? `${m[1]} मिनट पहले` : `${m[1]}m ago`);
    }
    m = t.match(/^(\d+)\s*hrs?\s*ago$/i);
    if (m) {
      return targetLang === 'mr' ? `${m[1]} तासांपूर्वी` : (targetLang === 'hi' ? `${m[1]} घंटे पहले` : `${m[1]} hrs ago`);
    }

    // 7. Rates: "/ night", "/ satvik thali", "/ full half-day tour"
    if (t.startsWith('/')) {
      const rest = t.substring(1).trim();
      const transRest = translateText(rest, targetLang);
      if (transRest && transRest !== rest) {
        return `/ ${transRest}`;
      }
    }

    return null;
  }

  function translateText(str, targetLang) {
    if (!str || typeof str !== 'string') return str;
    const trimmed = str.trim();
    if (!trimmed) return str;

    // 0. Check dynamic pattern (reviews, distances, timers)
    const dynMatch = matchDynamicPattern(trimmed, targetLang);
    if (dynMatch) return dynMatch;

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
    if (el.closest('#kumbh-lang-modal')) return false;
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

  document.addEventListener('click', function (e) {
    const target = e.target;
    if (isLangButton(target)) {
      e.preventDefault();
      e.stopPropagation();
      openLanguageModal();
    }
  }, true);

  function ensureLanguageButtonOnPage() {
    if (document.getElementById('lang-switch-group')) return;

    const header = document.querySelector('header');
    if (header) {
      const headerRight = header.querySelector('.flex.items-center:last-child');
      if (headerRight && !headerRight.querySelector('[aria-label*="Language" i], .lang-dropdown-trigger')) {
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

  function init() {
    createLanguageModal();
    ensureLanguageButtonOnPage();
    const currentLang = getSavedLang();
    document.documentElement.lang = currentLang;
    applyTranslations(currentLang);
    updateLanguageUIElements(currentLang);

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

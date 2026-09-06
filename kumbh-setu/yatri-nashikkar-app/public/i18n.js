/**
 * KumbhSetu (कुंभसेतु) — Comprehensive Trilingual Translation Engine
 * Official Languages:
 *   - English (en)
 *   - Marathi (mr / मराठी)
 *   - Hindi (hi / हिंदी)
 *
 * Provides accurate, natural, culturally respectful translations across all 20 screens:
 * Pilgrims (Yatri), Local Citizens & Vendors (Nashikkar), Police & Administration.
 */

(function () {
  'use strict';

  const TRANSLATIONS = {
    // -------------------------------------------------------------
    // Global & Top Navigation
    // -------------------------------------------------------------
    "Official Portal": { mr: "अधिकृत पोर्टल", hi: "आधिकारिक पोर्टल", en: "Official Portal" },
    "Nashik Municipal Corporation & District Apex": { mr: "नाशिक महानगरपालिका व जिल्हा प्रशासन", hi: "नासिक नगर निगम एवं जिला प्रशासन", en: "Nashik Municipal Corporation & District Apex" },
    "Nashik 2027": { mr: "नाशिक २०२७", hi: "नासिक २०२७", en: "Nashik 2027" },
    "कुंभ सेतू": { mr: "कुंभसेतु", hi: "कुंभसेतु", en: "Kumbh Setu" },
    "KUMBH SETU": { mr: "कुंभसेतु", hi: "कुंभसेतु", en: "Kumbh Setu" },
    "कुंभसेतु": { mr: "कुंभसेतु", hi: "कुंभसेतु", en: "Kumbh Setu" },
    "Civic Trust & Fair Pricing • Nashik 2027": { mr: "नागरी विश्वास आणि वाजवी दर • नाशिक २०२७", hi: "नागरिक विश्वास एवं उचित मूल्य • नासिक २०२७", en: "Civic Trust & Fair Pricing • Nashik 2027" },
    "Truth, trust, and fair prices for sacred journeys.": { mr: "पवित्र यात्रेसाठी सत्य, विश्वास आणि वाजवी दर.", hi: "पवित्र यात्रा के लिए सत्य, विश्वास और उचित मूल्य।", en: "Truth, trust, and fair prices for sacred journeys." },
    "Simhastha Kumbh Mela Authority • Government of Maharashtra": { mr: "सिंहस्थ कुंभमेळा प्राधिकरण • महाराष्ट्र शासन", hi: "सिंहस्थ कुंभ मेला प्राधिकरण • महाराष्ट्र शासन", en: "Simhastha Kumbh Mela Authority • Government of Maharashtra" },
    "Police & Administration Terminal →": { mr: "पोलीस व प्रशासन टर्मिनल →", hi: "पुलिस एवं प्रशासन टर्मिनल →", en: "Police & Administration Terminal →" },
    "Police & Administration Terminal": { mr: "पोलीस व प्रशासन टर्मिनल", hi: "पुलिस एवं प्रशासन टर्मिनल", en: "Police & Administration Terminal" },
    "Change Role": { mr: "भूमिका बदला", hi: "भूमिका बदलें", en: "Change Role" },
    "Official Gazette": { mr: "अधिकृत राजपत्रातील दर", hi: "आधिकारिक राजपत्र दर", en: "Official Gazette" },

    // -------------------------------------------------------------
    // Role Selector (index.html)
    // -------------------------------------------------------------
    "I'm a Yatri": { mr: "मी एक भाविक / यात्री आहे", hi: "मैं एक तीर्थयात्री हूँ", en: "I'm a Yatri" },
    "तीर्थयात्री": { mr: "तीर्थयात्री", hi: "तीर्थयात्री", en: "Pilgrim / Yatri" },
    "Public Access": { mr: "सार्वजनिक प्रवेश", hi: "सार्वजनिक प्रवेश", en: "Public Access" },
    "Public access — Fair marketplace rates, Ghat crowd status, food finder, issue reporting & emergency support. No login needed.": {
      mr: "सार्वजनिक प्रवेश — वाजवी बाजार दर, घाट गर्दी स्थिती, अन्नक्षेत्र शोधक, तक्रार नोंदणी व आपत्कालीन मदत. लॉगिनची गरज नाही.",
      hi: "सार्वजनिक प्रवेश — उचित बाज़ार दर, घाट भीड़ स्थिति, अन्नक्षेत्र खोज, शिकायत दर्ज व आपातकालीन सहायता। लॉगिन की आवश्यकता नहीं।",
      en: "Public access — Fair marketplace rates, Ghat crowd status, food finder, issue reporting & emergency support. No login needed."
    },
    "Certified Caps": { mr: "प्रमाणित कमाल दर", hi: "प्रमाणित अधिकतम दर", en: "Certified Caps" },
    "Ghat Live": { mr: "घाट थेट स्थिती", hi: "घाट लाइव स्थिति", en: "Ghat Live" },
    "Annakshetra": { mr: "अन्नक्षेत्र", hi: "अन्नक्षेत्र", en: "Annakshetra" },
    "Enter as Yatri": { mr: "यात्री म्हणून प्रवेश करा", hi: "यात्री के रूप में प्रवेश करें", en: "Enter as Yatri" },

    "I'm a Nashikkar": { mr: "मी नाशिककर आहे", hi: "मैं नाशिककर हूँ", en: "I'm a Nashikkar" },
    "स्थानिक नागरिक": { mr: "स्थानिक नागरिक", hi: "स्थानीय नागरिक", en: "Local Citizen" },
    "Civic Verification": { mr: "नागरी पडताळणी", hi: "नागरिक सत्यापन", en: "Civic Verification" },
    "For registered vendors, local guides, transport operators & civic verifiers. Manage listings & verified prices.": {
      mr: "नोंदणीकृत विक्रेते, स्थानिक मार्गदर्शक, वाहतूकदार व नागरी पडताळणीसाठी. दर व नोंदी व्यवस्थापित करा.",
      hi: "पंजीकृत विक्रेताओं, स्थानीय गाइडों, परिवहन चालकों और नागरिक निरीक्षकों के लिए। दरें व लिस्टिंग प्रबंधित करें।",
      en: "For registered vendors, local guides, transport operators & civic verifiers. Manage listings & verified prices."
    },
    "Vendor ID": { mr: "विक्रेता ओळखपत्र", hi: "विक्रेता पहचान पत्र", en: "Vendor ID" },
    "Rate Registry": { mr: "दर नोंदवही", hi: "दर पंजी", en: "Rate Registry" },
    "Inspector Portal": { mr: "निरीक्षक पोर्टल", hi: "निरीक्षक पोर्टल", en: "Inspector Portal" },
    "Vendor & Admin Login": { mr: "विक्रेता व प्रशासक लॉगिन", hi: "विक्रेता एवं प्रशासक लॉगिन", en: "Vendor & Admin Login" },

    // -------------------------------------------------------------
    // Pilgrim Home Screen (yatri_home.html)
    // -------------------------------------------------------------
    "Kumbh Mela 2027 Live Portal": { mr: "कुंभमेळा २०२७ थेट पोर्टल", hi: "कुंभ मेला २०२७ लाइव पोर्टल", en: "Kumbh Mela 2027 Live Portal" },
    "Namaste, Yatri": { mr: "नमस्ते, भाविक", hi: "नमस्ते, तीर्थयात्री", en: "Namaste, Yatri" },
    "Namaste, Yatri / शुभ यात्रा": { mr: "नमस्ते, भाविक / शुभ यात्रा", hi: "नमस्ते, तीर्थयात्री / शुभ यात्रा", en: "Namaste, Yatri / Safe Journey" },
    "Ramkund & Godavari Ghats, Nashik": { mr: "रामकुंड आणि गोदावरी घाट, नाशिक", hi: "रामकुंड एवं गोदावरी घाट, नासिक", en: "Ramkund & Godavari Ghats, Nashik" },
    "Zone A-1": { mr: "विभाग A-1", hi: "ज़ोन A-1", en: "Zone A-1" },
    "28°C • Pleasant": { mr: "२८°C • आल्हाददायक", hi: "२८°C • सुहावना मौसम", en: "28°C • Pleasant" },
    "Ramkund Ghat Flow": { mr: "रामकुंड घाट गर्दी प्रवाह", hi: "रामकुंड घाट भीड़ प्रवाह", en: "Ramkund Ghat Flow" },
    "सुगम संचार • Moderate Flow": { mr: "सुगम संचार • मध्यम प्रवाह", hi: "सुगम संचार • मध्यम प्रवाह", en: "Smooth Flow • Moderate" },
    "Moderate Flow": { mr: "मध्यम प्रवाह", hi: "मध्यम प्रवाह", en: "Moderate Flow" },
    "Optimal holy dip window: Next 45 mins": { mr: "पवित्र स्नानासाठी उत्तम वेळ: पुढील ४५ मिनिटे", hi: "पवित्र स्नान हेतु उत्तम समय: अगले ४५ मिनट", en: "Optimal holy dip window: Next 45 mins" },
    "Updated 2m ago": { mr: "२ मिनिटांपूर्वी अद्यतनित", hi: "२ मिनट पहले अपडेट", en: "Updated 2m ago" },

    "Rate Gazette": { mr: "अधिकृत दरपत्रक", hi: "आधिकारिक दर सूची", en: "Rate Gazette" },
    "Auto (Station ➔ Ramkund):": { mr: "रिक्षा (रेल्वे स्टेशन ➔ रामकुंड):", hi: "ऑटो (रेलवे स्टेशन ➔ रामकुंड):", en: "Auto (Station ➔ Ramkund):" },
    "Official Dorm Bed:": { mr: "शासकीय डॉर्मिटरी बेड:", hi: "आधिकारिक डॉर्मिटरी बेड:", en: "Official Dorm Bed:" },
    "Authentic Thali:": { mr: "पौष्टिक शाकाहारी थाळी:", hi: "पौष्टिक शाकाहारी थाली:", en: "Authentic Thali:" },
    "cap": { mr: "कमाल मर्यादा", hi: "अधिकतम सीमा", en: "cap" },
    "standard": { mr: "प्रमाणित दर", hi: "मानक दर", en: "standard" },
    "/night": { mr: "/रात्र", hi: "/रात", en: "/night" },

    "Essential Pilgrim Services": { mr: "महत्त्वाच्या यात्री सेवा", hi: "प्रमुख तीर्थयात्री सेवाएँ", en: "Essential Pilgrim Services" },
    "Verified by NMC": { mr: "मनपा द्वारे प्रमाणित", hi: "मनपा द्वारा प्रमाणित", en: "Verified by NMC" },
    "Local Market": { mr: "स्थानिक बाजार", hi: "स्थानीय बाज़ार", en: "Local Market" },
    "Compare fair rickshaws, hotels, stay, & licensed guides.": {
      mr: "रिक्षा, हॉटेल्स, धर्मशाळा व परवानाधारक मार्गदर्शकांचे वाजवी दर तपासा.",
      hi: "रिक्षा, होटल, धर्मशाला और अधिकृत गाइडों के उचित दर देखें।",
      en: "Compare fair rickshaws, hotels, stay, & licensed guides."
    },
    "Compare Rates": { mr: "दर तपासा", hi: "दर तुलना करें", en: "Compare Rates" },
    "Food Finder": { mr: "अन्न शोधक / अन्नक्षेत्र", hi: "अन्नक्षेत्र एवं भोजन खोज", en: "Food Finder" },
    "Locate free Annakshetras, langars, & standard thalis.": {
      mr: "मोफत अन्नछत्रे, लंगर आणि वाजवी थाळी केंद्रे शोधा.",
      hi: "मुफ्त अन्नक्षेत्र, लंगर और प्रमाणित थाली केंद्र खोजें।",
      en: "Locate free Annakshetras, langars, & standard thalis."
    },
    "Find Free Meals": { mr: "भोजन शोधा", hi: "भोजन खोजें", en: "Find Free Meals" },
    "Free & Subsidized": { mr: "मोफत व सवलतीच्या दरात", hi: "मुफ्त एवं रियायती", en: "Free & Subsidized" },
    "Report Issue": { mr: "तक्रार नोंदवा", hi: "शिकायत दर्ज करें", en: "Report Issue" },
    "Flag overcharging, sanitation issues, or fake info.": {
      mr: "जादा दर, अस्वच्छता किंवा बनावट माहितीची तक्रार करा.",
      hi: "अधिक किराया/दाम, गंदगी या भ्रामक जानकारी की शिकायत करें।",
      en: "Flag overcharging, sanitation issues, or fake info."
    },
    "File a Report": { mr: "तक्रार दाखल करा", hi: "शिकायत दर्ज करें", en: "File a Report" },
    "Direct Dispatch": { mr: "थेट कारवाई", hi: "सीधी कार्रवाई", en: "Direct Dispatch" },
    "Emergency SOS": { mr: "आपत्कालीन मदत (SOS)", hi: "आपातकालीन सहायता (SOS)", en: "Emergency SOS" },
    "Instant dispatch: Police, Medical, Lost & Found, Rescue.": {
      mr: "तातडीची मदत: पोलीस, रुग्णवाहिका, हरवले-सापडले, बचाव पथक.",
      hi: "त्वरित सहायता: पुलिस, एम्बुलेंस, खोया-पाया, आपदा बचाव।",
      en: "Instant dispatch: Police, Medical, Lost & Found, Rescue."
    },
    "Get Help Now": { mr: "तातडीने मदत मिळवा", hi: "तुरंत सहायता पाएं", en: "Get Help Now" },
    "Instant Help": { mr: "तातडीची मदत", hi: "त्वरित सहायता", en: "Instant Help" },

    "Official Cap Rates": { mr: "शासकीय कमाल दर", hi: "सरकारी अधिकतम दर", en: "Official Cap Rates" },
    "Municipal gazette limits": { mr: "महानगरपालिका अधिकृत मर्यादा", hi: "नगर निगम आधिकारिक सीमा", en: "Municipal gazette limits" },
    "Shared Auto": { mr: "शेअर रिक्षा", hi: "शेयर ऑटो", en: "Shared Auto" },
    "Station to Ghat": { mr: "रेल्वे स्टेशन ते घाट", hi: "रेलवे स्टेशन से घाट", en: "Station to Ghat" },
    "Dormitory Bed": { mr: "डॉर्मिटरी बेड", hi: "डॉर्मिटरी बेड", en: "Dormitory Bed" },
    "Verified Ashrams": { mr: "प्रमाणित आश्रम", hi: "प्रमाणित आश्रम", en: "Verified Ashrams" },
    "Standard Veg Thali": { mr: "साधी शाकाहारी थाळी", hi: "सादा शाकाहारी थाली", en: "Standard Veg Thali" },
    "Approved pricing": { mr: "मंजूर दर", hi: "स्वीकृत मूल्य", en: "Approved pricing" },
    "Local Guide": { mr: "स्थानिक मार्गदर्शक", hi: "स्थानीय गाइड", en: "Local Guide" },
    "Certified per hour": { mr: "प्रमाणित प्रति तास", hi: "प्रमाणित प्रति घंटा", en: "Certified per hour" },
    "View Full Price Matrix": { mr: "संपूर्ण दरपत्रक पहा", hi: "पूरी दर सूची देखें", en: "View Full Price Matrix" },

    "Quick Emergency Access": { mr: "तातडीची मदत संपर्क", hi: "त्वरित आपातकालीन संपर्क", en: "Quick Emergency Access" },
    "Police Control": { mr: "पोलीस नियंत्रण कक्ष", hi: "पुलिस कंट्रोल रूम", en: "Police Control" },
    "Ambulance": { mr: "रुग्णवाहिका", hi: "एम्बुलेंस", en: "Ambulance" },
    "Lost & Found": { mr: "हरवले-सापडले कक्ष", hi: "खोया-पाया केंद्र", en: "Lost & Found" },
    "Disaster Helpline": { mr: "आपत्ती निवारण मदत कक्ष", hi: "आपदा प्रबंधन हेल्पलाइन", en: "Disaster Helpline" },
    "Toll Free 24x7": { mr: "टोल फ्री २४x७", hi: "टोल फ्री २४x७", en: "Toll Free 24x7" },
    "Full SOS Center": { mr: "संपूर्ण आपत्कालीन कक्ष", hi: "संपूर्ण आपातकालीन केंद्र", en: "Full SOS Center" },

    // -------------------------------------------------------------
    // Bottom Navigation Bar
    // -------------------------------------------------------------
    "Home": { mr: "मुख्यपृष्ठ", hi: "मुख्य", en: "Home" },
    "Marketplace": { mr: "बाजारपेठ", hi: "बाज़ार", en: "Marketplace" },
    "Food": { mr: "अन्नक्षेत्र", hi: "भोजन", en: "Food" },
    "Report": { mr: "तक्रार", hi: "शिकायत", en: "Report" },
    "Emergency": { mr: "आपत्कालीन", hi: "आपातकाल", en: "Emergency" },
    "Overview": { mr: "आढावा", hi: "अवलोकन", en: "Overview" },
    "Vendors": { mr: "विक्रेते", hi: "विक्रेता", en: "Vendors" },
    "Bookings": { mr: "बुकिंग", hi: "बुकिंग", en: "Bookings" },
    "Escalations": { mr: "तक्रारी", hi: "शिकायतें", en: "Escalations" },
    "Log": { mr: "नोंदवही", hi: "लॉग", en: "Log" },
    "Settings": { mr: "सेटिंग्ज", hi: "सेटिंग्स", en: "Settings" },

    // -------------------------------------------------------------
    // Marketplace (marketplace.html)
    // -------------------------------------------------------------
    "Nashik Fair Marketplace": { mr: "नाशिक वाजवी दर बाजारपेठ", hi: "नासिक उचित मूल्य बाज़ार", en: "Nashik Fair Marketplace" },
    "Categories": { mr: "वर्गवारी", hi: "श्रेणियाँ", en: "Categories" },
    "All": { mr: "सर्व", hi: "सभी", en: "All" },
    "Stays / Ashrams": { mr: "निवास / आश्रम", hi: "आवास / आश्रम", en: "Stays / Ashrams" },
    "Food & Meals": { mr: "भोजन व खानपान", hi: "भोजन एवं खानपान", en: "Food & Meals" },
    "Transport / Auto": { mr: "वाहतूक / रिक्षा", hi: "परिवहन / ऑटो", en: "Transport / Auto" },
    "Puja & Essentials": { mr: "पूजा व धार्मिक साहित्य", hi: "पूजा एवं धार्मिक सामग्री", en: "Puja & Essentials" },
    "Search verified services, stay, transport...": { mr: "प्रमाणित सेवा, मुक्काम, वाहतूक शोधा...", hi: "प्रमाणित सेवाएँ, आवास, परिवहन खोजें...", en: "Search verified services, stay, transport..." },
    "Search listings...": { mr: "नोंदी शोधा...", hi: "लिस्टिंग खोजें...", en: "Search listings..." },
    "NMC Certified Fair Price": { mr: "मनपा प्रमाणित वाजवी दर", hi: "मनपा प्रमाणित उचित मूल्य", en: "NMC Certified Fair Price" },
    "Verified Rate": { mr: "सत्यापित दर", hi: "सत्यापित दर", en: "Verified Rate" },
    "Cap Price": { mr: "कमाल मर्यादा", hi: "अधिकतम सीमा", en: "Cap Price" },
    "Book Now": { mr: "आता बुक करा", hi: "अभी बुक करें", en: "Book Now" },
    "View Details": { mr: "तपशील पहा", hi: "विवरण देखें", en: "View Details" },
    "Filter by Zone": { mr: "विभागानुसार निवडा", hi: "ज़ोन अनुसार चुनें", en: "Filter by Zone" },
    "Price Cap Guarantee": { mr: "वाजवी दर हमी", hi: "उचित मूल्य गारंटी", en: "Price Cap Guarantee" },
    "All prices are capped by Nashik Municipal Corporation. Overcharging is strictly prohibited.": {
      mr: "सर्व दर नाशिक महानगरपालिकेने निश्चित केलेले आहेत. जादा दर आकारण्यास सक्त मनाई आहे.",
      hi: "सभी दरें नासिक नगर निगम द्वारा निर्धारित हैं। अधिक दाम वसूलना सख्त मना है।",
      en: "All prices are capped by Nashik Municipal Corporation. Overcharging is strictly prohibited."
    },
    "Available": { mr: "उपलब्ध", hi: "उपलब्ध", en: "Available" },
    "Directions": { mr: "दिशा / रस्ता", hi: "दिशा-निर्देश", en: "Directions" },

    // -------------------------------------------------------------
    // Food Finder (food_finder.html)
    // -------------------------------------------------------------
    "Nashik Annakshetra & Food Finder": { mr: "नाशिक अन्नक्षेत्र व भोजन शोधक", hi: "नासिक अन्नक्षेत्र एवं भोजन खोज", en: "Nashik Annakshetra & Food Finder" },
    "Locate free community kitchens (Annakshetra), langars, & subsidized food distribution.": {
      mr: "मोफत अन्नछत्रे, लंगर आणि सवलतीच्या दरातील भोजन वितरण केंद्रे शोधा.",
      hi: "मुफ्त अन्नक्षेत्र, लंगर और रियायती भोजन वितरण केंद्र खोजें।",
      en: "Locate free community kitchens (Annakshetra), langars, & subsidized food distribution."
    },
    "Free Annakshetras & Bhojanalayas": { mr: "मोफत अन्नछत्रे व भोजनालये", hi: "मुफ्त अन्नक्षेत्र व भोजनालय", en: "Free Annakshetras & Bhojanalayas" },
    "Free Bhandara": { mr: "मोफत महाप्रसाद / भंडारा", hi: "मुफ्त महाप्रसाद / भंडारा", en: "Free Bhandara" },
    "Subsidized Bhojanalay": { mr: "सवलतीचे भोजनालय", hi: "रियायती भोजनालय", en: "Subsidized Bhojanalay" },
    "Certified Pure Veg": { mr: "प्रमाणित शुद्ध शाकाहारी", hi: "प्रमाणित शुद्ध शाकाहारी", en: "Certified Pure Veg" },
    "Get Directions": { mr: "रस्ता पहा (दिशा)", hi: "दिशा-निर्देश प्राप्त करें", en: "Get Directions" },
    "Live Crowd Status": { mr: "थेट गर्दी स्थिती", hi: "लाइव भीड़ स्थिति", en: "Live Crowd Status" },
    "Open Now": { mr: "सध्या सुरू आहे", hi: "अभी खुला है", en: "Open Now" },
    "Meals Served Daily": { mr: "दररोज भोजन वाटप", hi: "दैनिक भोजन वितरण", en: "Meals Served Daily" },
    "Free": { mr: "मोफत", hi: "मुफ्त", en: "Free" },
    "Subsidized": { mr: "सवलतीचे", hi: "रियायती", en: "Subsidized" },
    "Timing:": { mr: "वेळ:", hi: "समय:", en: "Timing:" },
    "Distance:": { mr: "अंतर:", hi: "दूरी:", en: "Distance:" },

    // -------------------------------------------------------------
    // Report Issue (report_issue.html)
    // -------------------------------------------------------------
    "Civic Vigilance & Fair-Price Complaint": { mr: "नागरी दक्षता व वाजवी दर तक्रार निवारण", hi: "नागरिक सतर्कता एवं उचित मूल्य शिकायत", en: "Civic Vigilance & Fair-Price Complaint" },
    "Report an Issue": { mr: "तक्रार नोंदवा", hi: "शिकायत दर्ज करें", en: "Report an Issue" },
    "Issue Category": { mr: "तक्रारीचा प्रकार", hi: "शिकायत की श्रेणी", en: "Issue Category" },
    "Price Gouging / Overcharging": { mr: "जादा दर / नफेखोरी", hi: "अधिक वसूली / कालाबाज़ारी", en: "Price Gouging / Overcharging" },
    "Sanitation / Cleanliness": { mr: "स्वच्छता व कचरा व्यवस्थापन", hi: "स्वच्छता एवं कचरा प्रबंधन", en: "Sanitation / Cleanliness" },
    "Crowd Hazard / Bottleneck": { mr: "गर्दीचा अडथळा व धोका", hi: "भीड़ का दबाव / रुकावट", en: "Crowd Hazard / Bottleneck" },
    "Vendor Misconduct": { mr: "विक्रेत्याचे गैरवर्तन", hi: "विक्रेता का दुर्व्यवहार", en: "Vendor Misconduct" },
    "Other Grievance": { mr: "इतर तक्रार", hi: "अन्य समस्या", en: "Other Grievance" },
    "Location / Ghat": { mr: "ठिकाण / घाट", hi: "स्थान / घाट", en: "Location / Ghat" },
    "Select Location...": { mr: "ठिकाण निवडा...", hi: "स्थान चुनें...", en: "Select Location..." },
    "Description": { mr: "तक्रारीचा तपशील", hi: "शिकायत का विवरण", en: "Description" },
    "Describe the issue in detail...": { mr: "तक्रारीचे सविस्तर वर्णन करा...", hi: "समस्या का विस्तार से वर्णन करें...", en: "Describe the issue in detail..." },
    "Upload Photo Evidence": { mr: "पुराव्यासाठी फोटो जोडा", hi: "साक्ष्य हेतु फोटो संलग्न करें", en: "Upload Photo Evidence" },
    "Submit Report": { mr: "तक्रार दाखल करा", hi: "शिकायत दर्ज करें", en: "Submit Report" },
    "Submit to Civic Vigilance": { mr: "नागरी दक्षता कक्षाकडे पाठवा", hi: "नागरिक सतर्कता विभाग को भेजें", en: "Submit to Civic Vigilance" },
    "Your report will be reviewed as quickly as possible": { mr: "तुमच्या तक्रारीचे त्वरित पुनरावलोकन केले जाईल", hi: "आपकी शिकायत की शीघ्र समीक्षा की जाएगी", en: "Your report will be reviewed as quickly as possible" },
    "Report Submitted Successfully": { mr: "तक्रार यशस्वीरित्या नोंदवली गेली", hi: "शिकायत सफलतापूर्वक दर्ज की गई", en: "Report Submitted Successfully" },

    // -------------------------------------------------------------
    // Emergency SOS (emergency_sos.html)
    // -------------------------------------------------------------
    "Emergency Dispatch & Safety Hub": { mr: "आपत्कालीन नियंत्रण व सुरक्षा केंद्र", hi: "आपातकालीन नियंत्रण एवं सुरक्षा केंद्र", en: "Emergency Dispatch & Safety Hub" },
    "One-Touch Emergency Dispatch": { mr: "एका स्पर्शात तातडीची मदत", hi: "एक स्पर्श आपातकालीन सहायता", en: "One-Touch Emergency Dispatch" },
    "Call 112 (Police & Disaster)": { mr: "११२ वर संपर्क करा (पोलीस व आपत्ती)", hi: "११२ पर कॉल करें (पुलिस एवं आपदा)", en: "Call 112 (Police & Disaster)" },
    "Call 108 (Ambulance)": { mr: "१०८ वर संपर्क करा (रुग्णवाहिका)", hi: "१०८ पर कॉल करें (एम्बुलेंस)", en: "Call 108 (Ambulance)" },
    "Medical Outposts": { mr: "वैद्यकीय मदत केंद्रे", hi: "चिकित्सा सहायता केंद्र", en: "Medical Outposts" },
    "Lost Persons Helpdesk": { mr: "हरवले-सापडले व्यक्ती कक्ष", hi: "लापता व्यक्ति सहायता केंद्र", en: "Lost Persons Helpdesk" },
    "Ghat Lifeguard Force": { mr: "घाट जीवरक्षक दल", hi: "घाट जीवन रक्षक दल", en: "Ghat Lifeguard Force" },
    "Your Live GPS Coordinates": { mr: "तुमचे थेट जीपीएस स्थान", hi: "आपकी वर्तमान जीपीएस स्थिति", en: "Your Live GPS Coordinates" },
    "Send Emergency Distress Alert": { mr: "तातडीचा धोक्याचा इशारा पाठवा", hi: "तत्काल आपातकालीन अलर्ट भेजें", en: "Send Emergency Distress Alert" },

    // -------------------------------------------------------------
    // Nashikkar / Vendor Portal
    // -------------------------------------------------------------
    "Nashikkar Portal": { mr: "नाशिककर पोर्टल", hi: "नाशिककर पोर्टल", en: "Nashikkar Portal" },
    "Vendor Portal": { mr: "विक्रेता पोर्टल", hi: "विक्रेता पोर्टल", en: "Vendor Portal" },
    "Nashikkar Civic Hub": { mr: "नाशिककर नागरी केंद्र", hi: "नाशिककर नागरिक केंद्र", en: "Nashikkar Civic Hub" },
    "Civic Pledge": { mr: "नागरी निष्ठा शपथ", hi: "नागरिक निष्ठा शपथ", en: "Civic Pledge" },
    "Registered Listings": { mr: "नोंदणीकृत सेवा", hi: "पंजीकृत सेवाएँ", en: "Registered Listings" },
    "Active Bookings": { mr: "सक्रिय बुकिंग", hi: "सक्रिय बुकिंग", en: "Active Bookings" },
    "Price Compliance Score": { mr: "दर compliance गुण", hi: "मूल्य अनुपालन स्कोर", en: "Price Compliance Score" },
    "Register New Vendor / Service": { mr: "नवीन विक्रेता / सेवा नोंदवा", hi: "नया विक्रेता / सेवा पंजीकृत करें", en: "Register New Vendor / Service" },
    "Civic Trust Score": { mr: "नागरी विश्वास निर्देशांक", hi: "नागरिक विश्वास स्कोर", en: "Civic Trust Score" },
    "Kumbhveer Verified": { mr: "कुंभवीर सत्यापित", hi: "कुंभवीर सत्यापित", en: "Kumbhveer Verified" },
    "Pending Verification": { mr: "सत्यापन प्रलंबित", hi: "सत्यापन लंबित", en: "Pending Verification" },
    "Flagged — Info Incomplete": { mr: "ध्वजांकित — माहिती अपूर्ण", hi: "चिह्नित — जानकारी अधूरी", en: "Flagged — Info Incomplete" },
    "Total Revenue": { mr: "एकूण महसूल", hi: "कुल आय", en: "Total Revenue" },
    "Recent Bookings": { mr: "अलीकडील बुकिंग", hi: "हाल की बुकिंग", en: "Recent Bookings" },
    "Log In as Nashikkar": { mr: "नाशिककर म्हणून लॉगिन करा", hi: "नाशिककर के रूप में लॉगिन करें", en: "Log In as Nashikkar" },
    "Mobile Number / Vendor ID": { mr: "मोबाईल क्रमांक / विक्रेता ओळख क्रमांक", hi: "मोबाइल नंबर / विक्रेता पहचान संख्या", en: "Mobile Number / Vendor ID" },
    "Enter PIN / OTP": { mr: "पिन / ओटीपी टाका", hi: "पिन / ओटीपी दर्ज करें", en: "Enter PIN / OTP" },

    // -------------------------------------------------------------
    // Police Portal
    // -------------------------------------------------------------
    "Police Command Terminal": { mr: "पोलीस नियंत्रण कक्ष टर्मिनल", hi: "पुलिस कमांड टर्मिनल", en: "Police Command Terminal" },
    "Simhastha Security Apex": { mr: "सिंहस्थ सुरक्षा सर्वोच्च केंद्र", hi: "सिंहस्थ सुरक्षा शीर्ष केंद्र", en: "Simhastha Security Apex" },
    "Active Escalations": { mr: "सक्रिय तक्रारी व गुन्हे", hi: "सक्रिय मामले एवं शिकायतें", en: "Active Escalations" },
    "Case Log": { mr: "प्रकरण नोंदवही", hi: "केस लॉग", en: "Case Log" },
    "Officer Settings": { mr: "अधिकारी सेटिंग्ज", hi: "अधिकारी सेटिंग्स", en: "Officer Settings" },
    "Severity: High": { mr: "तीव्रता: अति तातडीची", hi: "गंभीरता: उच्च", en: "Severity: High" },
    "Severity: Medium": { mr: "तीव्रता: मध्यम", hi: "गंभीरता: मध्यम", en: "Severity: Medium" },
    "Severity: Low": { mr: "तीव्रता: सामान्य", hi: "गंभीरता: सामान्य", en: "Severity: Low" },
    "Dispatch Officer": { mr: "अधिकारी रवाना करा", hi: "अधिकारी रवाना करें", en: "Dispatch Officer" },
    "Resolve Case": { mr: "प्रकरण निकाली काढा", hi: "मामला हल करें", en: "Resolve Case" },
    "Mark as Resolved": { mr: "निकाली काढल्याची नोंद करा", hi: "निस्तारित के रूप में चिह्नित करें", en: "Mark as Resolved" },
    "Investigation Notes": { mr: "तपास अहवाल / टिपण", hi: "जांच रिपोर्ट / टिप्पणी", en: "Investigation Notes" },
    "Log In to Command Terminal": { mr: "कमांड टर्मिनलमध्ये प्रवेश करा", hi: "कमांड टर्मिनल में लॉगिन करें", en: "Log In to Command Terminal" },
    "Officer Badge ID / Metal No.": { mr: "अधिकारी बॅज क्रमांक / मेटल क्र.", hi: "अधिकारी बैज नंबर / मेटल क्र.", en: "Officer Badge ID / Metal No." },
    "Security PIN": { mr: "सुरक्षा पिन", hi: "सुरक्षा पिन", en: "Security PIN" }
  };

    // Food Finder Specific Clean Translations
    "Food Finder & Annakshetra": { mr: "अन्न शोधक व अन्नक्षेत्र", hi: "भोजन खोज एवं अन्नक्षेत्र", en: "Food Finder & Annakshetra" },
    "Anchor Location": { mr: "स्थान बिंदू", hi: "मुख्य स्थान", en: "Anchor Location" },
    "Within 1 km": { mr: "१ किमी च्या आत", hi: "१ किमी के भीतर", en: "Within 1 km" },
    "Search Annakshetra, Thali, Bhojanalaya, Grocery, Fruits...": { mr: "अन्नछत्र, थाळी, भोजनालय, किराणा, फळे शोधा...", hi: "अन्नक्षेत्र, थाली, भोजनालय, राशन, फल खोजें...", en: "Search Annakshetra, Thali, Bhojanalaya, Grocery, Fruits..." },
    "All Foods": { mr: "सर्व खाद्यपदार्थ", hi: "सभी खाद्य", en: "All Foods" },
    "Free Annakshetra": { mr: "मोफत अन्नछत्र", hi: "मुफ्त अन्नक्षेत्र", en: "Free Annakshetra" },
    "Pure Satvik": { mr: "शुद्ध सात्विक", hi: "शुद्ध सात्विक", en: "Pure Satvik" },
    "Jain Bhojanalay": { mr: "जैन भोजनालय", hi: "जैन भोजनालय", en: "Jain Bhojanalay" },
    "Budget Thali (₹200)": { mr: "किफायतशीर थाळी (₹२००)", hi: "किफायती थाली (₹२००)", en: "Budget Thali (₹200)" },
    "Map View": { mr: "नकाशा पहा", hi: "मानचित्र देखें", en: "Map View" },
    "Hide Map": { mr: "नकाशा लपवा", hi: "मानचित्र छुपाएँ", en: "Hide Map" },
    "Digital Meal Pass": { mr: "डिजिटल भोजन पास", hi: "डिजिटल भोजन पास", en: "Digital Meal Pass" },
    "Get Digital Pass": { mr: "डिजिटल पास मिळवा", hi: "डिजिटल पास प्राप्त करें", en: "Get Digital Pass" },
    "Generate Digital Pass": { mr: "पास तयार करा", hi: "पास बनाएं", en: "Generate Digital Pass" },
    "Number of Yatris:": { mr: "यात्री संख्या:", hi: "तीर्थयात्रियों की संख्या:", en: "Number of Yatris:" },
    "Estimated Waiting Time:": { mr: "अनुमानित प्रतीक्षा वेळ:", hi: "अनुमानित प्रतीक्षा समय:", en: "Estimated Waiting Time:" },
    "Next 15 mins": { mr: "पुढील १५ मिनिटे", hi: "अगले १५ मिनट", en: "Next 15 mins" },
    "Fair-Price Food Protection Cell": { mr: "वाजवी दर अन्न संरक्षण कक्ष", hi: "उचित मूल्य भोजन संरक्षण केंद्र", en: "Fair-Price Food Protection Cell" },
    "Open Civic Report Grievance": { mr: "नागरी तक्रार निवारण प्रणाली उघडा", hi: "नागरिक शिकायत प्रणाली खोलें", en: "Open Civic Report Grievance" },
    "Today's Menu / Prasadam:": { mr: "आजचा मेनू / महाप्रसाद:", hi: "आज का मेनू / महाप्रसाद:", en: "Today's Menu / Prasadam:" },
    "Distribution Timings:": { mr: "भोजन वितरण वेळ:", hi: "भोजन वितरण समय:", en: "Distribution Timings:" },
    "Zero Overcharge Protection": { mr: "शून्य जादा दर हमी", hi: "अतिरिक्त वसूली सुरक्षा", en: "Zero Overcharge Protection" },
    "Free Prasadam": { mr: "मोफत महाप्रसाद", hi: "मुफ्त महाप्रसाद", en: "Free Prasadam" },
    "Listed Price": { mr: "नोंदवलेला दर", hi: "सूचीबद्ध दर", en: "Listed Price" },
    "Vendor Listed Price": { mr: "विक्रेता नोंदवलेला दर", hi: "विक्रेता द्वारा सूचीबद्ध मूल्य", en: "Vendor Listed Price" },
    "Listed Range": { mr: "दर मर्यादा", hi: "मूल्य सीमा", en: "Listed Range" },
    "Vendor Listed Range": { mr: "विक्रेता दर मर्यादा", hi: "विक्रेता मूल्य सीमा", en: "Vendor Listed Range" },
    "Fair Category • Verified by Kumbhveer & Pilgrims": { mr: "वाजवी वर्गवारी • कुंभवीर व यात्री सत्यापित", hi: "उचित श्रेणी • कुंभवीर व तीर्थयात्री सत्यापित", en: "Fair Category • Verified by Kumbhveer & Pilgrims" },
    "Fair Price Verification": { mr: "वाजवी दर पडताळणी", hi: "उचित मूल्य सत्यापन", en: "Fair Price Verification" },
    "Pilgrim & Kumbhveer Verified": { mr: "यात्री व कुंभवीर सत्यापित", hi: "तीर्थयात्री एवं कुंभवीर सत्यापित", en: "Pilgrim & Kumbhveer Verified" },
    "100% Fair": { mr: "१००% वाजवी दर", hi: "१००% उचित मूल्य", en: "100% Fair" },
    "Navigate (Map)": { mr: "नकाशा मार्ग (Navigate)", hi: "मानचित्र दिशा (Navigate)", en: "Navigate (Map)" },
    "Directions": { mr: "दिशा / रस्ता", hi: "दिशा-निर्देश", en: "Directions" },
    "Book Service": { mr: "सेवा बुक करा", hi: "सेवा बुक करें", en: "Book Service" },

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

    if (TRANSLATIONS[trimmed] && TRANSLATIONS[trimmed][targetLang]) {
      return TRANSLATIONS[trimmed][targetLang];
    }

    // Try reverse lookup across all language values
    for (const key in TRANSLATIONS) {
      const entry = TRANSLATIONS[key];
      if (entry.en === trimmed || entry.mr === trimmed || entry.hi === trimmed) {
        return entry[targetLang] || entry.en || trimmed;
      }
    }

    return trimmed;
  }

  function applyTranslations(lang) {
    // 1. Process explicit data-i18n elements
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key && TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
        el.textContent = TRANSLATIONS[key][lang];
      }
    });

    // 2. Process data-i18n-placeholder elements
    const inputs = document.querySelectorAll('[data-i18n-placeholder]');
    inputs.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key && TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
        el.setAttribute('placeholder', TRANSLATIONS[key][lang]);
      }
    });

    // 3. Scan & translate all standard text nodes
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const parentTag = parent.tagName.toLowerCase();
          if (['script', 'style', 'noscript', 'textarea'].includes(parentTag)) {
            return NodeFilter.FILTER_REJECT;
          }
          if (parent.classList.contains('material-symbols-outlined') || parent.closest('#kumbh-lang-modal') || parent.closest('#lang-switch-group')) {
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
      const original = node.nodeValue.trim();
      const translated = translateText(original, lang);
      if (translated && translated !== original) {
        const leading = node.nodeValue.match(/^\s*/)[0];
        const trailing = node.nodeValue.match(/\s*$/)[0];
        node.nodeValue = leading + translated + trailing;
      }
    });
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
    const headerButtons = document.querySelectorAll('header button, [aria-label="Toggle Language"]');
    const langLabels = { en: 'English', mr: 'मराठी', hi: 'हिंदी' };

    headerButtons.forEach(btn => {
      const textSpan = btn.querySelector('span:not(.material-symbols-outlined)');
      if (textSpan && (btn.innerHTML.includes('translate') || btn.getAttribute('aria-label') === 'Toggle Language')) {
        textSpan.textContent = langLabels[lang] || 'English';
      }
    });
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
    const btn = el.closest('button, a, .lang-dropdown-trigger, [aria-label="Toggle Language"]');
    if (!btn) return false;
    const txt = (btn.textContent || '') + ' ' + (btn.innerHTML || '');
    if (btn.getAttribute('aria-label') === 'Toggle Language') return true;
    if (txt.includes('translate') || txt.includes('EN | मरा') || txt.includes('मराठी') || txt.includes('हिंदी') || txt.includes('English')) {
      if (btn.closest('header') || btn.classList.contains('lang-btn') || btn.classList.contains('lang-dropdown-trigger') || btn.getAttribute('aria-label') === 'Toggle Language') {
        return true;
      }
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

  function setupHeaderClickListeners() {
    const buttons = document.querySelectorAll('header button, [aria-label="Toggle Language"], .lang-dropdown-trigger');
    buttons.forEach(btn => {
      const html = btn.innerHTML || '';
      if (html.includes('translate') || html.includes('EN | मरा') || html.includes('मराठी') || btn.getAttribute('aria-label') === 'Toggle Language') {
        btn.classList.add('lang-dropdown-trigger', 'cursor-pointer');
        btn.setAttribute('type', 'button');
        btn.onclick = function (e) {
          e.preventDefault();
          e.stopPropagation();
          openLanguageModal();
        };
      }
    });
  }

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
    setupHeaderClickListeners();
    const currentLang = getSavedLang();
    document.documentElement.lang = currentLang;
    applyTranslations(currentLang);
    updateLanguageUIElements(currentLang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

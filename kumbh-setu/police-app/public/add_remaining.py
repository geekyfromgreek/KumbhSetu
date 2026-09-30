# -*- coding: utf-8 -*-
"""
Adds the remaining 213 strings to NEW_TRANSLATIONS in build_master_i18n.py
"""
import json

REMAINING = {
  # --- Tour Packages ---
  "☀️ Full Day Kumbh Darshan & Ghat Circuit (8 hrs - ₹1,200)": {
    "mr": "☀️ संपूर्ण दिवस कुंभ दर्शन व घाट परिक्रमा (८ तास - ₹१,२००)",
    "hi": "☀️ पूर्ण दिवस कुंभ दर्शन एवं घाट परिक्रमा (८ घंटे - ₹१,२००)",
    "en": "☀️ Full Day Kumbh Darshan & Ghat Circuit (8 hrs - ₹1,200)"
  },
  "🌅 05:00 AM – 07:30 AM: Brahma Muhurta Snan & Aarti (2 hrs - ₹300)": {
    "mr": "🌅 पहाटे ०५:०० – ०७:३०: ब्राह्ममुहूर्त स्नान व आरती (२ तास - ₹३००)",
    "hi": "🌅 सुबह ०५:०० – ०७:३०: ब्रह्म मुहूर्त स्नान एवं आरती (२ घंटे - ₹३००)",
    "en": "🌅 05:00 AM – 07:30 AM: Brahma Muhurta Snan & Aarti (2 hrs - ₹300)"
  },
  "🏛️ 09:00 AM – 01:00 PM: Panchavati Heritage Circuit (4 hrs - ₹600)": {
    "mr": "🏛️ सकाळी ०९:०० – दुपारी ०१:००: पंचवटी वारसा परिक्रमा (४ तास - ₹६००)",
    "hi": "🏛️ सुबह ०९:०० – दोपहर ०१:००: पंचवटी हेरिटेज सर्किट (४ घंटे - ₹६००)",
    "en": "🏛️ 09:00 AM – 01:00 PM: Panchavati Heritage Circuit (4 hrs - ₹600)"
  },
  "🕉️ 01:30 PM – 06:30 PM: Trimbakeshwar Jyotirlinga (5 hrs - ₹750)": {
    "mr": "🕉️ दुपारी ०१:३० – सायं ०६:३०: त्र्यंबकेश्वर ज्योतिर्लिंग दर्शन (५ तास - ₹७५०)",
    "hi": "🕉️ दोपहर ०१:३० – शाम ०६:३०: त्र्यंबकेश्वर ज्योतिर्लिंग (५ घंटे - ₹७५०)",
    "en": "🕉️ 01:30 PM – 06:30 PM: Trimbakeshwar Jyotirlinga (5 hrs - ₹750)"
  },

  # --- Transit Rules & Notices ---
  "🚌 Citylink Bus:": { "mr": "🚌 सिटीलिंक बस:", "hi": "🚌 सिटीलिंक बस:", "en": "🚌 Citylink Bus:" },
  "🛺 Meter Auto:": { "mr": "🛺 मीटर रिक्षा:", "hi": "🛺 मीटर ऑटो:", "en": "🛺 Meter Auto:" },
  "Transit: ₹80 Meter Auto / ₹15 Citylink Bus (9 km)": {
    "mr": "वाहतूक: ₹८० मीटर रिक्षा / ₹१५ सिटीलिंक बस (९ किमी)",
    "hi": "परिवहन: ₹८० मीटर ऑटो / ₹१५ सिटीलिंक बस (९ किमी)",
    "en": "Transit: ₹80 Meter Auto / ₹15 Citylink Bus (9 km)"
  },
  "Rides and taxis cannot be booked inside this app. Pilgrims can call authorized ride stands or drivers directly using the \"Call Stand\" buttons below, or hire directly at RTO booths.": {
    "mr": "रिक्षा व टॅक्सी ॲपमधून थेट बुक करता येत नाहीत. भाविक खालील 'कॉल स्टँड' बटणावरून थेट चालकांशी संपर्क करू शकतात किंवा आरटीओ बूथवरून घेऊ शकतात.",
    "hi": "सवारी और टैक्सी ऐप से बुक नहीं की जा सकती। श्रद्धालु नीचे दिए गए 'कॉल स्टैंड' बटन से सीधे कॉल कर सकते हैं या आरटीओ बूथ से ले सकते हैं।",
    "en": "Rides and taxis cannot be booked inside this app. Pilgrims can call authorized ride stands or drivers directly using the \"Call Stand\" buttons below, or hire directly at RTO booths."
  },
  "Stays, stalls, and rides cannot be booked in-app. Contact the establishment directly via WhatsApp, Call, or Navigate to visit on-site.": {
    "mr": "निवास, स्टॉल्स व वाहने ॲपमध्ये बुक करता येत नाहीत. व्हॉट्सॲप, कॉल किंवा नकाशामार्गे थेट संपर्क साधा.",
    "hi": "आवास, स्टॉल और सवारी ऐप में बुक नहीं हो सकते। व्हाट्सएप, कॉल या नेविगेशन द्वारा सीधे संपर्क करें।",
    "en": "Stays, stalls, and rides cannot be booked in-app. Contact the establishment directly via WhatsApp, Call, or Navigate to visit on-site."
  },
  "The only service bookable directly on the app with certified credentials & official token.": {
    "mr": "प्रमाणित ओळखपत्र व अधिकृत टोकनसह ॲपवर थेट बुक करता येणारी एकमेव अधिकृत सेवा.",
    "hi": "प्रमाणित पहचान पत्र और आधिकारिक टोकन के साथ ऐप पर सीधे बुक होने वाली एकमात्र सेवा।",
    "en": "The only service bookable directly on the app with certified credentials & official token."
  },
  "only service bookable directly on KumbhSetu": {
    "mr": "कुंभसेतुवर थेट बुक करता येणारी एकमेव सेवा",
    "hi": "कुंभसेतु पर सीधे बुक होने वाली एकमात्र सेवा",
    "en": "only service bookable directly on KumbhSetu"
  },
  "Products first • Certified fair prices from local Nashik stalls": {
    "mr": "उत्पादने प्रथम • नाशिकच्या स्थानिक दुकानांमधून प्रमाणित वाजवी दर",
    "hi": "उत्पाद पहले • नासिक के स्थानीय स्टॉलों से प्रमाणित उचित मूल्य",
    "en": "Products first • Certified fair prices from local Nashik stalls"
  },
  "Flag rate gouging, fake guides or hygiene alerts.": {
    "mr": "दरवाढ, बनावट मार्गदर्शक किंवा अस्वच्छतेची तक्रार नोंदवा.",
    "hi": "अतिरिक्त वसूली, नकली गाइड या अस्वच्छता की शिकायत करें।",
    "en": "Flag rate gouging, fake guides or hygiene alerts."
  },
  "Immediate police, ambulance & disaster helpline.": {
    "mr": "तातडीने पोलीस, रुग्णवाहिका व आपत्ती मदत कक्ष.",
    "hi": "तत्काल पुलिस, एम्बुलेंस एवं आपदा हेल्पलाइन।",
    "en": "Immediate police, ambulance & disaster helpline."
  },
  "Verified dharamshalas, ashrams & budget rooms.": {
    "mr": "पडताळणी केलेल्या धर्मशाळा, आश्रम व परवडणाऱ्या खोल्या.",
    "hi": "सत्यापित धर्मशालाएं, आश्रम और बजट कमरे।",
    "en": "Verified dharamshalas, ashrams & budget rooms."
  },
  "Sacred central holy pool where Lord Rama performed Pitru Tarpan. Main Simhastha Kumbh Snan and Ganga Godavari Aarti site.": {
    "mr": "प्रभू श्रीरामांनी पितृतर्पण केलेले पवित्र कुंड. मुख्य सिंहस्थ कुंभस्नान व गंगा गोदावरी आरतीचे मुख्य स्थान.",
    "hi": "पवित्र केंद्रीय कुंड जहां प्रभु राम ने पितृ तर्पण किया था। मुख्य सिंहस्थ कुंभ स्नान एवं गंगा गोदावरी आरती स्थल।",
    "en": "Sacred central holy pool where Lord Rama performed Pitru Tarpan. Main Simhastha Kumbh Snan and Ganga Godavari Aarti site."
  },

  # --- Colleges & Distances ---
  "B.Y.K. College of Commerce • 530m away": { "mr": "बी.वाय.के. वाणिज्य महाविद्यालय • ५३० मी अंतरावर", "hi": "बी.वाई.के. कॉलेज • ५३० मी दूर", "en": "B.Y.K. College of Commerce • 530m away" },
  "G.E.S. R.Y.K. Science College • 420m away": { "mr": "आर.वाय.के. विज्ञान महाविद्यालय • ४२० मी अंतरावर", "hi": "आर.वाई.के. साइंस कॉलेज • ४२० मी दूर", "en": "G.E.S. R.Y.K. Science College • 420m away" },
  "Government Polytechnic Nashik • 650m away": { "mr": "शासकीय तंत्रनिकेतन नाशिक • ६५० मी अंतरावर", "hi": "सरकारी पॉलिटेक्निक नासिक • ६५० मी दूर", "en": "Government Polytechnic Nashik • 650m away" },
  "Guru Gobind Singh College of Engg. • 900m away": { "mr": "गुरु गोविंद सिंग अभियांत्रिकी महाविद्यालय • ९०० मी अंतरावर", "hi": "गुरु गोबिंद सिंह इंजीनियरिंग कॉलेज • ९०० मी दूर", "en": "Guru Gobind Singh College of Engg. • 900m away" },
  "H.P.T. Arts & R.Y.K. Science • 480m away": { "mr": "एच.पी.टी. कला व आर.वाय.के. विज्ञान • ४८० मी अंतरावर", "hi": "एच.पी.टी. आर्ट्स एवं आर.वाई.के. साइंस • ४८० मी दूर", "en": "H.P.T. Arts & R.Y.K. Science • 480m away" },
  "K.V.N. Naik Institute of Engg. • 410m away": { "mr": "के.व्ही.एन. नाईक अभियांत्रिकी • ४१० मी अंतरावर", "hi": "के.वी.एन. नाईक इंजीनियरिंग • ४१० मी दूर", "en": "K.V.N. Naik Institute of Engg. • 410m away" },
  "KK Wagh Institute of Engg. • 750m away": { "mr": "के.के. वाघ अभियांत्रिकी संस्था • ७५० मी अंतरावर", "hi": "के.के. वाघ इंजीनियरिंग कॉलेज • ७५० मी दूर", "en": "KK Wagh Institute of Engg. • 750m away" },
  "KTHM College, Nashik • 350m away": { "mr": "के.टी.एच.एम. महाविद्यालय, नाशिक • ३५० मी अंतरावर", "hi": "के.टी.एच.एम. कॉलेज, नासिक • ३५० मी दूर", "en": "KTHM College, Nashik • 350m away" },
  "MET Bhujbal Knowledge City • 500m away": { "mr": "एमईटी भुजबळ नॉलेज सिटी • ५०० मी अंतरावर", "hi": "एमईटी भुजबल नॉलेज सिटी • ५०० मी दूर", "en": "MET Bhujbal Knowledge City • 500m away" },
  "MET Institute of Technology • 620m away": { "mr": "एमईटी तंत्रज्ञान संस्था • ६२० मी अंतरावर", "hi": "एमईटी प्रौद्योगिकी संस्थान • ६२० मी दूर", "en": "MET Institute of Technology • 620m away" },
  "MGV Pharmacy College Panchavati • 560m away": { "mr": "एमजीव्ही औषधनिर्माण महाविद्यालय पंचवटी • ५६० मी अंतरावर", "hi": "एमजीवी फार्मेसी कॉलेज पंचवटी • ५६० मी दूर", "en": "MGV Pharmacy College Panchavati • 560m away" },
  "Matoshri College of Engg., Eklahare • 1.1km away": { "mr": "मातोश्री अभियांत्रिकी महाविद्यालय, एकलहरे • १.१ किमी अंतरावर", "hi": "मातोश्री इंजीनियरिंग कॉलेज • १.१ किमी दूर", "en": "Matoshri College of Engg., Eklahare • 1.1km away" },
  "NDMVP Samaj's College of Engg. • 800m away": { "mr": "एनडीएमव्हीपी अभियांत्रिकी महाविद्यालय • ८०० मी अंतरावर", "hi": "एनडीएमवीपी इंजीनियरिंग कॉलेज • ८०० मी दूर", "en": "NDMVP Samaj's College of Engg. • 800m away" },
  "SNJB KBJ College of Engineering • 720m away": { "mr": "एसएनजेबी अभियांत्रिकी महाविद्यालय • ७२० मी अंतरावर", "hi": "एसएनजेबी इंजीनियरिंग कॉलेज • ७२० मी दूर", "en": "SNJB KBJ College of Engineering • 720m away" },
  "Sandip Polytechnic, Mahiravani • 980m away": { "mr": "संदीप तंत्रनिकेतन, महिरावणी • ९८० मी अंतरावर", "hi": "संदीप पॉलिटेक्निक • ९८० मी दूर", "en": "Sandip Polytechnic, Mahiravani • 980m away" },
  "Sandip University Engg. • 600m away": { "mr": "संदीप विद्यापीठ अभियांत्रिकी • ६०० मी अंतरावर", "hi": "संदीप यूनिवर्सिटी इंजीनियरिंग • ६०० मी दूर", "en": "Sandip University Engg. • 600m away" },
  "Sapkal Knowledge Hub, Nashik • 1.2km away": { "mr": "सपकाळ नॉलेज हब, नाशिक • १.२ किमी अंतरावर", "hi": "सपकाल नॉलेज हब • १.२ किमी दूर", "en": "Sapkal Knowledge Hub, Nashik • 1.2km away" },
  "Shatabdi Institute of Tech • 780m away": { "mr": "शताब्दी तंत्रज्ञान संस्था • ७८० मी अंतरावर", "hi": "शताब्दी इंस्टीट्यूट ऑफ टेक • ७८० मी दूर", "en": "Shatabdi Institute of Tech • 780m away" },
  "Sinhgad Institute of Tech Nashik • 850m away": { "mr": "सिंहगड तंत्रज्ञान संस्था नाशिक • ८५० मी अंतरावर", "hi": "सिंहगड़ इंस्टीट्यूट ऑफ टेक • ८५० मी दूर", "en": "Sinhgad Institute of Tech Nashik • 850m away" },
  "Symbiosis Operations Mgmt Nashik • 1.3km away": { "mr": "सिम्बायोसिस संस्था नाशिक • १.३ किमी अंतरावर", "hi": "सिम्बायोसिस इंस्टीट्यूट • १.३ किमी दूर", "en": "Symbiosis Operations Mgmt Nashik • 1.3km away" },

  # --- Stalls in Bazaars ---
  "Stall #03 • Balasaheb Tambe": { "mr": "स्टॉल #०३ • बाळासाहेब तांबे", "hi": "स्टॉल #०३ • बालासाहेब तांबे", "en": "Stall #03 • Balasaheb Tambe" },
  "Stall #08 • Sita Gufa Kendra": { "mr": "स्टॉल #०८ • सीता गुंफा केंद्र", "hi": "स्टॉल #०८ • सीता गुफा केंद्र", "en": "Stall #08 • Sita Gufa Kendra" },
  "Stall #12 • Kapaleshwar Craft": { "mr": "स्टॉल #१२ • कपालेश्वर हस्तकला", "hi": "स्टॉल #१२ • कपालेश्वर शिल्प", "en": "Stall #12 • Kapaleshwar Craft" },
  "Stall #14 • Rameshwar Brass": { "mr": "स्टॉल #१४ • रामेश्वर पितळ वस्तू", "hi": "स्टॉल #१४ • रामेश्वर पीतल भंडार", "en": "Stall #14 • Rameshwar Brass" },
  "Stall #18 • Vithal Bunkar Guild": { "mr": "स्टॉल #१८ • विठ्ठल विणकर संघ", "hi": "स्टॉल #१८ • विट्ठल बुनकर गिल्ड", "en": "Stall #18 • Vithal Bunkar Guild" },
  "Stall #21 • Madhavrao Sugandh": { "mr": "स्टॉल #२१ • माधवराव सुगंध भांडार", "hi": "स्टॉल #२१ • माधवराव सुगंध", "en": "Stall #21 • Madhavrao Sugandh" },
  "Stall #31 • Anand Bhojraj": { "mr": "स्टॉल #३१ • आनंद भोजराज", "hi": "स्टॉल #३१ • आनंद भोजराज", "en": "Stall #31 • Anand Bhojraj" },

  # --- Merchandise & Products ---
  "Brahmagiri Gangajal Flask (500ml)": { "mr": "ब्रह्मगिरी गंगाजल कलश (५०० मिली)", "hi": "ब्रह्मगिरी गंगाजल फ्लास्क (५०० मिली)", "en": "Brahmagiri Gangajal Flask (500ml)" },
  "Brass Diya": { "mr": "पितळी दिवा", "hi": "पीतल का दीया", "en": "Brass Diya" },
  "Copper Kalash": { "mr": "तांब्याचा कलश", "hi": "तांबे का कलश", "en": "Copper Kalash" },
  "Gir Cow Ghee": { "mr": "गीर गायीचे शुद्ध तूप", "hi": "गीर गाय का शुद्ध घी", "en": "Gir Cow Ghee" },
  "Handloom": { "mr": "हातमाग", "hi": "हथकरघा", "en": "Handloom" },
  "Mysore Sandalwood Paste & Tika": { "mr": "म्हैसूर चंदन लेप व टिळा", "hi": "मैसूर चंदन पेस्ट एवं टीका", "en": "Mysore Sandalwood Paste & Tika" },
  "Pure Brass Snan Kalash (1L)": { "mr": "शुद्ध पितळेचा स्नान कलश (१ लिटर)", "hi": "शुद्ध पीतल स्नान कलश (१ ली)", "en": "Pure Brass Snan Kalash (1L)" },
  "Pure Copper Tamra-Patra Thali": { "mr": "शुद्ध तांब्याचे ताम्रपात्र / पूजा थाळी", "hi": "शुद्ध तांबे की ताम्र-पात्र थाली", "en": "Pure Copper Tamra-Patra Thali" },
  "Saffron Handloom Snan Dhoti Set": { "mr": "भगवे हातमाग स्नान धोतर संच", "hi": "केसरिया हथकरघा स्नान धोती सेट", "en": "Saffron Handloom Snan Dhoti Set" },
  "BAPS Swaminarayan Mandir": { "mr": "बीएपीएस स्वामीनारायण मंदिर", "hi": "बीएपीएस स्वामीनारायण मंदिर", "en": "BAPS Swaminarayan Mandir" },
  "Artisan Direct": { "mr": "थेट कारागीर", "hi": "सीधे कारीगर", "en": "Artisan Direct" },
  "Authorized Reg #MH-15-GUIDE-0082": { "mr": "अधिकृत नोंदणी #MH-15-GUIDE-0082", "hi": "अधिकृत पंजीयन #MH-15-GUIDE-0082", "en": "Authorized Reg #MH-15-GUIDE-0082" },
  "Govt Authorized Guide #MH-15": { "mr": "शासन अधिकृत मार्गदर्शक #MH-15", "hi": "शासन अधिकृत गाइड #MH-15", "en": "Govt Authorized Guide #MH-15" },
  "Book Guide": { "mr": "मार्गदर्शक बुक करा", "hi": "गाइड बुक करें", "en": "Book Guide" },
  "Bookable In-App Guide": { "mr": "ॲपवरून बुक करता येणारे मार्गदर्शक", "hi": "ऐप से बुक करने योग्य गाइड", "en": "Bookable In-App Guide" },
  "Call Guide": { "mr": "मार्गदर्शकांना कॉल करा", "hi": "गाइड को कॉल करें", "en": "Call Guide" },
  "Change Photo": { "mr": "छायाचित्र बदला", "hi": "फोटो बदलें", "en": "Change Photo" },
  "Category *": { "mr": "वर्गवारी *", "hi": "श्रेणी *", "en": "Category *" },
  "Description & Specifications": { "mr": "वर्णन व तपशील", "hi": "विवरण एवं विनिर्देश", "en": "Description & Specifications" },
  "Direct Call": { "mr": "थेट कॉल", "hi": "सीधा कॉल", "en": "Direct Call" },
  "Direct Response": { "mr": "त्वरित प्रतिसाद", "hi": "सीधा उत्तर", "en": "Direct Response" },
  "Enter Your API Key / Token:": { "mr": "तुमची API की / टोकन प्रविष्ट करा:", "hi": "अपनी एपीआई कुंजी / टोकन दर्ज करें:", "en": "Enter Your API Key / Token:" },
  "Choose Tile Provider:": { "mr": "नकाशा प्रदाता निवडा:", "hi": "मैप टाइल प्रदाता चुनें:", "en": "Choose Tile Provider:" },
  "CartoDB Voyager (Free • No Key Needed)": { "mr": "CartoDB व्हॉयेजर (विनामूल्य • की ची गरज नाही)", "hi": "CartoDB वोयाजर (निःशुल्क • कोई कुंजी नहीं)", "en": "CartoDB Voyager (Free • No Key Needed)" },
  "Explore All": { "mr": "सर्व एक्सप्लोर करा", "hi": "सभी देखें", "en": "Explore All" },
  "FSSAI": { "mr": "एफएसएसएआय प्रमाणित", "hi": "एफएसएसएआई प्रमाणित", "en": "FSSAI" },
  "Fair Cap (₹)": { "mr": "अधिकृत मर्यादा (₹)", "hi": "उचित सीमा (₹)", "en": "Fair Cap (₹)" },
  "Fair Rate": { "mr": "वाजवी अधिकृत दर", "hi": "उचित दर", "en": "Fair Rate" },
  "False Information / Rumor": { "mr": "चुकीची माहिती / अफवा", "hi": "झूठी सूचना / अफवाह", "en": "False Information / Rumor" },
  "Fare Board & Rides": { "mr": "दरफलक व वाहने", "hi": "किराया बोर्ड एवं सवारी", "en": "Fare Board & Rides" },
  "Full Guide": { "mr": "संपूर्ण मार्गदर्शक माहिती", "hi": "पूर्ण गाइड", "en": "Full Guide" },
  "Harassment / Extortion": { "mr": "पिळवणूक / जास्तीची मागणी", "hi": "उत्पीड़न / जबरन वसूली", "en": "Harassment / Extortion" },
  "Holy Circuit Roadmap": { "mr": "पवित्र परिक्रमा नकाशा", "hi": "पवित्र परिक्रमा रोडमैप", "en": "Holy Circuit Roadmap" },
  "Hotel & Stays": { "mr": "हॉटेल्स व धर्मशाळा", "hi": "होटल एवं आवास", "en": "Hotel & Stays" },
  "In Stock (40)": { "mr": "उपलब्ध साठा (४०)", "hi": "स्टॉक में (४०)", "en": "In Stock (40)" },
  "Inquiry message...": { "mr": "चौकशी संदेश...", "hi": "पूछताछ संदेश...", "en": "Inquiry message..." },
  "Instant Dispatch": { "mr": "त्वरित रवानगी", "hi": "तत्काल प्रेषण", "en": "Instant Dispatch" },
  "Kapila (18%)": { "mr": "कपिला (१८%)", "hi": "कपिला (१८%)", "en": "Kapila (18%)" },
  "Kumbh Certified": { "mr": "कुंभ प्रमाणित", "hi": "कुंभ प्रमाणित", "en": "Kumbh Certified" },
  "Kumbhveer Desk": { "mr": "कुंभवीर कक्ष", "hi": "कुंभवीर डेस्क", "en": "Kumbhveer Desk" },
  "Kushavarta (54%)": { "mr": "कुशावर्त (५४%)", "hi": "कुशावर्त (५४%)", "en": "Kushavarta (54%)" },
  "Lab Tested": { "mr": "प्रयोगशाळा तपासणीकृत", "hi": "प्रयोगशाला परीक्षित", "en": "Lab Tested" },
  "Lakshman (22%)": { "mr": "लक्ष्मण (२२%)", "hi": "लक्ष्मण (२२%)", "en": "Lakshman (22%)" },
  "Leaflet Map & API Key": { "mr": "लीफलेट नकाशा व API की", "hi": "लीफलेट मैप एवं एपीआई कुंजी", "en": "Leaflet Map & API Key" },
  "Leaflet is open-source and working directly out-of-the-box with free high-speed map tiles.": {
    "mr": "लीफलेट हे मुक्त-स्रोत असून विनामूल्य हाय-स्पीड नकाशासह सुरळीत कार्यरत आहे.",
    "hi": "लीफलेट ओपन-सोर्स है और मुफ्त हाई-स्पीड मैप टाइल्स के साथ सीधे काम करता है।",
    "en": "Leaflet is open-source and working directly out-of-the-box with free high-speed map tiles."
  },
  "Live DB Inquiries": { "mr": "थेट प्राप्त चौकशी", "hi": "लाइव डेटाबेस पूछताछ", "en": "Live DB Inquiries" },
  "Local registered guides are the": { "mr": "स्थानिक नोंदणीकृत मार्गदर्शक हे", "hi": "स्थानीय पंजीकृत गाइड हैं", "en": "Local registered guides are the" },
  "Log Note": { "mr": "नोंद ठेवा", "hi": "नोट दर्ज करें", "en": "Log Note" },
  "Map": { "mr": "नकाशा", "hi": "नक्शा", "en": "Map" },
  "MapTiler (Enter API Key)": { "mr": "मॅप-टायलर (API की टाका)", "hi": "मैपटाइलर (एपीआई कुंजी दर्ज करें)", "en": "MapTiler (Enter API Key)" },
  "Message successfully logged in database!": { "mr": "संदेश डाटाबेसमध्ये यशस्वीरीत्या नोंदवला गेला!", "hi": "संदेश डेटाबेस में सफलतापूर्वक दर्ज किया गया!", "en": "Message successfully logged in database!" },
  "Misbehave / Rude Behavior": { "mr": "गैरवर्तन / उद्धटपणा", "hi": "दुर्व्यवहार / अनुचित व्यवहार", "en": "Misbehave / Rude Behavior" },
  "Mobile Number": { "mr": "भ्रमणध्वनी क्रमांक", "hi": "मोबाइल नंबर", "en": "Mobile Number" },
  "Nashik Police Unit": { "mr": "नाशिक पोलीस विभाग", "hi": "नासिक पुलिस इकाई", "en": "Nashik Police Unit" },
  "Need a key? Get one free at": { "mr": "की हवी आहे? येथे मोफत मिळवा:", "hi": "कुंजी चाहिए? यहां मुफ्त प्राप्त करें:", "en": "Need a key? Get one free at" },
  "Next 45m": { "mr": "पुढील ४५ मिनिटे", "hi": "अगले ४५ मिनट", "en": "Next 45m" },
  "Official Booking": { "mr": "अधिकृत नोंदणी", "hi": "आधिकारिक बुकिंग", "en": "Official Booking" },
  "Optimal window:": { "mr": "योग्य वेळ:", "hi": "अनुकूल समय:", "en": "Optimal window:" },
  "Or choose sample artisan item photo:": { "mr": "किंवा कारागीर वस्तूचे नमुना छायाचित्र निवडा:", "hi": "या नमूना कारीगर वस्तु फोटो चुनें:", "en": "Or choose sample artisan item photo:" },
  "Pay at Meeting Point": { "mr": "भेटण्याच्या ठिकाणी रक्कम द्या", "hi": "मिलने के स्थान पर भुगतान करें", "en": "Pay at Meeting Point" },
  "Permanent Civic Logging": { "mr": "कायमस्वरूपी नागरी नोंद", "hi": "स्थायी नागरिक रिकॉर्ड", "en": "Permanent Civic Logging" },
  "Permanently saved to KumbhSetu verified database": { "mr": "कुंभसेतु प्रमाणित डाटाबेसमध्ये कायम जतन केले", "hi": "कुंभसेतु सत्यापित डेटाबेस में स्थायी रूप से सहेजा गया", "en": "Permanently saved to KumbhSetu verified database" },
  "Pre-booked Store Pickups": { "mr": "पूर्व-नोंदणीकृत दुकान संकलन", "hi": "पूर्व-बुक किए गए स्टोर पिकअप", "en": "Pre-booked Store Pickups" },
  "Product / Item Name *": { "mr": "उत्पादन / वस्तूचे नाव *", "hi": "उत्पाद / वस्तु का नाम *", "en": "Product / Item Name *" },
  "Product Photo": { "mr": "उत्पादनाचे छायाचित्र", "hi": "उत्पाद फोटो", "en": "Product Photo" },
  "Puja Samagri & Bazaar": { "mr": "पूजा सामग्री व बाजारपेठ", "hi": "पूजा सामग्री एवं बाज़ार", "en": "Puja Samagri & Bazaar" },
  "Ramkund Main Holy Ghat": { "mr": "रामकुंड मुख्य पवित्र घाट", "hi": "रामकुंड मुख्य पवित्र घाट", "en": "Ramkund Main Holy Ghat" },
  "Recent Yatri Messages & Inputs (Live Database)": {
    "mr": "भाविकांचे ताजे संदेश व सूचना (थेट डाटाबेस)",
    "hi": "तीर्थयात्रियों के हालिया संदेश एवं इनपुट (लाइव डेटाबेस)",
    "en": "Recent Yatri Messages & Inputs (Live Database)"
  },
  "Register Guide": { "mr": "मार्गदर्शक नोंदणी करा", "hi": "गाइड पंजीकरण करें", "en": "Register Guide" },
  "Registered Local Guides:": { "mr": "नोंदणीकृत स्थानिक मार्गदर्शक:", "hi": "पंजीकृत स्थानीय गाइड:", "en": "Registered Local Guides:" },
  "Report Overcharge": { "mr": "जास्तीच्या दराची तक्रार करा", "hi": "अतिरिक्त वसूली की रिपोर्ट करें", "en": "Report Overcharge" },
  "Role": { "mr": "भूमिका", "hi": "भूमिका", "en": "Role" },
  "Rubbing Stone Inc.": { "mr": "सान खलबत्ता केंद्र", "hi": "रबिंग स्टोन केंद्र", "en": "Rubbing Stone Inc." },
  "Rudraksha": { "mr": "रुद्राक्ष", "hi": "रुद्राक्ष", "en": "Rudraksha" },
  "Sanitation & Ghats": { "mr": "स्वच्छता व घाट व्यवस्था", "hi": "स्वच्छता एवं घाट", "en": "Sanitation & Ghats" },
  "Satvik Food & Prasadam": { "mr": "सात्विक भोजन व प्रसाद", "hi": "सात्विक भोजन एवं प्रसाद", "en": "Satvik Food & Prasadam" },
  "Satvik Meal": { "mr": "सात्विक भोजन", "hi": "सात्विक भोजन", "en": "Satvik Meal" },
  "Save & Apply": { "mr": "जतन करा व लागू करा", "hi": "सहेजें एवं लागू करें", "en": "Save & Apply" },
  "Save to Database": { "mr": "डाटाबेसमध्ये जतन करा", "hi": "डेटाबेस में सहेजें", "en": "Save to Database" },
  "Sealed": { "mr": "सील केलेले", "hi": "सील बंद", "en": "Sealed" },
  "Sector 2 Desk • Shift B Active": { "mr": "विभाग २ कक्ष • पाळी ब सक्रिय", "hi": "सेक्टर २ डेस्क • शिफ्ट बी सक्रिय", "en": "Sector 2 Desk • Shift B Active" },
  "Send & Log Reply": { "mr": "उत्तर पाठवा व नोंदवा", "hi": "उत्तर भेजें एवं दर्ज करें", "en": "Send & Log Reply" },
  "Send Inquiry": { "mr": "चौकशी पाठवा", "hi": "पूछताछ भेजें", "en": "Send Inquiry" },
  "Send Message or Inquiry to Vendor": { "mr": "विक्रेत्याला संदेश किंवा चौकशी पाठवा", "hi": "विक्रेता को संदेश या पूछताछ भेजें", "en": "Send Message or Inquiry to Vendor" },
  "Shahi Snan": { "mr": "शाही स्नान", "hi": "शाही स्नान", "en": "Shahi Snan" },
  "Slide across for more items": { "mr": "अधिक वस्तूंसाठी पुढे सरकवा", "hi": "अधिक वस्तुओं के लिए स्लाइड करें", "en": "Slide across for more items" },
  "Stays, Stalls & Rides:": { "mr": "निवास, स्टॉल्स व वाहने:", "hi": "आवास, स्टॉल एवं सवारी:", "en": "Stays, Stalls & Rides:" },
  "Stock Count": { "mr": "उपलब्ध संख्या", "hi": "स्टॉक संख्या", "en": "Stock Count" },
  "Subcategory / Type": { "mr": "उपप्रकार", "hi": "उपश्रेणी / प्रकार", "en": "Subcategory / Type" },
  "Take Photo / Browse": { "mr": "फोटो काढा / निवडा", "hi": "फोटो लें / ब्राउज़ करें", "en": "Take Photo / Browse" },
  "Tap multiple categories that apply, or add your own custom category below:": {
    "mr": "लागू असणाऱ्या पर्यायांना स्पर्श करा, किंवा खाली तुमची स्वतःची वर्गवारी जोडा:",
    "hi": "लागू होने वाली श्रेणियों को चुनें, या नीचे अपनी कस्टम श्रेणी जोड़ें:",
    "en": "Tap multiple categories that apply, or add your own custom category below:"
  },
  "Tap pins to view transit cost": { "mr": "प्रवास खर्च पाहण्यासाठी चिन्हावर स्पर्श करा", "hi": "यात्रा खर्च देखने के लिए पिन पर टैप करें", "en": "Tap pins to view transit cost" },
  "Tomorrow": { "mr": "उद्या", "hi": "कल", "en": "Tomorrow" },
  "Transport & Auto Guide": { "mr": "वाहतूक व रिक्षा मार्गदर्शक", "hi": "परिवहन एवं ऑटो गाइड", "en": "Transport & Auto Guide" },
  "Vendor / Bazaar": { "mr": "विक्रेता / बाजारपेठ", "hi": "विक्रेता / बाज़ार", "en": "Vendor / Bazaar" },
  "Vendor Contact Phone": { "mr": "विक्रेत्याचा संपर्क क्रमांक", "hi": "विक्रेता संपर्क फोन", "en": "Vendor Contact Phone" },
  "X-Ray Verified": { "mr": "एक्स-रे तपासणीकृत", "hi": "एक्स-रे सत्यापित", "en": "X-Ray Verified" },
  "XGBoost": { "mr": "एक्सजी-बूस्ट", "hi": "एक्सजी-बूस्ट", "en": "XGBoost" },
  "Yatri:": { "mr": "भाविक:", "hi": "तीर्थयात्री:", "en": "Yatri:" },
  "Your Name": { "mr": "तुमचे नाव", "hi": "आपका नाम", "en": "Your Name" },
  "Your Price (₹) *": { "mr": "तुमचा दर (₹) *", "hi": "आपका मूल्य (₹) *", "en": "Your Price (₹) *" },
  "Your Reply Message *": { "mr": "तुमचा उत्तर संदेश *", "hi": "आपका जवाब संदेश *", "en": "Your Reply Message *" },
  "Your message is recorded directly in KumbhSetu civic database": {
    "mr": "तुमचा संदेश कुंभसेतु नागरी डाटाबेसमध्ये थेट नोंदवला गेला आहे",
    "hi": "आपका संदेश कुंभसेतु नागरिक डेटाबेस में सीधे दर्ज किया गया है",
    "en": "Your message is recorded directly in KumbhSetu civic database"
  },
  "• In-App Bookable": { "mr": "• ॲपवरून बुक करता येणारे", "hi": "• ऐप से बुक करने योग्य", "en": "• In-App Bookable" },
  "₹150 / hr": { "mr": "₹१५० / तास", "hi": "₹१५० / घंटा", "en": "₹150 / hr" },
  "★★★★★": { "mr": "★★★★★", "hi": "★★★★★", "en": "★★★★★" },
  "✓ Protected Rate": { "mr": "✓ अधिकृत प्रमाणित दर", "hi": "✓ सुरक्षित प्रमाणित दर", "en": "✓ Protected Rate" },
  "96.8% positive field feedback": { "mr": "९६.८% सकारात्मक क्षेत्रीय अभिप्राय", "hi": "९६.८% सकारात्मक फील्ड फीडबैक", "en": "96.8% positive field feedback" },

  # --- Volunteer Names ---
  "Anand Joshi": { "mr": "आनंद जोशी", "hi": "आनंद जोशी", "en": "Anand Joshi" },
  "Aniket Gangurde": { "mr": "अनिकेत गांगुर्डे", "hi": "अनिकेत गांगुर्डे", "en": "Aniket Gangurde" },
  "Chetan Wagh": { "mr": "चेतन वाघ", "hi": "चेतन वाघ", "en": "Chetan Wagh" },
  "Harshada Khairnar": { "mr": "हर्षदा खैरनार", "hi": "हर्षदा खैरनार", "en": "Harshada Khairnar" },
  "Kunal Chaudhari": { "mr": "कुणाल चौधरी", "hi": "कुणाल चौधरी", "en": "Kunal Chaudhari" },
  "Manasi Dhole": { "mr": "मानसी ढोले", "hi": "मानसी ढोले", "en": "Manasi Dhole" },
  "Neha Borde": { "mr": "नेहा बोर्डे", "hi": "नेहा बोर्डे", "en": "Neha Borde" },
  "Omkar Gite": { "mr": "ओमकार गीते", "hi": "ओमकार गीते", "en": "Omkar Gite" },
  "Pratik Pawar": { "mr": "प्रतीक पवार", "hi": "प्रतीक पवार", "en": "Pratik Pawar" },
  "Priyanka Gaikwad": { "mr": "प्रियंका गायकवाड", "hi": "प्रियंका गायकवाड", "en": "Priyanka Gaikwad" },
  "Rohit Tambe": { "mr": "रोहित तांबे", "hi": "रोहित तांबे", "en": "Rohit Tambe" },
  "Rutuja Joshi": { "mr": "ऋतुजा जोशी", "hi": "ऋतुजा जोशी", "en": "Rutuja Joshi" },
  "Sayali More": { "mr": "सायली मोरे", "hi": "सायली मोरे", "en": "Sayali More" },
  "Shreya Mahajan": { "mr": "श्रेया महाजन", "hi": "श्रेया महाजन", "en": "Shreya Mahajan" },
  "Tanvi Kulkarni": { "mr": "तन्वी कुलकर्णी", "hi": "तन्वी कुलकर्णी", "en": "Tanvi Kulkarni" }
}

with open('/tmp/unhandled_remaining.json', 'r') as f:
    un = json.load(f)

print(f"Adding {len(REMAINING)} translations...")

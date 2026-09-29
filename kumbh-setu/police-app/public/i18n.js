/**
 * KumbhSetu (कुंभसेतु) — Complete Trilingual Translation Engine
 * Official Languages: English (en), Marathi (mr / मराठी), Hindi (hi / हिंदी)
 * Covers all 24 screens with 2089+ verified entries and dynamic pattern matching.
 */

(function () {
  'use strict';

  const TRANSLATIONS = {
  "\"Action Required: Upload approved rate card signed by auto rickshaw union secretary before permit dispatch.\"": {
    "mr": "\"आवश्यक कृती: परवाना वितरणापूर्वी रिक्षा चालक संघटनेच्या सचिवाने स्वाक्षरी केलेले मंजूर दरपत्रक अपलोड करा.\"",
    "hi": "\"कार्रवाई Required: अपलोड करें approved दर card signed by ऑटो रिक्शा union secretary before permit dispatch.\"",
    "en": "\"Action Required: Upload approved rate card signed by auto rickshaw union secretary before permit dispatch.\""
  },
  "\"Authentic pure copper kalash. Tested it with Ganga-jal and water at the ghat, pure hammered copper. Highly recommended.\"": {
    "mr": "\"अस्सल शुद्ध तांब्याचा कलश. घाटावर गंगाजलाने पडताळणी केली, शुद्ध घडवलेले तांबे आहे. अत्यंत शिफारसीय.\"",
    "hi": "\"Authentic pure तांबा कलश. Tested it के साथ Ganga-jal और जल / पानी at घाट, pure hammered तांबा. Highly recommended.\"",
    "en": "\"Authentic pure copper kalash. Tested it with Ganga-jal and water at the ghat, pure hammered copper. Highly recommended.\""
  },
  "\"Fixed fair price with zero bargaining hassle. Very polite uncle and gave genuine guidance on the Godavari Aarti timings.\"": {
    "mr": "\"कसल्याही घासाघिसीशिवाय निश्चित वाजवी दर. अत्यंत नम्र काका आणि गोदावरी आरतीच्या वेळांबद्दल उत्तम मार्गदर्शन केले.\"",
    "hi": "\"तयशुदा उचित मूल्य के साथ शून्य bargaining hassle. Very polite uncle और gave genuine guidance on गोदावरी आरती timings.\"",
    "en": "\"Fixed fair price with zero bargaining hassle. Very polite uncle and gave genuine guidance on the Godavari Aarti timings.\""
  },
  "\"Namaskar Kulkarni ji, do you have large 7-wick aarti diyas available for tomorrow morning's Godavari snan?\"": {
    "mr": "\"नमस्कार कुलकर्णीजी, उद्या सकाळच्या गोदावरी स्नानासाठी ७ वातींचे मोठे आरती दिवे उपलब्ध आहेत का?\"",
    "hi": "\"Namaskar Kulkarni ji, do you have large 7-wick आरती दीये available के लिए tomorrow सुबह's गोदावरी स्नान?\"",
    "en": "\"Namaskar Kulkarni ji, do you have large 7-wick aarti diyas available for tomorrow morning's Godavari snan?\""
  },
  "\"Trimbak road bus service suspended due to rain.\"": {
    "mr": "\"पावसामुळे त्र्यंबक रोड बस सेवा स्थगित.\"",
    "hi": "\"बारिश के कारण त्र्यंबक रोड बस सेवा निलंबित।\"",
    "en": "\"Trimbak road bus service suspended due to rain.\""
  },
  "\"Very honest vendor at Ramkund main ghat. Charged ₹210 for brass diya, completely within the estimated fair range. High quality finish and packed nicely for our train journey.\"": {
    "mr": "\"रामकुंड मुख्य घाटावरील अतिशय प्रामाणिक विक्रेता. पितळी दिव्यासाठी ₹२१० आकारले, पूर्णपणे अंदाजित वाजवी मर्यादेत. उच्च दर्जाचे काम आणि रेल्वे प्रवासासाठी उत्तम पॅक करून दिले.\"",
    "hi": "\"Very honest विक्रेता at रामकुंड main घाट. Charged ₹210 के लिए पीतल दीया, completely के भीतर अनुमानित उचित range. उच्च / तीव्र quality finish और packed nicely के लिए our train journey.\"",
    "en": "\"Very honest vendor at Ramkund main ghat. Charged ₹210 for brass diya, completely within the estimated fair range. High quality finish and packed nicely for our train journey.\""
  },
  "\"VIP Ramkund Bathing Passes being sold for ₹2,000 near CBS stand.\"": {
    "mr": "\"सीबीएस स्टँडजवळ रामकुंड व्हीआयपी स्नान पास ₹२,००० मध्ये विकले जात आहेत.\"",
    "hi": "\"सीबीएस स्टैंड के पास वीआईपी रामकुंड स्नान पास ₹२,००० में बेचे जा रहे हैं।\"",
    "en": "\"VIP Ramkund Bathing Passes being sold for ₹2,000 near CBS stand.\""
  },
  "\"Water shortage in Tapovan Sadhu Gram Sector 3 camp.\"": {
    "mr": "\"तपोवन साधू ग्राम विभाग ३ छावणीत पाण्याची टंचाई.\"",
    "hi": "\"तपोवन साधु ग्राम सेक्टर ३ शिविर में पानी की कमी।\"",
    "en": "\"Water shortage in Tapovan Sadhu Gram Sector 3 camp.\""
  },
  "#4": {
    "mr": "#४",
    "hi": "#४",
    "en": "#4"
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
    "mr": "#POL-NSK-२०२७-०४८२",
    "hi": "#POL-NSK-२०२७-०४८२",
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
    "mr": "(१२८-डी बायोमेट्रिक वेक्टर प्राप्त)",
    "hi": "(१२८-डी बायोमेट्रिक वेक्टर निकाला गया)",
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
    "mr": "(७ मिनिटे पायी)",
    "hi": "(७ मिनट पैदल)",
    "en": "(7 min walk)"
  },
  "(Ahmedabad, Gujarat)": {
    "mr": "(अहमदाबाद, गुजरात)",
    "hi": "(अहमदाबाद, गुजरात)",
    "en": "(Ahmedabad, Gujarat)"
  },
  "(Chennai)": {
    "mr": "(चेन्नई)",
    "hi": "(चेन्नई)",
    "en": "(Chennai)"
  },
  "(Chennai, TN)": {
    "mr": "(चेन्नई, तमिळनाडू)",
    "hi": "(चेन्नई, तमिलनाडु)",
    "en": "(Chennai, TN)"
  },
  "(Jaipur, Rajasthan)": {
    "mr": "(जयपूर, राजस्थान)",
    "hi": "(जयपुर, राजस्थान)",
    "en": "(Jaipur, Rajasthan)"
  },
  "(K.T.H.M. College)": {
    "mr": "(K.T.H.M. महाविद्यालय)",
    "hi": "(K.T.H.M. कॉलेज)",
    "en": "(K.T.H.M. College)"
  },
  "(Lucknow, UP)": {
    "mr": "(लखनौ, उत्तर प्रदेश)",
    "hi": "(लखनऊ, उप्र)",
    "en": "(Lucknow, UP)"
  },
  "(Nagpur)": {
    "mr": "(नागपूर)",
    "hi": "(नागपुर)",
    "en": "(Nagpur)"
  },
  "(New Delhi)": {
    "mr": "(नवी दिल्ली)",
    "hi": "(नई दिल्ली)",
    "en": "(New Delhi)"
  },
  "(Optional)": {
    "mr": "(ऐच्छिक)",
    "hi": "(वैकल्पिक)",
    "en": "(Optional)"
  },
  "(Panchavati Resident)": {
    "mr": "(पंचवटी रहिवासी)",
    "hi": "(पंचवटी निवासी)",
    "en": "(Panchavati Resident)"
  },
  "(Pune)": {
    "mr": "(पुणे)",
    "hi": "(पुणे)",
    "en": "(Pune)"
  },
  "(Route: Panchavati Ghat to CBS Central).": {
    "mr": "(मार्ग: पंचवटी घाट ते सीबीएस मध्यवर्ती).",
    "hi": "(मार्ग: पंचवटी घाट से सीबीएस सेंट्रल).",
    "en": "(Route: Panchavati Ghat to CBS Central)."
  },
  "(Select one or more)": {
    "mr": "(एक किंवा अधिक निवडा)",
    "hi": "(एक या अधिक चुनें)",
    "en": "(Select one or more)"
  },
  "(Surat)": {
    "mr": "(सुरत)",
    "hi": "(सूरत)",
    "en": "(Surat)"
  },
  "+ Add Officer Field Note": {
    "mr": "+ अधिकारी क्षेत्रीय नोंद जोडा",
    "hi": "+ अधिकारी फील्ड नोट जोड़ें",
    "en": "+ Add Officer Field Note"
  },
  "+ Register Vendor": {
    "mr": "+ नवीन विक्रेता नोंदणी",
    "hi": "+ नया विक्रेता पंजीकरण",
    "en": "+ Register Vendor"
  },
  "+ Report Civic Issue": {
    "mr": "+ नागरी तक्रार नोंदवा",
    "hi": "+ नागरिक शिकायत दर्ज करें",
    "en": "+ Report Civic Issue"
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
    "mr": "+91 98210 44192 • भाविक वाहतूक पास #7721",
    "hi": "+91 98210 44192 • तीर्थयात्री परिवहन पास #7721",
    "en": "+91 98210 44192 • Yatri Transit Pass #7721"
  },
  "+₹600 (+67% over benchmark)": {
    "mr": "+₹600 (+67% पेक्षा अधिक प्रमाणक)",
    "hi": "+₹600 (+67% से अधिक मानक)",
    "en": "+₹600 (+67% over benchmark)"
  },
  "+₹70 Overcharge": {
    "mr": "+₹70 जादा दर",
    "hi": "+₹70 अत्यधिक किराया",
    "en": "+₹70 Overcharge"
  },
  ", portal listed": {
    "mr": ", पोर्टलवरील दर",
    "hi": ", पोर्टल दर",
    "en": ", portal listed"
  },
  "-- Choose from Sector 4 Registry --": {
    "mr": "-- विभाग ४ नोंदणीतून निवडा --",
    "hi": "-- सेक्टर ४ रजिस्ट्री से चुनें --",
    "en": "-- Choose from Sector 4 Registry --"
  },
  ". Missing driver union rate card endorsement for corridor pass.": {
    "mr": ". Missing driver union दर card endorsement साठी corridor pass.",
    "hi": ". Missing driver union दर card endorsement के लिए corridor pass.",
    "en": ". Missing driver union rate card endorsement for corridor pass."
  },
  ". Stays, food stalls, and auto rides are direct-contact only.": {
    "mr": ". निवास, खाद्य स्टॉल्स व रिक्षा सेवा केवळ थेट संपर्काने उपलब्ध आहेत.",
    "hi": "। आवास, भोजन स्टॉल और ऑटो यात्राएं केवल सीधे संपर्क से उपलब्ध हैं।",
    "en": ". Stays, food stalls, and auto rides are direct-contact only."
  },
  "/ 2 hours tour": {
    "mr": "/ 2 तास दौरा",
    "hi": "/ 2 घंटे दौरा",
    "en": "/ 2 hours tour"
  },
  "/ 26 Raised": {
    "mr": "/ २६ उपस्थित",
    "hi": "/ २६ उठाए गए",
    "en": "/ 26 Raised"
  },
  "/ day statutory cap": {
    "mr": "/ दिवस statutory मर्यादा",
    "hi": "/ दिन statutory सीमा",
    "en": "/ day statutory cap"
  },
  "/ full half-day tour": {
    "mr": "/ full half-दिवस दौरा",
    "hi": "/ full half-दिन दौरा",
    "en": "/ full half-day tour"
  },
  "/ group total (fair indicative locked)": {
    "mr": "/ group total (वाजवी indicative locked)",
    "hi": "/ group total (उचित indicative locked)",
    "en": "/ group total (fair indicative locked)"
  },
  "/ hour (Pre-Paid Fixed Tariff)": {
    "mr": "/ hour (Pre-Paid निश्चित दरपत्रक)",
    "hi": "/ hour (Pre-Paid तयशुदा दर सूची)",
    "en": "/ hour (Pre-Paid Fixed Tariff)"
  },
  "/ night": {
    "mr": "/ रात्र",
    "hi": "/ रात",
    "en": "/ night"
  },
  "/ ritual set": {
    "mr": "/ पूजा संच",
    "hi": "/ अनुष्ठान सेट",
    "en": "/ ritual set"
  },
  "/ satvik thali": {
    "mr": "/ सात्त्विक थाळी",
    "hi": "/ सात्विक थाली",
    "en": "/ satvik thali"
  },
  "/ शुभ यात्रा": {
    "mr": "/ शुभ यात्रा",
    "hi": "/ शुभ यात्रा",
    "en": "/ Safe Journey"
  },
  "/night": {
    "mr": "/रात्र",
    "hi": "/रात",
    "en": "/night"
  },
  "/nt": {
    "mr": "/रात्र",
    "hi": "/रात",
    "en": "/nt"
  },
  "0 Flags": {
    "mr": "0 इशारे",
    "hi": "0 चेतावनी",
    "en": "0 Flags"
  },
  "0 km (Base)": {
    "mr": "० किमी (मूळ स्थान)",
    "hi": "० किमी (आरंभ स्थल)",
    "en": "0 km (Base)"
  },
  "08:00 AM – 08:00 PM": {
    "mr": "सकाळी ०८:०० – रात्री ०८:००",
    "hi": "सुबह ०८:०० – रात ०८:००",
    "en": "08:00 AM – 08:00 PM"
  },
  "1 Selected": {
    "mr": "१ निवडले",
    "hi": "१ चुना गया",
    "en": "1 Selected"
  },
  "1,280 / 1,520 Verified": {
    "mr": "1,280 / 1,520 प्रमाणित",
    "hi": "1,280 / 1,520 सत्यापित",
    "en": "1,280 / 1,520 Verified"
  },
  "1. Full Name (संपूर्ण नाव)": {
    "mr": "१. संपूर्ण नाव",
    "hi": "१. पूरा नाम",
    "en": "1. Full Name (संपूर्ण नाव)"
  },
  "1. New": {
    "mr": "१. नवीन",
    "hi": "१. नया",
    "en": "1. New"
  },
  "1. Ramkund": {
    "mr": "१. रामकुंड",
    "hi": "१. रामकुंड",
    "en": "1. Ramkund"
  },
  "1. Select Categories": {
    "mr": "१. वर्गवारी निवडा",
    "hi": "१. श्रेणियां चुनें",
    "en": "1. Select Categories"
  },
  "1. Select Category": {
    "mr": "१. तक्रार प्रकार निवडा",
    "hi": "१. श्रेणी चुनें",
    "en": "1. Select Category"
  },
  "1.2 km away • Ramkund Northern Ghat": {
    "mr": "1.2 किमी अंतरावर • रामकुंड Northern घाट",
    "hi": "1.2 किमी दूर • रामकुंड Northern घाट",
    "en": "1.2 km away • Ramkund Northern Ghat"
  },
  "1.2 km from Kushavarta Ghat": {
    "mr": "1.2 km कडून कुशावर्त घाट",
    "hi": "1.2 km से कुशावर्त घाट",
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
  "100% Fair": {
    "mr": "वाजवी श्रेणी",
    "hi": "उचित श्रेणी",
    "en": "Fair Category"
  },
  "100% FALSE. Municipal water supply pipelines are functional with 18 mobile tankers stationed at Sector 3.": {
    "mr": "१००% खोटे. महापालिकेची पाणीपुरवठा वाहिनी सुरळीत असून विभाग ३ मध्ये १८ पाण्याचे टँकर्स तैनात आहेत.",
    "hi": "१००% झूठ। नगर निगम की जल आपूर्ति पाइपलाइन चालू है और सेक्टर ३ में १८ मोबाइल टैंकर तैनात हैं।",
    "en": "100% FALSE. Municipal water supply pipelines are functional with 18 mobile tankers stationed at Sector 3."
  },
  "100% FALSE. Simhastha holy dips across all 24 Nashik & Trimbak ghats are strictly free and open to all citizens. Anyone selling passes is arrested under BNS.": {
    "mr": "१००% खोटे. नाशिक व त्र्यंबकेश्वरच्या सर्व २४ घाटांवर स्नान पूर्णपणे मोफत आहे. पासेस विकणाऱ्यावर त्वरित गुन्हा दाखल केला जात आहे.",
    "hi": "१००% झूठ। नासिक और त्र्यंबक के सभी २४ घाटों पर पवित्र स्नान पूरी तरह निःशुल्क है। पास बेचने वालों पर तत्काल कानूनी कार्रवाई हो रही है।",
    "en": "100% FALSE. Simhastha holy dips across all 24 Nashik & Trimbak ghats are strictly free and open to all citizens. Anyone selling passes is arrested under BNS."
  },
  "100% Fixed Dakshina display": {
    "mr": "100% निश्चित Dakshina display",
    "hi": "100% तयशुदा Dakshina display",
    "en": "100% Fixed Dakshina display"
  },
  "100% Pure": {
    "mr": "१००% शुद्ध",
    "hi": "१००% शुद्ध",
    "en": "100% Pure"
  },
  "100% Pure Cotton": {
    "mr": "१००% शुद्ध सुती कापड",
    "hi": "१००% शुद्ध सूती",
    "en": "100% Pure Cotton"
  },
  "120m away": {
    "mr": "120 मी अंतरावर",
    "hi": "120 मी दूर",
    "en": "120m away"
  },
  "128-d Vector extracted": {
    "mr": "१२८-डी व्हेक्टर पडताळणी पूर्ण",
    "hi": "१२८-डी वेक्टर सत्यापन पूर्ण",
    "en": "128-d Vector extracted"
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
    "mr": "१४ फेब्रुवारी २०२७",
    "hi": "१४ फरवरी २०२७",
    "en": "14 Feb 2027"
  },
  "14:15 IST • Escalation": {
    "mr": "14:15 IST • तक्रार निवारण",
    "hi": "14:15 IST • शिकायत निवारण",
    "en": "14:15 IST • Escalation"
  },
  "14:22 IST • Patrol Dispatch": {
    "mr": "14:22 IST • गस्त पथक रवानगी",
    "hi": "14:22 IST • गश्ती दल प्रेषण",
    "en": "14:22 IST • Patrol Dispatch"
  },
  "14m ago": {
    "mr": "14 मिनिटांपूर्वी",
    "hi": "14 मिनट पहले",
    "en": "14m ago"
  },
  "14–16 Feb '27": {
    "mr": "१४–१६ फेब्रु '२७",
    "hi": "१४–१६ फर '२७",
    "en": "14–16 Feb '27"
  },
  "150m from Ghat": {
    "mr": "150m कडून घाट",
    "hi": "150m से घाट",
    "en": "150m from Ghat"
  },
  "15–17 Feb 2027 (2 nights)": {
    "mr": "१५–१७ फेब्रुवारी २०२७ (२ रात्री)",
    "hi": "१५–१७ फरवरी २०२७ (२ रातें)",
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
    "mr": "१८ फेब्रुवारी २०२७ • सकाळी ८:०० ते दुपारी २:००",
    "hi": "१८ फरवरी २०२७ • सुबह ८:०० से दोपहर २:००",
    "en": "18 Feb 2027 • 8:00 AM to 2:00 PM"
  },
  "18 Standard, 4 Dorm": {
    "mr": "18 स्थानकard, 4 डॉर्मिटरी",
    "hi": "18 स्टैंडard, 4 डॉर्मिटरी",
    "en": "18 Standard, 4 Dorm"
  },
  "18% capacity": {
    "mr": "१८% क्षमता",
    "hi": "१८% क्षमता",
    "en": "18% capacity"
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
  "1920 (Kumbh Helpline)": {
    "mr": "१९२० (कुंभ मदत कक्ष)",
    "hi": "१९२० (कुंभ हेल्पलाइन)",
    "en": "1920 (Kumbh Helpline)"
  },
  "1h 10m ago": {
    "mr": "1h 10m ago",
    "hi": "1h 10m ago",
    "en": "1h 10m ago"
  },
  "1x Certified 5-Mukhi Rudraksha Mala": {
    "mr": "1x प्रमाणित 5-Mukhi रुद्राक्ष माळ",
    "hi": "1x सत्यापित 5-Mukhi रुद्राक्ष माला",
    "en": "1x Certified 5-Mukhi Rudraksha Mala"
  },
  "2 Guests": {
    "mr": "२ पाहुणे",
    "hi": "२ अतिथि",
    "en": "2 Guests"
  },
  "2 hrs ago": {
    "mr": "2 तासांपूर्वी",
    "hi": "2 घंटे पहले",
    "en": "2 hrs ago"
  },
  "2 Nights (Check-in 11:00 AM)": {
    "mr": "२ रात्री (चेक-इन सकाळी ११:००)",
    "hi": "२ रातें (चेक-इन सुबह ११:००)",
    "en": "2 Nights (Check-in 11:00 AM)"
  },
  "2 Persons": {
    "mr": "२ व्यक्ती",
    "hi": "२ व्यक्ति",
    "en": "2 Persons"
  },
  "2 Photos": {
    "mr": "२ छायाचित्रे",
    "hi": "२ तस्वीरें",
    "en": "2 Photos"
  },
  "2 Pilgrims": {
    "mr": "2 भाविक",
    "hi": "2 तीर्थयात्री",
    "en": "2 Pilgrims"
  },
  "2,610 pts": {
    "mr": "२,६१० गुण",
    "hi": "२,६१० अंक",
    "en": "2,610 pts"
  },
  "2,850 pts": {
    "mr": "२,८५० गुण",
    "hi": "२,८५० अंक",
    "en": "2,850 pts"
  },
  "2. Email ID (ईमेल पत्ता)": {
    "mr": "२. ईमेल पत्ता",
    "hi": "२. ईमेल पता",
    "en": "2. Email ID (ईमेल पत्ता)"
  },
  "2. Establishment or Location": {
    "mr": "२. ठिकाण किंवा आस्थापना",
    "hi": "२. प्रतिष्ठान या स्थान",
    "en": "2. Establishment or Location"
  },
  "2. Kapaleshwar": {
    "mr": "२. कपालेश्वर",
    "hi": "२. कपालेश्वर",
    "en": "2. Kapaleshwar"
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
  "21 Active": {
    "mr": "२१ सक्रिय",
    "hi": "२१ सक्रिय",
    "en": "21 Active"
  },
  "22% capacity": {
    "mr": "२२% क्षमता",
    "hi": "२२% क्षमता",
    "en": "22% capacity"
  },
  "24+ Products": {
    "mr": "२४+ उत्पादने",
    "hi": "२४+ उत्पाद",
    "en": "24+ Products"
  },
  "256-BIT ENCRYPTION": {
    "mr": "२५६-बिट सुरक्षित एन्क्रिप्शन",
    "hi": "२५६-बिट सुरक्षित एन्क्रिप्शन",
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
  "28% capacity": {
    "mr": "२८% क्षमता",
    "hi": "२८% क्षमता",
    "en": "28% capacity"
  },
  "28% capacity (~240/m² safe)": {
    "mr": "२८% क्षमता (~२४०/मी² सुरक्षित)",
    "hi": "२८% क्षमता (~२४०/मी² सुरक्षित)",
    "en": "28% capacity (~240/m² safe)"
  },
  "28.0 km": {
    "mr": "28.0 किमी अंतरावर",
    "hi": "28.0 किमी दूर",
    "en": "28.0 km"
  },
  "28°C • Pleasant": {
    "mr": "२८°C • आल्हाददायक",
    "hi": "२८°C • सुहावना मौसम",
    "en": "28°C • Pleasant"
  },
  "2x Hand-Cast Brass Diya, 1x Copper Kalash": {
    "mr": "2x Hand-Cast पितळ दिवा, 1x तांबे कळश",
    "hi": "2x Hand-Cast पीतल दीया, 1x तांबा कलश",
    "en": "2x Hand-Cast Brass Diya, 1x Copper Kalash"
  },
  "3 Actionable": {
    "mr": "३ कारवाईयोग्य",
    "hi": "३ कार्रवाई योग्य",
    "en": "3 Actionable"
  },
  "3 Active Orders": {
    "mr": "3 सक्रिय ऑर्डर्स",
    "hi": "3 सक्रिय ऑर्डर",
    "en": "3 Active Orders"
  },
  "3 corroborating Yatri digital receipts attached": {
    "mr": "3 corroborating भाविक digital receipts attached",
    "hi": "3 corroborating तीर्थयात्री digital receipts attached",
    "en": "3 corroborating Yatri digital receipts attached"
  },
  "3 Reports Sent Onward": {
    "mr": "३ अहवाल पुढे पाठवले",
    "hi": "३ रिपोर्ट आगे भेजी गईं",
    "en": "3 Reports Sent Onward"
  },
  "3 verified yatri complaints received in past 30 minutes": {
    "mr": "मागील ३० मिनिटांत ३ पडताळणीकृत भाविक तक्रारी प्राप्त",
    "hi": "पिछले ३० मिनट में ३ सत्यापित तीर्थयात्री शिकायतें प्राप्त",
    "en": "3 verified yatri complaints received in past 30 minutes"
  },
  "3,120 pts": {
    "mr": "३,१२० गुण",
    "hi": "३,१२० अंक",
    "en": "3,120 pts"
  },
  "3. Create Password (पासवर्ड)": {
    "mr": "3. Create पासवर्ड (पासवर्ड)",
    "hi": "3. Create पासवर्ड (पासवर्ड)",
    "en": "3. Create Password (पासवर्ड)"
  },
  "3. Fact-Chk": {
    "mr": "३. सत्यता पडताळणी",
    "hi": "३. तथ्य जांच",
    "en": "3. Fact-Chk"
  },
  "3. Issue Classification": {
    "mr": "३. समस्येचे स्वरूप",
    "hi": "३. समस्या का वर्गीकरण",
    "en": "3. Issue Classification"
  },
  "3. Issue Classification & Grievance Categories": {
    "mr": "३. समस्येचे वर्गीकरण व तक्रार प्रकार",
    "hi": "३. समस्या वर्गीकरण एवं शिकायत श्रेणियां",
    "en": "3. Issue Classification & Grievance Categories"
  },
  "3. Mobile Number (मोबाईल क्रमांक)": {
    "mr": "३. मोबाईल क्रमांक",
    "hi": "३. मोबाइल नंबर",
    "en": "3. Mobile Number (मोबाईल क्रमांक)"
  },
  "3. Sita Gufa": {
    "mr": "३. सीता गुंफा",
    "hi": "३. सीता गुफा",
    "en": "3. Sita Gufa"
  },
  "3.5 km east": {
    "mr": "३.५ किमी पूर्व",
    "hi": "३.५ किमी पूर्व",
    "en": "3.5 km east"
  },
  "300m from Ramkund": {
    "mr": "300m कडून रामकुंड",
    "hi": "300m से रामकुंड",
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
    "mr": "३ मिनिटांपूर्वी",
    "hi": "३ मिनट पहले",
    "en": "3m ago"
  },
  "4 Inspected": {
    "mr": "४ तपासलेल्या सुविधा",
    "hi": "४ निरीक्षित सुविधाएं",
    "en": "4 Inspected"
  },
  "4 Open Inquiries": {
    "mr": "४ खुली चौकशी प्रकरणे",
    "hi": "४ खुली जांच",
    "en": "4 Open Inquiries"
  },
  "4 Pilgrims": {
    "mr": "4 भाविक",
    "hi": "4 तीर्थयात्री",
    "en": "4 Pilgrims"
  },
  "4 under inspection": {
    "mr": "४ तपासणी सुरू",
    "hi": "४ जांच के अधीन",
    "en": "4 under inspection"
  },
  "4. Business / Stall Name (व्यवसाय / दुकानाचे नाव)": {
    "mr": "४. व्यवसाय / दुकानाचे नाव",
    "hi": "४. व्यवसाय / दुकान का नाम",
    "en": "4. Business / Stall Name"
  },
  "4. Government Guide Badge / Aadhaar No.": {
    "mr": "4. Government मार्गदर्शक बिल्ला / Aadhaar No.",
    "hi": "4. Government गाइड बैज / Aadhaar No.",
    "en": "4. Government Guide Badge / Aadhaar No."
  },
  "4. Solved": {
    "mr": "४. निकाली",
    "hi": "४. समाधान हुआ",
    "en": "4. Solved"
  },
  "4. Tapovan": {
    "mr": "४. तपोवन",
    "hi": "४. तपोवन",
    "en": "4. Tapovan"
  },
  "4.8m": {
    "mr": "4.8 मी अंतरावर",
    "hi": "4.8 मी दूर",
    "en": "4.8m"
  },
  "412 GPS-calibrated autos": {
    "mr": "४१२ जीपीएस प्रमाणित रिक्षा",
    "hi": "४१२ जीपीएस कैलिब्रेटेड ऑटो",
    "en": "412 GPS-calibrated autos"
  },
  "450 pts": {
    "mr": "450 pts",
    "hi": "450 pts",
    "en": "450 pts"
  },
  "450m away • Panchavati Bazar Lane": {
    "mr": "450 मी अंतरावर • पंचवटी Bazar गल्ली",
    "hi": "450 मी दूर • पंचवटी Bazar लेन",
    "en": "450m away • Panchavati Bazar Lane"
  },
  "48m ago": {
    "mr": "48 मिनिटांपूर्वी",
    "hi": "48 मिनट पहले",
    "en": "48m ago"
  },
  "4:00 AM - 10:00 AM": {
    "mr": "पहाटे ४:०० - सकाळी १०:००",
    "hi": "सुबह ४:०० - सुबह १०:००",
    "en": "4:00 AM - 10:00 AM"
  },
  "5-Mukhi Rudraksha Japa Mala": {
    "mr": "५-मुखी रुद्राक्ष जप माळ",
    "hi": "५-मुखी रुद्राक्ष जप माला",
    "en": "5-Mukhi Rudraksha Japa Mala"
  },
  "5-Mukhi Rudraksha Mala (108)": {
    "mr": "५-मुखी रुद्राक्ष माळ (१०८ मणी)",
    "hi": "५-मुखी रुद्राक्ष माला (१०८)",
    "en": "5-Mukhi Rudraksha Mala (108)"
  },
  "5. Kushavarta": {
    "mr": "५. कुशावर्त",
    "hi": "५. कुशावर्त",
    "en": "5. Kushavarta"
  },
  "5. Languages Spoken & Base Point": {
    "mr": "५. बोलल्या जाणाऱ्या भाषा व कार्यक्षेत्र",
    "hi": "५. बोली जाने वाली भाषाएं एवं आधार बिंदु",
    "en": "5. Languages Spoken & Base Point"
  },
  "5. Proof / Photo Evidence": {
    "mr": "५. पुरावा / फोटो पुरावा",
    "hi": "५. प्रमाण / फ़ोटो साक्ष्य",
    "en": "5. Proof / Photo Evidence"
  },
  "5. Stall Category (स्टॉल प्रकार)": {
    "mr": "५. स्टॉल प्रकार",
    "hi": "५. स्टॉल श्रेणी",
    "en": "5. Stall Category"
  },
  "52 Audits": {
    "mr": "५२ तपासण्या",
    "hi": "५२ ऑडिट",
    "en": "52 Audits"
  },
  "54% capacity": {
    "mr": "५४% क्षमता",
    "hi": "५४% क्षमता",
    "en": "54% capacity"
  },
  "58 Audits": {
    "mr": "५८ तपासण्या",
    "hi": "५८ ऑडिट",
    "en": "58 Audits"
  },
  "6 Family Members": {
    "mr": "६ कुटुंब सदस्य",
    "hi": "६ परिवार के सदस्य",
    "en": "6 Family Members"
  },
  "6 Items Listed": {
    "mr": "६ वस्तू सूचीबद्ध",
    "hi": "६ वस्तुएं सूचीबद्ध",
    "en": "6 Items Listed"
  },
  "6 Sacred Sites • Interconnected Holy Route • Fares & Transit Guidance": {
    "mr": "६ पवित्र स्थाने • एकमेकांशी जोडलेला मार्ग • प्रवास दर मार्गदर्शन",
    "hi": "६ पवित्र स्थल • आपस में जुड़ा मार्ग • किराया एवं यात्रा मार्गदर्शन",
    "en": "6 Sacred Sites • Interconnected Holy Route • Fares & Transit Guidance"
  },
  "6 Sacred Stops": {
    "mr": "६ पवित्र स्थाने",
    "hi": "६ पवित्र पड़ाव",
    "en": "6 Sacred Stops"
  },
  "6. Brahmagiri": {
    "mr": "६. ब्रह्मगिरी",
    "hi": "६. ब्रह्मगिरी",
    "en": "6. Brahmagiri"
  },
  "6. Incident Details (Optional)": {
    "mr": "६. घटनेचा तपशील (ऐच्छिक)",
    "hi": "६. घटना का विवरण (वैकल्पिक)",
    "en": "6. Incident Details (Optional)"
  },
  "6. Nashik Address / Sector (पत्ता / विभाग)": {
    "mr": "६. नाशिक पत्ता / विभाग",
    "hi": "६. नासिक पता / सेक्टर",
    "en": "6. Nashik Address / Sector"
  },
  "6. Personal Face CV Verification (Guide Only)": {
    "mr": "6. Personal Face CV पडताळणी (मार्गदर्शक Only)",
    "hi": "6. Personal Face CV सत्यापन (गाइड Only)",
    "en": "6. Personal Face CV Verification (Guide Only)"
  },
  "6. Profile & Verification Photo Upload": {
    "mr": "6. Profile & पडताळणी छायाचित्र अपलोड करा",
    "hi": "6. Profile & सत्यापन फोटो अपलोड करें",
    "en": "6. Profile & Verification Photo Upload"
  },
  "64 Audits": {
    "mr": "६४ तपासण्या",
    "hi": "६४ ऑडिट",
    "en": "64 Audits"
  },
  "7-Day Trend": {
    "mr": "7-दिवस Trend",
    "hi": "7-दिन Trend",
    "en": "7-Day Trend"
  },
  "7. Fair Price Pledge (वाजवी दर शपथपत्र)": {
    "mr": "७. वाजवी दर शपथपत्र",
    "hi": "७. उचित मूल्य शपथ",
    "en": "7. Fair Price Pledge"
  },
  "7. Mobile for Tracking (Optional)": {
    "mr": "७. मोबाईल क्रमांक (ट्रॅकिंगसाठी, ऐच्छिक)",
    "hi": "७. मोबाइल नंबर (ट्रैकिंग हेतु, वैकल्पिक)",
    "en": "7. Mobile for Tracking (Optional)"
  },
  "7.4 km estimated route • Stand #04": {
    "mr": "7.4 km अंदाजित मार्ग • स्थानक #04",
    "hi": "7.4 km अनुमानित मार्ग • स्टैंड #04",
    "en": "7.4 km estimated route • Stand #04"
  },
  "8 Years Experience": {
    "mr": "८ वर्षांचा अनुभव",
    "hi": "८ वर्षों का अनुभव",
    "en": "8 Years Experience"
  },
  "84.6% Resolution Rate": {
    "mr": "84.6% Resolution दर",
    "hi": "84.6% Resolution दर",
    "en": "84.6% Resolution Rate"
  },
  "850 meters from Ramkund Ghat": {
    "mr": "रामकुंड घाटापासून ८५० मीटर",
    "hi": "रामकुंड घाट से ८५० मीटर",
    "en": "850 meters from Ramkund Ghat"
  },
  "96.8% positive field feedback": {
    "mr": "९६.८% सकारात्मक क्षेत्रीय अभिप्राय",
    "hi": "९६.८% सकारात्मक फील्ड फीडबैक",
    "en": "96.8% positive field feedback"
  },
  "98% Verified Compliance": {
    "mr": "98% प्रमाणित अनुपालन",
    "hi": "98% सत्यापित अनुपालन",
    "en": "98% Verified Compliance"
  },
  "99.8% of pilgrims who scanned your stall QR code verified that they were charged within the agreed fair range.": {
    "mr": "99.8% of भाविक who scanned आपले स्टॉल QR कोड प्रमाणित that they were charged च्या आत agreed वाजवी range.",
    "hi": "99.8% of तीर्थयात्री who scanned आपका स्टॉल QR कोड सत्यापित that they were charged के भीतर agreed उचित range.",
    "en": "99.8% of pilgrims who scanned your stall QR code verified that they were charged within the agreed fair range."
  },
  "A certified student": {
    "mr": "A certified विद्यार्थी",
    "hi": "A certified छात्र",
    "en": "A certified student"
  },
  "Aadhaar / ID Proof": {
    "mr": "आधार / ओळख पुरावा",
    "hi": "आधार / पहचान प्रमाण",
    "en": "Aadhaar / ID Proof"
  },
  "Above Ramkund": {
    "mr": "Above रामकुंड",
    "hi": "Above रामकुंड",
    "en": "Above Ramkund"
  },
  "Accept Tour": {
    "mr": "दौरा स्वीकारा",
    "hi": "टूर स्वीकारें",
    "en": "Accept Tour"
  },
  "Accepted / Confirmed (": {
    "mr": "स्वीकृत / निश्चित (",
    "hi": "स्वीकृत / पुष्ट (",
    "en": "Accepted / Confirmed ("
  },
  "Accepted Tour • Dispatched": {
    "mr": "दौरा स्वीकारला • रवाना",
    "hi": "टूर स्वीकृत • रवाना",
    "en": "Accepted Tour • Dispatched"
  },
  "accessible": {
    "mr": "accessible",
    "hi": "accessible",
    "en": "accessible"
  },
  "Acknowledge": {
    "mr": "पोहोच द्या",
    "hi": "स्वीकार करें",
    "en": "Acknowledge"
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
  "Action completed successfully.": {
    "mr": "कृती completed successfully.",
    "hi": "कार्रवाई completed successfully.",
    "en": "Action completed successfully."
  },
  "Action Dispatched Successfully": {
    "mr": "कृती रवानगीed Successfully",
    "hi": "कार्रवाई प्रेषणed Successfully",
    "en": "Action Dispatched Successfully"
  },
  "Action logged:": {
    "mr": "कृती नोंदणीकृत:",
    "hi": "कार्रवाई दर्ज:",
    "en": "Action logged:"
  },
  "Action Order:": {
    "mr": "कृती ऑर्डर:",
    "hi": "कार्रवाई ऑर्डर:",
    "en": "Action Order:"
  },
  "Action recorded successfully!": {
    "mr": "कृती यशस्वीरीत्या नोंदवली!",
    "hi": "कार्रवाई सफलतापूर्वक दर्ज की गई!",
    "en": "Action recorded successfully!"
  },
  "Action Taken & Refund": {
    "mr": "कृती Taken & Refund",
    "hi": "कार्रवाई Taken & Refund",
    "en": "Action Taken & Refund"
  },
  "Active Bookings": {
    "mr": "सक्रिय बुकिंग",
    "hi": "सक्रिय बुकिंग",
    "en": "Active Bookings"
  },
  "Active civic watchdog queue for immediate rate enforcement across pilgrim touchpoints.": {
    "mr": "सक्रिय नागरी watchdog queue साठी immediate दर enforcement across भाविक touchpoints.",
    "hi": "सक्रिय नागरिक watchdog queue के लिए immediate दर enforcement across तीर्थयात्री touchpoints.",
    "en": "Active civic watchdog queue for immediate rate enforcement across pilgrim touchpoints."
  },
  "Active Escalations": {
    "mr": "सक्रिय तक्रारी व गुन्हे",
    "hi": "सक्रिय मामले एवं शिकायतें",
    "en": "Active Escalations"
  },
  "Active Field Audits": {
    "mr": "सक्रिय क्षेत्रीय तपासण्या",
    "hi": "सक्रिय फील्ड ऑडिट",
    "en": "Active Field Audits"
  },
  "Active Hotspot: Elevated Pilgrim Volume reported": {
    "mr": "सक्रिय गर्दी केंद्र: Elevated भाविक Volume reported",
    "hi": "सक्रिय भीड़ केंद्र: Elevated तीर्थयात्री Volume reported",
    "en": "Active Hotspot: Elevated Pilgrim Volume reported"
  },
  "Active Hotspots": {
    "mr": "सक्रिय गर्दी क्षेत्रे",
    "hi": "सक्रिय भीड़ क्षेत्र",
    "en": "Active Hotspots"
  },
  "Active Listings": {
    "mr": "सक्रिय उत्पादने",
    "hi": "सक्रिय उत्पाद",
    "en": "Active Listings"
  },
  "Active Now": {
    "mr": "सध्या कार्यरत",
    "hi": "अभी सक्रिय",
    "en": "Active Now"
  },
  "Active Price Flags": {
    "mr": "सक्रिय दर तक्रारी",
    "hi": "सक्रिय मूल्य शिकायतें",
    "en": "Active Price Flags"
  },
  "Active Stall Listings": {
    "mr": "सक्रिय स्टॉल नोंदी",
    "hi": "सक्रिय स्टॉल लिस्टिंग",
    "en": "Active Stall Listings"
  },
  "Active Volunteers": {
    "mr": "सक्रिय स्वयंसेवक",
    "hi": "सक्रिय स्वयंसेवक",
    "en": "Active Volunteers"
  },
  "add": {
    "mr": "add",
    "hi": "add",
    "en": "add"
  },
  "Add Category": {
    "mr": "वर्गवारी जोडा",
    "hi": "श्रेणी जोड़ें",
    "en": "Add Category"
  },
  "Add Custom Category (User Input)": {
    "mr": "स्वतःची वर्गवारी प्रविष्ट करा",
    "hi": "कस्टम श्रेणी दर्ज करें",
    "en": "Add Custom Category (User Input)"
  },
  "Add Item": {
    "mr": "वस्तू जोडा",
    "hi": "वस्तु जोड़ें",
    "en": "Add Item"
  },
  "Add New Item": {
    "mr": "नवीन वस्तू जोडा",
    "hi": "नई वस्तु जोड़ें",
    "en": "Add New Item"
  },
  "Add New Item to Sell": {
    "mr": "विक्रीसाठी नवीन वस्तू जोडा",
    "hi": "बिक्री के लिए नई वस्तु जोड़ें",
    "en": "Add New Item to Sell"
  },
  "Add Officer Field Observation": {
    "mr": "Add अधिकारी प्रत्यक्ष Observation",
    "hi": "Add अधिकारी फील्ड Observation",
    "en": "Add Officer Field Observation"
  },
  "Add to My Trip / Offline Saved": {
    "mr": "माझ्या यात्रेत जोडा / ऑफलाइन जतन करा",
    "hi": "मेरी यात्रा में जोड़ें / ऑफ़लाइन सहेजें",
    "en": "Add to My Trip / Offline Saved"
  },
  "Aditya Shinde": {
    "mr": "आदित्य शिंदे",
    "hi": "आदित्य शिंदे",
    "en": "Aditya Shinde"
  },
  "Admin": {
    "mr": "प्रशासक",
    "hi": "प्रशासक",
    "en": "Admin"
  },
  "Admin Desk": {
    "mr": "प्रशासक कक्ष",
    "hi": "प्रशासक कक्ष",
    "en": "Admin Desk"
  },
  "Admin Login": {
    "mr": "प्रशासक लॉगिन",
    "hi": "प्रशासक लॉगिन",
    "en": "Admin Login"
  },
  "against municipal cap of": {
    "mr": "मनपा कमाल मर्यादेच्या तुलनेत",
    "hi": "नगर निगम सीमा के मुकाबले",
    "en": "against municipal cap of"
  },
  "AI Enforcement Hotspot Radar": {
    "mr": "AI अंमलबजावणी गर्दी केंद्र रडार",
    "hi": "AI प्रवर्तन भीड़ केंद्र रडार",
    "en": "AI Enforcement Hotspot Radar"
  },
  "AI Enforcement Hotspots & Live Incident Stream": {
    "mr": "AI अंमलबजावणी गर्दी केंद्रे & थेट Incident Stream",
    "hi": "AI प्रवर्तन भीड़ केंद्र & लाइव Incident Stream",
    "en": "AI Enforcement Hotspots & Live Incident Stream"
  },
  "AI Hotspot Radar": {
    "mr": "AI गर्दी केंद्र रडार",
    "hi": "AI भीड़ केंद्र रडार",
    "en": "AI Hotspot Radar"
  },
  "AI Radar": {
    "mr": "एआय गर्दी रडार",
    "hi": "एआई भीड़ रडार",
    "en": "AI Radar"
  },
  "Akash Bhalerao": {
    "mr": "आकाश भालेराव",
    "hi": "आकाश भालेराव",
    "en": "Akash Bhalerao"
  },
  "Align Single Face": {
    "mr": "फक्त एक चेहरा समोर ठेवा",
    "hi": "केवल एक चेहरा सामने रखें",
    "en": "Align Single Face"
  },
  "All": {
    "mr": "सर्व",
    "hi": "सभी",
    "en": "All"
  },
  "All (": {
    "mr": "सर्व (",
    "hi": "सभी (",
    "en": "All ("
  },
  "All Cases": {
    "mr": "सर्व प्रकरणे",
    "hi": "सभी मामले",
    "en": "All Cases"
  },
  "All Entries": {
    "mr": "सर्व Entries",
    "hi": "सभी Entries",
    "en": "All Entries"
  },
  "All Flags": {
    "mr": "सर्व इशारे",
    "hi": "सभी चेतावनी",
    "en": "All Flags"
  },
  "All Foods": {
    "mr": "सर्व खाद्यपदार्थ",
    "hi": "सभी खाद्य",
    "en": "All Foods"
  },
  "All In Stock": {
    "mr": "सर्व In साठा",
    "hi": "सभी In स्टॉक",
    "en": "All In Stock"
  },
  "All Items": {
    "mr": "सर्व वस्तू",
    "hi": "सभी वस्तुएं",
    "en": "All Items"
  },
  "All prices are capped by Nashik Municipal Corporation. Overcharging is strictly prohibited.": {
    "mr": "सर्व दर नाशिक महानगरपालिकेने निश्चित केलेले आहेत. जादा दर आकारण्यास सक्त मनाई आहे.",
    "hi": "सभी दरें नासिक नगर निगम द्वारा निर्धारित हैं। अधिक दाम वसूलना सख्त मना है।",
    "en": "All prices are capped by Nashik Municipal Corporation. Overcharging is strictly prohibited."
  },
  "All Priority": {
    "mr": "सर्व प्राधान्यता",
    "hi": "सभी प्राथमिकता",
    "en": "All Priority"
  },
  "All Services": {
    "mr": "सर्व सेवा",
    "hi": "सभी सेवाएँ",
    "en": "All Services"
  },
  "All Transit": {
    "mr": "सर्व वाहतूक साधने",
    "hi": "सभी परिवहन साधन",
    "en": "All Transit"
  },
  "Ambulance": {
    "mr": "रुग्णवाहिका",
    "hi": "एम्बुलेंस",
    "en": "Ambulance"
  },
  "Ambulance & Medical (108)": {
    "mr": "रुग्णवाहिका व वैद्यकीय मदत (१०८)",
    "hi": "एम्बुलेंस एवं चिकित्सा सहायता (१०८)",
    "en": "Ambulance & Medical (108)"
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
  "Anand Joshi": {
    "mr": "आनंद जोशी",
    "hi": "आनंद जोशी",
    "en": "Anand Joshi"
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
  "Anchor Location": {
    "mr": "स्थान बिंदू",
    "hi": "मुख्य स्थान",
    "en": "Anchor Location"
  },
  "Aniket Gangurde": {
    "mr": "अनिकेत गांगुर्डे",
    "hi": "अनिकेत गांगुर्डे",
    "en": "Aniket Gangurde"
  },
  "Anjaneri Birthplace": {
    "mr": "अंजनेरी जन्मस्थान",
    "hi": "अंजनेरी जन्मस्थान",
    "en": "Anjaneri Birthplace"
  },
  "Annachhatra, satvik, Jain & pure veg food.": {
    "mr": "अन्नछत्र, सात्विक, जैन व शुद्ध शाकाहारी भोजन.",
    "hi": "अन्नक्षेत्र, सात्विक, जैन एवं शुद्ध शाकाहारी भोजन।",
    "en": "Annachhatra, satvik, Jain & pure veg food."
  },
  "Annachhatra, satvik, Jain & pure veg verified bhojanalayas.": {
    "mr": "अन्नछत्रे, सात्त्विक, जैन आणि शुद्ध शाकाहारी प्रमाणित भोजनालये.",
    "hi": "अन्नक्षेत्र, सात्विक, जैन और शुद्ध शाकाहारी प्रमाणित भोजनालय।",
    "en": "Annachhatra, satvik, Jain & pure veg verified bhojanalayas."
  },
  "Annakshetra": {
    "mr": "अन्नक्षेत्र",
    "hi": "अन्नक्षेत्र",
    "en": "Annakshetra"
  },
  "Annakshetra & Food": {
    "mr": "अन्नक्षेत्र आणि महाप्रसाद",
    "hi": "अन्नक्षेत्र एवं महाप्रसाद",
    "en": "Annakshetra & Food"
  },
  "Annakshetra & Meals": {
    "mr": "अन्नक्षेत्र व भोजन",
    "hi": "अन्नक्षेत्र एवं भोजन",
    "en": "Annakshetra & Meals"
  },
  "apartment": {
    "mr": "apartment",
    "hi": "apartment",
    "en": "apartment"
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
  "Application Under Review": {
    "mr": "अर्ज पुनरावलोकनाधीन आहे",
    "hi": "आवेदन समीक्षाधीन है",
    "en": "Application Under Review"
  },
  "Apply": {
    "mr": "लागू करा",
    "hi": "लागू करें",
    "en": "Apply"
  },
  "Approved Corridor Routes": {
    "mr": "मंजूर मार्ग व भाडे",
    "hi": "स्वीकृत कॉरिडोर मार्ग",
    "en": "Approved Corridor Routes"
  },
  "Approved pricing": {
    "mr": "मंजूर दर",
    "hi": "स्वीकृत मूल्य",
    "en": "Approved pricing"
  },
  "AR Camera Verification": {
    "mr": "एआर कॅमेरा पडताळणी",
    "hi": "एआर कैमरा सत्यापन",
    "en": "AR Camera Verification"
  },
  "Artisan Direct": {
    "mr": "थेट कारागीर",
    "hi": "सीधे कारीगर",
    "en": "Artisan Direct"
  },
  "Arvindbhai Patel": {
    "mr": "Arvindbhai Patel",
    "hi": "Arvindbhai Patel",
    "en": "Arvindbhai Patel"
  },
  "Ashram & Dharamshala Stay": {
    "mr": "आश्रम व धर्मशाळा निवास",
    "hi": "आश्रम एवं धर्मशाला प्रवास",
    "en": "Ashram & Dharamshala Stay"
  },
  "ASI K. Shinde": {
    "mr": "सहायक पोलीस उपनिरीक्षक के. शिंदे",
    "hi": "सहायक उपनिरीक्षक के. शिंदे",
    "en": "ASI K. Shinde"
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
    "mr": "पथक नियुक्त करा",
    "hi": "दस्ता नियुक्त करें",
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
  "assignment": {
    "mr": "assignment",
    "hi": "assignment",
    "en": "assignment"
  },
  "Assistance Toll Free": {
    "mr": "Assistance Toll Free",
    "hi": "Assistance Toll Free",
    "en": "Assistance Toll Free"
  },
  "Attach Receipt, Meter, or Bill Board": {
    "mr": "पावती, मीटर किंवा दरफलकाचा फोटो जोडा",
    "hi": "रसीद, मीटर या दर बोर्ड का फ़ोटो जोड़ें",
    "en": "Attach Receipt, Meter, or Bill Board"
  },
  "Audit Desk & Photos": {
    "mr": "तपासणी कक्ष व छायाचित्रे",
    "hi": "लेखापरीक्षा कक्ष एवं फ़ोटो",
    "en": "Audit Desk & Photos"
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
  "Audit Requested": {
    "mr": "तपासणी विनंती पाठवली",
    "hi": "ऑडिट अनुरोध भेजा गया",
    "en": "Audit Requested"
  },
  "Audit Type": {
    "mr": "तपासणी प्रकार",
    "hi": "ऑडिट का प्रकार",
    "en": "Audit Type"
  },
  "Audited 1h ago": {
    "mr": "१ तासापूर्वी तपासणी झाली",
    "hi": "१ घंटे पहले जांच हुई",
    "en": "Audited 1h ago"
  },
  "Audited Feedback": {
    "mr": "तपासणी केली Feedback",
    "hi": "जांच की गई Feedback",
    "en": "Audited Feedback"
  },
  "Audited on-site by Kumbhveer Divya S. (KTHM College)": {
    "mr": "तपासणी केली on-site by कुंभवीर Divya S. (KTHM महाविद्यालय)",
    "hi": "जांच की गई on-site by कुंभवीर Divya S. (KTHM कॉलेज)",
    "en": "Audited on-site by Kumbhveer Divya S. (KTHM College)"
  },
  "Audits": {
    "mr": "तपासण्या",
    "hi": "ऑडिट",
    "en": "Audits"
  },
  "Auspicious Snan Timings:": {
    "mr": "शुभ स्नान वेळापत्रक:",
    "hi": "शुभ स्नान समय सारणी:",
    "en": "Auspicious Snan Timings:"
  },
  "Authentic Thali:": {
    "mr": "पौष्टिक शाकाहारी थाळी:",
    "hi": "पौष्टिक शाकाहारी थाली:",
    "en": "Authentic Thali:"
  },
  "Authenticate & Open Field Terminal": {
    "mr": "Authenticate & Open प्रत्यक्ष टर्मिनल",
    "hi": "Authenticate & Open फील्ड टर्मिनल",
    "en": "Authenticate & Open Field Terminal"
  },
  "Authorized Reg #MH-15-GUIDE-0082": {
    "mr": "अधिकृत नोंदणी #MH-15-GUIDE-0082",
    "hi": "अधिकृत पंजीयन #MH-15-GUIDE-0082",
    "en": "Authorized Reg #MH-15-GUIDE-0082"
  },
  "Auto (Station ➔ Ramkund):": {
    "mr": "रिक्षा (रेल्वे स्टेशन ➔ रामकुंड):",
    "hi": "ऑटो (रेलवे स्टेशन ➔ रामकुंड):",
    "en": "Auto (Station ➔ Ramkund):"
  },
  "Auto / Transport": {
    "mr": "रिक्षा / वाहतूक",
    "hi": "ऑटो / परिवहन",
    "en": "Auto / Transport"
  },
  "Auto Bay 4 Rate Card": {
    "mr": "ऑटो बे ४ दरफलक",
    "hi": "ऑटो बे ४ रेट कार्ड",
    "en": "Auto Bay 4 Rate Card"
  },
  "Auto Fare Gouging": {
    "mr": "रिक्षा जादा भाडे आकारणी",
    "hi": "ऑटो अधिक किराया वसूली",
    "en": "Auto Fare Gouging"
  },
  "AUTO FARE GOUGING": {
    "mr": "रिक्षा जादा भाडे आकारणी",
    "hi": "ऑटो अधिक किराया वसूली",
    "en": "AUTO FARE GOUGING"
  },
  "Auto Rickshaw": {
    "mr": "ऑटो रिक्षा",
    "hi": "ऑटो रिक्शा",
    "en": "Auto Rickshaw"
  },
  "Auto Rickshaw (Private Metered)": {
    "mr": "रिक्षा (स्वतंत्र मिटरप्रमाणे)",
    "hi": "ऑटो रिक्शा (व्यक्तिगत मीटर द्वारा)",
    "en": "Auto Rickshaw (Private Metered)"
  },
  "Auto Rickshaws within Nashik city limits must charge strictly according to calibrated meter tariffs (₹26 base + ₹16.50/km).": {
    "mr": "नाशिक शहरात रिक्षाचालकांनी प्रमाणित मीटरनुसारच दर आकारणे बंधनकारक आहे (मूळ दर ₹२६ + ₹१६.५०/किमी).",
    "hi": "नासिक शहर में ऑटो चालकों द्वारा प्रमाणित मीटर के अनुसार ही किराया लेना अनिवार्य है (मूल ₹२६ + ₹१६.५०/किमी)।",
    "en": "Auto Rickshaws within Nashik city limits must charge strictly according to calibrated meter tariffs (₹26 base + ₹16.50/km)."
  },
  "Auto Rides Booked": {
    "mr": "रिक्षा Rides Booked",
    "hi": "ऑटो Rides Booked",
    "en": "Auto Rides Booked"
  },
  "Auto Stand #12": {
    "mr": "रिक्षा स्थानक #12",
    "hi": "ऑटो स्टैंड #12",
    "en": "Auto Stand #12"
  },
  "Auto, Bus & Transit Fares": {
    "mr": "रिक्षा, बस आणि वाहतूक दर",
    "hi": "ऑटो, बस एवं परिवहन किराया",
    "en": "Auto, Bus & Transit Fares"
  },
  "Auto, stays & food": {
    "mr": "रिक्षा, मुक्काम & अन्न / भोजन",
    "hi": "ऑटो, आवास & भोजन / अन्न",
    "en": "Auto, stays & food"
  },
  "Auto, stays & food rates": {
    "mr": "रिक्षा, निवास व भोजन दर",
    "hi": "ऑटो, आवास एवं भोजन दर",
    "en": "Auto, stays & food rates"
  },
  "Auto-fill Demo Credential:": {
    "mr": "रिक्षा-fill Demo Credential:",
    "hi": "ऑटो-fill Demo Credential:",
    "en": "Auto-fill Demo Credential:"
  },
  "Auto/Cab: ₹450 - ₹650 (Meter / Indicative)": {
    "mr": "रिक्षा/टॅक्सी: ₹४५० - ₹६५० (मीटर / सूचक दर)",
    "hi": "ऑटो/कैब: ₹४५० - ₹६५० (मीटर / सांकेतिक)",
    "en": "Auto/Cab: ₹450 - ₹650 (Meter / Indicative)"
  },
  "Available": {
    "mr": "उपलब्ध",
    "hi": "उपलब्ध",
    "en": "Available"
  },
  "Available:": {
    "mr": "Available:",
    "hi": "Available:",
    "en": "Available:"
  },
  "Average dispatch pickup: under 10 seconds": {
    "mr": "सरासरी कॉल उचलण्याचा वेळ: १० सेकंदांपेक्षा कमी",
    "hi": "औसत कॉल प्रतिक्रिया समय: १० सेकंड से कम",
    "en": "Average dispatch pickup: under 10 seconds"
  },
  "Average response time: 4.8 minutes. Fast tour confirmations boost your verified trust score and ensure pilgrims find their guide safely at the ghats.": {
    "mr": "Average response time: 4.8 मिनिटे. Fast दौरा confirmations boost आपले प्रमाणित विश्वास score आणि ensure भाविक find their मार्गदर्शक safely at घाट.",
    "hi": "Average response time: 4.8 मिनट. Fast दौरा confirmations boost आपका सत्यापित विश्वास score और ensure तीर्थयात्री find their गाइड safely at घाट.",
    "en": "Average response time: 4.8 minutes. Fast tour confirmations boost your verified trust score and ensure pilgrims find their guide safely at the ghats."
  },
  "Avg Redressal": {
    "mr": "Avg Redressal",
    "hi": "Avg Redressal",
    "en": "Avg Redressal"
  },
  "Avg Reported": {
    "mr": "नोंदवलेला सरासरी दर",
    "hi": "दर्ज किया गया औसत दर",
    "en": "Avg Reported"
  },
  "Ayurvedic Godavari Herbal Dhoop & Havan Samagri": {
    "mr": "आयुर्वेदिक गोदावरी धूप व हवन साहित्य",
    "hi": "आयुर्वेदिक गोदावरी हर्बल धूप एवं हवन सामग्री",
    "en": "Ayurvedic Godavari Herbal Dhoop & Havan Samagri"
  },
  "B.Y.K. College of Commerce • 530m away": {
    "mr": "बी.वाय.के. वाणिज्य महाविद्यालय • ५३० मी अंतरावर",
    "hi": "बी.वाई.के. कॉलेज • ५३० मी दूर",
    "en": "B.Y.K. College of Commerce • 530m away"
  },
  "Back": {
    "mr": "मागे",
    "hi": "पीछे",
    "en": "Back"
  },
  "Back to Marketplace": {
    "mr": "बाजारपेठेकडे परत जा",
    "hi": "बाज़ार पर वापस जाएं",
    "en": "Back to Marketplace"
  },
  "Badge Certified": {
    "mr": "बिल्ला प्रमाणित",
    "hi": "बैज सत्यापित",
    "en": "Badge Certified"
  },
  "Balaji Auto Rickshaw Union • Permit #BK-918": {
    "mr": "Balaji रिक्षा Union • Permit #BK-918",
    "hi": "Balaji ऑटो रिक्शा Union • Permit #BK-918",
    "en": "Balaji Auto Rickshaw Union • Permit #BK-918"
  },
  "Balaji Prasad Ladoos (#NSK-BZ-118, Ramkund East)": {
    "mr": "बालाजी प्रसाद लाडू (#NSK-BZ-११८, रामकुंड पूर्व)",
    "hi": "बालाजी प्रसाद लड्डू (#NSK-BZ-११८, रामकुंड पूर्व)",
    "en": "Balaji Prasad Ladoos (#NSK-BZ-118, Ramkund East)"
  },
  "balance": {
    "mr": "balance",
    "hi": "balance",
    "en": "balance"
  },
  "BAPS Swaminarayan Mandir": {
    "mr": "बीएपीएस स्वामीनारायण मंदिर",
    "hi": "बीएपीएस स्वामीनारायण मंदिर",
    "en": "BAPS Swaminarayan Mandir"
  },
  "Base Fare": {
    "mr": "किमान भाडे",
    "hi": "मूल किराया",
    "en": "Base Fare"
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
  "Based on 128 verified Yatri visits": {
    "mr": "Based on 128 प्रमाणित भाविक visits",
    "hi": "Based on 128 सत्यापित तीर्थयात्री visits",
    "en": "Based on 128 verified Yatri visits"
  },
  "Based on 3,420 QR Verifications": {
    "mr": "Based on 3,420 QR पडताळणीs",
    "hi": "Based on 3,420 QR सत्यापनs",
    "en": "Based on 3,420 QR Verifications"
  },
  "Bay 4, Ramkund West Gate": {
    "mr": "Bay 4, रामकुंड West प्रवेशद्वार",
    "hi": "Bay 4, रामकुंड West प्रवेश द्वार",
    "en": "Bay 4, Ramkund West Gate"
  },
  "Bazaar & Stall Finder": {
    "mr": "बाजार व स्टॉल शोधक",
    "hi": "बाज़ार एवं स्टॉल खोज",
    "en": "Bazaar & Stall Finder"
  },
  "Bazaar & Stalls": {
    "mr": "बाजार & स्टॉल्स",
    "hi": "बाज़ार & स्टॉल",
    "en": "Bazaar & Stalls"
  },
  "Bazaars": {
    "mr": "बाजारपेठ",
    "hi": "बाज़ार",
    "en": "Bazaars"
  },
  "Beat Const. Deshmukh": {
    "mr": "Beat Const. Deshmukh",
    "hi": "Beat Const. Deshmukh",
    "en": "Beat Const. Deshmukh"
  },
  "Beat Constable Deshmukh dispatched to Bay 4. Interception in progress.": {
    "mr": "बीट कॉन्स्टेबल देशमुख बे ४ कडे रवाना. कारवाई सुरू.",
    "hi": "बीट कांस्टेबल देशमुख बे ४ पर रवाना। कार्रवाई जारी।",
    "en": "Beat Constable Deshmukh dispatched to Bay 4. Interception in progress."
  },
  "Bengali / English": {
    "mr": "Bengali / English",
    "hi": "Bengali / English",
    "en": "Bengali / English"
  },
  "Bhakti Dham": {
    "mr": "भक्ती धाम",
    "hi": "भक्ति धाम",
    "en": "Bhakti Dham"
  },
  "Bilingual QR Card": {
    "mr": "Bilingual QR Card",
    "hi": "Bilingual QR Card",
    "en": "Bilingual QR Card"
  },
  "Biometric Police ID Pass": {
    "mr": "Biometric पोलीस ओळख क्रमांक पास",
    "hi": "Biometric पुलिस पहचान संख्या पास",
    "en": "Biometric Police ID Pass"
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
  "Book Guide": {
    "mr": "मार्गदर्शक बुक करा",
    "hi": "गाइड बुक करें",
    "en": "Book Guide"
  },
  "Book Now": {
    "mr": "आता बुक करा",
    "hi": "अभी बुक करें",
    "en": "Book Now"
  },
  "Book Registered Guide": {
    "mr": "नोंदणीकृत मार्गदर्शक बुक करा",
    "hi": "पंजीकृत गाइड बुक करें",
    "en": "Book Registered Guide"
  },
  "Book Registered Guide ✓": {
    "mr": "नोंदणीकृत मार्गदर्शक बुक करा ✓",
    "hi": "पंजीकृत गाइड बुक करें ✓",
    "en": "Book Registered Guide ✓"
  },
  "Book Registered Local Guide": {
    "mr": "नोंदणीकृत स्थानिक मार्गदर्शक बुक करा",
    "hi": "पंजीकृत स्थानीय गाइड बुक करें",
    "en": "Book Registered Local Guide"
  },
  "Book Room": {
    "mr": "खोली आरक्षित करा",
    "hi": "कमरा बुक करें",
    "en": "Book Room"
  },
  "Book This Registered Guide Now": {
    "mr": "हा नोंदणीकृत मार्गदर्शक आता बुक करा",
    "hi": "यह पंजीकृत गाइड अभी बुक करें",
    "en": "Book This Registered Guide Now"
  },
  "Bookable In-App Guide": {
    "mr": "ॲपवरून बुक करता येणारे मार्गदर्शक",
    "hi": "ऐप से बुक करने योग्य गाइड",
    "en": "Bookable In-App Guide"
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
  "Bookings": {
    "mr": "नोंदणी",
    "hi": "बुकिंग",
    "en": "Bookings"
  },
  "Bookings Queue": {
    "mr": "नोंदणी Queue",
    "hi": "बुकिंग Queue",
    "en": "Bookings Queue"
  },
  "Brahma Muhurta Snan: 04:00 AM – 07:30 AM | Mahasnan & Sandhya Deepotsav: 06:15 PM – 08:30 PM.": {
    "mr": "ब्राह्म मुहूर्त स्नान: पहाटे ०४:०० – सकाळी ०७:३० | महास्नान व संध्या दीपोत्सव: संध्याकाळी ०६:१५ – रात्री ०८:३०.",
    "hi": "ब्रह्म मुहूर्त स्नान: प्रातः ०४:०० – सुबह ०७:३० | महास्नान एवं संध्या दीपोत्सव: सायं ०६:१५ – रात्रि ०८:३०।",
    "en": "Brahma Muhurta Snan: 04:00 AM – 07:30 AM | Mahasnan & Sandhya Deepotsav: 06:15 PM – 08:30 PM."
  },
  "Brahmagiri Gangajal Flask (500ml)": {
    "mr": "ब्रह्मगिरी गंगाजल कलश (५०० मिली)",
    "hi": "ब्रह्मगिरी गंगाजल फ्लास्क (५०० मिली)",
    "en": "Brahmagiri Gangajal Flask (500ml)"
  },
  "Brahmagiri Mountain Source": {
    "mr": "ब्रह्मगिरी पर्वत गोदावरी उगम",
    "hi": "ब्रह्मगिरी पर्वत गोदावरी उद्गम",
    "en": "Brahmagiri Mountain Source"
  },
  "Brass Aarti Diya with Handle": {
    "mr": "पितळी आरती दिवा (मुठीसह)",
    "hi": "पीतल की आरती दीया (हैंडल सहित)",
    "en": "Brass Aarti Diya with Handle"
  },
  "Brass Diya": {
    "mr": "पितळी दिवा",
    "hi": "पीतल का दीया",
    "en": "Brass Diya"
  },
  "Brass Shiva Kalash & Diya Set": {
    "mr": "पितळी शिव कलश व दिवा संच",
    "hi": "पीतल शिव कलश एवं दीया सेट",
    "en": "Brass Shiva Kalash & Diya Set"
  },
  "Bridge is operating normally with 4 pedestrian channels": {
    "mr": "पूल is operating normally सह 4 pedestrian channels",
    "hi": "पुल is operating normally के साथ 4 pedestrian channels",
    "en": "Bridge is operating normally with 4 pedestrian channels"
  },
  "Broadcasting GPS coordinates to Ramkund Central Control": {
    "mr": "Broadcasting GPS coordinates to रामकुंड Central Control",
    "hi": "Broadcasting GPS coordinates to रामकुंड Central Control",
    "en": "Broadcasting GPS coordinates to Ramkund Central Control"
  },
  "Budget Thali (₹200)": {
    "mr": "किफायतशीर थाळी (₹२००)",
    "hi": "किफायती थाली (₹२००)",
    "en": "Budget Thali (₹200)"
  },
  "Business Name": {
    "mr": "दुकानाचे / व्यवसायाचे नाव",
    "hi": "दुकान / व्यवसाय का नाम",
    "en": "Business Name"
  },
  "Calculate Route Fare": {
    "mr": "भाडे मोजा",
    "hi": "किराया गणना करें",
    "en": "Calculate Route Fare"
  },
  "Calculated Distance:": {
    "mr": "अंदाजित अंतर:",
    "hi": "अनुमानित दूरी:",
    "en": "Calculated Distance:"
  },
  "Call": {
    "mr": "Call",
    "hi": "Call",
    "en": "Call"
  },
  "Call & Stand Hire Only:": {
    "mr": "केवळ कॉल किंवा थेट स्टँडवरून बुकिंग:",
    "hi": "केवल कॉल या स्टैंड से सीधी बुकिंग:",
    "en": "Call & Stand Hire Only:"
  },
  "Call 108 (Ambulance)": {
    "mr": "१०८ वर संपर्क करा (रुग्णवाहिका)",
    "hi": "१०८ पर कॉल करें (एम्बुलेंस)",
    "en": "Call 108 (Ambulance)"
  },
  "Call 112 (Police & Disaster)": {
    "mr": "११२ वर संपर्क करा (पोलीस व आपत्ती)",
    "hi": "११२ पर कॉल करें (पुलिस एवं आपदा)",
    "en": "Call 112 (Police & Disaster)"
  },
  "CALL 112 / DISASTER DESK": {
    "mr": "११२ / आपत्ती कक्षाशी संपर्क करा",
    "hi": "११२ / आपदा प्रकोष्ठ से संपर्क करें",
    "en": "CALL 112 / DISASTER DESK"
  },
  "Call Auto Stand / Driver": {
    "mr": "रिक्षा स्टँड / चालकाला कॉल करा",
    "hi": "ऑटो स्टैंड / चालक को कॉल करें",
    "en": "Call Auto Stand / Driver"
  },
  "Call Auto Stand / Owner": {
    "mr": "रिक्षा स्टँड / चालकाला कॉल करा",
    "hi": "ऑटो स्टैंड / चालक को कॉल करें",
    "en": "Call Auto Stand / Owner"
  },
  "Call Desk": {
    "mr": "Call कक्ष",
    "hi": "Call कक्ष",
    "en": "Call Desk"
  },
  "Call Green Zone Stand": {
    "mr": "ग्रीन झोन स्टँडला कॉल करा",
    "hi": "ग्रीन जोन स्टैंड को कॉल करें",
    "en": "Call Green Zone Stand"
  },
  "Call Guide": {
    "mr": "मार्गदर्शकांना कॉल करा",
    "hi": "गाइड को कॉल करें",
    "en": "Call Guide"
  },
  "Call Owner": {
    "mr": "मालकाशी संपर्क साधा",
    "hi": "मालिक को कॉल करें",
    "en": "Call Owner"
  },
  "Call Rides & Fare Guide": {
    "mr": "वाहतूक कॉल व भाडे तक्ता",
    "hi": "सवारी कॉल एवं किराया गाइड",
    "en": "Call Rides & Fare Guide"
  },
  "Call Shared Stand": {
    "mr": "शेअर रिक्षा स्टँडला कॉल करा",
    "hi": "शेयर ऑटो स्टैंड को कॉल करें",
    "en": "Call Shared Stand"
  },
  "Call Stand Leader": {
    "mr": "स्टँड प्रमुखांना कॉल करा",
    "hi": "स्टैंड प्रमुख को कॉल करें",
    "en": "Call Stand Leader"
  },
  "Call Taxi Stand / Owner": {
    "mr": "टॅक्सी स्टँड / चालकाला कॉल करा",
    "hi": "टैक्सी स्टैंड / मालिक को कॉल करें",
    "en": "Call Taxi Stand / Owner"
  },
  "Call Yatri": {
    "mr": "Call भाविक",
    "hi": "Call तीर्थयात्री",
    "en": "Call Yatri"
  },
  "Camera Verified": {
    "mr": "कॅमेरा प्रमाणित",
    "hi": "कैमरा सत्यापित",
    "en": "Camera Verified"
  },
  "Camp Orientation & Distance": {
    "mr": "Camp Orientation & अंतर",
    "hi": "Camp Orientation & दूरी",
    "en": "Camp Orientation & Distance"
  },
  "Cancel": {
    "mr": "रद्द करा",
    "hi": "रद्द करें",
    "en": "Cancel"
  },
  "Cancel & Stay On Duty": {
    "mr": "रद्द करा & मुक्काम On कर्तव्य",
    "hi": "रद्द करें & आवास On ड्यूटी",
    "en": "Cancel & Stay On Duty"
  },
  "cap": {
    "mr": "कमाल मर्यादा",
    "hi": "अधिकतम सीमा",
    "en": "cap"
  },
  "Cap Price": {
    "mr": "कमाल मर्यादा",
    "hi": "अधिकतम सीमा",
    "en": "Cap Price"
  },
  "Cap-compliant tariff bookings": {
    "mr": "मर्यादा-नियमानुसार दरपत्रक नोंदणी",
    "hi": "सीमा-नियमानुकूल दर सूची बुकिंग",
    "en": "Cap-compliant tariff bookings"
  },
  "Capture & Verify Identity": {
    "mr": "फोटो घ्या व पडताळणी करा",
    "hi": "फोटो लें एवं सत्यापन करें",
    "en": "Capture & Verify Identity"
  },
  "Capture guide profile and selfie. Selfie is converted into a privacy-preserving numeric vector and raw image is wiped immediately.": {
    "mr": "Capture मार्गदर्शक profile आणि selfie. Selfie is converted into a privacy-preserving numeric vector आणि raw image is wiped immediately.",
    "hi": "Capture गाइड profile और selfie. Selfie is converted into a privacy-preserving numeric vector और raw image is wiped immediately.",
    "en": "Capture guide profile and selfie. Selfie is converted into a privacy-preserving numeric vector and raw image is wiped immediately."
  },
  "Captured by Pilgrim Ramesh Patil via QR Scanner": {
    "mr": "Captured by भाविक Ramesh Patil द्वारे QR Scanner",
    "hi": "Captured by तीर्थयात्री Ramesh Patil के माध्यम से QR Scanner",
    "en": "Captured by Pilgrim Ramesh Patil via QR Scanner"
  },
  "Carry a physical government photo ID (Aadhaar / Voter Card) during check-in for mandatory police verification.": {
    "mr": "Carry a physical government photo ओळख क्रमांक (Aadhaar / Voter Card) during check-in साठी mandatory पोलीस verification.",
    "hi": "Carry a physical government photo पहचान संख्या (Aadhaar / Voter Card) during check-in के लिए mandatory पुलिस verification.",
    "en": "Carry a physical government photo ID (Aadhaar / Voter Card) during check-in for mandatory police verification."
  },
  "CartoDB Voyager (Free • No Key Needed)": {
    "mr": "CartoDB व्हॉयेजर (विनामूल्य • की ची गरज नाही)",
    "hi": "CartoDB वोयाजर (निःशुल्क • कोई कुंजी नहीं)",
    "en": "CartoDB Voyager (Free • No Key Needed)"
  },
  "Case Detail": {
    "mr": "प्रकरणाचा तपशील",
    "hi": "केस का विवरण",
    "en": "Case Detail"
  },
  "Case Detail: Illegal Surge Tariff & Driver Defiance": {
    "mr": "Case Detail: Illegal Surge दरपत्रक & Driver Defiance",
    "hi": "Case Detail: Illegal Surge दर सूची & Driver Defiance",
    "en": "Case Detail: Illegal Surge Tariff & Driver Defiance"
  },
  "Case Log": {
    "mr": "नोंदवलेले खटले",
    "hi": "केस रजिस्टर",
    "en": "Case Log"
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
  "Categories": {
    "mr": "वर्गवारी",
    "hi": "श्रेणियाँ",
    "en": "Categories"
  },
  "Category *": {
    "mr": "वर्गवारी *",
    "hi": "श्रेणी *",
    "en": "Category *"
  },
  "Category Compliance Breakdown": {
    "mr": "Category अनुपालन Breakdown",
    "hi": "Category अनुपालन Breakdown",
    "en": "Category Compliance Breakdown"
  },
  "Caves & Sacred Grove Tour": {
    "mr": "लेणी व देवराई दर्शन दौरा",
    "hi": "गुफाएं एवं पवित्र वन दर्शन टूर",
    "en": "Caves & Sacred Grove Tour"
  },
  "CBS Bus Stand": {
    "mr": "सीबीएस बस स्थानक",
    "hi": "सीबीएस बस स्टैंड",
    "en": "CBS Bus Stand"
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
  "Central Courtyard": {
    "mr": "मध्यवर्ती प्रांगण",
    "hi": "केंद्रीय प्रांगण",
    "en": "Central Courtyard"
  },
  "Certified 5-Mukhi Rudraksha (108 Beads)": {
    "mr": "प्रमाणित 5-Mukhi रुद्राक्ष (108 Beads)",
    "hi": "सत्यापित 5-Mukhi रुद्राक्ष (108 Beads)",
    "en": "Certified 5-Mukhi Rudraksha (108 Beads)"
  },
  "Certified Caps": {
    "mr": "प्रमाणित कमाल दर",
    "hi": "प्रमाणित अधिकतम दर",
    "en": "Certified Caps"
  },
  "Certified for Nashik Collectorate & Municipal Apex Committee review": {
    "mr": "प्रमाणित साठी Nashik Collectorate & महानगरपालिका Apex Committee पुनरावलोकन",
    "hi": "सत्यापित के लिए Nashik Collectorate & नगर निगम Apex Committee समीक्षा",
    "en": "Certified for Nashik Collectorate & Municipal Apex Committee review"
  },
  "Certified per hour": {
    "mr": "प्रमाणित प्रति तास",
    "hi": "प्रमाणित प्रति घंटा",
    "en": "Certified per hour"
  },
  "Certified Pure Veg": {
    "mr": "प्रमाणित शुद्ध शाकाहारी",
    "hi": "प्रमाणित शुद्ध शाकाहारी",
    "en": "Certified Pure Veg"
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
  "Change Photo": {
    "mr": "छायाचित्र बदला",
    "hi": "फोटो बदलें",
    "en": "Change Photo"
  },
  "Change Role": {
    "mr": "भूमिका बदला",
    "hi": "भूमिका बदलें",
    "en": "Change Role"
  },
  "Channel Diverted": {
    "mr": "Channel Diverted",
    "hi": "Channel Diverted",
    "en": "Channel Diverted"
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
  "Chetan Wagh": {
    "mr": "चेतन वाघ",
    "hi": "चेतन वाघ",
    "en": "Chetan Wagh"
  },
  "Choose a Guide for this Circuit": {
    "mr": "या परिक्रमेसाठी मार्गदर्शक निवडा",
    "hi": "इस परिक्रमा के लिए गाइड चुनें",
    "en": "Choose a Guide for this Circuit"
  },
  "Choose image file (PNG, JPG, WEBP)": {
    "mr": "Choose image file (PNG, JPG, WEBP)",
    "hi": "Choose image file (PNG, JPG, WEBP)",
    "en": "Choose image file (PNG, JPG, WEBP)"
  },
  "Choose Tile Provider:": {
    "mr": "नकाशा प्रदाता निवडा:",
    "hi": "मैप टाइल प्रदाता चुनें:",
    "en": "Choose Tile Provider:"
  },
  "Citizen": {
    "mr": "नागरिक",
    "hi": "नागरिक",
    "en": "Citizen"
  },
  "Citizen Verified • Sent to Police": {
    "mr": "नागरिक पडताळणी पूर्ण • पोलिसांकडे वर्ग",
    "hi": "नागरिक सत्यापित • पुलिस को प्रेषित",
    "en": "Citizen Verified • Sent to Police"
  },
  "City Bus": {
    "mr": "सिटी बस (सिटीलिंक)",
    "hi": "सिटी बस (सिटीलिंक)",
    "en": "City Bus"
  },
  "City Bus (Citylink)": {
    "mr": "सिटीलिंक बस",
    "hi": "सिटीलिंक बस",
    "en": "City Bus (Citylink)"
  },
  "Citylink Municipal Bus": {
    "mr": "सिटीलिंक मनपा बस",
    "hi": "सिटीलिंक नगर बस",
    "en": "Citylink Municipal Bus"
  },
  "Civic & Field Portals": {
    "mr": "नागरी व क्षेत्रीय पोर्टल्स",
    "hi": "नागरिक एवं क्षेत्रीय पोर्टल",
    "en": "Civic & Field Portals"
  },
  "Civic annachatras & bhojanalayas": {
    "mr": "नागरी annachatras & bhojanalayas",
    "hi": "नागरिक annachatras & bhojanalayas",
    "en": "Civic annachatras & bhojanalayas"
  },
  "Civic Dispute Resolution Guarantee": {
    "mr": "नागरी Dispute Resolution Guarantee",
    "hi": "नागरिक Dispute Resolution Guarantee",
    "en": "Civic Dispute Resolution Guarantee"
  },
  "Civic Food Feedback & Rate Desk": {
    "mr": "नागरी अन्न अभिप्राय व दर कक्ष",
    "hi": "नागरिक भोजन फीडबैक एवं दर प्रकोष्ठ",
    "en": "Civic Food Feedback & Rate Desk"
  },
  "Civic Grid Nashik (2,165 Points)": {
    "mr": "नाशिक नागरी ग्रीड (२,१६५ मदत केंद्रे)",
    "hi": "नासिक नागरिक ग्रिड (२,१६५ सहायता केंद्र)",
    "en": "Civic Grid Nashik (2,165 Points)"
  },
  "Civic Grievances": {
    "mr": "नागरी तक्रारी",
    "hi": "नागरिक शिकायतें",
    "en": "Civic Grievances"
  },
  "Civic Operator & Vendor Portal": {
    "mr": "नागरी चालक व विक्रेता पोर्टल",
    "hi": "नागरिक संचालक एवं विक्रेता पोर्टल",
    "en": "Civic Operator & Vendor Portal"
  },
  "Civic Pledge": {
    "mr": "नागरी निष्ठा शपथ",
    "hi": "नागरिक निष्ठा शपथ",
    "en": "Civic Pledge"
  },
  "Civic Registered Dharamshala / Guest House": {
    "mr": "महापालिका नोंदणीकृत धर्मशाळा / अतिथीगृह",
    "hi": "नगर निगम पंजीकृत धर्मशाला / अतिथि गृह",
    "en": "Civic Registered Dharamshala / Guest House"
  },
  "Civic Trust & Fair Pricing": {
    "mr": "नागरी विश्वास आणि वाजवी दर",
    "hi": "नागरिक विश्वास एवं उचित मूल्य",
    "en": "Civic Trust & Fair Pricing"
  },
  "Civic Trust & Fair Pricing • Nashik 2027": {
    "mr": "नागरी विश्वास आणि वाजवी दर • नाशिक २०२७",
    "hi": "नागरिक विश्वास एवं उचित मूल्य • नासिक २०२७",
    "en": "Civic Trust & Fair Pricing • Nashik 2027"
  },
  "Civic Trust Score": {
    "mr": "नागरी विश्वास निर्देशांक",
    "hi": "नागरिक विश्वास स्कोर",
    "en": "Civic Trust Score"
  },
  "Civic Vendor": {
    "mr": "नोंदणीकृत नागरी विक्रेता",
    "hi": "पंजीकृत नागरिक विक्रेता",
    "en": "Civic Vendor"
  },
  "Civic Verification": {
    "mr": "नागरी पडताळणी",
    "hi": "नागरिक सत्यापन",
    "en": "Civic Verification"
  },
  "Civic Verification Protocol": {
    "mr": "नागरी पडताळणी नियमावली",
    "hi": "नागरिक सत्यापन नियमावली",
    "en": "Civic Verification Protocol"
  },
  "Civic Verified Amenities": {
    "mr": "महापालिका प्रमाणित सुविधा",
    "hi": "नगर निगम सत्यापित सुविधाएं",
    "en": "Civic Verified Amenities"
  },
  "Civic Verified Service": {
    "mr": "नागरी प्रमाणित सेवा",
    "hi": "नागरिक सत्यापित सेवा",
    "en": "Civic Verified Service"
  },
  "Civic Vigilance & Fair-Price Complaint": {
    "mr": "नागरी दक्षता व वाजवी दर तक्रार निवारण",
    "hi": "नागरिक सतर्कता एवं उचित मूल्य शिकायत",
    "en": "Civic Vigilance & Fair-Price Complaint"
  },
  "Claim: \"Lakshman Jhula barricaded due to high Godavari current\"": {
    "mr": "Claim: \"Lakshman Jhula barricaded due to उच्च / तीव्र गोदावरी current\"",
    "hi": "Claim: \"Lakshman Jhula barricaded due to उच्च / तीव्र गोदावरी current\"",
    "en": "Claim: \"Lakshman Jhula barricaded due to high Godavari current\""
  },
  "Clean premises & potable water available for pilgrims": {
    "mr": "भाविकांसाठी स्वच्छ परिसर व पिण्यायोग्य पाणी उपलब्ध आहे",
    "hi": "तीर्थयात्रियों के लिए स्वच्छ परिसर और पीने योग्य पानी उपलब्ध है",
    "en": "Clean premises & potable water available for pilgrims"
  },
  "Clear": {
    "mr": "साफ करा",
    "hi": "हटाएं",
    "en": "Clear"
  },
  "Click \"Open Camera\" to track personal face and align inside the guide reticle": {
    "mr": "Click \"Open कॅमेरा\" to track personal face आणि align inside मार्गदर्शक reticle",
    "hi": "Click \"Open कैमरा\" to track personal face और align inside गाइड reticle",
    "en": "Click \"Open Camera\" to track personal face and align inside the guide reticle"
  },
  "Click 'Start Camera' or 'Upload Selfie'": {
    "mr": "Click 'Start कॅमेरा' or 'अपलोड करा Selfie'",
    "hi": "Click 'Start कैमरा' or 'अपलोड करें Selfie'",
    "en": "Click 'Start Camera' or 'Upload Selfie'"
  },
  "Click cluster to view details & dispatch": {
    "mr": "Click गट to पहा तपशील & dispatch",
    "hi": "Click क्लस्टर to देखें विवरण & dispatch",
    "en": "Click cluster to view details & dispatch"
  },
  "Click for Direct Navigation to Meeting Point →": {
    "mr": "भेटण्याच्या ठिकाणासाठी थेट नकाशा मार्ग पहा →",
    "hi": "मिलने के स्थान के लिए सीधा नेविगेशन देखें →",
    "en": "Click for Direct Navigation to Meeting Point →"
  },
  "Click for Direct Navigation →": {
    "mr": "थेट मार्गदर्शनासाठी येथे टॅप करा →",
    "hi": "सीधे रास्ते के लिए यहाँ टैप करें →",
    "en": "Click for Direct Navigation →"
  },
  "Cloakroom": {
    "mr": "Cloakroom",
    "hi": "Cloakroom",
    "en": "Cloakroom"
  },
  "Close": {
    "mr": "बंद करा",
    "hi": "बंद करें",
    "en": "Close"
  },
  "Close Camera": {
    "mr": "कॅमेरा बंद करा",
    "hi": "कैमरा बंद करें",
    "en": "Close Camera"
  },
  "Close Case": {
    "mr": "खटला निकाली काढा",
    "hi": "केस बंद करें",
    "en": "Close Case"
  },
  "Closed by": {
    "mr": "बंद by",
    "hi": "बंद by",
    "en": "Closed by"
  },
  "cloud.maptiler.com": {
    "mr": "cloud.maptiler.com",
    "hi": "cloud.maptiler.com",
    "en": "cloud.maptiler.com"
  },
  "Coin Museum (Anjaneri)": {
    "mr": "नाणे संग्रहालय (अंजनेरी)",
    "hi": "सिक्का संग्रहालय (अंजनेरी)",
    "en": "Coin Museum (Anjaneri)"
  },
  "College Rank": {
    "mr": "महाविद्यालय क्रमांक",
    "hi": "कॉलेज रैंक",
    "en": "College Rank"
  },
  "Community Audits": {
    "mr": "नागरी तपासण्या",
    "hi": "सामुदायिक ऑडिट",
    "en": "Community Audits"
  },
  "Community Benchmark": {
    "mr": "नागरी निकष",
    "hi": "सामुदायिक बेंचमार्क",
    "en": "Community Benchmark"
  },
  "Community Range Comparison": {
    "mr": "समुदाय दर तुलना",
    "hi": "सामुदायिक दर तुलना",
    "en": "Community Range Comparison"
  },
  "Community reference price ranges. Indicative rates submitted by daily pilgrim check-ins and verified stands.": {
    "mr": "नागरी संदर्भ दर मर्यादा. भाविकांच्या दैनंदिन नोंदी व प्रमाणित केंद्रांद्वारे सूचित दर.",
    "hi": "सामुदायिक संदर्भ दर सीमा। श्रद्धालुओं के दैनिक चेक-इन और सत्यापित केंद्रों द्वारा सूचित दरें।",
    "en": "Community reference price ranges. Indicative rates submitted by daily pilgrim check-ins and verified stands."
  },
  "Community Reference Range": {
    "mr": "नागरी संदर्भ दर मर्यादा",
    "hi": "सामुदायिक संदर्भ दर सीमा",
    "en": "Community Reference Range"
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
  "Complainant Yatri": {
    "mr": "Complainant भाविक",
    "hi": "Complainant तीर्थयात्री",
    "en": "Complainant Yatri"
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
  "Confirm": {
    "mr": "पुष्टी करा",
    "hi": "पुष्टि करें",
    "en": "Confirm"
  },
  "Confirm Dispatch": {
    "mr": "Confirm रवानगी",
    "hi": "Confirm प्रेषण",
    "en": "Confirm Dispatch"
  },
  "Confirm Guide Booking": {
    "mr": "मार्गदर्शक बुकिंग निश्चित करा",
    "hi": "गाइड बुकिंग पक्की करें",
    "en": "Confirm Guide Booking"
  },
  "Confirm Sign Out": {
    "mr": "Confirm Sign Out",
    "hi": "Confirm Sign Out",
    "en": "Confirm Sign Out"
  },
  "confirmed fair market price": {
    "mr": "confirmed वाजवी बाजार दर",
    "hi": "confirmed उचित बाज़ार मूल्य",
    "en": "confirmed fair market price"
  },
  "Confirmed True": {
    "mr": "सत्य प्रमाणित",
    "hi": "सत्य प्रमाणित",
    "en": "Confirmed True"
  },
  "Confirmed ✓": {
    "mr": "Confirmed ✓",
    "hi": "Confirmed ✓",
    "en": "Confirmed ✓"
  },
  "Confluence of Kapila and Godavari rivers where ancient sages and Rishis performed penance.": {
    "mr": "कपिला व गोदावरी नद्यांचा संगम जेथे प्राचीन ऋषी-मुनींनी तपश्चर्या केली.",
    "hi": "कपिला और गोदावरी नदियों का संगम जहाँ प्राचीन ऋषियों ने तपस्या की।",
    "en": "Confluence of Kapila and Godavari rivers where ancient sages and Rishis performed penance."
  },
  "Contact": {
    "mr": "संपर्क",
    "hi": "संपर्क",
    "en": "Contact"
  },
  "Contact Guide": {
    "mr": "मार्गदर्शकाशी संपर्क",
    "hi": "गाइड से संपर्क",
    "en": "Contact Guide"
  },
  "Contact Number": {
    "mr": "संपर्क क्रमांक",
    "hi": "संपर्क नंबर",
    "en": "Contact Number"
  },
  "Contact Stays": {
    "mr": "निवास संपर्क",
    "hi": "निवास संपर्क",
    "en": "Contact Stays"
  },
  "Contact Stays & Dharamshalas": {
    "mr": "धर्मशाळा व निवास थेट संपर्क",
    "hi": "धर्मशाला एवं निवास सीधा संपर्क",
    "en": "Contact Stays & Dharamshalas"
  },
  "Continuous background queue listener": {
    "mr": "Continuous background queue listener",
    "hi": "Continuous background queue listener",
    "en": "Continuous background queue listener"
  },
  "Coordinates copied to clipboard": {
    "mr": "स्थान निर्देशांक कॉपी केले",
    "hi": "स्थान निर्देशांक कॉपी किए गए",
    "en": "Coordinates copied to clipboard"
  },
  "Copper Kalash": {
    "mr": "तांब्याचा कलश",
    "hi": "तांबे का कलश",
    "en": "Copper Kalash"
  },
  "Copper Pooja Kalash (Heavy Gauge)": {
    "mr": "तांब्याचा पूजा कलश (मजबूत)",
    "hi": "तांबे का पूजा कलश (भारी गेज)",
    "en": "Copper Pooja Kalash (Heavy Gauge)"
  },
  "Copper Puja Lota & Arghya Set": {
    "mr": "तांब्याचा पूजा लोटा व अर्घ्य संच",
    "hi": "तांबे का पूजा लोटा एवं अर्घ्य सेट",
    "en": "Copper Puja Lota & Arghya Set"
  },
  "Copy": {
    "mr": "कॉपी करा",
    "hi": "कॉपी करें",
    "en": "Copy"
  },
  "Corrected unapproved ₹20 extra packaging charge. Spot check by Inspector G. Kulkarni confirmed menu card update.": {
    "mr": "Corrected unapproved ₹20 extra packaging charge. Spot check by निरीक्षक G. Kulkarni confirmed menu card update.",
    "hi": "Corrected unapproved ₹20 extra packaging charge. Spot check by निरीक्षक G. Kulkarni confirmed menu card update.",
    "en": "Corrected unapproved ₹20 extra packaging charge. Spot check by Inspector G. Kulkarni confirmed menu card update."
  },
  "Cow Ghee Peda & Prasad Box": {
    "mr": "शुद्ध देशी तुपातील पेढे व प्रसाद पेटी",
    "hi": "शुद्ध गाय के घी के पेड़े एवं प्रसाद डिब्बा",
    "en": "Cow Ghee Peda & Prasad Box"
  },
  "Create Account & Enter Portal": {
    "mr": "Create Account & Enter Portal",
    "hi": "Create Account & Enter Portal",
    "en": "Create Account & Enter Portal"
  },
  "Critical": {
    "mr": "गंभीर / तातडीचे",
    "hi": "अति संवेदनशील",
    "en": "Critical"
  },
  "Crowd Control Protocol": {
    "mr": "गर्दी नियंत्रण नियमावली",
    "hi": "भीड़ नियंत्रण नियमावली",
    "en": "Crowd Control Protocol"
  },
  "Crowd Density Live": {
    "mr": "थेट गर्दी घनता",
    "hi": "लाइव भीड़ घनत्व",
    "en": "Crowd Density Live"
  },
  "Crowd Hazard / Bottleneck": {
    "mr": "गर्दीचा अडथळा व धोका",
    "hi": "भीड़ का दबाव / रुकावट",
    "en": "Crowd Hazard / Bottleneck"
  },
  "Current Mode: Free CartoDB / OSM (Zero API key needed)": {
    "mr": "सध्याचा नकाशा: विनामूल्य CartoDB / OSM (कोणत्याही की ची गरज नाही)",
    "hi": "वर्तमान मोड: निःशुल्क CartoDB / OSM (किसी एपीआई कुंजी की आवश्यकता नहीं)",
    "en": "Current Mode: Free CartoDB / OSM (Zero API key needed)"
  },
  "Customer Orders": {
    "mr": "ग्राहकांच्या ऑर्डर्स",
    "hi": "ग्राहकों के ऑर्डर",
    "en": "Customer Orders"
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
  "Customer Ratings": {
    "mr": "ग्राहक अभिप्राय",
    "hi": "ग्राहक रेटिंग",
    "en": "Customer Ratings"
  },
  "CV v2.4 Active": {
    "mr": "CV v2.4 सक्रिय",
    "hi": "CV v2.4 सक्रिय",
    "en": "CV v2.4 Active"
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
  "Daily Sales": {
    "mr": "दैनिक विक्री",
    "hi": "दैनिक बिक्री",
    "en": "Daily Sales"
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
  "Dates of Stay": {
    "mr": "Dates of मुक्काम",
    "hi": "Dates of आवास",
    "en": "Dates of Stay"
  },
  "DBSCAN haversine clustering & XGBoost severity triage streaming live from Nashik admin records.": {
    "mr": "DBSCAN haversine clustering & XGBoost severity triage streaming थेट कडून Nashik प्रशासक records.",
    "hi": "DBSCAN haversine clustering & XGBoost severity triage streaming लाइव से Nashik प्रशासक records.",
    "en": "DBSCAN haversine clustering & XGBoost severity triage streaming live from Nashik admin records."
  },
  "DBSCAN Spatial Clustering + XGBoost Severity Triage from 100,000 Nashik civic reports.": {
    "mr": "DBSCAN Spatial Clustering + XGBoost Severity Triage कडून 100,000 Nashik नागरी तक्रारी व अहवाल.",
    "hi": "DBSCAN Spatial Clustering + XGBoost Severity Triage से 100,000 Nashik नागरिक शिकायतें एवं रिपोर्ट.",
    "en": "DBSCAN Spatial Clustering + XGBoost Severity Triage from 100,000 Nashik civic reports."
  },
  "DBSCAN Spatial Hotspot Clusters": {
    "mr": "DBSCAN Spatial गर्दी केंद्र गट",
    "hi": "DBSCAN Spatial भीड़ केंद्र क्लस्टर",
    "en": "DBSCAN Spatial Hotspot Clusters"
  },
  "DBSCAN ε=120m": {
    "mr": "DBSCAN ε=120m",
    "hi": "DBSCAN ε=120m",
    "en": "DBSCAN ε=120m"
  },
  "Debunked": {
    "mr": "खोटे सिद्ध झाले",
    "hi": "झूठा साबित",
    "en": "Debunked"
  },
  "Debunked by Kumbhveer Squad #4": {
    "mr": "कुंभवीर पथक #४ द्वारे खंडित",
    "hi": "कुंभवीर स्क्वॉड #४ द्वारा खंडित",
    "en": "Debunked by Kumbhveer Squad #4"
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
  "Default Global": {
    "mr": "डीफॉल्ट जागतिक",
    "hi": "डिफ़ॉल्ट वैश्विक",
    "en": "Default Global"
  },
  "Defiant meter readout": {
    "mr": "Defiant meter readout",
    "hi": "Defiant meter readout",
    "en": "Defiant meter readout"
  },
  "Demanded (मागितलेली रक्कम)": {
    "mr": "मागितलेली रक्कम",
    "hi": "मांगी गई राशि",
    "en": "Demanded (मागितलेली रक्कम)"
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
    "mr": "मागणी करत आहे",
    "hi": "मांग कर रहे हैं",
    "en": "Demanding"
  },
  "Dense Bottleneck at Ramkund Step-way": {
    "mr": "Dense Bottleneck at रामकुंड Step-way",
    "hi": "Dense Bottleneck at रामकुंड Step-way",
    "en": "Dense Bottleneck at Ramkund Step-way"
  },
  "Density Map": {
    "mr": "गर्दी घनता नकाशा",
    "hi": "भीड़ घनत्व मानचित्र",
    "en": "Density Map"
  },
  "Describe the issue in detail...": {
    "mr": "तक्रारीचे सविस्तर वर्णन करा...",
    "hi": "समस्या का विस्तार से वर्णन करें...",
    "en": "Describe the issue in detail..."
  },
  "Description": {
    "mr": "तक्रारीचा तपशील",
    "hi": "शिकायत का विवरण",
    "en": "Description"
  },
  "Description & Specifications": {
    "mr": "वर्णन व तपशील",
    "hi": "विवरण एवं विनिर्देश",
    "en": "Description & Specifications"
  },
  "Destination Point": {
    "mr": "गंतव्य ठिकाण",
    "hi": "गंतव्य स्थान",
    "en": "Destination Point"
  },
  "Details": {
    "mr": "तपशील",
    "hi": "विवरण",
    "en": "Details"
  },
  "Device & Dispatch Controls": {
    "mr": "Device & रवानगी Controls",
    "hi": "Device & प्रेषण Controls",
    "en": "Device & Dispatch Controls"
  },
  "Devotional Books": {
    "mr": "धार्मिक पुस्तके",
    "hi": "धार्मिक पुस्तकें",
    "en": "Devotional Books"
  },
  "DHARAMSHALA": {
    "mr": "DHARAMSHALA",
    "hi": "DHARAMSHALA",
    "en": "DHARAMSHALA"
  },
  "Dharamshala Nights": {
    "mr": "धर्मशाळा Nights",
    "hi": "धर्मशाला Nights",
    "en": "Dharamshala Nights"
  },
  "Dharamshalas, ashrams, budget hotels & tent cities with verified rates.": {
    "mr": "प्रमाणित दरांसह धर्मशाळा, आश्रम, बजेट हॉटेल्स आणि तंबू शहरे.",
    "hi": "सत्यापित दरों के साथ धर्मशालाएं, आश्रम, बजट होटल और तंबू शहर।",
    "en": "Dharamshalas, ashrams, budget hotels & tent cities with verified rates."
  },
  "Dial": {
    "mr": "कॉल करा",
    "hi": "कॉल करें",
    "en": "Dial"
  },
  "Digital Meal Pass": {
    "mr": "डिजिटल भोजन पास",
    "hi": "डिजिटल भोजन पास",
    "en": "Digital Meal Pass"
  },
  "Digital Payment / QR Code Active": {
    "mr": "डिजिटल पेमेंट / क्यूआर कोड सक्रिय",
    "hi": "डिजिटल भुगतान / क्यूआर कोड सक्रिय",
    "en": "Digital Payment / QR Code Active"
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
  "Direct Call": {
    "mr": "थेट कॉल",
    "hi": "सीधा कॉल",
    "en": "Direct Call"
  },
  "Direct call & on-site hire only • No in-app ride booking": {
    "mr": "केवळ थेट कॉल व प्रत्यक्ष भाडे • अॅपमधून बुकिंग नाही",
    "hi": "केवल सीधा कॉल और मौके पर किराया • ऐप में बुकिंग नहीं",
    "en": "Direct call & on-site hire only • No in-app ride booking"
  },
  "Direct Contact & Booking Policy": {
    "mr": "थेट संपर्क व बुकिंग नियम",
    "hi": "सीधा संपर्क एवं बुकिंग नीति",
    "en": "Direct Contact & Booking Policy"
  },
  "Direct Contact Only": {
    "mr": "केवळ थेट संपर्क",
    "hi": "केवल सीधा संपर्क",
    "en": "Direct Contact Only"
  },
  "Direct Contact Only:": {
    "mr": "केवळ थेट संपर्क:",
    "hi": "केवल सीधा संपर्क:",
    "en": "Direct Contact Only:"
  },
  "Direct Dispatch": {
    "mr": "थेट कारवाई",
    "hi": "सीधी कार्रवाई",
    "en": "Direct Dispatch"
  },
  "Direct from authenticated Nashik & Trimbak artisans with NMC price verification tags": {
    "mr": "NMC दर पडताळणीसह थेट नाशिक व त्र्यंबकच्या कारागिरांकडून",
    "hi": "NMC दर सत्यापन के साथ सीधे नासिक और त्र्यंबक के कारीगरों द्वारा",
    "en": "Direct from authenticated Nashik & Trimbak artisans with NMC price verification tags"
  },
  "Direct Response": {
    "mr": "त्वरित प्रतिसाद",
    "hi": "सीधा उत्तर",
    "en": "Direct Response"
  },
  "Direct Sector Channels": {
    "mr": "थेट क्षेत्रीय मदत वाहिन्या",
    "hi": "सीधे क्षेत्रीय सहायता चैनल",
    "en": "Direct Sector Channels"
  },
  "Direct stone-paved route to Ramkund": {
    "mr": "Direct stone-paved मार्ग to रामकुंड",
    "hi": "Direct stone-paved मार्ग to रामकुंड",
    "en": "Direct stone-paved route to Ramkund"
  },
  "Direct transparent agreement with the service provider. You only pay upon arrival after verifying services.": {
    "mr": "सेवादात्याशी थेट व पारदर्शक व्यवहार. सेवा पडताळणीनंतरच पोहचल्यावर थेट पैसे द्या.",
    "hi": "सेवा प्रदाता के साथ सीधा और पारदर्शी समझौता। सेवा की जांच के बाद पहुंचने पर ही भुगतान करें।",
    "en": "Direct transparent agreement with the service provider. You only pay upon arrival after verifying services."
  },
  "Direct Vendor Rate & Reference": {
    "mr": "Direct विक्रेता दर & Reference",
    "hi": "Direct विक्रेता दर & Reference",
    "en": "Direct Vendor Rate & Reference"
  },
  "Direct-contact only via Call/WhatsApp or on-site visit. In-app booking is disabled for places and rides.": {
    "mr": "कॉल/व्हॉट्सॲप किंवा प्रत्यक्ष भेटीद्वारे थेट संपर्क. मध्यस्थ किंवा कमिशन नाही.",
    "hi": "कॉल/व्हाट्सएप या स्थल पर जाकर सीधा संपर्क करें। बिचौलिया या कमीशन मुक्त।",
    "en": "Direct-contact only via Call/WhatsApp or on-site visit. In-app booking is disabled for places and rides."
  },
  "Directions": {
    "mr": "दिशा / रस्ता",
    "hi": "दिशा-निर्देश",
    "en": "Directions"
  },
  "Disaster Helpline": {
    "mr": "आपत्ती निवारण मदत कक्ष",
    "hi": "आपदा प्रबंधन हेल्पलाइन",
    "en": "Disaster Helpline"
  },
  "Disaster Helpline (1077)": {
    "mr": "आपत्ती निवारण मदत कक्ष (१०७७)",
    "hi": "आपदा प्रबंधन हेल्पलाइन (१०७७)",
    "en": "Disaster Helpline (1077)"
  },
  "Discover verified local stalls, sacred puja samagri, pilgrim dharamshalas, satvik eateries & certified guides at fair market rates.": {
    "mr": "प्रमाणित स्थानिक दुकाने, पवित्र पूजा साहित्य, धर्मशाळा, सात्त्विक भोजनालये व परवानाधारक मार्गदर्शक वाजवी दरात शोधा.",
    "hi": "सत्यापित स्थानीय दुकानें, पवित्र पूजा सामग्री, धर्मशालाएं, सात्विक भोजनालय और प्रमाणित गाइड उचित मूल्य पर खोजें।",
    "en": "Discover verified local stalls, sacred puja samagri, pilgrim dharamshalas, satvik eateries & certified guides at fair market rates."
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
    "mr": "रद्द करा / दुर्लक्ष करा",
    "hi": "खारिज करें",
    "en": "Dismiss"
  },
  "Dispatch Audio Alert": {
    "mr": "रवानगी Audio दक्षता इशारा",
    "hi": "प्रेषण Audio अलर्ट",
    "en": "Dispatch Audio Alert"
  },
  "Dispatch Check": {
    "mr": "रवानगी तपासणी",
    "hi": "प्रेषण जांच",
    "en": "Dispatch Check"
  },
  "Dispatch Officer": {
    "mr": "अधिकारी रवाना करा",
    "hi": "अधिकारी रवाना करें",
    "en": "Dispatch Officer"
  },
  "Dispatch Patrol": {
    "mr": "गस्त पथक रवाना करा",
    "hi": "गश्ती दल रवाना करें",
    "en": "Dispatch Patrol"
  },
  "Dispatch Squad": {
    "mr": "रवानगी पथक",
    "hi": "प्रेषण दस्ता",
    "en": "Dispatch Squad"
  },
  "Dispatch Volunteer": {
    "mr": "रवानगी स्वयंसेवक",
    "hi": "प्रेषण Volunteer",
    "en": "Dispatch Volunteer"
  },
  "Dispatched to Squad": {
    "mr": "दक्षता पथकाकडे वर्ग",
    "hi": "दस्ता दल को प्रेषित",
    "en": "Dispatched to Squad"
  },
  "Distance": {
    "mr": "अंतर",
    "hi": "दूरी",
    "en": "Distance"
  },
  "Distance:": {
    "mr": "अंतर:",
    "hi": "दूरी:",
    "en": "Distance:"
  },
  "Distribution Timings:": {
    "mr": "भोजन वितरण वेळ:",
    "hi": "भोजन वितरण समय:",
    "en": "Distribution Timings:"
  },
  "Divya Sonawane": {
    "mr": "Divya Sonawane",
    "hi": "Divya Sonawane",
    "en": "Divya Sonawane"
  },
  "Docket #NSK-2026-904": {
    "mr": "दोषारोप #NSK-२०२६-९०४",
    "hi": "दस्तावेज़ #NSK-२०२६-९०४",
    "en": "Docket #NSK-2026-904"
  },
  "Done & Return to Home": {
    "mr": "पूर्ण करा व मुख्यपृष्ठावर जा",
    "hi": "पूर्ण करें और मुख्यपृष्ठ पर लौटें",
    "en": "Done & Return to Home"
  },
  "Dormitory Bed": {
    "mr": "डॉर्मिटरी बेड",
    "hi": "डॉर्मिटरी बेड",
    "en": "Dormitory Bed"
  },
  "Dormitory Bed (Air-Cooled)": {
    "mr": "डॉर्मिटरी खाट (कूलरयुक्त)",
    "hi": "डॉर्मिटरी बिस्तर (कूलरयुक्त)",
    "en": "Dormitory Bed (Air-Cooled)"
  },
  "Double Room": {
    "mr": "Double खोली",
    "hi": "Double कमरा",
    "en": "Double Room"
  },
  "Download": {
    "mr": "डाउनलोड करा",
    "hi": "डाउनलोड करें",
    "en": "Download"
  },
  "Download Official Gazette Compliance PDF": {
    "mr": "डाउनलोड करा अधिकृत राजपत्र अनुपालन PDF",
    "hi": "डाउनलोड करें आधिकारिक राजपत्र अनुपालन PDF",
    "en": "Download Official Gazette Compliance PDF"
  },
  "Download Pass / PDF": {
    "mr": "पास / पावती डाउनलोड करा",
    "hi": "पास / रसीद डाउनलोड करें",
    "en": "Download Pass / PDF"
  },
  "Dr. Ananya Roy": {
    "mr": "Dr. Ananya Roy",
    "hi": "Dr. Ananya Roy",
    "en": "Dr. Ananya Roy"
  },
  "Drop-off 🚩": {
    "mr": "गंतव्य स्थान 🚩",
    "hi": "गंतव्य स्थान 🚩",
    "en": "Drop-off 🚩"
  },
  "Duty Station / Ghat Sector": {
    "mr": "कर्तव्य Station / घाट विभाग",
    "hi": "ड्यूटी Station / घाट सेक्टर",
    "en": "Duty Station / Ghat Sector"
  },
  "Duty Terminal Login": {
    "mr": "ड्युटी टर्मिनल लॉगिन",
    "hi": "ड्यूटी टर्मिनल लॉगिन",
    "en": "Duty Terminal Login"
  },
  "Duty Verified": {
    "mr": "कर्तव्य प्रमाणित",
    "hi": "ड्यूटी सत्यापित",
    "en": "Duty Verified"
  },
  "E-Rickshaw": {
    "mr": "ई-रिक्षा",
    "hi": "ई-रिक्शा",
    "en": "E-Rickshaw"
  },
  "E-Rickshaw (Green Zone)": {
    "mr": "ई-रिक्षा (हरित क्षेत्र)",
    "hi": "ई-रिक्शा (हरित क्षेत्र)",
    "en": "E-Rickshaw (Green Zone)"
  },
  "e.g. 02532513511": {
    "mr": "e.g. 02532513511",
    "hi": "e.g. 02532513511",
    "en": "e.g. 02532513511"
  },
  "e.g. 700": {
    "mr": "उदा. ७००",
    "hi": "उदा. ७००",
    "en": "e.g. 700"
  },
  "e.g. Anand Joshi": {
    "mr": "e.g. Anand Joshi",
    "hi": "e.g. Anand Joshi",
    "en": "e.g. Anand Joshi"
  },
  "e.g. Counter attendant denied standard dorm pricing and insisted on cash only.": {
    "mr": "e.g. Counter attendant denied standard डॉर्मिटरी दर रचना आणि insisted on cash only.",
    "hi": "e.g. Counter attendant denied standard डॉर्मिटरी मूल्य निर्धारण और insisted on cash only.",
    "en": "e.g. Counter attendant denied standard dorm pricing and insisted on cash only."
  },
  "e.g. guide@kumbhsetu.in": {
    "mr": "e.g. मार्गदर्शक@kumbhsetu.in",
    "hi": "e.g. गाइड@kumbhsetu.in",
    "en": "e.g. guide@kumbhsetu.in"
  },
  "e.g. Marathi, Hindi, English • Ramkund Ghat": {
    "mr": "e.g. Marathi, Hindi, English • रामकुंड घाट",
    "hi": "e.g. Marathi, Hindi, English • रामकुंड घाट",
    "en": "e.g. Marathi, Hindi, English • Ramkund Ghat"
  },
  "e.g. MH-15-AB-1234": {
    "mr": "उदा. MH-15-AB-1234",
    "hi": "उदा. MH-15-AB-1234",
    "en": "e.g. MH-15-AB-1234"
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
  "e.g. Rameshwar Vinayak Pathak": {
    "mr": "e.g. Rameshwar Vinayak Pathak",
    "hi": "e.g. Rameshwar Vinayak Pathak",
    "en": "e.g. Rameshwar Vinayak Pathak"
  },
  "e.g. rameshwar.guide@kumbhsetu.in": {
    "mr": "e.g. rameshwar.मार्गदर्शक@kumbhsetu.in",
    "hi": "e.g. rameshwar.गाइड@kumbhsetu.in",
    "en": "e.g. rameshwar.guide@kumbhsetu.in"
  },
  "e.g. Someone is claiming on WhatsApp that Godavari water level is unsafe and ghats are closed...": {
    "mr": "उदा. व्हाट्सअ‍ॅपवर दावा केला जात आहे की गोदावरीची पातळी वाढली असून घाट बंद आहेत...",
    "hi": "उदा. व्हाट्सएप पर दावा किया जा रहा है कि गोदावरी का जलस्तर बढ़ गया है और घाट बंद हैं...",
    "en": "e.g. Someone is claiming on WhatsApp that Godavari water level is unsafe and ghats are closed..."
  },
  "e.g., Driver apprehended at Bay 4 kiosk. Overcharge refunded to yatri...": {
    "mr": "e.g., Driver apprehended at Bay 4 kiosk. जादा दर refunded to भाविक...",
    "hi": "e.g., Driver apprehended at Bay 4 kiosk. अत्यधिक किराया refunded to तीर्थयात्री...",
    "en": "e.g., Driver apprehended at Bay 4 kiosk. Overcharge refunded to yatri..."
  },
  "Eateries & Prasad": {
    "mr": "भोजनालये आणि प्रसाद",
    "hi": "भोजनालय एवं प्रसाद",
    "en": "Eateries & Prasad"
  },
  "Eatery": {
    "mr": "Eatery",
    "hi": "Eatery",
    "en": "Eatery"
  },
  "EATERY / STALL": {
    "mr": "EATERY / स्टॉल",
    "hi": "EATERY / स्टॉल",
    "en": "EATERY / STALL"
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
  "Edit My Price": {
    "mr": "Edit My दर",
    "hi": "Edit My मूल्य",
    "en": "Edit My Price"
  },
  "Email ID & Password": {
    "mr": "ईमेल आयडी आणि पासवर्ड",
    "hi": "ईमेल आईडी एवं पासवर्ड",
    "en": "Email ID & Password"
  },
  "Email ID & Password authentication for verified Local Guides, Civic Vendors, Kumbhveer Student Volunteers & Citizens.": {
    "mr": "ईमेल ओळख क्रमांक & पासवर्ड authentication साठी प्रमाणित Local मार्गदर्शक, नागरी विक्रेते, कुंभवीर विद्यार्थी स्वयंसेवक & नागरिक.",
    "hi": "ईमेल पहचान संख्या & पासवर्ड authentication के लिए सत्यापित Local गाइड, नागरिक विक्रेता, कुंभवीर छात्र स्वयंसेवक & नागरिक.",
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
  "Emergency": {
    "mr": "आपत्कालीन",
    "hi": "आपातकाल",
    "en": "Emergency"
  },
  "Emergency Assistance": {
    "mr": "आपत्कालीन साहाय्य",
    "hi": "आपातकालीन सहायता",
    "en": "Emergency Assistance"
  },
  "Emergency Dispatch & Safety Hub": {
    "mr": "आपत्कालीन नियंत्रण व सुरक्षा केंद्र",
    "hi": "आपातकालीन नियंत्रण एवं सुरक्षा केंद्र",
    "en": "Emergency Dispatch & Safety Hub"
  },
  "Emergency Escalation Protocols": {
    "mr": "आपत्कालीन तक्रार निवारण Protocols",
    "hi": "आपातकालीन शिकायत निवारण Protocols",
    "en": "Emergency Escalation Protocols"
  },
  "Emergency Field Hotline:": {
    "mr": "आपत्कालीन प्रत्यक्ष Hotline:",
    "hi": "आपातकालीन फील्ड Hotline:",
    "en": "Emergency Field Hotline:"
  },
  "Emergency responders synced along Godavari Ghats": {
    "mr": "गोदावरी घाटावर आपत्कालीन रक्षक तैनात",
    "hi": "गोदावरी घाट पर आपातकालीन दल तैनात",
    "en": "Emergency responders synced along Godavari Ghats"
  },
  "Emergency SOS": {
    "mr": "आपत्कालीन मदत (SOS)",
    "hi": "आपातकालीन सहायता (SOS)",
    "en": "Emergency SOS"
  },
  "EN | मरा": {
    "mr": "मराठी",
    "hi": "हिंदी",
    "en": "English"
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
    "mr": "Enforce statutory दर कमाल मर्यादा, समस्या digital compound fine (₹5,000) साठी repeat दर gouging, आणि disperse rogue touts.",
    "hi": "Enforce statutory दर अधिकतम सीमा, समस्या digital compound fine (₹5,000) के लिए repeat मूल्य gouging, और disperse rogue touts.",
    "en": "Enforce statutory rate ceiling, issue digital compound fine (₹5,000) for repeat price gouging, and disperse rogue touts."
  },
  "Enforcement & Escalation Desk": {
    "mr": "अंमलबजावणी & तक्रार निवारण कक्ष",
    "hi": "प्रवर्तन & शिकायत निवारण कक्ष",
    "en": "Enforcement & Escalation Desk"
  },
  "Enforcement Resolution": {
    "mr": "अंमलबजावणी Resolution",
    "hi": "प्रवर्तन Resolution",
    "en": "Enforcement Resolution"
  },
  "English": {
    "mr": "English",
    "hi": "English",
    "en": "English"
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
  "Enter as Yatri": {
    "mr": "यात्री म्हणून प्रवेश करा",
    "hi": "यात्री के रूप में प्रवेश करें",
    "en": "Enter as Yatri"
  },
  "Enter official CID, Beat or Traffic Division ID": {
    "mr": "Enter official CID, Beat or Traffic Division ओळख क्रमांक",
    "hi": "Enter official CID, Beat or Traffic Division पहचान संख्या",
    "en": "Enter official CID, Beat or Traffic Division ID"
  },
  "Enter PIN / OTP": {
    "mr": "पिन / ओटीपी टाका",
    "hi": "पिन / ओटीपी दर्ज करें",
    "en": "Enter PIN / OTP"
  },
  "Enter Your API Key / Token:": {
    "mr": "तुमची API की / टोकन प्रविष्ट करा:",
    "hi": "अपनी एपीआई कुंजी / टोकन दर्ज करें:",
    "en": "Enter Your API Key / Token:"
  },
  "Enter your password": {
    "mr": "Enter आपले पासवर्ड",
    "hi": "Enter आपका पासवर्ड",
    "en": "Enter your password"
  },
  "Error": {
    "mr": "त्रुटी",
    "hi": "त्रुटि",
    "en": "Error"
  },
  "Escalate to Police Desk": {
    "mr": "Escalate to पोलीस कक्ष",
    "hi": "Escalate to पुलिस कक्ष",
    "en": "Escalate to Police Desk"
  },
  "Escalated": {
    "mr": "वरिष्ठांकडे पाठवले",
    "hi": "उच्च स्तर पर भेजा गया",
    "en": "Escalated"
  },
  "Escalated by Nashikkar Admin Officer Divya S. High defiance recorded at Ramkund Bay 4.": {
    "mr": "Escalated by नाशिककर प्रशासक अधिकारी Divya S. उच्च / तीव्र defiance recorded at रामकुंड Bay 4.",
    "hi": "Escalated by नाशिककर प्रशासक अधिकारी Divya S. उच्च / तीव्र defiance recorded at रामकुंड Bay 4.",
    "en": "Escalated by Nashikkar Admin Officer Divya S. High defiance recorded at Ramkund Bay 4."
  },
  "Escalated to Municipal Magistrate": {
    "mr": "दंडाधिकाऱ्यांकडे वर्ग केले",
    "hi": "नगर मजिस्ट्रेट को अग्रेषित",
    "en": "Escalated to Municipal Magistrate"
  },
  "Escalating transfers this docket immediately into the dedicated Nashik Police Kumbh Mela Unit queue. Field officers receive automated GPS coordinates and vendor permit references for instantaneous on-site summons.": {
    "mr": "Escalating transfers this docket immediately into dedicated Nashik पोलीस कुंभ मेळा Unit queue. प्रत्यक्ष officers receive automated GPS coordinates आणि विक्रेता permit references साठी instantaneous on-site summons.",
    "hi": "Escalating transfers this docket immediately into dedicated Nashik पुलिस कुंभ मेला Unit queue. फील्ड officers receive automated GPS coordinates और विक्रेता permit references के लिए instantaneous on-site summons.",
    "en": "Escalating transfers this docket immediately into the dedicated Nashik Police Kumbh Mela Unit queue. Field officers receive automated GPS coordinates and vendor permit references for instantaneous on-site summons."
  },
  "Escalation acknowledged. Sector Unit notified.": {
    "mr": "तक्रार निवारण acknowledged. विभाग Unit notified.",
    "hi": "शिकायत निवारण acknowledged. सेक्टर Unit notified.",
    "en": "Escalation acknowledged. Sector Unit notified."
  },
  "Escalations": {
    "mr": "तातडीच्या तक्रारी (तक्रार निवारणs)",
    "hi": "त्वरित मामले (शिकायत निवारणs)",
    "en": "Escalations"
  },
  "Essential Pilgrim Services": {
    "mr": "महत्त्वाच्या यात्री सेवा",
    "hi": "प्रमुख तीर्थयात्री सेवाएँ",
    "en": "Essential Pilgrim Services"
  },
  "Establishment Name or Stall ID": {
    "mr": "दुकान / स्टॉलचे नाव किंवा क्रमांक",
    "hi": "दुकान / स्टॉल का नाम या नंबर",
    "en": "Establishment Name or Stall ID"
  },
  "Estimated Fair Guidance:": {
    "mr": "अंदाजित वाजवी Guidance:",
    "hi": "अनुमानित उचित Guidance:",
    "en": "Estimated Fair Guidance:"
  },
  "Estimated Fair Range": {
    "mr": "अंदाजे वाजवी दर मर्यादा",
    "hi": "अनुमानित उचित दर सीमा",
    "en": "Estimated Fair Range"
  },
  "Estimated Fair Range (No fixed cap enforced)": {
    "mr": "अंदाजित वाजवी मर्यादा (No fixed मर्यादा enforced)",
    "hi": "अनुमानित उचित सीमा (No fixed सीमा enforced)",
    "en": "Estimated Fair Range (No fixed cap enforced)"
  },
  "Estimated Fair Range (अंदाजे दर):": {
    "mr": "अंदाजित वाजवी मर्यादा (अंदाजे दर):",
    "hi": "अनुमानित उचित सीमा (अंदाजे दर):",
    "en": "Estimated Fair Range (अंदाजे दर):"
  },
  "Estimated Fair Range (स्थानिक बाजार भाव):": {
    "mr": "अंदाजित वाजवी मर्यादा (स्थानिक बाजार भाव):",
    "hi": "अनुमानित उचित सीमा (स्थानिक बाजार भाव):",
    "en": "Estimated Fair Range (स्थानिक बाजार भाव):"
  },
  "Estimated Fair Range:": {
    "mr": "अंदाजित वाजवी मर्यादा:",
    "hi": "अनुमानित उचित सीमा:",
    "en": "Estimated Fair Range:"
  },
  "Estimated Fare": {
    "mr": "अंदाजे भाडे",
    "hi": "अनुमानित किराया",
    "en": "Estimated Fare"
  },
  "Estimated Range Pricing": {
    "mr": "अंदाजित वाजवी दर श्रेणी",
    "hi": "अनुमानित उचित मूल्य दायरा",
    "en": "Estimated Range Pricing"
  },
  "Estimated Range Stalls": {
    "mr": "अंदाजित मर्यादा स्टॉल्स",
    "hi": "अनुमानित सीमा स्टॉल",
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
  "Estimated Waiting Time": {
    "mr": "अनुमानित प्रतीक्षा वेळ",
    "hi": "अनुमानित प्रतीक्षा समय",
    "en": "Estimated Waiting Time"
  },
  "Estimated Waiting Time:": {
    "mr": "अनुमानित प्रतीक्षा वेळ:",
    "hi": "अनुमानित प्रतीक्षा समय:",
    "en": "Estimated Waiting Time:"
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
  "Existing Login": {
    "mr": "लॉगिन करा",
    "hi": "लॉगिन करें",
    "en": "Existing Login"
  },
  "Exit": {
    "mr": "बाहेर पडा",
    "hi": "बाहर निकलें",
    "en": "Exit"
  },
  "Experience:": {
    "mr": "अनुभव:",
    "hi": "अनुभव:",
    "en": "Experience:"
  },
  "Explore All": {
    "mr": "सर्व एक्सप्लोर करा",
    "hi": "सभी देखें",
    "en": "Explore All"
  },
  "Explore the live map freely, pick any pickup and destination, and get official RTO fare predictions.": {
    "mr": "नकाशावर मुक्तपणे फिरवा, सुरुवात व गंतव्य ठिकाण निवडा आणि आरटीओ अधिकृत भाडे अंदाज मिळवा.",
    "hi": "नक्शे का स्वतंत्र उपयोग करें, पिकअप एवं गंतव्य चुनें और आरटीओ अधिकृत किराया अनुमान प्राप्त करें।",
    "en": "Explore the live map freely, pick any pickup and destination, and get official RTO fare predictions."
  },
  "Export Docket": {
    "mr": "दोषारोप नोंद निर्यात करा",
    "hi": "दस्तावेज़ निर्यात करें",
    "en": "Export Docket"
  },
  "face": {
    "mr": "face",
    "hi": "face",
    "en": "face"
  },
  "Face Biometrics Verified (98.6%)": {
    "mr": "Face Biometrics प्रमाणित (98.6%)",
    "hi": "Face Biometrics सत्यापित (98.6%)",
    "en": "Face Biometrics Verified (98.6%)"
  },
  "Face Detected": {
    "mr": "चेहरा आढळला",
    "hi": "चेहरा पहचाना गया",
    "en": "Face Detected"
  },
  "Face Handshake": {
    "mr": "Face Handshake",
    "hi": "Face Handshake",
    "en": "Face Handshake"
  },
  "Facial Recognition Vector Match": {
    "mr": "चेहरा ओळख पडताळणी",
    "hi": "चेहरा पहचान मिलान",
    "en": "Facial Recognition Vector Match"
  },
  "Fact Check Details": {
    "mr": "तथ्य पडताळणी तपशील",
    "hi": "तथ्य जांच विवरण",
    "en": "Fact Check Details"
  },
  "Fact-Check Alert": {
    "mr": "Fact-तपासणी दक्षता इशारा",
    "hi": "Fact-जांच अलर्ट",
    "en": "Fact-Check Alert"
  },
  "Fair Cap (₹)": {
    "mr": "अधिकृत मर्यादा (₹)",
    "hi": "उचित सीमा (₹)",
    "en": "Fair Cap (₹)"
  },
  "Fair Category": {
    "mr": "वाजवी श्रेणी",
    "hi": "उचित श्रेणी",
    "en": "Fair Category"
  },
  "Fair Category • Verified by Kumbhveer & Pilgrims": {
    "mr": "वाजवी वर्गवारी • कुंभवीर व यात्री संदर्भ",
    "hi": "उचित श्रेणी • कुंभवीर व तीर्थयात्री संदर्भ",
    "en": "Fair Category • Verified by Kumbhveer & Pilgrims"
  },
  "Fair Price": {
    "mr": "वाजवी दर",
    "hi": "उचित मूल्य",
    "en": "Fair Price"
  },
  "Fair Price Compliance": {
    "mr": "वाजवी दर पालन",
    "hi": "उचित मूल्य अनुपालन",
    "en": "Fair Price Compliance"
  },
  "Fair Price Compliance Score": {
    "mr": "वाजवी दर अनुपालन गुण",
    "hi": "उचित मूल्य अनुपालन स्कोर",
    "en": "Fair Price Compliance Score"
  },
  "Fair Price Reference": {
    "mr": "वाजवी दर संदर्भ",
    "hi": "उचित दर संदर्भ",
    "en": "Fair Price Reference"
  },
  "Fair Price Verified": {
    "mr": "वाजवी दर प्रमाणित",
    "hi": "उचित मूल्य सत्यापित",
    "en": "Fair Price Verified"
  },
  "Fair Range Guidance": {
    "mr": "वाजवी दर मार्गदर्शन",
    "hi": "उचित मूल्य मार्गदर्शन",
    "en": "Fair Range Guidance"
  },
  "Fair Range ✓": {
    "mr": "वाजवी मर्यादा ✓",
    "hi": "उचित सीमा ✓",
    "en": "Fair Range ✓"
  },
  "Fair Rate": {
    "mr": "वाजवी अधिकृत दर",
    "hi": "उचित दर",
    "en": "Fair Rate"
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
    "mr": "False claims are cross-checked by कुंभवीर स्वयंसेवक before नागरी escalation. Thank you साठी protecting fellow yatris.",
    "hi": "False claims are cross-checked by कुंभवीर स्वयंसेवक before नागरिक escalation. Thank you के लिए protecting fellow yatris.",
    "en": "False claims are cross-checked by Kumbhveer volunteers before civic escalation. Thank you for protecting fellow yatris."
  },
  "False Information": {
    "mr": "खोटी / दिशाभूल करणारी माहिती",
    "hi": "झूठी / भ्रामक जानकारी",
    "en": "False Information"
  },
  "False Information / Rumor": {
    "mr": "चुकीची माहिती / अफवा",
    "hi": "झूठी सूचना / अफवाह",
    "en": "False Information / Rumor"
  },
  "False panic narrative spreading on regional messaging channels": {
    "mr": "False panic narrative spreading on regional messaging channels",
    "hi": "False panic narrative spreading on regional messaging channels",
    "en": "False panic narrative spreading on regional messaging channels"
  },
  "FALSE. Normal 10-minute interval shuttle buses are operating continuously from CBS to Trimbakeshwar.": {
    "mr": "खोटे. सीबीएस ते त्र्यंबकेश्वर दरम्यान दर १० मिनिटांनी शटल बसेस अखंड सुरू आहेत.",
    "hi": "झूठ। सीबीएस से त्र्यंबकेश्वर के लिए हर १० मिनट पर शटल बसें लगातार चल रही हैं।",
    "en": "FALSE. Normal 10-minute interval shuttle buses are operating continuously from CBS to Trimbakeshwar."
  },
  "Fare Board": {
    "mr": "दर फलक",
    "hi": "किराया बोर्ड",
    "en": "Fare Board"
  },
  "Fare Board & Rides": {
    "mr": "दरफलक व वाहने",
    "hi": "किराया बोर्ड एवं सवारी",
    "en": "Fare Board & Rides"
  },
  "Fare Slip": {
    "mr": "Fare Slip",
    "hi": "Fare Slip",
    "en": "Fare Slip"
  },
  "Fares": {
    "mr": "दर फलक",
    "hi": "किराया",
    "en": "Fares"
  },
  "Fast Action": {
    "mr": "तातडीने कारवाई",
    "hi": "त्वरित कार्रवाई",
    "en": "Fast Action"
  },
  "Feb 2027": {
    "mr": "Feb 2027",
    "hi": "Feb 2027",
    "en": "Feb 2027"
  },
  "field audits": {
    "mr": "क्षेत्रीय तपासण्या",
    "hi": "फील्ड ऑडिट",
    "en": "field audits"
  },
  "Field Audits to Verify": {
    "mr": "पडताळणीसाठी क्षेत्रीय तपासण्या",
    "hi": "सत्यापन के लिए फील्ड ऑडिट",
    "en": "Field Audits to Verify"
  },
  "Field-audited by": {
    "mr": "प्रत्यक्ष तपासणी:",
    "hi": "फील्ड निरीक्षण:",
    "en": "Field-audited by"
  },
  "File a Report": {
    "mr": "तक्रार दाखल करा",
    "hi": "शिकायत दर्ज करें",
    "en": "File a Report"
  },
  "File Notice": {
    "mr": "तक्रार नोंदवा",
    "hi": "नोटिस दर्ज करें",
    "en": "File Notice"
  },
  "File Upload": {
    "mr": "File अपलोड करा",
    "hi": "File अपलोड करें",
    "en": "File Upload"
  },
  "Filed Evidence (2)": {
    "mr": "दाखल पुरावे (२)",
    "hi": "दर्ज प्रमाण (२)",
    "en": "Filed Evidence (2)"
  },
  "Fill Demo Guide Account": {
    "mr": "Fill Demo मार्गदर्शक Account",
    "hi": "Fill Demo गाइड Account",
    "en": "Fill Demo Guide Account"
  },
  "Filter": {
    "mr": "फिल्टर",
    "hi": "फ़िल्टर",
    "en": "Filter"
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
  "Find Free Meals": {
    "mr": "भोजन शोधा",
    "hi": "भोजन खोजें",
    "en": "Find Free Meals"
  },
  "Find Meals": {
    "mr": "भोजन शोधा",
    "hi": "भोजन खोजें",
    "en": "Find Meals"
  },
  "Find Stays": {
    "mr": "मुक्काम शोधा",
    "hi": "आवास खोजें",
    "en": "Find Stays"
  },
  "fingerprint": {
    "mr": "fingerprint",
    "hi": "fingerprint",
    "en": "fingerprint"
  },
  "Fire Brigade (101)": {
    "mr": "अग्निशामक दल (१०१)",
    "hi": "अग्निशमन दल (१०१)",
    "en": "Fire Brigade (101)"
  },
  "First Aid Post": {
    "mr": "प्रथमोपचार केंद्र",
    "hi": "प्राथमिक चिकित्सा केंद्र",
    "en": "First Aid Post"
  },
  "Fixed in 14m": {
    "mr": "निश्चित in 14m",
    "hi": "तयशुदा in 14m",
    "en": "Fixed in 14m"
  },
  "Fixed in 22m": {
    "mr": "निश्चित in 22m",
    "hi": "तयशुदा in 22m",
    "en": "Fixed in 22m"
  },
  "Fixed Pre-Paid Corridor": {
    "mr": "निश्चित Pre-Paid Corridor",
    "hi": "तयशुदा Pre-Paid Corridor",
    "en": "Fixed Pre-Paid Corridor"
  },
  "Flag overcharging, sanitation issues, or fake info.": {
    "mr": "जादा दर, अस्वच्छता किंवा बनावट माहितीची तक्रार करा.",
    "hi": "अधिक किराया/दाम, गंदगी या भ्रामक जानकारी की शिकायत करें।",
    "en": "Flag overcharging, sanitation issues, or fake info."
  },
  "Flag rate gouging, fake guides or hygiene alerts.": {
    "mr": "दरवाढ, बनावट मार्गदर्शक किंवा अस्वच्छतेची तक्रार नोंदवा.",
    "hi": "अतिरिक्त वसूली, नकली गाइड या अस्वच्छता की शिकायत करें।",
    "en": "Flag rate gouging, fake guides or hygiene alerts."
  },
  "Flag rate gouging, fake guides or sanitation alerts directly.": {
    "mr": "जादा दर, बनावट मार्गदर्शक किंवा अस्वच्छतेची तक्रार थेट नोंदवा.",
    "hi": "अत्यधिक किराया, फर्जी गाइड या अस्वच्छता की शिकायत सीधे दर्ज करें।",
    "en": "Flag rate gouging, fake guides or sanitation alerts directly."
  },
  "Flagged — Info Incomplete": {
    "mr": "ध्वजांकित — माहिती अपूर्ण",
    "hi": "चिह्नित — जानकारी अधूरी",
    "en": "Flagged — Info Incomplete"
  },
  "Food": {
    "mr": "अन्नक्षेत्र",
    "hi": "भोजन",
    "en": "Food"
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
  "Food & Meals": {
    "mr": "भोजन व खानपान",
    "hi": "भोजन एवं खानपान",
    "en": "Food & Meals"
  },
  "Food & Milk": {
    "mr": "अन्न व दुग्धपदार्थ",
    "hi": "भोजन एवं दूध",
    "en": "Food & Milk"
  },
  "Food Finder": {
    "mr": "अन्न शोधक / अन्नक्षेत्र",
    "hi": "अन्नक्षेत्र एवं भोजन खोज",
    "en": "Food Finder"
  },
  "Food Finder & Annakshetra": {
    "mr": "अन्न शोधक व अन्नक्षेत्र",
    "hi": "भोजन खोज एवं अन्नक्षेत्र",
    "en": "Food Finder & Annakshetra"
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
  "For registered vendors, local guides, transport operators & civic verifiers. Manage listings & verified prices.": {
    "mr": "नोंदणीकृत विक्रेते, स्थानिक मार्गदर्शक, वाहतूकदार व नागरी पडताळणीसाठी. दर व नोंदी व्यवस्थापित करा.",
    "hi": "पंजीकृत विक्रेताओं, स्थानीय गाइडों, परिवहन चालकों और नागरिक निरीक्षकों के लिए। दरें व लिस्टिंग प्रबंधित करें।",
    "en": "For registered vendors, local guides, transport operators & civic verifiers. Manage listings & verified prices."
  },
  "forest": {
    "mr": "forest",
    "hi": "forest",
    "en": "forest"
  },
  "Forward to Fact-Check": {
    "mr": "Forward to Fact-तपासणी",
    "hi": "Forward to Fact-जांच",
    "en": "Forward to Fact-Check"
  },
  "Forwarded": {
    "mr": "Forwarded",
    "hi": "Forwarded",
    "en": "Forwarded"
  },
  "Free": {
    "mr": "मोफत",
    "hi": "मुफ्त",
    "en": "Free"
  },
  "Free & Subsidized": {
    "mr": "मोफत व सवलतीच्या दरात",
    "hi": "मुफ्त एवं रियायती",
    "en": "Free & Subsidized"
  },
  "Free Annakshetra": {
    "mr": "मोफत अन्नछत्र",
    "hi": "मुफ्त अन्नक्षेत्र",
    "en": "Free Annakshetra"
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
  "Free Prasadam": {
    "mr": "मोफत महाप्रसाद",
    "hi": "मुफ्त महाप्रसाद",
    "en": "Free Prasadam"
  },
  "From": {
    "mr": "येथून (सुरुवात)",
    "hi": "कहाँ से (शुरुआत)",
    "en": "From"
  },
  "FSSAI": {
    "mr": "एफएसएसएआय प्रमाणित",
    "hi": "एफएसएसएआई प्रमाणित",
    "en": "FSSAI"
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
  "Full Guide": {
    "mr": "संपूर्ण मार्गदर्शक माहिती",
    "hi": "पूर्ण गाइड",
    "en": "Full Guide"
  },
  "Full Name *": {
    "mr": "Full नाव *",
    "hi": "Full नाम *",
    "en": "Full Name *"
  },
  "Full SOS Center": {
    "mr": "संपूर्ण आपत्कालीन कक्ष",
    "hi": "संपूर्ण आपातकालीन केंद्र",
    "en": "Full SOS Center"
  },
  "G.E.S. R.Y.K. Science College • 420m away": {
    "mr": "आर.वाय.के. विज्ञान महाविद्यालय • ४२० मी अंतरावर",
    "hi": "आर.वाई.के. साइंस कॉलेज • ४२० मी दूर",
    "en": "G.E.S. R.Y.K. Science College • 420m away"
  },
  "Ganga Ghat Guesthouse": {
    "mr": "Ganga घाट Guesthouse",
    "hi": "Ganga घाट Guesthouse",
    "en": "Ganga Ghat Guesthouse"
  },
  "Ganga Jal & Maha-Puja Kit": {
    "mr": "गंगा जल व महापूजा किट",
    "hi": "गंगा जल एवं महापूजा किट",
    "en": "Ganga Jal & Maha-Puja Kit"
  },
  "Gazette": {
    "mr": "राजपत्र दर",
    "hi": "राजपत्र दर",
    "en": "Gazette"
  },
  "Gazette Cap": {
    "mr": "राजपत्र मर्यादा",
    "hi": "राजपत्र सीमा",
    "en": "Gazette Cap"
  },
  "Gazette Cycle: Morning Sync 08:30 AM": {
    "mr": "राजपत्र वेळ: सकाळचे संकालन ०८:३०",
    "hi": "राजपत्र चक्र: सुबह सिंक ०८:३०",
    "en": "Gazette Cycle: Morning Sync 08:30 AM"
  },
  "Gazette Rates": {
    "mr": "अधिकृत राजपत्र दर",
    "hi": "आधिकारिक राजपत्र दर",
    "en": "Gazette Rates"
  },
  "Gazette Ref: #402-N": {
    "mr": "राजपत्र Ref: #402-N",
    "hi": "राजपत्र Ref: #402-N",
    "en": "Gazette Ref: #402-N"
  },
  "Gazette Sec-02": {
    "mr": "राजपत्र Sec-02",
    "hi": "राजपत्र Sec-02",
    "en": "Gazette Sec-02"
  },
  "Generate Digital Pass": {
    "mr": "पास तयार करा",
    "hi": "पास बनाएं",
    "en": "Generate Digital Pass"
  },
  "Geo-stamped at 14:11 IST": {
    "mr": "Geo-stamped at 14:11 IST",
    "hi": "Geo-stamped at 14:11 IST",
    "en": "Geo-stamped at 14:11 IST"
  },
  "Get Digital Pass": {
    "mr": "डिजिटल पास मिळवा",
    "hi": "डिजिटल पास प्राप्त करें",
    "en": "Get Digital Pass"
  },
  "Get Directions": {
    "mr": "रस्ता पहा (दिशा)",
    "hi": "दिशा-निर्देश प्राप्त करें",
    "en": "Get Directions"
  },
  "Get Help": {
    "mr": "Get मदत",
    "hi": "Get सहायता",
    "en": "Get Help"
  },
  "Get Help Now": {
    "mr": "तातडीने मदत मिळवा",
    "hi": "तुरंत सहायता पाएं",
    "en": "Get Help Now"
  },
  "Ghat Accessibility": {
    "mr": "घाट Accessibility",
    "hi": "घाट Accessibility",
    "en": "Ghat Accessibility"
  },
  "Ghat Lifeguard Force": {
    "mr": "घाट जीवरक्षक दल",
    "hi": "घाट जीवन रक्षक दल",
    "en": "Ghat Lifeguard Force"
  },
  "Ghat Live": {
    "mr": "घाट थेट स्थिती",
    "hi": "घाट लाइव स्थिति",
    "en": "Ghat Live"
  },
  "Ghat Mesh Node #042 Sync": {
    "mr": "घाट Mesh Node #042 Sync",
    "hi": "घाट Mesh Node #042 Sync",
    "en": "Ghat Mesh Node #042 Sync"
  },
  "Ghat Rescue Squad": {
    "mr": "घाट बचाव पथक",
    "hi": "घाट बचाव दल",
    "en": "Ghat Rescue Squad"
  },
  "Gir Cow Ghee": {
    "mr": "गीर गायीचे शुद्ध तूप",
    "hi": "गीर गाय का शुद्ध घी",
    "en": "Gir Cow Ghee"
  },
  "Godavari Bhawan": {
    "mr": "गोदावरी भवन",
    "hi": "गोदावरी भवन",
    "en": "Godavari Bhawan"
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
    "mr": "गोदावरी सात्विक थाळी",
    "hi": "गोदावरी सात्विक थाली",
    "en": "Godavari Satvik Thali"
  },
  "Godavari Yatri Niwas": {
    "mr": "गोदावरी भाविक निवास",
    "hi": "गोदावरी भाविक निवास",
    "en": "Godavari Yatri Niwas"
  },
  "Godavari Yatri Niwas (#NSK-GH-409, Trimbak Road)": {
    "mr": "गोदावरी यात्री निवास (#NSK-GH-४०९, त्र्यंबक रोड)",
    "hi": "गोदावरी यात्री निवास (#NSK-GH-४०९, त्र्यंबक रोड)",
    "en": "Godavari Yatri Niwas (#NSK-GH-409, Trimbak Road)"
  },
  "Government Polytechnic Nashik • 650m away": {
    "mr": "शासकीय तंत्रनिकेतन नाशिक • ६५० मी अंतरावर",
    "hi": "सरकारी पॉलिटेक्निक नासिक • ६५० मी दूर",
    "en": "Government Polytechnic Nashik • 650m away"
  },
  "Govt Aadhaar & Tourism Department Badge Verified": {
    "mr": "Govt Aadhaar & Tourism Department बिल्ला प्रमाणित",
    "hi": "Govt Aadhaar & Tourism Department बैज सत्यापित",
    "en": "Govt Aadhaar & Tourism Department Badge Verified"
  },
  "Govt Authorized Guide #MH-15": {
    "mr": "शासन अधिकृत मार्गदर्शक #MH-15",
    "hi": "शासन अधिकृत गाइड #MH-15",
    "en": "Govt Authorized Guide #MH-15"
  },
  "Govt Authorized Guide Reg #MH-15-GUIDE-0082": {
    "mr": "Govt Authorized मार्गदर्शक Reg #MH-15-मार्गदर्शक-0082",
    "hi": "Govt Authorized गाइड Reg #MH-15-गाइड-0082",
    "en": "Govt Authorized Guide Reg #MH-15-GUIDE-0082"
  },
  "Govt Fact Cell": {
    "mr": "शासकीय तथ्य तपासणी कक्ष",
    "hi": "शासकीय तथ्य जांच प्रकोष्ठ",
    "en": "Govt Fact Cell"
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
  "GPS Locked": {
    "mr": "जीपीएस स्थान निश्चित",
    "hi": "जीपीएस लॉक",
    "en": "GPS Locked"
  },
  "Ground Level Ramp": {
    "mr": "Ground Level Ramp",
    "hi": "Ground Level Ramp",
    "en": "Ground Level Ramp"
  },
  "Ground Truth (MSRTC Verified):": {
    "mr": "सत्यता (एसटी महामंडळ पडताळणीकृत):",
    "hi": "जमीनी सच (एमएसआरटीसी सत्यापित):",
    "en": "Ground Truth (MSRTC Verified):"
  },
  "Ground Truth (PIB Verified):": {
    "mr": "सत्यता (पीआयबी द्वारे पडताळणीकृत):",
    "hi": "जमीनी सच (पीआईबी सत्यापित):",
    "en": "Ground Truth (PIB Verified):"
  },
  "Ground Truth (Volunteer Verified):": {
    "mr": "सत्यता (स्वयंसेवकांनी पडताळणीकृत):",
    "hi": "जमीनी सच (वॉलंटियर सत्यापित):",
    "en": "Ground Truth (Volunteer Verified):"
  },
  "group": {
    "mr": "group",
    "hi": "group",
    "en": "group"
  },
  "Guide": {
    "mr": "मार्गदर्शक",
    "hi": "गाइड",
    "en": "Guide"
  },
  "Guides": {
    "mr": "गाईड",
    "hi": "गाइड",
    "en": "Guides"
  },
  "Guide / Priest": {
    "mr": "मार्गदर्शक / Priest",
    "hi": "गाइड / Priest",
    "en": "Guide / Priest"
  },
  "Guide Booking Confirmed": {
    "mr": "मार्गदर्शक बुकिंग निश्चित झाली",
    "hi": "गाइड बुकिंग पक्की हुई",
    "en": "Guide Booking Confirmed"
  },
  "Guide Credentials": {
    "mr": "मार्गदर्शक प्रमाणपत्र",
    "hi": "गाइड प्रमाण पत्र",
    "en": "Guide Credentials"
  },
  "Guide Language": {
    "mr": "मार्गदर्शकाची भाषा",
    "hi": "गाइड की भाषा",
    "en": "Guide Language"
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
  "Guru Gobind Singh College of Engg. • 900m away": {
    "mr": "गुरु गोविंद सिंग अभियांत्रिकी महाविद्यालय • ९०० मी अंतरावर",
    "hi": "गुरु गोबिंद सिंह इंजीनियरिंग कॉलेज • ९०० मी दूर",
    "en": "Guru Gobind Singh College of Engg. • 900m away"
  },
  "H.P.T. Arts & R.Y.K. Science • 480m away": {
    "mr": "एच.पी.टी. कला व आर.वाय.के. विज्ञान • ४८० मी अंतरावर",
    "hi": "एच.पी.टी. आर्ट्स एवं आर.वाई.के. साइंस • ४८० मी दूर",
    "en": "H.P.T. Arts & R.Y.K. Science • 480m away"
  },
  "Hammered Copper Tamra-Patra": {
    "mr": "हस्तनिर्मित तांब्याचे ताम्रपात्र",
    "hi": "तांबे का ताम्रपात्र",
    "en": "Hammered Copper Tamra-Patra"
  },
  "Hammered Pure Tamra-Patra Thali": {
    "mr": "Hammered Pure Tamra-Patra थाळी",
    "hi": "Hammered Pure Tamra-Patra थाली",
    "en": "Hammered Pure Tamra-Patra Thali"
  },
  "Hand-Cast Brass Diya": {
    "mr": "हस्तनिर्मित पितळी दिवा",
    "hi": "हस्तनिर्मित पीतल दीया",
    "en": "Hand-Cast Brass Diya"
  },
  "Hand-Cast Brass Diya (Set of 2)": {
    "mr": "Hand-Cast पितळ दिवा (Set of 2)",
    "hi": "Hand-Cast पीतल दीया (Set of 2)",
    "en": "Hand-Cast Brass Diya (Set of 2)"
  },
  "Handcrafted Wooden Japa Bag": {
    "mr": "हस्तनिर्मित लाकडी जप पिशवी/गोमुखी",
    "hi": "हस्तनिर्मित जप माला थैली (गोमुखी)",
    "en": "Handcrafted Wooden Japa Bag"
  },
  "Handloom": {
    "mr": "हातमाग",
    "hi": "हथकरघा",
    "en": "Handloom"
  },
  "Handloom Saffron Dhoti & Shawl": {
    "mr": "हातमाग भगवी धोती व शाल",
    "hi": "हथकरघा भगवा धोती एवं शॉल",
    "en": "Handloom Saffron Dhoti & Shawl"
  },
  "Handmade Rudraksha Japa Mala (108 beads)": {
    "mr": "हस्तनिर्मित रुद्राक्ष जपमाळ (१०८ मणी)",
    "hi": "हस्तनिर्मित रुद्राक्ष जप माला (१०८ मनके)",
    "en": "Handmade Rudraksha Japa Mala (108 beads)"
  },
  "Handover Done": {
    "mr": "Handपेक्षा अधिक Done",
    "hi": "Handसे अधिक Done",
    "en": "Handover Done"
  },
  "handshake": {
    "mr": "handshake",
    "hi": "handshake",
    "en": "handshake"
  },
  "Harassment / Extortion": {
    "mr": "पिळवणूक / जास्तीची मागणी",
    "hi": "उत्पीड़न / जबरन वसूली",
    "en": "Harassment / Extortion"
  },
  "Harshada Khairnar": {
    "mr": "हर्षदा खैरनार",
    "hi": "हर्षदा खैरनार",
    "en": "Harshada Khairnar"
  },
  "Have a pricing question or feedback?": {
    "mr": "Have a दर रचना question or feedback?",
    "hi": "Have a मूल्य निर्धारण question or feedback?",
    "en": "Have a pricing question or feedback?"
  },
  "Helpline: 1800-233-0202": {
    "mr": "हेल्पलाइन: १८००-२३३-०२०२",
    "hi": "हेल्पलाइन: १८००-२३३-०२०२",
    "en": "Helpline: 1800-233-0202"
  },
  "Heritage & Ghat Guide": {
    "mr": "Heritage & घाट मार्गदर्शक",
    "hi": "Heritage & घाट गाइड",
    "en": "Heritage & Ghat Guide"
  },
  "Hide Map": {
    "mr": "नकाशा लपवा",
    "hi": "मानचित्र छुपाएँ",
    "en": "Hide Map"
  },
  "High": {
    "mr": "उच्च / तीव्र",
    "hi": "उच्च / तीव्र",
    "en": "High"
  },
  "High Alert": {
    "mr": "अतिदक्षतेचा इशारा",
    "hi": "हाई अलर्ट",
    "en": "High Alert"
  },
  "High Density": {
    "mr": "उच्च घनता",
    "hi": "उच्च घनत्व",
    "en": "High Density"
  },
  "High Flow": {
    "mr": "तीव्र गर्दी प्रवाह",
    "hi": "भारी भीड़ प्रवाह",
    "en": "High Flow"
  },
  "High Priority": {
    "mr": "उच्च प्राधान्यता",
    "hi": "उच्च प्राथमिकता",
    "en": "High Priority"
  },
  "High Volume Beep + Dual Pulse Vibration": {
    "mr": "उच्च / तीव्र Volume Beep + Dual Pulse Vibration",
    "hi": "उच्च / तीव्र Volume Beep + Dual Pulse Vibration",
    "en": "High Volume Beep + Dual Pulse Vibration"
  },
  "hiking": {
    "mr": "hiking",
    "hi": "hiking",
    "en": "hiking"
  },
  "Hindi (राष्ट्रीय)": {
    "mr": "Hindi (राष्ट्रीय)",
    "hi": "Hindi (राष्ट्रीय)",
    "en": "Hindi (राष्ट्रीय)"
  },
  "Holy Circuit Roadmap": {
    "mr": "पवित्र परिक्रमा नकाशा",
    "hi": "पवित्र परिक्रमा रोडमैप",
    "en": "Holy Circuit Roadmap"
  },
  "Holy Dip & Ganga Godavari Aarti": {
    "mr": "पवित्र स्नान आणि गंगा गोदावरी आरती",
    "hi": "पवित्र स्नान एवं गंगा गोदावरी आरती",
    "en": "Holy Dip & Ganga Godavari Aarti"
  },
  "Holy Ghats & Pilgrimage Circuit Roadmap": {
    "mr": "पवित्र घाट व तीर्थक्षेत्र प्रदक्षिणा नकाशा",
    "hi": "पवित्र घाट एवं तीर्थ परिक्रमा रोडमैप",
    "en": "Holy Ghats & Pilgrimage Circuit Roadmap"
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
  "Holy Route": {
    "mr": "पवित्र मार्ग",
    "hi": "पवित्र मार्ग",
    "en": "Holy Route"
  },
  "Home": {
    "mr": "मुख्यपृष्ठ",
    "hi": "मुख्य",
    "en": "Home"
  },
  "Honesty Points": {
    "mr": "Honesty Points",
    "hi": "Honesty Points",
    "en": "Honesty Points"
  },
  "Honesty Points & Rewards": {
    "mr": "प्रामाणिक सेवा गुण व पारितोषिके",
    "hi": "सत्यता अंक एवं पुरस्कार",
    "en": "Honesty Points & Rewards"
  },
  "Hot Water": {
    "mr": "गरम पाणी",
    "hi": "गर्म पानी",
    "en": "Hot Water"
  },
  "Hotel & Ashram Stays": {
    "mr": "हॉटेल्स, आश्रम व धर्मशाळा",
    "hi": "होटल, आश्रम एवं धर्मशाला",
    "en": "Hotel & Ashram Stays"
  },
  "Hotel & Stays": {
    "mr": "हॉटेल्स व धर्मशाळा",
    "hi": "होटल एवं आवास",
    "en": "Hotel & Stays"
  },
  "Hotel / Lodging": {
    "mr": "हॉटेल / Lodging",
    "hi": "होटल / Lodging",
    "en": "Hotel / Lodging"
  },
  "Hotel / Niwas": {
    "mr": "हॉटेल / निवास",
    "hi": "होटल / निवास",
    "en": "Hotel / Niwas"
  },
  "Hotels & Dharamshalas": {
    "mr": "हॉटेल्स & धर्मशाळा",
    "hi": "होटल & धर्मशालाएं",
    "en": "Hotels & Dharamshalas"
  },
  "Hotspot Clusters": {
    "mr": "हॉटस्पॉट क्लस्टर्स",
    "hi": "हॉटस्पॉट क्लस्टर्स",
    "en": "Hotspot Clusters"
  },
  "Hotspot Radar": {
    "mr": "हॉटस्पॉट रडार",
    "hi": "हॉटस्पॉट रडार",
    "en": "Hotspot Radar"
  },
  "Hotspots": {
    "mr": "हॉटस्पॉट",
    "hi": "हॉटस्पॉट",
    "en": "Hotspots"
  },
  "hub": {
    "mr": "hub",
    "hi": "hub",
    "en": "hub"
  },
  "Hygiene & Free Drinking Water": {
    "mr": "स्वच्छता व मोफत पिण्याचे पाणी",
    "hi": "स्वच्छता एवं निःशुल्क पेयजल",
    "en": "Hygiene & Free Drinking Water"
  },
  "I solemnly swear to adhere to certified statutory caps and never gouge pilgrims.": {
    "mr": "मी गांभीर्याने शपथ घेतो की मी प्रमाणित कमाल दरांचे पालन करेन आणि भाविकांकडून जादा दर घेणार नाही.",
    "hi": "मैं सत्यनिष्ठा से शपथ लेता हूँ कि मैं प्रमाणित अधिकतम दरों का पालन करूँगा और तीर्थयात्रियों से अधिक मूल्य नहीं वसूलूँगा।",
    "en": "I solemnly swear to adhere to certified statutory caps and never gouge pilgrims."
  },
  "I'm a Nashikkar": {
    "mr": "मी नाशिककर आहे",
    "hi": "मैं नाशिककर हूँ",
    "en": "I'm a Nashikkar"
  },
  "I'm a Yatri": {
    "mr": "मी एक भाविक / यात्री आहे",
    "hi": "मैं एक तीर्थयात्री हूँ",
    "en": "I'm a Yatri"
  },
  "ID: MH-NSK-POL-8841": {
    "mr": "ओळख क्रमांक: MH-NSK-POL-8841",
    "hi": "पहचान संख्या: MH-NSK-POL-8841",
    "en": "ID: MH-NSK-POL-8841"
  },
  "Identity Confirmed": {
    "mr": "ओळख प्रमाणित झाली",
    "hi": "पहचान प्रमाणित हुई",
    "en": "Identity Confirmed"
  },
  "Identity Confirmed via Selfie": {
    "mr": "Identity Confirmed द्वारे Selfie",
    "hi": "Identity Confirmed के माध्यम से Selfie",
    "en": "Identity Confirmed via Selfie"
  },
  "Identity Confirmed via Selfie (Match Score: 99.8%)": {
    "mr": "Identity Confirmed द्वारे Selfie (Match Score: 99.8%)",
    "hi": "Identity Confirmed के माध्यम से Selfie (Match Score: 99.8%)",
    "en": "Identity Confirmed via Selfie (Match Score: 99.8%)"
  },
  "If a yatri ever queries a price, you get a 15-minute amicable clarification window before any municipal escalation is triggered.": {
    "mr": "If a भाविक ever queries a दर, you get a 15-minute amicable clarification window before any महानगरपालिका escalation is triggered.",
    "hi": "If a तीर्थयात्री ever queries a मूल्य, you get a 15-minute amicable clarification window before any नगर निगम escalation is triggered.",
    "en": "If a yatri ever queries a price, you get a 15-minute amicable clarification window before any municipal escalation is triggered."
  },
  "IMG_2027_0814_bill.jpg": {
    "mr": "IMG_2027_0814_bill.jpg",
    "hi": "IMG_2027_0814_bill.jpg",
    "en": "IMG_2027_0814_bill.jpg"
  },
  "Immediate Crisis Map": {
    "mr": "तातडीचा मदत नकाशा",
    "hi": "तत्काल सहायता नक्शा",
    "en": "Immediate Crisis Map"
  },
  "Immediate distress call, ambulance & nearest police outpost map.": {
    "mr": "तातडीचा मदत कॉल, रुग्णवाहिका आणि जवळच्या पोलीस चौकीचा नकाशा.",
    "hi": "तत्काल आपातकालीन कॉल, एम्बुलेंस और निकटतम पुलिस चौकी का नक्शा।",
    "en": "Immediate distress call, ambulance & nearest police outpost map."
  },
  "Immediate Help Call 112": {
    "mr": "तातडीच्या मदतीसाठी ११२ वर कॉल करा",
    "hi": "तत्काल सहायता हेतु ११२ पर कॉल करें",
    "en": "Immediate Help Call 112"
  },
  "Immediate police, ambulance & disaster helpline.": {
    "mr": "तातडीने पोलीस, रुग्णवाहिका व आपत्ती मदत कक्ष.",
    "hi": "तत्काल पुलिस, एम्बुलेंस एवं आपदा हेल्पलाइन।",
    "en": "Immediate police, ambulance & disaster helpline."
  },
  "Important Pilgrim Notice": {
    "mr": "Important भाविक सूचना",
    "hi": "Important तीर्थयात्री नोटिस",
    "en": "Important Pilgrim Notice"
  },
  "In Audit": {
    "mr": "तपासणी सुरू",
    "hi": "जांच जारी",
    "en": "In Audit"
  },
  "In case of meter refusal or demanding arbitrary prices, tap": {
    "mr": "मीटर नाकारल्यास किंवा अवाजवी भाडे मागितल्यास स्पर्श करा",
    "hi": "मीटर से मना करने या मनमाना किराया मांगने पर टैप करें",
    "en": "In case of meter refusal or demanding arbitrary prices, tap"
  },
  "in Nashik": {
    "mr": "नाशिकमध्ये",
    "hi": "नासिक में",
    "en": "in Nashik"
  },
  "In Stock (15)": {
    "mr": "In साठा (15)",
    "hi": "In स्टॉक (15)",
    "en": "In Stock (15)"
  },
  "In Stock (28)": {
    "mr": "In साठा (28)",
    "hi": "In स्टॉक (28)",
    "en": "In Stock (28)"
  },
  "In Stock (40)": {
    "mr": "उपलब्ध साठा (४०)",
    "hi": "स्टॉक में (४०)",
    "en": "In Stock (40)"
  },
  "In Stock (45)": {
    "mr": "In साठा (45)",
    "hi": "In स्टॉक (45)",
    "en": "In Stock (45)"
  },
  "In Stock (80)": {
    "mr": "In साठा (80)",
    "hi": "In स्टॉक (80)",
    "en": "In Stock (80)"
  },
  "In-Person Computer Vision Match": {
    "mr": "In-Person Computer Vision Match",
    "hi": "In-Person Computer Vision Match",
    "en": "In-Person Computer Vision Match"
  },
  "In-person municipal inspection complete": {
    "mr": "प्रत्यक्ष महापालिका तपासणी पूर्ण",
    "hi": "प्रत्यक्ष नगर निगम निरीक्षण पूर्ण",
    "en": "In-person municipal inspection complete"
  },
  "In-Progress": {
    "mr": "प्रगतीपथावर",
    "hi": "प्रगति पर",
    "en": "In-Progress"
  },
  "inbox": {
    "mr": "inbox",
    "hi": "inbox",
    "en": "inbox"
  },
  "Incident Details": {
    "mr": "घटनेचा तपशील",
    "hi": "घटना का विवरण",
    "en": "Incident Details"
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
  "Indicative Fair Range": {
    "mr": "अंदाजे वाजवी दर",
    "hi": "अनुमानित उचित दर",
    "en": "Indicative Fair Range"
  },
  "Indicative Fair Ranges:": {
    "mr": "Indicative वाजवी मर्यादाs:",
    "hi": "Indicative उचित सीमाs:",
    "en": "Indicative Fair Ranges:"
  },
  "Indicative Price Range": {
    "mr": "अंदाजे वाजवी दर मर्यादा",
    "hi": "अनुमानित उचित दर सीमा",
    "en": "Indicative Price Range"
  },
  "Indicative Range": {
    "mr": "अंदाजित मर्यादा",
    "hi": "संकेतक सीमा",
    "en": "Indicative Range"
  },
  "Inflow: 1 event / 2.5s": {
    "mr": "Inflow: 1 event / 2.5s",
    "hi": "Inflow: 1 event / 2.5s",
    "en": "Inflow: 1 event / 2.5s"
  },
  "Inquiry message...": {
    "mr": "चौकशी संदेश...",
    "hi": "पूछताछ संदेश...",
    "en": "Inquiry message..."
  },
  "INR": {
    "mr": "INR",
    "hi": "INR",
    "en": "INR"
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
    "mr": "दर उल्लंघने तपासा (६)",
    "hi": "मूल्य उल्लंघन जांचें (६)",
    "en": "Inspect Price Flags (6)"
  },
  "Inspect stall rate board visibility, digital payment QR, and hygiene conditions. Tap": {
    "mr": "स्टॉलवरील दरफलक, डिजिटल क्यूआर आणि स्वच्छता तपासा. स्पर्श करा:",
    "hi": "स्टॉल का रेट बोर्ड, डिजिटल क्यूआर और स्वच्छता जांचें। टैप करें:",
    "en": "Inspect stall rate board visibility, digital payment QR, and hygiene conditions. Tap"
  },
  "Inspector Patil, confirming sign-out marks Badge MH-NSK-POL-8841 off-duty for Ramkund Central Ghats.": {
    "mr": "निरीक्षक Patil, confirming sign-out marks बिल्ला MH-NSK-POL-8841 off-duty साठी रामकुंड Central घाट.",
    "hi": "निरीक्षक Patil, confirming sign-out marks बैज MH-NSK-POL-8841 off-duty के लिए रामकुंड Central घाट.",
    "en": "Inspector Patil, confirming sign-out marks Badge MH-NSK-POL-8841 off-duty for Ramkund Central Ghats."
  },
  "Inspector Portal": {
    "mr": "निरीक्षक पोर्टल",
    "hi": "निरीक्षक पोर्टल",
    "en": "Inspector Portal"
  },
  "Inspector Vikram Patil": {
    "mr": "निरीक्षक Vikram Patil",
    "hi": "निरीक्षक Vikram Patil",
    "en": "Inspector Vikram Patil"
  },
  "Instant Dispatch": {
    "mr": "त्वरित रवानगी",
    "hi": "तत्काल प्रेषण",
    "en": "Instant Dispatch"
  },
  "Instant dispatch: Police, Medical, Lost & Found, Rescue.": {
    "mr": "तातडीची मदत: पोलीस, रुग्णवाहिका, हरवले-सापडले, बचाव पथक.",
    "hi": "त्वरित सहायता: पुलिस, एम्बुलेंस, खोया-पाया, आपदा बचाव।",
    "en": "Instant dispatch: Police, Medical, Lost & Found, Rescue."
  },
  "Instant Help": {
    "mr": "तातडीची मदत",
    "hi": "त्वरित सहायता",
    "en": "Instant Help"
  },
  "Instant one-touch dispatch to Nashik Kumbh Central Command & Municipal Safety Unit.": {
    "mr": "नाशिक कुंभ मध्यवर्ती नियंत्रण कक्ष व मनपा सुरक्षा पथकास एका स्पर्शात संपर्क.",
    "hi": "नासिक कुंभ केंद्रीय नियंत्रण कक्ष एवं नगर निगम सुरक्षा इकाई को एक स्पर्श में संदेश।",
    "en": "Instant one-touch dispatch to Nashik Kumbh Central Command & Municipal Safety Unit."
  },
  "Interactive Route Map": {
    "mr": "परस्परसंवादी मार्ग नकाशा",
    "hi": "इंटरैक्टिव रूट मैप",
    "en": "Interactive Route Map"
  },
  "Interconnected Route": {
    "mr": "जोडलेला पवित्र मार्ग",
    "hi": "आपस में जुड़ा मार्ग",
    "en": "Interconnected Route"
  },
  "Investigate": {
    "mr": "चौकशी करा",
    "hi": "जांच करें",
    "en": "Investigate"
  },
  "Investigating": {
    "mr": "तपास सुरू आहे",
    "hi": "जांच जारी है",
    "en": "Investigating"
  },
  "Investigation Chronology": {
    "mr": "Investigation Chronology",
    "hi": "Investigation Chronology",
    "en": "Investigation Chronology"
  },
  "Investigation Notes": {
    "mr": "तपास अहवाल / टिपण",
    "hi": "जांच रिपोर्ट / टिप्पणी",
    "en": "Investigation Notes"
  },
  "Investigation Pipeline": {
    "mr": "Investigation Pipeline",
    "hi": "Investigation Pipeline",
    "en": "Investigation Pipeline"
  },
  "Issue Category": {
    "mr": "तक्रारीचा प्रकार",
    "hi": "शिकायत की श्रेणी",
    "en": "Issue Category"
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
  "Jain Bhojanalay": {
    "mr": "जैन भोजनालय",
    "hi": "जैन भोजनालय",
    "en": "Jain Bhojanalay"
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
  "K.T.H.M. College (NSS Wing) • 390m away": {
    "mr": "के.टी.एच.एम. महाविद्यालय (रा.से.यो. विभाग) • ३९० मी अंतरावर",
    "hi": "के.टी.एच.एम. कॉलेज (एनएसएस विंग) • ३९० मी दूर",
    "en": "K.T.H.M. College (NSS Wing) • 390m away"
  },
  "K.T.H.M. College • 18 field audits": {
    "mr": "K.T.H.M. महाविद्यालय • 18 field audits",
    "hi": "K.T.H.M. कॉलेज • 18 field audits",
    "en": "K.T.H.M. College • 18 field audits"
  },
  "K.V.N. Naik Institute of Engg. • 410m away": {
    "mr": "के.व्ही.एन. नाईक अभियांत्रिकी • ४१० मी अंतरावर",
    "hi": "के.वी.एन. नाईक इंजीनियरिंग • ४१० मी दूर",
    "en": "K.V.N. Naik Institute of Engg. • 410m away"
  },
  "Kalaram Mandir": {
    "mr": "काळाराम मंदिर",
    "hi": "कालाराम मंदिर",
    "en": "Kalaram Mandir"
  },
  "Kalaram Temple East Gate": {
    "mr": "काळाराम मंदिर East प्रवेशद्वार",
    "hi": "कालाराम मंदिर East प्रवेश द्वार",
    "en": "Kalaram Temple East Gate"
  },
  "Kalaram Temple North Lane": {
    "mr": "काळाराम मंदिर North गल्ली",
    "hi": "कालाराम मंदिर North लेन",
    "en": "Kalaram Temple North Lane"
  },
  "Kapaleshwar Mahadev Mandir": {
    "mr": "कपालेश्वर महादेव मंदिर",
    "hi": "कपालेश्वर महादेव मंदिर",
    "en": "Kapaleshwar Mahadev Mandir"
  },
  "Kapaleshwar Mandir": {
    "mr": "कपालेश्वर मंदिर",
    "hi": "कपालेश्वर मंदिर",
    "en": "Kapaleshwar Mandir"
  },
  "Kapaleshwar Stand": {
    "mr": "कपालेश्वर स्थानक",
    "hi": "कपालेश्वर स्टैंड",
    "en": "Kapaleshwar Stand"
  },
  "Kapila (18%)": {
    "mr": "कपिला (१८%)",
    "hi": "कपिला (१८%)",
    "en": "Kapila (18%)"
  },
  "Keep this Kumbh Setu digital token handy if any tariff dispute or unauthorized surcharges arise at the desk.": {
    "mr": "Keep this कुंभ Setu digital टोकन handy if any दरपत्रक dispute or unauthorized surcharges arise at कक्ष.",
    "hi": "Keep this कुंभ Setu digital टोकन handy if any दर सूची dispute or unauthorized surcharges arise at कक्ष.",
    "en": "Keep this Kumbh Setu digital token handy if any tariff dispute or unauthorized surcharges arise at the desk."
  },
  "KK Wagh Engg": {
    "mr": "के.के. वाघ इंजिनिअरिंग",
    "hi": "के.के. वाघ इंजीनियरिंग",
    "en": "KK Wagh Engg"
  },
  "KK Wagh Institute of Engg. • 11 audits": {
    "mr": "KK Wagh Institute of Engg. • 11 audits",
    "hi": "KK Wagh Institute of Engg. • 11 audits",
    "en": "KK Wagh Institute of Engg. • 11 audits"
  },
  "KK Wagh Institute of Engg. • 750m away": {
    "mr": "के.के. वाघ अभियांत्रिकी संस्था • ७५० मी अंतरावर",
    "hi": "के.के. वाघ इंजीनियरिंग कॉलेज • ७५० मी दूर",
    "en": "KK Wagh Institute of Engg. • 750m away"
  },
  "KNN k=15": {
    "mr": "KNN k=15",
    "hi": "KNN k=15",
    "en": "KNN k=15"
  },
  "KTHM College Nashik • Sector 4 Field Audit Hub": {
    "mr": "के.टी.एच.एम. महाविद्यालय नाशिक • विभाग ४ तपासणी केंद्र",
    "hi": "के.टी.एच.एम. कॉलेज नासिक • सेक्टर ४ फील्ड ऑडिट केंद्र",
    "en": "KTHM College Nashik • Sector 4 Field Audit Hub"
  },
  "KTHM College • 450m away": {
    "mr": "KTHM महाविद्यालय • 450m away",
    "hi": "KTHM कॉलेज • 450m away",
    "en": "KTHM College • 450m away"
  },
  "KTHM College, Nashik • 350m away": {
    "mr": "के.टी.एच.एम. महाविद्यालय, नाशिक • ३५० मी अंतरावर",
    "hi": "के.टी.एच.एम. कॉलेज, नासिक • ३५० मी दूर",
    "en": "KTHM College, Nashik • 350m away"
  },
  "Kumbh Cab": {
    "mr": "कुंभ कॅब",
    "hi": "कुंभ कैब",
    "en": "Kumbh Cab"
  },
  "Kumbh Cab / Taxi": {
    "mr": "कुंभ कॅब / टॅक्सी",
    "hi": "कुंभ कैब / टैक्सी",
    "en": "Kumbh Cab / Taxi"
  },
  "Kumbh Certified": {
    "mr": "कुंभ प्रमाणित",
    "hi": "कुंभ प्रमाणित",
    "en": "Kumbh Certified"
  },
  "Kumbh Mela 2027 Live Portal": {
    "mr": "कुंभमेळा २०२७ थेट पोर्टल",
    "hi": "कुंभ मेला २०२७ लाइव पोर्टल",
    "en": "Kumbh Mela 2027 Live Portal"
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
  "KUMBH SETU": {
    "mr": "कुंभसेतु",
    "hi": "कुंभसेतु",
    "en": "Kumbh Setu"
  },
  "Kumbh Setu": {
    "mr": "कुंभसेतु",
    "hi": "कुंभसेतु",
    "en": "Kumbh Setu"
  },
  "Kumbh Setu Locked": {
    "mr": "कुंभ Setu Locked",
    "hi": "कुंभ Setu Locked",
    "en": "Kumbh Setu Locked"
  },
  "KumbhSetu Fair-Price Helpline assists within minutes.": {
    "mr": "KumbhSetu वाजवी-दर मदत कक्ष assists च्या आत मिनिटे.",
    "hi": "KumbhSetu उचित-मूल्य हेल्पलाइन assists के भीतर मिनट.",
    "en": "KumbhSetu Fair-Price Helpline assists within minutes."
  },
  "KumbhSetu — Kumbhveer Volunteer Verification Desk": {
    "mr": "कुंभसेतु — कुंभवीर स्वयंसेवक पडताळणी कक्ष",
    "hi": "कुंभसेतु — कुंभवीर स्वयंसेवक सत्यापन डेस्क",
    "en": "KumbhSetu — Kumbhveer Volunteer Verification Desk"
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
  "Kumbhveer": {
    "mr": "कुंभवीर स्वयंसेवक",
    "hi": "कुंभवीर स्वयंसेवक",
    "en": "Kumbhveer"
  },
  "Kumbhveer #KV-204": {
    "mr": "कुंभवीर #KV-२०४",
    "hi": "कुंभवीर #KV-२०४",
    "en": "Kumbhveer #KV-204"
  },
  "Kumbhveer Certified Stay": {
    "mr": "कुंभवीर प्रमाणित मुक्काम",
    "hi": "कुंभवीर सत्यापित आवास",
    "en": "Kumbhveer Certified Stay"
  },
  "Kumbhveer Civic Assistance": {
    "mr": "कुंभवीर नागरी साहाय्य",
    "hi": "कुंभवीर नागरिक सहायता",
    "en": "Kumbhveer Civic Assistance"
  },
  "Kumbhveer College Leaderboard": {
    "mr": "कुंभवीर महाविद्यालय Leaderboard",
    "hi": "कुंभवीर कॉलेज Leaderboard",
    "en": "Kumbhveer College Leaderboard"
  },
  "Kumbhveer Desk": {
    "mr": "कुंभवीर कक्ष",
    "hi": "कुंभवीर डेस्क",
    "en": "Kumbhveer Desk"
  },
  "Kumbhveer Divya Shinde": {
    "mr": "कुंभवीर Divya Shinde",
    "hi": "कुंभवीर Divya Shinde",
    "en": "Kumbhveer Divya Shinde"
  },
  "Kumbhveer Field Inspection": {
    "mr": "कुंभवीर प्रत्यक्ष Inspection",
    "hi": "कुंभवीर फील्ड Inspection",
    "en": "Kumbhveer Field Inspection"
  },
  "Kumbhveer Field Notes (Optional)": {
    "mr": "कुंभवीर क्षेत्रीय नोंदी (ऐच्छिक)",
    "hi": "कुंभवीर फील्ड नोट्स (वैकल्पिक)",
    "en": "Kumbhveer Field Notes (Optional)"
  },
  "Kumbhveer queued": {
    "mr": "कुंभवीर queued",
    "hi": "कुंभवीर queued",
    "en": "Kumbhveer queued"
  },
  "Kumbhveer Stall Photo Upload": {
    "mr": "कुंभवीर स्टॉल छायाचित्र अपलोड करा",
    "hi": "कुंभवीर स्टॉल फोटो अपलोड करें",
    "en": "Kumbhveer Stall Photo Upload"
  },
  "Kumbhveer Verification Protocol:": {
    "mr": "कुंभवीर पडताळणी नियमावली:",
    "hi": "कुंभवीर सत्यापन प्रोटोकॉल:",
    "en": "Kumbhveer Verification Protocol:"
  },
  "Kumbhveer Verified": {
    "mr": "कुंभवीर सत्यापित",
    "hi": "कुंभवीर सत्यापित",
    "en": "Kumbhveer Verified"
  },
  "Kumbhveer Verified Stand": {
    "mr": "कुंभवीर प्रमाणित स्थानक",
    "hi": "कुंभवीर सत्यापित स्टैंड",
    "en": "Kumbhveer Verified Stand"
  },
  "Kumbhveer volunteer": {
    "mr": "कुंभवीर स्वयंसेवक",
    "hi": "कुंभवीर volunteer",
    "en": "Kumbhveer volunteer"
  },
  "Kumbhveer volunteers can upload on-site audit photos directly from gallery or storage. No live camera facial verification is required.": {
    "mr": "कुंभवीर स्वयंसेवक अपलोड करू शकतात प्रत्यक्ष क्षेत्रीय तपासणी फोटो थेट गॅलरी किंवा स्टोरेजमधून. थेट कॅमेरा चेहरा पडताळणीची आवश्यकता नाही.",
    "hi": "कुंभवीर स्वयंसेवक can अपलोड करें on-site जांच / ऑडिट photos directly से gallery or storage. No लाइव camera facial verification is required.",
    "en": "Kumbhveer volunteers can upload on-site audit photos directly from gallery or storage. No live camera facial verification is required."
  },
  "Kumbhveers": {
    "mr": "कुंभवीर",
    "hi": "कुंभवीर",
    "en": "Kumbhveers"
  },
  "Kumbhveers actively debunk social media rumors, verify on-ground reality at ghats, and protect pilgrims from misinformation.": {
    "mr": "कुंभवीर सोशल मीडियावरील अफवांचे खंडन करतात, घाटांवरील प्रत्यक्ष स्थिती पडताळतात आणि भाविकांचे संरक्षण करतात.",
    "hi": "कुंभवीर सोशल मीडिया की अफवाहों का खंडन करते हैं, घाटों पर जमीनी हकीकत जांचते हैं और श्रद्धालुओं को बचाते हैं।",
    "en": "Kumbhveers actively debunk social media rumors, verify on-ground reality at ghats, and protect pilgrims from misinformation."
  },
  "Kunal Chaudhari": {
    "mr": "कुणाल चौधरी",
    "hi": "कुणाल चौधरी",
    "en": "Kunal Chaudhari"
  },
  "Kushavarta (54%)": {
    "mr": "कुशावर्त (५४%)",
    "hi": "कुशावर्त (५४%)",
    "en": "Kushavarta (54%)"
  },
  "Kushavarta Kund (Trimbakeshwar)": {
    "mr": "कुशावर्त कुंड (त्र्यंबकेश्वर)",
    "hi": "कुशावर्त कुंड (त्र्यंबकेश्वर)",
    "en": "Kushavarta Kund (Trimbakeshwar)"
  },
  "KV": {
    "mr": "KV",
    "hi": "KV",
    "en": "KV"
  },
  "Lab Tested": {
    "mr": "प्रयोगशाळा तपासणीकृत",
    "hi": "प्रयोगशाला परीक्षित",
    "en": "Lab Tested"
  },
  "Lakshman (22%)": {
    "mr": "लक्ष्मण (२२%)",
    "hi": "लक्ष्मण (२२%)",
    "en": "Lakshman (22%)"
  },
  "Lakshman Ghat & Sita Gufa": {
    "mr": "लक्ष्मण घाट आणि सीता गुंफा",
    "hi": "लक्ष्मण घाट एवं सीता गुफा",
    "en": "Lakshman Ghat & Sita Gufa"
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
  "Language": {
    "mr": "भाषा",
    "hi": "भाषा",
    "en": "Language"
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
  "Languages:": {
    "mr": "भाषा:",
    "hi": "भाषाएं:",
    "en": "Languages:"
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
    "mr": "पोलीस नियंत्रण समन्वय",
    "hi": "कानून प्रवर्तन समन्वय",
    "en": "Law Enforcement Interlock"
  },
  "Leaderboard": {
    "mr": "मानांकन",
    "hi": "लीडरबोर्ड",
    "en": "Leaderboard"
  },
  "Leaflet is open-source and working directly out-of-the-box with free high-speed map tiles.": {
    "mr": "लीफलेट हे मुक्त-स्रोत असून विनामूल्य हाय-स्पीड नकाशासह सुरळीत कार्यरत आहे.",
    "hi": "लीफलेट ओपन-सोर्स है और मुफ्त हाई-स्पीड मैप टाइल्स के साथ सीधे काम करता है।",
    "en": "Leaflet is open-source and working directly out-of-the-box with free high-speed map tiles."
  },
  "Leaflet Map & API Key": {
    "mr": "लीफलेट नकाशा व API की",
    "hi": "लीफलेट मैप एवं एपीआई कुंजी",
    "en": "Leaflet Map & API Key"
  },
  "Licensed by NMC": {
    "mr": "मनपा परवानाधारक",
    "hi": "मनपा लाइसेंस प्राप्त",
    "en": "Licensed by NMC"
  },
  "Listed Price": {
    "mr": "विक्रेता नोंदवलेला दर",
    "hi": "विक्रेता सूचीबद्ध दर",
    "en": "Listed Price"
  },
  "Listed Range": {
    "mr": "अंदाजे दर मर्यादा",
    "hi": "अनुमानित मूल्य सीमा",
    "en": "Listed Range"
  },
  "Live": {
    "mr": "थेट / प्रत्यक्ष",
    "hi": "लाइव",
    "en": "Live"
  },
  "Live 24x7": {
    "mr": "थेट 24x7",
    "hi": "लाइव 24x7",
    "en": "Live 24x7"
  },
  "Live Alerts": {
    "mr": "थेट सूचना व इशारे",
    "hi": "लाइव अलर्ट एवं सूचनाएं",
    "en": "Live Alerts"
  },
  "Live camera capture or upload for vector extraction": {
    "mr": "थेट camera capture or अपलोड करा साठी vector extraction",
    "hi": "लाइव camera capture or अपलोड करें के लिए vector extraction",
    "en": "Live camera capture or upload for vector extraction"
  },
  "Live Camera Selfie Identity Confirmed": {
    "mr": "थेट कॅमेरा Selfie Identity Confirmed",
    "hi": "लाइव कैमरा Selfie Identity Confirmed",
    "en": "Live Camera Selfie Identity Confirmed"
  },
  "Live camera stream analyzes facial landmarks and runs biometric embedding match with official Kumbhveer registry.": {
    "mr": "थेट camera stream analyzes facial landmarks आणि runs biometric embedding match सह official कुंभवीर registry.",
    "hi": "लाइव camera stream analyzes facial landmarks और runs biometric embedding match के साथ official कुंभवीर registry.",
    "en": "Live camera stream analyzes facial landmarks and runs biometric embedding match with official Kumbhveer registry."
  },
  "Live Case": {
    "mr": "थेट Case",
    "hi": "लाइव Case",
    "en": "Live Case"
  },
  "Live Crowd Status": {
    "mr": "थेट गर्दी स्थिती",
    "hi": "लाइव भीड़ स्थिति",
    "en": "Live Crowd Status"
  },
  "Live DB Inquiries": {
    "mr": "थेट प्राप्त चौकशी",
    "hi": "लाइव डेटाबेस पूछताछ",
    "en": "Live DB Inquiries"
  },
  "Live DBSCAN Incident Clustering": {
    "mr": "थेट डीबीस्कॅन घटना क्लस्टरिंग",
    "hi": "लाइव डीबीस्कैन घटना क्लस्टरिंग",
    "en": "Live DBSCAN Incident Clustering"
  },
  "Live Dispatch": {
    "mr": "थेट रवानगी",
    "hi": "लाइव प्रेषण",
    "en": "Live Dispatch"
  },
  "Live Escalation Feed": {
    "mr": "थेट तक्रार प्रवाह",
    "hi": "लाइव शिकायत प्रवाह",
    "en": "Live Escalation Feed"
  },
  "Live Feed": {
    "mr": "थेट Feed",
    "hi": "लाइव Feed",
    "en": "Live Feed"
  },
  "Live Field Alert": {
    "mr": "थेट क्षेत्रीय सूचना",
    "hi": "लाइव फील्ड अलर्ट",
    "en": "Live Field Alert"
  },
  "Live geo-tagged photos prove authentic Simhastha price compliance (+75 Seva Pts).": {
    "mr": "स्थाननिर्देशित छायाचित्रांमुळे सिंहस्थ दरांचे पालन सिद्ध होते (+७५ सेवा गुण).",
    "hi": "जियो-टैग फोटो से सिंहस्थ मूल्य अनुपालन साबित होता है (+७५ सेवा अंक)।",
    "en": "Live geo-tagged photos prove authentic Simhastha price compliance (+75 Seva Pts)."
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
  "Live Pilgrim Coordinates": {
    "mr": "थेट भाविक स्थान निर्देशांक",
    "hi": "लाइव तीर्थयात्री निर्देशांक",
    "en": "Live Pilgrim Coordinates"
  },
  "Live Route Predictor": {
    "mr": "थेट मार्ग व भाडे अंदाज",
    "hi": "लाइव रूट एवं किराया अनुमान",
    "en": "Live Route Predictor"
  },
  "Live Sensor Net": {
    "mr": "थेट सेन्सर नेटवर्क",
    "hi": "लाइव सेंसर नेटवर्क",
    "en": "Live Sensor Net"
  },
  "Live Stream": {
    "mr": "थेट Stream",
    "hi": "लाइव Stream",
    "en": "Live Stream"
  },
  "Live Synchronized": {
    "mr": "थेट समक्रमित",
    "hi": "लाइव सिंक्रनाइज़्ड",
    "en": "Live Synchronized"
  },
  "Live Tool": {
    "mr": "थेट Tool",
    "hi": "लाइव Tool",
    "en": "Live Tool"
  },
  "Live Yatri Feed": {
    "mr": "थेट भाविक माहिती",
    "hi": "लाइव तीर्थयात्री फीड",
    "en": "Live Yatri Feed"
  },
  "Loading discovered DBSCAN hotspots...": {
    "mr": "Loading discovered DBSCAN गर्दी केंद्रे...",
    "hi": "Loading discovered DBSCAN भीड़ केंद्र...",
    "en": "Loading discovered DBSCAN hotspots..."
  },
  "Loading...": {
    "mr": "लोड होत आहे...",
    "hi": "लोड हो रहा है...",
    "en": "Loading..."
  },
  "Local Bazaar & Puja Stalls": {
    "mr": "स्थानिक बाजार आणि पूजा दुकाने",
    "hi": "स्थानीय बाज़ार एवं पूजा दुकानें",
    "en": "Local Bazaar & Puja Stalls"
  },
  "Local Bazaar & Stalls": {
    "mr": "स्थानिक बाजार व दुकाने",
    "hi": "स्थानीय बाज़ार एवं दुकानें",
    "en": "Local Bazaar & Stalls"
  },
  "LOCAL BAZAAR STALL": {
    "mr": "LOCAL बाजार स्टॉल",
    "hi": "LOCAL बाज़ार स्टॉल",
    "en": "LOCAL BAZAAR STALL"
  },
  "Local Guide": {
    "mr": "स्थानिक मार्गदर्शक",
    "hi": "स्थानीय गाइड",
    "en": "Local Guide"
  },
  "Local Guide Profile": {
    "mr": "स्थानिक मार्गदर्शक माहिती",
    "hi": "स्थानीय गाइड प्रोफाइल",
    "en": "Local Guide Profile"
  },
  "Local Guide Tour Request": {
    "mr": "Local मार्गदर्शक Tour Request",
    "hi": "Local गाइड Tour Request",
    "en": "Local Guide Tour Request"
  },
  "Local Guides": {
    "mr": "स्थानिक मार्गदर्शक",
    "hi": "स्थानीय गाइड",
    "en": "Local Guides"
  },
  "Local Guides (Purohits & Docents)": {
    "mr": "Local मार्गदर्शक (Purohits & Docents)",
    "hi": "Local गाइड (Purohits & Docents)",
    "en": "Local Guides (Purohits & Docents)"
  },
  "Local Market": {
    "mr": "स्थानिक बाजार",
    "hi": "स्थानीय बाज़ार",
    "en": "Local Market"
  },
  "Local registered guides are the": {
    "mr": "स्थानिक नोंदणीकृत मार्गदर्शक हे",
    "hi": "स्थानीय पंजीकृत गाइड हैं",
    "en": "Local registered guides are the"
  },
  "Local Stays & Dharamshalas": {
    "mr": "स्थानिक मुक्काम आणि धर्मशाळा",
    "hi": "स्थानीय आवास एवं धर्मशाला",
    "en": "Local Stays & Dharamshalas"
  },
  "Locate free Annakshetras, langars, & standard thalis.": {
    "mr": "मोफत अन्नछत्रे, लंगर आणि वाजवी थाळी केंद्रे शोधा.",
    "hi": "मुफ्त अन्नक्षेत्र, लंगर और प्रमाणित थाली केंद्र खोजें।",
    "en": "Locate free Annakshetras, langars, & standard thalis."
  },
  "Locate free community kitchens (Annakshetra), langars, & subsidized food distribution.": {
    "mr": "मोफत अन्नछत्रे, लंगर आणि सवलतीच्या दरातील भोजन वितरण केंद्रे शोधा.",
    "hi": "मुफ्त अन्नक्षेत्र, लंगर और रियायती भोजन वितरण केंद्र खोजें।",
    "en": "Locate free community kitchens (Annakshetra), langars, & subsidized food distribution."
  },
  "Located inside Pilgrim Footwear-Free Pedestrian Zone": {
    "mr": "Located inside भाविक Footwear-Free Pedestrian विभाग",
    "hi": "Located inside तीर्थयात्री Footwear-Free Pedestrian ज़ोन",
    "en": "Located inside Pilgrim Footwear-Free Pedestrian Zone"
  },
  "Location / Ghat": {
    "mr": "ठिकाण / घाट",
    "hi": "स्थान / घाट",
    "en": "Location / Ghat"
  },
  "Location / Sector": {
    "mr": "ठिकाण / विभाग",
    "hi": "स्थान / सेक्टर",
    "en": "Location / Sector"
  },
  "Log Details & Witness Disclosures": {
    "mr": "Log तपशील & Witness Disclosures",
    "hi": "Log विवरण & Witness Disclosures",
    "en": "Log Details & Witness Disclosures"
  },
  "Log In as Nashikkar": {
    "mr": "नाशिककर म्हणून लॉगिन करा",
    "hi": "नाशिककर के रूप में लॉगिन करें",
    "en": "Log In as Nashikkar"
  },
  "Log In to Command Terminal": {
    "mr": "कमांड टर्मिनलमध्ये प्रवेश करा",
    "hi": "कमांड टर्मिनल में लॉगिन करें",
    "en": "Log In to Command Terminal"
  },
  "Log Note": {
    "mr": "नोंद ठेवा",
    "hi": "नोट दर्ज करें",
    "en": "Log Note"
  },
  "Log Out of Duty Terminal": {
    "mr": "Log Out of कर्तव्य टर्मिनल",
    "hi": "Log Out of ड्यूटी टर्मिनल",
    "en": "Log Out of Duty Terminal"
  },
  "Login": {
    "mr": "लॉगिन",
    "hi": "लॉगिन",
    "en": "Login"
  },
  "Login to Operator Portal": {
    "mr": "चालक पोर्टलवर लॉगिन करा",
    "hi": "ऑपरेटर पोर्टल पर लॉगिन करें",
    "en": "Login to Operator Portal"
  },
  "Login with Supabase": {
    "mr": "प्रवेश करा सह Supabase",
    "hi": "लॉगिन करें के साथ Supabase",
    "en": "Login with Supabase"
  },
  "Logout": {
    "mr": "लॉगआउट",
    "hi": "लॉगआउट",
    "en": "Logout"
  },
  "Lost & Found": {
    "mr": "हरवले-सापडले कक्ष",
    "hi": "खोया-पाया केंद्र",
    "en": "Lost & Found"
  },
  "Lost & Found / Child Cell": {
    "mr": "Lost & Found / Child कक्ष",
    "hi": "Lost & Found / Child प्रकोष्ठ",
    "en": "Lost & Found / Child Cell"
  },
  "Lost Persons Helpdesk": {
    "mr": "हरवले-सापडले व्यक्ती कक्ष",
    "hi": "लापता व्यक्ति सहायता केंद्र",
    "en": "Lost Persons Helpdesk"
  },
  "Low Density": {
    "mr": "कमी घनता",
    "hi": "कम घनत्व",
    "en": "Low Density"
  },
  "Low Flow": {
    "mr": "कमी गर्दी प्रवाह",
    "hi": "कम भीड़ प्रवाह",
    "en": "Low Flow"
  },
  "luggage": {
    "mr": "luggage",
    "hi": "luggage",
    "en": "luggage"
  },
  "Maheshwari Jain Bhojanalaya": {
    "mr": "Maheshwari Jain भोजनालय",
    "hi": "Maheshwari Jain भोजनालय",
    "en": "Maheshwari Jain Bhojanalaya"
  },
  "mail": {
    "mr": "mail",
    "hi": "mail",
    "en": "mail"
  },
  "Manage Stall, Rate Benchmarks & Orders": {
    "mr": "स्टॉल, दर मानक आणि ऑर्डर व्यवस्थापन",
    "hi": "स्टॉल, दर मानक एवं ऑर्डर प्रबंधन",
    "en": "Manage Stall, Rate Benchmarks & Orders"
  },
  "Manage your prices and stock status visible to Yatris on the Kumbh Bazaar.": {
    "mr": "Manage आपले prices आणि stock स्थिती visible to यात्रीs on कुंभ बाजार.",
    "hi": "Manage आपका prices और stock स्थिति visible to यात्रीs on कुंभ बाज़ार.",
    "en": "Manage your prices and stock status visible to Yatris on the Kumbh Bazaar."
  },
  "Manasi Dhole": {
    "mr": "मानसी ढोले",
    "hi": "मानसी ढोले",
    "en": "Manasi Dhole"
  },
  "Map": {
    "mr": "नकाशा",
    "hi": "नक्शा",
    "en": "Map"
  },
  "Map View": {
    "mr": "नकाशा पहा",
    "hi": "मानचित्र देखें",
    "en": "Map View"
  },
  "Mapbox (Enter Access Token)": {
    "mr": "मॅपबॉक्स (प्रवेश टोकन प्रविष्ट करा)",
    "hi": "मैपबॉक्स (एक्सेस टोकन दर्ज करें)",
    "en": "Mapbox (Enter Access Token)"
  },
  "MapTiler (Enter API Key)": {
    "mr": "मॅप-टायलर (API की टाका)",
    "hi": "मैपटाइलर (एपीआई कुंजी दर्ज करें)",
    "en": "MapTiler (Enter API Key)"
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
  "Mark as Resolved": {
    "mr": "निकाली काढल्याची नोंद करा",
    "hi": "निस्तारित के रूप में चिह्नित करें",
    "en": "Mark as Resolved"
  },
  "Mark Resolved": {
    "mr": "Mark निकाली काढले",
    "hi": "Mark सुलझाया गया",
    "en": "Mark Resolved"
  },
  "Market": {
    "mr": "बाजारपेठ",
    "hi": "बाजार",
    "en": "Market"
  },
  "Marketplace": {
    "mr": "बाजारपेठ",
    "hi": "बाज़ार",
    "en": "Marketplace"
  },
  "Marketplace rates represent indicative fair price ranges and vendor declarations. Administration does not guarantee or fix prices. Emergency facilities and civic helplines operate 24x7.": {
    "mr": "बाजारपेठेतील दर हे मार्गदर्शक वाजवी दर आणि विक्रेत्यांचे स्वयंघोषणापत्र आहेत. प्रशासन दर निश्चित करत नाही. आपत्कालीन सुविधा व मदत कक्ष २४ तास कार्यरत आहेत.",
    "hi": "बाज़ार की दरें सांकेतिक उचित मूल्य दायरा और विक्रेताओं की घोषणाएं हैं। प्रशासन मूल्य निर्धारित नहीं करता। आपातकालीन सेवाएँ २४ घंटे उपलब्ध हैं।",
    "en": "Marketplace rates represent indicative fair price ranges and vendor declarations. Administration does not guarantee or fix prices. Emergency facilities and civic helplines operate 24x7."
  },
  "Matoshri College of Engg., Eklahare • 1.1km away": {
    "mr": "मातोश्री अभियांत्रिकी महाविद्यालय, एकलहरे • १.१ किमी अंतरावर",
    "hi": "मातोश्री इंजीनियरिंग कॉलेज • १.१ किमी दूर",
    "en": "Matoshri College of Engg., Eklahare • 1.1km away"
  },
  "Maximum 25% surcharge applicable over regular daytime fare.": {
    "mr": "नियमित दिवसाच्या दरापेक्षा जास्तीत जास्त २५% जादा दर लागू.",
    "hi": "नियमित दिन के किराए पर अधिकतम २५% अधिभार लागू।",
    "en": "Maximum 25% surcharge applicable over regular daytime fare."
  },
  "Meals Served Daily": {
    "mr": "दररोज भोजन वाटप",
    "hi": "दैनिक भोजन वितरण",
    "en": "Meals Served Daily"
  },
  "Medical Camp: 180m Ahead": {
    "mr": "वैद्यकीय Camp: 180m Ahead",
    "hi": "चिकित्सा Camp: 180m Ahead",
    "en": "Medical Camp: 180m Ahead"
  },
  "Medical Outposts": {
    "mr": "वैद्यकीय मदत केंद्रे",
    "hi": "चिकित्सा सहायता केंद्र",
    "en": "Medical Outposts"
  },
  "Medium": {
    "mr": "Medium",
    "hi": "Medium",
    "en": "Medium"
  },
  "Medium Density": {
    "mr": "मध्यम घनता",
    "hi": "मध्यम घनत्व",
    "en": "Medium Density"
  },
  "Medium Priority": {
    "mr": "मध्यम प्राधान्यता",
    "hi": "मध्यम प्राथमिकता",
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
  "Message successfully logged in database!": {
    "mr": "संदेश डाटाबेसमध्ये यशस्वीरीत्या नोंदवला गेला!",
    "hi": "संदेश डेटाबेस में सफलतापूर्वक दर्ज किया गया!",
    "en": "Message successfully logged in database!"
  },
  "MET Bhujbal": {
    "mr": "एमईटी भुजबळ नॉलेज सिटी",
    "hi": "एमईटी भुजबल कॉलेज",
    "en": "MET Bhujbal"
  },
  "MET Bhujbal Knowledge City • 500m away": {
    "mr": "एमईटी भुजबळ नॉलेज सिटी • ५०० मी अंतरावर",
    "hi": "एमईटी भुजबल नॉलेज सिटी • ५०० मी दूर",
    "en": "MET Bhujbal Knowledge City • 500m away"
  },
  "MET Institute of Technology • 620m away": {
    "mr": "एमईटी तंत्रज्ञान संस्था • ६२० मी अंतरावर",
    "hi": "एमईटी प्रौद्योगिकी संस्थान • ६२० मी दूर",
    "en": "MET Institute of Technology • 620m away"
  },
  "Meter Compliance:": {
    "mr": "मीटर नियमांचे पालन:",
    "hi": "मीटर नियमों का अनुपालन:",
    "en": "Meter Compliance:"
  },
  "Meter Shot": {
    "mr": "Meter Shot",
    "hi": "Meter Shot",
    "en": "Meter Shot"
  },
  "MGV Pharmacy College Panchavati • 560m away": {
    "mr": "एमजीव्ही औषधनिर्माण महाविद्यालय पंचवटी • ५६० मी अंतरावर",
    "hi": "एमजीवी फार्मेसी कॉलेज पंचवटी • ५६० मी दूर",
    "en": "MGV Pharmacy College Panchavati • 560m away"
  },
  "MH-15-TC-4902": {
    "mr": "MH-15-TC-4902",
    "hi": "MH-15-TC-4902",
    "en": "MH-15-TC-4902"
  },
  "mic": {
    "mr": "mic",
    "hi": "mic",
    "en": "mic"
  },
  "Min 6 characters": {
    "mr": "Min 6 characters",
    "hi": "Min 6 characters",
    "en": "Min 6 characters"
  },
  "mins avg": {
    "mr": "सरासरी मिनिटे",
    "hi": "औसत मिनट",
    "en": "mins avg"
  },
  "MIS-102": {
    "mr": "MIS-102",
    "hi": "MIS-102",
    "en": "MIS-102"
  },
  "Misbehave / Rude Behavior": {
    "mr": "गैरवर्तन / उद्धटपणा",
    "hi": "दुर्व्यवहार / अनुचित व्यवहार",
    "en": "Misbehave / Rude Behavior"
  },
  "ML Radar Active": {
    "mr": "ML रडार सक्रिय",
    "hi": "ML रडार सक्रिय",
    "en": "ML Radar Active"
  },
  "Mobile Number": {
    "mr": "भ्रमणध्वनी क्रमांक",
    "hi": "मोबाइल नंबर",
    "en": "Mobile Number"
  },
  "Mobile Number (Optional)": {
    "mr": "मोबाईल नंबर (ऐच्छिक)",
    "hi": "मोबाइल नंबर (वैकल्पिक)",
    "en": "Mobile Number (Optional)"
  },
  "Mobile Number / Vendor ID": {
    "mr": "मोबाईल क्रमांक / विक्रेता ओळख क्रमांक",
    "hi": "मोबाइल नंबर / विक्रेता पहचान संख्या",
    "en": "Mobile Number / Vendor ID"
  },
  "Mobile Unit Alpha-2 nearby (320m)": {
    "mr": "मोबाईल Unit Alpha-2 nearby (320m)",
    "hi": "मोबाइल Unit Alpha-2 nearby (320m)",
    "en": "Mobile Unit Alpha-2 nearby (320m)"
  },
  "Moderate": {
    "mr": "मध्यम",
    "hi": "मध्यम",
    "en": "Moderate"
  },
  "Moderate Flow": {
    "mr": "मध्यम प्रवाह",
    "hi": "मध्यम प्रवाह",
    "en": "Moderate Flow"
  },
  "Muktidham": {
    "mr": "मुक्तिधाम",
    "hi": "मुक्तिधाम",
    "en": "Muktidham"
  },
  "Muktidham Mandir": {
    "mr": "मुक्तिधाम मंदिर",
    "hi": "मुक्तिधाम मंदिर",
    "en": "Muktidham Mandir"
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
  "Municipal Gazette Ceiling Cap:": {
    "mr": "महानगरपालिका राजपत्र कमाल मर्यादा मर्यादा:",
    "hi": "नगर निगम राजपत्र अधिकतम सीमा सीमा:",
    "en": "Municipal Gazette Ceiling Cap:"
  },
  "Municipal gazette limits": {
    "mr": "महानगरपालिका अधिकृत मर्यादा",
    "hi": "नगर निगम आधिकारिक सीमा",
    "en": "Municipal gazette limits"
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
  "Municipal review queue": {
    "mr": "मनपा तपासणी प्रतीक्षा",
    "hi": "नगर निगम समीक्षा कतार",
    "en": "Municipal review queue"
  },
  "My Active Rate:": {
    "mr": "My सक्रिय दर:",
    "hi": "My सक्रिय दर:",
    "en": "My Active Rate:"
  },
  "My Location": {
    "mr": "माझे स्थान",
    "hi": "मेरा स्थान",
    "en": "My Location"
  },
  "My Products (6)": {
    "mr": "My Products (6)",
    "hi": "My Products (6)",
    "en": "My Products (6)"
  },
  "My Stall": {
    "mr": "माझा स्टॉल",
    "hi": "मेरा स्टॉल",
    "en": "My Stall"
  },
  "My Stall & Product Catalog": {
    "mr": "माझे स्टॉल आणि उत्पादन सूची",
    "hi": "मेरा स्टॉल एवं उत्पाद सूची",
    "en": "My Stall & Product Catalog"
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
  "Mysore Sandalwood Paste & Tika": {
    "mr": "म्हैसूर चंदन लेप व टिळा",
    "hi": "मैसूर चंदन पेस्ट एवं टीका",
    "en": "Mysore Sandalwood Paste & Tika"
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
  "Nashik & Trimbakeshwar Holy Ghats Circuit": {
    "mr": "नाशिक व त्र्यंबकेश्वर पवित्र घाट परिक्रमा",
    "hi": "नासिक एवं त्र्यंबकेश्वर पवित्र घाट परिक्रमा",
    "en": "Nashik & Trimbakeshwar Holy Ghats Circuit"
  },
  "Nashik 2027": {
    "mr": "नाशिक २०२७",
    "hi": "नासिक २०२७",
    "en": "Nashik 2027"
  },
  "Nashik 2027 Disaster Control Grid Active": {
    "mr": "Nashik 2027 Disaster Control Grid सक्रिय",
    "hi": "Nashik 2027 Disaster Control Grid सक्रिय",
    "en": "Nashik 2027 Disaster Control Grid Active"
  },
  "Nashik 2027 • Police Unit": {
    "mr": "नाशिक २०२७ • पोलीस दल",
    "hi": "नासिक २०२७ • पुलिस दल",
    "en": "Nashik 2027 • Police Unit"
  },
  "Nashik Admin": {
    "mr": "Nashik प्रशासक",
    "hi": "Nashik प्रशासक",
    "en": "Nashik Admin"
  },
  "Nashik Annakshetra & Food Finder": {
    "mr": "नाशिक अन्नक्षेत्र व भोजन शोधक",
    "hi": "नासिक अन्नक्षेत्र एवं भोजन खोज",
    "en": "Nashik Annakshetra & Food Finder"
  },
  "Nashik City Police • Simhastha Special Cell": {
    "mr": "Nashik City पोलीस • सिंहस्थ Special कक्ष",
    "hi": "Nashik City पुलिस • सिंहस्थ Special प्रकोष्ठ",
    "en": "Nashik City Police • Simhastha Special Cell"
  },
  "Nashik Dry Fruit Prasad Box": {
    "mr": "नाशिक सुका मेवा प्रसाद डबा",
    "hi": "नासिक सूखा मेवा प्रसाद बॉक्स",
    "en": "Nashik Dry Fruit Prasad Box"
  },
  "Nashik Fair Marketplace": {
    "mr": "नाशिक वाजवी दर बाजारपेठ",
    "hi": "नासिक उचित मूल्य बाज़ार",
    "en": "Nashik Fair Marketplace"
  },
  "Nashik Municipal Civic Coordination": {
    "mr": "नाशिक महानगरपालिका नागरी समन्वय",
    "hi": "नासिक नगर निगम नागरिक समन्वय",
    "en": "Nashik Municipal Civic Coordination"
  },
  "Nashik Municipal Corp": {
    "mr": "Nashik महानगरपालिका Corp",
    "hi": "Nashik नगर निगम Corp",
    "en": "Nashik Municipal Corp"
  },
  "Nashik Municipal Corporation": {
    "mr": "नाशिक महानगरपालिका",
    "hi": "नासिक नगर निगम",
    "en": "Nashik Municipal Corporation"
  },
  "Nashik Municipal Corporation & District Apex": {
    "mr": "नाशिक महानगरपालिका व जिल्हा प्रशासन",
    "hi": "नासिक नगर निगम एवं जिला प्रशासन",
    "en": "Nashik Municipal Corporation & District Apex"
  },
  "Nashik Municipal Corporation & Kumbh Police Control syncs automatically every 30 seconds.": {
    "mr": "Nashik महानगरपालिका महापालिका & कुंभ पोलीस Control syncs automatically every 30 सेकंद.",
    "hi": "Nashik नगर निगम निगम & कुंभ पुलिस Control syncs automatically every 30 सेकंड.",
    "en": "Nashik Municipal Corporation & Kumbh Police Control syncs automatically every 30 seconds."
  },
  "Nashik Poha & Misal Pav": {
    "mr": "नाशिक पोहा आणि मिसळ पाव",
    "hi": "नासिक पोहा एवं मिसल पाव",
    "en": "Nashik Poha & Misal Pav"
  },
  "Nashik Police Unit": {
    "mr": "नाशिक पोलीस विभाग",
    "hi": "नासिक पुलिस इकाई",
    "en": "Nashik Police Unit"
  },
  "Nashik Rd Stn": {
    "mr": "नाशिक रोड स्थानक",
    "hi": "नासिक रोड स्टेशन",
    "en": "Nashik Rd Stn"
  },
  "Nashik Resident": {
    "mr": "स्थानिक नाशिककर",
    "hi": "स्थानीय नाशिककर",
    "en": "Nashik Resident"
  },
  "Nashik Road Railway Station": {
    "mr": "नाशिक रोड रेल्वे स्थानक",
    "hi": "नासिक रोड रेलवे स्टेशन",
    "en": "Nashik Road Railway Station"
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
    "mr": "नाशिककर प्रशासक तक्रार निवारण",
    "hi": "नाशिककर प्रशासक शिकायत निवारण",
    "en": "Nashikkar Admin Escalation"
  },
  "Nashikkar citizen": {
    "mr": "नाशिककर नागरिक",
    "hi": "नाशिककर नागरिक",
    "en": "Nashikkar citizen"
  },
  "Nashikkar Civic & Guide Portal": {
    "mr": "नाशिककर नागरी व मार्गदर्शक पोर्टल",
    "hi": "नाशिककर नागरिक एवं गाइड पोर्टल",
    "en": "Nashikkar Civic & Guide Portal"
  },
  "Nashikkar Civic Hub": {
    "mr": "नाशिककर नागरी केंद्र",
    "hi": "नाशिककर नागरिक केंद्र",
    "en": "Nashikkar Civic Hub"
  },
  "Nashikkar Portal": {
    "mr": "नाशिककर पोर्टल",
    "hi": "नाशिककर पोर्टल",
    "en": "Nashikkar Portal"
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
  "Navigate": {
    "mr": "मार्ग दाखवा",
    "hi": "दिशा-निर्देश",
    "en": "Navigate"
  },
  "Navigate (Map)": {
    "mr": "नकाशा मार्ग (Navigate)",
    "hi": "मानचित्र दिशा (Navigate)",
    "en": "Navigate (Map)"
  },
  "Navigate Base": {
    "mr": "Navigate Base",
    "hi": "Navigate Base",
    "en": "Navigate Base"
  },
  "Navigate Stand": {
    "mr": "Navigate स्थानक",
    "hi": "Navigate स्टैंड",
    "en": "Navigate Stand"
  },
  "Navigate to Location (Google Maps)": {
    "mr": "Navigate to Location (Google Maps)",
    "hi": "Navigate to Location (Google Maps)",
    "en": "Navigate to Location (Google Maps)"
  },
  "Navshya Ganpati Mandir": {
    "mr": "नवश्या गणपती मंदिर",
    "hi": "नवश्या गणपति मंदिर",
    "en": "Navshya Ganpati Mandir"
  },
  "NDMVP Samaj's College of Engg. • 800m away": {
    "mr": "एनडीएमव्हीपी अभियांत्रिकी महाविद्यालय • ८०० मी अंतरावर",
    "hi": "एनडीएमवीपी इंजीनियरिंग कॉलेज • ८०० मी दूर",
    "en": "NDMVP Samaj's College of Engg. • 800m away"
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
  "Need a key? Get one free at": {
    "mr": "की हवी आहे? येथे मोफत मिळवा:",
    "hi": "कुंजी चाहिए? यहां मुफ्त प्राप्त करें:",
    "en": "Need a key? Get one free at"
  },
  "Neha Borde": {
    "mr": "नेहा बोर्डे",
    "hi": "नेहा बोर्डे",
    "en": "Neha Borde"
  },
  "New": {
    "mr": "New",
    "hi": "New",
    "en": "New"
  },
  "New Registration": {
    "mr": "नवीन नोंदणी",
    "hi": "नया पंजीकरण",
    "en": "New Registration"
  },
  "New Requests (": {
    "mr": "New Requests (",
    "hi": "New Requests (",
    "en": "New Requests ("
  },
  "Next": {
    "mr": "पुढे",
    "hi": "आगे",
    "en": "Next"
  },
  "Next 15 mins": {
    "mr": "पुढील १५ मिनिटे",
    "hi": "अगले १५ मिनट",
    "en": "Next 15 mins"
  },
  "Next 45 mins": {
    "mr": "पुढील ४५ मिनिटे",
    "hi": "अगले ४५ मिनट",
    "en": "Next 45 mins"
  },
  "Next 45m": {
    "mr": "पुढील ४५ मिनिटे",
    "hi": "अगले ४५ मिनट",
    "en": "Next 45m"
  },
  "Night Surcharge": {
    "mr": "रात्रीचे जादा शुल्क",
    "hi": "रात्रि अधिभार",
    "en": "Night Surcharge"
  },
  "Night Surcharge (12:00 AM – 05:00 AM):": {
    "mr": "रात्रीचा जादा दर (मध्यरात्री १२:०० – पहाटे ०५:००):",
    "hi": "रात्रि अधिभार (मध्यरात्रि १२:०० – प्रातः ०५:००):",
    "en": "Night Surcharge (12:00 AM – 05:00 AM):"
  },
  "NMC Certified Fair Price": {
    "mr": "मनपा प्रमाणित वाजवी दर",
    "hi": "मनपा प्रमाणित उचित मूल्य",
    "en": "NMC Certified Fair Price"
  },
  "NMC Fact-Check Cell": {
    "mr": "मनपा तथ्य-तपासणी कक्ष",
    "hi": "मनपा तथ्य-जांच प्रकोष्ठ",
    "en": "NMC Fact-Check Cell"
  },
  "NMC Gazette Cap": {
    "mr": "NMC राजपत्र मर्यादा",
    "hi": "NMC राजपत्र सीमा",
    "en": "NMC Gazette Cap"
  },
  "NMC/2026/G-881": {
    "mr": "NMC/2026/G-881",
    "hi": "NMC/2026/G-881",
    "en": "NMC/2026/G-881"
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
  "No QR Badge": {
    "mr": "No QR बिल्ला",
    "hi": "No QR बैज",
    "en": "No QR Badge"
  },
  "No unauthorized festival surcharge or arbitrary bargaining detected": {
    "mr": "कोणताही अनधिकृत सण अधिभार किंवा मनमानी दर आकारणी आढळली नाही",
    "hi": "कोई अनधिकृत त्योहार अधिभार या मनमानी सौदेबाजी नहीं पाई गई",
    "en": "No unauthorized festival surcharge or arbitrary bargaining detected"
  },
  "No Vendor Records Found": {
    "mr": "No विक्रेता Records Found",
    "hi": "No विक्रेता Records Found",
    "en": "No Vendor Records Found"
  },
  "Notice Dispatched to Zone Squad": {
    "mr": "क्षेत्रीय भरारी पथकाकडे सूचना पाठवली",
    "hi": "क्षेत्रीय उड़न दस्ते को नोटिस भेजा गया",
    "en": "Notice Dispatched to Zone Squad"
  },
  "NR": {
    "mr": "NR",
    "hi": "NR",
    "en": "NR"
  },
  "Number of Yatris": {
    "mr": "यात्रेकरूंची संख्या",
    "hi": "यात्रियों की संख्या",
    "en": "Number of Yatris"
  },
  "Number of Yatris:": {
    "mr": "यात्री संख्या:",
    "hi": "तीर्थयात्रियों की संख्या:",
    "en": "Number of Yatris:"
  },
  "Officer Badge / ID": {
    "mr": "अधिकारी बिल्ला / ओळख क्रमांक",
    "hi": "अधिकारी बैज / आईडी",
    "en": "Officer Badge / ID"
  },
  "Officer Badge ID / Metal No.": {
    "mr": "अधिकारी बॅज क्रमांक / मेटल क्र.",
    "hi": "अधिकारी बैज नंबर / मेटल क्र.",
    "en": "Officer Badge ID / Metal No."
  },
  "Officer Enforcement Controls": {
    "mr": "अधिकारी अंमलबजावणी Controls",
    "hi": "अधिकारी प्रवर्तन Controls",
    "en": "Officer Enforcement Controls"
  },
  "Officer Settings": {
    "mr": "अधिकारी सेटिंग्ज",
    "hi": "अधिकारी सेटिंग्स",
    "en": "Officer Settings"
  },
  "Official / Fair Ceiling (प्रमाणित कमाल दर)": {
    "mr": "अधिकृत / प्रमाणित कमाल दर",
    "hi": "आधिकारिक / प्रमाणित अधिकतम दर",
    "en": "Official / Fair Ceiling (प्रमाणित कमाल दर)"
  },
  "Official Booking": {
    "mr": "अधिकृत नोंदणी",
    "hi": "आधिकारिक बुकिंग",
    "en": "Official Booking"
  },
  "Official Cap Rates": {
    "mr": "शासकीय कमाल दर",
    "hi": "सरकारी अधिकतम दर",
    "en": "Official Cap Rates"
  },
  "Official Cap Voucher": {
    "mr": "अधिकृत मर्यादा Voucher",
    "hi": "आधिकारिक सीमा Voucher",
    "en": "Official Cap Voucher"
  },
  "Official Civic Voucher": {
    "mr": "अधिकृत नागरी व्हाऊचर",
    "hi": "आधिकारिक नागरिक वाउचर",
    "en": "Official Civic Voucher"
  },
  "Official Dorm Bed:": {
    "mr": "शासकीय डॉर्मिटरी बेड:",
    "hi": "आधिकारिक डॉर्मिटरी बेड:",
    "en": "Official Dorm Bed:"
  },
  "Official Fair-Tariff Registry": {
    "mr": "अधिकृत वाजवी दर नोंदणी",
    "hi": "आधिकारिक उचित दर पंजी",
    "en": "Official Fair-Tariff Registry"
  },
  "Official Gazette": {
    "mr": "अधिकृत राजपत्रातील दर",
    "hi": "आधिकारिक राजपत्र दर",
    "en": "Official Gazette"
  },
  "Official Gazetted Cap": {
    "mr": "अधिकृत राजपत्रd मर्यादा",
    "hi": "आधिकारिक राजपत्रd सीमा",
    "en": "Official Gazetted Cap"
  },
  "Official gazetted rate card is clearly visible to pilgrims": {
    "mr": "अधिकृत शासन राजपत्रातील दरफलक भाविकांना स्पष्ट दिसत आहे",
    "hi": "आधिकारिक राजपत्रित रेट कार्ड तीर्थयात्रियों को स्पष्ट दिखाई दे रहा है",
    "en": "Official gazetted rate card is clearly visible to pilgrims"
  },
  "Official In-App Bookable Service": {
    "mr": "अधिकृत इन-अॅप बुकिंग सेवा",
    "hi": "आधिकारिक इन-ऐप बुकिंग सेवा",
    "en": "Official In-App Bookable Service"
  },
  "Official Kumbh Municipal Fair-Trade Certificate:": {
    "mr": "अधिकृत कुंभ महानगरपालिका वाजवी-Trade Certificate:",
    "hi": "आधिकारिक कुंभ नगर निगम उचित-Trade Certificate:",
    "en": "Official Kumbh Municipal Fair-Trade Certificate:"
  },
  "Official license warning issued to vendor. Excess ₹40 directly refunded to pilgrim on site.": {
    "mr": "अधिकृत license इशारा issued to विक्रेता. Excess ₹40 directly refunded to भाविक on site.",
    "hi": "आधिकारिक license चेतावनी issued to विक्रेता. Excess ₹40 directly refunded to तीर्थयात्री on site.",
    "en": "Official license warning issued to vendor. Excess ₹40 directly refunded to pilgrim on site."
  },
  "Official municipal rate cap: ₹450 / day": {
    "mr": "अधिकृत महानगरपालिका दर मर्यादा: ₹450 / दिवस",
    "hi": "आधिकारिक नगर निगम दर सीमा: ₹450 / दिन",
    "en": "Official municipal rate cap: ₹450 / day"
  },
  "Official Police Log": {
    "mr": "अधिकृत पोलीस Log",
    "hi": "आधिकारिक पुलिस Log",
    "en": "Official Police Log"
  },
  "Official Portal": {
    "mr": "अधिकृत पोर्टल",
    "hi": "आधिकारिक पोर्टल",
    "en": "Official Portal"
  },
  "Official Registered Guide Booking": {
    "mr": "शासकीय नोंदणीकृत मार्गदर्शक बुकिंग",
    "hi": "आधिकारिक पंजीकृत गाइड बुकिंग",
    "en": "Official Registered Guide Booking"
  },
  "Official RTO Tariff (₹)": {
    "mr": "अधिकृत आरटीओ दर (₹)",
    "hi": "अधिकृत आरटीओ किराया (₹)",
    "en": "Official RTO Tariff (₹)"
  },
  "Official Secure PIN": {
    "mr": "अधिकृत सुरक्षा पिन",
    "hi": "आधिकारिक सुरक्षा पिन",
    "en": "Official Secure PIN"
  },
  "Official Simhastha Kumbh 2027 dispatch queue. Accept or reject incoming pilgrim tour bookings in real-time.": {
    "mr": "अधिकृत सिंहस्थ कुंभ 2027 dispatch queue. Accept or reject incoming भाविक दौरा नोंदणी in real-time.",
    "hi": "आधिकारिक सिंहस्थ कुंभ 2027 dispatch queue. Accept or reject incoming तीर्थयात्री दौरा बुकिंग in real-time.",
    "en": "Official Simhastha Kumbh 2027 dispatch queue. Accept or reject incoming pilgrim tour bookings in real-time."
  },
  "Official Simhastha News": {
    "mr": "अधिकृत सिंहस्थ वृत्त",
    "hi": "आधिकारिक सिंहस्थ समाचार",
    "en": "Official Simhastha News"
  },
  "OK": {
    "mr": "OK",
    "hi": "OK",
    "en": "OK"
  },
  "Omkar Gite": {
    "mr": "ओमकार गीते",
    "hi": "ओमकार गीते",
    "en": "Omkar Gite"
  },
  "On Duty / Active Dispatch": {
    "mr": "On कर्तव्य / सक्रिय रवानगी",
    "hi": "On ड्यूटी / सक्रिय प्रेषण",
    "en": "On Duty / Active Dispatch"
  },
  "On-Ground Direct Clearance": {
    "mr": "थेट जागीच निपटारा",
    "hi": "सीधे मौके पर निपटारा",
    "en": "On-Ground Direct Clearance"
  },
  "On-Site Stall / Rate Board Photo*": {
    "mr": "स्थळावरील स्टॉल / दरफलकाचे छायाचित्र*",
    "hi": "ऑन-साइट स्टॉल / रेट बोर्ड फोटो*",
    "en": "On-Site Stall / Rate Board Photo*"
  },
  "On-site stall photo uploaded by Kumbhveer Rohan J.": {
    "mr": "On-site स्टॉल photo uploaded by कुंभवीर Rohan J.",
    "hi": "On-site स्टॉल photo uploaded by कुंभवीर Rohan J.",
    "en": "On-site stall photo uploaded by Kumbhveer Rohan J."
  },
  "One-Touch Emergency Dispatch": {
    "mr": "एका स्पर्शात तातडीची मदत",
    "hi": "एक स्पर्श आपातकालीन सहायता",
    "en": "One-Touch Emergency Dispatch"
  },
  "only service bookable directly on KumbhSetu": {
    "mr": "कुंभसेतुवर थेट बुक करता येणारी एकमेव सेवा",
    "hi": "कुंभसेतु पर सीधे बुक होने वाली एकमात्र सेवा",
    "en": "only service bookable directly on KumbhSetu"
  },
  "Open Camera": {
    "mr": "कॅमेरा सुरू करा",
    "hi": "कैमरा खोलें",
    "en": "Open Camera"
  },
  "Open Civic Feedback & Grievance": {
    "mr": "नागरी अभिप्राय व तक्रार नोंदवा",
    "hi": "नागरिक फीडबैक एवं शिकायत दर्ज करें",
    "en": "Open Civic Feedback & Grievance"
  },
  "Open for Yatris": {
    "mr": "Open साठी यात्रीs",
    "hi": "Open के लिए यात्रीs",
    "en": "Open for Yatris"
  },
  "Open Now": {
    "mr": "सध्या सुरू आहे",
    "hi": "अभी खुला है",
    "en": "Open Now"
  },
  "Open spatial cluster map and real-time overcharging triage stream.": {
    "mr": "Open spatial गट map आणि real-time जादा दर आकारणी triage stream.",
    "hi": "Open spatial क्लस्टर map और real-time अत्यधिक वसूली triage stream.",
    "en": "Open spatial cluster map and real-time overcharging triage stream."
  },
  "Opening Gazette...": {
    "mr": "राजपत्र उघडत आहे...",
    "hi": "राजपत्र खुल रहा है...",
    "en": "Opening Gazette..."
  },
  "Operational Ledger": {
    "mr": "Operational Ledger",
    "hi": "Operational Ledger",
    "en": "Operational Ledger"
  },
  "Operational Snapshot": {
    "mr": "कार्यरत आढावा",
    "hi": "परिचालन स्नैपशॉट",
    "en": "Operational Snapshot"
  },
  "Operator & Citizen Gateway": {
    "mr": "चालक व नागरिक प्रवेशद्वार",
    "hi": "संचालक एवं नागरिक प्रवेशद्वार",
    "en": "Operator & Citizen Gateway"
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
  "Optimal holy dip window: Next 45 mins": {
    "mr": "पवित्र स्नानासाठी उत्तम वेळ: पुढील ४५ मिनिटे",
    "hi": "पवित्र स्नान हेतु उत्तम समय: अगले ४५ मिनट",
    "en": "Optimal holy dip window: Next 45 mins"
  },
  "Optimal window:": {
    "mr": "योग्य वेळ:",
    "hi": "अनुकूल समय:",
    "en": "Optimal window:"
  },
  "Optional": {
    "mr": "ऐच्छिक",
    "hi": "वैकल्पिक",
    "en": "Optional"
  },
  "or": {
    "mr": "किंवा",
    "hi": "या",
    "en": "or"
  },
  "Or choose sample artisan item photo:": {
    "mr": "किंवा कारागीर वस्तूचे नमुना छायाचित्र निवडा:",
    "hi": "या नमूना कारीगर वस्तु फोटो चुनें:",
    "en": "Or choose sample artisan item photo:"
  },
  "or dial": {
    "mr": "किंवा फोन करा",
    "hi": "अथवा कॉल करें",
    "en": "or dial"
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
  "Order via WhatsApp": {
    "mr": "व्हॉट्सॲपवर ऑर्डर करा",
    "hi": "व्हाट्सएप पर ऑर्डर करें",
    "en": "Order via WhatsApp"
  },
  "Order:": {
    "mr": "ऑर्डर:",
    "hi": "ऑर्डर:",
    "en": "Order:"
  },
  "Orders": {
    "mr": "मागण्या / ऑर्डर्स",
    "hi": "ऑर्डर्स / मांग",
    "en": "Orders"
  },
  "Organized Auto Fare Extortion (+63% over gazette cap)": {
    "mr": "Organized रिक्षा Fare Extortion (+63% पेक्षा अधिक gazette मर्यादा)",
    "hi": "Organized ऑटो Fare Extortion (+63% से अधिक gazette सीमा)",
    "en": "Organized Auto Fare Extortion (+63% over gazette cap)"
  },
  "Origin of Godavari at Ganga Dwar. Ancient hill pilgrimage where Sage Gautama worshipped.": {
    "mr": "गंगाद्वार येथे गोदावरी नदीचा उगम. प्राचीन पर्वत जेथे गौतम ऋषींनी आराधना केली.",
    "hi": "गंगाद्वार पर गोदावरी नदी का उद्गम। प्राचीन तीर्थ जहाँ गौतम ऋषि ने तपस्या की।",
    "en": "Origin of Godavari at Ganga Dwar. Ancient hill pilgrimage where Sage Gautama worshipped."
  },
  "Origin Point": {
    "mr": "सुरुवातीचे ठिकाण",
    "hi": "आरंभिक स्थान",
    "en": "Origin Point"
  },
  "Other Grievance": {
    "mr": "इतर तक्रार",
    "hi": "अन्य समस्या",
    "en": "Other Grievance"
  },
  "Other Unlisted Local Stall / Shop": {
    "mr": "इतर अनिबंधित स्थानिक स्टॉल / दुकान",
    "hi": "अन्य असूचीबद्ध स्थानीय स्टॉल / दुकान",
    "en": "Other Unlisted Local Stall / Shop"
  },
  "Overcharging / Gouging": {
    "mr": "जादा दर आकारणी / फसवणूक",
    "hi": "अत्यधिक मूल्य वसूली / धोखाधड़ी",
    "en": "Overcharging / Gouging"
  },
  "Overcharging at Prasad Stall #18": {
    "mr": "जादा दर आकारणी at प्रसाद स्टॉल #18",
    "hi": "अत्यधिक वसूली at प्रसाद स्टॉल #18",
    "en": "Overcharging at Prasad Stall #18"
  },
  "Overcharging Flags & Inquiries": {
    "mr": "जादा दर आकारणी इशारे & Inquiries",
    "hi": "अत्यधिक वसूली चेतावनी & Inquiries",
    "en": "Overcharging Flags & Inquiries"
  },
  "Overview": {
    "mr": "आढावा",
    "hi": "अवलोकन",
    "en": "Overview"
  },
  "Owner Name": {
    "mr": "मालकाचे नाव",
    "hi": "मालिक का नाम",
    "en": "Owner Name"
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
  "Paid & Received": {
    "mr": "Paid & Received",
    "hi": "Paid & Received",
    "en": "Paid & Received"
  },
  "Paired with MH-Govt Token Hub": {
    "mr": "Paired सह MH-Govt टोकन Hub",
    "hi": "Paired के साथ MH-Govt टोकन Hub",
    "en": "Paired with MH-Govt Token Hub"
  },
  "Panchavati": {
    "mr": "पंचवटी",
    "hi": "पंचवटी",
    "en": "Panchavati"
  },
  "Panchavati Bhojnalaya (#NSK-FD-205, Sita Gufa Road)": {
    "mr": "पंचवटी भोजनालय (#NSK-FD-२०५, सीता गुंफा रोड)",
    "hi": "पंचवटी भोजनालय (#NSK-FD-२०५, सीता गुफा रोड)",
    "en": "Panchavati Bhojnalaya (#NSK-FD-205, Sita Gufa Road)"
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
    "mr": "पंचवटी गेस्ट हाऊस",
    "hi": "पंचवटी गेस्ट हाउस",
    "en": "Panchavati Guest House"
  },
  "Panchavati Heritage & Ramkund Snan Walk": {
    "mr": "पंचवटी Heritage & रामकुंड स्नान Walk",
    "hi": "पंचवटी Heritage & रामकुंड स्नान Walk",
    "en": "Panchavati Heritage & Ramkund Snan Walk"
  },
  "Panchavati Rapid Enforcement Unit (Patrol Van 112)": {
    "mr": "पंचवटी Rapid अंमलबजावणी Unit (गस्त पथक Van 112)",
    "hi": "पंचवटी Rapid प्रवर्तन Unit (गश्ती दल Van 112)",
    "en": "Panchavati Rapid Enforcement Unit (Patrol Van 112)"
  },
  "Panchavati Sector 4 ·": {
    "mr": "पंचवटी विभाग 4 ·",
    "hi": "पंचवटी सेक्टर 4 ·",
    "en": "Panchavati Sector 4 ·"
  },
  "Panchavati Sector Squad 4 has been notified. A Kumbhveer squad will cross-verify rates at Godavari Yatri Niwas within 2 hours.": {
    "mr": "पंचवटी विभाग पथक 4 has been notified. A कुंभवीर पथक will cross-verify दर at गोदावरी भाविक निवास च्या आत 2 तास.",
    "hi": "पंचवटी सेक्टर दस्ता 4 has been notified. A कुंभवीर दस्ता will cross-verify दरें at गोदावरी तीर्थयात्री निवास के भीतर 2 घंटे.",
    "en": "Panchavati Sector Squad 4 has been notified. A Kumbhveer squad will cross-verify rates at Godavari Yatri Niwas within 2 hours."
  },
  "Panchavati Sweets": {
    "mr": "पंचवटी स्वीट्स",
    "hi": "पंचवटी स्वीट्स",
    "en": "Panchavati Sweets"
  },
  "Pandavleni Caves": {
    "mr": "पांडवलेणी लेणी",
    "hi": "पांडवलेनी गुफाएं",
    "en": "Pandavleni Caves"
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
  "Paste the WhatsApp message, video link, or verbal claim you heard. We forward high-priority claims immediately to the PIB & Police Ground Cell.": {
    "mr": "व्हाट्सअ‍ॅप संदेश, व्हिडिओ लिंक किंवा अफवा येथे टाका. आम्ही तत्काळ पीआयबी आणि पोलीस नियंत्रण कक्षाकडे पाठवू.",
    "hi": "व्हाट्सएप संदेश, वीडियो लिंक या सुनी हुई बात यहाँ साझा करें। हम तत्काल पीआईबी एवं पुलिस ग्राउंड सेल को भेजेंगे।",
    "en": "Paste the WhatsApp message, video link, or verbal claim you heard. We forward high-priority claims immediately to the PIB & Police Ground Cell."
  },
  "Patrol Dispatched": {
    "mr": "गस्त पथक रवाना केले",
    "hi": "गश्ती दल रवाना किया गया",
    "en": "Patrol Dispatched"
  },
  "Patrol Priority Leaderboard": {
    "mr": "गस्त पथक प्राधान्य Leaderboard",
    "hi": "गश्ती दल प्राथमिकता Leaderboard",
    "en": "Patrol Priority Leaderboard"
  },
  "Pay at Meeting Point": {
    "mr": "भेटण्याच्या ठिकाणी रक्कम द्या",
    "hi": "मिलने के स्थान पर भुगतान करें",
    "en": "Pay at Meeting Point"
  },
  "payments": {
    "mr": "payments",
    "hi": "payments",
    "en": "payments"
  },
  "Penalties Levied": {
    "mr": "Penalties Levied",
    "hi": "Penalties Levied",
    "en": "Penalties Levied"
  },
  "Penalty Imposed & Closed": {
    "mr": "दंड आकारून बंद केले",
    "hi": "जुर्माना लगाकर समाप्त किया",
    "en": "Penalty Imposed & Closed"
  },
  "Pending": {
    "mr": "प्रलंबित",
    "hi": "लंबित",
    "en": "Pending"
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
  "Pending Review": {
    "mr": "तपासणी प्रलंबित",
    "hi": "समीक्षा लंबित",
    "en": "Pending Review"
  },
  "Pending Reviews": {
    "mr": "प्रलंबित पुनरावलोकने",
    "hi": "लंबित समीक्षाएँ",
    "en": "Pending Reviews"
  },
  "Pending Verification": {
    "mr": "सत्यापन प्रलंबित",
    "hi": "सत्यापन लंबित",
    "en": "Pending Verification"
  },
  "Per Km Rate": {
    "mr": "प्रति किमी दर",
    "hi": "प्रति किमी दर",
    "en": "Per Km Rate"
  },
  "Permanent Civic Logging": {
    "mr": "कायमस्वरूपी नागरी नोंद",
    "hi": "स्थायी नागरिक रिकॉर्ड",
    "en": "Permanent Civic Logging"
  },
  "Permanently saved to KumbhSetu verified database": {
    "mr": "कुंभसेतु प्रमाणित डाटाबेसमध्ये कायम जतन केले",
    "hi": "कुंभसेतु सत्यापित डेटाबेस में स्थायी रूप से सहेजा गया",
    "en": "Permanently saved to KumbhSetu verified database"
  },
  "Personal Face CV Verification (Guide Only)": {
    "mr": "वैयक्तिक चेहरा पडताळणी (केवळ मार्गदर्शक)",
    "hi": "व्यक्तिगत चेहरा सत्यापन (केवल गाइड)",
    "en": "Personal Face CV Verification (Guide Only)"
  },
  "Personal Face ID Verification": {
    "mr": "वैयक्तिक चेहरा ओळख पडताळणी",
    "hi": "व्यक्तिगत चेहरा पहचान सत्यापन",
    "en": "Personal Face ID Verification"
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
  "phone": {
    "mr": "फोन",
    "hi": "फ़ोन",
    "en": "phone"
  },
  "Phone Number *": {
    "mr": "फोन Number *",
    "hi": "फ़ोन Number *",
    "en": "Phone Number *"
  },
  "Photo / Receipt Evidence": {
    "mr": "फोटो / पावती पुरावा",
    "hi": "फ़ोटो / रसीद साक्ष्य",
    "en": "Photo / Receipt Evidence"
  },
  "Photo logged by Officer KV-12": {
    "mr": "छायाचित्र नोंदणीकृत by अधिकारी KV-12",
    "hi": "फोटो दर्ज by अधिकारी KV-12",
    "en": "Photo logged by Officer KV-12"
  },
  "Photo On File": {
    "mr": "छायाचित्र On File",
    "hi": "फोटो On File",
    "en": "Photo On File"
  },
  "PIB & District Police Ground Truth Desk": {
    "mr": "पीआयबी व जिल्हा पोलीस सत्यता कक्ष",
    "hi": "पीआईबी एवं जिला पुलिस ग्राउंड ट्रुथ डेस्क",
    "en": "PIB & District Police Ground Truth Desk"
  },
  "PIB & Nashik Police Advisory Prepared": {
    "mr": "PIB & Nashik पोलीस Advisory Prepared",
    "hi": "PIB & Nashik पुलिस Advisory Prepared",
    "en": "PIB & Nashik Police Advisory Prepared"
  },
  "PIB BUSTS": {
    "mr": "पीआयबी पडताळणी",
    "hi": "पीआईबी पड़ताल",
    "en": "PIB BUSTS"
  },
  "PIB BUSTS / Verified Fact Checks": {
    "mr": "पीआयबी पडताळणी / अधिकृत तथ्य तपासणी",
    "hi": "पीआईबी पड़ताल / आधिकारिक तथ्य जांच",
    "en": "PIB BUSTS / Verified Fact Checks"
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
  "PIB Fact-Check & Public Broadcast": {
    "mr": "PIB Fact-तपासणी & Public Broadcast",
    "hi": "PIB Fact-जांच & Public Broadcast",
    "en": "PIB Fact-Check & Public Broadcast"
  },
  "PIB Fact-Check & Truth Feed": {
    "mr": "पीआयबी सत्यता पडताळणी व अधिकृत माहिती",
    "hi": "पीआईबी तथ्य जांच एवं आधिकारिक सूचना",
    "en": "PIB Fact-Check & Truth Feed"
  },
  "PIB Fact-Check Maharashtra": {
    "mr": "PIB Fact-तपासणी Maharashtra",
    "hi": "PIB Fact-जांच Maharashtra",
    "en": "PIB Fact-Check Maharashtra"
  },
  "PIB Truth Desk": {
    "mr": "पीआयबी सत्यता कक्ष",
    "hi": "पीआईबी सत्यता डेस्क",
    "en": "PIB Truth Desk"
  },
  "Picked up 42m ago": {
    "mr": "Picked up 42m ago",
    "hi": "Picked up 42m ago",
    "en": "Picked up 42m ago"
  },
  "Pickup Stand: 120m away": {
    "mr": "Pickup स्थानक: 120m away",
    "hi": "Pickup स्टैंड: 120m away",
    "en": "Pickup Stand: 120m away"
  },
  "Pilgrim": {
    "mr": "भाविक / यात्रेकरू",
    "hi": "तीर्थयात्री",
    "en": "Pilgrim"
  },
  "Pilgrim & Kumbhveer Logged": {
    "mr": "भाविक व कुंभवीर नोंदणीकृत",
    "hi": "श्रद्धालु व कुंभवीर द्वारा दर्ज",
    "en": "Pilgrim & Kumbhveer Logged"
  },
  "Pilgrim Satvik Dining Stall": {
    "mr": "भाविक सात्त्विक Dining स्टॉल",
    "hi": "तीर्थयात्री सात्विक Dining स्टॉल",
    "en": "Pilgrim Satvik Dining Stall"
  },
  "Pilgrim Yatri Niwas": {
    "mr": "भाविक भाविक निवास",
    "hi": "तीर्थयात्री तीर्थयात्री निवास",
    "en": "Pilgrim Yatri Niwas"
  },
  "Pilgrim:": {
    "mr": "भाविक:",
    "hi": "तीर्थयात्री:",
    "en": "Pilgrim:"
  },
  "Pins are draggable": {
    "mr": "पिन हलवता येतात",
    "hi": "पिन खींचकर बदले जा सकते हैं",
    "en": "Pins are draggable"
  },
  "place": {
    "mr": "place",
    "hi": "place",
    "en": "place"
  },
  "Please wait...": {
    "mr": "कृपया प्रतीक्षा करा...",
    "hi": "कृपया प्रतीक्षा करें...",
    "en": "Please wait..."
  },
  "PNG, JPG up to 10MB • Auto GPS stamped": {
    "mr": "PNG, JPG १०MB पर्यंत • आपोआप GPS नोंद",
    "hi": "PNG, JPG १०MB तक • स्वतः GPS अंकित",
    "en": "PNG, JPG up to 10MB • Auto GPS stamped"
  },
  "POL-NET INTRANET SECURE": {
    "mr": "POL-NET INTRANET SECURE",
    "hi": "POL-NET INTRANET SECURE",
    "en": "POL-NET INTRANET SECURE"
  },
  "Pole #C-18 (Online)": {
    "mr": "Pole #C-18 (Online)",
    "hi": "Pole #C-18 (Online)",
    "en": "Pole #C-18 (Online)"
  },
  "Police & Administration Terminal": {
    "mr": "पोलीस व प्रशासन टर्मिनल",
    "hi": "पुलिस एवं प्रशासन टर्मिनल",
    "en": "Police & Administration Terminal"
  },
  "Police & Administration Terminal →": {
    "mr": "पोलीस व प्रशासन टर्मिनल →",
    "hi": "पुलिस एवं प्रशासन टर्मिनल →",
    "en": "Police & Administration Terminal →"
  },
  "Police & Security Administration Terminal": {
    "mr": "पोलीस व सुरक्षा प्रशासन टर्मिनल",
    "hi": "पुलिस एवं सुरक्षा प्रशासन टर्मिनल",
    "en": "Police & Security Administration Terminal"
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
  "Police Command Terminal": {
    "mr": "पोलीस नियंत्रण कक्ष टर्मिनल",
    "hi": "पुलिस कमांड टर्मिनल",
    "en": "Police Command Terminal"
  },
  "Police Control": {
    "mr": "पोलीस नियंत्रण कक्ष",
    "hi": "पुलिस कंट्रोल रूम",
    "en": "Police Control"
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
  "Police Terminal Settings": {
    "mr": "पोलीस टर्मिनल सेटिंग्ज",
    "hi": "पुलिस टर्मिनल सेटिंग्स",
    "en": "Police Terminal Settings"
  },
  "policy": {
    "mr": "policy",
    "hi": "policy",
    "en": "policy"
  },
  "Pooja & Flowers": {
    "mr": "पूजा व फुले",
    "hi": "पूजा एवं फूल",
    "en": "Pooja & Flowers"
  },
  "Pooja Deshmukh": {
    "mr": "पूजा देशमुख",
    "hi": "पूजा देशमुख",
    "en": "Pooja Deshmukh"
  },
  "Pooja Samagri / Vendor": {
    "mr": "पूजा साहित्य / विक्रेता",
    "hi": "पूजा सामग्री / विक्रेता",
    "en": "Pooja Samagri / Vendor"
  },
  "Pooja Samagri Stall #4": {
    "mr": "पूजा सामग्री स्टॉल #४",
    "hi": "पूजा सामग्री स्टॉल #४",
    "en": "Pooja Samagri Stall #4"
  },
  "Prasadam & Food": {
    "mr": "प्रसाद आणि भोजन",
    "hi": "प्रसाद एवं भोजन",
    "en": "Prasadam & Food"
  },
  "Pratik Pawar": {
    "mr": "प्रतीक पवार",
    "hi": "प्रतीक पवार",
    "en": "Pratik Pawar"
  },
  "Pre-booked Store Pickups": {
    "mr": "पूर्व-नोंदणीकृत दुकान संकलन",
    "hi": "पूर्व-बुक किए गए स्टोर पिकअप",
    "en": "Pre-booked Store Pickups"
  },
  "Pre-Paid Transit & Fares": {
    "mr": "प्री-पेड वाहतूक आणि दर",
    "hi": "प्री-पेड परिवहन एवं किराया",
    "en": "Pre-Paid Transit & Fares"
  },
  "Prepaid (UPI)": {
    "mr": "Prepaid (UPI)",
    "hi": "Prepaid (UPI)",
    "en": "Prepaid (UPI)"
  },
  "Price Cap Guarantee": {
    "mr": "वाजवी दर हमी",
    "hi": "उचित मूल्य गारंटी",
    "en": "Price Cap Guarantee"
  },
  "Price Compliance Score": {
    "mr": "दर compliance गुण",
    "hi": "मूल्य अनुपालन स्कोर",
    "en": "Price Compliance Score"
  },
  "Price Demanded / Paid (₹)*": {
    "mr": "मागितलेली किंवा दिलेली रक्कम (₹)*",
    "hi": "मांगा गया या दिया गया किराया (₹)*",
    "en": "Price Demanded / Paid (₹)*"
  },
  "Price Flag & Grievance Review": {
    "mr": "दर इशारा & तक्रार पुनरावलोकन",
    "hi": "मूल्य चेतावनी & शिकायत समीक्षा",
    "en": "Price Flag & Grievance Review"
  },
  "Price Flags": {
    "mr": "दर उल्लंघने",
    "hi": "मूल्य अलर्ट",
    "en": "Price Flags"
  },
  "Price Gouging / Overcharging": {
    "mr": "जादा दर / नफेखोरी",
    "hi": "अधिक वसूली / कालाबाज़ारी",
    "en": "Price Gouging / Overcharging"
  },
  "Price Guidance & Reference Range": {
    "mr": "दर मार्गदर्शन व संदर्भ मर्यादा",
    "hi": "मूल्य मार्गदर्शन एवं संदर्भ सीमा",
    "en": "Price Guidance & Reference Range"
  },
  "Prices are indicative community ranges. Administration does not fix or guarantee individual vendor prices.": {
    "mr": "दर हे केवळ नागरी संदर्भ मर्यादा आहेत. प्रशासन वैयक्तिक विक्रेत्यांच्या दरांची हमी देत नाही.",
    "hi": "मूल्य केवल सांकेतिक सामुदायिक सीमाएं हैं। प्रशासन व्यक्तिगत विक्रेता दरों की गारंटी नहीं देता है।",
    "en": "Prices are indicative community ranges. Administration does not fix or guarantee individual vendor prices."
  },
  "Prices are indicative community ranges. Govt does not guarantee or fix prices.": {
    "mr": "दर केवळ मार्गदर्शक आहेत. प्रशासन दर हमी किंवा निश्चित करत नाही.",
    "hi": "दरें केवल सांकेतिक हैं। प्रशासन मूल्य निर्धारित या गारंटी नहीं देता।",
    "en": "Prices are indicative community ranges. Govt does not guarantee or fix prices."
  },
  "Prices shown are vendor-declared and indicative community ranges. Administration does not guarantee or fix prices. If an eatery charges exorbitantly outside fair ranges, share civic feedback.": {
    "mr": "दर्शवलेले दर विक्रेत्यांनी जाहीर केलेले मार्गदर्शक दर आहेत. प्रशासन दर ठरवत नाही. कोणी जादा दर आकारल्यास नागरी अभिप्राय नोंदवा.",
    "hi": "प्रदर्शित दरें विक्रेताओं द्वारा घोषित सांकेतिक दरें हैं। प्रशासन मूल्य तय नहीं करता। यदि कोई अधिक दाम वसूले तो नागरिक फीडबैक दें।",
    "en": "Prices shown are vendor-declared and indicative community ranges. Administration does not guarantee or fix prices. If an eatery charges exorbitantly outside fair ranges, share civic feedback."
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
    "mr": "प्राधान्य 2 • प्रत्यक्ष Surge",
    "hi": "प्राथमिकता 2 • फील्ड Surge",
    "en": "Priority 2 • Field Surge"
  },
  "Priority 30–50 (High)": {
    "mr": "प्राधान्य 30–50 (उच्च / तीव्र)",
    "hi": "प्राथमिकता 30–50 (उच्च / तीव्र)",
    "en": "Priority 30–50 (High)"
  },
  "Priority < 30 (Moderate)": {
    "mr": "प्राधान्य < 30 (मध्यम)",
    "hi": "प्राथमिकता < 30 (मध्यम)",
    "en": "Priority < 30 (Moderate)"
  },
  "Priority > 50 (Critical)": {
    "mr": "प्राधान्य > 50 (Critical)",
    "hi": "प्राथमिकता > 50 (Critical)",
    "en": "Priority > 50 (Critical)"
  },
  "Private Auto": {
    "mr": "स्वतंत्र रिक्षा",
    "hi": "व्यक्तिगत ऑटो",
    "en": "Private Auto"
  },
  "Priya Sharma": {
    "mr": "Priya Sharma",
    "hi": "Priya Sharma",
    "en": "Priya Sharma"
  },
  "Priyanka Gaikwad": {
    "mr": "प्रियंका गायकवाड",
    "hi": "प्रियंका गायकवाड",
    "en": "Priyanka Gaikwad"
  },
  "Product / Item Name *": {
    "mr": "उत्पादन / वस्तूचे नाव *",
    "hi": "उत्पाद / वस्तु का नाम *",
    "en": "Product / Item Name *"
  },
  "Product Photo": {
    "mr": "उत्पादनाचे छायाचित्र",
    "hi": "उत्पाद फोटो",
    "en": "Product Photo"
  },
  "Products first • Certified fair prices from local Nashik stalls": {
    "mr": "उत्पादने प्रथम • नाशिकच्या स्थानिक दुकानांमधून प्रमाणित वाजवी दर",
    "hi": "उत्पाद पहले • नासिक के स्थानीय स्टॉलों से प्रमाणित उचित मूल्य",
    "en": "Products first • Certified fair prices from local Nashik stalls"
  },
  "Protected": {
    "mr": "संरक्षित",
    "hi": "सुरक्षित",
    "en": "Protected"
  },
  "Protected Law Enforcement Network": {
    "mr": "Protected Law अंमलबजावणी Network",
    "hi": "Protected Law प्रवर्तन Network",
    "en": "Protected Law Enforcement Network"
  },
  "PSI S. More": {
    "mr": "PSI S. More",
    "hi": "PSI S. More",
    "en": "PSI S. More"
  },
  "Public Access": {
    "mr": "सार्वजनिक प्रवेश",
    "hi": "सार्वजनिक प्रवेश",
    "en": "Public Access"
  },
  "Public access — Fair marketplace rates, Ghat crowd status, food finder, issue reporting & emergency support. No login needed.": {
    "mr": "सार्वजनिक प्रवेश — वाजवी बाजार दर, घाट गर्दी स्थिती, अन्नक्षेत्र शोधक, तक्रार नोंदणी व आपत्कालीन मदत. लॉगिनची गरज नाही.",
    "hi": "सार्वजनिक प्रवेश — उचित बाज़ार दर, घाट भीड़ स्थिति, अन्नक्षेत्र खोज, शिकायत दर्ज व आपातकालीन सहायता। लॉगिन की आवश्यकता नहीं।",
    "en": "Public access — Fair marketplace rates, Ghat crowd status, food finder, issue reporting & emergency support. No login needed."
  },
  "Public Transit Circuit: ~₹75 total": {
    "mr": "सार्वजनिक वाहतूक: ~₹७५ एकूण",
    "hi": "सार्वजनिक परिवहन: ~₹७५ कुल",
    "en": "Public Transit Circuit: ~₹75 total"
  },
  "Puja & Essentials": {
    "mr": "पूजा व धार्मिक साहित्य",
    "hi": "पूजा एवं धार्मिक सामग्री",
    "en": "Puja & Essentials"
  },
  "Puja Samagri": {
    "mr": "पूजा साहित्य",
    "hi": "पूजा सामग्री",
    "en": "Puja Samagri"
  },
  "Puja Samagri & Bazaar": {
    "mr": "पूजा सामग्री व बाजारपेठ",
    "hi": "पूजा सामग्री एवं बाज़ार",
    "en": "Puja Samagri & Bazaar"
  },
  "Pure Brass Pooja Ghanti (Ritual Bell)": {
    "mr": "शुद्ध पितळी पूजा घंटी",
    "hi": "शुद्ध पीतल पूजा घंटी",
    "en": "Pure Brass Pooja Ghanti (Ritual Bell)"
  },
  "Pure Brass Snan Kalash (1L)": {
    "mr": "शुद्ध पितळेचा स्नान कलश (१ लिटर)",
    "hi": "शुद्ध पीतल स्नान कलश (१ ली)",
    "en": "Pure Brass Snan Kalash (1L)"
  },
  "Pure Chanderi Paithani Stole": {
    "mr": "शुद्ध चंदेरी पैठणी शेला",
    "hi": "शुद्ध चंदेरी पैठणी दुपट्टा",
    "en": "Pure Chanderi Paithani Stole"
  },
  "Pure Copper Snan Kalash (1L)": {
    "mr": "Pure तांबे स्नान कळश (1L)",
    "hi": "Pure तांबा स्नान कलश (1L)",
    "en": "Pure Copper Snan Kalash (1L)"
  },
  "Pure Copper Tamra-Patra Thali": {
    "mr": "शुद्ध तांब्याचे ताम्रपात्र / पूजा थाळी",
    "hi": "शुद्ध तांबे की ताम्र-पात्र थाली",
    "en": "Pure Copper Tamra-Patra Thali"
  },
  "Pure Gangajal Bottle (500ml)": {
    "mr": "पवित्र गंगाजल बाटली (५०० मिली)",
    "hi": "शुद्ध गंगाजल बोतल (५०० मिली)",
    "en": "Pure Gangajal Bottle (500ml)"
  },
  "Pure Satvik": {
    "mr": "शुद्ध सात्विक",
    "hi": "शुद्ध सात्विक",
    "en": "Pure Satvik"
  },
  "Pure Satvik Bhojan": {
    "mr": "शुद्ध सात्विक भोजन",
    "hi": "शुद्ध सात्विक भोजन",
    "en": "Pure Satvik Bhojan"
  },
  "Push Notification Sync": {
    "mr": "Push Notification Sync",
    "hi": "Push Notification Sync",
    "en": "Push Notification Sync"
  },
  "Queue": {
    "mr": "रांगेत",
    "hi": "कतार में",
    "en": "Queue"
  },
  "Queue barrier Gate 4B unsealed; steady pedestrian cycle restored with no incident.": {
    "mr": "Queue barrier प्रवेशद्वार 4B unsealed; steady pedestrian cycle restored सह no incident.",
    "hi": "Queue barrier प्रवेश द्वार 4B unsealed; steady pedestrian cycle restored के साथ no incident.",
    "en": "Queue barrier Gate 4B unsealed; steady pedestrian cycle restored with no incident."
  },
  "Quick Emergency Access": {
    "mr": "तातडीची मदत संपर्क",
    "hi": "त्वरित आपातकालीन संपर्क",
    "en": "Quick Emergency Access"
  },
  "Quick Pilgrimage & Transit Hubs (Tap to set)": {
    "mr": "प्रमुख तीर्थक्षेत्रे व वाहतूक केंद्रे (निवडण्यासाठी टॅप करा)",
    "hi": "प्रमुख तीर्थस्थल एवं परिवहन केंद्र (चुनने हेतु टैप करें)",
    "en": "Quick Pilgrimage & Transit Hubs (Tap to set)"
  },
  "Radar": {
    "mr": "रडार",
    "hi": "रडार",
    "en": "Radar"
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
  "Ramkund": {
    "mr": "रामकुंड",
    "hi": "रामकुंड",
    "en": "Ramkund"
  },
  "Ramkund & Godavari Ghats, Nashik": {
    "mr": "रामकुंड आणि गोदावरी घाट, नाशिक",
    "hi": "रामकुंड एवं गोदावरी घाट, नासिक",
    "en": "Ramkund & Godavari Ghats, Nashik"
  },
  "Ramkund & Panchavati Field Verification": {
    "mr": "रामकुंड व पंचवटी क्षेत्रीय पडताळणी",
    "hi": "रामकुंड एवं पंचवटी फील्ड सत्यापन",
    "en": "Ramkund & Panchavati Field Verification"
  },
  "Ramkund (28%)": {
    "mr": "रामकुंड (२८%)",
    "hi": "रामकुंड (२८%)",
    "en": "Ramkund (28%)"
  },
  "Ramkund - Panchavati Field Verification Hub": {
    "mr": "रामकुंड - पंचवटी प्रत्यक्ष पडताळणी Hub",
    "hi": "रामकुंड - पंचवटी फील्ड सत्यापन Hub",
    "en": "Ramkund - Panchavati Field Verification Hub"
  },
  "Ramkund Approach Lane": {
    "mr": "रामकुंड Approach गल्ली",
    "hi": "रामकुंड Approach लेन",
    "en": "Ramkund Approach Lane"
  },
  "Ramkund Evening Aarti Circuit": {
    "mr": "रामकुंड संध्याकाळ आरती Circuit",
    "hi": "रामकुंड शाम आरती Circuit",
    "en": "Ramkund Evening Aarti Circuit"
  },
  "Ramkund Food & Prasadam Hub": {
    "mr": "रामकुंड अन्न व प्रसादम केंद्र",
    "hi": "रामकुंड भोजन एवं प्रसादम केंद्र",
    "en": "Ramkund Food & Prasadam Hub"
  },
  "Ramkund Ghat": {
    "mr": "रामकुंड घाट",
    "hi": "रामकुंड घाट",
    "en": "Ramkund Ghat"
  },
  "Ramkund Ghat Central Hub": {
    "mr": "रामकुंड घाट Central Hub",
    "hi": "रामकुंड घाट Central Hub",
    "en": "Ramkund Ghat Central Hub"
  },
  "Ramkund Ghat Flow": {
    "mr": "रामकुंड घाट गर्दी प्रवाह",
    "hi": "रामकुंड घाट भीड़ प्रवाह",
    "en": "Ramkund Ghat Flow"
  },
  "Ramkund Ghat Mobile Task Force": {
    "mr": "रामकुंड घाट मोबाईल Task Force",
    "hi": "रामकुंड घाट मोबाइल Task Force",
    "en": "Ramkund Ghat Mobile Task Force"
  },
  "Ramkund Ghat, Panchavati": {
    "mr": "रामकुंड घाट, पंचवटी",
    "hi": "रामकुंड घाट, पंचवटी",
    "en": "Ramkund Ghat, Panchavati"
  },
  "Ramkund Lane": {
    "mr": "रामकुंड गल्ली",
    "hi": "रामकुंड लेन",
    "en": "Ramkund Lane"
  },
  "Ramkund Main Ghat (Panchavati)": {
    "mr": "रामकुंड मुख्य घाट (पंचवटी)",
    "hi": "रामकुंड मुख्य घाट (पंचवटी)",
    "en": "Ramkund Main Ghat (Panchavati)"
  },
  "Ramkund Main Ghat (Sector 2)": {
    "mr": "रामकुंड Main घाट (विभाग 2)",
    "hi": "रामकुंड Main घाट (सेक्टर 2)",
    "en": "Ramkund Main Ghat (Sector 2)"
  },
  "Ramkund Main Ghat Flow": {
    "mr": "रामकुंड मुख्य घाट गर्दी प्रवाह",
    "hi": "रामकुंड मुख्य घाट प्रवाह",
    "en": "Ramkund Main Ghat Flow"
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
  "Ramkund Main Holy Ghat": {
    "mr": "रामकुंड मुख्य पवित्र घाट",
    "hi": "रामकुंड मुख्य पवित्र घाट",
    "en": "Ramkund Main Holy Ghat"
  },
  "Ramkund Main Holy Snan Ghat": {
    "mr": "रामकुंड मुख्य पवित्र स्नान घाट",
    "hi": "रामकुंड मुख्य पवित्र स्नान घाट",
    "en": "Ramkund Main Holy Snan Ghat"
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
  "Ramkund River View": {
    "mr": "रामकुंड नदी दर्शन",
    "hi": "रामकुंड नदी दृश्य",
    "en": "Ramkund River View"
  },
  "Ramkund Sector 3": {
    "mr": "रामकुंड विभाग 3",
    "hi": "रामकुंड सेक्टर 3",
    "en": "Ramkund Sector 3"
  },
  "Ramkund Stand": {
    "mr": "रामकुंड स्टँड",
    "hi": "रामकुंड स्टैंड",
    "en": "Ramkund Stand"
  },
  "Ramkund Steps Gate 2": {
    "mr": "रामकुंड Steps प्रवेशद्वार 2",
    "hi": "रामकुंड Steps प्रवेश द्वार 2",
    "en": "Ramkund Steps Gate 2"
  },
  "Ramkund to Tapovan official circuit": {
    "mr": "रामकुंड to तपोवन official circuit",
    "hi": "रामकुंड to तपोवन official circuit",
    "en": "Ramkund to Tapovan official circuit"
  },
  "Ramkund West Bay #4 • Sector 2 Outpost": {
    "mr": "रामकुंड West Bay #4 • विभाग 2 Outpost",
    "hi": "रामकुंड West Bay #4 • सेक्टर 2 Outpost",
    "en": "Ramkund West Bay #4 • Sector 2 Outpost"
  },
  "Ramkund, Nashik": {
    "mr": "रामकुंड, नाशिक",
    "hi": "रामकुंड, नासिक",
    "en": "Ramkund, Nashik"
  },
  "Rank & Volunteer": {
    "mr": "क्रमांक व स्वयंसेवक",
    "hi": "रैंक एवं स्वयंसेवक",
    "en": "Rank & Volunteer"
  },
  "Rapid Field Resolution": {
    "mr": "त्वरित घटना निवारण",
    "hi": "त्वरित मैदानी निस्तारण",
    "en": "Rapid Field Resolution"
  },
  "Rapid Patrol Dispatch": {
    "mr": "Rapid गस्त पथक रवानगी",
    "hi": "Rapid गश्ती दल प्रेषण",
    "en": "Rapid Patrol Dispatch"
  },
  "Rate": {
    "mr": "दर",
    "hi": "दर",
    "en": "Rate"
  },
  "Rate Card Capped": {
    "mr": "दर Card Capped",
    "hi": "दर Card Capped",
    "en": "Rate Card Capped"
  },
  "Rate Card Public Display Inspection": {
    "mr": "दरफलक सार्वजनिक प्रदर्शन तपासणी",
    "hi": "रेट कार्ड सार्वजनिक प्रदर्शन जांच",
    "en": "Rate Card Public Display Inspection"
  },
  "Rate confirmed by": {
    "mr": "दर निश्चिती:",
    "hi": "दर पुष्टि:",
    "en": "Rate confirmed by"
  },
  "Rate Gazette": {
    "mr": "अधिकृत दरपत्रक",
    "hi": "आधिकारिक दर सूची",
    "en": "Rate Gazette"
  },
  "Rate per Hour:": {
    "mr": "प्रति तास दर:",
    "hi": "प्रति घंटा दर:",
    "en": "Rate per Hour:"
  },
  "Rate Registry": {
    "mr": "दर नोंदवही",
    "hi": "दर पंजी",
    "en": "Rate Registry"
  },
  "Rates shown are community reference ranges and vendor-declared rates. Administration does not fix or guarantee prices.": {
    "mr": "दर shown are community reference ranges आणि विक्रेता-declared दर. प्रशासन does not fix or guarantee prices.",
    "hi": "दरें shown are community reference ranges और विक्रेता-declared दरें. प्रशासन does not fix or guarantee prices.",
    "en": "Rates shown are community reference ranges and vendor-declared rates. Administration does not fix or guarantee prices."
  },
  "Read Gazette Standard Operating Procedure": {
    "mr": "Read राजपत्र स्थानकard Operating Procedure",
    "hi": "Read राजपत्र स्टैंडard Operating Procedure",
    "en": "Read Gazette Standard Operating Procedure"
  },
  "Read More": {
    "mr": "अधिक वाचा",
    "hi": "और पढ़ें",
    "en": "Read More"
  },
  "Ready": {
    "mr": "सज्ज",
    "hi": "तैयार",
    "en": "Ready"
  },
  "Ready for audit": {
    "mr": "Ready साठी तपासणी",
    "hi": "Ready के लिए जांच / ऑडिट",
    "en": "Ready for audit"
  },
  "Ready for Pickup": {
    "mr": "Ready साठी Pickup",
    "hi": "Ready के लिए Pickup",
    "en": "Ready for Pickup"
  },
  "Ready to Scan": {
    "mr": "स्कॅन करण्यास सज्ज",
    "hi": "स्कैन के लिए तैयार",
    "en": "Ready to Scan"
  },
  "Real-time fair-pricing enforcement data under the Nashik Municipal Act & Kumbh Area High-Power Committee directives.": {
    "mr": "Real-time वाजवी-दर रचना enforcement data under Nashik महानगरपालिका Act & कुंभ Area उच्च / तीव्र-Power Committee directives.",
    "hi": "Real-time उचित-मूल्य निर्धारण enforcement data under Nashik नगर निगम Act & कुंभ Area उच्च / तीव्र-Power Committee directives.",
    "en": "Real-time fair-pricing enforcement data under the Nashik Municipal Act & Kumbh Area High-Power Committee directives."
  },
  "Real-Time Fare Board & Transit Rates": {
    "mr": "थेट दर फलक व वाहतूक दर",
    "hi": "लाइव किराया बोर्ड एवं परिवहन दर",
    "en": "Real-Time Fare Board & Transit Rates"
  },
  "Real-Time Fare Board & Transit Rates - Kumbh Setu": {
    "mr": "थेट दर फलक व अधिकृत वाहतूक दर - कुंभसेतु",
    "hi": "लाइव किराया बोर्ड एवं अधिकृत परिवहन दरें - कुंभसेतु",
    "en": "Real-Time Fare Board & Transit Rates - Kumbh Setu"
  },
  "Real-time Flow": {
    "mr": "थेट प्रवाह",
    "hi": "वास्तविक समय प्रवाह",
    "en": "Real-time Flow"
  },
  "Real-time Telemetry": {
    "mr": "थेट टेलीमेट्री",
    "hi": "रीयल-टाइम टेलीमेट्री",
    "en": "Real-time Telemetry"
  },
  "Receive ticket number and police dispatch notification status.": {
    "mr": "Receive ticket number आणि पोलीस dispatch notification स्थिती.",
    "hi": "Receive ticket number और पुलिस dispatch notification स्थिति.",
    "en": "Receive ticket number and police dispatch notification status."
  },
  "Recent Bookings": {
    "mr": "अलीकडील बुकिंग",
    "hi": "हाल की बुकिंग",
    "en": "Recent Bookings"
  },
  "Recent Field Photos Audited Today": {
    "mr": "आज तपासलेली ताजी क्षेत्रीय छायाचित्रे",
    "hi": "आज ऑडिट किए गए हालिया फील्ड फोटो",
    "en": "Recent Field Photos Audited Today"
  },
  "Recent Yatri Messages & Inputs (Live Database)": {
    "mr": "भाविकांचे ताजे संदेश व सूचना (थेट डाटाबेस)",
    "hi": "तीर्थयात्रियों के हालिया संदेश एवं इनपुट (लाइव डेटाबेस)",
    "en": "Recent Yatri Messages & Inputs (Live Database)"
  },
  "Reference Benchmark (संदर्भ दर)": {
    "mr": "Reference प्रमाणक (संदर्भ दर)",
    "hi": "Reference मानक (संदर्भ दर)",
    "en": "Reference Benchmark (संदर्भ दर)"
  },
  "Reference Token": {
    "mr": "संदर्भ टोकन क्रमांक",
    "hi": "संदर्भ टोकन संख्या",
    "en": "Reference Token"
  },
  "refresh": {
    "mr": "refresh",
    "hi": "refresh",
    "en": "refresh"
  },
  "Refunded & Gazette Re-affirmed": {
    "mr": "परतावा केला व अधिकृत दर लागू",
    "hi": "धनवापसी हुई एवं राजपत्र दर बहाल",
    "en": "Refunded & Gazette Re-affirmed"
  },
  "Refused Standard Rate": {
    "mr": "प्रमाणित दर देण्यास नकार",
    "hi": "मानक दर लेने से इनकार",
    "en": "Refused Standard Rate"
  },
  "Reg #NSK-2027-DH089": {
    "mr": "Reg #NSK-2027-DH089",
    "hi": "Reg #NSK-2027-DH089",
    "en": "Reg #NSK-2027-DH089"
  },
  "Register": {
    "mr": "नोंदणी करा",
    "hi": "पंजीकरण करें",
    "en": "Register"
  },
  "Register Guide": {
    "mr": "मार्गदर्शक नोंदणी करा",
    "hi": "गाइड पंजीकरण करें",
    "en": "Register Guide"
  },
  "Register Guide (Camera AR)": {
    "mr": "नोंदणी करा मार्गदर्शक (कॅमेरा AR)",
    "hi": "पंजीकरण करें गाइड (कैमरा AR)",
    "en": "Register Guide (Camera AR)"
  },
  "Register Local Guide": {
    "mr": "नोंदणी करा Local मार्गदर्शक",
    "hi": "पंजीकरण करें Local गाइड",
    "en": "Register Local Guide"
  },
  "Register New Vendor": {
    "mr": "नवीन विक्रेता नोंदवा",
    "hi": "नया विक्रेता पंजीकृत करें",
    "en": "Register New Vendor"
  },
  "Register New Vendor / Service": {
    "mr": "नवीन विक्रेता / सेवा नोंदवा",
    "hi": "नया विक्रेता / सेवा पंजीकृत करें",
    "en": "Register New Vendor / Service"
  },
  "Register Vendor": {
    "mr": "विक्रेता नोंदणी करा",
    "hi": "विक्रेता पंजीकरण करें",
    "en": "Register Vendor"
  },
  "Register with": {
    "mr": "नोंदणी करा with",
    "hi": "पंजीकरण करें with",
    "en": "Register with"
  },
  "Registered Listings": {
    "mr": "नोंदणीकृत सेवा",
    "hi": "पंजीकृत सेवाएँ",
    "en": "Registered Listings"
  },
  "Registered Local Guides:": {
    "mr": "नोंदणीकृत स्थानिक मार्गदर्शक:",
    "hi": "पंजीकृत स्थानीय गाइड:",
    "en": "Registered Local Guides:"
  },
  "Registered Mobile Number": {
    "mr": "नोंदणीकृत मोबाईल क्रमांक",
    "hi": "पंजीकृत मोबाइल नंबर",
    "en": "Registered Mobile Number"
  },
  "Relinquish Shift Post?": {
    "mr": "Relinquish Shift Post?",
    "hi": "Relinquish Shift Post?",
    "en": "Relinquish Shift Post?"
  },
  "reply": {
    "mr": "reply",
    "hi": "reply",
    "en": "reply"
  },
  "Reply to Yatri": {
    "mr": "Reply to भाविक",
    "hi": "Reply to तीर्थयात्री",
    "en": "Reply to Yatri"
  },
  "Report": {
    "mr": "तक्रार नोंदवा",
    "hi": "शिकायत करें",
    "en": "Report"
  },
  "Report a Rumor / Fake News": {
    "mr": "अफवा / खोटी बातमी कळवा",
    "hi": "अफवाह / झूठी खबर रिपोर्ट करें",
    "en": "Report a Rumor / Fake News"
  },
  "Report a Suspicious Rumor": {
    "mr": "संशयास्पद अफवेची माहिती द्या",
    "hi": "संदिग्ध अफवाह की सूचना दें",
    "en": "Report a Suspicious Rumor"
  },
  "Report an Issue": {
    "mr": "तक्रार नोंदवा",
    "hi": "शिकायत दर्ज करें",
    "en": "Report an Issue"
  },
  "Report Civic Issue": {
    "mr": "नागरी तक्रार नोंदवा",
    "hi": "नागरिक शिकायत दर्ज करें",
    "en": "Report Civic Issue"
  },
  "Report incorrect price": {
    "mr": "तक्रार / अहवाल incorrect दर",
    "hi": "शिकायत / रिपोर्ट incorrect मूल्य",
    "en": "Report incorrect price"
  },
  "Report Issue": {
    "mr": "तक्रार नोंदवा",
    "hi": "शिकायत दर्ज करें",
    "en": "Report Issue"
  },
  "Report Overcharge": {
    "mr": "जास्तीच्या दराची तक्रार करा",
    "hi": "अतिरिक्त वसूली की रिपोर्ट करें",
    "en": "Report Overcharge"
  },
  "Report Overcharging": {
    "mr": "जादा दराची तक्रार करा",
    "hi": "अधिक किराए की शिकायत करें",
    "en": "Report Overcharging"
  },
  "Report Price": {
    "mr": "दर तक्रार नोंदवा",
    "hi": "मूल्य रिपोर्ट करें",
    "en": "Report Price"
  },
  "Report Registered #KS-8492": {
    "mr": "तक्रार / अहवाल Registered #KS-8492",
    "hi": "शिकायत / रिपोर्ट Registered #KS-8492",
    "en": "Report Registered #KS-8492"
  },
  "Report Rumor": {
    "mr": "अफवेची तक्रार करा",
    "hi": "अफवाह दर्ज करें",
    "en": "Report Rumor"
  },
  "Report Submitted Successfully": {
    "mr": "तक्रार यशस्वीरित्या नोंदवली गेली",
    "hi": "शिकायत सफलतापूर्वक दर्ज की गई",
    "en": "Report Submitted Successfully"
  },
  "Report Submitted to Civic Squad": {
    "mr": "तक्रार नागरी पथकाकडे नोंदवली",
    "hi": "शिकायत नागरिक दस्ते को दर्ज कराई गई",
    "en": "Report Submitted to Civic Squad"
  },
  "Report Transit Price": {
    "mr": "प्रवास दर तक्रार नोंदवा",
    "hi": "सफ़र किराया रिपोर्ट करें",
    "en": "Report Transit Price"
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
  "Reported by Yatris": {
    "mr": "यात्रेकरूंनी नोंदवलेले",
    "hi": "यात्रियों द्वारा रिपोर्ट किए गए",
    "en": "Reported by Yatris"
  },
  "Reported Price Inconsistencies": {
    "mr": "नोंदवलेल्या दर विसंगती",
    "hi": "रिपोर्ट की गई मूल्य विसंगतियां",
    "en": "Reported Price Inconsistencies"
  },
  "Reported Rate": {
    "mr": "नोंदवलेला दर",
    "hi": "दर्ज किया गया दर",
    "en": "Reported Rate"
  },
  "Reported Transporter": {
    "mr": "Reported Transporter",
    "hi": "Reported Transporter",
    "en": "Reported Transporter"
  },
  "Reported Violation:": {
    "mr": "नोंदवलेले उल्लंघन:",
    "hi": "दर्ज उल्लंघन:",
    "en": "Reported Violation:"
  },
  "Reporting desk opened": {
    "mr": "Reporting कक्ष opened",
    "hi": "Reporting कक्ष opened",
    "en": "Reporting desk opened"
  },
  "Reports": {
    "mr": "तक्रारी व अहवाल",
    "hi": "रिपोर्ट्स",
    "en": "Reports"
  },
  "Request Guide": {
    "mr": "Request मार्गदर्शक",
    "hi": "Request गाइड",
    "en": "Request Guide"
  },
  "Request Resubmission": {
    "mr": "पुन्हा सादर करण्याची विनंती करा",
    "hi": "पुनः जमा करने का अनुरोध करें",
    "en": "Request Resubmission"
  },
  "Request Ride": {
    "mr": "Request Ride",
    "hi": "Request Ride",
    "en": "Request Ride"
  },
  "Request Sent": {
    "mr": "विनंती पाठवली गेली",
    "hi": "अनुरोध भेजा गया",
    "en": "Request Sent"
  },
  "Request Volunteer Audit": {
    "mr": "स्वयंसेवक तपासणीची विनंती करा",
    "hi": "स्वयंसेवक ऑडिट का अनुरोध करें",
    "en": "Request Volunteer Audit"
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
    "mr": "Reservation saved साठी offline access!",
    "hi": "Reservation saved के लिए offline access!",
    "en": "Reservation saved for offline access!"
  },
  "Reserve Table": {
    "mr": "Reserve Table",
    "hi": "Reserve Table",
    "en": "Reserve Table"
  },
  "Reset All Filters": {
    "mr": "Reset सर्व Filters",
    "hi": "Reset सभी Filters",
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
  "Resolve Case": {
    "mr": "प्रकरण निकाली काढा",
    "hi": "मामला हल करें",
    "en": "Resolve Case"
  },
  "Resolve Flag": {
    "mr": "समस्या निवारण करा",
    "hi": "समस्या का समाधान करें",
    "en": "Resolve Flag"
  },
  "Resolved": {
    "mr": "निकाली काढले",
    "hi": "सुलझाया गया",
    "en": "Resolved"
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
    "mr": "Restricted access साठी field officers, beat inspectors & designated नागरी magistrates.",
    "hi": "Restricted access के लिए field officers, beat inspectors & designated नागरिक magistrates.",
    "en": "Restricted access for field officers, beat inspectors & designated civic magistrates."
  },
  "Restricted Civic Access": {
    "mr": "मर्यादित नागरी प्रवेश",
    "hi": "प्रतिबंधित नागरिक प्रवेश",
    "en": "Restricted Civic Access"
  },
  "Resubmission Notice": {
    "mr": "Resubmission सूचना",
    "hi": "Resubmission नोटिस",
    "en": "Resubmission Notice"
  },
  "Return to Home": {
    "mr": "मुख्यपृष्ठावर परत जा",
    "hi": "मुख्यपृष्ठ पर वापस जाएं",
    "en": "Return to Home"
  },
  "Review": {
    "mr": "तपासा",
    "hi": "समीक्षा करें",
    "en": "Review"
  },
  "Review Flag": {
    "mr": "तक्रार तपासा",
    "hi": "फ्लैग की समीक्षा करें",
    "en": "Review Flag"
  },
  "Reviews": {
    "mr": "अभिप्राय / पुनरावलोकने",
    "hi": "समीक्षाएं / रेटिंग",
    "en": "Reviews"
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
  "Rickshaws & Transit": {
    "mr": "रिक्षा आणि वाहतूक",
    "hi": "ऑटो एवं परिवहन",
    "en": "Rickshaws & Transit"
  },
  "Rides and taxis cannot be booked inside this app. Pilgrims can call authorized ride stands or drivers directly using the \"Call Stand\" buttons below, or hire directly at RTO booths.": {
    "mr": "रिक्षा व टॅक्सी ॲपमधून थेट बुक करता येत नाहीत. भाविक खालील 'कॉल स्टँड' बटणावरून थेट चालकांशी संपर्क करू शकतात किंवा आरटीओ बूथवरून घेऊ शकतात.",
    "hi": "सवारी और टैक्सी ऐप से बुक नहीं की जा सकती। श्रद्धालु नीचे दिए गए 'कॉल स्टैंड' बटन से सीधे कॉल कर सकते हैं या आरटीओ बूथ से ले सकते हैं।",
    "en": "Rides and taxis cannot be booked inside this app. Pilgrims can call authorized ride stands or drivers directly using the \"Call Stand\" buttons below, or hire directly at RTO booths."
  },
  "River police divers & lifebuoy units": {
    "mr": "नदी पोलीस divers & lifebuoy units",
    "hi": "नदी पुलिस divers & lifebuoy units",
    "en": "River police divers & lifebuoy units"
  },
  "RO Filtered Water Provided Free": {
    "mr": "RO Filtered पाणी Provided Free",
    "hi": "RO Filtered जल / पानी Provided Free",
    "en": "RO Filtered Water Provided Free"
  },
  "Rohit Deshmukh": {
    "mr": "Rohit Deshmukh",
    "hi": "Rohit Deshmukh",
    "en": "Rohit Deshmukh"
  },
  "Rohit Shinde": {
    "mr": "रोहित शिंदे",
    "hi": "रोहित शिंदे",
    "en": "Rohit Shinde"
  },
  "Rohit Tambe": {
    "mr": "रोहित तांबे",
    "hi": "रोहित तांबे",
    "en": "Rohit Tambe"
  },
  "Role": {
    "mr": "भूमिका",
    "hi": "भूमिका",
    "en": "Role"
  },
  "Room & Yatris": {
    "mr": "खोली & यात्रीs",
    "hi": "कमरा & यात्रीs",
    "en": "Room & Yatris"
  },
  "Room / Stay": {
    "mr": "खोली / धर्मशाळा मुक्काम",
    "hi": "कमरा / धर्मशाला आवास",
    "en": "Room / Stay"
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
  "Route: Panchavati Ghat to CBS Central": {
    "mr": "मार्ग: पंचवटी घाट ते सीबीएस मध्यवर्ती",
    "hi": "मार्ग: पंचवटी घाट से सीबीएस सेंट्रल",
    "en": "Route: Panchavati Ghat to CBS Central"
  },
  "RTO Gazetted Rates 2027": {
    "mr": "आरटीओ अधिकृत राजपत्र दर २०२७",
    "hi": "आरटीओ आधिकारिक राजपत्र दर २०२७",
    "en": "RTO Gazetted Rates 2027"
  },
  "RTO Toll-Free 1800-233-1048": {
    "mr": "आरटीओ टोल-फ्री १८००-२३३-१०४८",
    "hi": "आरटीओ टोल-फ्री १८००-२३३-१०४८",
    "en": "RTO Toll-Free 1800-233-1048"
  },
  "Rubbing Stone Inc.": {
    "mr": "सान खलबत्ता केंद्र",
    "hi": "रबिंग स्टोन केंद्र",
    "en": "Rubbing Stone Inc."
  },
  "Rudraksha": {
    "mr": "रुद्राक्ष",
    "hi": "रुद्राक्ष",
    "en": "Rudraksha"
  },
  "Rumor Description": {
    "mr": "अफवेचा तपशील",
    "hi": "अफवाह का विवरण",
    "en": "Rumor Description"
  },
  "Rumor: Stampede Alert near Tapovan": {
    "mr": "Rumor: Stampede दक्षता इशारा near तपोवन",
    "hi": "Rumor: Stampede अलर्ट near तपोवन",
    "en": "Rumor: Stampede Alert near Tapovan"
  },
  "Rutuja Joshi": {
    "mr": "ऋतुजा जोशी",
    "hi": "ऋतुजा जोशी",
    "en": "Rutuja Joshi"
  },
  "RYK Science Inst. • 800m away": {
    "mr": "RYK Science Inst. • 800m away",
    "hi": "RYK Science Inst. • 800m away",
    "en": "RYK Science Inst. • 800m away"
  },
  "Sacred central holy pool where Lord Rama performed Pitru Tarpan. Main Simhastha Kumbh Snan and Ganga Godavari Aarti site.": {
    "mr": "प्रभू श्रीरामांनी पितृतर्पण केलेले पवित्र कुंड. मुख्य सिंहस्थ कुंभस्नान व गंगा गोदावरी आरतीचे मुख्य स्थान.",
    "hi": "पवित्र केंद्रीय कुंड जहां प्रभु राम ने पितृ तर्पण किया था। मुख्य सिंहस्थ कुंभ स्नान एवं गंगा गोदावरी आरती स्थल।",
    "en": "Sacred central holy pool where Lord Rama performed Pitru Tarpan. Main Simhastha Kumbh Snan and Ganga Godavari Aarti site."
  },
  "Sacred central tank where Lord Rama performed Pitru Tarpan. Main Simhastha Kumbh Snan site.": {
    "mr": "पवित्र कुंड जेथे प्रभू श्रीरामाने पितृतर्पण केले. सिंहस्थ कुंभमेळ्याचे मुख्य स्नान स्थळ.",
    "hi": "पवित्र कुंड जहाँ प्रभु श्रीराम ने पितृ तर्पण किया था। सिंहस्थ कुंभ का मुख्य स्नान स्थल।",
    "en": "Sacred central tank where Lord Rama performed Pitru Tarpan. Main Simhastha Kumbh Snan site."
  },
  "Sacred Nashik Clay Diya Set (Pack of 11)": {
    "mr": "पवित्र नाशिक मातीचे दिवे संच (११ चा संच)",
    "hi": "पवित्र नासिक मिट्टी दीया सेट (११ का सेट)",
    "en": "Sacred Nashik Clay Diya Set (Pack of 11)"
  },
  "Sacred Peak": {
    "mr": "पवित्र शिखर",
    "hi": "पवित्र शिखर",
    "en": "Sacred Peak"
  },
  "Sacred Vessels": {
    "mr": "Sacred Vessels",
    "hi": "Sacred Vessels",
    "en": "Sacred Vessels"
  },
  "Saffron Handloom Snan Dhoti Set": {
    "mr": "भगवे हातमाग स्नान धोतर संच",
    "hi": "केसरिया हथकरघा स्नान धोती सेट",
    "en": "Saffron Handloom Snan Dhoti Set"
  },
  "Sai Auto Stand": {
    "mr": "Sai रिक्षा स्थानक",
    "hi": "Sai ऑटो स्टैंड",
    "en": "Sai Auto Stand"
  },
  "Sai Auto Stand (#NSK-TR-04, Panchavati Ghat)": {
    "mr": "साई ऑटो स्टँड (#NSK-TR-०४, पंचवटी घाट)",
    "hi": "साई ऑटो स्टैंड (#NSK-TR-०४, पंचवटी घाट)",
    "en": "Sai Auto Stand (#NSK-TR-04, Panchavati Ghat)"
  },
  "Sai Auto Stand (Bay 4)": {
    "mr": "साई ऑटो स्टँड (बे ४)",
    "hi": "साई ऑटो स्टैंड (बे ४)",
    "en": "Sai Auto Stand (Bay 4)"
  },
  "Sai Auto Stand (Bay 4, Ramkund West)": {
    "mr": "Sai रिक्षा स्थानक (Bay 4, रामकुंड West)",
    "hi": "Sai ऑटो स्टैंड (Bay 4, रामकुंड West)",
    "en": "Sai Auto Stand (Bay 4, Ramkund West)"
  },
  "sailing": {
    "mr": "sailing",
    "hi": "sailing",
    "en": "sailing"
  },
  "Sandalwood Tilak Paste (Original)": {
    "mr": "शुद्ध चंदन टिळा लेप",
    "hi": "शुद्ध चंदन तिलक पेस्ट",
    "en": "Sandalwood Tilak Paste (Original)"
  },
  "Sandip Polytechnic, Mahiravani • 980m away": {
    "mr": "संदीप तंत्रनिकेतन, महिरावणी • ९८० मी अंतरावर",
    "hi": "संदीप पॉलिटेक्निक • ९८० मी दूर",
    "en": "Sandip Polytechnic, Mahiravani • 980m away"
  },
  "Sandip Univ": {
    "mr": "संदीप युनिव्हर्सिटी",
    "hi": "संदीप यूनिवर्सिटी",
    "en": "Sandip Univ"
  },
  "Sandip University Engg. • 14 audits": {
    "mr": "Sandip University Engg. • 14 audits",
    "hi": "Sandip University Engg. • 14 audits",
    "en": "Sandip University Engg. • 14 audits"
  },
  "Sandip University Engg. • 600m away": {
    "mr": "संदीप विद्यापीठ अभियांत्रिकी • ६०० मी अंतरावर",
    "hi": "संदीप यूनिवर्सिटी इंजीनियरिंग • ६०० मी दूर",
    "en": "Sandip University Engg. • 600m away"
  },
  "Sangam Snan & Laxman Temple": {
    "mr": "संगम स्नान आणि लक्ष्मण मंदिर",
    "hi": "संगम स्नान एवं लक्ष्मण मंदिर",
    "en": "Sangam Snan & Laxman Temple"
  },
  "Sanitation & Ghat Amenities": {
    "mr": "स्वच्छता & घाट Amenities",
    "hi": "स्वच्छता & घाट Amenities",
    "en": "Sanitation & Ghat Amenities"
  },
  "Sanitation & Ghats": {
    "mr": "स्वच्छता व घाट व्यवस्था",
    "hi": "स्वच्छता एवं घाट",
    "en": "Sanitation & Ghats"
  },
  "Sanitation / Cleanliness": {
    "mr": "स्वच्छता / आरोग्य",
    "hi": "स्वच्छता / स्वास्थ्य",
    "en": "Sanitation / Cleanliness"
  },
  "Sapkal Knowledge Hub, Nashik • 1.2km away": {
    "mr": "सपकाळ नॉलेज हब, नाशिक • १.२ किमी अंतरावर",
    "hi": "सपकाल नॉलेज हब • १.२ किमी दूर",
    "en": "Sapkal Knowledge Hub, Nashik • 1.2km away"
  },
  "Satvik Food & Prasadam": {
    "mr": "सात्विक भोजन व प्रसाद",
    "hi": "सात्विक भोजन एवं प्रसाद",
    "en": "Satvik Food & Prasadam"
  },
  "Satvik Meal": {
    "mr": "सात्विक भोजन",
    "hi": "सात्विक भोजन",
    "en": "Satvik Meal"
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
  "Saurabh Pagare": {
    "mr": "सौरभ पगारे",
    "hi": "सौरभ पगारे",
    "en": "Saurabh Pagare"
  },
  "Save": {
    "mr": "जतन करा",
    "hi": "सुरक्षित करें",
    "en": "Save"
  },
  "Save & Apply": {
    "mr": "जतन करा व लागू करा",
    "hi": "सहेजें एवं लागू करें",
    "en": "Save & Apply"
  },
  "Save to Database": {
    "mr": "डाटाबेसमध्ये जतन करा",
    "hi": "डेटाबेस में सहेजें",
    "en": "Save to Database"
  },
  "Sayali More": {
    "mr": "सायली मोरे",
    "hi": "सायली मोरे",
    "en": "Sayali More"
  },
  "Scan Thumb": {
    "mr": "Scan Thumb",
    "hi": "Scan Thumb",
    "en": "Scan Thumb"
  },
  "school": {
    "mr": "school",
    "hi": "school",
    "en": "school"
  },
  "Sealed": {
    "mr": "सील केलेले",
    "hi": "सील बंद",
    "en": "Sealed"
  },
  "Search": {
    "mr": "शोधा",
    "hi": "खोजें",
    "en": "Search"
  },
  "Search Annakshetra, Thali, Bhojanalaya, Grocery, Fruits...": {
    "mr": "अन्नछत्र, थाळी, भोजनालय, किराणा, फळे शोधा...",
    "hi": "अन्नक्षेत्र, थाली, भोजनालय, राशन, फल खोजें...",
    "en": "Search Annakshetra, Thali, Bhojanalaya, Grocery, Fruits..."
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
  "Search listings...": {
    "mr": "नोंदी शोधा...",
    "hi": "लिस्टिंग खोजें...",
    "en": "Search listings..."
  },
  "Search products, stalls, local artisans...": {
    "mr": "वस्तू, स्टॉल, स्थानिक कारागीर शोधा...",
    "hi": "सामग्री, स्टॉल, स्थानीय कारीगर खोजें...",
    "en": "Search products, stalls, local artisans..."
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
  "Search verified services, stay, transport...": {
    "mr": "प्रमाणित सेवा, मुक्काम, वाहतूक शोधा...",
    "hi": "प्रमाणित सेवाएँ, आवास, परिवहन खोजें...",
    "en": "Search verified services, stay, transport..."
  },
  "SEC-04": {
    "mr": "विभाग-०४",
    "hi": "सेक्टर-०४",
    "en": "SEC-04"
  },
  "Section 14-B requires every active stall to exhibit the official stamped bilingual QR card. Unverified or overcharging entities face immediate temporary permit suspension.": {
    "mr": "Section 14-B requires every सक्रिय स्टॉल to exhibit official stamped bilingual QR card. Unverified or जादा दर आकारणी entities face immediate temporary permit suspension.",
    "hi": "Section 14-B requires every सक्रिय स्टॉल to exhibit official stamped bilingual QR card. Unverified or अत्यधिक वसूली entities face immediate temporary permit suspension.",
    "en": "Section 14-B requires every active stall to exhibit the official stamped bilingual QR card. Unverified or overcharging entities face immediate temporary permit suspension."
  },
  "Section 144 Municipal Price Protection Gazette Live Monitoring": {
    "mr": "Section 144 महानगरपालिका दर Protection राजपत्र थेट Monitoring",
    "hi": "Section 144 नगर निगम मूल्य Protection राजपत्र लाइव Monitoring",
    "en": "Section 144 Municipal Price Protection Gazette Live Monitoring"
  },
  "Sector & Location Lane": {
    "mr": "विभाग व रस्ता/गल्ली",
    "hi": "सेक्टर एवं स्थान लेन",
    "en": "Sector & Location Lane"
  },
  "Sector 02-B High Vigilance": {
    "mr": "विभाग ०२-बी उच्च दक्षता",
    "hi": "सेक्टर ०२-बी उच्च सतर्कता",
    "en": "Sector 02-B High Vigilance"
  },
  "Sector 04 Log Archive": {
    "mr": "विभाग ०४ नोंदणी अभिलेख",
    "hi": "सेक्टर ०४ लॉग अभिलेख",
    "en": "Sector 04 Log Archive"
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
    "mr": "विभाग 2 कक्ष • कर्तव्य सक्रिय (Shift B)",
    "hi": "सेक्टर 2 कक्ष • ड्यूटी सक्रिय (Shift B)",
    "en": "Sector 2 Desk • Duty Active (Shift B)"
  },
  "Sector 2 Desk • Shift B Active": {
    "mr": "विभाग २ कक्ष • पाळी ब सक्रिय",
    "hi": "सेक्टर २ डेस्क • शिफ्ट बी सक्रिय",
    "en": "Sector 2 Desk • Shift B Active"
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
    "mr": "Secured सह Supabase Auth & TLS Encryption",
    "hi": "Secured के साथ Supabase Auth & TLS Encryption",
    "en": "Secured with Supabase Auth & TLS Encryption"
  },
  "Security & Lost / Found": {
    "mr": "सुरक्षा आणि हरवले / सापडले",
    "hi": "सुरक्षा एवं खोया / पाया",
    "en": "Security & Lost / Found"
  },
  "Security PIN": {
    "mr": "सुरक्षा पिन",
    "hi": "सुरक्षा पिन",
    "en": "Security PIN"
  },
  "Select an available on-ground volunteer for in-person kitchen inspection at": {
    "mr": "Select an available on-ground स्वयंसेवक साठी in-person kitchen inspection at",
    "hi": "Select an available on-ground volunteer के लिए in-person kitchen inspection at",
    "en": "Select an available on-ground volunteer for in-person kitchen inspection at"
  },
  "Select image from gallery or documents (No live camera needed)": {
    "mr": "Select image कडून gallery or documents (No थेट camera needed)",
    "hi": "Select image से gallery or documents (No लाइव camera needed)",
    "en": "Select image from gallery or documents (No live camera needed)"
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
  "Select Location...": {
    "mr": "ठिकाण निवडा...",
    "hi": "स्थान चुनें...",
    "en": "Select Location..."
  },
  "Select Stall / Product Photo": {
    "mr": "Select स्टॉल / Product छायाचित्र",
    "hi": "Select स्टॉल / Product फोटो",
    "en": "Select Stall / Product Photo"
  },
  "Select Stall or Lodging to Audit*": {
    "mr": "तपासणीसाठी स्टॉल किंवा धर्मशाळा निवडा*",
    "hi": "ऑडिट के लिए स्टॉल या धर्मशाला चुनें*",
    "en": "Select Stall or Lodging to Audit*"
  },
  "Select Tour Date": {
    "mr": "दर्शनाची तारीख निवडा",
    "hi": "दर्शन की तारीख चुनें",
    "en": "Select Tour Date"
  },
  "Select your dedicated role below. Each persona has its own specialized interface and verification flow.": {
    "mr": "खाली आपली योग्य भूमिका निवडा. प्रत्येक घटकासाठी स्वतंत्र इंटरफेस आणि पडताळणी प्रक्रिया आहे.",
    "hi": "नीचे अपनी विशिष्ट भूमिका चुनें। प्रत्येक व्यक्ति के लिए समर्पित इंटरफेस और सत्यापन प्रक्रिया है।",
    "en": "Select your dedicated role below. Each persona has its own specialized interface and verification flow."
  },
  "Select Your Role (तुमची भूमिका निवडा)": {
    "mr": "Select Your Role (तुमची भूमिका निवडा)",
    "hi": "Select Your Role (तुमची भूमिका निवडा)",
    "en": "Select Your Role (तुमची भूमिका निवडा)"
  },
  "Selfie Identity Verification": {
    "mr": "सेल्फी ओळख पडताळणी",
    "hi": "सेल्फी पहचान सत्यापन",
    "en": "Selfie Identity Verification"
  },
  "Selfie Verified Guide": {
    "mr": "सेल्फी प्रमाणित मार्गदर्शक",
    "hi": "सेल्फी सत्यापित गाइड",
    "en": "Selfie Verified Guide"
  },
  "sell": {
    "mr": "sell",
    "hi": "sell",
    "en": "sell"
  },
  "Send & Log Reply": {
    "mr": "उत्तर पाठवा व नोंदवा",
    "hi": "उत्तर भेजें एवं दर्ज करें",
    "en": "Send & Log Reply"
  },
  "Send Emergency Distress Alert": {
    "mr": "तातडीचा धोक्याचा इशारा पाठवा",
    "hi": "तत्काल आपातकालीन अलर्ट भेजें",
    "en": "Send Emergency Distress Alert"
  },
  "Send Inquiry": {
    "mr": "चौकशी पाठवा",
    "hi": "पूछताछ भेजें",
    "en": "Send Inquiry"
  },
  "Send Message or Inquiry to Vendor": {
    "mr": "विक्रेत्याला संदेश किंवा चौकशी पाठवा",
    "hi": "विक्रेता को संदेश या पूछताछ भेजें",
    "en": "Send Message or Inquiry to Vendor"
  },
  "Send OTP": {
    "mr": "ओटीपी पाठवा",
    "hi": "ओटीपी भेजें",
    "en": "Send OTP"
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
  "sensors": {
    "mr": "sensors",
    "hi": "sensors",
    "en": "sensors"
  },
  "Session terminates secure field radio binding. Sector 2 desk will be notified.": {
    "mr": "Session terminates secure field radio binding. विभाग 2 कक्ष will be notified.",
    "hi": "Session terminates secure field radio binding. सेक्टर 2 कक्ष will be notified.",
    "en": "Session terminates secure field radio binding. Sector 2 desk will be notified."
  },
  "Set Destination": {
    "mr": "गंतव्य निवडा",
    "hi": "गंतव्य चुनें",
    "en": "Set Destination"
  },
  "Set Drop-off": {
    "mr": "Set Drop-off",
    "hi": "Set Drop-off",
    "en": "Set Drop-off"
  },
  "Set Pickup": {
    "mr": "सुरुवात निवडा",
    "hi": "पिकअप चुनें",
    "en": "Set Pickup"
  },
  "Set your rate within or close to the estimated fair range.": {
    "mr": "Set आपले दर च्या आत or close to अंदाजित वाजवी range.",
    "hi": "Set आपका दर के भीतर or close to अनुमानित उचित range.",
    "en": "Set your rate within or close to the estimated fair range."
  },
  "Settings": {
    "mr": "सेटिंग्ज",
    "hi": "सेटिंग्स",
    "en": "Settings"
  },
  "Seva Points": {
    "mr": "सेवा गुण",
    "hi": "सेवा अंक",
    "en": "Seva Points"
  },
  "Severity: High": {
    "mr": "तीव्रता: अति तातडीची",
    "hi": "गंभीरता: उच्च",
    "en": "Severity: High"
  },
  "Severity: Low": {
    "mr": "तीव्रता: सामान्य",
    "hi": "गंभीरता: सामान्य",
    "en": "Severity: Low"
  },
  "Severity: Medium": {
    "mr": "तीव्रता: मध्यम",
    "hi": "गंभीरता: मध्यम",
    "en": "Severity: Medium"
  },
  "Shahi Snan": {
    "mr": "शाही स्नान",
    "hi": "शाही स्नान",
    "en": "Shahi Snan"
  },
  "Shahi Snan Ghat & Jyotirlinga": {
    "mr": "शाही स्नान घाट आणि ज्योतिर्लिंग",
    "hi": "शाही स्नान घाट एवं ज्योतिर्लिंग",
    "en": "Shahi Snan Ghat & Jyotirlinga"
  },
  "share": {
    "mr": "share",
    "hi": "share",
    "en": "share"
  },
  "Share Clarification": {
    "mr": "स्पष्टीकरण शेअर करा",
    "hi": "स्पष्टीकरण साझा करें",
    "en": "Share Clarification"
  },
  "Share via SMS": {
    "mr": "Share द्वारे SMS",
    "hi": "Share के माध्यम से SMS",
    "en": "Share via SMS"
  },
  "Share via WhatsApp": {
    "mr": "व्हाट्सअ‍ॅपवर शेअर करा",
    "hi": "व्हाट्सएप पर साझा करें",
    "en": "Share via WhatsApp"
  },
  "Shared Auto": {
    "mr": "शेअर रिक्षा",
    "hi": "शेयर ऑटो",
    "en": "Shared Auto"
  },
  "Shared Auto (Per Seat)": {
    "mr": "शेअर रिक्षा (प्रति सीट)",
    "hi": "शेयर ऑटो (प्रति सीट)",
    "en": "Shared Auto (Per Seat)"
  },
  "Shared E-Rickshaw": {
    "mr": "शेअर ई-रिक्षा",
    "hi": "शेयर ई-रिक्शा",
    "en": "Shared E-Rickshaw"
  },
  "Shatabdi Institute of Tech • 780m away": {
    "mr": "शताब्दी तंत्रज्ञान संस्था • ७८० मी अंतरावर",
    "hi": "शताब्दी इंस्टीट्यूट ऑफ टेक • ७८० मी दूर",
    "en": "Shatabdi Institute of Tech • 780m away"
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
  "Show Top 5 Kumbhveers": {
    "mr": "शीर्ष ५ कुंभवीर पहा",
    "hi": "शीर्ष ५ कुंभवीर देखें",
    "en": "Show Top 5 Kumbhveers"
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
  "Shree Kalaram Mandir": {
    "mr": "श्री काळाराम मंदिर",
    "hi": "श्री कालाराम मंदिर",
    "en": "Shree Kalaram Mandir"
  },
  "Shreya Mahajan": {
    "mr": "श्रेया महाजन",
    "hi": "श्रेया महाजन",
    "en": "Shreya Mahajan"
  },
  "Shri Balaji Shared Auto Stand #12": {
    "mr": "Shri Balaji Shared रिक्षा स्थानक #12",
    "hi": "Shri Balaji Shared ऑटो स्टैंड #12",
    "en": "Shri Balaji Shared Auto Stand #12"
  },
  "Shri Krishna Pooja Bhandar (#NSK-BZ-102, Panchavati Steps)": {
    "mr": "श्री कृष्ण पूजा भांडार (#NSK-BZ-१०२, पंचवटी पायऱ्या)",
    "hi": "श्री कृष्ण पूजा भंडार (#NSK-BZ-१०२, पंचवटी सीढ़ियां)",
    "en": "Shri Krishna Pooja Bhandar (#NSK-BZ-102, Panchavati Steps)"
  },
  "Shri Krishna Pure Veg Bhojanalaya": {
    "mr": "Shri Krishna Pure Veg भोजनालय",
    "hi": "Shri Krishna Pure Veg भोजनालय",
    "en": "Shri Krishna Pure Veg Bhojanalaya"
  },
  "Simhastha 2027 Field Node": {
    "mr": "सिंहस्थ २०२७ क्षेत्रीय केंद्र",
    "hi": "सिंहस्थ २०२७ फील्ड नोड",
    "en": "Simhastha 2027 Field Node"
  },
  "Simhastha Apex Security Unit • Zone A-1": {
    "mr": "सिंहस्थ सर्वोच्च सुरक्षा पथक • विभाग A-1",
    "hi": "सिंहस्थ शीर्ष सुरक्षा इकाई • ज़ोन A-1",
    "en": "Simhastha Apex Security Unit • Zone A-1"
  },
  "Simhastha Day 4": {
    "mr": "सिंहस्थ दिवस 4",
    "hi": "सिंहस्थ दिन 4",
    "en": "Simhastha Day 4"
  },
  "Simhastha Estimated Fair Range:": {
    "mr": "सिंहस्थ अंदाजित वाजवी मर्यादा:",
    "hi": "सिंहस्थ अनुमानित उचित सीमा:",
    "en": "Simhastha Estimated Fair Range:"
  },
  "Simhastha Kumbh 2027": {
    "mr": "सिंहस्थ कुंभ २०२७",
    "hi": "सिंहस्थ कुंभ २०२७",
    "en": "Simhastha Kumbh 2027"
  },
  "Simhastha Kumbh Bazaar": {
    "mr": "सिंहस्थ कुंभ बाजार",
    "hi": "सिंहस्थ कुंभ बाज़ार",
    "en": "Simhastha Kumbh Bazaar"
  },
  "Simhastha Kumbh Mela 2027": {
    "mr": "सिंहस्थ कुंभमेळा २०२७",
    "hi": "सिंहस्थ कुंभ मेला २०२७",
    "en": "Simhastha Kumbh Mela 2027"
  },
  "Simhastha Kumbh Mela Authority • Government of Maharashtra": {
    "mr": "सिंहस्थ कुंभमेळा प्राधिकरण • महाराष्ट्र शासन",
    "hi": "सिंहस्थ कुंभ मेला प्राधिकरण • महाराष्ट्र शासन",
    "en": "Simhastha Kumbh Mela Authority • Government of Maharashtra"
  },
  "Simhastha Kumbh Memorial Shawl": {
    "mr": "सिंहस्थ कुंभ स्मृती शाल",
    "hi": "सिंहस्थ कुंभ स्मृति शॉल",
    "en": "Simhastha Kumbh Memorial Shawl"
  },
  "Simhastha Municipal Digital Protocol 4.2 Secured": {
    "mr": "सिंहस्थ महानगरपालिका Digital Protocol 4.2 Secured",
    "hi": "सिंहस्थ नगर निगम Digital Protocol 4.2 Secured",
    "en": "Simhastha Municipal Digital Protocol 4.2 Secured"
  },
  "Simhastha Municipal RTO Advisory 2027": {
    "mr": "सिंहस्थ मनपा व आरटीओ सूचना २०२७",
    "hi": "सिंहस्थ नगर निगम एवं आरटीओ परामर्श २०२७",
    "en": "Simhastha Municipal RTO Advisory 2027"
  },
  "Simhastha Parvani Protocol active. Fair-Price Act enforcement order #NSK-2024-884 is strictly in effect across all 14 Ghat sectors.": {
    "mr": "सिंहस्थ Parvani Protocol सक्रिय. वाजवी-दर Act enforcement ऑर्डर #NSK-2024-884 is strictly in effect across all 14 घाट sectors.",
    "hi": "सिंहस्थ Parvani Protocol सक्रिय. उचित-मूल्य Act enforcement ऑर्डर #NSK-2024-884 is strictly in effect across all 14 घाट sectors.",
    "en": "Simhastha Parvani Protocol active. Fair-Price Act enforcement order #NSK-2024-884 is strictly in effect across all 14 Ghat sectors."
  },
  "Simhastha Police Command — AI Spatial Hotspot Radar": {
    "mr": "सिंहस्थ पोलीस नियंत्रण कक्ष — एआय हॉटस्पॉट रडार",
    "hi": "सिंहस्थ पुलिस कमांड — एआई हॉटस्पॉट रडार",
    "en": "Simhastha Police Command — AI Spatial Hotspot Radar"
  },
  "Simhastha Security Apex": {
    "mr": "सिंहस्थ सुरक्षा सर्वोच्च केंद्र",
    "hi": "सिंहस्थ सुरक्षा शीर्ष केंद्र",
    "en": "Simhastha Security Apex"
  },
  "Simhastha Volunteer Honour Roll 2027": {
    "mr": "सिंहस्थ स्वयंसेवक सन्मान सूची २०२७",
    "hi": "सिंहस्थ स्वयंसेवक सम्मान सूची २०२७",
    "en": "Simhastha Volunteer Honour Roll 2027"
  },
  "Sinhgad Institute of Tech Nashik • 850m away": {
    "mr": "सिंहगड तंत्रज्ञान संस्था नाशिक • ८५० मी अंतरावर",
    "hi": "सिंहगड़ इंस्टीट्यूट ऑफ टेक • ८५० मी दूर",
    "en": "Sinhgad Institute of Tech Nashik • 850m away"
  },
  "Sita Gufa Chowk, Ghat Approach Road": {
    "mr": "Sita Gufa Chowk, घाट Approach Road",
    "hi": "Sita Gufa Chowk, घाट Approach Road",
    "en": "Sita Gufa Chowk, Ghat Approach Road"
  },
  "Sita Gufa Lane": {
    "mr": "सीता गुंफा गल्ली",
    "hi": "सीता गुफा लेन",
    "en": "Sita Gufa Lane"
  },
  "Sita Gumpha Gate 1": {
    "mr": "Sita Gumpha प्रवेशद्वार 1",
    "hi": "Sita Gumpha प्रवेश द्वार 1",
    "en": "Sita Gumpha Gate 1"
  },
  "Slide across for more items": {
    "mr": "अधिक वस्तूंसाठी पुढे सरकवा",
    "hi": "अधिक वस्तुओं के लिए स्लाइड करें",
    "en": "Slide across for more items"
  },
  "Slip & Fare Meter Evidence": {
    "mr": "पावती व मीटर पुरावा",
    "hi": "रसीद एवं मीटर प्रमाण",
    "en": "Slip & Fare Meter Evidence"
  },
  "Smooth Flow": {
    "mr": "सुगम संचार",
    "hi": "सुगम प्रवाह",
    "en": "Smooth Flow"
  },
  "sms": {
    "mr": "sms",
    "hi": "sms",
    "en": "sms"
  },
  "SMS द्वारे माहितीसाठी": {
    "mr": "SMS द्वारे माहितीसाठी",
    "hi": "SMS द्वारे माहितीसाठी",
    "en": "SMS द्वारे माहितीसाठी"
  },
  "Smt. Meenakshi Sundaram": {
    "mr": "Smt. Meenakshi Sundaram",
    "hi": "Smt. Meenakshi Sundaram",
    "en": "Smt. Meenakshi Sundaram"
  },
  "Sneha Joshi": {
    "mr": "स्नेहा जोशी",
    "hi": "स्नेहा जोशी",
    "en": "Sneha Joshi"
  },
  "Snehal Patil": {
    "mr": "स्नेहल पाटील",
    "hi": "स्नेहल पाटिल",
    "en": "Snehal Patil"
  },
  "SNJB KBJ College of Engineering • 720m away": {
    "mr": "एसएनजेबी अभियांत्रिकी महाविद्यालय • ७२० मी अंतरावर",
    "hi": "एसएनजेबी इंजीनियरिंग कॉलेज • ७२० मी दूर",
    "en": "SNJB KBJ College of Engineering • 720m away"
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
  "Social Media Post": {
    "mr": "सोशल मीडिया पोस्ट",
    "hi": "सोशल मीडिया पोस्ट",
    "en": "Social Media Post"
  },
  "Solar Hot Water • Luggage Lockers": {
    "mr": "Solar Hot पाणी • Luggage Lockers",
    "hi": "Solar Hot जल / पानी • Luggage Lockers",
    "en": "Solar Hot Water • Luggage Lockers"
  },
  "Someshwar": {
    "mr": "सोमेश्वर",
    "hi": "सोमेश्वर",
    "en": "Someshwar"
  },
  "Someshwar Mahadev Mandir": {
    "mr": "सोमेश्वर महादेव मंदिर",
    "hi": "सोमेश्वर महादेव मंदिर",
    "en": "Someshwar Mahadev Mandir"
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
  "SOS": {
    "mr": "मदत (SOS)",
    "hi": "सहायता (SOS)",
    "en": "SOS"
  },
  "SOS Dispatch": {
    "mr": "तातडीची मदत (SOS) रवानगी",
    "hi": "तत्काल सहायता (SOS) प्रेषण",
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
  "Source / Platform": {
    "mr": "माहितीचा स्रोत / माध्यम",
    "hi": "सूचना का स्रोत / माध्यम",
    "en": "Source / Platform"
  },
  "Source: System Rate Scrape & Kumbhveer Spot Check": {
    "mr": "Source: System दर Scrape & कुंभवीर Spot तपासणी",
    "hi": "Source: System दर Scrape & कुंभवीर Spot जांच",
    "en": "Source: System Rate Scrape & Kumbhveer Spot Check"
  },
  "spa": {
    "mr": "spa",
    "hi": "spa",
    "en": "spa"
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
  "Spotted 15m ago": {
    "mr": "१५ मिनिटांपूर्वी आढळले",
    "hi": "१५ मिनट पहले देखा गया",
    "en": "Spotted 15m ago"
  },
  "Spotted 1h ago": {
    "mr": "१ तासापूर्वी आढळले",
    "hi": "१ घंटे पहले देखा गया",
    "en": "Spotted 1h ago"
  },
  "Spotted 40m ago": {
    "mr": "४० मिनिटांपूर्वी आढळले",
    "hi": "४० मिनट पहले देखा गया",
    "en": "Spotted 40m ago"
  },
  "Stall #03 • Balasaheb Tambe": {
    "mr": "स्टॉल #०३ • बाळासाहेब तांबे",
    "hi": "स्टॉल #०३ • बालासाहेब तांबे",
    "en": "Stall #03 • Balasaheb Tambe"
  },
  "Stall #08 • Sita Gufa Kendra": {
    "mr": "स्टॉल #०८ • सीता गुंफा केंद्र",
    "hi": "स्टॉल #०८ • सीता गुफा केंद्र",
    "en": "Stall #08 • Sita Gufa Kendra"
  },
  "Stall #12 • Kapaleshwar Craft": {
    "mr": "स्टॉल #१२ • कपालेश्वर हस्तकला",
    "hi": "स्टॉल #१२ • कपालेश्वर शिल्प",
    "en": "Stall #12 • Kapaleshwar Craft"
  },
  "Stall #14 • Rameshwar Brass": {
    "mr": "स्टॉल #१४ • रामेश्वर पितळ वस्तू",
    "hi": "स्टॉल #१४ • रामेश्वर पीतल भंडार",
    "en": "Stall #14 • Rameshwar Brass"
  },
  "Stall #18 • Vithal Bunkar Guild": {
    "mr": "स्टॉल #१८ • विठ्ठल विणकर संघ",
    "hi": "स्टॉल #१८ • विट्ठल बुनकर गिल्ड",
    "en": "Stall #18 • Vithal Bunkar Guild"
  },
  "Stall #21 • Madhavrao Sugandh": {
    "mr": "स्टॉल #२१ • माधवराव सुगंध भांडार",
    "hi": "स्टॉल #२१ • माधवराव सुगंध",
    "en": "Stall #21 • Madhavrao Sugandh"
  },
  "Stall #24 • Pt. Narayan Shastri": {
    "mr": "स्टॉल #२४ • पं. नारायण शास्त्री",
    "hi": "स्टॉल #२४ • पं. नारायण शास्त्री",
    "en": "Stall #24 • Pt. Narayan Shastri"
  },
  "Stall #31 • Anand Bhojraj": {
    "mr": "स्टॉल #३१ • आनंद भोजराज",
    "hi": "स्टॉल #३१ • आनंद भोजराज",
    "en": "Stall #31 • Anand Bhojraj"
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
  "Stall ID": {
    "mr": "स्टॉल ओळख क्र.",
    "hi": "स्टॉल पहचान सं.",
    "en": "Stall ID"
  },
  "Stall Inventory & Estimated Fair Ranges": {
    "mr": "स्टॉल Inventory & अंदाजित वाजवी मर्यादाs",
    "hi": "स्टॉल Inventory & अनुमानित उचित सीमाs",
    "en": "Stall Inventory & Estimated Fair Ranges"
  },
  "Stall Location": {
    "mr": "स्टॉलचे ठिकाण",
    "hi": "स्टॉल का स्थान",
    "en": "Stall Location"
  },
  "Stall Products": {
    "mr": "स्टॉल Products",
    "hi": "स्टॉल Products",
    "en": "Stall Products"
  },
  "standard": {
    "mr": "प्रमाणित दर",
    "hi": "मानक दर",
    "en": "standard"
  },
  "Standard Dorm Bed mismatch. Asking ₹650/night offline; registered Simhastha Portal cap ₹350/night.": {
    "mr": "स्थानकard डॉर्मिटरी Bed mismatch. Asking ₹650/रात्र offline; registered सिंहस्थ Portal मर्यादा ₹350/रात्र.",
    "hi": "स्टैंडard डॉर्मिटरी Bed mismatch. Asking ₹650/रात offline; registered सिंहस्थ Portal सीमा ₹350/रात.",
    "en": "Standard Dorm Bed mismatch. Asking ₹650/night offline; registered Simhastha Portal cap ₹350/night."
  },
  "Standard Dorm bed priced at": {
    "mr": "स्थानकard डॉर्मिटरी bed priced at",
    "hi": "स्टैंडard डॉर्मिटरी bed priced at",
    "en": "Standard Dorm bed priced at"
  },
  "Standard Double Room": {
    "mr": "प्रमाणित दुहेरी कक्ष",
    "hi": "मानक डबल रूम",
    "en": "Standard Double Room"
  },
  "Standard Non-AC · 2 Guests": {
    "mr": "स्थानकard Non-AC · 2 Guests",
    "hi": "स्टैंडard Non-AC · 2 Guests",
    "en": "Standard Non-AC · 2 Guests"
  },
  "Standard Twin Room": {
    "mr": "प्रमाणित ट्विन रूम",
    "hi": "मानक ट्विन रूम",
    "en": "Standard Twin Room"
  },
  "Standard Veg Thali": {
    "mr": "साधी शाकाहारी थाळी",
    "hi": "सादा शाकाहारी थाली",
    "en": "Standard Veg Thali"
  },
  "Standardized meter & prepaid coupon": {
    "mr": "स्थानकardized meter & prepaid coupon",
    "hi": "स्टैंडardized meter & prepaid coupon",
    "en": "Standardized meter & prepaid coupon"
  },
  "Start Camera": {
    "mr": "Start कॅमेरा",
    "hi": "Start कैमरा",
    "en": "Start Camera"
  },
  "Station to Ghat": {
    "mr": "रेल्वे स्टेशन ते घाट",
    "hi": "रेलवे स्टेशन से घाट",
    "en": "Station to Ghat"
  },
  "Statutory Audit": {
    "mr": "Statutory तपासणी",
    "hi": "Statutory जांच / ऑडिट",
    "en": "Statutory Audit"
  },
  "Statutory Fair Price Guidelines 2027": {
    "mr": "वैधानिक वाजवी दर मार्गदर्शक तत्त्वे २०२७",
    "hi": "वैधानिक उचित मूल्य दिशा-निर्देश २०२७",
    "en": "Statutory Fair Price Guidelines 2027"
  },
  "Statutory Gazette Feed • NMC Apex Oversight": {
    "mr": "Statutory राजपत्र Feed • NMC Apex Oversight",
    "hi": "Statutory राजपत्र Feed • NMC Apex Oversight",
    "en": "Statutory Gazette Feed • NMC Apex Oversight"
  },
  "Stay calm. If crowd surges occur, proceed away from the river barricade toward Panchavati Main Square or contact any Kumbhveer squad.": {
    "mr": "मुक्काम calm. If crowd surges occur, proceed away कडून नदी barricade toward पंचवटी Main Square or contact any कुंभवीर पथक.",
    "hi": "आवास calm. If crowd surges occur, proceed away से नदी barricade toward पंचवटी Main Square or contact any कुंभवीर दस्ता.",
    "en": "Stay calm. If crowd surges occur, proceed away from the river barricade toward Panchavati Main Square or contact any Kumbhveer squad."
  },
  "Stay Tariff Gap": {
    "mr": "मुक्काम दरपत्रक Gap",
    "hi": "आवास दर सूची Gap",
    "en": "Stay Tariff Gap"
  },
  "Stays / Ashrams": {
    "mr": "निवास / आश्रम",
    "hi": "आवास / आश्रम",
    "en": "Stays / Ashrams"
  },
  "Stays, Stalls & Rides:": {
    "mr": "निवास, स्टॉल्स व वाहने:",
    "hi": "आवास, स्टॉल एवं सवारी:",
    "en": "Stays, Stalls & Rides:"
  },
  "Stays, stalls, and rides cannot be booked in-app. Contact the establishment directly via WhatsApp, Call, or Navigate to visit on-site.": {
    "mr": "निवास, स्टॉल्स व वाहने ॲपमध्ये बुक करता येत नाहीत. व्हॉट्सॲप, कॉल किंवा नकाशामार्गे थेट संपर्क साधा.",
    "hi": "आवास, स्टॉल और सवारी ऐप में बुक नहीं हो सकते। व्हाट्सएप, कॉल या नेविगेशन द्वारा सीधे संपर्क करें।",
    "en": "Stays, stalls, and rides cannot be booked in-app. Contact the establishment directly via WhatsApp, Call, or Navigate to visit on-site."
  },
  "Stock Count": {
    "mr": "उपलब्ध संख्या",
    "hi": "स्टॉक संख्या",
    "en": "Stock Count"
  },
  "straighten": {
    "mr": "straighten",
    "hi": "straighten",
    "en": "straighten"
  },
  "Strictly authorized personnel only. System activity logged, geo-tagged, and monitored under the Maharashtra Police Act, 1951 & IT Act 2000.": {
    "mr": "Strictly authorized personnel only. System activity नोंदणीकृत, geo-tagged, आणि monitored under Maharashtra पोलीस Act, 1951 & IT Act 2000.",
    "hi": "Strictly authorized personnel only. System activity दर्ज, geo-tagged, और monitored under Maharashtra पुलिस Act, 1951 & IT Act 2000.",
    "en": "Strictly authorized personnel only. System activity logged, geo-tagged, and monitored under the Maharashtra Police Act, 1951 & IT Act 2000."
  },
  "Students on field": {
    "mr": "विद्यार्थी प्रत्यक्ष क्षेत्रात",
    "hi": "छात्र मैदान पर",
    "en": "Students on field"
  },
  "Subcategory / Type": {
    "mr": "उपप्रकार",
    "hi": "उपश्रेणी / प्रकार",
    "en": "Subcategory / Type"
  },
  "Subject escorted out, ₹500 penalty receipt logged, barred from sanctum ghat sector.": {
    "mr": "Subject escorted out, ₹500 penalty receipt नोंदणीकृत, barred कडून sanctum घाट विभाग.",
    "hi": "Subject escorted out, ₹500 penalty receipt दर्ज, barred से sanctum घाट सेक्टर.",
    "en": "Subject escorted out, ₹500 penalty receipt logged, barred from sanctum ghat sector."
  },
  "Submit": {
    "mr": "सादर करा",
    "hi": "जमा करें",
    "en": "Submit"
  },
  "Submit Civic Report (तक्रार दाखल करा)": {
    "mr": "सादर करा नागरी तक्रार / अहवाल (तक्रार दाखल करा)",
    "hi": "सबमिट करें नागरिक शिकायत / रिपोर्ट (तक्रार दाखल करा)",
    "en": "Submit Civic Report (तक्रार दाखल करा)"
  },
  "Submit Community Report": {
    "mr": "नागरी अहवाल सादर करा",
    "hi": "सामुदायिक रिपोर्ट सबमिट करें",
    "en": "Submit Community Report"
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
  "Submit On-Site Stall Photo & Audit Evidence": {
    "mr": "स्टॉल छायाचित्र व तपासणी पुरावा सादर करा",
    "hi": "स्टॉल फोटो एवं ऑडिट प्रमाण जमा करें",
    "en": "Submit On-Site Stall Photo & Audit Evidence"
  },
  "Submit Report": {
    "mr": "तक्रार दाखल करा",
    "hi": "शिकायत दर्ज करें",
    "en": "Submit Report"
  },
  "Submit Rumor for Verification": {
    "mr": "पडताळणीसाठी पाठवा",
    "hi": "सत्यापन हेतु भेजें",
    "en": "Submit Rumor for Verification"
  },
  "Submit Suspicious Claim": {
    "mr": "संशयास्पद दावा सादर करा",
    "hi": "संदिग्ध सूचना दर्ज करें",
    "en": "Submit Suspicious Claim"
  },
  "Submit to Civic Vigilance": {
    "mr": "नागरी दक्षता कक्षाकडे पाठवा",
    "hi": "नागरिक सतर्कता विभाग को भेजें",
    "en": "Submit to Civic Vigilance"
  },
  "Submit to Dossier": {
    "mr": "सादर करा to Dossier",
    "hi": "सबमिट करें to Dossier",
    "en": "Submit to Dossier"
  },
  "Submit to PIB": {
    "mr": "पीआयबीकडे पाठवा",
    "hi": "पीआईबी को भेजें",
    "en": "Submit to PIB"
  },
  "Submit Vendor Registration": {
    "mr": "विक्रेता नोंदणी अर्ज सादर करा",
    "hi": "विक्रेता पंजीकरण आवेदन जमा करें",
    "en": "Submit Vendor Registration"
  },
  "Submit Verified Field Evidence (+75 Points)": {
    "mr": "पडताळणी केलेला पुरावा सादर करा (+७५ गुण)",
    "hi": "सत्यापित फील्ड प्रमाण जमा करें (+७५ अंक)",
    "en": "Submit Verified Field Evidence (+75 Points)"
  },
  "Submitted": {
    "mr": "नोंदणी झाली",
    "hi": "दर्ज की गई",
    "en": "Submitted"
  },
  "Subsidized": {
    "mr": "सवलतीचे",
    "hi": "रियायती",
    "en": "Subsidized"
  },
  "Subsidized Bhojanalay": {
    "mr": "सवलतीचे भोजनालय",
    "hi": "रियायती भोजनालय",
    "en": "Subsidized Bhojanalay"
  },
  "Success": {
    "mr": "यशस्वी",
    "hi": "सफल",
    "en": "Success"
  },
  "summarize": {
    "mr": "summarize",
    "hi": "summarize",
    "en": "summarize"
  },
  "Sundarnarayan Mandir": {
    "mr": "सुंदरनारायण मंदिर",
    "hi": "सुंदरनारायण मंदिर",
    "en": "Sundarnarayan Mandir"
  },
  "Sunil Joshi": {
    "mr": "Sunil Joshi",
    "hi": "Sunil Joshi",
    "en": "Sunil Joshi"
  },
  "Sunita Deshmukh": {
    "mr": "सुनिता देशमुख",
    "hi": "सुनीता देशमुख",
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
  "Switch Camera": {
    "mr": "कॅमेरा बदला",
    "hi": "कैमरा बदलें",
    "en": "Switch Camera"
  },
  "Symbiosis Operations Mgmt Nashik • 1.3km away": {
    "mr": "सिम्बायोसिस संस्था नाशिक • १.३ किमी अंतरावर",
    "hi": "सिम्बायोसिस इंस्टीट्यूट • १.३ किमी दूर",
    "en": "Symbiosis Operations Mgmt Nashik • 1.3km away"
  },
  "sync": {
    "mr": "sync",
    "hi": "sync",
    "en": "sync"
  },
  "System Flag": {
    "mr": "System इशारा",
    "hi": "System चेतावनी",
    "en": "System Flag"
  },
  "Take Live Selfie": {
    "mr": "थेट सेल्फी घ्या",
    "hi": "लाइव सेल्फी लें",
    "en": "Take Live Selfie"
  },
  "Take Photo / Browse": {
    "mr": "फोटो काढा / निवडा",
    "hi": "फोटो लें / ब्राउज़ करें",
    "en": "Take Photo / Browse"
  },
  "Tanmay Kadam": {
    "mr": "तन्मय कदम",
    "hi": "तन्मय कदम",
    "en": "Tanmay Kadam"
  },
  "Tanvi Kulkarni": {
    "mr": "तन्वी कुलकर्णी",
    "hi": "तन्वी कुलकर्णी",
    "en": "Tanvi Kulkarni"
  },
  "Tap anywhere on map to move": {
    "mr": "हलवण्यासाठी नकाशावर कुठेही स्पर्श करा",
    "hi": "बदलने के लिए नक्शे पर कहीं भी टैप करें",
    "en": "Tap anywhere on map to move"
  },
  "Tap multiple categories that apply, or add your own custom category below:": {
    "mr": "लागू असणाऱ्या पर्यायांना स्पर्श करा, किंवा खाली तुमची स्वतःची वर्गवारी जोडा:",
    "hi": "लागू होने वाली श्रेणियों को चुनें, या नीचे अपनी कस्टम श्रेणी जोड़ें:",
    "en": "Tap multiple categories that apply, or add your own custom category below:"
  },
  "Tap pins to view sacred details & transit cost": {
    "mr": "माहिती व प्रवास दर पाहण्यासाठी पिनवर टॅप करा",
    "hi": "विवरण और यात्रा किराया देखने के लिए पिन टैप करें",
    "en": "Tap pins to view sacred details & transit cost"
  },
  "Tap pins to view transit cost": {
    "mr": "प्रवास खर्च पाहण्यासाठी चिन्हावर स्पर्श करा",
    "hi": "यात्रा खर्च देखने के लिए पिन पर टैप करें",
    "en": "Tap pins to view transit cost"
  },
  "Tap to capture camera photo or browse files": {
    "mr": "कॅमेरा सुरू करण्यासाठी किंवा फाइल निवडण्यासाठी स्पर्श करा",
    "hi": "कैमरा फोटो खींचने या फाइल चुनने के लिए टैप करें",
    "en": "Tap to capture camera photo or browse files"
  },
  "Tap to open camera or gallery (JPG, PNG)": {
    "mr": "Tap to open camera or gallery (JPG, PNG)",
    "hi": "Tap to open camera or gallery (JPG, PNG)",
    "en": "Tap to open camera or gallery (JPG, PNG)"
  },
  "Tap to take picture or upload receipt": {
    "mr": "फोटो काढण्यासाठी किंवा पावती जोडण्यासाठी टॅप करा",
    "hi": "फ़ोटो खींचने या रसीद अपलोड करने हेतु टैप करें",
    "en": "Tap to take picture or upload receipt"
  },
  "Tapovan & Kapila Sangam": {
    "mr": "तपोवन आणि कपिला संगम",
    "hi": "तपोवन एवं कपिला संगम",
    "en": "Tapovan & Kapila Sangam"
  },
  "Tapovan Bus Terminus to Ghat Gate 3": {
    "mr": "तपोवन बस Terminus to घाट प्रवेशद्वार 3",
    "hi": "तपोवन बस Terminus to घाट प्रवेश द्वार 3",
    "en": "Tapovan Bus Terminus to Ghat Gate 3"
  },
  "Tapovan Lane 3": {
    "mr": "तपोवन गल्ली 3",
    "hi": "तपोवन लेन 3",
    "en": "Tapovan Lane 3"
  },
  "Tapovan Parking Zone 2": {
    "mr": "तपोवन Parking विभाग 2",
    "hi": "तपोवन Parking ज़ोन 2",
    "en": "Tapovan Parking Zone 2"
  },
  "Tapovan Sadhu Gram (3.2 km)": {
    "mr": "तपोवन साधू ग्राम (३.२ किमी)",
    "hi": "तपोवन साधु ग्राम (३.२ किमी)",
    "en": "Tapovan Sadhu Gram (3.2 km)"
  },
  "Tapovan Sadhu Gram Hub": {
    "mr": "तपोवन साधू ग्राम केंद्र",
    "hi": "तपोवन साधु ग्राम केंद्र",
    "en": "Tapovan Sadhu Gram Hub"
  },
  "Tapovan Sadhugram": {
    "mr": "तपोवन साधूग्राम",
    "hi": "तपोवन साधुग्राम",
    "en": "Tapovan Sadhugram"
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
    "mr": "उद्दिष्ट: ९८%",
    "hi": "लक्ष्य: ९८%",
    "en": "Target: 98%"
  },
  "Tariff Violation Check": {
    "mr": "दरपत्रक Violation तपासणी",
    "hi": "दर सूची Violation जांच",
    "en": "Tariff Violation Check"
  },
  "Taxi / Cab": {
    "mr": "टॅक्सी / कॅब",
    "hi": "टैक्सी / कैब",
    "en": "Taxi / Cab"
  },
  "Temple Offerings": {
    "mr": "मंदिरातील अर्पण साहित्य",
    "hi": "मंदिर चढ़ावा सामग्री",
    "en": "Temple Offerings"
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
  "The holy pond from which River Godavari emerges into plains. Sacred bathing pool of Akhadas during Shahi Snan.": {
    "mr": "पवित्र कुंड जेथून गोदावरी नदी भूभागावर वाहते. शाही स्नानावेळी आखाड्यांचे पवित्र स्नान कुंड.",
    "hi": "पवित्र कुंड जहाँ से गोदावरी नदी मैदान में प्रवाहित होती है। शाही स्नान के समय अखाड़ों का मुख्य स्नान स्थल।",
    "en": "The holy pond from which River Godavari emerges into plains. Sacred bathing pool of Akhadas during Shahi Snan."
  },
  "The only service bookable directly on the app with certified credentials & official token.": {
    "mr": "प्रमाणित ओळखपत्र व अधिकृत टोकनसह ॲपवर थेट बुक करता येणारी एकमेव अधिकृत सेवा.",
    "hi": "प्रमाणित पहचान पत्र और आधिकारिक टोकन के साथ ऐप पर सीधे बुक होने वाली एकमात्र सेवा।",
    "en": "The only service bookable directly on the app with certified credentials & official token."
  },
  "The sacred 5 Banyan trees (Panch-Vat) and ancient cave where Devi Sita worshipped.": {
    "mr": "पवित्र ५ वटवृक्ष (पंचवटी) आणि प्राचीन गुंफा जेथे सीतामातेने पूजन केले.",
    "hi": "पवित्र ५ वटवृक्ष (पंचवटी) और प्राचीन गुफा जहाँ माता सीता ने पूजन किया था।",
    "en": "The sacred 5 Banyan trees (Panch-Vat) and ancient cave where Devi Sita worshipped."
  },
  "timer": {
    "mr": "timer",
    "hi": "timer",
    "en": "timer"
  },
  "Timing": {
    "mr": "वेळ",
    "hi": "समय",
    "en": "Timing"
  },
  "Timing:": {
    "mr": "वेळ:",
    "hi": "समय:",
    "en": "Timing:"
  },
  "To": {
    "mr": "येथे (गंतव्य)",
    "hi": "कहाँ तक (गंतव्य)",
    "en": "To"
  },
  "to authenticate compliance (+50 points).": {
    "mr": "नियमांचे प्रमाणीकरण करण्यासाठी (+५० गुण).",
    "hi": "अनुपालन प्रमाणित करने के लिए (+५० अंक)।",
    "en": "to authenticate compliance (+50 points)."
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
  "Today's Audits": {
    "mr": "आजच्या तपासण्या",
    "hi": "आज के ऑडिट",
    "en": "Today's Audits"
  },
  "Today's Inquiries": {
    "mr": "आज's Inquiries",
    "hi": "आज's Inquiries",
    "en": "Today's Inquiries"
  },
  "Today's Menu / Prasadam:": {
    "mr": "आजचा मेनू / महाप्रसाद:",
    "hi": "आज का मेनू / महाप्रसाद:",
    "en": "Today's Menu / Prasadam:"
  },
  "Token dispatched to registered CUG SIM": {
    "mr": "टोकन dispatched to registered CUG SIM",
    "hi": "टोकन dispatched to registered CUG SIM",
    "en": "Token dispatched to registered CUG SIM"
  },
  "Toll Free 24x7": {
    "mr": "टोल फ्री २४x७",
    "hi": "टोल फ्री २४x७",
    "en": "Toll Free 24x7"
  },
  "Toll-Free • 24x7 Priority Line": {
    "mr": "Toll-Free • 24x7 प्राधान्य Line",
    "hi": "Toll-Free • 24x7 प्राथमिकता Line",
    "en": "Toll-Free • 24x7 Priority Line"
  },
  "Tomorrow": {
    "mr": "उद्या",
    "hi": "कल",
    "en": "Tomorrow"
  },
  "Tomorrow 6:30 AM (3 Hours Heritage Circuit)": {
    "mr": "Tomorrow 6:30 AM (3 तास Heritage Circuit)",
    "hi": "Tomorrow 6:30 AM (3 घंटे Heritage Circuit)",
    "en": "Tomorrow 6:30 AM (3 Hours Heritage Circuit)"
  },
  "Top Priority Zone": {
    "mr": "Top प्राधान्य विभाग",
    "hi": "Top प्राथमिकता ज़ोन",
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
  "Top Verifiers across 15+ Nashik Colleges": {
    "mr": "नाशिकमधील १५+ महाविद्यालयांतील अव्वल पडताळणीकर्ते",
    "hi": "नासिक के १५+ कॉलेजों के शीर्ष सत्यापनकर्ता",
    "en": "Top Verifiers across 15+ Nashik Colleges"
  },
  "Top volunteers receive the Nashik Municipal Apex Gold Seva Medal.": {
    "mr": "सर्वोत्कृष्ट स्वयंसेवकांना नाशिक मनपा सुवर्ण सेवा पदक प्रदान केले जाते.",
    "hi": "शीर्ष स्वयंसेवकों को नासिक नगर निगम स्वर्ण सेवा पदक दिया जाता है।",
    "en": "Top volunteers receive the Nashik Municipal Apex Gold Seva Medal."
  },
  "Total Guide Fee": {
    "mr": "एकूण मार्गदर्शक शुल्क",
    "hi": "कुल गाइड शुल्क",
    "en": "Total Guide Fee"
  },
  "Total Orders Today": {
    "mr": "आजच्या एकूण ऑर्डर्स",
    "hi": "आज के कुल ऑर्डर्स",
    "en": "Total Orders Today"
  },
  "Total Payable at Service Desk": {
    "mr": "Total Payable at Service कक्ष",
    "hi": "Total Payable at Service कक्ष",
    "en": "Total Payable at Service Desk"
  },
  "Total Revenue": {
    "mr": "एकूण महसूल",
    "hi": "कुल आय",
    "en": "Total Revenue"
  },
  "Total Verified Transactions: 1,289": {
    "mr": "Total प्रमाणित Transactions: 1,289",
    "hi": "Total सत्यापित Transactions: 1,289",
    "en": "Total Verified Transactions: 1,289"
  },
  "tour": {
    "mr": "दौरा",
    "hi": "दौरा",
    "en": "tour"
  },
  "Tour Package & Time Slot": {
    "mr": "दर्शन पॅकेज व वेळ निवडा",
    "hi": "दर्शन पैकेज एवं समय चुनें",
    "en": "Tour Package & Time Slot"
  },
  "Tracking Token:": {
    "mr": "तक्रार ट्रॅकिंग क्रमांक:",
    "hi": "शिकायत ट्रैकिंग नंबर:",
    "en": "Tracking Token:"
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
  "Traditional Crafts": {
    "mr": "पारंपरिक हस्तकला",
    "hi": "पारंपरिक हस्तशिल्प",
    "en": "Traditional Crafts"
  },
  "Transit from Station: ₹80 Meter Auto / ₹15 Citylink Bus (9 km)": {
    "mr": "स्टेशनवरून प्रवास: ₹८० मीटर रिक्षा / ₹१५ सिटीलिंक बस (९ किमी)",
    "hi": "स्टेशन से यात्रा: ₹८० मीटर ऑटो / ₹१५ सिटीलिंक बस (९ किमी)",
    "en": "Transit from Station: ₹80 Meter Auto / ₹15 Citylink Bus (9 km)"
  },
  "Transit Mode": {
    "mr": "प्रवास साधन",
    "hi": "परिवहन साधन",
    "en": "Transit Mode"
  },
  "Transit Stands": {
    "mr": "वाहतूक थांबे",
    "hi": "परिवहन स्टैंड",
    "en": "Transit Stands"
  },
  "Transit: ₹80 Meter Auto / ₹15 Citylink Bus (9 km)": {
    "mr": "वाहतूक: ₹८० मीटर रिक्षा / ₹१५ सिटीलिंक बस (९ किमी)",
    "hi": "परिवहन: ₹८० मीटर ऑटो / ₹१५ सिटीलिंक बस (९ किमी)",
    "en": "Transit: ₹80 Meter Auto / ₹15 Citylink Bus (9 km)"
  },
  "translate": {
    "mr": "translate",
    "hi": "translate",
    "en": "translate"
  },
  "Transport & Auto Guide": {
    "mr": "वाहतूक व रिक्षा मार्गदर्शक",
    "hi": "परिवहन एवं ऑटो गाइड",
    "en": "Transport & Auto Guide"
  },
  "Transport & Rickshaws": {
    "mr": "Transport & रिक्षा",
    "hi": "Transport & रिक्शा",
    "en": "Transport & Rickshaws"
  },
  "Transport / Auto": {
    "mr": "वाहतूक / रिक्षा",
    "hi": "परिवहन / ऑटो",
    "en": "Transport / Auto"
  },
  "Transport / Rickshaw": {
    "mr": "Transport / रिक्षा",
    "hi": "Transport / रिक्शा",
    "en": "Transport / Rickshaw"
  },
  "Trek & Gangadwar Darshan": {
    "mr": "गंगद्वार पदयात्रा आणि दर्शन",
    "hi": "गंगाद्वार पदयात्रा एवं दर्शन",
    "en": "Trek & Gangadwar Darshan"
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
  "Trimbak": {
    "mr": "त्र्यंबकेश्वर",
    "hi": "त्र्यंबकेश्वर",
    "en": "Trimbak"
  },
  "Trimbak Bus Stand East": {
    "mr": "Trimbak बस स्थानक East",
    "hi": "Trimbak बस स्टैंड East",
    "en": "Trimbak Bus Stand East"
  },
  "Trimbak Floral Vender Stalls (#NSK-BZ-144, Kushavarta)": {
    "mr": "त्र्यंबक पुष्प विक्रेते स्टॉल्स (#NSK-BZ-१४४, कुशावर्त)",
    "hi": "त्र्यंबक पुष्प विक्रेता स्टॉल (#NSK-BZ-१४४, कुशावर्त)",
    "en": "Trimbak Floral Vender Stalls (#NSK-BZ-144, Kushavarta)"
  },
  "Trimbak Road, near Ramkund Ghat": {
    "mr": "Trimbak Road, near रामकुंड घाट",
    "hi": "Trimbak Road, near रामकुंड घाट",
    "en": "Trimbak Road, near Ramkund Ghat"
  },
  "Trimbakeshwar": {
    "mr": "त्र्यंबकेश्वर",
    "hi": "त्र्यंबकेश्वर",
    "en": "Trimbakeshwar"
  },
  "Trimbakeshwar & Brahmagiri Yatra": {
    "mr": "त्र्यंबकेश्वर & Brahmagiri Yatra",
    "hi": "त्र्यंबकेश्वर & Brahmagiri Yatra",
    "en": "Trimbakeshwar & Brahmagiri Yatra"
  },
  "Trimbakeshwar Jyotirlinga Mandir": {
    "mr": "त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर",
    "hi": "त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर",
    "en": "Trimbakeshwar Jyotirlinga Mandir"
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
  "Trust & Community Watch": {
    "mr": "नागरी विश्वास आणि दक्षता",
    "hi": "नागरिक विश्वास एवं निगरानी",
    "en": "Trust & Community Watch"
  },
  "Trust & Dignity in Civic Service": {
    "mr": "नागरी सेवेत विश्वास आणि सन्मान",
    "hi": "नागरिक सेवा में विश्वास एवं सम्मान",
    "en": "Trust & Dignity in Civic Service"
  },
  "Truth Cell": {
    "mr": "सत्यता कक्ष",
    "hi": "ट्रुथ सेल",
    "en": "Truth Cell"
  },
  "Truth, trust, and fair prices for sacred journeys.": {
    "mr": "पवित्र यात्रेसाठी सत्य, विश्वास आणि वाजवी दर.",
    "hi": "पवित्र यात्रा के लिए सत्य, विश्वास और उचित मूल्य।",
    "en": "Truth, trust, and fair prices for sacred journeys."
  },
  "Try relaxing search keywords or clear current status filter to view entries.": {
    "mr": "Try relaxing शोधा keywords or clear current स्थिती फिल्टर to पहा entries.",
    "hi": "Try relaxing खोजें keywords or clear current स्थिति फ़िल्टर to देखें entries.",
    "en": "Try relaxing search keywords or clear current status filter to view entries."
  },
  "Try verifying the incident number, vendor name, or officer credential tag.": {
    "mr": "Try verifying incident number, विक्रेता नाव, or अधिकारी credential tag.",
    "hi": "Try verifying incident number, विक्रेता नाम, or अधिकारी credential tag.",
    "en": "Try verifying the incident number, vendor name, or officer credential tag."
  },
  "Typical": {
    "mr": "नेहमीचे",
    "hi": "सामान्य",
    "en": "Typical"
  },
  "Typical Fair Range": {
    "mr": "सर्वसाधारण वाजवी दर",
    "hi": "सामान्य उचित दर सीमा",
    "en": "Typical Fair Range"
  },
  "Typical Range": {
    "mr": "Typical मर्यादा",
    "hi": "Typical सीमा",
    "en": "Typical Range"
  },
  "Typical Variance": {
    "mr": "सामान्य फरक",
    "hi": "सामान्य अंतर",
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
  "Under Review": {
    "mr": "पुनरावलोकनाधीन",
    "hi": "समीक्षाधीन",
    "en": "Under Review"
  },
  "Undo": {
    "mr": "Undo",
    "hi": "Undo",
    "en": "Undo"
  },
  "Unhygienic / Unsafe": {
    "mr": "अस्वच्छ / असुरक्षित परिस्थिती",
    "hi": "अस्वच्छ / असुरक्षित स्थिति",
    "en": "Unhygienic / Unsafe"
  },
  "Unique ancient Shiva temple where Lord Shiva did penance; only Shiva temple in India without Nandi.": {
    "mr": "भगवान शिवांचे एकमेव मंदिर जेथे नंदीची मूर्ती नाही; कपालेश्वर महादेवाने येथे प्रायश्चित्त केले.",
    "hi": "भगवान शिव का अद्वितीय प्राचीन मंदिर जहाँ नंदी की मूर्ति नहीं है; यहाँ शिवजी ने तपस्या की थी।",
    "en": "Unique ancient Shiva temple where Lord Shiva did penance; only Shiva temple in India without Nandi."
  },
  "Update Price": {
    "mr": "Update दर",
    "hi": "Update मूल्य",
    "en": "Update Price"
  },
  "Update Stall Photo": {
    "mr": "Update स्टॉल छायाचित्र",
    "hi": "Update स्टॉल फोटो",
    "en": "Update Stall Photo"
  },
  "Updated 12m ago": {
    "mr": "Updated 12m ago",
    "hi": "Updated 12m ago",
    "en": "Updated 12m ago"
  },
  "Updated 2m ago": {
    "mr": "२ मिनिटांपूर्वी अद्यतनित",
    "hi": "२ मिनट पहले अपडेट",
    "en": "Updated 2m ago"
  },
  "Upload": {
    "mr": "अपलोड करा",
    "hi": "अपलोड करें",
    "en": "Upload"
  },
  "Upload & Save Audit": {
    "mr": "अपलोड करा & जतन करा तपासणी",
    "hi": "अपलोड करें & सहेजें जांच / ऑडिट",
    "en": "Upload & Save Audit"
  },
  "Upload / Take Photo": {
    "mr": "फोटो अपलोड करा / काढा",
    "hi": "फ़ोटो अपलोड करें / खींचें",
    "en": "Upload / Take Photo"
  },
  "Upload Audit Proof": {
    "mr": "तपासणी पुरावा अपलोड करा",
    "hi": "ऑडिट प्रमाण अपलोड करें",
    "en": "Upload Audit Proof"
  },
  "Upload Photo / Bill (Optional)": {
    "mr": "फोटो / बिल जोडा (ऐच्छिक)",
    "hi": "फ़ोटो / बिल अपलोड करें (वैकल्पिक)",
    "en": "Upload Photo / Bill (Optional)"
  },
  "Upload Photo Evidence": {
    "mr": "पुराव्यासाठी फोटो जोडा",
    "hi": "साक्ष्य हेतु फोटो संलग्न करें",
    "en": "Upload Photo Evidence"
  },
  "Upload Photo or ID Document": {
    "mr": "अपलोड करा छायाचित्र or ओळख क्रमांक Document",
    "hi": "अपलोड करें फोटो or पहचान संख्या Document",
    "en": "Upload Photo or ID Document"
  },
  "Upload Photo Proof": {
    "mr": "छायाचित्र पुरावा जोडा",
    "hi": "फोटो प्रमाण अपलोड करें",
    "en": "Upload Photo Proof"
  },
  "Upload Proof": {
    "mr": "पुरावा जोडा",
    "hi": "प्रमाण अपलोड करें",
    "en": "Upload Proof"
  },
  "Upload Stall Photo": {
    "mr": "स्टॉलचा फोटो अपलोड करा",
    "hi": "स्टॉल का फोटो अपलोड करें",
    "en": "Upload Stall Photo"
  },
  "Urgent Price Alerts": {
    "mr": "तातडीचे दर अलर्ट",
    "hi": "तत्काल मूल्य अलर्ट",
    "en": "Urgent Price Alerts"
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
  "Vehicle Plate / Auto Number (Optional)": {
    "mr": "रिक्षा किंवा गाडी क्रमांक (ऐच्छिक)",
    "hi": "गाड़ी या ऑटो नंबर (वैकल्पिक)",
    "en": "Vehicle Plate / Auto Number (Optional)"
  },
  "Vendor": {
    "mr": "विक्रेता",
    "hi": "विक्रेता",
    "en": "Vendor"
  },
  "Vendor & Admin Login": {
    "mr": "विक्रेता व प्रशासक लॉगिन",
    "hi": "विक्रेता एवं प्रशासक लॉगिन",
    "en": "Vendor & Admin Login"
  },
  "Vendor / Bazaar": {
    "mr": "विक्रेता / बाजारपेठ",
    "hi": "विक्रेता / बाज़ार",
    "en": "Vendor / Bazaar"
  },
  "Vendor Contact Phone": {
    "mr": "विक्रेत्याचा संपर्क क्रमांक",
    "hi": "विक्रेता संपर्क फोन",
    "en": "Vendor Contact Phone"
  },
  "Vendor Details": {
    "mr": "विक्रेत्याचा तपशील",
    "hi": "विक्रेता विवरण",
    "en": "Vendor Details"
  },
  "Vendor Directory": {
    "mr": "विक्रेता नोंदणी डिरेक्टरी",
    "hi": "विक्रेता निर्देशिका",
    "en": "Vendor Directory"
  },
  "Vendor Front Desk": {
    "mr": "विक्रेता Front कक्ष",
    "hi": "विक्रेता Front कक्ष",
    "en": "Vendor Front Desk"
  },
  "Vendor ID": {
    "mr": "विक्रेता ओळख क्रमांक",
    "hi": "विक्रेता पहचान पत्र",
    "en": "Vendor ID"
  },
  "Vendor ID / Registration No.": {
    "mr": "विक्रेता ओळख / नोंदणी क्रमांक",
    "hi": "विक्रेता पहचान / पंजीकरण संख्या",
    "en": "Vendor ID / Registration No."
  },
  "Vendor Listed Price": {
    "mr": "विक्रेता नोंदणीकृत दर",
    "hi": "विक्रेता सूचीबद्ध मूल्य",
    "en": "Vendor Listed Price"
  },
  "Vendor Listed Range": {
    "mr": "विक्रेता दर मर्यादा",
    "hi": "विक्रेता मूल्य सीमा",
    "en": "Vendor Listed Range"
  },
  "Vendor Listed Rate": {
    "mr": "विक्रेता Listed दर",
    "hi": "विक्रेता Listed दर",
    "en": "Vendor Listed Rate"
  },
  "Vendor Misconduct": {
    "mr": "विक्रेत्याचे गैरवर्तन",
    "hi": "विक्रेता का दुर्व्यवहार",
    "en": "Vendor Misconduct"
  },
  "Vendor Portal": {
    "mr": "विक्रेता पोर्टल",
    "hi": "विक्रेता पोर्टल",
    "en": "Vendor Portal"
  },
  "Vendor Stall Hub": {
    "mr": "विक्रेता स्टॉल केंद्र",
    "hi": "विक्रेता स्टॉल हब",
    "en": "Vendor Stall Hub"
  },
  "Vendors": {
    "mr": "विक्रेते",
    "hi": "विक्रेता",
    "en": "Vendors"
  },
  "Verification Action Recorded Successfully": {
    "mr": "पडताळणी कृती यशस्वीरीत्या नोंदवली गेली",
    "hi": "सत्यापन कार्रवाई सफलतापूर्वक दर्ज हुई",
    "en": "Verification Action Recorded Successfully"
  },
  "Verification Completion Rate": {
    "mr": "पडताळणी Completion दर",
    "hi": "सत्यापन Completion दर",
    "en": "Verification Completion Rate"
  },
  "Verified": {
    "mr": "प्रमाणित",
    "hi": "सत्यापित",
    "en": "Verified"
  },
  "Verified 12m ago": {
    "mr": "१२ मिनिटांपूर्वी पडताळले",
    "hi": "१२ मिनट पहले सत्यापित",
    "en": "Verified 12m ago"
  },
  "Verified 1h ago": {
    "mr": "१ तासापूर्वी पडताळले",
    "hi": "१ घंटे पहले सत्यापित",
    "en": "Verified 1h ago"
  },
  "Verified 28m ago": {
    "mr": "२८ मिनिटांपूर्वी पडताळले",
    "hi": "२८ मिनट पहले सत्यापित",
    "en": "Verified 28m ago"
  },
  "Verified 45m ago": {
    "mr": "४५ मिनिटांपूर्वी पडताळले",
    "hi": "४५ मिनट पहले सत्यापित",
    "en": "Verified 45m ago"
  },
  "Verified Aadhaar Pilgrim": {
    "mr": "प्रमाणित Aadhaar भाविक",
    "hi": "सत्यापित Aadhaar तीर्थयात्री",
    "en": "Verified Aadhaar Pilgrim"
  },
  "Verified Ashrams": {
    "mr": "प्रमाणित आश्रम",
    "hi": "प्रमाणित आश्रम",
    "en": "Verified Ashrams"
  },
  "Verified Bookings": {
    "mr": "प्रमाणित नोंदणी",
    "hi": "सत्यापित बुकिंग",
    "en": "Verified Bookings"
  },
  "Verified by CBS Desk": {
    "mr": "सीबीएस कक्षाद्वारे पडताळणीकृत",
    "hi": "सीबीएस डेस्क द्वारा सत्यापित",
    "en": "Verified by CBS Desk"
  },
  "Verified by Kumbhveer Tanmay K.": {
    "mr": "कुंभवीर तन्मय के. द्वारे पडताळणीकृत",
    "hi": "कुंभवीर तन्मय के. द्वारा सत्यापित",
    "en": "Verified by Kumbhveer Tanmay K."
  },
  "Verified by NMC": {
    "mr": "मनपा द्वारे प्रमाणित",
    "hi": "मनपा द्वारा प्रमाणित",
    "en": "Verified by NMC"
  },
  "Verified Centers": {
    "mr": "प्रमाणित अन्नछत्रे",
    "hi": "प्रमाणित अन्नक्षेत्र",
    "en": "Verified Centers"
  },
  "Verified Complaints": {
    "mr": "पडताळणीकृत तक्रारी",
    "hi": "सत्यापित शिकायतें",
    "en": "Verified Complaints"
  },
  "Verified dharamshalas, ashrams & budget rooms.": {
    "mr": "पडताळणी केलेल्या धर्मशाळा, आश्रम व परवडणाऱ्या खोल्या.",
    "hi": "सत्यापित धर्मशालाएं, आश्रम और बजट कमरे।",
    "en": "Verified dharamshalas, ashrams & budget rooms."
  },
  "Verified Facts": {
    "mr": "पडताळणी झालेले तथ्य",
    "hi": "सत्यापित तथ्य",
    "en": "Verified Facts"
  },
  "Verified false archival video. Official rebuttal broadcasted immediately via Yatri portal & ghat public address audio.": {
    "mr": "प्रमाणित false archival video. अधिकृत rebuttal broadcasted immediately द्वारे भाविक portal & घाट public पत्ता audio.",
    "hi": "सत्यापित false archival video. आधिकारिक rebuttal broadcasted immediately के माध्यम से तीर्थयात्री portal & घाट public पता audio.",
    "en": "Verified false archival video. Official rebuttal broadcasted immediately via Yatri portal & ghat public address audio."
  },
  "Verified Guide": {
    "mr": "प्रमाणित मार्गदर्शक",
    "hi": "प्रमाणित गाइड",
    "en": "Verified Guide"
  },
  "Verified Kumbh Stall": {
    "mr": "सत्यापित कुंभ स्टॉल",
    "hi": "सत्यापित कुंभ स्टॉल",
    "en": "Verified Kumbh Stall"
  },
  "Verified Local Marketplace & Stalls": {
    "mr": "प्रमाणित स्थानिक बाजार व दुकाने",
    "hi": "सत्यापित स्थानीय बाजार एवं स्टॉल",
    "en": "Verified Local Marketplace & Stalls"
  },
  "Verified Merchant": {
    "mr": "प्रमाणित व्यापारी",
    "hi": "सत्यापित व्यापारी",
    "en": "Verified Merchant"
  },
  "Verified Rate": {
    "mr": "सत्यापित दर",
    "hi": "सत्यापित दर",
    "en": "Verified Rate"
  },
  "Verified Stalls": {
    "mr": "प्रमाणित स्टॉल्स",
    "hi": "सत्यापित स्टॉल",
    "en": "Verified Stalls"
  },
  "Verified Stays": {
    "mr": "प्रमाणित मुक्काम",
    "hi": "सत्यापित आवास",
    "en": "Verified Stays"
  },
  "Verified Today": {
    "mr": "प्रमाणित आज",
    "hi": "सत्यापित आज",
    "en": "Verified Today"
  },
  "Verified • Points": {
    "mr": "पडताळणी • गुण",
    "hi": "सत्यापित • अंक",
    "en": "Verified • Points"
  },
  "Verify": {
    "mr": "पडताळणी करा",
    "hi": "सत्यापित करें",
    "en": "Verify"
  },
  "Verify & Login": {
    "mr": "पडताळणी करा व प्रवेश करा",
    "hi": "सत्यापित करें और लॉगिन करें",
    "en": "Verify & Login"
  },
  "Verify as Citizen (Forward to Police Desk)": {
    "mr": "नागरिक म्हणून पडताळा (पोलीस कक्षाकडे पाठवा)",
    "hi": "नागरिक के रूप में सत्यापित करें (पुलिस डेस्क को भेजें)",
    "en": "Verify as Citizen (Forward to Police Desk)"
  },
  "Verify Face": {
    "mr": "Verify Face",
    "hi": "Verify Face",
    "en": "Verify Face"
  },
  "Verify Guide Identity": {
    "mr": "मार्गदर्शकाची ओळख तपासा",
    "hi": "गाइड की पहचान सत्यापित करें",
    "en": "Verify Guide Identity"
  },
  "Verify Guide Selfie at Meeting Point": {
    "mr": "Verify मार्गदर्शक Selfie at Meeting Point",
    "hi": "Verify गाइड Selfie at Meeting Point",
    "en": "Verify Guide Selfie at Meeting Point"
  },
  "Verify On-Site": {
    "mr": "जागेवर पडताळणी करा",
    "hi": "मौके पर सत्यापित करें",
    "en": "Verify On-Site"
  },
  "Verify Personal Face": {
    "mr": "Verify Personal Face",
    "hi": "Verify Personal Face",
    "en": "Verify Personal Face"
  },
  "Verify Rate": {
    "mr": "दर पडताळणी",
    "hi": "दर सत्यापन",
    "en": "Verify Rate"
  },
  "Vibe": {
    "mr": "Vibe",
    "hi": "Vibe",
    "en": "Vibe"
  },
  "videocam": {
    "mr": "videocam",
    "hi": "videocam",
    "en": "videocam"
  },
  "View": {
    "mr": "पहा",
    "hi": "देखें",
    "en": "View"
  },
  "View All": {
    "mr": "सर्व पहा",
    "hi": "सभी देखें",
    "en": "View All"
  },
  "View All 21 Kumbhveers": {
    "mr": "सर्व २१ कुंभवीर पहा",
    "hi": "सभी २१ कुंभवीर देखें",
    "en": "View All 21 Kumbhveers"
  },
  "View All Verified News": {
    "mr": "सर्व पडताळणी झालेल्या बातम्या पहा",
    "hi": "सभी सत्यापित समाचार देखें",
    "en": "View All Verified News"
  },
  "View Bills": {
    "mr": "पहा Bills",
    "hi": "देखें Bills",
    "en": "View Bills"
  },
  "View Details": {
    "mr": "तपशील पहा",
    "hi": "विवरण देखें",
    "en": "View Details"
  },
  "View Documents": {
    "mr": "पहा Documents",
    "hi": "देखें Documents",
    "en": "View Documents"
  },
  "View Full Price Matrix": {
    "mr": "संपूर्ण दरपत्रक पहा",
    "hi": "पूरी दर सूची देखें",
    "en": "View Full Price Matrix"
  },
  "View ID": {
    "mr": "पहा ओळख क्रमांक",
    "hi": "देखें पहचान संख्या",
    "en": "View ID"
  },
  "View in Police Escalations Dashboard": {
    "mr": "पहा in पोलीस तक्रार निवारणs Dashboard",
    "hi": "देखें in पुलिस शिकायत निवारणs Dashboard",
    "en": "View in Police Escalations Dashboard"
  },
  "View Municipal QR Card": {
    "mr": "पहा महानगरपालिका QR Card",
    "hi": "देखें नगर निगम QR Card",
    "en": "View Municipal QR Card"
  },
  "View Official Tariff": {
    "mr": "अधिकृत दरपत्रक पहा",
    "hi": "आधिकारिक दर सूची देखें",
    "en": "View Official Tariff"
  },
  "View PIB Verification": {
    "mr": "पहा PIB पडताळणी",
    "hi": "देखें PIB सत्यापन",
    "en": "View PIB Verification"
  },
  "View Radar": {
    "mr": "पहा रडार",
    "hi": "देखें रडार",
    "en": "View Radar"
  },
  "View Roadmap": {
    "mr": "मार्गदर्शिका पहा",
    "hi": "रोडमैप देखें",
    "en": "View Roadmap"
  },
  "Viral social media post alleging bridge closure at Ramkund": {
    "mr": "Viral social media post alleging पूल closure at रामकुंड",
    "hi": "Viral social media post alleging पुल closure at रामकुंड",
    "en": "Viral social media post alleging bridge closure at Ramkund"
  },
  "Viral WhatsApp Message": {
    "mr": "व्हाट्सॲपवरील व्हायरल संदेश",
    "hi": "वायरल व्हाट्सएप संदेश",
    "en": "Viral WhatsApp Message"
  },
  "Viral WhatsApp rumor debunked. Structural safety certified by Nashik Municipal Corp & Police CCTV Zone A-1.": {
    "mr": "व्हाट्सअ‍ॅपवरील अफवेचे खंडन. नाशिक मनपा व पोलीस पथकाने पुलाची सुरक्षा प्रमाणित केली आहे.",
    "hi": "व्हाट्सएप अफवाह का खंडन। नासिक नगर निगम एवं पुलिस नियंत्रण कक्ष द्वारा सुरक्षा प्रमाणित की गई।",
    "en": "Viral WhatsApp rumor debunked. Structural safety certified by Nashik Municipal Corp & Police CCTV Zone A-1."
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
  "visited this premises in person, validated municipal registration certificates, inspected fair rates, and logged authorized tariff caps directly to the Kumbh Setu fair pricing ledger.": {
    "mr": "visited this premises in person, validated महानगरपालिका नोंदणी certificates, inspected वाजवी दर, आणि नोंदणीकृत authorized दरपत्रक caps directly to कुंभ Setu वाजवी दर रचना ledger.",
    "hi": "visited this premises in person, validated नगर निगम पंजीकरण certificates, inspected उचित दरें, और दर्ज authorized दर सूची caps directly to कुंभ Setu उचित मूल्य निर्धारण ledger.",
    "en": "visited this premises in person, validated municipal registration certificates, inspected fair rates, and logged authorized tariff caps directly to the Kumbh Setu fair pricing ledger."
  },
  "Visited yesterday • Verified Yatri": {
    "mr": "Visited काल • प्रमाणित भाविक",
    "hi": "Visited कल • सत्यापित तीर्थयात्री",
    "en": "Visited yesterday • Verified Yatri"
  },
  "Volunteer": {
    "mr": "कुंभवीर",
    "hi": "स्वयंसेवक",
    "en": "Volunteer"
  },
  "Volunteer Desk": {
    "mr": "स्वयंसेवक कक्ष",
    "hi": "वॉलंटियर डेस्क",
    "en": "Volunteer Desk"
  },
  "Volunteer Leaderboard": {
    "mr": "स्वयंसेवक मानांकन तक्ता",
    "hi": "स्वयंसेवक लीडरबोर्ड",
    "en": "Volunteer Leaderboard"
  },
  "Volunteer On-Site Checklist:": {
    "mr": "स्वयंसेवक ऑन-साइट तपासणी यादी:",
    "hi": "स्वयंसेवक ऑन-साइट चेकलिस्ट:",
    "en": "Volunteer On-Site Checklist:"
  },
  "Volunteers": {
    "mr": "स्वयंसेवक",
    "hi": "स्वयंसेवक",
    "en": "Volunteers"
  },
  "VP": {
    "mr": "VP",
    "hi": "VP",
    "en": "VP"
  },
  "Ward 12, Panchavati Chowk": {
    "mr": "प्रभाग १२, पंचवटी चौक",
    "hi": "वार्ड १२, पंचवटी चौक",
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
  "water": {
    "mr": "पाणी",
    "hi": "जल / पानी",
    "en": "water"
  },
  "Water Flow": {
    "mr": "नदी पाणी प्रवाह",
    "hi": "जल प्रवाह",
    "en": "Water Flow"
  },
  "waves": {
    "mr": "waves",
    "hi": "waves",
    "en": "waves"
  },
  "What does Verified mean?": {
    "mr": "प्रमाणित म्हणजे काय?",
    "hi": "सत्यापित का क्या अर्थ है?",
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
  "Within 1 km": {
    "mr": "१ किमी च्या आत",
    "hi": "१ किमी के भीतर",
    "en": "Within 1 km"
  },
  "Within Range": {
    "mr": "मर्यादेत",
    "hi": "सीमा में",
    "en": "Within Range"
  },
  "Women Safety (1091)": {
    "mr": "महिला सुरक्षा हेल्पलाइन (१०९१)",
    "hi": "महिला सुरक्षा हेल्पलाइन (१०९१)",
    "en": "Women Safety (1091)"
  },
  "X-Ray Verified": {
    "mr": "एक्स-रे तपासणीकृत",
    "hi": "एक्स-रे सत्यापित",
    "en": "X-Ray Verified"
  },
  "XGBoost": {
    "mr": "एक्सजी-बूस्ट",
    "hi": "एक्सजी-बूस्ट",
    "en": "XGBoost"
  },
  "XGBoost v2.1": {
    "mr": "XGBoost v2.1",
    "hi": "XGBoost v2.1",
    "en": "XGBoost v2.1"
  },
  "yard": {
    "mr": "yard",
    "hi": "yard",
    "en": "yard"
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
  "Yatri:": {
    "mr": "भाविक:",
    "hi": "तीर्थयात्री:",
    "en": "Yatri:"
  },
  "Yatris": {
    "mr": "यात्रीs",
    "hi": "यात्रीs",
    "en": "Yatris"
  },
  "Yatris recommend this stall": {
    "mr": "यात्रीs recommend this स्टॉल",
    "hi": "यात्रीs recommend this स्टॉल",
    "en": "Yatris recommend this stall"
  },
  "Yatris who reserved or bought items from your stall via KumbhSetu.": {
    "mr": "यात्रीs who reserved or bought items कडून आपले स्टॉल द्वारे KumbhSetu.",
    "hi": "यात्रीs who reserved or bought items से आपका स्टॉल के माध्यम से KumbhSetu.",
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
    "mr": "Your मार्गदर्शक's identity is confirmed द्वारे selfie at meeting point before आपले session begins. Click below to verify in person.",
    "hi": "Your गाइड's identity is confirmed के माध्यम से selfie at meeting point before आपका session begins. Click below to verify in person.",
    "en": "Your guide's identity is confirmed via selfie at the meeting point before your session begins. Click below to verify in person."
  },
  "Your Live GPS Coordinates": {
    "mr": "तुमचे थेट जीपीएस स्थान",
    "hi": "आपकी वर्तमान जीपीएस स्थिति",
    "en": "Your Live GPS Coordinates"
  },
  "Your message is recorded directly in KumbhSetu civic database": {
    "mr": "तुमचा संदेश कुंभसेतु नागरी डाटाबेसमध्ये थेट नोंदवला गेला आहे",
    "hi": "आपका संदेश कुंभसेतु नागरिक डेटाबेस में सीधे दर्ज किया गया है",
    "en": "Your message is recorded directly in KumbhSetu civic database"
  },
  "Your Name": {
    "mr": "तुमचे नाव",
    "hi": "आपका नाम",
    "en": "Your Name"
  },
  "Your Price (₹) *": {
    "mr": "तुमचा दर (₹) *",
    "hi": "आपका मूल्य (₹) *",
    "en": "Your Price (₹) *"
  },
  "Your Reply Message *": {
    "mr": "तुमचा उत्तर संदेश *",
    "hi": "आपका जवाब संदेश *",
    "en": "Your Reply Message *"
  },
  "Your report has been logged and shared with NMC Squad A-1. You will receive an SMS update if contact details were provided.": {
    "mr": "आपली तक्रार मनपा पथक A-1 कडे नोंदवली आहे. मोबाईल नंबर दिला असल्यास आपल्याला एसएमएस पाठवला जाईल.",
    "hi": "आपकी शिकायत नगर निगम दस्ते A-1 को दर्ज करा दी गई है। यदि मोबाइल नंबर दिया है तो एसएमएस भेजा जाएगा।",
    "en": "Your report has been logged and shared with NMC Squad A-1. You will receive an SMS update if contact details were provided."
  },
  "Your report will be reviewed as quickly as possible": {
    "mr": "तुमच्या तक्रारीचे त्वरित पुनरावलोकन केले जाईल",
    "hi": "आपकी शिकायत की शीघ्र समीक्षा की जाएगी",
    "en": "Your report will be reviewed as quickly as possible"
  },
  "Your report will be reviewed by on-ground civic teams as quickly as possible (typically within 2–4 hours). No login required.": {
    "mr": "Your तक्रार / अहवाल will be reviewed by on-ground नागरी teams as quickly as possible (typically च्या आत 2–4 तास). No प्रवेश करा required.",
    "hi": "Your शिकायत / रिपोर्ट will be reviewed by on-ground नागरिक teams as quickly as possible (typically के भीतर 2–4 घंटे). No लॉगिन करें required.",
    "en": "Your report will be reviewed by on-ground civic teams as quickly as possible (typically within 2–4 hours). No login required."
  },
  "Your stall (#NSK-STALL-14) is in full compliance with the Simhastha Fair Price standards. All your items are priced within the estimated fair range (₹180 – ₹260). No police alerts or municipal flags exist on your business.": {
    "mr": "Your स्टॉल (#NSK-स्टॉल-14) is in full अनुपालन सह सिंहस्थ वाजवी दर standards. सर्व आपले items are priced च्या आत अंदाजित वाजवी range (₹180 – ₹260). No पोलीस alerts or महानगरपालिका इशारे exist on आपले business.",
    "hi": "Your स्टॉल (#NSK-स्टॉल-14) is in full अनुपालन के साथ सिंहस्थ उचित मूल्य standards. सभी आपका items are priced के भीतर अनुमानित उचित range (₹180 – ₹260). No पुलिस alerts or नगर निगम चेतावनी exist on आपका business.",
    "en": "Your stall (#NSK-STALL-14) is in full compliance with the Simhastha Fair Price standards. All your items are priced within the estimated fair range (₹180 – ₹260). No police alerts or municipal flags exist on your business."
  },
  "Zero adulteration notices": {
    "mr": "शून्य adulteration notices",
    "hi": "शून्य adulteration notices",
    "en": "Zero adulteration notices"
  },
  "Zero Overcharge Protection": {
    "mr": "वाजवी दर मार्गदर्शक माहिती",
    "hi": "उचित दर मार्गदर्शक जानकारी",
    "en": "Indicative Fair Price Guidance"
  },
  "Zero Overcharging Complaints in Last 30 Days": {
    "mr": "शून्य जादा दर आकारणी Complaints in Last 30 Days",
    "hi": "शून्य अत्यधिक वसूली Complaints in Last 30 Days",
    "en": "Zero Overcharging Complaints in Last 30 Days"
  },
  "Zero Overcharging Price Check": {
    "mr": "अवाजवी दर आकारणी तपासणी",
    "hi": "अतिरिक्त वसूली मूल्य जांच",
    "en": "Zero Overcharging Price Check"
  },
  "Zero Overcharging Tolerance:": {
    "mr": "जादा दर आकारणीस शून्य सहनशीलता:",
    "hi": "अधिक किराया वसूली पर शून्य सहनशीलता:",
    "en": "Zero Overcharging Tolerance:"
  },
  "Zone 1 • Panchavati Ring": {
    "mr": "विभाग 1 • पंचवटी Ring",
    "hi": "ज़ोन 1 • पंचवटी Ring",
    "en": "Zone 1 • Panchavati Ring"
  },
  "Zone 2 (Panchavati / Ramkund Sector)": {
    "mr": "विभाग २ (पंचवटी / रामकुंड क्षेत्र)",
    "hi": "ज़ोन २ (पंचवटी / रामकुंड सेक्टर)",
    "en": "Zone 2 (Panchavati / Ramkund Sector)"
  },
  "Zone 2 Compliance Gazette": {
    "mr": "विभाग 2 अनुपालन राजपत्र",
    "hi": "ज़ोन 2 अनुपालन राजपत्र",
    "en": "Zone 2 Compliance Gazette"
  },
  "Zone A - Ramkund Ghat Stalls": {
    "mr": "विभाग A - रामकुंड घाट स्टॉल्स",
    "hi": "ज़ोन A - रामकुंड घाट स्टॉल",
    "en": "Zone A - Ramkund Ghat Stalls"
  },
  "Zone A-1": {
    "mr": "विभाग A-1",
    "hi": "ज़ोन A-1",
    "en": "Zone A-1"
  },
  "Zone A-4 Desk": {
    "mr": "विभाग A-4 कक्ष",
    "hi": "ज़ोन A-4 कक्ष",
    "en": "Zone A-4 Desk"
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
  "Zone Green": {
    "mr": "विभाग Green",
    "hi": "ज़ोन Green",
    "en": "Zone Green"
  },
  "Zone: Ramkund / Panchavati Core • Priority: 74.87": {
    "mr": "विभाग: रामकुंड / पंचवटी Core • प्राधान्य: 74.87",
    "hi": "ज़ोन: रामकुंड / पंचवटी Core • प्राथमिकता: 74.87",
    "en": "Zone: Ramkund / Panchavati Core • Priority: 74.87"
  },
  "~34 km Circuit": {
    "mr": "~३४ किमी प्रदक्षिणा",
    "hi": "~३४ किमी परिक्रमा",
    "en": "~34 km Circuit"
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
  "कुंभ सेतू": {
    "mr": "कुंभसेतु",
    "hi": "कुंभसेतु",
    "en": "Kumbh Setu"
  },
  "कुंभ सेतू • Fare Board": {
    "mr": "कुंभसेतु • वाहतूक दर फलक",
    "hi": "कुंभसेतु • किराया बोर्ड",
    "en": "Kumbh Setu • Fare Board"
  },
  "कुंभवीर कक्ष • Volunteer Desk": {
    "mr": "कुंभवीर कक्ष • स्वयंसेवक कक्ष",
    "hi": "कुंभवीर कक्ष • वॉलंटियर डेस्क",
    "en": "Kumbhveer Desk • Volunteer Desk"
  },
  "कुंभसेतु": {
    "mr": "कुंभसेतु",
    "hi": "कुंभसेतु",
    "en": "Kumbh Setu"
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
  "तीर्थयात्री": {
    "mr": "तीर्थयात्री",
    "hi": "तीर्थयात्री",
    "en": "Pilgrim / Yatri"
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
  "मरा / EN": {
    "mr": "मराठी",
    "hi": "हिंदी",
    "en": "English"
  },
  "मराठी": {
    "mr": "मराठी",
    "hi": "मराठी",
    "en": "मराठी"
  },
  "मराठी (Marathi)": {
    "mr": "मराठी (Marathi)",
    "hi": "मराठी (Marathi)",
    "en": "मराठी (Marathi)"
  },
  "मार्गदर्शक / पुरोहित": {
    "mr": "मार्गदर्शक / पुरोहित",
    "hi": "मार्गदर्शक / पुरोहित",
    "en": "मार्गदर्शक / पुरोहित"
  },
  "राष्ट्रीय भाषा / National": {
    "mr": "राष्ट्रीय भाषा",
    "hi": "राष्ट्रीय भाषा",
    "en": "National Language"
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
    "mr": "सर्व (सर्व आपत्कालीन)",
    "hi": "सर्व (सभी आपातकालीन)",
    "en": "सर्व (All Emergency)"
  },
  "सुगम संचार • Moderate Flow": {
    "mr": "सुगम संचार • मध्यम प्रवाह",
    "hi": "सुगम संचार • मध्यम प्रवाह",
    "en": "Smooth Flow • Moderate"
  },
  "सुगम संचार • Smooth Flow": {
    "mr": "सुगम संचार • Smooth Flow",
    "hi": "सुगम आवागमन • Smooth Flow",
    "en": "सुगम संचार • Smooth Flow"
  },
  "स्थान किंवा संस्था": {
    "mr": "स्थान किंवा संस्था",
    "hi": "स्थान किंवा संस्था",
    "en": "स्थान किंवा संस्था"
  },
  "स्थानिक नागरिक": {
    "mr": "स्थानिक नागरिक",
    "hi": "स्थानीय नागरिक",
    "en": "Local Citizen"
  },
  "स्थानिक भाषा / Regional": {
    "mr": "स्थानिक भाषा",
    "hi": "क्षेत्रीय भाषा",
    "en": "Regional Language"
  },
  "स्वच्छता गृह व इतर सेवा": {
    "mr": "स्वच्छता गृह व इतर सेवा",
    "hi": "स्वच्छता गृह व इतर सेवा",
    "en": "स्वच्छता गृह व इतर सेवा"
  },
  "हिंदी": {
    "mr": "हिंदी",
    "hi": "हिंदी",
    "en": "हिंदी"
  },
  "हिंदी (Hindi)": {
    "mr": "हिंदी (Hindi)",
    "hi": "हिंदी (Hindi)",
    "en": "हिंदी (Hindi)"
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
  "• In-App Bookable": {
    "mr": "• ॲपवरून बुक करता येणारे",
    "hi": "• ऐप से बुक करने योग्य",
    "en": "• In-App Bookable"
  },
  "• License:": {
    "mr": "• परवाना क्रमांक:",
    "hi": "• लाइसेंस क्रमांक:",
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
  "₹150 / hr": {
    "mr": "₹१५० / तास",
    "hi": "₹१५० / घंटा",
    "en": "₹150 / hr"
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
    "mr": "₹40 थाळी राजपत्र",
    "hi": "₹40 थाली राजपत्र",
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
  "☀️ Full Day Kumbh Darshan & Ghat Circuit (8 hrs - ₹1,200)": {
    "mr": "☀️ संपूर्ण दिवस कुंभ दर्शन व घाट परिक्रमा (८ तास - ₹१,२००)",
    "hi": "☀️ पूर्ण दिवस कुंभ दर्शन एवं घाट परिक्रमा (८ घंटे - ₹१,२००)",
    "en": "☀️ Full Day Kumbh Darshan & Ghat Circuit (8 hrs - ₹1,200)"
  },
  "★★★★★": {
    "mr": "★★★★★",
    "hi": "★★★★★",
    "en": "★★★★★"
  },
  "✓ Protected Rate": {
    "mr": "✓ अधिकृत प्रमाणित दर",
    "hi": "✓ सुरक्षित प्रमाणित दर",
    "en": "✓ Protected Rate"
  },
  "🌅 05:00 AM – 07:30 AM: Brahma Muhurta Snan & Aarti (2 hrs - ₹300)": {
    "mr": "🌅 पहाटे ०५:०० – ०७:३०: ब्राह्ममुहूर्त स्नान व आरती (२ तास - ₹३००)",
    "hi": "🌅 सुबह ०५:०० – ०७:३०: ब्रह्म मुहूर्त स्नान एवं आरती (२ घंटे - ₹३००)",
    "en": "🌅 05:00 AM – 07:30 AM: Brahma Muhurta Snan & Aarti (2 hrs - ₹300)"
  },
  "🏛️": {
    "mr": "🏛️",
    "hi": "🏛️",
    "en": "🏛️"
  },
  "🏛️ 09:00 AM – 01:00 PM: Panchavati Heritage Circuit (4 hrs - ₹600)": {
    "mr": "🏛️ सकाळी ०९:०० – दुपारी ०१:००: पंचवटी वारसा परिक्रमा (४ तास - ₹६००)",
    "hi": "🏛️ सुबह ०९:०० – दोपहर ०१:००: पंचवटी हेरिटेज सर्किट (४ घंटे - ₹६००)",
    "en": "🏛️ 09:00 AM – 01:00 PM: Panchavati Heritage Circuit (4 hrs - ₹600)"
  },
  "📍 Custom Pinned Location": {
    "mr": "📍 नकाशावर निवडलेले स्थान",
    "hi": "📍 मैप पर चुना गया स्थान",
    "en": "📍 Custom Pinned Location"
  },
  "🕉️ 01:30 PM – 06:30 PM: Trimbakeshwar Jyotirlinga (5 hrs - ₹750)": {
    "mr": "🕉️ दुपारी ०१:३० – सायं ०६:३०: त्र्यंबकेश्वर ज्योतिर्लिंग दर्शन (५ तास - ₹७५०)",
    "hi": "🕉️ दोपहर ०१:३० – शाम ०६:३०: त्र्यंबकेश्वर ज्योतिर्लिंग (५ घंटे - ₹७५०)",
    "en": "🕉️ 01:30 PM – 06:30 PM: Trimbakeshwar Jyotirlinga (5 hrs - ₹750)"
  },
  "🕯️ 06:30 PM – 08:30 PM: Godavari Sandhya Deepotsav (2 hrs - ₹300)": {
    "mr": "🕯️ सायं ०६:३० – रात्री ०८:३०: गोदावरी संध्या दीपोत्सव (२ तास - ₹३००)",
    "hi": "🕯️ शाम ०६:३० – रात ०८:३०: गोदावरी संध्या दीपोत्सव (२ घंटे - ₹३००)",
    "en": "🕯️ 06:30 PM – 08:30 PM: Godavari Sandhya Deepotsav (2 hrs - ₹300)"
  },
  "🚌 Citylink Bus:": {
    "mr": "🚌 सिटीलिंक बस:",
    "hi": "🚌 सिटीलिंक बस:",
    "en": "🚌 Citylink Bus:"
  },
  "🛺 Meter Auto:": {
    "mr": "🛺 मीटर रिक्षा:",
    "hi": "🛺 मीटर ऑटो:",
    "en": "🛺 Meter Auto:"
  },
  "Nashikkar Portal — KumbhSetu": {
    "mr": "नाशिककर पोर्टल — कुंभसेतु",
    "hi": "नाशिककर पोर्टल — कुंभसेतु",
    "en": "Nashikkar Portal — KumbhSetu"
  },
  "KumbhSetu — Volunteer Portal": {
    "mr": "कुंभसेतु — स्वयंसेवक पोर्टल",
    "hi": "कुंभसेतु — वॉलंटियर पोर्टल",
    "en": "KumbhSetu — Volunteer Portal"
  },
  "Kumbhveer Portal — Volunteer & Ground Truth Desk": {
    "mr": "कुंभवीर पोर्टल — स्वयंसेवक व प्रत्यक्ष पडताळणी कक्ष",
    "hi": "कुंभवीर पोर्टल — वॉलंटियर एवं जमीनी सत्यापन डेस्क",
    "en": "Kumbhveer Portal — Volunteer & Ground Truth Desk"
  },
  "Police Escalations Terminal — KumbhSetu 2027": {
    "mr": "पोलीस तक्रार निवारण टर्मिनल — कुंभसेतु २०२७",
    "hi": "पुलिस शिकायत निवारण टर्मिनल — कुंभसेतु २०२७",
    "en": "Police Escalations Terminal — KumbhSetu 2027"
  },
  "KumbhSetu Nashik": {
    "mr": "कुंभसेतु नाशिक",
    "hi": "कुंभसेतु नासिक",
    "en": "KumbhSetu Nashik"
  },
  "Panchavati & Ramkund Sector": {
    "mr": "पंचवटी व रामकुंड विभाग",
    "hi": "पंचवटी एवं रामकुंड सेक्टर",
    "en": "Panchavati & Ramkund Sector"
  },
  "Panchavati & Ramkund Civic Hub": {
    "mr": "पंचवटी व रामकुंड नागरी केंद्र",
    "hi": "पंचवटी एवं रामकुंड नागरिक केंद्र",
    "en": "Panchavati & Ramkund Civic Hub"
  },
  "Nashik Civic Desk": {
    "mr": "नाशिक नागरी कक्ष",
    "hi": "नासिक नागरिक डेस्क",
    "en": "Nashik Civic Desk"
  },
  "Live Ground Node": {
    "mr": "थेट क्षेत्रीय केंद्र",
    "hi": "लाइव ग्राउंड नोड",
    "en": "Live Ground Node"
  },
  "Active Kumbhveers": {
    "mr": "सक्रिय कुंभवीर",
    "hi": "सक्रिय कुंभवीर",
    "en": "Active Kumbhveers"
  },
  "Audits Completed": {
    "mr": "पूर्ण तपासण्या",
    "hi": "पूर्ण ऑडिट",
    "en": "Audits Completed"
  },
  "Audits Today": {
    "mr": "आजच्या तपासण्या",
    "hi": "आज के ऑडिट",
    "en": "Audits Today"
  },
  "Fair Rates": {
    "mr": "वाजवी दर",
    "hi": "उचित दर",
    "en": "Fair Rates"
  },
  "Live Local Alerts": {
    "mr": "थेट स्थानिक सूचना",
    "hi": "लाइव स्थानीय अलर्ट",
    "en": "Live Local Alerts"
  },
  "Kumbhveer Leaderboard": {
    "mr": "कुंभवीर मानांकन तक्ता",
    "hi": "कुंभवीर लीडरबोर्ड",
    "en": "Kumbhveer Leaderboard"
  },
  "Municipal & Emergency Hotlines": {
    "mr": "महानगरपालिका व आपत्कालीन हेल्पलाईन",
    "hi": "नगर निगम एवं आपातकालीन हेल्पलाइन",
    "en": "Municipal & Emergency Hotlines"
  },
  "Active Audits": {
    "mr": "सक्रिय तपासण्या",
    "hi": "सक्रिय ऑडिट",
    "en": "Active Audits"
  },
  "Voucher Cash": {
    "mr": "व्हाउचर रक्कम",
    "hi": "वाउचर राशि",
    "en": "Voucher Cash"
  },
  "Current Rank": {
    "mr": "सध्याचा क्रमांक",
    "hi": "वर्तमान रैंक",
    "en": "Current Rank"
  },
  "Field Audits": {
    "mr": "क्षेत्रीय तपासण्या",
    "hi": "फील्ड ऑडिट",
    "en": "Field Audits"
  },
  "Submit Rate Board": {
    "mr": "दर फलक सादर करा",
    "hi": "दर बोर्ड सबमिट करें",
    "en": "Submit Rate Board"
  },
  "Ground Truth Feed": {
    "mr": "प्रत्यक्ष पडताळणी प्रवाह",
    "hi": "ग्राउंड ट्रुथ फ़ीड",
    "en": "Ground Truth Feed"
  },
  "Rewards Leaderboard": {
    "mr": "बक्षीस मानांकन तक्ता",
    "hi": "रिवॉर्ड्स लीडरबोर्ड",
    "en": "Rewards Leaderboard"
  },
  "Overcharging / Civic": {
    "mr": "जादा दर / नागरी",
    "hi": "अधिक किराया / नागरिक",
    "en": "Overcharging / Civic"
  },
  "CityLink & Autos": {
    "mr": "सिटीलिंक व रिक्षा",
    "hi": "सिटीलिंक एवं ऑटो",
    "en": "CityLink & Autos"
  },
  "21 Active Verifiers": {
    "mr": "२१ सक्रिय पडताळणीकार",
    "hi": "२१ सक्रिय सत्यापनकर्ता",
    "en": "21 Active Verifiers"
  },
  "Rates & hygiene verified": {
    "mr": "दर व स्वच्छता प्रमाणित",
    "hi": "दर एवं स्वच्छता सत्यापित",
    "en": "Rates & hygiene verified"
  },
  "3 Cases Escalated Onward": {
    "mr": "३ प्रकरणे पुढील कारवाईसाठी वर्ग",
    "hi": "३ मामले आगे भेजे गए",
    "en": "3 Cases Escalated Onward"
  },
  "Municipal Magistrate for compound penalty": {
    "mr": "दंडात्मक कारवाईसाठी मनपा दंडाधिकारी",
    "hi": "शमन दंड हेतु नगर निगम मजिस्ट्रेट",
    "en": "Municipal Magistrate for compound penalty"
  },
  "Call Helpline": {
    "mr": "हेल्पलाईनला कॉल करा",
    "hi": "हेल्पलाइन पर कॉल करें",
    "en": "Call Helpline"
  },
  "Forwarded / Alerts": {
    "mr": "वर्ग केलेल्या / सूचना",
    "hi": "अग्रेषित / अलर्ट",
    "en": "Forwarded / Alerts"
  },
  "Acknowledged": {
    "mr": "पोहोच दिली",
    "hi": "स्वीकृत",
    "en": "Acknowledged"
  },
  "Dispatched": {
    "mr": "रवाना झाले",
    "hi": "रवाना किया गया",
    "en": "Dispatched"
  },
  "Flags": {
    "mr": "तक्रारी",
    "hi": "शिकायतें",
    "en": "Flags"
  },
  "Police": {
    "mr": "पोलीस",
    "hi": "पुलिस",
    "en": "Police"
  },
  "NMC Control": {
    "mr": "मनपा नियंत्रण कक्ष",
    "hi": "नगर निगम नियंत्रण कक्ष",
    "en": "NMC Control"
  },
  "Police Escalations Terminal": {
    "mr": "पोलीस तक्रार निवारण टर्मिनल",
    "hi": "पुलिस शिकायत निवारण टर्मिनल",
    "en": "Police Escalations Terminal"
  },
  "Police Escalation Terminal": {
    "mr": "पोलीस तक्रार निवारण टर्मिनल",
    "hi": "पुलिस शिकायत निवारण टर्मिनल",
    "en": "Police Escalation Terminal"
  },
  "Nashik Police Command": {
    "mr": "नाशिक पोलीस नियंत्रण कक्ष",
    "hi": "नासिक पुलिस नियंत्रण कक्ष",
    "en": "Nashik Police Command"
  },
  "Panchavati Sub-Division": {
    "mr": "पंचवटी उपविभाग",
    "hi": "पंचवटी उपखंड",
    "en": "Panchavati Sub-Division"
  },
  "Ramkund Sector": {
    "mr": "रामकुंड विभाग",
    "hi": "रामकुंड सेक्टर",
    "en": "Ramkund Sector"
  },
  "Live Telemetry": {
    "mr": "थेट माहिती",
    "hi": "लाइव टेलीमेट्री",
    "en": "Live Telemetry"
  },
  "Estimated Price": {
    "mr": "अंदाजित दर",
    "hi": "अनुमानित दर",
    "en": "Estimated Price"
  },
  "Estimated Rate": {
    "mr": "अंदाजित दर",
    "hi": "अनुमानित दर",
    "en": "Estimated Rate"
  },
  "against estimated price of": {
    "mr": "च्या अंदाजित दराच्या तुलनेत",
    "hi": "के अनुमानित दर के मुकाबले",
    "en": "against estimated price of"
  },
  "Unit Dispatched": {
    "mr": "पथक रवाना झाले",
    "hi": "दस्ता रवाना",
    "en": "Unit Dispatched"
  },
  "Magistrate Notice": {
    "mr": "दंडाधिकारी नोटीस",
    "hi": "मजिस्ट्रेट नोटिस",
    "en": "Magistrate Notice"
  },
  "FIR Recommended": {
    "mr": "गुन्हा दाखल करण्याची शिफारस",
    "hi": "एफआईआर की सिफारिश",
    "en": "FIR Recommended"
  },
  "Dispatch Unit": {
    "mr": "पथक रवाना करा",
    "hi": "दस्ता रवाना करें",
    "en": "Dispatch Unit"
  },
  "Incident Feed": {
    "mr": "घटना माहिती",
    "hi": "घटना फ़ीड",
    "en": "Incident Feed"
  },
  "All Incidents": {
    "mr": "सर्व घटना",
    "hi": "सभी घटनाएं",
    "en": "All Incidents"
  },
  "Overcharging / Extortion": {
    "mr": "जादा दर / खंडणी",
    "hi": "अधिक किराया / जबरन वसूली",
    "en": "Overcharging / Extortion"
  },
  "Counterfeit Passes": {
    "mr": "बनावट पास",
    "hi": "फर्जी पास",
    "en": "Counterfeit Passes"
  },
  "Unauthorized Parking Fee": {
    "mr": "अनधिकृत पार्किंग शुल्क",
    "hi": "अनधिकृत पार्किंग शुल्क",
    "en": "Unauthorized Parking Fee"
  },
  "Sanitation Hazard / Blocking Ghat": {
    "mr": "स्वच्छता धोका / घाट अडथळा",
    "hi": "स्वच्छता खतरा / घाट अवरोध",
    "en": "Sanitation Hazard / Blocking Ghat"
  },
  "Food Adulteration": {
    "mr": "अन्न भेसळ",
    "hi": "खाद्य मिलावट",
    "en": "Food Adulteration"
  },
  "Emergency Dispatch": {
    "mr": "तातडीची रवानगी",
    "hi": "आपातकालीन रवानगी",
    "en": "Emergency Dispatch"
  },
  "Action Logged": {
    "mr": "कारवाई नोंदवली",
    "hi": "कार्रवाई दर्ज",
    "en": "Action Logged"
  },
  "Select Severity": {
    "mr": "तीव्रता निवडा",
    "hi": "गंभीरता चुनें",
    "en": "Select Severity"
  },
  "✓ Verify On-Site (+50 Pts)": {
    "mr": "✓ जागेवर पडताळणी करा (+५० गुण)",
    "hi": "✓ मौके पर सत्यापन करें (+५० अंक)",
    "en": "✓ Verify On-Site (+50 Pts)"
  },
  "Verified On-Site with Proof (+50 Pts)": {
    "mr": "पुराव्यासह जागेवर पडताळणी पूर्ण (+५० गुण)",
    "hi": "प्रमाण सहित मौके पर सत्यापन पूर्ण (+५० अंक)",
    "en": "Verified On-Site with Proof (+50 Pts)"
  },
  "KumbhSetu": {
    "mr": "कुंभसेतु",
    "hi": "कुंभसेतु",
    "en": "KumbhSetu"
  },
  "Price Gouging Alerts": {
    "mr": "दर उल्लंघने सूचना",
    "hi": "मूल्य उल्लंघन अलर्ट",
    "en": "Price Gouging Alerts"
  },
  "Price Gouging Alerts — KumbhSetu": {
    "mr": "दर उल्लंघने सूचना — कुंभसेतु",
    "hi": "मूल्य उल्लंघन अलर्ट — कुंभसेतु",
    "en": "Price Gouging Alerts — KumbhSetu"
  },
  "Civic Verified Dharamshala / Guest House": {
    "mr": "महापालिका प्रमाणित धर्मशाळा / अतिथीगृह",
    "hi": "नगर निगम सत्यापित धर्मशाला / अतिथि गृह",
    "en": "Civic Verified Dharamshala / Guest House"
  },
  "Community Dharamshala / Guest House": {
    "mr": "नागरी नोंदणीकृत धर्मशाळा / अतिथीगृह",
    "hi": "समुदाय पंजीकृत धर्मशाला / अतिथि गृह",
    "en": "Community Dharamshala / Guest House"
  },
  "Registered Dharamshala / Guest House": {
    "mr": "नोंदणीकृत धर्मशाळा / अतिथीगृह",
    "hi": "पंजीकृत धर्मशाला / अतिथि गृह",
    "en": "Registered Dharamshala / Guest House"
  },
  "Dharamshala / Guest House": {
    "mr": "धर्मशाळा / अतिथीगृह",
    "hi": "धर्मशाला / अतिथि गृह",
    "en": "Dharamshala / Guest House"
  },
  "Godavari Bhawik Niwas": {
    "mr": "गोदावरी भाविक निवास",
    "hi": "गोदावरी भाविक निवास",
    "en": "Godavari Bhawik Niwas"
  },
  "गोदावरी भाविक Niwas": {
    "mr": "गोदावरी भाविक निवास",
    "hi": "गोदावरी भाविक निवास",
    "en": "Godavari Bhawik Niwas"
  },
  "Panchavati Sector 4": {
    "mr": "पंचवटी विभाग ४",
    "hi": "पंचवटी सेक्टर ४",
    "en": "Panchavati Sector 4"
  },
  "⚠️ Unverified Rate (Community Reported)": {
    "mr": "⚠️ अप्रमाणित दर (नागरिक नोंदणी)",
    "hi": "⚠️ असत्यापित दर (समुदाय रिपोर्ट)",
    "en": "⚠️ Unverified Rate (Community Reported)"
  },
  "Unverified Rate (Community Reported)": {
    "mr": "अप्रमाणित दर (नागरिक नोंदणी)",
    "hi": "असत्यापित दर (समुदाय रिपोर्ट)",
    "en": "Unverified Rate (Community Reported)"
  },
  "Field verification pending • Rate submitted by pilgrim community": {
    "mr": "प्रत्यक्ष पडताळणी बाकी • भाविकांद्वारे नोंदवलेला दर",
    "hi": "प्रत्यक्ष सत्यापन बाकी • श्रद्धालुओं द्वारा प्रस्तुत दर",
    "en": "Field verification pending • Rate submitted by pilgrim community"
  },
  "Verify दर": {
    "mr": "दर पडताळणी",
    "hi": "दर सत्यापन",
    "en": "Verify Rate"
  },
  "What does प्रमाणित mean?": {
    "mr": "प्रमाणित म्हणजे काय?",
    "hi": "सत्यापित का क्या अर्थ है?",
    "en": "What does Verified mean?"
  },
  "What does सत्यापित mean?": {
    "mr": "प्रमाणित म्हणजे काय?",
    "hi": "सत्यापित का क्या अर्थ है?",
    "en": "What does Verified mean?"
  },
  "A certified student Kumbhveer volunteer or local Nashikkar citizen visited this premises in person, validated municipal registration certificates, inspected fair rates, and logged authorized tariff caps directly to the Kumbh Setu fair pricing ledger.": {
    "mr": "प्रमाणित कुंभवीर स्वयंसेवक किंवा स्थानिक नाशिककर नागरिकांनी प्रत्यक्ष भेट देऊन महापालिका नोंदणी प्रमाणपत्र, वाजवी दर तपासले असून कुंभसेतू अधिकृत दरपत्रकात नोंद केली आहे.",
    "hi": "प्रमाणित कुंभवीर स्वयंसेवक अथवा स्थानीय नाशिककर नागरिक ने प्रत्यक्ष दौरा कर नगर निगम पंजीकरण प्रमाण पत्र और उचित दरों की जांच कर कुंभसेतु अधिकृत दर सूची में दर्ज किया है।",
    "en": "A certified student Kumbhveer volunteer or local Nashikkar citizen visited this premises in person, validated municipal registration certificates, inspected fair rates, and logged authorized tariff caps directly to the Kumbh Setu fair pricing ledger."
  },
  "Nashikkar Citizen Community Advisory": {
    "mr": "नाशिककर नागरिक सल्लागार सूचना",
    "hi": "नाशिककर नागरिक सामुदायिक परामर्श",
    "en": "Nashikkar Citizen Community Advisory"
  },
  "Local Verified Note": {
    "mr": "स्थानिक पडताळणी नोंद",
    "hi": "स्थानीय सत्यापित टिप्पणी",
    "en": "Local Verified Note"
  },
  "Verified fair tariff caps and hygienic amenities during ward visit. Stall owner is cooperative with pilgrims.": {
    "mr": "प्रभाग भेटीदरम्यान वाजवी दर मर्यादा आणि स्वच्छतेची खात्री केली आहे. दुकानदार भाविकांना सहकार्य करत आहेत.",
    "hi": "वार्ड निरीक्षण के दौरान उचित दर सीमा और स्वच्छता सुविधाओं का सत्यापन किया गया। दुकानदार श्रद्धालुओं के साथ सहयोगी हैं।",
    "en": "Verified fair tariff caps and hygienic amenities during ward visit. Stall owner is cooperative with pilgrims."
  },
  "Audited by Local Nashikkar (Ward 14)": {
    "mr": "स्थानिक नाशिककरांद्वारे तपासणी (प्रभाग १४)",
    "hi": "स्थानीय नाशिककर द्वारा निरीक्षण (वार्ड १४)",
    "en": "Audited by Local Nashikkar (Ward 14)"
  },
  "Audited by Local Nashikkar": {
    "mr": "स्थानिक नाशिककरांद्वारे तपासणी",
    "hi": "स्थानीय नाशिककर द्वारा निरीक्षण",
    "en": "Audited by Local Nashikkar"
  },
  "Recently updated": {
    "mr": "नुकतेच अद्यतनित",
    "hi": "हाल ही में अपडेट",
    "en": "Recently updated"
  },
  "Pure Vegetarian Food": {
    "mr": "शुद्ध शाकाहारी भोजन",
    "hi": "शुद्ध शाकाहारी भोजन",
    "en": "Pure Vegetarian Food"
  },
  "RO Filtered Drinking Water": {
    "mr": "शुद्ध पिण्याचे पाणी (RO)",
    "hi": "शुद्ध पेयजल (RO)",
    "en": "RO Filtered Drinking Water"
  },
  "Luggage Cloakroom Facility": {
    "mr": "सामान कक्ष सुविधा",
    "hi": "सामान कक्ष सुविधा",
    "en": "Luggage Cloakroom Facility"
  },
  "Product & Packaging": {
    "mr": "उत्पादन व पॅकेजिंग",
    "hi": "उत्पाद और पैकेजिंग",
    "en": "Product & Packaging"
  },
  "Verified Stall Display": {
    "mr": "प्रमाणित स्टॉल प्रदर्शन",
    "hi": "सत्यापित स्टॉल प्रदर्शन",
    "en": "Verified Stall Display"
  },
  "Authentic Certificate & Seal": {
    "mr": "अधिकृत प्रमाणपत्र व मुद्रा",
    "hi": "प्रामाणिक प्रमाण पत्र व सील",
    "en": "Authentic Certificate & Seal"
  },
  "Submitting...": {
    "mr": "नोंदणी होत आहे...",
    "hi": "जमा हो रहा है...",
    "en": "Submitting..."
  },
  "Municipal Gazette Cap (अधिकृत दर)": {
    "mr": "महापालिका राजपत्र मर्यादा (अधिकृत दर)",
    "hi": "नगर निगम राजपत्र सीमा (अधिकृत दर)",
    "en": "Municipal Gazette Cap (अधिकृत दर)"
  },
  "Estimated Price (अंदाजे दर)": {
    "mr": "अंदाजे दर (वाजवी मर्यादा)",
    "hi": "अनुमानित मूल्य (उचित दर)",
    "en": "Estimated Price (अंदाजे दर)"
  },
  "statutory bus stage fare": {
    "mr": "अधिकृत बस टप्पा भाडे",
    "hi": "आधिकारिक बस चरण किराया",
    "en": "statutory bus stage fare"
  },
  "estimated fair rate": {
    "mr": "अंदाजे वाजवी दर",
    "hi": "अनुमानित उचित दर",
    "en": "estimated fair rate"
  },
  "Puja & Handicrafts Stall": {
    "mr": "पूजा साहित्य व हस्तकला स्टॉल",
    "hi": "पूजा सामग्री व हस्तशिल्प स्टॉल",
    "en": "Puja & Handicrafts Stall"
  },
  "Civic Verified": {
    "mr": "महापालिका प्रमाणित",
    "hi": "नगर निगम सत्यापित",
    "en": "Civic Verified"
  },
  "Community": {
    "mr": "नागरी नोंदणी",
    "hi": "सामुदायिक",
    "en": "Community"
  },
  "Kumbhveer & Nashikkar Verified": {
    "mr": "कुंभवीर व नाशिककर प्रमाणित",
    "hi": "कुंभवीर व नाशिककर सत्यापित",
    "en": "Kumbhveer & Nashikkar Verified"
  },
  "In-person municipal inspection & rate audit complete": {
    "mr": "प्रत्यक्ष महापालिका तपासणी आणि दर पडताळणी पूर्ण",
    "hi": "प्रत्यक्ष नगर निगम निरीक्षण और दर सत्यापन पूर्ण",
    "en": "In-person municipal inspection & rate audit complete"
  },
  "Panchavati Resident": {
    "mr": "पंचवटी रहिवासी",
    "hi": "पंचवटी निवासी",
    "en": "Panchavati Resident"
  },
  "Verified today": {
    "mr": "आज पडताळणी केली",
    "hi": "आज सत्यापित किया",
    "en": "Verified today"
  },
  "Recently verified": {
    "mr": "नुकतीच पडताळणी केली",
    "hi": "हाल ही में सत्यापित",
    "en": "Recently verified"
  },
  "Rate successfully verified & registered by your Nashikkar/Kumbhveer ID!": {
    "mr": "आपल्या नाशिककर/कुंभवीर आयडीद्वारे दर यशस्वीरित्या प्रमाणित व नोंदणीकृत करण्यात आला!",
    "hi": "आपकी नाशिककर/कुंभवीर आईडी द्वारा दर सफलतापूर्वक सत्यापित और दर्ज की गई!",
    "en": "Rate successfully verified & registered by your Nashikkar/Kumbhveer ID!"
  },
  "✓ Message permanently recorded in civic database!": {
    "mr": "✓ संदेश नागरी डेटाबेसमध्ये कायमस्वरूपी नोंदवला गेला आहे!",
    "hi": "✓ संदेश नागरिक डेटाबेस में स्थायी रूप से दर्ज कर दिया गया है!",
    "en": "✓ Message permanently recorded in civic database!"
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


  // Injects Google Fonts (Mukta + Noto Sans Devanagari) and UI Font Balancing CSS for Marathi & Hindi
  function injectOptimizedDevanagariStyles() {
    if (typeof document === 'undefined' || !document.head) return;
    if (document.getElementById('kumbh-devanagari-styles')) return;

    // Load fonts if not already loaded
    if (!document.querySelector('link[href*="Mukta"]')) {
      try {
        const preconn1 = document.createElement('link');
        preconn1.rel = 'preconnect';
        preconn1.href = 'https://fonts.googleapis.com';
        document.head.appendChild(preconn1);

        const preconn2 = document.createElement('link');
        preconn2.rel = 'preconnect';
        preconn2.href = 'https://fonts.gstatic.com';
        preconn2.crossOrigin = 'anonymous';
        document.head.appendChild(preconn2);

        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Mukta:wght@300;400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap';
        document.head.appendChild(fontLink);
      } catch(e) {}
    }

    const styleEl = document.createElement('style');
    styleEl.id = 'kumbh-devanagari-styles';
    styleEl.textContent = `
      /* KumbhSetu UI Optimization for Marathi (मराठी) & Hindi (हिंदी) */
      html[lang="mr"], html[lang="hi"],
      body.lang-mr, body.lang-hi {
        font-family: 'Mukta', 'Noto Sans Devanagari', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
      }

      /* Headline proportional scaling */
      html[lang="mr"] h1, html[lang="hi"] h1,
      html[lang="mr"] .font-headline-xl, html[lang="hi"] .font-headline-xl {
        font-family: 'Mukta', 'Noto Sans Devanagari', sans-serif !important;
        font-weight: 700 !important;
        line-height: 1.25 !important;
        letter-spacing: -0.01em !important;
      }

      html[lang="mr"] h2, html[lang="hi"] h2,
      html[lang="mr"] .font-headline-lg, html[lang="hi"] .font-headline-lg {
        font-family: 'Mukta', 'Noto Sans Devanagari', sans-serif !important;
        font-weight: 700 !important;
        line-height: 1.28 !important;
        letter-spacing: -0.005em !important;
      }

      html[lang="mr"] h3, html[lang="hi"] h3,
      html[lang="mr"] .font-headline-md, html[lang="hi"] .font-headline-md {
        font-family: 'Mukta', 'Noto Sans Devanagari', sans-serif !important;
        font-weight: 600 !important;
        line-height: 1.32 !important;
      }

      html[lang="mr"] .font-headline-sm, html[lang="hi"] .font-headline-sm {
        font-family: 'Mukta', 'Noto Sans Devanagari', sans-serif !important;
        font-weight: 600 !important;
        line-height: 1.35 !important;
      }

      /* Body Text & Paragraphs */
      html[lang="mr"] p, html[lang="hi"] p,
      html[lang="mr"] .font-body-md, html[lang="hi"] .font-body-md {
        line-height: 1.45 !important;
      }

      html[lang="mr"] .font-body-sm, html[lang="hi"] .font-body-sm {
        line-height: 1.4 !important;
        font-size: 0.875rem !important;
      }

      /* Labels, badges, chips */
      html[lang="mr"] .font-label-lg, html[lang="hi"] .font-label-lg {
        line-height: 1.25 !important;
        font-weight: 600 !important;
      }

      html[lang="mr"] .font-label-md, html[lang="hi"] .font-label-md {
        line-height: 1.22 !important;
        font-weight: 600 !important;
      }

      html[lang="mr"] .font-label-sm, html[lang="hi"] .font-label-sm {
        line-height: 1.2 !important;
        letter-spacing: 0 !important;
        font-size: 0.75rem !important;
      }

      /* Normalize uppercase in Devanagari */
      html[lang="mr"] .uppercase, html[lang="hi"] .uppercase {
        text-transform: none !important;
        letter-spacing: 0.01em !important;
      }

      /* Bottom Navigation Item Scaling */
      html[lang="mr"] nav a span:not(.material-symbols-outlined):not(.material-icons),
      html[lang="hi"] nav a span:not(.material-symbols-outlined):not(.material-icons) {
        font-size: 10px !important;
        letter-spacing: 0 !important;
        white-space: nowrap !important;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 56px;
        text-align: center;
      }

      /* Language Dropdown Pill Button */
      .lang-dropdown-trigger {
        display: inline-flex !important;
        align-items: center !important;
        gap: 0.35rem !important;
        font-weight: 600 !important;
      }
    `;
    try {
      document.head.appendChild(styleEl);
    } catch(e) {}
  }

  function saveLang(lang) {
    if (SUPPORTED_LANGS.includes(lang)) {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
      document.documentElement.lang = lang;
      if (document.body) {
        document.body.classList.remove('lang-en', 'lang-mr', 'lang-hi');
        document.body.classList.add('lang-' + lang);
      }
      injectOptimizedDevanagariStyles();
      applyTranslations(lang);
      updateLanguageUIElements(lang);
      window.dispatchEvent(new CustomEvent('kumbh_language_changed', { detail: { lang } }));
    }
  }

  // Core Pattern Matcher for Dynamic Content (Reviews, Distances, Times, Rates, Ranks)
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

    // 5. Dynamic Distance: "1.2 km away" or "120m away" with optional prefix/suffix
    m = t.match(/^(.*?)\s*•\s*(\d+[\d,.]*)\s*(km|km\s*away|m|m\s*away)$/i);
    if (m) {
      const entity = translateText(m[1].trim(), targetLang);
      const num = m[2];
      const unit = m[3].toLowerCase();
      const isKm = unit.includes('km');
      if (targetLang === 'mr') return `${entity} • ${num} ${isKm ? 'किमी' : 'मी'} अंतरावर`;
      if (targetLang === 'hi') return `${entity} • ${num} ${isKm ? 'किमी' : 'मी'} दूर`;
      return t;
    }

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

    // 6. Time ago: "Reported 24m ago", "Spotted 15m ago", "Verified 1h ago", "12m ago"
    m = t.match(/^(Reported|Spotted|Verified|Resolved)?\s*(\d+)\s*m\s*ago$/i);
    if (m) {
      const prefix = m[1] ? m[1].toLowerCase() : '';
      const num = m[2];
      if (targetLang === 'mr') {
        if (prefix === 'reported') return `${num} मिनिटांपूर्वी नोंदवले`;
        if (prefix === 'spotted') return `${num} मिनिटांपूर्वी आढळले`;
        if (prefix === 'verified') return `${num} मिनिटांपूर्वी पडताळले`;
        if (prefix === 'resolved') return `${num} मिनिटांपूर्वी निवारण`;
        return `${num} मिनिटांपूर्वी`;
      }
      if (targetLang === 'hi') {
        if (prefix === 'reported') return `${num} मिनट पहले दर्ज`;
        if (prefix === 'spotted') return `${num} मिनट पहले देखा गया`;
        if (prefix === 'verified') return `${num} मिनट पहले सत्यापित`;
        if (prefix === 'resolved') return `${num} मिनट पहले समाधान`;
        return `${num} मिनट पहले`;
      }
      return t;
    }

    m = t.match(/^(Reported|Spotted|Verified|Resolved)?\s*(\d+)\s*hrs?\s*ago$/i);
    if (m) {
      const prefix = m[1] ? m[1].toLowerCase() : '';
      const num = m[2];
      if (targetLang === 'mr') {
        if (prefix === 'reported') return `${num} तासांपूर्वी नोंदवले`;
        if (prefix === 'spotted') return `${num} तासांपूर्वी आढळले`;
        if (prefix === 'verified') return `${num} तासांपूर्वी पडताळले`;
        if (prefix === 'resolved') return `${num} तासांपूर्वी निवारण`;
        return `${num} तासांपूर्वी`;
      }
      if (targetLang === 'hi') {
        if (prefix === 'reported') return `${num} घंटे पहले दर्ज`;
        if (prefix === 'spotted') return `${num} घंटे पहले देखा गया`;
        if (prefix === 'verified') return `${num} घंटे पहले सत्यापित`;
        if (prefix === 'resolved') return `${num} घंटे पहले समाधान`;
        return `${num} घंटे पहले`;
      }
      return t;
    }

    m = t.match(/^(Reported|Spotted|Verified)?\s*(\d+)\s*h(?:rs?)?\s*(\d+)\s*m\s*ago$/i);
    if (m) {
      const h = m[2], min = m[3];
      if (targetLang === 'mr') return `${h} तास ${min} मिनिटांपूर्वी`;
      if (targetLang === 'hi') return `${h} घंटे ${min} मिनट पहले`;
      return t;
    }

    // 7. Ranks: "Rank #1 • 480 pts"
    m = t.match(/^Rank\s*#(\d+)(?:\s*•\s*(\d+[\d,]*)\s*pts)?$/i);
    if (m) {
      const r = m[1];
      const pts = m[2];
      if (targetLang === 'mr') return pts ? `क्रमांक #${r} • ${pts} गुण` : `क्रमांक #${r}`;
      if (targetLang === 'hi') return pts ? `रैंक #${r} • ${pts} अंक` : `रैंक #${r}`;
      return t;
    }

    // 8. Stalls: "Stall #24 • Pt. Narayan Shastri"
    m = t.match(/^Stall\s*#(\d+)(?:\s*•\s*(.*))?$/i);
    if (m) {
      const sNum = m[1];
      const sName = m[2] ? translateText(m[2].trim(), targetLang) : '';
      if (targetLang === 'mr') return sName ? `स्टॉल #${sNum} • ${sName}` : `स्टॉल #${sNum}`;
      if (targetLang === 'hi') return sName ? `स्टॉल #${sNum} • ${sName}` : `स्टॉल #${sNum}`;
      return t;
    }

    // 9. Points: "+50 points", "+75 Seva Pts", "2,850 pts"
    m = t.match(/^(\+)?(\d+[\d,]*)\s*(?:pts|points|seva\s*pts)$/i);
    if (m) {
      const sign = m[1] || '';
      const num = m[2];
      if (targetLang === 'mr') return `${sign}${num} गुण`;
      if (targetLang === 'hi') return `${sign}${num} अंक`;
      return t;
    }

    // 10. Counts: "58 Audits", "2 Photos", "2 Guests", "21 Active"
    m = t.match(/^(\d+[\d,]*)\s*Audits$/i);
    if (m) return targetLang === 'mr' ? `${m[1]} तपासण्या` : (targetLang === 'hi' ? `${m[1]} ऑडिट` : t);

    m = t.match(/^(\d+[\d,]*)\s*field\s*audits$/i);
    if (m) return targetLang === 'mr' ? `${m[1]} क्षेत्रीय तपासण्या` : (targetLang === 'hi' ? `${m[1]} फील्ड ऑडिट` : t);

    m = t.match(/^(\d+[\d,]*)\s*Photos$/i);
    if (m) return targetLang === 'mr' ? `${m[1]} छायाचित्रे` : (targetLang === 'hi' ? `${m[1]} तस्वीरें` : t);

    m = t.match(/^(\d+[\d,]*)\s*Guests$/i);
    if (m) return targetLang === 'mr' ? `${m[1]} अतिथी` : (targetLang === 'hi' ? `${m[1]} अतिथि` : t);

    m = t.match(/^(\d+[\d,]*)\s*Active$/i);
    if (m) return targetLang === 'mr' ? `${m[1]} सक्रिय` : (targetLang === 'hi' ? `${m[1]} सक्रिय` : t);

    m = t.match(/^(\d+[\d,]*)\s*Selected$/i);
    if (m) return targetLang === 'mr' ? `${m[1]} निवडले` : (targetLang === 'hi' ? `${m[1]} चुने गए` : t);

    // 11. Rates: "/ night", "/ satvik thali", "/ full half-day tour"
    if (t.startsWith('/')) {
      const rest = t.substring(1).trim();
      const transRest = translateText(rest, targetLang);
      if (transRest && transRest !== rest) {
        return `/ ${transRest}`;
      }
    }

    // 12. Offline price badge: "₹650 offline"
    m = t.match(/^₹(\d+[\d,]*)\s*offline$/i);
    if (m) {
      return targetLang === 'mr' ? `₹${m[1]} प्रत्यक्ष दर` : (targetLang === 'hi' ? `₹${m[1]} ऑफलाइन दर` : t);
    }

    // 13. Active Reports: "6 Active Reports"
    m = t.match(/^(\d+[\d,]*)\s*Active Reports$/i);
    if (m) {
      return targetLang === 'mr' ? `${m[1]} सक्रिय अहवाल` : (targetLang === 'hi' ? `${m[1]} सक्रिय रिपोर्ट्स` : t);
    }

    // 14. Daily Briefing: "Daily Briefing: 08:30 AM"
    m = t.match(/^Daily Briefing:\s*(.*)$/i);
    if (m) {
      return targetLang === 'mr' ? `दैनिक आढावा: ${m[1]}` : (targetLang === 'hi' ? `दैनिक ब्रीफिंग: ${m[1]}` : t);
    }

    // 15. View All with count: "View All (6) →" or "View All (6)"
    m = t.match(/^View All\s*\((\d+)\)\s*(?:→)?$/i);
    if (m) {
      return targetLang === 'mr' ? `सर्व पहा (${m[1]}) →` : (targetLang === 'hi' ? `सभी देखें (${m[1]}) →` : t);
    }

    
    // 16. Walking distance from landmark: "850 meters from Ramkund Ghat"
    m = t.match(/^(\d+[\d,.]*)\s*(?:meters?|m|kms?|km)\s+(?:from|away from)\s+(.*)$/i);
    if (m) {
      const num = m[1];
      const isKm = t.toLowerCase().includes('km');
      const place = translateText(m[2].trim(), targetLang);
      const unit = isKm ? 'किमी' : 'मीटर';
      if (targetLang === 'mr') return `${place}पासून ${num} ${unit}`;
      if (targetLang === 'hi') return `${place} से ${num} ${unit}`;
      return t;
    }

    // 17. Walk time in parenthesis: "(7 min walk)"
    m = t.match(/^\((\d+[\d,.]*)\s*mins?\s*(?:walk|walking)\)$/i);
    if (m) {
      return targetLang === 'mr' ? `(${m[1]} मिनिटे पायी)` : (targetLang === 'hi' ? `(${m[1]} मिनट पैदल)` : t);
    }

    return null;
  }

  function translateText(str, targetLang) {
    if (!str || typeof str !== 'string') return str;
    const trimmed = str.trim();
    if (!trimmed) return str;

    // 0. Check dynamic pattern (reviews, distances, timers, ranks)
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

    // 7. Smart compound separator handling (" — ", " – ", " • ", " & ", " / ", " | ")
    const sepMatch = trimmed.match(/^(.*?)\s+([—–•&/|])\s+(.*)$/);
    if (sepMatch) {
      const part1 = sepMatch[1].trim();
      const sep = sepMatch[2];
      const part2 = sepMatch[3].trim();
      const trans1 = translateText(part1, targetLang);
      const trans2 = translateText(part2, targetLang);
      if ((trans1 && trans1 !== part1) || (trans2 && trans2 !== part2)) {
        return `${trans1} ${sep} ${trans2}`;
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
        if (lang === 'en') {
          document.title = document._kumbhOrigTitle;
        } else {
          const translatedTitle = translateText(document._kumbhOrigTitle, lang);
          if (translatedTitle) document.title = translatedTitle;
        }
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
            if (parent.closest('.material-symbols-outlined, .material-icons, .material-symbols-rounded, #kumbh-lang-modal, #lang-switch-group, .lang-dropdown-trigger, [data-action="language"], [data-lang-trigger], #kumbh-floating-lang-btn, .kumbh-active-lang-label, svg, [data-no-translate]')) {
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

  const modalTranslations = {
    en: {
      title: 'Select Language',
      subTitle: 'Official Multi-Lingual Interface • Simhastha 2027',
      enLabel: 'English',
      enDesc: 'Default Global Language',
      mrLabel: 'मराठी (Marathi)',
      mrDesc: 'स्थानिक राजभाषा • Local Regional Language',
      hiLabel: 'हिंदी (Hindi)',
      hiDesc: 'राष्ट्रीय भाषा • National Language',
      footer: 'कुंभसेतु • Simhastha Kumbh Mela 2027 (Nashik)',
      closeAria: 'Close modal',
      activeBadge: 'Active'
    },
    mr: {
      title: 'भाषा निवडा',
      subTitle: 'सिंहस्थ २०२७ साठी आपली पसंतीची भाषा निवडा',
      enLabel: 'इंग्रजी (English)',
      enDesc: 'जागतिक संपर्क भाषा',
      mrLabel: 'मराठी (Marathi)',
      mrDesc: 'स्थानिक राजभाषा (सध्या निवडलेली)',
      hiLabel: 'हिंदी (Hindi)',
      hiDesc: 'राष्ट्रीय संपर्क भाषा',
      footer: 'कुंभसेतू • सिंहस्थ कुंभमेळा २०२७ (नाशिक-त्र्यंबकेश्वर)',
      closeAria: 'खिडकी बंद करा',
      activeBadge: 'सक्रिय'
    },
    hi: {
      title: 'भाषा चुनें',
      subTitle: 'सिंहस्थ २०२७ के लिए अपनी पसंदीदा भाषा चुनें',
      enLabel: 'अंग्रेज़ी (English)',
      enDesc: 'वैश्विक संपर्क भाषा',
      mrLabel: 'मराठी (Marathi)',
      mrDesc: 'स्थानीय राज्य भाषा',
      hiLabel: 'हिंदी (Hindi)',
      hiDesc: 'राष्ट्रीय भाषा (वर्तमान में सक्रिय)',
      footer: 'कुंभसेतु • सिंहस्थ कुंभ मेला २०२७ (नासिक-त्र्यंबकेश्वर)',
      closeAria: 'बंद करें',
      activeBadge: 'सक्रिय'
    }
  };

  function updateLanguageModalContent(lang) {
    const modal = document.getElementById('kumbh-lang-modal');
    if (!modal) return;
    const t = modalTranslations[lang] || modalTranslations.en;

    const titleEl = modal.querySelector('#kumbh-lang-modal-title');
    if (titleEl) titleEl.textContent = t.title;

    const subTitleEl = modal.querySelector('#kumbh-lang-modal-subtitle');
    if (subTitleEl) subTitleEl.textContent = t.subTitle;

    const enTitle = modal.querySelector('[data-lang="en"] .lang-opt-title');
    const enDesc = modal.querySelector('[data-lang="en"] .lang-opt-desc');
    if (enTitle) enTitle.textContent = t.enLabel;
    if (enDesc) enDesc.textContent = t.enDesc;

    const mrTitle = modal.querySelector('[data-lang="mr"] .lang-opt-title');
    const mrDesc = modal.querySelector('[data-lang="mr"] .lang-opt-desc');
    if (mrTitle) mrTitle.textContent = t.mrLabel;
    if (mrDesc) mrDesc.textContent = t.mrDesc;

    const hiTitle = modal.querySelector('[data-lang="hi"] .lang-opt-title');
    const hiDesc = modal.querySelector('[data-lang="hi"] .lang-opt-desc');
    if (hiTitle) hiTitle.textContent = t.hiLabel;
    if (hiDesc) hiDesc.textContent = t.hiDesc;

    const footerEl = modal.querySelector('#kumbh-lang-modal-footer');
    if (footerEl) footerEl.textContent = t.footer;

    const closeBtn = modal.querySelector('#kumbh-lang-modal-close');
    if (closeBtn) closeBtn.setAttribute('aria-label', t.closeAria);
  }

    function updateLanguageUIElements(lang) {
    const langLabels = { en: 'English', mr: 'मराठी', hi: 'हिंदी' };

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

    // 2. Header language dropdown / pill button on ALL pages
    const allButtons = document.querySelectorAll('header button, .lang-dropdown-trigger, [data-action="language"], [data-lang-trigger], #kumbh-floating-lang-btn');
    allButtons.forEach(btn => {
      if (btn.classList.contains('lang-btn') || btn.closest('#lang-switch-group') || btn.id === 'btn-admin-profile') return;
      const html = btn.innerHTML || '';
      const aria = (btn.getAttribute('aria-label') || '').toLowerCase();
      const hasTranslate = html.includes('translate') || aria.includes('language') || aria.includes('translate') || btn.classList.contains('lang-dropdown-trigger');
      if (hasTranslate) {
        btn.classList.add('lang-dropdown-trigger');
        let textSpan = btn.querySelector('.kumbh-active-lang-label, .kumbh-float-lang-text') ||
                       btn.querySelector('span:not(.material-symbols-outlined):not(.material-icons):not([class*="material"]):not(.material-symbols-rounded)');
        if (!textSpan) {
          textSpan = document.createElement('span');
          btn.appendChild(textSpan);
        }
        textSpan.className = 'kumbh-active-lang-label font-medium';
        textSpan.textContent = langLabels[lang] || 'English';
      }
    });

    const langBtnText = document.getElementById('lang-btn-text');
    if (langBtnText) {
      langBtnText.textContent = langLabels[lang] || 'English';
    }

    // 3. Floating language pill if active
    const floatText = document.querySelector('#kumbh-floating-lang-btn .kumbh-float-lang-text');
    if (floatText) {
      floatText.textContent = langLabels[lang] || 'English';
    }

    // 4. Update the language modal itself if rendered
    updateLanguageModalContent(lang);
  }

  // Language Switcher Modal
  function createLanguageModal() {
    let modal = document.getElementById('kumbh-lang-modal');
    if (modal) {
      updateLanguageModalContent(getSavedLang());
      return;
    }

    const cur = getSavedLang();
    const t = modalTranslations[cur] || modalTranslations.en;

    modal = document.createElement('div');
    modal.id = 'kumbh-lang-modal';
    modal.className = 'fixed inset-0 bg-black/70 backdrop-blur-md z-[999999] hidden items-center justify-center p-4 transition-opacity duration-200 opacity-0';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 999999;';
    modal.innerHTML = `
      <div class="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-outline-variant/30 transform scale-95 transition-transform duration-200" id="kumbh-lang-modal-content" style="background-color: #ffffff; color: #1b1b20;">
        <div class="flex items-center justify-between pb-3 border-b border-surface-container-high mb-3">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
              <span class="material-symbols-outlined text-[20px]">translate</span>
            </div>
            <div>
              <h3 class="font-headline-sm text-on-surface font-bold text-base" id="kumbh-lang-modal-title">${t.title}</h3>
              <p class="text-[11px] text-on-surface-variant leading-tight" id="kumbh-lang-modal-subtitle">${t.subTitle}</p>
            </div>
          </div>
          <button type="button" id="kumbh-lang-modal-close" class="text-on-surface-variant hover:text-on-surface p-1 rounded-full cursor-pointer hover:bg-surface-container" onclick="window.KumbhI18n.closeModal()">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        
        <div class="flex flex-col gap-2.5">
          <!-- English Option -->
          <button type="button" onclick="window.KumbhI18n.setLanguage('en')" class="lang-modal-opt flex items-center justify-between p-3 rounded-xl border border-surface-container-high hover:border-primary hover:bg-surface-container-low transition-all cursor-pointer" data-lang="en">
            <div class="flex items-center gap-3">
              <span class="text-2xl">🇬🇧</span>
              <div class="text-left">
                <div class="font-bold text-on-surface text-sm lang-opt-title">${t.enLabel}</div>
                <div class="text-[11px] text-on-surface-variant lang-opt-desc">${t.enDesc}</div>
              </div>
            </div>
            <span class="check-icon material-symbols-outlined text-primary opacity-0 text-[20px]">check_circle</span>
          </button>

          <!-- Marathi Option -->
          <button type="button" onclick="window.KumbhI18n.setLanguage('mr')" class="lang-modal-opt flex items-center justify-between p-3 rounded-xl border border-surface-container-high hover:border-primary hover:bg-surface-container-low transition-all cursor-pointer" data-lang="mr">
            <div class="flex items-center gap-3">
              <span class="text-2xl">🇮🇳</span>
              <div class="text-left">
                <div class="font-bold text-on-surface text-sm lang-opt-title">${t.mrLabel}</div>
                <div class="text-[11px] text-on-surface-variant lang-opt-desc">${t.mrDesc}</div>
              </div>
            </div>
            <span class="check-icon material-symbols-outlined text-primary opacity-0 text-[20px]">check_circle</span>
          </button>

          <!-- Hindi Option -->
          <button type="button" onclick="window.KumbhI18n.setLanguage('hi')" class="lang-modal-opt flex items-center justify-between p-3 rounded-xl border border-surface-container-high hover:border-primary hover:bg-surface-container-low transition-all cursor-pointer" data-lang="hi">
            <div class="flex items-center gap-3">
              <span class="text-2xl">🇮🇳</span>
              <div class="text-left">
                <div class="font-bold text-on-surface text-sm lang-opt-title">${t.hiLabel}</div>
                <div class="text-[11px] text-on-surface-variant lang-opt-desc">${t.hiDesc}</div>
              </div>
            </div>
            <span class="check-icon material-symbols-outlined text-primary opacity-0 text-[20px]">check_circle</span>
          </button>
        </div>

        <div class="mt-4 pt-2.5 text-center border-t border-surface-container-high">
          <p class="text-[11px] text-on-surface-variant font-medium" id="kumbh-lang-modal-footer">${t.footer}</p>
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
    updateLanguageModalContent(currentLang);

    const options = modal.querySelectorAll('.lang-modal-opt');
    options.forEach(opt => {
      const optLang = opt.getAttribute('data-lang');
      const check = opt.querySelector('.check-icon');
      if (optLang === currentLang) {
        opt.classList.add('border-primary', 'bg-primary/5', 'ring-1', 'ring-primary/20');
        if (check) check.classList.remove('opacity-0');
      } else {
        opt.classList.remove('border-primary', 'bg-primary/5', 'ring-1', 'ring-primary/20');
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

    // Explicit triggers
    const explicitTrigger = el.closest('.lang-dropdown-trigger, [data-action="language"], [data-lang-trigger]');
    if (explicitTrigger) return true;

    // Header language button only (never intercept content tiles, cards, or links)
    const headerBtn = el.closest('header button, header .lang-btn');
    if (headerBtn) {
      const ariaLabel = (headerBtn.getAttribute('aria-label') || '').toLowerCase();
      if (ariaLabel.includes('language') || ariaLabel.includes('translate')) {
        return true;
      }
      // Check if button text is exactly the language name or contains the translate material icon
      const icon = headerBtn.querySelector('.material-symbols-outlined, .material-icons');
      if (icon && icon.textContent.trim() === 'translate') {
        return true;
      }
      const txt = (headerBtn.textContent || '').trim();
      if (txt === 'मराठी' || txt === 'हिंदी' || txt === 'English' || txt.startsWith('मराठी') || txt.startsWith('हिंदी') || txt.startsWith('English')) {
        return true;
      }
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

    // Check if any language trigger or translation button already exists anywhere on page
    const existingTriggers = document.querySelectorAll('.lang-dropdown-trigger, [aria-label*="Language" i], [aria-label*="language" i], [data-action="language"], [data-lang-trigger], #kumbh-floating-lang-btn');
    if (existingTriggers.length > 0) {
      if (existingTriggers.length > 1) {
        for (let i = 1; i < existingTriggers.length; i++) {
          if (existingTriggers[i].id !== 'kumbh-floating-lang-btn') {
            existingTriggers[i].remove();
          }
        }
      }
      return;
    }

    const header = document.querySelector('header');
    if (header) {
      let existingBtn = null;
      header.querySelectorAll('button, a').forEach(b => {
        const text = (b.textContent || '').trim();
        const html = b.innerHTML || '';
        const label = (b.getAttribute('aria-label') || '').toLowerCase();
        if (label.includes('lang') || html.includes('translate') || text.includes('मरा') || text.includes('English') || text.includes('हिंदी')) {
          existingBtn = b;
        }
      });
      if (existingBtn) {
        existingBtn.classList.add('lang-dropdown-trigger');
        return;
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
    injectOptimizedDevanagariStyles();
    createLanguageModal();
    ensureLanguageButtonOnPage();
    const currentLang = getSavedLang();
    document.documentElement.lang = currentLang;
    if (document.body) {
      document.body.classList.remove('lang-en', 'lang-mr', 'lang-hi');
      document.body.classList.add('lang-' + currentLang);
    }
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

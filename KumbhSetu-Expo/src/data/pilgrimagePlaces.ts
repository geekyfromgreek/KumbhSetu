export interface TransitDirections {
  summary: { [lang: string]: string };
  fromStation: { [lang: string]: string };
  fromBusStand: { [lang: string]: string };
  walkingRoute: { [lang: string]: string };
  droppingPoint: { [lang: string]: string };
}

export interface PilgrimPlace {
  id: string;
  name: { [lang: string]: string };
  latitude: number;
  longitude: number;
  distanceKm: string;
  darshanTimings: string;
  aartiTimings: string;
  description: { [lang: string]: string };
  facilities: string[];
  imagePlaceholderColor: string;
  osmUrl: string;
  howToReach: TransitDirections;
}

export const PILGRIM_PLACES: PilgrimPlace[] = [
  {
    id: 'ramkund',
    name: {
      hi: 'श्री रामकुंड गोदावरी पवित्र स्नान घाट',
      mr: 'श्री रामकुंड गोदावरी पवित्र स्नान घाट',
      gu: 'શ્રી રામકુંડ ગોદાવરી પવિત્ર સ્નાન ઘાટ',
      en: 'Shri Ramkund Holy Godavari Snan Ghat',
      bn: 'শ্রী রামকুণ্ড গোদাবরী পবিত্র স্নান ঘাট',
      ta: 'ஸ்ரீ ராம்குண்ட் கோதாவரி புனித நீராடல் ঘাট',
      te: 'శ్రీ రామ్‌కుండ్ గోదావరి పవిత్ర స్నాన ఘాట్',
      kn: 'ಶ್ರೀ ರಾಮಕುಂಡ ಗೋದಾವರಿ ಪವಿತ್ರ ಸ್ನಾನ ಘಾಟ್',
      ml: 'ശ്രീ രാംകുണ്ഡ് ഗോദാവരി സ്നാന ഘാട്ട്',
      pa: 'ਸ਼੍ਰੀ ਰਾਮਕੁੰਡ ਗੋਦਾਵਰੀ ਪਵਿੱਤਰ ਇਸ਼ਨਾਨ ਘਾਟ',
      or: 'ଶ୍ରୀ ରାମକୁଣ୍ଡ ଗୋଦାବରୀ ପବିତ୍ର ସ୍ନାନ ଘାଟ',
    },
    latitude: 19.9975,
    longitude: 73.7915,
    distanceKm: '0.5 किमी',
    darshanTimings: '24 घंटे खुला (स्नान हेतु)',
    aartiTimings: 'गोदावरी महाआरती: शाम 7:00 बजे',
    description: {
      hi: 'कुंभ मेले का मुख्य शाही स्नान स्थल जहाँ भगवान श्री राम ने वनवास के दौरान स्नान व तर्पण किया था।',
      mr: 'कुंभमेळ्याचे मुख्य शाही स्नान स्थळ, जेथे प्रभू श्रीरामांनी वनवासात स्नान व पितृतर्पण केले होते.',
      gu: 'કુંભ મેળાનું મુખ્ય શાહી સ્નાન સ્થળ જ્યાં ભગવાન શ્રી રામે સ્નાન કર્યું હતું.',
      en: 'The prime Shahi Snan sacred pool where Lord Rama bathed during exile.',
    },
    facilities: ['शुद्ध जल स्नान', 'महिला वस्त्र बदल कक्ष', 'लॉकर व्यवस्था', '24x7 पुलिस चौकी'],
    imagePlaceholderColor: '#0284C7',
    osmUrl: 'https://www.openstreetmap.org/?mlat=19.9975&mlon=73.7915#map=17/19.9975/73.7915',
    howToReach: {
      summary: {
        hi: 'नासिक शहर के केंद्र में पंचवटी क्षेत्र में गोदावरी नदी तट पर स्थित।',
        mr: 'नाशिक शहराच्या मध्यभागी पंचवटी भागात गोदावरी नदीकाठी स्थित.',
        en: 'Located on the banks of holy Godavari river in Panchavati central Nashik.',
      },
      fromStation: {
        hi: 'नासिक रोड रेलवे स्टेशन से सिटीलिंक बस संख्या 101 लें अथवा शेयरिंग ई-रिक्शा द्वारा पंचवटी पहुंचे (10.5 किमी, ~25 मिनट).',
        mr: 'नाशिक रोड स्थानकावरून सिटीलिंक बस क्र. १०१ किंवा शेअरिंग ई-रिक्षाने थेट पंचवटी (१०.५ किमी, २५ मिनिटे).',
        en: 'Take CityLink Bus #101 or shared E-Rickshaw from Nashik Road Railway Station directly to Panchavati (10.5 km, ~25 mins).',
      },
      fromBusStand: {
        hi: 'सीबीएस (CBS) सेंट्रल बस स्टैंड से पैदल मात्र 15 मिनट या लोकल ई-रिक्शा द्वारा 3.2 किमी.',
        mr: 'सीबीएस बस स्थानकावरून चालत १५ मिनिटे किंवा स्थानिक ई-रिक्षाने ३.२ किमी.',
        en: 'From CBS Central Bus Stand, it is 3.2 km via local auto/e-rickshaw or 15 mins walking.',
      },
      walkingRoute: {
        hi: 'गाडगे महाराज पुल पार कर सीढ़ियों से सीधा रामकुंड मुख्य घाट पर उतरें।',
        mr: 'गाडगे महाराज पूल ओलांडून पायऱ्यांवरून थेट मुख्य घाटावर उतरा.',
        en: 'Cross Gadge Maharaj Bridge and walk down the main pedestrian steps directly to Ramkund.',
      },
      droppingPoint: {
        hi: 'पंचवटी कारंजा / सरदार चौक ड्रॉपिंग पॉइंट',
        mr: 'पंचवटी कारंजा / सरदार चौक',
        en: 'Panchavati Karanja / Sardar Chowk vehicle drop point',
      },
    },
  },
  {
    id: 'trimbakeshwar',
    name: {
      hi: 'श्री त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर',
      mr: 'श्री त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर',
      gu: 'શ્રી ત્ર્યંબકેશ્વર જ્યોતિર્લિંગ મંદિર',
      en: 'Shri Trimbakeshwar Jyotirlinga Temple',
      bn: 'শ্রী ত্র্যম্বকেশ্বর জ্যোতির্লিঙ্গ মন্দির',
      ta: 'ஸ்ரீ திரியம்பகேஷ்வர் ஜோதிர்லிங்கம்',
      te: 'శ్రీ త్ర్యంబకేశ్వర్ జ్యోతిర్లింగ దేవాలయం',
      kn: 'ಶ್ರೀ ತ್ರ್ಯಂಬಕೇಶ್ವರ ಜ್ಯೋತಿರ್ಲಿಂಗ ದೇವಾಲಯ',
      ml: 'ശ്രീ ത്ര്യംബകേശ്വർ ജ്യോതിർലിംഗ ക്ഷേത്രം',
      pa: 'ਸ਼੍ਰੀ ਤ੍ਰਿੰਬਕੇਸ਼ਵਰ ਜਯੋਤਿਰਲਿੰਗ ਮੰਦਰ',
      or: 'ଶ୍ରୀ ତ୍ର୍ୟମ୍ବକେଶ୍ୱର ଜ୍ୟୋତିର୍ଲିଙ୍ଗ ମନ୍ଦିର',
    },
    latitude: 19.9328,
    longitude: 73.5306,
    distanceKm: '28 किमी (नासिक से)',
    darshanTimings: 'सुबह 5:30 से रात 9:00 बजे तक',
    aartiTimings: 'प्रातः आरती 6:00 AM, संध्या आरती 7:30 PM',
    description: {
      hi: 'भगवान शिव का पावन 10वां ज्योतिर्लिंग जहाँ ब्रह्मा, विष्णु और महेश तीनों का त्रिमूर्ति स्वरूप विराजमान है।',
      mr: 'भगवान शिवांचे १० वे पावन ज्योतिर्लिंग, जेथे ब्रह्मा, विष्णू आणि महेश या त्रिदेवांचे स्वरूप आहे.',
      gu: 'ભગવાન શિવનું પવિત્ર જ્યોતિર્લિંગ જ્યાં ત્રિમૂર્તિ સ્વરૂપ બિરાજમાન છે.',
      en: 'One of the 12 sacred Jyotirlingas embodying Brahma, Vishnu and Shiva.',
    },
    facilities: ['व्हीलचेयर उपलब्ध', 'जूता स्टैंड (निःशुल्क)', 'प्रसादालय', 'महाप्रसाद'],
    imagePlaceholderColor: '#E85D04',
    osmUrl: 'https://www.openstreetmap.org/?mlat=19.9328&mlon=73.5306#map=17/19.9328/73.5306',
    howToReach: {
      summary: {
        hi: 'नासिक शहर से 28 किमी पश्चिम में ब्रह्मगिरि पर्वत की तलहटी में स्थित।',
        mr: 'नाशिक शहरापासून २८ किमी पश्चिमेस ब्रह्मगिरी पर्वताच्या पायथ्याशी स्थित.',
        en: 'Nestled at the foothills of Brahmagiri mountains, 28 km west of Nashik city.',
      },
      fromStation: {
        hi: 'नासिक रोड रेलवे स्टेशन से त्र्यंबकेश्वर के लिए डायरेक्ट कुंभ स्पेशल बसें हर 15 मिनट में उपलब्ध हैं (38 किमी, ~60 मिनट).',
        mr: 'नाशिक रोड स्थानकावरून त्र्यंबकेश्वरसाठी थेट विशेष बसेस दर १५ मिनिटांनी उपलब्ध आहेत (३८ किमी, ६० मिनिटे).',
        en: 'Direct Kumbh Special Express buses run every 15 mins from Nashik Road Railway Station (38 km, ~60 mins).',
      },
      fromBusStand: {
        hi: 'सीबीएस (CBS) न्यू बस स्टैंड से त्र्यंबक रोड होते हुए नियमित बस व प्राइवेट टैक्सी सेवा 24 घंटे चालू है (29 किमी, ~45 मिनट).',
        mr: 'सीबीएस नवीन बस स्टँडवरून त्र्यंबक रोडने नियमित बस व टॅक्सी २४ तास उपलब्ध (२९ किमी, ४५ मिनिटे).',
        en: 'Frequent direct government MSRTC shuttles & taxis leave every 10 mins from CBS Bus Stand via Trimbak Highway (29 km, ~45 mins).',
      },
      walkingRoute: {
        hi: 'त्र्यंबकेश्वर बस स्टैंड से मंदिर मुख्य सिंहद्वार तक 400 मीटर पैदल मार्ग (ई-रिक्शा भी उपलब्ध).',
        mr: 'त्र्यंबक बस स्टँडपासून मुख्य सिंहद्वारापर्यंत ४०० मीटर पायी मार्ग.',
        en: '400 meters walk along the dedicated pedestrian path from Trimbakeshwar Bus Terminus to Main Temple Gate.',
      },
      droppingPoint: {
        hi: 'त्र्यंबकेश्वर मुख्य बस टर्मिनल / कुशावर्त तीर्थ पार्किंग',
        mr: 'त्र्यंबकेश्वर मुख्य बस टर्मिनल / कुशावर्त पार्किंग',
        en: 'Trimbakeshwar Main Bus Depot / Kushavarta Tirth Parking',
      },
    },
  },
  {
    id: 'kalaram',
    name: {
      hi: 'श्री काळाराम मंदिर (पंचवटी)',
      mr: 'श्री काळाराम मंदिर (पंचवटी)',
      gu: 'શ્રી કાળારામ મંદિર (પંચવટી)',
      en: 'Shri Kalaram Mandir (Panchavati)',
      bn: 'শ্রী কালারাম মন্দির (পঞ্চবটী)',
      ta: 'ஸ்ரீ காளாராம் கோவில் (பஞ்சவடி)',
      te: 'శ్రీ కాళారామ్ దేవాలయం (పంచవటి)',
      kn: 'ಶ್ರೀ ಕಾಳಾರಾಮ ದೇವಾಲಯ (ಪಂಚವಟಿ)',
      ml: 'ശ്രീ കാളാറാം ക്ഷേത്രം (പഞ്ചവടി)',
      pa: 'ਸ਼੍ਰੀ ਕਾਲਾਰਾਮ ਮੰਦਰ (ਪੰਚਵਟੀ)',
      or: 'ଶ୍ରୀ କାଳାରାମ ମନ୍ଦିର (ପଞ୍ଚବଟୀ)',
    },
    latitude: 20.0039,
    longitude: 73.7942,
    distanceKm: '1.2 किमी',
    darshanTimings: 'सुबह 5:00 से रात 10:00 बजे तक',
    aartiTimings: 'सुबह 7:00 AM, दोपहर 12:00 PM, रात 8:00 PM',
    description: {
      hi: 'काले पाषाण से निर्मित अत्यंत दिव्य प्रभु श्री राम, माता सीता और लक्ष्मण जी की विग्रह मूर्ति।',
      mr: 'काळ्या पाषाणात कोरलेले अत्यंत देखणे प्रभू श्रीराम, माता सीता व लक्ष्मण यांचे मंदिर.',
      gu: 'કાળા પથ્થરથી બનેલું ભગવાન શ્રી રામનું અતિ પ્રાચીન દિવ્ય મંદિર.',
      en: 'Ancient black stone temple dedicated to Lord Rama, Sita and Lakshmana.',
    },
    facilities: ['शुद्ध पेयजल', 'छायादार प्रतीक्षालय', 'सुरक्षा व्यवस्था'],
    imagePlaceholderColor: '#4A2E18',
    osmUrl: 'https://www.openstreetmap.org/?mlat=20.0039&mlon=73.7942#map=17/20.0039/73.7942',
    howToReach: {
      summary: {
        hi: 'रामकुंड घाट से केवल 600 मीटर की दूरी पर पंचवटी के हृदय में स्थित।',
        mr: 'रामकुंड घाटापासून केवळ ६०० मीटर अंतरावर पंचवटीच्या मध्यभागी.',
        en: 'Situated 600 meters from Ramkund Ghat in central Panchavati.',
      },
      fromStation: {
        hi: 'नासिक रोड स्टेशन से सिटी बस लेकर पंचवटी कारंजा उतरें, वहाँ से 3 मिनट की पैदल दूरी (10 किमी).',
        mr: 'नाशिक रोडवरून बसने पंचवटी कारंजा येथे उतरावे, तिथून ३ मिनिटे चालत.',
        en: 'Board city bus from Nashik Road Station to Panchavati Karanja stop, then 3 mins walk (10 km).',
      },
      fromBusStand: {
        hi: 'सीबीएस से ऑटो अथवा ई-रिक्शा द्वारा पंचवटी चौक पहुंचे (3.5 किमी).',
        mr: 'सीबीएस वरून थेट रिक्षाने पंचवटी चौक (३.५ किमी).',
        en: '3.5 km from CBS Stand via local auto or e-rickshaw to Panchavati Chowk.',
      },
      walkingRoute: {
        hi: 'रामकुंड से सीता गुंफा मार्ग की ओर सीधा 5 मिनट पैदल चलें।',
        mr: 'रामकुंडाकडून सीता गुंफा रस्त्याने सरळ ५ मिनिटे पायी जावे.',
        en: 'Walk 5 minutes uphill along the heritage lane from Ramkund towards Sita Gumpha road.',
      },
      droppingPoint: {
        hi: 'काळाराम मंदिर पूर्व महाद्वार',
        mr: 'काळाराम मंदिर पूर्व महाद्वार',
        en: 'Kalaram Temple East Gate Drop-off',
      },
    },
  },
  {
    id: 'sitagumpha',
    name: {
      hi: 'सीता गुंफा एवं पंचवटी तपोवन',
      mr: 'सीता गुंफा आणि पंचवटी तपोवन',
      gu: 'સીતા ગુફા અને પંચવટી તપોવન',
      en: 'Sita Gumpha & Panchavati Tapovan',
      bn: 'সীতা গুহা ও পঞ্চবটী তপোবন',
      ta: 'சீதா குகை மற்றும் பஞ்சவடி',
      te: 'సీతా గుహ మరియు పంచవటి తపోవనం',
      kn: 'ಸೀತಾ ಗುಹೆ ಮತ್ತು ಪಂಚವಟಿ ತಪೋವನ',
      ml: 'സീതാ ഗുഹയും പഞ്ചവടിയും',
      pa: 'ਸੀਤਾ ਗੁਫ਼ਾ ਅਤੇ ਪੰਚਵਟੀ',
      or: 'ସୀତା ଗୁମ୍ଫା ଏବଂ ପଞ୍ଚବଟୀ ତପୋବନ',
    },
    latitude: 20.0049,
    longitude: 73.7963,
    distanceKm: '1.5 किमी',
    darshanTimings: 'सुबह 6:00 से शाम 7:00 बजे तक',
    aartiTimings: 'प्रातः आरती 6:30 AM',
    description: {
      hi: 'वह पवित्र गुफा जहाँ माता सीता ने वनवास के दिन बिताए थे और 5 प्राचीन विशाल वट वृक्ष।',
      mr: 'माता सीतेची ऐतिहासिक गुंफा आणि ५ प्राचीन पवित्र वटवृक्ष.',
      gu: 'જ્યાં માતા સીતાએ વનવાસ દરમ્યાન સમય વિતાવ્યો હતો તે પવિત્ર ગુફા.',
      en: 'The sacred cave where Goddess Sita took shelter alongside five sacred banyan trees.',
    },
    facilities: ['मार्गदर्शक फलक', 'प्रसाद दुकान', 'विश्राम शेड'],
    imagePlaceholderColor: '#F59E0B',
    osmUrl: 'https://www.openstreetmap.org/?mlat=20.0049&mlon=73.7963#map=17/20.0049/73.7963',
    howToReach: {
      summary: {
        hi: 'काळाराम मंदिर के ठीक समीप 5 पवित्र वटवृक्षों के मध्य स्थित।',
        mr: 'काळाराम मंदिराच्या अगदी जवळ ५ पवित्र वटवृक्षांच्या सानिध्यात.',
        en: 'Located right next to Kalaram Mandir surrounded by 5 sacred Banyan trees.',
      },
      fromStation: {
        hi: 'नासिक रोड स्टेशन से पंचवटी बस द्वारा 10.8 किमी.',
        mr: 'नाशिक रोड स्थानकावरून पंचवटी बसने १०.८ किमी.',
        en: '10.8 km from Nashik Road Railway Station via Panchavati transit route.',
      },
      fromBusStand: {
        hi: 'सीबीएस बस स्टैंड से ई-रिक्शा द्वारा सीधे सीता गुंफा चौक (3.8 किमी).',
        mr: 'सीबीएस वरून ई-रिक्षाने थेट सीता गुंफा चौक (३.८ किमी).',
        en: '3.8 km from CBS Bus Stand via direct e-rickshaw.',
      },
      walkingRoute: {
        hi: 'काळाराम मंदिर से मात्र 200 मीटर उत्तर दिशा में पैदल चलें।',
        mr: 'काळाराम मंदिरापासून केवळ २०० मीटर उत्तरेकडे चालत जावे.',
        en: 'Walk 200 meters north from Kalaram Temple gate along the signed pedestrian path.',
      },
      droppingPoint: {
        hi: 'सीता गुंफा प्रवेश द्वार',
        mr: 'सीता गुंफा प्रवेशद्वार',
        en: 'Sita Gumpha Entrance Plaza',
      },
    },
  },
  {
    id: 'kumbh_annachhatra',
    name: {
      hi: 'श्री कुंभ महाप्रसाद अन्नछत्र (निःशुल्क)',
      mr: 'श्री कुंभ महाप्रसाद अन्नछत्र (विनामूल्य)',
      gu: 'શ્રી કુંભ મહાપ્રસાદ અન્નક્ષેત્ર (મફત)',
      en: 'Shri Kumbh Free Mahaprasad & Langar Camp',
      bn: 'শ্রী কুম্ভ মহাপ্রসাদ অন্নছত্র (বিনামূল্যে)',
      ta: 'இலவச அன்னதான முகாம்',
      te: 'ఉచిత అన్నదాన కేంద్రం',
      kn: 'ಉಚಿತ ಅನ್ನದಾಸೋಹ ಕೇಂದ್ರ',
      ml: 'സൗജന്യ അന്നദാന ക്യാമ്പ്',
      pa: 'ਮੁਫ਼ਤ ਲੰਗਰ ਕੈਂਪ',
      or: 'ମାଗଣା ଅନ୍ନଛତ୍ର କେନ୍ଦ୍ର',
    },
    latitude: 19.9992,
    longitude: 73.7938,
    distanceKm: '0.8 किमी',
    darshanTimings: 'सुबह 11:00 से दोपहर 3:00, शाम 7:00 से 10:00',
    aartiTimings: 'सतत सेवा',
    description: {
      hi: 'सभी तीर्थयात्रियों के लिए शुद्ध, स्वच्छ सात्विक महाप्रसाद (दाल, चावल, रोटी, सब्जी व मिठाई)।',
      mr: 'सर्व भाविकांसाठी शुद्ध, सात्विक आणि विनामूल्य भोजन व्यवस्था.',
      gu: 'બધા યાત્રાળુઓ માટે શુદ્ધ સાત્વિક મહાપ્રસાદની વ્યવસ્થા.',
      en: 'Free hygienic satvik meals and water for all pilgrims by charitable trusts.',
    },
    facilities: ['स्वच्छ बैठक व्यवस्था', 'शुद्ध आर.ओ. जल', 'दिव्यांगों हेतु विशेष पंक्ति'],
    imagePlaceholderColor: '#16A34A',
    osmUrl: 'https://www.openstreetmap.org/?mlat=19.9992&mlon=73.7938#map=17/19.9992/73.7938',
    howToReach: {
      summary: {
        hi: 'गोदावरी घाट व तपोवन साधु ग्राम के मुख्य प्रवेश मार्ग पर स्थित।',
        mr: 'गोदावरी घाट आणि तपोवन साधू ग्राम मुख्य मार्गावर स्थित.',
        en: 'Situated along the main pilgrimage corridor between Godavari Ghats and Tapovan.',
      },
      fromStation: {
        hi: 'नासिक रोड से तपोवन जाने वाली किसी भी बस या शेयर ऑटो से अन्नछत्र गेट पर उतरें (9 किमी).',
        mr: 'नाशिक रोडवरून तपोवन मार्गे जाणाऱ्या वाहनाने अन्नछत्र गेट (९ किमी).',
        en: 'Take any Tapovan-bound shuttle from Nashik Road to Annachhatra Gate (9 km).',
      },
      fromBusStand: {
        hi: 'सीबीएस से पंचवटी मार्ग द्वारा 3 किमी.',
        mr: 'सीबीएस वरून पंचवटी मार्गे ३ किमी.',
        en: '3 km from CBS Bus Stand along Panchavati route.',
      },
      walkingRoute: {
        hi: 'रामकुंड से गोदावरी नदी के किनारे-किनारे 600 मीटर पूर्व की ओर चलें।',
        mr: 'रामकुंडाकडून गोदावरी काठाने ६०० मीटर पूर्वेकडे चालत जावे.',
        en: 'Walk 600 meters east along the riverside promenade from Ramkund.',
      },
      droppingPoint: {
        hi: 'तपोवन अन्नछत्र मुख्य द्वार',
        mr: 'तपोवन अन्नछत्र मुख्य द्वार',
        en: 'Tapovan Mahaprasad Main Gate',
      },
    },
  },
  {
    id: 'kumbh_medical_hq',
    name: {
      hi: 'कुंभ मेला मुख्य आपातकालीन चिकित्सा केंद्र',
      mr: 'कुंभमेळा मुख्य आपत्कालीन वैद्यकीय केंद्र',
      gu: 'કુંભ મેળો મુખ્ય ઇમરજન્સી મેડિકલ કેન્દ્ર',
      en: 'Kumbh Mela Main Emergency Medical Center',
      bn: 'কুম্ভমেলা প্রধান জরুরি চিকিৎসা কেন্দ্র',
      ta: 'கும்பமேளா முதன்மை அவசர மருத்துவ மையம்',
      te: 'కుంభమేళా ప్రధాన అత్యవసర వైద్య కేంద్రం',
      kn: 'ಕುಂಭಮೇಳ ಮುಖ್ಯ ತುರ್ತು ವೈದ್ಯಕೀಯ ಕೇಂದ್ರ',
      ml: 'കുംഭമേള പ്രധാന അടിയന്തര മെഡിക്കൽ കേന്ദ്രം',
      pa: 'ਕੁੰਭ ਮੇਲਾ ਮੁੱਖ ਐਮਰਜੈਂਸੀ ਮੈਡੀਕਲ ਸੈਂਟਰ',
      or: 'କୁମ୍ଭମେଳା ମୁଖ୍ୟ ଜରୁରୀକାଳୀନ ଚିକିତ୍ସା କେନ୍ଦ୍ର',
    },
    latitude: 19.9981,
    longitude: 73.7892,
    distanceKm: '0.6 किमी',
    darshanTimings: '24x7 चालू',
    aartiTimings: 'आपातकालीन सेवाएं उपलब्ध',
    description: {
      hi: 'सरकारी डॉक्टरों, आईसीयू एम्बुलेंस, दवाइयां व प्राथमिक उपचार की निःशुल्क 24 घंटे व्यवस्था।',
      mr: 'तज्ज्ञ डॉक्टर, आयसीयू ॲम्ब्युलन्स आणि मोफत औषधोपचार २४ तास सज्ज.',
      gu: '૨૪ કલાક સરકારી ડોકટરો, એમ્બ્યુલન્સ અને મફત દવાઓની સુવિધા.',
      en: '24x7 Government emergency hospital camp with doctors, free medicines & ICU ambulances.',
    },
    facilities: ['108 एम्बुलेंस स्टेशन', 'दवाइयां निःशुल्क', 'ऑक्सीजन सपोर्ट', 'स्ट्रेचर'],
    imagePlaceholderColor: '#DC2626',
    osmUrl: 'https://www.openstreetmap.org/?mlat=19.9981&mlon=73.7892#map=17/19.9981/73.7892',
    howToReach: {
      summary: {
        hi: 'रामकुंड मुख्य घाट के ठीक सामने आपातकालीन चिकित्सा शिविर (24x7).',
        mr: 'रामकुंड मुख्य घाटाच्या अगदी समोर आपत्कालीन वैद्यकीय तळ (२४ तास).',
        en: 'Located directly opposite the Ramkund Main Bathing Entrance with 24x7 ambulance access.',
      },
      fromStation: {
        hi: 'नासिक रोड स्टेशन से सीधे 108 एम्बुलेंस अथवा सिटीलिंक बस रूट द्वारा 10 किमी.',
        mr: 'नाशिक रोड स्थानकावरून थेट १०८ किंवा सिटीलिंक बसने १० किमी.',
        en: '10 km from Nashik Road Station via direct emergency access corridor.',
      },
      fromBusStand: {
        hi: 'सीबीएस से 3 किमी सीधा मार्ग.',
        mr: 'सीबीएस वरून ३ किमी थेट रस्ता.',
        en: '3 km direct from CBS Central Stand.',
      },
      walkingRoute: {
        hi: 'रामकुंड घाट से 100 मीटर की दूरी पर रेड-क्रॉस मेडिकल बूथ दिखाई देगा।',
        mr: 'रामकुंड घाटापासून १०० मीटरवर रेड-क्रॉस मेडिकल बूथ दिसेल.',
        en: 'Visible 100 meters from Ramkund steps at the primary Red Cross signage post.',
      },
      droppingPoint: {
        hi: '108 आपातकालीन एम्बुलेंस बे',
        mr: '१०८ आपत्कालीन ॲम्ब्युलन्स बे',
        en: '108 Emergency Ambulance Bay',
      },
    },
  },
];

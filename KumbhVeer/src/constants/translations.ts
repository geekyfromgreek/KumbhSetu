export type LanguageCode = 'en' | 'mr';

export const TRANSLATIONS = {
  en: {
    appName: 'KumbhVeer',
    appTagline: 'Pilgrim Support & Field Verification Squad',
    portalSub: 'Kumbh Mela Volunteer Portal',

    // Nav
    tabAlerts: 'Alerts',
    tabFactCheck: 'Fact-Check',
    tabResolved: 'Completed',
    tabProfile: 'Profile',

    // Duty
    onDuty: 'On Duty',
    offDuty: 'Off Duty',
    dutySector: 'Duty Sector',
    badgeId: 'Badge ID',
    allSectors: 'All Sectors',

    // Registration
    regTitle: 'Volunteer Registration',
    regSub: 'Join the KumbhVeer volunteer squad to assist pilgrims and verify ground incidents.',
    fullName: 'Full Name',
    phone: 'Mobile Number',
    age: 'Age',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    preferredSector: 'Assigned Duty Sector',
    volunteerRole: 'Primary Role',
    uploadPhoto: 'Upload Profile Photo',
    chooseGallery: 'Choose from Gallery',
    takePhoto: 'Take Photo',
    orSample: 'Or select a volunteer avatar:',
    submitRegistration: 'Register as KumbhVeer',

    // Alerts Tab
    liveAlertsTitle: 'Pilgrim Incident Alerts',
    liveAlertsSub: 'Reports submitted from the main pilgrim app in your sector',
    filterAll: 'All',
    filterMySector: 'My Sector',
    filterPending: 'Pending',
    filterEnRoute: 'En Route',
    noAlertsTitle: 'No Active Incident Alerts',
    noAlertsDesc: 'All reports in this sector are verified and resolved. New pilgrim incidents will appear here.',
    reportedBy: 'Reported by Pilgrim',
    overchargeExtortion: 'Overcharge / Extortion',
    demandedVsOfficial: 'Demanded vs Official',
    claimTaskBtn: 'Accept & Go to Location',
    enRouteBadge: 'En Route to Location',
    verifyOfflineBtn: 'Offline Ground Verification',
    swipeToConfirm: 'Swipe to Confirm & Resolve Issue',
    swipeSuccess: 'Ground Verified & Solved!',
    groundNotes: 'Ground Inspection Notes',
    enterNotesPlaceholder: 'e.g. Visited Ramkund gate. Spoke with auto driver and pilgrim. Extra ₹50 refunded to pilgrim.',
    dismissReport: 'Dismiss as Invalid Report',

    // Fact Check Tab
    factCheckTitle: 'Ground Fact-Checking Desk',
    factCheckSub: 'Verify rumors & crowd announcements on the ground',
    unverifiedRumor: 'Unverified Claim',
    source: 'Source',
    inspectAndVerify: 'Inspect Ground Reality',
    markVerifiedTrue: 'Verify as TRUE',
    markDebunkFake: 'Debunk as FAKE',
    groundClarification: 'Ground Fact Clarification',
    factCheckPlaceholder: 'e.g. Personally visited Tapovan bridge at 14:00 hrs. Bridge is fully open and crowd flow is normal.',
    submitFactCheck: 'Publish Verified Ground Truth',
    noRumorsTitle: 'No Unverified Claims',
    noRumorsDesc: 'All ground announcements in your duty zone are currently verified.',

    // Stats
    solvedIncidents: 'Solved Incidents',
    factChecksCompleted: 'Fact-Checks Verified',
    hoursServed: 'Hours on Duty',

    // Language
    selectLanguage: 'Language / भाषा',
    english: 'English',
    marathi: 'मराठी',
  },
  mr: {
    appName: 'कुंभवीर',
    appTagline: 'भाविक सहाय्य व प्रत्यक्ष तपासणी पथक',
    portalSub: 'कुंभमेळा स्वयंसेवक पोर्टल',

    // Nav
    tabAlerts: 'सतर्कता',
    tabFactCheck: 'फॅक्ट-चेक',
    tabResolved: 'पूर्ण कामे',
    tabProfile: 'प्रोफाईल',

    // Duty
    onDuty: 'कर्तव्यावर (On Duty)',
    offDuty: 'सुट्टीवर (Off Duty)',
    dutySector: 'नियुक्त क्षेत्र',
    badgeId: 'बॅज क्र.',
    allSectors: 'सर्व क्षेत्रे',

    // Registration
    regTitle: 'कुंभवीर स्वयंसेवक नोंदणी',
    regSub: 'भाविकांना मदत करण्यासाठी व प्रत्यक्ष घटना पडताळणीसाठी कुंभवीर पथकात सामील व्हा.',
    fullName: 'पूर्ण नाव',
    phone: 'मोबाईल क्रमांक',
    age: 'वय',
    gender: 'लिंग',
    male: 'पुरुष',
    female: 'महिला',
    other: 'इतर',
    preferredSector: 'नियुक्त ड्युटी क्षेत्र',
    volunteerRole: 'मुख्य भूमिका / जबाबदारी',
    uploadPhoto: 'प्रोफाईल फोटो अपलोड करा',
    chooseGallery: 'गॅलरीतून निवडा',
    takePhoto: 'फोटो काढा',
    orSample: 'किंवा स्वयंसेवक अवतार निवडा:',
    submitRegistration: 'कुंभवीर म्हणून नोंदणी पूर्ण करा',

    // Alerts Tab
    liveAlertsTitle: 'भाविक तक्रार व घटना सतर्कता',
    liveAlertsSub: 'मुख्य अॅपवरून तुमच्या नियुक्त क्षेत्रातील आलेल्या तक्रारी',
    filterAll: 'सर्व',
    filterMySector: 'माझे क्षेत्र',
    filterPending: 'प्रलंबित',
    filterEnRoute: 'मार्गावर',
    noAlertsTitle: 'सध्या कोणतीही प्रलंबित घटना नाही',
    noAlertsDesc: 'या क्षेत्रातील सर्व तक्रारी सोडवण्यात आल्या आहेत. नवीन तक्रारी येथे दिसतील.',
    reportedBy: 'भाविकाने नोंदवलेली तक्रार',
    overchargeExtortion: 'जादा दर आकारणी / गैरप्रकार',
    demandedVsOfficial: 'मागितलेले वि. अधिकृत दर',
    claimTaskBtn: 'घटनास्थळी जाण्यासाठी स्वीकारा',
    enRouteBadge: 'घटनास्थळाकडे रवाना',
    verifyOfflineBtn: 'प्रत्यक्ष जागेवर जाऊन पडताळणी करा',
    swipeToConfirm: 'समस्या सोडवण्यासाठी स्वाइप करा',
    swipeSuccess: 'प्रत्यक्ष पडताळणी पूर्ण व समस्या निवारण!',
    groundNotes: 'प्रत्यक्ष तपासणी अहवाल / शेरा',
    enterNotesPlaceholder: 'उदा. रामकुंड गेट येथे भेट दिली. रिक्षाचालकाशी चर्चा करून भाविकाचे जादा ₹५० परत मिळवून दिले.',
    dismissReport: 'तक्रार अयोग्य म्हणून बाद करा',

    // Fact Check Tab
    factCheckTitle: 'ग्राउंड फॅक्ट-चेकिंग कक्ष',
    factCheckSub: 'अफवा आणि माहितीची जागेवर जाऊन पडताळणी करा',
    unverifiedRumor: 'अपडताळलेली बातमी / अफवा',
    source: 'माध्यम / स्रोत',
    inspectAndVerify: 'प्रत्यक्ष जागेवर तपासणी करा',
    markVerifiedTrue: 'माहिती सत्य आहे (TRUE)',
    markDebunkFake: 'अफवा / खोटी आहे (FAKE)',
    groundClarification: 'सत्य परिस्थिती स्पष्टीकरण',
    factCheckPlaceholder: 'उदा. तपोवन पुलावर प्रत्यक्ष दुपारी २ वाजता पाहणी केली. पूल पूर्णपणे चालू असून गर्दी सुरळीत आहे.',
    submitFactCheck: 'सत्य अहवाल प्रसिद्ध करा',
    noRumorsTitle: 'सध्या कोणतीही अफवा प्रलंबित नाही',
    noRumorsDesc: 'तुमच्या क्षेत्रातील सर्व बातम्यांची पडताळणी झालेली आहे.',

    // Stats
    solvedIncidents: 'निवारण केलेल्या तक्रारी',
    factChecksCompleted: 'तपासलेल्या अफवा',
    hoursServed: 'ड्युटीचे तास',

    // Language
    selectLanguage: 'Language / भाषा',
    english: 'English',
    marathi: 'मराठी',
  },
} as const;

export const DUTY_SECTORS = [
  { id: 'sector_ramkund', en: 'Ramkund & Godavari Ghats', mr: 'रामकुंड व गोदावरी घाट' },
  { id: 'sector_tapovan', en: 'Tapovan Sadhugram & Parking', mr: 'तपोवन साधुग्राम व पार्किंग' },
  { id: 'sector_panchavati', en: 'Panchavati Main Bazaar', mr: 'पंचवटी मुख्य बाजार' },
  { id: 'sector_cbs_station', en: 'Nashik CBS & Railway Station Transit', mr: 'नाशिक सीबीएस व रेल्वे स्टेशन' },
  { id: 'sector_trimbak', en: 'Trimbakeshwar Temple & Kushavarta', mr: 'त्र्यंबकेश्वर मंदिर व कुशावर्त' },
];

export const VOLUNTEER_ROLES = [
  { id: 'ground_verifier', en: 'Ground Verification & Fact-Checker', mr: 'प्रत्यक्ष तपासणी व फॅक्ट-चेकर' },
  { id: 'crowd_guide', en: 'Crowd Direction & Pilgrim Guide', mr: 'गर्दी नियंत्रण व भाविक मार्गदर्शक' },
  { id: 'anti_extortion', en: 'Price Cap & Overcharging Vigilance', mr: 'जादा दर आकारणी प्रतिबंधक' },
  { id: 'lost_found', en: 'Lost & Found Support Scout', mr: 'हरवलेले व्यक्ती व वस्तू शोध पथक' },
];

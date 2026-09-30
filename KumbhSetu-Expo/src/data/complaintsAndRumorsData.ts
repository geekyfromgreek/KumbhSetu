export interface RumorFactCheck {
  id: string;
  claimTitle: { [lang: string]: string };
  claimSource: string;
  status: 'verified_true' | 'debunked_fake' | 'under_review';
  officialClarification: { [lang: string]: string };
  verifiedBy: string;
  timestamp: string;
}

export interface EmergencyContact {
  id: string;
  name: { [lang: string]: string };
  number: string;
  description: { [lang: string]: string };
  iconName: string;
  category: 'police' | 'medical' | 'admin' | 'disaster' | 'lost_found';
  color: string;
}

export interface UserComplaint {
  id: string;
  category: string;
  vehicleOrShop: string;
  location: string;
  standardAmt: string;
  chargedAmt: string;
  timestamp: string;
  status: 'REGISTERED' | 'ACTION_TAKEN' | 'INVESTIGATING';
  token: string;
}

export const INITIAL_RUMORS: RumorFactCheck[] = [];

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: 'police_112',
    name: {
      hi: 'अखिल भारतीय पुलिस आपातकालीन',
      mr: 'पोलीस आपत्कालीन नियंत्रण',
      gu: 'પોલીસ ઇમરજન્સી',
      en: 'Police Control & Emergency',
    },
    number: '112',
    description: {
      hi: 'सुरक्षा, चोरी, भीड़ नियंत्रण व किसी भी अप्रिय घटना में तुरंत पुलिस सहायता।',
      mr: 'सुरक्षा व कोणत्याही अडचणीच्या वेळी तात्काळ पोलीस मदत.',
      en: 'Immediate police response for safety, security and crowd assistance.',
    },
    iconName: 'shield',
    category: 'police',
    color: '#1D4ED8',
  },
  {
    id: 'ambulance_108',
    name: {
      hi: 'सरकारी एम्बुलेंस सेवा (ICU)',
      mr: 'शासकीय ॲम्ब्युलन्स (१०८)',
      gu: 'સરકારી એમ્બ્યુલન્સ સેવા',
      en: 'Government Ambulance Service (ICU)',
    },
    number: '108',
    description: {
      hi: 'चिकित्सीय आपातकाल, दुर्घटना या अचानक स्वास्थ्य बिगड़ने पर 24 घंटे सेवा।',
      mr: 'वैद्यकीय आणीबाणीसाठी २४ तास विनामूल्य रुग्णवाहिका.',
      en: '24x7 Emergency medical transport with doctor and oxygen support.',
    },
    iconName: 'medical',
    category: 'medical',
    color: '#DC2626',
  },
  {
    id: 'kumbh_helpline_1950',
    name: {
      hi: 'कुंभ मेला विशेष यात्री हेल्पलाइन',
      mr: 'कुंभमेळा विशेष भाविक मदत कक्ष',
      gu: 'કુંભ મેળો યાત્રી હેલ્પલાઇન',
      en: 'Kumbh Mela Toll-Free Pilgrim Helpline',
    },
    number: '1950',
    description: {
      hi: 'मार्ग, स्नान समय, पार्किंग, आवास व मेला संबंधी किसी भी जानकारी हेतु।',
      mr: 'मार्ग, स्नान वेळ, मुक्काम व मेळ्याच्या माहितीसाठी टोल-फ्री क्रमांक.',
      en: 'Official mela guide, ghat directions, parking availability and inquiries.',
    },
    iconName: 'help-buoy',
    category: 'admin',
    color: '#E85D04',
  },
  {
    id: 'lost_found_1800',
    name: {
      hi: 'खोया-पाया केंद्र (परिवार सहायता)',
      mr: 'हरवलेले-सापडलेले नियंत्रण केंद्र',
      gu: 'ખોવાયા-મળ્યા કેન્દ્ર (પરિવાર સહાય)',
      en: 'Lost & Found Pilgrim Camp (Family Assistance)',
    },
    number: '18002330200',
    description: {
      hi: 'मेले में बिछड़े परिजनों, बच्चों या बुजुर्गों की त्वरित तलाश हेतु लाइव नियंत्रण कक्ष।',
      mr: 'मेळ्यात हरवलेल्या व्यक्तींचा शोध घेण्यासाठी विशेष नियंत्रण कक्ष.',
      en: 'Dedicated center with live tracking screens to reunite missing family members.',
    },
    iconName: 'people',
    category: 'lost_found',
    color: '#0D9488',
  },
  {
    id: 'women_helpline_1090',
    name: {
      hi: 'महिला सुरक्षा व सहायता हेल्पलाइन',
      mr: 'महिला सुरक्षा व मदत कक्ष',
      gu: 'મહિલા સુરક્ષા હેલ્પલાઇન',
      en: 'Women Safety & Assistance Cell',
    },
    number: '1090',
    description: {
      hi: 'महिला तीर्थयात्रियों के लिए विशेष महिला पुलिस सहायता दस्ता।',
      mr: 'महिला भाविकांसाठी विशेष महिला पोलीस पथक २४ तास तत्पर.',
      en: 'Dedicated female safety squad stationed across all ghats and transit hubs.',
    },
    iconName: 'person',
    category: 'police',
    color: '#7C3AED',
  },
];

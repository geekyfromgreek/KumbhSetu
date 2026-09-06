export interface TransitLocation {
  id: string;
  name: { [lang: string]: string };
  type: 'station' | 'bus_stand' | 'ghat' | 'temple' | 'airport' | 'hub';
  iconName: string;
}

export interface RouteFare {
  id: string;
  fromName?: string;
  toName?: string;
  fromId: string;
  toId: string;
  distanceKm: number;
  sharedAutoPerPerson: number;
  privateAutoFixed: number;
  kumbhCityBus: number;
  taxiCab: number;
  approxMinutes: number;
  trafficNote: string;
  lastUpdatedBy?: string;
  lastUpdatedAt?: string;
}

export interface StandardPriceItem {
  id: string;
  name: { [lang: string]: string };
  category: 'food' | 'beverage' | 'puja' | 'utility';
  standardMaxPrice: number;
  unit: string;
  iconName: string;
  govtNotice: string;
  lastUpdatedBy?: string;
}

export const TRANSIT_LOCATIONS: TransitLocation[] = [
  {
    id: 'nsk_railway',
    name: {
      hi: 'नासिक रोड रेलवे स्टेशन (Nashik Road Station)',
      mr: 'नाशिक रोड रेल्वे स्थानक',
      gu: 'નાસિક રોડ રેલ્વે સ્ટેશન',
      en: 'Nashik Road Railway Station',
    },
    type: 'station',
    iconName: 'train',
  },
  {
    id: 'cbs_bus_stand',
    name: {
      hi: 'सी.बी.एस. सेंट्रल बस स्टैंड (CBS Old & New)',
      mr: 'सी.बी.एस. मध्यवर्ती बस स्थानक',
      gu: 'સી.બી.એસ. સેન્ટ્રલ બસ સ્ટેન્ડ',
      en: 'CBS Central Bus Stand',
    },
    type: 'bus_stand',
    iconName: 'bus',
  },
  {
    id: 'ramkund_panchavati',
    name: {
      hi: 'रामकुंड / पंचवटी स्नान घाट',
      mr: 'रामकुंड / पंचवटी स्नान घाट',
      gu: 'રામકુંડ / પંચવટી સ્નાન ઘાટ',
      en: 'Ramkund / Panchavati Ghats',
    },
    type: 'ghat',
    iconName: 'water',
  },
  {
    id: 'trimbakeshwar_temple',
    name: {
      hi: 'त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर (Trimbakeshwar)',
      mr: 'त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर',
      gu: 'ત્ર્યંબકેશ્વર જ્યોતિર્લિંગ મંદિર',
      en: 'Trimbakeshwar Jyotirlinga Temple',
    },
    type: 'temple',
    iconName: 'business',
  },
  {
    id: 'tapovan_sadhu_gram',
    name: {
      hi: 'तपोवन एवं साधु ग्राम अखाड़ा क्षेत्र',
      mr: 'तपोवन आणि साधू ग्राम आखाडा परिसर',
      gu: 'તપોવન અને સાધુ ગ્રામ અખાડા વિસ્તાર',
      en: 'Tapovan & Sadhu Gram Camp',
    },
    type: 'hub',
    iconName: 'flag',
  },
  {
    id: 'ozar_airport',
    name: {
      hi: 'ओझर विमानतल (Nashik Ozar Airport)',
      mr: 'ओझर विमानतळ (नाशिक)',
      gu: 'ઓઝર એરપોર્ટ (નાસિક)',
      en: 'Ozar Airport (Nashik)',
    },
    type: 'airport',
    iconName: 'airplane',
  },
  {
    id: 'muktidham_temple',
    name: {
      hi: 'मुक्तिधाम मंदिर (नासिक रोड)',
      mr: 'मुक्तिधाम मंदिर (नाशिक रोड)',
      gu: 'મુક્તિધામ મંદિર (નાસિક રોડ)',
      en: 'Muktidham Temple (Nashik Road)',
    },
    type: 'temple',
    iconName: 'business',
  },
];

export const INITIAL_ROUTE_FARES: RouteFare[] = [];

export const INITIAL_STANDARD_PRICES: StandardPriceItem[] = [];

export const STANDARD_PRICE_DIRECTORY: StandardPriceItem[] = [];

export function calculateFare(
  fromId: string,
  toId: string,
  customRoutes: RouteFare[] = []
): RouteFare | null {
  if (fromId === toId) {
    return {
      id: `self_${fromId}`,
      fromName: fromId,
      toName: toId,
      fromId,
      toId,
      distanceKm: 0,
      sharedAutoPerPerson: 0,
      privateAutoFixed: 0,
      kumbhCityBus: 0,
      taxiCab: 0,
      approxMinutes: 0,
      trafficNote: 'पैदल दूरी (Same location / Walking distance)',
      lastUpdatedBy: 'Admin Authority',
    };
  }

  const cleanFrom = fromId.toLowerCase().trim();
  const cleanTo = toId.toLowerCase().trim();

  const matched = customRoutes.find((r) => {
    const rFromId = (r.fromId || '').toLowerCase().trim();
    const rToId = (r.toId || '').toLowerCase().trim();
    const rFromName = (r.fromName || '').toLowerCase().trim();
    const rToName = (r.toName || '').toLowerCase().trim();

    return (
      (rFromId === cleanFrom && rToId === cleanTo) ||
      (rFromId === cleanTo && rToId === cleanFrom) ||
      (rFromName && rToName && rFromName.includes(cleanFrom) && rToName.includes(cleanTo)) ||
      (rFromName && rToName && rFromName.includes(cleanTo) && rToName.includes(cleanFrom))
    );
  });

  return matched || null;
}

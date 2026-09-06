export interface SnanMuhurat {
  id: string;
  title: string;
  titleHi?: string;
  titleMr?: string;
  snanDate: string;
  muhuratTime: string;
  ghatLocation: string;
  importance: string;
  crowdLevel: 'Moderate' | 'High' | 'Extreme';
  isMajor: boolean;
  orderNum: number;
}

export const INITIAL_SNAN_MUHURATS: SnanMuhurat[] = [
  {
    id: 'snan_1',
    title: '1st Shahi Snan (Makar Sankranti)',
    titleHi: 'प्रथम शाही स्नान (मकर संक्रांति)',
    titleMr: 'पहिला शाही स्नान (मकर संक्रांती)',
    snanDate: '14 January 2027',
    muhuratTime: '04:15 AM – 08:30 AM (Brahma Muhurat)',
    ghatLocation: 'Ramkund (Nashik) & Kushavarta (Trimbakeshwar)',
    importance: 'Opening Royal Holy Dip of Maha Kumbh by all Akhadas followed by Yatris.',
    crowdLevel: 'Extreme',
    isMajor: true,
    orderNum: 1,
  },
  {
    id: 'snan_2',
    title: '2nd Shahi Snan (Mauni Amavasya)',
    titleHi: 'द्वितीय शाही स्नान (मौनी अमावस्या)',
    titleMr: 'दुसरा शाही स्नान (मौनी अमावस्या)',
    snanDate: '06 February 2027',
    muhuratTime: '03:45 AM – 09:15 AM (Amrit Vela)',
    ghatLocation: 'Ramkund, Nashik & Godavari Sangam',
    importance: 'The Most Auspicious Royal Bathing Day of the 12-Year Kumbh Cycle.',
    crowdLevel: 'Extreme',
    isMajor: true,
    orderNum: 2,
  },
  {
    id: 'snan_3',
    title: '3rd Shahi Snan (Basant Panchami)',
    titleHi: 'तृतीय शाही स्नान (बसंत पंचमी)',
    titleMr: 'तिसरा शाही स्नान (वसंत पंचमी)',
    snanDate: '12 February 2027',
    muhuratTime: '05:00 AM – 10:00 AM',
    ghatLocation: 'Kushavarta Kund (Trimbakeshwar)',
    importance: 'Sacred Akharas procession dedicated to Lord Shiva and Maa Saraswati.',
    crowdLevel: 'High',
    isMajor: true,
    orderNum: 3,
  },
  {
    id: 'snan_4',
    title: 'Maghi Purnima Snan',
    titleHi: 'माघी पूर्णिमा पवित्र स्नान',
    titleMr: 'माघी पौर्णिमा पवित्र स्नान',
    snanDate: '21 February 2027',
    muhuratTime: '04:30 AM – 09:00 AM',
    ghatLocation: 'Ramkund, Nashik',
    importance: 'Kalpavas Purnahuti & Divine Godavari Aarti Holy Dip.',
    crowdLevel: 'High',
    isMajor: false,
    orderNum: 4,
  },
  {
    id: 'snan_5',
    title: 'Maha Shivratri Shahi Snan',
    titleHi: 'महाशिवरात्रि महा शाही स्नान',
    titleMr: 'महाशिवरात्री महा शाही स्नान',
    snanDate: '06 March 2027',
    muhuratTime: '03:30 AM – 11:30 AM (Char Pahar Puja)',
    ghatLocation: 'Trimbakeshwar Jyotirlinga Kushavarta Kund',
    importance: 'Grand Concluding Royal Snan of Maha Kumbh Nashik–Trimbakeshwar.',
    crowdLevel: 'Extreme',
    isMajor: true,
    orderNum: 5,
  },
];

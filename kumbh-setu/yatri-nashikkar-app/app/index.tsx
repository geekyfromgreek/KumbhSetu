/**
 * Screen 0 — Landing / Role Selector
 * Two large tappable cards: "I'm a Yatri" and "I'm a Nashikkar"
 * Saffron/maroon/warm ivory palette
 */
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const { width } = Dimensions.get('window');

export default function LandingScreen() {
  const router = useRouter();
  const [lang, setLang] = useState<'en' | 'hi' | 'mr'>('en');

  const text = {
    en: {
      title: 'KumbhSetu',
      subtitle: 'कुंभसेतु',
      tagline: 'Truth · Trust · Fair Prices',
      yatri: "I'm a Yatri",
      yatriSub: 'Pilgrim / Visitor',
      yatriDesc: 'Explore marketplace, book services, report issues',
      nashikkar: "I'm a Nashikkar",
      nashikkarSub: 'Local Vendor / Admin',
      nashikkarDesc: 'Manage listings, verify vendors, review reports',
      kumbh: 'Kumbh Mela 2027 · Nashik',
    },
    hi: {
      title: 'KumbhSetu',
      subtitle: 'कुंभसेतु',
      tagline: 'सत्य · विश्वास · उचित मूल्य',
      yatri: 'मैं यात्री हूं',
      yatriSub: 'तीर्थयात्री / आगंतुक',
      yatriDesc: 'बाज़ार देखें, सेवाएँ बुक करें, शिकायत दर्ज करें',
      nashikkar: 'मैं नाशिककर हूं',
      nashikkarSub: 'स्थानीय विक्रेता / प्रशासक',
      nashikkarDesc: 'लिस्टिंग प्रबंधित करें, विक्रेता सत्यापित करें',
      kumbh: 'कुंभ मेला 2027 · नाशिक',
    },
    mr: {
      title: 'KumbhSetu',
      subtitle: 'कुंभसेतु',
      tagline: 'सत्य · विश्वास · योग्य किंमत',
      yatri: 'मी यात्री आहे',
      yatriSub: 'भाविक / पर्यटक',
      yatriDesc: 'बाजारपेठ पहा, सेवा बुक करा, तक्रार नोंदवा',
      nashikkar: 'मी नाशिककर आहे',
      nashikkarSub: 'स्थानिक विक्रेता / प्रशासक',
      nashikkarDesc: 'लिस्टिंग व्यवस्थापित करा, विक्रेता सत्यापित करा',
      kumbh: 'कुंभमेळा 2027 · नाशिक',
    },
  };

  const t = text[lang];
  const langOrder: Array<'en' | 'hi' | 'mr'> = ['en', 'hi', 'mr'];
  const langLabels = { en: 'EN', hi: 'हिं', mr: 'मरा' };

  return (
    <View style={styles.container}>
      {/* Language toggle */}
      <View style={styles.langRow}>
        {langOrder.map((l) => (
          <TouchableOpacity
            key={l}
            style={[styles.langBtn, lang === l && styles.langBtnActive]}
            onPress={() => setLang(l)}
          >
            <Text style={[styles.langText, lang === l && styles.langTextActive]}>
              {langLabels[l]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Title */}
      <View style={styles.titleBlock}>
        <Text style={styles.title}>{t.title}</Text>
        <Text style={styles.subtitle}>{t.subtitle}</Text>
        <View style={styles.divider} />
        <Text style={styles.tagline}>{t.tagline}</Text>
      </View>

      {/* Role Cards */}
      <View style={styles.cardsContainer}>
        {/* Yatri Card */}
        <TouchableOpacity
          style={[styles.card, styles.yatriCard]}
          onPress={() => router.push('/yatri/home')}
          activeOpacity={0.85}
        >
          <View style={styles.cardIcon}>
            <Ionicons name="walk-outline" size={32} color="#B44D12" />
          </View>
          <Text style={styles.cardTitle}>{t.yatri}</Text>
          <Text style={styles.cardSubtitle}>{t.yatriSub}</Text>
          <Text style={styles.cardDesc}>{t.yatriDesc}</Text>
          <View style={styles.cardArrow}>
            <Ionicons name="arrow-forward" size={20} color="#B44D12" />
          </View>
        </TouchableOpacity>

        {/* Nashikkar Card */}
        <TouchableOpacity
          style={[styles.card, styles.nashikkarCard]}
          onPress={() => router.push('/nashikkar/login')}
          activeOpacity={0.85}
        >
          <View style={[styles.cardIcon, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
            <Ionicons name="shield-checkmark-outline" size={32} color="#FFF8F0" />
          </View>
          <Text style={[styles.cardTitle, { color: '#FFF8F0' }]}>{t.nashikkar}</Text>
          <Text style={[styles.cardSubtitle, { color: 'rgba(255,248,240,0.8)' }]}>{t.nashikkarSub}</Text>
          <Text style={[styles.cardDesc, { color: 'rgba(255,248,240,0.7)' }]}>{t.nashikkarDesc}</Text>
          <View style={[styles.cardArrow, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
            <Ionicons name="arrow-forward" size={20} color="#FFF8F0" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>{t.kumbh}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 24,
  },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginBottom: 32,
  },
  langBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D4A574',
  },
  langBtnActive: {
    backgroundColor: '#B44D12',
    borderColor: '#B44D12',
  },
  langText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#B44D12',
  },
  langTextActive: {
    color: '#FFF8F0',
  },
  titleBlock: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#5B1A0E',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 20,
    color: '#B44D12',
    marginTop: 2,
    fontWeight: '500',
  },
  divider: {
    width: 48,
    height: 2,
    backgroundColor: '#E8A060',
    marginVertical: 16,
    borderRadius: 1,
  },
  tagline: {
    fontSize: 15,
    color: '#8B6914',
    fontWeight: '500',
    letterSpacing: 1.5,
  },
  cardsContainer: {
    flex: 1,
    gap: 16,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 20,
    padding: 28,
    position: 'relative',
  },
  yatriCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EED9C4',
    shadowColor: '#B44D12',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  nashikkarCard: {
    backgroundColor: '#7A2520',
    shadowColor: '#5B1A0E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  cardIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'rgba(180,77,18,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#5B1A0E',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#A0845C',
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 13,
    color: '#8B7355',
    lineHeight: 18,
  },
  cardArrow: {
    position: 'absolute',
    right: 24,
    top: 28,
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(180,77,18,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#A0845C',
    fontWeight: '500',
    letterSpacing: 0.5,
    marginTop: 16,
  },
});

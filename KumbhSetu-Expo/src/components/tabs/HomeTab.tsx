import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useApp } from '@/context/AppContext';
import { KumbhColors } from '@/constants/colors';
import { SnanScheduleModal } from '@/components/SnanScheduleModal';

export const HomeTab: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { user, t, setActiveTab, setIsMapModalOpen, setIsLangModalOpen, currentLangMeta, logoutUser, snanMuhurats, language } = useApp();
  const [isSnanModalOpen, setIsSnanModalOpen] = useState<boolean>(false);

  const nextSnan = snanMuhurats.length > 0 ? snanMuhurats[0] : null;
  const localizedSnanTitle = nextSnan
    ? (language === 'hi' && nextSnan.titleHi ? nextSnan.titleHi : language === 'mr' && nextSnan.titleMr ? nextSnan.titleMr : nextSnan.title)
    : '';

  return (
    <>
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingTop: Math.max(insets.top + 8, 16), paddingBottom: 28 }
      ]}
      showsVerticalScrollIndicator={false}>
      
      {/* Top Greeting Bar */}
      <View style={styles.topBar}>
        <View style={styles.userGreetingBox}>
          <View style={styles.avatarCircle}>
            <MaterialCommunityIcons name="account" size={20} color={KumbhColors.primary} />
          </View>
          <View>
            <Text style={styles.greetingTitle}>
              {user?.name || t.welcomePilgrim}
            </Text>
            <Text style={styles.greetingSub}>{t.welcome}</Text>
          </View>
        </View>

        <View style={styles.topActionBtns}>
          <TouchableOpacity
            style={styles.langBtn}
            onPress={() => setIsLangModalOpen(true)}
            activeOpacity={0.8}>
            <Ionicons name="globe-outline" size={14} color={KumbhColors.templeDark} />
            <Text style={styles.langText}>{currentLangMeta.nativeName}</Text>
            <Ionicons name="chevron-down" size={12} color="#64748B" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={logoutUser}
            activeOpacity={0.8}>
            <Ionicons name="log-out-outline" size={15} color={KumbhColors.textMuted} />
          </TouchableOpacity>
        </View>
      </View>

      {/* HERO BANNER */}
      <View style={styles.heroPilgrimCard}>
        <Text style={styles.heroTitle}>{t.homeBannerTitle}</Text>
        <Text style={styles.heroDesc}>{t.homeBannerSub}</Text>

        <TouchableOpacity
          style={styles.openMapBigBtn}
          onPress={() => setIsMapModalOpen(true)}
          activeOpacity={0.85}>
          <Text style={styles.mapBtnMainText}>{t.openPilgrimMapBtn}</Text>
          <Ionicons name="arrow-forward" size={16} color="#FFFFFF" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
      </View>

      {/* SHAHI SNAN & MUHURAT STRIP */}
      {nextSnan && (
        <TouchableOpacity
          style={styles.snanLiveCard}
          onPress={() => setIsSnanModalOpen(true)}
          activeOpacity={0.85}
        >
          <View style={styles.snanLiveHeader}>
            <View style={styles.snanPillRow}>
              <View style={styles.royalTag}>
                <FontAwesome5 name="crown" size={9} color="#B45309" />
                <Text style={styles.royalTagText}>
                  {language === 'hi' ? 'शाही स्नान' : language === 'mr' ? 'शाही स्नान' : 'SHAHI SNAN'}
                </Text>
              </View>
              <Text style={styles.snanDateBadge}>{nextSnan.snanDate}</Text>
            </View>

            <Ionicons name="chevron-forward" size={16} color={KumbhColors.templeBrown} />
          </View>

          <Text style={styles.snanMainTitle}>{localizedSnanTitle}</Text>

          <View style={styles.snanTimingRow}>
            <View style={styles.snanTimingItem}>
              <Ionicons name="time" size={12} color={KumbhColors.riverBlueDark} />
              <Text style={styles.snanTimingText}>{nextSnan.muhuratTime}</Text>
            </View>
            <View style={styles.snanTimingItem}>
              <Ionicons name="location" size={12} color={KumbhColors.secondaryDark} />
              <Text style={styles.snanGhatText} numberOfLines={1}>{nextSnan.ghatLocation}</Text>
            </View>
          </View>

          <View style={styles.snanFooterAction}>
            <Text style={styles.snanViewAllText}>
              {language === 'hi'
                ? 'सभी 5 शाही स्नान व मुहूर्त वेळा देखें →'
                : language === 'mr'
                ? 'सर्व 5 शाही स्नान व मुहूर्त वेळा पहा →'
                : 'View All 5 Shahi Snan Muhurat Dates →'}
            </Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Section Title */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{t.quickFeatures}</Text>
      </View>


      {/* Grid of Action Cards */}
      <View style={styles.featuresGrid}>
        
        {/* Card 1: Pilgrim Map */}
        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => setIsMapModalOpen(true)}
          activeOpacity={0.85}>
          <Text style={styles.cardTitleText}>{t.cardPilgrimTitle}</Text>
          <Text style={styles.cardDescText}>{t.cardPilgrimDesc}</Text>
          <View style={styles.cardActionRow}>
            <Text style={[styles.cardActionText, { color: KumbhColors.primary }]}>
              {t.direction} →
            </Text>
          </View>
        </TouchableOpacity>

        {/* Card 2: Local Marketplace */}
        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => setActiveTab('market')}
          activeOpacity={0.85}>
          <Text style={styles.cardTitleText}>{t.cardMarketTitle}</Text>
          <Text style={styles.cardDescText}>{t.cardMarketDesc}</Text>
          <View style={styles.cardActionRow}>
            <Text style={[styles.cardActionText, { color: KumbhColors.secondaryDark }]}>
              {t.tabMarket} →
            </Text>
          </View>
        </TouchableOpacity>

        {/* Card 3: Fare & Price Guide */}
        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => setActiveTab('fare')}
          activeOpacity={0.85}>
          <Text style={styles.cardTitleText}>{t.cardFareTitle}</Text>
          <Text style={styles.cardDescText}>{t.cardFareDesc}</Text>
          <View style={styles.cardActionRow}>
            <Text style={[styles.cardActionText, { color: KumbhColors.riverBlueDark }]}>
              {t.tabFare} →
            </Text>
          </View>
        </TouchableOpacity>

        {/* Card 4: Complaints & Rumor Buster */}
        <TouchableOpacity
          style={styles.featureCard}
          onPress={() => setActiveTab('help')}
          activeOpacity={0.85}>
          <Text style={styles.cardTitleText}>{t.cardComplaintTitle}</Text>
          <Text style={styles.cardDescText}>{t.cardComplaintDesc}</Text>
          <View style={styles.cardActionRow}>
            <Text style={[styles.cardActionText, { color: KumbhColors.danger }]}>
              {t.tabHelp} →
            </Text>
          </View>
        </TouchableOpacity>

      </View>

      {/* 24x7 Helpline SOS Strip */}
      <TouchableOpacity
        style={styles.sosBanner}
        onPress={() => setActiveTab('help')}
        activeOpacity={0.85}>
        <View style={styles.sosLeft}>
          <Ionicons name="call" size={16} color="#FFFFFF" />
          <View>
            <Text style={styles.sosTitle}>24x7 Emergency Helplines</Text>
            <Text style={styles.sosSub}>Police: 112 • Ambulance: 108 • Mela Desk: 1950</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
      </TouchableOpacity>

    </ScrollView>

    <SnanScheduleModal
      visible={isSnanModalOpen}
      onClose={() => setIsSnanModalOpen(false)}
    />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: KumbhColors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  snanLiveCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  snanLiveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  snanPillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  royalTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  royalTagText: {
    fontSize: 9.5,
    fontFamily: 'Poppins_700Bold',
    color: '#B45309',
  },
  snanDateBadge: {
    fontSize: 10.5,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.primary,
    backgroundColor: '#FFFBEB',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  snanMainTitle: {
    fontSize: 13.5,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeDark,
    marginBottom: 6,
  },
  snanTimingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  snanTimingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  snanTimingText: {
    fontSize: 10.5,
    fontFamily: 'Poppins_500Medium',
    color: KumbhColors.riverBlueDark,
    flex: 1,
  },
  snanGhatText: {
    fontSize: 10.5,
    fontFamily: 'Poppins_500Medium',
    color: KumbhColors.textSecondary,
    flex: 1,
  },
  snanFooterAction: {
    borderTopWidth: 1,
    borderTopColor: '#FEF3C7',
    paddingTop: 6,
    marginTop: 2,
  },
  snanViewAllText: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.primaryDark,
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userGreetingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeDark,
  },
  greetingSub: {
    fontSize: 11,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_400Regular',
  },
  topActionBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 8,
    gap: 4,
  },
  langText: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.templeBrown,
  },
  logoutBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroPilgrimCard: {
    backgroundColor: KumbhColors.primary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  primePill: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  primePillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
  },
  liveCrowdIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
  },
  pulseGreen: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4ADE80',
  },
  liveCrowdText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
  },
  heroTitle: {
    fontSize: 17,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  heroDesc: {
    fontSize: 12,
    color: '#FED7AA',
    fontFamily: 'Poppins_400Regular',
    marginBottom: 12,
  },
  openMapBigBtn: {
    backgroundColor: KumbhColors.primaryDark,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  mapBtnMainText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
  },
  snanStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
    gap: 8,
  },
  snanTextBox: {
    flex: 1,
  },
  snanTitle: {
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.riverBlueDark,
  },
  snanDates: {
    fontSize: 11,
    color: KumbhColors.textSecondary,
    fontFamily: 'Poppins_400Regular',
  },
  sectionHeader: {
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeDark,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
    marginBottom: 14,
  },
  featureCard: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    padding: 12,
    minHeight: 130,
    justifyContent: 'space-between',
  },
  cardIconBox: {
    width: 32,
    height: 32,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  cardTitleText: {
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeDark,
    marginBottom: 2,
  },
  cardDescText: {
    fontSize: 10.5,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 14,
  },
  cardActionRow: {
    marginTop: 6,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  cardActionText: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
  },
  sosBanner: {
    backgroundColor: KumbhColors.danger,
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sosLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  sosTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
  },
  sosSub: {
    color: '#FECACA',
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
  },
});

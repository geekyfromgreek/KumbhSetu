import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useApp } from '@/context/AppContext';
import { RegistrationScreen } from '@/components/RegistrationScreen';
import { HomeTab } from '@/components/tabs/HomeTab';
import { MarketplaceTab } from '@/components/tabs/MarketplaceTab';
import { FareGuideTab } from '@/components/tabs/FareGuideTab';
import { ComplaintsAndSafetyTab } from '@/components/tabs/ComplaintsAndSafetyTab';
import { KumbhBottomNav } from '@/components/KumbhBottomNav';
import { LanguageSelectorModal } from '@/components/LanguageSelectorModal';
import { PilgrimMapModal } from '@/components/PilgrimMapModal';
import { KumbhColors } from '@/constants/colors';

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function AppEntry() {
  const { user, isLoading, activeTab } = useApp();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingSun}>
          <FontAwesome5 name="gopuram" size={32} color={KumbhColors.primaryDark} />
        </View>
        <ActivityIndicator size="large" color={KumbhColors.primary} style={{ marginTop: 16 }} />
        <Text style={styles.loadingText}>KumbhSetu Loading...</Text>
      </View>
    );
  }

  // If user is not yet registered, display the minimal 3-field onboarding registration
  if (!user || !user.isRegistered) {
    return (
      <View style={styles.mainContainer}>
        <RegistrationScreen />
        <LanguageSelectorModal />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.tabContentContainer}>
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'market' && <MarketplaceTab />}
        {activeTab === 'fare' && <FareGuideTab />}
        {activeTab === 'help' && <ComplaintsAndSafetyTab />}
      </View>

      {/* Persistent Bottom Navigation Bar */}
      <KumbhBottomNav />

      {/* Global Modals */}
      <LanguageSelectorModal />
      <PilgrimMapModal />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: KumbhColors.background,
  },
  tabContentContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: KumbhColors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingSun: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: KumbhColors.secondarySoft,
    borderWidth: 2,
    borderColor: KumbhColors.secondaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '700',
    color: KumbhColors.templeBrown,
  },
});

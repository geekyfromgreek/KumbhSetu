import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useMerchant } from '@/context/MerchantContext';
import { MerchantRegisterScreen } from '@/components/MerchantRegisterScreen';
import { MerchantHeader } from '@/components/MerchantHeader';
import { MerchantBottomNav } from '@/components/MerchantBottomNav';
import { CatalogManagementTab } from '@/components/tabs/CatalogManagementTab';
import { ShopProfileTab } from '@/components/tabs/ShopProfileTab';
import { PilgrimViewPreviewTab } from '@/components/tabs/PilgrimViewPreviewTab';
import { InquiryDeskTab } from '@/components/tabs/InquiryDeskTab';
import { BazaarColors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function MerchantPortalApp() {
  const { isRegistered, isLoading, activeTab } = useMerchant();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingIconBox}>
          <Ionicons name="storefront" size={32} color={BazaarColors.saffron} />
        </View>
        <ActivityIndicator size="large" color={BazaarColors.saffron} style={{ marginTop: 16 }} />
        <Text style={styles.loadingText}>Loading Local Bazaar Portal...</Text>
      </View>
    );
  }

  // If merchant has not registered their stall yet, display registration form
  if (!isRegistered) {
    return (
      <View style={styles.mainContainer}>
        <MerchantRegisterScreen />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      {/* Top Merchant Store Header */}
      <MerchantHeader />

      {/* Main Tab View Area */}
      <View style={styles.tabContentArea}>
        {activeTab === 'catalog' && <CatalogManagementTab />}
        {activeTab === 'profile' && <ShopProfileTab />}
        {activeTab === 'preview' && <PilgrimViewPreviewTab />}
        {activeTab === 'inquiries' && <InquiryDeskTab />}
      </View>

      {/* Persistent Bottom Navigation Dock */}
      <MerchantBottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: BazaarColors.background,
  },
  tabContentArea: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: BazaarColors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIconBox: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: BazaarColors.saffronSoft,
    borderWidth: 1,
    borderColor: BazaarColors.saffronBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: BazaarColors.templeBrown,
  },
});

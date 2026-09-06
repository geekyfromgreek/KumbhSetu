import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BazaarColors } from '@/constants/colors';
import { useMerchant } from '@/context/MerchantContext';

export const MerchantHeader: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { profile, toggleShopOpenStatus } = useMerchant();

  if (!profile) return null;

  return (
    <View style={[styles.headerContainer, { paddingTop: Math.max(insets.top + 8, 16) }]}>
      <View style={styles.topRow}>
        <View style={styles.storeInfoCol}>
          <View style={styles.titleRow}>
            <Text style={styles.businessTitle} numberOfLines={1}>
              {profile.businessName}
            </Text>
            {profile.foodLicense?.hasLicense && (
              <View style={styles.fssaiBadge}>
                <Ionicons name="shield-checkmark" size={10} color={BazaarColors.success} />
                <Text style={styles.fssaiBadgeText}>FSSAI Registered</Text>
              </View>
            )}
          </View>
          <Text style={styles.subInfoText}>
            {profile.ownerName} • {profile.address}
          </Text>
        </View>

        {/* Live Stall Availability Toggle */}
        <TouchableOpacity
          style={[
            styles.statusToggleBtn,
            profile.isOpenNow ? styles.statusOpen : styles.statusClosed,
          ]}
          onPress={toggleShopOpenStatus}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.statusDot,
              { backgroundColor: profile.isOpenNow ? BazaarColors.success : BazaarColors.danger },
            ]}
          />
          <Text
            style={[
              styles.statusToggleText,
              { color: profile.isOpenNow ? BazaarColors.success : BazaarColors.danger },
            ]}
          >
            {profile.isOpenNow ? 'Stall Open' : 'Stall Closed'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: BazaarColors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: BazaarColors.cardBorder,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  storeInfoCol: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  businessTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: BazaarColors.templeBrown,
  },
  fssaiBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BazaarColors.successSoft,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: BazaarColors.successBorder,
    gap: 3,
  },
  fssaiBadgeText: {
    fontSize: 9.5,
    fontFamily: 'Poppins_700Bold',
    color: BazaarColors.success,
  },
  subInfoText: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: BazaarColors.textMuted,
    marginTop: 2,
  },
  statusToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
  },
  statusOpen: {
    backgroundColor: BazaarColors.successSoft,
    borderColor: BazaarColors.successBorder,
  },
  statusClosed: {
    backgroundColor: BazaarColors.dangerSoft,
    borderColor: BazaarColors.dangerBorder,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  statusToggleText: {
    fontSize: 11,
    fontFamily: 'Poppins_700Bold',
  },
});

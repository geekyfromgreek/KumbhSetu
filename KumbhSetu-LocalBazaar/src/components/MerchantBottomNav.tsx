import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BazaarColors } from '@/constants/colors';
import { useMerchant } from '@/context/MerchantContext';

export const MerchantBottomNav: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { activeTab, setActiveTab, catalogItems, inquiries } = useMerchant();

  const unreadInquiriesCount = inquiries.filter((i) => !i.isRead).length;

  const tabs = [
    {
      id: 'catalog' as const,
      label: 'Catalog',
      icon: 'fast-food' as const,
      badge: catalogItems.length > 0 ? `${catalogItems.length}` : undefined,
    },
    {
      id: 'profile' as const,
      label: 'Stall & FSSAI',
      icon: 'storefront' as const,
    },
    {
      id: 'preview' as const,
      label: 'Pilgrim View',
      icon: 'eye' as const,
    },
    {
      id: 'inquiries' as const,
      label: 'Inquiries',
      icon: 'chatbubble-ellipses' as const,
      badge: unreadInquiriesCount > 0 ? `${unreadInquiriesCount}` : undefined,
    },
  ];

  return (
    <View style={[styles.navContainer, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      <View style={styles.navInner}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tabBtn, isActive && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.8}
            >
              <View style={styles.iconBox}>
                <Ionicons
                  name={tab.icon}
                  size={20}
                  color={isActive ? BazaarColors.saffron : BazaarColors.textMuted}
                />
                {tab.badge ? (
                  <View style={styles.badgePill}>
                    <Text style={styles.badgeText}>{tab.badge}</Text>
                  </View>
                ) : null}
              </View>

              <Text style={[styles.tabLabel, isActive && styles.tabLabelActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: BazaarColors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: BazaarColors.cardBorder,
    paddingTop: 8,
    paddingHorizontal: 8,
  },
  navInner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxWidth: 600,
    alignSelf: 'center',
    width: '100%',
  },
  tabBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    flex: 1,
    minHeight: 48,
  },
  tabBtnActive: {
    backgroundColor: BazaarColors.saffronSoft,
  },
  iconBox: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  badgePill: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: BazaarColors.saffron,
    borderRadius: 8,
    paddingHorizontal: 4,
    minWidth: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: BazaarColors.white,
    fontSize: 8.5,
    fontFamily: 'Poppins_700Bold',
  },
  tabLabel: {
    fontSize: 10.5,
    fontFamily: 'Poppins_500Medium',
    color: BazaarColors.textMuted,
  },
  tabLabelActive: {
    color: BazaarColors.saffronDark,
    fontFamily: 'Poppins_700Bold',
  },
});

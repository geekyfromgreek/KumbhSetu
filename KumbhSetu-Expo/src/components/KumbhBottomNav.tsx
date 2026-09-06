import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useApp } from '@/context/AppContext';
import { KumbhColors } from '@/constants/colors';

export const KumbhBottomNav: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { activeTab, setActiveTab, t } = useApp();

  const tabs = [
    {
      id: 'home' as const,
      label: t.tabHome,
      iconType: 'ion',
      iconName: 'home',
      activeColor: KumbhColors.primary,
    },
    {
      id: 'market' as const,
      label: t.tabMarket,
      iconType: 'mat',
      iconName: 'storefront',
      activeColor: KumbhColors.secondary,
    },
    {
      id: 'fare' as const,
      label: t.tabFare,
      iconType: 'mc',
      iconName: 'rickshaw',
      activeColor: KumbhColors.riverBlue,
    },
    {
      id: 'help' as const,
      label: t.tabHelp,
      iconType: 'ion',
      iconName: 'shield',
      activeColor: KumbhColors.danger,
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
              style={[
                styles.tabButton,
                isActive && { backgroundColor: tab.activeColor + '10' },
              ]}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.75}>
              
              <View style={styles.iconWrapper}>
                {tab.iconType === 'ion' && (
                  <Ionicons
                    name={tab.iconName as any}
                    size={20}
                    color={isActive ? tab.activeColor : '#64748B'}
                  />
                )}
                {tab.iconType === 'mat' && (
                  <MaterialIcons
                    name={tab.iconName as any}
                    size={20}
                    color={isActive ? tab.activeColor : '#64748B'}
                  />
                )}
                {tab.iconType === 'mc' && (
                  <MaterialCommunityIcons
                    name={tab.iconName as any}
                    size={20}
                    color={isActive ? tab.activeColor : '#64748B'}
                  />
                )}
              </View>

              <Text
                style={[
                  styles.tabLabel,
                  isActive && { color: tab.activeColor, fontFamily: 'Poppins_700Bold' },
                ]}
                numberOfLines={1}>
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
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
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
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 10,
    flex: 1,
    minHeight: 48,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
  tabLabel: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    color: '#64748B',
  },
});

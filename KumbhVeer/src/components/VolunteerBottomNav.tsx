import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { VeerColors } from '@/constants/colors';
import { useVolunteer } from '@/context/VolunteerContext';

export const VolunteerBottomNav: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { activeTab, setActiveTab, incidents, factChecks, t } = useVolunteer();

  const pendingIncidentsCount = incidents.filter(
    (i) => i.status === 'PENDING_VERIFICATION' || i.status === 'EN_ROUTE'
  ).length;

  const unverifiedFactChecksCount = factChecks.filter(
    (f) => f.status === 'UNVERIFIED'
  ).length;

  const tabs = [
    {
      id: 'alerts' as const,
      label: t.tabAlerts,
      icon: 'alert-circle' as const,
      badge: pendingIncidentsCount > 0 ? `${pendingIncidentsCount}` : undefined,
    },
    {
      id: 'factcheck' as const,
      label: t.tabFactCheck,
      icon: 'newspaper' as const,
      badge: unverifiedFactChecksCount > 0 ? `${unverifiedFactChecksCount}` : undefined,
    },
    {
      id: 'resolved' as const,
      label: t.tabResolved,
      icon: 'checkmark-done-circle' as const,
    },
    {
      id: 'profile' as const,
      label: t.tabProfile,
      icon: 'person' as const,
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
                  color={isActive ? VeerColors.saffron : VeerColors.textMuted}
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
    backgroundColor: VeerColors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: VeerColors.cardBorder,
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
    backgroundColor: VeerColors.saffronSoft,
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
    backgroundColor: VeerColors.saffron,
    borderRadius: 8,
    paddingHorizontal: 4,
    minWidth: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: VeerColors.white,
    fontSize: 8.5,
    fontFamily: 'Poppins_700Bold',
  },
  tabLabel: {
    fontSize: 10.5,
    fontFamily: 'Poppins_500Medium',
    color: VeerColors.textMuted,
  },
  tabLabelActive: {
    color: VeerColors.saffronDark,
    fontFamily: 'Poppins_700Bold',
  },
});

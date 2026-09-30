import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useAdmin } from '@/context/AdminContext';
import { AdminColors } from '@/constants/colors';

export const AdminBottomNav: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { activeTab, setActiveTab, stats, currentUser } = useAdmin();

  const isPoliceOfficer = currentUser?.officerId === 'Police123' || currentUser?.role === 'POLICE_CONTROL_ROOM';

  const navItems: Array<{
    id: 'dashboard' | 'police' | 'tariffs' | 'bazaar' | 'factcheck' | 'grievances';
    label: string;
    icon: string;
    badgeCount?: number;
    highlight?: boolean;
  }> = isPoliceOfficer
    ? [
        { id: 'police', label: 'Police Radar', icon: 'shield-alt', badgeCount: stats.escalatedPoliceCount, highlight: true },
        { id: 'grievances', label: 'Enforcement', icon: 'gavel' },
        { id: 'dashboard', label: 'Overview', icon: 'chart-bar' },
        { id: 'factcheck', label: 'Fact-Check', icon: 'check-double' },
        { id: 'tariffs', label: 'Tariffs', icon: 'route' },
      ]
    : [
        { id: 'dashboard', label: 'Overview', icon: 'chart-bar' },
        { id: 'police', label: 'Police Radar', icon: 'shield-alt', badgeCount: stats.escalatedPoliceCount, highlight: true },
        { id: 'tariffs', label: 'Tariffs', icon: 'route' },
        { id: 'bazaar', label: 'Bazaar', icon: 'store' },
        { id: 'factcheck', label: 'Fact-Check', icon: 'shield-alt' },
        { id: 'grievances', label: 'Enforcement', icon: 'gavel' },
      ];

  return (
    <View style={[styles.navContainer, { paddingBottom: Math.max(insets.bottom, 8) }]}>
      {navItems.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            style={[styles.navItem, isActive && styles.navItemActive]}
            onPress={() => setActiveTab(item.id)}
            activeOpacity={0.75}
          >
            <View style={{ position: 'relative' }}>
              <FontAwesome5
                name={item.icon}
                size={15}
                color={
                  isActive
                    ? item.highlight
                      ? '#3B82F6'
                      : AdminColors.saffron
                    : item.highlight
                    ? '#60A5FA'
                    : AdminColors.textMuted
                }
              />
              {item.badgeCount && item.badgeCount > 0 ? (
                <View style={styles.navBadge}>
                  <Text style={styles.navBadgeText}>{item.badgeCount}</Text>
                </View>
              ) : null}
            </View>
            <Text
              style={[
                styles.navLabel,
                isActive && (item.highlight ? styles.navLabelActivePolice : styles.navLabelActive),
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    backgroundColor: AdminColors.cardBackground,
    borderTopWidth: 1,
    borderTopColor: AdminColors.cardBorder,
    paddingTop: 8,
    paddingHorizontal: 6,
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 2,
  },
  navItem: {
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  navItemActive: {
    backgroundColor: AdminColors.primarySoft,
  },
  navLabel: {
    fontSize: 10,
    fontFamily: 'Poppins_500Medium',
    color: AdminColors.textMuted,
    marginTop: 3,
  },
  navLabelActive: {
    color: AdminColors.saffron,
    fontFamily: 'Poppins_700Bold',
  },
  navLabelActivePolice: {
    color: '#3B82F6',
    fontFamily: 'Poppins_700Bold',
  },
  navBadge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  navBadgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontFamily: 'Poppins_700Bold',
  },
});

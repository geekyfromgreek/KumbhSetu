import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useAdmin } from '@/context/AdminContext';
import { AdminColors } from '@/constants/colors';

export const AdminBottomNav: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { activeTab, setActiveTab } = useAdmin();

  const navItems: Array<{
    id: 'dashboard' | 'tariffs' | 'bazaar' | 'factcheck' | 'grievances';
    label: string;
    icon: string;
  }> = [
    { id: 'dashboard', label: 'Overview', icon: 'chart-bar' },
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
            <FontAwesome5
              name={item.icon}
              size={15}
              color={isActive ? AdminColors.saffron : AdminColors.textMuted}
            />
            <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
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
});

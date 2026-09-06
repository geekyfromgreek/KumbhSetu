import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useVolunteer } from '@/context/VolunteerContext';
import { VolunteerRegisterScreen } from '@/components/VolunteerRegisterScreen';
import { VolunteerHeader } from '@/components/VolunteerHeader';
import { VolunteerBottomNav } from '@/components/VolunteerBottomNav';
import { IncidentAlertsTab } from '@/components/tabs/IncidentAlertsTab';
import { GroundFactCheckTab } from '@/components/tabs/GroundFactCheckTab';
import { CompletedTasksTab } from '@/components/tabs/CompletedTasksTab';
import { VolunteerProfileTab } from '@/components/tabs/VolunteerProfileTab';
import { VeerColors } from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function KumbhVeerApp() {
  const { isRegistered, isLoading, activeTab, language } = useVolunteer();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingIconBox}>
          <Ionicons name="shield" size={32} color={VeerColors.saffron} />
        </View>
        <ActivityIndicator size="large" color={VeerColors.saffron} style={{ marginTop: 16 }} />
        <Text style={styles.loadingText}>
          {language === 'mr' ? 'कुंभवीर लोड होत आहे...' : 'Loading KumbhVeer Portal...'}
        </Text>
      </View>
    );
  }

  // If volunteer is not registered yet, display registration screen
  if (!isRegistered) {
    return (
      <View style={styles.mainContainer}>
        <VolunteerRegisterScreen />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      {/* Top Volunteer Header */}
      <VolunteerHeader />

      {/* Main Tab Area */}
      <View style={styles.tabContentArea}>
        {activeTab === 'alerts' && <IncidentAlertsTab />}
        {activeTab === 'factcheck' && <GroundFactCheckTab />}
        {activeTab === 'resolved' && <CompletedTasksTab />}
        {activeTab === 'profile' && <VolunteerProfileTab />}
      </View>

      {/* Bottom Nav Dock */}
      <VolunteerBottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: VeerColors.background,
  },
  tabContentArea: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: VeerColors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIconBox: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: VeerColors.saffronSoft,
    borderWidth: 1,
    borderColor: VeerColors.saffronBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: VeerColors.templeBrown,
  },
});

import React from 'react';
import { View, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { AdminColors } from '@/constants/colors';
import { useAdmin } from '@/context/AdminContext';
import { AdminHeader } from '@/components/AdminHeader';
import { AdminBottomNav } from '@/components/AdminBottomNav';
import { AdminLoginScreen } from '@/components/AdminLoginScreen';
import { DashboardOverviewTab } from '@/components/tabs/DashboardOverviewTab';
import { TariffManagementTab } from '@/components/tabs/TariffManagementTab';
import { BazaarManagementTab } from '@/components/tabs/BazaarManagementTab';
import { FactCheckDispatchTab } from '@/components/tabs/FactCheckDispatchTab';
import { GrievanceEnforcementTab } from '@/components/tabs/GrievanceEnforcementTab';

export default function AdminMainScreen() {
  const { activeTab, isAuthenticated, isLoading } = useAdmin();

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={AdminColors.saffron} />
      </SafeAreaView>
    );
  }

  // If not logged in, enforce the Admin Login Gate
  if (!isAuthenticated) {
    return <AdminLoginScreen />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverviewTab />;
      case 'tariffs':
        return <TariffManagementTab />;
      case 'bazaar':
        return <BazaarManagementTab />;
      case 'factcheck':
        return <FactCheckDispatchTab />;
      case 'grievances':
        return <GrievanceEnforcementTab />;
      default:
        return <DashboardOverviewTab />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AdminHeader />
        <View style={styles.body}>{renderActiveTab()}</View>
        <AdminBottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: AdminColors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: AdminColors.cardBackground,
  },
  container: {
    flex: 1,
    backgroundColor: AdminColors.background,
  },
  body: {
    flex: 1,
  },
});

/**
 * N1 — Nashikkar Overview Dashboard
 * Civic Trust Score, Price Monitoring, Bookings Queue & Police Escalation Access
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchCategories, fetchReports } from '../../utils/api';

export default function NashikkarDashboard() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const role = (params.role as string) || 'vendor';

  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    activeListings: 5441,
    pendingFlags: 7,
    todayBookings: 18,
    trustScore: 98.4,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const reports = await fetchReports();
      if (reports) {
        setStats((prev) => ({
          ...prev,
          pendingFlags: reports.length || 7,
        }));
      }
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Jai Parashuram / Ram Ram 🙏</Text>
            <Text style={styles.userName}>Nashik Civic Trust Hub</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleBadgeText}>
                {role === 'committee'
                  ? '🏛️ Municipal Committee'
                  : role === 'volunteer'
                  ? '🛡️ Civic Volunteer'
                  : '🏪 Verified Local Vendor'}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => router.replace('/')}
          >
            <Ionicons name="log-out-outline" size={20} color="#8D6E63" />
          </TouchableOpacity>
        </View>

        {/* Civic Trust Score Banner */}
        <View style={styles.trustBanner}>
          <View style={{ flex: 1 }}>
            <Text style={styles.trustLabel}>Kumbh Civic Trust Index</Text>
            <Text style={styles.trustScore}>{stats.trustScore}%</Text>
            <Text style={styles.trustDesc}>
              Fair pricing compliance across Panchavati, Ramkund & City Zone
            </Text>
          </View>
          <View style={styles.badgeShield}>
            <Ionicons name="shield-checkmark" size={32} color="#2E7D32" />
            <Text style={styles.badgeShieldText}>Green Tier</Text>
          </View>
        </View>

        {/* Metric Cards */}
        <View style={styles.metricGrid}>
          <View style={styles.metricCard}>
            <View style={[styles.metricIcon, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="storefront" size={20} color="#1565C0" />
            </View>
            <Text style={styles.metricValue}>{stats.activeListings}</Text>
            <Text style={styles.metricLabel}>Seeded Vendors</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={[styles.metricIcon, { backgroundColor: '#FFEBEE' }]}>
              <Ionicons name="flag" size={20} color="#C62828" />
            </View>
            <Text style={[styles.metricValue, { color: '#C62828' }]}>{stats.pendingFlags}</Text>
            <Text style={styles.metricLabel}>Price Flags</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={[styles.metricIcon, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="calendar" size={20} color="#2E7D32" />
            </View>
            <Text style={styles.metricValue}>{stats.todayBookings}</Text>
            <Text style={styles.metricLabel}>Daily Bookings</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={[styles.metricIcon, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="checkmark-done-circle" size={20} color="#E65100" />
            </View>
            <Text style={styles.metricValue}>100%</Text>
            <Text style={styles.metricLabel}>Fair Rates Pledge</Text>
          </View>
        </View>

        {/* Key Action Tiles */}
        <Text style={styles.sectionHeading}>Actions & Management</Text>

        <View style={styles.actionsList}>
          {/* Action 1: Review Flags & Escalate */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/nashikkar/flags')}
            activeOpacity={0.85}
          >
            <View style={[styles.actionIconBox, { backgroundColor: '#FFEBEE' }]}>
              <Ionicons name="alert-circle" size={26} color="#C62828" />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={styles.actionTitle}>Price Flags & Overcharging</Text>
                <View style={styles.urgentBadge}>
                  <Text style={styles.urgentBadgeText}>{stats.pendingFlags} New</Text>
                </View>
              </View>
              <Text style={styles.actionDesc}>
                Review yatri rate reports, issue warnings, or 1-tap escalate to Nashik Police.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A1887F" />
          </TouchableOpacity>

          {/* Action 2: Fair Pricing Pledge */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/nashikkar/pledge')}
            activeOpacity={0.85}
          >
            <View style={[styles.actionIconBox, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="ribbon" size={26} color="#2E7D32" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.actionTitle}>Fair Pricing Pledge & Badge</Text>
              <Text style={styles.actionDesc}>
                Sign the Kumbh 2027 Civic Charter to receive the Verified Green Seal.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A1887F" />
          </TouchableOpacity>

          {/* Action 3: Manage Listings */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/nashikkar/listings')}
            activeOpacity={0.85}
          >
            <View style={[styles.actionIconBox, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="create-outline" size={26} color="#E65100" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.actionTitle}>Marketplace & Reference Rates</Text>
              <Text style={styles.actionDesc}>
                Update tariff cards, auto fixed fares, thali rates, and guide fees.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A1887F" />
          </TouchableOpacity>

          {/* Action 4: Bookings Queue */}
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/nashikkar/bookings')}
            activeOpacity={0.85}
          >
            <View style={[styles.actionIconBox, { backgroundColor: '#EDE7F6' }]}>
              <Ionicons name="ticket-outline" size={26} color="#5E35B1" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.actionTitle}>Pilgrim Bookings Queue</Text>
              <Text style={styles.actionDesc}>
                Accept incoming yatri requests for darshan, hotel rooms, and guided tours.
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#A1887F" />
          </TouchableOpacity>
        </View>

        {/* Live Kumbh Updates */}
        <View style={styles.updateCard}>
          <View style={styles.updateHeader}>
            <Ionicons name="notifications" size={18} color="#B44D12" />
            <Text style={styles.updateTitle}>Nashik Administration Notice</Text>
          </View>
          <Text style={styles.updateBody}>
            Shahi Snan dates notified for Trimbakeshwar & Ramkund. All registered auto-rickshaws must
            display QR fare charts provided by Kumbh Setu.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF8F0' },
  container: { flex: 1, paddingHorizontal: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 16,
  },
  greeting: { fontSize: 13, color: '#8D6E63', fontWeight: '600' },
  userName: { fontSize: 20, fontWeight: '800', color: '#5B1A0E', marginTop: 2 },
  roleBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFE8D6',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginTop: 4,
  },
  roleBadgeText: { fontSize: 11, fontWeight: '700', color: '#B44D12' },
  logoutBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EED9C4',
  },

  trustBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#C8E6C9',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  trustLabel: { fontSize: 12, fontWeight: '700', color: '#689F38', textTransform: 'uppercase' },
  trustScore: { fontSize: 32, fontWeight: '900', color: '#2E7D32', marginVertical: 2 },
  trustDesc: { fontSize: 12, color: '#558B2F', lineHeight: 16 },
  badgeShield: {
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#A5D6A7',
    marginLeft: 10,
  },
  badgeShieldText: { fontSize: 10, fontWeight: '800', color: '#1B5E20', marginTop: 4 },

  metricGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  metricCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F0DEC9',
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricValue: { fontSize: 20, fontWeight: '800', color: '#3E2723' },
  metricLabel: { fontSize: 11, color: '#8D6E63', marginTop: 2, fontWeight: '500' },

  sectionHeading: { fontSize: 16, fontWeight: '800', color: '#5B1A0E', marginBottom: 12 },

  actionsList: { gap: 12, marginBottom: 20 },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F0DEC9',
    gap: 12,
  },
  actionIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionTitle: { fontSize: 14, fontWeight: '700', color: '#3E2723' },
  actionDesc: { fontSize: 12, color: '#795548', marginTop: 2, lineHeight: 16 },
  urgentBadge: {
    backgroundColor: '#FFCDD2',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  urgentBadgeText: { fontSize: 10, fontWeight: '800', color: '#C62828' },

  updateCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FFE082',
    marginBottom: 40,
  },
  updateHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  updateTitle: { fontSize: 13, fontWeight: '700', color: '#B44D12' },
  updateBody: { fontSize: 12, color: '#6D4C41', lineHeight: 17 },
});

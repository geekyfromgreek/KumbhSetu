/**
 * N6 — Nashikkar Volunteer Oversight & Field Coordination
 * Coordinate on-ground price audits, verify statutory ₹40 Thali displays, and approve karma points.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NashikkarVolunteers() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'ghats' | 'panchavati' | 'cbs'>('all');

  const [audits, setAudits] = useState([
    {
      id: 'AUD-104',
      stall: 'Godavari Satvik Bhojanalaya',
      sector: 'Ramkund Ghat',
      type: '₹40 Thali Rate Board',
      volunteer: 'Rahul Deshmukh (KTHM NCC)',
      status: 'verified',
      time: '14:15 Today',
      points: '+50 pts',
    },
    {
      id: 'AUD-105',
      stall: 'CBS Auto Rickshaw Pre-Paid Queue',
      sector: 'CBS Central Bus Stand',
      type: 'RTO Tariff Meter Board',
      volunteer: 'Pooja Shinde (Sandip Univ)',
      status: 'in_progress',
      time: '15:20 Today',
      points: 'Pending',
    },
    {
      id: 'AUD-106',
      stall: 'Shri Ram Puja Bhandar',
      sector: 'Tapovan Ghat',
      type: 'Samagri Price Ceiling',
      volunteer: 'Amit Patil (KKWIEER)',
      status: 'scheduled',
      time: '16:00 Today',
      points: 'Pending',
    },
  ]);

  const handleDispatchAudit = () => {
    Alert.alert(
      'Dispatch Price Audit',
      'Select audit task to dispatch to nearest on-duty Kumbhveer squad:',
      [
        {
          text: '₹40 Satvik Thali Check',
          onPress: () => {
            Alert.alert('Task Dispatched', 'Field audit task sent to Ramkund Sector Squad A.');
          },
        },
        {
          text: 'RTO Auto Tariff Check',
          onPress: () => {
            Alert.alert('Task Dispatched', 'Field audit task sent to CBS Stand Squad B.');
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color="#1B1B20" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerSubtitle}>Nashikkar Civic Portal</Text>
          <Text style={styles.headerTitle}>Volunteer Oversight & Audits</Text>
        </View>
        <TouchableOpacity
          style={styles.dispatchBtn}
          onPress={handleDispatchAudit}
          activeOpacity={0.85}
        >
          <Ionicons name="add-circle" size={18} color="#FFFFFF" />
          <Text style={styles.dispatchBtnText}>Assign</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Civic Alert Banner */}
        <View style={styles.alertBanner}>
          <Ionicons name="shield-checkmark" size={20} color="#059669" />
          <Text style={styles.alertText}>
            42 Active Kumbhveers conducting on-ground price audits across 4 Kumbh sectors.
          </Text>
        </View>

        {/* Stats Row */}
        <View style={styles.metricsRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricVal}>42</Text>
            <Text style={styles.metricLbl}>Active Volunteers</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricVal}>18</Text>
            <Text style={styles.metricLbl}>Audits Today</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={[styles.metricVal, { color: '#059669' }]}>98.4%</Text>
            <Text style={styles.metricLbl}>Compliance Rate</Text>
          </View>
        </View>

        {/* Sector Tabs */}
        <View style={styles.tabBar}>
          {(['all', 'ghats', 'panchavati', 'cbs'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, activeTab === tab && styles.tabItemActive]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab === 'all'
                  ? 'All Sectors'
                  : tab === 'ghats'
                  ? 'Ghats'
                  : tab === 'panchavati'
                  ? 'Panchavati'
                  : 'CBS Stand'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Audits List */}
        <Text style={styles.sectionTitle}>Recent Field Audits</Text>

        <View style={styles.auditsList}>
          {audits.map((item) => (
            <View key={item.id} style={styles.auditCard}>
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <View style={styles.badgeRow}>
                    <View style={styles.typeBadge}>
                      <Text style={styles.typeBadgeText}>{item.type}</Text>
                    </View>
                    <Text style={styles.sectorText}>{item.sector}</Text>
                  </View>
                  <Text style={styles.stallTitle}>{item.stall}</Text>
                </View>

                {item.status === 'verified' ? (
                  <View style={[styles.statusBadge, { backgroundColor: '#E8F5E9' }]}>
                    <Ionicons name="checkmark-circle" size={14} color="#2E7D32" />
                    <Text style={[styles.statusBadgeText, { color: '#2E7D32' }]}>Verified</Text>
                  </View>
                ) : item.status === 'in_progress' ? (
                  <View style={[styles.statusBadge, { backgroundColor: '#FFF3E0' }]}>
                    <Ionicons name="time" size={14} color="#E65100" />
                    <Text style={[styles.statusBadgeText, { color: '#E65100' }]}>In Progress</Text>
                  </View>
                ) : (
                  <View style={[styles.statusBadge, { backgroundColor: '#E3F2FD' }]}>
                    <Ionicons name="calendar" size={14} color="#1565C0" />
                    <Text style={[styles.statusBadgeText, { color: '#1565C0' }]}>Scheduled</Text>
                  </View>
                )}
              </View>

              <View style={styles.cardMeta}>
                <Text style={styles.metaText}>
                  Auditor: <Text style={styles.metaBold}>{item.volunteer}</Text>
                </Text>
                <Text style={styles.metaText}>
                  Time: <Text style={styles.metaBold}>{item.time}</Text>
                </Text>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.footerReward}>
                  Reward: <Text style={{ color: '#059669', fontWeight: 'bold' }}>{item.points}</Text>
                </Text>
                <Text style={styles.footerDocket}>#{item.id}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Link to Student Portal */}
        <TouchableOpacity
          style={styles.studentPortalLink}
          onPress={() => router.push('/kumbhveer/portal')}
          activeOpacity={0.8}
        >
          <Ionicons name="school" size={20} color="#059669" />
          <View style={{ flex: 1 }}>
            <Text style={styles.studentPortalTitle}>Kumbhveer Student Portal</Text>
            <Text style={styles.studentPortalDesc}>Open student field verification & points ledger</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#059669" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF8F0' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E6D8',
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5EBE1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSubtitle: { fontSize: 11, color: '#9E4041', fontWeight: '700', textTransform: 'uppercase' },
  headerTitle: { fontSize: 16, color: '#1B1B20', fontWeight: 'bold' },
  dispatchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#059669',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  dispatchBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 14 },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
  },
  alertText: { fontSize: 12, color: '#065F46', flex: 1, fontWeight: '500' },
  metricsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F0E6D8',
    alignItems: 'center',
  },
  metricVal: { fontSize: 20, fontWeight: 'bold', color: '#1B1B20' },
  metricLbl: { fontSize: 10, color: '#7D6E66', marginTop: 2, textAlign: 'center' },
  tabBar: { flexDirection: 'row', gap: 6, marginBottom: 14 },
  tabItem: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: '#F5EBE1',
  },
  tabItemActive: { backgroundColor: '#A03B00' },
  tabText: { fontSize: 12, color: '#584239', fontWeight: '600' },
  tabTextActive: { color: '#FFFFFF' },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#1B1B20', marginBottom: 10 },
  auditsList: { gap: 10, marginBottom: 20 },
  auditCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F0E6D8',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  typeBadge: { backgroundColor: '#ECFDF5', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  typeBadgeText: { fontSize: 10, color: '#059669', fontWeight: '700' },
  sectorText: { fontSize: 11, color: '#7D6E66' },
  stallTitle: { fontSize: 14, fontWeight: 'bold', color: '#1B1B20' },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: { fontSize: 11, fontWeight: '700' },
  cardMeta: {
    backgroundColor: '#FBF8FF',
    borderRadius: 8,
    padding: 8,
    gap: 3,
    marginBottom: 8,
  },
  metaText: { fontSize: 11, color: '#584239' },
  metaBold: { fontWeight: '600', color: '#1B1B20' },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 6, borderTopWidth: 1, borderTopColor: '#F0E6D8' },
  footerReward: { fontSize: 11, color: '#7D6E66' },
  footerDocket: { fontSize: 10, color: '#A1887F' },
  studentPortalLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 12,
    padding: 14,
    marginBottom: 30,
  },
  studentPortalTitle: { fontSize: 13, fontWeight: 'bold', color: '#065F46' },
  studentPortalDesc: { fontSize: 11, color: '#047857' },
});

/**
 * P1 — Police Escalations Live Feed
 * High-priority incident feed received from Pilgrims & Nashikkar Vigilance Committee
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getEscalations, getPoliceDashboardStats } from '../utils/api';

export interface PoliceCase {
  id: string;
  category: string;
  title: string;
  target_name: string;
  offense_type: string;
  location: string;
  reported_at: string;
  severity: 'critical' | 'high' | 'medium';
  status: 'active' | 'investigating' | 'dispatched' | 'resolved';
  reference_price?: number;
  charged_price?: number;
  pilgrim_phone?: string;
  evidence_summary: string;
  assigned_officer?: string;
}

const mockEscalations: PoliceCase[] = [
  {
    id: 'ESC-2027-01',
    category: 'Lodging Extortion',
    title: 'Illegal Room Rent Surge & Cash Demand',
    target_name: 'Shree Krishna Lodge & Dormitory, Ramkund',
    offense_type: 'Violation of NMC Kumbh Price Order 2027',
    location: 'Ramkund Ghat Road, Panchavati',
    reported_at: '6 mins ago',
    severity: 'critical',
    status: 'active',
    reference_price: 800,
    charged_price: 3500,
    pilgrim_phone: '+91 98211 44552',
    evidence_summary: 'Pilgrim was denied pre-booked room without ₹3,500 cash payment. Over 4x statutory cap.',
  },
  {
    id: 'ESC-2027-02',
    category: 'Fake Guide / Touting',
    title: 'Unregistered Impersonator Charging for Free Ghat Entry',
    target_name: 'Individual: Suresh (Fake ID Tag)',
    offense_type: 'Impersonation & Extortion at Sacred Ghat',
    location: 'Kapaleshwar Mandir Stairway',
    reported_at: '18 mins ago',
    severity: 'critical',
    status: 'dispatched',
    reference_price: 0,
    charged_price: 2100,
    pilgrim_phone: '+91 94033 12988',
    evidence_summary: 'Target claimed VIP gate passes cost ₹2,100. Ghat security alerted.',
    assigned_officer: 'Constable S. Shinde (Unit 4)',
  },
  {
    id: 'ESC-2027-03',
    category: 'Transport cartel',
    title: 'Overcharging Shared Auto Stand',
    target_name: 'Auto Group MH-15-EK-4821',
    offense_type: 'Refusing Meter & 4x Fixed Passenger Tariff',
    location: 'CBS Bus Stand Circle',
    reported_at: '32 mins ago',
    severity: 'high',
    status: 'active',
    reference_price: 120,
    charged_price: 500,
    pilgrim_phone: '+91 97655 89012',
    evidence_summary: 'Refusing ₹120 standard route fare; forcing ₹500/seat for Trimbakeshwar.',
  },
  {
    id: 'ESC-2027-04',
    category: 'Food Safety & Pricing',
    title: 'Mahaprasad Rate Gouging',
    target_name: 'Anand Bhojanalaya',
    offense_type: 'Charging ₹280 instead of ₹120 reference ceiling',
    location: 'Sita Gumpha Marg',
    reported_at: '1 hour ago',
    severity: 'medium',
    status: 'investigating',
    reference_price: 120,
    charged_price: 280,
    evidence_summary: 'Civic committee flagged billing slip proof.',
    assigned_officer: 'ASI More',
  },
];

export default function EscalationsFeed() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const stationName = (params.station as string) || 'Ramkund Ghat Kumbh Chowki';
  const badge = (params.badgeNo as string) || 'MH-NSK-408';

  const [cases, setCases] = useState<PoliceCase[]>(mockEscalations);
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'critical' | 'high'>('all');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await getEscalations();
      if (data && data.length > 0) {
        // merge live backend escalations if available
      }
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const handleQuickDispatch = (caseItem: PoliceCase) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === caseItem.id
          ? {
              ...c,
              status: 'dispatched',
              assigned_officer: `Dispatched Unit: Beat 2 (${badge})`,
            }
          : c
      )
    );
    Alert.alert(
      '🚨 Patrol Officer Dispatched',
      `Nearest beat constable routed to ${caseItem.location}.\nETA: 4-6 minutes. Vendor summons issued.`,
      [{ text: 'Acknowledged' }]
    );
  };

  const filtered = cases.filter((c) => {
    if (filterSeverity === 'all') return true;
    return c.severity === filterSeverity;
  });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <View style={{ flex: 1 }}>
          <View style={styles.badgeRow}>
            <View style={styles.livePulse} />
            <Text style={styles.stationName} numberOfLines={1}>{stationName}</Text>
          </View>
          <Text style={styles.officerId}>Officer: {badge} · ON DUTY</Text>
        </View>

        <TouchableOpacity
          style={styles.logOutBtn}
          onPress={() => router.replace('/')}
        >
          <Ionicons name="power" size={18} color="#FF6B6B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3A86FF" />}
      >
        {/* Metric Bar */}
        <View style={styles.metricRow}>
          <View style={[styles.metricItem, { borderLeftColor: '#EF233C' }]}>
            <Text style={styles.metricVal}>{cases.filter((c) => c.severity === 'critical').length}</Text>
            <Text style={styles.metricLabel}>Critical Alarms</Text>
          </View>
          <View style={[styles.metricItem, { borderLeftColor: '#3A86FF' }]}>
            <Text style={styles.metricVal}>{cases.filter((c) => c.status === 'dispatched').length}</Text>
            <Text style={styles.metricLabel}>Units Dispatched</Text>
          </View>
          <View style={[styles.metricItem, { borderLeftColor: '#00F5D4' }]}>
            <Text style={styles.metricVal}>23</Text>
            <Text style={styles.metricLabel}>Resolved Today</Text>
          </View>
        </View>

        {/* Filter Pills */}
        <View style={styles.filterRow}>
          {(
            [
              { id: 'all', label: 'All Incidents' },
              { id: 'critical', label: '🔴 Critical' },
              { id: 'high', label: '🟠 High Priority' },
            ] as const
          ).map((f) => (
            <TouchableOpacity
              key={f.id}
              style={[styles.pill, filterSeverity === f.id && styles.pillActive]}
              onPress={() => setFilterSeverity(f.id)}
            >
              <Text style={[styles.pillText, filterSeverity === f.id && styles.pillTextActive]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Case Cards List */}
        <View style={{ gap: 14, paddingBottom: 50 }}>
          {filtered.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.caseCard,
                item.severity === 'critical' && styles.cardCritical,
              ]}
              onPress={() =>
                router.push({
                  pathname: '/case',
                  params: {
                    id: item.id,
                    title: item.title,
                    target: item.target_name,
                    offense: item.offense_type,
                    location: item.location,
                    reportedAt: item.reported_at,
                    severity: item.severity,
                    status: item.status,
                    refPrice: item.reference_price,
                    chargedPrice: item.charged_price,
                    pilgrimPhone: item.pilgrim_phone,
                    evidence: item.evidence_summary,
                    assigned: item.assigned_officer,
                  },
                })
              }
              activeOpacity={0.88}
            >
              <View style={styles.cardHeader}>
                <View style={styles.caseIdBadge}>
                  <Text style={styles.caseIdText}>{item.id}</Text>
                </View>
                <View
                  style={[
                    styles.severityBadge,
                    {
                      backgroundColor:
                        item.severity === 'critical'
                          ? '#EF233C'
                          : item.severity === 'high'
                          ? '#F77F00'
                          : '#FCBF49',
                    },
                  ]}
                >
                  <Text style={styles.severityText}>{item.severity.toUpperCase()}</Text>
                </View>
                <Text style={styles.timeElapsed}>{item.reported_at}</Text>
              </View>

              <Text style={styles.caseTitle}>{item.title}</Text>
              <Text style={styles.targetName}>Accused: {item.target_name}</Text>

              {/* Price Delta Highlights */}
              {item.reference_price !== undefined && item.charged_price !== undefined && (
                <View style={styles.priceStrip}>
                  <Text style={styles.priceStripLabel}>Mandated Ceiling: ₹{item.reference_price}</Text>
                  <Text style={styles.priceStripCharged}>Extorted: ₹{item.charged_price}</Text>
                </View>
              )}

              <View style={styles.locationRow}>
                <Ionicons name="location-sharp" size={14} color="#3A86FF" />
                <Text style={styles.locationText} numberOfLines={1}>{item.location}</Text>
              </View>

              <Text style={styles.evidenceSnippet} numberOfLines={2}>
                "{item.evidence_summary}"
              </Text>

              {/* Status and Action Buttons */}
              <View style={styles.cardActions}>
                <View style={styles.statusIndicator}>
                  <Ionicons
                    name={item.status === 'dispatched' ? 'radio' : 'alert-circle'}
                    size={14}
                    color={item.status === 'dispatched' ? '#00F5D4' : '#FFD166'}
                  />
                  <Text style={styles.statusLabelText}>
                    {item.status === 'dispatched'
                      ? item.assigned_officer || 'Unit En-Route'
                      : 'Pending Dispatch'}
                  </Text>
                </View>

                {item.status !== 'dispatched' && (
                  <TouchableOpacity
                    style={styles.quickDispatchBtn}
                    onPress={() => handleQuickDispatch(item)}
                  >
                    <Ionicons name="flash" size={14} color="#FFF" />
                    <Text style={styles.dispatchBtnText}>Quick Dispatch</Text>
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Police Terminal Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItemActive}>
          <Ionicons name="radio" size={20} color="#3A86FF" />
          <Text style={styles.navTextActive}>Escalations</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push('/logs')}
        >
          <Ionicons name="document-text-outline" size={20} color="#6C7A89" />
          <Text style={styles.navText}>Case Logs</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0B132B' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1C2541',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(58, 134, 255, 0.2)',
  },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  livePulse: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF233C' },
  stationName: { fontSize: 14, fontWeight: '800', color: '#FFFFFF' },
  officerId: { fontSize: 11, color: '#A0AEC0', marginTop: 1, fontWeight: '600' },
  logOutBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#0B132B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D3748',
  },

  container: { flex: 1, paddingHorizontal: 14, paddingTop: 12 },

  metricRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  metricItem: {
    flex: 1,
    backgroundColor: '#1C2541',
    borderRadius: 10,
    padding: 10,
    borderLeftWidth: 3,
  },
  metricVal: { fontSize: 18, fontWeight: '900', color: '#FFFFFF' },
  metricLabel: { fontSize: 10, color: '#A0AEC0', marginTop: 2, fontWeight: '600' },

  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  pill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#1C2541',
    borderWidth: 1,
    borderColor: '#2D3748',
  },
  pillActive: { backgroundColor: '#3A86FF', borderColor: '#3A86FF' },
  pillText: { fontSize: 12, fontWeight: '600', color: '#A0AEC0' },
  pillTextActive: { color: '#FFFFFF', fontWeight: '800' },

  caseCard: {
    backgroundColor: '#1C2541',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#2D3748',
  },
  cardCritical: { borderColor: '#EF233C', backgroundColor: '#181E34' },

  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  caseIdBadge: {
    backgroundColor: '#0B132B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#2D3748',
  },
  caseIdText: { fontSize: 10, fontWeight: '800', color: '#3A86FF' },
  severityBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  severityText: { fontSize: 9, fontWeight: '900', color: '#FFF' },
  timeElapsed: { fontSize: 11, color: '#718096', marginLeft: 'auto' },

  caseTitle: { fontSize: 15, fontWeight: '800', color: '#FFFFFF', marginTop: 4 },
  targetName: { fontSize: 13, fontWeight: '700', color: '#FFD166', marginTop: 2 },

  priceStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#0B132B',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#2D3748',
  },
  priceStripLabel: { fontSize: 11, color: '#00F5D4', fontWeight: '700' },
  priceStripCharged: { fontSize: 11, color: '#EF233C', fontWeight: '800' },

  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 },
  locationText: { fontSize: 12, color: '#A0AEC0' },

  evidenceSnippet: { fontSize: 12, color: '#CBD5E0', fontStyle: 'italic', marginTop: 6, lineHeight: 16 },

  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#2D3748',
  },
  statusIndicator: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusLabelText: { fontSize: 11, color: '#E2E8F0', fontWeight: '600' },

  quickDispatchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EF233C',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  dispatchBtnText: { fontSize: 11, fontWeight: '800', color: '#FFFFFF' },

  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#1C2541',
    borderTopWidth: 1,
    borderTopColor: '#2D3748',
    paddingVertical: 10,
  },
  navItemActive: { flex: 1, alignItems: 'center', gap: 2 },
  navTextActive: { fontSize: 11, fontWeight: '800', color: '#3A86FF' },
  navItem: { flex: 1, alignItems: 'center', gap: 2 },
  navText: { fontSize: 11, color: '#6C7A89', fontWeight: '600' },
});

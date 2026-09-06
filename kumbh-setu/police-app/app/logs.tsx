/**
 * P3 — Police Case Log & Resolution Archive
 * Permanent audit trail of all actions, fines levied, and permits revoked.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface LogEntry {
  id: string;
  target_name: string;
  offense: string;
  action_taken: string;
  penalty?: string;
  resolved_at: string;
  officer: string;
  status: 'penalized' | 'warned' | 'dismissed';
}

const initialLogs: LogEntry[] = [
  {
    id: 'ESC-2027-009',
    target_name: 'Hotel Godavari Inn',
    offense: 'Charging ₹4,000 for standard room (Ceiling ₹1,500)',
    action_taken: 'Spot audit conducted. Compound fine levied and refund issued to yatri on the spot.',
    penalty: '₹10,000 Fine + 48hr Green Seal Suspension',
    resolved_at: '2 hours ago',
    officer: 'Insp. P. Deshmukh',
    status: 'penalized',
  },
  {
    id: 'ESC-2027-008',
    target_name: 'Auto Driver R. Kadam (MH-15-TC-1102)',
    offense: 'Refused fare meter to Panchavati Ghat',
    action_taken: 'Chowki verbal warning issued and meter calibration verified.',
    penalty: 'Official Strike Recorded',
    resolved_at: '4 hours ago',
    officer: 'ASI More',
    status: 'warned',
  },
  {
    id: 'ESC-2027-007',
    target_name: 'Shree Sai Mahaprasad Stall',
    offense: 'Packaged drinking water sold at ₹30 (Ceiling ₹20)',
    action_taken: 'Excess stock seized and mandated MRP price chart pasted on counter.',
    penalty: '₹2,500 Compound Penalty',
    resolved_at: 'Yesterday',
    officer: 'Constable S. Shinde',
    status: 'penalized',
  },
  {
    id: 'ESC-2027-006',
    target_name: 'Local Darshan Guide Raju',
    offense: 'Allegation of unauthorized fee for free temple entry',
    action_taken: 'Investigated. Temple gate was open to all; guide clarified charges were for private vehicle parking assistance.',
    action_taken_desc: 'Case dismissed after complainant verified agreement.',
    resolved_at: 'Yesterday',
    officer: 'Insp. S. Patil',
    status: 'dismissed',
  } as any,
];

export default function PoliceCaseLog() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [logs] = useState<LogEntry[]>(initialLogs);

  const filtered = logs.filter(
    (l) =>
      l.target_name.toLowerCase().includes(search.toLowerCase()) ||
      l.id.toLowerCase().includes(search.toLowerCase()) ||
      l.offense.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>Case Action Log</Text>
          <Text style={styles.headerSub}>Enforcement & Prosecution History</Text>
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#6C7A89" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by Case ID, vendor, or offense..."
            placeholderTextColor="#4A5568"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Audit Stats Banner */}
        <View style={styles.statsBanner}>
          <View style={styles.statItem}>
            <Text style={styles.statNum}>₹12,500</Text>
            <Text style={styles.statLabel}>Fines Levied (24h)</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>4</Text>
            <Text style={styles.statLabel}>Seals Suspended</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNum}>100%</Text>
            <Text style={styles.statLabel}>Action Rate</Text>
          </View>
        </View>

        {/* Logs List */}
        <View style={{ gap: 12, paddingBottom: 40 }}>
          {filtered.map((item) => (
            <View key={item.id} style={styles.logCard}>
              <View style={styles.cardTop}>
                <View style={styles.idBadge}>
                  <Text style={styles.idText}>{item.id}</Text>
                </View>
                <View
                  style={[
                    styles.statusPill,
                    {
                      backgroundColor:
                        item.status === 'penalized'
                          ? '#EF233C'
                          : item.status === 'warned'
                          ? '#F77F00'
                          : '#4A5568',
                    },
                  ]}
                >
                  <Text style={styles.statusPillText}>{item.status.toUpperCase()}</Text>
                </View>
                <Text style={styles.resolvedTime}>{item.resolved_at}</Text>
              </View>

              <Text style={styles.targetName}>{item.target_name}</Text>
              <Text style={styles.offenseText}>{item.offense}</Text>

              <View style={styles.actionBox}>
                <Text style={styles.actionHeading}>Enforcement Summary:</Text>
                <Text style={styles.actionText}>{item.action_taken}</Text>
                {item.penalty && (
                  <Text style={styles.penaltyText}>Order: {item.penalty}</Text>
                )}
              </View>

              <View style={styles.footerRow}>
                <Ionicons name="person-circle-outline" size={14} color="#6C7A89" />
                <Text style={styles.officerText}>Investigating Officer: {item.officer}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0B132B' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
    backgroundColor: '#1C2541',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(58, 134, 255, 0.2)',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: '#0B132B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D3748',
  },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#FFFFFF' },
  headerSub: { fontSize: 11, color: '#A0AEC0', marginTop: 1 },

  container: { flex: 1, paddingHorizontal: 16, paddingTop: 14 },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C2541',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 44,
    gap: 8,
    borderWidth: 1,
    borderColor: '#2D3748',
    marginBottom: 14,
  },
  searchInput: { flex: 1, color: '#FFFFFF', fontSize: 13 },

  statsBanner: {
    flexDirection: 'row',
    backgroundColor: '#1C2541',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(58, 134, 255, 0.2)',
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 16, fontWeight: '900', color: '#00F5D4' },
  statLabel: { fontSize: 10, color: '#A0AEC0', marginTop: 2, fontWeight: '600' },
  statDivider: { width: 1, backgroundColor: '#2D3748' },

  logCard: {
    backgroundColor: '#1C2541',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#2D3748',
  },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  idBadge: {
    backgroundColor: '#0B132B',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  idText: { fontSize: 10, fontWeight: '800', color: '#3A86FF' },
  statusPill: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  statusPillText: { fontSize: 9, fontWeight: '900', color: '#FFF' },
  resolvedTime: { fontSize: 11, color: '#718096', marginLeft: 'auto' },

  targetName: { fontSize: 15, fontWeight: '800', color: '#FFFFFF' },
  offenseText: { fontSize: 12, color: '#EF233C', marginTop: 2, fontWeight: '600' },

  actionBox: {
    backgroundColor: '#0B132B',
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#2D3748',
  },
  actionHeading: { fontSize: 10, fontWeight: '800', color: '#3A86FF', letterSpacing: 0.5, marginBottom: 4 },
  actionText: { fontSize: 12, color: '#CBD5E0', lineHeight: 16 },
  penaltyText: { fontSize: 12, fontWeight: '800', color: '#00F5D4', marginTop: 6 },

  footerRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10 },
  officerText: { fontSize: 11, color: '#718096', fontWeight: '500' },
});

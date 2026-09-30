/**
 * KV1 — Kumbhveer Student Volunteer Field Portal
 * Task queue, on-site rate board inspections, photo uploads, and Karma Points ledger.
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

export default function KumbhveerPortal() {
  const router = useRouter();
  const [karmaPoints, setKarmaPoints] = useState(350);
  const [completedAudits, setCompletedAudits] = useState(7);

  const [tasks, setTasks] = useState([
    {
      id: 'TASK-01',
      title: 'Audit ₹40 Satvik Thali Rate Board',
      target: 'Stall #104 (Godavari Bhojanalaya)',
      sector: 'Ramkund West Ghat',
      reward: '+50 Pts',
      status: 'pending',
    },
    {
      id: 'TASK-02',
      title: 'Verify RTO Auto Tariff Display',
      target: 'CBS Central Auto Stand (Bay 3)',
      sector: 'CBS Bus Stand',
      reward: '+40 Pts',
      status: 'pending',
    },
    {
      id: 'TASK-03',
      title: 'Puja Samagri Rate Board Ceiling',
      target: 'Shri Ram Puja Bhandar (Stall #312)',
      sector: 'Tapovan Ghat',
      reward: '+30 Pts',
      status: 'pending',
    },
  ]);

  const handleAuditAction = (taskId: string) => {
    Alert.alert(
      'Perform On-Ground Audit',
      'Select audit result following physical inspection of rate board:',
      [
        {
          text: '✓ Board Verified (Statutory Price Compliant)',
          onPress: () => {
            setKarmaPoints((prev) => prev + 50);
            setCompletedAudits((prev) => prev + 1);
            setTasks((prev) => prev.filter((t) => t.id !== taskId));
            Alert.alert('Audit Submitted!', 'Inspection verified. +50 Karma Points credited to your ledger!');
          },
        },
        {
          text: '⚠️ Violation Detected (Overcharging)',
          onPress: () => {
            setKarmaPoints((prev) => prev + 50);
            setCompletedAudits((prev) => prev + 1);
            setTasks((prev) => prev.filter((t) => t.id !== taskId));
            Alert.alert('Flag Logged', 'Violation recorded with GPS tag and forwarded to Nashikkar Desk.');
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={styles.headerSubtitle}>Kumbhveer Field Desk</Text>
            <View style={styles.onlineBadge}>
              <View style={styles.onlineDot} />
              <Text style={styles.onlineText}>On Duty</Text>
            </View>
          </View>
          <Text style={styles.headerTitle}>Rahul Deshmukh (KTHM)</Text>
        </View>
        <TouchableOpacity
          style={styles.exitBtn}
          onPress={() => router.replace('/')}
          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={20} color="#065F46" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Karma Ledger Card */}
        <View style={styles.karmaCard}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View>
              <Text style={styles.karmaLabel}>Volunteer Karma Points</Text>
              <Text style={styles.karmaPoints}>{karmaPoints}</Text>
            </View>
            <View style={styles.tierBadge}>
              <Ionicons name="ribbon" size={16} color="#065F46" />
              <Text style={styles.tierText}>Silver Cadet</Text>
            </View>
          </View>

          <View style={styles.karmaMetaRow}>
            <Text style={styles.karmaMeta}>Audits Completed: <Text style={{ fontWeight: 'bold' }}>{completedAudits}</Text></Text>
            <Text style={styles.karmaMeta}>Rank: <Text style={{ fontWeight: 'bold' }}>#14 in Sector</Text></Text>
          </View>
        </View>

        {/* Assigned Field Tasks */}
        <Text style={styles.sectionTitle}>Assigned Field Audits ({tasks.length})</Text>

        <View style={styles.tasksList}>
          {tasks.map((task) => (
            <View key={task.id} style={styles.taskCard}>
              <View style={styles.taskHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.taskTitle}>{task.title}</Text>
                  <Text style={styles.taskTarget}>{task.target}</Text>
                </View>
                <View style={styles.rewardBadge}>
                  <Text style={styles.rewardText}>{task.reward}</Text>
                </View>
              </View>

              <View style={styles.taskSectorRow}>
                <Ionicons name="location-outline" size={14} color="#047857" />
                <Text style={styles.taskSector}>{task.sector}</Text>
              </View>

              <TouchableOpacity
                style={styles.inspectBtn}
                onPress={() => handleAuditAction(task.id)}
                activeOpacity={0.85}
              >
                <Ionicons name="camera" size={16} color="#FFFFFF" />
                <Text style={styles.inspectBtnText}>Inspect & Verify Rate Board</Text>
              </TouchableOpacity>
            </View>
          ))}

          {tasks.length === 0 && (
            <View style={styles.emptyCard}>
              <Ionicons name="checkmark-done-circle" size={40} color="#059669" />
              <Text style={styles.emptyTitle}>All Assigned Audits Completed!</Text>
              <Text style={styles.emptySub}>Great service to the pilgrims. Stand by for new sector tasks.</Text>
            </View>
          )}
        </View>

        {/* Civic Hotline */}
        <View style={styles.sosCard}>
          <Ionicons name="call" size={20} color="#B91C1C" />
          <View style={{ flex: 1 }}>
            <Text style={styles.sosTitle}>Police Outpost Coordinator</Text>
            <Text style={styles.sosSub}>Immediate escalation hotline: 112 / Sector Outpost</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F0FDF4' },
  container: { flex: 1, padding: 16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DCFCE7',
    backgroundColor: '#FFFFFF',
  },
  headerSubtitle: { fontSize: 11, color: '#047857', fontWeight: 'bold', textTransform: 'uppercase' },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#065F46', marginTop: 1 },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#059669' },
  onlineText: { fontSize: 10, fontWeight: '700', color: '#065F46' },
  exitBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  karmaCard: {
    backgroundColor: '#065F46',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  karmaLabel: { fontSize: 12, color: '#A7F3D0', fontWeight: '600' },
  karmaPoints: { fontSize: 32, fontWeight: '800', color: '#FFFFFF', marginTop: 2 },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tierText: { fontSize: 11, fontWeight: 'bold', color: '#065F46' },
  karmaMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#047857',
  },
  karmaMeta: { fontSize: 11, color: '#D1FAE5' },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#065F46', marginBottom: 12 },
  tasksList: { gap: 12, marginBottom: 20 },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  taskHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
  taskTitle: { fontSize: 14, fontWeight: 'bold', color: '#1F2937' },
  taskTarget: { fontSize: 12, color: '#4B5563', marginTop: 2 },
  rewardBadge: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  rewardText: { fontSize: 11, fontWeight: 'bold', color: '#059669' },
  taskSectorRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 12 },
  taskSector: { fontSize: 11, color: '#047857', fontWeight: '500' },
  inspectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#059669',
    borderRadius: 8,
    paddingVertical: 10,
  },
  inspectBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DCFCE7',
  },
  emptyTitle: { fontSize: 14, fontWeight: 'bold', color: '#065F46', marginTop: 8 },
  emptySub: { fontSize: 11, color: '#6B7280', textAlign: 'center', marginTop: 4 },
  sosCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 30,
  },
  sosTitle: { fontSize: 12, fontWeight: 'bold', color: '#991B1B' },
  sosSub: { fontSize: 11, color: '#B91C1C' },
});

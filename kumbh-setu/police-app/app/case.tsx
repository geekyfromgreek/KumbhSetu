/**
 * P2 — Police Case Detail & Enforcement Action
 * Detailed investigation dossier with one-tap statutory police actions:
 * Dispatch Patrol, Summon to Chowki, Impose Compound Fine, Revoke Green Seal
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  Linking,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PoliceCaseDetail() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const caseId = (params.id as string) || 'ESC-2027-01';
  const title = (params.title as string) || 'Extortion & Pricing Violation';
  const target = (params.target as string) || 'Shree Krishna Lodge & Dormitory';
  const offense = (params.offense as string) || 'Violation of NMC Kumbh Price Order 2027';
  const location = (params.location as string) || 'Ramkund Ghat Road, Panchavati';
  const refPrice = params.refPrice ? `₹${params.refPrice}` : '₹800';
  const chargedPrice = params.chargedPrice ? `₹${params.chargedPrice}` : '₹3,500';
  const pilgrimPhone = (params.pilgrimPhone as string) || '+91 98211 44552';
  const evidence =
    (params.evidence as string) ||
    'Pilgrim was denied pre-booked room without ₹3,500 cash payment. Over 4x statutory cap.';
  const severity = (params.severity as string) || 'critical';

  const [status, setStatus] = useState<string>((params.status as string) || 'active');
  const [officerNotes, setOfficerNotes] = useState('');
  const [fineAmount, setFineAmount] = useState('5000');

  const handleCallPilgrim = () => {
    Linking.openURL(`tel:${pilgrimPhone.replace(/\s+/g, '')}`);
  };

  const handleOpenMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location + ' Nashik')}`;
    Linking.openURL(url);
  };

  const handleDispatch = () => {
    setStatus('dispatched');
    Alert.alert(
      '🚓 Patrol Unit Dispatched',
      `Unit Alpha-3 dispatched to ${target} at ${location}.\nExpected arrival: 3 minutes.`,
      [{ text: 'OK' }]
    );
  };

  const handleSummon = () => {
    setStatus('summoned');
    Alert.alert(
      '📜 Statutory Summons Issued',
      `Legal notice sent to ${target}. Manager instructed to appear at Chowki within 45 minutes with billing ledger.`,
      [{ text: 'OK' }]
    );
  };

  const handleLevyFine = () => {
    setStatus('resolved');
    Alert.alert(
      '⚖️ Spot Compound Fine Levied',
      `Penal sum of ₹${fineAmount} recorded against ${target}.\nVendor Kumbh Setu Green Seal revoked permanently for 2027 festival.\nCase moved to Resolved Archive.`,
      [
        {
          text: 'Return to Feed',
          onPress: () => router.replace('/escalations'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerCaseId}>{caseId}</Text>
            <Text style={styles.headerTitle}>Investigation Dossier</Text>
          </View>
          <View
            style={[
              styles.severityTag,
              { backgroundColor: severity === 'critical' ? '#EF233C' : '#F77F00' },
            ]}
          >
            <Text style={styles.severityTagText}>{severity.toUpperCase()}</Text>
          </View>
        </View>

        {/* Status Strip */}
        <View style={styles.statusStrip}>
          <Ionicons
            name={status === 'resolved' ? 'checkmark-done-circle' : 'radio'}
            size={18}
            color={status === 'resolved' ? '#00F5D4' : '#FFD166'}
          />
          <Text style={styles.statusStripText}>
            CURRENT STAGE: {status.toUpperCase()}
          </Text>
        </View>

        {/* Accused Target Card */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>ACCUSED ENTITY</Text>
          <Text style={styles.targetTitle}>{target}</Text>
          <Text style={styles.offenseText}>{offense}</Text>

          <TouchableOpacity style={styles.locationBox} onPress={handleOpenMap}>
            <Ionicons name="location" size={16} color="#3A86FF" />
            <Text style={styles.locationText}>{location}</Text>
            <Ionicons name="open-outline" size={14} color="#6C7A89" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        </View>

        {/* Price Violation Matrix */}
        <View style={styles.priceMatrixCard}>
          <Text style={styles.cardLabel}>STATUTORY CEILING VS CHARGED VIOLATION</Text>
          <View style={styles.priceRow}>
            <View style={styles.priceItem}>
              <Text style={styles.priceSub}>Govt Reference Ceiling</Text>
              <Text style={styles.priceGreen}>{refPrice}</Text>
            </View>
            <Ionicons name="alert-circle" size={24} color="#EF233C" />
            <View style={styles.priceItem}>
              <Text style={styles.priceSub}>Extorted Rate</Text>
              <Text style={styles.priceRed}>{chargedPrice}</Text>
            </View>
          </View>
        </View>

        {/* Complainant Pilgrim & Evidence */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>COMPLAINANT / WITNESS EVIDENCE</Text>
          <Text style={styles.evidenceText}>"{evidence}"</Text>

          <View style={styles.pilgrimRow}>
            <View>
              <Text style={styles.pilgrimLabel}>Complainant Yatri</Text>
              <Text style={styles.pilgrimPhone}>{pilgrimPhone}</Text>
            </View>
            <TouchableOpacity style={styles.callPilgrimBtn} onPress={handleCallPilgrim}>
              <Ionicons name="call" size={14} color="#FFF" />
              <Text style={styles.callPilgrimText}>Contact Yatri</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Police Enforcement Actions */}
        <View style={styles.actionSection}>
          <Text style={styles.sectionHeading}>STATUTORY ENFORCEMENT ACTIONS</Text>

          {/* Action 1: Dispatch */}
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: '#1C2541', borderColor: '#3A86FF' }]}
            onPress={handleDispatch}
          >
            <Ionicons name="car-sport" size={22} color="#3A86FF" />
            <View style={{ flex: 1 }}>
              <Text style={styles.actionBtnTitle}>Dispatch Spot Patrol Unit</Text>
              <Text style={styles.actionBtnSub}>Route Beat Constable with GPS tracker</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#6C7A89" />
          </TouchableOpacity>

          {/* Action 2: Summons */}
          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: '#1C2541', borderColor: '#FFD166' }]}
            onPress={handleSummon}
          >
            <Ionicons name="mail-unread" size={22} color="#FFD166" />
            <View style={{ flex: 1 }}>
              <Text style={styles.actionBtnTitle}>Issue Formal Notice to Chowki</Text>
              <Text style={styles.actionBtnSub}>Summon proprietor with business registration</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#6C7A89" />
          </TouchableOpacity>

          {/* Action 3: Fine */}
          <View style={styles.fineBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <Ionicons name="receipt" size={18} color="#EF233C" />
              <Text style={styles.fineTitle}>Levy Spot Compound Fine & Revoke Seal</Text>
            </View>

            <View style={styles.fineInputRow}>
              <Text style={styles.rupeeSymbol}>₹</Text>
              <TextInput
                style={styles.fineInput}
                keyboardType="numeric"
                value={fineAmount}
                onChangeText={setFineAmount}
              />
              <TouchableOpacity style={styles.fineBtn} onPress={handleLevyFine}>
                <Ionicons name="shield-checkmark" size={16} color="#FFF" />
                <Text style={styles.fineBtnText}>Execute Penalty</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0B132B' },
  container: { flex: 1, paddingHorizontal: 16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 12,
    paddingBottom: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#1C2541',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D3748',
  },
  headerCaseId: { fontSize: 11, fontWeight: '800', color: '#3A86FF', letterSpacing: 1 },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#FFFFFF' },
  severityTag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  severityTagText: { fontSize: 10, fontWeight: '900', color: '#FFF' },

  statusStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1C2541',
    padding: 10,
    borderRadius: 8,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#2D3748',
  },
  statusStripText: { fontSize: 11, fontWeight: '800', color: '#E2E8F0', letterSpacing: 1 },

  card: {
    backgroundColor: '#1C2541',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2D3748',
    marginBottom: 14,
  },
  cardLabel: { fontSize: 10, fontWeight: '800', color: '#718096', letterSpacing: 1, marginBottom: 8 },
  targetTitle: { fontSize: 16, fontWeight: '800', color: '#FFFFFF' },
  offenseText: { fontSize: 12, color: '#EF233C', fontWeight: '700', marginTop: 4 },

  locationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0B132B',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: '#2D3748',
  },
  locationText: { fontSize: 12, color: '#CBD5E0', flex: 1 },

  priceMatrixCard: {
    backgroundColor: '#141E34',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EF233C',
    marginBottom: 14,
  },
  priceRow: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 8 },
  priceItem: { alignItems: 'center' },
  priceSub: { fontSize: 11, color: '#A0AEC0', fontWeight: '600' },
  priceGreen: { fontSize: 20, fontWeight: '900', color: '#00F5D4', marginTop: 2 },
  priceRed: { fontSize: 22, fontWeight: '900', color: '#EF233C', marginTop: 2 },

  evidenceText: { fontSize: 13, color: '#E2E8F0', fontStyle: 'italic', lineHeight: 18, marginBottom: 12 },
  pilgrimRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#2D3748',
  },
  pilgrimLabel: { fontSize: 10, color: '#718096', textTransform: 'uppercase' },
  pilgrimPhone: { fontSize: 13, fontWeight: '700', color: '#FFFFFF', marginTop: 2 },
  callPilgrimBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#3A86FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  callPilgrimText: { fontSize: 12, fontWeight: '700', color: '#FFF' },

  actionSection: { marginTop: 4, marginBottom: 40 },
  sectionHeading: { fontSize: 11, fontWeight: '800', color: '#3A86FF', letterSpacing: 1.5, marginBottom: 12 },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    gap: 12,
    marginBottom: 10,
  },
  actionBtnTitle: { fontSize: 13, fontWeight: '800', color: '#FFFFFF' },
  actionBtnSub: { fontSize: 11, color: '#A0AEC0', marginTop: 2 },

  fineBox: {
    backgroundColor: '#1C2541',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#EF233C',
    marginTop: 6,
  },
  fineTitle: { fontSize: 13, fontWeight: '800', color: '#EF233C' },
  fineInputRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  rupeeSymbol: { fontSize: 18, fontWeight: '900', color: '#FFFFFF' },
  fineInput: {
    flex: 1,
    height: 44,
    backgroundColor: '#0B132B',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2D3748',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    paddingHorizontal: 10,
  },
  fineBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EF233C',
    borderRadius: 8,
    height: 44,
    paddingHorizontal: 16,
  },
  fineBtnText: { color: '#FFF', fontSize: 13, fontWeight: '800' },
});

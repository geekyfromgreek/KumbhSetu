/**
 * P0 — Police Terminal Duty Login
 * Secure Duty Station Login for Kumbh Mela 2027 Police Vigilance Units
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const STATIONS = [
  'Panchavati Central Police Station',
  'Ramkund Ghat Kumbh Chowki',
  'Trimbakeshwar Sector Command',
  'CBS Bus Stand Outpost',
  'Nashik Road Railway Station Unit',
];

export default function PoliceLogin() {
  const router = useRouter();
  const [badgeNo, setBadgeNo] = useState('MH-NSK-408');
  const [pin, setPin] = useState('9999');
  const [station, setStation] = useState(STATIONS[0]);
  const [showStationPicker, setShowStationPicker] = useState(false);

  const handleLogin = (demoStation?: string) => {
    router.replace({
      pathname: '/escalations',
      params: {
        badgeNo,
        station: demoStation || station,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          {/* Official Emblem & Header */}
          <View style={styles.header}>
            <View style={styles.shieldIconBox}>
              <Ionicons name="shield" size={42} color="#3A86FF" />
            </View>
            <Text style={styles.subEmblem}>MAHARASHTRA POLICE · NASHIK COMMISSIONERATE</Text>
            <Text style={styles.title}>Kumbh Police Terminal</Text>
            <Text style={styles.subtitle}>कुंभमेळा पोलीस दक्षता व तक्रार निवारण प्रणाली</Text>
          </View>

          {/* Secure Login Card */}
          <View style={styles.card}>
            <Text style={styles.sectionHeader}>OFFICER DUTY LOG-IN</Text>

            {/* Station Selector */}
            <Text style={styles.label}>Assigned Outpost / Sector</Text>
            <TouchableOpacity
              style={styles.dropdownBtn}
              onPress={() => setShowStationPicker(!showStationPicker)}
            >
              <Ionicons name="location" size={18} color="#3A86FF" />
              <Text style={styles.dropdownText} numberOfLines={1}>
                {station}
              </Text>
              <Ionicons
                name={showStationPicker ? 'chevron-up' : 'chevron-down'}
                size={18}
                color="#6C7A89"
              />
            </TouchableOpacity>

            {showStationPicker && (
              <View style={styles.dropdownMenu}>
                {STATIONS.map((s) => (
                  <TouchableOpacity
                    key={s}
                    style={[styles.menuItem, station === s && styles.menuItemActive]}
                    onPress={() => {
                      setStation(s);
                      setShowStationPicker(false);
                    }}
                  >
                    <Text style={[styles.menuText, station === s && styles.menuTextActive]}>
                      {s}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Badge Number */}
            <Text style={styles.label}>Police Badge / ID Number</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="card-outline" size={18} color="#6C7A89" />
              <TextInput
                style={styles.input}
                value={badgeNo}
                onChangeText={setBadgeNo}
                placeholder="e.g. MH-NSK-408"
                placeholderTextColor="#4A5568"
              />
            </View>

            {/* Duty PIN */}
            <Text style={styles.label}>Security Duty PIN (Demo: 9999)</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={18} color="#6C7A89" />
              <TextInput
                style={styles.input}
                value={pin}
                onChangeText={setPin}
                secureTextEntry
                placeholder="4-digit PIN"
                placeholderTextColor="#4A5568"
                keyboardType="numeric"
                maxLength={4}
              />
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={() => handleLogin()}
              activeOpacity={0.85}
            >
              <Ionicons name="log-in-outline" size={20} color="#FFF" />
              <Text style={styles.loginBtnText}>Access Police Terminal</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Demo Access for Evaluators */}
          <View style={styles.demoBox}>
            <View style={styles.demoHeader}>
              <Ionicons name="flash" size={16} color="#3A86FF" />
              <Text style={styles.demoTitle}>Direct Station Demo Access</Text>
            </View>
            <Text style={styles.demoSubtitle}>1-Click fast switch between duty sectors:</Text>

            <View style={styles.demoList}>
              <TouchableOpacity
                style={styles.demoBtn}
                onPress={() => handleLogin(STATIONS[1])}
              >
                <Ionicons name="water" size={16} color="#00F5D4" />
                <Text style={styles.demoBtnText}>Ramkund Ghat Sector (Live Alerts)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.demoBtn}
                onPress={() => handleLogin(STATIONS[0])}
              >
                <Ionicons name="business" size={16} color="#3A86FF" />
                <Text style={styles.demoBtnText}>Panchavati Central Police Control</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0B132B' },
  container: { paddingHorizontal: 20, paddingBottom: 40 },
  header: { alignItems: 'center', marginTop: 24, marginBottom: 24 },
  shieldIconBox: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#1C2541',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3A86FF',
    marginBottom: 14,
    shadowColor: '#3A86FF',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  subEmblem: { fontSize: 10, fontWeight: '800', color: '#6C7A89', letterSpacing: 1.5, marginBottom: 4 },
  title: { fontSize: 24, fontWeight: '900', color: '#FFFFFF', letterSpacing: 0.5 },
  subtitle: { fontSize: 13, color: '#A0AEC0', marginTop: 4 },

  card: {
    backgroundColor: '#1C2541',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(58, 134, 255, 0.25)',
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#3A86FF',
    letterSpacing: 1.5,
    marginBottom: 16,
  },
  label: { fontSize: 12, fontWeight: '700', color: '#CBD5E0', marginTop: 12, marginBottom: 6 },

  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0B132B',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2D3748',
    paddingHorizontal: 12,
    height: 48,
    gap: 8,
  },
  dropdownText: { flex: 1, fontSize: 13, color: '#FFFFFF', fontWeight: '600' },
  dropdownMenu: {
    backgroundColor: '#0B132B',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3A86FF',
    marginTop: 6,
    overflow: 'hidden',
  },
  menuItem: { paddingVertical: 12, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: '#1A202C' },
  menuItemActive: { backgroundColor: '#1C2541' },
  menuText: { fontSize: 12, color: '#A0AEC0' },
  menuTextActive: { color: '#3A86FF', fontWeight: '700' },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0B132B',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2D3748',
    paddingHorizontal: 12,
    height: 48,
    gap: 8,
  },
  input: { flex: 1, fontSize: 14, color: '#FFFFFF', fontWeight: '600' },

  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#3A86FF',
    borderRadius: 12,
    height: 50,
    marginTop: 22,
    shadowColor: '#3A86FF',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  loginBtnText: { fontSize: 15, fontWeight: '800', color: '#FFFFFF' },

  demoBox: {
    marginTop: 24,
    backgroundColor: '#1C2541',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(58, 134, 255, 0.2)',
  },
  demoHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  demoTitle: { fontSize: 13, fontWeight: '800', color: '#3A86FF' },
  demoSubtitle: { fontSize: 12, color: '#A0AEC0', marginBottom: 10 },
  demoList: { gap: 8 },
  demoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#0B132B',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#2D3748',
  },
  demoBtnText: { fontSize: 12, color: '#E2E8F0', fontWeight: '600' },
});

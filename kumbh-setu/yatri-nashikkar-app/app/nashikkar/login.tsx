/**
 * N0 — Nashikkar Citizen & Vendor Login
 * Role: Local Vendor, Civic Volunteer, Committee Member
 * Features Demo 1-Click Login for effortless testing
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NashikkarLogin() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [role, setRole] = useState<'vendor' | 'volunteer' | 'committee'>('vendor');

  const handleSendOtp = () => {
    if (!phone || phone.length < 10) {
      Alert.alert('Invalid Mobile', 'Please enter a valid 10-digit mobile number.');
      return;
    }
    setOtpSent(true);
    setOtp('1234'); // auto-fill demo OTP
  };

  const handleLogin = (selectedRole?: 'vendor' | 'volunteer' | 'committee') => {
    const finalRole = selectedRole || role;
    router.replace({
      pathname: '/nashikkar/dashboard',
      params: { role: finalRole },
    });
  };

  const handleDemoQuickLogin = (demoRole: 'vendor' | 'volunteer' | 'committee') => {
    setRole(demoRole);
    handleLogin(demoRole);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          {/* Back Header */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#5B1A0E" />
          </TouchableOpacity>

          <View style={styles.header}>
            <View style={styles.logoBadge}>
              <Ionicons name="shield-checkmark" size={36} color="#B44D12" />
            </View>
            <Text style={styles.title}>Nashikkar Portal</Text>
            <Text style={styles.subtitle}>नाशिककर नागरिक व विक्रेता मंच</Text>
            <Text style={styles.desc}>
              Protect civic trust, maintain fair rates, and serve pilgrims during Kumbh 2027.
            </Text>
          </View>

          {/* Role Tabs */}
          <View style={styles.roleTabContainer}>
            {(
              [
                { id: 'vendor', label: 'Local Vendor' },
                { id: 'volunteer', label: 'Civic Volunteer' },
                { id: 'committee', label: 'Committee' },
              ] as const
            ).map((r) => (
              <TouchableOpacity
                key={r.id}
                style={[styles.roleTab, role === r.id && styles.roleTabActive]}
                onPress={() => setRole(r.id)}
              >
                <Text style={[styles.roleTabText, role === r.id && styles.roleTabTextActive]}>
                  {r.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Form */}
          <View style={styles.card}>
            <Text style={styles.label}>Mobile Number</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                style={styles.input}
                placeholder="98765 43210"
                placeholderTextColor="#A1887F"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
                maxLength={10}
              />
            </View>

            {otpSent && (
              <View style={{ marginTop: 14 }}>
                <Text style={styles.label}>Enter 4-digit OTP (Demo: 1234)</Text>
                <TextInput
                  style={[styles.input, styles.otpInput]}
                  placeholder="1234"
                  placeholderTextColor="#A1887F"
                  keyboardType="number-pad"
                  value={otp}
                  onChangeText={setOtp}
                  maxLength={4}
                />
              </View>
            )}

            {!otpSent ? (
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={handleSendOtp}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryBtnText}>Send Verification OTP</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={() => handleLogin()}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryBtnText}>Verify & Enter Dashboard</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* 1-Click Fast Demo Login for Judges / Evaluators */}
          <View style={styles.demoBox}>
            <Text style={styles.demoTitle}>⚡ Quick Demo Access (1-Tap)</Text>
            <Text style={styles.demoSubtitle}>Bypass OTP instantly with pre-seeded demo roles:</Text>

            <View style={styles.demoButtons}>
              <TouchableOpacity
                style={styles.demoBtn}
                onPress={() => handleDemoQuickLogin('vendor')}
              >
                <Ionicons name="storefront" size={16} color="#B44D12" />
                <Text style={styles.demoBtnText}>Nashik Vendor (Hotel & Auto)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.demoBtn}
                onPress={() => handleDemoQuickLogin('volunteer')}
              >
                <Ionicons name="eye" size={16} color="#B44D12" />
                <Text style={styles.demoBtnText}>Civic Trust Volunteer (Flags)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.demoBtn}
                onPress={() => handleDemoQuickLogin('committee')}
              >
                <Ionicons name="business" size={16} color="#B44D12" />
                <Text style={styles.demoBtnText}>Municipal Vigilance Officer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF8F0' },
  container: { paddingHorizontal: 20, paddingBottom: 40 },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EED9C4',
    marginTop: 12,
  },
  header: { alignItems: 'center', marginVertical: 20 },
  logoBadge: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFEAD4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: { fontSize: 24, fontWeight: '800', color: '#5B1A0E' },
  subtitle: { fontSize: 14, fontWeight: '600', color: '#B44D12', marginTop: 2 },
  desc: {
    fontSize: 13,
    color: '#8D6E63',
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: 16,
    lineHeight: 18,
  },

  roleTabContainer: {
    flexDirection: 'row',
    backgroundColor: '#EED9C4',
    borderRadius: 12,
    padding: 3,
    marginBottom: 20,
  },
  roleTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 9,
    alignItems: 'center',
  },
  roleTabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  roleTabText: { fontSize: 12, fontWeight: '600', color: '#795548' },
  roleTabTextActive: { color: '#5B1A0E', fontWeight: '700' },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F0DEC9',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  label: { fontSize: 13, fontWeight: '700', color: '#4E342E', marginBottom: 6 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8F0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EED9C4',
    paddingHorizontal: 12,
  },
  countryCode: { fontSize: 14, fontWeight: '700', color: '#5B1A0E', marginRight: 8 },
  input: {
    flex: 1,
    height: 48,
    fontSize: 15,
    color: '#3E2723',
  },
  otpInput: {
    backgroundColor: '#FFF8F0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EED9C4',
    paddingHorizontal: 14,
    letterSpacing: 4,
    fontSize: 18,
    fontWeight: '700',
  },

  primaryBtn: {
    backgroundColor: '#5B1A0E',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18,
  },
  primaryBtnText: { color: '#FFF', fontSize: 14, fontWeight: '700' },

  demoBox: {
    marginTop: 24,
    padding: 16,
    borderRadius: 14,
    backgroundColor: '#FFF1E0',
    borderWidth: 1,
    borderColor: '#F0D4BE',
  },
  demoTitle: { fontSize: 14, fontWeight: '800', color: '#B44D12' },
  demoSubtitle: { fontSize: 12, color: '#795548', marginVertical: 6 },
  demoButtons: { gap: 8, marginTop: 4 },
  demoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EED9C4',
  },
  demoBtnText: { fontSize: 13, fontWeight: '600', color: '#5B1A0E' },
});

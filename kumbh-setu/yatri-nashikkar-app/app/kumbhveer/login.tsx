/**
 * KV0 — Kumbhveer Student Volunteer Login
 * Dedicated authentication for NCC cadets, NSS volunteers, and college students.
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
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function KumbhveerLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('kumbhveer.kthm@kumbhsetu.in');
  const [password, setPassword] = useState('KumbhSetu@2027');
  const [college, setCollege] = useState('KTHM College NCC Wing');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Required', 'Please enter your volunteer email and password.');
      return;
    }
    router.replace('/kumbhveer/portal');
  };

  const handleBypass = () => {
    router.replace('/kumbhveer/portal');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color="#065F46" />
        </TouchableOpacity>

        {/* Brand Header */}
        <View style={styles.brandBox}>
          <View style={styles.iconCircle}>
            <Ionicons name="school" size={32} color="#059669" />
          </View>
          <Text style={styles.title}>Kumbhveer Portal</Text>
          <Text style={styles.subtitle}>Student Volunteers & NCC Civic Wing</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Simhastha Kumbh 2027 • Nashik</Text>
          </View>
        </View>

        {/* Demo Fast Track */}
        <TouchableOpacity
          style={styles.fastLaunchCard}
          onPress={handleBypass}
          activeOpacity={0.85}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
            <Ionicons name="flash" size={22} color="#059669" />
            <View>
              <Text style={styles.fastLaunchTitle}>Direct Volunteer Demo Access</Text>
              <Text style={styles.fastLaunchDesc}>Enter field audit desk immediately</Text>
            </View>
          </View>
          <Ionicons name="arrow-forward" size={18} color="#059669" />
        </TouchableOpacity>

        {/* Login Form */}
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Volunteer Sign In</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>College / Cadet Wing</Text>
            <View style={styles.inputBox}>
              <Ionicons name="business-outline" size={18} color="#059669" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={college}
                onChangeText={setCollege}
                placeholder="e.g. KTHM College NCC"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Volunteer Email ID</Text>
            <View style={styles.inputBox}>
              <Ionicons name="mail-outline" size={18} color="#059669" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="volunteer@kumbhsetu.in"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputBox}>
              <Ionicons name="lock-closed-outline" size={18} color="#059669" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} activeOpacity={0.85}>
            <Text style={styles.loginBtnText}>Enter Volunteer Portal</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Operator Link */}
        <TouchableOpacity
          style={styles.operatorLink}
          onPress={() => router.push('/nashikkar/login')}
          activeOpacity={0.8}
        >
          <Text style={styles.operatorLinkText}>
            Are you a Merchant or Civic Coordinator? <Text style={{ fontWeight: 'bold', color: '#A03B00' }}>Nashikkar Login →</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F0FDF4' },
  container: { padding: 20 },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  brandBox: { alignItems: 'center', marginBottom: 20 },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#86EFAC',
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#065F46' },
  subtitle: { fontSize: 13, color: '#047857', marginTop: 2 },
  badge: {
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#DCFCE7',
  },
  badgeText: { fontSize: 11, fontWeight: '700', color: '#065F46' },
  fastLaunchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#86EFAC',
    marginBottom: 20,
  },
  fastLaunchTitle: { fontSize: 13, fontWeight: 'bold', color: '#065F46' },
  fastLaunchDesc: { fontSize: 11, color: '#047857' },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#DCFCE7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  formTitle: { fontSize: 16, fontWeight: 'bold', color: '#065F46', marginBottom: 14 },
  inputGroup: { marginBottom: 12 },
  label: { fontSize: 11, fontWeight: '700', color: '#374151', marginBottom: 6 },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 10,
  },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, height: 42, fontSize: 13, color: '#1F2937' },
  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#059669',
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 10,
  },
  loginBtnText: { color: '#FFFFFF', fontSize: 14, fontWeight: 'bold' },
  operatorLink: { marginTop: 24, alignItems: 'center' },
  operatorLinkText: { fontSize: 12, color: '#4B5563' },
});

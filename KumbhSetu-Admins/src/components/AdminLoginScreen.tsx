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
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AdminColors } from '@/constants/colors';
import { useAdmin } from '@/context/AdminContext';

export const AdminLoginScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { login } = useAdmin();

  const [selectedRoleTab, setSelectedRoleTab] = useState<'police' | 'collector'>('police');
  const [username, setUsername] = useState('Police123');
  const [password, setPassword] = useState('pols123');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectRole = (role: 'police' | 'collector') => {
    setSelectedRoleTab(role);
    if (role === 'police') {
      setUsername('Police123');
      setPassword('pols123');
    } else {
      setUsername('Gaurang');
      setPassword('pass123');
    }
    setErrorMessage('');
  };

  const handleLogin = (customUser?: string, customPass?: string) => {
    const userToUse = customUser !== undefined ? customUser : username;
    const passToUse = customPass !== undefined ? customPass : password;

    if (!userToUse.trim() || !passToUse.trim()) {
      setErrorMessage('Please enter both Username and Password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const res = login(userToUse, passToUse);
    if (!res.success) {
      setErrorMessage(res.message || 'Invalid Username or Password.');
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: Math.max(insets.top + 20, 40), paddingBottom: Math.max(insets.bottom + 20, 40) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Emblem & Branding Header */}
        <View style={styles.brandHeader}>
          <View style={styles.emblemCircle}>
            <FontAwesome5 name="shield-alt" size={30} color={AdminColors.white} />
          </View>
          <View style={styles.titleRow}>
            <Text style={styles.brandKumbh}>Kumbh</Text>
            <Text style={styles.brandSetu}>Setu</Text>
          </View>
          <View style={styles.dotDivider}>
            <View style={styles.line} />
            <View style={styles.dropShape} />
            <View style={styles.line} />
          </View>
          <Text style={styles.portalSubtitle}>
            Administration & Regulatory Command Portal
          </Text>
          <Text style={styles.dbaNotice}>
            Official Authority Gateway • Restricted Access
          </Text>
        </View>

        {/* Login Form Card */}
        <View style={styles.card}>
          {/* Quick Role Selection Tabs */}
          <View style={styles.roleTabsContainer}>
            <TouchableOpacity
              style={[
                styles.roleTabBtn,
                selectedRoleTab === 'police' && styles.roleTabBtnPoliceActive,
              ]}
              onPress={() => handleSelectRole('police')}
              activeOpacity={0.8}
            >
              <FontAwesome5
                name="shield-alt"
                size={14}
                color={selectedRoleTab === 'police' ? '#FFFFFF' : '#0284C7'}
              />
              <Text
                style={[
                  styles.roleTabText,
                  selectedRoleTab === 'police' && styles.roleTabTextActive,
                ]}
              >
                Police Squad
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleTabBtn,
                selectedRoleTab === 'collector' && styles.roleTabBtnAdminActive,
              ]}
              onPress={() => handleSelectRole('collector')}
              activeOpacity={0.8}
            >
              <FontAwesome5
                name="user-shield"
                size={14}
                color={selectedRoleTab === 'collector' ? '#FFFFFF' : AdminColors.saffron}
              />
              <Text
                style={[
                  styles.roleTabText,
                  selectedRoleTab === 'collector' && styles.roleTabTextActive,
                ]}
              >
                Administrator
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.formTitle}>
            {selectedRoleTab === 'police'
              ? 'Police Rapid Enforcement Login'
              : 'Super Administrator Login'}
          </Text>
          <Text style={styles.formSub}>
            {selectedRoleTab === 'police'
              ? 'Sign in to access Tactical Radar, Violations & Spot Fine Desk'
              : 'Sign in with Collector / Master Administrator credentials'}
          </Text>

          {errorMessage ? (
            <View style={styles.errorBanner}>
              <Ionicons name="alert-circle" size={18} color={AdminColors.danger} />
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          {/* Username Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Username / Badge ID</Text>
            <View style={styles.inputBox}>
              <FontAwesome5 name="user" size={14} color={AdminColors.textMuted} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter Username"
                placeholderTextColor={AdminColors.textMuted}
                autoCapitalize="none"
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  setErrorMessage('');
                }}
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Security Password</Text>
            <View style={styles.inputBox}>
              <FontAwesome5 name="lock" size={14} color={AdminColors.textMuted} />
              <TextInput
                style={styles.textInput}
                placeholder="Enter Password"
                placeholderTextColor={AdminColors.textMuted}
                secureTextEntry
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrorMessage('');
                }}
              />
            </View>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            style={[
              styles.loginBtn,
              selectedRoleTab === 'police' && { backgroundColor: '#0284C7' },
              isSubmitting && { opacity: 0.7 },
            ]}
            onPress={() => handleLogin()}
            activeOpacity={0.8}
            disabled={isSubmitting}
          >
            <FontAwesome5 name="shield-alt" size={15} color={AdminColors.white} />
            <Text style={styles.loginBtnText}>
              {isSubmitting
                ? 'Authenticating...'
                : selectedRoleTab === 'police'
                ? 'Sign In as Police Flying Squad'
                : 'Sign In to Command Portal'}
            </Text>
          </TouchableOpacity>

          {/* 1-Tap Quick Fill Cards */}
          <View style={styles.quickAccountsSection}>
            <Text style={styles.quickAccountsTitle}>1-Click Quick Authorizations:</Text>

            <TouchableOpacity
              style={[
                styles.quickAccountCard,
                selectedRoleTab === 'police' && { borderColor: '#0284C7', backgroundColor: '#F0F9FF' },
              ]}
              onPress={() => {
                handleSelectRole('police');
                handleLogin('Police123', 'pols123');
              }}
              activeOpacity={0.8}
            >
              <View style={[styles.quickAccIconWrap, { backgroundColor: '#DBEAFE' }]}>
                <FontAwesome5 name="shield-alt" size={14} color="#1E3A8A" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.quickAccName}>Police Flying Squad (Rapid Enforcement)</Text>
                <Text style={styles.quickAccCreds}>
                  ID: <Text style={{ fontFamily: 'Poppins_700Bold' }}>Police123</Text> • PIN: <Text style={{ fontFamily: 'Poppins_700Bold' }}>pols123</Text>
                </Text>
              </View>
              <View style={styles.quickLoginPill}>
                <Text style={styles.quickLoginPillText}>Auto Login</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.quickAccountCard,
                selectedRoleTab === 'collector' && { borderColor: AdminColors.saffron, backgroundColor: '#FFF7ED' },
              ]}
              onPress={() => {
                handleSelectRole('collector');
                handleLogin('Gaurang', 'pass123');
              }}
              activeOpacity={0.8}
            >
              <View style={[styles.quickAccIconWrap, { backgroundColor: '#FEF3C7' }]}>
                <FontAwesome5 name="user-shield" size={14} color="#B45309" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.quickAccName}>Super Administrator (District Collector)</Text>
                <Text style={styles.quickAccCreds}>
                  ID: <Text style={{ fontFamily: 'Poppins_700Bold' }}>Gaurang</Text> • PIN: <Text style={{ fontFamily: 'Poppins_700Bold' }}>pass123</Text>
                </Text>
              </View>
              <View style={[styles.quickLoginPill, { backgroundColor: '#FEF3C7' }]}>
                <Text style={[styles.quickLoginPillText, { color: '#B45309' }]}>Auto Login</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: AdminColors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  emblemCircle: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: AdminColors.saffron,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: AdminColors.saffron,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandKumbh: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: AdminColors.templeBrown,
  },
  brandSetu: {
    fontSize: 28,
    fontFamily: 'Poppins_700Bold',
    color: AdminColors.saffron,
  },
  dotDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    width: 90,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: AdminColors.primaryBorder,
  },
  dropShape: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: AdminColors.saffron,
    marginHorizontal: 4,
  },
  portalSubtitle: {
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
    color: AdminColors.templeBrown,
    marginTop: 2,
    textAlign: 'center',
  },
  dbaNotice: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: AdminColors.textMuted,
    marginTop: 2,
    textAlign: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: AdminColors.cardBackground,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: AdminColors.textPrimary,
  },
  formSub: {
    fontSize: 11.5,
    fontFamily: 'Poppins_400Regular',
    color: AdminColors.textMuted,
    marginTop: 2,
    marginBottom: 16,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: AdminColors.dangerSoft,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AdminColors.dangerBorder,
    marginBottom: 14,
  },
  errorText: {
    fontSize: 11.5,
    fontFamily: 'Poppins_500Medium',
    color: AdminColors.danger,
    flex: 1,
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
    color: AdminColors.textPrimary,
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: AdminColors.inputBackground,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 46,
  },
  textInput: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Poppins_500Medium',
    color: AdminColors.textPrimary,
  },
  loginBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: AdminColors.saffron,
    paddingVertical: 13,
    borderRadius: 10,
    marginTop: 8,
  },
  loginBtnText: {
    color: AdminColors.white,
    fontSize: 13.5,
    fontFamily: 'Poppins_700Bold',
  },
  quickAccountsSection: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: AdminColors.cardBorder,
  },
  quickAccountsTitle: {
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
    color: AdminColors.textPrimary,
    marginBottom: 10,
  },
  quickAccountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: AdminColors.inputBackground,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    marginBottom: 8,
  },
  quickAccIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickAccName: {
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
    color: AdminColors.textPrimary,
  },
  quickAccCreds: {
    fontSize: 10.5,
    fontFamily: 'Poppins_400Regular',
    color: AdminColors.textMuted,
    marginTop: 1,
  },
  roleTabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 10,
    padding: 4,
    marginBottom: 16,
    gap: 6,
  },
  roleTabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    borderRadius: 8,
  },
  roleTabBtnPoliceActive: {
    backgroundColor: '#0284C7',
    shadowColor: '#0284C7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  roleTabBtnAdminActive: {
    backgroundColor: AdminColors.saffron,
    shadowColor: AdminColors.saffron,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  roleTabText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: '#64748B',
  },
  roleTabTextActive: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
  },
  quickLoginPill: {
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  quickLoginPillText: {
    fontSize: 10,
    fontFamily: 'Poppins_700Bold',
    color: '#1E3A8A',
  },
});

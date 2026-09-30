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

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      setErrorMessage('Please enter both Username and Password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const res = login(username, password);
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
          { paddingTop: Math.max(insets.top + 30, 50), paddingBottom: Math.max(insets.bottom + 20, 40) },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Emblem & Branding Header */}
        <View style={styles.brandHeader}>
          <View style={styles.emblemCircle}>
            <FontAwesome5 name="shield-alt" size={32} color={AdminColors.white} />
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
          <Text style={styles.formTitle}>Admin Login</Text>
          <Text style={styles.formSub}>
            Sign in with your administrator credentials
          </Text>

          {errorMessage ? (
            <View style={styles.errorBanner}>
              <Ionicons name="alert-circle" size={18} color={AdminColors.danger} />
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          {/* Username Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Username</Text>
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
            <Text style={styles.inputLabel}>Password</Text>
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
            style={[styles.loginBtn, isSubmitting && { opacity: 0.7 }]}
            onPress={handleLogin}
            activeOpacity={0.8}
            disabled={isSubmitting}
          >
            <FontAwesome5 name="shield-alt" size={15} color={AdminColors.white} />
            <Text style={styles.loginBtnText}>
              {isSubmitting ? 'Authenticating...' : 'Sign In to Command Portal'}
            </Text>
          </TouchableOpacity>
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
});

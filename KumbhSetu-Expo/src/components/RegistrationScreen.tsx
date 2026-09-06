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
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useApp } from '@/context/AppContext';
import { KumbhColors } from '@/constants/colors';
import { DatePickerModal } from './DatePickerModal';

export const RegistrationScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { registerUser, t, setIsLangModalOpen, currentLangMeta, setLanguage } = useApp();

  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleSubmit = async () => {
    if (authMode === 'login') {
      if (!phone.trim() || phone.trim().length < 10) {
        setErrorMessage('Please enter a valid 10-digit registered mobile number');
        return;
      }
      setErrorMessage('');
      // Sign in pilgrim
      await registerUser(name.trim() || `Pilgrim ${phone.slice(-4)}`, phone.trim(), dob.trim() || '01/01/1990');
      return;
    }

    // Registration Mode
    if (!name.trim() || !phone.trim() || !dob.trim()) {
      setErrorMessage(t.fillAllFields || 'Please fill all required fields');
      return;
    }

    if (phone.trim().length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }

    setErrorMessage('');
    await registerUser(name, phone, dob);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: Math.max(insets.top + 14, 24), paddingBottom: Math.max(insets.bottom + 20, 40) }
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        
        {/* Top bar with Language Switcher */}
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.langBadge}
            onPress={() => setIsLangModalOpen(true)}
            activeOpacity={0.8}>
            <Ionicons name="globe-outline" size={16} color={KumbhColors.primaryDark} />
            <Text style={styles.langText}>{currentLangMeta.nativeName}</Text>
            <Ionicons name="chevron-down" size={13} color={KumbhColors.primaryDark} />
          </TouchableOpacity>
        </View>

        {/* Brand Header */}
        <View style={styles.heroSection}>
          <View style={styles.sunGlow}>
            <FontAwesome5 name="gopuram" size={28} color={KumbhColors.primary} />
          </View>

          <Text style={styles.brandTitle}>{t.appName}</Text>
          <Text style={styles.brandSubtitle}>{t.appTagline}</Text>
          <Text style={styles.welcomePillText}>{t.welcome}</Text>
        </View>

        {/* Auth Card */}
        <View style={styles.card}>
          
          {/* Mode Switcher: Register / Sign In */}
          <View style={styles.modeTabs}>
            <TouchableOpacity
              style={[styles.modeTab, authMode === 'register' && styles.modeTabActive]}
              onPress={() => {
                setAuthMode('register');
                setErrorMessage('');
              }}
              activeOpacity={0.8}>
              <Text style={[styles.modeTabText, authMode === 'register' && styles.modeTabTextActive]}>
                New Pilgrim
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modeTab, authMode === 'login' && styles.modeTabActive]}
              onPress={() => {
                setAuthMode('login');
                setErrorMessage('');
              }}
              activeOpacity={0.8}>
              <Text style={[styles.modeTabText, authMode === 'login' && styles.modeTabTextActive]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>
              {authMode === 'register' ? t.regTitle : 'Pilgrim Sign In'}
            </Text>
            <Text style={styles.cardDesc}>
              {authMode === 'register'
                ? t.regSubtitle
                : 'Enter your 10-digit mobile number to access your pilgrim pass'}
            </Text>

            {/* Quick 1-tap Language Selector */}
            <View style={styles.quickLangStrip}>
              {[
                { code: 'en', label: 'English' },
                { code: 'hi', label: 'हिन्दी' },
                { code: 'mr', label: 'मराठी' },
                { code: 'gu', label: 'ગુજરાતી' },
              ].map((item) => {
                const isSelected = currentLangMeta.code === item.code;
                return (
                  <TouchableOpacity
                    key={item.code}
                    onPress={() => setLanguage(item.code)}
                    style={[
                      styles.quickLangPill,
                      isSelected && styles.quickLangPillActive,
                    ]}>
                    <Text
                      style={[
                        styles.quickLangText,
                        isSelected && styles.quickLangTextActive,
                      ]}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              <TouchableOpacity
                onPress={() => setIsLangModalOpen(true)}
                style={styles.moreLangPill}>
                <Text style={styles.moreLangText}>More</Text>
              </TouchableOpacity>
            </View>
          </View>

          {errorMessage ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle" size={16} color={KumbhColors.danger} />
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          {/* Field 1: Name (Only in Register mode) */}
          {authMode === 'register' && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t.fullNameLabel} <Text style={styles.requiredStar}>*</Text></Text>
              <TextInput
                style={styles.input}
                placeholder={t.fullNamePlaceholder}
                placeholderTextColor={KumbhColors.textMuted}
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (errorMessage) setErrorMessage('');
                }}
                autoCapitalize="words"
              />
            </View>
          )}

          {/* Field 2: Phone */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>{t.phoneLabel} <Text style={styles.requiredStar}>*</Text></Text>
            <View style={styles.phoneInputWrapper}>
              <View style={styles.countryCodeBadge}>
                <Text style={styles.countryCodeText}>+91</Text>
              </View>
              <TextInput
                style={[styles.input, styles.phoneInput]}
                placeholder={t.phonePlaceholder}
                placeholderTextColor={KumbhColors.textMuted}
                value={phone}
                onChangeText={(text) => {
                  setPhone(text.replace(/[^0-9]/g, ''));
                  if (errorMessage) setErrorMessage('');
                }}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
          </View>

          {/* Field 3: Actual Date of Birth Selector (Only in Register mode) */}
          {authMode === 'register' && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t.dobLabel} <Text style={styles.requiredStar}>*</Text></Text>
              <TouchableOpacity
                style={[styles.input, styles.datePickerBtn]}
                onPress={() => setIsDatePickerOpen(true)}
                activeOpacity={0.75}>
                <Text style={dob ? styles.dateValueText : styles.datePlaceholderText}>
                  {dob || 'Select Date of Birth (DD/MM/YYYY)'}
                </Text>
                <MaterialCommunityIcons name="calendar" size={18} color={KumbhColors.primary} />
              </TouchableOpacity>
            </View>
          )}

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSubmit}
            activeOpacity={0.85}>
            <Text style={styles.submitBtnText}>
              {authMode === 'register' ? t.registerButton : 'Sign In as Pilgrim'}
            </Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.privacyNote}>
            <Ionicons name="shield-checkmark" size={14} color={KumbhColors.success} />
            <Text style={styles.privacyText}>
              Fast & secure direct access
            </Text>
          </View>
        </View>

        {/* Interactive Date Picker Modal */}
        <DatePickerModal
          visible={isDatePickerOpen}
          onClose={() => setIsDatePickerOpen(false)}
          onSelectDate={(date) => {
            setDob(date);
            if (errorMessage) setErrorMessage('');
          }}
          initialDate={dob}
        />

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: KumbhColors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    maxWidth: 440,
  },
  langBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    gap: 6,
  },
  langText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.templeDark,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  sunGlow: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: KumbhColors.primarySoft,
    borderWidth: 1,
    borderColor: KumbhColors.primaryBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  brandTitle: {
    fontSize: 26,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeDark,
  },
  brandSubtitle: {
    fontSize: 13,
    fontFamily: 'Poppins_500Medium',
    color: KumbhColors.textSecondary,
    marginTop: 1,
  },
  welcomePillText: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    color: KumbhColors.primary,
    marginTop: 4,
  },
  card: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  modeTabs: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 3,
    marginBottom: 12,
  },
  modeTab: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 6,
  },
  modeTabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  modeTabText: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    color: KumbhColors.textMuted,
  },
  modeTabTextActive: {
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.primaryDark,
  },
  cardHeader: {
    marginBottom: 14,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 17,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeDark,
  },
  cardDesc: {
    fontSize: 11.5,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_400Regular',
    marginTop: 2,
    textAlign: 'center',
  },
  quickLangStrip: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
  },
  quickLangPill: {
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  quickLangPillActive: {
    backgroundColor: KumbhColors.primarySoft,
    borderColor: KumbhColors.primary,
  },
  quickLangText: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    color: KumbhColors.templeBrown,
  },
  quickLangTextActive: {
    color: KumbhColors.primary,
    fontFamily: 'Poppins_700Bold',
  },
  moreLangPill: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  moreLangText: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.textMuted,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: KumbhColors.dangerSoft,
    borderColor: KumbhColors.dangerBorder,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    gap: 6,
  },
  errorText: {
    color: KumbhColors.danger,
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    flex: 1,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.templeDark,
    marginBottom: 4,
  },
  requiredStar: {
    color: KumbhColors.danger,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 13,
    color: KumbhColors.charcoal,
    fontFamily: 'Poppins_400Regular',
  },
  phoneInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  countryCodeBadge: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 9,
    justifyContent: 'center',
  },
  countryCodeText: {
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.templeBrown,
  },
  phoneInput: {
    flex: 1,
  },
  datePickerBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateValueText: {
    fontSize: 13,
    color: KumbhColors.charcoal,
    fontFamily: 'Poppins_500Medium',
  },
  datePlaceholderText: {
    fontSize: 13,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_400Regular',
  },
  submitBtn: {
    backgroundColor: KumbhColors.primary,
    borderRadius: 8,
    paddingVertical: 11,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 6,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
  },
  privacyNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 10,
  },
  privacyText: {
    fontSize: 11,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_400Regular',
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { VeerColors } from '@/constants/colors';
import { useVolunteer } from '@/context/VolunteerContext';
import { DUTY_SECTORS, VOLUNTEER_ROLES } from '@/constants/translations';
import {
  pickImageFromGallery,
  takePhotoWithCamera,
  SAMPLE_VOLUNTEER_PHOTOS,
} from '@/utils/imagePickerHelper';

export const VolunteerRegisterScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { registerVolunteer, loginVolunteer, language, setLanguage, t } = useVolunteer();

  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [loginInput, setLoginInput] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other'>('male');
  const [assignedSectorId, setAssignedSectorId] = useState(DUTY_SECTORS[0].id);
  const [roleId, setRoleId] = useState(VOLUNTEER_ROLES[0].id);
  const [profileImageUri, setProfileImageUri] = useState<string>(
    SAMPLE_VOLUNTEER_PHOTOS[0].url
  );
  const [errorMessage, setErrorMessage] = useState('');

  const handlePickPhoto = async () => {
    const uri = await pickImageFromGallery();
    if (uri) setProfileImageUri(uri);
  };

  const handleCapturePhoto = async () => {
    const uri = await takePhotoWithCamera();
    if (uri) setProfileImageUri(uri);
  };

  const handleLoginSubmit = async () => {
    if (!loginInput.trim()) {
      setErrorMessage(
        language === 'mr'
          ? 'कृपया नोंदणीकृत मोबाईल क्रमांक किंवा बॅज आयडी टाका.'
          : 'Please enter registered mobile number or Badge ID.'
      );
      return;
    }
    setErrorMessage('');
    setIsLoggingIn(true);
    const res = await loginVolunteer(loginInput.trim());
    setIsLoggingIn(false);
    if (!res.success) {
      setErrorMessage(res.message || 'Volunteer not found.');
    }
  };

  const handleRegister = async () => {
    if (!name.trim() || !phone.trim() || !age.trim()) {
      setErrorMessage(
        language === 'mr'
          ? 'कृपया नाव, मोबाईल क्रमांक आणि वय भरा.'
          : 'Please enter Name, Mobile Number, and Age.'
      );
      return;
    }

    if (phone.trim().length < 10) {
      setErrorMessage(
        language === 'mr'
          ? 'कृपया वैध १० अंकी मोबाईल क्रमांक टाका.'
          : 'Please enter a valid 10-digit phone number.'
      );
      return;
    }

    setErrorMessage('');

    await registerVolunteer({
      name: name.trim(),
      phone: phone.trim(),
      age: age.trim(),
      gender,
      assignedSectorId,
      roleId,
      profileImageUri: profileImageUri || SAMPLE_VOLUNTEER_PHOTOS[0].url,
    });

    Alert.alert(
      language === 'mr' ? 'नोंदणी यशस्वी!' : 'Registration Successful!',
      language === 'mr'
        ? `कुंभवीर पथकात आपले सहर्ष स्वागत, ${name}!`
        : `Welcome to KumbhVeer Squad, ${name}!`
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: Math.max(insets.top + 12, 24), paddingBottom: 40 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Top Language Bar */}
        <View style={styles.topLangRow}>
          <View style={styles.langPillsBox}>
            <TouchableOpacity
              style={[styles.langPill, language === 'mr' && styles.langPillActive]}
              onPress={() => setLanguage('mr')}
            >
              <Text
                style={[
                  styles.langPillText,
                  language === 'mr' && styles.langPillTextActive,
                ]}
              >
                मराठी
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.langPill, language === 'en' && styles.langPillActive]}
              onPress={() => setLanguage('en')}
            >
              <Text
                style={[
                  styles.langPillText,
                  language === 'en' && styles.langPillTextActive,
                ]}
              >
                English
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Brand Header */}
        <View style={styles.brandCard}>
          <View style={styles.brandIconBox}>
            <Ionicons name="shield" size={28} color={VeerColors.saffron} />
          </View>
          <Text style={styles.brandTitle}>{t.appName}</Text>
          <Text style={styles.brandSub}>{t.appTagline}</Text>
          <Text style={styles.brandDesc}>{t.regSub}</Text>
        </View>

        {/* Mode Switcher: New Registration / Volunteer Sign In */}
        <View style={styles.modeTabs}>
          <TouchableOpacity
            style={[styles.modeTab, mode === 'register' && styles.modeTabActive]}
            onPress={() => {
              setMode('register');
              setErrorMessage('');
            }}
            activeOpacity={0.8}
          >
            <Text style={[styles.modeTabText, mode === 'register' && styles.modeTabTextActive]}>
              {language === 'mr' ? 'नवीन नोंदणी' : 'New Registration'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modeTab, mode === 'login' && styles.modeTabActive]}
            onPress={() => {
              setMode('login');
              setErrorMessage('');
            }}
            activeOpacity={0.8}
          >
            <Text style={[styles.modeTabText, mode === 'login' && styles.modeTabTextActive]}>
              {language === 'mr' ? 'स्वयंसेवक प्रवेश' : 'Volunteer Sign In'}
            </Text>
          </TouchableOpacity>
        </View>

        {errorMessage ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={18} color={VeerColors.danger} />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}

        {/* SIGN IN FORM */}
        {mode === 'login' ? (
          <View style={styles.card}>
            <Text style={styles.cardSectionTitle}>
              {language === 'mr' ? 'स्वयंसेवक लॉगिन' : 'Volunteer Sign In'}
            </Text>
            <Text style={styles.loginDesc}>
              {language === 'mr'
                ? 'आपला नोंदणीकृत १० अंकी मोबाईल क्रमांक किंवा कुंभवीर बॅज आयडी (उदा. KV-RAM-408) टाका.'
                : 'Enter your registered 10-digit mobile number or KumbhVeer Badge ID (e.g. KV-RAM-408).'}
            </Text>

            <Text style={styles.inputLabel}>
              {language === 'mr' ? 'मोबाईल / बॅज आयडी' : 'Mobile No. / Badge ID'}{' '}
              <Text style={styles.reqStar}>*</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder={language === 'mr' ? 'उदा. 9876543210 किंवा KV-RAM-101' : 'e.g. 9876543210 or KV-RAM-101'}
              placeholderTextColor={VeerColors.textMuted}
              value={loginInput}
              onChangeText={(txt) => {
                setLoginInput(txt);
                if (errorMessage) setErrorMessage('');
              }}
            />

            <TouchableOpacity
              style={[styles.submitBtn, isLoggingIn && { opacity: 0.7 }]}
              onPress={handleLoginSubmit}
              activeOpacity={0.85}
              disabled={isLoggingIn}
            >
              <Ionicons name="log-in-outline" size={18} color="#FFFFFF" />
              <Text style={styles.submitBtnText}>
                {isLoggingIn
                  ? language === 'mr'
                    ? 'पडताळणी सुरू आहे...'
                    : 'Authenticating...'
                  : language === 'mr'
                  ? 'ड्युटी रडारवर जा'
                  : 'Access Duty Dashboard'}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* REGISTRATION FORM */
          <>
            {/* Section 1: Profile Photo */}
            <View style={styles.card}>
              <Text style={styles.cardSectionTitle}>{t.uploadPhoto}</Text>

          <View style={styles.photoCenterBox}>
            <Image
              source={{ uri: profileImageUri || SAMPLE_VOLUNTEER_PHOTOS[0].url }}
              style={styles.avatarBig}
            />

            <View style={styles.photoBtnRow}>
              <TouchableOpacity
                style={styles.photoBtn}
                onPress={handlePickPhoto}
                activeOpacity={0.8}
              >
                <Ionicons name="images" size={15} color={VeerColors.saffron} />
                <Text style={styles.photoBtnText}>{t.chooseGallery}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.photoBtn}
                onPress={handleCapturePhoto}
                activeOpacity={0.8}
              >
                <Ionicons name="camera" size={15} color={VeerColors.saffron} />
                <Text style={styles.photoBtnText}>{t.takePhoto}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.subLabel}>{t.orSample}</Text>
          <View style={styles.sampleAvatarRow}>
            {SAMPLE_VOLUNTEER_PHOTOS.map((sample) => (
              <TouchableOpacity
                key={sample.id}
                onPress={() => setProfileImageUri(sample.url)}
                style={[
                  styles.sampleAvatarBox,
                  profileImageUri === sample.url && styles.sampleAvatarBoxActive,
                ]}
              >
                <Image source={{ uri: sample.url }} style={styles.sampleAvatarImg} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Section 2: Personal Details */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>
            {language === 'mr' ? '१. वैयक्तिक माहिती' : '1. Personal Information'}
          </Text>

          <Text style={styles.inputLabel}>{t.fullName} *</Text>
          <TextInput
            style={styles.textInput}
            placeholder={language === 'mr' ? 'उदा. आनंद काळे' : 'e.g. Anand Kale'}
            placeholderTextColor={VeerColors.textMuted}
            value={name}
            onChangeText={(txt) => {
              setName(txt);
              if (errorMessage) setErrorMessage('');
            }}
          />

          <View style={styles.rowTwoCols}>
            <View style={{ flex: 1, marginRight: 6 }}>
              <Text style={styles.inputLabel}>{t.phone} *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="9876543210"
                placeholderTextColor={VeerColors.textMuted}
                keyboardType="phone-pad"
                maxLength={10}
                value={phone}
                onChangeText={(txt) => setPhone(txt.replace(/[^0-9]/g, ''))}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 6 }}>
              <Text style={styles.inputLabel}>{t.age} *</Text>
              <TextInput
                style={styles.textInput}
                placeholder="24"
                placeholderTextColor={VeerColors.textMuted}
                keyboardType="numeric"
                maxLength={2}
                value={age}
                onChangeText={setAge}
              />
            </View>
          </View>

          <Text style={styles.inputLabel}>{t.gender}</Text>
          <View style={styles.genderRow}>
            {(['male', 'female', 'other'] as const).map((g) => (
              <TouchableOpacity
                key={g}
                style={[styles.genderBtn, gender === g && styles.genderBtnActive]}
                onPress={() => setGender(g)}
              >
                <Text
                  style={[
                    styles.genderBtnText,
                    gender === g && styles.genderBtnTextActive,
                  ]}
                >
                  {t[g]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Section 3: Duty Sector & Role */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>
            {language === 'mr' ? '२. ड्युटी क्षेत्र व भूमिका' : '2. Duty Sector & Role'}
          </Text>

          <Text style={styles.inputLabel}>{t.preferredSector}</Text>
          <View style={styles.sectorList}>
            {DUTY_SECTORS.map((sector) => {
              const isSelected = assignedSectorId === sector.id;
              return (
                <TouchableOpacity
                  key={sector.id}
                  style={[styles.sectorItem, isSelected && styles.sectorItemActive]}
                  onPress={() => setAssignedSectorId(sector.id)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                    size={18}
                    color={isSelected ? VeerColors.saffron : VeerColors.textMuted}
                  />
                  <Text
                    style={[
                      styles.sectorItemText,
                      isSelected && styles.sectorItemTextActive,
                    ]}
                  >
                    {language === 'mr' ? sector.mr : sector.en}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={[styles.inputLabel, { marginTop: 12 }]}>{t.volunteerRole}</Text>
          <View style={styles.roleList}>
            {VOLUNTEER_ROLES.map((role) => {
              const isSelected = roleId === role.id;
              return (
                <TouchableOpacity
                  key={role.id}
                  style={[styles.roleItem, isSelected && styles.roleItemActive]}
                  onPress={() => setRoleId(role.id)}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name={isSelected ? 'checkmark-circle' : 'ellipse-outline'}
                    size={16}
                    color={isSelected ? VeerColors.saffronDark : VeerColors.textMuted}
                  />
                  <Text
                    style={[
                      styles.roleItemText,
                      isSelected && styles.roleItemTextActive,
                    ]}
                  >
                    {language === 'mr' ? role.mr : role.en}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Submit Registration Button */}
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={handleRegister}
          activeOpacity={0.85}
        >
          <Ionicons name="shield-checkmark" size={20} color={VeerColors.white} />
          <Text style={styles.submitBtnText}>{t.submitRegistration}</Text>
        </TouchableOpacity>
        </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: VeerColors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  topLangRow: {
    alignItems: 'flex-end',
    marginBottom: 4,
  },
  langPillsBox: {
    flexDirection: 'row',
    backgroundColor: VeerColors.cardBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
    padding: 3,
    gap: 4,
  },
  langPill: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  langPillActive: {
    backgroundColor: VeerColors.saffron,
  },
  langPillText: {
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
    color: VeerColors.textSecondary,
  },
  langPillTextActive: {
    color: VeerColors.white,
    fontFamily: 'Poppins_700Bold',
  },
  brandCard: {
    alignItems: 'center',
    backgroundColor: VeerColors.cardBackground,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
  },
  brandIconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: VeerColors.saffronSoft,
    borderWidth: 1,
    borderColor: VeerColors.saffronBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  brandTitle: {
    fontSize: 22,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.templeBrown,
  },
  brandSub: {
    fontSize: 12.5,
    fontFamily: 'Poppins_600SemiBold',
    color: VeerColors.saffronDark,
    marginTop: 1,
  },
  brandDesc: {
    fontSize: 11.5,
    fontFamily: 'Poppins_400Regular',
    color: VeerColors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 16,
  },
  modeTabs: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 3,
  },
  modeTab: {
    flex: 1,
    paddingVertical: 8,
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
    color: VeerColors.textMuted,
  },
  modeTabTextActive: {
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.saffronDark,
  },
  loginDesc: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: VeerColors.textSecondary,
    marginBottom: 12,
    lineHeight: 16,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: VeerColors.dangerSoft,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: VeerColors.dangerBorder,
    padding: 10,
    gap: 8,
  },
  errorText: {
    flex: 1,
    color: VeerColors.danger,
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
  },
  card: {
    backgroundColor: VeerColors.cardBackground,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
  },
  cardSectionTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.templeBrown,
    marginBottom: 8,
  },
  photoCenterBox: {
    alignItems: 'center',
    marginVertical: 4,
  },
  avatarBig: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: VeerColors.surfaceHover,
    borderWidth: 2,
    borderColor: VeerColors.saffronBorder,
  },
  photoBtnRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  photoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: VeerColors.surfaceHover,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 6,
  },
  photoBtnText: {
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
    color: VeerColors.templeBrown,
  },
  subLabel: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    color: VeerColors.textMuted,
    marginTop: 10,
    marginBottom: 6,
  },
  sampleAvatarRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  sampleAvatarBox: {
    borderRadius: 22,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
    overflow: 'hidden',
  },
  sampleAvatarBoxActive: {
    borderColor: VeerColors.saffron,
    borderWidth: 2,
  },
  sampleAvatarImg: {
    width: 44,
    height: 44,
  },
  inputLabel: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: VeerColors.textPrimary,
    marginBottom: 6,
  },
  reqStar: {
    color: VeerColors.danger,
  },
  textInput: {
    backgroundColor: VeerColors.surfaceHover,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: VeerColors.textPrimary,
  },
  rowTwoCols: {
    flexDirection: 'row',
  },
  genderRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 2,
  },
  genderBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: VeerColors.surfaceHover,
    borderRadius: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
  },
  genderBtnActive: {
    backgroundColor: VeerColors.saffronSoft,
    borderColor: VeerColors.saffron,
  },
  genderBtnText: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    color: VeerColors.textSecondary,
  },
  genderBtnTextActive: {
    color: VeerColors.saffronDark,
    fontFamily: 'Poppins_700Bold',
  },
  sectorList: {
    gap: 6,
    marginTop: 4,
  },
  sectorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: VeerColors.surfaceHover,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
    gap: 8,
  },
  sectorItemActive: {
    backgroundColor: VeerColors.saffronSoft,
    borderColor: VeerColors.saffron,
  },
  sectorItemText: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    color: VeerColors.textSecondary,
    flex: 1,
  },
  sectorItemTextActive: {
    color: VeerColors.saffronDark,
    fontFamily: 'Poppins_700Bold',
  },
  roleList: {
    gap: 6,
    marginTop: 4,
  },
  roleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: VeerColors.surfaceHover,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
    gap: 8,
  },
  roleItemActive: {
    backgroundColor: VeerColors.saffronSoft,
    borderColor: VeerColors.saffron,
  },
  roleItemText: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    color: VeerColors.textSecondary,
    flex: 1,
  },
  roleItemTextActive: {
    color: VeerColors.saffronDark,
    fontFamily: 'Poppins_700Bold',
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: VeerColors.saffron,
    borderRadius: 10,
    paddingVertical: 13,
    gap: 8,
    marginTop: 6,
  },
  submitBtnText: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.white,
  },
});

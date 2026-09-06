import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VeerColors } from '@/constants/colors';
import { useVolunteer } from '@/context/VolunteerContext';
import { DUTY_SECTORS, VOLUNTEER_ROLES } from '@/constants/translations';
import {
  pickImageFromGallery,
  takePhotoWithCamera,
  SAMPLE_VOLUNTEER_PHOTOS,
} from '@/utils/imagePickerHelper';

export const VolunteerProfileTab: React.FC = () => {
  const { profile, updateProfile, updateAssignedSector, resetAccount, language, setLanguage, t } =
    useVolunteer();

  if (!profile) return null;

  const currentSector = DUTY_SECTORS.find((s) => s.id === profile.assignedSectorId);
  const currentRole = VOLUNTEER_ROLES.find((r) => r.id === profile.roleId);

  const handlePickPhoto = async () => {
    const uri = await pickImageFromGallery();
    if (uri) await updateProfile({ profileImageUri: uri });
  };

  const handleCapturePhoto = async () => {
    const uri = await takePhotoWithCamera();
    if (uri) await updateProfile({ profileImageUri: uri });
  };

  const handleCallSOS = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  const handleReset = () => {
    Alert.alert(
      language === 'mr' ? 'खाते बदला / रीसेट करा' : 'Deregister / Switch Account',
      language === 'mr'
        ? 'आपण या डिव्हाइसवरून स्वयंसेवक प्रोफाइल रीसेट करू इच्छिता?'
        : 'Do you want to reset this volunteer profile from this device?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: language === 'mr' ? 'रीसेट करा' : 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetAccount();
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Official Volunteer ID Badge Card */}
      <View style={styles.badgeCard}>
        <View style={styles.badgeHeader}>
          <View style={styles.badgeTitleRow}>
            <Ionicons name="shield" size={16} color={VeerColors.saffron} />
            <Text style={styles.badgeGovtTitle}>Kumbh Mela Administration</Text>
          </View>
          <Text style={styles.badgeMainTitle}>KumbhVeer Official Volunteer Pass</Text>
        </View>

        <View style={styles.badgeBody}>
          <Image source={{ uri: profile.profileImageUri }} style={styles.badgePhoto} />

          <View style={styles.badgeDetails}>
            <Text style={styles.badgeName}>{profile.name}</Text>
            <Text style={styles.badgeIdText}>ID: {profile.volunteerBadgeId}</Text>
            <Text style={styles.badgeRoleText}>
              {currentRole ? (language === 'mr' ? currentRole.mr : currentRole.en) : profile.roleId}
            </Text>

            <View style={styles.badgeSectorTag}>
              <Ionicons name="location" size={11} color={VeerColors.saffron} />
              <Text style={styles.badgeSectorText}>
                {currentSector
                  ? language === 'mr'
                    ? currentSector.mr
                    : currentSector.en
                  : profile.assignedSectorId}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.badgeFooter}>
          <Text style={styles.badgeFooterText}>Authorized Ground Volunteer • Nashik Kumbh Mela</Text>
        </View>
      </View>

      {/* Change Photo Actions */}
      <View style={styles.card}>
        <Text style={styles.cardSectionTitle}>{t.uploadPhoto}</Text>
        <View style={styles.photoActionsRow}>
          <TouchableOpacity style={styles.photoActionBtn} onPress={handlePickPhoto}>
            <Ionicons name="images" size={15} color={VeerColors.saffron} />
            <Text style={styles.photoActionBtnText}>{t.chooseGallery}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.photoActionBtn} onPress={handleCapturePhoto}>
            <Ionicons name="camera" size={15} color={VeerColors.saffron} />
            <Text style={styles.photoActionBtnText}>{t.takePhoto}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
          {SAMPLE_VOLUNTEER_PHOTOS.map((sample) => (
            <TouchableOpacity
              key={sample.id}
              onPress={() => updateProfile({ profileImageUri: sample.url })}
              style={[
                styles.sampleThumb,
                profile.profileImageUri === sample.url && styles.sampleThumbActive,
              ]}
            >
              <Image source={{ uri: sample.url }} style={styles.sampleThumbImg} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Assigned Duty Sector Switcher */}
      <View style={styles.card}>
        <Text style={styles.cardSectionTitle}>
          {language === 'mr' ? 'नियुक्त ड्युटी क्षेत्र बदला' : 'Change Duty Sector'}
        </Text>
        <View style={styles.sectorList}>
          {DUTY_SECTORS.map((sector) => {
            const isSelected = profile.assignedSectorId === sector.id;
            return (
              <TouchableOpacity
                key={sector.id}
                style={[styles.sectorItem, isSelected && styles.sectorItemActive]}
                onPress={() => updateAssignedSector(sector.id)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={isSelected ? 'radio-button-on' : 'radio-button-off'}
                  size={16}
                  color={isSelected ? VeerColors.saffron : VeerColors.textMuted}
                />
                <Text style={[styles.sectorItemText, isSelected && styles.sectorItemTextActive]}>
                  {language === 'mr' ? sector.mr : sector.en}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Emergency Helpline Strip */}
      <View style={styles.card}>
        <Text style={styles.cardSectionTitle}>
          {language === 'mr' ? 'आपत्कालीन संपर्क' : 'Emergency Contacts'}
        </Text>
        <View style={styles.sosRow}>
          <TouchableOpacity
            style={[styles.sosBtn, { backgroundColor: VeerColors.danger }]}
            onPress={() => handleCallSOS('112')}
          >
            <Ionicons name="call" size={14} color={VeerColors.white} />
            <Text style={styles.sosBtnText}>Police (112)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sosBtn, { backgroundColor: VeerColors.riverBlue }]}
            onPress={() => handleCallSOS('108')}
          >
            <Ionicons name="medkit" size={14} color={VeerColors.white} />
            <Text style={styles.sosBtnText}>Ambulance (108)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sosBtn, { backgroundColor: VeerColors.goldDark }]}
            onPress={() => handleCallSOS('1950')}
          >
            <Ionicons name="information-circle" size={14} color={VeerColors.white} />
            <Text style={styles.sosBtnText}>Mela Desk (1950)</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Deregister / Reset */}
      <TouchableOpacity style={styles.resetBtn} onPress={handleReset} activeOpacity={0.8}>
        <Ionicons name="log-out-outline" size={16} color={VeerColors.danger} />
        <Text style={styles.resetBtnText}>
          {language === 'mr' ? 'स्वयंसेवक खाते रीसेट करा' : 'Deregister / Switch Volunteer'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: VeerColors.background,
  },
  scrollContent: {
    padding: 16,
    gap: 12,
    paddingBottom: 28,
  },
  badgeCard: {
    backgroundColor: VeerColors.cardBackground,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: VeerColors.saffronBorder,
    overflow: 'hidden',
  },
  badgeHeader: {
    backgroundColor: VeerColors.saffronSoft,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: VeerColors.saffronBorder,
  },
  badgeTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  badgeGovtTitle: {
    fontSize: 10.5,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.saffronDark,
  },
  badgeMainTitle: {
    fontSize: 13.5,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.templeBrown,
    marginTop: 1,
  },
  badgeBody: {
    flexDirection: 'row',
    padding: 12,
    gap: 12,
    alignItems: 'center',
  },
  badgePhoto: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: VeerColors.saffronBorder,
    backgroundColor: VeerColors.surfaceHover,
  },
  badgeDetails: {
    flex: 1,
  },
  badgeName: {
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.templeBrown,
  },
  badgeIdText: {
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.saffronDark,
  },
  badgeRoleText: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    color: VeerColors.textSecondary,
    marginTop: 1,
  },
  badgeSectorTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 4,
  },
  badgeSectorText: {
    fontSize: 10.5,
    fontFamily: 'Poppins_600SemiBold',
    color: VeerColors.riverBlueDark,
  },
  badgeFooter: {
    backgroundColor: VeerColors.surfaceHover,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: VeerColors.cardBorder,
  },
  badgeFooterText: {
    fontSize: 9.5,
    fontFamily: 'Poppins_500Medium',
    color: VeerColors.textMuted,
  },
  card: {
    backgroundColor: VeerColors.cardBackground,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
  },
  cardSectionTitle: {
    fontSize: 13.5,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.templeBrown,
    marginBottom: 8,
  },
  photoActionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  photoActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: VeerColors.surfaceHover,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
    paddingVertical: 7,
    gap: 6,
  },
  photoActionBtnText: {
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
    color: VeerColors.templeBrown,
  },
  sampleThumb: {
    marginRight: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
    overflow: 'hidden',
  },
  sampleThumbActive: {
    borderColor: VeerColors.saffron,
    borderWidth: 2,
  },
  sampleThumbImg: {
    width: 36,
    height: 36,
  },
  sectorList: {
    gap: 6,
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
  sosRow: {
    flexDirection: 'row',
    gap: 6,
  },
  sosBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  sosBtnText: {
    fontSize: 10.5,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.white,
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: VeerColors.cardBackground,
    borderRadius: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: VeerColors.dangerBorder,
    gap: 6,
    marginTop: 4,
  },
  resetBtnText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: VeerColors.danger,
  },
});

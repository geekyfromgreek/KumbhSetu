import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { VeerColors } from '@/constants/colors';
import { useVolunteer } from '@/context/VolunteerContext';
import { DUTY_SECTORS } from '@/constants/translations';

export const VolunteerHeader: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { profile, toggleDutyStatus, language, setLanguage, t } = useVolunteer();

  if (!profile) return null;

  const currentSector = DUTY_SECTORS.find((s) => s.id === profile.assignedSectorId);
  const sectorName = currentSector
    ? language === 'mr'
      ? currentSector.mr
      : currentSector.en
    : profile.assignedSectorId;

  return (
    <View style={[styles.headerContainer, { paddingTop: Math.max(insets.top + 8, 16) }]}>
      <View style={styles.topRow}>
        {/* Volunteer Identity */}
        <View style={styles.volunteerInfoCol}>
          <View style={styles.avatarRow}>
            <Image source={{ uri: profile.profileImageUri }} style={styles.avatarMini} />
            <View style={{ flex: 1 }}>
              <View style={styles.nameRow}>
                <Text style={styles.volunteerName} numberOfLines={1}>
                  {profile.name}
                </Text>
                <View style={styles.badgePill}>
                  <Text style={styles.badgePillText}>{profile.volunteerBadgeId}</Text>
                </View>
              </View>

              <View style={styles.sectorRow}>
                <Ionicons name="location" size={11} color={VeerColors.saffron} />
                <Text style={styles.sectorText} numberOfLines={1}>
                  {sectorName}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Right Controls: Language & Duty Toggle */}
        <View style={styles.rightControls}>
          {/* Quick Language Toggle */}
          <TouchableOpacity
            style={styles.langBtn}
            onPress={() => setLanguage(language === 'mr' ? 'en' : 'mr')}
            activeOpacity={0.8}
          >
            <Ionicons name="globe-outline" size={12} color={VeerColors.templeBrown} />
            <Text style={styles.langBtnText}>
              {language === 'mr' ? 'EN' : 'मराठी'}
            </Text>
          </TouchableOpacity>

          {/* On/Off Duty Button */}
          <TouchableOpacity
            style={[
              styles.dutyBtn,
              profile.isOnDuty ? styles.dutyOn : styles.dutyOff,
            ]}
            onPress={toggleDutyStatus}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.dutyDot,
                { backgroundColor: profile.isOnDuty ? VeerColors.success : VeerColors.danger },
              ]}
            />
            <Text
              style={[
                styles.dutyBtnText,
                { color: profile.isOnDuty ? VeerColors.success : VeerColors.danger },
              ]}
            >
              {profile.isOnDuty ? (language === 'mr' ? 'कर्तव्य' : 'On Duty') : (language === 'mr' ? 'सुट्टी' : 'Off Duty')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: VeerColors.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: VeerColors.cardBorder,
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  volunteerInfoCol: {
    flex: 1,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarMini: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: VeerColors.surfaceHover,
    borderWidth: 1.5,
    borderColor: VeerColors.saffronBorder,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  volunteerName: {
    fontSize: 14.5,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.templeBrown,
  },
  badgePill: {
    backgroundColor: VeerColors.saffronSoft,
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: VeerColors.saffronBorder,
  },
  badgePillText: {
    fontSize: 9.5,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.saffronDark,
  },
  sectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 1,
  },
  sectorText: {
    fontSize: 10.5,
    fontFamily: 'Poppins_500Medium',
    color: VeerColors.textMuted,
  },
  rightControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  langBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: VeerColors.surfaceHover,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 6,
    gap: 3,
  },
  langBtnText: {
    fontSize: 10.5,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.templeBrown,
  },
  dutyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    gap: 5,
  },
  dutyOn: {
    backgroundColor: VeerColors.successSoft,
    borderColor: VeerColors.successBorder,
  },
  dutyOff: {
    backgroundColor: VeerColors.dangerSoft,
    borderColor: VeerColors.dangerBorder,
  },
  dutyDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  dutyBtnText: {
    fontSize: 10.5,
    fontFamily: 'Poppins_700Bold',
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VeerColors } from '@/constants/colors';
import { useVolunteer } from '@/context/VolunteerContext';
import { GroundFactCheck } from '@/types/volunteer';
import { DUTY_SECTORS } from '@/constants/translations';

export const GroundFactCheckTab: React.FC = () => {
  const { factChecks, submitFactCheckVerdict, language, t } = useVolunteer();

  const [selectedClaim, setSelectedClaim] = useState<GroundFactCheck | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [groundNotes, setGroundNotes] = useState('');

  const openFactCheckModal = (claim: GroundFactCheck) => {
    setSelectedClaim(claim);
    setGroundNotes(claim.volunteerNotes || '');
    setModalVisible(true);
  };

  const handleVerdict = async (verdict: 'VERIFIED_TRUE' | 'DEBUNKED_FAKE') => {
    if (!selectedClaim) return;
    if (!groundNotes.trim()) {
      Alert.alert(
        language === 'mr' ? 'स्पष्टीकरण आवश्यक आहे' : 'Clarification Required',
        language === 'mr'
          ? 'कृपया जागेवरील प्रत्यक्ष परिस्थितीचे स्पष्टीकरण नोंदवा.'
          : 'Please enter your ground fact clarification notes before submitting.'
      );
      return;
    }

    await submitFactCheckVerdict(selectedClaim.id, verdict, groundNotes.trim());
    setModalVisible(false);

    Alert.alert(
      language === 'mr' ? 'फॅक्ट-चेक प्रसिद्ध झाले!' : 'Fact-Check Published!',
      language === 'mr'
        ? 'आपला प्रत्यक्ष अहवाल मुख्य अॅपमध्ये भाविकांसाठी प्रसिद्ध झाला आहे.'
        : 'Your ground truth clarification has been published to pilgrims.'
    );
  };

  const getSectorName = (secId: string) => {
    const s = DUTY_SECTORS.find((x) => x.id === secId);
    return s ? (language === 'mr' ? s.mr : s.en) : secId;
  };

  return (
    <View style={styles.container}>
      <View style={styles.topHeader}>
        <Text style={styles.topTitle}>{t.factCheckTitle}</Text>
        <Text style={styles.topSub}>{t.factCheckSub}</Text>
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {factChecks.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="newspaper-outline" size={44} color={VeerColors.textMuted} />
            <Text style={styles.emptyTitle}>{t.noRumorsTitle}</Text>
            <Text style={styles.emptyDesc}>{t.noRumorsDesc}</Text>
          </View>
        ) : (
          factChecks.map((claim) => {
            const isUnverified = claim.status === 'UNVERIFIED';
            const isVerifiedTrue = claim.status === 'VERIFIED_TRUE';
            const isDebunkedFake = claim.status === 'DEBUNKED_FAKE';
            const title = language === 'mr' ? claim.claimTitle.mr : claim.claimTitle.en;

            return (
              <View key={claim.id} style={styles.claimCard}>
                <View style={styles.claimHeader}>
                  <View
                    style={[
                      styles.statusPill,
                      isUnverified && styles.statusUnverified,
                      isVerifiedTrue && styles.statusTrue,
                      isDebunkedFake && styles.statusFake,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusPillText,
                        isUnverified && { color: VeerColors.goldDark },
                        isVerifiedTrue && { color: VeerColors.success },
                        isDebunkedFake && { color: VeerColors.danger },
                      ]}
                    >
                      {isUnverified
                        ? t.unverifiedRumor
                        : isVerifiedTrue
                        ? 'VERIFIED TRUE'
                        : 'DEBUNKED FAKE'}
                    </Text>
                  </View>
                  <Text style={styles.claimTime}>{claim.timestamp}</Text>
                </View>

                <Text style={styles.claimTitleText}>{title}</Text>
                <Text style={styles.sourceText}>
                  {t.source}: {claim.claimSource} • {getSectorName(claim.sectorId)}
                </Text>

                {/* Clarification if already verified */}
                {claim.officialClarification ? (
                  <View style={styles.clarificationBox}>
                    <Text style={styles.clarificationHeading}>
                      {language === 'mr' ? 'प्रत्यक्ष ग्राउंड सत्य अहवाल:' : 'Ground Fact Truth:'}
                    </Text>
                    <Text style={styles.clarificationBody}>
                      {language === 'mr'
                        ? claim.officialClarification.mr
                        : claim.officialClarification.en}
                    </Text>
                  </View>
                ) : null}

                {/* Inspect & Verify Action Button */}
                <TouchableOpacity
                  style={styles.inspectActionBtn}
                  onPress={() => openFactCheckModal(claim)}
                  activeOpacity={0.85}
                >
                  <Ionicons name="search" size={15} color={VeerColors.white} />
                  <Text style={styles.inspectActionText}>
                    {isUnverified
                      ? t.inspectAndVerify
                      : language === 'mr'
                      ? 'स्पष्टीकरण अपडेट करा'
                      : 'Update Ground Verdict'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Fact Check Verdict Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t.inspectAndVerify}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={22} color={VeerColors.textMuted} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 380 }} showsVerticalScrollIndicator={false}>
              <View style={styles.claimSummaryBox}>
                <Text style={styles.claimSummaryTitle}>
                  {selectedClaim
                    ? language === 'mr'
                      ? selectedClaim.claimTitle.mr
                      : selectedClaim.claimTitle.en
                    : ''}
                </Text>
                <Text style={styles.claimSummarySub}>
                  {t.source}: {selectedClaim?.claimSource}
                </Text>
              </View>

              <Text style={styles.modalLabel}>{t.groundClarification} *</Text>
              <TextInput
                style={[styles.modalInput, { height: 90 }]}
                placeholder={t.factCheckPlaceholder}
                placeholderTextColor={VeerColors.textMuted}
                multiline
                value={groundNotes}
                onChangeText={setGroundNotes}
              />

              {/* Two Verdict Buttons */}
              <View style={styles.verdictRow}>
                <TouchableOpacity
                  style={styles.trueBtn}
                  onPress={() => handleVerdict('VERIFIED_TRUE')}
                  activeOpacity={0.85}
                >
                  <Ionicons name="checkmark-circle" size={16} color={VeerColors.white} />
                  <Text style={styles.verdictBtnText}>{t.markVerifiedTrue}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.fakeBtn}
                  onPress={() => handleVerdict('DEBUNKED_FAKE')}
                  activeOpacity={0.85}
                >
                  <Ionicons name="close-circle" size={16} color={VeerColors.white} />
                  <Text style={styles.verdictBtnText}>{t.markDebunkFake}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: VeerColors.background,
  },
  topHeader: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
  },
  topTitle: {
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.templeBrown,
  },
  topSub: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: VeerColors.textMuted,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 10,
    paddingBottom: 28,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 20,
    backgroundColor: VeerColors.cardBackground,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
  },
  emptyTitle: {
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.templeBrown,
    marginTop: 10,
  },
  emptyDesc: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: VeerColors.textMuted,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
  },
  claimCard: {
    backgroundColor: VeerColors.cardBackground,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
  },
  claimHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  statusPill: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    borderWidth: 1,
  },
  statusUnverified: {
    backgroundColor: VeerColors.goldSoft,
    borderColor: VeerColors.goldBorder,
  },
  statusTrue: {
    backgroundColor: VeerColors.successSoft,
    borderColor: VeerColors.successBorder,
  },
  statusFake: {
    backgroundColor: VeerColors.dangerSoft,
    borderColor: VeerColors.dangerBorder,
  },
  statusPillText: {
    fontSize: 10,
    fontFamily: 'Poppins_700Bold',
  },
  claimTime: {
    fontSize: 10.5,
    fontFamily: 'Poppins_400Regular',
    color: VeerColors.textMuted,
  },
  claimTitleText: {
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.templeBrown,
    lineHeight: 18,
  },
  sourceText: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: VeerColors.textMuted,
    marginTop: 4,
  },
  clarificationBox: {
    backgroundColor: VeerColors.surfaceHover,
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: VeerColors.riverBlue,
  },
  clarificationHeading: {
    fontSize: 10.5,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.riverBlueDark,
  },
  clarificationBody: {
    fontSize: 11.5,
    fontFamily: 'Poppins_400Regular',
    color: VeerColors.textSecondary,
    marginTop: 2,
    lineHeight: 15,
  },
  inspectActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: VeerColors.saffron,
    borderRadius: 8,
    paddingVertical: 9,
    gap: 6,
    marginTop: 10,
  },
  inspectActionText: {
    fontSize: 12.5,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: VeerColors.cardBackground,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: VeerColors.cardBorder,
  },
  modalTitle: {
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.templeBrown,
  },
  claimSummaryBox: {
    backgroundColor: VeerColors.surfaceHover,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
  },
  claimSummaryTitle: {
    fontSize: 12.5,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.templeBrown,
    lineHeight: 16,
  },
  claimSummarySub: {
    fontSize: 10.5,
    fontFamily: 'Poppins_400Regular',
    color: VeerColors.textMuted,
    marginTop: 2,
  },
  modalLabel: {
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
    color: VeerColors.textPrimary,
    marginBottom: 4,
  },
  modalInput: {
    backgroundColor: VeerColors.surfaceHover,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 12.5,
    fontFamily: 'Poppins_400Regular',
    color: VeerColors.textPrimary,
  },
  verdictRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
  },
  trueBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: VeerColors.success,
    borderRadius: 8,
    paddingVertical: 10,
    gap: 6,
  },
  fakeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: VeerColors.danger,
    borderRadius: 8,
    paddingVertical: 10,
    gap: 6,
  },
  verdictBtnText: {
    fontSize: 11.5,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.white,
  },
});

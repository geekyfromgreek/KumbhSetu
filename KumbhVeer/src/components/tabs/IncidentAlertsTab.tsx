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
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VeerColors } from '@/constants/colors';
import { useVolunteer } from '@/context/VolunteerContext';
import { GroundIncident } from '@/types/volunteer';
import { DUTY_SECTORS } from '@/constants/translations';
import { SwipeToConfirmButton } from '@/components/SwipeToConfirmButton';

export const IncidentAlertsTab: React.FC = () => {
  const {
    incidents,
    claimIncident,
    resolveIncidentOffline,
    dismissIncident,
    profile,
    language,
    t,
  } = useVolunteer();

  const [filterMode, setFilterMode] = useState<'my_sector' | 'all' | 'pending' | 'en_route'>('my_sector');
  const [selectedIncident, setSelectedIncident] = useState<GroundIncident | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [inspectionNotes, setInspectionNotes] = useState('');
  const [dismissReason, setDismissReason] = useState('');
  const [showDismissInput, setShowDismissInput] = useState(false);

  const openInspectionModal = (inc: GroundIncident) => {
    setSelectedIncident(inc);
    setInspectionNotes(inc.volunteerNotes || '');
    setShowDismissInput(false);
    setDismissReason('');
    setModalVisible(true);
  };

  const handleClaim = async (inc: GroundIncident) => {
    await claimIncident(inc.id);
    Alert.alert(
      language === 'mr' ? 'काम स्वीकारले!' : 'Task Claimed!',
      language === 'mr'
        ? `आपण ${inc.token} घटनास्थळी प्रत्यक्ष तपासणीसाठी जात आहात.`
        : `You are en route to inspect ${inc.token} on the ground.`
    );
  };

  const handleSwipeConfirmResolution = async () => {
    if (!selectedIncident) return;
    const notesToSave =
      inspectionNotes.trim() ||
      (language === 'mr'
        ? 'स्वयंसेवकाने प्रत्यक्ष जागेवर जाऊन पडताळणी केली व तक्रार निवारण केले.'
        : 'Volunteer physically inspected location and successfully resolved the issue.');

    await resolveIncidentOffline(selectedIncident.id, notesToSave);
    setTimeout(() => {
      setModalVisible(false);
    }, 600);
  };

  const handleDismiss = async () => {
    if (!selectedIncident) return;
    if (!dismissReason.trim()) {
      Alert.alert(
        language === 'mr' ? 'कारण आवश्यक आहे' : 'Reason Required',
        language === 'mr'
          ? 'कृपया तक्रार बाद करण्याचे कारण नमूद करा.'
          : 'Please enter why this report is dismissed.'
      );
      return;
    }

    await dismissIncident(selectedIncident.id, dismissReason.trim());
    setModalVisible(false);
  };

  const handleCallPilgrim = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const filteredIncidents = incidents.filter((inc) => {
    // Hide resolved in this active alerts tab
    if (inc.status === 'RESOLVED_OFFLINE' || inc.status === 'DISMISSED') {
      return false;
    }

    if (filterMode === 'my_sector') {
      return inc.sectorId === profile?.assignedSectorId;
    }
    if (filterMode === 'pending') {
      return inc.status === 'PENDING_VERIFICATION';
    }
    if (filterMode === 'en_route') {
      return inc.status === 'EN_ROUTE';
    }
    return true;
  });

  const getSectorName = (secId: string) => {
    const s = DUTY_SECTORS.find((x) => x.id === secId);
    return s ? (language === 'mr' ? s.mr : s.en) : secId;
  };

  return (
    <View style={styles.container}>
      {/* Top Filter Chips & Action Bar */}
      <View style={styles.topActionBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          <TouchableOpacity
            style={[styles.filterChip, filterMode === 'my_sector' && styles.filterChipActive]}
            onPress={() => setFilterMode('my_sector')}
          >
            <Ionicons
              name="location"
              size={12}
              color={filterMode === 'my_sector' ? VeerColors.saffronDark : VeerColors.textMuted}
            />
            <Text
              style={[
                styles.filterChipText,
                filterMode === 'my_sector' && styles.filterChipTextActive,
              ]}
            >
              {t.filterMySector}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, filterMode === 'pending' && styles.filterChipActive]}
            onPress={() => setFilterMode('pending')}
          >
            <Ionicons
              name="alert-circle"
              size={12}
              color={filterMode === 'pending' ? VeerColors.saffronDark : VeerColors.textMuted}
            />
            <Text
              style={[
                styles.filterChipText,
                filterMode === 'pending' && styles.filterChipTextActive,
              ]}
            >
              {t.filterPending}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, filterMode === 'en_route' && styles.filterChipActive]}
            onPress={() => setFilterMode('en_route')}
          >
            <Ionicons
              name="bicycle"
              size={12}
              color={filterMode === 'en_route' ? VeerColors.saffronDark : VeerColors.textMuted}
            />
            <Text
              style={[
                styles.filterChipText,
                filterMode === 'en_route' && styles.filterChipTextActive,
              ]}
            >
              {t.filterEnRoute}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, filterMode === 'all' && styles.filterChipActive]}
            onPress={() => setFilterMode('all')}
          >
            <Text
              style={[
                styles.filterChipText,
                filterMode === 'all' && styles.filterChipTextActive,
              ]}
            >
              {t.filterAll} ({incidents.filter((i) => i.status !== 'RESOLVED_OFFLINE' && i.status !== 'DISMISSED').length})
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Incidents Stream */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredIncidents.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="shield-checkmark-outline" size={44} color={VeerColors.success} />
            <Text style={styles.emptyTitle}>{t.noAlertsTitle}</Text>
            <Text style={styles.emptyDesc}>{t.noAlertsDesc}</Text>
          </View>
        ) : (
          filteredIncidents.map((inc) => {
            const isEnRoute = inc.status === 'EN_ROUTE';
            return (
              <View key={inc.id} style={[styles.incidentCard, isEnRoute && styles.cardEnRoute]}>
                {/* Header */}
                <View style={styles.cardHeader}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.tokenRow}>
                      <Text style={styles.tokenText}>{inc.token}</Text>
                      <View
                        style={[
                          styles.statusBadge,
                          isEnRoute ? styles.statusEnRoute : styles.statusPending,
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusBadgeText,
                            { color: isEnRoute ? VeerColors.goldDark : VeerColors.danger },
                          ]}
                        >
                          {isEnRoute ? t.enRouteBadge : 'Open Incident'}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.categoryTitle}>{inc.category}</Text>
                  </View>
                  <Text style={styles.timestampText}>{inc.timestamp}</Text>
                </View>

                {/* Location */}
                <View style={styles.locationBar}>
                  <Ionicons name="location" size={13} color={VeerColors.saffron} />
                  <Text style={styles.locationText} numberOfLines={1}>
                    {inc.location} ({getSectorName(inc.sectorId)})
                  </Text>
                </View>

                {/* Description */}
                <Text style={styles.descText}>{inc.description}</Text>

                {/* Overcharge Rates if any */}
                {inc.chargedAmt && inc.standardAmt ? (
                  <View style={styles.ratesBox}>
                    <View style={styles.rateCol}>
                      <Text style={styles.rateLabel}>{language === 'mr' ? 'आकारलेला दर' : 'Demanded'}</Text>
                      <Text style={[styles.rateVal, { color: VeerColors.danger }]}>{inc.chargedAmt}</Text>
                    </View>
                    <View style={styles.rateCol}>
                      <Text style={styles.rateLabel}>{language === 'mr' ? 'अधिकृत दर' : 'Official Cap'}</Text>
                      <Text style={[styles.rateVal, { color: VeerColors.success }]}>{inc.standardAmt}</Text>
                    </View>
                  </View>
                ) : null}

                {/* Pilgrim Contact if available */}
                {inc.pilgrimPhone && (
                  <TouchableOpacity
                    style={styles.pilgrimContactRow}
                    onPress={() => handleCallPilgrim(inc.pilgrimPhone!)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="call" size={12} color={VeerColors.riverBlue} />
                    <Text style={styles.pilgrimContactText}>
                      {t.reportedBy}: {inc.pilgrimName || 'Pilgrim'} ({inc.pilgrimPhone})
                    </Text>
                  </TouchableOpacity>
                )}

                {/* Action Buttons */}
                <View style={styles.actionRow}>
                  {!isEnRoute ? (
                    <TouchableOpacity
                      style={styles.claimBtn}
                      onPress={() => handleClaim(inc)}
                      activeOpacity={0.85}
                    >
                      <Ionicons name="bicycle" size={15} color={VeerColors.white} />
                      <Text style={styles.claimBtnText}>{t.claimTaskBtn}</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.inspectBtn}
                      onPress={() => openInspectionModal(inc)}
                      activeOpacity={0.85}
                    >
                      <Ionicons name="checkmark-done-circle" size={16} color={VeerColors.white} />
                      <Text style={styles.inspectBtnText}>{t.verifyOfflineBtn}</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Offline Ground Verification Modal with Swipe-To-Confirm */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>
                  {language === 'mr' ? 'प्रत्यक्ष घटना तपासणी' : 'Ground Incident Inspection'}
                </Text>
                <Text style={styles.modalSub}>
                  {selectedIncident?.token} • {selectedIncident?.location}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={22} color={VeerColors.textMuted} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 380 }} showsVerticalScrollIndicator={false}>
              <View style={styles.incidentSummaryBox}>
                <Text style={styles.summaryCategory}>{selectedIncident?.category}</Text>
                <Text style={styles.summaryDesc}>{selectedIncident?.description}</Text>
              </View>

              <Text style={styles.modalLabel}>{t.groundNotes}</Text>
              <TextInput
                style={[styles.modalInput, { height: 75 }]}
                placeholder={t.enterNotesPlaceholder}
                placeholderTextColor={VeerColors.textMuted}
                multiline
                value={inspectionNotes}
                onChangeText={setInspectionNotes}
              />

              {/* Swipe to Confirm Interactive Component */}
              <View style={{ marginTop: 14, marginBottom: 8 }}>
                <SwipeToConfirmButton
                  onConfirm={handleSwipeConfirmResolution}
                  label={t.swipeToConfirm}
                  confirmedLabel={t.swipeSuccess}
                />
              </View>

              {/* False Alarm / Dismiss section toggle */}
              {!showDismissInput ? (
                <TouchableOpacity
                  style={styles.dismissToggleBtn}
                  onPress={() => setShowDismissInput(true)}
                >
                  <Text style={styles.dismissToggleText}>{t.dismissReport}</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.dismissBox}>
                  <Text style={styles.modalLabel}>
                    {language === 'mr' ? 'रद्द करण्याचे कारण' : 'Dismissal Reason'}
                  </Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="e.g. False report / auto already departed"
                    placeholderTextColor={VeerColors.textMuted}
                    value={dismissReason}
                    onChangeText={setDismissReason}
                  />
                  <TouchableOpacity style={styles.confirmDismissBtn} onPress={handleDismiss}>
                    <Text style={styles.confirmDismissText}>Confirm Dismiss</Text>
                  </TouchableOpacity>
                </View>
              )}
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
  topActionBar: {
    paddingVertical: 4,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    gap: 6,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: VeerColors.cardBackground,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
    gap: 4,
  },
  filterChipActive: {
    backgroundColor: VeerColors.saffronSoft,
    borderColor: VeerColors.saffron,
  },
  filterChipText: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    color: VeerColors.textSecondary,
  },
  filterChipTextActive: {
    color: VeerColors.saffronDark,
    fontFamily: 'Poppins_700Bold',
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
  incidentCard: {
    backgroundColor: VeerColors.cardBackground,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
  },
  cardEnRoute: {
    borderColor: VeerColors.goldBorder,
    backgroundColor: '#FFFCF7',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  tokenText: {
    fontSize: 11.5,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.textMuted,
  },
  statusBadge: {
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 4,
    borderWidth: 1,
  },
  statusPending: {
    backgroundColor: VeerColors.dangerSoft,
    borderColor: VeerColors.dangerBorder,
  },
  statusEnRoute: {
    backgroundColor: VeerColors.goldSoft,
    borderColor: VeerColors.goldBorder,
  },
  statusBadgeText: {
    fontSize: 9.5,
    fontFamily: 'Poppins_700Bold',
  },
  categoryTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.templeBrown,
  },
  timestampText: {
    fontSize: 10.5,
    fontFamily: 'Poppins_400Regular',
    color: VeerColors.textMuted,
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
    marginBottom: 6,
  },
  locationText: {
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
    color: VeerColors.saffronDark,
    flex: 1,
  },
  descText: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: VeerColors.textSecondary,
    lineHeight: 16,
  },
  ratesBox: {
    flexDirection: 'row',
    backgroundColor: VeerColors.surfaceHover,
    borderRadius: 6,
    padding: 8,
    marginVertical: 6,
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
  },
  rateCol: {
    alignItems: 'center',
  },
  rateLabel: {
    fontSize: 9.5,
    fontFamily: 'Poppins_500Medium',
    color: VeerColors.textMuted,
  },
  rateVal: {
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
    marginTop: 1,
  },
  pilgrimContactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  pilgrimContactText: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    color: VeerColors.riverBlueDark,
  },
  actionRow: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: VeerColors.surfaceHover,
  },
  claimBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: VeerColors.saffron,
    borderRadius: 8,
    paddingVertical: 9,
    gap: 6,
  },
  claimBtnText: {
    fontSize: 12.5,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.white,
  },
  inspectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: VeerColors.success,
    borderRadius: 8,
    paddingVertical: 9,
    gap: 6,
  },
  inspectBtnText: {
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
    alignItems: 'flex-start',
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
  modalSub: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    color: VeerColors.saffronDark,
    marginTop: 1,
  },
  incidentSummaryBox: {
    backgroundColor: VeerColors.surfaceHover,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
  },
  summaryCategory: {
    fontSize: 12.5,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.templeBrown,
  },
  summaryDesc: {
    fontSize: 11.5,
    fontFamily: 'Poppins_400Regular',
    color: VeerColors.textSecondary,
    marginTop: 2,
    lineHeight: 15,
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
  dismissToggleBtn: {
    alignItems: 'center',
    paddingVertical: 6,
    marginTop: 4,
  },
  dismissToggleText: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: VeerColors.danger,
  },
  dismissBox: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: VeerColors.cardBorder,
  },
  confirmDismissBtn: {
    backgroundColor: VeerColors.danger,
    borderRadius: 6,
    paddingVertical: 7,
    alignItems: 'center',
    marginTop: 6,
  },
  confirmDismissText: {
    color: VeerColors.white,
    fontSize: 11.5,
    fontFamily: 'Poppins_700Bold',
  },
});

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
  Image,
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
    verifyAndSetSeverity,
    resolveIncidentOffline,
    dismissIncident,
    profile,
    language,
    t,
  } = useVolunteer();

  const [filterMode, setFilterMode] = useState<'my_sector' | 'all' | 'pending' | 'en_route'>('my_sector');
  const [selectedIncident, setSelectedIncident] = useState<GroundIncident | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [viewPhotoUrl, setViewPhotoUrl] = useState<string | null>(null);
  const [inspectionNotes, setInspectionNotes] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<'LOW' | 'MED' | 'HIGH'>('MED');
  const [dismissReason, setDismissReason] = useState('');
  const [showDismissInput, setShowDismissInput] = useState(false);

  const openInspectionModal = (inc: GroundIncident) => {
    setSelectedIncident(inc);
    setSelectedSeverity(inc.severity || 'MED');
    setInspectionNotes(inc.volunteerNotes || '');
    setShowDismissInput(false);
    setDismissReason('');
    setModalVisible(true);
  };

  const handleOpenPhoto = (url?: string) => {
    if (!url) return;
    setViewPhotoUrl(url);
    setPhotoModalVisible(true);
  };

  const handleOpenMapNavigation = (latitude?: number, longitude?: number, placeName?: string) => {
    if (latitude && longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      Linking.openURL(url);
    } else if (placeName) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Nashik Kumbh Mela ' + placeName)}`;
      Linking.openURL(url);
    }
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

  const handleSaveSeverityAndEscalate = async () => {
    if (!selectedIncident) return;
    await verifyAndSetSeverity(selectedIncident.id, selectedSeverity, inspectionNotes);
    Alert.alert(
      selectedSeverity === 'LOW'
        ? 'Severity Saved'
        : 'Escalated to Police Dashboard',
      selectedSeverity === 'LOW'
        ? 'Marked as Low severity for volunteer resolution.'
        : `Report ${selectedIncident.token} is now routed to Nashik Police Flying Squad Dashboard with ${selectedSeverity} severity!`
    );
    setModalVisible(false);
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

                {/* Location & GPS Map button */}
                <View style={styles.locationBar}>
                  <Ionicons name="location" size={13} color={VeerColors.saffron} />
                  <Text style={styles.locationText} numberOfLines={1}>
                    {inc.location} ({getSectorName(inc.sectorId)})
                  </Text>
                  {(inc.latitude || inc.location) && (
                    <TouchableOpacity
                      style={styles.navMapBtn}
                      onPress={() => handleOpenMapNavigation(inc.latitude, inc.longitude, inc.location)}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="navigate-circle" size={13} color="#2563EB" />
                      <Text style={styles.navMapBtnText}>Map</Text>
                    </TouchableOpacity>
                  )}
                </View>

                {/* Evidence Image and Severity Pill */}
                <View style={styles.cardEvidenceRow}>
                  {inc.imageUrl ? (
                    <TouchableOpacity
                      style={styles.cardEvidenceThumbWrapper}
                      onPress={() => handleOpenPhoto(inc.imageUrl)}
                      activeOpacity={0.8}
                    >
                      <Image source={{ uri: inc.imageUrl }} style={styles.cardEvidenceThumb} />
                      <View style={styles.photoZoomTag}>
                        <Ionicons name="expand" size={10} color="#FFFFFF" />
                      </View>
                    </TouchableOpacity>
                  ) : null}

                  <View style={{ flex: 1, gap: 4 }}>
                    {inc.severity && (
                      <View
                        style={[
                          styles.severityPill,
                          inc.severity === 'HIGH'
                            ? styles.sevPillHigh
                            : inc.severity === 'MED'
                            ? styles.sevPillMed
                            : styles.sevPillLow,
                        ]}
                      >
                        <Text style={styles.sevPillText}>
                          {inc.severity === 'HIGH' ? '🚨 HIGH SEVERITY' : inc.severity === 'MED' ? '⚠️ MED SEVERITY' : '🟢 LOW SEVERITY'}
                        </Text>
                      </View>
                    )}

                    {inc.escalatedToPolice && (
                      <View style={styles.policeEscalatedBadge}>
                        <Ionicons name="shield" size={11} color="#1E3A8A" />
                        <Text style={styles.policeEscalatedText}>Escalated to Police Flying Squad</Text>
                      </View>
                    )}
                  </View>
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

      {/* Offline Ground Verification Modal with 3-Stage Severity & Swipe-To-Confirm */}
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

            <ScrollView style={{ maxHeight: 440 }} showsVerticalScrollIndicator={false}>
              <View style={styles.incidentSummaryBox}>
                <Text style={styles.summaryCategory}>{selectedIncident?.category}</Text>
                <Text style={styles.summaryDesc}>{selectedIncident?.description}</Text>
                {selectedIncident?.imageUrl && (
                  <TouchableOpacity
                    style={styles.modalEvidenceRow}
                    onPress={() => handleOpenPhoto(selectedIncident.imageUrl)}
                  >
                    <Image source={{ uri: selectedIncident.imageUrl }} style={styles.modalEvidenceThumb} />
                    <Text style={styles.modalEvidenceText}>View Pilgrim Uploaded Photo</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* 3-Stage Severity Assessment */}
              <Text style={styles.modalLabel}>3-Stage Severity Verification:</Text>
              <View style={styles.modalSeverityRow}>
                {(['LOW', 'MED', 'HIGH'] as const).map((sev) => {
                  const isSelected = selectedSeverity === sev;
                  const cfg = {
                    LOW: { bg: '#ECFDF5', border: '#10B981', label: 'Low', sub: 'Minor on-ground settle' },
                    MED: { bg: '#FEF3C7', border: '#F59E0B', label: 'Med', sub: 'Overcharge / Fine' },
                    HIGH: { bg: '#FEE2E2', border: '#EF4444', label: 'High', sub: 'Police Squad Action' },
                  }[sev];

                  return (
                    <TouchableOpacity
                      key={sev}
                      style={[
                        styles.modalSevChip,
                        isSelected && { backgroundColor: cfg.bg, borderColor: cfg.border, borderWidth: 1.5 },
                      ]}
                      onPress={() => setSelectedSeverity(sev)}
                    >
                      <Text
                        style={[
                          styles.modalSevLabel,
                          isSelected && { color: cfg.border, fontFamily: 'Poppins_700Bold' },
                        ]}
                      >
                        {cfg.label}
                      </Text>
                      <Text style={styles.modalSevSub}>{cfg.sub}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {(selectedSeverity === 'MED' || selectedSeverity === 'HIGH') && (
                <TouchableOpacity
                  style={styles.escalatePoliceBtn}
                  onPress={handleSaveSeverityAndEscalate}
                  activeOpacity={0.85}
                >
                  <Ionicons name="shield-outline" size={16} color="#FFFFFF" />
                  <Text style={styles.escalatePoliceText}>
                    Forward & Escalate to Police Dashboard ({selectedSeverity})
                  </Text>
                </TouchableOpacity>
              )}

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

      {/* Full Photo Evidence Modal */}
      <Modal visible={photoModalVisible} transparent animationType="fade">
        <View style={styles.fullPhotoOverlay}>
          <TouchableOpacity
            style={styles.fullPhotoCloseBtn}
            onPress={() => setPhotoModalVisible(false)}
          >
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          {viewPhotoUrl ? (
            <Image
              source={{ uri: viewPhotoUrl }}
              style={styles.fullPhotoImage}
              resizeMode="contain"
            />
          ) : null}
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
  navMapBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  navMapBtnText: {
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
    color: '#2563EB',
  },
  cardEvidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginVertical: 4,
  },
  cardEvidenceThumbWrapper: {
    position: 'relative',
  },
  cardEvidenceThumb: {
    width: 50,
    height: 50,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
  },
  photoZoomTag: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: 4,
    padding: 2,
  },
  severityPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
  },
  sevPillHigh: {
    backgroundColor: '#FEE2E2',
    borderColor: '#EF4444',
  },
  sevPillMed: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
  },
  sevPillLow: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  sevPillText: {
    fontSize: 9.5,
    fontFamily: 'Poppins_700Bold',
    color: '#1F2937',
  },
  policeEscalatedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#93C5FD',
  },
  policeEscalatedText: {
    fontSize: 9,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1E3A8A',
  },
  descText: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: VeerColors.textSecondary,
    lineHeight: 16,
    marginTop: 2,
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
  modalEvidenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    padding: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  modalEvidenceThumb: {
    width: 38,
    height: 38,
    borderRadius: 4,
  },
  modalEvidenceText: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: '#2563EB',
  },
  modalSeverityRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  modalSevChip: {
    flex: 1,
    backgroundColor: VeerColors.surfaceHover,
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
    alignItems: 'center',
  },
  modalSevLabel: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: VeerColors.textPrimary,
  },
  modalSevSub: {
    fontSize: 8.5,
    fontFamily: 'Poppins_400Regular',
    color: VeerColors.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },
  escalatePoliceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#1E3A8A',
    borderRadius: 8,
    paddingVertical: 10,
    marginBottom: 12,
  },
  escalatePoliceText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontFamily: 'Poppins_700Bold',
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
  fullPhotoOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  fullPhotoCloseBtn: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 20,
    padding: 6,
  },
  fullPhotoImage: {
    width: '100%',
    height: '80%',
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Image,
  Linking,
  Platform,
} from 'react-native';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAdmin } from '@/context/AdminContext';
import { AdminGrievanceTicket } from '@/types/admin';
import { AdminColors } from '@/constants/colors';

export const PoliceDashboardTab: React.FC = () => {
  const { tickets, policeEnforceAction, currentOfficer, refreshAll } = useAdmin();

  const [filterSeverity, setFilterSeverity] = useState<'ALL_ACTIVE' | 'HIGH' | 'MED' | 'RESOLVED'>('ALL_ACTIVE');
  const [selectedTicket, setSelectedTicket] = useState<AdminGrievanceTicket | null>(null);
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [viewPhotoUrl, setViewPhotoUrl] = useState<string | null>(null);

  // Enforcement Form state
  const [punishmentType, setPunishmentType] = useState<AdminGrievanceTicket['punishmentType']>('CHALLAN_FINE');
  const [fineAmount, setFineAmount] = useState<string>('1000');
  const [policeNotes, setPoliceNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Filter escalated tickets
  const escalatedTickets = tickets.filter((t) => {
    const isMedOrHigh = t.severity === 'MED' || t.severity === 'HIGH' || !t.severity;
    if (filterSeverity === 'RESOLVED') {
      return t.status === 'RESOLVED';
    }
    if (t.status === 'RESOLVED') return false;

    if (filterSeverity === 'HIGH') {
      return t.severity === 'HIGH';
    }
    if (filterSeverity === 'MED') {
      return t.severity === 'MED';
    }
    return isMedOrHigh;
  });

  const highSeverityCount = tickets.filter((t) => t.severity === 'HIGH' && t.status !== 'RESOLVED').length;
  const medSeverityCount = tickets.filter((t) => t.severity === 'MED' && t.status !== 'RESOLVED').length;
  const resolvedCount = tickets.filter((t) => t.status === 'RESOLVED').length;

  const openActionModal = (ticket: AdminGrievanceTicket) => {
    setSelectedTicket(ticket);
    setPunishmentType(ticket.punishmentType || 'CHALLAN_FINE');
    setFineAmount(ticket.penaltyAmount ? String(ticket.penaltyAmount) : '1000');
    setPoliceNotes(ticket.actionSummary || ticket.resolutionNotes || '');
    setActionModalVisible(true);
  };

  const handleOpenPhoto = (url?: string) => {
    if (!url) return;
    setViewPhotoUrl(url);
    setPhotoModalVisible(true);
  };

  const handleOpenGpsMap = (latitude?: number, longitude?: number, locationText?: string) => {
    if (latitude && longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
      if (Platform.OS === 'web') {
        window.open(url, '_blank');
      } else {
        Linking.openURL(url);
      }
    } else if (locationText) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Nashik ' + locationText)}`;
      if (Platform.OS === 'web') {
        window.open(url, '_blank');
      } else {
        Linking.openURL(url);
      }
    }
  };

  const handleCallReporter = (phone?: string) => {
    if (!phone) return;
    Linking.openURL(`tel:${phone}`);
  };

  const handleExecutePoliceAction = async (status: 'RESOLVED' | 'UNRESOLVED' | 'SQUAD_DISPATCHED') => {
    if (!selectedTicket) return;
    setIsSubmitting(true);
    try {
      const penaltyNum = punishmentType === 'CHALLAN_FINE' ? Number(fineAmount) || 0 : 0;
      await policeEnforceAction({
        id: selectedTicket.id,
        status,
        punishmentType,
        penaltyAmount: penaltyNum,
        notes: policeNotes.trim() || `Police enforcement executed by ${currentOfficer.name}.`,
      });
      setActionModalVisible(false);
      refreshAll();
    } catch (e) {
      console.warn('Police action error:', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.screenWrapper}>
      <ScrollView
        style={styles.mainScrollView}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Compact Tactical Radar Header */}
        <View style={styles.compactRadarCard}>
          <View style={styles.radarCardLeft}>
            <View style={styles.policeIconCircle}>
              <FontAwesome5 name="shield-alt" size={18} color="#0284C7" />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.radarTitleRow}>
                <Text style={styles.radarTitleText}>Police Rapid Enforcement Radar</Text>
                <View style={styles.radarLiveBadge}>
                  <View style={styles.radarLiveDot} />
                  <Text style={styles.radarLiveText}>LIVE</Text>
                </View>
              </View>
              <Text style={styles.radarSubText} numberOfLines={1}>
                On Duty: <Text style={{ fontFamily: 'Poppins_600SemiBold', color: AdminColors.textPrimary }}>{currentOfficer.name}</Text> • Station: Ramkund Sector 1
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.syncBtn} onPress={refreshAll} activeOpacity={0.8}>
            <Ionicons name="refresh" size={15} color="#FFFFFF" />
            <Text style={styles.syncBtnText}>Sync</Text>
          </TouchableOpacity>
        </View>

        {/* Compact 3-Column Mini Stats Bar */}
        <View style={styles.miniStatsRow}>
          <TouchableOpacity
            style={[styles.miniStatBox, styles.miniStatBoxHigh, filterSeverity === 'HIGH' && styles.miniStatBoxActive]}
            onPress={() => setFilterSeverity('HIGH')}
            activeOpacity={0.8}
          >
            <View style={[styles.miniStatDot, { backgroundColor: '#EF4444' }]} />
            <View>
              <Text style={[styles.miniStatVal, { color: '#DC2626' }]}>{highSeverityCount}</Text>
              <Text style={styles.miniStatLabel}>High Priority</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.miniStatBox, styles.miniStatBoxMed, filterSeverity === 'MED' && styles.miniStatBoxActive]}
            onPress={() => setFilterSeverity('MED')}
            activeOpacity={0.8}
          >
            <View style={[styles.miniStatDot, { backgroundColor: '#F59E0B' }]} />
            <View>
              <Text style={[styles.miniStatVal, { color: '#D97706' }]}>{medSeverityCount}</Text>
              <Text style={styles.miniStatLabel}>Medium Watch</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.miniStatBox, styles.miniStatBoxResolved, filterSeverity === 'RESOLVED' && styles.miniStatBoxActive]}
            onPress={() => setFilterSeverity('RESOLVED')}
            activeOpacity={0.8}
          >
            <View style={[styles.miniStatDot, { backgroundColor: '#10B981' }]} />
            <View>
              <Text style={[styles.miniStatVal, { color: '#059669' }]}>{resolvedCount}</Text>
              <Text style={styles.miniStatLabel}>Resolved</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterPillsScroll}
        >
          <TouchableOpacity
            style={[styles.filterPill, filterSeverity === 'ALL_ACTIVE' && styles.filterPillActive]}
            onPress={() => setFilterSeverity('ALL_ACTIVE')}
          >
            <Text style={[styles.filterPillText, filterSeverity === 'ALL_ACTIVE' && styles.filterPillTextActive]}>
              All Active Reports ({highSeverityCount + medSeverityCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, filterSeverity === 'HIGH' && styles.filterPillActiveHigh]}
            onPress={() => setFilterSeverity('HIGH')}
          >
            <Text style={[styles.filterPillText, filterSeverity === 'HIGH' && styles.filterPillTextActiveHigh]}>
              🚨 High Priority ({highSeverityCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, filterSeverity === 'MED' && styles.filterPillActiveMed]}
            onPress={() => setFilterSeverity('MED')}
          >
            <Text style={[styles.filterPillText, filterSeverity === 'MED' && styles.filterPillTextActiveMed]}>
              ⚠️ Medium Severity ({medSeverityCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterPill, filterSeverity === 'RESOLVED' && styles.filterPillActiveResolved]}
            onPress={() => setFilterSeverity('RESOLVED')}
          >
            <Text style={[styles.filterPillText, filterSeverity === 'RESOLVED' && styles.filterPillTextActiveResolved]}>
              ✅ Resolved ({resolvedCount})
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Incidents Stream Header */}
        <View style={styles.listHeaderRow}>
          <Text style={styles.listHeaderTitle}>
            Incident Reports ({escalatedTickets.length})
          </Text>
          <Text style={styles.listHeaderSub}>
            Tap any report to review full photo evidence & enforce legal actions
          </Text>
        </View>

        {/* Incidents List */}
        {escalatedTickets.length === 0 ? (
          <View style={styles.emptyStateCard}>
            <MaterialCommunityIcons name="shield-check" size={48} color="#059669" />
            <Text style={styles.emptyStateTitle}>No Escalated Incidents</Text>
            <Text style={styles.emptyStateSub}>
              All reported areas in this category are compliant and cleared.
            </Text>
          </View>
        ) : (
          escalatedTickets.map((ticket) => {
            const isHigh = ticket.severity === 'HIGH';
            const isResolved = ticket.status === 'RESOLVED';

            return (
              <View key={ticket.id} style={[styles.reportCard, isHigh && styles.reportCardHighAlert]}>
                {/* Top Badge & Severity Bar */}
                <View style={styles.reportTopRow}>
                  <View style={styles.tokenContainer}>
                    <Text style={styles.tokenText}>{ticket.token}</Text>
                    <Text style={styles.timestampText}>• {ticket.timestamp}</Text>
                  </View>

                  <View style={styles.badgesContainer}>
                    <View
                      style={[
                        styles.severityBadge,
                        isHigh ? styles.sevHigh : ticket.severity === 'MED' ? styles.sevMed : styles.sevLow,
                      ]}
                    >
                      <Text
                        style={[
                          styles.severityText,
                          isHigh ? styles.sevHighText : ticket.severity === 'MED' ? styles.sevMedText : styles.sevLowText,
                        ]}
                      >
                        {isHigh ? '🚨 HIGH SEVERITY' : ticket.severity === 'MED' ? '⚠️ MED SEVERITY' : '🟢 LOW'}
                      </Text>
                    </View>

                    <View style={[styles.statusBadge, isResolved ? styles.statusResolved : styles.statusActive]}>
                      <Text style={[styles.statusBadgeText, isResolved && { color: '#047857' }]}>
                        {isResolved ? 'RESOLVED' : 'ACTION REQUIRED'}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Offender Title & Category */}
                <Text style={styles.reportOffenderTitle}>{ticket.vehicleOrShop}</Text>
                <Text style={styles.reportCategory}>{ticket.category}</Text>

                {/* Evidence Photo Banner (Prominent & Clear) */}
                {ticket.imageUrl ? (
                  <TouchableOpacity
                    style={styles.evidenceBannerWrapper}
                    onPress={() => handleOpenPhoto(ticket.imageUrl)}
                    activeOpacity={0.88}
                  >
                    <Image source={{ uri: ticket.imageUrl }} style={styles.evidenceBannerImage} />
                    <View style={styles.evidenceOverlayBadge}>
                      <Ionicons name="expand" size={13} color="#FFFFFF" />
                      <Text style={styles.evidenceOverlayText}>📷 Evidence Photo (Tap to Enlarge)</Text>
                    </View>
                  </TouchableOpacity>
                ) : null}

                {/* Location & GPS Navigation Button */}
                <View style={styles.locationBar}>
                  <Ionicons name="location" size={16} color="#DC2626" />
                  <Text style={styles.locationText} numberOfLines={2}>
                    {ticket.location}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.gpsMapNavRow}
                  onPress={() => handleOpenGpsMap(ticket.latitude, ticket.longitude, ticket.location)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="navigate-circle" size={16} color="#0284C7" />
                  <Text style={styles.gpsMapNavText}>
                    {ticket.latitude && ticket.longitude
                      ? `Open Police GPS Route (${ticket.latitude.toFixed(4)}, ${ticket.longitude.toFixed(4)})`
                      : 'Open Google Maps Navigation'}
                  </Text>
                  <Ionicons name="chevron-forward" size={14} color="#0284C7" />
                </TouchableOpacity>

                {/* Reporter Information */}
                {ticket.reporterName ? (
                  <View style={styles.reporterBox}>
                    <Text style={styles.reporterLabel}>
                      Reported By: <Text style={{ fontFamily: 'Poppins_600SemiBold', color: AdminColors.textPrimary }}>{ticket.reporterName}</Text>
                    </Text>
                    {ticket.reporterPhone ? (
                      <TouchableOpacity
                        style={styles.callReporterBtn}
                        onPress={() => handleCallReporter(ticket.reporterPhone)}
                      >
                        <Ionicons name="call" size={12} color="#0284C7" />
                        <Text style={styles.callReporterText}>{ticket.reporterPhone}</Text>
                      </TouchableOpacity>
                    ) : null}
                  </View>
                ) : null}

                {/* Punishment Issued Summary */}
                {ticket.punishmentType && ticket.punishmentType !== 'NONE' ? (
                  <View style={styles.punishmentBox}>
                    <Ionicons name="shield-checkmark" size={14} color="#059669" />
                    <Text style={styles.punishmentText}>
                      Action: {ticket.punishmentType}
                      {ticket.penaltyAmount ? ` • Fine ₹${ticket.penaltyAmount}` : ''}
                    </Text>
                  </View>
                ) : null}

                {/* Action Buttons */}
                <View style={styles.cardActionsRow}>
                  <TouchableOpacity
                    style={styles.enforceActionBtn}
                    onPress={() => openActionModal(ticket)}
                    activeOpacity={0.85}
                  >
                    <FontAwesome5 name="gavel" size={14} color="#FFFFFF" />
                    <Text style={styles.enforceActionBtnText}>
                      {isResolved ? 'Update Enforcement Record' : 'Visit, Fine & Take Action'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Enforcement & Fine Decision Modal */}
      <Modal visible={actionModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>Police Rapid Enforcement Order</Text>
                <Text style={styles.modalSub}>
                  Case: {selectedTicket?.token} • {selectedTicket?.vehicleOrShop}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setActionModalVisible(false)}>
                <Ionicons name="close" size={22} color="#64748B" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 460 }} showsVerticalScrollIndicator={false}>
              {/* Offender & Evidence Summary */}
              <View style={styles.modalSummaryBox}>
                <Text style={styles.modalSummaryOffender}>{selectedTicket?.vehicleOrShop}</Text>
                <Text style={styles.modalSummaryLocation}>📍 {selectedTicket?.location}</Text>
                {selectedTicket?.imageUrl ? (
                  <TouchableOpacity
                    style={styles.modalPhotoRow}
                    onPress={() => handleOpenPhoto(selectedTicket.imageUrl)}
                  >
                    <Image source={{ uri: selectedTicket.imageUrl }} style={styles.modalPhotoThumb} />
                    <Text style={styles.modalPhotoText}>Click to View Pilgrim Evidence Photo</Text>
                  </TouchableOpacity>
                ) : null}
              </View>

              {/* Punishment Selector */}
              <Text style={styles.formSectionLabel}>Select Legal Enforcement Action:</Text>
              <View style={styles.punishmentGrid}>
                {[
                  { id: 'CHALLAN_FINE', label: 'Levy Challan Fine (₹)', icon: 'receipt' },
                  { id: 'SHOP_SEALED', label: 'Seal Vendor Stall', icon: 'store-slash' },
                  { id: 'VEHICLE_IMPOUNDED', label: 'Impound Vehicle', icon: 'car-crash' },
                  { id: 'WARNING_ISSUED', label: 'Official Warning', icon: 'exclamation-triangle' },
                  { id: 'LICENSE_SUSPENDED', label: 'Suspend License', icon: 'ban' },
                ].map((item) => {
                  const isSelected = punishmentType === item.id;
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={[styles.punishmentChip, isSelected && styles.punishmentChipSelected]}
                      onPress={() => setPunishmentType(item.id as any)}
                    >
                      <FontAwesome5
                        name={item.icon as any}
                        size={13}
                        color={isSelected ? '#0284C7' : '#64748B'}
                      />
                      <Text style={[styles.punishmentChipText, isSelected && styles.punishmentChipTextSelected]}>
                        {item.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Fine Amount Input if Challan Fine selected */}
              {punishmentType === 'CHALLAN_FINE' ? (
                <View style={styles.fineInputSection}>
                  <Text style={styles.formSectionLabel}>Challan Penalty Amount (₹):</Text>
                  <View style={styles.quickFineRow}>
                    {['500', '1000', '2500', '5000'].map((amt) => (
                      <TouchableOpacity
                        key={amt}
                        style={[styles.quickFineBtn, fineAmount === amt && styles.quickFineBtnActive]}
                        onPress={() => setFineAmount(amt)}
                      >
                        <Text style={[styles.quickFineText, fineAmount === amt && styles.quickFineTextActive]}>
                          ₹{amt}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <TextInput
                    style={styles.fineInput}
                    placeholder="Custom Fine Amount (e.g. 1500)"
                    placeholderTextColor="#94A3B8"
                    value={fineAmount}
                    onChangeText={setFineAmount}
                    keyboardType="numeric"
                  />
                </View>
              ) : null}

              {/* Police Incident Notes */}
              <Text style={[styles.formSectionLabel, { marginTop: 12 }]}>Police Report / Action Notes:</Text>
              <TextInput
                style={styles.notesInput}
                placeholder="Enter details of on-ground visit, fine receipt number, or vendor statement..."
                placeholderTextColor="#94A3B8"
                multiline
                value={policeNotes}
                onChangeText={setPoliceNotes}
              />

              {/* Resolution Decision Buttons */}
              <View style={styles.decisionActionsCol}>
                <TouchableOpacity
                  style={[styles.resolveDecisionBtn, isSubmitting && { opacity: 0.7 }]}
                  onPress={() => handleExecutePoliceAction('RESOLVED')}
                  disabled={isSubmitting}
                >
                  <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
                  <Text style={styles.resolveDecisionText}>
                    Confirm Action & Mark RESOLVED
                  </Text>
                </TouchableOpacity>

                <View style={styles.secondaryDecisionRow}>
                  <TouchableOpacity
                    style={styles.dispatchSquadBtn}
                    onPress={() => handleExecutePoliceAction('SQUAD_DISPATCHED')}
                    disabled={isSubmitting}
                  >
                    <Ionicons name="car-sport" size={15} color="#0284C7" />
                    <Text style={styles.dispatchSquadText}>Squad En Route</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.unresolveBtn}
                    onPress={() => handleExecutePoliceAction('UNRESOLVED')}
                    disabled={isSubmitting}
                  >
                    <Ionicons name="close-circle" size={15} color="#DC2626" />
                    <Text style={styles.unresolveText}>Mark Unresolved</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* High-Res Photo Evidence Modal */}
      <Modal visible={photoModalVisible} transparent animationType="fade">
        <View style={styles.fullPhotoOverlay}>
          <TouchableOpacity style={styles.fullPhotoCloseBtn} onPress={() => setPhotoModalVisible(false)}>
            <Ionicons name="close" size={26} color="#FFFFFF" />
          </TouchableOpacity>
          {viewPhotoUrl ? (
            <Image source={{ uri: viewPhotoUrl }} style={styles.fullPhotoImage} resizeMode="contain" />
          ) : null}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
    backgroundColor: AdminColors.background,
  },
  mainScrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 16,
    paddingBottom: 140, // Generous padding so cards are never cut off by bottom nav
  },
  compactRadarCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: AdminColors.cardBackground,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
    gap: 10,
  },
  radarCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  policeIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F0F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  radarTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  radarTitleText: {
    fontSize: 13.5,
    fontFamily: 'Poppins_700Bold',
    color: AdminColors.textPrimary,
  },
  radarLiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  radarLiveDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#EF4444',
  },
  radarLiveText: {
    fontSize: 8.5,
    fontFamily: 'Poppins_700Bold',
    color: '#B91C1C',
  },
  radarSubText: {
    fontSize: 10.5,
    fontFamily: 'Poppins_400Regular',
    color: AdminColors.textMuted,
    marginTop: 1,
  },
  syncBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#0284C7',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  syncBtnText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
  },
  miniStatsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  miniStatBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: AdminColors.cardBackground,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
  },
  miniStatBoxHigh: {
    borderLeftWidth: 3,
    borderLeftColor: '#EF4444',
  },
  miniStatBoxMed: {
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B',
  },
  miniStatBoxResolved: {
    borderLeftWidth: 3,
    borderLeftColor: '#10B981',
  },
  miniStatBoxActive: {
    backgroundColor: '#F8FAFC',
    borderColor: '#0284C7',
  },
  miniStatDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  miniStatVal: {
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
    lineHeight: 18,
  },
  miniStatLabel: {
    fontSize: 9.5,
    fontFamily: 'Poppins_500Medium',
    color: AdminColors.textMuted,
  },
  filterPillsScroll: {
    flexDirection: 'row',
    gap: 6,
    paddingBottom: 6,
    marginBottom: 10,
  },
  filterPill: {
    backgroundColor: AdminColors.cardBackground,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
  },
  filterPillActive: {
    backgroundColor: '#0284C7',
    borderColor: '#0284C7',
  },
  filterPillActiveHigh: {
    backgroundColor: '#DC2626',
    borderColor: '#DC2626',
  },
  filterPillActiveMed: {
    backgroundColor: '#D97706',
    borderColor: '#D97706',
  },
  filterPillActiveResolved: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  filterPillText: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    color: AdminColors.textSecondary,
  },
  filterPillTextActive: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
  },
  filterPillTextActiveHigh: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
  },
  filterPillTextActiveMed: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
  },
  filterPillTextActiveResolved: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
  },
  listHeaderRow: {
    marginBottom: 10,
  },
  listHeaderTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: AdminColors.textPrimary,
  },
  listHeaderSub: {
    fontSize: 10.5,
    fontFamily: 'Poppins_400Regular',
    color: AdminColors.textMuted,
    marginTop: 1,
  },
  emptyStateCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 36,
    backgroundColor: AdminColors.cardBackground,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    marginTop: 10,
  },
  emptyStateTitle: {
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
    color: AdminColors.textPrimary,
    marginTop: 8,
  },
  emptyStateSub: {
    fontSize: 11.5,
    fontFamily: 'Poppins_400Regular',
    color: AdminColors.textMuted,
    textAlign: 'center',
    marginTop: 3,
  },
  reportCard: {
    backgroundColor: AdminColors.cardBackground,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  reportCardHighAlert: {
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  reportTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
    gap: 6,
  },
  tokenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tokenText: {
    fontSize: 12.5,
    fontFamily: 'Poppins_700Bold',
    color: AdminColors.textPrimary,
  },
  timestampText: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: AdminColors.textMuted,
  },
  badgesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  severityBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 5,
  },
  sevHigh: {
    backgroundColor: '#FEE2E2',
  },
  sevMed: {
    backgroundColor: '#FEF3C7',
  },
  sevLow: {
    backgroundColor: '#D1FAE5',
  },
  severityText: {
    fontSize: 9.5,
    fontFamily: 'Poppins_700Bold',
  },
  sevHighText: {
    color: '#B91C1C',
  },
  sevMedText: {
    color: '#B45309',
  },
  sevLowText: {
    color: '#047857',
  },
  statusBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 5,
  },
  statusActive: {
    backgroundColor: '#EFF6FF',
  },
  statusResolved: {
    backgroundColor: '#D1FAE5',
  },
  statusBadgeText: {
    fontSize: 9.5,
    fontFamily: 'Poppins_700Bold',
    color: '#0284C7',
  },
  reportOffenderTitle: {
    fontSize: 15.5,
    fontFamily: 'Poppins_700Bold',
    color: AdminColors.textPrimary,
  },
  reportCategory: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    color: AdminColors.saffron,
    marginTop: 1,
    marginBottom: 8,
  },
  evidenceBannerWrapper: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
    marginBottom: 10,
    position: 'relative',
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
  },
  evidenceBannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  evidenceOverlayBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.82)',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  evidenceOverlayText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    color: AdminColors.textSecondary,
    flex: 1,
    lineHeight: 17,
  },
  gpsMapNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F0F9FF',
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    marginBottom: 10,
  },
  gpsMapNavText: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: '#0284C7',
    flex: 1,
    marginHorizontal: 6,
  },
  reporterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: AdminColors.inputBackground,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    marginBottom: 10,
    flexWrap: 'wrap',
    gap: 6,
  },
  reporterLabel: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: AdminColors.textMuted,
  },
  callReporterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  callReporterText: {
    fontSize: 10.5,
    fontFamily: 'Poppins_600SemiBold',
    color: '#0284C7',
  },
  punishmentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 10,
  },
  punishmentText: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: '#047857',
  },
  cardActionsRow: {
    marginTop: 2,
  },
  enforceActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#0284C7',
    paddingVertical: 11,
    borderRadius: 9,
  },
  enforceActionBtnText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontFamily: 'Poppins_700Bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: AdminColors.cardBackground,
    borderRadius: 18,
    padding: 20,
    width: '100%',
    maxWidth: 520,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: AdminColors.cardBorder,
    paddingBottom: 12,
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: AdminColors.textPrimary,
  },
  modalSub: {
    fontSize: 11.5,
    fontFamily: 'Poppins_500Medium',
    color: AdminColors.textMuted,
    marginTop: 2,
  },
  modalSummaryBox: {
    backgroundColor: AdminColors.inputBackground,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    marginBottom: 14,
  },
  modalSummaryOffender: {
    fontSize: 13.5,
    fontFamily: 'Poppins_700Bold',
    color: AdminColors.textPrimary,
  },
  modalSummaryLocation: {
    fontSize: 11.5,
    fontFamily: 'Poppins_500Medium',
    color: AdminColors.textSecondary,
    marginTop: 2,
  },
  modalPhotoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    backgroundColor: '#EFF6FF',
    padding: 6,
    borderRadius: 8,
  },
  modalPhotoThumb: {
    width: 36,
    height: 36,
    borderRadius: 6,
  },
  modalPhotoText: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: '#0284C7',
  },
  formSectionLabel: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: AdminColors.textPrimary,
    marginBottom: 8,
  },
  punishmentGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },
  punishmentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: AdminColors.inputBackground,
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
  },
  punishmentChipSelected: {
    backgroundColor: '#F0F9FF',
    borderColor: '#0284C7',
  },
  punishmentChipText: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    color: AdminColors.textSecondary,
  },
  punishmentChipTextSelected: {
    color: '#0284C7',
    fontFamily: 'Poppins_700Bold',
  },
  fineInputSection: {
    marginBottom: 12,
  },
  quickFineRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 8,
  },
  quickFineBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 7,
    backgroundColor: AdminColors.inputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
  },
  quickFineBtnActive: {
    backgroundColor: '#0284C7',
    borderColor: '#0284C7',
  },
  quickFineText: {
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
    color: AdminColors.textPrimary,
  },
  quickFineTextActive: {
    color: '#FFFFFF',
  },
  fineInput: {
    backgroundColor: AdminColors.inputBackground,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 42,
    fontSize: 13,
    fontFamily: 'Poppins_500Medium',
    color: AdminColors.textPrimary,
  },
  notesInput: {
    backgroundColor: AdminColors.inputBackground,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    borderRadius: 8,
    padding: 10,
    height: 70,
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: AdminColors.textPrimary,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  decisionActionsCol: {
    gap: 8,
  },
  resolveDecisionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 10,
  },
  resolveDecisionText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
  },
  secondaryDecisionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dispatchSquadBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: '#F0F9FF',
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  dispatchSquadText: {
    color: '#0284C7',
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
  },
  unresolveBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    backgroundColor: '#FEF2F2',
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  unresolveText: {
    color: '#DC2626',
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
  },
  fullPhotoOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.94)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  fullPhotoCloseBtn: {
    position: 'absolute',
    top: 30,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  fullPhotoImage: {
    width: '100%',
    height: '80%',
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  Image,
  Linking,
  Platform,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { AdminColors } from '@/constants/colors';
import { useAdmin } from '@/context/AdminContext';
import { AdminGrievanceTicket } from '@/types/admin';

export const GrievanceEnforcementTab: React.FC = () => {
  const {
    tickets,
    addTicket,
    updateTicketStatus,
    deleteTicket,
    clearAllTickets,
    currentOfficer,
    refreshAll,
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'REGISTERED' | 'SQUAD_DISPATCHED' | 'FINE_ISSUED' | 'RESOLVED'>('all');

  // Modal State for Action / Investigation
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<AdminGrievanceTicket | null>(null);
  const [actionSummary, setActionSummary] = useState('');
  const [actionPenaltyAmount, setActionPenaltyAmount] = useState('');
  const [actionNewStatus, setActionNewStatus] = useState<AdminGrievanceTicket['status']>('FINE_ISSUED');

  // Photo & GPS Modal State
  const [photoModalVisible, setPhotoModalVisible] = useState(false);
  const [viewPhotoUrl, setViewPhotoUrl] = useState<string | null>(null);

  // Modal State for Manual Ticket Log
  const [logModalVisible, setLogModalVisible] = useState(false);
  const [category, setCategory] = useState('Transit Auto Extortion');
  const [vehicleOrShop, setVehicleOrShop] = useState('');
  const [location, setLocation] = useState('');
  const [standardAmt, setStandardAmt] = useState('');
  const [chargedAmt, setChargedAmt] = useState('');

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

  const openActionModal = (ticket: AdminGrievanceTicket) => {
    setSelectedTicket(ticket);
    setActionSummary(ticket.actionSummary || '');
    setActionPenaltyAmount(ticket.penaltyAmount ? ticket.penaltyAmount.toString() : '');
    setActionNewStatus(ticket.status === 'REGISTERED' ? 'SQUAD_DISPATCHED' : ticket.status);
    setActionModalVisible(true);
  };

  const handleSaveAction = async () => {
    if (!selectedTicket) return;

    const penalty = parseFloat(actionPenaltyAmount) || undefined;
    await updateTicketStatus(
      selectedTicket.id,
      actionNewStatus,
      actionSummary.trim() || undefined,
      penalty
    );
    setActionModalVisible(false);
  };

  const handleSaveNewTicket = async () => {
    if (!vehicleOrShop.trim() || !location.trim()) {
      Alert.alert('Validation Error', 'Offender Name / Vehicle and Location are required.');
      return;
    }

    await addTicket({
      category: category.trim(),
      vehicleOrShop: vehicleOrShop.trim(),
      location: location.trim(),
      standardAmt: standardAmt.trim() || '₹25',
      chargedAmt: chargedAmt.trim() || '₹100',
      status: 'REGISTERED',
      assignedOfficer: currentOfficer.name,
    });

    setLogModalVisible(false);
    // Reset
    setVehicleOrShop('');
    setLocation('');
    setStandardAmt('');
    setChargedAmt('');
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.token.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.vehicleOrShop.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: AdminGrievanceTicket['status']) => {
    switch (status) {
      case 'REGISTERED':
        return {
          bg: '#FEE2E2',
          border: '#FECACA',
          color: '#DC2626',
          label: 'OPEN INCIDENT',
          icon: 'alert-circle' as const,
        };
      case 'SQUAD_DISPATCHED':
        return {
          bg: '#FEF3C7',
          border: '#FDE68A',
          color: '#D97706',
          label: 'SQUAD DISPATCHED',
          icon: 'bicycle' as const,
        };
      case 'FINE_ISSUED':
        return {
          bg: '#D1FAE5',
          border: '#A7F3D0',
          color: '#059669',
          label: 'FINE LEVIED',
          icon: 'receipt' as const,
        };
      case 'RESOLVED':
      default:
        return {
          bg: '#EFF6FF',
          border: '#BAE6FD',
          color: '#0284C7',
          label: 'RESOLVED',
          icon: 'checkmark-done-circle' as const,
        };
    }
  };

  const openCount = tickets.filter((t) => t.status === 'REGISTERED').length;
  const dispatchedCount = tickets.filter((t) => t.status === 'SQUAD_DISPATCHED').length;
  const fineCount = tickets.filter((t) => t.status === 'FINE_ISSUED').length;
  const resolvedCount = tickets.filter((t) => t.status === 'RESOLVED').length;

  return (
    <View style={styles.container}>
      {/* Action Bar */}
      <View style={styles.topBar}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color={AdminColors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search ticket, vendor, vehicle..."
            placeholderTextColor={AdminColors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={16} color={AdminColors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.logBtn} onPress={() => setLogModalVisible(true)} activeOpacity={0.8}>
          <Ionicons name="add" size={18} color={AdminColors.white} />
          <Text style={styles.logBtnText}>+ Log Incident</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs - Constrained to 44px height */}
      <View style={styles.filterScrollWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScrollView}
          contentContainerStyle={styles.filterScroll}
        >
          <TouchableOpacity
            style={[styles.filterChip, filterStatus === 'all' && styles.filterChipActive]}
            onPress={() => setFilterStatus('all')}
          >
            <Text style={[styles.filterChipText, filterStatus === 'all' && styles.filterChipTextActive]}>
              All ({tickets.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, filterStatus === 'REGISTERED' && styles.filterChipActiveRegistered]}
            onPress={() => setFilterStatus('REGISTERED')}
          >
            <Text style={[styles.filterChipText, filterStatus === 'REGISTERED' && styles.filterChipTextActiveRegistered]}>
              🚨 Urgent ({openCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, filterStatus === 'SQUAD_DISPATCHED' && styles.filterChipActiveDispatched]}
            onPress={() => setFilterStatus('SQUAD_DISPATCHED')}
          >
            <Text style={[styles.filterChipText, filterStatus === 'SQUAD_DISPATCHED' && styles.filterChipTextActiveDispatched]}>
              ⏳ Dispatched ({dispatchedCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, filterStatus === 'FINE_ISSUED' && styles.filterChipActiveFine]}
            onPress={() => setFilterStatus('FINE_ISSUED')}
          >
            <Text style={[styles.filterChipText, filterStatus === 'FINE_ISSUED' && styles.filterChipTextActiveFine]}>
              💵 Fined ({fineCount})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterChip, filterStatus === 'RESOLVED' && styles.filterChipActiveResolved]}
            onPress={() => setFilterStatus('RESOLVED')}
          >
            <Text style={[styles.filterChipText, filterStatus === 'RESOLVED' && styles.filterChipTextActiveResolved]}>
              ✅ Resolved ({resolvedCount})
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Main List */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredTickets.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="shield-checkmark-outline" size={48} color="#059669" />
            <Text style={styles.emptyStateTitle}>All Clear & Compliant</Text>
            <Text style={styles.emptyStateDesc}>
              {searchQuery
                ? 'No grievances match the search filter.'
                : 'No active incident reports in this section. New reports filed by Yatris or Volunteers will stream here in real-time.'}
            </Text>
          </View>
        ) : (
          filteredTickets.map((ticket) => {
            const badge = getStatusBadge(ticket.status);
            return (
              <View key={ticket.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.ticketTopRow}>
                      <Text style={styles.ticketNumberText}>{ticket.token}</Text>
                      <View style={styles.headerRightActions}>
                        <View style={[styles.statusBadge, { backgroundColor: badge.bg, borderColor: badge.border }]}>
                          <Ionicons name={badge.icon} size={11} color={badge.color} />
                          <Text style={[styles.statusBadgeText, { color: badge.color }]}>{badge.label}</Text>
                        </View>
                        <TouchableOpacity
                          style={styles.deleteTicketBtn}
                          onPress={() => deleteTicket(ticket.id)}
                          activeOpacity={0.7}
                        >
                          <Ionicons name="trash-outline" size={14} color="#DC2626" />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <Text style={styles.offenderText}>
                      Offender: <Text style={{ color: AdminColors.saffron }}>{ticket.vehicleOrShop}</Text>
                    </Text>
                    <Text style={styles.pilgrimText}>
                      Category: {ticket.category} • Logged: {ticket.timestamp}
                    </Text>
                  </View>
                </View>

                {/* Prominent Evidence Image Banner */}
                {ticket.imageUrl ? (
                  <TouchableOpacity
                    style={styles.evidenceBannerWrapper}
                    onPress={() => handleOpenPhoto(ticket.imageUrl)}
                    activeOpacity={0.88}
                  >
                    <Image
                      source={{ uri: ticket.imageUrl }}
                      style={styles.evidenceBannerImage}
                      resizeMode="cover"
                    />
                    <View style={styles.evidenceOverlayBadge}>
                      <Ionicons name="expand" size={13} color="#FFFFFF" />
                      <Text style={styles.evidenceOverlayText}>📷 Evidence Photo (Tap to Enlarge)</Text>
                    </View>
                  </TouchableOpacity>
                ) : null}

                {/* Overcharge Metrics Bar */}
                <View style={styles.metricsBar}>
                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>Extorted / Charged</Text>
                    <Text style={[styles.metricVal, { color: AdminColors.crimson }]}>
                      {ticket.chargedAmt}
                    </Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>Official Cap</Text>
                    <Text style={[styles.metricVal, { color: AdminColors.emerald }]}>
                      {ticket.standardAmt}
                    </Text>
                  </View>
                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>Assigned Unit</Text>
                    <Text style={[styles.metricVal, { color: AdminColors.gold, fontSize: 11 }]} numberOfLines={1}>
                      {ticket.assignedOfficer}
                    </Text>
                  </View>
                </View>

                {/* Location & GPS Row */}
                <View style={styles.locationBar}>
                  <Ionicons name="location" size={14} color={AdminColors.saffron} style={{ marginTop: 2 }} />
                  <Text style={styles.locationText} numberOfLines={2}>{ticket.location}</Text>
                </View>

                <View style={styles.actionLinksRow}>
                  <TouchableOpacity
                    style={styles.gpsNavBtn}
                    onPress={() => handleOpenGpsMap(ticket.latitude, ticket.longitude, ticket.location)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="navigate-circle" size={14} color="#0284C7" />
                    <Text style={styles.gpsNavBtnText}>
                      {ticket.latitude && ticket.longitude
                        ? `GPS: ${ticket.latitude.toFixed(4)}, ${ticket.longitude.toFixed(4)}`
                        : 'Google Maps Navigation'}
                    </Text>
                  </TouchableOpacity>

                  {ticket.reporterPhone ? (
                    <TouchableOpacity
                      style={styles.callReporterBtn}
                      onPress={() => handleCallReporter(ticket.reporterPhone)}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="call" size={12} color="#059669" />
                      <Text style={styles.callReporterText}>Call Pilgrim</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>

                {/* Enforcement Summary if any */}
                {ticket.actionSummary ? (
                  <View style={styles.officerNotesBox}>
                    <Ionicons name="document-text" size={14} color={AdminColors.skyBlue} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.officerNotesTitle}>Enforcement Dispatch Log:</Text>
                      <Text style={styles.officerNotesBody}>{ticket.actionSummary}</Text>
                      {ticket.penaltyAmount ? (
                        <Text style={styles.fineNotice}>
                          Penalty Levied: ₹{ticket.penaltyAmount} (Official Receipt Issued)
                        </Text>
                      ) : null}
                    </View>
                  </View>
                ) : null}

                {/* Action Button */}
                <TouchableOpacity
                  style={styles.takeActionBtn}
                  onPress={() => openActionModal(ticket)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="shield-checkmark" size={16} color={AdminColors.white} />
                  <Text style={styles.takeActionBtnText}>
                    {ticket.status === 'REGISTERED'
                      ? 'Dispatch Squad / Take Action'
                      : 'Update Investigation / Fine'}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Modal: Squad Enforcement Action */}
      <Modal visible={actionModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Enforcement Squad Dispatch</Text>
              <TouchableOpacity onPress={() => setActionModalVisible(false)}>
                <Ionicons name="close" size={24} color={AdminColors.textLight} />
              </TouchableOpacity>
            </View>

            {selectedTicket && (
              <ScrollView style={{ maxHeight: 420 }}>
                <View style={styles.ticketSummaryBox}>
                  <Text style={styles.summaryTitle}>
                    Ticket: {selectedTicket.token} • {selectedTicket.vehicleOrShop}
                  </Text>
                  <Text style={styles.summarySub}>
                    Charge: {selectedTicket.chargedAmt} vs {selectedTicket.standardAmt} at {selectedTicket.location}
                  </Text>
                  {selectedTicket.imageUrl ? (
                    <TouchableOpacity
                      style={styles.modalPhotoRow}
                      onPress={() => handleOpenPhoto(selectedTicket.imageUrl)}
                    >
                      <Image source={{ uri: selectedTicket.imageUrl }} style={styles.modalPhotoThumb} />
                      <Text style={styles.modalPhotoText}>View Uploaded Evidence Photo</Text>
                    </TouchableOpacity>
                  ) : null}
                </View>

                <Text style={styles.inputLabel}>Investigation Status</Text>
                <View style={styles.statusPillRow}>
                  {(['REGISTERED', 'SQUAD_DISPATCHED', 'FINE_ISSUED', 'RESOLVED'] as const).map((st) => (
                    <TouchableOpacity
                      key={st}
                      style={[
                        styles.statusPill,
                        actionNewStatus === st && styles.statusPillActive,
                        actionNewStatus === st && st === 'FINE_ISSUED' && { backgroundColor: AdminColors.emerald },
                        actionNewStatus === st && st === 'SQUAD_DISPATCHED' && { backgroundColor: AdminColors.gold },
                        actionNewStatus === st && st === 'REGISTERED' && { backgroundColor: AdminColors.crimson },
                      ]}
                      onPress={() => setActionNewStatus(st)}
                    >
                      <Text
                        style={[
                          styles.statusPillText,
                          actionNewStatus === st && styles.statusPillTextActive,
                        ]}
                      >
                        {st.replace('_', ' ')}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.inputLabel}>Squad Enforcement Notes / Action Log</Text>
                <TextInput
                  style={[styles.modalInput, { height: 75 }]}
                  placeholder="e.g. Flying squad intercepted auto MH-15-AB-1234. Refunded ₹50 to pilgrim and issued challan."
                  placeholderTextColor={AdminColors.textMuted}
                  multiline
                  value={actionSummary}
                  onChangeText={setActionSummary}
                />

                <Text style={styles.inputLabel}>Fine / Penalty Levied (₹)</Text>
                <TextInput
                  style={[styles.modalInput, { borderColor: AdminColors.emerald, color: AdminColors.emerald }]}
                  placeholder="e.g. 500"
                  placeholderTextColor={AdminColors.textMuted}
                  keyboardType="numeric"
                  value={actionPenaltyAmount}
                  onChangeText={setActionPenaltyAmount}
                />
              </ScrollView>
            )}

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setActionModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveAction}>
                <Text style={styles.saveBtnText}>Commit Action</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal: Log New Complaint */}
      <Modal visible={logModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Log Pilgrim Overcharge Incident</Text>
              <TouchableOpacity onPress={() => setLogModalVisible(false)}>
                <Ionicons name="close" size={24} color={AdminColors.textLight} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 420 }}>
              <Text style={styles.inputLabel}>Category</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. Transit Auto Extortion / Shop Overpricing"
                placeholderTextColor={AdminColors.textMuted}
                value={category}
                onChangeText={setCategory}
              />

              <Text style={styles.inputLabel}>Offender Name / Vehicle / Stall Number *</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. MH 15 AK 4567 or Stall R-108"
                placeholderTextColor={AdminColors.textMuted}
                value={vehicleOrShop}
                onChangeText={setVehicleOrShop}
              />

              <Text style={styles.inputLabel}>Location / Landmark *</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. Tapovan Parking Gate 2"
                placeholderTextColor={AdminColors.textMuted}
                value={location}
                onChangeText={setLocation}
              />

              <View style={styles.inputGrid}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={styles.inputLabel}>Demanded Amount</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="₹150"
                    placeholderTextColor={AdminColors.textMuted}
                    value={chargedAmt}
                    onChangeText={setChargedAmt}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={styles.inputLabel}>Official Cap</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="₹50"
                    placeholderTextColor={AdminColors.textMuted}
                    value={standardAmt}
                    onChangeText={setStandardAmt}
                  />
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setLogModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveNewTicket}>
                <Text style={styles.saveBtnText}>Register Ticket</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* High-Res Evidence Photo Modal */}
      <Modal visible={photoModalVisible} transparent animationType="fade">
        <View style={styles.fullPhotoOverlay}>
          <TouchableOpacity style={styles.fullPhotoCloseBtn} onPress={() => setPhotoModalVisible(false)}>
            <Ionicons name="close" size={24} color="#FFFFFF" />
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
  container: {
    flex: 1,
    backgroundColor: AdminColors.background,
  },
  topBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
    gap: 10,
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AdminColors.inputBackground,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: AdminColors.textPrimary,
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
  },
  logBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: AdminColors.saffron,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 8,
  },
  logBtnText: {
    color: AdminColors.white,
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
  },
  filterScrollWrapper: {
    maxHeight: 46,
    marginBottom: 4,
  },
  filterScrollView: {
    maxHeight: 44,
  },
  filterScroll: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    gap: 6,
    alignItems: 'center',
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: AdminColors.cardBackground,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    height: 32,
    justifyContent: 'center',
  },
  filterChipActive: {
    backgroundColor: AdminColors.saffron,
    borderColor: AdminColors.saffron,
  },
  filterChipActiveRegistered: {
    backgroundColor: '#DC2626',
    borderColor: '#DC2626',
  },
  filterChipActiveDispatched: {
    backgroundColor: '#D97706',
    borderColor: '#D97706',
  },
  filterChipActiveFine: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  filterChipActiveResolved: {
    backgroundColor: '#0284C7',
    borderColor: '#0284C7',
  },
  filterChipText: {
    fontSize: 11,
    color: AdminColors.textSecondary,
    fontFamily: 'Poppins_500Medium',
  },
  filterChipTextActive: {
    color: AdminColors.white,
    fontFamily: 'Poppins_700Bold',
  },
  filterChipTextActiveRegistered: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
  },
  filterChipTextActiveDispatched: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
  },
  filterChipTextActiveFine: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
  },
  filterChipTextActiveResolved: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 130,
    gap: 12,
  },
  emptyState: {
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
    marginTop: 10,
  },
  emptyStateDesc: {
    fontSize: 11.5,
    fontFamily: 'Poppins_400Regular',
    color: AdminColors.textMuted,
    textAlign: 'center',
    marginTop: 4,
    maxWidth: 380,
    lineHeight: 18,
  },
  card: {
    backgroundColor: AdminColors.cardBackground,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ticketTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  ticketNumberText: {
    fontSize: 12.5,
    fontFamily: 'Poppins_700Bold',
    color: AdminColors.textPrimary,
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  deleteTicketBtn: {
    padding: 4,
    backgroundColor: '#FEF2F2',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: 6,
    borderWidth: 1,
  },
  statusBadgeText: {
    fontSize: 9.5,
    fontFamily: 'Poppins_700Bold',
  },
  offenderText: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: AdminColors.textPrimary,
    marginTop: 2,
  },
  pilgrimText: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: AdminColors.textMuted,
    marginTop: 1,
  },
  evidenceBannerWrapper: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
    marginVertical: 8,
    position: 'relative',
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
  },
  evidenceBannerImage: {
    width: '100%',
    height: '100%',
  },
  evidenceOverlayBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.82)',
    paddingHorizontal: 8,
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
  metricsBar: {
    flexDirection: 'row',
    backgroundColor: AdminColors.inputBackground,
    borderRadius: 8,
    padding: 8,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 9.5,
    fontFamily: 'Poppins_500Medium',
    color: AdminColors.textMuted,
  },
  metricVal: {
    fontSize: 12.5,
    fontFamily: 'Poppins_700Bold',
    marginTop: 2,
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 4,
  },
  locationText: {
    fontSize: 11.5,
    fontFamily: 'Poppins_500Medium',
    color: AdminColors.textSecondary,
    flex: 1,
    lineHeight: 16,
  },
  actionLinksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  gpsNavBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  gpsNavBtnText: {
    fontSize: 10.5,
    fontFamily: 'Poppins_600SemiBold',
    color: '#0284C7',
  },
  callReporterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  callReporterText: {
    fontSize: 10.5,
    fontFamily: 'Poppins_600SemiBold',
    color: '#059669',
  },
  officerNotesBox: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#F0F9FF',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    marginTop: 8,
  },
  officerNotesTitle: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: '#0284C7',
  },
  officerNotesBody: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: AdminColors.textPrimary,
    marginTop: 2,
  },
  fineNotice: {
    fontSize: 10.5,
    fontFamily: 'Poppins_700Bold',
    color: '#059669',
    marginTop: 4,
  },
  takeActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AdminColors.saffron,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 8,
    gap: 6,
  },
  takeActionBtnText: {
    color: AdminColors.white,
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: AdminColors.cardBackground,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: AdminColors.cardBorder,
  },
  modalTitle: {
    color: AdminColors.textPrimary,
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
  },
  ticketSummaryBox: {
    backgroundColor: AdminColors.inputBackground,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
  },
  summaryTitle: {
    color: AdminColors.textPrimary,
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
  },
  summarySub: {
    color: AdminColors.saffron,
    fontSize: 11.5,
    fontFamily: 'Poppins_500Medium',
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
  inputLabel: {
    color: AdminColors.textPrimary,
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
    marginTop: 10,
    marginBottom: 4,
  },
  modalInput: {
    backgroundColor: AdminColors.inputBackground,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: AdminColors.textPrimary,
    fontSize: 12.5,
    fontFamily: 'Poppins_400Regular',
  },
  statusPillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: 4,
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: AdminColors.inputBackground,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
  },
  statusPillActive: {
    borderColor: AdminColors.gold,
    backgroundColor: AdminColors.gold,
  },
  statusPillText: {
    color: AdminColors.textMuted,
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
  },
  statusPillTextActive: {
    color: AdminColors.white,
    fontFamily: 'Poppins_700Bold',
  },
  inputGrid: {
    flexDirection: 'row',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 10,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: AdminColors.cardBorder,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelBtnText: {
    color: AdminColors.textMuted,
    fontSize: 12.5,
    fontFamily: 'Poppins_600SemiBold',
  },
  saveBtn: {
    backgroundColor: AdminColors.saffron,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  saveBtnText: {
    color: AdminColors.white,
    fontSize: 12.5,
    fontFamily: 'Poppins_700Bold',
  },
  fullPhotoOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
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


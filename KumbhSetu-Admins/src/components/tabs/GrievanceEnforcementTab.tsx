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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AdminColors } from '@/constants/colors';
import { useAdmin } from '@/context/AdminContext';
import { AdminGrievanceTicket } from '@/types/admin';

export const GrievanceEnforcementTab: React.FC = () => {
  const {
    tickets,
    addTicket,
    updateTicketStatus,
    currentOfficer,
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'REGISTERED' | 'SQUAD_DISPATCHED' | 'FINE_ISSUED' | 'RESOLVED'>('all');

  // Modal State for Action / Investigation
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<AdminGrievanceTicket | null>(null);
  const [actionSummary, setActionSummary] = useState('');
  const [actionPenaltyAmount, setActionPenaltyAmount] = useState('');
  const [actionNewStatus, setActionNewStatus] = useState<AdminGrievanceTicket['status']>('FINE_ISSUED');

  // Modal State for Manual Ticket Log
  const [logModalVisible, setLogModalVisible] = useState(false);
  const [category, setCategory] = useState('Transit Auto Extortion');
  const [vehicleOrShop, setVehicleOrShop] = useState('');
  const [location, setLocation] = useState('');
  const [standardAmt, setStandardAmt] = useState('');
  const [chargedAmt, setChargedAmt] = useState('');

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
          bg: AdminColors.crimson + '20',
          border: AdminColors.crimson + '50',
          color: AdminColors.crimson,
          label: 'OPEN INCIDENT',
          icon: 'alert-circle' as const,
        };
      case 'SQUAD_DISPATCHED':
        return {
          bg: AdminColors.gold + '20',
          border: AdminColors.gold + '50',
          color: AdminColors.gold,
          label: 'SQUAD DISPATCHED',
          icon: 'bicycle' as const,
        };
      case 'FINE_ISSUED':
        return {
          bg: AdminColors.emerald + '20',
          border: AdminColors.emerald + '50',
          color: AdminColors.emerald,
          label: 'FINE LEVIED',
          icon: 'receipt' as const,
        };
      case 'RESOLVED':
      default:
        return {
          bg: AdminColors.skyBlue + '20',
          border: AdminColors.skyBlue + '50',
          color: AdminColors.skyBlue,
          label: 'RESOLVED',
          icon: 'checkmark-done-circle' as const,
        };
    }
  };

  return (
    <View style={styles.container}>
      {/* Action Bar */}
      <View style={styles.topBar}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color={AdminColors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search ticket token, vehicle, stall..."
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

        <TouchableOpacity style={styles.addBtn} onPress={() => setLogModalVisible(true)}>
          <Ionicons name="add" size={20} color={AdminColors.white} />
          <Text style={styles.addBtnText}>Log Complaint</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterBtn, filterStatus === 'all' && styles.filterBtnActive]}
          onPress={() => setFilterStatus('all')}
        >
          <Text style={[styles.filterBtnText, filterStatus === 'all' && styles.filterBtnTextActive]}>
            All ({tickets.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterBtn, filterStatus === 'REGISTERED' && styles.filterBtnActive]}
          onPress={() => setFilterStatus('REGISTERED')}
        >
          <Ionicons name="alert-circle" size={13} color={AdminColors.crimson} />
          <Text style={[styles.filterBtnText, filterStatus === 'REGISTERED' && styles.filterBtnTextActive]}>
            Urgent
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterBtn, filterStatus === 'SQUAD_DISPATCHED' && styles.filterBtnActive]}
          onPress={() => setFilterStatus('SQUAD_DISPATCHED')}
        >
          <Ionicons name="time" size={13} color={AdminColors.gold} />
          <Text style={[styles.filterBtnText, filterStatus === 'SQUAD_DISPATCHED' && styles.filterBtnTextActive]}>
            En Route
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterBtn, filterStatus === 'FINE_ISSUED' && styles.filterBtnActive]}
          onPress={() => setFilterStatus('FINE_ISSUED')}
        >
          <Ionicons name="checkmark-done" size={13} color={AdminColors.emerald} />
          <Text style={[styles.filterBtnText, filterStatus === 'FINE_ISSUED' && styles.filterBtnTextActive]}>
            Fined
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main List */}
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
        {filteredTickets.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={48} color={AdminColors.textMuted} />
            <Text style={styles.emptyStateTitle}>No Complaints Logged</Text>
            <Text style={styles.emptyStateDesc}>
              {searchQuery
                ? 'No grievances match the search filter.'
                : 'Tap "+ Log Complaint" to register complaints from pilgrims, dispatch squad units, and penalize violators for extortion or overcharging.'}
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
                      <View style={[styles.statusBadge, { backgroundColor: badge.bg, borderColor: badge.border }]}>
                        <Ionicons name={badge.icon} size={12} color={badge.color} />
                        <Text style={[styles.statusBadgeText, { color: badge.color }]}>{badge.label}</Text>
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
                    <Text style={styles.metricLabel}>Assigned Officer</Text>
                    <Text style={[styles.metricVal, { color: AdminColors.gold, fontSize: 12 }]}>
                      {ticket.assignedOfficer}
                    </Text>
                  </View>
                </View>

                <View style={styles.locationRow}>
                  <Ionicons name="location" size={14} color={AdminColors.saffron} />
                  <Text style={styles.locationText}>{ticket.location}</Text>
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
              <ScrollView style={{ maxHeight: 400 }}>
                <View style={styles.ticketSummaryBox}>
                  <Text style={styles.summaryTitle}>
                    Ticket: {selectedTicket.token} • {selectedTicket.vehicleOrShop}
                  </Text>
                  <Text style={styles.summarySub}>
                    Charge: {selectedTicket.chargedAmt} vs {selectedTicket.standardAmt} at {selectedTicket.location}
                  </Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AdminColors.darkNavy,
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
    backgroundColor: AdminColors.navyCard,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 42,
    borderWidth: 1,
    borderColor: AdminColors.navyBorder,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: AdminColors.textLight,
    fontSize: 13,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AdminColors.saffron,
    paddingHorizontal: 14,
    height: 42,
    borderRadius: 10,
    gap: 4,
  },
  addBtnText: {
    color: AdminColors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 6,
    gap: 6,
  },
  filterBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: AdminColors.navyCard,
    borderWidth: 1,
    borderColor: AdminColors.navyBorder,
    gap: 4,
  },
  filterBtnActive: {
    borderColor: AdminColors.saffron,
    backgroundColor: AdminColors.saffron + '20',
  },
  filterBtnText: {
    color: AdminColors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  filterBtnTextActive: {
    color: AdminColors.saffron,
    fontWeight: '700',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
    gap: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 24,
    backgroundColor: AdminColors.navyCard,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: AdminColors.navyBorder,
  },
  emptyStateTitle: {
    color: AdminColors.textLight,
    fontSize: 17,
    fontWeight: '700',
    marginTop: 12,
  },
  emptyStateDesc: {
    color: AdminColors.textMuted,
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  card: {
    backgroundColor: AdminColors.navyCard,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: AdminColors.navyBorder,
    padding: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  ticketTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  ticketNumberText: {
    color: AdminColors.textMuted,
    fontSize: 12,
    fontWeight: '700',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    gap: 4,
  },
  statusBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  offenderText: {
    color: AdminColors.textLight,
    fontSize: 15,
    fontWeight: '700',
    marginTop: 2,
  },
  pilgrimText: {
    color: AdminColors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  metricsBar: {
    flexDirection: 'row',
    backgroundColor: AdminColors.navySurface,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: AdminColors.navyBorder,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    color: AdminColors.textMuted,
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 2,
  },
  metricVal: {
    fontSize: 15,
    fontWeight: '800',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  locationText: {
    color: AdminColors.gold,
    fontSize: 12,
    fontWeight: '600',
  },
  officerNotesBox: {
    flexDirection: 'row',
    backgroundColor: AdminColors.navySurface,
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    gap: 8,
    borderLeftWidth: 3,
    borderLeftColor: AdminColors.skyBlue,
  },
  officerNotesTitle: {
    color: AdminColors.skyBlue,
    fontSize: 11,
    fontWeight: '700',
  },
  officerNotesBody: {
    color: AdminColors.textLight,
    fontSize: 12,
    marginTop: 2,
    lineHeight: 16,
  },
  fineNotice: {
    color: AdminColors.emerald,
    fontSize: 11,
    fontWeight: '700',
    marginTop: 4,
  },
  takeActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AdminColors.saffron,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 12,
    gap: 6,
  },
  takeActionBtnText: {
    color: AdminColors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: AdminColors.navyCard,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: AdminColors.navyBorder,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: AdminColors.navyBorder,
  },
  modalTitle: {
    color: AdminColors.textLight,
    fontSize: 16,
    fontWeight: '700',
  },
  ticketSummaryBox: {
    backgroundColor: AdminColors.navySurface,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: AdminColors.navyBorder,
  },
  summaryTitle: {
    color: AdminColors.textLight,
    fontSize: 13,
    fontWeight: '700',
  },
  summarySub: {
    color: AdminColors.saffron,
    fontSize: 12,
    marginTop: 2,
  },
  inputLabel: {
    color: AdminColors.textLight,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4,
  },
  modalInput: {
    backgroundColor: AdminColors.navySurface,
    borderWidth: 1,
    borderColor: AdminColors.navyBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: AdminColors.textLight,
    fontSize: 13,
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
    backgroundColor: AdminColors.navySurface,
    borderWidth: 1,
    borderColor: AdminColors.navyBorder,
  },
  statusPillActive: {
    borderColor: AdminColors.gold,
    backgroundColor: AdminColors.gold,
  },
  statusPillText: {
    color: AdminColors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  statusPillTextActive: {
    color: AdminColors.white,
    fontWeight: '700',
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
    borderTopColor: AdminColors.navyBorder,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  cancelBtnText: {
    color: AdminColors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
  saveBtn: {
    backgroundColor: AdminColors.saffron,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },
  saveBtnText: {
    color: AdminColors.white,
    fontSize: 13,
    fontWeight: '700',
  },
});

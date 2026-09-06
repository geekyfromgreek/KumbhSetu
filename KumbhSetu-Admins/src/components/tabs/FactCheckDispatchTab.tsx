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
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { AdminColors } from '@/constants/colors';
import { useAdmin } from '@/context/AdminContext';
import { AdminFactCheck } from '@/types/admin';

export const FactCheckDispatchTab: React.FC = () => {
  const {
    factChecks,
    addFactCheck,
    updateFactCheckStatus,
    deleteFactCheck,
    currentUser,
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'under_review' | 'debunked_fake' | 'verified_true'>('all');

  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [editingFact, setEditingFact] = useState<AdminFactCheck | null>(null);
  const [claimTitle, setClaimTitle] = useState('');
  const [claimSource, setClaimSource] = useState('');
  const [status, setStatus] = useState<'debunked_fake' | 'verified_true' | 'under_review'>('under_review');
  const [officialClarification, setOfficialClarification] = useState('');
  const [priority, setPriority] = useState<'CRITICAL' | 'HIGH' | 'NORMAL'>('HIGH');

  const openFactModal = (fact?: AdminFactCheck) => {
    if (fact) {
      setEditingFact(fact);
      setClaimTitle(fact.claimTitle);
      setClaimSource(fact.claimSource);
      setStatus(fact.status);
      setOfficialClarification(fact.officialClarification);
      setPriority(fact.priority);
    } else {
      setEditingFact(null);
      setClaimTitle('');
      setClaimSource('WhatsApp / Social Media');
      setStatus('under_review');
      setOfficialClarification('');
      setPriority('HIGH');
    }
    setModalVisible(true);
  };

  const handleSaveFactCheck = async () => {
    if (!claimTitle.trim() || !officialClarification.trim()) {
      Alert.alert('Validation Error', 'Claim Summary and Official Advisory are required.');
      return;
    }

    if (editingFact) {
      await updateFactCheckStatus(editingFact.id, status, officialClarification.trim());
    } else {
      await addFactCheck({
        claimTitle: claimTitle.trim(),
        claimSource: claimSource.trim() || 'Public Social Feeds',
        status,
        officialClarification: officialClarification.trim(),
        verifiedBy: currentUser ? currentUser.name : 'Administrator',
        priority,
      });
    }
    setModalVisible(false);
  };

  const filteredFactChecks = factChecks.filter((item) => {
    const matchesSearch =
      item.claimTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.officialClarification.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.verifiedBy.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (s: AdminFactCheck['status']) => {
    switch (s) {
      case 'debunked_fake':
        return {
          bg: AdminColors.dangerSoft,
          border: AdminColors.dangerBorder,
          color: AdminColors.danger,
          icon: 'close-circle' as const,
          badge: 'FAKE / BUSTED',
        };
      case 'verified_true':
        return {
          bg: AdminColors.successSoft,
          border: AdminColors.successBorder,
          color: AdminColors.emerald,
          icon: 'checkmark-circle' as const,
          badge: 'VERIFIED TRUE',
        };
      case 'under_review':
      default:
        return {
          bg: AdminColors.warningSoft,
          border: AdminColors.warningBorder,
          color: AdminColors.warning,
          icon: 'time' as const,
          badge: 'UNDER REVIEW',
        };
    }
  };

  return (
    <View style={styles.container}>
      {/* Action Bar */}
      <View style={styles.topBar}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={15} color={AdminColors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search rumors, advisories..."
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

        <TouchableOpacity style={styles.addBtn} onPress={() => openFactModal()} activeOpacity={0.8}>
          <Ionicons name="megaphone" size={16} color={AdminColors.white} />
          <Text style={styles.addBtnText}>Broadcast</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        <TouchableOpacity
          style={[styles.filterBtn, filterStatus === 'all' && styles.filterBtnActive]}
          onPress={() => setFilterStatus('all')}
          activeOpacity={0.75}
        >
          <Text style={[styles.filterBtnText, filterStatus === 'all' && styles.filterBtnTextActive]}>
            All ({factChecks.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterBtn, filterStatus === 'under_review' && styles.filterBtnActive]}
          onPress={() => setFilterStatus('under_review')}
          activeOpacity={0.75}
        >
          <Ionicons name="time" size={12} color={AdminColors.warning} />
          <Text style={[styles.filterBtnText, filterStatus === 'under_review' && styles.filterBtnTextActive]}>
            Under Review
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterBtn, filterStatus === 'debunked_fake' && styles.filterBtnActive]}
          onPress={() => setFilterStatus('debunked_fake')}
          activeOpacity={0.75}
        >
          <Ionicons name="close-circle" size={12} color={AdminColors.danger} />
          <Text style={[styles.filterBtnText, filterStatus === 'debunked_fake' && styles.filterBtnTextActive]}>
            Fake
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterBtn, filterStatus === 'verified_true' && styles.filterBtnActive]}
          onPress={() => setFilterStatus('verified_true')}
          activeOpacity={0.75}
        >
          <Ionicons name="checkmark-circle" size={12} color={AdminColors.emerald} />
          <Text style={[styles.filterBtnText, filterStatus === 'verified_true' && styles.filterBtnTextActive]}>
            Verified
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main List */}
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
        {filteredFactChecks.length === 0 ? (
          <View style={styles.emptyState}>
            <FontAwesome5 name="shield-alt" size={32} color={AdminColors.saffron} />
            <Text style={styles.emptyStateTitle}>No Fact-Check Bulletins</Text>
            <Text style={styles.emptyStateDesc}>
              {searchQuery
                ? 'No advisories match your search.'
                : 'Tap "+ Broadcast" to publish verified government advisories, dispel fake viral rumors, and inform pilgrims.'}
            </Text>
          </View>
        ) : (
          filteredFactChecks.map((item) => {
            const sStyle = getStatusStyle(item.status);
            return (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={{ flex: 1 }}>
                    <View style={[styles.verdictBadge, { backgroundColor: sStyle.bg, borderColor: sStyle.border }]}>
                      <Ionicons name={sStyle.icon} size={12} color={sStyle.color} />
                      <Text style={[styles.verdictBadgeText, { color: sStyle.color }]}>
                        {sStyle.badge}
                      </Text>
                    </View>
                    <Text style={styles.claimTitle}>{item.claimTitle}</Text>
                  </View>

                  <View style={styles.cardActions}>
                    <TouchableOpacity
                      style={styles.actionIconButton}
                      onPress={() => openFactModal(item)}
                    >
                      <Ionicons name="pencil" size={15} color={AdminColors.secondary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionIconButton, { backgroundColor: AdminColors.dangerSoft }]}
                      onPress={() => {
                        Alert.alert('Delete Bulletin', 'Permanently remove this bulletin?', [
                          { text: 'Cancel', style: 'cancel' },
                          { text: 'Delete', style: 'destructive', onPress: () => deleteFactCheck(item.id) },
                        ]);
                      }}
                    >
                      <Ionicons name="trash" size={15} color={AdminColors.danger} />
                    </TouchableOpacity>
                  </View>
                </View>

                {item.claimSource ? (
                  <Text style={styles.claimDesc}>Source: {item.claimSource}</Text>
                ) : null}

                {/* Official Advisory Box */}
                <View style={styles.advisoryBox}>
                  <View style={styles.advisoryHeader}>
                    <Ionicons name="megaphone" size={13} color={AdminColors.saffron} />
                    <Text style={styles.advisoryHeaderTitle}>Official Advisory</Text>
                  </View>
                  <Text style={styles.advisoryBody}>{item.officialClarification}</Text>
                </View>

                {/* Quick Verdict Dispatch Bar */}
                {item.status === 'under_review' && (
                  <View style={styles.dispatchVerdictRow}>
                    <TouchableOpacity
                      style={[styles.verdictActionBtn, { backgroundColor: AdminColors.dangerSoft, borderColor: AdminColors.dangerBorder }]}
                      onPress={() =>
                        updateFactCheckStatus(
                          item.id,
                          'debunked_fake',
                          item.officialClarification || 'Debunked by Mela Administration.'
                        )
                      }
                    >
                      <Ionicons name="close-circle" size={13} color={AdminColors.danger} />
                      <Text style={[styles.verdictActionBtnText, { color: AdminColors.danger }]}>
                        Debunk Fake
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.verdictActionBtn, { backgroundColor: AdminColors.successSoft, borderColor: AdminColors.successBorder }]}
                      onPress={() =>
                        updateFactCheckStatus(
                          item.id,
                          'verified_true',
                          item.officialClarification || 'Officially verified by Administration.'
                        )
                      }
                    >
                      <Ionicons name="checkmark-circle" size={13} color={AdminColors.emerald} />
                      <Text style={[styles.verdictActionBtnText, { color: AdminColors.emerald }]}>
                        Verify True
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* Footer Metadata */}
                <View style={styles.footerRow}>
                  <Text style={styles.footerText}>
                    By: <Text style={{ fontFamily: 'Poppins_600SemiBold', color: AdminColors.textPrimary }}>{item.verifiedBy}</Text>
                  </Text>
                  <Text style={styles.footerText}>{item.timestamp}</Text>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Modal: Create / Edit Bulletin */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingFact ? 'Edit Bulletin' : 'Broadcast Bulletin'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={22} color={AdminColors.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 400 }}>
              <Text style={styles.inputLabel}>Rumor / Claim Title *</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. Rumor: Ramkund Ghat closed due to overcrowding"
                placeholderTextColor={AdminColors.textMuted}
                value={claimTitle}
                onChangeText={setClaimTitle}
              />

              <Text style={styles.inputLabel}>Origin / Source</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. WhatsApp Forward / Twitter"
                placeholderTextColor={AdminColors.textMuted}
                value={claimSource}
                onChangeText={setClaimSource}
              />

              <Text style={styles.inputLabel}>Verdict Status</Text>
              <View style={styles.verdictPillRow}>
                {(['under_review', 'debunked_fake', 'verified_true'] as const).map((v) => (
                  <TouchableOpacity
                    key={v}
                    style={[
                      styles.verdictPill,
                      status === v && styles.verdictPillActive,
                      status === v && v === 'debunked_fake' && { backgroundColor: AdminColors.danger, borderColor: AdminColors.danger },
                      status === v && v === 'verified_true' && { backgroundColor: AdminColors.emerald, borderColor: AdminColors.emerald },
                    ]}
                    onPress={() => setStatus(v)}
                  >
                    <Text style={[styles.verdictPillText, status === v && styles.verdictPillTextActive]}>
                      {v === 'under_review'
                        ? 'Under Review'
                        : v === 'debunked_fake'
                        ? 'Debunk Fake'
                        : 'Verified True'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.inputLabel}>Official Advisory Statement *</Text>
              <TextInput
                style={[styles.modalInput, { height: 80 }]}
                placeholder="Official statement: Ghat is 100% open with normal flow..."
                placeholderTextColor={AdminColors.textMuted}
                multiline
                value={officialClarification}
                onChangeText={setOfficialClarification}
              />
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveFactCheck}>
                <Text style={styles.saveBtnText}>Broadcast</Text>
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
    backgroundColor: AdminColors.cardBackground,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 40,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: AdminColors.textPrimary,
    fontSize: 12.5,
    fontFamily: 'Poppins_500Medium',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AdminColors.saffron,
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 10,
    gap: 4,
  },
  addBtnText: {
    color: AdminColors.white,
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
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
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: AdminColors.cardBackground,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    gap: 4,
  },
  filterBtnActive: {
    borderColor: AdminColors.saffron,
    backgroundColor: AdminColors.primarySoft,
  },
  filterBtnText: {
    color: AdminColors.textMuted,
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
  },
  filterBtnTextActive: {
    color: AdminColors.saffron,
    fontFamily: 'Poppins_700Bold',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
    gap: 10,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
    backgroundColor: AdminColors.cardBackground,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    gap: 6,
  },
  emptyStateTitle: {
    color: AdminColors.textPrimary,
    fontSize: 14.5,
    fontFamily: 'Poppins_700Bold',
    marginTop: 4,
  },
  emptyStateDesc: {
    color: AdminColors.textMuted,
    fontSize: 11.5,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    lineHeight: 16,
  },
  card: {
    backgroundColor: AdminColors.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  verdictBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    gap: 4,
    marginBottom: 4,
  },
  verdictBadgeText: {
    fontSize: 9.5,
    fontFamily: 'Poppins_700Bold',
  },
  claimTitle: {
    color: AdminColors.textPrimary,
    fontSize: 13.5,
    fontFamily: 'Poppins_700Bold',
    lineHeight: 18,
  },
  claimDesc: {
    color: AdminColors.textMuted,
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    marginTop: 3,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 6,
    marginLeft: 8,
  },
  actionIconButton: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: AdminColors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
  },
  advisoryBox: {
    backgroundColor: AdminColors.inputBackground,
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
  },
  advisoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  advisoryHeaderTitle: {
    color: AdminColors.saffron,
    fontSize: 10.5,
    fontFamily: 'Poppins_700Bold',
  },
  advisoryBody: {
    color: AdminColors.textPrimary,
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 16,
  },
  dispatchVerdictRow: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 6,
  },
  verdictActionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    gap: 4,
  },
  verdictActionBtnText: {
    fontSize: 11,
    fontFamily: 'Poppins_700Bold',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: AdminColors.cardBorder,
  },
  footerText: {
    color: AdminColors.textMuted,
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: AdminColors.overlay,
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: AdminColors.cardBackground,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: AdminColors.cardBorder,
  },
  modalTitle: {
    color: AdminColors.textPrimary,
    fontSize: 14.5,
    fontFamily: 'Poppins_700Bold',
  },
  inputLabel: {
    color: AdminColors.textPrimary,
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    marginTop: 8,
    marginBottom: 4,
  },
  modalInput: {
    backgroundColor: AdminColors.inputBackground,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 7,
    color: AdminColors.textPrimary,
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
  },
  verdictPillRow: {
    flexDirection: 'row',
    gap: 6,
    marginVertical: 4,
  },
  verdictPill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: AdminColors.inputBackground,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
  },
  verdictPillActive: {
    backgroundColor: AdminColors.warning,
    borderColor: AdminColors.warning,
  },
  verdictPillText: {
    color: AdminColors.textMuted,
    fontSize: 10.5,
    fontFamily: 'Poppins_600SemiBold',
  },
  verdictPillTextActive: {
    color: AdminColors.white,
    fontFamily: 'Poppins_700Bold',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 14,
    gap: 8,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: AdminColors.cardBorder,
  },
  cancelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  cancelBtnText: {
    color: AdminColors.textMuted,
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
  saveBtn: {
    backgroundColor: AdminColors.saffron,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveBtnText: {
    color: AdminColors.white,
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
  },
});

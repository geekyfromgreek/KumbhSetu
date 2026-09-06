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
import { AdminBazaarShop } from '@/types/admin';

export const BazaarManagementTab: React.FC = () => {
  const {
    shops,
    addShop,
    updateShopStatus,
    deleteShop,
  } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'APPROVED' | 'PENDING_AUDIT' | 'FLAGGED_OVERCHARGING' | 'SUSPENDED'>('all');

  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  const [editingShop, setEditingShop] = useState<AdminBazaarShop | null>(null);
  const [shopName, setShopName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [category, setCategory] = useState('Prasad & Sweets');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [itemSampleName, setItemSampleName] = useState('');
  const [itemSamplePrice, setItemSamplePrice] = useState('');
  const [status, setStatus] = useState<AdminBazaarShop['status']>('APPROVED');

  const openShopModal = (shop?: AdminBazaarShop) => {
    if (shop) {
      setEditingShop(shop);
      setShopName(shop.shopName);
      setOwnerName(shop.ownerName);
      setCategory(shop.category);
      setLocation(shop.location);
      setPhone(shop.phone);
      setItemSampleName(shop.itemSampleName);
      setItemSamplePrice(shop.itemSamplePrice.toString());
      setStatus(shop.status);
    } else {
      setEditingShop(null);
      setShopName('');
      setOwnerName('');
      setCategory('Prasad & Sweets');
      setLocation('Ramkund Ghat - Sector 1');
      setPhone('');
      setItemSampleName('Standard Prasad Packet');
      setItemSamplePrice('50');
      setStatus('APPROVED');
    }
    setModalVisible(true);
  };

  const handleSaveShop = async () => {
    if (!shopName.trim() || !ownerName.trim()) {
      Alert.alert('Validation Error', 'Shop Name and Owner Name are required.');
      return;
    }
    const samplePrice = parseFloat(itemSamplePrice) || 0;

    if (editingShop) {
      await updateShopStatus(editingShop.id, status);
    } else {
      await addShop({
        shopName: shopName.trim(),
        ownerName: ownerName.trim(),
        category: category.trim(),
        location: location.trim() || 'General Mela Zone',
        phone: phone.trim() || 'N/A',
        itemSampleName: itemSampleName.trim() || 'General Items',
        itemSamplePrice: samplePrice,
        isVerified: status === 'APPROVED',
        status,
        warningCount: 0,
      });
    }
    setModalVisible(false);
  };

  const filteredShops = shops.filter((shop) => {
    const matchesSearch =
      shop.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || shop.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (st: AdminBazaarShop['status']) => {
    switch (st) {
      case 'APPROVED':
        return {
          bg: AdminColors.successSoft,
          color: AdminColors.emerald,
          icon: 'shield-checkmark' as const,
          label: 'Authorized',
        };
      case 'FLAGGED_OVERCHARGING':
        return {
          bg: AdminColors.warningSoft,
          color: AdminColors.warning,
          icon: 'warning' as const,
          label: 'Flagged',
        };
      case 'SUSPENDED':
        return {
          bg: AdminColors.dangerSoft,
          color: AdminColors.danger,
          icon: 'ban' as const,
          label: 'Suspended',
        };
      case 'PENDING_AUDIT':
      default:
        return {
          bg: AdminColors.riverBlueSoft,
          color: AdminColors.riverBlue,
          icon: 'time' as const,
          label: 'Pending Review',
        };
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Action Bar */}
      <View style={styles.topBar}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={15} color={AdminColors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search stall, merchant, location..."
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

        <TouchableOpacity style={styles.addBtn} onPress={() => openShopModal()} activeOpacity={0.8}>
          <Ionicons name="add" size={16} color={AdminColors.white} />
          <Text style={styles.addBtnText}>Add Stall</Text>
        </TouchableOpacity>
      </View>

      {/* Compliance Filter Chips */}
      <View style={styles.chipScrollContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
          <TouchableOpacity
            style={[styles.chip, filterStatus === 'all' && styles.chipActive]}
            onPress={() => setFilterStatus('all')}
            activeOpacity={0.75}
          >
            <Text style={[styles.chipText, filterStatus === 'all' && styles.chipTextActive]}>
              All ({shops.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.chip, filterStatus === 'APPROVED' && styles.chipActive]}
            onPress={() => setFilterStatus('APPROVED')}
            activeOpacity={0.75}
          >
            <Ionicons name="shield-checkmark" size={12} color={AdminColors.emerald} />
            <Text style={[styles.chipText, filterStatus === 'APPROVED' && styles.chipTextActive]}>
              Authorized
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.chip, filterStatus === 'FLAGGED_OVERCHARGING' && styles.chipActive]}
            onPress={() => setFilterStatus('FLAGGED_OVERCHARGING')}
            activeOpacity={0.75}
          >
            <Ionicons name="warning" size={12} color={AdminColors.warning} />
            <Text style={[styles.chipText, filterStatus === 'FLAGGED_OVERCHARGING' && styles.chipTextActive]}>
              Flagged
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.chip, filterStatus === 'SUSPENDED' && styles.chipActive]}
            onPress={() => setFilterStatus('SUSPENDED')}
            activeOpacity={0.75}
          >
            <Ionicons name="ban" size={12} color={AdminColors.danger} />
            <Text style={[styles.chipText, filterStatus === 'SUSPENDED' && styles.chipTextActive]}>
              Suspended
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Main List */}
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
        {filteredShops.length === 0 ? (
          <View style={styles.emptyState}>
            <FontAwesome5 name="store" size={32} color={AdminColors.saffron} />
            <Text style={styles.emptyStateTitle}>No Stalls Registered</Text>
            <Text style={styles.emptyStateDesc}>
              {searchQuery
                ? 'No merchants match the current filters.'
                : 'Tap "+ Add Stall" to register official vendors with assigned locations and fair price agreements.'}
            </Text>
          </View>
        ) : (
          filteredShops.map((shop) => {
            const badge = getStatusBadge(shop.status);
            return (
              <View key={shop.id} style={styles.shopCard}>
                <View style={styles.cardHeader}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.stallRow}>
                      <View style={[styles.statusBadge, { backgroundColor: badge.bg }]}>
                        <Ionicons name={badge.icon} size={11} color={badge.color} />
                        <Text style={[styles.statusBadgeText, { color: badge.color }]}>{badge.label}</Text>
                      </View>
                      {shop.warningCount > 0 && (
                        <View style={[styles.statusBadge, { backgroundColor: AdminColors.dangerSoft }]}>
                          <Text style={[styles.statusBadgeText, { color: AdminColors.danger }]}>
                            {shop.warningCount} Warnings
                          </Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.shopTitle}>{shop.shopName}</Text>
                    <Text style={styles.shopSubtitle}>
                      {shop.ownerName} • {shop.phone}
                    </Text>
                  </View>

                  <View style={styles.cardActions}>
                    <TouchableOpacity
                      style={styles.actionIconButton}
                      onPress={() => openShopModal(shop)}
                    >
                      <Ionicons name="pencil" size={15} color={AdminColors.secondary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionIconButton, { backgroundColor: AdminColors.dangerSoft }]}
                      onPress={() => {
                        Alert.alert('Delete Stall', `Remove stall ${shop.shopName}?`, [
                          { text: 'Cancel', style: 'cancel' },
                          { text: 'Delete', style: 'destructive', onPress: () => deleteShop(shop.id) },
                        ]);
                      }}
                    >
                      <Ionicons name="trash" size={15} color={AdminColors.danger} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Details Row */}
                <View style={styles.detailsRow}>
                  <View style={styles.detailItem}>
                    <Ionicons name="location-outline" size={12} color={AdminColors.textMuted} />
                    <Text style={styles.detailText}>{shop.location}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="pricetag-outline" size={12} color={AdminColors.textMuted} />
                    <Text style={styles.detailText}>{shop.category}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="cube-outline" size={12} color={AdminColors.saffron} />
                    <Text style={styles.detailText}>
                      {shop.itemSampleName} (₹{shop.itemSamplePrice})
                    </Text>
                  </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.authorityActionsRow}>
                  {shop.status !== 'APPROVED' && (
                    <TouchableOpacity
                      style={[styles.quickStatusBtn, { backgroundColor: AdminColors.successSoft, borderColor: AdminColors.successBorder }]}
                      onPress={() => updateShopStatus(shop.id, 'APPROVED')}
                    >
                      <Ionicons name="checkmark-circle" size={12} color={AdminColors.emerald} />
                      <Text style={[styles.quickStatusBtnText, { color: AdminColors.emerald }]}>
                        Pass Audit
                      </Text>
                    </TouchableOpacity>
                  )}

                  {shop.status !== 'FLAGGED_OVERCHARGING' && (
                    <TouchableOpacity
                      style={[styles.quickStatusBtn, { backgroundColor: AdminColors.warningSoft, borderColor: AdminColors.warningBorder }]}
                      onPress={() => updateShopStatus(shop.id, 'FLAGGED_OVERCHARGING', true)}
                    >
                      <Ionicons name="warning" size={12} color={AdminColors.warning} />
                      <Text style={[styles.quickStatusBtnText, { color: AdminColors.warning }]}>
                        Flag Warning
                      </Text>
                    </TouchableOpacity>
                  )}

                  {shop.status !== 'SUSPENDED' && (
                    <TouchableOpacity
                      style={[styles.quickStatusBtn, { backgroundColor: AdminColors.dangerSoft, borderColor: AdminColors.dangerBorder }]}
                      onPress={() => {
                        Alert.alert('Suspend Stall', `Suspend stall for ${shop.shopName}?`, [
                          { text: 'Cancel', style: 'cancel' },
                          { text: 'Suspend', style: 'destructive', onPress: () => updateShopStatus(shop.id, 'SUSPENDED') },
                        ]);
                      }}
                    >
                      <Ionicons name="ban" size={12} color={AdminColors.danger} />
                      <Text style={[styles.quickStatusBtnText, { color: AdminColors.danger }]}>
                        Suspend
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Modal: Allocate / Edit Stall */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingShop ? 'Edit Stall' : 'Add Stall'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={22} color={AdminColors.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 400 }}>
              <Text style={styles.inputLabel}>Shop Name *</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. Mahadev Prasad & Sweets"
                placeholderTextColor={AdminColors.textMuted}
                value={shopName}
                onChangeText={setShopName}
              />

              <Text style={styles.inputLabel}>Owner Name *</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. Rajeshwar Sharma"
                placeholderTextColor={AdminColors.textMuted}
                value={ownerName}
                onChangeText={setOwnerName}
              />

              <View style={styles.inputGrid}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={styles.inputLabel}>Category</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="e.g. Prasad & Sweets"
                    placeholderTextColor={AdminColors.textMuted}
                    value={category}
                    onChangeText={setCategory}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={styles.inputLabel}>Contact Phone</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="+91 9876543210"
                    placeholderTextColor={AdminColors.textMuted}
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                  />
                </View>
              </View>

              <Text style={styles.inputLabel}>Location / Zone</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. Ramkund Main Ghat - Sector 1"
                placeholderTextColor={AdminColors.textMuted}
                value={location}
                onChangeText={setLocation}
              />

              <View style={styles.inputGrid}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={styles.inputLabel}>Sample Item</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="Standard Thali"
                    placeholderTextColor={AdminColors.textMuted}
                    value={itemSampleName}
                    onChangeText={setItemSampleName}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={styles.inputLabel}>Sample Price (₹)</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="50"
                    placeholderTextColor={AdminColors.textMuted}
                    keyboardType="numeric"
                    value={itemSamplePrice}
                    onChangeText={setItemSamplePrice}
                  />
                </View>
              </View>

              <Text style={styles.inputLabel}>Status</Text>
              <View style={styles.categoryPillRow}>
                {(['APPROVED', 'FLAGGED_OVERCHARGING', 'SUSPENDED', 'PENDING_AUDIT'] as const).map((st) => (
                  <TouchableOpacity
                    key={st}
                    style={[
                      styles.categoryPill,
                      status === st && styles.categoryPillActive,
                    ]}
                    onPress={() => setStatus(st)}
                  >
                    <Text
                      style={[
                        styles.categoryPillText,
                        status === st && styles.categoryPillTextActive,
                      ]}
                    >
                      {st.replace('_', ' ')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveShop}>
                <Text style={styles.saveBtnText}>Save Stall</Text>
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
  chipScrollContainer: {
    paddingVertical: 6,
  },
  chipRow: {
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: AdminColors.cardBackground,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    gap: 5,
  },
  chipActive: {
    borderColor: AdminColors.saffron,
    backgroundColor: AdminColors.primarySoft,
  },
  chipText: {
    color: AdminColors.textMuted,
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
  },
  chipTextActive: {
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
  shopCard: {
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
  stallRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 4,
  },
  statusBadgeText: {
    fontSize: 10,
    fontFamily: 'Poppins_700Bold',
  },
  shopTitle: {
    color: AdminColors.textPrimary,
    fontSize: 14.5,
    fontFamily: 'Poppins_700Bold',
    marginTop: 2,
  },
  shopSubtitle: {
    color: AdminColors.textMuted,
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    marginTop: 1,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 6,
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
  detailsRow: {
    flexDirection: 'row',
    backgroundColor: AdminColors.inputBackground,
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    color: AdminColors.textPrimary,
    fontSize: 10.5,
    fontFamily: 'Poppins_500Medium',
  },
  authorityActionsRow: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: AdminColors.cardBorder,
  },
  quickStatusBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    gap: 4,
  },
  quickStatusBtnText: {
    fontSize: 10.5,
    fontFamily: 'Poppins_700Bold',
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
  inputGrid: {
    flexDirection: 'row',
  },
  categoryPillRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginVertical: 4,
  },
  categoryPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 14,
    backgroundColor: AdminColors.inputBackground,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
  },
  categoryPillActive: {
    backgroundColor: AdminColors.saffron,
    borderColor: AdminColors.saffron,
  },
  categoryPillText: {
    color: AdminColors.textMuted,
    fontSize: 10.5,
    fontFamily: 'Poppins_500Medium',
    textTransform: 'capitalize',
  },
  categoryPillTextActive: {
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

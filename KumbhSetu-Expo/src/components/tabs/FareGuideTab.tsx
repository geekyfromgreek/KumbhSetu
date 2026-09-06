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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useApp } from '@/context/AppContext';
import { RouteFare, StandardPriceItem } from '@/data/fareData';
import { KumbhColors } from '@/constants/colors';

export const FareGuideTab: React.FC = () => {
  const insets = useSafeAreaInsets();
  const {
    language,
    t,
    setActiveTab,
    isAdminMode,
    setIsAdminMode,
    verifyAdminPin,
    routeFares,
    updateRouteFare,
    addRouteFare,
    resetRouteFaresToDefault,
    standardPrices,
    updateStandardPrice,
    resetStandardPricesToDefault,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

  // Admin Pin Auth Modal
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false);
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  // Admin Route Fare Create/Edit Modal
  const [isEditRouteModalOpen, setIsEditRouteModalOpen] = useState<boolean>(false);
  const [editingRoute, setEditingRoute] = useState<RouteFare | null>(null);
  const [editFrom, setEditFrom] = useState<string>('');
  const [editTo, setEditTo] = useState<string>('');
  const [editSharedAuto, setEditSharedAuto] = useState<string>('');
  const [editPrivateAuto, setEditPrivateAuto] = useState<string>('');
  const [editBus, setEditBus] = useState<string>('');
  const [editTaxi, setEditTaxi] = useState<string>('');
  const [editDistance, setEditDistance] = useState<string>('');
  const [editMinutes, setEditMinutes] = useState<string>('');
  const [editNote, setEditNote] = useState<string>('');
  const [adminSaveSuccess, setAdminSaveSuccess] = useState<boolean>(false);

  // Admin Commodity Edit Modal
  const [isEditPriceModalOpen, setIsEditPriceModalOpen] = useState<boolean>(false);
  const [editingPriceItem, setEditingPriceItem] = useState<StandardPriceItem | null>(null);
  const [editItemMaxPrice, setEditItemMaxPrice] = useState<string>('');
  const [editItemNotice, setEditItemNotice] = useState<string>('');

  // Filter routes based on search query
  const filteredRoutes = (routeFares || []).filter((r) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const fromStr = (r.fromName || r.fromId || '').toLowerCase();
    const toStr = (r.toName || r.toId || '').toLowerCase();
    const noteStr = (r.trafficNote || '').toLowerCase();
    return fromStr.includes(q) || toStr.includes(q) || noteStr.includes(q);
  });

  const prepareRouteEdit = (route?: RouteFare) => {
    if (route) {
      setEditingRoute(route);
      setEditFrom(route.fromName || route.fromId || '');
      setEditTo(route.toName || route.toId || '');
      setEditSharedAuto(String(route.sharedAutoPerPerson || ''));
      setEditPrivateAuto(String(route.privateAutoFixed || ''));
      setEditBus(String(route.kumbhCityBus || ''));
      setEditTaxi(String(route.taxiCab || ''));
      setEditDistance(String(route.distanceKm || ''));
      setEditMinutes(String(route.approxMinutes || ''));
      setEditNote(route.trafficNote || '');
    } else {
      setEditingRoute(null);
      setEditFrom('');
      setEditTo('');
      setEditSharedAuto('20');
      setEditPrivateAuto('80');
      setEditBus('15');
      setEditTaxi('150');
      setEditDistance('5.0');
      setEditMinutes('15');
      setEditNote('Official gazette route');
    }
    setAdminSaveSuccess(false);
    setIsEditRouteModalOpen(true);
  };

  const handleSaveRouteFare = async () => {
    if (!editFrom.trim() || !editTo.trim()) {
      Alert.alert('Validation Error', 'Origin and Destination names are required.');
      return;
    }

    const fromName = editFrom.trim();
    const toName = editTo.trim();

    const farePayload: RouteFare = {
      id: editingRoute?.id || `rf_${Date.now()}`,
      fromName,
      toName,
      fromId: fromName.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      toId: toName.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      sharedAutoPerPerson: parseFloat(editSharedAuto) || 0,
      privateAutoFixed: parseFloat(editPrivateAuto) || 0,
      kumbhCityBus: parseFloat(editBus) || 0,
      taxiCab: parseFloat(editTaxi) || 0,
      distanceKm: parseFloat(editDistance) || 0,
      approxMinutes: parseInt(editMinutes, 10) || 15,
      trafficNote: editNote.trim() || 'प्रशासन द्वारा अधिकृत मार्ग (RTO Approved Route)',
    };

    await updateRouteFare(farePayload);
    setAdminSaveSuccess(true);
    setTimeout(() => {
      setIsEditRouteModalOpen(false);
      setAdminSaveSuccess(false);
    }, 800);
  };

  const prepareItemEdit = (item: StandardPriceItem) => {
    setEditingPriceItem(item);
    setEditItemMaxPrice(String(item.standardMaxPrice));
    setEditItemNotice(item.govtNotice);
    setIsEditPriceModalOpen(true);
  };

  const handleSaveStandardPrice = async () => {
    if (!editingPriceItem) return;
    const updated: StandardPriceItem = {
      ...editingPriceItem,
      standardMaxPrice: parseFloat(editItemMaxPrice) || 0,
      govtNotice: editItemNotice.trim(),
    };

    await updateStandardPrice(updated);
    setIsEditPriceModalOpen(false);
  };

  const handleAdminAuth = () => {
    if (verifyAdminPin(enteredPin)) {
      setIsPinModalOpen(false);
      setEnteredPin('');
      setPinError('');
    } else {
      setPinError('Invalid Admin Passcode. Try 1008');
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top + 8, 16) }]}>
        <View style={styles.headerTitleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>{t.fareTitle}</Text>
            <Text style={styles.headerSub}>{t.fareSubtitle}</Text>
          </View>

          {/* Admin Mode Toggle */}
          <TouchableOpacity
            style={[styles.adminHeaderBtn, isAdminMode && styles.adminHeaderBtnActive]}
            onPress={() => {
              if (isAdminMode) {
                prepareRouteEdit();
              } else {
                setIsPinModalOpen(true);
              }
            }}
            activeOpacity={0.8}>
            <FontAwesome5
              name={isAdminMode ? 'plus-circle' : 'lock'}
              size={12}
              color={isAdminMode ? '#FFFFFF' : KumbhColors.primaryDark}
            />
            <Text style={[styles.adminHeaderBtnText, isAdminMode && { color: '#FFFFFF' }]}>
              {isAdminMode ? '+ Add Route' : 'Admin'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Route Input */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color={KumbhColors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search route (e.g. Ramkund, Station, CBS, Trimbak)..."
            placeholderTextColor={KumbhColors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={16} color={KumbhColors.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 32 }]}
        showsVerticalScrollIndicator={false}>
        
        {/* Admin Authority Banner */}
        {isAdminMode && (
          <View style={styles.adminBanner}>
            <View style={styles.adminBannerLeft}>
              <View style={styles.adminBadgeIcon}>
                <FontAwesome5 name="shield-alt" size={13} color="#FFFFFF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.adminBannerTitle}>RTO Admin Mode Active</Text>
                <Text style={styles.adminBannerSub}>
                  Routes and prices created here are live across all Yatri apps.
                </Text>
              </View>
            </View>
            <View style={styles.adminBannerActions}>
              <TouchableOpacity
                style={styles.adminAddRouteBtn}
                onPress={() => prepareRouteEdit()}>
                <Ionicons name="add" size={14} color="#FFFFFF" />
                <Text style={styles.adminAddRouteText}>New Route</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.adminExitBtn}
                onPress={() => setIsAdminMode(false)}>
                <Text style={styles.adminExitText}>Exit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* SECTION 1: OFFICIAL TRANSIT ROUTES */}
        <View style={styles.sectionHeaderRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name="bus-outline" size={16} color={KumbhColors.primaryDark} />
            <Text style={styles.sectionTitle}>Official Transit Routes</Text>
          </View>
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{filteredRoutes.length} Active Routes</Text>
          </View>
        </View>

        {filteredRoutes.length === 0 ? (
          <View style={styles.emptyRoutesCard}>
            <Ionicons name="map-outline" size={36} color="#94A3B8" />
            <Text style={styles.emptyTitle}>No Transit Routes Found</Text>
            <Text style={styles.emptySub}>
              {searchQuery
                ? `No active routes matching "${searchQuery}". Try another stop or landmark.`
                : 'Official transit fares approved by RTO & District Administration will appear here.'}
            </Text>
            {isAdminMode && (
              <TouchableOpacity
                style={[styles.adminAddRouteBtn, { marginTop: 12, paddingHorizontal: 16 }]}
                onPress={() => prepareRouteEdit()}>
                <Ionicons name="add-circle" size={15} color="#FFFFFF" />
                <Text style={styles.adminAddRouteText}>Create First Route as Admin</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          filteredRoutes.map((route) => {
            const isSelected = selectedRouteId === route.id;
            const fromDisplay = route.fromName || route.fromId;
            const toDisplay = route.toName || route.toId;

            return (
              <View
                key={route.id}
                style={[styles.routeCard, isSelected && styles.routeCardSelected]}>
                
                {/* Route Header Row */}
                <View style={styles.routeTopRow}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.routePairBadge}>
                      <Ionicons name="navigate-circle" size={14} color={KumbhColors.primary} />
                      <Text style={styles.routeName}>
                        {fromDisplay} <Text style={{ color: KumbhColors.secondaryDark }}>➔</Text> {toDisplay}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.distancePill}>
                    <Text style={styles.distancePillText}>
                      {route.distanceKm} km • ~{route.approxMinutes} min
                    </Text>
                  </View>
                </View>

                {/* Price Breakdown Grid */}
                <View style={styles.fareOptionsGrid}>
                  {/* Shared Auto */}
                  <View style={styles.fareOptionCard}>
                    <Ionicons name="people" size={15} color={KumbhColors.primary} />
                    <Text style={styles.fareOptionTitle}>{t.sharedAuto}</Text>
                    <Text style={styles.farePriceMain}>₹{route.sharedAutoPerPerson}</Text>
                    <Text style={styles.farePerPerson}>{t.perPerson}</Text>
                  </View>

                  {/* Kumbh City Bus */}
                  <View style={[styles.fareOptionCard, styles.fareOptionCardHighlight]}>
                    <Ionicons name="bus" size={15} color="#16A34A" />
                    <Text style={styles.fareOptionTitle}>{t.kumbhBus}</Text>
                    <Text style={[styles.farePriceMain, { color: '#16A34A' }]}>
                      ₹{route.kumbhCityBus}
                    </Text>
                    <Text style={styles.farePerPerson}>{t.perPerson}</Text>
                  </View>

                  {/* Private Auto */}
                  <View style={styles.fareOptionCard}>
                    <MaterialCommunityIcons name="rickshaw" size={15} color={KumbhColors.primaryDark} />
                    <Text style={styles.fareOptionTitle}>{t.privateAuto}</Text>
                    <Text style={styles.farePriceMain}>₹{route.privateAutoFixed}</Text>
                    <Text style={styles.farePerPerson}>Fixed</Text>
                  </View>

                  {/* Taxi / Cab */}
                  <View style={styles.fareOptionCard}>
                    <Ionicons name="car" size={15} color={KumbhColors.charcoal} />
                    <Text style={styles.fareOptionTitle}>Taxi / Cab</Text>
                    <Text style={styles.farePriceMain}>₹{route.taxiCab}</Text>
                    <Text style={styles.farePerPerson}>4-Seater</Text>
                  </View>
                </View>

                {/* Advisory Note & Footer */}
                <View style={styles.routeFooterRow}>
                  <View style={styles.routeNoteGroup}>
                    <Ionicons name="shield-checkmark" size={13} color="#16A34A" />
                    <Text style={styles.routeAdvisoryText} numberOfLines={1}>
                      {route.trafficNote || 'RTO Authorized Tariff'}
                    </Text>
                  </View>

                  {isAdminMode ? (
                    <TouchableOpacity
                      style={styles.adminEditBtn}
                      onPress={() => prepareRouteEdit(route)}>
                      <Ionicons name="create-outline" size={13} color={KumbhColors.primaryDark} />
                      <Text style={styles.adminEditText}>Edit</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.reportSmallBtn}
                      onPress={() => setActiveTab('help')}>
                      <Text style={styles.reportSmallText}>Report Overcharging</Text>
                    </TouchableOpacity>
                  )}
                </View>

              </View>
            );
          })
        )}

        {/* SECTION 2: ESSENTIAL COMMODITY RATES */}
        <View style={[styles.sectionHeaderRow, { marginTop: 18 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name="pricetags-outline" size={16} color={KumbhColors.primaryDark} />
            <Text style={styles.sectionTitle}>{t.standardFoodRates}</Text>
          </View>
          {isAdminMode && (
            <View style={styles.adminBadgeSmall}>
              <Text style={styles.adminBadgeSmallText}>Admin Editable</Text>
            </View>
          )}
        </View>

        <View style={styles.priceItemsList}>
          {standardPrices.length === 0 ? (
            <View style={styles.emptyCommodityBox}>
              <Ionicons name="receipt-outline" size={24} color="#94A3B8" />
              <Text style={styles.emptyCommodityText}>
                No official ceiling rates listed yet. Administration will publish regulated item prices.
              </Text>
            </View>
          ) : (
            standardPrices.map((item: StandardPriceItem) => {
              const name = item.name[language] || item.name.hi || item.name.en;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.priceItemCard}
                  disabled={!isAdminMode}
                  onPress={() => prepareItemEdit(item)}
                  activeOpacity={0.7}>
                  <View style={styles.priceItemLeft}>
                    <View style={styles.itemTextCol}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                        <Text style={styles.itemName}>{name}</Text>
                        {isAdminMode && (
                          <Ionicons name="pencil-sharp" size={11} color={KumbhColors.primary} />
                        )}
                      </View>
                      <Text style={styles.itemNotice}>{item.govtNotice}</Text>
                    </View>
                  </View>

                  <View style={styles.priceItemRight}>
                    <Text style={styles.itemMaxPrice}>
                      {item.standardMaxPrice === 0 ? 'FREE' : `₹${item.standardMaxPrice}`}
                    </Text>
                    <Text style={styles.itemUnit}>{item.unit}</Text>
                  </View>
                </TouchableOpacity>
              );
            })
          )}
        </View>

        {/* Overcharging Complaint Action Link */}
        <TouchableOpacity
          style={styles.reportOverchargeCta}
          onPress={() => setActiveTab('help')}
          activeOpacity={0.85}>
          <Ionicons name="alert-circle" size={18} color="#FFFFFF" />
          <View style={styles.ctaTextBox}>
            <Text style={styles.ctaTitle}>Report Overcharging / Unfair Pricing</Text>
            <Text style={styles.ctaSub}>Submit a direct report to administration enforcement →</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>

      {/* ADMIN PIN AUTH MODAL */}
      <Modal visible={isPinModalOpen} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.pinModalCard}>
            <View style={styles.pinIconCircle}>
              <FontAwesome5 name="user-shield" size={24} color={KumbhColors.primaryDark} />
            </View>
            <Text style={styles.pinModalTitle}>RTO Authority Login</Text>
            <Text style={styles.pinModalSub}>
              Enter Kumbh Administration passcode to modify transit routes & ceiling tariffs.
            </Text>

            <TextInput
              style={styles.pinInput}
              placeholder="Enter PIN (Default: 1008)"
              placeholderTextColor="#94A3B8"
              secureTextEntry
              keyboardType="number-pad"
              value={enteredPin}
              onChangeText={(txt) => {
                setEnteredPin(txt);
                setPinError('');
              }}
              maxLength={8}
            />

            {pinError ? <Text style={styles.pinErrorText}>{pinError}</Text> : null}

            <View style={styles.pinBtnRow}>
              <TouchableOpacity
                style={styles.pinCancelBtn}
                onPress={() => {
                  setIsPinModalOpen(false);
                  setEnteredPin('');
                  setPinError('');
                }}>
                <Text style={styles.pinCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pinSubmitBtn} onPress={handleAdminAuth}>
                <Text style={styles.pinSubmitText}>Unlock Admin</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ADMIN ROUTE CREATE / EDIT MODAL */}
      <Modal visible={isEditRouteModalOpen} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.editRouteModalCard}>
            <View style={styles.editModalHeader}>
              <View>
                <Text style={styles.editModalTitle}>
                  {editingRoute ? 'Edit Route Tariff' : 'Create New Route Tariff'}
                </Text>
                <Text style={styles.editModalSub}>Set official ceiling price rates for Yatris</Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsEditRouteModalOpen(false)}
                style={styles.modalCloseBtn}>
                <Ionicons name="close" size={18} color="#64748B" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.editFormScroll} showsVerticalScrollIndicator={false}>
              {/* Origin & Destination Names */}
              <View style={styles.editFieldFull}>
                <Text style={styles.editLabel}>Origin Stop / Landmark *</Text>
                <TextInput
                  style={styles.editInput}
                  value={editFrom}
                  onChangeText={setEditFrom}
                  placeholder="e.g. Nashik Road Railway Station"
                />
              </View>

              <View style={styles.editFieldFull}>
                <Text style={styles.editLabel}>Destination Stop / Landmark *</Text>
                <TextInput
                  style={styles.editInput}
                  value={editTo}
                  onChangeText={setEditTo}
                  placeholder="e.g. Ramkund / Panchavati Ghats"
                />
              </View>

              <View style={styles.editInputsGrid}>
                {/* Shared Auto */}
                <View style={styles.editField}>
                  <Text style={styles.editLabel}>Shared Auto (₹/Person)</Text>
                  <TextInput
                    style={styles.editInput}
                    keyboardType="numeric"
                    value={editSharedAuto}
                    onChangeText={setEditSharedAuto}
                    placeholder="e.g. 20"
                  />
                </View>

                {/* Kumbh City Bus */}
                <View style={styles.editField}>
                  <Text style={styles.editLabel}>City Bus (₹/Person)</Text>
                  <TextInput
                    style={styles.editInput}
                    keyboardType="numeric"
                    value={editBus}
                    onChangeText={setEditBus}
                    placeholder="e.g. 15"
                  />
                </View>

                {/* Private Auto Fixed */}
                <View style={styles.editField}>
                  <Text style={styles.editLabel}>Private Auto Fixed (₹)</Text>
                  <TextInput
                    style={styles.editInput}
                    keyboardType="numeric"
                    value={editPrivateAuto}
                    onChangeText={setEditPrivateAuto}
                    placeholder="e.g. 80"
                  />
                </View>

                {/* Taxi / Cab */}
                <View style={styles.editField}>
                  <Text style={styles.editLabel}>Taxi / Cab (₹)</Text>
                  <TextInput
                    style={styles.editInput}
                    keyboardType="numeric"
                    value={editTaxi}
                    onChangeText={setEditTaxi}
                    placeholder="e.g. 150"
                  />
                </View>

                {/* Distance Km */}
                <View style={styles.editField}>
                  <Text style={styles.editLabel}>Distance (Km)</Text>
                  <TextInput
                    style={styles.editInput}
                    keyboardType="numeric"
                    value={editDistance}
                    onChangeText={setEditDistance}
                    placeholder="e.g. 5.5"
                  />
                </View>

                {/* Approx Minutes */}
                <View style={styles.editField}>
                  <Text style={styles.editLabel}>Est. Minutes</Text>
                  <TextInput
                    style={styles.editInput}
                    keyboardType="numeric"
                    value={editMinutes}
                    onChangeText={setEditMinutes}
                    placeholder="e.g. 20"
                  />
                </View>
              </View>

              {/* Traffic / Route Advisory Note */}
              <View style={styles.editFieldFull}>
                <Text style={styles.editLabel}>Advisory / Route Notes</Text>
                <TextInput
                  style={[styles.editInput, { height: 50 }]}
                  multiline
                  value={editNote}
                  onChangeText={setEditNote}
                  placeholder="e.g. Frequent city bus and shuttle available"
                />
              </View>

              {adminSaveSuccess ? (
                <View style={styles.saveSuccessBanner}>
                  <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
                  <Text style={styles.saveSuccessText}>Tariff saved and synced live!</Text>
                </View>
              ) : null}

              <TouchableOpacity
                style={styles.saveRouteBtn}
                onPress={handleSaveRouteFare}
                activeOpacity={0.85}>
                <Ionicons name="save-outline" size={16} color="#FFFFFF" />
                <Text style={styles.saveRouteBtnText}>Save Route Tariff</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ADMIN COMMODITY PRICE EDIT MODAL */}
      <Modal visible={isEditPriceModalOpen} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.editPriceModalCard}>
            <View style={styles.editModalHeader}>
              <View>
                <Text style={styles.editModalTitle}>Update Ceiling Price</Text>
                <Text style={styles.editModalSub}>
                  {editingPriceItem ? (editingPriceItem.name[language] || editingPriceItem.name.en) : ''}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsEditPriceModalOpen(false)}
                style={styles.modalCloseBtn}>
                <Ionicons name="close" size={18} color="#64748B" />
              </TouchableOpacity>
            </View>

            <View style={styles.editFieldFull}>
              <Text style={styles.editLabel}>Maximum Official Rate (₹ - 0 for Free)</Text>
              <TextInput
                style={styles.editInput}
                keyboardType="numeric"
                value={editItemMaxPrice}
                onChangeText={setEditItemMaxPrice}
              />
            </View>

            <View style={styles.editFieldFull}>
              <Text style={styles.editLabel}>Government Regulatory Notice</Text>
              <TextInput
                style={[styles.editInput, { height: 60 }]}
                multiline
                value={editItemNotice}
                onChangeText={setEditItemNotice}
              />
            </View>

            <TouchableOpacity
              style={styles.saveRouteBtn}
              onPress={handleSaveStandardPrice}
              activeOpacity={0.85}>
              <Ionicons name="save-outline" size={16} color="#FFFFFF" />
              <Text style={styles.saveRouteBtnText}>Save Commodity Price</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: KumbhColors.background,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeDark,
  },
  headerSub: {
    fontSize: 11,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_400Regular',
  },
  adminHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    gap: 5,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  adminHeaderBtnActive: {
    backgroundColor: KumbhColors.primary,
    borderColor: KumbhColors.primaryDark,
  },
  adminHeaderBtnText: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.primaryDark,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 12.5,
    fontFamily: 'Poppins_400Regular',
    color: KumbhColors.charcoal,
  },
  scrollContent: {
    padding: 16,
  },
  adminBanner: {
    backgroundColor: '#1E293B',
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
  },
  adminBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  adminBadgeIcon: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: KumbhColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminBannerTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
  },
  adminBannerSub: {
    color: '#94A3B8',
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
  },
  adminBannerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  adminAddRouteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: KumbhColors.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    gap: 4,
  },
  adminAddRouteText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
  },
  adminExitBtn: {
    backgroundColor: '#334155',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  adminExitText: {
    color: '#CBD5E1',
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 13.5,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeDark,
  },
  countBadge: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  countBadgeText: {
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.textSecondary,
  },
  emptyRoutesCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  emptyTitle: {
    fontSize: 13.5,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeBrown,
    marginTop: 8,
  },
  emptySub: {
    fontSize: 11,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 16,
  },
  routeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
  },
  routeCardSelected: {
    borderColor: KumbhColors.primary,
    backgroundColor: '#FFFBEB',
  },
  routeTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  routePairBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  routeName: {
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeDark,
  },
  distancePill: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  distancePillText: {
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.textSecondary,
  },
  fareOptionsGrid: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  fareOptionCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  fareOptionCardHighlight: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  fareOptionTitle: {
    fontSize: 9.5,
    fontFamily: 'Poppins_500Medium',
    color: KumbhColors.textSecondary,
    marginTop: 2,
  },
  farePriceMain: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeDark,
    marginTop: 1,
  },
  farePerPerson: {
    fontSize: 8.5,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_400Regular',
  },
  routeFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  routeNoteGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  routeAdvisoryText: {
    fontSize: 10.5,
    fontFamily: 'Poppins_500Medium',
    color: KumbhColors.textSecondary,
  },
  reportSmallBtn: {
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  reportSmallText: {
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.secondaryDark,
  },
  adminEditBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    gap: 4,
  },
  adminEditText: {
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.primaryDark,
  },
  adminBadgeSmall: {
    backgroundColor: '#FEF3C7',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  adminBadgeSmallText: {
    fontSize: 9.5,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.primaryDark,
  },
  priceItemsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  priceItemCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  priceItemLeft: {
    flex: 1,
  },
  itemTextCol: {
    gap: 2,
  },
  itemName: {
    fontSize: 12.5,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.templeDark,
  },
  itemNotice: {
    fontSize: 10,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_400Regular',
  },
  priceItemRight: {
    alignItems: 'flex-end',
  },
  itemMaxPrice: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.success,
  },
  itemUnit: {
    fontSize: 9.5,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_400Regular',
  },
  emptyCommodityBox: {
    padding: 20,
    alignItems: 'center',
  },
  emptyCommodityText: {
    fontSize: 11,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginTop: 4,
  },
  reportOverchargeCta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    borderRadius: 8,
    padding: 12,
    marginTop: 14,
    gap: 10,
  },
  ctaTextBox: {
    flex: 1,
  },
  ctaTitle: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
  },
  ctaSub: {
    color: '#FEE2E2',
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  pinModalCard: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  pinIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  pinModalTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeDark,
  },
  pinModalSub: {
    fontSize: 11,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 14,
  },
  pinInput: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 10,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.charcoal,
  },
  pinErrorText: {
    color: '#DC2626',
    fontSize: 10.5,
    fontFamily: 'Poppins_500Medium',
    marginTop: 6,
  },
  pinBtnRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 14,
    width: '100%',
  },
  pinCancelBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
  },
  pinCancelText: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: '#64748B',
  },
  pinSubmitBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: KumbhColors.primary,
    alignItems: 'center',
  },
  pinSubmitText: {
    fontSize: 11,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
  },
  editRouteModalCard: {
    width: '100%',
    maxWidth: 380,
    maxHeight: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  editPriceModalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  editModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  editModalTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeDark,
  },
  editModalSub: {
    fontSize: 11,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_400Regular',
  },
  modalCloseBtn: {
    padding: 4,
  },
  editFormScroll: {
    maxHeight: 400,
  },
  editInputsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 8,
  },
  editField: {
    width: '48%',
  },
  editFieldFull: {
    width: '100%',
    marginBottom: 8,
  },
  editLabel: {
    fontSize: 10.5,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.charcoal,
    marginBottom: 3,
  },
  editInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: KumbhColors.charcoal,
  },
  saveSuccessBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#DCFCE7',
    padding: 8,
    borderRadius: 6,
    marginBottom: 8,
  },
  saveSuccessText: {
    color: '#15803D',
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
  },
  saveRouteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: KumbhColors.primary,
    borderRadius: 6,
    paddingVertical: 9,
    gap: 6,
    marginTop: 4,
  },
  saveRouteBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
  },
});

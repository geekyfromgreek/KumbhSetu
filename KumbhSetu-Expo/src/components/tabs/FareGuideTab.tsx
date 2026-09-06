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
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useApp } from '@/context/AppContext';
import {
  TRANSIT_LOCATIONS,
  TransitLocation,
  calculateFare,
  RouteFare,
  StandardPriceItem,
} from '@/data/fareData';
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
    resetRouteFaresToDefault,
    standardPrices,
    updateStandardPrice,
    resetStandardPricesToDefault,
  } = useApp();

  const [fromLocation, setFromLocation] = useState<TransitLocation | null>(null);
  const [toLocation, setToLocation] = useState<TransitLocation | null>(null);

  const [fromQuery, setFromQuery] = useState<string>('');
  const [toQuery, setToQuery] = useState<string>('');
  const [activePicker, setActivePicker] = useState<'none' | 'from' | 'to'>('none');

  // Admin Pin Auth Modal
  const [isPinModalOpen, setIsPinModalOpen] = useState<boolean>(false);
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  // Admin Route Fare Edit Modal
  const [isEditRouteModalOpen, setIsEditRouteModalOpen] = useState<boolean>(false);
  const [editingRoute, setEditingRoute] = useState<RouteFare | null>(null);
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

  // Admin Master Tariff Sheet Modal
  const [isMasterListOpen, setIsMasterListOpen] = useState<boolean>(false);
  const [masterSearchQuery, setMasterSearchQuery] = useState<string>('');

  const fareResult =
    fromLocation && toLocation
      ? calculateFare(fromLocation.id, toLocation.id, routeFares)
      : null;

  const getLocName = (loc: TransitLocation | null) => {
    if (!loc) return '';
    return loc.name[language] || loc.name.hi || loc.name.en;
  };

  const getLocNameById = (locId: string) => {
    const loc = TRANSIT_LOCATIONS.find((l) => l.id === locId);
    return loc ? getLocName(loc) : locId;
  };

  const filteredFromLocations = TRANSIT_LOCATIONS.filter((l) => {
    const name = (l.name[language] || l.name.hi || l.name.en).toLowerCase();
    return !fromQuery || name.includes(fromQuery.toLowerCase());
  });

  const filteredToLocations = TRANSIT_LOCATIONS.filter((l) => {
    const name = (l.name[language] || l.name.hi || l.name.en).toLowerCase();
    return !toQuery || name.includes(toQuery.toLowerCase());
  });

  const handleSwap = () => {
    if (!fromLocation && !toLocation) return;
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  // Open Admin Edit for Current Calculated Route
  const handleOpenEditCurrentRoute = () => {
    if (!fareResult || !fromLocation || !toLocation) return;
    const currentRoute: RouteFare = {
      id: fareResult.id || `rf_${fromLocation.id}_${toLocation.id}`,
      fromId: fromLocation.id,
      toId: toLocation.id,
      distanceKm: fareResult.distanceKm,
      sharedAutoPerPerson: fareResult.sharedAutoPerPerson,
      privateAutoFixed: fareResult.privateAutoFixed,
      kumbhCityBus: fareResult.kumbhCityBus,
      taxiCab: fareResult.taxiCab,
      approxMinutes: fareResult.approxMinutes,
      trafficNote: fareResult.trafficNote,
    };
    prepareRouteEdit(currentRoute);
  };

  const prepareRouteEdit = (route: RouteFare) => {
    setEditingRoute(route);
    setEditSharedAuto(String(route.sharedAutoPerPerson));
    setEditPrivateAuto(String(route.privateAutoFixed));
    setEditBus(String(route.kumbhCityBus));
    setEditTaxi(String(route.taxiCab));
    setEditDistance(String(route.distanceKm));
    setEditMinutes(String(route.approxMinutes));
    setEditNote(route.trafficNote || '');
    setAdminSaveSuccess(false);
    setIsEditRouteModalOpen(true);
  };

  const handleSaveRouteFare = async () => {
    if (!editingRoute) return;
    const updated: RouteFare = {
      ...editingRoute,
      sharedAutoPerPerson: parseFloat(editSharedAuto) || 0,
      privateAutoFixed: parseFloat(editPrivateAuto) || 0,
      kumbhCityBus: parseFloat(editBus) || 0,
      taxiCab: parseFloat(editTaxi) || 0,
      distanceKm: parseFloat(editDistance) || 0,
      approxMinutes: parseInt(editMinutes, 10) || 0,
      trafficNote: editNote.trim() || 'प्रशासन द्वारा अद्यतन मार्ग (Admin Updated)',
    };

    await updateRouteFare(updated);
    setAdminSaveSuccess(true);
    setTimeout(() => {
      setIsEditRouteModalOpen(false);
      setAdminSaveSuccess(false);
    }, 900);
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

  const handleResetDefaults = () => {
    Alert.alert(
      'Reset to Official Fares',
      'Are you sure you want to restore default government gazette route fares and standard commodity prices?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Restore Defaults',
          style: 'destructive',
          onPress: async () => {
            await resetRouteFaresToDefault();
            await resetStandardPricesToDefault();
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.scrollContent,
        { paddingTop: Math.max(insets.top + 12, 20), paddingBottom: Math.max(insets.bottom + 80, 90) },
      ]}
      showsVerticalScrollIndicator={false}>
      {/* Top Banner & Header */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>{t.fareTitle}</Text>
            <Text style={styles.headerSub}>{t.fareSubtitle}</Text>
          </View>

          {/* Admin Mode Toggle / Indicator */}
          <TouchableOpacity
            style={[styles.adminHeaderBtn, isAdminMode && styles.adminHeaderBtnActive]}
            onPress={() => {
              if (isAdminMode) {
                setIsMasterListOpen(true);
              } else {
                setIsPinModalOpen(true);
              }
            }}
            activeOpacity={0.8}>
            <FontAwesome5
              name={isAdminMode ? 'user-shield' : 'lock'}
              size={12}
              color={isAdminMode ? '#FFFFFF' : KumbhColors.primaryDark}
            />
            <Text style={[styles.adminHeaderBtnText, isAdminMode && { color: '#FFFFFF' }]}>
              {isAdminMode ? 'Admin Portal' : 'Admin'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Admin Mode Active Banner */}
      {isAdminMode && (
        <View style={styles.adminBanner}>
          <View style={styles.adminBannerLeft}>
            <View style={styles.adminBadgeIcon}>
              <FontAwesome5 name="shield-alt" size={13} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.adminBannerTitle}>RTO Admin Authority Mode</Text>
              <Text style={styles.adminBannerSub}>You can modify route tariffs & commodity ceiling rates</Text>
            </View>
          </View>
          <View style={styles.adminBannerActions}>
            <TouchableOpacity
              style={styles.adminManageRoutesBtn}
              onPress={() => setIsMasterListOpen(true)}>
              <Text style={styles.adminManageRoutesText}>All Routes ({routeFares.length})</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.adminResetBtn}
              onPress={handleResetDefaults}>
              <Ionicons name="refresh" size={12} color="#DC2626" />
              <Text style={styles.adminResetText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.adminExitBtn}
              onPress={() => setIsAdminMode(false)}>
              <Text style={styles.adminExitText}>Exit</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* ROUTE FARE CALCULATOR CARD */}
      <View style={styles.routeCard}>
        <View style={styles.routeCardHeader}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Ionicons name="calculator-outline" size={16} color={KumbhColors.primaryDark} />
            <Text style={styles.routeCardTitle}>{t.selectRoute}</Text>
          </View>
          {fareResult ? (
            <Text style={styles.distanceBadge}>
              {fareResult.distanceKm} km • ~{fareResult.approxMinutes} mins
            </Text>
          ) : null}
        </View>

        {/* Pickup Field */}
        <View style={styles.locationSelectorGroup}>
          <Text style={styles.locationLabel}>{t.fromLocation}:</Text>
          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => setActivePicker(activePicker === 'from' ? 'none' : 'from')}>
            <Ionicons name="pin" size={14} color={KumbhColors.primary} />
            <Text
              style={[
                styles.locationBtnText,
                !fromLocation && { color: KumbhColors.textMuted },
              ]}
              numberOfLines={1}>
              {fromLocation ? getLocName(fromLocation) : 'Select origin'}
            </Text>
            <Ionicons name="chevron-down" size={14} color="#64748B" />
          </TouchableOpacity>

          {/* Autocomplete dropdown */}
          {activePicker === 'from' && (
            <View style={styles.suggestionsBox}>
              <TextInput
                style={styles.suggestionInput}
                placeholder="Search location..."
                placeholderTextColor={KumbhColors.textMuted}
                value={fromQuery}
                onChangeText={setFromQuery}
                autoFocus
              />
              <ScrollView style={styles.suggestionsList} nestedScrollEnabled>
                {filteredFromLocations.map((loc) => (
                  <TouchableOpacity
                    key={loc.id}
                    style={styles.suggestionItem}
                    onPress={() => {
                      setFromLocation(loc);
                      setActivePicker('none');
                      setFromQuery('');
                    }}>
                    <Text style={styles.suggText}>{getLocName(loc)}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Swap Button */}
        <View style={styles.swapRow}>
          <View style={styles.swapLine} />
          <TouchableOpacity style={styles.swapBtn} onPress={handleSwap}>
            <Ionicons name="swap-vertical" size={14} color={KumbhColors.primaryDark} />
          </TouchableOpacity>
          <View style={styles.swapLine} />
        </View>

        {/* Destination Field */}
        <View style={styles.locationSelectorGroup}>
          <Text style={styles.locationLabel}>{t.toLocation}:</Text>
          <TouchableOpacity
            style={styles.locationButton}
            onPress={() => setActivePicker(activePicker === 'to' ? 'none' : 'to')}>
            <Ionicons name="navigate-circle" size={14} color={KumbhColors.secondary} />
            <Text
              style={[
                styles.locationBtnText,
                !toLocation && { color: KumbhColors.textMuted },
              ]}
              numberOfLines={1}>
              {toLocation ? getLocName(toLocation) : 'Select destination'}
            </Text>
            <Ionicons name="chevron-down" size={14} color="#64748B" />
          </TouchableOpacity>

          {/* Autocomplete dropdown */}
          {activePicker === 'to' && (
            <View style={styles.suggestionsBox}>
              <TextInput
                style={styles.suggestionInput}
                placeholder="Search location..."
                placeholderTextColor={KumbhColors.textMuted}
                value={toQuery}
                onChangeText={setToQuery}
                autoFocus
              />
              <ScrollView style={styles.suggestionsList} nestedScrollEnabled>
                {filteredToLocations.map((loc) => (
                  <TouchableOpacity
                    key={loc.id}
                    style={styles.suggestionItem}
                    onPress={() => {
                      setToLocation(loc);
                      setActivePicker('none');
                      setToQuery('');
                    }}>
                    <Text style={styles.suggText}>{getLocName(loc)}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {fareResult ? (
          <>
            {/* Route Note & Last Updated */}
            <View style={styles.routeNoteBox}>
              <Ionicons name="information-circle" size={15} color={KumbhColors.riverBlueDark} />
              <View style={{ flex: 1 }}>
                <Text style={styles.routeNoteText}>{fareResult.trafficNote}</Text>
                {fareResult.lastUpdatedAt && (
                  <Text style={styles.routeUpdatedTag}>
                    Authorized tariff • {fareResult.lastUpdatedAt}
                  </Text>
                )}
              </View>
            </View>

            {/* FARE OPTIONS GRID */}
            <View style={styles.fareOptionsGrid}>
              <View style={styles.fareOptionCard}>
                <Ionicons name="people" size={16} color={KumbhColors.primary} />
                <Text style={styles.fareOptionTitle}>{t.sharedAuto}</Text>
                <Text style={styles.farePriceMain}>₹{fareResult.sharedAutoPerPerson}</Text>
                <Text style={styles.farePerPerson}>{t.perPerson}</Text>
              </View>

              <View style={[styles.fareOptionCard, styles.fareOptionCardHighlight]}>
                <Ionicons name="bus" size={16} color="#16A34A" />
                <Text style={styles.fareOptionTitle}>{t.kumbhBus}</Text>
                <Text style={[styles.farePriceMain, { color: '#16A34A' }]}>
                  ₹{fareResult.kumbhCityBus}
                </Text>
                <Text style={styles.farePerPerson}>{t.perPerson}</Text>
              </View>

              <View style={styles.fareOptionCard}>
                <MaterialCommunityIcons name="rickshaw" size={16} color={KumbhColors.primaryDark} />
                <Text style={styles.fareOptionTitle}>{t.privateAuto}</Text>
                <Text style={styles.farePriceMain}>₹{fareResult.privateAutoFixed}</Text>
                <Text style={styles.farePerPerson}>Fixed</Text>
              </View>

              <View style={styles.fareOptionCard}>
                <Ionicons name="car" size={16} color={KumbhColors.charcoal} />
                <Text style={styles.fareOptionTitle}>Taxi / Cab</Text>
                <Text style={styles.farePriceMain}>₹{fareResult.taxiCab}</Text>
                <Text style={styles.farePerPerson}>4-Seater</Text>
              </View>
            </View>

            {/* Admin Edit Trigger for this Route */}
            {isAdminMode && (
              <TouchableOpacity
                style={styles.adminEditThisRouteBtn}
                onPress={handleOpenEditCurrentRoute}
                activeOpacity={0.85}>
                <Ionicons name="create-outline" size={15} color="#FFFFFF" />
                <Text style={styles.adminEditThisRouteText}>Admin: Edit Pricing For This Route</Text>
              </TouchableOpacity>
            )}
          </>
        ) : fromLocation && toLocation ? (
          <View style={styles.unselectedPrompt}>
            <Ionicons name="alert-circle-outline" size={28} color={KumbhColors.primary} />
            <Text style={[styles.unselectedPromptText, { fontFamily: 'Poppins_600SemiBold', color: KumbhColors.templeDark }]}>
              No official tariff configured for this route yet
            </Text>
            <Text style={[styles.unselectedPromptText, { fontSize: 11 }]}>
              {isAdminMode
                ? 'As Admin, you can establish the authorized rates for this transit pair now.'
                : 'Rates will appear once authorized by RTO & Mela Administration.'}
            </Text>
            {isAdminMode && (
              <TouchableOpacity
                style={[styles.adminEditThisRouteBtn, { marginTop: 10 }]}
                onPress={() => {
                  const newRoute: RouteFare = {
                    id: `rf_${fromLocation.id}_${toLocation.id}`,
                    fromId: fromLocation.id,
                    toId: toLocation.id,
                    distanceKm: 5.0,
                    sharedAutoPerPerson: 20,
                    privateAutoFixed: 80,
                    kumbhCityBus: 15,
                    taxiCab: 150,
                    approxMinutes: 15,
                    trafficNote: 'नया अधिकृत मार्ग (Newly authorized route)',
                  };
                  prepareRouteEdit(newRoute);
                }}>
                <Ionicons name="add-circle-outline" size={16} color="#FFFFFF" />
                <Text style={styles.adminEditThisRouteText}>+ Set Route Tariff as Admin</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.unselectedPrompt}>
            <Ionicons name="map-outline" size={24} color="#94A3B8" />
            <Text style={styles.unselectedPromptText}>Select origin and destination to view official rates</Text>
          </View>
        )}
      </View>

      {/* STANDARD COMMODITY RATE INDEX */}
      <View style={styles.foodSection}>
        <View style={styles.foodSectionHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.foodSectionTitle}>{t.standardFoodRates}</Text>
            <Text style={styles.foodSectionSub}>{t.standardRatesNote}</Text>
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
              <Ionicons name="pricetags-outline" size={26} color="#94A3B8" />
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
      </View>

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

      {/* ADMIN ROUTE FARE EDIT MODAL */}
      <Modal visible={isEditRouteModalOpen} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.editRouteModalCard}>
            <View style={styles.editModalHeader}>
              <View>
                <Text style={styles.editModalTitle}>Update Route Tariff</Text>
                <Text style={styles.editModalSub}>
                  {editingRoute ? `${getLocNameById(editingRoute.fromId)} ➔ ${getLocNameById(editingRoute.toId)}` : ''}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsEditRouteModalOpen(false)}
                style={styles.modalCloseBtn}>
                <Ionicons name="close" size={18} color="#64748B" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.editFormScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.editInputsGrid}>
                {/* Shared Auto */}
                <View style={styles.editField}>
                  <Text style={styles.editLabel}>Shared Auto (₹/Person)</Text>
                  <TextInput
                    style={styles.editInput}
                    keyboardType="numeric"
                    value={editSharedAuto}
                    onChangeText={setEditSharedAuto}
                    placeholder="e.g. 30"
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
                    placeholder="e.g. 140"
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
                    placeholder="e.g. 250"
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
                    placeholder="e.g. 10.5"
                  />
                </View>

                {/* Approx Minutes */}
                <View style={styles.editField}>
                  <Text style={styles.editLabel}>Est. Travel Time (Mins)</Text>
                  <TextInput
                    style={styles.editInput}
                    keyboardType="numeric"
                    value={editMinutes}
                    onChangeText={setEditMinutes}
                    placeholder="e.g. 25"
                  />
                </View>
              </View>

              {/* Traffic / Route Advisory Note */}
              <View style={styles.editFieldFull}>
                <Text style={styles.editLabel}>Traffic / Route Advisory</Text>
                <TextInput
                  style={[styles.editInput, { height: 60 }]}
                  multiline
                  value={editNote}
                  onChangeText={setEditNote}
                  placeholder="e.g. 24x7 Direct CityLink Bus Available"
                />
              </View>

              {adminSaveSuccess ? (
                <View style={styles.saveSuccessBanner}>
                  <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
                  <Text style={styles.saveSuccessText}>Tariff updated successfully and persisted!</Text>
                </View>
              ) : null}

              <TouchableOpacity
                style={styles.saveRouteBtn}
                onPress={handleSaveRouteFare}
                activeOpacity={0.85}>
                <Ionicons name="save-outline" size={16} color="#FFFFFF" />
                <Text style={styles.saveRouteBtnText}>Save Tariff Rate</Text>
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

      {/* ADMIN MASTER ALL ROUTES MODAL */}
      <Modal visible={isMasterListOpen} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.masterListModalCard}>
            <View style={styles.editModalHeader}>
              <View>
                <Text style={styles.editModalTitle}>RTO Tariff Master List</Text>
                <Text style={styles.editModalSub}>Manage all active official routes ({routeFares.length})</Text>
              </View>
              <TouchableOpacity
                onPress={() => setIsMasterListOpen(false)}
                style={styles.modalCloseBtn}>
                <Ionicons name="close" size={18} color="#64748B" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.masterSearchInput}
              placeholder="Search route (e.g. Trimbak, Station, Ghat)..."
              placeholderTextColor="#94A3B8"
              value={masterSearchQuery}
              onChangeText={setMasterSearchQuery}
            />

            <ScrollView style={styles.masterListScroll} showsVerticalScrollIndicator={false}>
              {routeFares
                .filter((rf) => {
                  const from = getLocNameById(rf.fromId).toLowerCase();
                  const to = getLocNameById(rf.toId).toLowerCase();
                  const q = masterSearchQuery.toLowerCase();
                  return !q || from.includes(q) || to.includes(q);
                })
                .map((rf) => (
                  <View key={rf.id} style={styles.masterRouteItem}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.masterRoutePair}>
                        {getLocNameById(rf.fromId)} ➔ {getLocNameById(rf.toId)}
                      </Text>
                      <Text style={styles.masterRouteDetails}>
                        {rf.distanceKm} km • Shared ₹{rf.sharedAutoPerPerson} • Bus ₹{rf.kumbhCityBus} • Auto ₹{rf.privateAutoFixed} • Cab ₹{rf.taxiCab}
                      </Text>
                      {rf.lastUpdatedAt && (
                        <Text style={styles.masterRouteUpdated}>{rf.lastUpdatedAt}</Text>
                      )}
                    </View>

                    <TouchableOpacity
                      style={styles.masterEditBtn}
                      onPress={() => {
                        prepareRouteEdit(rf);
                      }}>
                      <Ionicons name="create" size={14} color="#FFFFFF" />
                      <Text style={styles.masterEditText}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: KumbhColors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 10,
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
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
    marginTop: 1,
  },
  adminHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: KumbhColors.primarySoft,
    borderWidth: 1,
    borderColor: KumbhColors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  adminHeaderBtnActive: {
    backgroundColor: KumbhColors.primaryDark,
    borderColor: KumbhColors.primaryDark,
  },
  adminHeaderBtnText: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.primaryDark,
  },
  adminBanner: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#F59E0B',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  adminBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  adminBadgeIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#D97706',
    alignItems: 'center',
    justifyContent: 'center',
  },
  adminBannerTitle: {
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
    color: '#92400E',
  },
  adminBannerSub: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#B45309',
  },
  adminBannerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  adminManageRoutesBtn: {
    backgroundColor: '#D97706',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  adminManageRoutesText: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontFamily: 'Poppins_600SemiBold',
  },
  adminResetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FCA5A5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  adminResetText: {
    color: '#DC2626',
    fontSize: 10.5,
    fontFamily: 'Poppins_600SemiBold',
  },
  adminExitBtn: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  adminExitText: {
    color: '#4B5563',
    fontSize: 10.5,
    fontFamily: 'Poppins_500Medium',
  },
  routeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 14,
  },
  routeCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  routeCardTitle: {
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeDark,
  },
  distanceBadge: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 6,
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.textSecondary,
  },
  locationSelectorGroup: {
    marginBottom: 4,
  },
  locationLabel: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.templeBrown,
    marginBottom: 4,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  locationBtnText: {
    flex: 1,
    fontSize: 12.5,
    fontFamily: 'Poppins_500Medium',
    color: KumbhColors.charcoal,
  },
  suggestionsBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    marginTop: 4,
    padding: 6,
  },
  suggestionInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
    padding: 6,
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 4,
    color: KumbhColors.charcoal,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  suggestionsList: {
    maxHeight: 140,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    gap: 6,
  },
  suggText: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    color: KumbhColors.templeBrown,
  },
  swapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  swapLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  swapBtn: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  routeNoteBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: KumbhColors.riverBlueSoft,
    borderRadius: 6,
    padding: 8,
    marginTop: 8,
    marginBottom: 10,
    gap: 6,
  },
  routeNoteText: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    color: KumbhColors.riverBlueDark,
  },
  routeUpdatedTag: {
    fontSize: 9.5,
    fontFamily: 'Poppins_400Regular',
    color: '#0284C7',
    marginTop: 2,
  },
  fareOptionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'space-between',
  },
  fareOptionCard: {
    width: '48.5%',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  fareOptionCardHighlight: {
    borderColor: KumbhColors.successBorder,
    backgroundColor: '#F0FDF4',
  },
  fareOptionTitle: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.templeDark,
    textAlign: 'center',
    marginTop: 2,
  },
  farePriceMain: {
    fontSize: 17,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.primaryDark,
    marginTop: 1,
  },
  farePerPerson: {
    fontSize: 9.5,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_400Regular',
  },
  adminEditThisRouteBtn: {
    backgroundColor: KumbhColors.primaryDark,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 10,
  },
  adminEditThisRouteText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
  },
  foodSection: {
    marginTop: 2,
  },
  foodSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  foodSectionTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeDark,
  },
  foodSectionSub: {
    fontSize: 11,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_400Regular',
    marginTop: 1,
  },
  adminBadgeSmall: {
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#F59E0B',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  adminBadgeSmallText: {
    fontSize: 9.5,
    fontFamily: 'Poppins_600SemiBold',
    color: '#92400E',
  },
  priceItemsList: {
    gap: 6,
    marginBottom: 12,
  },
  priceItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  itemTextCol: {
    flex: 1,
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
  reportOverchargeCta: {
    backgroundColor: KumbhColors.danger,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
    color: '#FECACA',
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    marginTop: 1,
  },
  unselectedPrompt: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  unselectedPromptText: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    color: KumbhColors.textMuted,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  pinModalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
  },
  pinIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: KumbhColors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  pinModalTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeDark,
  },
  pinModalSub: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: KumbhColors.textMuted,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 14,
  },
  pinInput: {
    width: '100%',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    padding: 10,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.charcoal,
    letterSpacing: 4,
  },
  pinErrorText: {
    color: '#DC2626',
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    marginTop: 6,
  },
  pinBtnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
    width: '100%',
  },
  pinCancelBtn: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  pinCancelText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: '#64748B',
  },
  pinSubmitBtn: {
    flex: 1,
    backgroundColor: KumbhColors.primaryDark,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  pinSubmitText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
  editRouteModalCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    maxHeight: '85%',
  },
  editPriceModalCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
  },
  masterListModalCard: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    maxHeight: '85%',
  },
  editModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  editModalTitle: {
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeDark,
  },
  editModalSub: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    color: KumbhColors.primary,
    marginTop: 1,
  },
  modalCloseBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editFormScroll: {
    maxHeight: 380,
  },
  editInputsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  editField: {
    width: '48%',
    marginBottom: 10,
  },
  editFieldFull: {
    width: '100%',
    marginBottom: 12,
  },
  editLabel: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.templeBrown,
    marginBottom: 4,
  },
  editInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 12.5,
    fontFamily: 'Poppins_500Medium',
    color: KumbhColors.charcoal,
  },
  saveSuccessBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#86EFAC',
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
  },
  saveSuccessText: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: '#16A34A',
  },
  saveRouteBtn: {
    backgroundColor: KumbhColors.primaryDark,
    borderRadius: 8,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 4,
  },
  saveRouteBtnText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontFamily: 'Poppins_700Bold',
  },
  masterSearchInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    padding: 8,
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: KumbhColors.charcoal,
    marginBottom: 10,
  },
  masterListScroll: {
    maxHeight: 340,
  },
  masterRouteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 10,
    marginBottom: 8,
    gap: 8,
  },
  masterRoutePair: {
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeDark,
  },
  masterRouteDetails: {
    fontSize: 10.5,
    fontFamily: 'Poppins_500Medium',
    color: KumbhColors.textSecondary,
    marginTop: 2,
  },
  masterRouteUpdated: {
    fontSize: 9,
    fontFamily: 'Poppins_400Regular',
    color: '#0284C7',
    marginTop: 2,
  },
  emptyCommodityBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 10,
  },
  emptyCommodityText: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: KumbhColors.textMuted,
    textAlign: 'center',
  },
  masterEditBtn: {
    backgroundColor: KumbhColors.primaryDark,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
  },
  masterEditText: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontFamily: 'Poppins_600SemiBold',
  },
});

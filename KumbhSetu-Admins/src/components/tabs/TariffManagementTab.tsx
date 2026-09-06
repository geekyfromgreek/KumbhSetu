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
import { AdminRouteFare, AdminCommodityPrice } from '@/types/admin';

export const TariffManagementTab: React.FC = () => {
  const {
    routes,
    commodities,
    addRoute,
    updateRoute,
    deleteRoute,
    addCommodity,
    updateCommodity,
    deleteCommodity,
  } = useAdmin();

  const [activeSubTab, setActiveSubTab] = useState<'routes' | 'commodities'>('routes');
  const [searchQuery, setSearchQuery] = useState('');

  // Route Modal State
  const [routeModalVisible, setRouteModalVisible] = useState(false);
  const [editingRoute, setEditingRoute] = useState<AdminRouteFare | null>(null);
  const [routeFrom, setRouteFrom] = useState('');
  const [routeTo, setRouteTo] = useState('');
  const [routeDistance, setRouteDistance] = useState('');
  const [routeSharedAuto, setRouteSharedAuto] = useState('');
  const [routePrivateAuto, setRoutePrivateAuto] = useState('');
  const [routeCityBus, setRouteCityBus] = useState('');
  const [routeTaxi, setRouteTaxi] = useState('');
  const [routeMinutes, setRouteMinutes] = useState('');
  const [routeTrafficNote, setRouteTrafficNote] = useState('');
  const [routeStatus, setRouteStatus] = useState<AdminRouteFare['status']>('ACTIVE');

  // Commodity Modal State
  const [commodityModalVisible, setCommodityModalVisible] = useState(false);
  const [editingCommodity, setEditingCommodity] = useState<AdminCommodityPrice | null>(null);
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState<'beverage' | 'food' | 'puja' | 'utility'>('food');
  const [itemStandardMaxPrice, setItemStandardMaxPrice] = useState('');
  const [itemUnit, setItemUnit] = useState('');
  const [itemGovtNotice, setItemGovtNotice] = useState('');
  const [itemComplianceLevel, setItemComplianceLevel] = useState<AdminCommodityPrice['complianceLevel']>('COMPLIANT');

  const openRouteModal = (route?: AdminRouteFare) => {
    if (route) {
      setEditingRoute(route);
      setRouteFrom(route.fromName);
      setRouteTo(route.toName);
      setRouteDistance(route.distanceKm.toString());
      setRouteSharedAuto(route.sharedAutoPerPerson.toString());
      setRoutePrivateAuto(route.privateAutoFixed.toString());
      setRouteCityBus(route.kumbhCityBus.toString());
      setRouteTaxi(route.taxiCab.toString());
      setRouteMinutes(route.approxMinutes.toString());
      setRouteTrafficNote(route.trafficNote || '');
      setRouteStatus(route.status);
    } else {
      setEditingRoute(null);
      setRouteFrom('');
      setRouteTo('');
      setRouteDistance('');
      setRouteSharedAuto('');
      setRoutePrivateAuto('');
      setRouteCityBus('');
      setRouteTaxi('');
      setRouteMinutes('20');
      setRouteTrafficNote('Normal Flow');
      setRouteStatus('ACTIVE');
    }
    setRouteModalVisible(true);
  };

  const handleSaveRoute = async () => {
    if (!routeFrom.trim() || !routeTo.trim()) {
      Alert.alert('Validation Error', 'Origin and Destination are required.');
      return;
    }
    const distanceKm = parseFloat(routeDistance) || 0;
    const sharedAutoPerPerson = parseFloat(routeSharedAuto) || 0;
    const privateAutoFixed = parseFloat(routePrivateAuto) || 0;
    const kumbhCityBus = parseFloat(routeCityBus) || 0;
    const taxiCab = parseFloat(routeTaxi) || 0;
    const approxMinutes = parseInt(routeMinutes, 10) || 15;

    if (editingRoute) {
      await updateRoute({
        ...editingRoute,
        fromName: routeFrom.trim(),
        toName: routeTo.trim(),
        distanceKm,
        sharedAutoPerPerson,
        privateAutoFixed,
        kumbhCityBus,
        taxiCab,
        approxMinutes,
        trafficNote: routeTrafficNote.trim() || 'Normal flow',
        status: routeStatus,
      });
    } else {
      await addRoute({
        fromName: routeFrom.trim(),
        toName: routeTo.trim(),
        distanceKm,
        sharedAutoPerPerson,
        privateAutoFixed,
        kumbhCityBus,
        taxiCab,
        approxMinutes,
        trafficNote: routeTrafficNote.trim() || 'Normal flow',
        status: routeStatus,
      });
    }
    setRouteModalVisible(false);
  };

  const openCommodityModal = (item?: AdminCommodityPrice) => {
    if (item) {
      setEditingCommodity(item);
      setItemName(item.name);
      setItemCategory(item.category);
      setItemStandardMaxPrice(item.standardMaxPrice.toString());
      setItemUnit(item.unit);
      setItemGovtNotice(item.govtNotice);
      setItemComplianceLevel(item.complianceLevel);
    } else {
      setEditingCommodity(null);
      setItemName('');
      setItemCategory('food');
      setItemStandardMaxPrice('');
      setItemUnit('plate / pc');
      setItemGovtNotice('Section 3 Essential Commodities Act Mandate');
      setItemComplianceLevel('COMPLIANT');
    }
    setCommodityModalVisible(true);
  };

  const handleSaveCommodity = async () => {
    if (!itemName.trim() || !itemStandardMaxPrice.trim()) {
      Alert.alert('Validation Error', 'Item Name and Mandated Cap Price are required.');
      return;
    }
    const standardMaxPrice = parseFloat(itemStandardMaxPrice) || 0;

    if (editingCommodity) {
      await updateCommodity({
        ...editingCommodity,
        name: itemName.trim(),
        category: itemCategory,
        standardMaxPrice,
        unit: itemUnit.trim() || 'unit',
        govtNotice: itemGovtNotice.trim() || 'Official Gazette MRP Cap',
        complianceLevel: itemComplianceLevel,
      });
    } else {
      await addCommodity({
        name: itemName.trim(),
        category: itemCategory,
        standardMaxPrice,
        unit: itemUnit.trim() || 'unit',
        govtNotice: itemGovtNotice.trim() || 'Official Gazette MRP Cap',
        complianceLevel: itemComplianceLevel,
      });
    }
    setCommodityModalVisible(false);
  };

  const filteredRoutes = routes.filter(
    (r) =>
      r.fromName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.toName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.trafficNote.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCommodities = commodities.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Sub Tab Switcher */}
      <View style={styles.subTabRow}>
        <TouchableOpacity
          style={[styles.subTabBtn, activeSubTab === 'routes' && styles.subTabBtnActive]}
          onPress={() => setActiveSubTab('routes')}
          activeOpacity={0.75}
        >
          <FontAwesome5
            name="route"
            size={13}
            color={activeSubTab === 'routes' ? AdminColors.saffron : AdminColors.textMuted}
          />
          <Text
            style={[
              styles.subTabBtnText,
              activeSubTab === 'routes' && styles.subTabBtnTextActive,
            ]}
          >
            Transit Routes ({routes.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.subTabBtn, activeSubTab === 'commodities' && styles.subTabBtnActive]}
          onPress={() => setActiveSubTab('commodities')}
          activeOpacity={0.75}
        >
          <FontAwesome5
            name="tags"
            size={13}
            color={activeSubTab === 'commodities' ? AdminColors.saffron : AdminColors.textMuted}
          />
          <Text
            style={[
              styles.subTabBtnText,
              activeSubTab === 'commodities' && styles.subTabBtnTextActive,
            ]}
          >
            Price Caps ({commodities.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Action Bar: Search & Add */}
      <View style={styles.actionBar}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={15} color={AdminColors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder={
              activeSubTab === 'routes'
                ? 'Search routes, destination...'
                : 'Search commodities...'
            }
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

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => (activeSubTab === 'routes' ? openRouteModal() : openCommodityModal())}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={16} color={AdminColors.white} />
          <Text style={styles.addBtnText}>
            {activeSubTab === 'routes' ? 'Add Route' : 'Add Price Cap'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main List Area */}
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
        {activeSubTab === 'routes' ? (
          filteredRoutes.length === 0 ? (
            <View style={styles.emptyState}>
              <FontAwesome5 name="route" size={32} color={AdminColors.saffron} />
              <Text style={styles.emptyStateTitle}>No Routes Gazetted</Text>
              <Text style={styles.emptyStateDesc}>
                {searchQuery
                  ? 'No routes match your search query.'
                  : 'Tap "+ Add Route" to fix official RTO fare ceilings for pilgrims.'}
              </Text>
            </View>
          ) : (
            filteredRoutes.map((route) => (
              <View key={route.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.routePoints}>
                    <View style={styles.routeBadge}>
                      <Text style={styles.routeBadgeText}>{route.distanceKm} KM</Text>
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <Text style={styles.routeFromText}>{route.fromName}</Text>
                      <View style={styles.arrowRow}>
                        <Ionicons name="arrow-down" size={12} color={AdminColors.saffron} />
                        <Text style={styles.zoneTag}>
                          {route.approxMinutes} mins • {route.status}
                        </Text>
                      </View>
                      <Text style={styles.routeToText}>{route.toName}</Text>
                    </View>
                  </View>

                  <View style={styles.cardActions}>
                    <TouchableOpacity
                      style={styles.actionIconButton}
                      onPress={() => openRouteModal(route)}
                    >
                      <Ionicons name="pencil" size={15} color={AdminColors.secondary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionIconButton, { backgroundColor: AdminColors.dangerSoft }]}
                      onPress={() => {
                        Alert.alert('Delete Route', `Remove fare tariff for ${route.fromName} ➔ ${route.toName}?`, [
                          { text: 'Cancel', style: 'cancel' },
                          { text: 'Delete', style: 'destructive', onPress: () => deleteRoute(route.id) },
                        ]);
                      }}
                    >
                      <Ionicons name="trash" size={15} color={AdminColors.danger} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Rates Grid */}
                <View style={styles.ratesGrid}>
                  <View style={styles.rateBox}>
                    <Text style={styles.rateLabel}>Shared Auto</Text>
                    <Text style={styles.rateValue}>₹{route.sharedAutoPerPerson}</Text>
                  </View>
                  <View style={styles.rateBox}>
                    <Text style={styles.rateLabel}>Private Auto</Text>
                    <Text style={styles.rateValue}>₹{route.privateAutoFixed}</Text>
                  </View>
                  <View style={styles.rateBox}>
                    <Text style={styles.rateLabel}>City Bus</Text>
                    <Text style={styles.rateValue}>₹{route.kumbhCityBus}</Text>
                  </View>
                  <View style={styles.rateBox}>
                    <Text style={styles.rateLabel}>Taxi / Cab</Text>
                    <Text style={styles.rateValue}>₹{route.taxiCab}</Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Text style={styles.footerNote}>
                    Updated: {route.updatedAt}
                  </Text>
                  <View style={styles.govtBadge}>
                    <Ionicons name="shield-checkmark" size={12} color={AdminColors.emerald} />
                    <Text style={styles.govtBadgeText}>RTO Mandated</Text>
                  </View>
                </View>
              </View>
            ))
          )
        ) : (
          filteredCommodities.length === 0 ? (
            <View style={styles.emptyState}>
              <FontAwesome5 name="shopping-basket" size={32} color={AdminColors.saffron} />
              <Text style={styles.emptyStateTitle}>No Commodities Listed</Text>
              <Text style={styles.emptyStateDesc}>
                {searchQuery
                  ? 'No items match your search.'
                  : 'Tap "+ Add Price Cap" to enact price ceilings on water, tea, prasad, or meals.'}
              </Text>
            </View>
          ) : (
            filteredCommodities.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.categoryBadgeRow}>
                      <View style={styles.catBadge}>
                        <Text style={styles.catBadgeText}>{item.category.toUpperCase()}</Text>
                      </View>
                      <Text style={styles.unitText}>per {item.unit}</Text>
                    </View>
                    <Text style={styles.commodityTitle}>{item.name}</Text>
                  </View>

                  <View style={styles.cardActions}>
                    <TouchableOpacity
                      style={styles.actionIconButton}
                      onPress={() => openCommodityModal(item)}
                    >
                      <Ionicons name="pencil" size={15} color={AdminColors.secondary} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.actionIconButton, { backgroundColor: AdminColors.dangerSoft }]}
                      onPress={() => {
                        Alert.alert('Delete Price Cap', `Remove gazetted cap for ${item.name}?`, [
                          { text: 'Cancel', style: 'cancel' },
                          { text: 'Delete', style: 'destructive', onPress: () => deleteCommodity(item.id) },
                        ]);
                      }}
                    >
                      <Ionicons name="trash" size={15} color={AdminColors.danger} />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Price Display */}
                <View style={styles.priceRow}>
                  <View style={styles.govtCapBox}>
                    <Text style={styles.capLabel}>Govt Ceiling (MRP)</Text>
                    <Text style={styles.capValue}>₹{item.standardMaxPrice}</Text>
                  </View>
                  <View style={styles.marketAvgBox}>
                    <Text style={styles.marketLabel}>Compliance</Text>
                    <Text style={styles.marketValue}>
                      {item.complianceLevel.replace('_', ' ')}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <Text style={styles.footerNote}>{item.govtNotice}</Text>
                  <View style={styles.govtBadge}>
                    <Ionicons name="checkmark-circle" size={12} color={AdminColors.emerald} />
                    <Text style={styles.govtBadgeText}>Sec 3 EC Act</Text>
                  </View>
                </View>
              </View>
            ))
          )
        )}
      </ScrollView>

      {/* Modal: Add / Edit Route */}
      <Modal visible={routeModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingRoute ? 'Edit Route Tariff' : 'Add Route Tariff'}
              </Text>
              <TouchableOpacity onPress={() => setRouteModalVisible(false)}>
                <Ionicons name="close" size={22} color={AdminColors.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 400 }}>
              <Text style={styles.inputLabel}>Origin Point *</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. Nashik Road Railway Station"
                placeholderTextColor={AdminColors.textMuted}
                value={routeFrom}
                onChangeText={setRouteFrom}
              />

              <Text style={styles.inputLabel}>Destination Point *</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. Ramkund / Tapovan Ghat"
                placeholderTextColor={AdminColors.textMuted}
                value={routeTo}
                onChangeText={setRouteTo}
              />

              <View style={styles.inputGrid}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={styles.inputLabel}>Distance (KM)</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="9.5"
                    placeholderTextColor={AdminColors.textMuted}
                    keyboardType="numeric"
                    value={routeDistance}
                    onChangeText={setRouteDistance}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={styles.inputLabel}>Travel Time (Mins)</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="25"
                    placeholderTextColor={AdminColors.textMuted}
                    keyboardType="numeric"
                    value={routeMinutes}
                    onChangeText={setRouteMinutes}
                  />
                </View>
              </View>

              <Text style={[styles.inputLabel, { marginTop: 10, color: AdminColors.saffron }]}>
                RTO Fare Caps (₹)
              </Text>

              <View style={styles.inputGrid}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={styles.subInputLabel}>Shared Auto (₹/seat)</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="25"
                    placeholderTextColor={AdminColors.textMuted}
                    keyboardType="numeric"
                    value={routeSharedAuto}
                    onChangeText={setRouteSharedAuto}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={styles.subInputLabel}>Private Auto (₹)</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="120"
                    placeholderTextColor={AdminColors.textMuted}
                    keyboardType="numeric"
                    value={routePrivateAuto}
                    onChangeText={setRoutePrivateAuto}
                  />
                </View>
              </View>

              <View style={styles.inputGrid}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={styles.subInputLabel}>City Bus (₹)</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="15"
                    placeholderTextColor={AdminColors.textMuted}
                    keyboardType="numeric"
                    value={routeCityBus}
                    onChangeText={setRouteCityBus}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={styles.subInputLabel}>Taxi / Cab (₹)</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="250"
                    placeholderTextColor={AdminColors.textMuted}
                    keyboardType="numeric"
                    value={routeTaxi}
                    onChangeText={setRouteTaxi}
                  />
                </View>
              </View>

              <Text style={styles.inputLabel}>Traffic Note</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. Normal flow"
                placeholderTextColor={AdminColors.textMuted}
                value={routeTrafficNote}
                onChangeText={setRouteTrafficNote}
              />
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setRouteModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveRoute}>
                <Text style={styles.saveBtnText}>Save Route</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal: Add / Edit Commodity */}
      <Modal visible={commodityModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingCommodity ? 'Edit Price Cap' : 'Add Price Cap'}
              </Text>
              <TouchableOpacity onPress={() => setCommodityModalVisible(false)}>
                <Ionicons name="close" size={22} color={AdminColors.textPrimary} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 380 }}>
              <Text style={styles.inputLabel}>Item Name *</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. Standard Thali"
                placeholderTextColor={AdminColors.textMuted}
                value={itemName}
                onChangeText={setItemName}
              />

              <Text style={styles.inputLabel}>Category</Text>
              <View style={styles.categoryPillRow}>
                {(['food', 'beverage', 'puja', 'utility'] as const).map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryPill,
                      itemCategory === cat && styles.categoryPillActive,
                    ]}
                    onPress={() => setItemCategory(cat)}
                  >
                    <Text
                      style={[
                        styles.categoryPillText,
                        itemCategory === cat && styles.categoryPillTextActive,
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.inputGrid}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={styles.inputLabel}>Govt Ceiling Price (₹) *</Text>
                  <TextInput
                    style={[styles.modalInput, { borderColor: AdminColors.emerald, color: AdminColors.emerald }]}
                    placeholder="60"
                    placeholderTextColor={AdminColors.textMuted}
                    keyboardType="numeric"
                    value={itemStandardMaxPrice}
                    onChangeText={setItemStandardMaxPrice}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={styles.inputLabel}>Unit</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="plate / 1 Liter"
                    placeholderTextColor={AdminColors.textMuted}
                    value={itemUnit}
                    onChangeText={setItemUnit}
                  />
                </View>
              </View>

              <Text style={styles.inputLabel}>Regulatory Notice</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Section 3 Essential Commodities Act Order"
                placeholderTextColor={AdminColors.textMuted}
                value={itemGovtNotice}
                onChangeText={setItemGovtNotice}
              />
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setCommodityModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveCommodity}>
                <Text style={styles.saveBtnText}>Save Price Cap</Text>
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
  subTabRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
    gap: 8,
  },
  subTabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: AdminColors.cardBackground,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    gap: 6,
  },
  subTabBtnActive: {
    borderColor: AdminColors.saffron,
    backgroundColor: AdminColors.primarySoft,
  },
  subTabBtnText: {
    fontSize: 12,
    color: AdminColors.textMuted,
    fontFamily: 'Poppins_600SemiBold',
  },
  subTabBtnTextActive: {
    color: AdminColors.saffron,
    fontFamily: 'Poppins_700Bold',
  },
  actionBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
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
  routePoints: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeBadge: {
    backgroundColor: AdminColors.primarySoft,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: AdminColors.primaryBorder,
  },
  routeBadgeText: {
    color: AdminColors.saffron,
    fontSize: 10.5,
    fontFamily: 'Poppins_700Bold',
  },
  routeFromText: {
    color: AdminColors.textPrimary,
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
  },
  arrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 1,
    gap: 6,
  },
  zoneTag: {
    color: AdminColors.saffronDark,
    fontSize: 9.5,
    fontFamily: 'Poppins_600SemiBold',
    backgroundColor: AdminColors.primarySoft,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  routeToText: {
    color: AdminColors.textPrimary,
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
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
  ratesGrid: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: AdminColors.inputBackground,
    borderRadius: 8,
    padding: 8,
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
  },
  rateBox: {
    alignItems: 'center',
  },
  rateLabel: {
    color: AdminColors.textMuted,
    fontSize: 9.5,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 2,
  },
  rateValue: {
    color: AdminColors.templeBrown,
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: AdminColors.cardBorder,
  },
  footerNote: {
    color: AdminColors.textMuted,
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
  },
  govtBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  govtBadgeText: {
    color: AdminColors.emerald,
    fontSize: 10,
    fontFamily: 'Poppins_700Bold',
  },
  categoryBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  catBadge: {
    backgroundColor: AdminColors.primarySoft,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
  },
  catBadgeText: {
    color: AdminColors.saffron,
    fontSize: 9,
    fontFamily: 'Poppins_700Bold',
  },
  unitText: {
    color: AdminColors.textMuted,
    fontSize: 10.5,
    fontFamily: 'Poppins_400Regular',
  },
  commodityTitle: {
    color: AdminColors.textPrimary,
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
  },
  priceRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  govtCapBox: {
    flex: 1,
    backgroundColor: AdminColors.successSoft,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AdminColors.successBorder,
  },
  capLabel: {
    color: AdminColors.emerald,
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
  },
  capValue: {
    color: AdminColors.emerald,
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    marginTop: 2,
  },
  marketAvgBox: {
    flex: 1,
    backgroundColor: AdminColors.inputBackground,
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
  },
  marketLabel: {
    color: AdminColors.textMuted,
    fontSize: 10,
    fontFamily: 'Poppins_500Medium',
  },
  marketValue: {
    color: AdminColors.secondary,
    fontSize: 11.5,
    fontFamily: 'Poppins_700Bold',
    marginTop: 2,
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
  subInputLabel: {
    color: AdminColors.textMuted,
    fontSize: 10.5,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 3,
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
    marginTop: 4,
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

/**
 * N3 — Marketplace Management & Reference Rates
 * Local businesses can inspect reference ceilings, update their rate cards,
 * and ensure full compliance.
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface RateItem {
  id: string;
  category: string;
  item_name: string;
  ceiling_price: number;
  current_price: number;
  unit: string;
  is_compliant: boolean;
}

const initialRates: RateItem[] = [
  { id: '1', category: 'Eatery', item_name: 'Mahaprasad Special Thali', ceiling_price: 120, current_price: 110, unit: 'per plate', is_compliant: true },
  { id: '2', category: 'Eatery', item_name: 'Misal Pav (Nashik Special)', ceiling_price: 80, current_price: 75, unit: 'per plate', is_compliant: true },
  { id: '3', category: 'Eatery', item_name: 'Packaged Drinking Water (1L)', ceiling_price: 20, current_price: 20, unit: 'bottle', is_compliant: true },
  { id: '4', category: 'Transport', item_name: 'Nashik CBS to Ramkund (Auto)', ceiling_price: 50, current_price: 50, unit: 'shared seat', is_compliant: true },
  { id: '5', category: 'Transport', item_name: 'Nashik CBS to Trimbakeshwar (Auto)', ceiling_price: 120, current_price: 120, unit: 'shared seat', is_compliant: true },
  { id: '6', category: 'Lodging', item_name: 'Standard Dormitory Bed (Non-AC)', ceiling_price: 450, current_price: 400, unit: 'per night', is_compliant: true },
  { id: '7', category: 'Lodging', item_name: 'Double AC Room (Budget)', ceiling_price: 1800, current_price: 1650, unit: 'per night', is_compliant: true },
  { id: '8', category: 'Guide', item_name: 'Certified Ghat Heritage Tour (2 hrs)', ceiling_price: 500, current_price: 450, unit: 'per family', is_compliant: true },
];

export default function MarketplaceManagement() {
  const router = useRouter();
  const [rates, setRates] = useState<RateItem[]>(initialRates);
  const [activeTab, setActiveTab] = useState<'All' | 'Eatery' | 'Transport' | 'Lodging' | 'Guide'>('All');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState<string>('');

  const handleStartEdit = (item: RateItem) => {
    setEditingId(item.id);
    setEditPrice(item.current_price.toString());
  };

  const handleSaveEdit = (item: RateItem) => {
    const val = parseFloat(editPrice);
    if (isNaN(val) || val <= 0) {
      Alert.alert('Invalid Price', 'Please enter a valid price amount.');
      return;
    }

    if (val > item.ceiling_price) {
      Alert.alert(
        '⚠️ Price Exceeds Reference Ceiling',
        `The maximum permitted ceiling rate for "${item.item_name}" is ₹${item.ceiling_price}. Setting ₹${val} will flag your business and revoke the Green Seal.`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Keep Compliant Rate',
            onPress: () => {
              setRates((prev) =>
                prev.map((r) => (r.id === item.id ? { ...r, current_price: item.ceiling_price, is_compliant: true } : r))
              );
              setEditingId(null);
            },
          },
        ]
      );
      return;
    }

    setRates((prev) =>
      prev.map((r) =>
        r.id === item.id ? { ...r, current_price: val, is_compliant: val <= r.ceiling_price } : r
      )
    );
    setEditingId(null);
  };

  const filtered = rates.filter((r) => (activeTab === 'All' ? true : r.category === activeTab));

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#5B1A0E" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Rates & Compliance</Text>
            <Text style={styles.headerSub}>Nashik Administration Reference Price List</Text>
          </View>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabRow}>
          {(['All', 'Eatery', 'Transport', 'Lodging', 'Guide'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Rate Cards */}
        <View style={{ gap: 12, paddingBottom: 40 }}>
          {filtered.map((item) => (
            <View key={item.id} style={styles.rateCard}>
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.categoryBadge}>{item.category.toUpperCase()}</Text>
                  <Text style={styles.itemName}>{item.item_name}</Text>
                  <Text style={styles.itemUnit}>{item.unit}</Text>
                </View>

                <View style={styles.badgeCompliant}>
                  <Ionicons name="checkmark-circle" size={14} color="#2E7D32" />
                  <Text style={styles.badgeCompliantText}>Compliant</Text>
                </View>
              </View>

              <View style={styles.priceRow}>
                <View>
                  <Text style={styles.priceHeading}>Govt Ceiling Rate</Text>
                  <Text style={styles.ceilingPrice}>₹{item.ceiling_price}</Text>
                </View>

                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.priceHeading}>Your Listed Rate</Text>
                  {editingId === item.id ? (
                    <View style={styles.editRow}>
                      <TextInput
                        style={styles.editInput}
                        keyboardType="numeric"
                        value={editPrice}
                        onChangeText={setEditPrice}
                        autoFocus
                      />
                      <TouchableOpacity style={styles.saveBtn} onPress={() => handleSaveEdit(item)}>
                        <Ionicons name="checkmark" size={16} color="#FFF" />
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.priceDisplay}
                      onPress={() => handleStartEdit(item)}
                    >
                      <Text style={styles.currentPrice}>₹{item.current_price}</Text>
                      <Ionicons name="pencil" size={14} color="#B44D12" style={{ marginLeft: 4 }} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF8F0' },
  container: { flex: 1, paddingHorizontal: 16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 12,
    paddingBottom: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EED9C4',
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#5B1A0E' },
  headerSub: { fontSize: 13, color: '#8D6E63', marginTop: 2 },

  tabRow: { flexDirection: 'row', gap: 6, marginBottom: 16, flexWrap: 'wrap' },
  tabBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EED9C4',
  },
  tabBtnActive: { backgroundColor: '#5B1A0E', borderColor: '#5B1A0E' },
  tabText: { fontSize: 12, fontWeight: '600', color: '#5B1A0E' },
  tabTextActive: { color: '#FFF' },

  rateCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F0DEC9',
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  categoryBadge: { fontSize: 10, fontWeight: '700', color: '#B44D12', marginBottom: 2 },
  itemName: { fontSize: 15, fontWeight: '700', color: '#3E2723' },
  itemUnit: { fontSize: 11, color: '#8D6E63', marginTop: 1 },

  badgeCompliant: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeCompliantText: { fontSize: 11, fontWeight: '700', color: '#2E7D32' },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F5E6D8',
  },
  priceHeading: { fontSize: 10, color: '#8D6E63', textTransform: 'uppercase', fontWeight: '600' },
  ceilingPrice: { fontSize: 16, fontWeight: '800', color: '#795548', marginTop: 2 },
  priceDisplay: { flexDirection: 'row', alignItems: 'center' },
  currentPrice: { fontSize: 18, fontWeight: '900', color: '#2E7D32' },

  editRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 2 },
  editInput: {
    width: 65,
    height: 34,
    backgroundColor: '#FFF8F0',
    borderWidth: 1,
    borderColor: '#B44D12',
    borderRadius: 6,
    paddingHorizontal: 6,
    fontSize: 16,
    fontWeight: '800',
    color: '#3E2723',
    textAlign: 'center',
  },
  saveBtn: {
    width: 34,
    height: 34,
    borderRadius: 6,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

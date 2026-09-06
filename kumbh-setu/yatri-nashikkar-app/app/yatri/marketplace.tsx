/**
 * Y2 — Marketplace
 * Tabs: Eateries / Hotels / Rickshaw & Bus / Local Guides
 * Each card: name, verification badge, rating, reference vs reported price, distance, Book + Navigate
 */
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator, Linking, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect, useCallback } from 'react';
import { getListings, formatPrice, getVerificationColor, getNavigateUrl, DEFAULT_LAT, DEFAULT_LNG } from '../../utils/api';

const TABS = [
  { key: 'eatery', label: 'Eateries', icon: 'restaurant-outline' as const },
  { key: 'hotel', label: 'Hotels', icon: 'bed-outline' as const },
  { key: 'rickshaw_bus', label: 'Rickshaw & Bus', icon: 'bus-outline' as const },
  { key: 'local_guide', label: 'Local Guides', icon: 'person-outline' as const },
];

interface Listing {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  address?: string;
  phone?: string;
  latitude?: number;
  longitude?: number;
  reference_price?: number;
  reported_price?: number;
  rating?: number;
  review_count?: number;
  verification_status: string;
  price_flagged: boolean;
  price_delta_percent?: number;
  distance_km?: number;
}

export default function Marketplace() {
  const router = useRouter();
  const params = useLocalSearchParams<{ tab?: string }>();
  const [activeTab, setActiveTab] = useState(params.tab || 'eatery');
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');

  const fetchListings = useCallback(async (pageNum = 1, searchTerm = '') => {
    setLoading(true);
    try {
      const data = await getListings({
        category: activeTab,
        page: pageNum,
        page_size: 20,
        search: searchTerm || undefined,
        user_lat: DEFAULT_LAT,
        user_lng: DEFAULT_LNG,
        sort_by: 'distance',
      });
      if (pageNum === 1) {
        setListings(data.listings);
      } else {
        setListings((prev) => [...prev, ...data.listings]);
      }
      setTotal(data.total);
    } catch (e) {
      console.error('Failed to load listings:', e);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    setPage(1);
    fetchListings(1, search);
  }, [activeTab]);

  const handleSearch = () => {
    setPage(1);
    fetchListings(1, search);
  };

  const loadMore = () => {
    if (listings.length < total) {
      const next = page + 1;
      setPage(next);
      fetchListings(next, search);
    }
  };

  const handleNavigate = (lat?: number, lng?: number) => {
    if (lat && lng) {
      Linking.openURL(getNavigateUrl(lat, lng));
    }
  };

  const getBadgeIcon = (status: string) => {
    switch (status) {
      case 'Kumbhveer Verified': return 'checkmark-circle';
      case 'Pending Verification': return 'time-outline';
      default: return 'alert-circle-outline';
    }
  };

  const renderListing = ({ item }: { item: Listing }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({ pathname: '/yatri/listing', params: { id: item.id } })}
      activeOpacity={0.85}
    >
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
          <View style={styles.badgeRow}>
            <Ionicons
              name={getBadgeIcon(item.verification_status) as any}
              size={14}
              color={getVerificationColor(item.verification_status)}
            />
            <Text style={[styles.badgeText, { color: getVerificationColor(item.verification_status) }]}>
              {item.verification_status}
            </Text>
          </View>
        </View>
        {item.rating && (
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={12} color="#F9A825" />
            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
          </View>
        )}
      </View>

      {/* Subcategory + Distance */}
      <View style={styles.metaRow}>
        {item.subcategory && (
          <Text style={styles.metaText}>{item.subcategory}</Text>
        )}
        {item.distance_km !== null && item.distance_km !== undefined && (
          <Text style={styles.distanceText}>{item.distance_km} km away</Text>
        )}
      </View>

      {/* Address */}
      {item.address && (
        <Text style={styles.addressText} numberOfLines={1}>{item.address}</Text>
      )}

      {/* Price Row */}
      <View style={styles.priceRow}>
        <View>
          <Text style={styles.priceLabel}>Reference</Text>
          <Text style={styles.priceValue}>{formatPrice(item.reference_price)}</Text>
        </View>
        <View style={styles.priceDivider} />
        <View>
          <Text style={styles.priceLabel}>Current</Text>
          <Text style={[
            styles.priceValue,
            item.price_flagged && styles.priceFlagged
          ]}>
            {formatPrice(item.reported_price)}
            {item.price_flagged && (
              <Text style={styles.flagText}> ⚠</Text>
            )}
          </Text>
        </View>
        {item.price_delta_percent !== null && item.price_delta_percent !== undefined && item.price_delta_percent > 0 && (
          <Text style={[
            styles.deltaText,
            item.price_flagged ? styles.deltaFlagged : styles.deltaNormal,
          ]}>
            +{item.price_delta_percent}%
          </Text>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => router.push({ pathname: '/yatri/booking', params: { id: item.id, name: item.name, category: item.category } })}
        >
          <Ionicons name="calendar-outline" size={16} color="#FFF8F0" />
          <Text style={styles.bookText}>Book</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navBtn}
          onPress={() => handleNavigate(item.latitude, item.longitude)}
        >
          <Ionicons name="navigate-outline" size={16} color="#B44D12" />
          <Text style={styles.navText}>Navigate</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color="#5B1A0E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Marketplace</Text>
        <Text style={styles.countText}>{total} listings</Text>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#A0845C" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search listings..."
            placeholderTextColor="#C4A882"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, activeTab === tab.key && styles.tabActive]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Ionicons
              name={tab.icon}
              size={16}
              color={activeTab === tab.key ? '#B44D12' : '#A0845C'}
            />
            <Text style={[styles.tabText, activeTab === tab.key && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Listing List */}
      {loading && listings.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#B44D12" />
          <Text style={styles.loadingText}>Loading listings...</Text>
        </View>
      ) : (
        <FlatList
          data={listings}
          renderItem={renderListing}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={48} color="#D4A574" />
              <Text style={styles.emptyText}>No listings found</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF8F0' },
  headerRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 20, paddingTop: 12, paddingBottom: 12,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#EED9C4',
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#5B1A0E', flex: 1 },
  countText: { fontSize: 12, color: '#A0845C', fontWeight: '600' },
  searchRow: { paddingHorizontal: 20, marginBottom: 12 },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#FFF', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 12,
    borderWidth: 1, borderColor: '#EED9C4',
  },
  searchInput: { flex: 1, fontSize: 14, color: '#5B1A0E' },
  tabRow: {
    flexDirection: 'row', paddingHorizontal: 16, marginBottom: 8, gap: 6,
  },
  tab: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 4, paddingVertical: 10, borderRadius: 12, backgroundColor: '#FFF',
    borderWidth: 1, borderColor: '#F0E6D8',
  },
  tabActive: {
    backgroundColor: '#FFF3E0', borderColor: '#E8A060',
  },
  tabText: { fontSize: 10, fontWeight: '600', color: '#A0845C' },
  tabTextActive: { color: '#B44D12' },
  listContent: { paddingHorizontal: 20, paddingBottom: 32 },
  card: {
    backgroundColor: '#FFF', borderRadius: 18, padding: 18,
    marginBottom: 12, borderWidth: 1, borderColor: '#F0E6D8',
  },
  cardHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
    marginBottom: 6,
  },
  cardName: { fontSize: 16, fontWeight: '700', color: '#5B1A0E' },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  badgeText: { fontSize: 11, fontWeight: '600' },
  ratingBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#FFF8E1', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4,
  },
  ratingText: { fontSize: 12, fontWeight: '700', color: '#F9A825' },
  metaRow: {
    flexDirection: 'row', gap: 12, marginBottom: 4,
  },
  metaText: { fontSize: 11, color: '#A0845C' },
  distanceText: { fontSize: 11, color: '#B44D12', fontWeight: '600' },
  addressText: { fontSize: 11, color: '#8B7355', marginBottom: 10 },
  priceRow: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    backgroundColor: '#FAFAF5', borderRadius: 12, padding: 12, marginBottom: 14,
  },
  priceLabel: { fontSize: 10, color: '#A0845C', fontWeight: '500', marginBottom: 2 },
  priceValue: { fontSize: 16, fontWeight: '700', color: '#5B1A0E' },
  priceFlagged: { color: '#C62828' },
  flagText: { fontSize: 14 },
  priceDivider: { width: 1, height: 32, backgroundColor: '#EED9C4' },
  deltaText: { fontSize: 11, fontWeight: '700', marginLeft: 'auto' },
  deltaFlagged: { color: '#C62828' },
  deltaNormal: { color: '#F57F17' },
  actionRow: { flexDirection: 'row', gap: 10 },
  bookBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, backgroundColor: '#B44D12', borderRadius: 12, paddingVertical: 12,
  },
  bookText: { fontSize: 14, fontWeight: '700', color: '#FFF8F0' },
  navBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, backgroundColor: '#FFF', borderRadius: 12, paddingVertical: 12,
    borderWidth: 1.5, borderColor: '#B44D12',
  },
  navText: { fontSize: 14, fontWeight: '700', color: '#B44D12' },
  loadingContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12,
  },
  loadingText: { fontSize: 14, color: '#A0845C' },
  emptyContainer: {
    alignItems: 'center', paddingTop: 60, gap: 12,
  },
  emptyText: { fontSize: 15, color: '#A0845C' },
});

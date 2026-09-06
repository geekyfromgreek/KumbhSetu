/**
 * Y3 — Listing Detail
 * Full listing info with sticky Book + Navigate buttons
 */
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { getListing, formatPrice, getVerificationColor, getNavigateUrl, DEFAULT_LAT, DEFAULT_LNG } from '../../utils/api';

export default function ListingDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getListing(id, DEFAULT_LAT, DEFAULT_LNG)
        .then(setListing)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading || !listing) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#5B1A0E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>{listing.name}</Text>
        </View>

        {/* Verification + Rating */}
        <View style={styles.badgeRow}>
          <View style={[styles.badge, { backgroundColor: `${getVerificationColor(listing.verification_status)}15` }]}>
            <Ionicons
              name={listing.verification_status === 'Kumbhveer Verified' ? 'checkmark-circle' : 'time-outline'}
              size={16}
              color={getVerificationColor(listing.verification_status)}
            />
            <Text style={[styles.badgeText, { color: getVerificationColor(listing.verification_status) }]}>
              {listing.verification_status}
            </Text>
          </View>
          {listing.rating && (
            <View style={styles.ratingBadge}>
              <Ionicons name="star" size={14} color="#F9A825" />
              <Text style={styles.ratingVal}>{listing.rating.toFixed(1)}</Text>
              {listing.review_count > 0 && (
                <Text style={styles.reviewCount}>({listing.review_count})</Text>
              )}
            </View>
          )}
        </View>

        {/* Category */}
        <Text style={styles.category}>{listing.subcategory || listing.category}</Text>

        {/* Price Comparison */}
        <View style={styles.priceCard}>
          <View style={styles.priceCol}>
            <Text style={styles.priceLabel}>Reference Price</Text>
            <Text style={styles.priceRef}>{formatPrice(listing.reference_price)}</Text>
          </View>
          <View style={styles.priceDivider} />
          <View style={styles.priceCol}>
            <Text style={styles.priceLabel}>Current Price</Text>
            <Text style={[styles.priceRep, listing.price_flagged && { color: '#C62828' }]}>
              {formatPrice(listing.reported_price)}
            </Text>
          </View>
          {listing.price_delta_percent > 0 && (
            <View style={[styles.deltaBadge, listing.price_flagged ? styles.deltaRed : styles.deltaAmber]}>
              <Text style={styles.deltaText}>+{listing.price_delta_percent}%</Text>
            </View>
          )}
        </View>

        {/* Details */}
        <View style={styles.detailsSection}>
          {listing.address && (
            <View style={styles.detailRow}>
              <Ionicons name="location-outline" size={18} color="#B44D12" />
              <Text style={styles.detailText}>{listing.address}</Text>
            </View>
          )}
          {listing.phone && (
            <TouchableOpacity style={styles.detailRow} onPress={() => Linking.openURL(`tel:${listing.phone}`)}>
              <Ionicons name="call-outline" size={18} color="#B44D12" />
              <Text style={[styles.detailText, { color: '#B44D12' }]}>{listing.phone}</Text>
            </TouchableOpacity>
          )}
          {listing.distance_km !== null && listing.distance_km !== undefined && (
            <View style={styles.detailRow}>
              <Ionicons name="navigate-outline" size={18} color="#B44D12" />
              <Text style={styles.detailText}>{listing.distance_km} km from your location</Text>
            </View>
          )}
          {listing.opening_hours && (
            <View style={styles.detailRow}>
              <Ionicons name="time-outline" size={18} color="#B44D12" />
              <Text style={styles.detailText}>{listing.opening_hours}</Text>
            </View>
          )}
          {listing.known_for && (
            <View style={styles.detailRow}>
              <Ionicons name="sparkles-outline" size={18} color="#B44D12" />
              <Text style={styles.detailText}>{listing.known_for}</Text>
            </View>
          )}
        </View>

        {/* Report Link */}
        <TouchableOpacity
          style={styles.reportLink}
          onPress={() => router.push({ pathname: '/yatri/report', params: { listing_id: id, listing_name: listing.name } })}
        >
          <Ionicons name="flag-outline" size={16} color="#C62828" />
          <Text style={styles.reportText}>Report incorrect info or price</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky Actions */}
      <View style={styles.stickyBar}>
        <TouchableOpacity
          style={styles.stickyBook}
          onPress={() => router.push({ pathname: '/yatri/booking', params: { id: listing.id, name: listing.name, category: listing.category } })}
        >
          <Ionicons name="calendar-outline" size={18} color="#FFF8F0" />
          <Text style={styles.stickyBookText}>Book</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.stickyNav}
          onPress={() => listing.latitude && listing.longitude && Linking.openURL(getNavigateUrl(listing.latitude, listing.longitude))}
        >
          <Ionicons name="navigate-outline" size={18} color="#B44D12" />
          <Text style={styles.stickyNavText}>Navigate with Google Maps</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF8F0' },
  scroll: { flex: 1, paddingHorizontal: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { fontSize: 14, color: '#A0845C' },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 12, paddingTop: 12, paddingBottom: 20,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFF',
    justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#EED9C4',
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#5B1A0E', flex: 1 },
  badgeRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20,
  },
  badgeText: { fontSize: 12, fontWeight: '700' },
  ratingBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: '#FFF8E1', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 6,
  },
  ratingVal: { fontSize: 13, fontWeight: '700', color: '#F9A825' },
  reviewCount: { fontSize: 11, color: '#A0845C' },
  category: { fontSize: 13, color: '#A0845C', marginBottom: 20 },
  priceCard: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF',
    borderRadius: 16, padding: 18, marginBottom: 24,
    borderWidth: 1, borderColor: '#EED9C4',
  },
  priceCol: { flex: 1 },
  priceLabel: { fontSize: 10, color: '#A0845C', fontWeight: '600', marginBottom: 4, textTransform: 'uppercase' },
  priceRef: { fontSize: 22, fontWeight: '700', color: '#2E7D32' },
  priceRep: { fontSize: 22, fontWeight: '700', color: '#5B1A0E' },
  priceDivider: { width: 1, height: 40, backgroundColor: '#EED9C4', marginHorizontal: 16 },
  deltaBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  deltaRed: { backgroundColor: '#FFEBEE' },
  deltaAmber: { backgroundColor: '#FFF8E1' },
  deltaText: { fontSize: 12, fontWeight: '700', color: '#C62828' },
  detailsSection: { gap: 14, marginBottom: 24 },
  detailRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  detailText: { fontSize: 14, color: '#5B1A0E', flex: 1, lineHeight: 20 },
  reportLink: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingVertical: 14, borderTopWidth: 1, borderTopColor: '#F0E6D8',
  },
  reportText: { fontSize: 13, color: '#C62828', fontWeight: '600' },
  stickyBar: {
    flexDirection: 'row', gap: 10, paddingHorizontal: 20, paddingVertical: 14,
    backgroundColor: '#FFF8F0', borderTopWidth: 1, borderTopColor: '#EED9C4',
  },
  stickyBook: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: '#B44D12', borderRadius: 14, paddingVertical: 14,
  },
  stickyBookText: { fontSize: 15, fontWeight: '700', color: '#FFF8F0' },
  stickyNav: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: '#FFF', borderRadius: 14, paddingVertical: 14,
    borderWidth: 1.5, borderColor: '#B44D12',
  },
  stickyNavText: { fontSize: 13, fontWeight: '700', color: '#B44D12' },
});

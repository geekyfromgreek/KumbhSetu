/**
 * Y6 / Y7 — Emergency SOS & Infrastructure Locator
 * Nearest Police Chowkis, Hospitals, Lost & Found Centers, Ghats
 * Quick SOS dialing (112, 108, 100, Kumbh Control Room)
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchEmergencyInfo } from '../../utils/api';

interface Facility {
  name: string;
  type: string;
  phone?: string;
  address?: string;
  distance_km?: number;
  latitude?: number;
  longitude?: number;
}

export default function EmergencyScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'hospital' | 'police' | 'lost_found'>('all');

  useEffect(() => {
    loadEmergencyData();
  }, []);

  const loadEmergencyData = async () => {
    setLoading(true);
    try {
      const data = await fetchEmergencyInfo(19.9975, 73.7898);
      if (data && data.facilities) {
        setFacilities(data.facilities);
      } else {
        // Fallback default Nashik emergency facilities
        setFacilities([
          {
            name: 'District Civil Hospital Nashik',
            type: 'hospital',
            phone: '0253-2576106',
            address: 'Trimbak Road, Nashik',
            distance_km: 1.8,
            latitude: 19.9912,
            longitude: 73.7789,
          },
          {
            name: 'Panchavati Police Station & Kumbh Chowki',
            type: 'police',
            phone: '0253-2512333',
            address: 'Near Ramkund, Panchavati',
            distance_km: 0.6,
            latitude: 20.0055,
            longitude: 73.7915,
          },
          {
            name: 'Ramkund Central Lost & Found Booth',
            type: 'lost_found',
            phone: '1800-233-0202',
            address: 'Ghat Area, Ramkund',
            distance_km: 0.4,
            latitude: 20.0062,
            longitude: 73.7925,
          },
          {
            name: 'Apollo Hospitals Nashik',
            type: 'hospital',
            phone: '0253-2303000',
            address: 'Swaminarayan Nagar, Panchavati',
            distance_km: 3.2,
            latitude: 20.015,
            longitude: 73.81,
          },
          {
            name: 'Bhadrakali Police Chowki',
            type: 'police',
            phone: '0253-2572233',
            address: 'Old City, Nashik',
            distance_km: 1.2,
            latitude: 19.992,
            longitude: 73.79,
          },
        ]);
      }
    } catch (e) {
      console.warn('Emergency data fetch fallback', e);
    } finally {
      setLoading(false);
    }
  };

  const dialNumber = (num: string) => {
    Linking.openURL(`tel:${num}`);
  };

  const openMap = (lat?: number, lng?: number, label?: string) => {
    if (lat && lng) {
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      Linking.openURL(url);
    }
  };

  const filtered = facilities.filter((f) => {
    if (activeFilter === 'all') return true;
    return f.type.toLowerCase().includes(activeFilter);
  });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#5B1A0E" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Emergency & SOS</Text>
            <Text style={styles.headerSub}>Nashik Kumbh 2027 Rapid Response</Text>
          </View>
        </View>

        {/* SOS One-Tap Buttons */}
        <View style={styles.sosCard}>
          <View style={styles.sosHeader}>
            <Ionicons name="warning" size={24} color="#FFF8F0" />
            <Text style={styles.sosTitle}>One-Tap Emergency Calling</Text>
          </View>
          <Text style={styles.sosSub}>Toll-free 24x7 hotlines active across Kumbh Zone</Text>

          <View style={styles.sosGrid}>
            <TouchableOpacity
              style={[styles.sosBtn, { backgroundColor: '#C62828' }]}
              onPress={() => dialNumber('112')}
              activeOpacity={0.85}
            >
              <Ionicons name="call" size={24} color="#FFF" />
              <Text style={styles.sosNum}>112</Text>
              <Text style={styles.sosLabel}>National SOS</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sosBtn, { backgroundColor: '#D84315' }]}
              onPress={() => dialNumber('108')}
              activeOpacity={0.85}
            >
              <Ionicons name="medkit" size={24} color="#FFF" />
              <Text style={styles.sosNum}>108</Text>
              <Text style={styles.sosLabel}>Ambulance</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sosBtn, { backgroundColor: '#1565C0' }]}
              onPress={() => dialNumber('100')}
              activeOpacity={0.85}
            >
              <Ionicons name="shield" size={24} color="#FFF" />
              <Text style={styles.sosNum}>100</Text>
              <Text style={styles.sosLabel}>Police Direct</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sosBtn, { backgroundColor: '#4E342E' }]}
              onPress={() => dialNumber('18002330202')}
              activeOpacity={0.85}
            >
              <Ionicons name="megaphone" size={24} color="#FFF" />
              <Text style={styles.sosNum}>Control</Text>
              <Text style={styles.sosLabel}>Kumbh Helpline</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Ghat Safety Advisory */}
        <View style={styles.advisoryCard}>
          <Ionicons name="shield-checkmark" size={22} color="#2E7D32" />
          <View style={{ flex: 1 }}>
            <Text style={styles.advisoryTitle}>Ghat Safety & Crowd Status</Text>
            <Text style={styles.advisoryText}>
              Ramkund, Laxman Kund, and Tapovan ghats have SDRF lifeguards and round-the-clock CCTV
              surveillance. Please follow designated one-way barricades during Shahi Snan.
            </Text>
          </View>
        </View>

        {/* Filter Pills */}
        <View style={styles.filterRow}>
          {(
            [
              { id: 'all', label: 'All Services' },
              { id: 'hospital', label: '🏥 Medical' },
              { id: 'police', label: '👮 Police Chowki' },
              { id: 'lost_found', label: '🔍 Lost & Found' },
            ] as const
          ).map((filter) => (
            <TouchableOpacity
              key={filter.id}
              style={[styles.filterPill, activeFilter === filter.id && styles.filterPillActive]}
              onPress={() => setActiveFilter(filter.id)}
            >
              <Text
                style={[
                  styles.filterPillText,
                  activeFilter === filter.id && styles.filterPillTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Facility Cards */}
        {loading ? (
          <ActivityIndicator size="large" color="#B44D12" style={{ marginTop: 30 }} />
        ) : (
          <View style={{ gap: 12, paddingBottom: 40 }}>
            {filtered.map((item, idx) => (
              <View key={idx} style={styles.facilityCard}>
                <View style={styles.facilityTop}>
                  <View style={styles.facilityIconBox}>
                    <Ionicons
                      name={
                        item.type === 'hospital'
                          ? 'fitness'
                          : item.type === 'police'
                          ? 'shield'
                          : 'search'
                      }
                      size={22}
                      color="#B44D12"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.facilityName}>{item.name}</Text>
                    {item.address && <Text style={styles.facilityAddress}>{item.address}</Text>}
                    {item.distance_km !== undefined && (
                      <Text style={styles.facilityDist}>~{item.distance_km.toFixed(1)} km away</Text>
                    )}
                  </View>
                </View>

                <View style={styles.facilityActions}>
                  {item.phone && (
                    <TouchableOpacity
                      style={styles.actionCallBtn}
                      onPress={() => dialNumber(item.phone!)}
                    >
                      <Ionicons name="call" size={16} color="#B44D12" />
                      <Text style={styles.actionCallText}>{item.phone}</Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={styles.actionNavBtn}
                    onPress={() => openMap(item.latitude, item.longitude, item.name)}
                  >
                    <Ionicons name="navigate" size={16} color="#FFF" />
                    <Text style={styles.actionNavText}>Directions</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
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
    paddingBottom: 20,
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

  sosCard: {
    backgroundColor: '#8A1C14',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  sosHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  sosTitle: { fontSize: 18, fontWeight: '800', color: '#FFF8F0' },
  sosSub: { fontSize: 12, color: 'rgba(255,248,240,0.8)', marginBottom: 14 },
  sosGrid: { flexDirection: 'row', gap: 8 },
  sosBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 12,
    elevation: 2,
  },
  sosNum: { fontSize: 16, fontWeight: '800', color: '#FFF', marginTop: 4 },
  sosLabel: { fontSize: 10, color: '#FFF', opacity: 0.9, marginTop: 1 },

  advisoryCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    backgroundColor: '#E8F5E9',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#C8E6C9',
    marginBottom: 16,
  },
  advisoryTitle: { fontSize: 14, fontWeight: '700', color: '#1B5E20', marginBottom: 2 },
  advisoryText: { fontSize: 12, color: '#2E7D32', lineHeight: 17 },

  filterRow: { flexDirection: 'row', gap: 8, marginBottom: 16, flexWrap: 'wrap' },
  filterPill: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EED9C4',
  },
  filterPillActive: { backgroundColor: '#B44D12', borderColor: '#B44D12' },
  filterPillText: { fontSize: 12, fontWeight: '600', color: '#5B1A0E' },
  filterPillTextActive: { color: '#FFF' },

  facilityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F0DEC9',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  facilityTop: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  facilityIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFF1E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  facilityName: { fontSize: 15, fontWeight: '700', color: '#3E2723' },
  facilityAddress: { fontSize: 12, color: '#795548', marginTop: 2 },
  facilityDist: { fontSize: 11, fontWeight: '600', color: '#B44D12', marginTop: 4 },

  facilityActions: { flexDirection: 'row', gap: 10, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#F5E6D8' },
  actionCallBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FFF4E8',
    borderWidth: 1,
    borderColor: '#F0D4BE',
  },
  actionCallText: { fontSize: 12, fontWeight: '700', color: '#B44D12' },
  actionNavBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#5B1A0E',
  },
  actionNavText: { fontSize: 12, fontWeight: '700', color: '#FFF' },
});

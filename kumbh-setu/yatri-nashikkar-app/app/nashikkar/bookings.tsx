/**
 * N4 — Pilgrim Bookings Queue
 * Local vendors view and manage incoming bookings from Yatris:
 * - Accept / Reject bookings
 * - Call Pilgrim directly
 * - View booking payment / status details
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface BookingItem {
  id: string;
  pilgrim_name: string;
  phone: string;
  service_title: string;
  category: string;
  date_time: string;
  party_size: number;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

const initialBookings: BookingItem[] = [
  {
    id: 'BK-9281',
    pilgrim_name: 'Rajesh Sharma & Family',
    phone: '+91 98231 10022',
    service_title: 'Family Room (2 Beds) - 1 Night',
    category: 'Lodging',
    date_time: 'Today, 4:00 PM Check-in',
    party_size: 4,
    total_amount: 1800,
    status: 'pending',
  },
  {
    id: 'BK-9282',
    pilgrim_name: 'Dr. Amit Trivedi',
    phone: '+91 94222 34567',
    service_title: 'Nashik CBS to Trimbakeshwar (Auto)',
    category: 'Transport',
    date_time: 'Tomorrow, 6:30 AM',
    party_size: 2,
    total_amount: 240,
    status: 'confirmed',
  },
  {
    id: 'BK-9283',
    pilgrim_name: 'Sunita Patil',
    phone: '+91 99210 99881',
    service_title: 'Shree Ramkund Vedic Heritage Walk',
    category: 'Guide',
    date_time: 'Today, 5:30 PM',
    party_size: 3,
    total_amount: 500,
    status: 'confirmed',
  },
];

export default function BookingsQueue() {
  const router = useRouter();
  const [bookings, setBookings] = useState<BookingItem[]>(initialBookings);

  const handleUpdateStatus = (id: string, newStatus: 'confirmed' | 'cancelled' | 'completed') => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  const handleCallPilgrim = (phone: string) => {
    Linking.openURL(`tel:${phone.replace(/\s+/g, '')}`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#5B1A0E" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Pilgrim Bookings</Text>
            <Text style={styles.headerSub}>Live Reservations Queue</Text>
          </View>
        </View>

        {/* Bookings List */}
        <View style={{ gap: 14, paddingBottom: 40 }}>
          {bookings.map((item) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardTop}>
                <View style={{ flex: 1 }}>
                  <View style={styles.statusRow}>
                    <View
                      style={[
                        styles.statusBadge,
                        {
                          backgroundColor:
                            item.status === 'confirmed'
                              ? '#E8F5E9'
                              : item.status === 'pending'
                              ? '#FFF3E0'
                              : '#ECEFF1',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.statusText,
                          {
                            color:
                              item.status === 'confirmed'
                                ? '#2E7D32'
                                : item.status === 'pending'
                                ? '#E65100'
                                : '#455A64',
                          },
                        ]}
                      >
                        {item.status.toUpperCase()}
                      </Text>
                    </View>
                    <Text style={styles.bookingId}>{item.id}</Text>
                  </View>

                  <Text style={styles.pilgrimName}>{item.pilgrim_name}</Text>
                  <Text style={styles.serviceTitle}>{item.service_title}</Text>
                </View>

                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.amountText}>₹{item.total_amount}</Text>
                  <Text style={styles.partyText}>{item.party_size} Pilgrims</Text>
                </View>
              </View>

              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <Ionicons name="time-outline" size={14} color="#8D6E63" />
                  <Text style={styles.detailText}>{item.date_time}</Text>
                </View>
              </View>

              {/* Actions */}
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.callBtn}
                  onPress={() => handleCallPilgrim(item.phone)}
                >
                  <Ionicons name="call" size={15} color="#5B1A0E" />
                  <Text style={styles.callBtnText}>Call Pilgrim</Text>
                </TouchableOpacity>

                {item.status === 'pending' && (
                  <>
                    <TouchableOpacity
                      style={styles.confirmBtn}
                      onPress={() => handleUpdateStatus(item.id, 'confirmed')}
                    >
                      <Ionicons name="checkmark" size={15} color="#FFF" />
                      <Text style={styles.confirmBtnText}>Accept</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.rejectBtn}
                      onPress={() => handleUpdateStatus(item.id, 'cancelled')}
                    >
                      <Ionicons name="close" size={15} color="#C62828" />
                    </TouchableOpacity>
                  </>
                )}

                {item.status === 'confirmed' && (
                  <TouchableOpacity
                    style={styles.completeBtn}
                    onPress={() => handleUpdateStatus(item.id, 'completed')}
                  >
                    <Ionicons name="checkmark-done" size={15} color="#FFF" />
                    <Text style={styles.completeBtnText}>Mark Completed</Text>
                  </TouchableOpacity>
                )}
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

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0DEC9',
  },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  statusBadge: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  statusText: { fontSize: 10, fontWeight: '800' },
  bookingId: { fontSize: 11, color: '#A1887F', fontWeight: '600' },

  pilgrimName: { fontSize: 16, fontWeight: '800', color: '#3E2723' },
  serviceTitle: { fontSize: 13, color: '#795548', marginTop: 2 },
  amountText: { fontSize: 18, fontWeight: '900', color: '#5B1A0E' },
  partyText: { fontSize: 11, color: '#8D6E63', marginTop: 2 },

  detailsRow: { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#F5E6D8' },
  detailItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  detailText: { fontSize: 12, color: '#6D4C41', fontWeight: '500' },

  actionRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  callBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: '#FFF1E0',
    borderWidth: 1,
    borderColor: '#F0D4BE',
  },
  callBtnText: { fontSize: 12, fontWeight: '700', color: '#5B1A0E' },
  confirmBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: '#2E7D32',
  },
  confirmBtnText: { fontSize: 12, fontWeight: '700', color: '#FFF' },
  rejectBtn: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: '#1565C0',
  },
  completeBtnText: { fontSize: 12, fontWeight: '700', color: '#FFF' },
});

/**
 * Y4 — Booking Confirmation
 * Category-appropriate booking form
 */
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert, Linking } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { createBooking } from '../../utils/api';

export default function BookingScreen() {
  const router = useRouter();
  const { id, name, category } = useLocalSearchParams<{ id: string; name: string; category: string }>();
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestCount, setGuestCount] = useState('1');
  const [checkIn, setCheckIn] = useState('');
  const [specialReq, setSpecialReq] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleSubmit = async () => {
    if (!guestName.trim() || !guestPhone.trim()) {
      Alert.alert('Required Fields', 'Please enter your name and phone number');
      return;
    }

    setSubmitting(true);
    try {
      await createBooking({
        listing_id: id || '',
        listing_name: name,
        category: category || 'eatery',
        guest_name: guestName,
        guest_phone: guestPhone,
        guest_count: parseInt(guestCount) || 1,
        check_in: checkIn,
        special_requests: specialReq,
      });
      setConfirmed(true);
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmed) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.confirmContainer}>
          <View style={styles.confirmIcon}>
            <Ionicons name="checkmark-circle" size={64} color="#2E7D32" />
          </View>
          <Text style={styles.confirmTitle}>Booking Submitted!</Text>
          <Text style={styles.confirmSub}>
            Your booking for {name} has been submitted. The vendor will review it as quickly as possible.
          </Text>

          <View style={styles.confirmActions}>
            <TouchableOpacity style={styles.confirmBtn} onPress={() => router.push('/yatri/marketplace')}>
              <Ionicons name="storefront-outline" size={18} color="#FFF8F0" />
              <Text style={styles.confirmBtnText}>Back to Marketplace</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmNavBtn}
              onPress={() => router.push('/yatri/home')}
            >
              <Text style={styles.confirmNavText}>Go Home</Text>
            </TouchableOpacity>
          </View>
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
          <Text style={styles.headerTitle}>Book Service</Text>
        </View>

        {/* Listing Info */}
        <View style={styles.listingInfo}>
          <Text style={styles.listingName}>{name || 'Service'}</Text>
          <Text style={styles.listingCat}>{category}</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>Your Name *</Text>
            <TextInput
              style={styles.input}
              value={guestName}
              onChangeText={setGuestName}
              placeholder="Enter your full name"
              placeholderTextColor="#C4A882"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              value={guestPhone}
              onChangeText={setGuestPhone}
              placeholder="+91 XXXXX XXXXX"
              placeholderTextColor="#C4A882"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Number of Guests</Text>
            <TextInput
              style={styles.input}
              value={guestCount}
              onChangeText={setGuestCount}
              keyboardType="numeric"
              placeholder="1"
              placeholderTextColor="#C4A882"
            />
          </View>

          {(category === 'hotel') && (
            <View style={styles.field}>
              <Text style={styles.label}>Check-in Date</Text>
              <TextInput
                style={styles.input}
                value={checkIn}
                onChangeText={setCheckIn}
                placeholder="DD/MM/YYYY"
                placeholderTextColor="#C4A882"
              />
            </View>
          )}

          <View style={styles.field}>
            <Text style={styles.label}>Special Requests</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={specialReq}
              onChangeText={setSpecialReq}
              placeholder="Any special requirements..."
              placeholderTextColor="#C4A882"
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={[styles.submitBtn, submitting && styles.submitDisabled]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Text style={styles.submitText}>
            {submitting ? 'Submitting...' : 'Confirm Booking'}
          </Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF8F0' },
  scroll: { flex: 1, paddingHorizontal: 20 },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 12, paddingTop: 12, paddingBottom: 20,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFF',
    justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#EED9C4',
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#5B1A0E' },
  listingInfo: {
    backgroundColor: '#FFF', borderRadius: 14, padding: 16, marginBottom: 24,
    borderWidth: 1, borderColor: '#EED9C4',
  },
  listingName: { fontSize: 16, fontWeight: '700', color: '#5B1A0E' },
  listingCat: { fontSize: 12, color: '#A0845C', marginTop: 4 },
  form: { gap: 18, marginBottom: 28 },
  field: {},
  label: { fontSize: 13, fontWeight: '600', color: '#5B1A0E', marginBottom: 8 },
  input: {
    backgroundColor: '#FFF', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14,
    fontSize: 15, color: '#5B1A0E', borderWidth: 1, borderColor: '#EED9C4',
  },
  textArea: { minHeight: 80, textAlignVertical: 'top' },
  submitBtn: {
    backgroundColor: '#B44D12', borderRadius: 14, paddingVertical: 16, alignItems: 'center',
  },
  submitDisabled: { opacity: 0.6 },
  submitText: { fontSize: 16, fontWeight: '700', color: '#FFF8F0' },
  confirmContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32,
  },
  confirmIcon: { marginBottom: 20 },
  confirmTitle: { fontSize: 24, fontWeight: '700', color: '#2E7D32', marginBottom: 12 },
  confirmSub: { fontSize: 14, color: '#5B1A0E', textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  confirmActions: { width: '100%', gap: 12 },
  confirmBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: '#B44D12', borderRadius: 14, paddingVertical: 16,
  },
  confirmBtnText: { fontSize: 15, fontWeight: '700', color: '#FFF8F0' },
  confirmNavBtn: {
    alignItems: 'center', paddingVertical: 14,
  },
  confirmNavText: { fontSize: 14, fontWeight: '600', color: '#A0845C' },
});

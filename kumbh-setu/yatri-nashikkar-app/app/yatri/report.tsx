/**
 * Y5 — Report an Issue
 * No auth required. Confirmation: "reviewed as quickly as possible"
 */
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { submitReport } from '../../utils/api';

const ISSUE_TYPES = [
  'Price Overcharging',
  'Misleading Information',
  'Wrong Location',
  'Poor Service Quality',
  'Safety Concern',
  'Vendor Not Found',
  'Other',
];

const CATEGORIES = [
  'Pricing',
  'Eatery',
  'Hotel',
  'Transport',
  'Local Guide',
  'Infrastructure',
  'Safety',
  'Other',
];

export default function ReportScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ listing_id?: string; listing_name?: string }>();
  const [category, setCategory] = useState('');
  const [issueType, setIssueType] = useState('');
  const [listingName, setListingName] = useState(params.listing_name || '');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!category || !issueType) {
      Alert.alert('Required', 'Please select a category and issue type');
      return;
    }
    setSubmitting(true);
    try {
      await submitReport({
        category,
        issue_type: issueType,
        description,
        listing_id: params.listing_id,
        listing_name: listingName,
        reporter_phone: phone,
      });
      setSubmitted(true);
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Failed to submit report');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.confirmContainer}>
          <View style={styles.confirmIcon}>
            <Ionicons name="checkmark-circle" size={64} color="#2E7D32" />
          </View>
          <Text style={styles.confirmTitle}>Report Submitted</Text>
          <Text style={styles.confirmSub}>
            Thank you for helping keep Kumbh Mela safe and fair. Your report will be reviewed as quickly as possible.
          </Text>
          <TouchableOpacity style={styles.confirmBtn} onPress={() => router.push('/yatri/home')}>
            <Text style={styles.confirmBtnText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#5B1A0E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Report an Issue</Text>
        </View>

        {/* Category */}
        <Text style={styles.label}>Category *</Text>
        <View style={styles.chipGrid}>
          {CATEGORIES.map((c) => (
            <TouchableOpacity
              key={c}
              style={[styles.chip, category === c && styles.chipActive]}
              onPress={() => setCategory(c)}
            >
              <Text style={[styles.chipText, category === c && styles.chipTextActive]}>{c}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Issue Type */}
        <Text style={styles.label}>Issue Type *</Text>
        <View style={styles.chipGrid}>
          {ISSUE_TYPES.map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.chip, issueType === t && styles.chipActive]}
              onPress={() => setIssueType(t)}
            >
              <Text style={[styles.chipText, issueType === t && styles.chipTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Listing Name */}
        <Text style={styles.label}>Related Listing (optional)</Text>
        <TextInput
          style={styles.input}
          value={listingName}
          onChangeText={setListingName}
          placeholder="Hotel/vendor name..."
          placeholderTextColor="#C4A882"
        />

        {/* Description */}
        <Text style={styles.label}>Description (optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Describe the issue..."
          placeholderTextColor="#C4A882"
          multiline
          numberOfLines={4}
        />

        {/* Phone */}
        <Text style={styles.label}>Your Phone (optional — for follow-up)</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="+91 XXXXX XXXXX"
          placeholderTextColor="#C4A882"
          keyboardType="phone-pad"
        />

        {/* Note */}
        <View style={styles.noteBanner}>
          <Ionicons name="information-circle-outline" size={18} color="#B44D12" />
          <Text style={styles.noteText}>
            No login required. Your report will be reviewed as quickly as possible by our volunteer team.
          </Text>
        </View>

        {/* Submit */}
        <TouchableOpacity
          style={[styles.submitBtn, submitting && styles.submitDisabled]}
          onPress={handleSubmit}
          disabled={submitting}
        >
          <Ionicons name="flag-outline" size={18} color="#FFF8F0" />
          <Text style={styles.submitText}>{submitting ? 'Submitting...' : 'Submit Report'}</Text>
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
    flexDirection: 'row', alignItems: 'center', gap: 12, paddingTop: 12, paddingBottom: 24,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFF',
    justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#EED9C4',
  },
  headerTitle: { fontSize: 22, fontWeight: '700', color: '#5B1A0E' },
  label: { fontSize: 13, fontWeight: '600', color: '#5B1A0E', marginBottom: 10, marginTop: 20 },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20,
    backgroundColor: '#FFF', borderWidth: 1, borderColor: '#EED9C4',
  },
  chipActive: { backgroundColor: '#B44D12', borderColor: '#B44D12' },
  chipText: { fontSize: 13, color: '#5B1A0E', fontWeight: '500' },
  chipTextActive: { color: '#FFF8F0' },
  input: {
    backgroundColor: '#FFF', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14,
    fontSize: 15, color: '#5B1A0E', borderWidth: 1, borderColor: '#EED9C4',
  },
  textArea: { minHeight: 100, textAlignVertical: 'top' },
  noteBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#FFF3E0', borderRadius: 12, padding: 14,
    marginTop: 24, borderWidth: 1, borderColor: '#FFCC80',
  },
  noteText: { flex: 1, fontSize: 12, color: '#8B6914', lineHeight: 17 },
  submitBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: '#C62828', borderRadius: 14, paddingVertical: 16, marginTop: 20,
  },
  submitDisabled: { opacity: 0.6 },
  submitText: { fontSize: 16, fontWeight: '700', color: '#FFF8F0' },
  confirmContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32 },
  confirmIcon: { marginBottom: 20 },
  confirmTitle: { fontSize: 24, fontWeight: '700', color: '#2E7D32', marginBottom: 12 },
  confirmSub: { fontSize: 14, color: '#5B1A0E', textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  confirmBtn: {
    backgroundColor: '#B44D12', borderRadius: 14, paddingVertical: 16, paddingHorizontal: 32,
  },
  confirmBtnText: { fontSize: 15, fontWeight: '700', color: '#FFF8F0' },
});

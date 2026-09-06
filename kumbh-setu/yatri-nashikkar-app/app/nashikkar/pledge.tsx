/**
 * N2 — Fair Pricing Pledge & Vendor Verification
 * Nashik local businesses sign the Kumbh 2027 Civic Trust charter:
 * 1. Maintain government reference ceiling rates
 * 2. Display QR code rate chart
 * 3. Receive official "Verified Green Seal"
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FairPricingPledgeScreen() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState<'eatery' | 'hotel' | 'rickshaw' | 'guide'>('eatery');
  const [ownerName, setOwnerName] = useState('');
  const [aadhaarOrGst, setAadhaarOrGst] = useState('');
  const [pledgeChecked, setPledgeChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitPledge = () => {
    if (!businessName || !ownerName) {
      Alert.alert('Incomplete Form', 'Please enter your business and owner name.');
      return;
    }
    if (!pledgeChecked) {
      Alert.alert('Pledge Required', 'You must agree to the Kumbh Fair Pricing Charter.');
      return;
    }

    setSubmitted(true);
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
            <Text style={styles.headerTitle}>Fair Pricing Pledge</Text>
            <Text style={styles.headerSub}>कुंभमेळा सत्य व सचोटी प्रतिज्ञा</Text>
          </View>
        </View>

        {!submitted ? (
          <>
            {/* Charter Banner */}
            <View style={styles.charterCard}>
              <View style={styles.charterIcon}>
                <Ionicons name="ribbon" size={28} color="#2E7D32" />
              </View>
              <Text style={styles.charterTitle}>The Nashikkar Civic Charter</Text>
              <Text style={styles.charterText}>
                "I solemnly resolve that my establishment will welcome all pilgrims with fairness,
                honesty, and devotion. I will strictly adhere to the reference rate ceilings
                established by the Nashik District Administration and Kumbh Setu."
              </Text>
            </View>

            {/* Form */}
            <View style={styles.formCard}>
              <Text style={styles.label}>Business / Establishment Name</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Mahalakshmi Bhojanalaya or Auto MH-15-AB"
                placeholderTextColor="#A1887F"
                value={businessName}
                onChangeText={setBusinessName}
              />

              <Text style={styles.label}>Category</Text>
              <View style={styles.categoryRow}>
                {(
                  [
                    { id: 'eatery', label: 'Eatery / Food' },
                    { id: 'hotel', label: 'Lodge / Hotel' },
                    { id: 'rickshaw', label: 'Auto / Bus' },
                    { id: 'guide', label: 'Local Guide' },
                  ] as const
                ).map((c) => (
                  <TouchableOpacity
                    key={c.id}
                    style={[styles.catBtn, category === c.id && styles.catBtnActive]}
                    onPress={() => setCategory(c.id)}
                  >
                    <Text style={[styles.catText, category === c.id && styles.catTextActive]}>
                      {c.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Proprietor / Driver Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Full name as per Aadhaar"
                placeholderTextColor="#A1887F"
                value={ownerName}
                onChangeText={setOwnerName}
              />

              <Text style={styles.label}>GSTIN, Auto Permit, or Aadhaar (Last 4 digits)</Text>
              <TextInput
                style={styles.input}
                placeholder="27AAAAA0000A1Z5 or Auto License No."
                placeholderTextColor="#A1887F"
                value={aadhaarOrGst}
                onChangeText={setAadhaarOrGst}
              />

              {/* Checkbox Pledge */}
              <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => setPledgeChecked(!pledgeChecked)}
                activeOpacity={0.8}
              >
                <Ionicons
                  name={pledgeChecked ? 'checkbox' : 'square-outline'}
                  size={24}
                  color={pledgeChecked ? '#2E7D32' : '#8D6E63'}
                />
                <Text style={styles.checkboxText}>
                  I solemnly pledge not to surge rates above the official reference cards and to display the Kumbh Setu QR chart prominently.
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.submitBtn, !pledgeChecked && { opacity: 0.6 }]}
                onPress={handleSubmitPledge}
                activeOpacity={0.85}
              >
                <Ionicons name="checkmark-circle" size={20} color="#FFF" />
                <Text style={styles.submitBtnText}>Sign Pledge & Get Verified Seal</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          /* Success Certificate Screen */
          <View style={styles.certCard}>
            <View style={styles.sealBadge}>
              <Ionicons name="shield-checkmark" size={54} color="#2E7D32" />
            </View>
            <Text style={styles.certTitle}>Civic Trust Seal Granted</Text>
            <Text style={styles.certSubtitle}>Kumbh Mela 2027 · Nashik Municipal Corporation</Text>

            <View style={styles.certDetails}>
              <Text style={styles.certBusiness}>{businessName}</Text>
              <Text style={styles.certCat}>{category.toUpperCase()} · VERIFIED GREEN TIER</Text>
              <Text style={styles.certId}>Verification ID: KS-NSK-2027-{Math.floor(1000 + Math.random() * 9000)}</Text>
            </View>

            <View style={styles.qrPlaceholder}>
              <Ionicons name="qr-code" size={100} color="#3E2723" />
              <Text style={styles.qrLabel}>Download & Print QR Rate Board</Text>
            </View>

            <TouchableOpacity
              style={styles.returnBtn}
              onPress={() => router.replace('/nashikkar/dashboard')}
            >
              <Text style={styles.returnBtnText}>Return to Dashboard</Text>
            </TouchableOpacity>
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

  charterCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#C8E6C9',
    marginBottom: 16,
    alignItems: 'center',
  },
  charterIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#C8E6C9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  charterTitle: { fontSize: 16, fontWeight: '800', color: '#1B5E20' },
  charterText: {
    fontSize: 12,
    color: '#2E7D32',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 6,
    lineHeight: 18,
  },

  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#F0DEC9',
    marginBottom: 40,
  },
  label: { fontSize: 13, fontWeight: '700', color: '#4E342E', marginTop: 12, marginBottom: 6 },
  input: {
    height: 46,
    backgroundColor: '#FFF8F0',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EED9C4',
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#3E2723',
  },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  catBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#FFF8F0',
    borderWidth: 1,
    borderColor: '#EED9C4',
  },
  catBtnActive: { backgroundColor: '#5B1A0E', borderColor: '#5B1A0E' },
  catText: { fontSize: 12, fontWeight: '600', color: '#5B1A0E' },
  catTextActive: { color: '#FFF' },

  checkboxRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 18 },
  checkboxText: { fontSize: 12, color: '#5D4037', flex: 1, lineHeight: 16 },

  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#2E7D32',
    borderRadius: 12,
    height: 50,
    marginTop: 20,
  },
  submitBtnText: { color: '#FFF', fontSize: 15, fontWeight: '700' },

  certCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    borderWidth: 2,
    borderColor: '#2E7D32',
    alignItems: 'center',
    marginVertical: 20,
  },
  sealBadge: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  certTitle: { fontSize: 22, fontWeight: '900', color: '#1B5E20' },
  certSubtitle: { fontSize: 12, color: '#689F38', marginTop: 2 },
  certDetails: {
    marginVertical: 18,
    alignItems: 'center',
    backgroundColor: '#FFF8F0',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    borderWidth: 1,
    borderColor: '#EED9C4',
  },
  certBusiness: { fontSize: 18, fontWeight: '800', color: '#3E2723' },
  certCat: { fontSize: 12, fontWeight: '700', color: '#2E7D32', marginTop: 4 },
  certId: { fontSize: 11, color: '#8D6E63', marginTop: 6 },
  qrPlaceholder: { alignItems: 'center', marginVertical: 14 },
  qrLabel: { fontSize: 12, fontWeight: '600', color: '#5B1A0E', marginTop: 8 },
  returnBtn: {
    backgroundColor: '#5B1A0E',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 14,
  },
  returnBtnText: { color: '#FFF', fontSize: 14, fontWeight: '700' },
});

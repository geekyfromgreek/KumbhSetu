import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useApp } from '@/context/AppContext';
import {
  EMERGENCY_CONTACTS,
  EmergencyContact,
  RumorFactCheck,
  UserComplaint,
} from '@/data/complaintsAndRumorsData';
import { KumbhColors } from '@/constants/colors';

export const ComplaintsAndSafetyTab: React.FC = () => {
  const insets = useSafeAreaInsets();
  const {
    language,
    t,
    complaints,
    addComplaint,
    rumors,
    submitRumorForCheck,
  } = useApp();

  const [activeSection, setActiveSection] = useState<'complaint' | 'rumors' | 'emergency'>('complaint');

  const [complaintCategory, setComplaintCategory] = useState<string>('Auto / Taxi');
  const [vendorOrVehicle, setVendorOrVehicle] = useState<string>('');
  const [locationPlace, setLocationPlace] = useState<string>('');
  const [standardAmt, setStandardAmt] = useState<string>('');
  const [chargedAmt, setChargedAmt] = useState<string>('');
  const [complaintSuccessToken, setComplaintSuccessToken] = useState<string | null>(null);
  const [complaintError, setComplaintError] = useState<string>('');

  const [rumorText, setRumorText] = useState<string>('');
  const [rumorReportedSuccess, setRumorReportedSuccess] = useState<boolean>(false);

  const handleCallEmergency = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  const handleSubmitComplaint = async () => {
    if (!vendorOrVehicle.trim() || !locationPlace.trim() || !chargedAmt.trim()) {
      setComplaintError('Please enter merchant/vehicle ID, location and amount');
      return;
    }

    setComplaintError('');
    const newComp = await addComplaint(
      complaintCategory,
      vendorOrVehicle,
      locationPlace,
      standardAmt || 'Approved Rate',
      chargedAmt
    );

    setComplaintSuccessToken(newComp.token);
    setVendorOrVehicle('');
    setLocationPlace('');
    setStandardAmt('');
    setChargedAmt('');

    setTimeout(() => {
      setComplaintSuccessToken(null);
    }, 6000);
  };

  const handleReportRumor = () => {
    if (!rumorText.trim()) return;
    submitRumorForCheck(rumorText.trim());
    setRumorText('');
    setRumorReportedSuccess(true);
    setTimeout(() => setRumorReportedSuccess(false), 4000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: Math.max(insets.top + 12, 24),
            paddingBottom: Math.max(insets.bottom + 80, 90),
          },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        
        {/* Top Banner Header */}
        <View style={styles.header}>
          <View style={styles.headerTitleRow}>
            <View>
              <Text style={styles.headerTitle}>{t.complaintTabTitle}</Text>
              <Text style={styles.headerSub}>{t.complaintTabSubtitle}</Text>
            </View>
          </View>

          {/* 3 Nav Pill Buttons */}
          <View style={styles.navPillsRow}>
            <TouchableOpacity
              style={[styles.navPill, activeSection === 'complaint' && styles.navPillActive]}
              onPress={() => setActiveSection('complaint')}>
              <Ionicons
                name="document-text-outline"
                size={15}
                color={activeSection === 'complaint' ? '#FFFFFF' : KumbhColors.textSecondary}
              />
              <Text
                style={[
                  styles.navPillText,
                  activeSection === 'complaint' && styles.navPillTextActive,
                ]}>
                File Report
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.navPill, activeSection === 'rumors' && styles.navPillActive]}
              onPress={() => setActiveSection('rumors')}>
              <Ionicons
                name="search-outline"
                size={15}
                color={activeSection === 'rumors' ? '#FFFFFF' : KumbhColors.textSecondary}
              />
              <Text
                style={[
                  styles.navPillText,
                  activeSection === 'rumors' && styles.navPillTextActive,
                ]}>
                Fact-Check
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.navPill,
                styles.sosPill,
                activeSection === 'emergency' && styles.sosPillActive,
              ]}
              onPress={() => setActiveSection('emergency')}>
              <Ionicons
                name="call-outline"
                size={15}
                color={activeSection === 'emergency' ? '#FFFFFF' : KumbhColors.danger}
              />
              <Text
                style={[
                  styles.navPillText,
                  styles.sosPillText,
                  activeSection === 'emergency' && styles.navPillTextActive,
                ]}>
                24x7 SOS
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* SECTION 1: OVERCHARGING COMPLAINT FORM */}
        {activeSection === 'complaint' && (
          <View style={styles.sectionCard}>
            <View style={styles.cardTopHeader}>
              <View style={styles.sectionIconCircle}>
                <MaterialCommunityIcons name="cash-remove" size={20} color={KumbhColors.danger} />
              </View>
              <View style={styles.sectionHeaderCol}>
                <Text style={styles.cardSectionTitle}>{t.sectionReportOvercharge}</Text>
                <Text style={styles.cardSectionSub}>
                  RTO & Administration fast-response enforcement cell
                </Text>
              </View>
            </View>

            {/* Success Token Banner */}
            {complaintSuccessToken && (
              <View style={styles.successTokenCard}>
                <Ionicons name="checkmark-circle-outline" size={24} color={KumbhColors.success} />
                <View style={styles.successTextBox}>
                  <Text style={styles.successTokenTitle}>{t.complaintSuccess}</Text>
                  <Text style={styles.successTokenCode}>Case ID: {complaintSuccessToken}</Text>
                  <Text style={styles.successTokenSub}>
                    Forwarded to RTO flying squad for swift inspection.
                  </Text>
                </View>
              </View>
            )}

            {complaintError ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle-outline" size={16} color={KumbhColors.danger} />
                <Text style={styles.errorText}>{complaintError}</Text>
              </View>
            ) : null}

            {/* Category Chips */}
            <Text style={styles.inputLabel}>{t.selectCategory}:</Text>
            <View style={styles.categoryChipsGrid}>
              {[
                { id: 'Auto / Taxi', icon: 'car-outline' },
                { id: 'Food Stall', icon: 'restaurant-outline' },
                { id: 'Puja Items', icon: 'sparkles-outline' },
                { id: 'Stay / Hotel', icon: 'bed-outline' },
                { id: 'Other Services', icon: 'briefcase-outline' },
              ].map((cat) => {
                const isSelected = complaintCategory === cat.id;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    style={[styles.compCatChip, isSelected && styles.compCatChipSelected]}
                    onPress={() => setComplaintCategory(cat.id)}>
                    <Ionicons
                      name={cat.icon as any}
                      size={13}
                      color={isSelected ? KumbhColors.primaryDark : KumbhColors.textSecondary}
                    />
                    <Text
                      style={[
                        styles.compCatText,
                        isSelected && styles.compCatTextSelected,
                      ]}>
                      {cat.id}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Vehicle / Shop Name */}
            <Text style={styles.inputLabel}>{t.vehicleOrShop}:</Text>
            <TextInput
              style={styles.formInput}
              placeholder="MH-15 AB 1234 or Shop Name"
              placeholderTextColor={KumbhColors.textMuted}
              value={vendorOrVehicle}
              onChangeText={setVendorOrVehicle}
            />

            {/* Location */}
            <Text style={styles.inputLabel}>{t.locationPlace}:</Text>
            <TextInput
              style={styles.formInput}
              placeholder="e.g. Station Stand, Ramkund"
              placeholderTextColor={KumbhColors.textMuted}
              value={locationPlace}
              onChangeText={setLocationPlace}
            />

            {/* Price Difference Row */}
            <View style={styles.priceDiffRow}>
              <View style={styles.priceDiffCol}>
                <Text style={styles.inputLabel}>{t.standardAmt}:</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="30"
                  placeholderTextColor={KumbhColors.textMuted}
                  value={standardAmt}
                  onChangeText={setStandardAmt}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.priceDiffCol}>
                <Text style={[styles.inputLabel, { color: KumbhColors.danger }]}>
                  {t.chargedAmt}: *
                </Text>
                <TextInput
                  style={[styles.formInput, styles.chargedInput]}
                  placeholder="100"
                  placeholderTextColor={KumbhColors.dangerBorder}
                  value={chargedAmt}
                  onChangeText={setChargedAmt}
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={styles.submitCompBtn}
              onPress={handleSubmitComplaint}
              activeOpacity={0.85}>
              <Ionicons name="send-outline" size={16} color="#FFFFFF" />
              <Text style={styles.submitCompText}>{t.submitComplaint}</Text>
            </TouchableOpacity>

            {/* Previous Complaints Submitted by User */}
            {complaints.length > 0 && (
              <View style={styles.userComplaintsList}>
                <Text style={styles.userCompHeader}>Logged Case Reports ({complaints.length})</Text>
                {complaints.map((c: UserComplaint) => (
                  <View key={c.id} style={styles.complaintItemCard}>
                    <View style={styles.complaintItemTop}>
                      <Text style={styles.complaintToken}>{c.token}</Text>
                      <View style={styles.statusBadge}>
                        <Text style={styles.statusBadgeText}>{c.status}</Text>
                      </View>
                    </View>
                    <Text style={styles.complaintDetailText}>
                      {c.location} • {c.vehicleOrShop}
                    </Text>
                    <Text style={styles.complaintPriceDiff}>
                      Charged: <Text style={{ color: KumbhColors.danger, fontFamily: 'Poppins_600SemiBold' }}>INR {c.chargedAmt}</Text> (Standard: INR {c.standardAmt})
                    </Text>
                  </View>
                ))}
              </View>
            )}

          </View>
        )}

        {/* SECTION 2: RUMOR BUSTER & CITIZEN FACT-CHECK FEED */}
        {activeSection === 'rumors' && (
          <View style={styles.sectionCard}>
            <View style={styles.cardTopHeader}>
              <View style={[styles.sectionIconCircle, { backgroundColor: '#F0F9FF' }]}>
                <Ionicons name="newspaper-outline" size={20} color={KumbhColors.riverBlueDark} />
              </View>
              <View style={styles.sectionHeaderCol}>
                <Text style={styles.cardSectionTitle}>{t.sectionRumorBuster}</Text>
                <Text style={styles.cardSectionSub}>
                  Official fact-checked announcements verified by Mela Police
                </Text>
              </View>
            </View>

            {/* Report a Rumor Box */}
            <View style={styles.reportRumorCard}>
              <Text style={styles.reportRumorTitle}>{t.reportRumorBtn}</Text>
              <TextInput
                style={styles.rumorInput}
                placeholder={t.rumorPlaceholder}
                placeholderTextColor={KumbhColors.textMuted}
                value={rumorText}
                onChangeText={setRumorText}
                multiline
                numberOfLines={2}
              />
              <TouchableOpacity
                style={styles.reportRumorSubmitBtn}
                onPress={handleReportRumor}>
                <Ionicons name="shield-checkmark-outline" size={15} color="#FFFFFF" />
                <Text style={styles.reportRumorSubmitText}>Submit for Verification</Text>
              </TouchableOpacity>

              {rumorReportedSuccess && (
                <View style={styles.rumorSuccessNote}>
                  <Ionicons name="checkmark-circle-outline" size={15} color={KumbhColors.success} />
                  <Text style={styles.rumorSuccessText}>
                    Report received. Forwarded to control desk.
                  </Text>
                </View>
              )}
            </View>

            {/* Live Rumor / Fact-Check Stream */}
            <View style={styles.rumorFeedList}>
              {rumors.length === 0 ? (
                <View style={styles.emptyRumorsState}>
                  <Ionicons name="shield-checkmark" size={36} color={KumbhColors.success} />
                  <Text style={styles.emptyRumorsTitle}>No Active Rumors Reported</Text>
                  <Text style={styles.emptyRumorsSub}>
                    All official mela advisories are currently verified. You can submit unverified claims or messages above for real-time fact checking by the administration.
                  </Text>
                </View>
              ) : (
                rumors.map((item: RumorFactCheck) => {
                  const title = item.claimTitle[language] || item.claimTitle.hi || item.claimTitle.en;
                  const clari = item.officialClarification[language] || item.officialClarification.hi || item.officialClarification.en;

                  const isFake = item.status === 'debunked_fake';
                  const isVerified = item.status === 'verified_true';

                  return (
                    <View
                      key={item.id}
                      style={[
                        styles.rumorCard,
                        isFake && styles.rumorCardFake,
                        isVerified && styles.rumorCardVerified,
                      ]}>
                      
                      {/* Status Banner */}
                      <View style={styles.rumorStatusRow}>
                        <View
                          style={[
                            styles.statusPill,
                            isFake && styles.statusPillFake,
                            isVerified && styles.statusPillVerified,
                          ]}>
                          <Text
                            style={[
                              styles.statusPillText,
                              isFake && styles.statusPillTextFake,
                              isVerified && styles.statusPillTextVerified,
                            ]}>
                            {isFake ? t.fakeNews : isVerified ? t.verified : t.underReview}
                          </Text>
                        </View>
                        <Text style={styles.rumorTimestamp}>{item.timestamp}</Text>
                      </View>

                      <Text style={styles.rumorClaimTitle}>{title}</Text>
                      <Text style={styles.rumorSource}>Source: {item.claimSource}</Text>

                      {/* Clarification Box */}
                      <View style={styles.clarificationBox}>
                        <Text style={styles.clarificationHeader}>
                          Clarification ({item.verifiedBy}):
                        </Text>
                        <Text style={styles.clarificationBody}>{clari}</Text>
                      </View>

                    </View>
                  );
                })
              )}
            </View>
          </View>
        )}

        {/* SECTION 3: 24x7 EMERGENCY HELPLINES (SOS) */}
        <View style={styles.emergencySectionWrapper}>
          <View style={styles.emergencyHeader}>
            <View style={styles.sosEmojiBox}>
              <MaterialCommunityIcons name="shield-alert-outline" size={20} color={KumbhColors.danger} />
            </View>
            <View>
              <Text style={styles.emergencyTitle}>{t.sectionEmergency}</Text>
              <Text style={styles.emergencySub}>{t.emergencyDesc}</Text>
            </View>
          </View>

          <View style={styles.contactsGrid}>
            {EMERGENCY_CONTACTS.map((contact: EmergencyContact) => {
              const name = contact.name[language] || contact.name.hi || contact.name.en;
              const desc = contact.description[language] || contact.description.hi || contact.description.en;

              return (
                <View key={contact.id} style={styles.contactCard}>
                  <View style={styles.contactCardLeft}>
                    <View style={[styles.contactIconCircle, { backgroundColor: contact.color + '15' }]}>
                      <Ionicons name={contact.iconName as any} size={18} color={contact.color} />
                    </View>
                    <View style={styles.contactTextBox}>
                      <Text style={styles.contactName}>{name}</Text>
                      <Text style={styles.contactDesc} numberOfLines={2}>
                        {desc}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={[styles.callActionBtn, { backgroundColor: contact.color }]}
                    onPress={() => handleCallEmergency(contact.number)}
                    activeOpacity={0.85}>
                    <Ionicons name="call" size={14} color="#FFFFFF" />
                    <Text style={styles.callActionNumber}>{contact.number}</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: KumbhColors.background,
  },
  container: {
    flex: 1,
    backgroundColor: KumbhColors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 14,
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.textPrimary,
  },
  headerSub: {
    fontSize: 11,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_500Medium',
    marginTop: 2,
  },
  navPillsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  navPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: KumbhColors.cardBackground,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: KumbhColors.border,
    gap: 4,
  },
  navPillActive: {
    backgroundColor: KumbhColors.primary,
    borderColor: KumbhColors.primary,
  },
  sosPill: {
    borderColor: KumbhColors.dangerBorder,
  },
  sosPillActive: {
    backgroundColor: KumbhColors.danger,
    borderColor: KumbhColors.danger,
  },
  navPillText: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.textSecondary,
  },
  navPillTextActive: {
    color: '#FFFFFF',
  },
  sosPillText: {
    color: KumbhColors.danger,
  },
  sectionCard: {
    backgroundColor: KumbhColors.cardBackground,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: KumbhColors.border,
    marginBottom: 16,
  },
  cardTopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  sectionIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 6,
    backgroundColor: KumbhColors.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeaderCol: {
    flex: 1,
  },
  cardSectionTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.textPrimary,
  },
  cardSectionSub: {
    fontSize: 11,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_400Regular',
  },
  successTokenCard: {
    backgroundColor: KumbhColors.successSoft,
    borderColor: KumbhColors.successBorder,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  successTextBox: {
    flex: 1,
  },
  successTokenTitle: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.success,
  },
  successTokenCode: {
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
    color: '#14532D',
    marginTop: 2,
  },
  successTokenSub: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#166534',
    marginTop: 2,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: KumbhColors.dangerSoft,
    borderColor: KumbhColors.dangerBorder,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
    gap: 6,
  },
  errorText: {
    color: KumbhColors.danger,
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    flex: 1,
  },
  inputLabel: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.textSecondary,
    marginBottom: 4,
  },
  categoryChipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  compCatChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: KumbhColors.inputBackground,
    borderRadius: 6,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: KumbhColors.border,
    gap: 4,
  },
  compCatChipSelected: {
    backgroundColor: KumbhColors.primarySoft,
    borderColor: KumbhColors.primary,
  },
  compCatText: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    color: KumbhColors.textSecondary,
  },
  compCatTextSelected: {
    color: KumbhColors.primaryDark,
    fontFamily: 'Poppins_600SemiBold',
  },
  formInput: {
    backgroundColor: KumbhColors.inputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: KumbhColors.border,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: KumbhColors.textPrimary,
    marginBottom: 10,
  },
  priceDiffRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  priceDiffCol: {
    flex: 1,
  },
  chargedInput: {
    borderColor: KumbhColors.dangerBorder,
    color: KumbhColors.danger,
    fontFamily: 'Poppins_500Medium',
  },
  submitCompBtn: {
    backgroundColor: KumbhColors.danger,
    borderRadius: 8,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  submitCompText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
  },
  userComplaintsList: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: KumbhColors.border,
  },
  userCompHeader: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.textPrimary,
    marginBottom: 8,
  },
  complaintItemCard: {
    backgroundColor: KumbhColors.background,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: KumbhColors.border,
    marginBottom: 6,
  },
  complaintItemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  complaintToken: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.primaryDark,
  },
  statusBadge: {
    backgroundColor: KumbhColors.secondarySoft,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  statusBadgeText: {
    fontSize: 9,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.secondaryDark,
  },
  complaintDetailText: {
    fontSize: 11,
    color: KumbhColors.textPrimary,
    fontFamily: 'Poppins_400Regular',
  },
  complaintPriceDiff: {
    fontSize: 11,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_400Regular',
    marginTop: 2,
  },
  reportRumorCard: {
    backgroundColor: KumbhColors.secondarySoft,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: KumbhColors.secondaryLight,
    marginBottom: 12,
  },
  reportRumorTitle: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.secondaryDark,
    marginBottom: 6,
  },
  rumorInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    padding: 8,
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: KumbhColors.textPrimary,
    borderWidth: 1,
    borderColor: KumbhColors.secondaryLight,
    textAlignVertical: 'top',
    marginBottom: 8,
  },
  reportRumorSubmitBtn: {
    backgroundColor: KumbhColors.secondaryDark,
    borderRadius: 6,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  reportRumorSubmitText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 11,
  },
  rumorSuccessNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 6,
  },
  rumorSuccessText: {
    color: KumbhColors.success,
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
  },
  rumorFeedList: {
    gap: 8,
  },
  emptyRumorsState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  emptyRumorsTitle: {
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeDark,
    textAlign: 'center',
  },
  emptyRumorsSub: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: KumbhColors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
  },
  rumorCard: {
    backgroundColor: KumbhColors.background,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: KumbhColors.border,
  },
  rumorCardFake: {
    borderColor: KumbhColors.dangerBorder,
    backgroundColor: '#FFF7F7',
  },
  rumorCardVerified: {
    borderColor: KumbhColors.successBorder,
    backgroundColor: '#F0FDF4',
  },
  rumorStatusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  statusPill: {
    backgroundColor: KumbhColors.inputBackground,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  statusPillFake: {
    backgroundColor: KumbhColors.dangerSoft,
  },
  statusPillVerified: {
    backgroundColor: KumbhColors.successSoft,
  },
  statusPillText: {
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.textSecondary,
  },
  statusPillTextFake: {
    color: KumbhColors.danger,
  },
  statusPillTextVerified: {
    color: KumbhColors.success,
  },
  rumorTimestamp: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: KumbhColors.textMuted,
  },
  rumorClaimTitle: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.textPrimary,
    marginBottom: 2,
  },
  rumorSource: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: KumbhColors.textMuted,
    marginBottom: 6,
  },
  clarificationBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    padding: 8,
    borderWidth: 1,
    borderColor: KumbhColors.border,
  },
  clarificationHeader: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.primaryDark,
    marginBottom: 2,
  },
  clarificationBody: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: KumbhColors.textSecondary,
    lineHeight: 16,
  },
  emergencySectionWrapper: {
    marginTop: 6,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  sosEmojiBox: {
    width: 36,
    height: 36,
    borderRadius: 6,
    backgroundColor: KumbhColors.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyTitle: {
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.danger,
  },
  emergencySub: {
    fontSize: 11,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_400Regular',
  },
  contactsGrid: {
    gap: 8,
  },
  contactCard: {
    backgroundColor: KumbhColors.cardBackground,
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: KumbhColors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  contactIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactTextBox: {
    flex: 1,
  },
  contactName: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.textPrimary,
  },
  contactDesc: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: KumbhColors.textMuted,
    lineHeight: 14,
    marginTop: 1,
  },
  callActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    gap: 4,
  },
  callActionNumber: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
  },
});


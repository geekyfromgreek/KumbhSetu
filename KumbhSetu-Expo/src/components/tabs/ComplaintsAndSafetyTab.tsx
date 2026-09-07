import React, { useState, useEffect } from 'react';
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
  Image,
  ActivityIndicator,
  Alert,
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
import { getCurrentPilgrimLocation, LocationCoords } from '@/utils/locationHelper';
import { takePhotoWithCamera, pickImageFromGallery } from '@/utils/imagePickerHelper';

export const ComplaintsAndSafetyTab: React.FC = () => {
  const insets = useSafeAreaInsets();
  const {
    language,
    t,
    complaints,
    addComplaint,
    deleteComplaint,
    rumors,
    submitRumorForCheck,
  } = useApp();

  const [activeSection, setActiveSection] = useState<'complaint' | 'rumors' | 'emergency'>('complaint');

  const [complaintCategory, setComplaintCategory] = useState<string>('Auto / Taxi');
  const [vendorOrVehicle, setVendorOrVehicle] = useState<string>('');
  const [locationPlace, setLocationPlace] = useState<string>('');
  const [standardAmt, setStandardAmt] = useState<string>('');
  const [chargedAmt, setChargedAmt] = useState<string>('');
  const [evidenceImage, setEvidenceImage] = useState<string | null>(null);
  const [gpsCoords, setGpsCoords] = useState<LocationCoords | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [complaintSuccessToken, setComplaintSuccessToken] = useState<string | null>(null);
  const [complaintError, setComplaintError] = useState<string>('');

  // Fetch initial GPS location on mount
  useEffect(() => {
    fetchCurrentGps();
  }, []);

  const fetchCurrentGps = async () => {
    setIsLocating(true);
    try {
      const loc = await getCurrentPilgrimLocation();
      if (loc) {
        setGpsCoords(loc);
        if (!locationPlace && loc.locationName) {
          setLocationPlace(loc.locationName);
        }
      }
    } catch (e) {
      console.warn('GPS location fetch error:', e);
    } finally {
      setIsLocating(false);
    }
  };

  const handlePickCamera = async () => {
    const uri = await takePhotoWithCamera();
    if (uri) setEvidenceImage(uri);
  };

  const handlePickGallery = async () => {
    const uri = await pickImageFromGallery();
    if (uri) setEvidenceImage(uri);
  };

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
    setIsSubmitting(true);
    try {
      const newComp = await addComplaint(
        complaintCategory,
        vendorOrVehicle,
        locationPlace,
        standardAmt || 'Approved Rate',
        chargedAmt,
        evidenceImage || undefined,
        gpsCoords ? { latitude: gpsCoords.latitude, longitude: gpsCoords.longitude } : undefined
      );

      setComplaintSuccessToken(newComp.token);
      setVendorOrVehicle('');
      setEvidenceImage(null);
      setStandardAmt('');
      setChargedAmt('');

      setTimeout(() => {
        setComplaintSuccessToken(null);
      }, 7000);
    } catch (err: any) {
      setComplaintError(err?.message || 'Failed to submit complaint');
    } finally {
      setIsSubmitting(false);
    }
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
            paddingTop: Math.max(insets.top + 8, 16),
            paddingBottom: 28,
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
            <Text style={styles.inputLabel}>{t.vehicleOrShop}: *</Text>
            <TextInput
              style={styles.formInput}
              placeholder="e.g. Shop Name, Counter No., Auto/Taxi Plate"
              placeholderTextColor={KumbhColors.textMuted}
              value={vendorOrVehicle}
              onChangeText={setVendorOrVehicle}
            />

            {/* Location & GPS Capture Card */}
            <View style={styles.locationHeaderRow}>
              <Text style={styles.inputLabel}>{t.locationPlace}: *</Text>
              <TouchableOpacity
                style={styles.gpsRefreshBtn}
                onPress={fetchCurrentGps}
                activeOpacity={0.7}>
                {isLocating ? (
                  <ActivityIndicator size="small" color={KumbhColors.primaryDark} />
                ) : (
                  <>
                    <Ionicons name="navigate-circle" size={14} color={KumbhColors.primaryDark} />
                    <Text style={styles.gpsRefreshText}>Auto-Locate GPS</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.formInput}
              placeholder="e.g. Ramkund Gate 3, Sadhugram Sector 4"
              placeholderTextColor={KumbhColors.textMuted}
              value={locationPlace}
              onChangeText={setLocationPlace}
            />

            {gpsCoords && (
              <View style={styles.gpsCoordsBadge}>
                <Ionicons name="location" size={13} color="#059669" />
                <Text style={styles.gpsCoordsText}>
                  GPS Captured: {gpsCoords.latitude.toFixed(5)}, {gpsCoords.longitude.toFixed(5)}
                  {gpsCoords.locationName ? ` • ${gpsCoords.locationName}` : ''}
                </Text>
              </View>
            )}

            {/* Evidence Image Upload */}
            <Text style={styles.inputLabel}>Upload Evidence Photo (Shop / Board / Vehicle / Bill):</Text>
            {evidenceImage ? (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: evidenceImage }} style={styles.evidenceThumbnail} />
                <TouchableOpacity
                  style={styles.removeImageBtn}
                  onPress={() => setEvidenceImage(null)}>
                  <Ionicons name="close-circle" size={20} color="#DC2626" />
                </TouchableOpacity>
                <View style={styles.imageAttachedTag}>
                  <Ionicons name="checkmark-circle" size={12} color="#059669" />
                  <Text style={styles.imageAttachedText}>Photo Attached</Text>
                </View>
              </View>
            ) : (
              <View style={styles.photoPickerRow}>
                <TouchableOpacity
                  style={styles.photoPickerBtn}
                  onPress={handlePickCamera}
                  activeOpacity={0.8}>
                  <Ionicons name="camera" size={18} color={KumbhColors.primaryDark} />
                  <Text style={styles.photoPickerBtnText}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.photoPickerBtn, styles.galleryBtn]}
                  onPress={handlePickGallery}
                  activeOpacity={0.8}>
                  <Ionicons name="image" size={18} color={KumbhColors.textSecondary} />
                  <Text style={styles.photoPickerBtnText}>Upload from Gallery</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Ground Volunteer Verification Notice */}
            <View style={styles.volunteerVerificationNotice}>
              <View style={styles.noticeIconCircle}>
                <Ionicons name="shield-checkmark" size={16} color="#D97706" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.volunteerNoticeTitle}>KumbhVeer Ground Verification</Text>
                <Text style={styles.volunteerNoticeSub}>
                  Your uploaded photo & GPS location will be dispatched to on-duty KumbhVeer volunteers to physically inspect the spot and verify severity (Low, Med, High) for administrative or Police action.
                </Text>
              </View>
            </View>

            {/* Price Difference Row */}
            <View style={[styles.priceDiffRow, { marginTop: 10 }]}>
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
              style={[styles.submitCompBtn, isSubmitting && { opacity: 0.7 }]}
              onPress={handleSubmitComplaint}
              disabled={isSubmitting}
              activeOpacity={0.85}>
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <>
                  <Ionicons name="send-outline" size={16} color="#FFFFFF" />
                  <Text style={styles.submitCompText}>{t.submitComplaint}</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Previous Complaints Submitted by User */}
            {complaints.length > 0 && (
              <View style={styles.userComplaintsList}>
                <Text style={styles.userCompHeader}>Logged Case Reports ({complaints.length})</Text>
                {complaints.map((c: UserComplaint) => (
                  <View key={c.id} style={styles.complaintItemCard}>
                    <View style={styles.complaintItemTop}>
                      <Text style={styles.complaintToken}>{c.token}</Text>
                      <View style={styles.statusBadgesRow}>
                        {c.severity ? (
                          <View
                            style={[
                              styles.severityBadge,
                              c.severity === 'HIGH'
                                ? styles.sevHigh
                                : c.severity === 'MED'
                                ? styles.sevMed
                                : styles.sevLow,
                            ]}>
                            <Text style={styles.sevBadgeText}>Veer: {c.severity}</Text>
                          </View>
                        ) : (
                          <View style={styles.pendingVerifyBadge}>
                            <Text style={styles.pendingVerifyText}>Veer Pending</Text>
                          </View>
                        )}
                        <View style={styles.statusBadge}>
                          <Text style={styles.statusBadgeText}>{c.status}</Text>
                        </View>
                        <TouchableOpacity
                          style={styles.deleteComplaintBtn}
                          onPress={() => {
                            Alert.alert(
                              'Withdraw Report',
                              'Are you sure you want to delete this incident report?',
                              [
                                { text: 'Cancel', style: 'cancel' },
                                {
                                  text: 'Delete',
                                  style: 'destructive',
                                  onPress: () => deleteComplaint(c.id),
                                },
                              ]
                            );
                          }}
                          activeOpacity={0.7}
                        >
                          <Ionicons name="trash-outline" size={13} color="#DC2626" />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View style={styles.complaintContentRow}>
                      {c.imageUrl && (
                        <Image source={{ uri: c.imageUrl }} style={styles.complaintListThumb} />
                      )}
                      <View style={{ flex: 1 }}>
                        <Text style={styles.complaintDetailText}>
                          {c.location} • {c.vehicleOrShop}
                        </Text>
                        <Text style={styles.complaintPriceDiff}>
                          Charged: <Text style={{ color: KumbhColors.danger, fontFamily: 'Poppins_600SemiBold' }}>₹{c.chargedAmt}</Text> (Std: ₹{c.standardAmt})
                        </Text>
                        {c.latitude && c.longitude && (
                          <Text style={styles.complaintGpsTag}>
                            📍 GPS: {c.latitude.toFixed(4)}, {c.longitude.toFixed(4)}
                          </Text>
                        )}
                      </View>
                    </View>
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
  locationHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  gpsRefreshBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  gpsRefreshText: {
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.primaryDark,
  },
  gpsCoordsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: 10,
  },
  gpsCoordsText: {
    fontSize: 10,
    fontFamily: 'Poppins_500Medium',
    color: '#065F46',
  },
  photoPickerRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  photoPickerBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    borderRadius: 8,
    paddingVertical: 8,
  },
  galleryBtn: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
  },
  photoPickerBtnText: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.textPrimary,
  },
  imagePreviewContainer: {
    position: 'relative',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  evidenceThumbnail: {
    width: 120,
    height: 90,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: KumbhColors.primary,
  },
  removeImageBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  imageAttachedTag: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  imageAttachedText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontFamily: 'Poppins_500Medium',
  },
  volunteerVerificationNotice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#FFFBEB',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: 10,
  },
  noticeIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  volunteerNoticeTitle: {
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
    color: '#92400E',
  },
  volunteerNoticeSub: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: '#B45309',
    marginTop: 2,
    lineHeight: 14,
  },
  pendingVerifyBadge: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  pendingVerifyText: {
    fontSize: 9,
    fontFamily: 'Poppins_600SemiBold',
    color: '#6B7280',
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
    marginBottom: 8,
  },
  complaintItemTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  complaintToken: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.primaryDark,
  },
  statusBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deleteComplaintBtn: {
    padding: 3,
    backgroundColor: '#FEF2F2',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FECACA',
    marginLeft: 2,
  },
  severityBadge: {
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 4,
    borderWidth: 1,
  },
  sevHigh: {
    backgroundColor: '#FEE2E2',
    borderColor: '#EF4444',
  },
  sevMed: {
    backgroundColor: '#FEF3C7',
    borderColor: '#F59E0B',
  },
  sevLow: {
    backgroundColor: '#ECFDF5',
    borderColor: '#10B981',
  },
  sevBadgeText: {
    fontSize: 9,
    fontFamily: 'Poppins_700Bold',
    color: '#1F2937',
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
  complaintContentRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  complaintListThumb: {
    width: 44,
    height: 44,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  complaintDetailText: {
    fontSize: 11,
    color: KumbhColors.textPrimary,
    fontFamily: 'Poppins_400Regular',
  },
  complaintPriceDiff: {
    fontSize: 11,
    color: KumbhColors.textSecondary,
    fontFamily: 'Poppins_400Regular',
    marginTop: 1,
  },
  complaintGpsTag: {
    fontSize: 9,
    fontFamily: 'Poppins_500Medium',
    color: '#059669',
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


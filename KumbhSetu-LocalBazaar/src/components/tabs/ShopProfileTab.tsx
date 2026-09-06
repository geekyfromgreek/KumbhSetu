import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BazaarColors } from '@/constants/colors';
import { useMerchant } from '@/context/MerchantContext';
import {
  pickImageFromGallery,
  takePhotoWithCamera,
  SAMPLE_SHOP_IMAGES,
} from '@/utils/imagePickerHelper';

export const ShopProfileTab: React.FC = () => {
  const { profile, updateProfile, resetAccount } = useMerchant();

  if (!profile) return null;

  const [ownerName, setOwnerName] = useState(profile.ownerName);
  const [businessName, setBusinessName] = useState(profile.businessName);
  const [phone, setPhone] = useState(profile.phone);
  const [whatsappNumber, setWhatsappNumber] = useState(profile.whatsappNumber);
  const [address, setAddress] = useState(profile.address);
  const [landmark, setLandmark] = useState(profile.landmark);
  const [shopImageUri, setShopImageUri] = useState(profile.shopImageUri);

  // Food License State
  const [licenseNumber, setLicenseNumber] = useState(profile.foodLicense?.licenseNumber || '');
  const [licenseHolderName, setLicenseHolderName] = useState(
    profile.foodLicense?.licenseHolderName || ''
  );
  const [licenseDocUri, setLicenseDocUri] = useState(
    profile.foodLicense?.documentImageUri || ''
  );

  const [saveSuccess, setSaveSuccess] = useState(false);

  const handlePickShopImage = async () => {
    const uri = await pickImageFromGallery();
    if (uri) setShopImageUri(uri);
  };

  const handleCaptureShopPhoto = async () => {
    const uri = await takePhotoWithCamera();
    if (uri) setShopImageUri(uri);
  };

  const handlePickLicenseDoc = async () => {
    const uri = await pickImageFromGallery();
    if (uri) setLicenseDocUri(uri);
  };

  const handleSaveProfile = async () => {
    if (!ownerName.trim() || !businessName.trim() || !phone.trim() || !address.trim()) {
      Alert.alert('Validation Error', 'Owner Name, Shop Name, Phone, and Address cannot be empty.');
      return;
    }

    await updateProfile({
      ownerName: ownerName.trim(),
      businessName: businessName.trim(),
      phone: phone.trim(),
      whatsappNumber: whatsappNumber.trim() || phone.trim(),
      address: address.trim(),
      landmark: landmark.trim(),
      shopImageUri: shopImageUri || profile.shopImageUri,
      foodLicense: {
        ...profile.foodLicense,
        hasLicense: !!licenseNumber || !!licenseDocUri,
        licenseNumber: licenseNumber.trim(),
        licenseHolderName: licenseHolderName.trim() || ownerName.trim(),
        documentImageUri: licenseDocUri || undefined,
      },
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleResetAccount = () => {
    Alert.alert(
      'Deregister Stall',
      'Are you sure you want to reset and deregister this stall from KumbhSetu Local Bazaar?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Deregister',
          style: 'destructive',
          onPress: async () => {
            await resetAccount();
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {saveSuccess ? (
        <View style={styles.successBanner}>
          <Ionicons name="checkmark-circle" size={18} color={BazaarColors.success} />
          <Text style={styles.successBannerText}>Profile details updated successfully!</Text>
        </View>
      ) : null}

      {/* Storefront Facade Photo */}
      <View style={styles.card}>
        <Text style={styles.cardSectionTitle}>Stall Facade Photo</Text>
        <Text style={styles.cardDescText}>
          Displayed to pilgrims on the KumbhSetu pilgrim map & marketplace directory.
        </Text>

        <View style={styles.imagePreviewWrapper}>
          <Image source={{ uri: shopImageUri }} style={styles.shopFacadeImage} resizeMode="cover" />
        </View>

        <View style={styles.photoActionRow}>
          <TouchableOpacity
            style={styles.photoBtn}
            onPress={handlePickShopImage}
            activeOpacity={0.8}
          >
            <Ionicons name="images" size={15} color={BazaarColors.saffron} />
            <Text style={styles.photoBtnText}>Gallery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.photoBtn}
            onPress={handleCaptureShopPhoto}
            activeOpacity={0.8}
          >
            <Ionicons name="camera" size={15} color={BazaarColors.saffron} />
            <Text style={styles.photoBtnText}>Camera</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
          {SAMPLE_SHOP_IMAGES.map((sample) => (
            <TouchableOpacity
              key={sample.id}
              onPress={() => setShopImageUri(sample.url)}
              style={[
                styles.sampleThumbBox,
                shopImageUri === sample.url && styles.sampleThumbBoxActive,
              ]}
            >
              <Image source={{ uri: sample.url }} style={styles.sampleThumb} />
              <Text style={styles.sampleThumbText} numberOfLines={1}>
                {sample.title}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Business Details */}
      <View style={styles.card}>
        <Text style={styles.cardSectionTitle}>Business & Stall Details</Text>

        <Text style={styles.inputLabel}>Shop / Stall Name</Text>
        <TextInput
          style={styles.textInput}
          value={businessName}
          onChangeText={setBusinessName}
        />

        <Text style={styles.inputLabel}>Owner / Proprietor Name</Text>
        <TextInput
          style={styles.textInput}
          value={ownerName}
          onChangeText={setOwnerName}
        />

        <View style={styles.rowTwoCols}>
          <View style={{ flex: 1, marginRight: 6 }}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.textInput}
              value={phone}
              keyboardType="phone-pad"
              onChangeText={(txt) => setPhone(txt.replace(/[^0-9]/g, ''))}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 6 }}>
            <Text style={styles.inputLabel}>WhatsApp Number</Text>
            <TextInput
              style={styles.textInput}
              value={whatsappNumber}
              keyboardType="phone-pad"
              onChangeText={(txt) => setWhatsappNumber(txt.replace(/[^0-9]/g, ''))}
            />
          </View>
        </View>

        <Text style={styles.inputLabel}>Physical Address & Stall Number</Text>
        <TextInput
          style={styles.textInput}
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.inputLabel}>Nearby Landmark</Text>
        <TextInput
          style={styles.textInput}
          value={landmark}
          onChangeText={setLandmark}
        />
      </View>

      {/* Food Safety License (FSSAI) */}
      <View style={styles.card}>
        <View style={styles.licenseTitleRow}>
          <Text style={styles.cardSectionTitle}>Food Safety License (FSSAI)</Text>
          {profile.foodLicense?.hasLicense && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="shield-checkmark" size={12} color={BazaarColors.success} />
              <Text style={styles.verifiedBadgeText}>Registered</Text>
            </View>
          )}
        </View>

        <Text style={styles.inputLabel}>FSSAI License / Registration No.</Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g. 11521000001234"
          placeholderTextColor={BazaarColors.textMuted}
          value={licenseNumber}
          onChangeText={setLicenseNumber}
        />

        <Text style={styles.inputLabel}>License Holder Name</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Proprietor / Establishment Name"
          placeholderTextColor={BazaarColors.textMuted}
          value={licenseHolderName}
          onChangeText={setLicenseHolderName}
        />

        <Text style={styles.inputLabel}>Certificate Document</Text>
        <View style={styles.uploadDocRow}>
          <TouchableOpacity
            style={styles.uploadDocBtn}
            onPress={handlePickLicenseDoc}
            activeOpacity={0.8}
          >
            <Ionicons name="document-attach" size={16} color={BazaarColors.saffron} />
            <Text style={styles.uploadDocBtnText}>
              {licenseDocUri ? 'Replace Certificate' : 'Upload Certificate Photo'}
            </Text>
          </TouchableOpacity>
        </View>

        {licenseDocUri ? (
          <View style={styles.docPreviewCard}>
            <Image source={{ uri: licenseDocUri }} style={styles.docPreviewImg} />
            <View style={{ flex: 1 }}>
              <Text style={styles.docPreviewHeading}>FSSAI Document Uploaded</Text>
              <Text style={styles.docPreviewNote}>Available for Food Safety squad inspection</Text>
            </View>
            <TouchableOpacity onPress={() => setLicenseDocUri('')}>
              <Ionicons name="close-circle" size={20} color={BazaarColors.danger} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      {/* Save Button */}
      <TouchableOpacity
        style={styles.saveProfileBtn}
        onPress={handleSaveProfile}
        activeOpacity={0.85}
      >
        <Ionicons name="save-outline" size={18} color={BazaarColors.white} />
        <Text style={styles.saveProfileBtnText}>Save Profile Changes</Text>
      </TouchableOpacity>

      {/* Deregister Account */}
      <TouchableOpacity
        style={styles.deregisterBtn}
        onPress={handleResetAccount}
        activeOpacity={0.7}
      >
        <Ionicons name="log-out-outline" size={16} color={BazaarColors.danger} />
        <Text style={styles.deregisterBtnText}>Deregister Stall / Switch Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BazaarColors.background,
  },
  scrollContent: {
    padding: 16,
    gap: 12,
    paddingBottom: 28,
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BazaarColors.successSoft,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BazaarColors.successBorder,
    padding: 10,
    gap: 8,
  },
  successBannerText: {
    color: BazaarColors.success,
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
  },
  card: {
    backgroundColor: BazaarColors.cardBackground,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
  },
  cardSectionTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: BazaarColors.templeBrown,
  },
  cardDescText: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: BazaarColors.textMuted,
    marginTop: 2,
    marginBottom: 8,
  },
  imagePreviewWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
    marginBottom: 8,
  },
  shopFacadeImage: {
    width: '100%',
    height: 140,
  },
  photoActionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  photoBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BazaarColors.surfaceHover,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
    paddingVertical: 8,
    gap: 6,
  },
  photoBtnText: {
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
    color: BazaarColors.templeBrown,
  },
  sampleThumbBox: {
    width: 80,
    marginRight: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
    overflow: 'hidden',
    backgroundColor: BazaarColors.surfaceHover,
  },
  sampleThumbBoxActive: {
    borderColor: BazaarColors.saffron,
    borderWidth: 2,
  },
  sampleThumb: {
    width: '100%',
    height: 50,
  },
  sampleThumbText: {
    fontSize: 9,
    fontFamily: 'Poppins_500Medium',
    color: BazaarColors.textSecondary,
    padding: 2,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: BazaarColors.textPrimary,
    marginTop: 8,
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: BazaarColors.surfaceHover,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12.5,
    fontFamily: 'Poppins_400Regular',
    color: BazaarColors.textPrimary,
  },
  rowTwoCols: {
    flexDirection: 'row',
  },
  licenseTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BazaarColors.successSoft,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: BazaarColors.successBorder,
    gap: 4,
  },
  verifiedBadgeText: {
    fontSize: 10,
    fontFamily: 'Poppins_700Bold',
    color: BazaarColors.success,
  },
  uploadDocRow: {
    flexDirection: 'row',
    marginTop: 4,
  },
  uploadDocBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BazaarColors.saffronSoft,
    borderWidth: 1,
    borderColor: BazaarColors.saffronBorder,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 6,
  },
  uploadDocBtnText: {
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
    color: BazaarColors.saffronDark,
  },
  docPreviewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BazaarColors.surfaceHover,
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
    gap: 8,
  },
  docPreviewImg: {
    width: 44,
    height: 44,
    borderRadius: 6,
  },
  docPreviewHeading: {
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
    color: BazaarColors.textPrimary,
  },
  docPreviewNote: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: BazaarColors.textMuted,
  },
  saveProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BazaarColors.saffron,
    borderRadius: 10,
    paddingVertical: 12,
    gap: 8,
    marginTop: 4,
  },
  saveProfileBtnText: {
    fontSize: 13.5,
    fontFamily: 'Poppins_700Bold',
    color: BazaarColors.white,
  },
  deregisterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BazaarColors.cardBackground,
    borderRadius: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: BazaarColors.dangerBorder,
    gap: 6,
    marginTop: 4,
  },
  deregisterBtnText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: BazaarColors.danger,
  },
});

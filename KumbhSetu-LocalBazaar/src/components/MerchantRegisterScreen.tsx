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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { BazaarColors } from '@/constants/colors';
import { useMerchant } from '@/context/MerchantContext';
import { BusinessCategory, BusinessScale } from '@/types/merchant';
import {
  pickImageFromGallery,
  takePhotoWithCamera,
  SAMPLE_SHOP_IMAGES,
} from '@/utils/imagePickerHelper';

export const MerchantRegisterScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { registerMerchant } = useMerchant();

  // Form Fields
  const [ownerName, setOwnerName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState<BusinessCategory>('EATERY_LARGE');
  const [scale, setScale] = useState<BusinessScale>('LARGE_SCALE');
  const [phone, setPhone] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [shopImageUri, setShopImageUri] = useState<string>(SAMPLE_SHOP_IMAGES[0].url);

  // Food License State
  const [hasLicense, setHasLicense] = useState<boolean>(true);
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseHolderName, setLicenseHolderName] = useState('');
  const [licenseDocumentUri, setLicenseDocumentUri] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState('');

  const isFoodBusiness =
    category === 'EATERY_LARGE' ||
    category === 'EATERY_SMALL' ||
    category === 'CHIVDA_SWEETS';

  const isLargeEatery = category === 'EATERY_LARGE' || scale === 'LARGE_SCALE';

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
    if (uri) setLicenseDocumentUri(uri);
  };

  const handleSubmitRegistration = async () => {
    if (!ownerName.trim() || !businessName.trim() || !phone.trim() || !address.trim()) {
      setErrorMessage('Please fill in Owner Name, Shop Name, Phone Number, and Address.');
      return;
    }

    if (phone.trim().length < 10) {
      setErrorMessage('Please enter a valid 10-digit contact number.');
      return;
    }

    // Food license validation for large scale eateries
    if (isLargeEatery && isFoodBusiness) {
      if (!licenseNumber.trim() && !licenseDocumentUri) {
        setErrorMessage(
          'Food Safety License (FSSAI) is mandatory for large-scale eateries. Please enter your FSSAI License Number or upload the certificate.'
        );
        return;
      }
    }

    setErrorMessage('');

    await registerMerchant({
      ownerName: ownerName.trim(),
      businessName: businessName.trim(),
      category,
      scale,
      phone: phone.trim(),
      whatsappNumber: whatsappNumber.trim() || phone.trim(),
      address: address.trim(),
      landmark: landmark.trim() || 'Nashik Kumbh Mela Area',
      shopImageUri: shopImageUri || SAMPLE_SHOP_IMAGES[0].url,
      isOpenNow: true,
      foodLicense: {
        hasLicense: hasLicense || !!licenseNumber || !!licenseDocumentUri,
        licenseNumber: licenseNumber.trim() || (isFoodBusiness ? 'FSSAI-REG-PENDING' : 'N/A'),
        licenseHolderName: licenseHolderName.trim() || ownerName.trim(),
        documentImageUri: licenseDocumentUri || undefined,
        isVerifiedByAuthority: false,
      },
    });

    Alert.alert(
      'Registration Successful',
      `${businessName} has been registered in KumbhSetu Local Bazaar. You can now add your products and prices.`
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: Math.max(insets.top + 12, 24), paddingBottom: 40 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header Card */}
        <View style={styles.brandHeader}>
          <View style={styles.brandIconBox}>
            <Ionicons name="storefront" size={28} color={BazaarColors.saffron} />
          </View>
          <Text style={styles.brandTitle}>KumbhSetu Local Bazaar</Text>
          <Text style={styles.brandSub}>Merchant & Eatery Registration Desk</Text>
          <Text style={styles.brandDesc}>
            Register your shop, food stall, or bhojanalaya so pilgrims can discover your items, visit your stall, and contact you directly.
          </Text>
        </View>

        {errorMessage ? (
          <View style={styles.errorBanner}>
            <Ionicons name="alert-circle" size={18} color={BazaarColors.danger} />
            <Text style={styles.errorBannerText}>{errorMessage}</Text>
          </View>
        ) : null}

        {/* Section 1: Merchant & Business Details */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>1. Business & Owner Profile</Text>

          <Text style={styles.inputLabel}>
            Owner / Proprietor Full Name <Text style={styles.reqStar}>*</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. Rameshwar Sharma"
            placeholderTextColor={BazaarColors.textMuted}
            value={ownerName}
            onChangeText={(txt) => {
              setOwnerName(txt);
              if (errorMessage) setErrorMessage('');
            }}
          />

          <Text style={styles.inputLabel}>
            Shop / Eatery / Stall Name <Text style={styles.reqStar}>*</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. Shri Godavari Mahaprasad Bhojanalaya"
            placeholderTextColor={BazaarColors.textMuted}
            value={businessName}
            onChangeText={(txt) => {
              setBusinessName(txt);
              if (errorMessage) setErrorMessage('');
            }}
          />

          <Text style={styles.inputLabel}>Business Category</Text>
          <View style={styles.categoryGrid}>
            {[
              { id: 'EATERY_LARGE', label: 'Large Eatery / Bhojanalaya', icon: 'restaurant' },
              { id: 'EATERY_SMALL', label: 'Small Food / Tea Stall', icon: 'cafe' },
              { id: 'CHIVDA_SWEETS', label: 'Nashik Chivda & Sweets', icon: 'fast-food' },
              { id: 'PUJA_HANDICRAFT', label: 'Puja Samagri & Brass', icon: 'flame' },
              { id: 'AGRO_GRAPES', label: 'Fresh Grapes & Farm Produce', icon: 'leaf' },
              { id: 'STAY_DHARAMSHALA', label: 'Pilgrim Stay / Dharamshala', icon: 'bed' },
              { id: 'GENERAL_UTILITY', label: 'General Goods & Services', icon: 'grid' },
            ].map((cat) => {
              const isSelected = category === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.catChip, isSelected && styles.catChipActive]}
                  onPress={() => {
                    setCategory(cat.id as BusinessCategory);
                    if (cat.id === 'EATERY_LARGE') {
                      setScale('LARGE_SCALE');
                    }
                  }}
                  activeOpacity={0.75}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={14}
                    color={isSelected ? BazaarColors.saffron : BazaarColors.textSecondary}
                  />
                  <Text style={[styles.catChipText, isSelected && styles.catChipTextActive]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.inputLabel}>Scale of Operation</Text>
          <View style={styles.scaleRow}>
            <TouchableOpacity
              style={[
                styles.scaleBtn,
                scale === 'LARGE_SCALE' && styles.scaleBtnActive,
              ]}
              onPress={() => setScale('LARGE_SCALE')}
            >
              <Ionicons
                name="business"
                size={16}
                color={scale === 'LARGE_SCALE' ? BazaarColors.saffron : BazaarColors.textMuted}
              />
              <Text
                style={[
                  styles.scaleBtnText,
                  scale === 'LARGE_SCALE' && styles.scaleBtnTextActive,
                ]}
              >
                Large Scale Eatery / Store
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.scaleBtn,
                scale === 'SMALL_SCALE' && styles.scaleBtnActive,
              ]}
              onPress={() => setScale('SMALL_SCALE')}
            >
              <Ionicons
                name="storefront"
                size={16}
                color={scale === 'SMALL_SCALE' ? BazaarColors.saffron : BazaarColors.textMuted}
              />
              <Text
                style={[
                  styles.scaleBtnText,
                  scale === 'SMALL_SCALE' && styles.scaleBtnTextActive,
                ]}
              >
                Small Vendor / Stall
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section 2: Contact & Physical Location */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>2. Contact & Stall Location</Text>

          <View style={styles.rowTwoCols}>
            <View style={{ flex: 1, marginRight: 6 }}>
              <Text style={styles.inputLabel}>
                Phone Number <Text style={styles.reqStar}>*</Text>
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="9876543210"
                placeholderTextColor={BazaarColors.textMuted}
                keyboardType="phone-pad"
                maxLength={10}
                value={phone}
                onChangeText={(txt) => setPhone(txt.replace(/[^0-9]/g, ''))}
              />
            </View>

            <View style={{ flex: 1, marginLeft: 6 }}>
              <Text style={styles.inputLabel}>WhatsApp Number</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Same as phone"
                placeholderTextColor={BazaarColors.textMuted}
                keyboardType="phone-pad"
                maxLength={10}
                value={whatsappNumber}
                onChangeText={(txt) => setWhatsappNumber(txt.replace(/[^0-9]/g, ''))}
              />
            </View>
          </View>

          <Text style={styles.inputLabel}>
            Physical Address & Stall Number <Text style={styles.reqStar}>*</Text>
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. Stall No. B-42, Ramkund Ghat Path"
            placeholderTextColor={BazaarColors.textMuted}
            value={address}
            onChangeText={setAddress}
          />

          <Text style={styles.inputLabel}>Nearby Landmark</Text>
          <TextInput
            style={styles.textInput}
            placeholder="e.g. Opposite Ganga Mandir Gate, Panchavati"
            placeholderTextColor={BazaarColors.textMuted}
            value={landmark}
            onChangeText={setLandmark}
          />
        </View>

        {/* Section 3: Food Safety License (FSSAI) Upload */}
        {isFoodBusiness && (
          <View style={[styles.card, isLargeEatery && styles.cardHighlight]}>
            <View style={styles.licenseHeaderRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardSectionTitle}>
                  3. Food Safety & Standards License (FSSAI)
                </Text>
                <Text style={styles.licenseNotice}>
                  {isLargeEatery
                    ? 'Mandatory for all large-scale commercial eateries & bhojanalayas.'
                    : 'Recommended for food hygiene verification.'}
                </Text>
              </View>
              {isLargeEatery && (
                <View style={styles.mandatoryBadge}>
                  <Text style={styles.mandatoryBadgeText}>Mandatory</Text>
                </View>
              )}
            </View>

            <Text style={styles.inputLabel}>FSSAI License / Registration Number</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. 11521000001234"
              placeholderTextColor={BazaarColors.textMuted}
              value={licenseNumber}
              onChangeText={setLicenseNumber}
            />

            <Text style={styles.inputLabel}>License Holder / Company Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Name as printed on FSSAI Certificate"
              placeholderTextColor={BazaarColors.textMuted}
              value={licenseHolderName}
              onChangeText={setLicenseHolderName}
            />

            <Text style={styles.inputLabel}>Upload Food License Document / Photo</Text>
            <View style={styles.uploadRow}>
              <TouchableOpacity
                style={styles.uploadBtn}
                onPress={handlePickLicenseDoc}
                activeOpacity={0.8}
              >
                <Ionicons name="document-attach" size={18} color={BazaarColors.saffron} />
                <Text style={styles.uploadBtnText}>Choose Certificate</Text>
              </TouchableOpacity>
            </View>

            {licenseDocumentUri ? (
              <View style={styles.docPreviewBox}>
                <Image source={{ uri: licenseDocumentUri }} style={styles.docPreviewImage} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.docPreviewTitle}>License Document Attached</Text>
                  <Text style={styles.docPreviewSub}>Will be verified by Mela Food Safety Squad</Text>
                </View>
                <TouchableOpacity onPress={() => setLicenseDocumentUri('')}>
                  <Ionicons name="close-circle" size={20} color={BazaarColors.danger} />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        )}

        {/* Section 4: Shop Facade Photo */}
        <View style={styles.card}>
          <Text style={styles.cardSectionTitle}>
            {isFoodBusiness ? '4.' : '3.'} Shop Front / Facade Photo
          </Text>
          <Text style={styles.cardDescText}>
            This photo will be shown to pilgrims in the KumbhSetu Local Bazaar marketplace so they can recognize your stall.
          </Text>

          {/* Current Selected Image Preview */}
          <View style={styles.shopPreviewContainer}>
            <Image
              source={{ uri: shopImageUri || SAMPLE_SHOP_IMAGES[0].url }}
              style={styles.shopPreviewImage}
              resizeMode="cover"
            />
          </View>

          {/* Photo Actions */}
          <View style={styles.photoActionRow}>
            <TouchableOpacity
              style={styles.photoActionBtn}
              onPress={handlePickShopImage}
              activeOpacity={0.8}
            >
              <Ionicons name="images" size={16} color={BazaarColors.saffron} />
              <Text style={styles.photoActionText}>Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.photoActionBtn}
              onPress={handleCaptureShopPhoto}
              activeOpacity={0.8}
            >
              <Ionicons name="camera" size={16} color={BazaarColors.saffron} />
              <Text style={styles.photoActionText}>Take Photo</Text>
            </TouchableOpacity>
          </View>

          {/* Sample Photos Grid for Quick Selection */}
          <Text style={[styles.inputLabel, { marginTop: 12 }]}>Or choose a sample stall photo:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.samplesScroll}>
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

        {/* Submit Registration Button */}
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={handleSubmitRegistration}
          activeOpacity={0.85}
        >
          <Ionicons name="checkmark-circle" size={20} color={BazaarColors.white} />
          <Text style={styles.registerBtnText}>Complete Registration & Open Stall</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BazaarColors.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  brandHeader: {
    alignItems: 'center',
    backgroundColor: BazaarColors.cardBackground,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
  },
  brandIconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: BazaarColors.saffronSoft,
    borderWidth: 1,
    borderColor: BazaarColors.saffronBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  brandTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: BazaarColors.templeBrown,
  },
  brandSub: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: BazaarColors.saffronDark,
    marginTop: 1,
  },
  brandDesc: {
    fontSize: 11.5,
    fontFamily: 'Poppins_400Regular',
    color: BazaarColors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 16,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BazaarColors.dangerSoft,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BazaarColors.dangerBorder,
    padding: 10,
    gap: 8,
  },
  errorBannerText: {
    flex: 1,
    color: BazaarColors.danger,
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
  },
  card: {
    backgroundColor: BazaarColors.cardBackground,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
  },
  cardHighlight: {
    borderColor: BazaarColors.goldBorder,
    backgroundColor: '#FFFCF7',
  },
  cardSectionTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: BazaarColors.templeBrown,
    marginBottom: 8,
  },
  cardDescText: {
    fontSize: 11.5,
    fontFamily: 'Poppins_400Regular',
    color: BazaarColors.textMuted,
    marginBottom: 10,
    lineHeight: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: BazaarColors.textPrimary,
    marginTop: 8,
    marginBottom: 4,
  },
  reqStar: {
    color: BazaarColors.danger,
  },
  textInput: {
    backgroundColor: BazaarColors.inputBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
    paddingHorizontal: 12,
    paddingVertical: 9,
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: BazaarColors.textPrimary,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BazaarColors.surfaceHover,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
    gap: 6,
  },
  catChipActive: {
    backgroundColor: BazaarColors.saffronSoft,
    borderColor: BazaarColors.saffron,
  },
  catChipText: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    color: BazaarColors.textSecondary,
  },
  catChipTextActive: {
    color: BazaarColors.saffronDark,
    fontFamily: 'Poppins_700Bold',
  },
  scaleRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  scaleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BazaarColors.surfaceHover,
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
    gap: 6,
  },
  scaleBtnActive: {
    backgroundColor: BazaarColors.saffronSoft,
    borderColor: BazaarColors.saffron,
  },
  scaleBtnText: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    color: BazaarColors.textSecondary,
    textAlign: 'center',
  },
  scaleBtnTextActive: {
    color: BazaarColors.saffronDark,
    fontFamily: 'Poppins_700Bold',
  },
  rowTwoCols: {
    flexDirection: 'row',
  },
  licenseHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  licenseNotice: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: BazaarColors.textMuted,
    marginTop: 1,
  },
  mandatoryBadge: {
    backgroundColor: BazaarColors.dangerSoft,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: BazaarColors.dangerBorder,
  },
  mandatoryBadgeText: {
    fontSize: 10,
    fontFamily: 'Poppins_700Bold',
    color: BazaarColors.danger,
  },
  uploadRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  uploadBtn: {
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
  uploadBtnText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: BazaarColors.saffronDark,
  },
  docPreviewBox: {
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
  docPreviewImage: {
    width: 44,
    height: 44,
    borderRadius: 6,
  },
  docPreviewTitle: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: BazaarColors.textPrimary,
  },
  docPreviewSub: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: BazaarColors.textMuted,
  },
  shopPreviewContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
    marginBottom: 8,
  },
  shopPreviewImage: {
    width: '100%',
    height: 150,
  },
  photoActionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  photoActionBtn: {
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
  photoActionText: {
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
    color: BazaarColors.templeBrown,
  },
  samplesScroll: {
    marginTop: 6,
  },
  sampleThumbBox: {
    width: 90,
    marginRight: 8,
    borderRadius: 8,
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
    height: 60,
  },
  sampleThumbText: {
    fontSize: 9.5,
    fontFamily: 'Poppins_500Medium',
    color: BazaarColors.textSecondary,
    padding: 3,
    textAlign: 'center',
  },
  registerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BazaarColors.saffron,
    borderRadius: 10,
    paddingVertical: 13,
    gap: 8,
    marginTop: 6,
  },
  registerBtnText: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: BazaarColors.white,
  },
});

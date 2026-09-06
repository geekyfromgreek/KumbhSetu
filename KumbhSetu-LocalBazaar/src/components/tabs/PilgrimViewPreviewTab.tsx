import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BazaarColors } from '@/constants/colors';
import { useMerchant } from '@/context/MerchantContext';

export const PilgrimViewPreviewTab: React.FC = () => {
  const { profile, catalogItems } = useMerchant();

  if (!profile) return null;

  const handleCall = () => {
    if (profile.phone) {
      Linking.openURL(`tel:${profile.phone}`);
    }
  };

  const handleWhatsApp = (itemName?: string) => {
    const cleanPhone = (profile.whatsappNumber || profile.phone).replace(/[^0-9]/g, '');
    const text = itemName
      ? encodeURIComponent(`Namaste! I would like to inquire about "${itemName}" at ${profile.businessName}.`)
      : encodeURIComponent(`Namaste! Inquiring regarding ${profile.businessName} from KumbhSetu.`);
    Linking.openURL(`https://wa.me/${cleanPhone}?text=${text}`);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Notice & Admin Status Banner */}
      {profile.foodLicense?.isVerifiedByAuthority ? (
        <View style={[styles.previewNotice, { backgroundColor: '#DCFCE7', borderColor: '#86EFAC' }]}>
          <Ionicons name="checkmark-circle" size={16} color="#16A34A" />
          <Text style={[styles.previewNoticeText, { color: '#15803D' }]}>
            Verified & Approved by District Administration: Your stall is active and visible to all pilgrims in KumbhSetu App.
          </Text>
        </View>
      ) : (
        <View style={[styles.previewNotice, { backgroundColor: '#FEF9C3', borderColor: '#FDE047' }]}>
          <Ionicons name="time-outline" size={16} color="#CA8A04" />
          <Text style={[styles.previewNoticeText, { color: '#A16207' }]}>
            Pending Admin Verification: Your stall will be visible to pilgrims once approved by Kumbh Mela Administration in the Admin Portal.
          </Text>
        </View>
      )}

      {/* Pilgrim Marketplace Listing Card */}
      <View style={styles.storeCard}>
        {/* Facade Image */}
        <Image source={{ uri: profile.shopImageUri }} style={styles.storeFacadeImage} />

        <View style={styles.storeCardBody}>
          {/* Header Row */}
          <View style={styles.storeHeaderRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.storeName}>{profile.businessName}</Text>
              <Text style={styles.ownerText}>Proprietor: {profile.ownerName}</Text>
            </View>

            <View style={[styles.statusBadge, profile.isOpenNow ? styles.openBadge : styles.closedBadge]}>
              <Text style={[styles.statusBadgeText, { color: profile.isOpenNow ? BazaarColors.success : BazaarColors.danger }]}>
                {profile.isOpenNow ? 'Open Now' : 'Closed'}
              </Text>
            </View>
          </View>

          {/* Location & Badges */}
          <View style={styles.locationRow}>
            <Ionicons name="location" size={14} color={BazaarColors.saffron} />
            <Text style={styles.locationText}>
              {profile.address} • {profile.landmark}
            </Text>
          </View>

          <View style={styles.badgesRow}>
            {profile.foodLicense?.hasLicense && (
              <View style={styles.fssaiPill}>
                <Ionicons name="shield-checkmark" size={11} color={BazaarColors.success} />
                <Text style={styles.fssaiPillText}>FSSAI Verified: {profile.foodLicense.licenseNumber || 'Active'}</Text>
              </View>
            )}

            <View style={styles.scalePill}>
              <Text style={styles.scalePillText}>
                {profile.scale === 'LARGE_SCALE' ? 'Large Eatery' : 'Local Stall'}
              </Text>
            </View>
          </View>

          {/* Direct Pilgrim Action Buttons */}
          <View style={styles.contactButtonsRow}>
            <TouchableOpacity style={styles.callBtn} onPress={handleCall} activeOpacity={0.85}>
              <Ionicons name="call" size={14} color={BazaarColors.white} />
              <Text style={styles.callBtnText}>Call Stall ({profile.phone})</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.waBtn} onPress={() => handleWhatsApp()} activeOpacity={0.85}>
              <Ionicons name="logo-whatsapp" size={14} color={BazaarColors.white} />
              <Text style={styles.waBtnText}>WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Menu / Catalog Items Section */}
      <View style={styles.catalogSection}>
        <View style={styles.catalogHeader}>
          <Text style={styles.catalogTitle}>Items & Offerings ({catalogItems.length})</Text>
          <Text style={styles.catalogSub}>Available directly at the stall or for takeaway</Text>
        </View>

        {catalogItems.length === 0 ? (
          <View style={styles.emptyItemsCard}>
            <Ionicons name="restaurant-outline" size={32} color={BazaarColors.textMuted} />
            <Text style={styles.emptyItemsText}>No items published to catalog yet</Text>
            <Text style={styles.emptyItemsSub}>Go to "Catalog" tab to add your dishes or products.</Text>
          </View>
        ) : (
          catalogItems.map((item) => (
            <View key={item.id} style={styles.itemRowCard}>
              <Image source={{ uri: item.imageUrl }} style={styles.itemThumb} />

              <View style={styles.itemInfo}>
                <View style={styles.itemTitleRow}>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <Text style={styles.itemPrice}>₹{item.price}</Text>
                </View>

                <Text style={styles.itemUnitTag}>{item.unit}</Text>

                {item.description ? (
                  <Text style={styles.itemDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                ) : null}

                <View style={styles.itemActionRow}>
                  <View
                    style={[
                      styles.availPill,
                      item.isAvailable ? styles.availInStock : styles.availOutOfStock,
                    ]}
                  >
                    <Text
                      style={[
                        styles.availText,
                        { color: item.isAvailable ? BazaarColors.success : BazaarColors.danger },
                      ]}
                    >
                      {item.isAvailable ? 'In Stock' : 'Currently Unavailable'}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={styles.orderInquireBtn}
                    onPress={() => handleWhatsApp(item.name)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="chatbubble-ellipses-outline" size={12} color={BazaarColors.saffronDark} />
                    <Text style={styles.orderInquireText}>Inquire</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))
        )}
      </View>
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
  previewNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BazaarColors.saffronSoft,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BazaarColors.saffronBorder,
    padding: 10,
    gap: 8,
  },
  previewNoticeText: {
    flex: 1,
    fontSize: 11.5,
    fontFamily: 'Poppins_500Medium',
    color: BazaarColors.saffronDark,
    lineHeight: 16,
  },
  storeCard: {
    backgroundColor: BazaarColors.cardBackground,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
    overflow: 'hidden',
  },
  storeFacadeImage: {
    width: '100%',
    height: 160,
    backgroundColor: BazaarColors.surfaceHover,
  },
  storeCardBody: {
    padding: 14,
  },
  storeHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  storeName: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: BazaarColors.templeBrown,
  },
  ownerText: {
    fontSize: 11.5,
    fontFamily: 'Poppins_400Regular',
    color: BazaarColors.textMuted,
    marginTop: 1,
  },
  statusBadge: {
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
  },
  openBadge: {
    backgroundColor: BazaarColors.successSoft,
    borderColor: BazaarColors.successBorder,
  },
  closedBadge: {
    backgroundColor: BazaarColors.dangerSoft,
    borderColor: BazaarColors.dangerBorder,
  },
  statusBadgeText: {
    fontSize: 10.5,
    fontFamily: 'Poppins_700Bold',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 8,
  },
  locationText: {
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    color: BazaarColors.textSecondary,
    flex: 1,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  fssaiPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BazaarColors.successSoft,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: BazaarColors.successBorder,
    paddingVertical: 2,
    paddingHorizontal: 6,
    gap: 4,
  },
  fssaiPillText: {
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
    color: BazaarColors.success,
  },
  scalePill: {
    backgroundColor: BazaarColors.surfaceHover,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  scalePillText: {
    fontSize: 10,
    fontFamily: 'Poppins_500Medium',
    color: BazaarColors.textSecondary,
  },
  contactButtonsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: BazaarColors.surfaceHover,
  },
  callBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BazaarColors.riverBlue,
    borderRadius: 8,
    paddingVertical: 9,
    gap: 6,
  },
  callBtnText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: BazaarColors.white,
  },
  waBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16A34A',
    borderRadius: 8,
    paddingVertical: 9,
    gap: 6,
  },
  waBtnText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: BazaarColors.white,
  },
  catalogSection: {
    backgroundColor: BazaarColors.cardBackground,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
    padding: 14,
  },
  catalogHeader: {
    marginBottom: 10,
  },
  catalogTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: BazaarColors.templeBrown,
  },
  catalogSub: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: BazaarColors.textMuted,
  },
  emptyItemsCard: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyItemsText: {
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
    color: BazaarColors.templeBrown,
    marginTop: 6,
  },
  emptyItemsSub: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: BazaarColors.textMuted,
    marginTop: 2,
  },
  itemRowCard: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: BazaarColors.surfaceHover,
    paddingVertical: 10,
    gap: 10,
  },
  itemThumb: {
    width: 68,
    height: 68,
    borderRadius: 8,
    backgroundColor: BazaarColors.surfaceHover,
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemTitle: {
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
    color: BazaarColors.templeBrown,
    flex: 1,
  },
  itemPrice: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: BazaarColors.success,
    marginLeft: 6,
  },
  itemUnitTag: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: BazaarColors.textMuted,
  },
  itemDescription: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: BazaarColors.textSecondary,
    marginVertical: 2,
    lineHeight: 14,
  },
  itemActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  availPill: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  availInStock: {
    backgroundColor: BazaarColors.successSoft,
  },
  availOutOfStock: {
    backgroundColor: BazaarColors.dangerSoft,
  },
  availText: {
    fontSize: 9.5,
    fontFamily: 'Poppins_600SemiBold',
  },
  orderInquireBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BazaarColors.saffronSoft,
    borderWidth: 1,
    borderColor: BazaarColors.saffronBorder,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    gap: 4,
  },
  orderInquireText: {
    fontSize: 10.5,
    fontFamily: 'Poppins_600SemiBold',
    color: BazaarColors.saffronDark,
  },
});

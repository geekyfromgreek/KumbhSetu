import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Platform,
  Linking,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useApp } from '@/context/AppContext';
import { MARKETPLACE_ITEMS, MarketplaceItem } from '@/data/marketplaceData';
import { KumbhColors } from '@/constants/colors';

export const MarketplaceTab: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { language, t, reviews, addShopReview } = useApp();
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const [ratingModalItem, setRatingModalItem] = useState<MarketplaceItem | null>(null);
  const [userRating, setUserRating] = useState<number>(5);
  const [userComment, setUserComment] = useState<string>('');
  const [isSuccessFeedback, setIsSuccessFeedback] = useState<boolean>(false);

  const filteredItems = MARKETPLACE_ITEMS.filter((item) => {
    const matchesCat = selectedCat === 'all' || item.category === selectedCat;
    const nameStr = (item.name[language] || item.name.hi || item.name.en).toLowerCase();
    const shopStr = item.shopName.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || nameStr.includes(query) || shopStr.includes(query);
    return matchesCat && matchesSearch;
  });

  const handleCallShop = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleOpenWhatsApp = (phone: string, itemName: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(`Inquiry regarding ${itemName} from KumbhSetu.`);
    Linking.openURL(`https://wa.me/${cleanPhone}?text=${message}`);
  };

  const handleSubmitReview = () => {
    if (!ratingModalItem) return;
    addShopReview(ratingModalItem.id, userRating, userComment);
    setIsSuccessFeedback(true);
    setTimeout(() => {
      setIsSuccessFeedback(false);
      setRatingModalItem(null);
      setUserComment('');
      setUserRating(5);
    }, 1200);
  };

  return (
    <View style={styles.container}>
      
      {/* Top Banner Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top + 8, 16) }]}>
        <View style={styles.headerTitleRow}>
          <View>
            <Text style={styles.headerTitle}>{t.marketTitle}</Text>
            <Text style={styles.headerSub}>{t.marketSubtitle}</Text>
          </View>
        </View>

        {/* Search Input */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color={KumbhColors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder={t.search}
            placeholderTextColor={KumbhColors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={16} color={KumbhColors.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Category Filter Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScroll}>
          {[
            { id: 'all', label: t.allCategories },
            { id: 'chivda', label: t.catChivda },
            { id: 'food', label: t.catFood },
            { id: 'puja', label: t.catPuja },
            { id: 'grapes', label: t.catGrapes },
            { id: 'stay', label: t.catStay },
          ].map((cat) => {
            const isSelected = selectedCat === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedCat(cat.id)}
                style={[styles.catChip, isSelected && styles.catChipSelected]}>
                <Text style={[styles.catChipText, isSelected && styles.catChipTextSelected]}>
                  {cat.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Product & Shop Cards Stream */}
      <ScrollView
        contentContainerStyle={[
          styles.productList,
          { paddingBottom: 28 }
        ]}
        showsVerticalScrollIndicator={false}>
        
        {filteredItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="storefront-outline" size={42} color="#94A3B8" />
            <Text style={styles.emptyTitle}>No shops listed in the local bazaar</Text>
            <Text style={styles.emptySub}>
              Verified vendor stalls, puja stores, and pilgrim services registered during Kumbh Mela will appear here.
            </Text>
          </View>
        ) : (
          filteredItems.map((item) => {
            const name = item.name[language] || item.name.hi || item.name.en;
            const desc = item.description[language] || item.description.hi || item.description.en;
            const itemReviews = reviews.filter((r) => r.shopId === item.id);
            const reviewCount = item.reviewCount + itemReviews.length;

            return (
              <View key={item.id} style={styles.productCard}>
                
                {/* Product Listing Photo */}
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.productImage}
                  resizeMode="cover"
                />

                {/* Card Content */}
                <View style={styles.productContent}>
                  
                  {/* Header Row */}
                  <View style={styles.cardHeader}>
                    {item.badgeText ? (
                      <View style={styles.customBadge}>
                        <Text style={styles.customBadgeText}>{item.badgeText}</Text>
                      </View>
                    ) : <View />}

                    <TouchableOpacity
                      style={styles.ratingPill}
                      onPress={() => setRatingModalItem(item)}
                      activeOpacity={0.8}>
                      <FontAwesome name="star" size={11} color="#D97706" />
                      <Text style={styles.ratingNum}>{item.rating.toFixed(1)}</Text>
                      <Text style={styles.reviewCountText}>({reviewCount})</Text>
                    </TouchableOpacity>
                  </View>

                  {/* Name & Shop */}
                  <Text style={styles.productName}>{name}</Text>
                  <Text style={styles.shopName}>{item.shopName}</Text>
                  <Text style={styles.shopLocation}>{item.location}</Text>

                  <Text style={styles.productDesc}>{desc}</Text>

                  {/* Tags */}
                  <View style={styles.tagRow}>
                    {item.tags.map((tag, idx) => (
                      <View key={idx} style={styles.tagPill}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>

                  {/* Price & Actions */}
                  <View style={styles.cardBottomRow}>
                    <View style={styles.priceContainer}>
                      <Text style={styles.priceCurrency}>₹{item.price}</Text>
                      <Text style={styles.priceUnit}>{item.unit}</Text>
                    </View>

                    <View style={styles.actionButtonsGroup}>
                      <TouchableOpacity
                        style={styles.rateBtn}
                        onPress={() => setRatingModalItem(item)}>
                        <Text style={styles.rateBtnText}>Rate</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.waBtn}
                        onPress={() => handleOpenWhatsApp(item.phone, name)}>
                        <Ionicons name="logo-whatsapp" size={13} color="#FFFFFF" />
                        <Text style={styles.waBtnText}>WhatsApp</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.callBtn}
                        onPress={() => handleCallShop(item.phone)}>
                        <Ionicons name="call" size={13} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  </View>

                </View>

              </View>
            );
          })
        )}
      </ScrollView>

      {/* RATING MODAL */}
      <Modal
        visible={!!ratingModalItem}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setRatingModalItem(null)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{t.rateThisShop}</Text>
              <TouchableOpacity onPress={() => setRatingModalItem(null)}>
                <Ionicons name="close" size={18} color="#64748B" />
              </TouchableOpacity>
            </View>

            {ratingModalItem && (
              <View style={styles.modalShopInfo}>
                <Text style={styles.modalShopName}>{ratingModalItem.shopName}</Text>
                <Text style={styles.modalProductName}>
                  {ratingModalItem.name[language] || ratingModalItem.name.hi}
                </Text>
              </View>
            )}

            {isSuccessFeedback ? (
              <View style={styles.feedbackSuccess}>
                <Ionicons name="checkmark-circle" size={36} color={KumbhColors.success} />
                <Text style={styles.successTitle}>Rating Submitted</Text>
              </View>
            ) : (
              <>
                <View style={styles.starRow}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => setUserRating(star)}
                      style={styles.starTouch}>
                      <FontAwesome
                        name={star <= userRating ? 'star' : 'star-o'}
                        size={28}
                        color={star <= userRating ? '#D97706' : '#CBD5E1'}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={styles.starRatingDisplay}>{userRating} / 5 Stars</Text>

                <TextInput
                  style={styles.commentInput}
                  placeholder={t.writeReview}
                  placeholderTextColor={KumbhColors.textMuted}
                  value={userComment}
                  onChangeText={setUserComment}
                  multiline
                  numberOfLines={3}
                />

                <TouchableOpacity
                  style={styles.submitReviewBtn}
                  onPress={handleSubmitReview}>
                  <Text style={styles.submitReviewText}>{t.submitRating}</Text>
                </TouchableOpacity>
              </>
            )}

          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: KumbhColors.background,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeDark,
  },
  headerSub: {
    fontSize: 11,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_400Regular',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8,
    gap: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: KumbhColors.charcoal,
  },
  categoryScroll: {
    gap: 6,
    paddingBottom: 4,
  },
  catChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    gap: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  catChipSelected: {
    backgroundColor: KumbhColors.secondary,
    borderColor: KumbhColors.secondaryDark,
  },
  catChipText: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    color: KumbhColors.templeBrown,
  },
  catChipTextSelected: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
  },
  productList: {
    padding: 16,
    gap: 10,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeBrown,
  },
  emptySub: {
    fontSize: 11,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_400Regular',
    marginTop: 2,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#F1F5F9',
  },
  productContent: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  customBadge: {
    backgroundColor: KumbhColors.primarySoft,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  customBadgeText: {
    fontSize: 10,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.primaryDark,
  },
  ratingPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF9C3',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 6,
    gap: 4,
  },
  ratingNum: {
    fontSize: 11,
    fontFamily: 'Poppins_700Bold',
    color: '#854D0E',
  },
  reviewCountText: {
    fontSize: 10,
    color: '#A16207',
    fontFamily: 'Poppins_400Regular',
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeDark,
  },
  shopName: {
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.primaryDark,
    marginTop: 1,
  },
  shopLocation: {
    fontSize: 10.5,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_400Regular',
    marginBottom: 4,
  },
  productDesc: {
    fontSize: 11.5,
    color: KumbhColors.textSecondary,
    fontFamily: 'Poppins_400Regular',
    lineHeight: 16,
    marginBottom: 6,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 8,
  },
  tagPill: {
    backgroundColor: '#F8FAFC',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tagText: {
    fontSize: 10,
    color: KumbhColors.textSecondary,
    fontFamily: 'Poppins_500Medium',
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  priceContainer: {
    flexDirection: 'column',
  },
  priceCurrency: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.success,
  },
  priceUnit: {
    fontSize: 10,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_400Regular',
  },
  actionButtonsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rateBtn: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E2E8F0',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  rateBtnText: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.textSecondary,
  },
  waBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16A34A',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 6,
    gap: 4,
  },
  waBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
  },
  callBtn: {
    backgroundColor: KumbhColors.riverBlue,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeDark,
  },
  modalShopInfo: {
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  modalShopName: {
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.primaryDark,
  },
  modalProductName: {
    fontSize: 11,
    color: KumbhColors.textSecondary,
    fontFamily: 'Poppins_400Regular',
  },
  starRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 4,
  },
  starTouch: {
    padding: 2,
  },
  starRatingDisplay: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.secondaryDark,
    marginBottom: 8,
  },
  commentInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 8,
    fontSize: 12,
    color: KumbhColors.charcoal,
    fontFamily: 'Poppins_400Regular',
    textAlignVertical: 'top',
    marginBottom: 10,
  },
  submitReviewBtn: {
    backgroundColor: KumbhColors.primary,
    borderRadius: 6,
    paddingVertical: 9,
    alignItems: 'center',
  },
  submitReviewText: {
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
    fontSize: 12,
  },
  feedbackSuccess: {
    alignItems: 'center',
    paddingVertical: 12,
    gap: 6,
  },
  successTitle: {
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.success,
    textAlign: 'center',
  },
});

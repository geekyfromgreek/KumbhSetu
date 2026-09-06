import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BazaarColors } from '@/constants/colors';
import { useMerchant } from '@/context/MerchantContext';
import { CatalogItem } from '@/types/merchant';
import {
  pickImageFromGallery,
  takePhotoWithCamera,
  SAMPLE_ITEM_IMAGES,
} from '@/utils/imagePickerHelper';

export const CatalogManagementTab: React.FC = () => {
  const {
    catalogItems,
    addCatalogItem,
    updateCatalogItem,
    deleteCatalogItem,
    toggleItemAvailability,
  } = useMerchant();

  const [modalVisible, setModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState<CatalogItem | null>(null);

  // Modal Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Food & Meals');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('per plate');
  const [imageUrl, setImageUrl] = useState<string>(SAMPLE_ITEM_IMAGES[0].url);
  const [isVegetarian, setIsVegetarian] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const openAddModal = () => {
    setEditingItem(null);
    setName('');
    setCategory('Food & Meals');
    setDescription('');
    setPrice('');
    setUnit('per plate');
    setImageUrl(SAMPLE_ITEM_IMAGES[0].url);
    setIsVegetarian(true);
    setModalVisible(true);
  };

  const openEditModal = (item: CatalogItem) => {
    setEditingItem(item);
    setName(item.name);
    setCategory(item.category);
    setDescription(item.description);
    setPrice(item.price.toString());
    setUnit(item.unit);
    setImageUrl(item.imageUrl);
    setIsVegetarian(item.isVegetarian ?? true);
    setModalVisible(true);
  };

  const handlePickItemImage = async () => {
    const uri = await pickImageFromGallery();
    if (uri) setImageUrl(uri);
  };

  const handleCaptureItemPhoto = async () => {
    const uri = await takePhotoWithCamera();
    if (uri) setImageUrl(uri);
  };

  const handleSaveItem = async () => {
    if (!name.trim() || !price.trim()) {
      Alert.alert('Validation Error', 'Item Name and Price are required.');
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0) {
      Alert.alert('Validation Error', 'Please enter a valid price amount.');
      return;
    }

    if (editingItem) {
      await updateCatalogItem(editingItem.id, {
        name: name.trim(),
        category: category.trim(),
        description: description.trim(),
        price: priceNum,
        unit: unit.trim(),
        imageUrl: imageUrl || SAMPLE_ITEM_IMAGES[0].url,
        isVegetarian,
      });
    } else {
      await addCatalogItem({
        name: name.trim(),
        category: category.trim(),
        description: description.trim(),
        price: priceNum,
        unit: unit.trim(),
        imageUrl: imageUrl || SAMPLE_ITEM_IMAGES[0].url,
        isAvailable: true,
        isVegetarian,
      });
    }

    setModalVisible(false);
  };

  const handleDeletePrompt = (item: CatalogItem) => {
    Alert.alert(
      'Remove Item',
      `Are you sure you want to remove "${item.name}" from your stall catalog?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => deleteCatalogItem(item.id),
        },
      ]
    );
  };

  const filteredItems = catalogItems.filter((it) =>
    it.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    it.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Top Search & Action Bar */}
      <View style={styles.topActionBar}>
        <View style={styles.searchBox}>
          <Ionicons name="search" size={16} color={BazaarColors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search your items or dishes..."
            placeholderTextColor={BazaarColors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={16} color={BazaarColors.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity style={styles.addItemBtn} onPress={openAddModal} activeOpacity={0.85}>
          <Ionicons name="add" size={18} color={BazaarColors.white} />
          <Text style={styles.addItemBtnText}>Add Item</Text>
        </TouchableOpacity>
      </View>

      {/* Catalog Items List */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {filteredItems.length === 0 ? (
          <View style={styles.emptyStateCard}>
            <Ionicons name="fast-food-outline" size={44} color={BazaarColors.textMuted} />
            <Text style={styles.emptyTitle}>No Products / Dishes Listed</Text>
            <Text style={styles.emptyDesc}>
              {searchQuery
                ? 'No items match your search.'
                : 'Tap "+ Add Item" above to add the dishes, sweets, puja goods, or commodities you are selling to pilgrims.'}
            </Text>
            {!searchQuery && (
              <TouchableOpacity
                style={styles.emptyActionBtn}
                onPress={openAddModal}
                activeOpacity={0.85}
              >
                <Ionicons name="add-circle" size={18} color={BazaarColors.white} />
                <Text style={styles.emptyActionText}>Add Your First Item</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          filteredItems.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />

              <View style={styles.itemContent}>
                <View style={styles.itemHeaderRow}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemCategory}>{item.category}</Text>
                  </View>

                  <View style={styles.priceTag}>
                    <Text style={styles.priceAmount}>₹{item.price}</Text>
                    <Text style={styles.priceUnit}>{item.unit}</Text>
                  </View>
                </View>

                {item.description ? (
                  <Text style={styles.itemDesc} numberOfLines={2}>
                    {item.description}
                  </Text>
                ) : null}

                {/* Bottom Status & Controls */}
                <View style={styles.itemBottomRow}>
                  <TouchableOpacity
                    style={[
                      styles.stockToggleBtn,
                      item.isAvailable ? styles.inStock : styles.outOfStock,
                    ]}
                    onPress={() => toggleItemAvailability(item.id)}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name={item.isAvailable ? 'checkmark-circle' : 'close-circle'}
                      size={14}
                      color={item.isAvailable ? BazaarColors.success : BazaarColors.danger}
                    />
                    <Text
                      style={[
                        styles.stockToggleText,
                        { color: item.isAvailable ? BazaarColors.success : BazaarColors.danger },
                      ]}
                    >
                      {item.isAvailable ? 'Available' : 'Sold Out'}
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={styles.editBtn}
                      onPress={() => openEditModal(item)}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="create-outline" size={15} color={BazaarColors.saffronDark} />
                      <Text style={styles.editBtnText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.deleteBtn}
                      onPress={() => handleDeletePrompt(item)}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="trash-outline" size={15} color={BazaarColors.danger} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Add / Edit Item Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingItem ? 'Edit Product / Dish' : 'Add New Product / Dish'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={22} color={BazaarColors.textMuted} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 440 }} showsVerticalScrollIndicator={false}>
              <Text style={styles.modalLabel}>
                Item / Dish Name <Text style={styles.reqStar}>*</Text>
              </Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. Special Nashik Misal Pav"
                placeholderTextColor={BazaarColors.textMuted}
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.modalLabel}>Category / Section</Text>
              <View style={styles.quickCatRow}>
                {[
                  'Food & Meals',
                  'Tea & Snacks',
                  'Sweets & Chivda',
                  'Puja Samagri',
                  'Fresh Fruits',
                  'Other',
                ].map((c) => (
                  <TouchableOpacity
                    key={c}
                    style={[styles.quickCatChip, category === c && styles.quickCatChipActive]}
                    onPress={() => setCategory(c)}
                  >
                    <Text
                      style={[
                        styles.quickCatText,
                        category === c && styles.quickCatTextActive,
                      ]}
                    >
                      {c}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.rowTwoCols}>
                <View style={{ flex: 1, marginRight: 6 }}>
                  <Text style={styles.modalLabel}>
                    Price (₹) <Text style={styles.reqStar}>*</Text>
                  </Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="e.g. 50"
                    placeholderTextColor={BazaarColors.textMuted}
                    keyboardType="numeric"
                    value={price}
                    onChangeText={setPrice}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: 6 }}>
                  <Text style={styles.modalLabel}>Unit / Portion</Text>
                  <TextInput
                    style={styles.modalInput}
                    placeholder="e.g. per plate, per kg"
                    placeholderTextColor={BazaarColors.textMuted}
                    value={unit}
                    onChangeText={setUnit}
                  />
                </View>
              </View>

              <Text style={styles.modalLabel}>Item Description</Text>
              <TextInput
                style={[styles.modalInput, { height: 60 }]}
                placeholder="e.g. Served hot with 2 pavs, tari, farsan, chopped onions and lemon."
                placeholderTextColor={BazaarColors.textMuted}
                multiline
                value={description}
                onChangeText={setDescription}
              />

              {/* Item Photo Upload */}
              <Text style={styles.modalLabel}>Product Photo</Text>
              <View style={styles.modalImagePreviewBox}>
                <Image source={{ uri: imageUrl }} style={styles.modalImagePreview} />
                <View style={styles.modalImageActions}>
                  <TouchableOpacity
                    style={styles.imgActionBtn}
                    onPress={handlePickItemImage}
                  >
                    <Ionicons name="images" size={14} color={BazaarColors.saffron} />
                    <Text style={styles.imgActionText}>Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.imgActionBtn}
                    onPress={handleCaptureItemPhoto}
                  >
                    <Ionicons name="camera" size={14} color={BazaarColors.saffron} />
                    <Text style={styles.imgActionText}>Camera</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Sample Photo Pick */}
              <Text style={[styles.modalLabel, { marginTop: 6 }]}>Or select sample photo:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
                {SAMPLE_ITEM_IMAGES.map((sample) => (
                  <TouchableOpacity
                    key={sample.id}
                    onPress={() => setImageUrl(sample.url)}
                    style={[
                      styles.sampleItemThumb,
                      imageUrl === sample.url && styles.sampleItemThumbActive,
                    ]}
                  >
                    <Image source={{ uri: sample.url }} style={styles.sampleItemImage} />
                    <Text style={styles.sampleItemText} numberOfLines={1}>
                      {sample.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveItem}>
                <Text style={styles.saveBtnText}>
                  {editingItem ? 'Save Changes' : 'Add to Catalog'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BazaarColors.background,
  },
  topActionBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    gap: 8,
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BazaarColors.cardBackground,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
    gap: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 12.5,
    fontFamily: 'Poppins_400Regular',
    color: BazaarColors.textPrimary,
  },
  addItemBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BazaarColors.saffron,
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 8,
    gap: 4,
  },
  addItemBtnText: {
    color: BazaarColors.white,
    fontSize: 12.5,
    fontFamily: 'Poppins_700Bold',
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 10,
    paddingBottom: 28,
  },
  emptyStateCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 20,
    backgroundColor: BazaarColors.cardBackground,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
  },
  emptyTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: BazaarColors.templeBrown,
    marginTop: 10,
  },
  emptyDesc: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: BazaarColors.textMuted,
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
  },
  emptyActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BazaarColors.saffron,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 6,
    marginTop: 16,
  },
  emptyActionText: {
    color: BazaarColors.white,
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: BazaarColors.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
    overflow: 'hidden',
    padding: 10,
    gap: 10,
  },
  itemImage: {
    width: 84,
    height: 84,
    borderRadius: 8,
    backgroundColor: BazaarColors.surfaceHover,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemName: {
    fontSize: 13.5,
    fontFamily: 'Poppins_700Bold',
    color: BazaarColors.templeBrown,
  },
  itemCategory: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: BazaarColors.textMuted,
    marginTop: 1,
  },
  priceTag: {
    alignItems: 'flex-end',
  },
  priceAmount: {
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
    color: BazaarColors.success,
  },
  priceUnit: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: BazaarColors.textMuted,
  },
  itemDesc: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: BazaarColors.textSecondary,
    marginVertical: 4,
    lineHeight: 15,
  },
  itemBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: BazaarColors.surfaceHover,
  },
  stockToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 4,
    borderWidth: 1,
    gap: 4,
  },
  inStock: {
    backgroundColor: BazaarColors.successSoft,
    borderColor: BazaarColors.successBorder,
  },
  outOfStock: {
    backgroundColor: BazaarColors.dangerSoft,
    borderColor: BazaarColors.dangerBorder,
  },
  stockToggleText: {
    fontSize: 10.5,
    fontFamily: 'Poppins_600SemiBold',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BazaarColors.surfaceHover,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
    gap: 4,
  },
  editBtnText: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: BazaarColors.saffronDark,
  },
  deleteBtn: {
    padding: 5,
    borderRadius: 6,
    backgroundColor: BazaarColors.dangerSoft,
    borderWidth: 1,
    borderColor: BazaarColors.dangerBorder,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: BazaarColors.cardBackground,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: BazaarColors.cardBorder,
  },
  modalTitle: {
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
    color: BazaarColors.templeBrown,
  },
  modalLabel: {
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
    color: BazaarColors.textPrimary,
    marginTop: 8,
    marginBottom: 4,
  },
  reqStar: {
    color: BazaarColors.danger,
  },
  modalInput: {
    backgroundColor: BazaarColors.surfaceHover,
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 12.5,
    fontFamily: 'Poppins_400Regular',
    color: BazaarColors.textPrimary,
  },
  quickCatRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  quickCatChip: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    backgroundColor: BazaarColors.surfaceHover,
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
  },
  quickCatChipActive: {
    backgroundColor: BazaarColors.saffronSoft,
    borderColor: BazaarColors.saffron,
  },
  quickCatText: {
    fontSize: 10.5,
    fontFamily: 'Poppins_500Medium',
    color: BazaarColors.textSecondary,
  },
  quickCatTextActive: {
    color: BazaarColors.saffronDark,
    fontFamily: 'Poppins_700Bold',
  },
  rowTwoCols: {
    flexDirection: 'row',
  },
  modalImagePreviewBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 4,
  },
  modalImagePreview: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: BazaarColors.surfaceHover,
  },
  modalImageActions: {
    flexDirection: 'row',
    gap: 6,
  },
  imgActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BazaarColors.saffronSoft,
    borderWidth: 1,
    borderColor: BazaarColors.saffronBorder,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
    gap: 4,
  },
  imgActionText: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: BazaarColors.saffronDark,
  },
  sampleItemThumb: {
    width: 72,
    marginRight: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
    overflow: 'hidden',
    backgroundColor: BazaarColors.surfaceHover,
  },
  sampleItemThumbActive: {
    borderColor: BazaarColors.saffron,
    borderWidth: 2,
  },
  sampleItemImage: {
    width: '100%',
    height: 48,
  },
  sampleItemText: {
    fontSize: 9,
    fontFamily: 'Poppins_500Medium',
    color: BazaarColors.textSecondary,
    padding: 2,
    textAlign: 'center',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: BazaarColors.cardBorder,
  },
  cancelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  cancelBtnText: {
    fontSize: 12.5,
    fontFamily: 'Poppins_600SemiBold',
    color: BazaarColors.textMuted,
  },
  saveBtn: {
    backgroundColor: BazaarColors.saffron,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  saveBtnText: {
    fontSize: 12.5,
    fontFamily: 'Poppins_700Bold',
    color: BazaarColors.white,
  },
});

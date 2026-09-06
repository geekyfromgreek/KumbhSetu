import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Linking,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BazaarColors } from '@/constants/colors';
import { useMerchant } from '@/context/MerchantContext';
import { PilgrimInquiry } from '@/types/merchant';

export const InquiryDeskTab: React.FC = () => {
  const { inquiries, addInquiry, markInquiryAsRead, profile } = useMerchant();

  const [modalVisible, setModalVisible] = useState(false);
  const [pilgrimName, setPilgrimName] = useState('');
  const [pilgrimPhone, setPilgrimPhone] = useState('');
  const [itemName, setItemName] = useState('');
  const [message, setMessage] = useState('');

  const handleCallPilgrim = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleWhatsAppPilgrim = (phone: string, name: string) => {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Pranam ${name}! This is ${profile?.businessName || 'the merchant'}. How may we assist you with your Kumbh Mela order?`
    );
    Linking.openURL(`https://wa.me/${cleanPhone}?text=${text}`);
  };

  const handleSaveInquiry = async () => {
    if (!pilgrimName.trim() || !pilgrimPhone.trim() || !message.trim()) {
      Alert.alert('Validation Error', 'Pilgrim Name, Phone, and Message are required.');
      return;
    }

    await addInquiry({
      pilgrimName: pilgrimName.trim(),
      pilgrimPhone: pilgrimPhone.trim(),
      itemName: itemName.trim() || undefined,
      message: message.trim(),
    });

    setModalVisible(false);
    setPilgrimName('');
    setPilgrimPhone('');
    setItemName('');
    setMessage('');
  };

  return (
    <View style={styles.container}>
      {/* Top Action Bar */}
      <View style={styles.topBar}>
        <View style={{ flex: 1 }}>
          <Text style={styles.topTitle}>Pilgrim Inquiries & Orders</Text>
          <Text style={styles.topSub}>Direct messages received from KumbhSetu pilgrims</Text>
        </View>

        <TouchableOpacity
          style={styles.logInquiryBtn}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={16} color={BazaarColors.white} />
          <Text style={styles.logInquiryBtnText}>Log Inquiry</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {inquiries.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="chatbubbles-outline" size={44} color={BazaarColors.textMuted} />
            <Text style={styles.emptyTitle}>No Inquiries Received Yet</Text>
            <Text style={styles.emptyDesc}>
              When pilgrims browse your stall on KumbhSetu and request info, order items, or call for directions, their contact details will appear here.
            </Text>
          </View>
        ) : (
          inquiries.map((inq: PilgrimInquiry) => (
            <View key={inq.id} style={[styles.inquiryCard, !inq.isRead && styles.unreadCard]}>
              <View style={styles.inquiryHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.pilgrimNameText}>{inq.pilgrimName}</Text>
                  <Text style={styles.inqTime}>{inq.timestamp}</Text>
                </View>

                {!inq.isRead && (
                  <TouchableOpacity
                    style={styles.markReadPill}
                    onPress={() => markInquiryAsRead(inq.id)}
                  >
                    <Text style={styles.markReadText}>Mark Read</Text>
                  </TouchableOpacity>
                )}
              </View>

              {inq.itemName ? (
                <View style={styles.itemBadge}>
                  <Text style={styles.itemBadgeText}>Item: {inq.itemName}</Text>
                </View>
              ) : null}

              <Text style={styles.messageBody}>{inq.message}</Text>

              {/* Action Buttons */}
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.callBtn}
                  onPress={() => handleCallPilgrim(inq.pilgrimPhone)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="call" size={13} color={BazaarColors.white} />
                  <Text style={styles.callBtnText}>Call ({inq.pilgrimPhone})</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.waBtn}
                  onPress={() => handleWhatsAppPilgrim(inq.pilgrimPhone, inq.pilgrimName)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="logo-whatsapp" size={13} color={BazaarColors.white} />
                  <Text style={styles.waBtnText}>WhatsApp Reply</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Manual Inquiry Log Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Log Pilgrim Inquiry / Order</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={22} color={BazaarColors.textMuted} />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 400 }} showsVerticalScrollIndicator={false}>
              <Text style={styles.modalLabel}>Pilgrim Name *</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. Smt. Sunita Devi"
                placeholderTextColor={BazaarColors.textMuted}
                value={pilgrimName}
                onChangeText={setPilgrimName}
              />

              <Text style={styles.modalLabel}>Pilgrim Phone Number *</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. 9822334455"
                placeholderTextColor={BazaarColors.textMuted}
                keyboardType="phone-pad"
                value={pilgrimPhone}
                onChangeText={(txt) => setPilgrimPhone(txt.replace(/[^0-9]/g, ''))}
              />

              <Text style={styles.modalLabel}>Item Inquired (Optional)</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="e.g. 5kg Laxminarayan Chivda parcel"
                placeholderTextColor={BazaarColors.textMuted}
                value={itemName}
                onChangeText={setItemName}
              />

              <Text style={styles.modalLabel}>Notes / Message *</Text>
              <TextInput
                style={[styles.modalInput, { height: 70 }]}
                placeholder="e.g. Inquired about parcel packing and delivery to Tapovan camp."
                placeholderTextColor={BazaarColors.textMuted}
                multiline
                value={message}
                onChangeText={setMessage}
              />
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveInquiry}>
                <Text style={styles.saveBtnText}>Log Record</Text>
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
  },
  topTitle: {
    fontSize: 15,
    fontFamily: 'Poppins_700Bold',
    color: BazaarColors.templeBrown,
  },
  topSub: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: BazaarColors.textMuted,
  },
  logInquiryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BazaarColors.saffron,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    gap: 4,
  },
  logInquiryBtnText: {
    color: BazaarColors.white,
    fontSize: 12,
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
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 20,
    backgroundColor: BazaarColors.cardBackground,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
  },
  emptyTitle: {
    fontSize: 15,
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
  inquiryCard: {
    backgroundColor: BazaarColors.cardBackground,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
  },
  unreadCard: {
    borderLeftWidth: 3,
    borderLeftColor: BazaarColors.saffron,
  },
  inquiryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  pilgrimNameText: {
    fontSize: 13.5,
    fontFamily: 'Poppins_700Bold',
    color: BazaarColors.templeBrown,
  },
  inqTime: {
    fontSize: 10.5,
    fontFamily: 'Poppins_400Regular',
    color: BazaarColors.textMuted,
    marginTop: 1,
  },
  markReadPill: {
    backgroundColor: BazaarColors.surfaceHover,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  markReadText: {
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
    color: BazaarColors.saffronDark,
  },
  itemBadge: {
    backgroundColor: BazaarColors.saffronSoft,
    alignSelf: 'flex-start',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginTop: 4,
  },
  itemBadgeText: {
    fontSize: 10.5,
    fontFamily: 'Poppins_600SemiBold',
    color: BazaarColors.saffronDark,
  },
  messageBody: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: BazaarColors.textSecondary,
    marginVertical: 6,
    lineHeight: 16,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: BazaarColors.surfaceHover,
  },
  callBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BazaarColors.riverBlue,
    paddingVertical: 7,
    borderRadius: 6,
    gap: 4,
  },
  callBtnText: {
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
    color: BazaarColors.white,
  },
  waBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16A34A',
    paddingVertical: 7,
    borderRadius: 6,
    gap: 4,
  },
  waBtnText: {
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
    color: BazaarColors.white,
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
    marginBottom: 10,
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
  modalInput: {
    backgroundColor: BazaarColors.surfaceHover,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: BazaarColors.cardBorder,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 12.5,
    fontFamily: 'Poppins_400Regular',
    color: BazaarColors.textPrimary,
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

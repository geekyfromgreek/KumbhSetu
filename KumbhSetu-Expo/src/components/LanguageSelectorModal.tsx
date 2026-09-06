import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useApp } from '@/context/AppContext';
import { SUPPORTED_LANGUAGES, LanguageMeta } from '@/constants/languages';
import { KumbhColors } from '@/constants/colors';

export const LanguageSelectorModal: React.FC = () => {
  const { isLangModalOpen, setIsLangModalOpen, language, setLanguage, t } = useApp();

  const handleSelect = (langCode: string) => {
    setLanguage(langCode);
    setIsLangModalOpen(false);
  };

  return (
    <Modal
      visible={isLangModalOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsLangModalOpen(false)}>
      <View style={styles.modalOverlay}>
        <Pressable
          style={styles.backdrop}
          onPress={() => setIsLangModalOpen(false)}
        />
        
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <View style={styles.iconCircle}>
                <Ionicons name="language" size={22} color={KumbhColors.primary} />
              </View>
              <View>
                <Text style={styles.modalTitle}>{t.selectLanguage}</Text>
                <Text style={styles.modalSub}>Select your preferred app language</Text>
              </View>
            </View>
            
            <TouchableOpacity
              onPress={() => setIsLangModalOpen(false)}
              style={styles.closeBtn}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons name="close" size={22} color={KumbhColors.templeBrown} />
            </TouchableOpacity>
          </View>

          {/* Language Cards Grid */}
          <ScrollView
            contentContainerStyle={styles.langGrid}
            showsVerticalScrollIndicator={false}>
            {SUPPORTED_LANGUAGES.map((lang: LanguageMeta) => {
              const isSelected = language === lang.code;
              return (
                <TouchableOpacity
                  key={lang.code}
                  onPress={() => handleSelect(lang.code)}
                  activeOpacity={0.8}
                  style={[
                    styles.langCard,
                    isSelected && styles.langCardSelected,
                  ]}>
                  <View style={styles.cardTopRow}>
                    <View style={[styles.shortCodePill, isSelected && styles.shortCodePillSelected]}>
                      <Text style={[styles.shortCodeText, isSelected && styles.shortCodeTextSelected]}>
                        {lang.shortCode}
                      </Text>
                    </View>
                    {isSelected && (
                      <View style={styles.checkBadge}>
                        <MaterialIcons name="check" size={14} color="#FFFFFF" />
                      </View>
                    )}
                  </View>

                  <Text
                    style={[
                      styles.nativeName,
                      isSelected && styles.nativeNameSelected,
                    ]}>
                    {lang.nativeName}
                  </Text>
                  
                  <Text style={styles.englishName}>
                    {lang.name} • {lang.region}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Bottom helper */}
          <View style={styles.footerNote}>
            <Ionicons name="information-circle-outline" size={16} color={KumbhColors.secondaryDark} />
            <Text style={styles.footerText}>
              Language can be changed anytime from the header.
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: KumbhColors.overlay,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  modalContent: {
    backgroundColor: KumbhColors.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 28,
    maxHeight: '85%',
    borderTopWidth: 1,
    borderTopColor: KumbhColors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: KumbhColors.border,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: KumbhColors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.textPrimary,
  },
  modalSub: {
    fontSize: 11,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_400Regular',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: KumbhColors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: KumbhColors.border,
  },
  langGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    paddingVertical: 14,
    justifyContent: 'space-between',
  },
  langCard: {
    width: '48%',
    backgroundColor: KumbhColors.cardBackground,
    borderWidth: 1,
    borderColor: KumbhColors.border,
    borderRadius: 8,
    padding: 10,
    minHeight: 90,
    justifyContent: 'space-between',
  },
  langCardSelected: {
    borderColor: KumbhColors.primary,
    backgroundColor: KumbhColors.primarySoft,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  shortCodePill: {
    backgroundColor: KumbhColors.inputBackground,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  shortCodePillSelected: {
    backgroundColor: KumbhColors.primary,
  },
  shortCodeText: {
    fontSize: 10,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.textSecondary,
  },
  shortCodeTextSelected: {
    color: '#FFFFFF',
  },
  checkBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: KumbhColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nativeName: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: KumbhColors.textPrimary,
    marginTop: 2,
  },
  nativeNameSelected: {
    color: KumbhColors.primaryDark,
  },
  englishName: {
    fontSize: 11,
    color: KumbhColors.textMuted,
    fontFamily: 'Poppins_400Regular',
  },
  footerNote: {
    flexDirection: 'row',
    backgroundColor: KumbhColors.secondarySoft,
    borderRadius: 6,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: KumbhColors.secondaryLight,
    gap: 6,
  },
  footerText: {
    fontSize: 11,
    color: KumbhColors.secondaryDark,
    fontFamily: 'Poppins_500Medium',
  },
});

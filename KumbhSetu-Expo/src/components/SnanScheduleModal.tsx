import React from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { KumbhColors } from '@/constants/colors';
import { useApp } from '@/context/AppContext';
import { SnanMuhurat } from '@/data/snanData';

interface SnanScheduleModalProps {
  visible: boolean;
  onClose: () => void;
}

export const SnanScheduleModal: React.FC<SnanScheduleModalProps> = ({ visible, onClose }) => {
  const { snanMuhurats, language, setIsMapModalOpen } = useApp();

  const getLocalizedTitle = (item: SnanMuhurat) => {
    if (language === 'hi' && item.titleHi) return item.titleHi;
    if (language === 'mr' && item.titleMr) return item.titleMr;
    return item.title;
  };

  const handleOpenMap = () => {
    onClose();
    setTimeout(() => {
      setIsMapModalOpen(true);
    }, 200);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.headerLeft}>
              <View style={styles.headerIconCircle}>
                <MaterialCommunityIcons name="water" size={22} color={KumbhColors.primary} />
              </View>
              <View>
                <Text style={styles.modalTitle}>
                  {language === 'hi'
                    ? 'शाही स्नान एवं मुहूर्त समय'
                    : language === 'mr'
                    ? 'शाही स्नान व मुहूर्त वेळा'
                    : 'Shahi Snan & Muhurat Schedule'}
                </Text>
                <Text style={styles.modalSub}>
                  {language === 'hi'
                    ? 'नासिक–त्र्यंबकेश्वर महाकुंभ मेला 2026-27'
                    : language === 'mr'
                    ? 'नाशिक–त्र्यंबकेश्वर महाकुंभ मेळा 2026-27'
                    : 'Nashik–Trimbakeshwar Maha Kumbh Mela'}
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Ionicons name="close" size={20} color={KumbhColors.templeDark} />
            </TouchableOpacity>
          </View>

          {/* Schedule List */}
          <ScrollView style={styles.scrollList} showsVerticalScrollIndicator={false}>
            <View style={styles.holyNoticeBox}>
              <Ionicons name="information-circle" size={16} color={KumbhColors.riverBlueDark} />
              <Text style={styles.holyNoticeText}>
                {language === 'hi'
                  ? 'अखाड़ा साधु-संतों के शाही स्नान उपरांत सभी श्रद्धालु घाटों पर पवित्र स्नान कर सकते हैं।'
                  : language === 'mr'
                  ? 'आखाडा साधू-महंतांच्या शाही स्नानानंतर सर्व भाविक घाटांवर पवित्र स्नान करू शकतात.'
                  : 'Official holy dip timings approved by District Administration & Akhada Parishad.'}
              </Text>
            </View>

            {snanMuhurats.map((item, index) => {
              const localizedTitle = getLocalizedTitle(item);

              return (
                <View key={item.id || index} style={styles.snanCard}>
                  {/* Card Header */}
                  <View style={styles.snanCardHeader}>
                    <View style={styles.badgeRow}>
                      {item.isMajor && (
                        <View style={styles.royalBadge}>
                          <FontAwesome5 name="crown" size={9} color="#B45309" />
                          <Text style={styles.royalBadgeText}>
                            {language === 'hi' ? 'शाही स्नान' : language === 'mr' ? 'शाही स्नान' : 'SHAHI SNAN'}
                          </Text>
                        </View>
                      )}

                      <View
                        style={[
                          styles.crowdBadge,
                          item.crowdLevel === 'Extreme'
                            ? { backgroundColor: '#FEE2E2', borderColor: '#FECACA' }
                            : item.crowdLevel === 'High'
                            ? { backgroundColor: '#FEF3C7', borderColor: '#FDE68A' }
                            : { backgroundColor: '#D1FAE5', borderColor: '#A7F3D0' },
                        ]}
                      >
                        <Text
                          style={[
                            styles.crowdBadgeText,
                            item.crowdLevel === 'Extreme'
                              ? { color: '#B91C1C' }
                              : item.crowdLevel === 'High'
                              ? { color: '#B45309' }
                              : { color: '#047857' },
                          ]}
                        >
                          {item.crowdLevel} {language === 'hi' ? 'भीड़' : language === 'mr' ? 'गर्दी' : 'Crowd'}
                        </Text>
                      </View>
                    </View>

                    <Text style={styles.snanTitle}>{localizedTitle}</Text>
                  </View>

                  {/* Date & Muhurat Time Row */}
                  <View style={styles.timingBox}>
                    <View style={styles.timingItem}>
                      <Ionicons name="calendar" size={14} color={KumbhColors.primary} />
                      <Text style={styles.dateText}>{item.snanDate}</Text>
                    </View>

                    <View style={styles.timingItem}>
                      <Ionicons name="time" size={14} color={KumbhColors.riverBlueDark} />
                      <Text style={styles.muhuratText}>{item.muhuratTime}</Text>
                    </View>
                  </View>

                  {/* Ghat Locations */}
                  <View style={styles.ghatRow}>
                    <Ionicons name="location" size={14} color={KumbhColors.secondaryDark} />
                    <Text style={styles.ghatText}>{item.ghatLocation}</Text>
                  </View>

                  {/* Importance */}
                  {item.importance ? (
                    <Text style={styles.importanceText}>{item.importance}</Text>
                  ) : null}
                </View>
              );
            })}

            {/* Ghat Map Action */}
            <TouchableOpacity style={styles.mapActionBtn} onPress={handleOpenMap} activeOpacity={0.85}>
              <Ionicons name="map" size={16} color="#FFFFFF" />
              <Text style={styles.mapActionText}>
                {language === 'hi'
                  ? 'पवित्र घाटों का नक्शा एवं रास्ता देखें'
                  : language === 'mr'
                  ? 'पवित्र घाटांचा नकाशा व मार्ग पहा'
                  : 'View Holy Ghats & Navigation Map'}
              </Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>

            <View style={{ height: 24 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: KumbhColors.cardBackground,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    maxHeight: '88%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeDark,
  },
  modalSub: {
    fontSize: 10.5,
    fontFamily: 'Poppins_400Regular',
    color: KumbhColors.textMuted,
  },
  closeBtn: {
    padding: 6,
  },
  scrollList: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  holyNoticeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  holyNoticeText: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: KumbhColors.riverBlueDark,
    flex: 1,
    lineHeight: 15,
  },
  snanCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  snanCardHeader: {
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  royalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  royalBadgeText: {
    fontSize: 9.5,
    fontFamily: 'Poppins_700Bold',
    color: '#B45309',
  },
  crowdBadge: {
    borderWidth: 1,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
  },
  crowdBadgeText: {
    fontSize: 9.5,
    fontFamily: 'Poppins_600SemiBold',
  },
  snanTitle: {
    fontSize: 13.5,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.templeDark,
  },
  timingBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 8,
    gap: 4,
    marginBottom: 6,
  },
  timingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
    color: KumbhColors.primary,
  },
  muhuratText: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    color: KumbhColors.templeDark,
    flex: 1,
  },
  ghatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  ghatText: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    color: KumbhColors.textSecondary,
    flex: 1,
  },
  importanceText: {
    fontSize: 10.5,
    fontFamily: 'Poppins_400Regular',
    color: KumbhColors.textMuted,
    lineHeight: 14,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 6,
    marginTop: 2,
  },
  mapActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: KumbhColors.primaryDark,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginTop: 6,
    marginBottom: 10,
  },
  mapActionText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontFamily: 'Poppins_600SemiBold',
  },
});

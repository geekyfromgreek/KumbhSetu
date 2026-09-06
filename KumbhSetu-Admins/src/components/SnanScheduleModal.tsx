import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { AdminColors } from '@/constants/colors';
import { useAdmin } from '@/context/AdminContext';
import { AdminSnanMuhurat } from '@/types/admin';

interface SnanScheduleModalProps {
  visible: boolean;
  onClose: () => void;
}

export const SnanScheduleModal: React.FC<SnanScheduleModalProps> = ({ visible, onClose }) => {
  const { snanMuhurats, addSnanMuhurat, updateSnanMuhurat, deleteSnanMuhurat } = useAdmin();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<AdminSnanMuhurat | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [titleHi, setTitleHi] = useState('');
  const [snanDate, setSnanDate] = useState('');
  const [muhuratTime, setMuhuratTime] = useState('');
  const [ghatLocation, setGhatLocation] = useState('');
  const [importance, setImportance] = useState('');
  const [crowdLevel, setCrowdLevel] = useState<'Moderate' | 'High' | 'Extreme'>('Extreme');
  const [isMajor, setIsMajor] = useState<boolean>(true);
  const [orderNum, setOrderNum] = useState<string>('1');

  const openAddForm = () => {
    setEditingItem(null);
    setTitle('');
    setTitleHi('');
    setSnanDate('');
    setMuhuratTime('04:00 AM – 09:00 AM (Brahma Muhurat)');
    setGhatLocation('Ramkund (Nashik) & Kushavarta (Trimbakeshwar)');
    setImportance('Royal Holy Dip by Akhadas and Devotees');
    setCrowdLevel('Extreme');
    setIsMajor(true);
    setOrderNum(String(snanMuhurats.length + 1));
    setIsEditing(true);
  };

  const openEditForm = (item: AdminSnanMuhurat) => {
    setEditingItem(item);
    setTitle(item.title);
    setTitleHi(item.titleHi || '');
    setSnanDate(item.snanDate);
    setMuhuratTime(item.muhuratTime);
    setGhatLocation(item.ghatLocation);
    setImportance(item.importance);
    setCrowdLevel(item.crowdLevel);
    setIsMajor(item.isMajor);
    setOrderNum(String(item.orderNum));
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!title.trim() || !snanDate.trim() || !muhuratTime.trim()) {
      Alert.alert('Incomplete Fields', 'Please enter Title, Date, and Muhurat Auspicious Timing.');
      return;
    }

    try {
      if (editingItem) {
        await updateSnanMuhurat({
          ...editingItem,
          title: title.trim(),
          titleHi: titleHi.trim() || title.trim(),
          titleMr: titleHi.trim() || title.trim(),
          snanDate: snanDate.trim(),
          muhuratTime: muhuratTime.trim(),
          ghatLocation: ghatLocation.trim() || 'Ramkund & Kushavarta',
          importance: importance.trim() || 'Auspicious Holy Snan',
          crowdLevel,
          isMajor,
          orderNum: parseInt(orderNum, 10) || editingItem.orderNum,
        });
        Alert.alert('Updated', 'Snan Muhurat schedule updated and published to Yatris.');
      } else {
        await addSnanMuhurat({
          title: title.trim(),
          titleHi: titleHi.trim() || title.trim(),
          titleMr: titleHi.trim() || title.trim(),
          snanDate: snanDate.trim(),
          muhuratTime: muhuratTime.trim(),
          ghatLocation: ghatLocation.trim() || 'Ramkund & Kushavarta',
          importance: importance.trim() || 'Auspicious Holy Snan',
          crowdLevel,
          isMajor,
          orderNum: parseInt(orderNum, 10) || snanMuhurats.length + 1,
        });
        Alert.alert('Added', 'New Snan Muhurat date added and published to Yatris.');
      }
      setIsEditing(false);
    } catch (e) {
      Alert.alert('Error', 'Failed to save Snan Muhurat.');
    }
  };

  const handleDelete = (item: AdminSnanMuhurat) => {
    if (Platform.OS === 'web') {
      if (window.confirm(`Delete "${item.title}" from official schedule?`)) {
        deleteSnanMuhurat(item.id);
      }
    } else {
      Alert.alert(
        'Confirm Deletion',
        `Are you sure you want to remove "${item.title}"?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => deleteSnanMuhurat(item.id),
          },
        ]
      );
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.headerTitleRow}>
              <View style={styles.headerIconCircle}>
                <MaterialCommunityIcons name="water" size={20} color={AdminColors.saffron} />
              </View>
              <View>
                <Text style={styles.modalTitle}>Shahi Snan & Muhurat Schedule</Text>
                <Text style={styles.modalSubtitle}>
                  Admin Gazette Controller • Live Synced with Yatri App
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Ionicons name="close" size={20} color={AdminColors.textPrimary} />
            </TouchableOpacity>
          </View>

          {isEditing ? (
            /* Edit / Add Form */
            <ScrollView style={styles.formScroll} showsVerticalScrollIndicator={false}>
              <Text style={styles.formHeading}>
                {editingItem ? 'Edit Snan Muhurat' : 'Add New Shahi Snan Date'}
              </Text>

              {/* Title EN */}
              <Text style={styles.inputLabel}>Title (English) *</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="e.g. 1st Shahi Snan (Makar Sankranti)"
                placeholderTextColor={AdminColors.textMuted}
              />

              {/* Title HI */}
              <Text style={styles.inputLabel}>Title (Hindi / Marathi)</Text>
              <TextInput
                style={styles.input}
                value={titleHi}
                onChangeText={setTitleHi}
                placeholder="e.g. प्रथम शाही स्नान (मकर संक्रांति)"
                placeholderTextColor={AdminColors.textMuted}
              />

              {/* Date */}
              <Text style={styles.inputLabel}>Date *</Text>
              <TextInput
                style={styles.input}
                value={snanDate}
                onChangeText={setSnanDate}
                placeholder="e.g. 14 January 2027"
                placeholderTextColor={AdminColors.textMuted}
              />

              {/* Muhurat Auspicious Timing */}
              <Text style={styles.inputLabel}>Auspicious Muhurat Window *</Text>
              <TextInput
                style={styles.input}
                value={muhuratTime}
                onChangeText={setMuhuratTime}
                placeholder="e.g. 04:15 AM – 08:30 AM (Brahma Muhurat)"
                placeholderTextColor={AdminColors.textMuted}
              />

              {/* Ghat Locations */}
              <Text style={styles.inputLabel}>Designated Ghat Locations</Text>
              <TextInput
                style={styles.input}
                value={ghatLocation}
                onChangeText={setGhatLocation}
                placeholder="e.g. Ramkund (Nashik) & Kushavarta (Trimbakeshwar)"
                placeholderTextColor={AdminColors.textMuted}
              />

              {/* Significance / Importance */}
              <Text style={styles.inputLabel}>Significance / Advisory Note</Text>
              <TextInput
                style={[styles.input, { height: 60 }]}
                value={importance}
                onChangeText={setImportance}
                placeholder="e.g. Royal Holy Dip by Akhadas followed by Yatris."
                placeholderTextColor={AdminColors.textMuted}
                multiline
              />

              {/* Crowd Advisory Pill Selector */}
              <Text style={styles.inputLabel}>Expected Crowd Level</Text>
              <View style={styles.crowdSelectorRow}>
                {(['Moderate', 'High', 'Extreme'] as const).map((lvl) => (
                  <TouchableOpacity
                    key={lvl}
                    style={[
                      styles.crowdPill,
                      crowdLevel === lvl && styles.crowdPillActive,
                      lvl === 'Extreme' && crowdLevel === lvl && { backgroundColor: AdminColors.danger },
                      lvl === 'High' && crowdLevel === lvl && { backgroundColor: AdminColors.warning },
                      lvl === 'Moderate' && crowdLevel === lvl && { backgroundColor: AdminColors.emerald },
                    ]}
                    onPress={() => setCrowdLevel(lvl)}
                  >
                    <Text
                      style={[
                        styles.crowdPillText,
                        crowdLevel === lvl && { color: '#FFFFFF', fontWeight: 'bold' },
                      ]}
                    >
                      {lvl} Crowd
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Major Royal Snan Toggle */}
              <View style={styles.toggleRow}>
                <View>
                  <Text style={styles.toggleTitle}>Royal Shahi Snan (शाही स्नान)</Text>
                  <Text style={styles.toggleSub}>Highlights with gold crown badge for Yatris</Text>
                </View>
                <TouchableOpacity
                  style={[styles.toggleBtn, isMajor && styles.toggleBtnActive]}
                  onPress={() => setIsMajor(!isMajor)}
                >
                  <Text style={[styles.toggleBtnText, isMajor && { color: '#FFFFFF' }]}>
                    {isMajor ? 'YES' : 'NO'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Action Buttons */}
              <View style={styles.formActionRow}>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setIsEditing(false)}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                  <Text style={styles.saveBtnText}>
                    {editingItem ? 'Save & Broadcast' : 'Add to Schedule'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          ) : (
            /* List of Snan Dates */
            <ScrollView style={styles.listScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.listHeaderRow}>
                <Text style={styles.listCountText}>
                  {snanMuhurats.length} Auspicious Snan Dates Configured
                </Text>
                <TouchableOpacity style={styles.addDateBtn} onPress={openAddForm}>
                  <Ionicons name="add" size={16} color="#FFFFFF" />
                  <Text style={styles.addDateBtnText}>Add Snan Date</Text>
                </TouchableOpacity>
              </View>

              {snanMuhurats.map((item) => (
                <View key={item.id} style={styles.snanCard}>
                  <View style={styles.snanCardTop}>
                    <View style={styles.snanTitleBlock}>
                      <View style={styles.badgeRow}>
                        {item.isMajor && (
                          <View style={styles.royalBadge}>
                            <FontAwesome5 name="crown" size={10} color="#B45309" />
                            <Text style={styles.royalBadgeText}>SHAHI SNAN</Text>
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
                            {item.crowdLevel} Density
                          </Text>
                        </View>
                      </View>

                      <Text style={styles.snanTitle}>{item.title}</Text>
                      {item.titleHi && <Text style={styles.snanTitleHi}>{item.titleHi}</Text>}
                    </View>

                    <View style={styles.itemActionBtns}>
                      <TouchableOpacity
                        style={styles.editIconBtn}
                        onPress={() => openEditForm(item)}
                      >
                        <Ionicons name="pencil" size={14} color={AdminColors.saffron} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.deleteIconBtn}
                        onPress={() => handleDelete(item)}
                      >
                        <Ionicons name="trash-outline" size={14} color={AdminColors.danger} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.snanDetailsGrid}>
                    <View style={styles.detailItem}>
                      <Ionicons name="calendar-outline" size={13} color={AdminColors.saffron} />
                      <Text style={styles.detailBold}>{item.snanDate}</Text>
                    </View>

                    <View style={styles.detailItem}>
                      <Ionicons name="time-outline" size={13} color={AdminColors.riverBlue} />
                      <Text style={styles.detailText}>{item.muhuratTime}</Text>
                    </View>

                    <View style={styles.detailItem}>
                      <Ionicons name="location-outline" size={13} color={AdminColors.emerald} />
                      <Text style={styles.detailText}>{item.ghatLocation}</Text>
                    </View>
                  </View>

                  {item.importance ? (
                    <Text style={styles.importanceText}>{item.importance}</Text>
                  ) : null}
                </View>
              ))}
            </ScrollView>
          )}
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
    backgroundColor: AdminColors.cardBackground,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    maxHeight: '90%',
    paddingBottom: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: AdminColors.cardBorder,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: AdminColors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: AdminColors.textPrimary,
  },
  modalSubtitle: {
    fontSize: 10.5,
    fontFamily: 'Poppins_400Regular',
    color: AdminColors.textMuted,
  },
  closeBtn: {
    padding: 6,
  },
  listScroll: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  listHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  listCountText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: AdminColors.textPrimary,
  },
  addDateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: AdminColors.saffron,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  addDateBtnText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
  },
  snanCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  snanCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  snanTitleBlock: {
    flex: 1,
    paddingRight: 8,
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
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
    color: AdminColors.textPrimary,
  },
  snanTitleHi: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    color: AdminColors.templeBrown,
  },
  itemActionBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  editIconBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: AdminColors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteIconBtn: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: AdminColors.dangerSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  snanDetailsGrid: {
    gap: 4,
    marginBottom: 6,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailBold: {
    fontSize: 11.5,
    fontFamily: 'Poppins_700Bold',
    color: AdminColors.saffron,
  },
  detailText: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: AdminColors.textSecondary,
    flex: 1,
  },
  importanceText: {
    fontSize: 10.5,
    fontFamily: 'Poppins_400Regular',
    color: AdminColors.textMuted,
    backgroundColor: '#F8FAFC',
    padding: 6,
    borderRadius: 6,
  },
  formScroll: {
    padding: 16,
  },
  formHeading: {
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
    color: AdminColors.textPrimary,
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 11,
    fontFamily: 'Poppins_600SemiBold',
    color: AdminColors.textSecondary,
    marginBottom: 4,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: AdminColors.textPrimary,
  },
  crowdSelectorRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  crowdPill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  crowdPillActive: {
    borderColor: 'transparent',
  },
  crowdPillText: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    color: AdminColors.textPrimary,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
  },
  toggleTitle: {
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
    color: AdminColors.textPrimary,
  },
  toggleSub: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: AdminColors.textMuted,
  },
  toggleBtn: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  toggleBtnActive: {
    backgroundColor: AdminColors.saffron,
  },
  toggleBtnText: {
    fontSize: 11,
    fontFamily: 'Poppins_700Bold',
    color: AdminColors.textMuted,
  },
  formActionRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
    marginBottom: 20,
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  cancelBtnText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: AdminColors.textSecondary,
  },
  saveBtn: {
    flex: 2,
    backgroundColor: AdminColors.saffron,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FFFFFF',
  },
});

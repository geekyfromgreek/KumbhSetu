import React, { useState } from 'react';
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
import { KumbhColors } from '@/constants/colors';

interface DatePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectDate: (formattedDate: string) => void;
  initialDate?: string;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  visible,
  onClose,
  onSelectDate,
}) => {
  const currentYear = new Date().getFullYear();
  const [selectedDay, setSelectedDay] = useState<number>(15);
  const [selectedMonth, setSelectedMonth] = useState<number>(7); // 0-indexed, 7 = August
  const [selectedYear, setSelectedYear] = useState<number>(1995);
  const [activeTab, setActiveTab] = useState<'day' | 'month' | 'year'>('day');

  // Generate list of days based on selected month & year
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Years from 1940 to currentYear
  const years = Array.from(
    { length: currentYear - 1939 },
    (_, i) => currentYear - i
  );

  const handleConfirm = () => {
    const dayStr = String(selectedDay).padStart(2, '0');
    const monthStr = String(selectedMonth + 1).padStart(2, '0');
    const formatted = `${dayStr}/${monthStr}/${selectedYear}`;
    onSelectDate(formatted);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onClose} />
        
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Select Date of Birth</Text>
              <Text style={styles.selectedDisplay}>
                {String(selectedDay).padStart(2, '0')} {MONTHS[selectedMonth]} {selectedYear}
              </Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Selector Switcher Tabs */}
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'day' && styles.tabBtnActive]}
              onPress={() => setActiveTab('day')}>
              <Text style={[styles.tabText, activeTab === 'day' && styles.tabTextActive]}>
                Day ({selectedDay})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'month' && styles.tabBtnActive]}
              onPress={() => setActiveTab('month')}>
              <Text style={[styles.tabText, activeTab === 'month' && styles.tabTextActive]}>
                Month ({MONTHS[selectedMonth].substring(0, 3)})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabBtn, activeTab === 'year' && styles.tabBtnActive]}
              onPress={() => setActiveTab('year')}>
              <Text style={[styles.tabText, activeTab === 'year' && styles.tabTextActive]}>
                Year ({selectedYear})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Grid Selection Body */}
          <View style={styles.gridContainer}>
            {activeTab === 'day' && (
              <ScrollView contentContainerStyle={styles.scrollGrid} showsVerticalScrollIndicator={false}>
                {days.map((day) => {
                  const isSelected = selectedDay === day;
                  return (
                    <TouchableOpacity
                      key={day}
                      style={[styles.itemTile, isSelected && styles.itemTileSelected]}
                      onPress={() => setSelectedDay(day)}>
                      <Text style={[styles.itemText, isSelected && styles.itemTextSelected]}>
                        {day}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}

            {activeTab === 'month' && (
              <ScrollView contentContainerStyle={styles.monthGrid} showsVerticalScrollIndicator={false}>
                {MONTHS.map((month, idx) => {
                  const isSelected = selectedMonth === idx;
                  return (
                    <TouchableOpacity
                      key={month}
                      style={[styles.monthTile, isSelected && styles.itemTileSelected]}
                      onPress={() => {
                        setSelectedMonth(idx);
                        setActiveTab('day');
                      }}>
                      <Text style={[styles.itemText, isSelected && styles.itemTextSelected]}>
                        {month}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}

            {activeTab === 'year' && (
              <ScrollView contentContainerStyle={styles.yearGrid} showsVerticalScrollIndicator={false}>
                {years.map((year) => {
                  const isSelected = selectedYear === year;
                  return (
                    <TouchableOpacity
                      key={year}
                      style={[styles.yearTile, isSelected && styles.itemTileSelected]}
                      onPress={() => {
                        setSelectedYear(year);
                        setActiveTab('month');
                      }}>
                      <Text style={[styles.itemText, isSelected && styles.itemTextSelected]}>
                        {year}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
              <Text style={styles.confirmText}>Confirm Date</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  container: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 13,
    color: '#64748B',
    fontFamily: 'Poppins_500Medium',
  },
  selectedDisplay: {
    fontSize: 16,
    color: '#0F172A',
    fontFamily: 'Poppins_700Bold',
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
  },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 3,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 6,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabBtnActive: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tabText: {
    fontSize: 12,
    color: '#64748B',
    fontFamily: 'Poppins_500Medium',
  },
  tabTextActive: {
    color: KumbhColors.primary,
    fontFamily: 'Poppins_700Bold',
  },
  gridContainer: {
    height: 190,
  },
  scrollGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    paddingVertical: 4,
  },
  monthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingVertical: 4,
  },
  yearGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    paddingVertical: 4,
  },
  itemTile: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthTile: {
    width: '48%',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  yearTile: {
    width: '31%',
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTileSelected: {
    backgroundColor: KumbhColors.primary,
    borderColor: KumbhColors.primaryDark,
  },
  itemText: {
    fontSize: 13,
    color: '#334155',
    fontFamily: 'Poppins_600SemiBold',
  },
  itemTextSelected: {
    color: '#FFFFFF',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  cancelBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  cancelText: {
    fontSize: 13,
    color: '#64748B',
    fontFamily: 'Poppins_600SemiBold',
  },
  confirmBtn: {
    backgroundColor: KumbhColors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  confirmText: {
    fontSize: 13,
    color: '#FFFFFF',
    fontFamily: 'Poppins_700Bold',
  },
});

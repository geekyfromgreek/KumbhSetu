import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { VeerColors } from '@/constants/colors';
import { useVolunteer } from '@/context/VolunteerContext';
import { DUTY_SECTORS } from '@/constants/translations';

export const CompletedTasksTab: React.FC = () => {
  const { incidents, factChecks, profile, language, t } = useVolunteer();

  const [activeSubTab, setActiveSubTab] = useState<'incidents' | 'factchecks'>('incidents');

  const resolvedIncidents = incidents.filter(
    (inc) => inc.status === 'RESOLVED_OFFLINE'
  );

  const verifiedFactChecks = factChecks.filter(
    (fc) => fc.status === 'VERIFIED_TRUE' || fc.status === 'DEBUNKED_FAKE'
  );

  const getSectorName = (secId: string) => {
    const s = DUTY_SECTORS.find((x) => x.id === secId);
    return s ? (language === 'mr' ? s.mr : s.en) : secId;
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Stats Overview Tiles */}
      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Ionicons name="checkmark-done-circle" size={24} color={VeerColors.success} />
          <Text style={styles.statNumber}>{resolvedIncidents.length}</Text>
          <Text style={styles.statLabel}>{t.solvedIncidents}</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="newspaper" size={24} color={VeerColors.riverBlue} />
          <Text style={styles.statNumber}>{verifiedFactChecks.length}</Text>
          <Text style={styles.statLabel}>{t.factChecksCompleted}</Text>
        </View>
      </View>

      {/* Sub Tab Switcher */}
      <View style={styles.subTabRow}>
        <TouchableOpacity
          style={[styles.subTabBtn, activeSubTab === 'incidents' && styles.subTabBtnActive]}
          onPress={() => setActiveSubTab('incidents')}
        >
          <Text
            style={[
              styles.subTabBtnText,
              activeSubTab === 'incidents' && styles.subTabBtnTextActive,
            ]}
          >
            {t.solvedIncidents} ({resolvedIncidents.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.subTabBtn, activeSubTab === 'factchecks' && styles.subTabBtnActive]}
          onPress={() => setActiveSubTab('factchecks')}
        >
          <Text
            style={[
              styles.subTabBtnText,
              activeSubTab === 'factchecks' && styles.subTabBtnTextActive,
            ]}
          >
            {t.factChecksCompleted} ({verifiedFactChecks.length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sub-tab 1: Resolved Incidents */}
      {activeSubTab === 'incidents' && (
        <View style={styles.listContainer}>
          {resolvedIncidents.length === 0 ? (
            <View style={styles.emptyCard}>
              <Ionicons name="receipt-outline" size={38} color={VeerColors.textMuted} />
              <Text style={styles.emptyTitle}>
                {language === 'mr' ? 'कोणतीही सोडवलेली घटना नाही' : 'No Resolved Incidents Yet'}
              </Text>
              <Text style={styles.emptySub}>
                {language === 'mr'
                  ? 'घटनास्थळी प्रत्यक्ष जाऊन स्वाइप करून सोडवलेल्या तक्रारी येथे दिसतील.'
                  : 'Incidents you visit offline and resolve with swipe-to-confirm will appear here.'}
              </Text>
            </View>
          ) : (
            resolvedIncidents.map((inc) => (
              <View key={inc.id} style={styles.resolvedCard}>
                <View style={styles.resolvedHeader}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.tokenRow}>
                      <Text style={styles.tokenText}>{inc.token}</Text>
                      <View style={styles.resolvedBadge}>
                        <Ionicons name="checkmark-circle" size={12} color={VeerColors.success} />
                        <Text style={styles.resolvedBadgeText}>SOLVED</Text>
                      </View>
                    </View>
                    <Text style={styles.categoryTitle}>{inc.category}</Text>
                  </View>
                  <Text style={styles.timeText}>{inc.resolutionTimestamp || inc.timestamp}</Text>
                </View>

                <Text style={styles.locationText}>
                  📍 {inc.location} ({getSectorName(inc.sectorId)})
                </Text>

                <View style={styles.notesBox}>
                  <Text style={styles.notesLabel}>
                    {language === 'mr' ? 'प्रत्यक्ष तपासणी अहवाल:' : 'Ground Inspection Record:'}
                  </Text>
                  <Text style={styles.notesBody}>{inc.volunteerNotes}</Text>
                </View>
              </View>
            ))
          )}
        </View>
      )}

      {/* Sub-tab 2: Verified Fact Checks */}
      {activeSubTab === 'factchecks' && (
        <View style={styles.listContainer}>
          {verifiedFactChecks.length === 0 ? (
            <View style={styles.emptyCard}>
              <Ionicons name="shield-checkmark-outline" size={38} color={VeerColors.textMuted} />
              <Text style={styles.emptyTitle}>
                {language === 'mr' ? 'कोणतीही फॅक्ट-चेक नोंद नाही' : 'No Fact-Checks Verified Yet'}
              </Text>
              <Text style={styles.emptySub}>
                {language === 'mr'
                  ? 'आपण पडताळणी केलेले अफवांचे अहवाल येथे दिसतील.'
                  : 'Rumors you physically inspect and verify will appear here.'}
              </Text>
            </View>
          ) : (
            verifiedFactChecks.map((fc) => {
              const isTrue = fc.status === 'VERIFIED_TRUE';
              const title = language === 'mr' ? fc.claimTitle.mr : fc.claimTitle.en;
              return (
                <View key={fc.id} style={styles.resolvedCard}>
                  <View style={styles.resolvedHeader}>
                    <View
                      style={[
                        styles.verdictBadge,
                        isTrue ? styles.verdictTrue : styles.verdictFake,
                      ]}
                    >
                      <Ionicons
                        name={isTrue ? 'checkmark-circle' : 'close-circle'}
                        size={12}
                        color={isTrue ? VeerColors.success : VeerColors.danger}
                      />
                      <Text
                        style={[
                          styles.verdictBadgeText,
                          { color: isTrue ? VeerColors.success : VeerColors.danger },
                        ]}
                      >
                        {isTrue ? 'VERIFIED TRUE' : 'DEBUNKED FAKE'}
                      </Text>
                    </View>
                    <Text style={styles.timeText}>{fc.timestamp}</Text>
                  </View>

                  <Text style={styles.claimTitleText}>{title}</Text>
                  <Text style={styles.sourceText}>
                    {t.source}: {fc.claimSource} • {getSectorName(fc.sectorId)}
                  </Text>

                  <View style={styles.notesBox}>
                    <Text style={styles.notesLabel}>
                      {language === 'mr' ? 'प्रसिद्ध केलेले स्पष्टीकरण:' : 'Published Clarification:'}
                    </Text>
                    <Text style={styles.notesBody}>
                      {language === 'mr'
                        ? fc.officialClarification?.mr
                        : fc.officialClarification?.en}
                    </Text>
                  </View>
                </View>
              );
            })
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: VeerColors.background,
  },
  scrollContent: {
    padding: 16,
    gap: 12,
    paddingBottom: 28,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: VeerColors.cardBackground,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.templeBrown,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    color: VeerColors.textMuted,
    textAlign: 'center',
  },
  subTabRow: {
    flexDirection: 'row',
    backgroundColor: VeerColors.cardBackground,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
    padding: 3,
    gap: 4,
  },
  subTabBtn: {
    flex: 1,
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 8,
  },
  subTabBtnActive: {
    backgroundColor: VeerColors.saffronSoft,
  },
  subTabBtnText: {
    fontSize: 11.5,
    fontFamily: 'Poppins_600SemiBold',
    color: VeerColors.textMuted,
  },
  subTabBtnTextActive: {
    color: VeerColors.saffronDark,
    fontFamily: 'Poppins_700Bold',
  },
  listContainer: {
    gap: 10,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 36,
    paddingHorizontal: 16,
    backgroundColor: VeerColors.cardBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
  },
  emptyTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.templeBrown,
    marginTop: 8,
  },
  emptySub: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: VeerColors.textMuted,
    textAlign: 'center',
    marginTop: 2,
    lineHeight: 16,
  },
  resolvedCard: {
    backgroundColor: VeerColors.cardBackground,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: VeerColors.cardBorder,
  },
  resolvedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tokenText: {
    fontSize: 11.5,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.textMuted,
  },
  resolvedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: VeerColors.successSoft,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: VeerColors.successBorder,
    gap: 3,
  },
  resolvedBadgeText: {
    fontSize: 9.5,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.success,
  },
  categoryTitle: {
    fontSize: 13.5,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.templeBrown,
    marginTop: 2,
  },
  timeText: {
    fontSize: 10.5,
    fontFamily: 'Poppins_400Regular',
    color: VeerColors.textMuted,
  },
  locationText: {
    fontSize: 11.5,
    fontFamily: 'Poppins_500Medium',
    color: VeerColors.saffronDark,
    marginTop: 3,
  },
  notesBox: {
    backgroundColor: VeerColors.surfaceHover,
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: VeerColors.success,
  },
  notesLabel: {
    fontSize: 10.5,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.textPrimary,
  },
  notesBody: {
    fontSize: 11.5,
    fontFamily: 'Poppins_400Regular',
    color: VeerColors.textSecondary,
    marginTop: 2,
    lineHeight: 15,
  },
  verdictBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    borderWidth: 1,
    gap: 4,
  },
  verdictTrue: {
    backgroundColor: VeerColors.successSoft,
    borderColor: VeerColors.successBorder,
  },
  verdictFake: {
    backgroundColor: VeerColors.dangerSoft,
    borderColor: VeerColors.dangerBorder,
  },
  verdictBadgeText: {
    fontSize: 9.5,
    fontFamily: 'Poppins_700Bold',
  },
  claimTitleText: {
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
    color: VeerColors.templeBrown,
    marginTop: 4,
    lineHeight: 16,
  },
  sourceText: {
    fontSize: 10.5,
    fontFamily: 'Poppins_400Regular',
    color: VeerColors.textMuted,
    marginTop: 2,
  },
});

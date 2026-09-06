import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAdmin } from '@/context/AdminContext';
import { AdminColors } from '@/constants/colors';
import { SnanScheduleModal } from '@/components/SnanScheduleModal';

export const DashboardOverviewTab: React.FC = () => {
  const { stats, setActiveTab, routes, shops, factChecks, tickets, snanMuhurats } = useAdmin();
  const [isSnanModalOpen, setIsSnanModalOpen] = useState<boolean>(false);

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Special Shahi Snan Banner Card */}
        <TouchableOpacity
          style={styles.snanBannerCard}
          onPress={() => setIsSnanModalOpen(true)}
          activeOpacity={0.85}
        >
          <View style={styles.snanBannerLeft}>
            <View style={styles.snanIconBox}>
              <MaterialCommunityIcons name="water-outline" size={20} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.snanBadgeRow}>
                <Text style={styles.snanBadgeText}>AUSPICIOUS TIMINGS</Text>
                <Text style={styles.snanCountBadge}>{snanMuhurats.length} Dates</Text>
              </View>
              <Text style={styles.snanBannerTitle}>Shahi Snan & Muhurat Schedule</Text>
              <Text style={styles.snanBannerSub}>
                Manage official royal bathing windows, ghat locations & crowd advisories
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#FFFFFF" />
        </TouchableOpacity>

        {/* 4 Metric Summary Cards */}
        <View style={styles.statsGrid}>
          {/* Metric 1: Tariffs */}
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => setActiveTab('tariffs')}
            activeOpacity={0.75}
          >
            <View style={[styles.statIconBox, { backgroundColor: AdminColors.primarySoft }]}>
              <FontAwesome5 name="route" size={15} color={AdminColors.saffron} />
            </View>
            <Text style={styles.statCount}>{stats.activeRoutesCount}</Text>
            <Text style={styles.statTitle}>Route Tariffs</Text>
            <Text style={styles.statAction}>Manage →</Text>
          </TouchableOpacity>

          {/* Metric 2: Bazaar */}
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => setActiveTab('bazaar')}
            activeOpacity={0.75}
          >
            <View style={[styles.statIconBox, { backgroundColor: AdminColors.successSoft }]}>
              <FontAwesome5 name="store" size={15} color={AdminColors.emerald} />
            </View>
            <Text style={styles.statCount}>{stats.approvedShopsCount}</Text>
            <Text style={styles.statTitle}>Bazaar Stalls</Text>
            <Text style={[styles.statAction, { color: AdminColors.emerald }]}>Manage →</Text>
          </TouchableOpacity>

          {/* Metric 3: Fact-Check */}
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => setActiveTab('factcheck')}
            activeOpacity={0.75}
          >
            <View style={[styles.statIconBox, { backgroundColor: AdminColors.warningSoft }]}>
              <FontAwesome5 name="shield-alt" size={15} color={AdminColors.warning} />
            </View>
            <Text style={styles.statCount}>{stats.openRumorsCount}</Text>
            <Text style={styles.statTitle}>Rumor Reports</Text>
            <Text style={[styles.statAction, { color: AdminColors.warning }]}>Review →</Text>
          </TouchableOpacity>

          {/* Metric 4: Grievances */}
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => setActiveTab('grievances')}
            activeOpacity={0.75}
          >
            <View style={[styles.statIconBox, { backgroundColor: AdminColors.dangerSoft }]}>
              <FontAwesome5 name="gavel" size={15} color={AdminColors.danger} />
            </View>
            <Text style={styles.statCount}>{stats.pendingGrievancesCount}</Text>
            <Text style={styles.statTitle}>Complaints</Text>
            <Text style={[styles.statAction, { color: AdminColors.danger }]}>Enforce →</Text>
          </TouchableOpacity>
        </View>

        {/* Direct Management Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Management Modules</Text>

          <View style={styles.actionGrid}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => setIsSnanModalOpen(true)}
              activeOpacity={0.75}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#FEF3C7' }]}>
                <MaterialCommunityIcons name="water" size={18} color="#B45309" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.actionBtnTitle}>Shahi Snan & Muhurat Schedule</Text>
                <Text style={styles.actionBtnDesc}>Update royal bathing dates, ghats & crowd levels</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={AdminColors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => setActiveTab('tariffs')}
              activeOpacity={0.75}
            >
              <View style={[styles.actionIcon, { backgroundColor: AdminColors.primarySoft }]}>
                <FontAwesome5 name="route" size={16} color={AdminColors.saffron} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.actionBtnTitle}>Transit Tariffs & Price Caps</Text>
                <Text style={styles.actionBtnDesc}>Set mandated fares and commodity ceilings</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={AdminColors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => setActiveTab('bazaar')}
              activeOpacity={0.75}
            >
              <View style={[styles.actionIcon, { backgroundColor: AdminColors.successSoft }]}>
                <FontAwesome5 name="store" size={15} color={AdminColors.emerald} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.actionBtnTitle}>Bazaar & Merchant Stalls</Text>
                <Text style={styles.actionBtnDesc}>Audit, approve, or revoke local stalls</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={AdminColors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => setActiveTab('factcheck')}
              activeOpacity={0.75}
            >
              <View style={[styles.actionIcon, { backgroundColor: AdminColors.warningSoft }]}>
                <FontAwesome5 name="shield-alt" size={15} color={AdminColors.warning} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.actionBtnTitle}>Fact-Check & Rumor Buster</Text>
                <Text style={styles.actionBtnDesc}>Publish official bulletins and dispel rumors</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={AdminColors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => setActiveTab('grievances')}
              activeOpacity={0.75}
            >
              <View style={[styles.actionIcon, { backgroundColor: AdminColors.dangerSoft }]}>
                <FontAwesome5 name="gavel" size={15} color={AdminColors.danger} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.actionBtnTitle}>Grievance Enforcement Desk</Text>
                <Text style={styles.actionBtnDesc}>Track overcharging and issue squad actions</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={AdminColors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>


      {/* Database Status / Recent Logs */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Records</Text>

        <View style={styles.card}>
          {routes.length === 0 && shops.length === 0 && factChecks.length === 0 && tickets.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="folder-open-outline" size={32} color={AdminColors.textMuted} />
              <Text style={styles.emptyTitle}>No Records Created Yet</Text>
              <Text style={styles.emptyDesc}>
                Use the modules above to create fare tariffs, register bazaar stalls, publish advisories, or log complaints.
              </Text>
            </View>
          ) : (
            <View style={styles.logList}>
              {routes.slice(0, 2).map((r) => (
                <View key={r.id} style={styles.logItem}>
                  <FontAwesome5 name="route" size={12} color={AdminColors.saffron} />
                  <Text style={styles.logText}>
                    Route: {r.fromName} ➔ {r.toName} (₹{r.sharedAutoPerPerson})
                  </Text>
                </View>
              ))}
              {shops.slice(0, 2).map((s) => (
                <View key={s.id} style={styles.logItem}>
                  <FontAwesome5 name="store" size={12} color={AdminColors.emerald} />
                  <Text style={styles.logText}>
                    Stall: {s.shopName} ({s.location})
                  </Text>
                </View>
              ))}
              {factChecks.slice(0, 2).map((f) => (
                <View key={f.id} style={styles.logItem}>
                  <FontAwesome5 name="shield-alt" size={12} color={AdminColors.warning} />
                  <Text style={styles.logText}>
                    Fact-Check: {f.claimTitle}
                  </Text>
                </View>
              ))}
              {tickets.slice(0, 2).map((t) => (
                <View key={t.id} style={styles.logItem}>
                  <FontAwesome5 name="gavel" size={12} color={AdminColors.danger} />
                  <Text style={styles.logText}>
                    Ticket #{t.token}: {t.vehicleOrShop}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>

    <SnanScheduleModal
      visible={isSnanModalOpen}
      onClose={() => setIsSnanModalOpen(false)}
    />
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AdminColors.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  snanBannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0F766E', // Divine deep teal / ganga river
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  snanBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
    paddingRight: 8,
  },
  snanIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  snanBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 2,
  },
  snanBadgeText: {
    fontSize: 9.5,
    fontFamily: 'Poppins_700Bold',
    color: '#99F6E4',
    letterSpacing: 0.5,
  },
  snanCountBadge: {
    fontSize: 9,
    fontFamily: 'Poppins_600SemiBold',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    color: '#FFFFFF',
    paddingVertical: 1,
    paddingHorizontal: 5,
    borderRadius: 4,
  },
  snanBannerTitle: {
    fontSize: 13.5,
    fontFamily: 'Poppins_700Bold',
    color: '#FFFFFF',
  },
  snanBannerSub: {
    fontSize: 10.5,
    fontFamily: 'Poppins_400Regular',
    color: '#CCFBF1',
    marginTop: 1,
  },

  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  statCard: {
    width: '48.5%',
    backgroundColor: AdminColors.cardBackground,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
  },
  statIconBox: {
    width: 30,
    height: 30,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statCount: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: AdminColors.textPrimary,
  },
  statTitle: {
    fontSize: 11,
    fontFamily: 'Poppins_500Medium',
    color: AdminColors.textMuted,
    marginTop: 1,
  },
  statAction: {
    fontSize: 10.5,
    fontFamily: 'Poppins_600SemiBold',
    color: AdminColors.saffron,
    marginTop: 4,
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Poppins_700Bold',
    color: AdminColors.templeBrown,
    marginBottom: 8,
  },
  actionGrid: {
    gap: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: AdminColors.cardBackground,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
  },
  actionIcon: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnTitle: {
    fontSize: 12.5,
    fontFamily: 'Poppins_600SemiBold',
    color: AdminColors.textPrimary,
  },
  actionBtnDesc: {
    fontSize: 10.5,
    fontFamily: 'Poppins_400Regular',
    color: AdminColors.textMuted,
    marginTop: 1,
  },
  card: {
    backgroundColor: AdminColors.cardBackground,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 4,
  },
  emptyTitle: {
    fontSize: 13,
    fontFamily: 'Poppins_600SemiBold',
    color: AdminColors.textPrimary,
    marginTop: 4,
  },
  emptyDesc: {
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    color: AdminColors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: 16,
  },
  logList: {
    gap: 8,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: AdminColors.cardBorder,
  },
  logText: {
    fontSize: 11.5,
    fontFamily: 'Poppins_500Medium',
    color: AdminColors.textPrimary,
    flex: 1,
  },
});

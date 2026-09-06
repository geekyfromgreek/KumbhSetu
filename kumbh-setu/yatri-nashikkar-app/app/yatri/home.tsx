/**
 * Y1 — Yatri Home
 * Quick-access tiles, crowd level indicator
 */
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const tiles = [
  { id: 'marketplace', icon: 'storefront-outline' as const, label: 'Marketplace', sublabel: 'Fair prices, verified', route: '/yatri/marketplace', color: '#B44D12' },
  { id: 'report', icon: 'flag-outline' as const, label: 'Report Issue', sublabel: 'Flag misinformation', route: '/yatri/report', color: '#C62828' },
  { id: 'sos', icon: 'alert-circle-outline' as const, label: 'Emergency SOS', sublabel: 'Nearest help point', route: '/yatri/emergency', color: '#D32F2F' },
  { id: 'food', icon: 'restaurant-outline' as const, label: 'Food Finder', sublabel: 'Eateries near you', route: '/yatri/marketplace?tab=eatery', color: '#E65100' },
];

const crowdLevels = [
  { area: 'Ramkund Ghat', level: 'Moderate', color: '#F9A825' },
  { area: 'Panchavati', level: 'High', color: '#EF6C00' },
  { area: 'Trimbakeshwar Rd', level: 'Low', color: '#2E7D32' },
];

export default function YatriHome() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#5B1A0E" />
          </TouchableOpacity>
          <View>
            <Text style={styles.greeting}>Namaste, Yatri 🙏</Text>
            <Text style={styles.subtitle}>Kumbh Mela 2027 · Nashik</Text>
          </View>
        </View>

        {/* Crowd Level */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Crowd Levels</Text>
          <View style={styles.crowdRow}>
            {crowdLevels.map((c) => (
              <View key={c.area} style={styles.crowdCard}>
                <View style={[styles.crowdDot, { backgroundColor: c.color }]} />
                <Text style={styles.crowdArea}>{c.area}</Text>
                <Text style={[styles.crowdLevel, { color: c.color }]}>{c.level}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Access */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.tilesGrid}>
            {tiles.map((tile) => (
              <TouchableOpacity
                key={tile.id}
                style={styles.tile}
                onPress={() => router.push(tile.route as any)}
                activeOpacity={0.8}
              >
                <View style={[styles.tileIcon, { backgroundColor: `${tile.color}10` }]}>
                  <Ionicons name={tile.icon} size={28} color={tile.color} />
                </View>
                <Text style={styles.tileLabel}>{tile.label}</Text>
                <Text style={styles.tileSub}>{tile.sublabel}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="information-circle-outline" size={20} color="#B44D12" />
          <Text style={styles.infoText}>
            All prices shown are reference rates. Use "Report Issue" to flag any discrepancies.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFF8F0' },
  container: { flex: 1, paddingHorizontal: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 12,
    paddingBottom: 24,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#EED9C4',
  },
  greeting: { fontSize: 24, fontWeight: '700', color: '#5B1A0E' },
  subtitle: { fontSize: 13, color: '#A0845C', marginTop: 2 },
  section: { marginBottom: 28 },
  sectionTitle: {
    fontSize: 16, fontWeight: '700', color: '#5B1A0E',
    marginBottom: 12, letterSpacing: 0.3,
  },
  crowdRow: { flexDirection: 'row', gap: 10 },
  crowdCard: {
    flex: 1, backgroundColor: '#FFFFFF', borderRadius: 14, padding: 14,
    borderWidth: 1, borderColor: '#F0E6D8',
  },
  crowdDot: { width: 8, height: 8, borderRadius: 4, marginBottom: 8 },
  crowdArea: { fontSize: 12, fontWeight: '600', color: '#5B1A0E', marginBottom: 2 },
  crowdLevel: { fontSize: 11, fontWeight: '700' },
  tilesGrid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 12,
  },
  tile: {
    width: '47%' as any, backgroundColor: '#FFFFFF', borderRadius: 18,
    padding: 20, borderWidth: 1, borderColor: '#F0E6D8',
  },
  tileIcon: {
    width: 52, height: 52, borderRadius: 16,
    justifyContent: 'center', alignItems: 'center', marginBottom: 14,
  },
  tileLabel: { fontSize: 15, fontWeight: '700', color: '#5B1A0E', marginBottom: 2 },
  tileSub: { fontSize: 11, color: '#A0845C' },
  infoBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#FFF3E0', borderRadius: 12, padding: 14,
    marginBottom: 32, borderWidth: 1, borderColor: '#FFCC80',
  },
  infoText: { flex: 1, fontSize: 12, color: '#8B6914', lineHeight: 17 },
});

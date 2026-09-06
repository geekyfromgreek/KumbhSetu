import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAdmin } from '@/context/AdminContext';
import { AdminColors } from '@/constants/colors';

export const AdminHeader: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { currentUser, currentOfficer, logout } = useAdmin();

  const user = currentUser || currentOfficer;

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      `Sign out from Admin Panel?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.headerContainer, { paddingTop: Math.max(insets.top + 4, 12) }]}>
      <View style={styles.topRow}>
        {/* Branding */}
        <View style={styles.brandingBox}>
          <View style={styles.emblemCircle}>
            <FontAwesome5 name="shield-alt" size={15} color={AdminColors.white} />
          </View>
          <View>
            <View style={styles.titleRow}>
              <Text style={styles.brandKumbh}>Kumbh</Text>
              <Text style={styles.brandSetu}>Setu</Text>
              <Text style={styles.adminLabel}>Admin</Text>
            </View>
            <Text style={styles.deptText}>
              Control & Management Panel
            </Text>
          </View>
        </View>

        {/* User Info & Sign Out */}
        <View style={styles.userBox}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userRole}>Administrator</Text>
          </View>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={handleLogout}
            activeOpacity={0.75}
            accessibilityLabel="Sign out"
          >
            <Ionicons name="log-out-outline" size={18} color={AdminColors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: AdminColors.cardBackground,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: AdminColors.cardBorder,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  emblemCircle: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: AdminColors.saffron,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  brandKumbh: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: AdminColors.templeBrown,
  },
  brandSetu: {
    fontSize: 16,
    fontFamily: 'Poppins_700Bold',
    color: AdminColors.saffron,
  },
  adminLabel: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: AdminColors.textMuted,
    marginLeft: 4,
  },
  deptText: {
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    color: AdminColors.textMuted,
    marginTop: -2,
  },
  userBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userInfo: {
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
    color: AdminColors.textPrimary,
  },
  userRole: {
    fontSize: 9.5,
    fontFamily: 'Poppins_400Regular',
    color: AdminColors.textMuted,
  },
  logoutBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: AdminColors.inputBackground,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: AdminColors.cardBorder,
  },
});

/**
 * Kumbh Setu — Root Layout
 * Saffron/maroon/warm ivory palette with professional typography.
 */
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

export default function RootLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FFF8F0' }}>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: { backgroundColor: '#FFF8F0' },
        }}
      />
    </View>
  );
}

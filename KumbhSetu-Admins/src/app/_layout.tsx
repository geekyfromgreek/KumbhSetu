import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AdminProvider } from '@/context/AdminContext';
import { AdminColors } from '@/constants/colors';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AdminProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: AdminColors.darkNavy },
          }}
        >
          <Stack.Screen name="index" />
        </Stack>
      </AdminProvider>
    </SafeAreaProvider>
  );
}

import { Stack } from 'expo-router';

export default function KumbhveerLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#F0FDF4' },
      }}
    />
  );
}

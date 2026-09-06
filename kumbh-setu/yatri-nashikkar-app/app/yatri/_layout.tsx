import { Stack } from 'expo-router';

export default function YatriLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        contentStyle: { backgroundColor: '#FFF8F0' },
      }}
    />
  );
}

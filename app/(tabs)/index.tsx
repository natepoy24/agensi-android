import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    // Kita coba className Tailwind di sini
    <View className="flex-1 items-center justify-center bg-blue-500">
      
      <Text className="text-white text-3xl font-bold mb-4">
        Berhasil! 🎉
      </Text>
      
      <View className="bg-white p-4 rounded-xl shadow-lg m-4">
        <Text className="text-slate-800 text-center font-semibold">
          Tailwind sudah jalan di Android!
        </Text>
        <Text className="text-slate-500 text-center text-xs mt-2">
          (File: app/(tabs)/index.tsx)
        </Text>
      </View>

      <StatusBar style="light" />
    </View>
  );
}
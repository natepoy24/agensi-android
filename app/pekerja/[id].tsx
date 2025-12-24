import { supabase } from '@/src/utils/supabase';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function WorkerDetail() {
  // 1. Tangkap ID dari URL (misal: /pekerja/123 -> id = 123)
  const { id } = useLocalSearchParams();
  const [worker, setWorker] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 2. Ambil detail pekerja dari Supabase berdasarkan ID
  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      
      const { data, error } = await supabase
        .from('pekerja')
        .select('*')
        .eq('id', id)
        .single(); // .single() karena kita cuma cari 1 orang

      if (data) setWorker(data);
      setLoading(false);
    };

    fetchDetail();
  }, [id]);

  return (
    <View className="flex-1 bg-white items-center justify-center p-6">
      {/* Fitur Stack.Screen membolehkan kita ganti judul Header HP secara dinamis */}
      <Stack.Screen options={{ title: worker ? worker.nama : 'Detail Pekerja' }} />

      {loading ? (
        <ActivityIndicator size="large" color="#059669" />
      ) : worker ? (
        <View className="items-center">
          <Text className="text-2xl font-bold text-slate-800 mb-2">{worker.nama}</Text>
          <Text className="text-emerald-600 font-bold text-lg mb-4">{worker.kategori}</Text>
          <Text className="text-slate-500 text-center">
            Halaman detail untuk {worker.nama} berhasil dibuat! 
            Nanti kita percantik halaman ini seperti di website.
          </Text>
        </View>
      ) : (
        <Text className="text-red-500">Pekerja tidak ditemukan :(</Text>
      )}
    </View>
  );
}
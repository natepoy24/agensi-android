import WorkerCard, { Worker } from '@/components/WorkerCard';
import { supabase } from '@/src/utils/supabase';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    console.log("🔄 MEMULAI FETCH DATA DARI SUPABASE...");
    try {
      setLoading(true);
      
      // 1. Cek Koneksi & URL Supabase
      // console.log("URL:", process.env.EXPO_PUBLIC_SUPABASE_URL); // Boleh dinyalakan kalau curiga env salah

      const { data, error, count } = await supabase
        .from('pekerja')
        .select('*', { count: 'exact' }) // Tambah count biar tahu jumlahnya
        .eq('status', 'Tersedia') // Pastikan tulisan 'Tersedia' sama persis (Case Sensitive!)
        .limit(6);

      if (error) {
        console.error("❌ ERROR SUPABASE:", error.message);
        console.error("   Detail:", error.details);
      } else {
        console.log("✅ DATA DITERIMA!");
        console.log("   Jumlah Data:", data?.length);
        
        if (data && data.length > 0) {
          console.log("   Contoh Data (Orang Pertama):", data[0].nama);
          console.log("   URL Fotonya:", data[0].fotoUrl);
        } else {
          console.warn("⚠️ Data kosong! Cek apakah status di DB benar-benar 'Tersedia'?");
        }
        
        setWorkers(data || []);
      }
    } catch (err) {
      console.error("❌ ERROR TIDAK TERDUGA:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View className="px-6 py-4 bg-white shadow-sm flex-row justify-between items-center sticky top-0 z-10">
          <View>
            <Text className="text-xl font-extrabold text-emerald-600 tracking-tight">
              PT Jasa Mandiri
            </Text>
            <Text className="text-[10px] text-slate-500 font-medium">
              Solusi Pekerja Rumah Tangga
            </Text>
          </View>
          <TouchableOpacity className="bg-slate-100 p-2 rounded-full">
            <Ionicons name="notifications-outline" size={20} color="#334155" />
          </TouchableOpacity>
        </View>

        {/* HERO BANNER */}
        <View className="px-6 mt-6">
          <View className="bg-emerald-800 rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <View className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-600 rounded-full opacity-30" />
            <View className="w-2/3">
              <Text className="text-white font-bold text-lg mb-2">
                Cari Pekerja Hari Ini?
              </Text>
              <Text className="text-emerald-100 text-xs mb-4">
                Kami siap menyalurkan pekerja terverifikasi langsung ke rumah Anda.
              </Text>
              <Link href="/(tabs)/explore" asChild>
                <TouchableOpacity className="bg-white px-4 py-2 rounded-lg self-start">
                  <Text className="text-emerald-800 font-bold text-xs">Cari Sekarang</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>

        {/* KATALOG UNGGULAN */}
        <View className="mt-10 mb-8">
          <View className="px-6 flex-row justify-between items-end mb-4">
            <View>
              <Text className="text-lg font-bold text-slate-800">Kandidat Unggulan</Text>
              <Text className="text-xs text-slate-500">Siap kerja minggu ini</Text>
            </View>
            <TouchableOpacity onPress={fetchWorkers}>
               <Text className="text-emerald-600 text-xs font-bold">Refresh Data</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View className="h-40 items-center justify-center">
              <ActivityIndicator size="large" color="#059669" />
              <Text className="text-slate-400 text-xs mt-2">Sedang mengambil data...</Text>
            </View>
          ) : workers.length === 0 ? (
            <View className="px-6 py-8 bg-white mx-6 rounded-lg border border-slate-200 items-center">
               <Ionicons name="alert-circle-outline" size={32} color="#94a3b8" />
               <Text className="text-center text-slate-800 font-bold mt-2">Data Kosong</Text>
               <Text className="text-center text-slate-500 text-xs mt-1">
                 Tidak ada pekerja dengan status 'Tersedia' atau koneksi bermasalah.
               </Text>
               <TouchableOpacity onPress={fetchWorkers} className="mt-4 bg-emerald-100 px-4 py-2 rounded-full">
                 <Text className="text-emerald-700 font-bold text-xs">Coba Lagi</Text>
               </TouchableOpacity>
            </View>
          ) : (
            <FlatList 
              horizontal
              data={workers}
              renderItem={({ item }) => <WorkerCard worker={item} />}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={{ paddingHorizontal: 24 }}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
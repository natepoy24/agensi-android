import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image'; // <--- KITA PAKAI INI SEKARANG
import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export interface Worker {
  id: number;
  nama: string;
  kategori: string;
  lokasi: string;
  gaji: number;
  fotoUrl: string;
  status: string;
  rating?: string;
}

// Fungsi helper Rupiah
const formatRupiah = (number: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

// Fungsi pembersih URL (jaga-jaga sisa kode Next.js)
function getCleanImageUrl(url: string | null) {
  if (!url) return 'https://via.placeholder.com/150';
  let cleanUrl = url;
  if (url.includes('url=') && url.includes('_next/image')) {
    const match = url.match(/url=([^&]*)/);
    if (match && match[1]) {
      try { cleanUrl = decodeURIComponent(match[1]); } catch (e) {}
    }
  }
  return cleanUrl.trim();
}

export default function WorkerCard({ worker }: { worker: Worker }) {
  const cleanUrl = getCleanImageUrl(worker.fotoUrl);
  
  // Debugging: Pastikan URL masuk ke komponen
  // console.log("Render Gambar:", cleanUrl); 

  return (
    <Link href={`/pekerja/${worker.id}` as any} asChild>
      <TouchableOpacity 
        className="bg-white rounded-xl shadow-sm border border-slate-200 w-48 mr-4 overflow-hidden mb-2"
        activeOpacity={0.7}
      >
        {/* Container Foto */}
        <View className="h-40 w-full bg-slate-200 relative">
          
          {/* KOMPONEN EXPO-IMAGE (Lebih Kuat) */}
          <Image
            source={cleanUrl}
            style={{ width: '100%', height: '100%' }} // Paksa ukuran manual
            contentFit="cover"
            transition={500} // Efek fade-in halus 0.5 detik
            placeholder="L8LE.p~q8^D%-.D%M_Rj00%M%Mxa" // Blurhash sementara (warna abu)
            cachePolicy="memory-disk" // Simpan di memori biar hemat kuota
          />
          
          {/* Badge Status */}
          <View className={`absolute top-2 right-2 px-2 py-1 rounded-full shadow-sm ${
            worker.status === 'Tersedia' ? 'bg-emerald-100' : 'bg-gray-100'
          }`}>
            <Text className={`text-[10px] font-bold ${
              worker.status === 'Tersedia' ? 'text-emerald-700' : 'text-gray-600'
            }`}>
              {worker.status}
            </Text>
          </View>

          {/* Badge Rating */}
          <View className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded-md flex-row items-center">
            <Ionicons name="star" size={10} color="#fbbf24" />
            <Text className="text-white text-[10px] font-bold ml-1">
              {worker.rating || "4.9"}
            </Text>
          </View>
        </View>

        {/* Info Pekerja */}
        <View className="p-3">
          <Text className="text-xs text-emerald-600 font-bold uppercase mb-1">
            {worker.kategori}
          </Text>
          <Text className="text-slate-900 font-bold text-base mb-1" numberOfLines={1}>
            {worker.nama}
          </Text>
          
          <View className="flex-row items-center mb-2">
            <Ionicons name="location-outline" size={12} color="#64748b" />
            <Text className="text-slate-500 text-xs ml-1" numberOfLines={1}>
              {worker.lokasi}
            </Text>
          </View>

          <Text className="text-slate-700 text-xs font-semibold">
            Gaji: <Text className="text-emerald-700">{formatRupiah(worker.gaji)}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}
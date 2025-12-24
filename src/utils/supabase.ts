import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Cek apakah env variable terbaca (untuk debugging awal)
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("⚠️ WARNING: Supabase Key tidak ditemukan! Cek file .env kamu.");
}

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
  auth: {
    storage: AsyncStorage, // Ini bedanya dengan Web! Kita simpan sesi di memori HP.
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
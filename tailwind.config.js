/** @type {import('tailwindcss').Config} */
module.exports = {
  // BAGIAN PENTING: Kita daftarkan semua folder tempat kita menaruh kode
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}" // <--- INI YANG TADI KURANG!
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
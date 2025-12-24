/** @type {import('tailwindcss').Config} */
module.exports = {
  // Baris ini memberitahu Tailwind file mana saja yang boleh pakai styling
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}" 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
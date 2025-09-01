/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",       // Expo Router routes inside app folder
    "./src/components/**/*.{js,jsx,ts,tsx}",// Shared UI components
    "./src/hooks/**/*.{js,jsx,ts,tsx}",      // Custom hooks
    "./src/utils/**/*.{js,jsx,ts,tsx}",      // Utility functions if any
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};

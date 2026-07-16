/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette basata sulla reference Behance
        primary: { DEFAULT: '#FF5722', dark: '#E64A19' }, // Arancio Energetico
        surface: { DEFAULT: '#000000', secondary: '#121212', tertiary: '#262626' },
        text: { primary: '#FFFFFF', secondary: '#A3A3A3', teriary: '#737373' }
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] }
    },
  },
  plugins: [],
}

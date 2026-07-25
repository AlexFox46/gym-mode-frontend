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
        text: { primary: '#FFFFFF', secondary: '#A3A3A3', teriary: '#737373' },
        // Palette Spotter (Azzurro / Ciano Elettrico)
        spotter: {
          DEFAULT: '#00D2FF',
          dark: '#0088A8',
          light: '#E0F8FF',
          surface: '#00232C',
          glow: 'rgba(0, 210, 255, 0.4)'
        }
      },
      boxShadow: {
        'spotter-glow': '0 0 20px rgba(0, 210, 255, 0.35)',
        'spotter-subtle': '0 0 10px rgba(0, 210, 255, 0.15)'
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] }
    },
  },
  plugins: [],
}

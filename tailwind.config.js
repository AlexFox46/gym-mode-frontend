/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette basata sulla reference Behance / GymMode DS
        primary: { DEFAULT: '#FF5722', dark: '#E64A19', light: '#FF8A65' }, // Arancio Energetico
        surface: { DEFAULT: '#0A0A0A', secondary: '#121212', tertiary: '#262626', hover: '#1E1E1E' },
        text: { primary: '#FFFFFF', secondary: '#A3A3A3', tertiary: '#737373', muted: '#525252' },
        // Feedback Semantico
        feedback: {
          success: '#22C55E',
          error: '#EF4444',
          warning: '#F59E0B',
          info: '#3B82F6'
        },
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
        'spotter-subtle': '0 0 10px rgba(0, 210, 255, 0.15)',
        'primary-glow': '0 0 20px rgba(255, 87, 34, 0.35)'
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'], mono: ['JetBrains Mono', 'monospace'] }
    },
  },
  plugins: [],
}

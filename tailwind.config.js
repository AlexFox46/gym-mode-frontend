/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Palette "Athletic" basata sulle tue reference
        primary: {
          DEFAULT: '#CCFF00', // Lime Elettrico
          dark: '#B8E600',
        },
        surface: {
          DEFAULT: '#0A0A0A', // Antracite Profondo
          secondary: '#1A1A1A',
          tertiary: '#262626',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A3A3A3',
          tertiary: '#737373',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}

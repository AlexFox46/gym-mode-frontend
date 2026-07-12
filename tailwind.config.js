/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // Attiva il dark mode tramite classe sul tag html
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          neutral: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#78849e',
            600: '#64748b',
            700: '#475569',
            800: '#334155',
            900: '#1e293b',
            950: '#0f172a',
          },
          success: {
            DEFAULT: '#16a34a', // Verde progressive load
            dark: '#10b981',    // Più brillante in dark mode
            darker: '#15803d',
            pressed: '#109d42',
          },
          warning: '#d97706',
          error: '#dc2626',
          info: '#0284c7',
          focus: '#7c3aed',
        },
        fontFamily: {
          sans: ['Inter', '-apple-system', 'sans-serif'],
          mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
        },
        fontSize: {
          'h1': ['64px', { lineHeight: '76px', fontWeight: '700' }], // Timer Display
          'h2': ['28px', { lineHeight: '36px', fontWeight: '700' }], // Nome Esercizio
          'h3': ['20px', { lineHeight: '28px', fontWeight: '600' }], // Intestazioni Secondarie
        },
        boxShadow: {
          'light-default': '0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)',
          'light-elevated': '0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
          'dark-default': '0 1px 3px rgba(0,0,0,0.3)',
          'dark-elevated': '0 10px 15px rgba(0,0,0,0.4)',
        }
      },
    },
    plugins: [],
  }
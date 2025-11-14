/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta principal
        primary: {
          DEFAULT: '#00AFC4',
          dark: '#008397',
        },
        accent: {
          soft: '#E0F7FA',
        },
        bg: {
          main: '#FFFFFF',
          muted: '#F5F6F8',
        },
        text: {
          primary: '#1E1F24',
          muted: '#6F7783',
        },
        border: {
          soft: '#E1E4EA',
        },
        success: '#18A999',
        warning: '#FFC85A',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'h1': ['42px', { lineHeight: '1.2', fontWeight: '700' }],
        'h1-lg': ['52px', { lineHeight: '1.2', fontWeight: '700' }],
        'h2': ['32px', { lineHeight: '1.3', fontWeight: '600' }],
        'h2-lg': ['36px', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['22px', { lineHeight: '1.4', fontWeight: '600' }],
        'h3-lg': ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label': ['12px', { lineHeight: '1.5', fontWeight: '500', letterSpacing: '0.05em', textTransform: 'uppercase' }],
        'label-lg': ['13px', { lineHeight: '1.5', fontWeight: '500', letterSpacing: '0.05em', textTransform: 'uppercase' }],
      },
      borderRadius: {
        'card': '1rem', // 16px
        'card-lg': '1.5rem', // 24px
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'soft-md': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'soft-lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'neumorphic': '8px 8px 16px rgba(0, 0, 0, 0.1), -8px -8px 16px rgba(255, 255, 255, 0.7)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

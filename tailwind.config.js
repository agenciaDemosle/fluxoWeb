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
          light: '#E0F7FA',
        },
        // Naranja coral para acentos
        coral: {
          DEFAULT: '#FF8A65',
          light: '#FFE5DD',
        },
        // Beige/arena para fondos tipo hogar
        sand: {
          DEFAULT: '#F5F1E8',
          light: '#FAF8F3',
          dark: '#E8E3D6',
        },
        accent: {
          soft: '#E0F7FA',
        },
        bg: {
          main: '#FFFFFF',
          muted: '#F8FAFC',
          subtle: '#F1F5F9',
          warm: '#FAF8F3', // beige muy claro
        },
        text: {
          primary: '#1E1F24',
          muted: '#6F7783',
          light: '#94A3B8',
        },
        border: {
          soft: '#E1E4EA',
          lighter: '#F1F5F9',
        },
        success: '#18A999',
        warning: '#FFC85A',
      },
      fontFamily: {
        sans: ['Work Sans', 'system-ui', 'sans-serif'], // Body text
        heading: ['Urbanist', 'system-ui', 'sans-serif'], // Headings
      },
      fontSize: {
        // Headings - Urbanist con más peso y contraste
        'h1': ['48px', { lineHeight: '1.1', fontWeight: '800', letterSpacing: '-0.02em' }],
        'h1-lg': ['64px', { lineHeight: '1.05', fontWeight: '800', letterSpacing: '-0.03em' }],
        'h2': ['36px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.01em' }],
        'h2-lg': ['42px', { lineHeight: '1.15', fontWeight: '700', letterSpacing: '-0.02em' }],
        'h3': ['24px', { lineHeight: '1.3', fontWeight: '700', letterSpacing: '-0.01em' }],
        'h3-lg': ['28px', { lineHeight: '1.25', fontWeight: '700', letterSpacing: '-0.01em' }],
        'h4': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'h5': ['18px', { lineHeight: '1.4', fontWeight: '600' }],

        // Body text - Work Sans más variado
        'body': ['16px', { lineHeight: '1.7', fontWeight: '400' }],
        'body-lg': ['18px', { lineHeight: '1.7', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.6', fontWeight: '400' }],

        // Labels y textos especiales
        'label': ['12px', { lineHeight: '1.5', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase' }],
        'label-lg': ['13px', { lineHeight: '1.5', fontWeight: '600', letterSpacing: '0.06em', textTransform: 'uppercase' }],

        // Display text - para heros grandes
        'display': ['72px', { lineHeight: '1', fontWeight: '800', letterSpacing: '-0.04em' }],
        'display-sm': ['56px', { lineHeight: '1.05', fontWeight: '800', letterSpacing: '-0.03em' }],
      },
      borderRadius: {
        'card': '1rem', // 16px
        'card-lg': '1.5rem', // 24px
        'organic': '2rem', // 32px - para formas más orgánicas
        'pill': '9999px', // para botones píldora
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

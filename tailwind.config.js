/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ethix: {
          red: {
            DEFAULT: '#DC2626',
            hover: '#B91C1C',
            light: '#FEF2F2',
            dark: '#991B1B',
            accent: '#E63946',
            crimson: '#8A181C',
          },
          ivory: {
            50: '#FDFCFB',
            100: '#FAF8F5',
            200: '#F4EFEA',
            300: '#EDE6DB',
            400: '#E2D8C9',
          },
          charcoal: {
            950: '#08090B',
            900: '#0F1012',
            800: '#181A1E',
            700: '#23262D',
            600: '#343842',
            500: '#4D5360',
            400: '#6E7687',
            300: '#9DA5B4',
            200: '#D5DAE1',
            100: '#EAEFF5',
          },
          brass: {
            DEFAULT: '#C5A059',
            light: '#E2CA96',
            dark: '#987532',
          },
          sandstone: '#E8E2D8',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Cinzel', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'premium': '0 20px 40px -15px rgba(15, 16, 18, 0.07)',
        'elevated': '0 30px 60px -20px rgba(15, 16, 18, 0.12)',
        'glow-red': '0 0 25px rgba(220, 38, 38, 0.20)',
        'glow-dark': '0 0 35px rgba(220, 38, 38, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'marquee': 'marquee 35s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      }
    },
  },
  plugins: [],
}

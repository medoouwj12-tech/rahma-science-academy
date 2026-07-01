/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#000000',
          deep: '#050505',
        },
        obsidian: {
          DEFAULT: '#0D0D0D',
          light: '#141414',
          mid: '#1A1A1A',
        },
        gold: {
          50: '#FBF6E4',
          100: '#F3E5AB',
          200: '#EBD182',
          300: '#E2C364',
          400: '#D4AF37',
          500: '#C39A2A',
          600: '#B8941F',
          700: '#9C7E18',
          800: '#7C6413',
          900: '#5C4A0E',
        },
        ink: {
          900: '#000000',
          800: '#0D0D0D',
          700: '#161616',
          600: '#1F1F1F',
          500: '#2A2A2A',
          400: '#3A3A3A',
        },
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      backgroundImage: {
        'gold-gradient':
          'linear-gradient(135deg, #F3E5AB 0%, #D4AF37 45%, #B8941F 100%)',
        'gold-shine':
          'linear-gradient(110deg, #B8941F 0%, #D4AF37 25%, #F3E5AB 50%, #D4AF37 75%, #B8941F 100%)',
        'obsidian-gradient':
          'radial-gradient(circle at 0% 0%, #1A1A1A 0%, #0D0D0D 40%, #000000 100%)',
        'noise':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'gold-glow':
          '0 0 24px -4px rgba(212,175,55,0.35), 0 0 60px -10px rgba(212,175,55,0.18)',
        'gold-glow-lg':
          '0 0 40px -4px rgba(212,175,55,0.45), 0 0 100px -10px rgba(212,175,55,0.25)',
        'gold-inset':
          'inset 0 1px 0 0 rgba(243,229,171,0.15), inset 0 -1px 0 0 rgba(212,175,55,0.05)',
        'card':
          '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 30px 60px -20px rgba(0,0,0,0.8)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        shimmer: 'shimmer 2.5s linear infinite',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGold: {
          '0%,100%': {
            boxShadow:
              '0 0 0 0 rgba(212,175,55,0.4), 0 0 24px -4px rgba(212,175,55,0.3)',
          },
          '50%': {
            boxShadow:
              '0 0 0 8px rgba(212,175,55,0), 0 0 36px -4px rgba(212,175,55,0.55)',
          },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
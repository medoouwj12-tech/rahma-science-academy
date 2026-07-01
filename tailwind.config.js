/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        white: '#0f172a', // Remap white to slate-900 for automatic text/border contrast in light theme
        black: {
          DEFAULT: '#ffffff',
          deep: '#f8fafc',
        },
        obsidian: {
          DEFAULT: '#ffffff',
          light: '#f8fafc',
          mid: '#e2e8f0',
        },
        gold: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
      backgroundImage: {
        'gold-gradient':
          'linear-gradient(135deg, #EFF6FF 0%, #3B82F6 45%, #1D4ED8 100%)',
        'gold-shine':
          'linear-gradient(110deg, #1D4ED8 0%, #3B82F6 25%, #EFF6FF 50%, #3B82F6 75%, #1D4ED8 100%)',
        'obsidian-gradient':
          'radial-gradient(circle at 0% 0%, #FFFFFF 0%, #F8FAFC 40%, #F1F5F9 100%)',
        'noise':
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.02'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'gold-glow':
          '0 0 24px -4px rgba(37,99,235,0.12), 0 0 60px -10px rgba(37,99,235,0.06)',
        'gold-glow-lg':
          '0 0 40px -4px rgba(37,99,235,0.18), 0 0 100px -10px rgba(37,99,235,0.1)',
        'gold-inset':
          'inset 0 1px 0 0 rgba(255,255,255,0.6), inset 0 -1px 0 0 rgba(37,99,235,0.05)',
        'card':
          '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 10px 15px -3px rgba(0, 0, 0, 0.05)',
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
              '0 0 0 0 rgba(37,99,235,0.2), 0 0 24px -4px rgba(37,99,235,0.15)',
          },
          '50%': {
            boxShadow:
              '0 0 0 8px rgba(37,99,235,0), 0 0 36px -4px rgba(37,99,235,0.3)',
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
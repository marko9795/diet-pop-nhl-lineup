/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Vintage 80's Hockey Palette
        'ice': {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#020617'
        },
        'neon': {
          'blue': '#00BFFF',
          'cyan': '#00FFFF',
          'green': '#39FF14',
          'yellow': '#FFFF00',
          'orange': '#FF8C00',
          'pink': '#FF1493',
          'purple': '#8A2BE2'
        },
        'hockey': {
          'gold': '#FFD700',
          'silver': '#C0C0C0',
          'bronze': '#CD7F32',
          'ice-blue': '#B6E5FF',
          'rink-blue': '#1E3A8A',
          'arena-dark': '#0F0F23'
        },
        'retro': {
          'chrome': '#E5E7EB',
          'steel': '#6B7280',
          'copper': '#B45309',
          'glass': 'rgba(255, 255, 255, 0.1)'
        },
        // Enhanced Brand colors for diet sodas
        'coke-red': '#FF0000',
        'pepsi-blue': '#004B93',
        'sprite-green': '#00AF3F',
        'dr-pepper-maroon': '#722F37',
        'diet-coke-silver': '#C0C0C0',
        'coke-zero-black': '#000000',
        'diet-pepsi-silver': '#B8C5D6',
      },
      fontFamily: {
        'hockey': ['Impact', 'Arial Black', 'sans-serif'],
        'retro': ['Orbitron', 'Exo 2', 'Rajdhani', 'sans-serif'],
        'scoreboard': ['Segment7', 'Monaco', 'Courier New', 'monospace'],
      },
      backgroundImage: {
        'ice-texture': "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 25%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(182,229,255,0.2) 0%, transparent 50%)",
        'ice-gradient': 'linear-gradient(135deg, #F0F8FF 0%, #E6F3FF 25%, #DDEEFF 50%, #D4E9FF 75%, #CCDEFF 100%)',
        'arena-gradient': 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
        'neon-glow': 'radial-gradient(circle, rgba(0,191,255,0.3) 0%, rgba(0,191,255,0.1) 50%, transparent 100%)',
        'chrome-reflection': 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 25%, rgba(0,0,0,0.1) 50%, rgba(255,255,255,0.3) 75%, rgba(255,255,255,0.8) 100%)',
      },
      boxShadow: {
        'neon': '0 0 10px rgba(0,191,255,0.5), 0 0 20px rgba(0,191,255,0.3), 0 0 30px rgba(0,191,255,0.1)',
        'neon-strong': '0 0 15px rgba(0,191,255,0.8), 0 0 30px rgba(0,191,255,0.5), 0 0 45px rgba(0,191,255,0.3)',
        'pop-can': '0 4px 15px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.2)',
        'pop-can-hover': '0 8px 25px rgba(0,0,0,0.4), inset 0 2px 0 rgba(255,255,255,0.6), inset 0 -2px 0 rgba(0,0,0,0.3)',
        'hockey-card': '0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
        'ice-reflect': '0 -4px 8px rgba(182,229,255,0.3)',
        'chrome': 'inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.1)',
      },
      animation: {
        'neon-pulse': 'neon-pulse 2s ease-in-out infinite alternate',
        'ice-shimmer': 'ice-shimmer 3s ease-in-out infinite',
        'pop-float': 'pop-float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-in': 'slide-in 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-in',
      },
      keyframes: {
        'neon-pulse': {
          '0%': {
            textShadow: '0 0 5px rgba(0,191,255,0.5), 0 0 10px rgba(0,191,255,0.3), 0 0 15px rgba(0,191,255,0.1)',
            boxShadow: '0 0 10px rgba(0,191,255,0.3)'
          },
          '100%': {
            textShadow: '0 0 10px rgba(0,191,255,0.8), 0 0 20px rgba(0,191,255,0.5), 0 0 30px rgba(0,191,255,0.3)',
            boxShadow: '0 0 20px rgba(0,191,255,0.5)'
          },
        },
        'ice-shimmer': {
          '0%, 100%': { transform: 'translateX(-5px) scale(1)' },
          '50%': { transform: 'translateX(5px) scale(1.02)' },
        },
        'pop-float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-3px) rotate(1deg)' },
        },
        'glow': {
          '0%': { filter: 'brightness(1) saturate(1)' },
          '100%': { filter: 'brightness(1.1) saturate(1.2)' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      }
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        studio: {
          bg: '#ebf1f6',
          'bg-mid': '#f2f6f9',
          'bg-light': '#ebf0f5',
          text: '#334b57',
          heading: '#45616f',
          editorial: '#5e8896',
          muted: '#647e8b',
          'muted-light': '#859ba6',
        },
        accent: {
          cyan: '#38bdf8',
          azure: '#0284c7',
          sky: '#a5f3fc',
        },
      },
      borderRadius: {
        'studio': '1.5rem',
      },
      animation: {
        'glow-pulse': 'centerGlowPulse 4s ease-in-out infinite',
        'glow-morph': 'centerGlowMorph 8s ease-in-out infinite',
        'float-1': 'centerFloat1 6s ease-in-out infinite',
        'float-2': 'centerFloat2 8s ease-in-out infinite',
        'float-3': 'centerFloat3 7s ease-in-out infinite',
        'center-glow-pulse': 'centerGlowPulse 4s ease-in-out infinite',
        'center-glow-morph': 'centerGlowMorph 8s ease-in-out infinite',
        'center-float-1': 'centerFloat1 6s ease-in-out infinite',
        'center-float-2': 'centerFloat2 8s ease-in-out infinite',
        'center-float-3': 'centerFloat3 7s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        centerGlowPulse: {
          '0%, 100%': { transform: 'scale(0.95)', opacity: '0.75', filter: 'blur(60px)' },
          '50%': { transform: 'scale(1.1)', opacity: '0.95', filter: 'blur(80px)' },
        },
        centerGlowMorph: {
          '0%': { borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' },
          '25%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '75%': { borderRadius: '50% 40% 60% 50% / 30% 70% 40% 60%' },
          '100%': { borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' },
        },
        centerFloat1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -20px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 15px) scale(0.95)' },
        },
        centerFloat2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-25px, 25px) scale(1.05)' },
          '66%': { transform: 'translate(20px, -30px) scale(1.1)' },
        },
        centerFloat3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(15px, 20px) scale(1.08)' },
          '66%': { transform: 'translate(-30px, -10px) scale(0.92)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

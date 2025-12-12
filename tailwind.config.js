export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#E8D619',
        'brand-secondary': '#1EA897',
        'brand-accent': '#FF4A3A',
        'brand-surface': '#F9FAF9',
        'brand-text': '#0A0A0A',
        'brand-error': '#D32F2F',
      },
      fontFamily: {
        sans: ['Inter', 'DM Sans', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'swing': 'swing 2s infinite ease-in-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        swing: {
          '0%, 50%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(15deg)' },
          '75%': { transform: 'rotate(-15deg)' },
        },
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
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
      // Enhanced spacing scale (inspired by Postable but adapted for our design)
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
        '34': '8.5rem',   // 136px
        '38': '9.5rem',   // 152px
        '42': '10.5rem',  // 168px
        '46': '11.5rem',  // 184px
        '50': '12.5rem',  // 200px
      },
      // Enhanced shadow utilities for cards and hover states
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'card-focus': '0 0 0 3px rgba(30, 168, 151, 0.2)',
        'button': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'button-hover': '0 4px 8px rgba(0, 0, 0, 0.15)',
        'dropdown': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'modal': '0 16px 48px rgba(0, 0, 0, 0.2)',
      },
      // Transition utilities for smooth interactions
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      animation: {
        'swing': 'swing 2s infinite ease-in-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
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
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          'from': { opacity: '0', transform: 'translateY(-20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      // Border radius for consistent component styling
      borderRadius: {
        'card': '12px',
        'button': '8px',
      },
      // Max widths for container constraints
      maxWidth: {
        '8xl': '88rem',   // 1408px
        '9xl': '96rem',   // 1536px
      },
    },
  },
  plugins: [],
}
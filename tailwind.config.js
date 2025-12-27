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
      // Typography plugin customization for blog posts
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            fontFamily: theme('fontFamily.sans').join(', '),
            lineHeight: '1.75',
            maxWidth: 'none',

            // Headings - bold, dark, proper spacing
            'h2': {
              color: theme('colors.gray.900'),
              fontWeight: '800',
              fontSize: '1.875rem',
              lineHeight: '1.3',
              marginTop: '2.5rem',
              marginBottom: '1.25rem',
              letterSpacing: '-0.01em',
            },
            'h3': {
              color: theme('colors.gray.900'),
              fontWeight: '700',
              fontSize: '1.5rem',
              lineHeight: '1.4',
              marginTop: '2rem',
              marginBottom: '1rem',
              letterSpacing: '-0.01em',
            },
            'h4': {
              color: theme('colors.gray.900'),
              fontWeight: '600',
              fontSize: '1.25rem',
              lineHeight: '1.5',
              marginTop: '1.75rem',
              marginBottom: '0.75rem',
            },

            // Paragraphs - comfortable spacing
            p: {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
              fontSize: '1.125rem',
              lineHeight: '1.75',
            },

            // Lists - brand-colored markers
            'ul, ol': {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
              paddingLeft: '1.75rem',
            },
            'ul > li, ol > li': {
              position: 'relative',
              paddingLeft: '0.5rem',
              marginTop: '0.75rem',
              marginBottom: '0.75rem',
            },
            'ul > li::marker': {
              color: theme('colors.brand-secondary'),
              fontWeight: '600',
            },
            'ol > li::marker': {
              color: theme('colors.brand-secondary'),
              fontWeight: '600',
            },
            'li > p': {
              marginTop: '0.5rem',
              marginBottom: '0.5rem',
            },

            // Links - brand secondary color
            a: {
              color: theme('colors.brand-secondary'),
              textDecoration: 'underline',
              fontWeight: '600',
              '&:hover': {
                color: theme('colors.brand-secondary'),
                opacity: '0.8',
              },
            },

            // Strong text
            strong: {
              color: theme('colors.gray.900'),
              fontWeight: '700',
            },

            // Tables
            table: {
              width: '100%',
              borderCollapse: 'collapse',
              marginTop: '2rem',
              marginBottom: '2rem',
              fontSize: '1rem',
            },
            'thead': {
              borderBottom: `2px solid ${theme('colors.gray.300')}`,
            },
            'thead th': {
              padding: '0.75rem',
              textAlign: 'left',
              fontWeight: '700',
              color: theme('colors.gray.900'),
              backgroundColor: theme('colors.gray.100'),
            },
            'tbody tr': {
              borderBottom: `1px solid ${theme('colors.gray.200')}`,
            },
            'tbody td': {
              padding: '0.75rem',
              verticalAlign: 'top',
            },
            'tbody tr:last-child': {
              borderBottom: 'none',
            },
            'tbody tr:last-child td': {
              fontWeight: '700',
            },

            // Code blocks
            code: {
              color: theme('colors.brand-secondary'),
              fontFamily: theme('fontFamily.mono').join(', '),
              fontSize: '0.875em',
              fontWeight: '600',
              backgroundColor: theme('colors.gray.100'),
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: theme('colors.gray.900'),
              color: theme('colors.gray.100'),
              fontSize: '0.875rem',
              lineHeight: '1.7',
              marginTop: '1.75rem',
              marginBottom: '1.75rem',
              borderRadius: '0.5rem',
              padding: '1.25rem',
              overflowX: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              fontSize: 'inherit',
              fontWeight: '400',
              padding: '0',
            },

            // Blockquotes
            blockquote: {
              fontStyle: 'italic',
              color: theme('colors.gray.700'),
              borderLeftWidth: '4px',
              borderLeftColor: theme('colors.brand-secondary'),
              paddingLeft: '1.5rem',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
          },
        },

        // Large prose variant (prose-lg)
        lg: {
          css: {
            fontSize: '1.125rem',
            lineHeight: '1.75',
            p: {
              fontSize: '1.125rem',
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            },
            h2: {
              fontSize: '2rem',
              marginTop: '3rem',
              marginBottom: '1.5rem',
            },
            h3: {
              fontSize: '1.625rem',
              marginTop: '2.5rem',
              marginBottom: '1.25rem',
            },
            h4: {
              fontSize: '1.375rem',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            'ul, ol': {
              marginTop: '1.5rem',
              marginBottom: '1.5rem',
            },
            'li': {
              marginTop: '0.875rem',
              marginBottom: '0.875rem',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
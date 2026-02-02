import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './storyblok/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      // AGT Brand Colors
      colors: {
        primary: {
          DEFAULT: '#265BF6',
          hover: '#1A3CCF',
          light: '#5F7DF0',
        },
        secondary: '#040B2F',
        text: {
          DEFAULT: '#00000E',
          muted: '#898989',
          light: '#666666',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          alt: '#F5F5F5',
          dark: '#181A1B',
          darker: '#1C1E20',
          deep: '#05161F',
        },
        border: {
          DEFAULT: '#D2D2D2',
          light: '#E7E7E7',
        },
        success: '#51DA4C',
        warning: '#FF6D00',
        error: '#FF4500',
        accent: {
          green: '#84BD39',
          orange: '#FF7A00',
          blue: '#91C0DC',
        },
      },

      // AGT Typography
      fontFamily: {
        sans: ['"TT Hoves Pro"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Desktop sizes (can be overridden with responsive variants)
        'display-1': ['220px', { lineHeight: '200px', letterSpacing: '-0.02em' }],
        'display-2': ['120px', { lineHeight: '120px', letterSpacing: '-1px' }],
        'display-3': ['96px', { lineHeight: '96px', letterSpacing: '-1px' }],
        'display-4': ['64px', { lineHeight: '70px', letterSpacing: '-1px' }],
        'display-5': ['48px', { lineHeight: '57.6px', letterSpacing: '-1px' }],
        'display-6': ['42px', { lineHeight: '50px', letterSpacing: '-1px' }],
        'body-lg': ['24px', { lineHeight: '29px', letterSpacing: '-0.5px' }],
        'body': ['21px', { lineHeight: '27px', letterSpacing: '-0.5px' }],
        'body-sm': ['16px', { lineHeight: '21px' }],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
      },

      // Layout
      maxWidth: {
        container: '1140px',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
} satisfies Config

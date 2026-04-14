import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        lavender: {
          50:  '#f5f0ff',
          100: '#ede5ff',
          200: '#dcceff',
          300: '#c4aaff',
          400: '#a87fff',
          500: '#8B6FBB',
          600: '#7a5ba6',
          700: '#6b4a94',
        },
        mint: {
          300: '#8fd8d2',
          400: '#6BBFB5',
          500: '#5aafa5',
          600: '#4a9b91',
        },
        cream: '#FAFAF7',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'var(--font-pretendard)', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'lavender-sm': '0 2px 12px 0 rgba(139,111,187,0.12)',
        'lavender-md': '0 4px 24px 0 rgba(139,111,187,0.18)',
        'lavender-lg': '0 8px 40px 0 rgba(139,111,187,0.22)',
        'mint-glow':   '0 4px 24px 0 rgba(107,191,181,0.18)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #8B6FBB 0%, #6BBFB5 100%)',
        'gradient-brand-soft': 'linear-gradient(135deg, #c4aaff 0%, #8fd8d2 100%)',
        'gradient-card': 'linear-gradient(160deg, #ffffff 0%, #f5f0ff 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'fade-up': 'fadeUp 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-12px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0.7' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#FFFFFF',
          secondary: '#F8FAFC',
          tertiary: '#E2E8F0',
          card: 'rgba(255, 255, 255, 0.85)',
          hover: '#F1F5F9',
        },
        primary: {
          DEFAULT: '#6366F1',
          hover: '#4F46E5',
          light: '#818CF8',
          glow: 'rgba(99, 102, 241, 0.35)',
        },
        accent: {
          DEFAULT: '#22D3EE',
          hover: '#06B6D4',
          light: '#67E8F9',
          glow: 'rgba(34, 211, 238, 0.35)',
        },
        text: {
          main: '#1E293B',
          muted: '#64748B',
          dark: '#94A3B8',
        },
        border: {
          DEFAULT: 'rgba(148, 163, 184, 0.25)',
          light: 'rgba(148, 163, 184, 0.35)',
          glow: 'rgba(99, 102, 241, 0.4)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 25px -3px rgba(99, 102, 241, 0.45)',
        'glow-accent': '0 0 25px -3px rgba(34, 211, 238, 0.45)',
        'glow-subtle': '0 0 15px -2px rgba(99, 102, 241, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 30%, rgba(99, 102, 241, 0.08) 0%, rgba(34, 211, 238, 0.06) 50%, transparent 70%)',
        'tech-card': 'linear-gradient(135deg, rgba(99, 102, 241, 0.03) 0%, rgba(34, 211, 238, 0.02) 100%)',
        'cyber-grid': 'radial-gradient(rgba(99, 102, 241, 0.15) 1px, transparent 1px)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        glowPulse: {
          '0%': { opacity: '0.4' },
          '100%': { opacity: '0.85' },
        },
      },
    },
  },
  plugins: [],
};

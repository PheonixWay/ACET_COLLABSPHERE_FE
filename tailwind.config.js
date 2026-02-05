/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html','./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: { sidebar: '#f3f4f6' },
      boxShadow: { card: '0 2px 14px rgba(0,0,0,0.06)' },
      keyframes: {
        spinSlow: { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
        pulseDots: { '0%,100%': { transform: 'scale(1)', opacity: '0.6' }, '50%': { transform: 'scale(1.3)', opacity: '1' } },
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } }
      },
      animation: {
        spinSlow: 'spinSlow 5s linear infinite',
        pulseDots: 'pulseDots 1.2s ease-in-out infinite',
        fadeIn: 'fadeIn .6s ease both'
      }
    },
    fontSize: {
      sm: ['0.95rem', '1.4rem'],
      base: ['1.05rem', '1.65rem'],
      lg: ['1.25rem', '1.75rem'],
      xl: ['1.5rem', '2rem'],
      '2xl': ['1.75rem', '2.2rem']
    }
  },
  plugins: [],
}

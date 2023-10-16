/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        azulfondo: '#0f2949',
        gris: '#d8d9db',
        'gris-oscuro': '#202123',
        negro: '#202123',
        info: '#2971e6',
        icons: '#aaaaaa',
        verde: '#72bb53'
      },

      fontSize: {
        tab: '18px',
        button: '24px'
      },

      animation: {
        appear: 'appear .14s ease-in',
        fade: 'fade .14s ease-in'
      },
      keyframes: {
        appear: { from: { opacity: 0 }, to: { opacity: 1 } },
        fade: { from: { opacity: 0, transform: 'translateY(3px)' }, to: { opacity: 1, transform: 'none' } }
      }
    }
  },
  plugins: []
}

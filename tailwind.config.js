/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Poppins: 'Poppins',
      },
      colors: {
        primary: '#009FE3',
        secondary: '#F5F5F5',
        textcol: '#726E6E',
      },
      animation: {
        slide: 'slide 25s linear infinite',
        'bg-gradient': 'bg-gradient 15s ease infinite',
      },
      keyframes: {
        slide: {
          '0%, 100%': { transform: 'translateX(5%)' },
          '50%': { transform: 'translateX(-120%)' },
        },
        'bg-gradient': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
    screens: {
      xs: '480px',
      sm: '768px',
      md: '1060px',
      '2xl': { max: '1535px' },
      xl: { max: '1279px' },
      lg: { max: '1023px' },
      sm: { max: '639px' },
      xs: { max: '414px' },
    },
    variants: {
      extend: {
        padding: ['hover', 'focus'],
      },
    },
  },
  plugins: [],
}

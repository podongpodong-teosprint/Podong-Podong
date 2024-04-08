/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        small: '12px',
        basic: '16px',
        title: '48px',
        'sub-title': '24px',
      },
    },
    colors: {
      purple: '#DCBFFF',
      'purple-hover': '#D0A2F7',
      'modal-bg-color': '#F1EAFF',
      gray: '#EEEEEE',
      white: '#ffffff',
      green: '#A4E5A7',
      'green-hover': '#6FCB73',
    },
  },
  plugins: [
    require('daisyui'),
    function ({ addUtilities }) {
      addUtilities({
        '.no-scrollbar::--webkit-scrollbar': {
          display: 'none',
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
      });
    },
  ],
};

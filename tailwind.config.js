/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      purple: '#DCBFFF',
      'purple-hover': '#D0A2F7',
      'modal-bg-color': '#F1EAFF',
      gray: '#EEEEEE',
      white: '#ffffff',
      green: '#A4E5A7',
      'green-hover': '#6FCB73',
    },
    fontSize: {
      small: '12px',
      basic: '16px',
      title: '48px',
      'sub-title': '24px',
    },
  },
  plugins: [require('daisyui')],
};

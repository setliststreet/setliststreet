/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: '#333333',
        darkGray: '#1f1f1f',
        borderGray: '#dcdcdc',
        focusBlue: '#3b82f6',
        gray: '#6b7280',
        white: '#ffffff',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.06)',
        btn: '0 2px 6px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
};

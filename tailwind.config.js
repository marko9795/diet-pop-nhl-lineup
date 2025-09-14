/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors for diet sodas
        'coke-red': '#FF0000',
        'pepsi-blue': '#004B93',
        'sprite-green': '#00AF3F',
        'dr-pepper-maroon': '#722F37',
        'diet-coke-silver': '#C0C0C0',
        'coke-zero-black': '#000000',
        'diet-pepsi-silver': '#B8C5D6',
      },
      fontFamily: {
        'hockey': ['Impact', 'Arial Black', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
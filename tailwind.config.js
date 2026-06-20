/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#01289F", // Logo blue
        secondary: "#011A6B", // Darker blue
        accent: "#0047FF", // Vibrant blue for accents
        light: "#F4F7FC"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

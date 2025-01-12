/** @type {import('tailwindcss/types/index.js').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#158affb5",
        "secondary-color": "#000",
        "bg-dark": "#000",
        "bg-white": "#ddddddcc",
      },
    },
  },
  plugins: [],
}

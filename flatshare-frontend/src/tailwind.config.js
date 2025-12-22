export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef7ff", 200: "#9fd0ff", 400: "#3fa6ff", 600: "#0077ff", 800: "#0049a6"
        }
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(1200px 600px at 10% 10%, #c7e5ff 0%, transparent 60%), radial-gradient(1200px 600px at 90% 20%, #ffd6f2 0%, transparent 60%)'
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.12)",
      }
    }
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

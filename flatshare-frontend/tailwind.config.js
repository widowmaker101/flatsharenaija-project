export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brandBlue: "#2563eb",
        brandPeach: "#f59e0b",
        brandGray: "#1f2937",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(to right, #2563eb, #f59e0b)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',    // main primary
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        secondary: {
          500: '#ec4899',    // vivid pink accent
          600: '#db2777',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error:   '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#6366f1",
          "primary-focus": "#4f46e5",
          "primary-content": "#ffffff",

          secondary: "#ec4899",
          "secondary-focus": "#db2777",
          "secondary-content": "#ffffff",

          accent: "#37cdbe",
          neutral: "#1f2937",
          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#f1f5f9",
          "base-content": "#0f172a",

          info: "#0ea5e9",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
      {
        dark: {
          primary: "#818cf8",
          "primary-focus": "#6366f1",
          "primary-content": "#ffffff",

          secondary: "#f472b6",
          "secondary-focus": "#ec4899",
          "secondary-content": "#0f172a",

          accent: "#2dd4bf",
          neutral: "#111827",
          "base-100": "#0f172a",
          "base-200": "#1e293b",
          "base-300": "#334155",
          "base-content": "#f1f5f9",

          info: "#38bdf8",
          success: "#34d399",
          warning: "#fbbf24",
          error: "#f87171",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

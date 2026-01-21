const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // adjust if your dev server runs on another port
    supportFile: false,
  },
});

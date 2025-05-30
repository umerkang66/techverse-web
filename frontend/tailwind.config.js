/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00ffff",
        secondary: "#ff00ff",
        dark: "#0f0f1a",
        darker: "#0a0a12",
        light: "#f0f0f0",
      },
    },
  },
  plugins: [],
};
// This Tailwind CSS configuration file sets up custom colors for a project.

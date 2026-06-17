/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#202A36",
          dark: "#141B23",
          light: "#2C3A4B",
        },
        secondary: {
          DEFAULT: "#374151",
          dark: "#1F2937",
          light: "#4B5563",
        },
        accent: {
          DEFAULT: "#D4AF37", // Premium Gold
          dark: "#AA8C2C",
          light: "#E5C158",
        },
        bgLight: "#F9FAFB",
        textDark: "#111827",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      boxShadow: {
        premium: "0 10px 30px -10px rgba(32, 42, 54, 0.08)",
        gold: "0 10px 30px -10px rgba(212, 175, 55, 0.15)",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.04)",
      },
    },
  },
  plugins: [],
};

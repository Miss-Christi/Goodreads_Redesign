import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4C5059", // Deep Charcoal
          dark: "#363a42",
          light: "#878C8C",   // Muted Grey
        },
        accent: {
          DEFAULT: "#F29727", // Vibrant Orange
          hover: "#D95407",   // Darker Orange
        },
        teal: {
          DEFAULT: "#008080", // Contrast Teal
          light: "#00a6a6",
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
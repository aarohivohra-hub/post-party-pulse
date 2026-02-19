import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        partiful: {
          bg: "#0D0D0F",
          "bg-elevated": "#161618",
          card: "#1C1C1F",
          "card-hover": "#242428",
          border: "#2D2D32",
          "text-primary": "#FAFAFA",
          "text-secondary": "#A1A1A6",
          "text-muted": "#6E6E73",
          accent: "#A855F7",
          "accent-soft": "rgba(168, 85, 247, 0.15)",
          gradient: "linear-gradient(135deg, #A855F7 0%, #EC4899 100%)",
        },
        pulse: {
          "purple-deep": "#4A3B6B",
          "purple-mid": "#6B5B8A",
          lavender: "#E8E0F0",
          "lavender-light": "#F5F0FA",
          "lavender-pastel": "#C9B8E0",
          gold: "#E8C547",
          "gray-text": "#2D2A33",
          "gray-muted": "#6B6575",
          "page-bg": "#F8F6FA",
        },
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "SF Pro", "SF Pro Text", "SF Pro Display", "system-ui", "sans-serif"],
        display: ["-apple-system", "BlinkMacSystemFont", "SF Pro", "SF Pro Display", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

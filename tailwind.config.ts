import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-hover": "rgb(var(--surface-hover) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-hover": "rgb(var(--accent-hover) / <alpha-value>)",
        "accent-foreground": "rgb(var(--accent-foreground) / <alpha-value>)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      keyframes: {
        "smoke-1": {
          "0%, 100%": {
            transform: "translate(0%, 0%) scale(1) rotate(0deg)",
            borderRadius: "62% 38% 54% 46% / 52% 58% 42% 48%",
            opacity: "0.55",
          },
          "33%": {
            transform: "translate(14%, -16%) scale(1.3) rotate(55deg)",
            borderRadius: "42% 58% 36% 64% / 64% 40% 60% 36%",
            opacity: "0.85",
          },
          "66%": {
            transform: "translate(-12%, 12%) scale(0.82) rotate(-40deg)",
            borderRadius: "56% 44% 64% 36% / 38% 60% 40% 62%",
            opacity: "0.45",
          },
        },
        "smoke-2": {
          "0%, 100%": {
            transform: "translate(0%, 0%) scale(1.08) rotate(0deg)",
            borderRadius: "48% 52% 40% 60% / 58% 42% 58% 42%",
            opacity: "0.5",
          },
          "40%": {
            transform: "translate(-16%, 14%) scale(0.85) rotate(-60deg)",
            borderRadius: "62% 38% 58% 42% / 40% 62% 38% 60%",
            opacity: "0.8",
          },
          "70%": {
            transform: "translate(10%, -14%) scale(1.25) rotate(35deg)",
            borderRadius: "36% 64% 46% 54% / 56% 36% 64% 44%",
            opacity: "0.6",
          },
        },
        "smoke-3": {
          "0%, 100%": {
            transform: "translate(0%, 0%) scale(0.92) rotate(0deg)",
            borderRadius: "54% 46% 58% 42% / 44% 54% 46% 56%",
            opacity: "0.42",
          },
          "50%": {
            transform: "translate(16%, 16%) scale(1.3) rotate(70deg)",
            borderRadius: "40% 60% 44% 56% / 60% 44% 56% 40%",
            opacity: "0.75",
          },
        },
      },
      animation: {
        "smoke-1": "smoke-1 16s ease-in-out infinite",
        "smoke-2": "smoke-2 21s ease-in-out infinite",
        "smoke-3": "smoke-3 26s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;

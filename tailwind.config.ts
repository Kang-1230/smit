import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      colors: {
        "primary-900": "#331C08",
        "primary-800": "#4d290c",
        "primary-700": "#663710",
        "primary-600": "#804514",
        "primary-500": "#995319",
        "primary-400": "#B2611D",
        "primary-300": "#CC6E21",
        "primary-200": "#E57C25",
        "primary-100": "#F28327",
        "primary-50": "#FF9945",
        "primary-35": "#FFB980",
        "primary-20": "#FFD5B2",
        "primary-5": "#FFF1E5",
        "secondary-900": "#1E1E1E",
        "secondary-800": "#333333",
        "secondary-700": "#4D4D4D",
        "secondary-600": "#666666",
        "secondary-500": "#808080",
        "secondary-400": "#999999",
        "secondary-300": "#B3B3B3",
        "secondary-200": "#CCCCCC",
        "secondary-100": "#E6E6E6",
        "secondary-50": "#F2F2F2",
        "tertiary-900": "#100C09",
        "tertiary-800": "#31251C",
        "tertiary-700": "#523D2E",
        "tertiary-600": "#725640",
        "tertiary-500": "#936E53",
        "tertiary-400": "#AC886C",
        "tertiary-300": "#BFA28D",
        "tertiary-200": "#D1BDAD",
        "tertiary-100": "#E3D7CE",
        "tertiary-75": "#EDE4DE",
        "tertiary-50": "#F6F2EF",
        "c-background": "#F6F6F4",
        "success-blue": "#0073cb",
        "alarm-red": "#f43434",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "8": "8px",
        "12": "12px",
        "16": "16px",
        "20": "20px",
        "24": "24px",
      },
    },
    keyframes: {
      slideUp: {
        "0%": { transform: "translateY(100%)", opacity: "0" },
        "100%": { transform: "translateY(0)", opacity: "1" },
      },
    },
    animation: {
      "slide-up": "slideUp 0.3s ease-in-out",
    },
  },
  plugins: [animate],
};
export default config;

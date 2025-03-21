import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--background)",
        secondBg: "var(--second-background)",
        sidebarbg: "var(--sidebar-background)",
        mainColor: "var(--main-color)",
        textColor: "var(--text-color)",
        titleColor: "var(--title-color)",
        grayColorBg: "var(--gray-color-bg)",
        grayColorText: "var(--gray-color-text)",
      },
      fontFamily: {
        noto: "var(--noto-sans-display)",
        inter: "var(--font-inter)",
      },
    },
  },
  plugins: [],
} satisfies Config;

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
        // memo: "#FF9400",
        "clr-0": "#FFFFFF",
        "clr-1": "#FF9400",
        "clr-2": "#FBA42D",
        "clr-3": "#FBBE2C",
        "clr-4": "#3D3D3D",
        "clr-5": "#727272",
        "clr-6": "#EAE1DF",
        "clr-7": "#BFD5E2",
        "clr-8": "#DE8209",
        "clr-9": "#BD7112",
        "clr-10": "#9D601B",
        "clr-11": "#f1faee",
        "clr-12": "rgb(241, 245, 248)",
        "clr-13": "rgb(16, 42, 66)",
        "clr-14": "rgb(250, 250, 250)",
        "clr-15": "rgb(136, 136, 136)",
        "clr-16": "rgb(23, 23, 23)",
        "clr-17": "rgb(102, 102, 102)",
        "clr-18": "rgb(218, 47, 53)",
        "clr-19": "rgb(174, 41, 47)",
        "clr-20": "rgb(255, 240, 240)",
        "clr-x": "rgba(0, 0, 0, 0.25)",
        "clr-y": "rgba(0, 0, 0, 0.5)",
      },
      screens: {
        sm: "600px",
        md: "800px",
        lg: "960px",
      },
    },
  },
  plugins: [],
};
export default config;

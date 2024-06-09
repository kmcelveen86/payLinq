import { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        paylinqGreen: {
          DEFAULT: "#15803D",
        },
        neutral: {
          50: "#F7F7F7",
          100: "#f4f4f6",
          200: "#e6e5e8",
          300: "#d4d3d8",
          400: "#a2a2a7",
          500: "#727178",
          600: "#53525a",
          700: "#403f48",
          800: "#27262f",
          900: "#181720",
        },
        blue: {
          DEFAULT: "#a3e3ef",
          50: "#effdff",
          100: "#cbf2f8",
          200: "#a3e3ef",
          300: "#71daef",
          400: "#42c7e7",
          500: "#30adcf",
          600: "#268baf",
          700: "#1f7090",
          800: "#1d5c76",
          900: "#1b4d65",
        },
        cyan: {
          DEFAULT: "#8de8f2",
          50: "#ecfefe",
          100: "#d4fbfd",
          200: "#b4f4f9",
          300: "#8de8f2",
          400: "#5fd3e5",
          500: "#44b6cc",
          600: "#2e92ac",
          700: "#1f758c",
          800: "#195e73",
          900: "#144e62",
        },
        tiffany: {
          DEFAULT: "#84d8f8",
          50: "#f0f9fe",
          100: "#e1f4fe",
          200: "#bdeafc",
          300: "#84d8f8",
          400: "#3ec2f1",
          500: "#03aae2",
          600: "#0088bf",
          700: "#006c9a",
          800: "#005b80",
          900: "#004b6c",
        },
        turquoise: {
          DEFAULT: "#5bbed2",
          50: "#ecfefe",
          100: "#d4fdff",
          200: "#b2f8fe",
          300: "#86eef9",
          400: "#65daec",
          500: "#5bbed2",
          600: "#3e96af",
          700: "#29778e",
          800: "#1d6073",
          900: "#144e62",
        },
      },
      screens: {
        xs: "0px",
        sm: "375px",
        // => @media (min-width: 375px) { ... }

        md: "720px",
        // => @media (min-width: 720px) { ... }

        lg: "1140px",
        // => @media (min-width: 1140px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }
      },
    },
  },
  plugins: [
    function ({
      addUtilities,
      theme,
    }: {
      addUtilities: Function;
      theme: Function;
    }) {
      const screens = theme("screens");
      const newUtilities = {
        ".text-responsive": {
          fontSize: "1rem",
          [`@media (min-width: ${screens.sm})`]: {
            fontSize: "1.5rem",
          },
          [`@media (min-width: ${screens.md})`]: {
            fontSize: "2rem",
          },
          [`@media (min-width: ${screens.lg})`]: {
            fontSize: "2.5rem",
          },
          [`@media (min-width: ${screens.xl})`]: {
            fontSize: "3rem",
          },
        },
      };

      addUtilities(newUtilities, ["responsive"]);
    },
  ],
};
export default config;

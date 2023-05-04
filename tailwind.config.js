/** @type {import('tailwindcss').Config} */

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

module.exports = {
   darkMode: "class",
   purge: {
      safelist: [
         ...labelsClasses.map((lbl) => `bg-${lbl}-500`),
         ...labelsClasses.map((lbl) => `bg-${lbl}-200`),
         ...labelsClasses.map((lbl) => `text-${lbl}-400`),
      ],
   },
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
      "./src/app/**/*.{js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {
         fontFamily: {
            // sans: ["Open Sans"],
         },
         gridTemplateColumns: {
            "1/5": "1fr 5fr",
         },
         backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
         },
      },
   },
   variants: {
      extend: {},
   },
   plugins: [require("@tailwindcss/forms")],
};

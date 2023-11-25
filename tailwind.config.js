/** @type {import('tailwindcss').Config} */

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

module.exports = {
   darkMode: "class",
   safelist: [...labelsClasses.map((lbl) => `bg-${lbl}-500`), ...labelsClasses.map((lbl) => `bg-${lbl}-200`), ...labelsClasses.map((lbl) => `text-${lbl}-400`)],
   content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}", "./src/app/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         gridTemplateColumns: {
            "1/5": "1fr 5fr",
         },
      },
   },
   variants: {
      extend: {},
   },
   plugins: [require("@tailwindcss/forms")],
};

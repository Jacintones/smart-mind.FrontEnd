/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "/Login.jsx",
    "./src/**/*.{js,ts,jsx,tsx}", 
    "./app/**/*.{js,ts,jsx,tsx}", 
    "./pages/**/*.{js,ts,jsx,tsx}", 
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'custom-1': '#10002B',
        'custom-2': '#240046',
        'custom-3': '#3C096C',
        'custom-4': '#5A189A',
        'custom-5': '#7B2CBF',
        'custom-6': '#9D4EDD',
        'custom-7': '#C77DFF',
        'custom-8': '#E0AAFF',
        'custom-9': '#04AA6D',
        'custom-10' : '#353535',
        'custom-11' : '#0b005e'
      },
    },
  },
  plugins: [],
};

const defaultTheme = require("tailwindcss/defaultTheme");

export const darkMode = "class";
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
]
export const plugins = [require("daisyui")];
export const daisyui = {
  styled: true,
  themes: false,
  base: true,
  utils: true,
  logs: true,
  rtl: false,
  darkTheme: false,
};
export const theme = {
  extend: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },

    backgroundImage: {
      "login-bg": "url('../public/login-bg.jpg')",
    },
    
    boxShadow: {
      'md': '17px 0px 36px 0px rgba(0,0,0,0.08)',
      'lg': '17px 0px 36px -8px rgba(0,0,0,0.08)',
    },
  },
};

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     fontFamily: {
//       'sans': ['Roboto', ...defaultTheme.fontFamily.sans],
//     },
//     extend: {
//       backgroundImage: {
//         "login-bg": "url('../public/login-bg.jpg')",
//       },
//     },
//   },
//   plugins: [require("daisyui"), require("tailwindcss")],
// };

const defaultTheme = require('tailwindcss/defaultTheme')


export const darkMode = 'class'
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
]
export const plugins = [
  require("daisyui"),
]
export const daisyui = {
  styled: true,
  themes: false,
  base: true,
  utils: true,
  logs: true,
  rtl: false,
  darkTheme: false,
}
export const theme = {
  extend: {
    fontFamily: {
      'sans': ['Roboto'],
    },
    backgroundImage: {
      'login-bg': "url('../public/login-bg.jpg')"
    },
  },
}
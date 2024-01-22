module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',

  ],

  plugins: [
      require('flowbite/plugin')
  ],

  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    darkTheme: false,
  },

  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('../public/login-bg.webp')"
      }
    }
  }

}


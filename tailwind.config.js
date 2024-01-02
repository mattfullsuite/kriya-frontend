// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}"
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [require("daisyui")],
//   daisyui: {
//     themes: false,
//     styled: true,
//     themes: false,
//     base: true,
//     utils: true,
//     logs: true,
//     rtl: false,
//   },
// }

module.exports = {
  // content: [
  //   // 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  //       "./src/**/*.{js,jsx,ts,tsx}"
      
  //     ],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',

  ],

  plugins: [
      require('flowbite/plugin')
  ],

  plugins: [require("daisyui")],
  daisyui: {
    themes: false,
    styled: true,
    themes: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },

}


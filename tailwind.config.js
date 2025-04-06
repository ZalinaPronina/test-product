const path = require('path');

module.exports = {
  content: [
    path.resolve(__dirname, './src/**/*.{js,scss}'),
    path.resolve(__dirname, './sections/**/*.liquid'),
    path.resolve(__dirname, './snippets/**/*.liquid'),
  ],
  theme: {
    extend: {
      fontFamily: {
        "franklin-gothic-sans": ["Franklin Gothic ATF", "sans-serif"],
      },
      colors: {
        'regal-red': '#FF0000',
      },
      fontSize: {
      }
    },
  },
  plugins: [],
}

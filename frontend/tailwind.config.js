module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'apple-bg': '#f5f5f7',
        'apple-text': '#1d1d1f',
        'apple-gray': '#86868b',
        'apple-blue': '#0071e3'
      },
      fontFamily: {
        apple: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'sans-serif']
      }
    }
  },
  plugins: []
}

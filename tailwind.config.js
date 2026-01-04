/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // CampConnect Brand Colors
        trustBlue: '#0078D4',
        sustainGreen: '#107C10',
        alertAmber: '#F7630C',
        criticalRed: '#D13438',
        // Agent Identity Colors
        agent: {
          supply: '#004E8C',
          vendor: '#CA5010',
          sustain: '#498205',
          cultural: '#8764B8',
          economic: '#038387',
          orchestrator: '#C19C00'
        }
      },
      fontFamily: {
        sans: ['Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
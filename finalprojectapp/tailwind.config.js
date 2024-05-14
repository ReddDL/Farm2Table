/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js, jsx, ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'midnight-green': "#1B4650",
        'tea-green': "#DCFEBC",
        'eggshell': "#EDEBD6",
        'oxford-blue': "#141427",
        'gunmetal': "#0F2D2D",
        'periwinkle': "#C2B7ED",
        'orchid-pink': '#F4B8D1',
        'alabaster': "#F4F3E8",
        'space-cadet': "#1A1A31"
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none"
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        }
      };
      addUtilities(newUtilities)
    }
  ],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pagebg: '#E4EDD4',
        surface: '#FFFFFF',
        subtlebg: '#F6F8EF',
        bordercol: '#D1D5DB',
        brand: {
          500: '#1E8A52',
          600: '#0F5C33',
          700: '#0A3D22',
          teal: '#0D6E6E',
        },
        txt: {
          primary: '#111827',
          muted: '#4B5563',
        },
        status: {
          success: '#16A34A',
          error: '#DC2626',
          warning: '#C99A2E',
        }
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        zinc: {
          50: '#fafafa',
          100: '#f4f4f5',
          150: '#ececee',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        }
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
        'card': '0 4px 6px -1px rgb(0 0 0 / 0.04), 0 2px 4px -2px rgb(0 0 0 / 0.04)',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#18181b",
          "primary-content": "#ffffff",
          "secondary": "#71717a",
          "secondary-content": "#ffffff",
          "accent": "#3f3f46",
          "neutral": "#27272a",
          "base-100": "#ffffff",
          "base-200": "#fafafa",
          "base-300": "#f4f4f5",
          "base-content": "#18181b",
          "info": "#3b82f6",
          "success": "#22c55e",
          "warning": "#f59e0b",
          "error": "#ef4444",
        }
      }
    ],
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: false,
  }
}

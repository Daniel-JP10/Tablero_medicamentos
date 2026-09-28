/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta pensada para contar una historia de salud, no solo para decorar.
        // Azul profundo: la EPS y la confianza institucional.
        // Verde salud: lo que va bien, lo controlado, lo crónico bajo control.
        // Ámbar: la alerta suave, lo que sube y hay que vigilar, como el costo antidiabético.
        // Coral: el gasto que duele, el pico de costo, lo urgente.
        eps: {
          950: "#071739",
          900: "#0b2559",
          800: "#123a7d",
          700: "#1c52a8",
          600: "#2f6fd1",
          400: "#7fa8e8",
          200: "#c9dcf6",
          50: "#f4f8fd",
        },
        salud: {
          700: "#0d6e4f",
          500: "#16a06e",
          300: "#7bd6ac",
        },
        alerta: {
          700: "#b6790a",
          500: "#e8a020",
          300: "#f6cd7f",
        },
        urgencia: {
          700: "#b93b3b",
          500: "#e0554f",
          300: "#f2a49f",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};

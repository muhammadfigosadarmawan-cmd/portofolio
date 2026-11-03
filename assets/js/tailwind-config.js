// Konfigurasi Tailwind — harus dimuat SETELAH cdn.tailwindcss.com
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        neon: "#9565ff",
        cyan: "#25d9ff",
        night: "#080b18",
      },
    },
  },
};
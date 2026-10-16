/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         // 🎨 Animaciones personalizadas opcionales
         animation: {
            "fade-in": "fadeIn 1s ease-in-out",
            "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite"
         },
         keyframes: {
            fadeIn: {
               "0%": { opacity: 0 },
               "100%": { opacity: 1 }
            }
         }
      }
   },
   plugins: [],
   important: true // 💥 Aplica !important globalmente a todas las clases
};

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "viat-text": "#0D0E10",
                "viat-bg": "#516778",
                "viat-primary": "#8198C6",
                "viat-secondary": "#A9B5CC",
                "viat-accent": "#155eef",
                "viat-wh": "#FFFFFF",
                "viat-back": "#f6f6f7",
            },
            fontFamily: {
                "viat-title": ["Inter", "sans-serif"],
                "viat-body": ["Inter", "sans-serif"],
                "viat-small": ["Montserrat", "sans-serif"]
            },
            fontSize: {
                "viat-size-title": "12px",
                "viat-size-body": "16px",
                "viat-size-small": "12px"
            },
            backgroundImage: {
                "viat-primary-shade":
                    "linear-gradient(to right, #2D3648 0%, #6D82AE 100%)"
            }
        }
    },
    plugins: []
}
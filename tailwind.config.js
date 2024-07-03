/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "viat-text": "#0D0E10",
                "viat-bg": "#F1F4FA",
                "viat-primary": "#2D3648",
                "viat-secondary": "#A9B5CC",
                "viat-accent": "#8198C6",
                "viat-bg-shade": "#E7EDFA"
            },
            fontFamily: {
                "viat-title": ["Inter", "sans-serif"],
                "viat-body": ["Inter", "sans-serif"],
                "viat-small": ["Montserrat", "sans-serif"]
            },
            fontSize: {
                "viat-size-title": "32px",
                "viat-size-body": "16px",
                "viat-size-small": "12px"
            }
        }
    },
    plugins: []
}
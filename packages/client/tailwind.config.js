/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            default: "#cdbdc8",
            neutral: "#af4670",
            primary: "#e96d7b",
            secondary: "#a991f7",
            accent: "#66b1b3",
            info: "#2563eb",
            success: "#16a34a",
            warning: "#d97706",
            danger: "#ff675b",
        }
    },
    plugins: [
        require('daisyui'),
    ],
    daisyui: {
        themes: ["valentine"],
    },
}

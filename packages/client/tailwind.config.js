/** @type {import('tailwindcss').Config} */
export default {
    important: true,
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            inherit: "inherit",
            current: "currentColor",
            transparent: "transparent",
            white: "#FFF",
            black: "#000",
            primary: "#DC7299",

         'pink': {  DEFAULT: '#F2D8D5',  50: '#F9EEED',  100: '#F7E7E5',  200: '#F2D8D5',  300: '#E6B8B3',  400: '#DB9890',  500: '#D0786E',  600: '#C5574B',  700: '#AA4337',  800: '#88352C',  900: '#652821',  950: '#54211B'},

            purple: {
                DEFAULT: '#B784B7',
                50: '#E1CCE1',
                100: '#D9BED9',
                200: '#C8A1C8',
                300: '#B784B7',
                400: '#A86AA8',
                500: '#935693',
                600: '#794779',
                700: '#603860',
                800: '#462946',
                900: '#2C1A2C',
                950: '#1F121F'
            },

            'pale': {  DEFAULT: '#F0E1D7',  50: '#F8F2ED',  100: '#F5ECE6',  200: '#F0E1D7',  300: '#E0C2AF',  400: '#D0A387',  500: '#C0835E',  600: '#A66741',  700: '#7E4E31',  800: '#553521',  900: '#2D1C11',  950: '#190F0A'},

            green: {
                DEFAULT: '#BBF2DE',
                50: '#F5FDFA',
                100: '#E2F9F1',
                200: '#BBF2DE',
                300: '#90EAC9',
                400: '#65E2B4',
                500: '#3BD9A0',
                600: '#24BD85',
                700: '#1C9267',
                800: '#146749',
                900: '#0C3C2B',
                950: '#07271C'
            },

            blue: {
                DEFAULT: '#BBF2F2',
                50: '#F5FDFD',
                100: '#E2F9F9',
                200: '#BBF2F2',
                300: '#90EAEA',
                400: '#65E2E2',
                500: '#3BD9D9',
                600: '#24BDBD',
                700: '#1C9292',
                800: '#146767',
                900: '#0C3C3C',
                950: '#072727' 
            },

            red: {
                DEFAULT: '#CC7D70',
                50: '#EACAC5',
                100: '#E4BBB4',
                200: '#D89C92',
                300: '#CC7D70',
                400: '#C16252',
                500: '#AC4E3E',
                600: '#8E4033',
                700: '#703328',
                800: '#52251E',
                900: '#341813',
                950: '#25110D'
            },

            orange: {
                DEFAULT: '#F1BB79',
                50: '#F9E7CA',
                100: '#F8DFBA',
                200: '#F4CE99',
                300: '#F1BB79',
                400: '#EDA554',
                500: '#E98D2F',
                600: '#D97417',
                700: '#B45C13',
                800: '#8F470F',
                900: '#6A320B',
                950: '#582809'
            },

            error: {
                DEFAULT: "#AC4E3E",
                stroke: "#3BD9D9",
                background: "#844848",
            },

            warning: {
                DEFAULT: "#D97417",
                background: "#F1BB79",
            },
        },

        fontFamily: {
            sans: ["Rubik",
                "sans-serif"],
        },
    },
}

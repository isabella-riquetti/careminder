import { createTheme, ThemeOptions } from '@mui/material/styles';
import resolveConfig from 'tailwindcss/resolveConfig';

import tailwindConfig from "../tailwind.config";

const twConfig = resolveConfig(tailwindConfig);
const colors = twConfig.theme.colors;

const theme: ThemeOptions = createTheme({
  palette: {
    background: {
      default: "#F8F2ED",
    },
    primary: {
      main: '#c8756b'
    },
    text: {
      primary: '#c8756b',
    },
  },
  typography: {
    fontFamily: '"Confortaa", Roboto, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '@media (max-width:72px)': {
            fontSize: '0.875rem',
          },
          '@media (max-width:500px)': {
            fontSize: '0.75rem',
          },
          margin: 0,
          color: '#c8756b',
          backgroundColor: '#F8F2ED',
          fontFamily: '"Confortaa", Roboto, sans-serif',
          fontWeight: 400,
          fontSize: '1rem',
          lineHeight: 1.5,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          color: '#7c3f38',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: '#7c3f38',
          borderColor: '#f2d8d5'
        },
        head: {
          backgroundColor: '#f2d8d5',
          color: '#7c3f38',
          fontWeight: 700,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: colors.pale[400],
          background: colors.pale[100],
          borderRadius: "7px",
          paddingLeft: "5px",
          border: "none !important",
          '&::before': {
            border: "none !important",
          },
          '&:hover::before, &:hover::after': {
            border: "none !important",
          },
          '& .MuiInputBase-input': {
            padding: "3px",
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: "none !important",
            borderRadius: "7px",
          }
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: colors.pale[400],
          backgroundColor: colors.transparent,
          borderColor: colors.pale[400],
          padding: "0px 10px",
          '&:hover': {
            backgroundColor: colors.pale[200],
          },
          '&.Mui-selected': {
            backgroundColor: colors.pink[400],
            color: colors.white,
            borderColor: colors.pink[400],
            '&:hover': {
              backgroundColor: colors.pink[500],
              borderColor: colors.pink[500],
            },
          },
        },
      },
    },
  },
});

export default theme;
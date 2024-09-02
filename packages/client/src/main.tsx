import "./index.css";

import { ClerkProvider } from "@clerk/clerk-react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFnsV3'
import { configureStore } from "@reduxjs/toolkit";
import { PrimeReactProvider } from 'primereact/api';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';

import { api } from "./api";
import App from "./App";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

const theme = createTheme({
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
  },
});


ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      signInUrl="/login"
      signUpUrl="/signup"
      afterSignOutUrl="/"
      appearance={{
        variables: {
          colorPrimary: "#e96d7b",
          colorDanger: "#B22424",
          colorWarning: "#66361F",
        },
      }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PrimeReactProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <App />
          </LocalizationProvider>
        </PrimeReactProvider>
      </ThemeProvider>
    </ClerkProvider>
  </Provider>
);

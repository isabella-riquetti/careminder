import "./index.css";

import { ClerkProvider } from "@clerk/clerk-react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { configureStore } from "@reduxjs/toolkit";
import { PrimeReactProvider } from 'primereact/api';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';

import { api } from "./api";
import App from "./App";
import theme from "./theme";

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

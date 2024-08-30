import "./index.css";

import { ClerkProvider } from "@clerk/clerk-react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { configureStore } from "@reduxjs/toolkit";
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
    primary: {
      main: '#e96d7b'
    },
    secondary: {
      main: '#a991f7',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Customize your font
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
        <App />
      </ThemeProvider>
    </ClerkProvider>
  </Provider>
);

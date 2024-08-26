import ReactDOM from "react-dom/client";

import App from "./App";

import { Provider } from 'react-redux';
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);

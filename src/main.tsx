import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { muiCustom } from "./utils/mui/index.ts";
import { Provider } from "react-redux";

import createStore from "./redux/store.ts";
import App from "./App.tsx";

const store = createStore();

store.subscribe(() => {
  console.log("store.subscribe", store.getState());
});

const theme = createTheme({
  components: muiCustom(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

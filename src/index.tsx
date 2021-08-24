import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./store/auth-context";
import { SpinnerProvider } from "./store/spinner-context";

ReactDOM.render(
  <SpinnerProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </SpinnerProvider>,
  document.getElementById("root")
);

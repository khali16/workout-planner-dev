import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
import { FirebaseAuthProvider } from "./firebase/firebase-context";

ReactDOM.render(
  <FirebaseAuthProvider>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </FirebaseAuthProvider>,
  document.getElementById("root")
);

import React, { createContext, useState, useEffect } from "react";
import { auth } from "./firebase";

export const FirebaseAuthContext = createContext();

export const FirebaseAuthProvider = (props) => {
  const [userState, setUserState] = useState(null);
  const [authPending, setAuthPending] = useState(true);

  const signIn = (username, password) => {
    return auth.signInWithEmailAndPassword(username, password);
  };

  const signUp = (username, password) => {
    return auth.createUserWithEmailAndPassword(username, password);
  };

  const signOut = () => auth.signOut();

  return (
    <FirebaseAuthContext.Provider
      value={{
        signIn: signIn,
        signUp: signUp,
        signOut: signOut,
        userState: userState,
      }}
    >
      {props.children}
    </FirebaseAuthContext.Provider>
  );
};

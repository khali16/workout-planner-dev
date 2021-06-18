import React, { useContext, useState } from "react";
import styles from "./LoginForm.module.css";
import useInput from "../../hooks//useInput";
import {
  hasAtLeastFiveLetters,
  passwordValidator,
} from "../../utils/validation";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const {
    value: enteredLogin,
    isValid: loginIsValid,
    hasError: loginHasError,
    valueChangeHandler: loginChangeHandler,
    inputBlurHandler: loginBlurHandler,
    reset: loginReset,
  } = useInput(hasAtLeastFiveLetters);

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput(passwordValidator);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!loginIsValid) {
      return;
    }
    console.log(enteredLogin, enteredPassword);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyApa1WrZ97H3bjYtU-rlQzjOoFs_9HT7PI",
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredLogin,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(() => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        // @ts-ignore
        authContext.login(data.idToken, expirationTime.toISOString());
        history.replace("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const loginInputStyles = loginHasError ? styles.invalid : "";
  const passwordInputStyles = passwordHasError ? styles.invalid : "";

  return (
    <form className={styles.Form} onSubmit={submitHandler}>
      <div className={`${loginInputStyles}`}>
        <label htmlFor="login" className={styles.TextInput_label}>
          Login
        </label>
        <input
          type="text"
          id="login"
          value={enteredLogin}
          onChange={loginChangeHandler}
          onBlur={loginBlurHandler}
          className={styles.FormInput}
        />
      </div>
      <div className={`${passwordInputStyles}`}>
        <label htmlFor="password" className={styles.TextInput_label}>
          Password
        </label>
        <input
          type="password"
          id="password"
          className={styles.FormInput}
          value={enteredPassword}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
        />
      </div>
      <button>
        <span>Save</span>
      </button>
    </form>
  );
};

export default LoginForm;

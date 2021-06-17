import React from "react";
import styles from "./LoginForm.module.css";
import useInput from "../../hooks//useInput";
import {
  hasAtLeastFiveLetters,
  passwordValidator,
} from "../../utils/validation";

const LoginForm = () => {
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

    if (!loginIsValid && !passwordIsValid) {
      return;
    }
    console.log(enteredLogin, enteredPassword);

    loginReset();
    passwordReset();
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

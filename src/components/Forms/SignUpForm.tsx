import React, { useContext } from "react";
import styles from "./SignUpForm.module.css";
import useInput from "../../hooks/useInput";
import { isNotEmpty, isEmail, passwordValidator } from "../../utils/validation";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

const SignUpForm = () => {
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const {
    value: firstName,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(isNotEmpty);

  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: lastNameReset,
  } = useInput(isNotEmpty);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(isEmail);

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput(passwordValidator);

  let formIsValid = false;
  if (nameIsValid && lastNameIsValid && emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const submitHanlder = (event: React.FormEvent) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    console.log(firstName, lastName, email, password);

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyApa1WrZ97H3bjYtU-rlQzjOoFs_9HT7PI",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
          displayName: firstName,
          lastName: lastName,
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

  const nameInputStyles = nameHasError ? styles.invalid : "";
  const lastNameInputStyles = lastNameHasError ? styles.invalid : "";
  const emailInputStyles = emailHasError ? styles.invalid : "";
  const passwordInputStyles = passwordHasError ? styles.invalid : "";

  return (
    <form className={styles.Form} onSubmit={submitHanlder}>
      <div className={`${nameInputStyles}`}>
        <label htmlFor="firstName" className={styles.FormInput_label}>
          First Name
        </label>
        <input
          type="text"
          value={firstName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          className={styles.FormInput}
        />
      </div>
      <div className={`${lastNameInputStyles}`}>
        <label htmlFor="lastName" className={styles.FormInput_label}>
          Last Name
        </label>
        <input
          type="text"
          value={lastName}
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
          className={styles.FormInput}
        />
      </div>
      <div className={`${emailInputStyles}`}>
        <label htmlFor="email" className={styles.FormInput_label}>
          E-Mail
        </label>
        <input
          type="email"
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          className={styles.FormInput}
        />
      </div>
      <div className={`${styles.selectedFormItem} ${passwordInputStyles}`}>
        <label htmlFor="password" className={styles.FormInput_label}>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          className={styles.FormInput}
        />
      </div>
      <button>
        <span>Sign Up</span>
      </button>
    </form>
  );
};

export default SignUpForm;

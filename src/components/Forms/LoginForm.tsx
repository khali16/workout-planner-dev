import React from 'react'
import styles from './LoginForm.module.css';
import useInput from '../../hooks//useInput';
import {hasAtLeastFiveLetters, passwordValidator} from '../../constants/utils/validation'

const LoginForm = () => {
    const {
        value: enteredLogin,
        isValid: loginIsValid,
        hasError: loginHasError,
        valueChangeHandler: loginChangeHandler,
        inputBlurHandler: loginBlurHandler,
        reset: loginReset
    } = useInput(hasAtLeastFiveLetters)

    const {
        value: enteredPassword,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
        reset: passwordReset
    } = useInput(passwordValidator)

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        if(!loginIsValid && !passwordIsValid){
            return;
        }
        console.log(enteredLogin, enteredPassword)

        loginReset();
        passwordReset();
    }

    const loginInputStyles = loginHasError ? styles.invalid : ''
    const passwordInputStyles = passwordHasError ? styles.invalid : ''

    return (
        <form className={styles.Form} onSubmit={submitHandler}> 
        <div className={`${styles.selectedFormItem} ${loginInputStyles}`}>
            <label htmlFor="login">Login</label>
            <input type="text" value={enteredLogin} onChange={loginChangeHandler} onBlur={loginBlurHandler}/>
            </div>
            <div className={`${styles.selectedFormItem} ${passwordInputStyles}`}>
            <label htmlFor="password">Password</label>
            <input type="password" value={enteredPassword} onChange={passwordChangeHandler} onBlur={passwordBlurHandler}/>
            </div>
            <button><span>Save</span></button>
        </form>
    )
}

export default LoginForm

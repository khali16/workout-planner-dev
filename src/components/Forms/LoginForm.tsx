import React from 'react'
import styles from './LoginForm.module.css';

const LoginForm = () => {
    return (
        <form className={styles.Form}> 
            <label htmlFor="login">Login</label>
            <input type="text"/>
            <label htmlFor="password">Password</label>
            <input type="password"/>
            <button><span>Save</span></button>
        </form>
    )
}

export default LoginForm

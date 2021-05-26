import React from 'react'
import styles from './SignUpForm.module.css'

const SignUpForm = () => {
    return (
        <form className={styles.Form}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" />
            <label htmlFor="lastName">Last Name</label>
            <input type="text" />
            <label htmlFor="email">E-Mail</label>
            <input type="email" />
            <label htmlFor="password">Password</label>
            <input type="password" />
            <button><span>Sign Up</span></button>
        </form>
    )
}

export default SignUpForm

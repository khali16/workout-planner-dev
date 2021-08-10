import React from "react";
import LoginForm from "../components/Forms/LoginForm";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.frame}>
      <LoginForm />
    </div>
  );
};

export default Login;

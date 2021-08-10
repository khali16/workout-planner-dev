import React from "react";
import SignUpForm from "../components/Forms/SignUpForm";
import styles from "./SignUp.module.css";

const SignUp = () => {
  return (
    <div className={styles.frame}>
      <SignUpForm />
    </div>
  );
};

export default SignUp;

import React, { useContext, useState } from "react";
import styles from "./SignUpForm.module.css";
import { useAuth } from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { TextField } from "@material-ui/core";
import * as Yup from "yup";
import TextFields from "../WorkoutDay/exercise/form/TextFields";
import { ReactComponent as WorkoutImage } from "../../Icons/workout.svg";

const SignUpForm = () => {
  const history = useHistory();
  const { signup } = useAuth();
  async function submitHandler(
    firstName: string,
    email: string,
    password: string
  ) {
    console.log(firstName, email, password);

    try {
      await signup(email, password, firstName);
    } catch {
      alert("Failed to create an account");
    }
  }

  const Schema = Yup.object().shape({
    firstName: Yup.string()
      .required("Please, enter your first name")
      .min(3, "Your name should have at least 3 letters"),
    email: Yup.string().email().required("Please, enter valid email"),
    password: Yup.string()
      .required("Please, enter your password")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain: at least 8 characters, one uppercase, one number and one special case character."
      ),
    confirmPassword: Yup.string()
      .required("Please confirm your password")
      .when("password", {
        //@ts-ignore
        is: (password) => (password && password.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("password")],
          "Password doesn't match"
        ),
      }),
  });

  return (
    <div className={styles.Frame}>
      <Formik
        validateOnChange={true}
        initialValues={{
          firstName: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={(values) => {
          submitHandler(values.firstName, values.email, values.password);
          history.push("/calendar");
        }}
        validationSchema={Schema}
      >
        {({ errors, touched }) => (
          <Form autoComplete="off">
            <div className={styles.Form}>
              <div className={styles.InputField}>
                <TextFields
                  placeholder="First Name"
                  name="firstName"
                  type="text"
                  as={TextField}
                />
                {errors.firstName && touched.firstName ? (
                  <p>{errors.firstName}</p>
                ) : null}
              </div>
              <div className={styles.InputField}>
                <TextFields
                  placeholder="E-Mail"
                  name="email"
                  type="email"
                  as={TextField}
                />
                {errors.email && touched.email ? <p>{errors.email}</p> : null}
              </div>
              <div className={styles.InputField}>
                <TextFields
                  placeholder="Password"
                  name="password"
                  type="password"
                  as={TextField}
                />
                {errors.password && touched.password ? (
                  <p>{errors.password}</p>
                ) : null}
              </div>
              <div className={styles.InputField}>
                <TextFields
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  as={TextField}
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <p>{errors.confirmPassword}</p>
                ) : null}
              </div>
              <button type="submit">
                <span>Sign Up</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className={styles.MotivationBox}>
        <h1>Let's begin your Healthiest Journey together!</h1>
      </div>
    </div>
  );
};

export default SignUpForm;

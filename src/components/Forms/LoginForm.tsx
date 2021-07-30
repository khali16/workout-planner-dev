import React, { useContext } from "react";
import styles from "./LoginForm.module.css";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import { TextField } from "@material-ui/core";
import * as Yup from "yup";
import TextFields from "../WorkoutDay/exercise/form/TextFields";

const LoginForm = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const submitHandler = (email: string, password: string) => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyApa1WrZ97H3bjYtU-rlQzjOoFs_9HT7PI",
      {
        method: "POST",
        redirect: 'follow',
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        history.replace("/calendar")
        if (res.ok) {
          return res.json()
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
        console.log(expirationTime)
        // @ts-ignore
        authContext.login(data.idToken, expirationTime.toISOString());
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const Schema = Yup.object().shape({
    email: Yup.string().email().required("Please, enter valid email"),
    password: Yup.string().required("Please, enter valid password"),
  });

  return (
    <div className={styles.Frame}>
      <Formik
        validateOnChange={true}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          submitHandler(values.email, values.password);
        }}
        validationSchema={Schema}
      >
        {({ errors, touched }) => (
          <Form>
            <div className={styles.Form}>
              <div className={styles.InputField}>
                <TextFields
                  placeholder="E-mail"
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
              <button type="submit">
                <span>Login</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;

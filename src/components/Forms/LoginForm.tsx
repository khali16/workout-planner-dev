import styles from "./LoginForm.module.css";
import { useAuth } from "../../store/auth-context";
import { NavLink } from "react-router-dom";
import { Formik, Form } from "formik";
import { TextField } from "@material-ui/core";
import * as Yup from "yup";
import TextFields from "../WorkoutDay/exercise/form/TextFields";

const LoginForm = () => {
  const { login } = useAuth();

  async function submitHandler(email: string, password: string) {
    try {
      await login(email, password);
    } catch {
      alert("Failed to login");
    }
  }

  const Schema = Yup.object().shape({
    email: Yup.string().email().required("Please, enter valid email."),
    password: Yup.string().required("Please, enter valid password."),
  });

  return (
    <>
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
              <div className={styles.Link}>
                <NavLink to="/sign-up" activeClassName={styles.active}>
                  Don't have account yet? Sign Up!
                </NavLink>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default LoginForm;

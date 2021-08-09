import React from "react";
import { useHistory, useParams } from "react-router-dom";
import styles from "./ExerciseForm.module.css";
import { Exercise } from "../../../../constants/interfaces";
import { useCurrentDate } from "../../../../hooks/useCurrentDate";
import * as Yup from "yup";
import TextFields from "./TextFields";
import { Formik, Form } from "formik";
import { TextField } from "@material-ui/core";
import BodyPartToExercise from "./BodyPartToExercise";
import { useAuth } from "../../../../store/auth-context";

export interface workoutPlan {
  specifiedDay?: string;
  specifiedMonth?: string;
  title?: string;
  bodyWorkout?: {
    legs: string;
    glutes: string;
    abs: string;
    arms: string;
    back: string;
  };
  secondsOfExercise?: number;
  details?: string;
  video?: string;
  time?: number;
}

interface OwnProps {
  showForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const ExerciseForm: React.FC<OwnProps> = ({ showForm }) => {
  const history = useHistory();
  const { addWorkout } = useAuth();

  const showFormHandler = () => {
    showForm(false);
  };

  const { day, monthName } = useCurrentDate();
  const dayDB = parseFloat(day);

  async function submitHandler(
    title: string,
    typeOfExercise: never[],
    secondsOfExercise: string,
    url: string,
    day: number,
    monthName: string
  ) {
    try {
      await addWorkout(
        title,
        typeOfExercise,
        secondsOfExercise,
        url,
        dayDB,
        monthName
      );
      console.log(day, monthName);
    } catch {
      alert("Something went worng...");
    }
  }

  const Schema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Too short!")
      .max(20, "Too long!")
      .required("Please, enter a exercise"),
    typeOfExercise: Yup.array().required("Select one part of body"),
    secondsOfExercise: Yup.number()
      .min(5, "Don't be lazy")
      .max(180, "Whoah! Slow down")
      .required("Please, enter likely time of the exercise"),
    url: Yup.string().required("Please, enter some url of exercise or music!"),
  });

  return (
    <>
      <div className={styles.Frame}>
        <a onClick={showFormHandler}>X</a>
        <div className={styles.Header}>
          <div className={styles.Day}>{day}th</div>
          <div className={styles.Month}>{monthName}</div>
        </div>
        <div className={styles.Form}>
          <Formik
            validateOnChange={true}
            initialValues={{
              title: "",
              typeOfExercise: [],
              secondsOfExercise: "",
              url: "",
            }}
            onSubmit={(data) => {
              submitHandler(
                data.title,
                data.typeOfExercise,
                data.secondsOfExercise,
                data.url,
                dayDB,
                monthName
              );
              showForm(false);
            }}
            validationSchema={Schema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              values,
            }) => (
              <Form>
                <label>Body part to exercise:</label>
                <br />
                <BodyPartToExercise />
                {errors.typeOfExercise && touched.typeOfExercise ? (
                  <p className={styles.Error}>{errors.typeOfExercise}</p>
                ) : null}
                <div className={styles.InputField}>
                  <TextFields
                    placeholder="Exercise"
                    name="title"
                    type="text"
                    as={TextField}
                  />
                  {errors.title && touched.title ? <p>{errors.title}</p> : null}
                </div>
                <div className={styles.InputField}>
                  <TextFields
                    name="secondsOfExercise"
                    type="number"
                    placeholder="Seconds of exercise:"
                    as={TextField}
                  />
                  {errors.secondsOfExercise && touched.secondsOfExercise ? (
                    <p>{errors.secondsOfExercise}</p>
                  ) : null}
                </div>
                <div className={styles.InputField}>
                  <TextFields
                    name="url"
                    type="url"
                    placeholder="Helpful video"
                    as={TextField}
                  />
                  {errors.url && touched.url ? <p>{errors.url}</p> : null}
                </div>
                <button type="submit">
                  <span>Submit</span>
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ExerciseForm;

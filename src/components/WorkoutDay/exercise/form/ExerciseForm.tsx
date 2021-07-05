import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./ExerciseForm.module.css";
import { Exercise } from "../../../../constants/interfaces";
import { useCurrentDate } from "../../../../hooks/useCurrentDate";
import * as Yup from "yup";
import TextFields from "./TextFields";
import { Formik, Form } from "formik";
import { TextField } from "@material-ui/core";
import BodyPartToExercise from "./BodyPartToExercise";


export interface User {
  //todo backend layer
  login: string;
  password: string;
  workouts: workoutPlan[];
  firstName: string;
  lastName: string;
}

export interface workoutPlan {
  title: string,
  typeOfExercise: never[],
  secondsOfExercise: string,
  url: string,
  day: string,
  monthName: string
}

interface OwnProps {
  addExercise: (exercise: Exercise) => {};
  setEditMode: (bool: boolean) => {};
}

const ExerciseForm: React.FC<OwnProps> = ({
  addExercise,
  setEditMode
}) => {

  const history = useHistory();
  const { day, monthName } = useCurrentDate();

  async function addWorkout(workoutPlan: workoutPlan) {
    const response = await fetch(
      "https://workout-planner-e4e5e-default-rtdb.firebaseio.com/workouts.json",
      {
        method: "POST",
        body: JSON.stringify(workoutPlan),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(workoutPlan);
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
              day: day,
              monthName: monthName
            }}
            onSubmit={(data) => {
              addWorkout(data);
              history.push("/calendar")
            }}
            validationSchema={Schema}
          >
            {({
              errors,
              touched,
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

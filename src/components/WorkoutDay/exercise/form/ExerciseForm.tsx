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

export interface User {
  //todo backend layer
  login: string;
  password: string;
  workouts: workoutPlanKubi[];
  firstName: string;
  lastName: string;
}

export interface workoutPlanKubi {
  specifiedDay: string;
  specifiedMonth: string;
  isCyclical: {
    days: number[];
  };
  title?: string;
  time: number;
  exercises: Exercise[];
}

interface OwnProps {
  addExercise: (exercise: Exercise) => {};
  setEditMode: (bool: boolean) => {};
  hideModal: () => boolean;
}

const ExerciseForm: React.FC<OwnProps> = ({
  addExercise,
  setEditMode,
  hideModal,
}) => {
  const history = useHistory();

  const { day, monthName } = useCurrentDate();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    // addExercise({
    //   title: enteredTitle,
    //   engagedBodyParts: {
    //     legs: { checked: !!legsWorkout, title: legsWorkout },
    //     glutes: { checked: !!glutesWorkout, title: glutesWorkout },
    //     abs: { checked: !!absWorkout, title: absWorkout },
    //     arms: { checked: !!armsWorkout, title: armsWorkout },
    //     back: { checked: !!backWorkout, title: backWorkout },
    //     warmUp: { checked: !!glutesWorkout, title: glutesWorkout }, //todo add warmup
    //   },
    //   description: enteredSpecifiedWorkout,
    //   video: url,
    //   totalTime: seconds,
    //   finished: false,
    // });
    setEditMode(false);
    // history.push("/calendar");
  };

  async function addWorkout(workoutPlan: workoutPlanKubi) {
    // const response = await fetch(
    //   "https://workout-planner-e4e5e-default-rtdb.firebaseio.com/workouts.json",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(workoutPlan),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // const data = await response.json();
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
            }}
            onSubmit={(data) => {
              hideModal;
              console.log(data);
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
                <button type="submit" onClick={hideModal}>
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

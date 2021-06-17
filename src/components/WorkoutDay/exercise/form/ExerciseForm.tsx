import React, { useState, ChangeEvent, Consumer } from "react";
import { useParams, useHistory } from "react-router-dom";
import styles from "./ExerciseForm.module.css";
import useInput from "../../../../hooks/useInput";
import { hasAtLeastFiveLetters } from "../../../../utils/validation";
import { getFullMonthName } from "../../../../utils/dateUtils";
import { Exercise } from "../../../../constants/interfaces";
import { useCurrentDate } from "../../../../hooks/useCurrentDate";

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
  details?: string;
  video?: string;
  time?: number;
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
}

const ExerciseForm: React.FC<OwnProps> = ({ addExercise, setEditMode }) => {
  const [legsWorkout, setLegsWorkout] = useState("");
  const [glutesWorkout, setGlutesWorkout] = useState("");
  const [absWorkout, setAbsWorkout] = useState("");
  const [armsWorkout, setArmsWorkout] = useState("");
  const [backWorkout, setBackWorkout] = useState("");
  const [url, setUrl] = useState("");

  const history = useHistory();

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    valueChangeHandler: titleChangeHandler,
    hasError: titleHasError,
    inputBlurHandler: titleBlurHandler,
  } = useInput(hasAtLeastFiveLetters);

  const {
    value: enteredSpecifiedWorkout,
    isValid: enteredSpecifiedWorkoutIsValid,
    valueChangeHandler: specifiedWorkoutChangeHandler,
    hasError: specifiedWorkoutHasError,
    inputBlurHandler: specifiedWorkoutBlurHandler,
  } = useInput(hasAtLeastFiveLetters);

  const { day, monthName } = useCurrentDate();

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (!enteredTitleIsValid && !enteredSpecifiedWorkoutIsValid) {
      return;
    }

    // const workoutPlan: workoutPlan = {
    //   specifiedDay: day,
    //   specifiedMonth: monthName,
    //   title: enteredTitle,
    //   bodyWorkout: {
    //     legs: legsWorkout,
    //     glutes: glutesWorkout,
    //     abs: absWorkout,
    //     arms: armsWorkout,
    //     back: backWorkout,
    //   },
    //   details: enteredSpecifiedWorkout,
    //   video: url,
    // };
    // // addWorkout(workoutPlan);
    addExercise({
      title: enteredTitle,
      engagedBodyParts: {
        legs: { checked: !!legsWorkout, title: legsWorkout },
        glutes: { checked: !!glutesWorkout, title: glutesWorkout },
        abs: { checked: !!absWorkout, title: absWorkout },
        arms: { checked: !!armsWorkout, title: armsWorkout },
        back: { checked: !!backWorkout, title: backWorkout },
        warmUp: { checked: !!glutesWorkout, title: glutesWorkout }, //todo add warmup
      },
      description: enteredSpecifiedWorkout,
      video: url,
      totalTime: 30,
      finished: false,
    });
    setEditMode(false);
    // history.push("/calendar");
  };

  async function addWorkout(workoutPlan: workoutPlan) {
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

  const legsWorkoutHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setLegsWorkout(event.target.value);
  };

  const glutesWorkoutHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setGlutesWorkout(event.target.value);
  };

  const absWorkoutHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAbsWorkout(event.target.value);
  };

  const armsWorkoutHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setArmsWorkout(event.target.value);
  };

  const backWorkoutHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setBackWorkout(event.target.value);
  };

  const urlWorkoutHanlder = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const titleInputStyles = titleHasError ? styles.invalid : "";
  const specifiedWorkoutInputStyles = specifiedWorkoutHasError
    ? styles.invalid
    : "";

  return (
    <>
      <div className={styles.Frame}>
        <div className={styles.Header}>
          <div className={styles.Day}>{day}th</div>
          <div className={styles.Month}>{monthName}</div>
        </div>
        <div className={styles.Form}>
          <form onSubmit={submitHandler}>
            <div className={`${titleInputStyles}`}>
              <label htmlFor="title" className={styles.TextInput_label}>
                Title
              </label>
              <input
                type="input"
                className={styles.TextInput}
                id="title"
                required
                value={enteredTitle}
                onChange={titleChangeHandler}
                onBlur={titleBlurHandler}
              />
            </div>
            <div className={styles.RadioInput}>
              <span>Type of exercise</span>
              <input
                type="radio"
                value="legs"
                id="legs"
                onChange={legsWorkoutHandler}
              />
              <label htmlFor="legs">Legs</label>
              <input
                type="radio"
                value="glutes"
                id="glutes"
                onChange={glutesWorkoutHandler}
              />
              <label htmlFor="glutes">Glutes</label>
              <input
                type="radio"
                value="abs"
                id="abs"
                onChange={absWorkoutHandler}
              />
              <label htmlFor="abs">Abs</label>
              <input
                type="radio"
                value="arms"
                id="arms"
                onChange={armsWorkoutHandler}
              />
              <label htmlFor="arms">Arms</label>
              <input
                type="radio"
                value="back"
                id="back"
                onChange={backWorkoutHandler}
              />
              <label htmlFor="back">Back</label>
            </div>
            <div
              className={`${styles.SpecifiedWorkout} ${specifiedWorkoutInputStyles}`}
            >
              <label htmlFor="specifiedWorkout" className={styles.Label}>
                Specified Workout
              </label>
              <input
                type="text"
                id="specifiedWorkout"
                className={styles.TextInput}
                value={enteredSpecifiedWorkout}
                onChange={specifiedWorkoutChangeHandler}
                onBlur={specifiedWorkoutBlurHandler}
              />
            </div>
            <div className={styles.VideoInput}>
              <label htmlFor="video" className={styles.Label}>
                Helpful video
              </label>
              <input
                type="url"
                id="video"
                className={styles.TextInput}
                onChange={urlWorkoutHanlder}
              />
            </div>
            <button>
              <span>Submit</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ExerciseForm;

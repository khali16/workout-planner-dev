import React, { useState } from "react";
import { useEffect } from "react";
import ExerciseForm from "../WorkoutDay/exercise/form/ExerciseForm";
import firebase from "firebase";
import { useCurrentDate } from "../../hooks/useCurrentDate";
import { useFirestore } from "../../hooks/useFirestore";
import SingleWorkout from "./SingleWorkout";
import styles from "./WorkoutPlan.module.css";

interface OwnProps {}

type Props = OwnProps;
const WorkoutPlan: React.FC<Props> = (props) => {
  const [showForm, setShowForm] = useState(false);
  const { day, monthName } = useCurrentDate();

  const { workouts } = useFirestore(day, monthName, showForm);

  const showFormHandler = () => {
    setShowForm(!showForm);
  };
  return (
    <>
      <div className={styles.frame}>
        {workouts.map((workout) => (
          <SingleWorkout
            key={workout.id}
            title={workout.title}
            typeOfExercise={workout.typeOfExercise}
            secondsOfExercise={workout.secondsOfExercise}
            urlExercise={workout.urlExercise}
          />
        ))}
        {console.log(workouts)}
        {/* <button onClick={showFormHandler}>
          <span>Add workout</span>
        </button> */}
        {/* {showForm && <ExerciseForm showForm={setShowForm} />} */}
      </div>
    </>
  );
};
export default WorkoutPlan;

import React, { useState } from "react";
import { useEffect } from "react";
import ExerciseForm from "../WorkoutDay/exercise/form/ExerciseForm";
import firebase from "firebase";
import { useCurrentDate } from "../../hooks/useCurrentDate";
import { useFirestore } from "../../hooks/useFirestore";
import SingleWorkout from "./SingleWorkout";
import styles from "./WorkoutPlan.module.css";
import EmptyWorkoutPlan from "./EmptyWorkoutPlan";

interface OwnProps {}

type Props = OwnProps;
const WorkoutPlan: React.FC<Props> = (props) => {
  const [showForm, setShowForm] = useState(false);
  const { day, monthName } = useCurrentDate();
  const miesiac = "August";

  const { workouts, fetch } = useFirestore(day, miesiac);

  const showFormHandler = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    fetch();
  }, [showForm]);

  return (
    <>
      {workouts.length === 0 && <EmptyWorkoutPlan />}
      <div className={styles.frame}>
        {workouts.map((workout, key) => (
          <SingleWorkout
            key={key}
            title={workout.title}
            typeOfExercise={workout.typeOfExercise}
            secondsOfExercise={workout.secondsOfExercise}
            urlExercise={workout.urlExercise}
          />
        ))}
        <button onClick={showFormHandler}>
          <span>Add workout</span>
        </button>
        {showForm && <ExerciseForm showForm={setShowForm} />}
      </div>
    </>
  );
};

export default WorkoutPlan;

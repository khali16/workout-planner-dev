import React, { useState } from "react";
import { useEffect } from "react";
import ExerciseForm from "../WorkoutDay/exercise/form/ExerciseForm";
import firebase from "firebase";
import { useCurrentDate } from "../../hooks/useCurrentDate";

interface OwnProps {}

interface Workout {
  title: string;
  typeOfExercise: string;
  secondsOfExercise: string;
  day: string;
  monthName: string;
}

type Props = OwnProps;
const WorkoutPlan: React.FC<Props> = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const { day, monthName } = useCurrentDate();

  useEffect(() => {
    const db = firebase.firestore();

    db.collection("workouts")
      .where("day", "==", day)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          let workoutsArray: Workout[] = [];
          querySnapshot.forEach((doc) => {
            workoutsArray = [
              ...workoutsArray,
              {
                title: doc.data().title,
                typeOfExercise: doc.data().typeOfExercise,
                secondsOfExercise: doc.data().secondsOfExercise,
                day: doc.data().day,
                monthName: doc.data().monthName,
              },
            ];
          });
          setWorkouts(workoutsArray);
          console.log("tablica w efekcie", workoutsArray);
          console.log("tablica state", workouts);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const showFormHandler = () => {
    setShowForm(!showForm);
  };
  return (
    <>
      {workouts.map((workout) => (
        <p>{workout.title}</p>
      ))}
      <button onClick={showFormHandler}>Add workout</button>
      {showForm && <ExerciseForm />}
    </>
  );
};
export default WorkoutPlan;

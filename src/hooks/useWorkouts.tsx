import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { getFullMonthName } from "../utils/dateUtils";
import { useSpinner } from "../store/spinner-context";

export interface Workout {
  typeOfExercise: string[];
  day: number;
  month: string;
}

export const useWorkouts = (month: number) => {
  const [workoutsDB, setWorkouts] = useState<Workout[]>([]);
  const { openSpinner, closeSpinner } = useSpinner();

  const user = localStorage.getItem("user");
  const monthName = getFullMonthName(month);

  useEffect(() => {
    openSpinner();
    const db = firebase.firestore();
    db.collection("workouts")
      .where("user", "==", user)
      .where("monthName", "==", monthName)
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          let workoutsArray: Workout[] = [];
          querySnapshot.forEach((doc) => {
            workoutsArray = [
              ...workoutsArray,
              {
                // id: doc.id,
                typeOfExercise: doc.data().typeOfExercise,
                day: doc.data().day,
                month: doc.data().monthName,
              },
            ];
          });
          setWorkouts(workoutsArray);
        } else {
          setWorkouts([]);
        }
        closeSpinner();
      })
      .catch((error) => {
        console.log(error);
        closeSpinner();
      });
  }, [getFullMonthName(month), month]);

  return { workoutsDB, monthName };
};

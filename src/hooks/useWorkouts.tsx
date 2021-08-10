import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { getFullMonthName } from "../utils/dateUtils";

export interface Workout {
  // id: string;
  typeOfExercise: string[];
  day: number;
  month: string;
}

export const useWorkouts = (month: number) => {
  const [workoutsDB, setWorkouts] = useState<Workout[]>([]);
  const userEmail = firebase.auth().currentUser?.email;

  const user = localStorage.getItem("user");

  useEffect(() => {
    const db = firebase.firestore();
    const monthName = getFullMonthName(month);

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
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getFullMonthName(month), month]);

  return { workoutsDB };
};

import React, { useState, useEffect } from "react";
import firebase from "firebase";

interface Workout {
  id: string;
  typeOfExercise: string[];
  day: number;
  month: string;
}

export const useDB = (day: number) => {
  const [workoutsDB, setWorkouts] = useState<Workout[]>([]);
  let user = firebase.auth().currentUser?.email;

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
                id: doc.id,
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
  }, []);

  return { workoutsDB };
};

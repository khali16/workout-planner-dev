import { useState } from 'react';
import firebase from 'firebase';
import { useSpinner } from '../store/spinner-context';

interface Workout {
  title: string;
  typeOfExercise: string;
  secondsOfExercise: string;
  urlExercise: string
}

export const useSpecificWorkout = (day: string, monthName: string) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const { openSpinner, closeSpinner } = useSpinner();
  const userEmail = localStorage.getItem('user')

  const fetch = async () => {
    openSpinner();
    const reponse = firebase.firestore().collection("workouts").where("day", "==", Number(day)).where("monthName", "==", monthName).where("user", "==", userEmail)
    const odp = await reponse.get().then(snapshot => {
      let workoutsArray: Workout[] = [];
      snapshot.forEach(doc => {
        const data = {
          title: doc.data().title,
          typeOfExercise: doc.data().typeOfExercise,
          secondsOfExercise: doc.data().secondsOfExercise,
          urlExercise: doc.data().urlExercise
        }
        workoutsArray = [...workoutsArray, { ...data }]
        setWorkouts([...workoutsArray])
      })
    })
    closeSpinner();
  }



  return { workouts, fetch }
}

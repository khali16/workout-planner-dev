import { useState } from 'react';
import firebase from 'firebase';
import { useSpinner } from '../store/spinner-context';

interface Workout {
  title: string;
  typeOfExercise: string;
  secondsOfExercise: string;
  urlExercise: string
}

export const useSpecificWorkout = (day: string, monthName: string, sort: boolean) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const { openSpinner, closeSpinner } = useSpinner();
  const userEmail = localStorage.getItem('user')
  let chosenSorting = sort ?  "asc" : "desc";

  const fetch = async () => {
    openSpinner();
    if(sort){
      const reponse = firebase.firestore().collection("workouts").where("day", "==", Number(day)).where("monthName", "==", monthName).where("user", "==", userEmail).orderBy("created", 'asc')
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
    }else{
      const reponse = firebase.firestore().collection("workouts").where("day", "==", Number(day)).where("monthName", "==", monthName).where("user", "==", userEmail).orderBy("created", 'desc')
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
    }
    closeSpinner();
  }



  return { workouts, fetch }
}

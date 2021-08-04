import {useState, useEffect} from 'react';
import firebase from 'firebase';
import { domainToASCII } from 'url';

interface Workout {
    title: string;
    typeOfExercise: string;
    secondsOfExercise: string;
   urlExercise: string
  }

export const useFirestore = (day: string, monthName: string) => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);

    const fetch = async() => {
      const reponse = firebase.firestore().collection("workouts").where("day", "==", Number(day)).where("monthName", "==", monthName)
      const odp = await reponse.get().then( snapshot => {
        let workoutsArray: Workout[] = [];
        snapshot.forEach( doc => {
          const data = { 
            title: doc.data().title,
                  typeOfExercise: doc.data().typeOfExercise,
                  secondsOfExercise: doc.data().secondsOfExercise,
                  urlExercise: doc.data().urlExercise}

          // setWorkouts([...workouts, {title: doc.data().title,
          //   typeOfExercise: doc.data().typeOfExercise,
          //   secondsOfExercise: doc.data().secondsOfExercise,
          //   urlExercise: doc.data().urlExercise}])
          workoutsArray = [...workoutsArray, {...data}]
          setWorkouts([...workoutsArray])
        })
      })
    }
   

    
      return {workouts, fetch}
}
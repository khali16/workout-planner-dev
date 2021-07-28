import {useState, useEffect} from 'react';
import firebase from 'firebase';
import {useAuth} from '../store/auth-context';
import { domainToASCII } from 'url';

interface Workout {
    title: string;
    typeOfExercise: string;
    secondsOfExercise: string;
    urlExercise: string
  }

export const useFirestore = (day: string, monthName: string, showForm: boolean) => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const { currentUserEmail } = useAuth();
    let user = firebase.auth().currentUser?.email;

    useEffect(() => {
        const db = firebase.firestore();
    
        db.collection("workouts")
        .where("user", "==", user)
        .where("day", "==", day)
        .where("monthName", "==", monthName)
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
                    urlExercise: doc.data().urlExercise
                  },
                ];
              });
              setWorkouts(workoutsArray);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }, [showForm]);
    
      return {workouts}
}
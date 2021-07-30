import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserEmail, setCurrentUserEmail] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const history = useHistory();
  const db = firebase.firestore();

  async function signup(email, password, firstName, lastName) {
    const response = await auth.createUserWithEmailAndPassword(email, password);
    if (response.user.uid) {
      const user = {
        uid: response.user.uid,
        email: email,
        firstName: firstName,
        lastName: lastName,
      };
      db.collection("users").doc(response.user.uid).set(user);
    }
    setIsLoggedIn(true);
    history.push("/calendar");
  }

  async function login(email, password) {
    const response = await auth.signInWithEmailAndPassword(email, password);
    db.collection("users")
      .where("email", "==", email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data());
        });
      });
    setIsLoggedIn(true);
    history.push("/calendar");
  }

  async function addWorkout(
    title,
    typeOfExercise,
    secondsOfExercise,
    urlExercise,
    day,
    monthName
  ) {
    let user = firebase.auth().currentUser;

    const response = await db.collection("workouts").doc().set({
      user: user.email,
      created: firebase.firestore.Timestamp.now().toDate(),
      title: title,
      typeOfExercise: typeOfExercise,
      secondsOfExercise: secondsOfExercise,
      urlExercise: urlExercise,
      day: day,
      monthName: monthName,
    });
  }

  async function fetchWorkouts(setCwiczenia) {
    db.collection("workouts")
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          //@ts-ignore
          let workoutsArray = [];
          querySnapshot.forEach((doc) => {
            workoutsArray = [
              //@ts-ignore
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
          //@ts-ignore
          setWorkouts(workoutsArray);
          setCwiczenia(workoutsArray);
          //@ts-ignore
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setCurrentUserEmail(user.email);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    currentUserEmail,
    signup,
    login,
    addWorkout,
    fetchWorkouts,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

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

  async function signup(email, password, firstName) {
    const response = await auth.createUserWithEmailAndPassword(email, password);
    if (response.user.uid) {
      const user = {
        uid: response.user.uid,
        email: email,
        firstName: firstName,
      };
      db.collection("users").doc(response.user.uid).set(user);
      setLoading(true);
    }
    localStorage.setItem("user", email);
    setIsLoggedIn(true);
    setLoading(false);
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
    localStorage.setItem("user", email);
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
    isLoggedIn,
    signup,
    login,
    addWorkout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

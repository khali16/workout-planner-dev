import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyApa1WrZ97H3bjYtU-rlQzjOoFs_9HT7PI",
  authDomain: "workout-planner-e4e5e.firebaseapp.com",
  databaseURL: "https://workout-planner-e4e5e-default-rtdb.firebaseio.com",
  projectId: "workout-planner-e4e5e",
  storageBucket: "workout-planner-e4e5e.appspot.com",
  messagingSenderId: "765128210812",
  appId: "1:765128210812:web:6d9fb528099552ec388cf9",
});

export const auth = app.auth();
export default app;

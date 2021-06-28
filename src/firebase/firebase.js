import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyApa1WrZ97H3bjYtU-rlQzjOoFs_9HT7PI",
  authDomain: "workout-planner-e4e5e.firebaseapp.com",
  databaseURL: "https://workout-planner-e4e5e-default-rtdb.firebaseio.com",
  projectId: "workout-planner-e4e5e",
  storageBucket: "workout-planner-e4e5e.appspot.com",
  messagingSenderId: "765128210812",
  appId: "1:765128210812:web:274b3044179beae6388cf9",
};

firebase.initializeApp(config);
export const auth = firebase.auth;

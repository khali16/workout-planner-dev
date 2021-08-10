import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
//@ts-ignore
import { useAuth } from "../../store/auth-context";
import styles from "./MainNavigation.module.css";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const MainNavigation = () => {
  const { currentUser } = useAuth();
  const history = useHistory();

  function logoutHandler() {
    firebase.auth().signOut();
    localStorage.removeItem("user");
    history.push("/login");
    console.log("wylogowano");
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <NavLink to="/" activeClassName={styles.active}>
          Workout Planner
        </NavLink>
      </div>
      <nav className={styles.nav}>
        <ul>
          {!currentUser && (
            <li>
              <NavLink to="/login" activeClassName={styles.active}>
                Login
              </NavLink>
            </li>
          )}
          {!currentUser && (
            <li>
              <NavLink to="/sign-up" activeClassName={styles.active}>
                Sign up
              </NavLink>
            </li>
          )}
          {currentUser && (
            <li>
              <NavLink to="/calendar" activeClassName={styles.active}>
                Calendar
              </NavLink>
            </li>
          )}
          {currentUser && (
            <li>
              <a onClick={logoutHandler}>Logout</a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

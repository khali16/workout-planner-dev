import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
//@ts-ignore
import { useAuth } from "../../store/auth-context";
import styles from "./MainNavigation.module.css";
import firebase from "firebase";

const MainNavigation = () => {
  const { logout } = useAuth();
  let user = firebase.auth().currentUser;

  function logoutHandler() {
    console.log("Dodać wylogowanie");
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
          {!user && (
            <li>
              <NavLink to="/login" activeClassName={styles.active}>
                Login
              </NavLink>
            </li>
          )}
          {!user && (
            <li>
              <NavLink to="/sign-up" activeClassName={styles.active}>
                Sign up
              </NavLink>
            </li>
          )}
          <li>
            <NavLink to="/calendar" activeClassName={styles.active}>
              Calendar
            </NavLink>
          </li>
          {user && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

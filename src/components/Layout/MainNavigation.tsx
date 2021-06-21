import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
//@ts-ignore
import styles from "./MainNavigation.module.css";
import AuthContext from "../../store/auth-context";

const MainNavigation = () => {
  const authContext = useContext(AuthContext);

  const isLoggedIn = authContext.isLoggedIn;

  const logoutHandler = () => {
    authContext.logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <NavLink to="/" activeClassName={styles.active}>
          Workout Planner
        </NavLink>
      </div>
      <nav className={styles.nav}>
        <ul>
          {!isLoggedIn && (
            <li>
              <NavLink to="/login" activeClassName={styles.active}>
                Login
              </NavLink>
            </li>
          )}
          {!isLoggedIn && (
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
          {isLoggedIn && (
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

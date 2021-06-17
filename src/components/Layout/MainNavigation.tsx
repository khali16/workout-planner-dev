import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./MainNavigation.module.css";

const MainNavigation = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <NavLink to="/" activeClassName={styles.active}>
          Workout Planner
        </NavLink>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to="/login" activeClassName={styles.active}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/sign-up" activeClassName={styles.active}>
              Sign up
            </NavLink>
          </li>
          <li>
            <NavLink to="/calendar" activeClassName={styles.active}>
              Calendar
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;

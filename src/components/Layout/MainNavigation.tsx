import React from 'react'
import { NavLink } from "react-router-dom";
import styles from './MainNavigation.module.css';

const MainNavigation = () => {
    return (
       <header className={styles.header}>
           <div className={styles.logo}>Workout Planner</div>
           <nav className={styles.nav}>
               <ul>
                   <li>
                       <NavLink to="/login" activeClassName={styles.active}>Login</NavLink>
                   </li>
                   <li>
                       <NavLink to="/sign-up" activeClassName={styles.active}>Sign up</NavLink>
                   </li>
               </ul>
           </nav>
       </header>
    )
}

export default MainNavigation

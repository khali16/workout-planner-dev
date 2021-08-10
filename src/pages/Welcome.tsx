import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Welcome.module.css";

const Welcome = () => {
  return (
    <>
      <div className={styles.imageContainer}>
        <div className={styles.joinContainer}>
          <h1>Let's begin your Healthiest Journey together!</h1>
        </div>
      </div>
    </>
  );
};

export default Welcome;

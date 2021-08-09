import React from "react";
import styles from "./EmptyWorkoutPlan.module.css";

const EmptyWorkoutPlan = () => {
  return (
    <div className={styles.frame}>
      <p>It's seem that there is no workout plan for today.</p>
      <p>Let's change it and add some!</p>
      <button>
        <span>Add workout</span>
      </button>
    </div>
  );
};

export default EmptyWorkoutPlan;

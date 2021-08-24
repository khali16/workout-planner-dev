import React from "react";
import styles from "./EmptyWorkoutPlan.module.css";

interface Props {
  showForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmptyWorkoutPlan: React.FC<Props> = ({ showForm }) => {
  const showFormHandler = () => {
    showForm(true);
  };

  return (
    <div className={styles.frame}>
      <div className={styles.inspiration}>
        <h2>It's seems your workout plan is empty...</h2>
        <h3>Let's rock and add some exercises!</h3>
      </div>
      <button onClick={showFormHandler}>
        <span>Add workout</span>
      </button>
    </div>
  );
};

export default EmptyWorkoutPlan;

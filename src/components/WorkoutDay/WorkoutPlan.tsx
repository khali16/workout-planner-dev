import React, { useState } from "react";
import { useEffect } from "react";
import ExerciseForm from "../WorkoutDay/exercise/form/ExerciseForm";
import firebase from "firebase";
import { useCurrentDate } from "../../hooks/useCurrentDate";
import { useFirestore } from "../../hooks/useFirestore";
import SingleWorkout from "./SingleWorkout";
import styles from "./WorkoutPlan.module.css";
import EmptyWorkoutPlan from "./EmptyWorkoutPlan";
import Modal from "react-modal";

interface OwnProps {}

Modal.setAppElement("#overlay-root");

type Props = OwnProps;
const WorkoutPlan: React.FC<Props> = (props) => {
  const [showForm, setShowForm] = useState(false);
  const { day, monthName } = useCurrentDate();
  const miesiac = "August";

  const { workouts, fetch } = useFirestore(day, miesiac);

  const showFormHandler = () => {
    setShowForm(true);
  };

  const hideModalHandler = () => {
    setShowForm(false);
  };

  useEffect(() => {
    fetch();
  }, [showForm]);

  return (
    <>
      {workouts.length === 0 ? (
        <>
          {" "}
          <EmptyWorkoutPlan showForm={setShowForm} />{" "}
          {showForm && (
            <Modal
              isOpen={showForm}
              onRequestClose={hideModalHandler}
              className={styles.modal}
            >
              <ExerciseForm showForm={setShowForm} />
            </Modal>
          )}
        </>
      ) : (
        <div className={styles.frame}>
          {workouts.map((workout, key) => (
            <SingleWorkout
              key={key}
              title={workout.title}
              typeOfExercise={workout.typeOfExercise}
              secondsOfExercise={workout.secondsOfExercise}
              urlExercise={workout.urlExercise}
            />
          ))}
          <div className={styles.NewExercise}>
            <button onClick={showFormHandler}>
              <span>Add workout</span>
            </button>
          </div>
          {showForm && (
            <Modal
              isOpen={showForm}
              onRequestClose={hideModalHandler}
              className={styles.modal}
            >
              <ExerciseForm showForm={setShowForm} />
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

export default WorkoutPlan;

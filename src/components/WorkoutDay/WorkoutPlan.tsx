import React, { useState } from "react";
import { useEffect } from "react";
import ExerciseForm from "../WorkoutDay/exercise/form/ExerciseForm";
import { useCurrentDate } from "../../hooks/useCurrentDate";
import { useSpecificWorkout } from "../../hooks/useSpecificWorkout";
import SingleWorkout from "./SingleWorkout";
import styles from "./WorkoutPlan.module.css";
import EmptyWorkoutPlan from "./EmptyWorkoutPlan";
import Modal from "react-modal";
import { useSpinner } from "../../store/spinner-context";
import Spinner from "../../UI/Spinner/Spinner";

interface OwnProps {}

Modal.setAppElement("#overlay-root");

type Props = OwnProps;
const WorkoutPlan: React.FC<Props> = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [sort, setSort] = useState(false);
  const { day, monthName } = useCurrentDate();
  const { isLoading } = useSpinner();
  const { workouts, fetch } = useSpecificWorkout(day, monthName, sort);

  const sortHandler = () => {
    setSort(!sort);
  };

  const showFormHandler = () => {
    setShowForm(true);
  };

  const hideModalHandler = () => {
    setShowForm(false);
  };

  useEffect(() => {
    fetch();
  }, [showForm, sort]);

  const chosenSorting = sort ? "latest" : "oldest";

  return (
    <>
      {isLoading ? null : workouts.length === 0 ? (
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
      ) : isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.frame}>
          <div className={styles.sort}>
            <button onClick={sortHandler} className={chosenSorting}>
              Sort by {chosenSorting}
            </button>
          </div>
          {console.log(sort)}
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
            <div className={styles.AddExercise}>
              <button onClick={showFormHandler}>
                <span>Add workout</span>
              </button>
            </div>
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

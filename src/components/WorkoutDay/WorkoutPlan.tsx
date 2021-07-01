import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { workoutPlanKubi } from "./exercise/form/ExerciseForm";
import React, { useState } from "react";
import { Exercise } from "../../constants/interfaces";
import { useCurrentDate } from "../../hooks/useCurrentDate";
import ExerciseView from "./exercise/view/ExerciseView";
import Modal from "../UI/Modal";
import ExerciseForm from "../WorkoutDay/exercise/form/ExerciseForm";

interface OwnProps {}

type Props = OwnProps;

const initializeEmptyWorkoutPlan = (): workoutPlanKubi => ({
  isCyclical: { days: [] },
  specifiedDay: "",
  specifiedMonth: "",
  time: 0,
  title: "Plan treningu",
  exercises: [],
});

const WorkoutPlan: React.FC<Props> = (props) => {
  const [modalIsShown, setModalIsShown] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [closeModal, setCloseModal] = useState();

  const { day, monthName } = useCurrentDate();
  const [workoutPlan, setWorkoutPlan] = useState<workoutPlanKubi>({
    ...initializeEmptyWorkoutPlan(),
    specifiedMonth: monthName,
    specifiedDay: day,
  });
  const addNewExercise = (newExercise: Exercise) => ({
    ...workoutPlan,
    exercises: [...workoutPlan.exercises, newExercise],
  });

  const onShowModal = () => {
    setModalIsShown(true);
  };

  const hideModal = () => {
    //@ts-ignore
    setModalIsShown(false);
  };

  return (
    <div>
      Tytul: {workoutPlan.title}
      Dzien: {workoutPlan.specifiedDay}
      Miesiac: {workoutPlan.specifiedMonth}
      Czas w sekundkach: {workoutPlan.time}
      <VerticalTimeline>
        {workoutPlan.exercises.map((exercise) => (
          <ExerciseView exercise={exercise} />
        ))}
        <VerticalTimelineElement
          iconStyle={{ background: "rgb(100, 104, 252)", color: "#fff" }}
          iconOnClick={() => {
            onShowModal;
            // alert("Stwórz tutaj modal ktory wyrendereuje ExerciseForm a na onSubmitcie doda exercise do statea" +
            //     " komponentu WorkoutPlan za pomocą setWorkoutPlan (na statcie jest obiekt workoutPlan, ktory ma" +
            //     " tablice exercises)")
            //W modalu <ExerciseForm/>
            //

            //olej ten kod
            // addWorkout(workoutPlan);
            // let addNewExercise = {
            //   ...workoutPlan,
            //   exercises: [
            //     ...workoutPlan.exercises,
            //     ...initializeEmptyWorkoutPlan().exercises,
            //   ],
            // };
            // setWorkoutPlan(addNewExercise);
          }}
        >
          Add exercise
        </VerticalTimelineElement>
        <VerticalTimelineElement
          iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
          iconOnClick={() => {
            alert("Olej to");
            // addWorkout(workoutPlan);
          }}
        >
          Save training!
        </VerticalTimelineElement>
      </VerticalTimeline>
      <button onClick={onShowModal}>HOP</button>
      {modalIsShown && (
        //@ts-ignore
        <Modal closeModal={hideModal}></Modal>
      )}
    </div>
  );
};

export default WorkoutPlan;

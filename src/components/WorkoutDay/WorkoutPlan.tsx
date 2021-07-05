import { workoutPlan } from "./exercise/form/ExerciseForm";
import React, { useState } from "react";
import { useCurrentDate } from "../../hooks/useCurrentDate";
import ExerciseForm from "../WorkoutDay/exercise/form/ExerciseForm";

interface OwnProps {}

type Props = OwnProps;

const initializeEmptyWorkoutPlan = (): workoutPlan => ({
  title: "",
  typeOfExercise: [],
  secondsOfExercise: "",
  url: "",
  day: "",
  monthName: ""
});

const WorkoutPlan: React.FC<Props> = (props) => {
  const [modalIsShown, setModalIsShown] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [closeModal, setCloseModal] = useState();

  const { day, monthName } = useCurrentDate();

  return (
    //@ts-ignore
    <ExerciseForm />
  );
};

export default WorkoutPlan;

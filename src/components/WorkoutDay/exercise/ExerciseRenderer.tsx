import React, { Consumer, FunctionComponent, useState } from "react";
import ExerciseForm from "./form/ExerciseForm";
import ExerciseView from "./view/ExerciseView";
import { Exercise } from "../../../constants/interfaces";

interface OwnProps {
  exercise: Exercise;
  addExercise: (exercise: Exercise) => {};
}

type Props = OwnProps;

const ExerciseRenderer: FunctionComponent<Props> = ({ exercise }) => {
  const [isBeingEdited, setIsBeingEdited] = useState(true);
  const [newExercise, setNewExercise] = useState(exercise);
  const addExercise = (exercise: Exercise) => {
    console.log(exercise);
    setNewExercise(exercise);
    setIsBeingEdited(false);
  };
  console.log(isBeingEdited ? "e" : "nie");
  return isBeingEdited ? (
    // @ts-ignore
    <ExerciseForm addExercise={addExercise} setEditMode={setIsBeingEdited} />
  ) : (
    <ExerciseView exercise={newExercise} />
  );
};

export default ExerciseRenderer;

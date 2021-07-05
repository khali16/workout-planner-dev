import React, { FunctionComponent, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { Exercise } from "../../../../constants/interfaces";
import {useParams} from 'react-router'
import ExerciseForm from '../form/ExerciseForm';

interface OwnProps {
  exercise: Exercise;
}

type Props = OwnProps;
const todoExerciseColor = "rgb(172,69,82)";
const doneExerciseColor = "rgb(98,170,79)";

const ExerciseView: FunctionComponent<Props> = ({
  exercise: {
    engagedBodyParts,
    description,
    totalTime,
    title,
    video,
    finished,
  },
}) => {
  const dzionek = useParams();
  console.log(dzionek)

  // @ts-ignore
  // const tytulec = `${Object.values(engagedBodyParts)
  //   .filter((bodyPart) => bodyPart.checked)
  //   .map((bodyPart) => " " + bodyPart.title)} ${totalTime} sekund :)`;
  const tytulec = `Elo sekund :)`;
  const [exerciseIconColor, setExerciseIconColor] = useState(
    finished ? doneExerciseColor : todoExerciseColor
  );
  useEffect(() => {
    //http update koloru exercisea
  }, [exerciseIconColor]);
  return (
    //@ts-ignore
    <ExerciseForm />
  );
};

export default ExerciseView;

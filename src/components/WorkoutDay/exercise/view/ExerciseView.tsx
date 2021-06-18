import React, { FunctionComponent, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import { Exercise } from "../../../../constants/interfaces";

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
  // @ts-ignore
  const tytulec = `${Object.values(engagedBodyParts)
    .filter((bodyPart) => bodyPart.checked)
    .map((bodyPart) => " " + bodyPart.title)} ${totalTime} sekund :)`;
  const [exerciseIconColor, setExerciseIconColor] = useState(
    finished ? doneExerciseColor : todoExerciseColor
  );
  useEffect(() => {
    //http update koloru exercisea
  }, [exerciseIconColor]);
  return (
    <VerticalTimelineElement
      className="vertical-timeline-element--work"
      date={tytulec}
      iconOnClick={() => {
        setExerciseIconColor(
          exerciseIconColor == doneExerciseColor
            ? todoExerciseColor
            : doneExerciseColor
        );
      }}
      iconStyle={{ background: exerciseIconColor, color: "#fff" }}
    >
      <h3 className="vertical-timeline-element-title">{title}</h3> <br />
      <br />
      <ReactPlayer height={300} width={"100%"} url={video} />
      <br />
      <p>{description}</p>
    </VerticalTimelineElement>
  );
};

export default ExerciseView;

import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";
import ReactPlayer from "react-player";
import { StylesContext } from "@material-ui/styles";
import styles from "./SingleWorkout.module.css";

interface Props {
  title: string;
  typeOfExercise: string;
  secondsOfExercise: string;
  urlExercise: string;
}

const SingleWorkout: React.FC<Props> = ({
  title,
  typeOfExercise,
  secondsOfExercise,
  urlExercise,
}) => {
  return (
    <div className={styles.frame}>
      <VerticalTimeline layout="1-column" className={styles.secondFrame}>
        <VerticalTimelineElement
          date={secondsOfExercise}
          dateClassName="vertical-timeline-element--work"
          className={styles.box}
          iconClassName={styles.icon}
        >
          <h3 className="vertical-timeline-element-title">{title}</h3>
          <h5 className="vertical-timeline-element-subtitle">
            {typeOfExercise}
          </h5>
          <ReactPlayer url={urlExercise} width="80%" />
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
};

export default SingleWorkout;

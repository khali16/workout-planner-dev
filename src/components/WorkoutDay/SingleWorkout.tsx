import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";

import "react-vertical-timeline-component/style.min.css";
import ReactPlayer from "react-player";
import styles from "./SingleWorkout.module.css";
import { ReactComponent as Muscle } from "../../Icons/muscle.svg";
import Timer from "./Timer/Timer";

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
  const seconds = parseFloat(secondsOfExercise);

  return (
    <div className={styles.frame}>
      <VerticalTimeline layout="1-column" className={styles.secondFrame}>
        <VerticalTimelineElement
          dateClassName="vertical-timeline-element--work"
          className={styles.box}
          icon={<Muscle />}
          iconClassName={styles.icon}
        >
          <h3 className="vertical-timeline-element-title">
            You're working on {typeOfExercise}
          </h3>
          <Timer durationSeconds={seconds} exercise={title} />
          <br />
          <ReactPlayer
            url={urlExercise}
            width="80%"
            className={styles.player}
          />
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
};

export default SingleWorkout;

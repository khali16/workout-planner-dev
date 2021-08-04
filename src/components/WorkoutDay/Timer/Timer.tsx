import React, { useState } from "react";
import { CountdownCircleTimer, TimeProps } from "react-countdown-circle-timer";
import styles from "./Timer.module.css";

interface Props {
  durationSeconds: number;
  exercise: string;
}

const Timer: React.FC<Props> = ({ durationSeconds, exercise }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const startTimerHandler = () => {
    setIsPlaying(true);
  };
  const stopTimerHandler = () => {
    setIsPlaying(false);
  };

  return (
    <>
      <div className={styles.frame}>
        <button onClick={startTimerHandler}>
          <span>Start</span>
        </button>
        <div className={styles.timer}>
          <CountdownCircleTimer
            isPlaying={isPlaying}
            size={200}
            duration={durationSeconds}
            colors={[
              ["#11998e", 0.33],
              ["#786140", 0.33],
              ["#b93d0e", 0.33],
            ]}
          >
            {handleTimePass(exercise)}
          </CountdownCircleTimer>
        </div>
        <button onClick={stopTimerHandler}>
          <span>Stop</span>
        </button>
      </div>
    </>
  );
};

const handleTimePass =
  (exercise: string) =>
  ({ remainingTime }: TimeProps) =>
    renderTimeHandler(remainingTime, exercise);

const renderTimeHandler = (seconds: number | undefined, exercise: string) => (
  <div className={styles.timer}>
    <div className={styles.text}>{exercise}</div>
    <div className={styles.value}>{seconds}</div>
  </div>
);

export default Timer;

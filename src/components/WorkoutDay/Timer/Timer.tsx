import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
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
  const renderTimeHanlder = (seconds: number | undefined, exercise: string) => {
    return (
      <div className={styles.timer}>
        <div className={styles.text}>{exercise}</div>
        <div className={styles.value}>{seconds}</div>
      </div>
    );
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
            {({ remainingTime }) => renderTimeHanlder(remainingTime, exercise)}
          </CountdownCircleTimer>
        </div>
        <button onClick={stopTimerHandler}>
          <span>Stop</span>
        </button>
      </div>
    </>
  );
};

export default Timer;

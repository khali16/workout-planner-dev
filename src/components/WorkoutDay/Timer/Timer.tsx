import React, { useState } from "react";
import { CountdownCircleTimer, TimeProps } from "react-countdown-circle-timer";
import styles from "./Timer.module.css";

interface Props {
  durationSeconds: number;
  exercise: string;
}

const Timer: React.FC<Props> = ({ durationSeconds, exercise }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);

  const startTimerHandler = () => {
    setIsPlaying(true);
  };
  const stopTimerHandler = () => {
    setIsPlaying(false);
  };
  const resetTimeHandler = () => {
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <div className={styles.frame}>
        <button onClick={startTimerHandler}>
          <span>Start</span>
        </button>
        <div className={styles.timerWraper}>
          <CountdownCircleTimer
            key={key}
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
        <div className={styles.buttons}>
          <button onClick={stopTimerHandler} className={styles.stop}>
            <span>Stop</span>
          </button>
          <button onClick={resetTimeHandler} className={styles.restart}>
            <span>Restart</span>
          </button>
        </div>
      </div>
    </>
  );
};

const handleTimePass =
  (exercise: string) =>
  ({ remainingTime }: TimeProps) =>
    renderTimeHandler(remainingTime, exercise);

const renderTimeHandler = (seconds: number | undefined, exercise: string) => (
  <>
    <div className={styles.timer}>
      <div className={styles.text}>{exercise}</div>
      <div className={styles.value}>{seconds}</div>
    </div>
    {/* 
  // @ts-ignore */}
    {seconds <= 5 && (
      <audio>
        <source src="../../../Sound/T-REX ROAR.mp3" />
      </audio>
    )}
  </>
);

export default Timer;

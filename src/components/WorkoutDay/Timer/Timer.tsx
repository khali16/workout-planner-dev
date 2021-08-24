import React, { useState } from "react";
import { CountdownCircleTimer, TimeProps } from "react-countdown-circle-timer";
import useSound from "use-sound";
import styles from "./Timer.module.css";
import CountDownSound from "../../../Sound/5SecondCountdownSoundEffect.mp3";
import { useEffect } from "react";

interface Props {
  durationSeconds: number;
  exercise: string;
}

const Timer: React.FC<Props> = ({ durationSeconds, exercise }) => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [play] = useSound(CountDownSound);

  const [key, setKey] = useState(0);

  const startTimerHandler = () => {
    setIsTimerActive(true);
  };
  const stopTimerHandler = () => {
    setIsTimerActive(false);
  };
  const resetTimeHandler = () => {
    setKey((prevKey) => prevKey + 1);
  };

  const handleTimePass =
    (exercise: string) =>
    ({ remainingTime }: TimeProps) =>
      renderTimeHandler(remainingTime, exercise);

  const renderTimeHandler = (seconds: number | undefined, exercise: string) => {
    useEffect(() => {
      seconds === 5 && play();
    }, [seconds]);
    return (
      <>
        <div className={styles.timer}>
          <div className={styles.text}>{exercise}</div>
          <div className={styles.value}>{seconds}</div>
        </div>
      </>
    );
  };

  useEffect(() => {}, [durationSeconds]);

  return (
    <>
      <div className={styles.frame}>
        <button onClick={startTimerHandler}>
          <span>Start</span>
        </button>
        <div className={styles.timerWraper}>
          <CountdownCircleTimer
            key={key}
            isPlaying={isTimerActive}
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

export default Timer;

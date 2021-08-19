import React from "react";
import styles from "./CalendarHeadline.module.css";
import CurrentTimeInfo from "../currentTimeInfo/CurrentTimeInfo";

function CalendarHeadline(props: {
  prevMonth: () => void;
  month: number;
  year: number;
  nextMonth: () => void;
}) {
  return (
    <div className={styles.Header}>
      <button className={styles.Button1} onClick={props.prevMonth}>
        <span>Prev</span>
      </button>
      <div>
        <CurrentTimeInfo month={props.month} year={props.year} />
      </div>
      <button className={styles.Button} onClick={props.nextMonth}>
        <span>Next</span>
      </button>
    </div>
  );
}

export default CalendarHeadline;

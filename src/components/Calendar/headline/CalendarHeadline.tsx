import React from "react";
import styles from "./CalendarHeadline.module.css";
import CurrentTimeInfo from "../currentTimeInfo/CurrentTimeInfo";

function CalendarHeadline(props: {
  prevMonth: () => void;
  month: number;
  year: number;
}) {
  return (
    <div className={styles.Header}>
      <div>
        <CurrentTimeInfo month={props.month} year={props.year} />
      </div>
    </div>
  );
}

export default CalendarHeadline;

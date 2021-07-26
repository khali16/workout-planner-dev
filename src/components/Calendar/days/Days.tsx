import React, { FunctionComponent } from "react";
import styles from "./Days.module.css";
import Day from "../Day";
import { isLeapYear } from "../../../utils/validation";
import {
  DAYS,
  DAYS_LEAP,
  DAYS_OF_THE_WEEK,
} from "../../../constants/DateConsts";

interface OwnProps {
  date: Date;
  month: number;
  startDay: number;
  workouts: never[];
}

type Props = OwnProps;

const Days: FunctionComponent<Props> = ({
  date,
  month,
  startDay,
  workouts,
}) => {
  const days = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS;
  //@ts-ignore
  return (
    <>
      <div className={styles.DaysName}>
        {DAYS_OF_THE_WEEK.map((d) => (
          <div key={d}>
            <strong>{d}</strong>
          </div>
        ))}
      </div>
      <div className={styles.Days}>
        {Array(days[month] + (startDay - 1))
          .fill(null)
          .map((_, index) => {
            const day = index - (startDay - 2);
            return (
              <>
                <Day
                  key={day}
                  day={day}
                  index={index}
                  month={month}
                  workouts={workouts}
                ></Day>
              </>
            );
          })}
      </div>
    </>
  );
};

export default Days;

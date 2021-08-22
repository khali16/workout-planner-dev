import React, { FunctionComponent, useEffect } from "react";
import styles from "./Days.module.css";
import Day from "../Day";
import { isLeapYear } from "../../../utils/validation";
import {
  DAYS,
  DAYS_LEAP,
  DAYS_OF_THE_WEEK,
} from "../../../constants/DateConsts";
import {
  useWorkouts as useWorkouts,
  Workout,
} from "../../../hooks/useWorkouts";
import { useState } from "react";

interface OwnProps {
  date: Date;
  month: number;
  startDay: number;
}

type Props = OwnProps;

const Days: FunctionComponent<Props> = ({ date, month, startDay }) => {
  const daysAmount = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS;
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const { workoutsDB, monthName } = useWorkouts(month);

  useEffect(() => {
    setWorkouts(workoutsDB);
  }, [workoutsDB, month, monthName]);

  return (
    <>
      <div className={styles.DaysName}>
        {DAYS_OF_THE_WEEK.map((day) => (
          <div key={day}>
            <strong>{day}</strong>
          </div>
        ))}
      </div>
      <div className={styles.Days}>
        {createMonthSizeArray(daysAmount, month, startDay)
          .fill(null)
          .map((_, dayIndex) => renderDay(dayIndex, startDay, workouts, month))}
      </div>
    </>
  );
};

const createMonthSizeArray = (
  daysAmount: number[],
  month: number,
  startDay: number
) => {
  const startDayNumber = startDay > 0 ? startDay : 1;
  return Array(daysAmount[month] + startDayNumber);
};

const renderDay = (
  dayIndex: number,
  startDay: number,
  workouts: Workout[],
  month: number
) => {
  const day = dayIndex - (startDay - 1);
  const dayWorkouts = filterDayWorkouts(workouts, day);
  return (
    <Day
      key={day}
      day={day}
      index={dayIndex}
      month={month}
      workouts={dayWorkouts}
    />
  );
};

const filterDayWorkouts = (workouts: Workout[], day: number) =>
  workouts.filter((workout) => workout.day === day);

export default Days;

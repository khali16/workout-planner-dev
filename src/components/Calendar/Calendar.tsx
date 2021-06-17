import React, { useState, useEffect, FormEvent } from "react";
import styles from "./Calendar.module.css";
import Day from "./Day";
import { Route, useRouteMatch, withRouter, Link } from "react-router-dom";
import DayDetail from "./DayDetail";
import { stringify } from "querystring";

const Calendar = () => {
  const match = useRouteMatch();

  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const DAYS_OF_THE_WEEK = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const MONTHS = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  const today = new Date();
  const [date, setDate] = useState(today);
  const [day, setDay] = useState(date.getDate());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date));
  const [error, setError] = useState("");
  const [workouts, setWorkouts] = useState(Array());

  useEffect(() => {
    setDay(date.getDate());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
    setStartDay(getStartDayOfMonth(date));
  }, [date]);

  function getStartDayOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  }

  function isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const days = isLeapYear(date.getFullYear()) ? DAYS_LEAP : DAYS;

  async function fetchWorkout() {
    try {
      const response = await fetch(
        "https://workout-planner-e4e5e-default-rtdb.firebaseio.com/workouts.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong...");
      }

      const data = await response.json();

      const workouciki = [];

      for (const key in data) {
        setWorkouts;
        workouciki.push({
          id: key,
          title: data[key].title,
          specifiedDay: data[key].specifiedDay,
          specifiedMonth: data[key].specifiedMonth,
        });
      }
      setWorkouts(workouciki);
      console.log(workouciki);
      console.log(workouts);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <div className={styles.Frame}>
        <div className={styles.Header}>
          <button
            className={styles.Button1}
            onClick={() => setDate(new Date(year, month - 1, day))}
          >
            <span>Prev</span>
          </button>
          <div>
            {MONTHS[month]} {year}
          </div>
          <button onClick={fetchWorkout}>get</button>
          <button
            className={styles.Button}
            onClick={() => setDate(new Date(year, month + 1, day))}
          >
            <span>Next</span>
          </button>
        </div>
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
              const d = index - (startDay - 2);
              return (
                <>
                  <Day key={d} d={d} index={index} month={month}></Day>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default withRouter(Calendar);

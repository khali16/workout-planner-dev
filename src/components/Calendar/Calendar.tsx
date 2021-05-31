import React, { useState, useEffect, FormEvent } from "react";
import styles from "./Calendar.module.css";

const Calendar = () => {
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
  const [todo, setTodo] = useState(false);

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

  const cipka = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTodo((prevState) => {
      return !prevState;
    });
  };

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
                <div className={styles.Day} key={index} onClick={cipka}>
                  {d > 0 ? d : ""}
                  {todo && (
                    <div>
                      <input type="text" />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Calendar;

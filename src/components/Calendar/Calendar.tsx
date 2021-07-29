import React, { useEffect, useState } from "react";
import styles from "./Calendar.module.css";
import { useRouteMatch, withRouter } from "react-router-dom";
import CurrentTimeInfo from "./currentTimeInfo/CurrentTimeInfo";
import { useDate } from "../../hooks/useDate";
import { DAYS_OF_THE_WEEK } from "../../constants/DateConsts";
import Days from "./days/Days";
import CalendarHeadline from "./headline/CalendarHeadline";
import { useAuth } from "../../store/auth-context";

const Calendar = () => {
  const today = new Date();
  const [date, setDate] = useState(today);
  const [cwiczenia, setCwiczenia] = useState([]);
  const { day, startDay, month, year } = useDate(date);
  const { fetchWorkouts, workouts } = useAuth();

  useEffect(() => {
    fetchWorkouts(setCwiczenia);
    console.log(workouts);
  }, []);

  return (
    <>
      <div className={styles.Frame}>
        <CalendarHeadline
          onClick={() => setDate(new Date(year, month - 1, day))}
          month={month}
          year={year}
          onClick1={() => setDate(new Date(year, month + 1, day))}
        />
        <Days date={date} month={month} startDay={startDay} />
      </div>
    </>
  );
};

export default withRouter(Calendar);

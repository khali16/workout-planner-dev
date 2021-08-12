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
  const { day, startDay, month, year } = useDate(date);

  return (
    <>
      <div className={styles.Frame}>
        <CalendarHeadline
          prevMonth={() => setDate(new Date(year, month - 1, day))}
          month={month}
          year={year}
        />
        <Days date={date} month={month} startDay={startDay} />
      </div>
    </>
  );
};

export default withRouter(Calendar);

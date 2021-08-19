import React, { useEffect, useState } from "react";
import styles from "./Calendar.module.css";
import { withRouter } from "react-router-dom";
import { useDate } from "../../hooks/useDate";
import Days from "./days/Days";
import CalendarHeadline from "./headline/CalendarHeadline";

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
          nextMonth={() => setDate(new Date(year, month + 1, day))}
        />
        <Days date={date} month={month} startDay={startDay} />
      </div>
    </>
  );
};

export default withRouter(Calendar);

import React from "react";
import styles from "./Day.module.css";
import { useRouteMatch, useHistory} from "react-router-dom";

interface OwnProps {
  index: number;
  day: number;
  month: number;
}

const Day: React.FC<OwnProps> = ({ index, day, month }: OwnProps) => {
  let history = useHistory();
  const match = useRouteMatch();
  const rightMonthFigure = month + 1;

  const pushToSelectedDayHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    history.push(`${match.url}/${rightMonthFigure}/${day}`);
  };

  const today = new Date();
  const currentDay = today.getDate();

  const currentDayBox = day === currentDay ? styles.CurrentDay : "";
  const dayBox = day > 0 ? styles.Day : styles.nonDay;

  return (
    <>
      <div
        className={`${dayBox} ${currentDayBox}`}
        key={index}
        onClick={pushToSelectedDayHandler}
      >
        {day > 0 ? day : ""}
      </div>
    </>
  );
};

export default Day;

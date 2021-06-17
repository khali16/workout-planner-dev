import React, { MouseEventHandler, useState } from "react";
import styles from "./Day.module.css";
import { useRouteMatch, useHistory, useParams, Link } from "react-router-dom";
interface OwnProps {
  index: number;
  d: number;
  month: number;
}

const Day: React.FC<OwnProps> = ({ index, d, month }: OwnProps) => {
  let history = useHistory();
  const match = useRouteMatch();
  const rightMonthFigure = month + 1;

  const pushToSelectedDayHandler = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    history.push(`${match.url}/${rightMonthFigure}/${d}`);
  };

  const dayBox = d > 0 ? styles.Day : styles.nonDay;

  return (
    <>
      <div className={dayBox} key={index} onClick={pushToSelectedDayHandler}>
        {d > 0 ? d : ""}
      </div>
    </>
  );
};

export default Day;

import React, { useState } from "react";
import styles from "./Day.module.css";
import { useRouteMatch, useHistory, Route, useParams } from "react-router-dom";
import DayDetail from "./DayDetail";

interface OwnProps {
  index: number;
  d: number;
  month: number;
}

interface ParamTypes {
  day: string;
}

const Day: React.FC<OwnProps> = ({ index, d, month }: OwnProps) => {
  let history = useHistory();
  const match = useRouteMatch();

  const cipka = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    history.push(`${match.url}/${month}/${d}`);
  };

  const dayBox = d > 0 ? styles.Day : styles.nonDay;

  return (
    <>
      <div className={dayBox} key={index} onClick={cipka}>
        {d > 0 ? d : ""}
      </div>
    </>
  );
};

export default Day;

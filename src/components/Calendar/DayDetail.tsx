import React from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import style from "./DayDetail.module.css";

interface PropTypes {
  text: number;
}

const DayDetail: React.FC<PropTypes> = ({ text }) => {
  return (
    <>
      <div className={style.frame}>{text}halo</div>
    </>
  );
};

export default DayDetail;

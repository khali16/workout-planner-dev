import React from "react";
import {
  useParams,
  Route,
  Link,
  useRouteMatch,
  match,
  matchPath,
} from "react-router-dom";
import Day from "./Day";
import styles from "./DayDetail.module.css";

interface paramTypes {
  day: string;
  month: string;
}

const DayDetail: React.FC = () => {
  const params = useParams<paramTypes>();
  const { day, month } = params;

  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthToNumber = parseInt(month) - 1;
  let monthName = monthNames[monthToNumber];

  return (
    <>
      <div className={styles.Frame}>
        <div className={styles.Header}>
          <div className={styles.Day}>{day}</div>
          <div className={styles.Month}>{monthName}</div>
        </div>
        <div className={styles.Form}>
          <form>
            <label htmlFor="title" className={styles.TextInput_label}>
              Title
            </label>
            <input
              type="input"
              className={styles.TextInput}
              id="title"
              required
            />
            <div className={styles.RadioInput}>
              <span>Type of exercise</span>
              <input type="radio" value="legs" id="legs" />
              <label htmlFor="legs">Legs</label>
              <input type="radio" value="glutes" id="glutes" />
              <label htmlFor="glutes">Glutes</label>
              <input type="radio" value="abs" id="abs" />
              <label htmlFor="abs">Abs</label>
              <input type="radio" value="arms" id="arms" />
              <label htmlFor="arms">Arms</label>
              <input type="radio" value="back" id="back" />
              <label htmlFor="back">Back</label>
            </div>
            <div className={styles.SpecifiedWorkout}>
              <label htmlFor="specifiedWorkout" className={styles.Label}>
                Specified Workout
              </label>
              <input
                type="text"
                id="specifiedWorkout"
                className={styles.TextInput}
              />
            </div>
            <div className={styles.VideoInput}>
              <label htmlFor="video" className={styles.Label}>
                Helpful video
              </label>
              <input type="url" id="video" className={styles.TextInput} />
            </div>
            <button type="submit">
              <span>Submit</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DayDetail;

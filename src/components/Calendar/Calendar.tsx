import React, {useEffect, useState} from "react";
import styles from "./Calendar.module.css";
import { withRouter } from "react-router-dom";
import {useDate} from "../../hooks/useDate";
import Days from "./days/Days";
import CalendarHeadline from "./headline/CalendarHeadline";

const Calendar = () => {

    const today = new Date();
    const [date, setDate] = useState(today);
    const [error, setError] = useState("");
    const [workouts, setWorkouts] = useState(Array());
    const {day, startDay, month, year} = useDate(date);

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
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        fetchWorkout();
    }, [])


    return (
        <>
            <div className={styles.Frame}>
                    <CalendarHeadline onClick={() => setDate(new Date(year, month - 1, day))} month={month}
                                      year={year}
                                      onClick1={() => setDate(new Date(year, month + 1, day))}/>
                    <Days date={date} month={month} startDay={startDay}/>
            </div>
        </>
    );
};

export default withRouter(Calendar);

import React from 'react';
import styles from "./CalendarHeadline.module.css";
import CurrentTimeInfo from "../currentTimeInfo/CurrentTimeInfo";


function CalendarHeadline(props: { onClick: () => void, month: number, year: number, onClick1: () => void }) {
    return <div className={styles.Header}>
        <button
            className={styles.Button1}
            onClick={props.onClick}
        >
            <span>Prev</span>
        </button>
        <div>
            <CurrentTimeInfo month={props.month} year={props.year}/>
        </div>
        <button
            className={styles.Button}
            onClick={props.onClick1}
        >
            <span>Next</span>
        </button>
    </div>;
}


export default CalendarHeadline;

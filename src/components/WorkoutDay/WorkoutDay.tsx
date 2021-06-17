import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import ReactPlayer from "react-player";
import "react-vertical-timeline-component/style.min.css";

import WorkoutDayForm from "./form/WorkoutDayForm";
import {useState} from "react";

interface OwnProps {
}

type Props = OwnProps;

const WorkoutDay: React.FC<Props> = (props) => {
    const [exercies, setExercies] = useState([]);
    return (
        <VerticalTimeline>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date="rozgrzewka - 5 min biegu"
                iconStyle={{background: "rgb(33, 150, 243)", color: "#fff"}}
            >
                <h3 className="vertical-timeline-element-title">Biegamy z Gandalfem</h3>
                <br/>
                <br/>
                <WorkoutDayForm/>


                <p>Magiczny bieg w miejscu</p>
            </VerticalTimelineElement>

            <VerticalTimelineElement
                iconStyle={{background: "rgb(100, 104, 252)", color: "#fff"}}
                iconOnClick={() => {
                    console.log('elo')
                }}>add exercise</VerticalTimelineElement>
            <VerticalTimelineElement
                iconStyle={{background: "rgb(16, 204, 82)", color: "#fff"}}
            >Create training!</VerticalTimelineElement>
        </VerticalTimeline>
    );
};

export default WorkoutDay;

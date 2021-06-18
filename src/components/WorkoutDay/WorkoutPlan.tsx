import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

import { workoutPlanKubi } from "./exercise/form/ExerciseForm";
import { useState } from "react";
import ExerciseRenderer from "./exercise/ExerciseRenderer";
import { Exercise } from "../../constants/interfaces";
import { useCurrentDate } from "../../hooks/useCurrentDate";

interface OwnProps {}

type Props = OwnProps;

const initializeEmptyWorkoutPlan = (): workoutPlanKubi => ({
  isCyclical: { days: [] },
  specifiedDay: "",
  specifiedMonth: "",
  time: 0,
  title: "Plan treningu",
  exercises: [{ title: "", finished: false }],
});

const WorkoutPlan: React.FC<Props> = (props) => {
  const { day, monthName } = useCurrentDate();
  const [workoutPlan, setWorkoutPlan] = useState<workoutPlanKubi>({
    ...initializeEmptyWorkoutPlan(),
    specifiedMonth: monthName,
    specifiedDay: day,
  });
  async function addWorkout() {
    const newWorkout: workoutPlanKubi = {
      ...workoutPlan,
      isCyclical: { days: [] },
      // @ts-ignore
      time: workoutPlan.exercises.reduce(
        // @ts-ignore
        ({ totalTime: currentTime }, { totalTime }) => currentTime + totalTime
      ),
    };
    setWorkoutPlan({ ...newWorkout });
    // const response = await fetch(
    //   "https://workout-planner-e4e5e-default-rtdb.firebaseio.com/workouts.json",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(workoutPlan),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // const data = await response.json();
  }

  const addNewExercise = (newExercise: Exercise) => ({
    ...workoutPlan,
    exercises: [...workoutPlan.exercises, newExercise],
  });
  return (
    <div>
      Tytul: {workoutPlan.title}
      Dzien: {workoutPlan.specifiedDay}
      Miesiac: {workoutPlan.specifiedMonth}
      Czas w sekundkach: {workoutPlan.time}
      <VerticalTimeline>
        {workoutPlan.exercises.map((exercise) => (
          <ExerciseRenderer exercise={exercise} addExercise={addNewExercise} />
        ))}
        <VerticalTimelineElement
          iconStyle={{ background: "rgb(100, 104, 252)", color: "#fff" }}
          iconOnClick={() => {
            console.log(workoutPlan);
            let addNewExercise = {
              ...workoutPlan,
              exercises: [
                ...workoutPlan.exercises,
                ...initializeEmptyWorkoutPlan().exercises,
              ],
            };
            setWorkoutPlan(addNewExercise);
          }}
        >
          Add exercise
        </VerticalTimelineElement>
        <VerticalTimelineElement
          iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
          iconOnClick={() => {
            // addWorkout(workoutPlan);
          }}
        >
          Save training!
        </VerticalTimelineElement>
      </VerticalTimeline>
    </div>
  );
};

export default WorkoutPlan;

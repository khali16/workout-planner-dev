import React from "react";
import { Route, Switch } from "react-router-dom";
import Calendar from "./components/Calendar/Calendar";
import ExerciseForm from "./components/WorkoutDay/exercise/form/ExerciseForm";
import LoginForm from "./components/Forms/LoginForm";
import SignUpForm from "./components/Forms/SignUpForm";
import Layout from "./components/Layout/Layout";
import WorkoutPlan from "./components/WorkoutDay/WorkoutPlan";
import { AuthProvider } from "./store/auth-context";

function App() {
  return (
    <Layout>
      <AuthProvider>
        <Switch>
          <Route path="/" exact>
            <LoginForm />
          </Route>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/sign-up">
            <SignUpForm />
          </Route>
          <Route path="/calendar/:month/:day">
            <WorkoutPlan />
          </Route>
          <Route path="/calendar">
            <Calendar />
          </Route>
        </Switch>
      </AuthProvider>
    </Layout>
  );
}

export default App;

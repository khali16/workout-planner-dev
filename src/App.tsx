import React from "react";
import { Route, Switch } from "react-router-dom";
import Calendar from "./components/Calendar/Calendar";
import DayDetail from "./components/WorkoutDay/DayDetail";
import LoginForm from "./components/Forms/LoginForm";
import SignUpForm from "./components/Forms/SignUpForm";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Layout>
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
          <DayDetail />
        </Route>
        <Route path="/calendar">
          <Calendar />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;

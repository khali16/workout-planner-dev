import React from "react";
import { Route, Switch } from "react-router-dom";
import Calendar from "./components/Calendar/Calendar";
import LoginForm from "./components/Forms/LoginForm";
import Layout from "./components/Layout/Layout";
import WorkoutPlan from "./components/WorkoutDay/WorkoutPlan";
import { AuthProvider } from "./store/auth-context";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Layout>
      <AuthProvider>
        <Switch>
          <Route path="/" exact>
            <LoginForm />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/sign-up">
            <SignUp />
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

import {Route, Switch} from 'react-router-dom';
import LoginForm from './components/Forms/LoginForm';
import SignUpForm from './components/Forms/SignUpForm';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Layout>
      <Switch>
      <Route path="/" exact>
        <LoginForm/>
      </Route>
      <Route path="/login">
        <LoginForm/>
      </Route>
      <Route path="/sign-up">
        <SignUpForm/>
      </Route>
      </Switch>
    </Layout>
  );
}

export default App;

import {Route} from 'react-router-dom';
import LoginForm from './components/Forms/LoginForm';
import SignUpForm from './components/Forms/SignUpForm';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Layout>
      <Route path="/login">
        <LoginForm/>
      </Route>
      <Route path="/sign-up">
        <SignUpForm/>
      </Route>
    </Layout>
  );
}

export default App;

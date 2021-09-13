import './App.css';
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom'; 
import LoginPage from './login';
import Signup from './signup';
import Dashboard from './dashboard';

function App() {

  const isLoggedIn = !!localStorage.getItem('loginToken');

  return (
    <Router>
      <Switch>
      <Route
        path="/login" component = {LoginPage}
      />
       <Route
        path="/signup"
        component = {Signup}
      />

      <Route path="/dashboard" component = {Dashboard} />
      <Redirect
          from="/"
          exact
          to={ '/login'}
        />
       {/*
      <Route
        path="/employeelist"
        component={RedirectPage}
      /> */}
      </Switch>
    </Router>
  );
}

export default App;

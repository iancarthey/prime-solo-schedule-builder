import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import MySchedules from './components/MySchedules/MySchedules';
import CreateSchedule from './components/CreateSchedule/CreateSchedule';
import ScheduleItemForm from './components/ScheduleItemForm/ScheduleItemForm';

import './styles/main.css';

const App = () => (
  <div>
    <Header title="Schedule Builder" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/schedules"
          component={MySchedules}
        />
        <Route
          path="/create"
          component={CreateSchedule}
        />
           <Route
          path="/form"
          component={ScheduleItemForm}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;

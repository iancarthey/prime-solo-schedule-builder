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
import MySchedules from './components/ManageSchedulePage/MySchedules/MySchedules';
import CreateSchedule from './components/CreatePage/CreateSchedule/CreateSchedule';
import AboutThisProject from './components/AboutThisProjectPage/AboutThisProject/AboutThisProject';


import './styles/main.css';
  

const App = () => (
  <div className="topLevel">
    <Header title="Schedules From Glen" />
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
          path="/about"
          component={AboutThisProject}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;

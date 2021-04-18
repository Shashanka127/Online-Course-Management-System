import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import EnrolledCourses from './pages/EnrolledCourses';
import AvailableCourses from './pages/AvailableCourses';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/home" component={Homepage} />
      <Route exact path="/enrolledCourses" component={EnrolledCourses} />
      <Route exact path='/availableCourses' component={AvailableCourses} />
      <Route exact path="/register" component={Register} />
    </Switch>
  )
}
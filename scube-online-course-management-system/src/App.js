import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import EnrolledCourses from './pages/EnrolledCourses';
import AvailableCourses from './pages/AvailableCourses';
import StudentHomepage from './pages/StudentHomepage';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import StudentLogin from './pages/StudentLogin';
import Login from './pages/Login';
import ProfessorLogin from './pages/ProfessorLogin';
import StudentRegister from './pages/StudentRegister';
import ProfessorRegister from './pages/ProfessorRegister';
import ProfessorHomepage from './pages/ProfessorHomepage';
import CreatedCourses from './pages/CreatedCourses';
import CreateCourse from './pages/CreateCourse';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/studentlogin" component={StudentLogin} />
      <Route exact path="/professorlogin" component={ProfessorLogin} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/studentregister" component={StudentRegister} />
      <Route exact path="/professorregister" component={ProfessorRegister} />
      <Route exact path="/professorhome" component={ProfessorHomepage} />
      <Route exact path="/createdCourses" component={CreatedCourses} />
      <Route exact path="/createCourse" component={CreateCourse} />
      <Route exact path="/studenthome" component={StudentHomepage} />
      <Route exact path="/enrolledCourses" component={EnrolledCourses} />
      <Route exact path='/availableCourses' component={AvailableCourses} />
    </Switch>
  )
}
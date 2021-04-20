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
import CourseDashboard from './pages/CourseDashboard';
import CourseAssignments from './pages/CourseAssignments';
import CourseForum from './pages/CourseForum';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/studentLogin" component={StudentLogin} />
      <Route exact path="/professorLogin" component={ProfessorLogin} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/studentRegister" component={StudentRegister} />
      <Route exact path="/professorRegister" component={ProfessorRegister} />
      <Route exact path="/professorHome" component={ProfessorHomepage} />
      <Route exact path="/createdCourses" component={CreatedCourses} />
      <Route exact path="/createCourse" component={CreateCourse} />
      <Route exact path="/studentHome" component={StudentHomepage} />
      <Route exact path="/enrolledCourses" component={EnrolledCourses} />
      <Route exact path='/availableCourses' component={AvailableCourses} />
      <Route exact path='/courseDashboard' component={CourseDashboard} />
      <Route exact path='/courseAssignments' component={CourseAssignments} />
      <Route exact path='/courseForum' component={CourseForum} />
    </Switch>
  )
}
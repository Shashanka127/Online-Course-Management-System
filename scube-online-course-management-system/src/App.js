import React from 'react';
import { Switch, Route} from 'react-router-dom';

import EnrolledCourses from './pages/EnrolledCourses';
import AvailableCourses from './pages/AvailableCourses';
import StudentHomepage from './pages/StudentHomepage';
import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';
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
      <Route exact path="/register" component={Register} />
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
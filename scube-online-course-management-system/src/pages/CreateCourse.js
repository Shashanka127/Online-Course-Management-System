import { Redirect } from 'react-router-dom';
import CreateCourseForm from '../components/CreateCourseForm';
import DashboardHeader from '../components/DashboardHeader';

export default function CreateCourse() {
  if (localStorage.getItem("username") == null) {
    return (<Redirect to='/login' />)
  }

  const navBarTabs = [
    {'name': "Your Profile", 'link': '/professorHome', 'style': 1},
    {'name': "Created Courses", 'link': '/createdCourses', 'style': 1},
    {'name': "Create a new Course", 'link': '/createCourse', 'style': 0}
  ]

  return (
    <div>
      <DashboardHeader pageName="Create a new Course" navBarTabs={navBarTabs} goBackAction="Sign Out"/>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-3">
              <CreateCourseForm />
          </div>
        </div>
      </main>
    </div>
  )
}

import { Redirect } from 'react-router-dom'
import DashboardHeader from '../components/DashboardHeader'
import Forum from '../components/Forum'

export default function CourseForum() {
  if (localStorage.getItem("username") == null) {
    return (<Redirect to='/login' />)
  }

  const navBarTabs = [
    {'name': "Course Dashboard", 'link': '/courseDashboard', 'style': 1},
    {'name': "Course Assignments", 'link': '/courseAssignments', 'style': 1},
    {'name': "Course Forum", 'link': '/courseForum', 'style': 0}
  ]

  return (
    <div>
      <DashboardHeader pageName="Forum" navBarTabs={navBarTabs} goBackAction="Go Back to homepage"/>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-3">
            <Forum courseName={localStorage.getItem('chosenCourse')}/>
          </div>
        </div>
      </main>
    </div>
  )
}

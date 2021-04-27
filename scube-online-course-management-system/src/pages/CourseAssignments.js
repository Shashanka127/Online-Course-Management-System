import { Redirect } from 'react-router-dom'
import AssignmentList from '../components/AssignmentList'
import DashboardHeader from '../components/DashboardHeader'

export default function CourseAssignments() {
  if (localStorage.getItem("username") == null) {
    return (<Redirect to='/login' />)
  }

  const navBarTabs = [
    {'name': "Course Dashboard", 'link': '/courseDashboard', 'style': 1},
    {'name': "Course Assignments", 'link': '/courseAssignments', 'style': 0},
    {'name': "Course Forum", 'link': '/courseForum', 'style': 1}
  ]

  return (
    <div>
      <DashboardHeader pageName="Assignments" navBarTabs={navBarTabs} goBackAction="Go Back to homepage"/>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-3">
            <AssignmentList courseName={localStorage.getItem("chosenCourse")} />
          </div>
        </div>
      </main>
    </div>
  )
}

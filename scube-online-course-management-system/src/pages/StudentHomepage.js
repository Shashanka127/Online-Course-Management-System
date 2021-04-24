import { Redirect } from 'react-router-dom'
import DashboardHeader from '../components/DashboardHeader'
import Profile from '../components/Profile'

export default function StudentHomepage() {
  if (localStorage.getItem("username") == null) {
    return (<Redirect to='/login' />)
  }

  const navBarTabs = [
    {'name': "Your Profile", 'link': '/studentHome', 'style': 0},
    {'name': "Enrolled Courses", 'link': '/enrolledCourses', 'style': 1},
    {'name': "Available Courses", 'link': '/availableCourses', 'style': 1}
  ]

  return (
    <div>
      <DashboardHeader pageName="Profile" navBarTabs={navBarTabs}/>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-3">
            <Profile usertype="student" username={localStorage.getItem("username")} />
          </div>
        </div>
      </main>
    </div>
  )
}

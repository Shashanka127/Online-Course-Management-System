import { useEffect, useState } from "react"

export default function CourseProfile() {
  const [courseDetails, setCourseDetails] = useState({
    name: "Loading...",
    description: "Loading...",
    professor: "Loading...",
    students: ["Loading..."],
  })

  useEffect(() => {
    fetch('/api/course-details?courseName=' + localStorage.getItem("chosenCourse"), {
      method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
          setCourseDetails(data)
        })
  }, [])

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-2 py-5 text-center sm:px-2 bg-indigo-100 w-full rounded-md">
        <h1 className="text-3xl font-medium text-indigo-900">{localStorage.getItem("chosenCourse")}</h1>
        <div className="p-3" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div className="w-1/2 p-1" style={{border: "1px dashed grey", borderRadius: "3px"}}>
            {courseDetails.description}
          </div>
        </div>
      </div>
      <div className="border-t border-indigo-300">
        <dl>
          <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-indigo-900">Professor</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{courseDetails.professor}</dd>
          </div>
          <div className="bg-gray-100 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-indigo-900">Enrolled Students</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                {courseDetails.students.map((student) => (
                  <li key={student} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                  <div className="w-0 flex-1 flex items-center">
                    <span className="ml-2 flex-1 w-0 truncate">{student}</span>
                  </div>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
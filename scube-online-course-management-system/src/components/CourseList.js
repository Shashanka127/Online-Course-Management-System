import { useEffect } from 'react'

const courses = [
]

export default function CourseList( { username } ) {
  useEffect(() => {
    if (username === "none") {
      fetch('/api/getavailablecourses', {
        method: 'GET'
      })
          .then(response => response.json())
          .then(data => {
              console.log(data);
              let courseCount = data.length;
              for (let i = 0; i < courseCount; i++) {
                courses.push(data[i])
              };
          })
    }
  });

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="py-1 align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Professor
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Students Enrolled
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course.name} style={{height: '25vh'}}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={course.image} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{course.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <textarea className="text-sm text-gray-900 resize-none" style={{height: '25vh'}} value={course.description} readOnly={true}/>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap"> {course.professor} </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {course.student.length}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="px-5 py-2 text-green-600 hover:text-green-900 rounded-md bg-green-200">
                        Enroll
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

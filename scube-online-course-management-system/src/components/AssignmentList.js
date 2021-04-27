import { useState, useEffect } from 'react'
import Assignment from './Assignment';
import CreatePost from './CreatePost';

export default function AssignmentList({ courseName }) {
  const [assignmentList, setAssignments] = useState([]);

  useEffect(() => {
    fetch('/api/view-assignments?courseName=' + courseName + '&username=' + localStorage.getItem("username"), {
      method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setAssignments([]);
          let assignmentCount = data.length;
          let assignments = [];
          for (let i = 0; i < assignmentCount; i++) {
            assignments.push(data[i]);
          };
          setAssignments(assignments);
        })
  }, [courseName]);

  return (
    <div>
      {/* <CreatePost /> */}
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
                    Assignment Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Problem Link
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Deadline
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Grade
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Submit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {assignmentList.map((assignment) => (
                  <Assignment key={assignment.time} courseName={localStorage.getItem("chosenCourse")} assignmentName={assignment.assignmentName} problemLink={assignment.ProblemLink} deadline={assignment.deadline} submitted={assignment.submitted} grade={assignment.grade} username={localStorage.getItem("username")} userType={localStorage.getItem("usertype")} time={assignment.time} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

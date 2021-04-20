import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function CreateCourseForm() {
  let history = useHistory();

  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  let username = localStorage.getItem("username");

  const registrationHandler = e => {
    e.preventDefault();
    fetch('/api/create-course?professor=' + username + '&courseName=' + courseName + '&description=' + courseDescription, {
      method: 'POST'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data['success']);
            if (data['success']) {
              localStorage.setItem("username", username);
              history.push('/professorhome');
            }
            window.location.reload();
        })
  }

  return (
    <div className="justify-items-center">
      <div className="sm:mt-0 items-center">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={registrationHandler}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">    
              <div className="col-span-6 sm:col-span-3">
              <label htmlFor="profile_pic_url" className="block text-sm font-medium text-gray-700">
                Course Name
              </label>
              <input
                type="text"
                name="profile_pic_url"
                id="profile_pic_url"
                autoComplete="family-name"
                onChange={e => setCourseName(e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              </div>
    
              <div className="col-span-6 sm:col-span-4">
              <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">
                Course Description
              </label>
              <input
                type="text"
                name="email_address"
                id="email_address"
                autoComplete="email"
                onChange={e => setCourseDescription(e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              </div>
            </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Course
            </button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}
  
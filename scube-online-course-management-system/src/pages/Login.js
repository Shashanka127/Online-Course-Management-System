import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { generateAPICall } from '../utils'

export default function Login() {
  let history = useHistory();

  const [credentials, setCredentials] = useState({
    'username': '',
    'password': ''
  });

  const [userType, setAccountType] = useState("student");

  const loginHandler = e => {
    e.preventDefault()
    let requestURL = generateAPICall('/api/' + userType + '-login?', credentials)
    fetch(requestURL, {
      method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data['success']);
            if (data['success']) {
              localStorage.setItem("username", credentials.username);
              localStorage.setItem("usertype", userType);
              history.push('/' + userType + 'Home');
            }
            window.location.reload();
        })
  }

  const goBack = () => {
    history.push("/");
    window.location.reload();
  }

  return (
    <div>
      <div className="w-full py-1 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
              <span className="block xl:inline text-white font-bold text-2xl">SCUBE Online Course Management System</span>
          </div>
          <div className="ml-4 flex items-center md:ml-6">
            <button onClick={() => goBack()} className="bg-red-500 p-1 rounded-md text-white hover:text-red-500 hover:bg-white px-5 py-2 m-5 text-sm font-medium">
              Back
            </button>
          </div>
        </div>
      </div>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your account</h1>

        {
          userType === "student" ?
          <div className="mt-3 sm:mt-3 sm:flex lg:justify-start text-center">
            <div id="student" className="appearance-none rounded-none relative block w-full px-5 py-2 border border-indigo-700 bg-indigo-700 text-white rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 cursor-pointer">
              Student
            </div>
            <div className="appearance-none rounded-none relative block w-full px-3 py-2 border border-indigo-700 text-gray-900 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 cursor-pointer hover:bg-indigo-700 hover:text-white" onClick={() => setAccountType("professor")}>
              Professor
            </div>
          </div> :
          <div className="mt-3 sm:mt-3 sm:flex lg:justify-start text-center">
            <div id="student" className="appearance-none rounded-none relative block w-full px-5 py-2 border border-indigo-700 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 cursor-pointer hover:bg-indigo-700 hover:text-white" onClick={() => setAccountType("student")}>
              Student
            </div>
            <div className="appearance-none rounded-none relative block w-full px-3 py-2 border border-indigo-700 bg-indigo-700 text-white rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 cursor-pointer">
              Professor
            </div>
          </div>
        }

        <form className="mt-8 space-y-6" onSubmit={loginHandler}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={credentials.username}
                onChange={e => setCredentials({...credentials, 'username': e.target.value})}
                placeholder="Username"
                autoFocus
                autoComplete='off'
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                value={credentials.password}
                onChange={e => setCredentials({...credentials, 'password': e.target.value})}
                placeholder="Password"
                autoComplete='off'
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}
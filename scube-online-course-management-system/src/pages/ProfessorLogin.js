import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { generateAPICall } from '../utils'

export default function ProfessorLogin() {
  let history = useHistory();

  const [credentials, setCredentials] = useState({
    'username': '',
    'password': ''
  });

  const loginHandler = e => {
    e.preventDefault();
    let requestURL = generateAPICall('/api/professor-login?', credentials)
    fetch(requestURL, {
      method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data['success']);
            if (data['success']) {
              localStorage.setItem("username", credentials.username);
              history.push('/professorHome');
            }
            window.location.reload();
        })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-5xl text-center tracking-tight font-extrabold text-indigo-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">SCUBE<br/></span>{' '}
            <span className="block text-blue-600 xl:inline">Online Course<br/>Management System</span>
          </h1>

          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">Log in to your professor account</h2>
        </div>

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
  )
}
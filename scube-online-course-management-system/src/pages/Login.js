import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  let history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = e => {
    e.preventDefault();
    fetch('/login/' + username + '&' + password, {
      method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data['success']);
            if (data['success']) {
              localStorage.setItem("Username", username);
              history.push('/home');
            }
            window.location.reload();
        })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
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
                value={username}
                onChange={e => setUsername(e.target.value)}
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
                type="text"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
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
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}
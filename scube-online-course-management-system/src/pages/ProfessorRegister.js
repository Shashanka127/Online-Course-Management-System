import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function ProfessorRegister() {
  let history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState("");

  const [usernameExists, setUsernameExists] = useState("none");

  const registrationHandler = e => {
    e.preventDefault();
    fetch('/api/professor-register/' + profile + '&' + firstName + '&' + lastName + '&' + username + '&' + password, {
      method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data['success']);
            if (data['success']) {
              localStorage.setItem("username", username);
              history.push('/professorHome');
            }
            window.location.reload();
        })
  }

  const usernameChangeHandler = e => {
    setUsername(e.target.value);
    fetch('/api/check-professor-username/' + e.target.value, {
      method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data['success']);
            if (data['success']) {
              setUsernameExists("block");
            }
            else {
              setUsernameExists("none");
            }
        })
  }

  return (
    <div className="m-5 justify-items-center">
    <h1 className="text-2xl mb-3 text-center tracking-tight font-extrabold text-indigo-900 sm:text-5xl md:text-5xl">
      <span className="block xl:inline">SCUBE<br/></span>{' '}
      <span className="block text-blue-600 xl:inline">Online Course<br/>Management System</span>
    </h1>
    
    <div className="hidden sm:block" aria-hidden="true">
      <div className="py-5">
      <div className="border-t border-gray-500" />
      </div>
    </div>
    
    <h1 className="text-3xl tracking-tight font-extrabold text-indigo-900 sm:text-xl md:text-3xl text-center">Create an account</h1>
    
    <div className="hidden sm:block" aria-hidden="true">
      <div className="py-5">
      <div className="border-t border-gray-500" />
      </div>
    </div>
    
      <div className="mt-10 mx-10 sm:mt-0 items-center">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form onSubmit={registrationHandler}>
          <div className="shadow overflow-hidden sm:rounded-md">
            <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <input
                type="text"
                name="first_name"
                id="first_name"
                autoComplete="given-name"
                onChange={e => setFirstName(e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              </div>
    
              <div className="col-span-6 sm:col-span-3">
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <input
                type="text"
                name="last_name"
                id="last_name"
                autoComplete="family-name"
                onChange={e => setLastName(e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              </div>
    
              <div className="col-span-6 sm:col-span-3">
              <label htmlFor="profile_pic_url" className="block text-sm font-medium text-gray-700">
                Profile Photo URL
              </label>
              <input
                type="text"
                name="profile_pic_url"
                id="profile_pic_url"
                autoComplete="family-name"
                onChange={e => setProfile(e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              </div>
    
              <div className="col-span-6 sm:col-span-4">
              <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="email_address"
                id="email_address"
                autoComplete="email"
                onChange={e => usernameChangeHandler(e)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              <span style={{display: usernameExists}} className="text-red-700 text-md"> Username already exists! </span>
              </div>
    
              <div className="col-span-6">
              <label htmlFor="choose_password" className="block text-sm font-medium text-gray-700">
                Choose Password
              </label>
              <input
                type="password"
                name="choose_password"
                id="choose_password"
                autoComplete="street-address"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
              </div>
    
              <div className="col-span-6">
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm_password"
                id="confirm_password"
                autoComplete="street-address"
                onChange={e => setPassword(e.target.value)}
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
              Create Account
            </button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  )
  }
  
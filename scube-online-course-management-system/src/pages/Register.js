import { React, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { generateAPICall } from '../utils'

export default function Register() {
  let history = useHistory();

  const [userData, setUserData] = useState({
    'firstName': 'none',
    'lastName': 'none',
    'photoURL': 'none',
    'username': 'none',
    'password': 'none'
  });

  const [usernameExists, setUsernameExists] = useState('none');
  const [userType, setAccountType] = useState("student");

  const registrationHandler = e => {
    e.preventDefault();
    let requestURL = generateAPICall('/api/' + userType + '-register?', userData);
    fetch(requestURL, {
      method: 'POST'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data['success']);
            if (data['success']) {
              localStorage.setItem("username", userData.username);
              localStorage.setItem("usertype", userType);
              history.push('/' + userType + 'Home');
            }
            window.location.reload();
        })
  }

  const usernameChangeHandler = e => {
    setUserData({...userData, 'username': e.target.value})
    fetch('/api/check-' + userType + '-username?username=' + e.target.value, {
      method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data['success']);
            if (data['success']) {
              setUsernameExists("block");
            }
            else {
              setUsernameExists('none');
            }
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
    <div className="m-5 justify-items-center">
      <h1 className="text-3xl tracking-tight font-extrabold text-indigo-900 sm:text-xl md:text-3xl text-center">Create an account</h1>

      <div className="flex items-center justify-center">
      {
        userType === "student" ?
        <div className="flex justify-center items-center text-center mt-3 sm:mt-3 w-1/2">
          <div id="student" className="appearance-none rounded-none relative block w-1/2 px-5 py-2 border border-indigo-700 bg-indigo-700 text-white rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 cursor-pointer">
            Student
          </div>
          <div className="appearance-none rounded-none relative block w-1/2 px-3 py-2 border border-indigo-700 text-gray-900 rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 cursor-pointer hover:bg-indigo-700 hover:text-white" onClick={() => setAccountType("professor")}>
            Professor
          </div>
        </div> :
        <div className="flex justify-center items-center text-center mt-3 sm:mt-3 w-1/2">
          <div id="student" className="appearance-none rounded-none relative block w-1/2 px-5 py-2 border border-indigo-700 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 cursor-pointer hover:bg-indigo-700 hover:text-white" onClick={() => setAccountType("student")}>
            Student
          </div>
          <div className="appearance-none rounded-none relative block w-1/2 px-3 py-2 border border-indigo-700 bg-indigo-700 text-white rounded-r-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 cursor-pointer">
            Professor
          </div>
        </div>
      }
      </div>
      
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
                onChange={e => setUserData({...userData, 'firstName': e.target.value})}
                className="mt-1 p-1 block w-full shadow-md focus:shadow-lg sm:text-sm focus:outline-none rounded-md focus:border-indigo-500"
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
                onChange={e => setUserData({...userData, 'lastName': e.target.value})}
                className="mt-1 p-1 block w-full shadow-md focus:shadow-lg sm:text-sm focus:outline-none rounded-md focus:border-indigo-500"
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
                onChange={e => setUserData({...userData, 'photoURL': e.target.value})}
                className="mt-1 p-1 block w-full shadow-md focus:shadow-lg sm:text-sm focus:outline-none rounded-md focus:border-indigo-500"
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
                className="mt-1 p-1 block w-full shadow-md focus:shadow-lg sm:text-sm focus:outline-none rounded-md focus:border-indigo-500"
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
                className="mt-1 p-1 block w-full shadow-md focus:shadow-lg sm:text-sm focus:outline-none rounded-md focus:border-indigo-500"
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
                onChange={e => setUserData({...userData, 'password': e.target.value})}
                className="mt-1 p-1 block w-full shadow-md focus:shadow-lg sm:text-sm focus:outline-none rounded-md focus:border-indigo-500"
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
    </div>
  )
  }
  
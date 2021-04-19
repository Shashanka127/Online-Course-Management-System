import React from 'react'
import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <div>
      <div className="mx-auto">
        <div className="relative z-10 pt-10 pb-5 bg-white lg:max-w-2xl h-screen">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <main className="mx-auto max-w-5xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 ">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-5xl tracking-tight font-extrabold text-indigo-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">SCUBE<br/></span>{' '}
                <span className="block text-blue-600 xl:inline">Online Course<br/>Management System</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Login or Create a new account
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                <Link
                  to="/login"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-700 hover:bg-indigo-800 md:py-4 md:text-lg md:px-10"
                >
                  Log in
                </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                <Link
                  to="/register"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-900 bg-indigo-100 hover:bg-indigo-300 md:py-4 md:text-lg md:px-10"
                >
                  Register
                </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-3/4">
        <img
        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
        src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit"
        alt="something's wrong"
        />
      </div>
    </div>
  )
}
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import profileImage from '../images/generic-profile.png'

export default function DashboardHeader({ pageName, navBarTabs, goBackAction }) {
  let history = useHistory();

  const signOutHandler = () => {
    localStorage.clear();
    history.push('/');
    window.location.reload();
  }

  const goBackHandler = () => {
    history.push('/' + localStorage.getItem("usertype") + 'Home');
    window.location.reload();
  }

  const mainTabClassNames = [
    "bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium",
    "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
  ]

  const mobileTabClassNames = [
    "bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium",
    "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
  ]
  
  return (
    <div>
      <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="block xl:inline text-white font-bold text-2xl">SCUBE</span>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                  {navBarTabs.map((tab) => (
                    <Link key={tab.name} to={tab.link} className={mainTabClassNames[tab.style]}>
                      {tab.name}
                    </Link>
                  ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {
                    goBackAction === "Sign Out" ?
                    <button onClick={() => signOutHandler()} className="bg-red-500 p-1 rounded-md text-white hover:text-red-500 hover:bg-white px-5 py-2 m-5 text-sm font-medium">
                      Sign Out
                    </button> :
                    <button onClick={() => goBackHandler()} className="bg-red-500 p-1 rounded-md text-white hover:text-red-500 hover:bg-white px-5 py-2 m-5 text-sm font-medium">
                      Go Back to homepage
                    </button>
                  }
                  <div className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={profileImage}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navBarTabs.map((tab) => (
                <Link key={tab.name} to={tab.link} className={mobileTabClassNames[tab.style]}>
                  {tab.name}
                </Link>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={profileImage}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">{localStorage.username}</div>
                </div>
                {
                  goBackAction === "Sign Out" ?
                  <button onClick={() => signOutHandler()} className="ml-auto bg-red-500 p-1 rounded-md text-white hover:text-red-500 hover:bg-white px-5 py-2 m-5 text-sm font-medium">
                    Sign Out
                  </button> :
                  <button onClick={() => goBackHandler()} className="ml-auto bg-red-500 p-1 rounded-md text-white hover:text-red-500 hover:bg-white px-5 py-2 m-5 text-sm font-medium">
                    Go Back to homepage
                  </button>
                }
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>

    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">{pageName}</h1>
      </div>
    </header>
  </div>
  )
}
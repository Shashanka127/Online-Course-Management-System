import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CodeIcon } from '@heroicons/react/outline'
import { generateAPICall } from '../utils';

export default function Assignment({ courseName, assignmentName, problemLink, deadline, submitted, grade, username, userType, time }) {
  const [actionAlert, setActionAlert] = useState(false);
  const [submissionLink, setSubmissionLink] = useState("");

  const cancelButtonRef = useRef()

  return (
      <tr key={time} className="min-h-full bg-white">
        <td className="px-6 py-4 whitespace-nowrap bg-indigo-100">
          <div className="flex items-center">
            <div className="ml-4 ext-sm font-medium text-gray-900">{assignmentName}</div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-white">
          <div>
            {problemLink}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-white">
          <div>
            {deadline}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 bg-white">
          <div>
            {grade}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          {
            userType === "student" ? 
            submitted === false ?
            <button onClick={() => setActionAlert(true)} className="px-5 py-2 text-green-600 hover:text-green-900 rounded-md bg-green-200 font-semibold">
              Add Submission
            </button> :
            <button onClick={() => setActionAlert(true)} className="px-5 py-2 text-green-600 hover:text-green-900 rounded-md bg-green-200 font-semibold">
              Edit Submission
            </button>
            :
            <button onClick={() => setActionAlert(true)} className="px-5 py-2 text-red-600 hover:text-red-900 rounded-md bg-red-200 font-semibold">
              Remove Assignment
            </button>
          }
        </td>

        <Transition.Root show={actionAlert} as={Fragment}>
          <Dialog
            as="div"
            static
            className="fixed z-10 inset-0 overflow-y-auto"
            initialFocus={cancelButtonRef}
            open={actionAlert}
            onClose={setActionAlert}
          >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              {/* This element is to trick the browser into centering the modal contents. */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                        <CodeIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                      </div>
                      <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                          Add Submission
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Enter your submission Link:
                            <input
                            type="text"
                            name="submission_link"
                            id="submission_link"
                            onChange={e => setSubmissionLink(e.target.value)}
                            className="mt-1 px-3 py-1 focus:shadow-lg focus:outline-none block w-full shadow-md sm:text-sm border-gray-300 rounded-md"
                            required
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setActionAlert(false)}
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setActionAlert(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </tr>
  )
}
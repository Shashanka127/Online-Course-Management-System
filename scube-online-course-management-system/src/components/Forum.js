import { useState } from 'react'

export default function Forum() {
  const [open, setOpen] = useState(true)

  return (
    <div className="flex">
    <div className="fixed inset-0 max-w-full flex-1">
      <div className="relative w-screen max-w-md h-full flex flex-col py-6 bg-indigo-100 shadow-xl">
      {/* <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll"> */}
        <h1 className="text-lg font-medium text-gray-900 px-4 sm:px-6">Course Forum</h1>

        <div className="mt-6 relative flex-1 px-4 sm:px-6">
          <div className="absolute inset-0 px-2 sm:px-3">
            <div className="h-full border-2 border-dashed bg-white border-gray-200" aria-hidden="true" />
          </div>
        </div>

      </div>
    </div>

    <div className="fixed inset-0 left-2/4 max-w-full flex-1">
      <div className="relative w-screen max-w-md h-full flex flex-col py-6 bg-indigo-100 shadow-xl">
      {/* <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll"> */}
        <h1 className="text-lg font-medium text-gray-900 px-4 sm:px-6">Course Dashboard</h1>

        <div className="mt-6 relative flex-1 px-4 sm:px-6">
          <div className="absolute inset-0 px-2 sm:px-3">
            <div className="h-full border-2 border-dashed bg-white border-gray-200" aria-hidden="true" />
          </div>
        </div>

      </div>
    </div>
    </div>
  )
}

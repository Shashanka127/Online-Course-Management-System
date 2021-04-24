import { useState } from "react"
import { generateAPICall } from "../utils";

export default function CreatePost() {
  const [postContent, setPostContent] = useState("");

  const createPostHandler = () => {
    let requestURL = generateAPICall('/api/create-post?', {
      'username': localStorage.getItem("username"),
      'courseName': localStorage.getItem("chosenCourse"),
      'userType': localStorage.getItem("usertype"),
      'content': `"${postContent}"`
    });

    fetch(requestURL, {
      method: 'POST'
    })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
    window.location.reload()
  }

  return (
    <div>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Make a new Forum Post</h3>
              <p className="mt-1 text-sm text-gray-600">
                This information will be displayed publicly so be careful what you post.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={createPostHandler}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Ask questions related to the course, or answer someone else's questions"
                        defaultValue={''}
                        style={{resize: 'vertical'}}
                        onChange={(e) => setPostContent(e.target.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Post
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </div>
  )
}

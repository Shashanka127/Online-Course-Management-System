import { useState, useEffect } from 'react'
import CreatePost from './CreatePost';
import ForumPost from './ForumPost';

export default function Forum({ courseName }) {
  const [forumPosts, setForumPosts] = useState([]);

  useEffect(() => {
    fetch('/api/view-posts?courseName=' + courseName, {
      method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setForumPosts([]);
          let courseCount = data.length;
          let posts = [];
          for (let i = 0; i < courseCount; i++) {
            posts.push(data[i]);
          };
          setForumPosts(posts);
        })
  }, [courseName]);

  return (
    <div>
      <CreatePost />
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="py-1 align-middle inline-block min-w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Message
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {forumPosts.map((post) => (
                  <ForumPost key={post.time} courseName={post.courseName} username={post.username} userType={post.usertype} time={post.time} content={post.content.slice(1, -1)} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

import { useRouter } from 'next/navigation'

export default function UserListing({ users }) {
    const router = useRouter();

    const redirect = (path, userId) => {
        router.push(`${path}?userId=${userId}`);
    };
    return (
      <div className=" p-6">
        <div className="space-y-4">
          {users.map((user, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg">
              <div>
                <p className="text-lg font-medium">{user.fullname}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
              <button
                className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition duration-200"
                onClick={() => redirect('/auth/chat', user._id)}
              >
                Chat
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
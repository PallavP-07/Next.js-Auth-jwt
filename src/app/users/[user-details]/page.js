import Link from 'next/link';
import React from 'react'

async function page({params}) {
  const { 'user-details': userId } = await params;

  const fetchUserDetails = async () => {
    try {
      let response = await fetch(`https://dummyjson.com/users/${userId}`, {cache: 'no-cache'});
      let result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  let user = await fetchUserDetails();
   
  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        <div className="text-center p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800">User not found</h2>
          <Link href="/users">
            <button className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all">
              Go Back
            </button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex justify-center items-center py-12 px-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            className="rounded-full w-32 h-32 object-cover border-4 border-gray-200 shadow-lg"
          />
        </div>

        {/* User Info */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">{user.firstName} {user.lastName}</h2>
          <p className="text-gray-600 text-md">{user.username}</p>
        </div>

        {/* Personal Info */}
        <div className="space-y-4">
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Age:</span>
            <span>{user.age}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Gender:</span>
            <span>{user.gender}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span className="font-medium">Phone:</span>
            <span>{user.phone}</span>
          </div>
        </div>

        {/* Address Info */}
        <div className="border-t pt-4 text-gray-700">
          <div className="flex justify-between">
            <span className="font-medium">Address:</span>
            <span>{user.address.address}, {user.address.city}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">State:</span>
            <span>{user.address.state}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Country:</span>
            <span>{user.address.country}</span>
          </div>
        </div>

        {/* Go Back Button */}
        <div className="mt-6 text-center">
          <Link href="/users" passHref>
            <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all">
              Go Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default page;

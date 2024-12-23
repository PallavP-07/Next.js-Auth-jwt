import Link from "next/link";
import Logout from '@/components/logout/index'
import { fetchAuthUserAction } from "@/actions";
import { redirect } from "next/navigation";

export const fetchUser = async () => {
  try {
    let response = await fetch('https://dummyjson.com/users');
    let result = await response.json();
    return result.users;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default async function userDatafetch() {
  const data = await fetchUser();
  const userDetail = await fetchAuthUserAction();
  
  if (!userDetail?.success) redirect("/Login");

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-12 px-4">
      <div className="max-w-screen-xl mx-auto  p-8 ">
        <h1 className="text-4xl font-semibold text-center mb-6 text-gray-800">
          User List
          <span className="p-2 ml-2 bg-red-500 text-white rounded-full">{userDetail?.data?.name}</span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.map((user) => (
            <div
              key={user.id}
              className="bg-white p-4 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-xl hover:cursor-pointer"
            >
              <Link href={`/users/${user.id}`} className="block text-center">
                <img
                  src={user.image}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-500"
                />
                <h2 className="text-xl font-semibold text-gray-800">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-gray-500 text-sm mt-2">View Details</p>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center">
          <Logout />
        </div>
      </div>
    </div>
  );
}

"use client";
import { userLogout } from "@/actions";

function Logout() {
  async function handleLogout() {
    await userLogout();
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
    >
      Logout
    </button>
  );
}

export default Logout;
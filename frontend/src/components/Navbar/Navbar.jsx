
import React, { useContext } from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { AuthContext } from "../../context/AuthContext";


const Navbar = () => {
  const { logout, user } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">AI Note App</h1>
      <div className="flex items-center gap-4">
        <span>{user?.name}</span>
        < ThemeToggle/>
        <button
          onClick={logout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

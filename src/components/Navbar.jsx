import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar({ user, setUser, setToken }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    navigate("/login"); // redirect to login page
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/30 border-b border-gray-800 text-white px-6 py-3 flex justify-between items-center">
      {/* Logo */}
      <Link
        to={"/"}
        className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
      >
        CryptoTrace
      </Link>

      {/* Links */}
      <div className="space-x-6 hidden md:flex font-medium">
        <Link
          to={"/dashboard"}
          className="transition hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-cyan-400 hover:to-blue-500"
        >
          Dashboard
        </Link>
        <Link
          to={"/docs"}
          className="transition hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-pink-400 hover:to-purple-500"
        >
          API Docs
        </Link>
        <Link
          to={"/about-us"}
          className="transition hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-green-400 hover:to-cyan-500"
        >
          About Us
        </Link>
        <Link
          to={"/workflow"}
          className="transition hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-yellow-400 hover:to-red-500"
        >
          Workflow
        </Link>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 relative">
        {!user ? (
          <>
            <Link
              to={"/register"}
              className="hidden sm:inline-flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Sign Up
            </Link>
            <Link
              to={"/login"}
              className="px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition border border-pink-500"
            >
              Log in
            </Link>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            >
              {user?.email ? user.email[0].toUpperCase() : "U"}
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
                <div className="px-4 py-2 text-sm text-gray-300">{user.email}</div>
                <Link
                  to={"/saved"}
                  className="block px-4 py-2 text-sm hover:bg-gray-800"
                  onClick={() => setOpen(false)}
                >
                  Saved Searches
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-800"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

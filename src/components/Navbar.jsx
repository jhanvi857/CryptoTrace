// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav className="backdrop-blur-md text-white px-6 py-3 flex justify-between items-center">
//       <Link to={"/"} className="text-xl font-bold tracking-wide">CryptoTrace</Link>
//       <div className="space-x-6 hidden md:flex">
//         <Link to={"/dashboard"} className="hover:text-blue-400">Dashboard</Link>
//         <Link to={"/docs"} className="hover:text-blue-400">API docs</Link>
//         <Link to={"/about-us"} className="hover:text-blue-400">About Us</Link>
//         <Link to={"/workflow"} className="hover:text-blue-400">WorkFlow</Link>
//         {/* <Link to={"/sources"} className="hover:text-blue-400">Sources</Link>
//         <Link to={"/clustering"} className="hover:text-blue-400">Clustering</Link>
//         <Link to={"/analytics"} className="hover:text-blue-400">Analytics</Link> */}
//         <Link to={"/"} className="hover:text-blue-400">Demo</Link>
//         {/* <Link to={"/"} className="hover:text-blue-400">Export</Link> */}
//         {/* <Link to={"/contact"} className="hover:text-blue-400">Contact Us</Link> */}
//       </div>
//       <div>
//         <button className="bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-500">Login</button>
//       </div>
//     </nav>
//   );
// }
import { Link } from "react-router-dom";

export default function Navbar() {
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
        {/* <Link
          to={"/demo"}
          className="transition hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-500"
        >
          Demo
        </Link> */}
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <Link to={"/"} className="hidden sm:inline-flex bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition">
          Sign Up
        </Link>
        {/* from-cyan-500 to-blue-500  */}
        <Link to={"/"} className="px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition border from-indigo-500 via-purple-500 to-pink-500 hover:border-pink-500">
          Try demo
        </Link>
      </div>
    </nav>
  );
}

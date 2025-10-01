// Navbar.jsx
export default function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-800 text-white px-6 py-3 flex justify-between items-center">
      <div className="text-xl font-bold tracking-wide">CryptoTrace</div>
      <div className="space-x-6 hidden md:flex">
        <a href="#" className="hover:text-blue-400">Dashboard</a>
        <a href="#" className="hover:text-blue-400">Sources</a>
        <a href="#" className="hover:text-blue-400">Clustering</a>
        <a href="#" className="hover:text-blue-400">Analytics</a>
        <a href="#" className="hover:text-blue-400">Export</a>
      </div>
      <div>
        <button className="bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-500">Login</button>
      </div>
    </nav>
  );
}

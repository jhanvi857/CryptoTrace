import { Search, Filter, Download } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [query, setQuery] = useState("");

  const tags = ["Fraud", "Fundraising", "Narcotics", "Mixers"];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-8 px-6 sm:px-12 lg:px-24 mt-12">
      <div className="max-w-7xl mx-auto" >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8" data-aos="fade-up">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            Investigation Dashboard
          </h2>

          {/* Export Button */}
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-md hover:shadow-lg transition">
            <Download className="h-4 w-4" /> Export Report
          </button>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center mb-10" data-aos="fade-up">
          {/* Search Bar */}
          <div className="flex w-full md:w-2/3 items-center border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-900">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search entities (name, wallet, bank)..."
              className="w-full bg-transparent focus:outline-none px-2 text-sm text-gray-700 dark:text-gray-200"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <select className="w-full md:w-48 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-200">
              <option value="">Filter by Activity</option>
              {tags.map((tag, idx) => (
                <option key={idx} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
            <Filter className="h-4 w-4 absolute right-3 top-3 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Graph Section (placeholder for visualization) */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 shadow-lg h-96 flex items-center justify-center" data-aos="fade-up">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            🔗 Graph Visualization (entities + clusters) will appear here
          </p>
        </div>

        {/* Activity Tags / Summary */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="fade-up">
          {tags.map((tag, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl shadow-md bg-gray-50 dark:bg-gray-900"
            >
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                {tag} Activity
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Example summary for {tag.toLowerCase()} clusters.  
                (e.g. 12 entities flagged, 3 clusters found).
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

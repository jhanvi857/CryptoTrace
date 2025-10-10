import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; 
import { Search, Filter, Download } from "lucide-react";
import GraphView from "./components/GraphView";
import SaveSearchButton from "./components/SaveSearchButton";
import ExportDropdown from "./components/ExportDropdown";

export default function Dashboard() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialQuery = params.get("query") || ""; // for extract ?query=...

  const [query, setQuery] = useState(initialQuery);
  const [filterTag, setFilterTag] = useState("");
  const [entities, setEntities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [results, setResults] = useState([]);
  const token = localStorage.getItem("token");

  const tags = ["Fraud", "Fundraising", "Narcotics", "Mixers"];

  const fetchGraph = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/graph?entity=${query}`);
      const data = await res.json();
      setGraphData(data);
    } catch (err) {
      console.error("Graph fetch error:", err);
      setGraphData({ nodes: [], links: [] });
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query) params.append("name", query);
      const res = await fetch(`http://localhost:5000/search?${params.toString()}`);
      let data = await res.json();

      if (filterTag) {
        data = data.filter((e) => {
          if (filterTag === "Fraud") return e.transaction_amount > 40000;
          if (filterTag === "Fundraising") return e.transaction_amount > 10000;
          if (filterTag === "Narcotics") return e.email?.endsWith(".onion");
          if (filterTag === "Mixers") return e.wallet?.startsWith("bc1");
          return true;
        });
      }

      setEntities(data);
      setResults(data); 
      await fetchGraph();
    } catch (err) {
      console.error(err);
      setEntities([]);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      handleSearch();
    }
  }, [initialQuery]);

  const exportData = () => {
    const blob = new Blob([JSON.stringify(entities, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "crypto_report.json";
    a.click();
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-8 px-6 sm:px-12 lg:px-24 mt-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            Investigation Dashboard
          </h2>
          <ExportDropdown/>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center mb-10">
          <div className="flex w-full md:w-2/3 items-center border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-900">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name..."
              className="w-full bg-transparent focus:outline-none px-2 text-sm text-gray-700 dark:text-gray-200"
            />
          </div>

          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="w-full md:w-48 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-900 text-sm text-gray-700 dark:text-gray-200"
          >
            <option value="">Filter by Activity</option>
            {tags.map((tag, idx) => (
              <option key={idx} value={tag}>{tag}</option>
            ))}
          </select>

          <button
            onClick={handleSearch}
            className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 transition"
          >
            Search
          </button>
        </div>

        {/* Loading */}
        {loading && <p className="text-gray-500 dark:text-gray-400">Loading...</p>}

        {results.length > 0 && (
          <SaveSearchButton searchQuery={query} results={results} token={token}/>
        )}

        {/* Table */}
        <div className="mt-6 overflow-x-auto">
          {entities.length ? (
            <table className="min-w-full border">
              <thead className=" text-white">
                <tr className="text-white">
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Wallet</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Bank</th>
                  <th className="px-4 py-2 text-left">Txn Amount</th>
                  <th className="px-4 py-2 text-left">Last Scan</th>
                  <th className="px-4 py-2 text-left">Source</th>
                </tr>
              </thead>
              <tbody>
                {entities.map((e) => (
                  <tr key={e.id} className="border-t text-white">
                    <td className="px-4 py-2">{e.name || "-"}</td>
                    <td className="px-4 py-2">{e.wallet || "-"}</td>
                    <td className="px-4 py-2">{e.phone || "-"}</td>
                    <td className="px-4 py-2">{e.email || "-"}</td>
                    <td className="px-4 py-2">{e.bank_account || "-"}</td>
                    <td className="px-4 py-2">{e.transaction_amount || "-"}</td>
                    <td className="px-4 py-2">{e.last_scan || "-"}</td>
                    <td className="px-4 py-2">{e.source || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 mt-4">
              No entities found
            </p>
          )}
        </div>

        {/* Graph */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            Entity Relationship Graph
          </h3>
          <GraphView graphData={graphData} highlightedTag={filterTag} />
        </div>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";

export default function SearchResult({ searchQuery, results, token }) {
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/user/save-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query: searchQuery }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Search saved successfully!");
        navigate(`/dashboard?query=${encodeURIComponent(searchQuery)}`);
      } else {
        alert(data.error || "Failed to save search");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again.");
    }
  };

  return (
    <div className="search-result-card text-white p-4 border rounded bg-slate-800">
      <h4 className="text-lg font-bold">Search Query: {searchQuery}</h4>
      <pre className="bg-slate-900 p-2 rounded text-xs mt-2 max-h-48 overflow-auto">
        {JSON.stringify(results, null, 2)}
      </pre>
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 mt-4"
      >
        Save Search
      </button>
    </div>
  );
}

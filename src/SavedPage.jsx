import React, { useEffect, useState } from "react";
export default function SavedPage() {
  const [savedSearches, setSavedSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleOpen = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:5000/auth/user/saved/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to open search");

    const data = await res.json();
    // Redirect to dashboard with query param
    window.location.href = `/dashboard?query=${encodeURIComponent(data.query)}`;
  } catch (err) {
    alert("Error opening search: " + err.message);
  }
};

const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this saved search?")) return;

  try {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://localhost:5000/auth/user/saved/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to delete search");

    setSavedSearches(savedSearches.filter((s) => s.id !== id));
  } catch (err) {
    alert("Error deleting search: " + err.message);
  }
};

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const token = localStorage.getItem("token"); 
        if (!token) {
          setError("You are not logged in");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:5000/auth/user/saved", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const message = await res.text();
          throw new Error(`Error ${res.status}: ${message}`);
        }

        const data = await res.json();
        setSavedSearches(data); 
      } catch (err) {
        console.error("Error fetching saved searches:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, []);

  if (loading) return <p>Loading saved searches...</p>;
  if (error) return <p className="text-red-500 mt-12">Error: {error}</p>;
  if (!savedSearches.length)
    return <p className="mt-12">No saved searches yet. Use "Save" in search results to persist.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 mt-16 text-white text-center">Saved Investigations</h2>

      <div className="grid gap-3">
        {savedSearches.map((s, i) => (
          <div key={i} className="p-3 rounded border border-slate-700">
            <div className="text-sm font-medium text-white">{s.query || "Saved item"}</div>
            <div className="text-xs text-slate-100">
              {s.created_at ? new Date(s.created_at).toLocaleString() : ""}
            </div>
            <div className="mt-2 text-white">
              <button className="text-xs px-2 py-1 border rounded mr-2" onClick={()=>handleOpen(s.id)}>Open</button>
              <button className="text-xs px-2 py-1 border rounded" onClick={()=>handleDelete(s.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from "react";

export default function SaveSearchButton({ searchQuery, results, token }) {
  const handleSave = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("You must be logged in");

    const res = await fetch("http://localhost:5000/auth/user/save-search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query: searchQuery, results })

    });

    if (!res.ok) {
      const message = await res.text();
      throw new Error(`Error ${res.status}: ${message}`);
    }

    const data = await res.json();
    alert("Search saved successfully !");
    console.log("Saved successfully:", data);
  } catch (err) {
    console.error("Error saving search:", err);
  }
};

  return (
    <button
      onClick={handleSave}
      className="mt-2 px-4 py-2 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90 transition"
    >
      Save Search
    </button>
  );
}

import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

export default function Login({ setUser, setToken }) {
const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify({ email: data.email }));
        setToken(data.token);
        setUser({ email: data.email }); 
        navigate("/dashboard");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again.");
    }
  };


  return (
    <section className="mt-16 bg-slate-900/30 border border-slate-800 rounded-2xl p-6" data-aos="fade-up">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h3 className="text-2xl font-bold text-white">Login to Dashboard</h3>
          <p className="mt-2 text-slate-300">Enter your credentials to access the secure dashboard.</p>
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </div>

        <form className="space-y-3" onSubmit={handleLogin}>
          <div className="grid grid-cols-1 gap-3">
            <input
              aria-label="Email"
              placeholder="Work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border border-slate-700 text-slate-200 px-4 py-3 rounded-lg"
              required
            />
            <input
              type="password"
              aria-label="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border border-slate-700 text-slate-200 px-4 py-3 rounded-lg"
              required
            />
          </div>

          <div className="flex gap-3 justify-between">
            <button
              type="submit"
              className="block bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold px-4 py-3 rounded-lg"
            >
              Login
            </button>
            <button
              type="button"
              className="border border-slate-700 px-4 py-3 rounded-lg text-slate-200"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </div>
          <div className="text-xs text-slate-500 mt-2">
            We respond within 48 hours. (For demo scheduling only.)
          </div>
        </form>
      </div>
    </section>
  );
}

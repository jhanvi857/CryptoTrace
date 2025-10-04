import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userType, setUserType] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPass) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/auth/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name, email, password, userType }),

});
const data = await res.json();

      if (res.ok) {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.error || data.errors?.[0]?.msg || "Sign up failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again.");
    }
  };

  return (
    <section className="mt-16 min-h-screen bg-slate-900/30 border border-slate-800 rounded-2xl p-6" >
      <div className="max-w-md mx-auto" data-aos="fade-up">
        <h3 className="text-2xl text-center font-bold text-white mb-2">Create a New Account</h3>
        <p className="text-slate-300 text-center mb-4">Sign up to access the secure dashboard.</p>

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {success && <p className="text-green-500 mb-2">{success}</p>}

        <form className="space-y-4" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent border border-slate-700 text-slate-200 px-4 py-3 rounded-lg w-full"
            required
          />
          <input
            type="email"
            placeholder="Work Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent border border-slate-700 text-slate-200 px-4 py-3 rounded-lg w-full"
            required
          />
          <select
  value={userType}
  onChange={(e) => setUserType(e.target.value)}
  className="bg-transparent border border-slate-700 text-slate-200 px-4 py-3 rounded-lg w-full"
  required
>
  <option value="" disabled>Select your use case</option>
  <option value="Investigations">Investigations</option>
  <option value="Compliance / KYC">Compliance / KYC</option>
  <option value="Research">Research</option>
</select>

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent border border-slate-700 text-slate-200 px-4 py-3 rounded-lg w-full"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            className="bg-transparent border border-slate-700 text-slate-200 px-4 py-3 rounded-lg w-full"
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold px-4 py-3 rounded-lg"
          >
            Sign Up
          </button>
        </form>

        <p className="text-slate-400 text-sm mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-500 cursor-pointer underline"
          >
            Login
          </span>
        </p>
      </div>
    </section>
  );
}

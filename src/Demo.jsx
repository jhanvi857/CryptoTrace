import React, { useState, useEffect } from 'react';
// Added for commit testing
import { Menu, X, ShieldCheck, Network, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// ================= NAVBAR =================
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = ["Features", "Workflow", "Dashboard", "API Docs", "About"];

  return (
    <nav className="fixed w-full z-50 backdrop-blur-md bg-slate-900/80 border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center"
            >
              <span className="text-2xl">⬡</span>
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              CryptoTrace
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            {links.map((link) => (
              <a
                key={link}
                href={"#" + link.toLowerCase().replace(" ", "")}
                className="nav-link relative text-gray-301 hover:text-cyan-400 transition"
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <button className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2 rounded-lg font-semibold hover:scale-105 transition">
              <span className="relative z-10">Get Started</span>
              <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 opacity-40 animate-pulse" />
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-900/90 border-t border-blue-500/20"
          >
            <div className="px-6 py-4 space-y-4">
              {links.map((link) => (
                <a
                  key={link}
                  href={"#" + link.toLowerCase().replace(" ", "")}
                  className="block text-gray-300 hover:text-cyan-400 transition"
                  onClick={() => setIsOpen(false)}
                >
                  {link}
                </a>
              ))}
              <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 px-5 py-2 rounded-lg font-semibold">
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ================= CTA (Hero Section) =================
function CTA() {
  return (
    <section id="cta" className="pt-32 pb-20 px-6 text-center">
      <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
        Track & Analyze Crypto<br />Addresses in Real-Time
      </h1>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
        Autonomous system to continuously collect cryptocurrency addresses, cluster by activity, and provide analytics + CSV/JSON exports.
      </p>

      {/* Table mockup */}
      <div className="overflow-x-auto max-w-2xl mx-auto mb-8">
        <table className="w-full text-sm text-left border border-blue-500/20 rounded-xl overflow-hidden">
          <thead className="bg-blue-900/40 text-blue-300">
            <tr>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Cluster</th>
            </tr>
          </thead>
          <tbody className="bg-gray-900/50">
            <tr>
              <td className="px-4 py-2">1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</td>
              <td className="px-4 py-2">BTC</td>
              <td className="px-4 py-2 text-red-400">Fraud</td>
            </tr>
            <tr>
              <td className="px-4 py-2">0x742d35Cc6634C0532925a3b844Bc454e4438f44e</td>
              <td className="px-4 py-2">ETH</td>
              <td className="px-4 py-2 text-cyan-400">Mixer</td>
            </tr>
          </tbody>
        </table>
      </div>

      <button className="bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition">
        Request Pilot Dataset
      </button>
    </section>
  );
}

// ================= Workflow =================
function Workflow() {
  const workflowSteps = [
    { title: "Sources", desc: "Collect from forums, deep web, explorers.", color: "from-cyan-500 to-blue-500" },
    { title: "Clustering", desc: "Group by activity, risk scoring, fraud labels.", color: "from-purple-500 to-pink-500" },
    { title: "Analytics", desc: "Export-ready insights for investigators.", color: "from-green-500 to-teal-500" },
  ];
  return (
    <section id="workflow" className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        How CryptoTrace Works
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {workflowSteps.map((step, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="p-6 rounded-2xl bg-gray-900/60 border border-blue-500/20 shadow-lg"
          >
            <div className={`w-12 h-12 mb-4 rounded-lg bg-gradient-to-br ${step.color}`} />
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-400 text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ================= Features =================
function FeaturesPage() {
  const features = [
    { name: "Identify", desc: "Detect sensitive data and link with metadata.", icon: ShieldCheck, color: "from-blue-500 to-cyan-500" },
    { name: "Cluster", desc: "Automatically group suspicious activities.", icon: Network, color: "from-purple-500 to-pink-500" },
    { name: "Act", desc: "Enable alerts, reporting, and API integrations.", icon: Zap, color: "from-green-500 to-teal-500" },
  ];

  return (
    <section id="features" className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        Key Features
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-6 bg-gray-900/60 border border-blue-500/20 rounded-2xl hover:scale-105 transition"
          >
            <div className={`w-12 h-12 mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br ${f.color}`}>
              <f.icon className="w-6 h-6 text-black" />
            </div>
            <h3 className="text-xl font-bold">{f.name}</h3>
            <p className="text-gray-400 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
// ================= Dashboard =================
function Dashboard() {
  const tags = ["Fraud", "Fundraising", "Narcotics", "Mixers"];
  return (
    <section id="dashboard" className="py-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        Dashboard
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {tags.map((tag) => (
          <div key={tag} className="bg-gray-900/60 p-6 rounded-2xl border border-blue-500/20">
            <h3 className="font-bold text-cyan-400">{tag} Clusters</h3>
            <p className="text-gray-400 text-sm mt-2">Example summary: 12 entities flagged, 3 clusters found.</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ================= Demo Upload =================
function DemoPage() {
  const [file, setFile] = useState(null);
  return (
    <section id="demo" className="py-20 px-6 max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        Upload Sample Dataset
      </h2>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4 block mx-auto"
      />
        <div className="text-gray-400">
  {file ? `Uploaded: ${file.name}` : "Drag & drop or choose a file"}
</div>

    </section>
  );
}

// ================= API Docs =================
function ApiDocsPage() {
  return (
    <section id="apidocs" className="py-20 px-6 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent text-center">
        API Documentation
      </h2>
      <pre className="bg-gray-900/60 p-6 rounded-2xl text-sm text-gray-300 overflow-x-auto">
{`GET /api/v1/entities?wallet=0x742d35Cc6634C0532925a3b844Bc454e4438f44e
Host: api.cryptotrace.com
Authorization: Bearer YOUR_API_KEY

{
  "wallet": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  "type": "ETH",
  "clusters": ["Mixer", "Fraud"],
  "sources": [{ "url": "https://forumx.example.com/thread/123", "timestamp": "2025-09-29T08:42:00Z" }]
}`}
      </pre>
    </section>
  );
}

// ================= About =================
function AboutPage() {
  const team = [
    { name: "Jhanvi Patel", role: "Team Leader / Backend" },
    { name: "Darshi Prajapati", role: "Frontend" },
    { name: "Ved Chaudhari", role: "Frontend" },
    { name: "Divyesh Sathwara", role: "Blockchain & Security" },
    { name: "Sanket Patel", role: "Database" },
    { name: "Dhruv Rathod", role: "Scraping" },
  ];
  return (
    <section id="about" className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        About Us
      </h2>
      <p className="text-center text-gray-300 max-w-2xl mx-auto mb-8">
        We are passionate about using blockchain analytics and cybersecurity to detect fraudulent crypto activities. 
        Our project CryptoTrace is designed for lawful investigative use.
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {team.map((m, index) => (
  <div key={index} className="bg-gray-900/60 p-6 rounded-2xl border border-blue-500/20 hover:scale-105 transition text-center">
    <div className="text-xl font-bold">{m.name}</div>
    <div className="text-gray-400">{m.role}</div>
  </div>
))}
      </div>
    </section>
  );
}

// ================= MAIN APP =================
export default function MainApp() {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white min-h-screen">
      <Navbar />
      <main className="pt-20">
        <CTA />
        <Workflow />
        <FeaturesPage />
        <Dashboard />
        <DemoPage />
        <ApiDocsPage />
        <AboutPage />
      </main>
      <footer className="text-center py-6 text-gray-400 border-t border-blue-500/20">
          © 2025 CryptoTrace. All rights reserved. 🚀
      </footer>
    </div>
  );
}
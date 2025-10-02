import React, { useState, useEffect } from 'react';
// TODO: Commit test
// // Optionally, set up Tailwind config animations as in the original (using Tailwind config file for full effect)

// function StatsGrid() {
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     // Simulate API fetch with timeout
//     setTimeout(() => {
//       setStats([
//         { label: "Addresses Tracked", value: "52M+", desc: "Globally across blockchains", color: "text-blue-400" },
//         { label: "Blockchains Supported", value: "16", desc: "Major networks & tokens", color: "text-cyan-400" },
//         { label: "Uptime SLA", value: "99.985%", desc: "Reliable monitoring", color: "text-blue-400" },
//         { label: "Alert Latency", value: "<1s", desc: "Real-time notifications", color: "text-cyan-400" }
//       ]);
//     }, 1200);
//   }, []);

//   if (!stats) {
//     return (
//       <div className="flex justify-center col-span-4">
//         <div className="loading-spinner border-blue-500" />
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//       {stats.map((stat) => (
//         <div
//           key={stat.label}
//           className="bg-white/5 border border-blue-500/20 rounded-2xl p-6 text-center tilt animate-fade-in"
//         >
//           <div className={`text-3xl font-bold mb-2 ${stat.color}`}>{stat.value}</div>
//           <div className="text-gray-300 text-sm">{stat.label}</div>
//           <div className="text-xs text-gray-500 mt-2">{stat.desc}</div>
//         </div>
//       ))}
//     </div>
//   );
// }


// function AddressAnalyzer() {
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!input.trim()) {
//       setResult({ error: 'Please enter a valid address.' });
//       return;
//     }
//     setResult(null);
//     setLoading(true);
//     // Simulate analysis
//     setTimeout(() => {
//       setLoading(false);
//       setResult({
//         tx: 132,
//         risk: 'Moderate',
//         last: '2025-09-20'
//       });
//     }, 1500);
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/30 backdrop-blur-xl border border-blue-500/30 rounded-3xl p-8 shadow-2xl">
//         <h2 className="text-3xl font-bold mb-6 text-center">Analyze Any Address</h2>
//         <form onSubmit={handleSubmit} className="relative mb-6">
//           <input
//             id="addressInput"
//             type="text"
//             autoComplete="off"
//             aria-label="Enter wallet address"
//             placeholder="Enter wallet address…"
//             required
//             value={input}
//             onChange={e => setInput(e.target.value)}
//             className="w-full bg-black/30 border border-blue-500/30 rounded-xl px-6 py-4 text-white placeholder-gray-500 focus:outline-none transition"
//           />
//           <button
//             type="submit"
//             className="absolute right-2 top-2 bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-400"
//           >
//             Analyze
//           </button>
//         </form>
//         <div className="text-center text-lg text-gray-200 mb-4 min-h-[40px]">
//           {loading && (
//             <div className="flex flex-col items-center">
//               <div className="loading-spinner mb-2 border-blue-400"></div>
//               Analyzing address...
//             </div>
//           )}
//           {result && result.error && (
//             <span className="text-red-400">{result.error}</span>
//           )}
//           {result && !result.error && (
//             <div>
//               <div className="text-green-400 font-bold">Analysis Complete</div>
//               <div className="mt-2 text-sm text-gray-300">
//                 Transactions: {result.tx}
//               </div>
//               <div className="text-sm text-gray-300">
//                 Risk Score: <span className="text-yellow-300">{result.risk}</span>
//               </div>
//               <div className="text-sm text-gray-300">
//                 Last Activity: {result.last}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function NavBar() {
//   const [showMenu, setShowMenu] = useState(false);
//   return (
//     <nav className="fixed w-full z-50 backdrop-blur-md bg-slate-900/80 border-b border-blue-500/20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center space-x-2">
//             <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center animate-spin-slow hover:animate-pulse">
//               <span className="text-2xl">⬡</span>
//             </div>
//             <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%]">
//               CryptoTracker
//             </span>
//           </div>
//           <div className="hidden md:flex space-x-8">
//             <a href="#features" className="nav-link hover:text-cyan-400 transition">Features</a>
//             <a href="#pricing" className="nav-link hover:text-cyan-400 transition">Pricing</a>
//             <a href="#docs" className="nav-link hover:text-cyan-400 transition">Docs</a>
//             <a href="#api" className="nav-link hover:text-cyan-400 transition">API</a>
//           </div>
//           <div className="flex items-center space-x-4">
//             <button className="hidden md:block text-blue-300 hover:text-white transition">Sign In</button>
//             <button className="bg-gradient-to-r from-blue-500 to-cyan-500 px-6 py-2 rounded-lg font-semibold hover:scale-105 transition relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-cyan-500">
//               <span className="relative z-10">Get Started</span>
//               <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-30 rounded-lg animate-pulse-slow"></span>
//             </button>
//             <button
//               className="md:hidden text-blue-400 focus:outline-none ml-2"
//               aria-label="Open Menu"
//               onClick={() => setShowMenu(!showMenu)}
//             >
//               <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2"></path></svg>
//             </button>
//           </div>
//         </div>
//         {showMenu && (
//           <div id="mobileMenu" className="md:hidden mt-2 pb-2">
//             <a href="#features" className="block py-2 nav-link hover:text-cyan-400 transition">Features</a>
//             <a href="#pricing" className="block py-2 nav-link hover:text-cyan-400 transition">Pricing</a>
//             <a href="#docs" className="block py-2 nav-link hover:text-cyan-400 transition">Docs</a>
//             <a href="#api" className="block py-2 nav-link hover:text-cyan-400 transition">API</a>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

// function HeroSection() {
//   return (
//     <section className="pt-32 pb-16 px-4 text-center animate-fade-in">
//       <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_200%]">
//         Track & Analyze Crypto<br />Addresses in Real-Time
//       </h1>
//       <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
//         Monitor blockchain addresses, analyze transactions, detect risks, and get instant alerts ⚡, with multi-chain support!
//       </p>
//       <div className="flex flex-col sm:flex-row gap-4 justify-center">
//         <button className="bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition animate-pulse-slow focus:outline-none focus:ring-2 focus:ring-cyan-500">Start Free Trial</button>
//         <button className="bg-white/10 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition">Watch Demo</button>
//       </div>
//     </section>
//   );
// }

// function Footer() {
//   return (
//     <footer className="border-t border-blue-500/20 py-12 px-4">
//       <div className="max-w-7xl mx-auto text-center text-gray-400">
//         <p>© 2025 CryptoTracker • Powered by Tailwind & Web3 🚀</p>
//       </div>
//     </footer>
//   );
// }

// // Global styles for spinner, nav-link, etc.
// // You may move these styles to your tailwind.css or global.css file in a real project.
// const styleSheet = `
// .nav-link {
//   position: relative;
//   transition: color 0.3s ease;
// }
// .nav-link::after {
//   content: '';
//   position: absolute;
//   left: 0;
//   bottom: -4px;
//   width: 0%;
//   height: 2px;
//   background: linear-gradient(to right, #3b82f6, #06b6d4);
//   transition: width 0.3s ease;
// }
// .nav-link:hover::after { width: 100%; }
// .tilt:hover {
//   transform: perspective(800px) rotateY(6deg) rotateX(6deg) scale(1.03);
//   transition: all 0.4s ease;
// }
// .loading-spinner {
//   border: 4px solid #3b82f6;
//   border-top: 4px solid #06b6d4;
//   border-radius: 50%;
//   width: 36px;
//   height: 36px;
//   animation: spin 1s linear infinite;
//   margin: auto;
// }
// @keyframes spin {
//   to { transform: rotate(360deg); }
// }
// `;

// export default function CryptoTrackerPro() {
//   useEffect(() => {
//     // Inject the required global styles once on mount
//     const styleTag = document.createElement('style');
//     styleTag.innerHTML = styleSheet;
//     document.head.appendChild(styleTag);
//     return () => {
//       document.head.removeChild(styleTag);
//     };
//   }, []);

//   return (
//     <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white min-h-screen">
//       <NavBar />
//       <HeroSection />
//       <section className="px-4">
//         <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
//           <StatsGrid />
//         </div>
//       </section>
//       <section className="py-20 px-4">
//         <AddressAnalyzer />
//       </section>
//       <Footer />
//     </div>
//   );
// }
// App.jsx
import { useState } from "react";
// ✅ Added for commit testing
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
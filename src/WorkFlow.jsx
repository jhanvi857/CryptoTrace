// Workflow.jsx
import React from "react";

export default function Workflow() {
    const sources = [
    "Public Forums & Message Boards",
    "Paste Sites & Index Pages",
    "Deep Web Sources",
    "Blockchain Explorers",
  ];
  const clusters = [
    { name: "Fraud", color: "text-red-400" },
    { name: "Mixer", color: "text-cyan-400" },
    { name: "Fundraising", color: "text-green-400" },
  ];
  const stats = [
    { label: "Addresses Indexed", value: "1.2M+" },
    { label: "Clusters Identified", value: "98K+" },
    { label: "Export Ready", value: "CSV / JSON" },
  ];

  const workflowSteps = [
    {
      title: "Sources",
      desc: "Continuously collect cryptocurrency addresses from public forums, paste sites, deep web sources, and blockchain explorers.",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          className="opacity-90"
        >
          <path
            d="M3 12h18M12 3v18"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
      bgColor: "from-cyan-500 to-blue-500",
    },
    {
      title: "Clustering",
      desc: "Automatically cluster addresses by activity and risk scoring, labeling for fraud, mixers, fundraising, and other patterns.",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          className="opacity-90"
        >
          <path
            d="M3 12h18M12 3v18M5 5l14 14"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="none"
          />
        </svg>
      ),
      bgColor: "from-purple-500 to-pink-500",
    },
    {
      title: "Analytics",
      desc: "Gain actionable insights: addresses indexed, clusters identified, and export-ready CSV/JSON for downstream investigations.",
      icon: (
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          className="opacity-90"
        >
          <path
            d="M3 3h18v18H3V3z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      ),
      bgColor: "from-green-400 to-teal-500",
    },
  ];

  return (
    <>
    <section className="mt-16 max-w-7xl mx-auto px-6 py-8" >
      {/* Header */}
      <div className="text-center mb-12" data-aos="fade-up">
        <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
          How CryptoTrace Works
        </h2>
        <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
          From data collection to actionable insights, CryptoTrace helps investigators efficiently track and analyze suspicious crypto activity.
        </p>
      </div>

      {/* Workflow Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="fade-up">
        {workflowSteps.map((step, idx) => (
          <div
            key={idx}
            className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition"
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center text-black mb-4 bg-gradient-to-br ${step.bgColor}`}
            >
              {step.icon}
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {step.title}
            </h3>
            <p className="text-gray-400 text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
        {/* sources */}
        <section className="mt-16 max-w-7xl mx-auto px-6" data-aos="fade-up">
      <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
        Sources
      </h2>
      <p className="text-gray-400 text-center mt-3 max-w-2xl mx-auto">
        We continuously crawl and index crypto addresses from multiple reliable sources for investigative purposes.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sources.map((source, idx) => (
          <div
            key={idx}
            className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition"
          >
            <h4 className="text-lg font-semibold text-white">{source}</h4>
          </div>
        ))}
      </div>
    </section>
    {/* clustering */}
    <section className="mt-16 max-w-7xl mx-auto px-6" data-aos="fade-up">
      <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
        Clustering
      </h2>
      <p className="text-gray-400 text-center mt-3 max-w-2xl mx-auto">
        Automatically group crypto addresses into clusters based on activity, behavior, and context.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {clusters.map((cluster, idx) => (
          <div
            key={idx}
            className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition text-center"
          >
            <h4 className={`text-xl font-bold ${cluster.color}`}>{cluster.name}</h4>
            <p className="mt-2 text-gray-400">
              Example addresses and patterns categorized under {cluster.name}.
            </p>
          </div>
        ))}
      </div>
    </section>
    {/* analytics */}
    <section className="mt-16 max-w-7xl mx-auto px-6" data-aos="fade-up">
      <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-500">
        Analytics
      </h2>
      <p className="text-gray-400 text-center mt-3 max-w-2xl mx-auto">
        Gain actionable insights from our indexed data and clustering algorithms. Export and integrate results into your workflow.
      </p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6 shadow-lg text-center hover:scale-[1.02] transition"
          >
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-gray-400 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
      {/* ending texxt*/}
      <div className="mt-12 text-center mb-12" data-aos="fade-up">
        <p className="text-gray-400 max-w-xl mx-auto">
          Export historical timelines, automate alerts, and integrate with SIEM or case management via CSV/JSON. Designed for lawful investigative use only.
        </p>
        <a
          href="#demo"
          className="inline-flex mt-6 items-center gap-2 bg-cyan-600 text-black font-semibold px-6 py-3 rounded-lg shadow-lg hover:scale-[1.03] transition"
        >
          Request Access / Demo
        </a>
      </div>
    </section>
    
    </>
  );
}

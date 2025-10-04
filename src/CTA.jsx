import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
export default function CryptoScraperCTA() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, offset: 80 });
  }, []);
// bg-gradient-to-b bg-[#000E11] text-slate-100
  return (
    <>
    {/* <main className="min-h-screen bg-gradient-to-b from-slate-900 via-[#0f172a] to-black text-slate-100 antialiased"> */}
    <main className="min-h-screen bg-black relative overflow-hidden text-slate-100 antialiased">
      {/* Animated gradient bubbles */}
<div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
<div className="absolute top-1/3 right-1/4 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
<div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl animate-pulse delay-2000"></div>

{/* Grid pattern overlay */}
<div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.05)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

{/* Radial gradient overlay */}
<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(236,72,153,0.08),transparent_60%)]"></div>

      <section className="max-w-7xl mx-auto px-6 py-16 mt-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center shadow-lg">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2v20M2 12h20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="text-lg font-semibold">CryptoTrace</div>
              <div className="text-xs text-slate-400">Autonomous crypto-address intelligence</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300">SIH / Research</span>
            <button className="ml-2 inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transform hover:scale-[1.03] transition">
              Request a Demo
            </button>
          </div>
        </div>

        {/* HERO */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div data-aos="fade-right">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-pink-400">
              Identify. Cluster. Act.
            </h1>
            <p className="mt-4 text-slate-300 max-w-xl">
              Autonomous system to continuously collect cryptocurrency addresses from public & deep web sources, associate them with suspect entities,
              cluster by activity, and provide powerful analytics with CSV / JSON exports for downstream investigations.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to={"/demo-page"}
                className="inline-flex items-center gap-3 bg-white text-slate-900 font-semibold px-5 py-3 rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition"
                data-aos="zoom-in"
              >
                Schedule Demo
                <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-90">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </Link>

              <Link to={"/features"}
                className="inline-flex items-center gap-2 border border-slate-700 text-slate-200 px-4 py-3 rounded-lg hover:bg-slate-800 transition"
                data-aos="zoom-in"
              >
                View Features
              </Link>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3" data-aos="fade-up">
              <div className="bg-slate-800/40 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">1.2M+</div>
                <div className="text-xs text-slate-400">Addresses indexed</div>
              </div>
              <div className="bg-slate-800/40 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-xs text-slate-400">Source reliability (est.)</div>
              </div>
              <div className="bg-slate-800/40 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold">CSV / JSON</div>
                <div className="text-xs text-slate-400">Export ready</div>
              </div>
            </div>
          </div>

          <div data-aos="fade-left">
            <div className="rounded-2xl bg-gradient-to-br from-slate-900/70 to-slate-800/60 p-6 shadow-2xl border border-slate-700">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-slate-400">Latest scan</div>
                  <div className="text-sm font-medium mt-1">Sep 29, 2025 • 08:42 UTC</div>
                </div>
                <div className="text-xs text-slate-400">Type: Bitcoin, Ethereum</div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-slate-900/60 p-4 rounded-lg">
                  <div className="text-xs text-slate-400">Top source</div>
                  <div className="font-semibold mt-2">ForumX (dataset)</div>
                </div>
                <div className="bg-slate-900/60 p-4 rounded-lg">
                  <div className="text-xs text-slate-400">Suspect clusters</div>
                  <div className="font-semibold mt-2">Narcotics, Laundering</div>
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-lg border border-slate-700">
                <table className="w-full text-left table-auto">
                  <thead className="bg-slate-900/40">
                    <tr>
                      <th className="px-4 py-3 text-xs text-slate-400">Address</th>
                      <th className="px-4 py-3 text-xs text-slate-400">Type</th>
                      <th className="px-4 py-3 text-xs text-slate-400">Cluster</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-gradient-to-r from-slate-800/50 to-transparent">
                      <td className="px-4 py-3 font-mono text-sm truncate">1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</td>
                      <td className="px-4 py-3 text-sm">BTC</td>
                      <td className="px-4 py-3 text-sm text-amber-300">Fraud</td>
                    </tr>
                    <tr className="hover:bg-slate-800/30">
                      <td className="px-4 py-3 font-mono text-sm truncate">0x742d35Cc6634C0532925a3b844Bc454e4438f44e</td>
                      <td className="px-4 py-3 text-sm">ETH</td>
                      <td className="px-4 py-3 text-sm text-emerald-300">Mixer</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-5 flex gap-3">
                <button className="flex-1 py-3 rounded-md bg-gradient-to-r from-indigo-600 to-pink-500 font-semibold hover:scale-[1.02] transition">
                  Export CSV
                </button>
                <button className="flex-1 py-3 rounded-md border border-slate-700 text-slate-200 hover:bg-slate-800">
                  Export JSON
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* features */}
        <section className="mt-16 grid md:grid-cols-3 gap-6" data-aos="fade-up">
          {[
            {
              title: "Continuous Autonomous Scraping",
              desc: "Scheduled crawlers for surface & deep web sources with multi-protocol adapters (forums, paste sites, indexed pages).",
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" className="opacity-90">
                  <path d="M3 12h18M12 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ),
            },
            {
              title: "Entity Contextualization",
              desc: "Attach PII found on the same source (names, phones, banks), plus source meta (URL, timestamp, screenshot).",
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24">
                  <path d="M12 2C8 2 5 5 5 9c0 6 7 13 7 13s7-7 7-13c0-4-3-7-7-7z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                </svg>
              ),
            },
            {
              title: "Clustering & Activity Tags",
              desc: "Unsupervised clustering plus human-in-the-loop labeling for narcotics, fraud, fundraising, mixers, etc.",
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24">
                  <path d="M3 12h18M12 3v18M5 5l14 14" stroke="currentColor" strokeWidth="1.2" fill="none"/>
                </svg>
              ),
            },
          ].map((f, i) => (
            <article
              key={i}
              className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 shadow-lg hover:scale-[1.02] transition"
              data-aos="fade-up"
              data-aos-delay={i * 80}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-600 to-pink-500 flex items-center justify-center text-black">
                  {f.icon}
                </div>
                <div>
                  <h4 className="font-semibold">{f.title}</h4>
                  <p className="mt-2 text-sm text-slate-400">{f.desc}</p>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* working */}
        <section className="mt-16 grid md:grid-cols-3 gap-8 items-start" data-aos="fade-up">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold">How it works</h3>
            <p className="mt-3 text-slate-300 max-w-3xl">
              The system crawls configured sources, extracts crypto-addresses and context, normalizes entity attributes, runs clustering and risk scoring, stores records with provenance and timestamps, and exposes a dashboard + export APIs for investigators.
            </p>

            <ol className="mt-6 space-y-4 text-slate-300">
              <li className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center font-semibold">1</div>
                <div>
                  <div className="font-semibold">Ingestion</div>
                  <div className="text-sm text-slate-400">Multi-threaded scrapers & parsers with quality filters and snapshotting.</div>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center font-semibold">2</div>
                <div>
                  <div className="font-semibold">Contextualize</div>
                  <div className="text-sm text-slate-400">Link PII / bank / phone details found on same source; retain source URL & capture time.</div>
                </div>
              </li>
              <li className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center font-semibold">3</div>
                <div>
                  <div className="font-semibold">Cluster & Serve</div>
                  <div className="text-sm text-slate-400">Automatic clustering, tagging, timeline queries and exports for downstream workflows.</div>
                </div>
              </li>
            </ol>
          </div>

          {/* card*/}
          <aside className="bg-gradient-to-br from-slate-900/60 to-slate-800/50 border border-slate-700 rounded-2xl p-6">
            <div>
              <div className="text-xs text-slate-400">Trusted for investigations</div>
              <div className="text-2xl font-bold mt-2">Bring suspicious addresses into your workflow</div>
              <p className="mt-3 text-sm text-slate-300">Export historical timelines, automate alerts, and integrate with SIEM or case management via JSON/CSV.</p>

              <div className="mt-6 grid gap-3">
                <Link to={"/demo-page"} className="inline-flex items-center justify-center px-4 py-3 rounded-md bg-white text-slate-900 font-semibold" href="#demo">
                  Try Demo
                </Link>
                <Link to={"/docs"} className="px-4 py-3 rounded-md border border-slate-700 text-slate-200">Request API Access</Link>
              </div>

              <div className="mt-5 text-xs text-slate-500">
                <strong>Note:</strong> Designed for lawful investigative use only. Data handling follows strict access controls.
              </div>
            </div>
          </aside>
        </section>

        {/* Form */}
        <section id="demo" className="mt-16 bg-slate-900/30 border border-slate-800 rounded-2xl p-6" data-aos="fade-up">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-2xl font-bold">Start a pilot / Get CSV sample</h3>
              <p className="mt-2 text-slate-300">Share basic details and we'll prepare a short pilot dataset & schedule a walkthrough.</p>
              <ul className="mt-4 text-sm text-slate-400 space-y-2">
                <li>• One-week pilot dataset</li>
                <li>• Export in CSV / JSON</li>
                <li>• API keys for integration testing</li>
              </ul>
            </div>

            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 gap-3">
                <input aria-label="Name" placeholder="Your name" className="bg-transparent border border-slate-700 text-slate-200 px-4 py-3 rounded-lg" />
                <input aria-label="Email" placeholder="Work email" className="bg-transparent border border-slate-700 text-slate-200 px-4 py-3 rounded-lg" />
                <input aria-label="Organization" placeholder="Organization" className="bg-transparent border border-slate-700 text-slate-200 px-4 py-3 rounded-lg" />
                <select className="bg-transparent border border-slate-700 text-slate-200 px-4 py-3 rounded-lg">
                  <option className="bg-slate-900">Use case: Investigations</option>
                  <option className="bg-slate-900">Compliance / KYC</option>
                  <option className="bg-slate-900">Research</option>
                </select>
                <textarea placeholder="Notes (optional)" rows="3" className="bg-transparent border border-slate-700 text-slate-200 px-4 py-3 rounded-lg" />
              </div>

              <div className="flex gap-3 justify-between">
                <Link to={"/register"} className="block bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-semibold px-4 py-3 rounded-lg">Sign up</Link>
                {/* <button className=" border border-slate-700 px-4 py-3 rounded-lg text-slate-200">Download Spec (PDF)</button> */}
                <Link to={"/demo-page"} className=" border border-slate-700 px-4 py-3 rounded-lg text-slate-200">Try demo</Link>
              </div>
              <div className="text-xs text-slate-500">We respond within 48 hours. (For demo scheduling only.)</div>
            </form>
          </div>
        </section>
      </section>
    </main>
    </>
  );
}

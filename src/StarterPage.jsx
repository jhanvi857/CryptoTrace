// StarterPage.jsx
export default function StarterPage() {
  return (
    <div className="bg-gray-950 text-gray-200 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Cryptocurrency Intelligence & Threat Analysis
        </h1>
        <p className="text-lg text-gray-401 max-w-2xl mb-8">{/*changed from 400 to 401*/}
          Track, cluster, and analyze cryptocurrency addresses linked with 
          criminal activities across the surface web, deep web, and dark net.  
          Stay ahead with autonomous data collection & forensic insights.
        </p>
        <div className="flex space-x-4">
          <button className="bg-blue-600 px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-500">
            Get Started
          </button>
          <button className="border border-gray-600 px-6 py-3 rounded-lg text-lg font-medium hover:border-blue-500 hover:text-blue-400">
            Explore Dashboard
          </button>
        </div>
      </section>
    </div>
  );
}

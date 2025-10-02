export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-12 px-6 sm:px-12 lg:px-24 mt-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            API Documentation
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore how to integrate CryptoTrace into your workflow using our
            RESTful API. Send requests, get JSON responses, and automate alerts.
          </p>
        </div>

        {/* How it works */}
        <section className="space-y-10" data-aos="fade-up">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Overview
            </h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Our API allows you to fetch indexed crypto addresses, cluster
              information, and activity tags. You can integrate this into your
              internal dashboards, SIEM systems, or investigative workflows.
            </p>
          </div>

          {/* Example Request */}
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl shadow-md" data-aos="fade-up">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Example Request
            </h4>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm text-gray-800 dark:text-gray-200">
{`GET /api/v1/entities?wallet=0x742d35Cc6634C0532925a3b844Bc454e4438f44e
Host: api.cryptotrace.com
Authorization: Bearer YOUR_API_KEY`}
            </pre>
          </div>

          {/* Example Response */}
          <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl shadow-md" data-aos="fade-up">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
              Example Response
            </h4>
            <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm text-gray-800 dark:text-gray-200">
{`{
  "wallet": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  "type": "ETH",
  "clusters": ["Mixer", "Fraud"],
  "sources": [
    {
      "url": "https://forumx.example.com/thread/123",
      "timestamp": "2025-09-29T08:42:00Z"
    }
  ]
}`}
            </pre>
          </div>

          {/* Request API Access */}
          <div className="min-h-screen bg-white dark:bg-gray-950 py-12 px-6 sm:px-12 lg:px-24" data-aos="fade-up">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent text-center">
          Request Access
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300 text-center">
          Fill out the form below to get CSV samples, API keys, or schedule a walkthrough.
        </p>

        <form className="mt-10 grid gap-6" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
          />
          <input
            type="email"
            placeholder="Work Email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
          />
          <input
            type="text"
            placeholder="Organization"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
          />
          <select className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <option value="">Use Case: Investigations</option>
            <option value="compliance">Compliance / KYC</option>
            <option value="research">Research</option>
          </select>
          <textarea
            placeholder="Notes (optional)"
            rows="4"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
          ></textarea>

          <button className="w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition">
            Submit Request
          </button>
        </form>
      </div>
    </div>
        </section>
      </div>
    </div>
  );
}

import { Upload, Database, AlertTriangle, Network } from "lucide-react";
import { useState } from "react";

export default function DemoPage() {
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-12 px-6 sm:px-12 lg:px-24 mt-12">
      <div className="max-w-6xl mx-auto">
        {/* Page Title */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            Try It Yourself
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Upload a sample dataset (CSV/JSON) and see how our system detects
            entities, clusters activities, and generates alerts.
          </p>
        </div>

        {/* Upload Box */}
        <div className="mt-10 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-10 bg-gray-50 dark:bg-gray-900 hover:border-indigo-500 transition">
          <Upload className="h-10 w-10 text-indigo-500" />
          <p className="mt-2 text-gray-700 dark:text-gray-200">
            {file ? `Uploaded: ${file.name}` : "Drag & drop or choose a file"}
          </p>
          <input
            type="file"
            accept=".csv,.json"
            onChange={handleFileUpload}
            className="mt-4 hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="mt-4 px-5 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white rounded-lg cursor-pointer shadow-md hover:shadow-lg transition"
          >
            {file ? "Re-upload File" : "Upload File"}
          </label>
        </div>

        {/* Mock Results */}
        {file && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Entities */}
            <div className="p-6 rounded-2xl shadow-lg bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center gap-2 text-indigo-500">
                <Database className="h-6 w-6" />
                <h3 className="font-semibold">Detected Entities</h3>
              </div>
              <ul className="mt-4 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li>• John Doe (Name)</li>
                <li>• +91-9876543210 (Phone)</li>
                <li>• 0x4b7…9aE3 (Wallet)</li>
              </ul>
            </div>

            {/* Clusters */}
            <div className="p-6 rounded-2xl shadow-lg bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center gap-2 text-pink-500">
                <Network className="h-6 w-6" />
                <h3 className="font-semibold">Clustered Groups</h3>
              </div>
              <ul className="mt-4 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li>• Group A – Fraudulent wallets</li>
                <li>• Group B – Fundraising activity</li>
              </ul>
            </div>

            {/* Alerts */}
            <div className="p-6 rounded-2xl shadow-lg bg-gray-50 dark:bg-gray-900">
              <div className="flex items-center gap-2 text-red-500">
                <AlertTriangle className="h-6 w-6" />
                <h3 className="font-semibold">Alerts</h3>
              </div>
              <ul className="mt-4 text-sm text-gray-700 dark:text-gray-300 space-y-2">
                <li>⚠️ High-risk wallet detected</li>
                <li>⚠️ Suspicious fundraising activity</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

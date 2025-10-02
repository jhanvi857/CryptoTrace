import { ShieldCheck, Network, Zap } from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      name: "Identify",
      description:
        "Detect and contextualize sensitive data such as names, phones, wallets, and bank details. Each entity is linked with source metadata like URL, timestamp, or screenshots.",
      icon: ShieldCheck,
    },
    {
      name: "Cluster",
      description:
        "Automatically group related activities using unsupervised clustering. Tag clusters with fraud, narcotics, fundraising, or mixers using human-in-the-loop validation.",
      icon: Network,
    },
    {
      name: "Act",
      description:
        "Enable proactive responses with alerts, reporting tools, and API integrations. Take action on suspicious clusters and prevent risks in real time.",
      icon: Zap,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 py-16 px-6 sm:px-12 lg:px-24 mt-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
          Powerful Features to Secure Digital Finance
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Our system simplifies detection, investigation, and response for
          crypto-related threats. From raw data to actionable intelligence.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="rounded-2xl shadow-lg p-6 bg-gray-50 dark:bg-gray-900 hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white mx-auto">
              <feature.icon className="h-7 w-7" />
            </div>
            <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white text-center">
              {feature.name}
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-center text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const team = [
    { name: "Jhanvi Patel", role: "Team Leader / Backend" },
    { name: "Darshi prajapati", role: "Frontend" },
    { name: "Ved chaudhari", role: "Frontend" },
    { name: "Divyesh sathwara", role: "Blockchain and security" },
    { name: "Sanket patel", role: "Database" },
    { name: "Dhruv rathod", role: "Scrapping" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-12 px-6 sm:px-12 lg:px-24 mt-8">
      <div className="max-w-6xl mx-auto text-center" >
        <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent" data-aos="fade-up">
          About Our Team
        </h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto" data-aos="fade-up">
          We are passionate about using blockchain analytics and cyber security
          techniques to detect fraudulent crypto activities. Our project, CryptoTrace,
          is designed for lawful investigative use and integrates modern tech
          stacks to provide actionable intelligence.
        </p>

        {/* Tech Stack */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4" data-aos="fade-up">
            Tech Stack
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["React", "Node.js", "PostgreSQL", "Tailwind CSS", "Blockchain", "Cyber Security"].map((tech, idx) => (
              <span key={idx} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium text-gray-800 dark:text-gray-200">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8" data-aos="fade-up">
          {team.map((member, idx) => (
            <div key={idx} className="p-6 rounded-2xl shadow-lg bg-gray-50 dark:bg-gray-900">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{member.name}</h4>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

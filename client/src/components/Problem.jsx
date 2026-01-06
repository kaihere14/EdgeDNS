import React from "react";

const Problem = () => {
  const problems = [
    {
      icon: (
        <svg
          className="w-12 h-12 text-blue-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Traditional DNS is Slow",
      description:
        "Propagation takes hours or days, and you can't manage temporary records.",
    },
    {
      icon: (
        <svg
          className="w-12 h-12 text-blue-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
          />
        </svg>
      ),
      title: "Hard to Manage Temporary Domains",
      description:
        "No native support for TTL-based expiration. Preview deployments? OAuth flows? Painful.",
    },
    {
      icon: (
        <svg
          className="w-12 h-12 text-blue-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: "Not Developer-Friendly",
      description:
        "Most DNS providers prioritize enterprise features over simplicity and API-first design.",
    },
  ];

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black mb-4 text-gray-900">
            The Problem with{" "}
            <span className="text-blue-600">Traditional DNS</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            DNS wasn't built for modern development workflows.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group p-8 rounded-xl border border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="mb-4 transition-transform group-hover:scale-110 duration-300">
                {problem.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                {problem.title}
              </h3>
              <p className="text-gray-600">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;

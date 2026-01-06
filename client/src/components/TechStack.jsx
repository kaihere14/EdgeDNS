import React from "react";

const TechStack = () => {
  const technologies = [
    {
      name: "Node.js",
      description: "Fast, scalable runtime for server-side JavaScript",
    },
    {
      name: "Express / Fastify",
      description: "Lightweight web frameworks for building APIs",
    },
    {
      name: "Redis",
      description: "Ultra-fast in-memory data store for instant lookups",
    },
    {
      name: "PostgreSQL",
      description: "Reliable persistent storage for audit logs and metadata",
    },
    {
      name: "Docker",
      description: "Container orchestration for easy deployment",
    },
    {
      name: "Vercel / VPS",
      description: "Deploy globally or self-host on your infrastructure",
    },
  ];

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Gradient accent */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-gradient-to-l from-white/2 to-transparent rounded-full blur-3xl animate-gradient-shift"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black mb-4 text-gray-900">
            Built On <span className="text-gray-400">Battle-Tested</span> Tech
          </h2>
          <p className="text-lg text-gray-400">
            Using proven technologies trusted by enterprises worldwide.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="group p-8 rounded-xl border border-gray-200 hover:border-gray-300 bg-white/50 hover:bg-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100"
            >
              <h3 className="text-xl font-bold mb-2 text-gray-900 transition-colors">
                {tech.name}
              </h3>
              <p className="text-sm text-gray-400">{tech.description}</p>
            </div>
          ))}
        </div>

        {/* Open Source Notice */}
        <div className="mt-16 p-8 rounded-xl border border-[#10B981]/20 bg-[#10B981]/5">
          <div className="flex items-start gap-4">
            <svg
              className="w-8 h-8 text-[#10B981] flex-shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Open Source
              </h3>
              <p className="text-gray-600">
                EdgeDNS is built on open-source principles. Deploy anywhere,
                host anywhere. No vendor lock-in.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 mt-4 text-[#10B981] hover:text-[#059669] font-semibold transition-colors"
              >
                View on GitHub
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;

import React from "react";

const Solution = () => {
  const features = [
    {
      title: "Redis-Powered Speed",
      description:
        "Instant lookups with sub-100ms resolution. Your records are cached at the edge.",
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "TTL-Based Records",
      description:
        "Set expiration times for temporary domains. Perfect for OAuth flows and preview deployments.",
      icon: (
        <svg
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
    },
    {
      title: "Full Domain Control",
      description:
        "Map full domains AND subdomains. A records, CNAME aliases, TXT records—all supported.",
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
          />
        </svg>
      ),
    },
    {
      title: "API-First Design",
      description:
        "Simple, intuitive REST API. Integrate in minutes, not days.",
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
          />
        </svg>
      ),
    },
    {
      title: "Multi-Tenant Ready",
      description:
        "Perfect for SaaS apps. Each customer gets their own namespace.",
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
          />
        </svg>
      ),
    },
    {
      title: "Developer-Focused",
      description:
        "Built by developers, for developers. Minimal overhead, maximum flexibility.",
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -right-1/2 -top-1/2 w-full h-full bg-gradient-to-b from-blue-50 to-transparent rounded-full blur-3xl animate-gradient-shift"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black mb-4 text-gray-900">
            Meet <span className="text-blue-600">EdgeDNS</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A lightweight DNS-style routing service built on Redis. Instant
            resolution, temporary records, perfect for modern development.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-xl border border-gray-200 hover:border-blue-300 bg-white hover:bg-blue-50/30 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="text-blue-600 w-10 h-10 mb-4 transition-transform group-hover:scale-110 duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Emphasis section */}
        <div className="mt-16 p-8 rounded-xl border border-blue-200 bg-blue-50">
          <p className="text-center text-lg text-gray-600">
            <span className="font-bold text-blue-600">Zero configuration.</span>{" "}
            No DNS propagation delays.
            <span className="font-bold text-blue-600"> Instant updates.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Solution;

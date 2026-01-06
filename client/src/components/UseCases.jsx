import React from "react";

const UseCases = () => {
  const useCases = [
    {
      title: "OAuth Callback Domains",
      description:
        "Manage callback URLs dynamically without touching DNS records. Perfect for multi-environment deployments.",
      tags: ["OAuth", "Security", "Multi-env"],
    },
    {
      title: "SaaS Subdomain Routing",
      description:
        "Give each customer their own subdomain. Scale to thousands of custom domains instantly.",
      tags: ["SaaS", "Multi-tenant", "Scaling"],
    },
    {
      title: "Preview Deployments",
      description:
        "Spin up preview URLs for every PR. Auto-expire after merge or deletion.",
      tags: ["CI/CD", "Preview", "TTL"],
    },
    {
      title: "Load-Balanced Routing",
      description:
        "Dynamically route traffic between endpoints. Update targets without redeploying.",
      tags: ["Load Balancing", "Infrastructure", "Dynamic"],
    },
    {
      title: "A/B Testing Domains",
      description:
        "Create temporary test domains. Expire automatically after experiments end.",
      tags: ["Testing", "Experiments", "Temporary"],
    },
    {
      title: "API Versioning",
      description:
        "Route api-v1.example.com and api-v2.example.com to different backends.",
      tags: ["API", "Versioning", "Backend"],
    },
  ];

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -left-1/4 top-1/3 w-96 h-96 bg-gradient-to-r from-white/2 to-white/1 rounded-full blur-3xl animate-gradient-shift"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black mb-4 text-gray-900">
            Perfect For <span className="text-gray-400">Every Use Case</span>
          </h2>
          <p className="text-lg text-gray-400">
            EdgeDNS is flexible enough for any routing scenario.
          </p>
        </div>

        {/* Use cases grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="group p-8 rounded-xl border border-gray-200 hover:border-gray-300 bg-white/50 hover:bg-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100"
            >
              <h3 className="text-xl font-bold mb-3 text-gray-900 transition-colors">
                {useCase.title}
              </h3>

              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {useCase.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {useCase.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 text-xs font-semibold rounded-full bg-white/5 text-gray-900 border border-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom emphasis */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-400">
            Not limited to these.{" "}
            <span className="text-gray-900 font-bold">What will you build?</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default UseCases;

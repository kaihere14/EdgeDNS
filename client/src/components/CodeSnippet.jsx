import React, { useState } from "react";

const CodeSnippet = () => {
  const [activeTab, setActiveTab] = useState("create");

  const snippets = {
    create: {
      title: "Create a Record",
      lang: "bash",
      code: `curl -X POST https://api.edgedns.io/v1/records \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "domain": "api.example.com",
    "target": "192.0.2.1",
    "type": "A",
    "ttl": 3600
  }'`,
    },
    query: {
      title: "Query a Record",
      lang: "bash",
      code: `curl https://api.edgedns.io/v1/records/api.example.com \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Response
{
  "domain": "api.example.com",
  "target": "192.0.2.1",
  "type": "A",
  "ttl": 3595,
  "createdAt": "2025-01-06T10:30:00Z",
  "expiresAt": "2025-01-06T11:30:00Z"
}`,
    },
    update: {
      title: "Update a Record",
      lang: "bash",
      code: `curl -X PATCH https://api.edgedns.io/v1/records/api.example.com \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "target": "192.0.2.42",
    "ttl": 7200
  }'`,
    },
    delete: {
      title: "Delete a Record",
      lang: "bash",
      code: `curl -X DELETE https://api.edgedns.io/v1/records/api.example.com \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Instant deletion from cache
# Returns 204 No Content`,
    },
  };

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black mb-4 text-gray-900">
            Simple <span className="text-gray-400">API</span>
          </h2>
          <p className="text-lg text-gray-400">
            Clean, intuitive endpoints. No vendor lock-in. Pure REST.
          </p>
        </div>

        {/* Tabs and code display */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-2xl">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 bg-gray-100 overflow-x-auto">
            {Object.entries(snippets).map(([key, snippet]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 px-6 py-4 font-semibold text-sm transition-all duration-300 whitespace-nowrap ${
                  activeTab === key
                    ? "text-gray-900 border-b-2 border-white bg-white"
                    : "text-gray-400 hover:text-gray-900"
                }`}
              >
                {snippet.title}
              </button>
            ))}
          </div>

          {/* Code display */}
          <div className="p-6">
            <pre className="text-sm text-gray-900 overflow-x-auto leading-relaxed">
              <code>{snippets[activeTab].code}</code>
            </pre>
          </div>

          {/* Copy button */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
            <button className="px-4 py-2 text-sm font-semibold text-gray-400 hover:text-gray-900 transition-colors border border-gray-300 hover:border-gray-400 rounded-lg flex items-center gap-2">
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
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy
            </button>
          </div>
        </div>

        {/* Info boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 rounded-xl border border-gray-200 bg-white/50">
            <div className="text-gray-900 font-bold mb-2 flex items-center gap-2">
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
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Base URL
            </div>
            <div className="text-sm text-gray-400 font-mono">
              https://api.edgedns.io
            </div>
          </div>
          <div className="p-6 rounded-xl border border-gray-200 bg-white/50">
            <div className="text-gray-900 font-bold mb-2 flex items-center gap-2">
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
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>
              Authentication
            </div>
            <div className="text-sm text-gray-400">
              Bearer token in Authorization header
            </div>
          </div>
          <div className="p-6 rounded-xl border border-gray-200 bg-white/50">
            <div className="text-gray-900 font-bold mb-2 flex items-center gap-2">
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Response
            </div>
            <div className="text-sm text-gray-400">JSON. Always.</div>
          </div>
        </div>

        {/* Link to full docs */}
        <div className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-300 font-semibold transition-colors"
          >
            Explore Full API Documentation
            <svg
              className="w-5 h-5"
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
    </section>
  );
};

export default CodeSnippet;

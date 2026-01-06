import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-20 pb-20 bg-white">
      {/* Gradient background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full blur-3xl animate-gradient-shift"></div>
        <div
          className="absolute bottom-40 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full blur-3xl animate-gradient-shift"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-block mb-8 px-4 py-2 border border-blue-200 rounded-full bg-blue-50 hover:bg-blue-100 transition-all duration-300 animate-fade-in-up">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider flex items-center gap-2">
            <svg
              className="w-3 h-3"
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
            DNS routing reimagined for developers
          </span>
        </div>

        {/* Main headline */}
        <h1
          className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] text-gray-900 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          DNS at the Speed of Redis
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg sm:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Map domains to IPs, manage temporary records with TTL, and resolve
          instantly. Built for OAuth flows, SaaS routing, and preview
          deployments.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <button
            onClick={() => navigate("/login")}
            className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-600/30 hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Get Started
          </button>
          <button className="group px-8 py-4 border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 font-bold rounded-lg transition-all duration-300 flex items-center gap-2">
            View Docs
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
          </button>
        </div>

        {/* Feature highlights */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-200 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="py-4">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              &lt;100ms
            </div>
            <div className="text-sm text-gray-600">
              Resolution time with Redis cache
            </div>
          </div>
          <div className="py-4">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              Full Control
            </div>
            <div className="text-sm text-gray-600">
              Domain & subdomain mapping at scale
            </div>
          </div>
          <div className="py-4">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              Auto-Expire
            </div>
            <div className="text-sm text-gray-600">
              TTL-based temporary records
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce opacity-40">
        <svg
          className="w-5 h-5 mx-auto text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;

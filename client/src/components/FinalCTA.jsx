import React from "react";
import { useNavigate } from "react-router-dom";

const FinalCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
      {/* Gradient background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-white/2 via-transparent to-white/2"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-white/5 to-white/5 rounded-full blur-3xl animate-gradient-shift"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Main CTA */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-[1.1] text-gray-900">
          Ready to Ship with <span className="text-gray-400">EdgeDNS</span>?
        </h2>

        <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Join developers building the next generation of SaaS apps, OAuth
          flows, and dynamic deployments.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button
            onClick={() => navigate("/login")}
            className="group px-10 py-4 bg-white hover:bg-gray-100 text-black font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-white/20 hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Start Building Now
          </button>
          <button className="group px-10 py-4 border border-gray-300 text-gray-900 hover:border-gray-400 hover:bg-gray-50 font-bold rounded-lg transition-all duration-300">
            Request Early Access
          </button>
        </div>

        {/* Stats/Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 border-t border-gray-200">
          <div className="py-4">
            <div className="text-3xl font-bold text-gray-900 mb-1">99.99%</div>
            <div className="text-sm text-gray-500">Uptime SLA</div>
          </div>
          <div className="py-4">
            <div className="text-3xl font-bold text-gray-900 mb-1">24/7</div>
            <div className="text-sm text-gray-500">Developer Support</div>
          </div>
          <div className="py-4">
            <div className="text-3xl font-bold text-gray-900 mb-1">Free</div>
            <div className="text-sm text-gray-500">Open Source</div>
          </div>
        </div>

        {/* Bottom message */}
        <div className="mt-12 p-6 rounded-xl border border-gray-200 bg-white/50">
          <p className="text-gray-400">
            <span className="font-bold text-gray-900">
              No credit card required.
            </span>{" "}
            Deploy in minutes.
            <span className="font-bold text-gray-900"> Scale infinitely.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;

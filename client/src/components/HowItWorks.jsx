import React, { useState } from "react";

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Create a Record",
      description:
        "Send a POST request to the API with your domain, target IP/URL, and TTL.",
      code: `POST /api/records
{
  "domain": "app.example.com",
  "target": "192.168.1.1",
  "ttl": 3600
}`,
    },
    {
      number: "02",
      title: "Cache in Redis",
      description:
        "The record is instantly cached in Redis with automatic expiration based on TTL.",
      code: `redis> SET app.example.com 192.168.1.1 EX 3600
OK

redis> GET app.example.com
"192.168.1.1"`,
    },
    {
      number: "03",
      title: "Resolve Instantly",
      description:
        "Query the record and get sub-100ms resolution from Redis cache.",
      code: `GET /api/records/app.example.com
{
  "domain": "app.example.com",
  "target": "192.168.1.1",
  "cached": true,
  "ttl": 3595
}`,
    },
  ];

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black mb-4 text-gray-900">
            How It <span className="text-gray-400">Works</span>
          </h2>
          <p className="text-lg text-gray-400">
            Three simple steps to manage your domain records at scale.
          </p>
        </div>

        {/* Steps visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Step selection */}
          <div className="space-y-4">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 group ${
                  activeStep === index
                    ? "border-[#3B82F6] bg-blue-50"
                    : "border-gray-200 bg-white/50 hover:border-[#374151]"
                }`}
              >
                <div
                  className={`text-sm font-bold mb-2 transition-colors ${
                    activeStep === index ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  STEP {step.number}
                </div>
                <h3
                  className={`text-xl font-bold transition-colors ${
                    activeStep === index
                      ? "text-gray-900"
                      : "text-gray-600 group-hover:text-gray-900"
                  }`}
                >
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  {step.description}
                </p>
              </button>
            ))}
          </div>

          {/* Right side - Code display */}
          <div className="relative">
            <div className="sticky top-20">
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-2xl">
                {/* Terminal header */}
                <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#EF4444]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#10B981]"></div>
                  <span className="text-xs text-gray-500 ml-auto">
                    edgedns-cli
                  </span>
                </div>

                {/* Code content */}
                <div className="p-6">
                  <pre className="text-sm text-gray-900 overflow-x-auto">
                    <code>{steps[activeStep].code}</code>
                  </pre>
                </div>
              </div>

              {/* Step indicator */}
              <div className="flex justify-center gap-2 mt-6">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activeStep === index
                        ? "bg-white w-8"
                        : "bg-gray-700 hover:bg-gray-600 w-2"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

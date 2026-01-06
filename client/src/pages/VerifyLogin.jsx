import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const VerifyLogin = () => {
  const navigate = useNavigate();
  const { verifyUser, loading, isAuthenticated, user } = useAuth();
  const [verificationStatus, setVerificationStatus] = useState("verifying"); // verifying, success, error

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyUser();
        setVerificationStatus("success");
        // Delay redirect for better UX
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } catch (error) {
        setVerificationStatus("error");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };
    verify();
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated && verificationStatus === "verifying") {
      setVerificationStatus("error");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  }, [loading, isAuthenticated, navigate, verificationStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-12">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 mb-6 relative">
              <span className="text-3xl font-black text-white">ED</span>
              {verificationStatus === "verifying" && (
                <div className="absolute -inset-1 border-4 border-blue-200 border-t-blue-600 rounded-2xl animate-spin"></div>
              )}
              {verificationStatus === "success" && (
                <div className="absolute -inset-1 border-4 border-green-500 rounded-2xl animate-pulse"></div>
              )}
            </div>
          </div>

          {/* Verifying State */}
          {verificationStatus === "verifying" && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Verifying Your Account
              </h2>
              <p className="text-gray-600 mb-8">
                Please wait while we authenticate you securely...
              </p>

              {/* Loading Steps */}
              <div className="space-y-4 text-left mb-8">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Validating OAuth credentials
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 animate-pulse">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    Fetching user profile
                  </span>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-200 opacity-50">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-300"></div>
                  <span className="text-sm font-medium text-gray-500">
                    Setting up session
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 animate-progress"></div>
              </div>
            </div>
          )}

          {/* Success State */}
          {verificationStatus === "success" && (
            <div className="text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Welcome Back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}!
              </h2>
              <p className="text-gray-600">
                Successfully authenticated. Redirecting you now...
              </p>
            </div>
          )}

          {/* Error State */}
          {verificationStatus === "error" && (
            <div className="text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Verification Failed
              </h2>
              <p className="text-gray-600 mb-6">
                We couldn't verify your account. Redirecting to login...
              </p>
              <div className="p-4 rounded-lg bg-red-50 border border-red-200">
                <p className="text-sm text-red-800">
                  Please try signing in again
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Message */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Secured by EdgeDNS Authentication
        </p>
      </div>

      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress {
          animation: progress 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default VerifyLogin;

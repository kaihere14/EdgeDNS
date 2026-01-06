import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [records, setRecords] = useState([]);
  const [loadingRecords, setLoadingRecords] = useState(false);
  const [deletingDomain, setDeletingDomain] = useState(null);
  const [formData, setFormData] = useState({
    subdomain: "",
    type: "A",
    target: "",
    ttl: 3600,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const fetchRecords = async () => {
    setLoadingRecords(true);
    try {
      const response = await axios.get(`${API_URL}/api/domain/listDomains`, {
        withCredentials: true,
      });
      setRecords(response.data.data || []);
    } catch (error) {
      console.error("Error fetching records:", error);
      setRecords([]);
    } finally {
      setLoadingRecords(false);
    }
  };

  const handleViewRecords = async () => {
    setShowViewModal(true);
    await fetchRecords();
  };

  const handleDeleteClick = (subdomain) => {
    setRecordToDelete(subdomain);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!recordToDelete) return;

    setDeletingDomain(recordToDelete);
    try {
      await axios.delete(`${API_URL}/api/domain/deleteDomain`, {
        data: { subdomain: recordToDelete },
        withCredentials: true,
      });

      // Refresh the records list after deletion
      await fetchRecords();
      setShowDeleteModal(false);
      setRecordToDelete(null);
    } catch (error) {
      console.error("Error deleting record:", error);
      alert(
        error.response?.data?.message ||
          "Failed to delete DNS record. Please try again."
      );
    } finally {
      setDeletingDomain(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setRecordToDelete(null);
  };

  const handleDeleteRecord = async (subdomain) => {
    if (!confirm(`Are you sure you want to delete "${subdomain}"?`)) {
      return;
    }

    setDeletingDomain(subdomain);
    try {
      await axios.delete(`${API_URL}/api/domain/deleteDomain`, {
        data: { subdomain },
        withCredentials: true,
      });

      // Refresh the records list after deletion
      await fetchRecords();
    } catch (error) {
      console.error("Error deleting record:", error);
      alert(
        error.response?.data?.message ||
          "Failed to delete DNS record. Please try again."
      );
    } finally {
      setDeletingDomain(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const payload = {
        subdomain: formData.subdomain,
        data: {
          type: formData.type,
          target: formData.target,
          ttl: parseInt(formData.ttl),
        },
      };

      const response = await axios.post(
        `${API_URL}/api/domain/register`,
        payload,
        {
          withCredentials: true,
        }
      );

      setSubmitMessage({
        type: "success",
        text: response.data.message || "DNS record created successfully!",
      });

      // Reset form
      setFormData({
        subdomain: "",
        type: "A",
        target: "",
        ttl: 3600,
      });

      // Close modal after 2 seconds
      setTimeout(() => {
        setShowCreateModal(false);
        setSubmitMessage(null);
      }, 2000);
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Failed to create DNS record. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <svg
              className="w-8 h-8 text-blue-600 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                <span className="text-lg font-black text-white">ED</span>
              </div>
              <span className="text-xl font-bold text-gray-900">EdgeDNS</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {user.profilePicture && (
                  <img
                    src={user.profilePicture}
                    alt={user.name}
                    referrerPolicy="none"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600">
            Manage your DNS records and deployments
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Account Information
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500 w-32">
                Name:
              </span>
              <span className="text-sm text-gray-900">{user.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500 w-32">
                Email:
              </span>
              <span className="text-sm text-gray-900">{user.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500 w-32">
                Provider:
              </span>
              <span className="text-sm text-gray-900 capitalize">
                {user.authProvider}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-500 w-32">
                User ID:
              </span>
              <span className="text-sm text-gray-900">{user.id}</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => setShowCreateModal(true)}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-600 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Create DNS Record
            </h3>
            <p className="text-sm text-gray-600">
              Add a new domain mapping with TTL
            </p>
          </div>

          <div
            onClick={handleViewRecords}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-600 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              View Records
            </h3>
            <p className="text-sm text-gray-600">
              Browse all your DNS mappings
            </p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-600 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Analytics
            </h3>
            <p className="text-sm text-gray-600">
              View usage stats and metrics
            </p>
          </div>
        </div>

        {/* Create DNS Record Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 backdrop-blur-[10px] flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Create DNS Record
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Register a new subdomain mapping
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
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
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Subdomain Field */}
                <div>
                  <label
                    htmlFor="subdomain"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Subdomain <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subdomain"
                    name="subdomain"
                    value={formData.subdomain}
                    onChange={handleInputChange}
                    placeholder="api.example.com"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the full subdomain (e.g., api.example.com)
                  </p>
                </div>

                {/* Record Type Field */}
                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Record Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                  >
                    <option value="A">A - IPv4 Address</option>
                    <option value="AAAA">AAAA - IPv6 Address</option>
                    <option value="CNAME">CNAME - Canonical Name</option>
                    <option value="TXT">TXT - Text Record</option>
                    <option value="MX">MX - Mail Exchange</option>
                  </select>
                </div>

                {/* Target Field */}
                <div>
                  <label
                    htmlFor="target"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Target {formData.type === "A" ? "(IP Address)" : ""}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="target"
                    name="target"
                    value={formData.target}
                    onChange={handleInputChange}
                    placeholder={
                      formData.type === "A"
                        ? "192.168.1.10"
                        : "target.example.com"
                    }
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.type === "A" &&
                      "IPv4 address (e.g., 192.168.1.10)"}
                    {formData.type === "CNAME" &&
                      "Domain name (e.g., example.com)"}
                    {formData.type === "TXT" && "Text value for the record"}
                  </p>
                </div>

                {/* TTL Field */}
                <div>
                  <label
                    htmlFor="ttl"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    TTL (Time To Live) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="ttl"
                    name="ttl"
                    value={formData.ttl}
                    onChange={handleInputChange}
                    min="60"
                    max="86400"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Cache duration in seconds (60-86400)
                  </p>
                </div>

                {/* Submit Message */}
                {submitMessage && (
                  <div
                    className={`p-4 rounded-lg ${
                      submitMessage.type === "success"
                        ? "bg-green-50 border border-green-200"
                        : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <p
                      className={`text-sm font-medium ${
                        submitMessage.type === "success"
                          ? "text-green-800"
                          : "text-red-800"
                      }`}
                    >
                      {submitMessage.text}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 px-6 py-3 font-semibold rounded-lg transition-all ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Creating...
                      </span>
                    ) : (
                      "Create Record"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* View Records Modal */}
        {showViewModal && (
          <div className="fixed inset-0 backdrop-blur-[10px] flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Your DNS Records
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    View and manage all your registered domains
                  </p>
                </div>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
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
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                {loadingRecords ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                      <svg
                        className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <p className="text-gray-600">Loading records...</p>
                    </div>
                  </div>
                ) : records.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No DNS Records Found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      You haven't created any DNS records yet.
                    </p>
                    <button
                      onClick={() => {
                        setShowViewModal(false);
                        setShowCreateModal(true);
                      }}
                      className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Create Your First Record
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                            Domain
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                            Type
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                            Target
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                            TTL
                          </th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                            Created
                          </th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {records.map((record, index) => (
                          <tr
                            key={record.id || index}
                            className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                          >
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                                  <svg
                                    className="w-4 h-4 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                    />
                                  </svg>
                                </div>
                                <span className="font-medium text-gray-900">
                                  {record.domain}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                {record.type}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-sm text-gray-900 font-mono">
                                {record.target}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-sm text-gray-600">
                                {record.ttl}s
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <span className="text-sm text-gray-600">
                                {record.createdAt
                                  ? formatDate(record.createdAt)
                                  : "N/A"}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right">
                              <button
                                onClick={() => handleDeleteClick(record.domain)}
                                disabled={deletingDomain === record.domain}
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-700 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                {deletingDomain === record.domain ? (
                                  <>
                                    <svg
                                      className="w-4 h-4 animate-spin"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                    >
                                      <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                      />
                                      <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      />
                                    </svg>
                                    Deleting...
                                  </>
                                ) : (
                                  <>
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
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                    Delete
                                  </>
                                )}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Footer with Record Count */}
                {records.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      Total Records:{" "}
                      <span className="font-semibold text-gray-900">
                        {records.length}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={fetchRecords}
                  disabled={loadingRecords}
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  Refresh
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 backdrop-blur-[10px] flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      Delete DNS Record
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      This action cannot be undone
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <p className="text-gray-700 mb-2">
                  Are you sure you want to delete this DNS record?
                </p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5 text-blue-600 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                    <span className="font-semibold text-gray-900 break-all">
                      {recordToDelete}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  The record will be removed from both the cache and database.
                </p>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 p-6 border-t border-gray-200">
                <button
                  onClick={handleDeleteCancel}
                  disabled={deletingDomain}
                  className="flex-1 px-6 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deletingDomain}
                  className="flex-1 px-6 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {deletingDomain ? (
                    <>
                      <svg
                        className="w-5 h-5 animate-spin"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    <>
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
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete Record
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

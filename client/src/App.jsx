import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import VerifyLogin from "./pages/VerifyLogin";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <AuthProvider>
      <div className="bg-white text-gray-900 overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/oauth-success/verify" element={<VerifyLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;

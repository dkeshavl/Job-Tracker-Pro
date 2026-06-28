import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  // Removed message state (using toast notifications instead)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/forgot-password", {
        email,
      });

      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="bg-[#111] border border-gray-700 rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">
          Forgot Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-lg">
            Send Reset Link
          </button>
        </form>

       {/* Toast notifications handle messages */}

        <div className="mt-6 text-center">
          <Link to="/login" className="text-blue-400 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

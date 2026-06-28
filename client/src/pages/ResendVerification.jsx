import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";

function ResendVerification() {
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await api.post("/auth/resend-verification", {
        email,
      });

      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="bg-[#111] border border-gray-700 rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Resend Verification
        </h1>

        <p className="text-gray-400 text-center mb-6">
          Enter your registered email address.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 p-3 rounded-lg text-white disabled:opacity-50"
          >
            {loading ? "Sending..." : "Resend Verification Email"}
          </button>
        </form>



        <div className="mt-6 text-center">
          <Link to="/login" className="text-blue-400 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResendVerification;

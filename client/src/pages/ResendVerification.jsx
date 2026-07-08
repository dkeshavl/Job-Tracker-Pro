import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";
import AuthCard from "../components/AuthCard";

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
    <AuthCard
      title="Resend Verification"
      subtitle="Enter your registered email address."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 rounded-lg bg-black border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
        >
          {loading ? "Sending..." : "Resend Verification Email"}
        </button>
      </form>

      <div className="mt-8 text-center">
        <Link
          to="/login"
          className="text-blue-400 hover:text-blue-300 transition"
        >
          Back to Login
        </Link>
      </div>
    </AuthCard>
  );
}

export default ResendVerification;

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";
import AuthCard from "../components/AuthCard";

function ResetPassword() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(`/auth/reset-password/${token}`, {
        password,
      });

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed.");
    }
  };

  return (
    <AuthCard title="Reset Password" subtitle="Create a new secure password.">
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="password"
          placeholder="New Password"
          className="w-full px-4 py-3 rounded-lg bg-black border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-white transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-lg transition">
          Update Password
        </button>
      </form>

      {/* Toast notifications handle success and error messages */}
    </AuthCard>
  );
}

export default ResetPassword;

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";

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
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="bg-[#111] border border-gray-700 rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Reset Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 rounded-lg bg-[#1a1a1a] border border-gray-700 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-green-600 hover:bg-green-500 p-3 rounded-lg text-white">
            Update Password
          </button>
        </form>

        {/* Toast notifications handle success and error messages */}
      </div>
    </div>
  );
}

export default ResetPassword;

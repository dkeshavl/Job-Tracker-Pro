import api from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data || err);

      toast.error(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>

        <p className="text-center text-zinc-400 mb-6">Login to your account</p>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm text-zinc-400">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full mt-1 px-4 py-3 rounded-lg bg-black border border-zinc-800 text-white placeholder-zinc-600
              focus:outline-none focus:border-white"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-zinc-400">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full mt-1 px-4 py-3 rounded-lg bg-black border border-zinc-800 text-white placeholder-zinc-600
              focus:outline-none focus:border-white"
            />
          </div>
          <div className="text-right mb-4">
            <Link
              to="/forgot-password"
              className="text-blue-400 hover:underline text-sm"
            >
              Forgot Password?
            </Link>
          </div>
          {/* Button */}
          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-zinc-200 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-zinc-400 text-sm mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-white cursor-pointer underline"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;

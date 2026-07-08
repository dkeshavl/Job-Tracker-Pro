import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import AuthCard from "../components/AuthCard";

function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading");
  // loading | success | error

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await api.get(`/auth/verify-email/${token}`);

        console.log("Verification Response:", res.data);

        setStatus("success");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (err) {
        console.error("Verification Error:", err.response?.data);

        setStatus("error");
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <AuthCard>
      {status === "loading" && (
        <>
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />

          <h1 className="text-3xl font-bold">Verifying your email...</h1>

          <p className="text-zinc-400 mt-3">
            Please wait while we verify your account.
          </p>
        </>
      )}

      {status === "success" && (
        <>
          <div className="text-6xl mb-5">✅</div>

          <h1 className="text-3xl font-bold text-green-400">Email Verified</h1>

          <p className="text-zinc-400 mt-3">
            Your email has been verified successfully.
          </p>

          <p className="text-green-400 mt-4">Redirecting to Login...</p>
        </>
      )}

      {status === "error" && (
        <>
          <div className="text-6xl mb-5">❌</div>

          <h1 className="text-3xl font-bold text-red-500">
            Invalid or Expired Link
          </h1>

          <p className="text-zinc-400 mt-3 mb-8">
            This verification link is invalid, expired or already used.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-lg transition"
          >
            Back to Register
          </button>
        </>
      )}
    </AuthCard>
  );
}

export default VerifyEmail;

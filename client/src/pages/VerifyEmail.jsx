import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

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
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="bg-[#111] p-10 rounded-xl border border-gray-700 text-center max-w-md">
        {status === "loading" && (
          <>
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-5"></div>

            <h1 className="text-2xl font-bold text-white">
              Verifying your email...
            </h1>

            <p className="text-gray-400 mt-3">
              Please wait while we verify your account.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="text-6xl mb-4">✅</div>

            <h1 className="text-3xl font-bold text-green-400 mb-4">
              Email Verified
            </h1>

            <p className="text-gray-300">
              Your email has been verified successfully.
            </p>

            <p className="text-green-400 mt-3">Redirecting to Login...</p>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-3xl font-bold text-red-500 mb-4">
              Invalid or Expired Link
            </h1>
            <p className="text-gray-300 mb-6">
              This verification link is invalid, expired, or has already been
              used.
            </p>

            <button
              onClick={() => navigate("/register")}
              className="bg-blue-600 hover:bg-blue-500 transition px-5 py-2 rounded-lg"
            >
              Back to Register
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default VerifyEmail;

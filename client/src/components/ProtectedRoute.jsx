import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [count, setCount] = useState(3);

  useEffect(() => {
    if (!token) {
      const interval = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [token, navigate]);

  if (!token) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl p-8">

          <div className="w-12 h-12 rounded-full border border-red-600 flex items-center justify-center mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
          </div>

          <h1 className="text-3xl font-bold text-white">
            Unauthorized Access
          </h1>

          <p className="text-zinc-400 mt-3 leading-relaxed">
            Your session has expired or you are not authenticated.
            Please sign in to continue.
          </p>

          <div className="mt-8">
            <div className="flex justify-between text-sm text-zinc-500 mb-2">
              <span>Redirecting to login</span>
              <span>{count}s</span>
            </div>

            <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-1000"
                style={{
                  width: `${(count / 3) * 100}%`,
                }}
              />
            </div>
          </div>

          <button
            onClick={() => navigate("/login", { replace: true })}
            className="w-full mt-8 bg-white text-black py-3 rounded-lg font-semibold hover:bg-zinc-200 transition"
          >
            Go to Login
          </button>

        </div>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
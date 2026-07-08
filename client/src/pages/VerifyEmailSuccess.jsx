import { Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";

function VerifyEmailSuccess() {
  return (
    <AuthCard>
      <div className="text-6xl mb-5">🎉</div>

      <h1 className="text-3xl font-bold text-green-400">
        Email Verified Successfully
      </h1>

      <p className="text-zinc-400 mt-3">
        You can now log in to your account.
      </p>

      <Link
        to="/login"
        className="mt-8 flex justify-center w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-lg transition"
      >
        Go to Login
      </Link>
    </AuthCard>
  );
}

export default VerifyEmailSuccess;
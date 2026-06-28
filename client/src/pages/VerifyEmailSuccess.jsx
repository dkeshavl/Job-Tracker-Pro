import { Link } from "react-router-dom";

function VerifyEmailSuccess() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="bg-[#111] p-10 rounded-xl border border-gray-700 text-center">
        <h1 className="text-3xl text-green-400 font-bold">
          Email Verified Successfully 🎉
        </h1>

        <p className="mt-4 text-gray-300">
          You can now log in to your account.
        </p>

        <Link
          to="/login"
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg transition"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
}

export default VerifyEmailSuccess;

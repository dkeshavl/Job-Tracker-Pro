import { Link } from "react-router-dom";

function Navbar({ onLogout }) {
  return (
    <nav className="bg-[#111111] border-b border-gray-800 px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-white">
        Job Tracker
      </h1>

      <div className="flex gap-4">
        <Link
          to="/dashboard"
          className="text-gray-300 hover:text-white transition"
        >
          Dashboard
        </Link>

        <Link
          to="/jobs"
          className="text-gray-300 hover:text-white transition"
        >
          Jobs
        </Link>

        <Link
          to="/add-job"
          className="text-gray-300 hover:text-white transition"
        >
          Add Job
        </Link>

        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
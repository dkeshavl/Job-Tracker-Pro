import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="w-64 bg-[#111111] border-r border-gray-800 min-h-screen p-6">
      <h2 className="text-2xl font-bold text-white mb-10">
        Job Tracker
      </h2>

      <div className="space-y-3">
        <Link
          to="/dashboard"
          className="block text-gray-300 hover:text-white"
        >
          Dashboard
        </Link>

        <Link
          to="/jobs"
          className="block text-gray-300 hover:text-white"
        >
          My Jobs
        </Link>

        <Link
          to="/add-job"
          className="block text-gray-300 hover:text-white"
        >
          Add Job
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
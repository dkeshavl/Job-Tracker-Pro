import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function Dashboard() {
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "This will permanently delete your account and all associated data.\n\nThis action cannot be undone.",
    );

    if (!confirmDelete) return;

    try {
      await api.delete("/auth/delete-account");

      localStorage.removeItem("token");

      alert("Your account has been deleted successfully.");

      window.location.href = "/login";
    } catch (err) {
      console.log(err);
      alert("Failed to delete account.");
    }
  };

  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interview: 0,
    rejected: 0,
    offer_count: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/jobs/stats");
      setStats(res.data);
    } catch (err) {
      console.log(err);

      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const card =
    "bg-[#0b0b0b] border border-gray-800 rounded-xl p-5 text-center hover:border-gray-600 transition";

  const statNumber = "text-2xl font-semibold text-white";
  const statLabel = "text-gray-400 text-sm";

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>

          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-lg border border-gray-700 hover:border-gray-500 transition"
            >
              Logout
            </button>

            <button
              onClick={handleDeleteAccount}
              className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
            >
              Delete Account
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          <div className={card}>
            <p className={statLabel}>Total Jobs</p>
            <p className={statNumber}>{stats.total}</p>
          </div>

          <div className={card}>
            <p className={statLabel}>Applied</p>
            <p className={statNumber}>{stats.applied}</p>
          </div>

          <div className={card}>
            <p className={statLabel}>Interview</p>
            <p className={statNumber}>{stats.interview}</p>
          </div>

          <div className={card}>
            <p className={statLabel}>Rejected</p>
            <p className={statNumber}>{stats.rejected}</p>
          </div>

          <div className={card}>
            <p className={statLabel}>Offers</p>
            <p className={statNumber}>{stats.offer_count}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link to="/jobs">
            <button className="bg-white text-black hover:bg-gray-200 px-5 py-2 rounded-lg transition">
              View Jobs
            </button>
          </Link>

          <Link to="/add-job">
            <button className="bg-black border border-gray-700 hover:border-gray-500 text-white px-5 py-2 rounded-lg transition">
              Add Job
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import DashboardCharts from "../components/DashboardCharts";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";

function Dashboard() {
  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = async () => {
    try {
      await api.delete("/auth/delete-account");

      localStorage.removeItem("token");

      toast.success("Account deleted successfully.");

      setShowDeleteModal(false);

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } catch (err) {
      console.log(err);

      toast.error("Failed to delete account.");

      setShowDeleteModal(false);
    }
  };

  const cancelDeleteAccount = () => {
    setShowDeleteModal(false);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/analytics");

      setAnalytics(res.data);
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
            <p className={statNumber}>{analytics?.stats.total || 0}</p>
          </div>

          <div className={card}>
            <p className={statLabel}>Applied</p>
            <p className={statNumber}>{analytics?.stats.applied || 0}</p>
          </div>

          <div className={card}>
            <p className={statLabel}>Interview</p>
            <p className={statNumber}>{analytics?.stats.interview || 0}</p>
          </div>

          <div className={card}>
            <p className={statLabel}>Rejected</p>
            <p className={statNumber}>{analytics?.stats.rejected || 0}</p>
          </div>

          <div className={card}>
            <p className={statLabel}>Offers</p>
            <p className={statNumber}>{analytics?.stats.offer_count || 0}</p>
          </div>
        </div>
        {analytics && (
          <DashboardCharts
            stats={analytics.stats}
            monthlyApplications={analytics.monthlyApplications}
            interviewRate={analytics.interviewRate}
            offerRate={analytics.offerRate}
          />
        )}
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
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Account?"
        message="This will permanently delete your account and all your jobs. This action cannot be undone."
        confirmText="Delete Account"
        confirmColor="bg-red-600 hover:bg-red-500"
        onConfirm={confirmDeleteAccount}
        onCancel={cancelDeleteAccount}
      />
    </div>
  );
}

export default Dashboard;

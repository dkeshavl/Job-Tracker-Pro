import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import JobTable from "../components/JobTable";
import toast from "react-hot-toast";
import ConfirmModal from "../components/ConfirmModal";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  const jobsPerPage = 10;

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, sortBy]);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteJob = (id) => {
    setJobToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteJob = async () => {
    try {
      await api.delete(`/jobs/${jobToDelete}`);

      toast.success("Job deleted successfully.");

      fetchJobs();
    } catch (err) {
      console.log(err);

      toast.error("Failed to delete job.");
    }

    setShowDeleteModal(false);
    setJobToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setJobToDelete(null);
  };

  const filteredJobs = useMemo(() => {
    const filtered = jobs.filter((job) => {
      const matchesSearch =
        job.company.toLowerCase().includes(search.toLowerCase()) ||
        job.position.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        job.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });

    switch (sortBy) {
      case "Company A-Z":
        filtered.sort((a, b) => a.company.localeCompare(b.company));
        break;

      case "Company Z-A":
        filtered.sort((a, b) => b.company.localeCompare(a.company));
        break;

      case "Salary":
        filtered.sort(
          (a, b) => parseInt(b.salary || 0) - parseInt(a.salary || 0),
        );
        break;

      case "Status":
        filtered.sort((a, b) => a.status.localeCompare(b.status));
        break;

      default:
        break;
    }

    return filtered;
  }, [jobs, search, statusFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / jobsPerPage));

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">My Jobs</h1>

          <div className="flex gap-3">
            <Link to="/dashboard">
              <button className="px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-500 hover:bg-[#111111] transition">
                Dashboard
              </button>
            </Link>

            <Link to="/add-job">
              <button className="px-4 py-2 rounded-lg bg-white text-black hover:bg-gray-200 transition font-medium">
                Add Job
              </button>
            </Link>
            <Link to="/kanban">
              <button className="px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-500 hover:bg-[#111111] transition">
                Kanban View
              </button>
            </Link>
          </div>
        </div>

        {/* Search / Filter / Sort */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by company or position..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111111] border border-gray-800 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-white"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#111111] border border-gray-800 rounded-xl px-4 py-3"
          >
            <option>All</option>
            <option>Applied</option>
            <option>Interview</option>
            <option>Offer</option>
            <option>Rejected</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#111111] border border-gray-800 rounded-xl px-4 py-3"
          >
            <option>Newest</option>
            <option>Company A-Z</option>
            <option>Company Z-A</option>
            <option>Salary</option>
            <option>Status</option>
          </select>
        </div>

        {/* Table */}
        <JobTable jobs={currentJobs} deleteJob={deleteJob} />

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
            className="px-4 py-2 rounded-lg border border-gray-700 disabled:opacity-40 hover:bg-[#111111]"
          >
            Previous
          </button>

          <span className="text-gray-400">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
            className="px-4 py-2 rounded-lg border border-gray-700 disabled:opacity-40 hover:bg-[#111111]"
          >
            Next
          </button>
        </div>

        {/* Kanban */}
        <div className="mt-8 flex justify-end">
          <div className="flex gap-3"></div>
        </div>
      </div>
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Job?"
        message="This action cannot be undone."
        confirmText="Delete"
        confirmColor="bg-red-600 hover:bg-red-500"
        onConfirm={confirmDeleteJob}
        onCancel={cancelDelete}
      />
    </div>
  );
}

export default Jobs;

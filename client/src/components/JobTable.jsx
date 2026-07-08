import { useNavigate } from "react-router-dom";
import { getCountdown, formatDate, formatTime } from "../utils/time";

function JobTable({ jobs, deleteJob }) {
  const navigate = useNavigate();

  const statusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "applied":
        return "bg-blue-500/15 text-blue-400 border border-blue-500/30";

      case "interview":
        return "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30";

      case "offer":
        return "bg-green-500/15 text-green-400 border border-green-500/30";

      case "rejected":
        return "bg-red-500/15 text-red-400 border border-red-500/30";

      default:
        return "bg-zinc-700 text-gray-300";
    }
  };

  return (
    <div className="overflow-x-auto no-scrollbar rounded-2xl border border-zinc-800 bg-[#0d0d0d]">
      <table className="w-full text-sm">
        <thead className="bg-[#151515] border-b border-zinc-800">
          <tr className="text-gray-400 uppercase text-xs tracking-wider">
            <th className="px-6 py-4 text-left">Company</th>
            <th className="px-6 py-4 text-left">Position</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Salary</th>
            <th className="px-6 py-4 text-left">Interview</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-12 text-gray-500">
                No jobs found.
              </td>
            </tr>
          ) : (
            jobs.map((job) => (
              <tr
                key={job.id}
                className="border-b border-zinc-800 hover:bg-[#171717] transition"
              >
                <td className="px-6 py-5 font-medium text-white">
                  {job.company}
                </td>

                <td className="px-6 py-5 text-gray-300">{job.position}</td>

                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                      job.status,
                    )}`}
                  >
                    {job.status}
                  </span>
                </td>

                <td className="px-6 py-5 text-gray-300">{job.salary || "-"}</td>
                <td className="px-6 py-5">
                  {job.interview_datetime ? (
                    <div>
                      <p className="text-cyan-400 text-xs">
                        📅 {formatDate(job.interview_datetime)} •{" "}
                        {formatTime(job.interview_datetime)}
                      </p>
                      <p className="text-yellow-400 text-xs mt-1">
                        ⏳ {getCountdown(job.interview_datetime)}
                      </p>
                    </div>
                  ) : (
                    <span className="text-gray-600 text-xs">Not scheduled</span>
                  )}
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => navigate(`/edit-job/${job.id}`)}
                      className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition text-white text-sm"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteJob(job.id)}
                      className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 transition text-white text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default JobTable;

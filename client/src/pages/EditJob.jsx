import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company: "",
    position: "",
    status: "Applied",
    salary: "",
    notes: "",
    interview_date: "",
    interview_time: "",
  });

  const inputClass =
    "w-full bg-black text-white border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition";

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const res = await api.get("/jobs");
      const job = res.data.find((j) => String(j.id) === String(id));

      if (!job) {
        toast.error("Job not found.");
        navigate("/jobs");
        return;
      }

      const pad = (n) => String(n).padStart(2, "0");
      const dt = job.interview_datetime
        ? new Date(job.interview_datetime)
        : null;

      setForm({
        company: job.company || "",
        position: job.position || "",
        status: job.status || "Applied",
        salary: job.salary || "",
        notes: job.notes || "",
        interview_date: dt
          ? `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}`
          : "",
        interview_time: dt
          ? `${pad(dt.getHours())}:${pad(dt.getMinutes())}`
          : "",
      });
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error("Failed to load job.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let interview_datetime = null;

      if (form.interview_date && form.interview_time) {
        const [year, month, day] = form.interview_date.split("-").map(Number);
        const [hours, minutes] = form.interview_time.split(":").map(Number);
        const localDateTime = new Date(
          year,
          month - 1,
          day,
          hours,
          minutes,
          0,
          0,
        );
        interview_datetime = localDateTime.toISOString();
      }

      await api.put(`/jobs/${id}`, {
        company: form.company,
        position: form.position,
        status: form.status,
        salary: form.salary || null,
        notes: form.notes || null,
        interview_datetime,
      });

      toast.success("Job updated successfully!");
      navigate("/jobs");
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error(err.response?.data?.message || "Failed to update job.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white px-4">
      <div className="w-full max-w-2xl bg-[#0b0b0b] border border-gray-800 rounded-2xl p-8 shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Edit Job</h1>
          <Link to="/jobs">
            <button className="px-4 py-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition">
              Back
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <input
            type="text"
            name="position"
            placeholder="Position"
            value={form.position}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>

          <input
            type="text"
            name="salary"
            placeholder="Salary"
            value={form.salary}
            onChange={handleChange}
            className={inputClass}
          />

          <div>
            <label className="block text-sm text-gray-400 mb-2">Date</label>
            <input
              type="date"
              name="interview_date"
              value={form.interview_date}
              onChange={handleChange}
              onFocus={(e) => e.target.showPicker?.()}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Time</label>
            <input
              type="time"
              name="interview_time"
              value={form.interview_time}
              onChange={handleChange}
              onFocus={(e) => e.target.showPicker?.()}
              className={inputClass}
            />
          </div>

          <textarea
            name="notes"
            placeholder="Notes"
            rows="4"
            value={form.notes}
            onChange={handleChange}
            className={inputClass}
          />

          <button
            type="submit"
            className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Update Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditJob;

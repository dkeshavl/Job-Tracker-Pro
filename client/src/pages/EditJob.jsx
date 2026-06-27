import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api";

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
        alert("Job not found");
        navigate("/jobs");
        return;
      }

      setForm({
        company: job.company || "",
        position: job.position || "",
        status: job.status || "Applied",
        salary: job.salary || "",
        notes: job.notes || "",

        // Convert MySQL date -> yyyy-mm-dd
        interview_date: job.interview_date
          ? new Date(job.interview_date).toISOString().split("T")[0]
          : "",

        // Convert HH:mm:ss -> HH:mm
        interview_time: job.interview_time
          ? job.interview_time.substring(0, 5)
          : "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load job");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(`/jobs/${id}`, {
        ...form,
        interview_date: form.interview_date || null,
        interview_time: form.interview_time || null,
      });

      alert("Job updated successfully");
      navigate("/jobs");
    } catch (err) {
      console.error(err);
      alert("Update Failed");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white px-4">
      <div className="w-full max-w-2xl bg-[#0b0b0b] border border-gray-800 rounded-2xl p-8 shadow-xl">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">
            Edit Job
          </h1>

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
            <label className="block text-sm text-gray-400 mb-2">
              Interview Date
            </label>

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
            <label className="block text-sm text-gray-400 mb-2">
              Interview Time
            </label>

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
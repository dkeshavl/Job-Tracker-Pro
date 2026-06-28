import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";

function AddJob() {
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
      // remove empty values (clean backend input)
      const payload = {
        ...form,
        interview_date: form.interview_date || null,
        interview_time: form.interview_time || null,
      };

      await api.post("/jobs", payload);

      toast.success("Job added successfully!");

      navigate("/jobs");
    } catch (err) {
      console.error(err.response?.data || err);

      toast.error(err.response?.data?.message || "Failed to add job.");
    }
  };

  const inputClass =
    "w-full bg-black text-white placeholder-gray-500 border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition";

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-[#0b0b0b] border border-gray-800 rounded-2xl p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Add Job</h1>

          <Link to="/jobs">
            <button className="bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-lg transition">
              Back
            </button>
          </Link>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            className={inputClass}
            required
          />

          <input
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
            <option>Applied</option>
            <option>Interview</option>
            <option>Rejected</option>
            <option>Offer</option>
          </select>

          <input
            name="salary"
            placeholder="Salary"
            value={form.salary}
            onChange={handleChange}
            className={inputClass}
          />

          {/* INTERVIEW DATE */}
          <input
            type="date"
            name="interview_date"
            value={form.interview_date}
            onChange={handleChange}
            onFocus={(e) => {
              if (e.target.showPicker) {
                e.target.showPicker();
              }
            }}
            className={inputClass}
          />

          {/* INTERVIEW TIME */}
          <input
            type="time"
            name="interview_time"
            value={form.interview_time}
            onChange={handleChange}
            onFocus={(e) => {
              if (e.target.showPicker) {
                e.target.showPicker();
              }
            }}
            className={inputClass}
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
            className={inputClass}
            rows="4"
          />

          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            Add Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddJob;

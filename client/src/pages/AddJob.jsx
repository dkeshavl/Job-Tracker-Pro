import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";

function AddJob() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    // Prevent double-submit: if a request is already in flight (e.g. the
    // user clicked twice while Render's free tier was slow to respond),
    // ignore the second click instead of firing a duplicate POST.
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // ✅ Convert user's local date/time to UTC ISO string
      let interview_datetime = null;

      if (form.interview_date && form.interview_time) {
        // Parse the date and time inputs (they're in user's local timezone)
        const [year, month, day] = form.interview_date.split("-").map(Number);
        const [hours, minutes] = form.interview_time.split(":").map(Number);

        // Create a Date object in user's local timezone
        const localDateTime = new Date(
          year,
          month - 1,
          day,
          hours,
          minutes,
          0,
          0,
        );

        // Convert to UTC ISO 8601 string
        interview_datetime = localDateTime.toISOString();

        console.log("User entered (local timezone):", localDateTime);
        console.log("Sending to backend (UTC ISO):", interview_datetime);
      }

      // Build payload with UTC datetime
      const payload = {
        company: form.company,
        position: form.position,
        status: form.status,
        salary: form.salary || null,
        notes: form.notes || null,
        interview_datetime, // ✅ Single UTC ISO string field
      };

      await api.post("/jobs", payload);

      toast.success("Job added successfully!");
      navigate("/jobs");
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error(err.response?.data?.message || "Failed to add job.");
      setIsSubmitting(false);
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
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          <input
            name="salary"
            placeholder="Salary"
            value={form.salary}
            onChange={handleChange}
            className={inputClass}
          />

          {form.status === "Interview" && (
            <div className="space-y-4 rounded-xl border border-gray-800 bg-[#111] p-5">
              <div>
                <h3 className="font-medium text-white">Interview Schedule</h3>

                <p className="mt-1 text-sm text-gray-500">
                  Set the interview date and time to receive automatic email
                  reminders.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-400">
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
                  <label className="block mb-2 text-sm font-medium text-gray-400">
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
              </div>

              <div className="rounded-lg border border-gray-800 bg-black px-4 py-3">
                <p className="text-sm text-gray-400">
                  📧 Automatic reminders will be sent:
                </p>

                <ul className="mt-2 space-y-1 text-sm text-gray-500">
                  <li>• 24 hours before</li>
                  <li>• 1 hour before</li>
                  <li>• 10 minutes before</li>
                </ul>
              </div>
            </div>
          )}

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
            disabled={isSubmitting}
            className="w-full bg-white text-black py-2 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Adding..." : "Add Job"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddJob;
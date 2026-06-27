import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import api from "../api";
import { formatDate } from "../utils/time";
import LiveCountdown from "../components/LiveCountdown";

function Kanban() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const columns = {
    Applied: jobs.filter((job) => job.status === "Applied"),
    Interview: jobs.filter((job) => job.status === "Interview"),
    Offer: jobs.filter((job) => job.status === "Offer"),
    Rejected: jobs.filter((job) => job.status === "Rejected"),
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;

    const newStatus = destination.droppableId;

    setJobs((prev) =>
      prev.map((job) =>
        job.id === draggableId
          ? { ...job, status: newStatus }
          : job
      )
    );

    try {
      await api.put(`/jobs/${draggableId}/status`, {
        status: newStatus,
      });
    } catch (err) {
      console.log(err);
      fetchJobs();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Kanban Board</h1>

        <Link to="/jobs">
          <button className="px-4 py-2 border border-gray-700 rounded-lg hover:bg-[#1b1b1b]">
            Table View
          </button>
        </Link>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(columns).map(([columnName, columnJobs]) => (
            <Droppable key={columnName} droppableId={columnName}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`rounded-xl p-4 min-h-[600px] transition ${
                    snapshot.isDraggingOver
                      ? "bg-[#1d1d1d] border border-blue-500"
                      : "bg-[#111111] border border-gray-800"
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">
                      {columnName}
                    </h2>

                    <span className="bg-[#222] px-2 py-1 rounded-full text-xs">
                      {columnJobs.length}
                    </span>
                  </div>

                  {columnJobs.map((job, index) => (
                    <Draggable
                      key={job.id}
                      draggableId={job.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={provided.draggableProps.style}
                          className={`rounded-lg p-4 mb-4 border transition ${
                            snapshot.isDragging
                              ? "bg-[#2a2a2a] border-blue-500"
                              : "bg-[#1a1a1a] border-gray-800"
                          }`}
                        >
                          <h3 className="font-semibold text-white">
                            {job.company}
                          </h3>

                          <p className="text-gray-400 mt-1">
                            {job.position}
                          </p>

                          {job.salary && (
                            <p className="text-green-400 mt-2 font-medium">
                              {job.salary}
                            </p>
                          )}

                          {job.interview_date && (
                            <>
                              <p className="text-cyan-400 text-sm mt-3">
                                📅 {formatDate(job.interview_date)}
                                {job.interview_time &&
                                  ` • ${job.interview_time}`}
                              </p>

                              <p className="text-yellow-400 text-xs mt-1 font-semibold">
                                ⏳{" "}
                                <LiveCountdown
                                  date={job.interview_date}
                                  time={job.interview_time}
                                />
                              </p>
                            </>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Kanban;
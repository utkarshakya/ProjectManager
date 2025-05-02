import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  CalendarIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import axios from "../api/axios.js";
import TaskModal from "./TaskModel.jsx"; // We'll create this next

const Task = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [projectTitle, setProjectTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Fetch project and tasks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/tasks/${projectId}`);
        if (data.tasks.length !== 0) {
          setProjectTitle(data.tasks[0].projectId.title);
        }
        setTasks(data.tasks);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [projectId]);

  // Task operations
  const handleDelete = async (taskId) => {
    if (window.confirm("Delete this task permanently?")) {
      try {
        await axios.delete(`/tasks/${projectId}/${taskId}`);
        setTasks((prev) => prev.filter((task) => task._id !== taskId));
      } catch (err) {
        setError(err.response?.data?.message || "Delete failed");
      }
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const { data } = await axios.put(`/tasks/${projectId}/${taskId}`, {
        status: newStatus,
      });
      console.log(data.updatedTask);
      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? data.updatedTask : task))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 p-8 text-center text-gray-300">
        Loading tasks...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-900 p-8 text-center text-red-400">
        Error: {error}
      </div>
    );

  return (
    <main className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white flex items-center gap-2"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Projects
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            New Task
          </button>
        </div>

        <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
          {projectTitle}
          <span className="text-gray-400 text-lg">({tasks.length} tasks)</span>
        </h1>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-gray-800 rounded-lg p-6 shadow-lg hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-white">
                        {task.title}
                        {task.status === "Done" && (
                          <CheckCircleIcon className="w-5 h-5 text-green-400 ml-2 inline" />
                        )}
                      </h2>
                      {task.description && (
                        <p className="text-gray-400 mt-2">{task.description}</p>
                      )}
                    </div>
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(task._id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-md text-sm ${
                        task.status === "Done"
                          ? "bg-green-900 text-green-300"
                          : task.status === "In Progress"
                          ? "bg-blue-900 text-blue-300"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      <option value="Todo">Todo</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Done">Done</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>
                        Created: {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {task.completedAt && (
                      <div className="flex items-center gap-1">
                        <CheckCircleIcon className="w-4 h-4" />
                        <span>
                          Completed:{" "}
                          {new Date(task.completedAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3 ml-4">
                  <button
                    onClick={() => setEditingTask(task)}
                    className="text-gray-400 hover:text-indigo-400"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-gray-400 hover:text-red-400"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {tasks.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="mb-4">No tasks found in this project</p>
              <button
                onClick={() => setShowModal(true)}
                className="text-indigo-400 hover:underline"
              >
                Create your first task
              </button>
            </div>
          )}
        </div>

        {/* Task Modal */}
        {showModal || editingTask ? (
          <TaskModal
            projectId={projectId}
            task={editingTask}
            onClose={() => {
              setShowModal(false);
              setEditingTask(null);
            }}
            onSuccess={(newTask) => {
              setTasks((prev) =>
                editingTask
                  ? prev.map((t) => (t._id === newTask._id ? newTask : t))
                  : [...prev, newTask]
              );
            }}
          />
        ) : null}
      </div>
    </main>
  );
};

export default Task;

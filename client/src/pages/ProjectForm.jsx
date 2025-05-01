import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "../api/axios.js";
import { XMarkIcon } from "@heroicons/react/24/outline";

const ProjectForm = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create new project
      await axios.post("/projects", { title });
      navigate("/dashboard"); // Refresh the dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">
            Add Project
          </h2>
          <button onClick={() => {navigate("/dashboard")}} className="text-gray-400 hover:text-white">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project title"
            className="w-full p-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-indigo-500"
            required
            autoFocus
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Save Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;

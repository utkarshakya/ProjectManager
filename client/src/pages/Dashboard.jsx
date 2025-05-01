import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FolderIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Header, Footer } from "../components";
import axios from "../api/axios.js";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleDelete = async (projectId) => {
    if (
      !window.confirm("Project and all its tasks will get deleted permanently?")
    )
      return;

    try {
      await axios.delete(`/projects/${projectId}`);
      setProjects((prev) => prev.filter((p) => p._id !== projectId));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get("/projects");

        setProjects(data.projects);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-gray-900 p-8 text-center text-gray-300">
        Loading projects...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gray-900 p-8 text-center text-red-400">
        Error: {error}
      </div>
    );

  return (
    <>
      <Header></Header>
      <main className="max-w-7xl mx-auto min-h-screen bg-gray-200 dark:bg-gray-800/50 p-8">
        <div className="max-w-4xl mx-auto mt-10">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-white">Your Projects</h1>
            <Link
              to="/project/create"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2"
            >
              <PlusIcon className="w-5 h-5" />
              New Project
            </Link>
          </div>

          <div className="space-y-4">
            {projects.length !== 0 &&
              projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-gray-800 rounded-lg p-6 shadow-lg hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <FolderIcon className="w-8 h-8 text-indigo-400" />
                      <div>
                        <h2 className="text-xl font-semibold text-white">
                          {project.title}
                        </h2>
                        {/* <p className="text-gray-400">
                          {project.tasks?.length || 0} tasks
                        </p> */}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      {/* <button className="text-gray-400 hover:text-indigo-400">
                        Edit
                      </button> */}
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="text-gray-400 hover:text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}

            {projects.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <p className="mb-4">No projects found</p>
                <Link
                  to="/projects/new"
                  className="text-indigo-400 hover:underline"
                >
                  Create your first project
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
};

export default Dashboard;

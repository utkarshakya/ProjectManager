import Project from "../models/ProjectModel.js";
import Task from "../models/TaskModel.js";

export const createProject = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.userId;
    const existingProjects = await Project.countDocuments({ userId });
    if (existingProjects >= 4) {
      return res
        .status(402)
        .json({ message: "Cannot Create More Than 4 Projects" });
    }
    const project = await Project.create({ title, userId });
    res.status(201).json({ project, message: "Project Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProject = async (req, res) => {
  try {
    const userId = req.userId;
    const projects = await Project.find({ userId });
    res.status(200).json({ projects, message: "Project Found Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { title } = req.body;
    const projectId = req.params.projectId;
    const userId = req.userId;

    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      return res.status(404).json({ message: "Project Not Found" });
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { title },
      { new: true }
    );

    res
      .status(201)
      .json({ updatedProject, message: "Project Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const userId = req.userId;

    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      return res.status(404).json({ message: "Project Not Found" });
    }

    const deletedTasks = await Task.deleteMany({ projectId });

    const deletedProject = await Project.findByIdAndDelete(projectId);

    res
      .status(201)
      .json({
        deletedTasks,
        deletedProject,
        message: "Project & All Its Tasks Deleted Successfully",
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

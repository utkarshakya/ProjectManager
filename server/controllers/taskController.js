import Project from "../models/ProjectModel.js";
import Task from "../models/TaskModel.js";

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const projectId = req.params.projectId;
  const userId = req.userId;
  try {
    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      return res.status(404).json({ message: "Project Not Found" });
    }

    const task = await new Task.create({ title, description, projectId });
    res.status(201).json({ task, message: "Task created successfully" });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  const projectId = req.params.projectId;
  const userId = req.userId;
  try {
    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      return res.status(404).json({ message: "Project Not Found" });
    }

    const tasks = Task.find({ projectId });
    res.status(400).json({ tasks });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { title, description, status } = req.body;
  const { projectId, taskId } = req.params;
  const userId = req.userId;
  try {
    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      return res.status(404).json({ message: "Project Not Found" });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, status },
      { new: true } // Return the updated result
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(201).json({ updatedTask, message: "Task updated successfully" });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const { projectId, taskId } = req.params;
  const userId = req.userId;
  try {
    const project = Project.findOne({ _id: projectId, userId });
    if (!project) {
      return res.status(404).json({ message: "Project Not Found" });
    }

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(201).json({ deletedTask, message: "Task deleted successfully" });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

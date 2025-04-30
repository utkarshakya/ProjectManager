import Project from "../models/ProjectModel.js";
import Task from "../models/TaskModel.js";

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const { projectId } = req.params;
    const userId = req.userId;

    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      return res.status(404).json({ message: "Project Not Found" });
    }

    const task = await Task.create({ title, description, projectId });

    res.status(201).json({ task, message: "Task created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const userId = req.userId;

    const project = await Project.findOne({ _id: projectId, userId });
    if (!project) {
      return res.status(404).json({ message: "Project Not Found" });
    }

    const tasks = await Task.find({ projectId });

    res.status(400).json({ tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const { projectId, taskId } = req.params;
    const userId = req.userId;
    let completedAt = undefined;

    const task = await Task.findOne({ _id: taskId, projectId }).populate(
      "projectId",
      "userId"
    );
    if (!task || task.projectId.userId.toString() !== userId) {
      return res.status(404).json({ message: "Task Not Found" });
    }

    if (status === "Done") {
      completedAt = Date.now();
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, status, completedAt },
      { new: true } // Return the updated result
    );

    res.status(201).json({ updatedTask, message: "Task updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { projectId, taskId } = req.params;
    const userId = req.userId;

    const task = await Task.findOne({ _id: taskId, projectId }).populate(
      "projectId",
      "userId"
    );
    if (!task || task.projectId.userId.toString() !== userId) {
      return res.status(404).json({ message: "Task Not Found" });
    }

    const deletedTask = await Task.findByIdAndDelete(taskId);

    res.status(201).json({ deletedTask, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

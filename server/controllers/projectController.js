import Project from "../models/ProjectModel.js";

export const createProject = (req, res) => {
  const { title } = req.body;
  const userId = req.userId;

  try {
    const existingProjects = Project.countDocuments({ userId });
    if (existingProjects >= 4) {
      return res
        .status(400)
        .json({ message: "Cannot create more than 4 projects" });
    }

    const project = new Project.create({ title, userId });
    res.status(201).json({ project, message: "Project Created Successfully" });
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

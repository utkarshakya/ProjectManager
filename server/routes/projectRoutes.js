import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  createProject,
  deleteProject,
  getProject,
  updateProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/", verifyToken, getProject);
router.post("/", verifyToken, createProject);
router.put("/:projectId", verifyToken, updateProject);
router.delete("/:projectId", verifyToken, deleteProject);

export default router;

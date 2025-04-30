import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  createTask,
  deleteTask,
  getTask,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.get("/:projectId", verifyToken, getTask);
router.post("/:projectId", verifyToken, createTask);
router.put("/:projectId/:taskId", verifyToken, updateTask);
router.delete("/:projectId/:taskId", verifyToken, deleteTask);

export default router;

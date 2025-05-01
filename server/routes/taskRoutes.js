import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  createTask,
  deleteTask,
  getTask,
  updateTask,
} from "../controllers/taskController.js";
import {
  createTaskValidator,
  updateTaskValidator,
} from "../validators/taskValidator.js";
import { verifyValidationResult } from "../validators/verifyValidationResult.js";

const router = express.Router();

router.get("/:projectId", verifyToken, getTask);
router.post(
  "/:projectId",
  verifyToken,
  createTaskValidator,
  verifyValidationResult,
  createTask
);
router.put(
  "/:projectId/:taskId",
  verifyToken,
  updateTaskValidator,
  verifyValidationResult,
  updateTask
);
router.delete("/:projectId/:taskId", verifyToken, deleteTask);

export default router;

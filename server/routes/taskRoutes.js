import express from "express";
import { authenticateUser } from "../middlewares/authenticateUser.js";
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

router.get("/:projectId", authenticateUser, getTask);
router.post(
  "/:projectId",
  authenticateUser,
  createTaskValidator,
  verifyValidationResult,
  createTask
);
router.put(
  "/:projectId/:taskId",
  authenticateUser,
  updateTaskValidator,
  verifyValidationResult,
  updateTask
);
router.delete("/:projectId/:taskId", authenticateUser, deleteTask);

export default router;

import express from "express";
import { authenticateUser } from "../middlewares/authenticateUser.js";
import {
  createProject,
  deleteProject,
  getProject,
  updateProject,
} from "../controllers/projectController.js";
import { projectValidator } from "../validators/projectValidator.js";
import { verifyValidationResult } from "../validators/verifyValidationResult.js";

const router = express.Router();

router.get("/", authenticateUser, getProject);
router.post(
  "/",
  authenticateUser,
  projectValidator,
  verifyValidationResult,
  createProject
);
router.put(
  "/:projectId",
  authenticateUser,
  projectValidator,
  verifyValidationResult,
  updateProject
);
router.delete("/:projectId", authenticateUser, deleteProject);

export default router;

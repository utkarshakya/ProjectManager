import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import {
  createProject,
  deleteProject,
  getProject,
  updateProject,
} from "../controllers/projectController.js";
import { projectValidator } from "../validators/projectValidator.js";
import { verifyValidationResult } from "../validators/verifyValidationResult.js";

const router = express.Router();

router.get("/", verifyToken, getProject);
router.post(
  "/",
  verifyToken,
  projectValidator,
  verifyValidationResult,
  createProject
);
router.put(
  "/:projectId",
  verifyToken,
  projectValidator,
  verifyValidationResult,
  updateProject
);
router.delete("/:projectId", verifyToken, deleteProject);

export default router;

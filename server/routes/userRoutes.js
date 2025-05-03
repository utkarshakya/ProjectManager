import express from "express";
import {
  getProfile,
  login,
  register,
  updateProfile,
} from "../controllers/userController.js";
import {
  loginValidator,
  profileUpdateValidator,
  registrationValidator,
} from "../validators/userValidator.js";
import { verifyValidationResult } from "../validators/verifyValidationResult.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";

const router = express.Router();

router.post("/login", loginValidator, verifyValidationResult, login);
router.post(
  "/register",
  registrationValidator,
  verifyValidationResult,
  register
);
router.put(
  "/profile",
  authenticateUser,
  profileUpdateValidator,
  verifyValidationResult,
  updateProfile
);
router.get("/profile", authenticateUser, getProfile);

export default router;

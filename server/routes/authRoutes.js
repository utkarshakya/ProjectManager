import express from "express";
import { login, register } from "../controllers/authController.js";
import {
  loginValidator,
  registrationValidator,
} from "../validators/authValidator.js";
import { verifyValidationResult } from "../validators/verifyValidationResult.js";

const router = express.Router();

router.post("/login", loginValidator, verifyValidationResult, login);
router.post("/register", registrationValidator, verifyValidationResult, register);

export default router;

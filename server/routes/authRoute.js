import express from "express";
import { authoriseUser } from "../middlewares/auth.js";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", authoriseUser, login);
router.post("/register", register);

export default router;
import { body } from "express-validator";

export const projectValidator = [
  body("title")
    .trim()
    .notEmpty().withMessage("Project title is required")
    .isLength({ max: 100 }).withMessage("Title too long (max 100 chars)"),
];
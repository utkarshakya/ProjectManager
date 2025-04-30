import { body } from "express-validator";

export const registerValidation = [
  body(name).trim().notEmpty().withMessage("Name is required"),
  body(email)
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email")
    .normalizeEmail(),
  body(password).trim().isStrongPassword().withMessage("Use a Strong Password"),
  body(country).trim().notEmpty().withMessage("Country is required"),
];

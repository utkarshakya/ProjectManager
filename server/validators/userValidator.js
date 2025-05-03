import { body } from "express-validator";

export const registrationValidator = [
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Please enter you full name")
    .isLength({ max: 50 })
    .withMessage("Name Cannot Be More Than 50 Characters!"),
  body("email")
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email Cannot Be Empty!")
    .isEmail()
    .withMessage("Invalid Email!"),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password Cannot Be Less Than 8 Character In Length!")
    .isStrongPassword()
    .withMessage("Password Must Container"),
  body("country").trim().notEmpty().withMessage("Country is required"),
];

export const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid Email")
    .normalizeEmail(),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

export const profileUpdateValidator = [
  body("name")
    .optional()
    .trim()
    .escape()
    .isLength({ max: 100 })
    .withMessage("Name length must be less than 100 character."),
];

import { body } from "express-validator";

export const createTaskValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Task title is required")
    .isLength({ max: 100 })
    .withMessage("Title is too long"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Description cannot be more than 2000 words"),
  body("status")
    .optional()
    .isIn(["Todo", "In Progress", "Done"])
    .withMessage("Invalid status"),
];

export const updateTaskValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Task title is required")
    .isLength({ max: 100 })
    .withMessage("Title is too long"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage("Description cannot be more than 2000 words"),
  body("status")
    .optional()
    .isIn(["Todo", "In Progress", "Done"])
    .withMessage("Invalid status"),
  body("completedAt").optional().isISO8601().toDate(),
];

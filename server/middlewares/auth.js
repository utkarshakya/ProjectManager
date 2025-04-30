import jwt from "jsonwebtoken";
import { credentials } from "../config/env.js";

export const authoriseUser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const decode = jwt.verify(token, credentials.jwtSecret);
    req.userId = decode.userId;
    next();
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};

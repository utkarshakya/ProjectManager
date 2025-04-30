import jwt from "jsonwebtoken";
import { credentials } from "../config/env.js";

// Middleware to verify JWT token for protected routes
export const verifyToken = (req, res, next) => {
  try {
    // Extract token from the Authorization header
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
      // If no token is provided, deny access
      return res.status(401).json({ message: "Access Denied" });
    }

    // Verify the token and extract user information
    const decode = jwt.verify(token, credentials.jwtSecret);
    req.userId = decode.userId; // Attach userId to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle errors such as invalid or expired tokens
    res.status(500).json({ message: error.message });
  }
};

import jwt from "jsonwebtoken";
import { credentials } from "../config/env";

export function getJwtToken(payload) {
  const token = jwt.sign(payload, credentials.jwtSecret, { expiresIn: "10h" });
  return token;
}

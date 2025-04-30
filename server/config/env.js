import dotenv from "dotenv";
dotenv.config();

export const credentials = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
};

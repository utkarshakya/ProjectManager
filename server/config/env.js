import dotenv from "dotenv";
dotenv.config();

export const credentials = {
  devMode: process.env.DEVELOPMENT_MODE,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  mongodbUri: process.env.MONGODB_URI,
};

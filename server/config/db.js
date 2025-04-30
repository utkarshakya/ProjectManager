import mongoose from "mongoose";
import { credentials } from "./env.js";

export const connectMongoDb = async () => {
  try {
    await mongoose.connect(credentials.mongodbUri);
    console.log("Connected to MongoDB Atlas");
  } catch (err) {
    console.error("Connection failed", err);
    process.exit(1);
  }
};

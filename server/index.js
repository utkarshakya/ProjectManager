import express from "express";
import { credentials } from "./config/env.js";
import authRoute from "./routes/authRoute.js";
import { connectMongoDb } from "./config/db.js";

const app = express();

// Middlewares
app.use(express.json());

// API Routes
app.use("/api/auth", authRoute);



app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

(async () => {
  try {
    const PORT = credentials.port;
    await connectMongoDb();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Something went wrong", err);
    process.exit(1);
  }
})();

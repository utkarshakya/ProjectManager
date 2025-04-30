import express from "express";
import { credentials } from "./config/env.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { connectMongoDb } from "./config/db.js";

const app = express();

// Middlewares
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/task", taskRoutes);
// app.use("*", (req, res) => {
//   res.status(404).json({ message: "404 Not Found" });
// });

app.get("/", (req, res) => {
  res.send("Hello from projectManager backend!");
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

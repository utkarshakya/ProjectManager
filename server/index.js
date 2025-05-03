import express from "express";
import cors from "cors";
import { credentials } from "./config/env.js";
import { connectMongoDb } from "./config/db.js";
import { userRoutes, projectRoutes, taskRoutes } from "./routes/index.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
if (credentials.devMode) {
  app.use(cors());
}
app.use(express.json());

// API Routes
app.use("/api/user", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

if (!credentials.devMode) {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
} else {
  app.get("", (req, res) => {
    res.send("Hello from Project Manager backend!");
  });
}

(async () => {
  try {
    const PORT = credentials.port;
    await connectMongoDb();
    app.listen(PORT, () => {
      console.log(`Application is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Something went wrong", err);
    process.exit(1);
  }
})();

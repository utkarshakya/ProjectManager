import express from "express";
import { config } from "./config/env.js";
const app = express();
const PORT = config.port || 5000;

app.get('/', (req, res) => {
    res.send('Hello from backend!');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
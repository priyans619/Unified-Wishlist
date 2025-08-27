import express from "express";
import healthRoutes from "./routes/health";

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use("/health", healthRoutes);

export default app;


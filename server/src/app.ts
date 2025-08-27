import express from "express";
import healthRoutes from "./routes/health";
import morgan from "morgan";

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev")); 

// Routes
app.use("/health", healthRoutes);

export default app;

// app.ts
import express from "express";
import morgan from "morgan";
import healthRoutes from "./routes/health";
import previewRoutes from "./routes/preview";
import rateLimiter from "./middlewares/rateLimiter"; // ✅ import rate limiter

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/health", healthRoutes);
app.use("/preview", rateLimiter, previewRoutes);

export default app;

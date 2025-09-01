
import rateLimit from "express-rate-limit";

// Limit to 10 requests/minute per IP
const rateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP
  message: {
    error: "Too many requests. Please try again after a minute.",
  },
  standardHeaders: true, // Return rate limit info in RateLimit-* headers
  legacyHeaders: false, // Disable X-RateLimit-* headers
});

export default rateLimiter;


import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // for 1 minute
  max: 30,                 // each IP to 30 requests per window
  message: "Too many requests, please try again later.",
  standardHeaders: true,   // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, 
});

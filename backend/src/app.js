import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import cors from "cors";

import { ENV } from "./config/env.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/error.middleware.js";
import authRoute from "./routes/auth.route.js";
import adminRoute from "./routes/admin.route.js";
import notesRoute from "./routes/notes.route.js";
import commentRoutes from "./routes/comments.route.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin:
      ENV.NODE_ENV === "development"
        ? true // Allow all origins in development (for localhost on any port)
        : ENV.FRONTEND_URL || "http://localhost:3000", // Use env variable in production
    credentials: true, // allow sending cookies
  })
);

// Rate Limiter - More lenient for development
const apiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: ENV.NODE_ENV === "development" ? 200 : 100, // Higher limit in development
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: "Too many requests, please try again later.",
  },
  skip: (req) => {
    // Skip rate limiting for admin routes
    return req.path.startsWith("/api/v1/admin");
  },
});

// Apply rate limiter to all API routes (only once)
app.use("/api/v1/", apiLimiter);

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/notes", notesRoute);
app.use("/api/v1/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World from the backend of Create Your notes App!");
});

// Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

export default app;

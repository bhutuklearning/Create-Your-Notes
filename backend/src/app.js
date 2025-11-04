import express from 'express';
import helmet from 'helmet';
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import cors from 'cors';


import { errorHandler, notFoundHandler } from "./middlewares/error.middleware.js";
import authRoute from "./routes/auth.route.js";
import adminRoute from "./routes/admin.routes.js";
import notesRoute from "./routes/notes.route.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());


// Rate Limiter
const apiLimiter = rateLimit({
    windowMs: 3 * 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, error: "Too many requests, please try again later." },
});

app.use("/api/v1/", apiLimiter);

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/notes", notesRoute);


app.get('/', (req, res) => {
    res.send('Hello, World from the backend of Create Your notes App!');
});

// Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
import express from "express";
import { register, login, logout, refreshToken } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Home Route
router.get("/", (req, res) => {
    res.send("Welcome to the Auth Route of the URL shortener.");
});

// Register Route
router.post("/register", register);
// Login Route
router.post("/login", login);

// Refresh token route (public - no protect middleware)
router.post("/refresh-token", refreshToken);

// Logout Route
router.post("/logout", protect, logout);

// Profile Route (Protected)
router.get("/profile", protect, (req, res) => {
    res.status(200).json({ message: `Hello ${req.user.userName}, you have accessed a protected route!`, user: req.user });
});


export default router;
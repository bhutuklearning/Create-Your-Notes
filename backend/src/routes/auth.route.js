import { Router } from "express";
import { register, login, logout, refreshToken } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Auth route is working for Create Your Notes backend.");
});


router.post("/register", register);

router.post("/login", login);


router.get("/refresh", refreshToken);

router.post("/logout", protect, logout);


router.get("/profile", protect, (req, res) => {
    res.status(200).json({
        success: true,
        message: "User profile fetched successfully",
        user: req.user.toPublic(),   // ✅ clean safe object
    });
});

export default router;

import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import {
    getAllUsers,
    updateUserRole,
    getAllNotes,
    softDeleteNote,
    deleteComment,
    getAdminStats
} from "../controllers/admin.controller.js";

const router = Router();

router.use(protect, isAdmin);

// Dashboard stats
router.get("/stats", getAdminStats);

// Users
router.get("/users", getAllUsers);
router.patch("/users/role", updateUserRole);

// Notes
router.get("/notes", getAllNotes);
router.delete("/notes/:noteId", softDeleteNote);

// Comments
router.delete("/comments/:commentId", deleteComment);

export default router;

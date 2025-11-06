import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";
import { getAllUsers, updateUserRole, getAllNotes } from "../controllers/admin.controller.js";

const router = Router();

router.get("/users", protect, isAdmin, getAllUsers);
router.patch("/users/role", protect, isAdmin, updateUserRole);
router.get("/notes", protect, isAdmin, getAllNotes);



export default router;

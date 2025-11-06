import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { addComment, getComments, editComment, deleteComment } from "../controllers/comments.controller.js";

const router = Router();

router.post("/:noteId", protect, addComment);
router.get("/:noteId", getComments);
router.put("/edit/:commentId", protect, editComment);
router.delete("/:commentId", protect, deleteComment);

export default router;

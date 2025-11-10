import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
    createNote,
    getMyNotes,
    getNoteBySlug,
    updateNote,
    deleteNote,
    getPublicNotes,
    likeNote,
    unlikeNote,
    searchNotes
} from "../controllers/notes.controller.js";

const router = Router();

// Home route of the notes Routes
router.get("/", protect, (req, res) => {
    res.send("Welcome to the Notes routes of Create Your Notes API");
});
router.get("/search", protect, searchNotes);

router.post("/create-note", protect, createNote);
router.get("/my", protect, getMyNotes);
router.get("/public", getPublicNotes);
router.get("/:slug", protect, getNoteBySlug);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);
router.post("/:id/like", protect, likeNote);
router.post("/:id/unlike", protect, unlikeNote);

export default router;

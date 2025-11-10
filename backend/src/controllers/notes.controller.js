import Note from "../models/Notes.model.js";
import { catchAsync, ValidationError, NotFoundError, AuthError } from "../middlewares/error.middleware.js";

/**
 * Create a new note
 * POST /api/notes
 */
export const createNote = catchAsync(async (req, res) => {
    const { title, summary, contentJSON, visibility } = req.body;

    if (!title || !contentJSON) {
        throw new ValidationError("Title and content are required.");
    }

    const note = await Note.create({
        author: req.user._id,
        title,
        summary,
        contentJSON,
        visibility: visibility || "private",
    });

    res.status(201).json({
        success: true,
        message: "Note created successfully",
        note,
    });
});


/**
 * Get all notes of logged-in user (PRIVATE dashboard)
 * GET /api/notes/my
 */
export const getMyNotes = catchAsync(async (req, res) => {
    const notes = await Note.find({ author: req.user._id }).notDeleted().sort({ createdAt: -1 });

    res.json({
        success: true,
        count: notes.length,
        notes,
    });
});


/**
 * Get a single note by slug (PUBLIC or OWNER)
 * GET /api/notes/:slug
 */
export const getNoteBySlug = catchAsync(async (req, res) => {
    const note = await Note.findOne({ slug: req.params.slug }).notDeleted();

    if (!note) throw new NotFoundError("Note not found");

    // If note is private → only author can view
    if (note.visibility === "private" && note.author.toString() !== req.user._id.toString()) {
        throw new AuthError("You are not allowed to view this private note");
    }

    res.json({
        success: true,
        note,
    });
});


/**
 * Update a note (author only)
 * PATCH /api/notes/:id
 */
export const updateNote = catchAsync(async (req, res) => {
    const { title, summary, contentJSON, visibility } = req.body;

    const note = await Note.findOne({ _id: req.params.id, author: req.user._id }).notDeleted();
    if (!note) throw new NotFoundError("Note not found or you do not own this note");

    if (title) note.title = title;
    if (summary) note.summary = summary;
    if (contentJSON) note.contentJSON = contentJSON;
    if (visibility) note.visibility = visibility;

    await note.save();

    res.json({
        success: true,
        message: "Note updated successfully",
        note,
    });
});


/**
 * Soft delete a note (author only)
 * DELETE /api/notes/:id
 */
export const deleteNote = catchAsync(async (req, res) => {
    const note = await Note.findOne({ _id: req.params.id, author: req.user._id }).notDeleted();
    if (!note) throw new NotFoundError("Note not found or you do not own this note");

    note.deletedAt = new Date();
    await note.save();

    res.json({
        success: true,
        message: "Note deleted successfully",
    });
});


/**
 * Public feed (Explore page)
 * GET /api/notes/public
 */
export const getPublicNotes = catchAsync(async (req, res) => {
    const notes = await Note.find().publicOnly().sort({ publishedAt: -1 });

    res.json({
        success: true,
        count: notes.length,
        notes,
    });
});


/**
 * Like a note
 * POST /api/notes/:id/like
 */
export const likeNote = catchAsync(async (req, res) => {
    const note = await Note.findById(req.params.id).notDeleted();
    if (!note) throw new NotFoundError("Note not found");

    await note.likeBy(req.user._id);

    res.json({ success: true, message: "Note liked" });
});


/**
 * Unlike a note
 * POST /api/notes/:id/unlike
 */
export const unlikeNote = catchAsync(async (req, res) => {
    const note = await Note.findById(req.params.id).notDeleted();
    if (!note) throw new NotFoundError("Note not found");

    await note.unlikeBy(req.user._id);

    res.json({ success: true, message: "Note unliked" });
});



/**
 * Search Notes (Public only)
 * GET /api/notes/search?q=keyword
 */
export const searchNotes = catchAsync(async (req, res) => {
    const q = req.query.q;
    if (!q) throw new ValidationError("Search query is required");

    const notes = await Note.find({
        $text: { $search: q },
        visibility: "public",
        deletedAt: { $exists: false }
    }).sort({ publishedAt: -1 });

    res.json({
        success: true,
        count: notes.length,
        notes,
    });
});
import Note from "../models/Notes.model.js";
import {
  catchAsync,
  ValidationError,
  NotFoundError,
  AuthError,
} from "../middlewares/error.middleware.js";


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


export const getMyNotes = catchAsync(async (req, res) => {
  const notes = await Note.find({ author: req.user._id })
    .notDeleted()
    .populate("author", "name email")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    count: notes.length,
    notes,
  });
});


export const getNoteBySlug = catchAsync(async (req, res) => {
  const note = await Note.findOne({ slug: req.params.slug })
    .notDeleted()
    .populate("author", "name email");

  if (!note) throw new NotFoundError("Note not found");

  // If note is private → only author can view
  if (
    note.visibility === "private" &&
    note.author.toString() !== req.user._id.toString()
  ) {
    throw new AuthError("You are not allowed to view this private note");
  }

  res.json({
    success: true,
    note,
  });
});


export const updateNote = catchAsync(async (req, res) => {
  const { title, summary, contentJSON, visibility } = req.body;

  const note = await Note.findOne({
    _id: req.params.id,
    author: req.user._id,
  }).notDeleted();
  if (!note)
    throw new NotFoundError("Note not found or you do not own this note");

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
  const note = await Note.findOne({
    _id: req.params.id,
    author: req.user._id,
  }).notDeleted();
  if (!note)
    throw new NotFoundError("Note not found or you do not own this note");

  note.deletedAt = new Date();
  await note.save();

  res.json({
    success: true,
    message: "Note deleted successfully",
  });
});


export const getPublicNotes = catchAsync(async (req, res) => {
  const notes = await Note.find()
    .publicOnly()
    .populate("author", "name email")
    .sort({ publishedAt: -1 });

  res.json({
    success: true,
    count: notes.length,
    notes,
  });
});


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


export const searchNotes = catchAsync(async (req, res) => {
  const q = req.query.q;
  if (!q) throw new ValidationError("Search query is required");

  const notes = await Note.find({
    $text: { $search: q },
    visibility: "public",
    deletedAt: { $exists: false },
  })
    .populate("author", "name email")
    .sort({ publishedAt: -1 });

  res.json({
    success: true,
    count: notes.length,
    notes,
  });
});

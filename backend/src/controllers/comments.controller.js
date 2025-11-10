import Comment from "../models/Comments.model.js";
import Note from "../models/Notes.model.js";
import mongoose from "mongoose";
import { catchAsync, ValidationError, NotFoundError, AuthError } from "../middlewares/error.middleware.js";

/**
 * Add a comment to a note
 * POST /api/comments/:noteId
 */
export const addComment = catchAsync(async (req, res) => {
    const { body } = req.body;
    const { noteId } = req.params;

    if (!body || body.trim().length === 0) {
        throw new ValidationError("Comment body cannot be empty");
    }

    const note = await Note.findById(noteId).notDeleted();
    if (!note) throw new NotFoundError("Note not found");

    // If note is private → only author can comment
    if (note.visibility === "private" && note.author.toString() !== req.user._id.toString()) {
        throw new AuthError("You are not allowed to comment on this private note");
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        await Comment.create([{ note: noteId, author: req.user._id, body }], { session });
        await Note.updateOne({ _id: noteId }, { $inc: { commentsCount: 1 } }, { session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: "Comment added successfully"
        });
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        throw err;
    }
});


/**
 * Get comments for a note (paginated)
 * GET /api/comments/:noteId?page=1&limit=10
 */
export const getComments = catchAsync(async (req, res) => {
    const { noteId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const note = await Note.findById(noteId).notDeleted();
    if (!note) throw new NotFoundError("Note not found");

    const comments = await Comment.find({ note: noteId, deletedAt: { $exists: false } })
        .populate("author", "_id name email")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

    res.json({ success: true, comments });
});


/**
 * Edit a comment (author only)
 * PATCH /api/comments/edit/:commentId
 */
export const editComment = catchAsync(async (req, res) => {
    const { commentId } = req.params;
    const { body } = req.body;

    const comment = await Comment.findOne({ _id: commentId, author: req.user._id, deletedAt: { $exists: false } });
    if (!comment) throw new NotFoundError("Comment not found or you cannot edit this comment");

    comment.body = body;
    comment.editedAt = new Date();
    await comment.save();

    res.json({ success: true, message: "Comment updated", comment });
});


/**
 * Soft delete a comment (author only)
 * DELETE /api/comments/:commentId
 */
export const deleteComment = catchAsync(async (req, res) => {
    const { commentId } = req.params;

    const comment = await Comment.findOne({ _id: commentId, author: req.user._id, deletedAt: { $exists: false } });
    if (!comment) throw new NotFoundError("Comment not found or you cannot delete this comment");

    comment.deletedAt = new Date();
    await comment.save();

    // Decrease count on note
    await Note.updateOne({ _id: comment.note }, { $inc: { commentsCount: -1 } });

    res.json({ success: true, message: "Comment deleted successfully" });
});

import User from "../models/User.model.js";
import Note from "../models/Notes.model.js";
import Comment from "../models/Comments.model.js";
import { catchAsync, ValidationError, NotFoundError } from "../middlewares/error.middleware.js";

// USERS LIST (with filters + pagination + search)
export const getAllUsers = catchAsync(async (req, res) => {
    const { search = "" } = req.query;

    const users = await User.find({
        $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } }
        ]
    }).select("_id name email role createdAt");

    res.json({ success: true, count: users.length, users });
});

// UPDATE USER ROLE (with safety)
export const updateUserRole = catchAsync(async (req, res) => {
    const { userId, newRole } = req.body;

    if (!userId || !newRole) throw new ValidationError("userId and newRole are required");
    if (!["user", "admin"].includes(newRole)) throw new ValidationError("Invalid role value");

    // Prevent modifying yourself
    if (req.user._id.toString() === userId) {
        throw new ValidationError("You cannot change your own role");
    }

    const user = await User.findById(userId);
    if (!user) throw new NotFoundError("User not found");

    user.role = newRole;
    await user.save();

    res.json({ success: true, message: "Role updated successfully" });
});

// GET ALL NOTES (filter public/private)
export const getAllNotes = catchAsync(async (req, res) => {
    const { visibility } = req.query;

    const query = visibility ? { visibility } : {};
    const notes = await Note.find(query)
        .notDeleted()
        .populate("author", "name email")
        .sort({ createdAt: -1 });

    res.json({ success: true, count: notes.length, notes });
});

// DELETE NOTE (SOFT DELETE)
export const softDeleteNote = catchAsync(async (req, res) => {
    const { noteId } = req.params;
    const note = await Note.findById(noteId);
    if (!note) throw new NotFoundError("Note not found");

    note.deletedAt = new Date();
    await note.save();

    res.json({ success: true, message: "Note soft deleted successfully" });
});

// MODERATION: Remove inappropriate comment
export const deleteComment = catchAsync(async (req, res) => {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) throw new NotFoundError("Comment not found");

    comment.deletedAt = new Date();
    await comment.save();

    res.json({ success: true, message: "Comment deleted successfully" });
});

// DASHBOARD ANALYTICS
export const getAdminStats = catchAsync(async (req, res) => {
    const [userCount, noteCount, publicNotes, commentsCount] = await Promise.all([
        User.countDocuments(),
        Note.countDocuments(),
        Note.countDocuments({ visibility: "public" }),
        Comment.countDocuments()
    ]);

    res.json({
        success: true,
        stats: {
            totalUsers: userCount,
            totalNotes: noteCount,
            publicNotes,
            totalComments: commentsCount
        }
    });
});

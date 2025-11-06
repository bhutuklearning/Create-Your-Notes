import User from "../models/User.model.js";
import Note from "../models/Notes.model.js";
import { catchAsync, ValidationError, NotFoundError } from "../middlewares/error.middleware.js";

export const getAllUsers = catchAsync(async (req, res) => {
    const users = await User.find().select("_id name email role createdAt");
    res.json({ success: true, users });
});

export const updateUserRole = catchAsync(async (req, res) => {
    const { userId, newRole } = req.body;

    if (!userId || !newRole) {
        throw new ValidationError("userId and newRole are required");
    }

    if (!["user", "admin"].includes(newRole)) {
        throw new ValidationError("Invalid role value");
    }

    const user = await User.findById(userId);
    if (!user) throw new NotFoundError("User not found");

    user.role = newRole;
    await user.save();

    res.json({ success: true, message: "Role updated successfully" });
});

export const getAllNotes = catchAsync(async (req, res) => {
    const notes = await Note.find().notDeleted().sort({ createdAt: -1 });
    res.json({ success: true, notes });
});

import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        maxLength: [50, "Username should not exceed 50 characters."],
        minLength: [3, "Username should be at least 3 characters."],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password should be at least 6 characters long"],
    },
    refreshToken: {
        type: String,
        select: false, // Don't return this field by default in queries
    },
    lastLogin: {
        type: Date,
        default: null,
    }
}, { timestamps: true });

// Virtual field to fetch all URLs for a user
userSchema.virtual("urls", {
    ref: "Url",
    localField: "_id",
    foreignField: "user",
});

// Combined method to update refresh token and last login in one operation
userSchema.methods.updateAuthTokens = function (refreshToken) {
    this.refreshToken = refreshToken;
    this.lastLogin = new Date();
    return this.save({ validateBeforeSave: false });
};

// Method to clear refresh token
userSchema.methods.clearRefreshToken = function () {
    this.refreshToken = undefined;
    return this.save({ validateBeforeSave: false });
};

const User = mongoose.model("User", userSchema);
export default User;

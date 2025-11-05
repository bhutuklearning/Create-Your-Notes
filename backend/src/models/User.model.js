import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import isEmail from "validator/lib/isEmail.js";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 80,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate: [isEmail, "Invalid email address"],
        },
        passwordHash: {
            type: String,
            select: false,
        },
        refreshToken: {
            type: String,
            select: false,
            default: null,
        },

        authProvider: {
            type: String,
            enum: ["local", "google"],
            default: "local",
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        isEmailVerified: {
            type: Boolean,
            default: false,
        },

        lastLoginAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

// Methods
userSchema.methods.setPassword = async function (plainPassword) {
    this.passwordHash = await bcrypt.hash(plainPassword, 12);
};

userSchema.methods.validatePassword = async function (plainPassword) {
    return bcrypt.compare(plainPassword, this.passwordHash);
};

userSchema.methods.updateAuthTokens = async function (newRefreshToken) {
    this.refreshToken = newRefreshToken;
    this.lastLoginAt = new Date();
    await this.save();
};

userSchema.methods.clearRefreshToken = async function () {
    this.refreshToken = null;
    await this.save();
};

userSchema.methods.toPublic = function () {
    return {
        _id: this._id,
        name: this.name,
        email: this.email,
        role: this.role,
        authProvider: this.authProvider,
        createdAt: this.createdAt
    };
};

const User = mongoose.model("User", userSchema);
export default User;

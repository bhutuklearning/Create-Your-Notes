import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateTokens, setTokenCookies, clearTokenCookies } from "../utils/generateToken.js";
import { catchAsync, ValidationError, AuthError } from "../middlewares/error.middleware.js";

// REGISTER
export const register = catchAsync(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new ValidationError("Name, email and password are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ValidationError("Email already exists");
    }

    // Create new user instance
    const user = new User({ name, email });

    // Set password -> sets passwordHash
    await user.setPassword(password);

    await user.save();

    const { accessToken, refreshToken } = generateTokens(user._id, user.name);
    await user.updateAuthTokens(refreshToken);
    setTokenCookies(res, accessToken, refreshToken);

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: user.toPublic(),
    });
});

// LOGIN
export const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ValidationError("Email and password are required");
    }

    const user = await User.findOne({ email }).select("+passwordHash +refreshToken");
    if (!user) {
        throw new AuthError("Invalid email or password");
    }

    const isMatch = await user.validatePassword(password);
    if (!isMatch) {
        throw new AuthError("Invalid email or password");
    }

    const { accessToken, refreshToken } = generateTokens(user._id, user.name);
    await user.updateAuthTokens(refreshToken);
    setTokenCookies(res, accessToken, refreshToken);

    res.status(200).json({
        success: true,
        message: "Logged in successfully",
        user: user.toPublic(),
    });
});

// LOGOUT
export const logout = catchAsync(async (req, res) => {
    if (req.user) {
        await req.user.clearRefreshToken();
    }
    clearTokenCookies(res);

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});

// REFRESH TOKEN
export const refreshToken = catchAsync(async (req, res) => {
    const token = req.cookies.refreshToken;
    if (!token) throw new AuthError("No refresh token provided");

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id).select("+refreshToken");

    if (!user || user.refreshToken !== token) {
        clearTokenCookies(res);
        throw new AuthError("Invalid refresh token");
    }

    const { accessToken, refreshToken: newToken } = generateTokens(user._id, user.name);
    await user.updateAuthTokens(newToken);
    setTokenCookies(res, accessToken, newToken);

    res.status(200).json({ success: true, message: "Token refreshed successfully" });
});

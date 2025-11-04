import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

/**
 * Generate JWT tokens
 * @param {Object} res - Express response object
 * @param {String} userId - User ID
 * @param {String} [userName] - Optional username for payload
 * @returns {Object} Tokens object
 */
const generateTokens = (userId, userName = null) => {
    // Generate access token (short-lived)
    const accessToken = jwt.sign(
        { id: userId, userName },
        ENV.JWT_ACCESS_SECRET || ENV.JWT_SECRET,
        { expiresIn: ENV.JWT_ACCESS_EXPIRES_IN || "15m" }
    );

    // Generate refresh token (long-lived)
    const refreshToken = jwt.sign(
        { id: userId },
        ENV.JWT_REFRESH_SECRET || ENV.JWT_SECRET,
        { expiresIn: ENV.JWT_REFRESH_EXPIRES_IN || "7d" }
    );

    return { accessToken, refreshToken };
};

/**
 * Set JWT tokens as HTTP-only cookies
 * @param {Object} res - Express response object
 * @param {String} accessToken - Access token
 * @param {String} refreshToken - Refresh token
 */
const setTokenCookies = (res, accessToken, refreshToken) => {
    // For cross-site contexts (production), we need SameSite=None and Secure=true
    // For local development, we use SameSite=Lax and Secure=false
    const isProduction = ENV.NODE_ENV === "production" || ENV.NODE_ENV !== "development";
    const cookieOptions = {
        httpOnly: true,
        secure: isProduction, // Must be true for SameSite=None
        sameSite: isProduction ? "none" : "lax", // None for cross-site, Lax for same-site
    };

    // Set access token cookie (short-lived)
    res.cookie(
        ENV.ACCESS_TOKEN_COOKIE_NAME || "accessToken",
        accessToken,
        {
            ...cookieOptions,
            maxAge: parseDuration(ENV.JWT_ACCESS_EXPIRES_IN || "15m"),
        }
    );

    // Set refresh token cookie (long-lived)
    res.cookie(
        ENV.REFRESH_TOKEN_COOKIE_NAME || "refreshToken",
        refreshToken,
        {
            ...cookieOptions,
            maxAge: parseDuration(ENV.JWT_REFRESH_EXPIRES_IN || "7d"),
        }
    );
};

/**
 * Clear JWT tokens cookies
 * @param {Object} res - Express response object
 */
const clearTokenCookies = (res) => {
    const isProduction = ENV.NODE_ENV === "production" || ENV.NODE_ENV !== "development";
    const cookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        expires: new Date(0),
    };

    // Clear access token cookie
    res.cookie(ENV.ACCESS_TOKEN_COOKIE_NAME || "accessToken", "", cookieOptions);

    // Clear refresh token cookie
    res.cookie(ENV.REFRESH_TOKEN_COOKIE_NAME || "refreshToken", "", cookieOptions);
};

/**
 * Generate and set token (backward compatible with existing code)
 * @param {Object} res - Express response object
 * @param {String} userId - User ID
 * @returns {String} Token
 */
const generateToken = (res, userId) => {
    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(userId);

    // Set cookies
    setTokenCookies(res, accessToken, refreshToken);

    // Return access token for backward compatibility
    return accessToken;
};

/**
 * Parse duration string (e.g., "15m", "7d") to milliseconds
 * @param {String} duration - Duration string
 * @returns {Number} Duration in milliseconds
 */
function parseDuration(duration) {
    const match = duration.match(/^(\d+)([mhd])$/);
    if (!match) return 0;

    const value = parseInt(match[1]);
    const unit = match[2];

    switch (unit) {
        case 'm': return value * 60 * 1000;       // minutes
        case 'h': return value * 60 * 60 * 1000;  // hours
        case 'd': return value * 24 * 60 * 60 * 1000; // days
        default: return 0;
    }
}

export default generateToken;
export { generateTokens, setTokenCookies, clearTokenCookies, parseDuration };

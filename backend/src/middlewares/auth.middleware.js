import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { catchAsync, AuthError } from "../middlewares/error.middleware.js";
import { clearTokenCookies, setTokenCookies, generateTokens } from "../utils/generateToken.js";

export const protect = catchAsync(async (req, res, next) => {
    let token = null;

    // 1) Try to get access token from cookies first
    if (req.cookies && req.cookies.accessToken) {
        token = req.cookies.accessToken;
    }
    // 2) Fallback to Authorization header: "Bearer <token>"
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    // 3) Fallback to old jwt cookie for backward compatibility
    if (!token && req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        throw new AuthError("Not authorized, no token");
    }

    try {
        // Verify token with access token secret first
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET);

        // support different claim names: id, userId, sub
        const userId = decoded.id || decoded.userId || decoded.sub;
        if (!userId) {
            console.error("Auth middleware: no id in token payload", decoded);
            throw new AuthError("Not authorized, token invalid");
        }

        const user = await User.findById(userId).select("-password");
        if (!user) {
            throw new AuthError("Not authorized, user not found");
        }

        req.user = user;
        return next();
    } catch (error) {
        // If access token verification fails, try to refresh it if refresh token exists
        if ((error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') &&
            req.cookies && req.cookies.refreshToken) {

            try {
                // Verify refresh token
                const refreshToken = req.cookies.refreshToken;
                const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET);

                // Find user with matching refresh token
                const user = await User.findOne({
                    _id: decoded.id,
                }).select('+refreshToken');

                if (!user || user.refreshToken !== refreshToken) {
                    throw new AuthError("Invalid refresh token");
                }

                // Generate new tokens
                const { accessToken, refreshToken: newRefreshToken } = generateTokens(
                    user._id,
                    user.userName
                );

                // Update refresh token in database
                await user.setRefreshToken(newRefreshToken);

                // Set new cookies
                setTokenCookies(res, accessToken, newRefreshToken);

                // Attach user to request
                req.user = user;
                return next();
            } catch (refreshError) {
                // If refresh token is also invalid, clear cookies
                clearTokenCookies(res);
                console.error("Refresh token error:", refreshError);
            }
        }

        // If we get here, both tokens are invalid
        clearTokenCookies(res);
        throw new AuthError("Not authorized, token failed");
    }
});

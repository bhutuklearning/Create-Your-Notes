import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

function parseDuration(duration) {
    const match = duration.match(/^(\d+)([mhd])$/);
    if (!match) return 0;
    const value = Number(match[1]);
    const unit = match[2];
    if (unit === "m") return value * 60 * 1000;
    if (unit === "h") return value * 60 * 60 * 1000;
    return value * 24 * 60 * 60 * 1000;
}

const generateTokens = (userId, name = null) => {
    const accessToken = jwt.sign({ id: userId, name }, ENV.JWT_ACCESS_SECRET, {
        expiresIn: ENV.JWT_ACCESS_EXPIRES_IN || "15m",
    });

    const refreshToken = jwt.sign({ id: userId }, ENV.JWT_REFRESH_SECRET, {
        expiresIn: ENV.JWT_REFRESH_EXPIRES_IN || "7d",
    });

    return { accessToken, refreshToken };
};

const setTokenCookies = (res, accessToken, refreshToken) => {
    const isProd = ENV.NODE_ENV === "production";
    const cookie = {
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "none" : "lax",
    };

    res.cookie("accessToken", accessToken, { ...cookie, maxAge: parseDuration("15m") });
    res.cookie("refreshToken", refreshToken, { ...cookie, maxAge: parseDuration("7d") });
};

const clearTokenCookies = (res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
};

export { generateTokens, setTokenCookies, clearTokenCookies };

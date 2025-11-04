import dotenv from "dotenv";
dotenv.config();

export const ENV = {
    PORT: process.env.PORT || 22000,
    MONGO_URI: process.env.MONGO_URI,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES: process.env.JWT_EXPIRES || "7d",
    NODE_ENV: process.env.NODE_ENV || "development",
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET,
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
    ACCESS_TOKEN_COOKIE_NAME: process.env.ACCESS_TOKEN_COOKIE_NAME || "accessToken",
    REFRESH_TOKEN_COOKIE_NAME: process.env.REFRESH_TOKEN_COOKIE_NAME || "refreshToken",
    FRONTEND_URL: process.env.FRONTEND_URL,
    BACKEND_URL: process.env.BACKEND_URL,
}
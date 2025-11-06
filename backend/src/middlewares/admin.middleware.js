import { AuthError } from "./error.middleware.js";

export const isAdmin = (req, res, next) => {
    if (!req.user) {
        throw new AuthError("Authentication required");
    }

    if (req.user.role !== "admin") {
        throw new AuthError("Admin access required");
    }

    next();
};

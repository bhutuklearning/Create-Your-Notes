class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode || 500;
        this.isOperational = true;
    }
}

class ValidationError extends AppError {
    constructor(message) {
        super(message, 400);
    }
}

class NotFoundError extends AppError {
    constructor(message) {
        super(message, 404);
    }
}

class AuthError extends AppError {
    constructor(message) {
        super(message, 401);
    }
}

const errorHandler = (err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.isOperational ? err.message : "Internal Server Error";

    return res.status(status).json({
        success: false,
        error: message,
    });
};

const notFoundHandler = (req, res, next) => {
    next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`));
};

// Handle async route errors by wrapping them
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

export { errorHandler, notFoundHandler, catchAsync, AppError, ValidationError, NotFoundError, AuthError };

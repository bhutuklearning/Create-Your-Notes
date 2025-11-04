/**
 * Error Handler Middleware
 * Handles all errors in a centralized manner
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createStream } from 'rotating-file-stream';

// Get directory name for error logs
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Create error log stream with rotation
const errorLogStream = createStream('errors.log', {
    interval: '1d', // Rotate daily
    path: path.join(logsDir, 'production'),
    maxFiles: 30 // Keep 30 days of logs
});

// Custom error classes
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
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

class RateLimitError extends AppError {
    constructor(message) {
        super(message, 429);
    }
}

// Error logging function
const logError = (err, req) => {
    const errorLogEntry = `
[${new Date().toISOString()}] ERROR
Request ID: ${req.id || 'no-id'}
IP: ${req.ip || 'unknown'}
User: ${req.user?.userName || req.user?.id || 'anonymous'}
Method: ${req.method}
URL: ${req.originalUrl}
Status: ${err.statusCode || 500}
Message: ${err.message}
Stack: ${err.stack}
----------------------------------------
`.trim();

    errorLogStream.write(errorLogEntry + '\n\n');
};

// Error handler middleware
const errorHandler = (err, req, res, next) => {
    // Log all errors with full details
    logError(err, req);

    // Set locals for error templates
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Determine error status code and message
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Handle specific error types
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = err.message;
    } else if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID format';
    } else if (err.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value entered';
    } else if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token, please log in again';
    } else if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired, please log in again';
    }

    // Send error response
    res.status(statusCode).json({
        success: false,
        error: message,
        ...(req.app.get('env') === 'development' && {
            stack: err.stack,
            errorDetails: {
                name: err.name,
                code: err.code,
                statusCode: err.statusCode
            }
        })
    });
};

// 404 handler for undefined routes
const notFoundHandler = (req, res, next) => {
    const error = new NotFoundError(`Cannot ${req.method} ${req.originalUrl}`);
    next(error);
};

// Handle async route errors by wrapping them
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};

export { errorHandler, notFoundHandler, catchAsync, AppError, ValidationError, NotFoundError, AuthError, RateLimitError };

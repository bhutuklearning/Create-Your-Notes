# Create Your Notes - Backend

A robust Node.js backend API for the Create Your Notes application, providing secure authentication, note management, and social features like comments and likes.

## Overview

This backend service powers a full-stack note-taking application where users can create, manage, and share their notes. It provides a RESTful API with JWT-based authentication, role-based access control, and comprehensive CRUD operations for notes and comments.

## Features

- User authentication and authorization with JWT tokens
- Secure password hashing with bcrypt
- CRUD operations for notes (create, read, update, delete)
- Public and private note visibility
- Note search functionality
- Like and unlike notes
- Comment system for notes
- Admin dashboard for user and content management
- Rate limiting to prevent API abuse
- Security headers with Helmet
- CORS configuration for frontend integration
- Refresh token mechanism for enhanced security

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.x
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: Helmet, bcryptjs, express-rate-limit
- **Validation**: Validator.js
- **Utilities**: Slugify, Cookie Parser

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local instance or MongoDB Atlas)
- npm or pnpm package manager

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd create-your-notes/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   pnpm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```env
   PORT=22000
   MONGO_URI=your_mongodb_connection_string
   DB_NAME=your_database_name
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES=7d
   JWT_ACCESS_SECRET=your_access_token_secret
   JWT_ACCESS_EXPIRES_IN=15m
   JWT_REFRESH_SECRET=your_refresh_token_secret
   JWT_REFRESH_EXPIRES_IN=7d
   ACCESS_TOKEN_COOKIE_NAME=accessToken
   REFRESH_TOKEN_COOKIE_NAME=refreshToken
   FRONTEND_URL=http://localhost:14000
   BACKEND_URL=http://localhost:22000
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run backend
   ```
   This will start the server with nodemon for automatic restarts on file changes.

5. For production:
   ```bash
   npm start
   ```

The server will run on the port specified in your `.env` file (default: 22000).

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port number | No | 22000 |
| `MONGO_URI` | MongoDB connection string | Yes | - |
| `DB_NAME` | Database name | Yes | - |
| `JWT_SECRET` | Secret key for JWT signing | Yes | - |
| `JWT_EXPIRES` | JWT expiration time | No | 7d |
| `JWT_ACCESS_SECRET` | Access token secret | No | JWT_SECRET |
| `JWT_ACCESS_EXPIRES_IN` | Access token expiration | No | 15m |
| `JWT_REFRESH_SECRET` | Refresh token secret | No | JWT_SECRET |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiration | No | 7d |
| `ACCESS_TOKEN_COOKIE_NAME` | Access token cookie name | No | accessToken |
| `REFRESH_TOKEN_COOKIE_NAME` | Refresh token cookie name | No | refreshToken |
| `FRONTEND_URL` | Frontend application URL | Yes | - |
| `BACKEND_URL` | Backend API URL | Yes | - |
| `NODE_ENV` | Environment mode | No | development |

## API Endpoints

### Authentication (`/api/v1/auth`)
- `POST /register` - Register a new user
- `POST /login` - User login
- `POST /logout` - User logout (protected)
- `GET /refresh` - Refresh access token
- `GET /profile` - Get user profile (protected)

### Notes (`/api/v1/notes`)
- `POST /create-note` - Create a new note (protected)
- `GET /my` - Get user's notes (protected)
- `GET /public` - Get all public notes
- `GET /search` - Search notes (protected)
- `GET /:slug` - Get note by slug (protected)
- `PUT /:id` - Update a note (protected)
- `DELETE /:id` - Delete a note (protected)
- `POST /:id/like` - Like a note (protected)
- `POST /:id/unlike` - Unlike a note (protected)

### Comments (`/api/v1/comments`)
- CRUD operations for comments on notes

### Admin (`/api/v1/admin`)
- Admin-only endpoints for managing users and notes

For detailed API documentation, refer to the Postman collection included in this directory: `Create Your Notes.postman_collection.json`

## Project Structure

```
backend/
├── src/
│   ├── app.js                 # Express app configuration
│   ├── server.js              # Server entry point
│   ├── createAdmin.js         # Admin user creation utility
│   ├── config/
│   │   ├── db.js             # MongoDB connection
│   │   └── env.js            # Environment variables
│   ├── controllers/
│   │   ├── admin.controller.js
│   │   ├── auth.controller.js
│   │   ├── comments.controller.js
│   │   └── notes.controller.js
│   ├── middlewares/
│   │   ├── admin.middleware.js
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   ├── models/
│   │   ├── Comments.model.js
│   │   ├── Notes.model.js
│   │   └── User.model.js
│   ├── routes/
│   │   ├── admin.route.js
│   │   ├── auth.route.js
│   │   ├── comments.route.js
│   │   └── notes.route.js
│   └── utils/
│       └── generateToken.js
├── package.json
└── Readme.md
```

## Security Features

- Password hashing with bcrypt (12 rounds)
- JWT-based authentication with access and refresh tokens
- Rate limiting (60 requests per 3 minutes)
- Security headers via Helmet
- CORS configuration
- Input validation
- Protected routes with authentication middleware
- Role-based access control (user/admin)

## Rate Limiting

The API implements rate limiting to prevent abuse:
- **Limit**: 60 requests per 3 minutes per IP address
- **Excluded**: Admin routes (`/api/v1/admin/*`)

## Database Models

### User Model
- User authentication and profile information
- Role-based access (user/admin)
- Refresh token management
- Email verification support

### Notes Model
- Rich text content storage (Lexical editor JSON)
- Public/private visibility
- Unique slug generation per author
- Like tracking
- Comment count
- Full-text search support

### Comments Model
- Comments on notes
- User association
- Timestamps

## Development

The project uses ES6 modules and modern JavaScript features. The development server runs with nodemon for automatic restarts.


## Author

Amritanshu Goutam

# Create Your Notes - Backend

This is the backend for the Create Your Notes application. It is a Node.js application that provides a RESTful API for creating, reading, updating, and deleting notes.

## Project Description

Create Your Notes is a full-stack web application that allows users to create, manage, and share their notes. The backend is built with Node.js, Express, and MongoDB, and it provides a secure and scalable API for the frontend to consume.

## Features

- User authentication and authorization
- CRUD operations for notes
- CRUD operations for comments
- Admin dashboard for managing users and notes
- Secure API with JWT authentication
- Rate limiting to prevent abuse
- Helmet for security headers

## Folder Structure

```
backend/
├── .env.sample
├── Create Your Notes.postman_collection.json
├── package.json
└── src/
    ├── app.js
    ├── config/
    │   ├── db.js
    │   └── env.js
    ├── controllers/
    │   ├── admin.controller.js
    │   ├── auth.controller.js
    │   ├── comments.controller.js
    │   └── notes.controller.js
    ├── createAdmin.js
    ├── middlewares/
    │   ├── admin.middleware.js
    │   ├── auth.middleware.js
    │   └── error.middleware.js
    ├── models/
    │   ├── Comments.model.js
    │   ├── Notes.model.js
    │   └── User.model.js
    ├── routes/
    │   ├── admin.route.js
    │   ├── auth.route.js
    │   ├── comments.route.js
    │   └── notes.route.js
    ├── server.js
    └── utils/
        └── generateToken.js
```

## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/create-your-notes.git
   ```
2. Navigate to the backend directory:
   ```bash
   cd create-your-notes/backend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Create a `.env` file in the `backend` directory and add the following environment variables and you can take help from your `.env.sample` file.
Create the environment variables in the .env file. For example:
   ```
   PORT=5000
   MONGO_URI=<your_mongodb_uri>
   JWT_SECRET=<your_jwt_secret>
   ```
5. Start the server:
   In development phase with nodemon:
   ```bash
   npm run backend
   ```
   In production phase:
   ```bash
   npm run start
   ```

## API Documentation

The API endpoints are defined in the `src/routes` directory. The following are the available endpoints:

- `auth.route.js`: Handles user authentication, including registration, login, and logout.
- `notes.route.js`: Handles CRUD operations for notes, including creating, reading, updating, and deleting notes.
- `comments.route.js`: Handles CRUD operations for comments, including creating, reading, updating, and deleting comments.
- `admin.route.js`: Handles admin-related operations, such as managing users and notes.

For more detailed information about the API, you can use the included Postman collection: `Create Your Notes.postman_collection.json`.

## Environment Variables

- `PORT`: The port on which the server will run.
- `MONGO_URI`: The connection string for your MongoDB database.
- `JWT_SECRET`: A secret key for signing JSON Web Tokens.

<!-- ## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with a descriptive commit message.
4. Push your changes to your fork.
5. Create a pull request to the `main` branch of the original repository. -->

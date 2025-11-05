import app from './app.js';
import { ENV } from './config/env.js';
import connectDB from "./config/db.js";

const PORT = ENV.PORT || 9000;

connectDB().
    then(() => {
        app.listen(PORT, (req, res) => {
            console.log(`Server is running on port: ${PORT}.`);
        });
    })
    .catch((err) => {
        console.log("Database connection failed", err);
        process.exit(1); // Exit process with failure
    });
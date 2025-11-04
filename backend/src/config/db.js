import mongoose from "mongoose";
import { ENV } from "./env.js";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.MONGO_URI, {
            dbName: ENV.DB_NAME,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
import "dotenv/config";
import mongoose from "mongoose";
import User from "./models/User.model.js";

const uri = `${process.env.MONGO_URI}${process.env.DB_NAME}`;

async function createAdmin() {
    await mongoose.connect(uri);

    const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

    let admin = await User.findOne({ email: ADMIN_EMAIL }).select("+passwordHash");

    if (!admin) {
        console.log("No admin found. Creating new admin...");
        admin = new User({
            name: ADMIN_NAME,
            email: ADMIN_EMAIL,
            role: "admin",
        });

        await admin.setPassword(ADMIN_PASSWORD);
        await admin.save();

        console.log("Admin created successfully.");
        process.exit(0);
    }

    console.log("Admin exists. Resetting password...");
    await admin.setPassword(ADMIN_PASSWORD);
    admin.role = "admin";
    await admin.save();

    console.log("Admin password updated successfully.");
    process.exit(0);
}

createAdmin().catch((err) => {
    console.error(" Error:", err);
    process.exit(1);
});

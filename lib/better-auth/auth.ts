import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connectToDatabase } from "@/database/mongoose";
import { nextCookies } from "better-auth/next-js";

// Ensure database connection is triggered
const mongoose = await connectToDatabase();
const db = mongoose.connection.db;

if (!db) throw new Error("MongoDB connection not found");

/**
 * Better Auth instance configured for email/password authentication.
 * Handles user registration, sign-in, session management with MongoDB storage.
 */
export const auth = betterAuth({
    database: mongodbAdapter(db as any),
    secret: process.env.BETTER_AUTH_SECRET || "DPjT1chzKAehPUxD5L997SGQiEFZx6iY",
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    emailAndPassword: {
        enabled: true,
        disableSignUp: false,
        requireEmailVerification: false,
        minPasswordLength: 8,
        maxPasswordLength: 128,
        autoSignIn: true,
    },
    plugins: [nextCookies()],
});
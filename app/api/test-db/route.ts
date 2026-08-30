// app/api/test-db/route.ts
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/database/mongoose";

/**
 * API route handler to test MongoDB database connectivity.
 * @returns {Promise<NextResponse>} JSON response indicating connection success or error details
 */
export async function GET() {
    try {
        await connectToDatabase();
        return NextResponse.json({ message: "MongoDB is connected!" });
    } catch (error: any) {
        console.error("MongoDB Connection Error:", error);
        return NextResponse.json({ error: error.message || "Failed to connect to MongoDB" }, { status: 500 });
    }
}
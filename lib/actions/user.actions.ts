// lib/actions/user.actions.ts
"use server";

import { connectToDatabase } from "@/database/mongoose";

export async function getAllUsersForNewsEmail() {
    try {
        await connectToDatabase();
        // Stub returning empty array until user query is implemented
        return [];
    } catch (error) {
        console.error("Error fetching users for news email:", error);
        return [];
    }
}
// lib/actions/watchlist.actions.ts
"use server";

import { connectToDatabase } from "@/database/mongoose";

export async function getWatchlistSymbolsByEmail(email: string) {
    try {
        await connectToDatabase();
        // Stub returning empty array until watchlist model/query is ready
        return [];
    } catch (error) {
        console.error("Error fetching watchlist symbols:", error);
        return [];
    }
}
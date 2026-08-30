// lib/actions/watchlist.actions.ts
"use server";

import { connectToDatabase } from "@/database/mongoose";

/**
 * Retrieves stock symbols from a user's watchlist by their email address.
 * Currently returns an empty array as a placeholder until watchlist query is implemented.
 *
 * @param email - User's email address
 * @returns Promise resolving to an array of stock symbols in the user's watchlist
 */
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
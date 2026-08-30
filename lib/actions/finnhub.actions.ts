// lib/actions/finnhub.actions.ts
"use server";

export async function searchStocks(query?: string) {
    try {
        // Temporary stub return until you build the Finnhub API fetch
        return [];
    } catch (error) {
        console.error("Error searching stocks:", error);
        return [];
    }
}

export async function getNews(symbols?: string[]) {
    try {
        // Temporary stub return for Inngest daily news
        return [];
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
}
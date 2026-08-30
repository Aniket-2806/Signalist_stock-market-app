// lib/actions/finnhub.actions.ts
"use server";

/**
 * Searches for stocks using the Finnhub API based on a search query.
 * Currently returns an empty array as a placeholder until API integration is complete.
 *
 * @param query - Optional search query string for stock symbol or company name
 * @returns Promise resolving to an array of matching stock results
 */
export async function searchStocks(query?: string) {
    try {
        // Temporary stub return until you build the Finnhub API fetch
        return [];
    } catch (error) {
        console.error("Error searching stocks:", error);
        return [];
    }
}

/**
 * Fetches market news articles from Finnhub API, optionally filtered by stock symbols.
 * Currently returns an empty array as a placeholder until API integration is complete.
 *
 * @param symbols - Optional array of stock symbols to filter news by
 * @returns Promise resolving to an array of news articles
 */
export async function getNews(symbols?: string[]) {
    try {
        // Temporary stub return for Inngest daily news
        return [];
    } catch (error) {
        console.error("Error fetching news:", error);
        return [];
    }
}
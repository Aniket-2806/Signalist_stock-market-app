import { Inngest } from "inngest";

/**
 * Inngest client instance for the Signalist application.
 * Used to create and trigger background functions for email workflows and scheduled tasks.
 */
export const inngest = new Inngest({
    id: "signalist",
    isDev: process.env.NODE_ENV !== "production",
});
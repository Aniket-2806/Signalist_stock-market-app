import { Inngest } from "inngest";

/**
 * Inngest client instance configured for the Signalist application to handle background jobs and event-driven workflows.
 */
export const inngest = new Inngest({
    id: "signalist",
    isDev: process.env.NODE_ENV !== "production",
});
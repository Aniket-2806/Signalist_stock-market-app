import { Inngest } from "inngest";

export const inngest = new Inngest({
    id: "signalist",
    isDev: process.env.NODE_ENV !== "production",
});
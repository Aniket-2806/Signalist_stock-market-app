
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines and merges Tailwind CSS class names efficiently.
 * Uses clsx for conditional classes and tailwind-merge to resolve conflicts.
 *
 * @param inputs - Class values to be combined (strings, objects, arrays)
 * @returns Merged and deduplicated class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Gets the current date formatted in a readable US locale format.
 *
 * @returns Date string in format "MMM DD, YYYY" (e.g., "Jan 15, 2025")
 */
export function getFormattedTodayDate(): string {
  return new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
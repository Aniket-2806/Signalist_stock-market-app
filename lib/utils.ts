import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS class names using clsx and tailwind-merge for conflict resolution.
 * @param {...ClassValue[]} inputs - Class names, objects, or arrays to merge
 * @returns {string} Merged and deduplicated class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a Unix timestamp to a human-readable relative time string (e.g., "5 hours ago").
 * @param {number} timestamp - Unix timestamp in seconds
 * @returns {string} Formatted time ago string in minutes, hours, or days
 */
export const formatTimeAgo = (timestamp: number) => {
  const now = Date.now();
  const diffInMs = now - timestamp * 1000; // Convert to milliseconds
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInHours > 24) {
    const days = Math.floor(diffInHours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (diffInHours >= 1) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }
};

/**
 * Creates a promise that resolves after a specified delay in milliseconds.
 * @param {number} ms - Number of milliseconds to delay
 * @returns {Promise<void>} Promise that resolves after the delay
 */
export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Formats a market capitalization value into a readable string with appropriate suffix (T, B, M) or full dollar amount.
 * @param {number} marketCapUsd - Market cap value in USD
 * @returns {string} Formatted string like "$3.10T", "$900.00B", "$25.00M", or "N/A" for invalid values
 */
export function formatMarketCapValue(marketCapUsd: number): string {
  if (!Number.isFinite(marketCapUsd) || marketCapUsd <= 0) return 'N/A';

  if (marketCapUsd >= 1e12) return `$${(marketCapUsd / 1e12).toFixed(2)}T`; // Trillions
  if (marketCapUsd >= 1e9) return `$${(marketCapUsd / 1e9).toFixed(2)}B`; // Billions
  if (marketCapUsd >= 1e6) return `$${(marketCapUsd / 1e6).toFixed(2)}M`; // Millions
  return `$${marketCapUsd.toFixed(2)}`; // Below one million, show full USD amount
}

/**
 * Calculates a date range from today going back a specified number of days.
 * @param {number} days - Number of days to go back from today
 * @returns {{to: string, from: string}} Object with 'from' and 'to' dates in YYYY-MM-DD format
 */
export const getDateRange = (days: number) => {
  const toDate = new Date();
  const fromDate = new Date();
  fromDate.setDate(toDate.getDate() - days);
  return {
    to: toDate.toISOString().split('T')[0],
    from: fromDate.toISOString().split('T')[0],
  };
};

/**
 * Returns a date range object representing today's date (from and to are the same).
 * @returns {{to: string, from: string}} Object with both 'from' and 'to' set to today in YYYY-MM-DD format
 */
export const getTodayDateRange = () => {
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  return {
    to: todayString,
    from: todayString,
  };
};

/**
 * Calculates how many news items to fetch per symbol based on the number of symbols in a watchlist.
 * @param {number} symbolsCount - Number of symbols in the watchlist
 * @returns {{itemsPerSymbol: number, targetNewsCount: number}} Object with items per symbol and target total news count
 */
export const calculateNewsDistribution = (symbolsCount: number) => {
  let itemsPerSymbol: number;
  let targetNewsCount = 6;

  if (symbolsCount < 3) {
    itemsPerSymbol = 3; // Fewer symbols, more news each
  } else if (symbolsCount === 3) {
    itemsPerSymbol = 2; // Exactly 3 symbols, 2 news each = 6 total
  } else {
    itemsPerSymbol = 1; // Many symbols, 1 news each
    targetNewsCount = 6; // Don't exceed 6 total
  }

  return { itemsPerSymbol, targetNewsCount };
};

/**
 * Validates that a news article has all required fields (headline, summary, url, datetime).
 * @param {RawNewsArticle} article - The raw news article object to validate
 * @returns {boolean} True if all required fields are present and truthy
 */
export const validateArticle = (article: RawNewsArticle) =>
    article.headline && article.summary && article.url && article.datetime;

/**
 * Returns today's date as a string in YYYY-MM-DD format.
 * @returns {string} Today's date in YYYY-MM-DD format
 */
export const getTodayString = () => new Date().toISOString().split('T')[0];

/**
 * Formats a raw news article into a standardized MarketNewsArticle object with truncated summary and additional metadata.
 * @param {RawNewsArticle} article - The raw news article to format
 * @param {boolean} isCompanyNews - Whether this is company-specific news or general market news
 * @param {string} [symbol] - Stock symbol associated with the article (required for company news)
 * @param {number} [index=0] - Index for generating unique IDs
 * @returns {MarketNewsArticle} Formatted article object with id, headline, summary, source, url, datetime, image, category, and related symbol
 */
export const formatArticle = (
    article: RawNewsArticle,
    isCompanyNews: boolean,
    symbol?: string,
    index: number = 0
) => ({
  id: isCompanyNews ? Date.now() + Math.random() : article.id + index,
  headline: article.headline!.trim(),
  summary:
      article.summary!.trim().substring(0, isCompanyNews ? 200 : 150) + '...',
  source: article.source || (isCompanyNews ? 'Company News' : 'Market News'),
  url: article.url!,
  datetime: article.datetime!,
  image: article.image || '',
  category: isCompanyNews ? 'company' : article.category || 'general',
  related: isCompanyNews ? symbol! : article.related || '',
});

/**
 * Formats a percentage change value into a string with + or - sign and percentage symbol.
 * @param {number} [changePercent] - The percentage change value
 * @returns {string} Formatted string like "+2.50%" or "-1.25%", or empty string if undefined
 */
export const formatChangePercent = (changePercent?: number) => {
  if (!changePercent) return '';
  const sign = changePercent > 0 ? '+' : '';
  return `${sign}${changePercent.toFixed(2)}%`;
};

/**
 * Returns a Tailwind CSS color class based on whether the percentage change is positive, negative, or neutral.
 * @param {number} [changePercent] - The percentage change value
 * @returns {string} Tailwind class: 'text-green-500' for positive, 'text-red-500' for negative, or 'text-gray-400' for undefined
 */
export const getChangeColorClass = (changePercent?: number) => {
  if (!changePercent) return 'text-gray-400';
  return changePercent > 0 ? 'text-green-500' : 'text-red-500';
};

/**
 * Formats a price value as USD currency with two decimal places.
 * @param {number} price - The price value to format
 * @returns {string} Formatted price string like "$123.45"
 */
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(price);
};

/**
 * Pre-formatted string representing today's date in a long format (e.g., "Monday, January 1, 2025").
 */
export const formatDateToday = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

/**
 * Generates a human-readable alert description text based on alert type and threshold.
 * @param {Alert} alert - The alert object containing alertType and threshold
 * @returns {string} Formatted alert text like "Price > $150.00" or "Price < $50.00"
 */
export const getAlertText = (alert: Alert) => {
  const condition = alert.alertType === 'upper' ? '>' : '<';
  return `Price ${condition} ${formatPrice(alert.threshold)}`;
};

/**
 * Returns today's date formatted in a long, human-readable format with weekday, month, day, and year in UTC.
 * @returns {string} Formatted date string like "Monday, January 1, 2025"
 */
export const getFormattedTodayDate = () => new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});
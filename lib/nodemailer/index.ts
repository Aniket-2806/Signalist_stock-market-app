import nodemailer from 'nodemailer';
import {WELCOME_EMAIL_TEMPLATE, NEWS_SUMMARY_EMAIL_TEMPLATE} from "@/lib/nodemailer/templates";

/**
 * Nodemailer transporter configured for sending emails via Gmail SMTP.
 * Uses credentials from environment variables.
 */
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL!,
        pass: process.env.NODEMAILER_PASSWORD!,
    }
})

/**
 * Sends a personalized welcome email to a newly registered user.
 *
 * @param params - Welcome email data
 * @param params.email - Recipient's email address
 * @param params.name - User's name to personalize the greeting
 * @param params.intro - Custom introductory text generated based on user profile
 * @returns Promise that resolves when email is sent
 */
export const sendWelcomeEmail = async ({ email, name, intro }: WelcomeEmailData) => {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE
        .replace('{{name}}', name)
        .replace('{{intro}}', intro);

    const mailOptions = {
        from: `"Signalist" <signalist@jsmastery.pro>`,
        to: email,
        subject: `Welcome to Signalist - your stock market toolkit is ready!`,
        text: 'Thanks for joining Signalist',
        html: htmlTemplate,
    }

    await transporter.sendMail(mailOptions);
}

/**
 * Sends a daily market news summary email to a user.
 *
 * @param params - News summary email data
 * @param params.email - Recipient's email address
 * @param params.date - Formatted date string for the news summary
 * @param params.newsContent - HTML-formatted news content with market updates
 * @returns Promise that resolves when email is sent
 */
export const sendNewsSummaryEmail = async (
    { email, date, newsContent }: { email: string; date: string; newsContent: string }
): Promise<void> => {
    const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE
        .replace('{{date}}', date)
        .replace('{{newsContent}}', newsContent);

    const mailOptions = {
        from: `"Signalist News" <signalist@jsmastery.pro>`,
        to: email,
        subject: `📈 Market News Summary Today - ${date}`,
        text: `Today's market news summary from Signalist`,
        html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
};
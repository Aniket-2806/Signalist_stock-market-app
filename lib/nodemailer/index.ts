import nodemailer from 'nodemailer';
import {WELCOME_EMAIL_TEMPLATE, NEWS_SUMMARY_EMAIL_TEMPLATE} from "@/lib/nodemailer/templates";

/**
 * Nodemailer transporter configured for sending emails via Gmail SMTP.
 */
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NODEMAILER_EMAIL!,
        pass: process.env.NODEMAILER_PASSWORD!,
    }
})

/**
 * Sends a personalized welcome email to a new user using a pre-defined HTML template.
 * @param {WelcomeEmailData} params - Object containing email address, user name, and introductory text
 * @returns {Promise<void>} Resolves when email is sent successfully
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
 * Sends a daily market news summary email to a user with personalized news content.
 * @param {object} params - Parameters object
 * @param {string} params.email - Recipient email address
 * @param {string} params.date - Date string to display in the email
 * @param {string} params.newsContent - HTML content containing the news summary
 * @returns {Promise<void>} Resolves when email is sent successfully
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
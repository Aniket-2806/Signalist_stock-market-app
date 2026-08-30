'use server';

import { auth } from "@/lib/better-auth/auth";
import { inngest } from "@/lib/inngest/client";
import { headers } from "next/headers";

/**
 * Handles user registration with email and password, creating a new account and triggering a welcome email workflow.
 * @param {SignUpFormData} params - The sign-up form data including email, password, full name, country, investment goals, risk tolerance, and preferred industry
 * @returns {Promise<{success: boolean, data?: any, error?: string}>} Result object indicating success or failure with optional data or error message
 */
export const signUpWithEmail = async ({
                                          email,
                                          password,
                                          fullName,
                                          country,
                                          investmentGoals,
                                          riskTolerance,
                                          preferredIndustry,
                                      }: SignUpFormData) => {
    try {
        const response = await auth.api.signUpEmail({
            body: { email, password, name: fullName },
            headers: await headers(),
        });

        if (response) {
            await inngest.send({
                name: 'app/user.created',
                data: { email, name: fullName, country, investmentGoals, riskTolerance, preferredIndustry },
            });
        }

        return { success: true, data: response };
    } catch (e) {
        console.error('Sign up failed:', e);
        return { success: false, error: 'Sign up failed' };
    }
};

/**
 * Authenticates a user with email and password credentials.
 * @param {SignInFormData} params - The sign-in credentials containing email and password
 * @returns {Promise<{success: boolean, data?: any, error?: string}>} Result object indicating authentication success or failure
 */
export const signInWithEmail = async ({ email, password }: SignInFormData) => {
    try {
        const response = await auth.api.signInEmail({
            body: { email, password },
            headers: await headers(),
        });

        return { success: true, data: response };
    } catch (e) {
        console.error('Sign in failed:', e);
        return { success: false, error: 'Sign in failed' };
    }
};

/**
 * Signs out the currently authenticated user and clears their session.
 * @returns {Promise<{success: boolean, error?: string}>} Result object indicating sign-out success or failure
 */
export const signOut = async () => {
    try {
        await auth.api.signOut({
            headers: await headers(),
        });

        return { success: true };
    } catch (e) {
        console.error('Sign out failed:', e);
        return { success: false, error: 'Sign out failed' };
    }
};
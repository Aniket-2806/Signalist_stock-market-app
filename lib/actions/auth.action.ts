'use server';

import { auth } from "@/lib/better-auth/auth";
import { inngest } from "@/lib/inngest/client";
import { headers } from "next/headers";

/**
 * Registers a new user with email and password authentication.
 * Creates user account via Better Auth and triggers a welcome email workflow.
 *
 * @param params - Sign up form data containing user credentials and profile
 * @param params.email - User's email address
 * @param params.password - User's password
 * @param params.fullName - User's full name
 * @param params.country - User's country
 * @param params.investmentGoals - User's investment goals
 * @param params.riskTolerance - User's risk tolerance level
 * @param params.preferredIndustry - User's preferred industry sector
 * @returns Promise resolving to success status and response data or error message
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
 * Authenticates an existing user with email and password.
 *
 * @param params - Sign in form data
 * @param params.email - User's email address
 * @param params.password - User's password
 * @returns Promise resolving to success status and response data or error message
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
 *
 * @returns Promise resolving to success status or error message
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
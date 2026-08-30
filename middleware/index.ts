import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

/**
 * Next.js middleware that protects routes by checking for valid session cookies and redirecting unauthenticated users to the home page.
 * @param {NextRequest} request - The incoming Next.js request object
 * @returns {Promise<NextResponse>} Either continues to the requested page or redirects to home
 */
export async function middleware(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up|assets).*)',
    ],
};
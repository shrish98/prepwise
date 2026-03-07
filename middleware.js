import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';
const isProtectedRoute = createRouteMatcher([
    "/dashboard(.*)",
    "/resume(.*)",
    "/ai-cover-letter(.*)",
    "/interview(.*)",
    "/onboarding(.*)",
])

const isAuthRoute = createRouteMatcher([
    "/sign-in(.*)",
    "/sign-up(.*)"
])

export default clerkMiddleware(async (auth, req) => {
    const authObject = await auth();
    console.log(`[Middleware] URL: ${req.url}`);
    console.log(`[Middleware] Auth State: userId=${authObject.userId}, isAuthRoute=${isAuthRoute(req)}, isProtected=${isProtectedRoute(req)}`);

    if (isAuthRoute(req)) {
        if (authObject.userId) {
            console.log(`[Middleware] Redirecting authenticated user away from auth route to dashboard`);
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }
    }

    if (isProtectedRoute(req)) {
        if (!authObject.userId) {
            console.log(`[Middleware] WARNING: Protected route hit but userId is null. Protecting/Redirecting to sign-in.`);
        }
        await auth.protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}
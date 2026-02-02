
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { geolocation } from "@vercel/functions";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
    "/user/dashboard(.*)",
    "/user/profile-edit(.*)",
]);
const isBlockRoute = createRouteMatcher(["/block(.*)"]);
const allowedCountries = ["US"];

export default clerkMiddleware(
    async (auth, req) => {

        // Skip for webhook endpoints - MUST BE FIRST
        if (req.nextUrl.pathname.startsWith("/api/webhooks/clerk")) {
            return;
        }

        const { userId, sessionClaims, redirectToSignIn, orgId } = await auth();

        // ---------------------------------------------------------------------
        // 1. Force Ban Check (Server-Side)
        // ---------------------------------------------------------------------
        // If user is banned, force redirect to /banned (unless already there or signing out)
        if (userId && (sessionClaims?.publicMetadata as any)?.banned) {
            if (req.nextUrl.pathname !== "/banned" && !req.nextUrl.pathname.startsWith("/sign-out")) {
                return NextResponse.redirect(new URL("/banned", req.url));
            }
            // If already on /banned, allow access to render the page
            return;
        }

        // Get the hostname from the request headers
        const hostname = req.headers.get("host");

        // Handle subdomain routing for merchant
        const subdomain = hostname?.split(".")[0];
        if (subdomain === "merchant") {
            const path = req.nextUrl.pathname;

            // Protect Merchant Dashboard & Onboarding
            // We consider anything other than the landing page ("/") to be protected in the merchant flow for now,
            // or specific known paths like /dashboard and /onboarding
            const isProtectedMerchantRoute = path.startsWith("/dashboard") || path.startsWith("/onboarding");

            if (isProtectedMerchantRoute && !userId) {
                return redirectToSignIn();
            }

            // Redirect to dashboard if User is logged in AND has an Org, but is trying to access onboarding
            if (path.startsWith("/onboarding") && userId && orgId) {
                const dashboardUrl = new URL("/dashboard", req.url);
                return NextResponse.redirect(dashboardUrl);
            }

            // Redirect to onboarding if User is logged in but trying to access dashboard without an Org
            // Note: Clerk provides `orgId` if the user has an active organization selected.
            // If they don't, we should push them to onboarding.
            if (path.startsWith("/dashboard") && userId && !orgId) {
                const onboardingUrl = new URL("/onboarding", req.url);
                return NextResponse.redirect(onboardingUrl);
            }

            // Rewrite the URL to the /merchant path
            const url = req.nextUrl.clone();
            // Avoid infinite loop if already at /merchant
            if (!url.pathname.startsWith('/merchant')) {
                url.pathname = `/merchant${url.pathname}`;
                return NextResponse.rewrite(url);
            }
        }

        // Handle geolocation restrictions first
        if (isBlockRoute(req)) {
            return;
        }


        // Use Vercel's `geolocation()` function to get the client's country
        const { country } = geolocation(req);

        // Redirect if the client's country is not allowed
        if (country && !allowedCountries.includes(country)) {
            return NextResponse.redirect(new URL("/block", req.url));
        }


        // Handle protected routes for Main App
        if (!userId && isProtectedRoute(req)) {
            return redirectToSignIn();
        }
    },
    { debug: false }
);

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};

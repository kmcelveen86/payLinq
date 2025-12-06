import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { geolocation } from "@vercel/functions";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Make sure this path matches your prisma client import

const isProtectedRoute = createRouteMatcher([
  "/user/dashboard(.*)",
  "/user/profile-edit(.*)",
]);
const isBlockRoute = createRouteMatcher(["/block(.*)"]);
const allowedCountries = ["US"];

export default clerkMiddleware(
  async (auth, req) => {
    const { userId, sessionClaims, redirectToSignIn } = await auth();

    // Handle geolocation restrictions first
    if (isBlockRoute(req)) {
      return;
    }

    // Skip for webhook endpoints
    if (req.nextUrl.pathname.startsWith("/api/webhooks/clerk")) {
      return;
    }

    // Use Vercel's `geolocation()` function to get the client's country
    const { country } = geolocation(req);

    // Redirect if the client's country is not allowed
    if (country && !allowedCountries.includes(country)) {
      return NextResponse.redirect(new URL("/block", req.url));
    }

    // If user is authenticated, sync with database
    if (userId) {
      try {
        // Check if user exists in database with this clerk ID
        const existingUser = await prisma.user.findFirst({
          where: {
            clerkId: userId,
          },
        });

        if (!existingUser) {
          // Try to find by email if available in sessionClaims
          const userEmail = sessionClaims?.email as string;
          const firstName = sessionClaims?.firstName as string;
          const lastName = sessionClaims?.lastName as string;


          if (userEmail) {
            const userByEmail = await prisma.user.findUnique({
              where: {
                email: userEmail,
              },
            });

            if (userByEmail) {
              // User exists but doesn't have clerkId - update it
              await prisma.user.update({
                where: { id: userByEmail.id },
                data: { clerkId: userId },
              });
              // console.log(`Updated existing user ${userEmail} with Clerk ID`);
            } else {
              // Create new user in database
              await prisma.user.create({
                data: {
                  clerkId: userId,
                  email: userEmail,
                  firstName: firstName ?? "",
                  lastName: lastName ?? "",
                  membershipTier: "", // Default tier
                },
              });
              // console.log(`Created new user ${userEmail} in database`);
            }
          }
        }
      } catch (error) {
        console.error("Error syncing user with database:", error);
      }
    }

    // Handle protected routes
    if (!userId && isProtectedRoute(req)) {
      return redirectToSignIn();
    }
  },
  { debug: true }
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

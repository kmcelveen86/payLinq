import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedPaths = ["/user/dashboard", "/user/profile-edit"];
const profileRequiredPaths = ["/user/dashboard", "/user/membership-tiers"];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const url = req.nextUrl.clone();
  const email = token?.email as string | undefined;

  // Check if the request path is one of the protected paths
  if (protectedPaths.some((path) => url.pathname.startsWith(path))) {
    // If no session, redirect to the home page
    if (!email) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // If accessing a path that requires a complete profile
    if (profileRequiredPaths.some((path) => url.pathname.startsWith(path))) {
      // Check for profile completion cookie
      const profileComplete =
        req.cookies.get("profile_complete")?.value === "true";
      const firstName = token?.firstName as string | undefined;

      // If neither cookie nor token indicates a complete profile, redirect to profile edit
      if (!profileComplete && !firstName) {
        return NextResponse.redirect(new URL("/user/profile-edit", req.url));
      }
    }
  }

  // Continue to the requested page if authenticated or not accessing protected paths
  return NextResponse.next();
}

// Optimize the matcher to only run middleware where needed
export const config = {
  matcher: ["/user/:path*"],
};

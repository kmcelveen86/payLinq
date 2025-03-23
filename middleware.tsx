import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const protectedPaths = ["/user/dashboard", "/user/profile-edit"];
const profileRequiredPaths = ["/user/dashboard", "/user/membership-tiers"]; // Paths that require a complete profile

export async function middleware(req: NextRequest) {
  const session = await auth();
  const email = session?.user?.email;
  const url = req.nextUrl.clone();

  // Check if the request path is one of the protected paths
  if (protectedPaths.some((path) => url.pathname.startsWith(path))) {
    // If no session, redirect to the home page
    if (!email) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // If accessing a path that requires a complete profile
    if (profileRequiredPaths.some((path) => url.pathname.startsWith(path))) {
      // Check if user has completed their profile
      const user = await prisma.user.findUnique({
        where: { email },
        select: { firstName: true },
      });

      // If user doesn't have a firstName, redirect to profile edit
      if (!user?.firstName) {
        return NextResponse.redirect(new URL("/user/profile-edit", req.url));
      }
    }
  }

  // Continue to the requested page if authenticated or not accessing protected paths
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

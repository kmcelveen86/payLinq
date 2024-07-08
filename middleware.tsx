import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const protectedPaths = ["/user/dashboard", "/user/profile"];

export async function middleware(req: NextRequest) {
  const session = await auth();
  console.log("GREG LOOK!  ~ middleware ~ session:", session);
  const user = session?.user;
  console.log("GREG LOOK!  ~ middleware ~ user:", user);
  const email = session?.user?.email;
  const url = req.nextUrl.clone();

  // Check if the request path is one of the protected paths
  if (protectedPaths.some((path) => url.pathname.startsWith(path))) {
    // Get the session to check if the user is authenticated
    // const session = await getSession({ req });

    // If no session, redirect to the home page
    if (!email) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Continue to the requested page if authenticated or not accessing protected paths
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

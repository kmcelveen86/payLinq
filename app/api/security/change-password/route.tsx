import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  const { userId } = await auth();
  const body = await req.json();

  const { currentPassword, newPassword } = body;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!currentPassword || !newPassword) {
    return NextResponse.json(
      { error: "Please provide both current and new passwords." },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Step 1: Verify current password
    try {
      const verifyPWRez = await axios.post(
        `https://api.clerk.com/v1/users/${userId}/verify_password`,
        {
          password: currentPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const isMatch = verifyPWRez?.data?.verified;

      if (!isMatch) {
        return NextResponse.json(
          {
            error: "Current password is incorrect",
            errorType: "current_password",
          },
          { status: 401 }
        );
      }
    } catch (verifyError: any) {
      // Handle verification-specific errors
      switch (verifyError?.response?.status) {
        case 400: {
          return NextResponse.json(
            { error: "The user does not have a password set." },
            { status: 400 }
          );
        }
        case 404: {
          return NextResponse.json(
            { error: "The user does not exist." },
            { status: 404 }
          );
        }
        case 422: {
          return NextResponse.json(
            { error: "The provided password was incorrect." },
            { status: 422 }
          );
        }
        case 500: {
          return NextResponse.json(
            { error: "Request was not successful" },
            { status: 500 }
          );
        }
        default:
          throw verifyError; // Rethrow other errors to be caught by the outer catch
      }
    }

    // Step 2: Update password
    try {
      await axios.patch(
        `https://api.clerk.com/v1/users/${userId}`,
        {
          password: newPassword,
          skip_password_checks: false,
          sign_out_of_other_sessions: false,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      return NextResponse.json({ message: "Password updated successfully" });
    } catch (updateError: any) {
      // Handle update-specific errors
      switch (updateError?.response?.status) {
        case 400: {
          return NextResponse.json(
            { error: "The user does not have a password set." },
            { status: 400 }
          );
        }
        case 404: {
          return NextResponse.json(
            { error: "The user does not exist." },
            { status: 404 }
          );
        }
        case 422: {
          return NextResponse.json(
            {
              error:
                "This password has been found as part of a breach and can not be used, please try another password instead.",
            },
            { status: 422 }
          );
        }
        case 500: {
          return NextResponse.json(
            { error: "Request was not successful" },
            { status: 500 }
          );
        }
        default:
          throw updateError; // Rethrow other errors to be caught by the outer catch
      }
    }
  } catch (error: any) {
    // Generic error handling for uncaught errors
    return NextResponse.json(
      {
        error: error?.response?.data?.message || "An unexpected error occurred",
        errorType: "server_error",
      },
      { status: error?.response?.status || 500 }
    );
  }
}

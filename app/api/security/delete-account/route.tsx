import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    try {
      const deleteAcctRez = await axios.delete(
        `https://api.clerk.com/v1/users/${userId}`,

        {
          headers: {
            Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const isDeleted = deleteAcctRez?.data?.deleted;

      if (isDeleted) {
        return NextResponse.json(
          {
            message: "Your account has been deleted successfully",
          },
          { status: 200 }
        );
      }
    } catch (deleteAcctError: any) {
      // Handle verification-specific errors
      switch (deleteAcctError?.response?.status) {
        case 400: {
          return NextResponse.json(
            { error: "Request was not successful" },
            { status: 400 }
          );
        }
        case 401: {
          return NextResponse.json(
            { error: "Authentication invalid" },
            { status: 401 }
          );
        }
        case 404: {
          return NextResponse.json(
            { error: "Resource not found" },
            { status: 404 }
          );
        }
        default:
          throw deleteAcctError; // Rethrow other errors to be caught by the outer catch
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

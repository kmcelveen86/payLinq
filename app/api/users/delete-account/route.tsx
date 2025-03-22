import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/auth";

const prisma = new PrismaClient();

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const email = session.user.email;

    // Find the user to delete
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Delete all related data
    // Because of cascading deletes configured in our schema,
    // this will automatically delete all related records including:
    // - NotificationPreferences
    // - Sessions
    // - Accounts
    // - StripeCustomer and related records
    await prisma.user.delete({
      where: { id: user.id },
    });

    return NextResponse.json(
      { success: true, message: "Account successfully deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      { message: "Failed to delete account", error: (error as Error).message },
      { status: 500 }
    );
  }
}

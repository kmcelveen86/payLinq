import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { profileSchema, profileUpdateSchema } from "@/app/schemas/profile";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

// const prisma = new PrismaClient();

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { userId, redirectToSignIn } = await auth();
    const clerkUser = await currentUser();
    const email = clerkUser?.primaryEmailAddress?.emailAddress;

    if (!userId) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    // Fetch the user from the database, including notification preferences
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        notificationPreferences: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Format the response
    // const profileData = {
    //   firstName: user.firstName || "",
    //   lastName: user.lastName || "",
    //   email: user.email,
    //   phone: user.phoneNumber || "",
    //   dateOfBirth: user.dateOfBirth
    //     ? user.dateOfBirth
    //     : "",
    //   address: user.address || "",
    //   city: user.city || "",
    //   state: user.state || "",
    //   postalCode: user.postalCode || "",
    //   profileImage: user.image || null,
    //   membershipTier: user.membershipTier,
    //   notifications: user.notificationPreferences
    //     ? {
    //         email: user.notificationPreferences.email,
    //         sms: user.notificationPreferences.sms,
    //         app: user.notificationPreferences.app,
    //       }
    //     : {
    //         email: true,
    //         sms: false,
    //         app: true,
    //       },
    // };

    // return NextResponse.json(profileData);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { userId, redirectToSignIn } = await auth();
  const clerkUser = await currentUser();
  const email = clerkUser?.primaryEmailAddress?.emailAddress;
  try {
    const body = await request.json();
    const { tierName, annualBilling } = body;

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    let user;

    if (existingUser) {
      // Update existing user
      user = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          membershipTier: tierName,
          billingCycle: annualBilling ? "annual" : "monthly",
        },
      });
    } else {
      return redirectToSignIn();
    }

    return NextResponse.json(
      {
        success: true,
        user: user,
      },
      { status: existingUser ? 200 : 201 }
    );
  } catch (error) {
    if ((error as Error).message === 'NEXT_REDIRECT') {
      throw error;
    }
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }

}

// export async function PUT(request: NextRequest) {
//   try {
//     const clerkUser = await currentUser();

//     if (!clerkUser) {
//       return NextResponse.json(
//         { message: "Not authenticated" },
//         { status: 401 }
//       );
//     }

//     const body = await request.json();

//     // Get existing user data first
//     const existingUser = await prisma.user.findUnique({
//       where: { clerkId: clerkUser.id },
//       include: { notificationPreferences: true },
//     });

//     if (!existingUser) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     // Update user with only the provided fields
//     const user = await prisma.user.update({
//       where: { clerkId: clerkUser.id },
//       data: body,
//       include: {
//         notificationPreferences: true,
//       },
//     });

//     return NextResponse.json({
//       success: true,
//       user: {
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         phone: user.phoneNumber,
//         dateOfBirth: user.dateOfBirth
//           ? user.dateOfBirth.toISOString().split("T")[0]
//           : "",
//         address: user.address,
//         city: user.city,
//         state: user.state,
//         postalCode: user.postalCode,
//         updatedAt: user.updatedAt,
//         notifications: user.notificationPreferences
//           ? {
//               email: user.notificationPreferences.email,
//               sms: user.notificationPreferences.sms,
//               app: user.notificationPreferences.app,
//             }
//           : undefined,
//       },
//     });
//   } catch (error) {
//     console.error("Error updating user profile:", error);
//     return NextResponse.json(
//       {
//         message: "Internal server error",
//         error: error instanceof Error ? error.message : String(error),
//       },
//       { status: 500 }
//     );
//   }
// }

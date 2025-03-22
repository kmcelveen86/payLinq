import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { profileSchema } from "@/app/schemas/profile";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma"; // Import the shared instance


// const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const email = session.user.email;

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
    const profileData = {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email,
      phone: user.phoneNumber || "",
      dob: user.dateOfBirth ? user.dateOfBirth.toISOString().split("T")[0] : "",
      address: user.address || "",
      city: user.city || "",
      state: user.state || "",
      postalCode: user.postalCode || "",
      profileImage: user.image || null,
      membershipTier: user.membershipTier || "Freemium",
      // Include notification preferences
      notifications: user.notificationPreferences
        ? {
            email: user.notificationPreferences.email,
            sms: user.notificationPreferences.sms,
            app: user.notificationPreferences.app,
          }
        : {
            email: true,
            sms: false,
            app: true,
          },
    };

    return NextResponse.json(profileData);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = profileSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      dob,
      address,
      city,
      state,
      postalCode,
      notifications, // Get notifications from validated data
    } = validationResult.data;

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
      include: {
        notificationPreferences: true,
      },
    });

    let user;

    if (existingUser) {
      // Update existing user
      user = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          name: `${firstName} ${lastName}`,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phone,
          dateOfBirth: new Date(dob),
          postalCode: postalCode,
          address: address,
          city,
          state,
          // Update notification preferences if provided, otherwise use defaults or existing values
          notificationPreferences: {
            upsert: {
              create: {
                email: notifications?.email ?? true,
                sms: notifications?.sms ?? false,
                app: notifications?.app ?? false,
              },
              update: {
                email:
                  notifications?.email ??
                  existingUser.notificationPreferences?.email ??
                  true,
                sms:
                  notifications?.sms ??
                  existingUser.notificationPreferences?.sms ??
                  false,
                app:
                  notifications?.app ??
                  existingUser.notificationPreferences?.app ??
                  false,
              },
            },
          },
        },
        include: {
          notificationPreferences: true,
        },
      });
    } else {
      // Create new user
      user = await prisma.user.create({
        data: {
          name: `${firstName} ${lastName}`,
          firstName: firstName,
          lastName: lastName,
          email,
          phoneNumber: phone,
          dateOfBirth: new Date(dob),
          address,
          city,
          state,
          postalCode,
          // Create notification preferences with provided values or defaults
          notificationPreferences: {
            create: {
              email: notifications?.email ?? true,
              sms: notifications?.sms ?? false,
              app: notifications?.app ?? false,
            },
          },
        },
        include: {
          notificationPreferences: true,
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        userId: user.id,
        isNewUser: !existingUser,
        notifications: {
          email: user.notificationPreferences?.email,
          sms: user.notificationPreferences?.sms,
          app: user.notificationPreferences?.app,
        },
      },
      { status: existingUser ? 200 : 201 }
    );
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validationResult = profileSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: validationResult.error.format(),
        },
        { status: 400 }
      );
    }

    const {
      firstName,
      lastName,
      phone,
      dob,
      address,
      city,
      state,
      postalCode,
      notifications,
    } = validationResult.data;

    // Update user
    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: `${firstName} ${lastName}`,
        firstName,
        lastName,
        phoneNumber: phone,
        dateOfBirth: new Date(dob),
        postalCode,
        address,
        city,
        state,
        // Update notification preferences if provided
        notificationPreferences: notifications ? {
          upsert: {
            create: {
              email: notifications.email,
              sms: notifications.sms,
              app: notifications.app,
            },
            update: {
              email: notifications.email,
              sms: notifications.sms,
              app: notifications.app,
            },
          },
        } : undefined,
      },
      include: {
        notificationPreferences: true,
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phoneNumber,
        dob: user.dateOfBirth ? user.dateOfBirth.toISOString().split("T")[0] : "",
        address: user.address,
        city: user.city,
        state: user.state,
        postalCode: user.postalCode,
        notifications: user.notificationPreferences ? {
          email: user.notificationPreferences.email,
          sms: user.notificationPreferences.sms,
          app: user.notificationPreferences.app,
        } : undefined,
      }
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
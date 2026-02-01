import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { formatDistance, format, add } from "date-fns";
import { profileSchema, profileUpdateSchema } from "@/app/schemas/profile";
import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { stripe, STRIPE_PRICES } from "@/lib/stripe";
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
      // JIT Provisioning: If user exists in Clerk but not in DB (e.g., after DB reset)
      // fetch from Clerk and create in DB.
      console.log(`User ${userId} not found in DB. Attempting JIT provisioning...`);

      if (!email) {
        return NextResponse.json({ message: "User not found and no email in session" }, { status: 404 });
      }

      try {
        // Check if user exists in Stripe
        let stripeCustomerId: string | undefined;
        let membershipTier: string | null = null;
        let billingCycle: string | null = null;

        const stripeCustomers = await stripe.customers.list({
          email: email,
          limit: 1,
        });

        if (stripeCustomers.data.length > 0) {
          stripeCustomerId = stripeCustomers.data[0].id;
          console.log(`Found existing Stripe customer ${stripeCustomerId} for ${email}`);

          // Check for active subscriptions
          const subscriptions = await stripe.subscriptions.list({
            customer: stripeCustomerId,
            status: "active",
            limit: 1,
          });

          if (subscriptions.data.length > 0) {
            const sub = subscriptions.data[0];
            const priceId = sub.items.data[0].price.id;

            // Determine Billing Cycle
            if (sub.items.data[0].price.recurring?.interval === "year") {
              billingCycle = "yearly";
            }

            // Determine Tier from Price ID
            if (priceId === STRIPE_PRICES.SILVER.MONTHLY || priceId === STRIPE_PRICES.SILVER.YEARLY) {
              membershipTier = "Silver";
            } else if (priceId === STRIPE_PRICES.GOLD.MONTHLY || priceId === STRIPE_PRICES.GOLD.YEARLY) {
              membershipTier = "Gold";
            } else if (priceId === STRIPE_PRICES.BLACK.MONTHLY || priceId === STRIPE_PRICES.BLACK.YEARLY) {
              membershipTier = "Black";
            } else if (priceId === STRIPE_PRICES.WHITE.MONTHLY || priceId === STRIPE_PRICES.WHITE.YEARLY) {
              membershipTier = "White";
            }

            console.log(`Restored subscription: ${membershipTier} (${billingCycle})`);
          }
        }

        // Create the user in the database
        const newUser = await prisma.user.create({
          data: {
            clerkId: userId,
            email: email,
            firstName: clerkUser?.firstName || null,
            lastName: clerkUser?.lastName || null,
            image: clerkUser?.imageUrl || null,
            emailVerified: new Date(),
            billingCycle: billingCycle,
            membershipTier: membershipTier,
            stripeCustomerId: stripeCustomerId, // Add direct link if schema supports it
          },
        });

        // Link Stripe Customer Model if one was found
        if (stripeCustomerId) {
          await prisma.stripeCustomer.create({
            data: {
              userId: newUser.id,
              stripeCustomerId: stripeCustomerId,
            }
          });
        }

        // Create default notification preferences
        await prisma.notificationPreferences.create({
          data: {
            userId: newUser.id,
            email: true,
            sms: false,
            app: false,
          },
        });

        console.log(`Successfully provisioned user ${newUser.id} for Clerk User ${userId}`);

        // Return the newly created user profile
        return NextResponse.json({
          billingCycle: newUser.billingCycle,
          firstName: newUser.firstName || "",
          lastName: newUser.lastName || "",
          email: newUser.email,
          phoneNumber: newUser.phoneNumber || "",
          dateOfBirth: "",
          address: "",
          city: "",
          state: "",
          postalCode: "",
          profileImage: newUser.image || null,
          membershipTier: newUser.membershipTier,
          notifications: {
            email: true,
            sms: false,
            app: false,
          },
          banned: newUser.banned,
          bannedReason: newUser.bannedReason,
          updatedAt: newUser.updatedAt,
        });

      } catch (createError) {
        console.error("Failed to JIT provision user:", createError);
        return NextResponse.json({ message: "User not found and provisioning failed" }, { status: 500 });
      }
    }

    // Format the response
    const profileData = {
      billingCycle: user.billingCycle || "monthly",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email,
      phoneNumber: user.phoneNumber || "",
      dateOfBirth: user.dateOfBirth
        ? user.dateOfBirth
        : "",
      address: user.address || "",
      city: user.city || "",
      state: user.state || "",
      postalCode: user.postalCode || "",
      profileImage: user.image || null,
      membershipTier: user.membershipTier,
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
      banned: user.banned,
      bannedReason: user.bannedReason,
      updatedAt: user.updatedAt,
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
      phoneNumber,
      dateOfBirth,
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
      const userDate = new Date(dateOfBirth);
      const formmattedDate = format(userDate, "MM yy dd");
      // Update existing user
      user = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          name: `${firstName} ${lastName}`,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          dateOfBirth: formmattedDate,
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
          phoneNumber: phoneNumber,
          dateOfBirth: dateOfBirth,
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
    const clerkUser = await currentUser();

    if (!clerkUser) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Get existing user data first
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
      include: { notificationPreferences: true }
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Prepare update data only with fields that were provided
    const updateData: any = {};

    // updateData.updatedAt = new Date(clerkUser.updatedAt);

    // Only include fields that were provided in the request
    if (body.firstName !== undefined) updateData.firstName = body.firstName;
    if (body.lastName !== undefined) updateData.lastName = body.lastName;

    // Only update name if first or last name was provided
    if (body.firstName !== undefined || body.lastName !== undefined) {
      const firstName = body.firstName ?? existingUser.firstName ?? '';
      const lastName = body.lastName ?? existingUser.lastName ?? '';
      updateData.name = `${firstName} ${lastName}`.trim();
    }

    if (body.phoneNumber !== undefined) {
      // Handle empty string as null to avoid unique constraint violation
      if (body.phoneNumber === "") {
        updateData.phoneNumber = null;
      } else {
        // Check if phone number is already in use by another user
        const existingPhoneUser = await prisma.user.findFirst({
          where: {
            phoneNumber: body.phoneNumber,
            NOT: {
              id: existingUser.id,
            },
          },
        });

        if (existingPhoneUser) {
          return NextResponse.json(
            {
              success: false,
              message: "This phone number is already associated with another account.",
            },
            { status: 400 }
          );
        }
        updateData.phoneNumber = body.phoneNumber;
      }
    }

    // IMPORTANT: Only include dateOfBirth if explicitly provided and valid
    if (body.dateOfBirth !== undefined && body.dateOfBirth !== null && body.dateOfBirth !== '') {
      // Check if it's already in YYYY-MM-DD format
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (dateRegex.test(body.dateOfBirth)) {
        updateData.dateOfBirth = body.dateOfBirth;
      } else {
        try {
          // Fallback to previous logic for other formats
          const dateValue = new Date(body.dateOfBirth);
          const formmattedDate = format(dateValue, "yyyy-MM-dd");

          // Update existing user
          if (!isNaN(dateValue.getTime())) {
            updateData.dateOfBirth = formmattedDate;
          }
        } catch (error) {
          // Simply don't include the date in the update if it's invalid
          console.warn("Invalid date format provided, skipping dateOfBirth update");
        }
      }
    }

    if (body.address !== undefined) updateData.address = body.address;
    if (body.city !== undefined) updateData.city = body.city;
    if (body.state !== undefined) updateData.state = body.state;
    if (body.postalCode !== undefined) updateData.postalCode = body.postalCode;

    // Only include notification preferences if any were provided
    if (body.notifications) {
      const notificationsUpdate: any = {};

      if (body.notifications.email !== undefined)
        notificationsUpdate.email = body.notifications.email;
      if (body.notifications.sms !== undefined)
        notificationsUpdate.sms = body.notifications.sms;
      if (body.notifications.app !== undefined)
        notificationsUpdate.app = body.notifications.app;

      // Only update if at least one notification preference was provided
      if (Object.keys(notificationsUpdate).length > 0) {
        updateData.notificationPreferences = {
          upsert: {
            create: {
              email: notificationsUpdate.email ?? true,
              sms: notificationsUpdate.sms ?? false,
              app: notificationsUpdate.app ?? true,
            },
            update: notificationsUpdate,
          },
        };
      }
    }

    // console.log("Update data:", JSON.stringify(updateData, null, 2));

    // Only proceed with update if there's something to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({
        success: true,
        message: "No fields to update",
        user: {
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
          email: existingUser.email,
          phoneNumber: existingUser.phoneNumber,
          dateOfBirth: existingUser.dateOfBirth
            ? existingUser.dateOfBirth
            : "",
          address: existingUser.address,
          city: existingUser.city,
          state: existingUser.state,
          postalCode: existingUser.postalCode,
          notifications: existingUser.notificationPreferences
            ? {
              email: existingUser.notificationPreferences.email,
              sms: existingUser.notificationPreferences.sms,
              app: existingUser.notificationPreferences.app,
            }
            : undefined,
        },
      });
    }



    // Update user with only the provided fields
    const user = await prisma.user.update({
      where: { clerkId: clerkUser.id },
      data: updateData,
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
        phoneNumber: user.phoneNumber,
        dateOfBirth: user.dateOfBirth
          ? user.dateOfBirth
          : "",
        address: user.address,
        city: user.city,
        state: user.state,
        postalCode: user.postalCode,
        updatedAt: user.updatedAt,
        notifications: user.notificationPreferences
          ? {
            email: user.notificationPreferences.email,
            sms: user.notificationPreferences.sms,
            app: user.notificationPreferences.app,
          }
          : undefined,
      },
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { message: "Internal server error", error: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

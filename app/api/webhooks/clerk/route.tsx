import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env"
    );
  }

  // Verify the webhook signature
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_signature = headerPayload.get("svix-signature");
  const svix_timestamp = headerPayload.get("svix-timestamp");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Missing svix headers", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(process.env.SIGNING_SECRET!);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-signature": svix_signature,
      "svix-timestamp": svix_timestamp,
    }) as WebhookEvent;
  } catch (err) {
    return new Response("Invalid signature", { status: 400 });
  }

  const eventType = evt.type;

  // Handle user.signed_in event
  // if (eventType === "session.created") {
  //   const { user_id } = evt.data;
  // }
  // Handle user.created event
  if (eventType === "user.created") {
    const {
      id,
      email_addresses,
      first_name,
      last_name,
      image_url,
      external_accounts,
    } = evt.data;
    const primaryEmail = email_addresses?.[0]?.email_address;

    // Check if user was created using email/password
    // TODO: IS THIS IDEAL?
    const createdUsingCreds =
      evt.data.email_addresses?.[0]?.verification?.strategy === "email_code";

    // Check if user was created using Google OAuth
    const googleAccount = external_accounts?.find(
      (account) =>
        account.provider === "google" || account.provider === "oauth_google"
    );

    // Proceed if created using either email/password or Google OAuth
    if (createdUsingCreds || googleAccount) {
      if (!primaryEmail) {
        return new Response("No email address found", { status: 400 });
      }
      // CREATED USING EMAIL/PASSWORD
      if (createdUsingCreds) {
        try {
          // console.log(
          //   `Received webhook with ID ${id} and event type of ${eventType}`
          // );
          // console.log("Webhook payload:", body);

          // Check if user already exists by email
          const existingUser = await prisma.user.findUnique({
            where: { email: primaryEmail },
          });

          if (existingUser) {
            // Update existing user with Clerk ID
            await prisma.user.update({
              where: { id: existingUser.id },
              data: {
                clerkId: id,
                emailVerified: new Date(), // Set emailVerified for OAuth users
              },
            });

            // If Google OAuth, create an Account record
            // if (googleAccount) {
            //   await prisma.account.upsert({
            //     where: {
            //       provider_providerAccountId: {
            //         provider: "google",
            //         providerAccountId: googleAccount.provider_user_id,
            //       },
            //     },
            //     update: {}, // No update needed if it already exists
            //     create: {
            //       provider: "google",
            //       providerAccountId: googleAccount.provider_user_id,
            //       userId: existingUser.id,
            //       type: "oauth",
            //       // Optional fields that might be available from Clerk
            //       access_token: googleAccount.access_token,
            //       id_token: googleAccount.id_token,
            //       refresh_token: googleAccount.refresh_token,
            //       expires_at: googleAccount.expires_at
            //         ? Math.floor(
            //             new Date(googleAccount.expires_at).getTime() / 1000
            //           )
            //         : undefined,
            //       token_type: "bearer",
            //       scope: "email profile",
            //     },
            //   });
            // }
          } else {
            // Create new user
            const newUser = await prisma.user.create({
              data: {
                clerkId: id,
                email: primaryEmail,
                firstName: first_name || null,
                lastName: last_name || null,
                image: image_url || null,
                emailVerified: new Date(), // Set emailVerified for OAuth users
              },
            });

            // Create notification preferences
            await prisma.notificationPreferences.create({
              data: {
                userId: newUser.id,
                email: true,
                sms: false,
                app: false,
              },
            });
          }
        } catch (error) {
          console.error("Error creating user:", error);
          return new Response("Error creating user", { status: 500 });
        }
      }
      // CREATED USING GOOGLE OAUTH
      else {
        try {
          // Check if user already exists by email
          const existingUser = await prisma.user.findUnique({
            where: { email: primaryEmail },
          });

          if (existingUser) {
            // Update existing user with Clerk ID
            await prisma.user.update({
              where: { id: existingUser.id },
              data: {
                clerkId: id,
                emailVerified: new Date(), // Set emailVerified for OAuth users
              },
            });
          } else {
            // Create new user
            const newUser = await prisma.user.create({
              data: {
                clerkId: id,
                email: primaryEmail,
                firstName: first_name || null,
                lastName: last_name || null,
                image: image_url || null,
                emailVerified: new Date(), // Set emailVerified for OAuth users
              },
            });

            // Create notification preferences
            await prisma.notificationPreferences.create({
              data: {
                userId: newUser.id,
                email: true,
                sms: false,
                app: false,
              },
            });
          }
        } catch (error) {
          console.error("Error creating user:", error);
          return new Response("Error creating user", { status: 500 });
        }
      }
    }
  }

  // Handle user.updated event
  if (eventType === "user.updated") {
    const {
      id,
      email_addresses,
      first_name,
      last_name,
      image_url,
      external_accounts,
    } = evt.data;
    const primaryEmail = email_addresses?.[0]?.email_address;

    try {
      // Find user by clerkId first
      let user = await prisma.user.findFirst({
        where: { clerkId: id },
      });

      // If user not found by clerkId, try finding by email
      if (!user && primaryEmail) {
        user = await prisma.user.findFirst({
          where: { email: primaryEmail },
        });

        // If we found the user by email but clerkId doesn't match,
        // update the clerkId to maintain the connection
        if (user && user.clerkId !== id) {
          console.log(
            `Updating clerkId for user ${user.id} from ${user.clerkId} to ${id}`
          );
        }
      }

      if (!user) {
        console.log(
          `User not found for clerkId: ${id}, email: ${primaryEmail}`
        );
        return new Response("User not found in webhook", { status: 404 });
      }

      // Only update fields that are provided and different
      const updateData: Partial<{
        email: string;
        firstName: string;
        lastName: string;
        image: string;
        clerkId: string;
      }> = {};

      if (primaryEmail && user.email !== primaryEmail) {
        updateData.email = primaryEmail;
      }

      if (first_name !== undefined && user.firstName !== first_name) {
        updateData.firstName = first_name ?? undefined;
      }

      if (last_name !== undefined && user.lastName !== last_name) {
        updateData.lastName = last_name ?? undefined;
      }

      if (image_url !== undefined && user.image !== image_url) {
        updateData.image = image_url;
      }

      // Always update clerkId if we found the user by email
      if (user.clerkId !== id) {
        updateData.clerkId = id;
      }

      // Only update if there are actual changes
      if (Object.keys(updateData).length > 0) {
        await prisma.user.update({
          where: { id: user.id },
          data: updateData,
        });
        console.log(`Updated user ${user.id} with data:`, updateData);
      } else {
        console.log(`No changes needed for user ${user.id}`);
      }

      return new Response("User updated successfully", { status: 200 });
    } catch (error) {
      console.error("Error updating user:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      return new Response(`Error updating user: ${errorMessage}`, {
        status: 500,
      });
    }
  }

  // Handle user.deleted event
  if (eventType === "user.deleted") {
    const { id } = evt.data;

    try {
      // Find user first to get the ID
      const user = await prisma.user.findFirst({
        where: { clerkId: id },
      });

      if (user) {
        // Delete associated accounts first (for foreign key constraints)
        // await prisma.account.deleteMany({
        //   where: { userId: user.id },
        // });

        // Delete the user
        await prisma.user.delete({
          where: { id: user.id },
        });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      return new Response("Error deleting user", { status: 500 });
    }
  }

  if (eventType === "waitlistEntry.created") {
    const { id, email_address } = evt.data;

    try {
      // Check if user already exists by email
      const existingUser = await prisma.waitlist.findUnique({
        where: { email: email_address },
      });

      if (!existingUser) {
        // Create new waitlist entry
        await prisma.waitlist.create({
          data: {
            id,
            email: email_address,
            status: "pending",
            metadata: {
              source: "clerk_webhook",
              createdVia: "waitlist_form",
            },
          },
        });

        console.log(`Created new waitlist entry for ${email_address}`);
      } else {
        console.log(`Waitlist entry for ${email_address} already exists`);
      }

      return new Response("Waitlist entry processed", { status: 200 });
    } catch (error) {
      console.error("Error creating waitlist entry:", error);
      return new Response("Error creating waitlist entry", { status: 500 });
    }
  }

  return new Response("Webhook received", { status: 200 });
}

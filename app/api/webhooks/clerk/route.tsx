// import { WebhookEvent } from "@clerk/nextjs/server";
// import { headers } from "next/headers";
// import { Webhook } from "svix";
// import { prisma } from "@/lib/prisma";

// console.log("Webhook handler loaded - ready to receive webhooks");

// export async function POST(req: Request) {
//   const SIGNING_SECRET = process.env.SIGNING_SECRET;

//   if (!SIGNING_SECRET) {
//     throw new Error(
//       "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env"
//     );
//   }

//   console.log("Webhook endpoint hit!");
//   // Verify the webhook signature
//   const headerPayload = await headers();
//   const svix_id = headerPayload.get("svix-id");
//   const svix_signature = headerPayload.get("svix-signature");
//   const svix_timestamp = headerPayload.get("svix-timestamp");

//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response("Missing svix headers", { status: 400 });
//   }

//   const payload = await req.json();
//   const body = JSON.stringify(payload);

//   const wh = new Webhook(process.env.SIGNING_SECRET!);

//   let evt: WebhookEvent;

//   try {
//     evt = wh.verify(body, {
//       "svix-id": svix_id,
//       "svix-signature": svix_signature,
//       "svix-timestamp": svix_timestamp,
//     }) as WebhookEvent;
//   } catch (err) {
//     return new Response("Invalid signature", { status: 400 });
//   }

//   const eventType = evt.type;

//   // Handle user.created event
//   if (eventType === "user.created") {
//     const { id, email_addresses, first_name, last_name, image_url } = evt.data;
//     const primaryEmail = email_addresses?.[0]?.email_address;
//     const createdUsingCreds =
//       evt.data.email_addresses?.[0]?.verification?.strategy === "email_code";

//     if (createdUsingCreds) {
//       if (!primaryEmail) {
//         return new Response("No email address found", { status: 400 });
//       }

//       try {
//         console.log(
//           `Received webhook with ID ${id} and event type of ${eventType}`
//         );
//         console.log("Webhook payload:", body);
//         // Check if user already exists by email
//         const existingUser = await prisma.user.findUnique({
//           where: { email: primaryEmail },
//         });

//         if (existingUser) {
//           // Update existing user with Clerk ID
//           await prisma.user.update({
//             where: { id: existingUser.id },
//             data: { clerkId: id },
//           });
//         } else {
//           // Create new user
//           await prisma.user.create({
//             data: {
//               clerkId: id,
//               email: primaryEmail,
//               firstName: first_name || null,
//               lastName: last_name || null,
//               image: image_url || null,
//             },
//           });
//         }
//       } catch (error) {
//         console.error("Error creating user:", error);
//         return new Response("Error creating user", { status: 500 });
//       }
//     }
//   }

//   // Handle user.updated event
//   if (evt.type === "user.updated") {
//     const { id, email_addresses, first_name, last_name } = evt.data;
//     const primaryEmail = email_addresses?.[0]?.email_address;

//     try {
//       await prisma.user.updateMany({
//         where: { clerkId: id },
//         data: {
//           email: primaryEmail,
//           firstName: first_name || undefined,
//           lastName: last_name || undefined,
//         },
//       });
//     } catch (error) {
//       console.error("Error updating user:", error);
//       return new Response("Error updating user", { status: 500 });
//     }
//   }

//   // Handle user.deleted event
//   if (evt.type === "user.deleted") {
//     const { id } = evt.data;

//     try {
//       await prisma.user.deleteMany({
//         where: { clerkId: id },
//       });
//     } catch (error) {
//       console.error("Error deleting user:", error);
//       return new Response("Error deleting user", { status: 500 });
//     }
//   }

//   return new Response("Webhook received", { status: 200 });
// }

import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { prisma } from "@/lib/prisma";

// console.log("Webhook handler loaded - ready to receive webhooks");

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
          console.log(
            `Received webhook with ID ${id} and event type of ${eventType}`
          );
          console.log("Webhook payload:", body);

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
      // Update user information
      const user = await prisma.user.findFirst({
        where: { clerkId: id },
      });

      if (!user) {
        return new Response("User not found in webhook", { status: 404 });
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          email: primaryEmail || undefined,
          firstName: first_name || undefined,
          lastName: last_name || undefined,
          image: image_url || undefined,
          phoneNumber: evt.data.phone_numbers[0].phone_number || undefined,
          banned: evt.data.banned || false,
          bannedReason: evt.data.banned ? "Banned Via Clerk" : "",
        },
      });
    } catch (error) {
      console.error("Error updating user:", error);
      return new Response("Error updating user", { status: 500 });
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

  return new Response("Webhook received", { status: 200 });
}

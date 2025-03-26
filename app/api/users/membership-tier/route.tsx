// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
// import { auth } from "@/auth";
// import { z } from "zod";

// const prisma = new PrismaClient();

// // Validation schema for membership tier update
// const updateTierSchema = z.object({
//   tierName: z.enum([
//     "Freemium",
//     "Lifestyle",
//     "VIP Lifestyle",
//     "Elite Lifestyle",
//   ]),
//   annualBilling: z.boolean(),
// });

// export async function POST(request: NextRequest) {
//   try {
//     const session = await auth();

//     if (!session || !session.user?.email) {
//       return NextResponse.json(
//         { message: "Not authenticated" },
//         { status: 401 }
//       );
//     }

//     const email = session.user.email;

//     // Parse and validate request body
//     const body = await request.json();
//     const validationResult = updateTierSchema.safeParse(body);

//     if (!validationResult.success) {
//       return NextResponse.json(
//         {
//           message: "Invalid request data",
//           errors: validationResult.error.format(),
//         },
//         { status: 400 }
//       );
//     }

//     const { tierName, annualBilling } = validationResult.data;

//     // Find the user
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     // Update user's membership tier
//     const updatedUser = await prisma.user.update({
//       where: { id: user.id },
//       data: {
//         membershipTier: tierName,
//         // TODO: add billingCycle? to the schema
//       },
//     });

//     // TODO: handle payment processing here
//     // ie. creating a subscription in Stripe

//     // Create a record of the tier change
//     // TODO: add a subscription history table in the schema

//     return NextResponse.json({
//       success: true,
//       user: {
//         id: updatedUser.id,
//         membershipTier: updatedUser.membershipTier,
//         billingCycle: annualBilling ? "annual" : "monthly",
//       },
//       message: `Your membership has been successfully updated to ${tierName}`,
//     });
//   } catch (error) {
//     console.error("Error updating membership tier:", error);
//     return NextResponse.json(
//       { message: "Internal server error", error: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

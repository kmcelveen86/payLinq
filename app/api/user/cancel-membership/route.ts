import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Only allow if current tier is White (or maybe allow any free tier logic here if expanded)
        // For now, we just reset them to 'none'.

        await prisma.user.update({
            where: { id: user.id },
            data: { membershipTier: "none" },
        });

        // Revalidate cache
        revalidatePath("/user/dashboard");
        revalidatePath("/api/users/profile");
        revalidatePath("/pricing"); // Pricing page needs to know so it can show "Get Started" again

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error canceling membership:", error);
        return NextResponse.json(
            { error: "Failed to cancel membership" },
            { status: 500 }
        );
    }
}

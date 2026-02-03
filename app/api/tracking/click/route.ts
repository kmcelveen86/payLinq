import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const { userId } = await auth();

        // Ensure user is authenticated
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { merchantId, targetUrl } = body;

        if (!targetUrl) {
            return NextResponse.json({ error: "Missing targetUrl" }, { status: 400 });
        }

        // Get DB User ID (resolve Clerk ID to DB ID)
        const user = await prisma.user.findUnique({
            where: { clerkId: userId },
            select: { id: true, membershipTier: true }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Enforce subscription check here as well (fail fast)
        if (!user.membershipTier || user.membershipTier === "none") {
            return NextResponse.json({ error: "Subscription required to shop" }, { status: 403 });
        }

        // Generate Click ID (Create AffiliateClick record)
        const click = await prisma.affiliateClick.create({
            data: {
                userId: user.id,
                merchantId: merchantId || undefined,
                targetUrl: targetUrl,
                expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 day validity
                userAgent: req.headers.get("user-agent"),
                ipAddress: req.headers.get("x-forwarded-for") || "unknown"
            }
        });

        // Construct the final URL
        // We append the Click ID appropriately
        const separator = targetUrl.includes("?") ? "&" : "?";
        // We use 'ref' as the standard parameter, but some merchants might use 'click_id' etc.
        // For PayLinq ecosystem, we'll standardize on 'ref' or 'userId' (spoofing the user ID field with the Click ID)
        // Since we want to drop-in replace, let's pass it as 'userId' if the merchant expects that,
        // OR simpler: assume the merchant just wants A identifier.
        // Let's return the click ID so the client can construct the URL if needed, or return the full URL.

        // If the client logic was: targetUrl + "?userId=" + userId
        // We now act as if "userId" = click.id (The opaque token)
        // This requires the merchant to send back this ID in the "user_id" field of the order webhook.

        const finalUrl = `${targetUrl}${separator}userId=${click.id}`;
        // Note: We use 'userId' param key so we don't have to change merchant code, 
        // but the VALUE is now the Click ID (CUID).

        return NextResponse.json({
            clickId: click.id,
            finalUrl: finalUrl
        });

    } catch (error) {
        console.error("Click Generation Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

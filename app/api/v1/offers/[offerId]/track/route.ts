import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(
    req: NextRequest,
    props: { params: Promise<{ offerId: string }> }
) {
    try {
        const params = await props.params;
        const { offerId } = params;
        const body = await req.json();
        const { type } = body; // "view", "click", "redemption"

        if (!["view", "click", "redemption"].includes(type)) {
            return NextResponse.json({ error: "Invalid event type" }, { status: 400 });
        }

        // Increment the counter
        // We do this blindly based on the ID for high-throughput speed, 
        // assuming validation happens at a higher level or we don't care about spam for this MVP metric.
        // For production, we'd want rate limiting or signature verification.

        const updateData: any = {};
        if (type === "view") updateData.views = { increment: 1 };
        if (type === "click") updateData.clicks = { increment: 1 };
        if (type === "redemption") updateData.redemptions = { increment: 1 };

        const updatedOffer = await prisma.offer.update({
            where: { id: offerId },
            data: updateData
        });

        return NextResponse.json({
            success: true, stats: {
                views: updatedOffer.views,
                clicks: updatedOffer.clicks,
                redemptions: updatedOffer.redemptions
            }
        });

    } catch (error) {
        console.error("Tracking Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

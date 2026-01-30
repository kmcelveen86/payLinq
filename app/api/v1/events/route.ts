import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { verifyMerchantApiKey } from "@/lib/api-keys";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        // 1. Authentication
        const headersList = await headers();
        const authHeader = headersList.get("authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json(
                { error: "Missing or invalid Authorization header" },
                { status: 401 }
            );
        }

        const apiKey = authHeader.split(" ")[1];
        const authResult = await verifyMerchantApiKey(apiKey);

        if (!authResult) {
            return NextResponse.json({ error: "Invalid API Key" }, { status: 401 });
        }

        const { merchant } = authResult;

        // 2. Validate Payload
        const body = await req.json();
        const { type, userId, sessionId, source, metadata } = body;

        if (!type) {
            return NextResponse.json(
                { error: "Missing required field: type" },
                { status: 400 }
            );
        }

        // 3. Create Event
        const event = await prisma.analyticsEvent.create({
            data: {
                merchantId: merchant.id,
                type,
                userId: userId || null,
                sessionId: sessionId || null,
                source: source || "direct",
                metadata: metadata || {},
            }
        });

        // 4. Update Aggregated Stats (Optional but good for quick access)
        // We can do this async or periodically, but for now live is fine.
        // If type is purchase, we might rely on the 'orders' endpoint for revenue.
        // This endpoint is for TRAFFIC analytics.

        return NextResponse.json({
            id: event.id,
            status: "success"
        }, { status: 201 });

    } catch (error) {
        console.error("Tracking API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

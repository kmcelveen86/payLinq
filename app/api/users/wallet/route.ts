import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { getUserWalletDataCached } from "@/lib/user-cache";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const walletData = await getUserWalletDataCached(userId);

        // If no wallet data (shouldn't happen for active users), return empty structure or null
        if (!walletData) {
            return NextResponse.json({
                totalPoints: 0,
                pointsThisMonth: 0,
                transactions: []
            });
        }

        return NextResponse.json(walletData);
    } catch (error) {
        console.error("Error fetching wallet data:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

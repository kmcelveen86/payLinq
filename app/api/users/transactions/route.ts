import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { getAllUserTransactionsCached } from "@/lib/user-cache";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const transactions = await getAllUserTransactionsCached(userId);

        return NextResponse.json(transactions);
    } catch (error) {
        console.error("Error fetching user transactions:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}

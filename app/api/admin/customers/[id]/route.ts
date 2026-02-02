import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // await requireRole(["super_admin", "support"]);
        const { id } = await params;

        const user = await prisma.user.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        paylinqTransactions: true,
                        accounts: true,
                        sessions: true,
                    },
                },
                wallet: true, // If they have a wallet
                stripeCustomer: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error("Get User Error:", error);
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}

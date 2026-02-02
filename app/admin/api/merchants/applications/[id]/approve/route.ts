import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, getAdminAuth } from "@/lib/admin-auth";
import { logAdminAction } from "@/lib/audit";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params; // Application ID
        const { userId: adminId, email, role } = await getAdminAuth();

        const application = await prisma.merchantApplication.findUnique({
            where: { id },
        });

        if (!application) {
            return NextResponse.json({ error: "Application not found" }, { status: 404 });
        }

        if (application.status !== "pending" && application.status !== "rejected") {
            return NextResponse.json({ error: "Application is not in a processable state" }, { status: 400 });
        }

        // Parse the Clerk Org ID from the description (temporary hack since we didn't add a field)
        // In a real app, we should add `clerkOrgId` to MerchantApplication. 
        // For now, let's assume the description contains "Clerk Org ID: <id>"
        const clerkOrgIdMatch = application.description?.match(/Clerk Org ID: (.+)/);
        const clerkOrgId = clerkOrgIdMatch ? clerkOrgIdMatch[1] : `manual_${Date.now()}`;

        // Transaction: Create or Update Merchant + Update Application
        const result = await prisma.$transaction(async (tx) => {
            let merchant;

            if (application.merchantId) {
                // 1a. Update existing merchant
                merchant = await tx.merchant.update({
                    where: { id: application.merchantId },
                    data: {
                        status: "active",
                        // Update other fields if necessary, but trust the merchant record primarily
                        // name: application.businessName, // Optional: sync name if desired
                    }
                });
            } else {
                // 1b. Create new merchant (Legacy flow or manual applications)
                merchant = await tx.merchant.create({
                    data: {
                        clerkOrgId: clerkOrgId,
                        name: application.businessName,
                        slug: application.businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                        website: application.website,
                        category: application.category,
                        description: application.description,
                        status: "active",
                    }
                });
            }

            // 2. Update Application
            const updatedApp = await tx.merchantApplication.update({
                where: { id },
                data: {
                    status: "approved",
                    merchantId: merchant.id,
                    reviewedBy: adminId,
                    reviewedAt: new Date(),
                }
            });

            return { merchant, updatedApp };
        });

        // Audit Log
        await logAdminAction({
            adminId: adminId || "unknown",
            adminEmail: email || "unknown",
            adminRole: role || "unknown",
            action: "merchant_application.approve",
            targetType: "merchant_application",
            targetId: id,
            details: { merchantId: result.merchant.id, clerkOrgId },
            ipAddress: req.headers.get("x-forwarded-for")
        });

        return NextResponse.json(result);

    } catch (error) {
        console.error("Approve Application Error:", error);
        return NextResponse.json({ error: "Failed to approve application" }, { status: 500 });
    }
}

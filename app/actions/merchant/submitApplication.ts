"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const applicationSchema = z.object({
    businessName: z.string().min(2, "Business name is required"),
    contactName: z.string().min(2, "Contact name is required"),
    contactEmail: z.string().email("Invalid email address"),
    website: z.string().url("Invalid URL").optional().or(z.literal("")),
    category: z.string().min(1, "Category is required"),
    description: z.string().optional(),
});

export async function submitMerchantApplication(formData: FormData) {
    const { orgId, userId } = await auth();

    if (!orgId || !userId) {
        return { success: false, error: "Unauthorized" };
    }

    const rawData = {
        businessName: formData.get("businessName"),
        contactName: formData.get("contactName"),
        contactEmail: formData.get("contactEmail"),
        website: formData.get("website"),
        category: formData.get("category"),
        description: formData.get("description"),
    };

    const validatedFields = applicationSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            error: "Validation failed",
            issues: validatedFields.error.flatten().fieldErrors,
        };
    }

    const data = validatedFields.data;

    try {
        // 1. Check if merchant already exists for this org
        const existingMerchant = await prisma.merchant.findUnique({
            where: { clerkOrgId: orgId },
        });

        if (existingMerchant) {
            if (existingMerchant.status === "pending") {
                return { success: false, error: "Application already pending." };
            }
            return { success: false, error: "Merchant account already exists." };
        }

        // 2. Create Merchant record with PENDING status
        // We use the data from the form to populate the initial merchant record
        const merchant = await prisma.merchant.create({
            data: {
                clerkOrgId: orgId,
                name: data.businessName,
                status: "pending", // CRITICAL: Mark as pending approval
                website: data.website || null,
                description: data.description || null,
                category: data.category,
                // Default integration settings
                integrationType: "manual",
                commissionRate: 0.05, // Default 5%
            },
        });

        // 3. Create Application Record for Admin Review
        await prisma.merchantApplication.create({
            data: {
                merchantId: merchant.id,
                businessName: data.businessName,
                contactName: data.contactName,
                contactEmail: data.contactEmail,
                website: data.website || "",
                category: data.category,
                description: data.description || null,
                status: "pending",
            },
        });

        // 4. Create Audit Log (using raw Prisma since we might not have the helper here, or import it)
        await prisma.adminAuditLog.create({
            data: {
                adminId: userId, // technically the user applying
                adminEmail: data.contactEmail, // approximate
                adminRole: "merchant_applicant",
                action: "merchant.apply",
                targetType: "merchant",
                targetId: merchant.id,
                details: { applicationData: data }
            }
        });

    } catch (error) {
        console.error("Failed to submit application:", error);
        return { success: false, error: "Database error occurred." };
    }

    revalidatePath("/merchant/dashboard");
    redirect("/merchant/dashboard");
}

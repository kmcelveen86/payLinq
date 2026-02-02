import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

export const getAdminDashboardStats = unstable_cache(
    async () => {
        const [
            totalMerchants,
            totalCustomers,
            totalConversions,
            transactions,
            revenueAggregate,
        ] = await Promise.all([
            prisma.merchant.count(),
            prisma.user.count(),
            prisma.paylinqTransaction.count({ where: { status: "COMPLETED" } }),
            prisma.paylinqTransaction.findMany({
                where: {
                    status: "COMPLETED",
                    createdAt: {
                        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
                    },
                },
                select: {
                    amount: true,
                    createdAt: true,
                },
                orderBy: { createdAt: "asc" },
            }),
            prisma.paylinqTransaction.aggregate({
                where: { status: "COMPLETED" },
                _sum: { amount: true },
            }),
        ]);

        return {
            totalMerchants,
            totalCustomers,
            totalConversions,
            transactions,
            revenueAggregate,
        };
    },
    ["admin-dashboard-stats"],
    { revalidate: 300 } // Cache for 5 minutes
);

type GetAdminMerchantsParams = {
    page: number;
    limit: number;
    search?: string;
    status?: string;
    sort: string;
    order: "asc" | "desc";
};

export const getAdminMerchants = unstable_cache(
    async ({ page, limit, search, status, sort, order }: GetAdminMerchantsParams) => {
        const skip = (page - 1) * limit;

        const where: any = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { contactEmail: { contains: search, mode: "insensitive" } },
            ];
        }
        // if (status) { ... } // Status implementation pending as per original route

        const [total, data] = await Promise.all([
            prisma.merchant.count({ where }),
            prisma.merchant.findMany({
                where,
                take: limit,
                skip,
                orderBy: { [sort]: order },
                include: {
                    _count: {
                        select: { paylinqTransactions: true },
                    },
                },
            }),
        ]);

        return { total, data };
    },
    ["admin-merchants-list"],
    { revalidate: 60 } // Cache for 1 minute (lists change more often)
);

type GetAdminCustomersParams = {
    page: number;
    limit: number;
    search?: string;
    status?: string;
    sort: string;
    order: "asc" | "desc";
};

export const getAdminCustomers = unstable_cache(
    async ({ page, limit, search, status, sort, order }: GetAdminCustomersParams) => {
        const skip = (page - 1) * limit;

        const where: any = {};
        if (search) {
            where.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                { id: { contains: search, mode: "insensitive" } },
            ];
        }

        if (status === "banned") {
            where.banned = true;
        } else if (status === "active") {
            where.banned = false;
        }

        const [total, data] = await Promise.all([
            prisma.user.count({ where }),
            prisma.user.findMany({
                where,
                take: limit,
                skip,
                orderBy: { [sort]: order },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    banned: true,
                    membershipTier: true,
                    _count: {
                        select: {
                            paylinqTransactions: true,
                            accounts: true
                        }
                    }
                }
            }),
        ]);

        return { total, data };
    },
    ["admin-customers-list"],
    { revalidate: 60 }
);

type GetAdminConversionsParams = {
    page: number;
    limit: number;
    search?: string;
    minAmount?: number;
    maxAmount?: number;
    status?: string;
    sort: string;
    order: "asc" | "desc";
};

export const getAdminConversions = unstable_cache(
    async ({ page, limit, search, minAmount, maxAmount, status, sort, order }: GetAdminConversionsParams) => {
        const skip = (page - 1) * limit;

        const where: any = {};
        if (search) {
            where.OR = [
                { user: { email: { contains: search, mode: "insensitive" } } },
                { user: { firstName: { contains: search, mode: "insensitive" } } },
                { user: { lastName: { contains: search, mode: "insensitive" } } },
                { merchant: { name: { contains: search, mode: "insensitive" } } },
                { id: { contains: search, mode: "insensitive" } }
            ];
        }

        if (status) where.status = status;
        if (minAmount !== undefined || maxAmount !== undefined) {
            where.amount = {};
            if (minAmount !== undefined) where.amount.gte = minAmount;
            if (maxAmount !== undefined) where.amount.lte = maxAmount;
        }

        const [total, data] = await Promise.all([
            prisma.paylinqTransaction.count({ where }),
            prisma.paylinqTransaction.findMany({
                where,
                take: limit,
                skip,
                orderBy: { [sort]: order },
                include: {
                    user: {
                        select: {
                            firstName: true,
                            lastName: true,
                            email: true,
                        }
                    },
                    merchant: {
                        select: {
                            name: true,
                        }
                    }
                }
            }),
        ]);

        return { total, data };
    },
    ["admin-conversions-list"],
    { revalidate: 60 }
);

import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";

// Type definitions based on the original function's return structure
type FormattedTransaction = {
    id: string;
    merchant: string;
    date: string;
    amount: number;
    points: number;
    category: string;
    icon: null;
};

type UserWalletData = {
    totalPoints: number;
    pointsThisMonth: number;
    transactions: FormattedTransaction[];
} | null;

export const getUserWalletDataCached = unstable_cache(
    async (userId: string): Promise<UserWalletData> => {
        // 1. Find the user in our DB (search by clerkId first, then id)
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { clerkId: userId },
                    { id: userId }
                ]
            },
            include: {
                wallet: true,
                paylinqTransactions: {
                    take: 10,
                    orderBy: { createdAt: "desc" },
                    include: {
                        merchant: true
                    }
                },
            },
        });

        if (!user || !user.wallet) return null;

        // 2. Format transactions to match dashboard UI expectations
        const formattedTransactions = user.paylinqTransactions.map((tx) => ({
            id: tx.id,
            merchant: tx.merchant.name, // Assuming merchant has a name field
            date: new Date(tx.createdAt).toLocaleDateString(),
            amount: tx.amount / 100, // Convert cents to dollars
            points: tx.uppEarned,
            category: "shopping", // Default for now
            icon: null, // Will be handled by UI
        }));

        // 3. Calculate Points This Month
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

        // We need the internal user.id which we just fetched
        const pointsAggregation = await prisma.paylinqTransaction.aggregate({
            _sum: {
                uppEarned: true
            },
            where: {
                userId: user.id,
                createdAt: {
                    gte: startOfMonth
                }
            }
        });

        return {
            totalPoints: user.wallet.balance,
            pointsThisMonth: pointsAggregation._sum.uppEarned || 0,
            transactions: formattedTransactions,
        };
    },
    ["user-wallet-data"],
    { revalidate: 60 } // Cache for 1 minute
);

export const getAllUserTransactionsCached = unstable_cache(
    async (userId: string) => {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { clerkId: userId },
                    { id: userId }
                ]
            },
            include: {
                paylinqTransactions: {
                    orderBy: { createdAt: "desc" },
                    include: {
                        merchant: true
                    }
                },
            },
        });

        if (!user) return [];

        return user.paylinqTransactions.map((tx) => {
            // Try to extract item name from metadata
            let itemName = "Order";
            if (tx.metadata && typeof tx.metadata === 'object' && !Array.isArray(tx.metadata)) {
                // @ts-ignore
                if (tx.metadata.item_name) itemName = tx.metadata.item_name;
                // @ts-ignore
                else if (tx.metadata.description) itemName = tx.metadata.description;
            }

            return {
                id: tx.id,
                merchant: tx.merchant.name,
                merchantLogo: tx.merchant.logo, // Assuming this field exists or is null
                date: new Date(tx.createdAt).toLocaleDateString("en-US", {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                amount: tx.amount / 100,
                points: tx.uppEarned,
                itemName: itemName,
                status: tx.status,
                category: "shopping" // Placeholder
            };
        });
    },
    ["user-all-transactions"],
    { revalidate: 60 }
);

export const getUserProfileByEmailCached = unstable_cache(
    async (email: string) => {
        return await prisma.user.findUnique({
            where: { email },
            include: {
                notificationPreferences: true,
            },
        });
    },
    ["user-profile-by-email"],
    { revalidate: 300 } // Profile doesn't change often, 5 mins
);

export const getUserNotificationsCached = unstable_cache(
    async (userId: string) => {
        return await prisma.notification.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    },
    ["user-notifications"],
    { revalidate: 60 }
);

import { prisma } from "@/lib/prisma";

/**
 * Ensures a user has a wallet and returns it.
 */
export async function getOrCreateUserWallet(userId: string) {
    let wallet = await prisma.userWallet.findUnique({
        where: { userId },
    });

    if (!wallet) {
        wallet = await prisma.userWallet.create({
            data: {
                userId,
                balance: 0.0,
            },
        });
    }

    return wallet;
}

/**
 * Awards UPP to a user for a transaction.
 * @param userId User ID
 * @param amountUpp Amount of UPP to add
 * @param transactionId Related PaylinqTransaction ID
 * @param description Description for the wallet transaction
 */
export async function awardUpp(
    userId: string,
    amountUpp: number,
    transactionId: string,
    description: string = "Purchase Reward"
) {
    return await prisma.$transaction(async (tx) => {
        // 1. Get Wallet
        const wallet = await tx.userWallet.findUnique({ where: { userId } });

        if (!wallet) {
            throw new Error(`Wallet not found for user ${userId}`);
            // In practice, getOrCreate should be called, but here we assume flow integrity
        }

        // 2. Create Audit Log
        const walletTx = await tx.walletTransaction.create({
            data: {
                walletId: wallet.id,
                amount: amountUpp,
                type: "EARN",
                description,
                paylinqTransactionId: transactionId,
            },
        });

        // 3. Update Balance
        const newBalance = wallet.balance + amountUpp;
        const updatedWallet = await tx.userWallet.update({
            where: { id: wallet.id },
            data: { balance: newBalance },
        });

        return { wallet: updatedWallet, transaction: walletTx };
    });
}

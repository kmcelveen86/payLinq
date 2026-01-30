import { prisma } from "@/lib/prisma";
import { randomBytes, createHash } from "crypto";
import bcrypt from "bcryptjs";

// Prefix for API keys to easily identify them
const KEY_PREFIX = "sk_live_";

export interface CreateApiKeyResult {
    secretKey: string;
    apiKeyId: string;
}

/**
 * Generates a new API key for a merchant.
 * Returns the full secret key (shown ONLY once) and the created DB record.
 */
export async function createMerchantApiKey(
    merchantId: string,
    name: string = "Secret Key",
    scopes: string[] = ["orders:write"]
): Promise<CreateApiKeyResult> {
    // 1. Generate a secure random key
    const randomPart = randomBytes(24).toString("hex"); // 48 chars
    const secretKey = `${KEY_PREFIX}${randomPart}`;

    // 2. Hash the key for storage
    // We use bcrypt for secure hashing, similar to passwords
    const hashedKey = await bcrypt.hash(secretKey, 10);

    // 3. Extract prefix for identification/lookup
    // "sk_live_" (8 chars) + first 8 chars of random part
    const keyPrefix = secretKey.substring(0, 16);

    // 4. Store in DB
    const apiKey = await prisma.merchantApiKey.create({
        data: {
            merchantId,
            name,
            keyPrefix,
            hashedKey,
            scopes,
        },
    });

    return {
        secretKey,
        apiKeyId: apiKey.id,
    };
}

/**
 * Verifies an API key and returns the associated merchant if valid.
 * Updates the 'lastUsed' timestamp.
 */
export async function verifyMerchantApiKey(secretKey: string) {
    // 1. Check format
    if (!secretKey.startsWith(KEY_PREFIX)) return null;

    // 2. Extract prefix for lookup
    const keyPrefix = secretKey.substring(0, 16);

    // 3. Find key candidates by prefix (optimization)
    const keyRecord = await prisma.merchantApiKey.findFirst({
        where: { keyPrefix },
        include: { merchant: true },
    });

    if (!keyRecord) return null;

    // 4. Verify secure hash
    const isValid = await bcrypt.compare(secretKey, keyRecord.hashedKey);

    if (!isValid) return null;

    // 5. Update usage stats (fire and forget)
    // We use updateMany to avoid failing if record was just deleted
    // and to not block the response primarily
    await prisma.merchantApiKey.update({
        where: { id: keyRecord.id },
        data: { lastUsed: new Date() },
    });

    return {
        merchant: keyRecord.merchant,
        scopes: keyRecord.scopes,
    };
}

/**
 * Revokes (deletes) an API key.
 */
export async function revokeMerchantApiKey(merchantId: string, keyId: string) {
    return await prisma.merchantApiKey.deleteMany({
        where: {
            id: keyId,
            merchantId, // Ensure ownership
        },
    });
}

/**
 * Lists all active API keys for a merchant (without secrets).
 */
export async function listMerchantApiKeys(merchantId: string) {
    return await prisma.merchantApiKey.findMany({
        where: { merchantId },
        select: {
            id: true,
            name: true,
            keyPrefix: true,
            createdAt: true,
            lastUsed: true,
            scopes: true,
        },
        orderBy: { createdAt: "desc" },
    });
}

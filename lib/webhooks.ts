import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import axios from "axios";

/**
 * Dispatches a webhook event to all subscribed endpoints for a merchant.
 */
export async function dispatchWebhook(
    merchantId: string,
    event: string,
    payload: any
) {
    // 1. Find subscribers
    const subscribers = await prisma.webhookSubscriber.findMany({
        where: {
            merchantId,
            isActive: true,
            events: { has: event },
        },
    });

    if (subscribers.length === 0) return;

    const timestamp = Math.floor(Date.now() / 1000);
    const payloadString = JSON.stringify(payload);

    // 2. Dispatch to each (in parallel background promises)
    // In a real production app, this should go to a Queue (Redis/BullMQ)
    const promises = subscribers.map(async (sub) => {
        try {
            // 3. Create Signature
            // Stripe-like signature: t=TIMESTAMP,v1=SIGNATURE
            const toSign = `${timestamp}.${payloadString}`;
            const signature = crypto
                .createHmac("sha256", sub.secret)
                .update(toSign)
                .digest("hex");

            const signatureHeader = `t=${timestamp},v1=${signature}`;

            // 4. Send Request
            await axios.post(sub.url, payload, {
                headers: {
                    "Content-Type": "application/json",
                    "PayLinq-Signature": signatureHeader,
                    "PayLinq-Event": event,
                },
                timeout: 5000, // 5s timeout
            });

            console.log(`Webhook sent to ${sub.url} for event ${event}`);
        } catch (error) {
            console.error(
                `Webhook failed to ${sub.url}:`,
                error instanceof Error ? error.message : "Unknown error"
            );
            // TODO: Log failure to DB for retry logic
        }
    });

    // We await all to ensure they are fired, but in Vercel functions 
    // we might need `waitUntil` or simply not await if we want to return response fast.
    // For V1, we await to keep it simple and ensure execution.
    await Promise.allSettled(promises);
}

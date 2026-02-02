
import { createClerkClient } from '@clerk/backend';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local' });

const secretKey = process.env.CLERK_SECRET_KEY;
const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!secretKey) {
    console.error('Error: CLERK_SECRET_KEY not found in environment variables.');
    process.exit(1);
}

const clerkClient = createClerkClient({ secretKey, publishableKey });

const target = process.argv[2];

async function promote() {
    if (!target) {
        console.log("Usage: npx tsx scripts/promote_admin.ts <email_or_user_id>");
        return;
    }

    console.log(`Processing request for: ${target}`);
    let userId = target;

    // If it looks like an email, try to find the user
    if (target.includes('@')) {
        console.log("Searching by email...");
        const list = await clerkClient.users.getUserList({
            emailAddress: [target],
            limit: 1
        });

        if (list.data.length === 0) {
            console.error(`No user found with email: ${target}`);
            process.exit(1);
        }

        userId = list.data[0].id;
        console.log(`Found User ID: ${userId}`);
    }

    // Update metadata
    console.log(`Promoting user ${userId} to super_admin...`);
    await clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: {
            adminRole: "super_admin"
        }
    });

    console.log("✅ Success! The user has been promoted.");
    console.log("Please sign out and sign back in (or wait a few minutes) for the token to refresh.");
}

promote().catch((err) => {
    console.error("Failed to promote user:", err);
    process.exit(1);
});

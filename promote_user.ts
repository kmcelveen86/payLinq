
import fs from "fs";
import path from "path";
import { createClerkClient } from "@clerk/nextjs/server";

// Manually read .env file
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf8");
    envConfig.split("\n").forEach((line) => {
        const [key, value] = line.split("=");
        if (key && value && !key.startsWith("#")) {
            process.env[key.trim()] = value.trim();
        }
    });
}

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

async function main() {
    const email = "davisgreg1@gmail.com";
    console.log(`Checking user: ${email}...`);

    try {
        const userList = await clerkClient.users.getUserList({ emailAddress: [email] });

        if (userList.data.length === 0) {
            console.error("User not found in Clerk");
            return;
        }

        const user = userList.data[0];
        console.log("Current Metadata:", user.publicMetadata);

        if (user.publicMetadata.adminRole === "super_admin") {
            console.log("User is already a Super Admin.");
        } else {
            console.log("Promoting user to Super Admin...");
            await clerkClient.users.updateUser(user.id, {
                publicMetadata: {
                    ...user.publicMetadata,
                    adminRole: "super_admin"
                }
            });
            console.log("User promoted successfully.");
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

main().catch(console.error);

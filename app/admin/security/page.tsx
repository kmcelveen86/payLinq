import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import SecurityLogTable from "./SecurityLogTable";
import { requireRole } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export default async function SecurityPage() {
    await requireRole(["super_admin"]);

    const logs = await prisma.securityLog.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    banned: true,
                }
            }
        }
    });

    return (
        <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 border-b pb-4">
                Security Incidents
            </h1>
            <p className="text-gray-600">
                Monitoring unauthorized access attempts to the Admin Portal.
            </p>

            <SecurityLogTable initialLogs={logs} />
        </div>
    );
}

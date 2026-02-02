import MerchantTabs from "../MerchantTabs";
import Link from "next/link";
import { notFound } from "next/navigation";
import MerchantConversionsTable from "./MerchantConversionsTable";

export default async function MerchantConversionsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { prisma } = await import("@/lib/prisma");

    const merchant = await prisma.merchant.findUnique({
        where: { id },
        select: { id: true, name: true }
    });

    if (!merchant) return notFound();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/merchants" className="text-gray-500 hover:text-gray-900 border rounded px-2 py-1 text-sm">
                        ← Back
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-900">{merchant.name}</h1>
                </div>
            </div>




            <MerchantTabs id={id} />

            <MerchantConversionsTable merchantId={id} />
        </div>
    );
}

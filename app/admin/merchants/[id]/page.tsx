import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StatusBadge } from "../../components/StatusBadge";
import ClientActions from "./ClientActions";
import MerchantTabs from "./MerchantTabs";

// In Next.js 15, params is a Promise
export default async function MerchantDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // We fetch via API within same app (or use Prisma directly in Server Component)
    // Direct Prisma is better for Server Component to avoid partial fetches/API overhead
    // But we built an API, let's use Prisma directly here for full power data fetching
    const { prisma } = await import("@/lib/prisma"); // Dynamic import to avoid build issues if mixed

    const merchant = await prisma.merchant.findUnique({
        where: { id },
        include: {
            _count: {
                select: {
                    paylinqTransactions: true,
                    offers: true,
                },
            },
            analytics: true
        }
    });

    if (!merchant) return notFound();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <Link href="/merchants" className="text-gray-500 hover:text-gray-900 border rounded px-3 py-1.5 text-sm w-fit self-start bg-white whitespace-nowrap inline-flex items-center gap-2 hover:bg-gray-50">
                        <ArrowLeft size={16} /> Back
                    </Link>
                    <div className="flex flex-wrap items-center gap-2">
                        <h1 className="text-xl md:text-2xl font-bold text-gray-900 break-words">{merchant.name}</h1>
                        <StatusBadge status={merchant.status} />
                    </div>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <ClientActions merchant={merchant} />
                </div>
            </div>


            {/* Tabs */}
            <MerchantTabs id={id} />


            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Business Details</h3>
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Website</dt>
                                <dd className="mt-1 text-sm text-gray-900">{merchant.website || "N/A"}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Category</dt>
                                <dd className="mt-1 text-sm text-gray-900">{merchant.category || "Uncategorized"}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Presence</dt>
                                <dd className="mt-1 text-sm text-gray-900">{merchant.presence}</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Platform Stats</h3>
                        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-gray-50 p-4 rounded text-center">
                                <dt className="text-xs font-semibold text-gray-500 uppercase">Total Conversions</dt>
                                <dd className="mt-1 text-2xl font-bold text-gray-900">{merchant._count.paylinqTransactions}</dd>
                            </div>
                            <div className="bg-gray-50 p-4 rounded text-center">
                                <dt className="text-xs font-semibold text-gray-500 uppercase">Active Offers</dt>
                                <dd className="mt-1 text-2xl font-bold text-gray-900">{merchant._count.offers}</dd>
                            </div>
                            <div className="bg-gray-50 p-4 rounded text-center">
                                <dt className="text-xs font-semibold text-gray-500 uppercase">Revenue Tracked</dt>
                                <dd className="mt-1 text-2xl font-bold text-gray-900">${merchant.analytics?.totalRevenue?.toFixed(2) || "0.00"}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Sidebar settings */}
                <div className="space-y-6">
                    <div className="bg-white shadow rounded-lg p-6 border-l-4 border-blue-500">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Commission Rate</h3>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-gray-900">{((merchant.commissionRate || 0) * 100).toFixed(0)}%</span>
                            <span className="text-sm text-gray-500">of base UPP</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            This determines how many points users earn per dollar spent.
                        </p>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">System Info</h3>
                        <dl className="space-y-3">
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">Merchant ID</dt>
                                <dd className="text-sm font-mono text-gray-900">{merchant.id}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">Created</dt>
                                <dd className="text-sm text-gray-900">{merchant.createdAt.toLocaleDateString()}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}

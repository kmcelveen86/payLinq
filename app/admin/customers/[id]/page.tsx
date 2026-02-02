import Link from "next/link";
import { notFound } from "next/navigation";
import ClientCustomerActions from "./ClientCustomerActions";

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const { prisma } = await import("@/lib/prisma");

    const user = await prisma.user.findUnique({
        where: { id },
        include: {
            _count: {
                select: {
                    paylinqTransactions: true,
                    accounts: true,
                },
            },
            wallet: true,
        }
    });

    if (!user) return notFound();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/customers" className="text-gray-500 hover:text-gray-900 border rounded px-2 py-1 text-sm bg-white shrink-0">
                        ← Back
                    </Link>
                    <div className="min-w-0">
                        <h1 className="text-2xl font-bold text-gray-900 truncate">{user.name || "Unnamed User"}</h1>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                    </div>
                    {user.banned && (
                        <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded text-xs font-bold uppercase shrink-0">Banned</span>
                    )}
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                    <ClientCustomerActions user={user} />
                </div>
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Profile</h3>
                        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                                <dd className="mt-1 text-sm text-gray-900">{user.name || "-"}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Email</dt>
                                <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Membership Tier</dt>
                                <dd className="mt-1 text-sm text-gray-900 capitalize">{user.membershipTier || "Free"}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                <dd className="mt-1 text-sm text-gray-900">{user.phoneNumber || "-"}</dd>
                            </div>
                        </dl>
                    </div>

                    {user.banned && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                            <h3 className="text-lg font-medium text-red-800 mb-2">Ban Information</h3>
                            <p className="text-sm text-red-700"><strong>Reason:</strong> {user.bannedReason}</p>
                            <p className="text-sm text-red-700"><strong>Date:</strong> {user.bannedAt ? new Date(user.bannedAt).toLocaleString() : "-"}</p>
                        </div>
                    )}

                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Stats</h3>
                        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="bg-gray-50 p-4 rounded text-center">
                                <dt className="text-xs font-semibold text-gray-500 uppercase">Transactions</dt>
                                <dd className="mt-1 text-2xl font-bold text-gray-900">{user._count.paylinqTransactions}</dd>
                            </div>
                            <div className="bg-gray-50 p-4 rounded text-center">
                                <dt className="text-xs font-semibold text-gray-500 uppercase">Linked Accounts</dt>
                                <dd className="mt-1 text-2xl font-bold text-gray-900">{user._count.accounts}</dd>
                            </div>
                            <div className="bg-gray-50 p-4 rounded text-center">
                                <dt className="text-xs font-semibold text-gray-500 uppercase">Wallet Balance</dt>
                                {/* Assuming wallet logic, placeholder for now */}
                                <dd className="mt-1 text-2xl font-bold text-gray-900">{user.wallet ? "$0.00" : "N/A"}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* Sidebar settings */}
                <div className="space-y-6">
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">System Info</h3>
                        <dl className="space-y-3">
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">User ID</dt>
                                <dd className="text-sm font-mono text-gray-900">{user.id}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">Clerk ID</dt>
                                <dd className="text-sm font-mono text-gray-900">{user.clerkId || "-"}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">Stripe Customer</dt>
                                <dd className="text-sm font-mono text-gray-900">{user.stripeCustomerId || "-"}</dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-sm text-gray-500">Joined</dt>
                                <dd className="text-sm text-gray-900">{user.createdAt.toLocaleDateString()}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { SuspendMerchantModal, UpdateRateModal } from "../../components/ActionModals";
import { PERMISSIONS, AdminRole } from "@/lib/admin-permissions";

export default function ClientActions({ merchant }: { merchant: any }) {
    const { user } = useUser();
    const [showSuspend, setShowSuspend] = useState(false);
    const [showRate, setShowRate] = useState(false);

    const role = user?.publicMetadata?.adminRole as AdminRole | undefined;
    const canManageMerchants = role && PERMISSIONS.MANAGE_MERCHANTS.includes(role);
    const canManageRates = role && PERMISSIONS.MANAGE_RATES.includes(role);

    return (
        <>
            {canManageRates && (
                <button
                    onClick={() => setShowRate(true)}
                    className="flex-1 md:flex-none px-3 py-1.5 border border-gray-300 bg-white text-gray-700 rounded hover:bg-gray-50 text-sm font-medium whitespace-nowrap"
                >
                    Edit Rate
                </button>
            )}

            {canManageMerchants && (
                merchant.status === "suspended" ? (
                    <button
                        onClick={() => setShowSuspend(true)}
                        className="flex-1 md:flex-none px-3 py-1.5 bg-green-600 text-white rounded hover:bg-green-700 text-sm font-medium whitespace-nowrap"
                    >
                        Unsuspend
                    </button>
                ) : (
                    <button
                        onClick={() => setShowSuspend(true)}
                        className="flex-1 md:flex-none px-3 py-1.5 border border-red-200 text-red-600 hover:bg-red-50 rounded text-sm font-medium whitespace-nowrap"
                    >
                        Suspend
                    </button>
                )
            )}

            <SuspendMerchantModal
                isOpen={showSuspend}
                onClose={() => setShowSuspend(false)}
                merchantId={merchant.id}
                currentStatus={merchant.status || "active"}
            />

            <UpdateRateModal
                isOpen={showRate}
                onClose={() => setShowRate(false)}
                merchantId={merchant.id}
                currentRate={merchant.commissionRate || 0}
            />
        </>
    );
}

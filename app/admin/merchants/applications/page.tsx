import React, { Suspense } from "react";
import ApplicationsList from "./ApplicationsList";
import Link from "next/link";

export default function MerchantApplicationsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/merchants" className="text-gray-500 hover:text-gray-900 border rounded px-2 py-1 text-sm">
                        ← Back to Merchants
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Merchant Applications</h1>
                </div>
            </div>

            <Suspense fallback={<div>Loading list...</div>}>
                <ApplicationsList />
            </Suspense>
        </div>
    );
}

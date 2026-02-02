import React, { Suspense } from "react";
import ApplicationsList from "./ApplicationsList";
import Link from "next/link";

export default function MerchantApplicationsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <Link href="/merchants" className="text-gray-500 hover:text-gray-900 border rounded px-3 py-1.5 text-sm bg-white w-fit">
                        ← Back to Merchants
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Merchant Applications</h1>
                </div>
            </div>

            <Suspense fallback={<div>Loading list...</div>}>
                <ApplicationsList />
            </Suspense>
        </div>
    );
}

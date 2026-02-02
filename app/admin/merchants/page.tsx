import MerchantsTable from "./MerchantsTable";
import Link from "next/link";

export default function MerchantsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Merchants</h1>
                <Link
                    href="/merchants/applications"
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium text-sm md:text-base whitespace-nowrap"
                >
                    View Applications
                </Link>
            </div>

            <MerchantsTable />
        </div>
    );
}

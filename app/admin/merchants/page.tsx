import MerchantsTable from "./MerchantsTable";
import Link from "next/link";

export default function MerchantsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">Merchants</h1>
                <Link
                    href="/merchants/applications"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
                >
                    View Applications
                </Link>
            </div>

            <MerchantsTable />
        </div>
    );
}

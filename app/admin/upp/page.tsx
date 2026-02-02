import UppTable from "./UppTable";

export default function UppPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">UPP Ledger</h1>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium opacity-50 cursor-not-allowed" title="Use Manual Adjustment endpoint via Curl for now">
                    Manual Adjustment
                </button>
            </div>

            <UppTable />
        </div>
    );
}

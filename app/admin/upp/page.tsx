import UppTable from "./UppTable";

export default function UppPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">UPP Ledger</h1>
                <button className="px-4 py-2 bg-blue-400 text-white rounded font-medium cursor-not-allowed w-full md:w-auto shadow-none" disabled title="Use Manual Adjustment endpoint via Curl for now">
                    Manual Adjustment
                </button>
            </div>

            <UppTable />
        </div>
    );
}

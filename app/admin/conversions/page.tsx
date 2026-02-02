import ConversionsTable from "./ConversionsTable";

export default function ConversionsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Conversion Review</h1>
            <p className="text-gray-600">Review all recent conversions and transactions across the platform.</p>
            <ConversionsTable />
        </div>
    );
}

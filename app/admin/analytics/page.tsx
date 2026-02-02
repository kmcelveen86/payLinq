import AnalyticsDashboard from "./AnalyticsDashboard";

export default function AnalyticsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Global Analytics</h1>
            <AnalyticsDashboard />
        </div>
    );
}

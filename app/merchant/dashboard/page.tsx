import { auth, currentUser } from "@clerk/nextjs/server";
import { Box } from "@mui/material";
import { getFavoriteAnalytics } from "@/app/actions/merchant/getFavoriteAnalytics";
import { FavoritesChart } from "@/components/Merchant/Dashboard/FavoritesChart";

export default async function MerchantDashboardPage() {
    const { orgId } = await auth();
    // In a real app, we would fetch the Merchant details from our DB using the orgId

    const analyticsResult = await getFavoriteAnalytics();
    const analyticsData = analyticsResult.success && analyticsResult.data ? analyticsResult.data : [];
    const totalFavorites = analyticsResult.success && analyticsResult.total ? analyticsResult.total : 0;

    return (
        <Box className="p-6 md:p-10">
            <h1 className="text-3xl font-bold mb-6">Merchant Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
                    <h2 className="text-lg font-semibold mb-2 text-muted-foreground">Organization ID</h2>
                    <code className="bg-secondary p-2 rounded text-sm block overflow-x-auto">
                        {orgId}
                    </code>
                </div>
                <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
                    <h2 className="text-lg font-semibold mb-2 text-muted-foreground">Status</h2>
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                        <span className="font-medium">Active</span>
                    </div>
                </div>
            </div>

            <FavoritesChart data={analyticsData} total={totalFavorites} />
        </Box>
    );
}

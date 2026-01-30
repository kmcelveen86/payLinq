import { auth, currentUser } from "@clerk/nextjs/server";
import { Box } from "@mui/material";
import { getFavoriteAnalytics } from "@/app/actions/merchant/getFavoriteAnalytics";
import { FavoritesChart } from "@/components/Merchant/Dashboard/FavoritesChart";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { MockSalesChart } from "@/components/Merchant/Dashboard/MockSalesChart";
import { MockOfferStats } from "@/components/Merchant/Dashboard/MockOfferStats";
import { MockCustomerInsights } from "@/components/Merchant/Dashboard/MockCustomerInsights";
import { AcquisitionFunnel } from "@/components/Merchant/Dashboard/Analytics/AcquisitionFunnel";
import { TransactionInsights } from "@/components/Merchant/Dashboard/Analytics/TransactionInsights";
import { UPPMetrics } from "@/components/Merchant/Dashboard/Analytics/UPPMetrics";
import { BusinessImpact } from "@/components/Merchant/Dashboard/Analytics/BusinessImpact";

export default async function MerchantDashboardPage() {
    const { orgId } = await auth();

    if (!orgId) redirect("/");

    const merchant = await prisma.merchant.findUnique({
        where: {
            clerkOrgId: orgId,
        },
    });

    if (!merchant) {
        // If the org exists in Clerk but not in our DB, they need to onboard
        redirect("/merchant/onboarding");
    }

    const analyticsResult = await getFavoriteAnalytics();
    const analyticsData = analyticsResult.success && analyticsResult.data ? analyticsResult.data : [];
    const totalFavorites = analyticsResult.success && analyticsResult.total ? analyticsResult.total : 0;

    return (
        <Box className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
            <div className="">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-2">Welcome back to {merchant.name}</p>
            </div>

            {/* Row 1: Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
                    <h2 className="text-sm font-medium mb-2 text-muted-foreground">Integration</h2>
                    <div className="flex items-center gap-2">
                        <span className="capitalize font-semibold text-lg">{merchant.integrationType || "Manual"}</span>
                    </div>
                </div>
                <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
                    <h2 className="text-sm font-medium mb-2 text-muted-foreground">Status</h2>
                    <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse"></span>
                        <span className="font-semibold text-lg">Active</span>
                    </div>
                </div>
                <div className="p-6 rounded-2xl border border-border bg-card shadow-sm">
                    <h2 className="text-sm font-medium mb-2 text-muted-foreground">Total Favorites</h2>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-2xl">{totalFavorites}</span>
                    </div>
                </div>
            </div>

            {/* Row 2: Sales & Offers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MockSalesChart />
                <MockOfferStats />
            </div>

            {/* Row 3: Favorites & Customers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FavoritesChart data={analyticsData} total={totalFavorites} />
                <MockCustomerInsights />
            </div>

            {/* Row 4: Growth & ROI */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AcquisitionFunnel />
                <BusinessImpact />
            </div>

            {/* Row 5: Deep Dive */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <TransactionInsights />
                <UPPMetrics />
            </div>
        </Box>
    );
}

import {
  LifeDeserveSection,
  WhyChoosePaylinq,
  HowItWorks,
  MembershipSection,
  FAQSection,
  MembershipTiersOnHomePage,
} from "@/components/Home/";
import TopNavComp from "@/components/TopNav/TopNavComp";
import PaylinqFooter from "@/components/PaylinqFooter";
import { Box } from "@mui/material";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import MarketplaceWrapper from "@/components/MarketplaceWrapper";

export default async function HomePage() {
  const { userId } = await auth();
  let showMarketplace = false;

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { membershipTier: true },
    });
    if (user?.membershipTier) {
      showMarketplace = true;
    }
  }

  if (showMarketplace) {
    return (
      <Box className="bg-background min-h-screen">
        <TopNavComp />
        <MarketplaceWrapper />
      </Box>
    );
  }

  return (
    <Box className="bg-black p-0 w-full">
      <TopNavComp />
      <LifeDeserveSection />
      <MembershipTiersOnHomePage />
      <HowItWorks />
      <MembershipSection />
      <FAQSection />
      <PaylinqFooter />
    </Box>
  );
}

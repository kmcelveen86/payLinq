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
import { Box, Button, Typography, useMediaQuery, Link } from "@mui/material";
import TopNav from "@/components/TopNav";
// import { useAuth, useSession, useUser } from "@clerk/nextjs";

export default async function HomePage() {
  // const { isLoaded, session, isSignedIn } = useSession();
  // const clerkUser = useUser();
  // const clerkAuth = useAuth();
  // console.log("🚀 ~ TopNavComp ~ authclerk:", clerkAuth);
  // console.log("🚀 ~ TopNavComp ~ userclerk:", clerkUser);
  // const email = clerkUser?.primaryEmailAddress?.emailAddress;
  // const session = await auth();
  // const user = session?.user?.email;

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

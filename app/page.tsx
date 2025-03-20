import React from "react";
import {
  LifeDeserveSection,
  WhyChoosePaylinq,
  HowItWorks,
  MembershipSection,
  FAQSection,
  MembershipTiers
} from "@/components/Home/";
import TopNavComp from "@/components/TopNav/TopNavComp";
import { auth, signIn, signOut } from "@/auth";
import { Box, Button, Typography, useMediaQuery, Link } from "@mui/material";
import HamburgerMenu from "@/components/HamburgerMenu";
import TopNav from "@/components/TopNav";

export default async function HomePage() {
  const session = await auth();
  const user = session?.user?.email;

  return (
    <Box className="bg-black p-0 w-full">
      <HamburgerMenu />
      <TopNavComp />
      <LifeDeserveSection />
      <MembershipTiers />
      {/* <WhyChoosePaylinq /> */}
      <HowItWorks />
      <MembershipSection />
      <FAQSection />
    </Box>
  );
}

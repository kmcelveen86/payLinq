import HamburgerMenu from "@/components/HamburgerMenu";
import TopNavComp from "@/components/TopNav/TopNavComp";
import React from 'react'

export default function PricingPage() {
  return (
    <div>
      <HamburgerMenu />
      <TopNavComp />
      <div className="mt-20">Pricing here</div>
    </div>
  );
}

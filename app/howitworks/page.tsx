import HamburgerMenu from "@/components/HamburgerMenu";
import TopNavComp from "@/components/TopNav/TopNavComp";
import React from 'react'

export default function HowItWorksPage() {
  return (
    <div>
      <HamburgerMenu />
      <TopNavComp />
      <div className="mt-20">How it works here</div>
    </div>
  );
}

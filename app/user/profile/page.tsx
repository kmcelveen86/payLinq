import HamburgerMenu from "@/components/HamburgerMenu";
import TopNavComp from "@/components/TopNav/TopNavComp";
import React from "react";

export default async function Profile() {
  return (
    <div>
      <HamburgerMenu />
      <TopNavComp />
      <div className="mt-20">Profile here</div>
    </div>
  );
}

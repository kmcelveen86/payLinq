import HamburgerMenu from "@/components/HamburgerMenu";
import TopNavComp from "@/components/TopNav/TopNavComp";
import React from "react";

export default async function DashBoard() {
  return (
    <div>
      <HamburgerMenu />
      <TopNavComp />
      <div className="mt-20">Dashboard here</div>
    </div>
  );
}

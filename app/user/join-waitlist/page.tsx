import React from "react";
import TopNavComp from "@/components/TopNav/TopNavComp";
import { Waitlist } from "@clerk/nextjs";

export default async function JoinWaitList() {
  return (
    <>
      <TopNavComp />
      <div className="bg-gray-100 h-screen flex flex-col align-center items-center justify-center m-auto">
        <Waitlist />
      </div>
    </>
  );
}

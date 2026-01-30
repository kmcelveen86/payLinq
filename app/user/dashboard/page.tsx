
import React from "react";
import PaylinqDashboard from "@/components/PaylinqDashboard";
import { getUserWalletData } from "@/app/actions/user";

export default async function DashBoard() {
  const walletData = await getUserWalletData();

  return (
    <div>
      <PaylinqDashboard initialWalletData={walletData} />
    </div>
  );
}

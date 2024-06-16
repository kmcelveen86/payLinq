import React from "react";
import Home from "@/components/Home/";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export default async function HomePage() {
  // const session = await getServerSession(authOptions);
  return (
    <>
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      <Home />
    </>
  );
}

import TopNavComp from "@/components/TopNav/TopNavComp";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "How It Works - Paylinq",
  description: "Paylinq - How it works, features, and benefits.",
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopNavComp />
      {children}
    </>
  );
}

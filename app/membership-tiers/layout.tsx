import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Membership Tiers - Paylinq",
  description: "Paylinq - Membership Tiers and features.",
};

export default function MembershipTierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

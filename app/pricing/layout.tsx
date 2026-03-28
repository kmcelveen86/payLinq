import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Pricing - Paylinq",
  description: "Paylinq - Pricing plans and features.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}

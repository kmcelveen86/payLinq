import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Pricing - PayLinq",
  description: "PayLinq - Pricing plans and features.",
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

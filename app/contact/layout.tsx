import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Contact | PayLinq",
  description: "Get in touch with PayLinq for all your payment processing needs.",
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

import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Contact | Paylinq",
  description: "Get in touch with Paylinq for all your payment processing needs.",
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

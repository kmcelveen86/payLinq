import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign In page for Paylinq application",
};

export default function SignInLayout({
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
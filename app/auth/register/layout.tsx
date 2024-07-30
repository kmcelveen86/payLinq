import type { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Register",
  description: "Registration page for Paylinq application",
};

export default function SignUpLayout({
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

import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter } from "next/font/google";
import Provider from "./Provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PayLinq",
  description: "Official Paylinq website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </Provider>
      </body>
    </html>
  );
}

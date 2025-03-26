import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import { Inter, Taviraj, Prompt } from "next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryProvider from "./ReactQueryProvider";
import LoadingComp from "@/components/LoadingComp";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const taviraj = Taviraj({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
const prompt = Prompt({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

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
    <html
      lang="en"
      className={`${inter.className} ${taviraj.className} ${prompt.className}`}
    >
      <body>
        <ClerkProvider waitlistUrl="/user/join-waitlist">
            <ReactQueryProvider>
              <ReactQueryDevtools />
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </ReactQueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

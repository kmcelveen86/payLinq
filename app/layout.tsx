import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Taviraj, Prompt } from "next/font/google";
import Provider from "./Provider";
import LoadingComp from "@/components/LoadingComp";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const taviraj = Taviraj({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
})
const prompt = Prompt({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
})

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
    <html lang="en" className={`${inter.className} ${taviraj.className} ${prompt.className}`}>
      <body>
        <Provider>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </Provider>
      </body>
    </html>
  );
}

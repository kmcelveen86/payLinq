import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { dark } from "@clerk/themes";
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
        <ClerkProvider
          waitlistUrl="/user/join-waitlist"
          appearance={{
            baseTheme: dark,
          }}
        >
          <ReactQueryProvider>
            <ReactQueryDevtools />
            <Suspense fallback={<div>Loading...</div>}>
              <Toaster
                position="bottom-center"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: "#1F2937", // Solid dark background
                    color: "#F3F4F6", // Light text color
                    border: "1px solid #374151",
                    borderRadius: "0.75rem",
                    padding: "12px 16px",
                    boxShadow:
                      "0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.4)",
                  },
                  success: {
                    style: {
                      background: "#0F2816", // Dark green solid background
                      border: "1px solid #2D9642",
                    },
                    iconTheme: {
                      primary: "#2D9642",
                      secondary: "#F3F4F6",
                    },
                  },
                  error: {
                    style: {
                      background: "#2C0F0F", // Dark red solid background
                      border: "1px solid #EF4444",
                    },
                    iconTheme: {
                      primary: "#EF4444",
                      secondary: "#F3F4F6",
                    },
                  },
                  loading: {
                    style: {
                      background: "#1F2937", // Solid dark background
                      border: "1px solid #4B5563",
                    },
                  },
                  custom: {
                    style: {
                      background: "#2A1F0F", // Dark amber solid background
                      border: "1px solid #C28F49",
                    },
                    iconTheme: {
                      primary: "#C28F49",
                      secondary: "#F3F4F6",
                    },
                  },
                }}
              />
              {children}
            </Suspense>
          </ReactQueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

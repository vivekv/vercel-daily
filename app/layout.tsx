import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SubscriptionProvider } from "@/components/subscription-provider";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

//Root Metadata for the entire app, can be overridden by individual pages if needed
export const metadata: Metadata = {
  title: "Vercel Daily",
  description: "Your daily source of news and updates from Vercel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SubscriptionProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Suspense>
            <Footer />
          </Suspense>
        </SubscriptionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

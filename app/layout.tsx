import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Next-gen marketplace | Ownie",
  description:
    "Next-gen marketplace, connecting buyers & builders. Buy once, own forever.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#FAF9F5]">
        {children}
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');`}</style>
      </body>
      <Script src="https://www.consentify.app/api/gateway?token=ddf97962-0d8b-4c27-9e1b-ab70d6dfc25d"></Script>
      <Analytics />
    </html>
  );
}

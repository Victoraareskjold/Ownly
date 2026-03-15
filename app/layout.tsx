import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import WishlistPage from "./(wishlist)/wishlist/page";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Ownie | Next-gen marketplace",
  description:
    "Next-gen marketplace, connecting buyers & builders. Buy once, own forever.",
};

// HUSK Å FJERNE ASYNC
// TODO
// HUSK Å FJERNE ASYNC
// TODO

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const invite = (await cookies()).get("ownie_invite");

  if (process.env.NEXT_PUBLIC_MODE === "wishlist" && !invite) {
    return <WishlistPage />;
  }

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

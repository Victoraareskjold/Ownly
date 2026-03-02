import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../globals.css";

export default function MarketplaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div
        className="pointer-events-none -z-10 fixed inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(#D4D0C8 1px, transparent 1px), linear-gradient(90deg, #D4D0C8 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      <main className="min-h-screen">
        <Navbar />
        {children}
        <Footer />
      </main>
    </>
  );
}

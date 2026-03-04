import { createClient } from "@/lib/supabase/server";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../globals.css";

export default async function MarketplaceLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col h-dvh">
      <Navbar user={user} />
      <main className="flex-1 overflow-y-scroll relative">
        <div
          className="pointer-events-none -z-10 fixed inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `linear-gradient(#D4D0C8 1px, transparent 1px), linear-gradient(90deg, #D4D0C8 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        {children}
      </main>
      <Footer />
    </div>
  );
}

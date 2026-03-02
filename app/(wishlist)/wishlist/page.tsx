"use client";

import AcceptingSellersBadge from "@/app/components/wishlist/AcceptingSellersBadge";
import EmailForm from "@/app/components/wishlist/EmailForm";
import { CodeIcon, ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function WishlistPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    try {
      const res = await fetch("/api/wishlist/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Failed to subscribe:", err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div
        className="pointer-events-none -z-10 fixed inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(#D4D0C8 1px, transparent 1px), linear-gradient(90deg, #D4D0C8 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      {/* Ambient glow */}
      <div className="pointer-events-none fixed top-[-10%] right-[20%] w-[500px] h-[500px] rounded-full bg-[#2D5BE3] opacity-[0.05] blur-[100px]" />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 md:px-16">
        <span className="font-medium text-2xl tracking-tight text-[#1A1A1A]">
          own<span className="text-[#2D5BE3]">ie</span>
        </span>
        <a
          href="https://x.com/ownieapp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1A1A1A]/30 hover:text-[#1A1A1A] transition-colors duration-200"
          aria-label="Follow on X/Twitter"
        >
          <XIcon />
        </a>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center pt-16">
        <AcceptingSellersBadge />

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6 max-w-6xl text-[#1A1A1A]"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          Stop renting <span className="italic text-[#2D5BE3]"> your </span>
          software.
        </h1>

        {/* Subheadline */}
        <p className="text-[#1A1A1A]/50 text-lg md:text-xl max-w-2xl mb-4 leading-relaxed font-light">
          A curated marketplace of complete, self-hosted alternatives to
          expensive SaaS tools. Buy once. Own the code. Pay nothing monthly.
        </p>

        {/* Teaser */}
        <p className="text-[#1A1A1A]/65 text-sm mb-12 tracking-wide">
          Replace HubSpot. Replace Monday. Replace Notion. Forever.
        </p>

        <EmailForm
          submitted={submitted}
          handleSubmit={handleSubmit}
          email={email}
          setEmail={setEmail}
          focused={focused}
          setFocused={setFocused}
          loading={loading}
        />
      </section>

      {/* How does it work */}
      <section className="relative z-10 w-full max-w-6xl py-20 mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How Ownie works</h2>
          <p className="text-[#1A1A1A]/40">
            The next-gen marketplace, connecting builders with buyers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* For Buyers */}
          <div className="space-y-8 p-8 bg-white rounded-2xl border border-[#1A1A1A]/[0.05] shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#2D5BE3]/10 flex items-center justify-center">
                <ShoppingCart className="text-[#2D5BE3] w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">For Buyers</h3>
            </div>

            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="text-[#2D5BE3] font-mono font-bold">01.</span>
                <p className="text-sm text-[#1A1A1A]/60 leading-relaxed">
                  <strong className="text-[#1A1A1A] block">
                    Discover Alternatives
                  </strong>
                  Browse curated replacements for HubSpot, Monday, and Notion.
                  Filter by features and technical requirements.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="text-[#2D5BE3] font-mono font-bold">02.</span>
                <p className="text-sm text-[#1A1A1A]/60 leading-relaxed">
                  <strong className="text-[#1A1A1A] block">
                    Pick Your Stack
                  </strong>
                  Choose software that fits your existing infrastructure
                  (Docker, Vercel, Supabase). Setup help is often included.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="text-[#2D5BE3] font-mono font-bold">03.</span>
                <p className="text-sm text-[#1A1A1A]/60 leading-relaxed">
                  <strong className="text-[#1A1A1A] block">
                    Full Ownership
                  </strong>
                  Pay once, get the source code, and gain full control over your
                  data. No more price hikes or subscriptions.
                </p>
              </li>
            </ul>
          </div>

          {/* For Sellers */}
          <div className="space-y-8 p-8 bg-[#1A1A1A] text-white rounded-2xl shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                <CodeIcon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">For Sellers</h3>
            </div>

            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="text-[#2D5BE3] font-mono font-bold">01.</span>
                <p className="text-sm text-white/60 leading-relaxed">
                  <strong className="text-white block">
                    Professional Onboarding
                  </strong>
                  Register as an individual developer or a team. Build trust
                  through our verified sales process.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="text-[#2D5BE3] font-mono font-bold">02.</span>
                <p className="text-sm text-white/60 leading-relaxed">
                  <strong className="text-white block">
                    Ship Complete Products
                  </strong>
                  Set your own price, describe your product, and provide clear
                  documentation to help buyers scale.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="text-[#2D5BE3] font-mono font-bold">03.</span>
                <p className="text-sm text-white/60 leading-relaxed">
                  <strong className="text-white block">Brand Ownership</strong>
                  Use your product page to showcase your quality and expertise.
                  Reach customers actively looking to &quot;buy once.&quot;
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#1A1A1A]/[0.07] px-8 py-6 md:px-16 flex items-center justify-between bg-[#F7F5F0]">
        <span className="text-[#1A1A1A]/25 text-xs">© 2026 Ownie</span>
        <a
          href="https://x.com/ownieapp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1A1A1A]/25 hover:text-[#1A1A1A]/60 transition-colors text-xs flex items-center gap-1.5"
        >
          <XIcon size={12} />
          @Ownie
        </a>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
      `}</style>
    </div>
  );
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

"use client";

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
    <main className="min-h-screen text-[#1A1A1A] overflow-hidden relative flex flex-col">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.4]"
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
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-[#1A1A1A]/10 bg-white rounded-full px-4 py-1.5 mb-10 text-xs text-[#1A1A1A]/40 tracking-widest uppercase shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2D5BE3] animate-pulse" />
          Now accepting sellers
        </div>

        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6 max-w-4xl text-[#1A1A1A]"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          Stop renting
          <br />
          <span className="italic text-[#2D5BE3]">your software.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-[#1A1A1A]/50 text-lg md:text-xl max-w-lg mb-4 leading-relaxed font-light">
          A curated marketplace of complete, self-hosted alternatives to
          expensive SaaS tools. Buy once. Own the code. Pay nothing monthly.
        </p>

        {/* Teaser */}
        <p className="text-[#1A1A1A]/25 text-sm mb-12 tracking-wide">
          Replace HubSpot. Replace Monday. Replace Notion. Forever.
        </p>

        {/* Email form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div
              className={`flex flex-col md:flex-row border rounded-xl overflow-hidden transition-all duration-300 shadow-sm ${
                focused
                  ? "border-[#2D5BE3]/50 bg-white shadow-[0_0_0_4px_rgba(45,91,227,0.08)]"
                  : "border-[#1A1A1A]/12 bg-white"
              }`}
            >
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                required
                className="flex-1 bg-transparent px-5 py-4 text-[#1A1A1A] placeholder-[#1A1A1A]/25 outline-none text-sm"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-4 bg-[#1A1A1A] text-white font-semibold text-sm tracking-tight hover:bg-[#2D5BE3] active:scale-95 transition-all duration-200 whitespace-nowrap"
              >
                Get early access
              </button>
            </div>
            <p className="text-[#1A1A1A]/25 text-xs mt-3">
              No spam. We&apos;ll let you know when we launch.
            </p>
          </form>
        ) : (
          <div className="w-full max-w-md border border-[#2D5BE3]/20 bg-[#2D5BE3]/5 rounded-xl px-6 py-5 text-center">
            <p className="text-[#2D5BE3] font-semibold text-sm mb-1">
              ✓ You&apos;re on the list
            </p>
            <p className="text-[#1A1A1A]/40 text-xs">
              We&apos;ll reach out with news about Ownie.
            </p>
          </div>
        )}

        {/* Value props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mt-20 w-full">
          {[
            {
              label: "Buy once",
              desc: "No subscriptions, ever. Pay a one-time fee and own the code.",
            },
            {
              label: "Self-host",
              desc: "Deploy on your own infra or Vercel/Supabase. Your data, always.",
            },
            {
              label: "Updates included",
              desc: "Sellers commit to bugfixes and updates for all buyers.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="border border-[#1A1A1A]/[0.07] bg-white rounded-xl p-5 text-left hover:border-[#2D5BE3]/30 hover:shadow-md transition-all duration-300 shadow-sm"
            >
              <p className="text-[#1A1A1A] font-semibold text-sm mb-2">
                {item.label}
              </p>
              <p className="text-[#1A1A1A]/40 text-xs leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How does it work */}
      <section className="relative z-10 w-full max-w-6xl py-20 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How Ownly works</h2>
          <p className="text-[#1A1A1A]/40">
            A transparent model for both buyers and builders.
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
    </main>
  );
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

"use client";

import AcceptingSellersBadge from "@/app/components/wishlist/AcceptingSellersBadge";
import EmailForm from "@/app/components/wishlist/EmailForm";
import {
  CodeIcon,
  ShoppingCart,
  ArrowRight,
  Check,
  Zap,
  Shield,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// ─── Marquee ─────────────────────────────────────────────────────────────────
const saasTools = [
  "HubSpot",
  "Monday.com",
  "Notion",
  "Salesforce",
  "Intercom",
  "Zendesk",
  "Pipedrive",
  "Asana",
  "ClickUp",
  "Freshdesk",
  "Calendly",
  "Typeform",
  "Webflow",
  "Airtable",
  "Linear",
];

function Marquee() {
  const items = [...saasTools, ...saasTools];
  return (
    <div className="overflow-hidden w-full py-3 border-y border-[#1A1A1A]/[0.07] bg-[#F7F5F0]/60">
      <div className="marquee-track flex gap-8 whitespace-nowrap">
        {items.map((tool, i) => (
          <span
            key={i}
            className="flex items-center gap-8 text-sm text-[#1A1A1A]/35 font-medium shrink-0"
          >
            {tool}
            <span className="text-[#2D5BE3] text-lg leading-none">×</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Mock product cards ───────────────────────────────────────────────────────
const mockProducts = [
  {
    name: "OpenCRM",
    tagline: "A full HubSpot replacement, contacts, pipeline, emails.",
    price: 2400,
    sales: 14,
    stack: ["Next.js", "Supabase"],
    category: "CRM",
    accent: "#2D5BE3",
  },
  {
    name: "BoardFlow",
    tagline: "Kanban + sprints + timelines. Replace Monday for good.",
    price: 1800,
    sales: 9,
    stack: ["React", "PostgreSQL"],
    category: "Project Mgmt",
    accent: "#16A34A",
  },
  {
    name: "InvoicePro",
    tagline: "Invoicing, recurring billing, and client portal. Self-hosted.",
    price: 1200,
    sales: 22,
    stack: ["Vue", "Docker"],
    category: "Finance",
    accent: "#D97706",
  },
];

function FloatingProductCard({
  product,
  delay,
  className,
}: {
  product: (typeof mockProducts)[0];
  delay: number;
  className?: string;
}) {
  return (
    <div
      className={`float-card bg-white border border-[#1A1A1A]/[0.07] rounded-2xl p-5 shadow-lg w-64 shrink-0 ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-[#1A1A1A] text-sm">{product.name}</p>
          <p className="text-[#1A1A1A]/45 text-xs mt-0.5 leading-relaxed">
            {product.tagline}
          </p>
        </div>
        <span
          className="text-xs px-2 py-1 rounded-md shrink-0 ml-2 font-medium"
          style={{ background: `${product.accent}12`, color: product.accent }}
        >
          {product.category}
        </span>
      </div>
      <div className="flex gap-1.5 mb-3 flex-wrap">
        {product.stack.map((s) => (
          <span
            key={s}
            className="text-xs px-2 py-0.5 rounded-md bg-[#F7F5F0] text-[#1A1A1A]/40 border border-[#1A1A1A]/[0.07]"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-[#1A1A1A]/[0.05]">
        <div>
          <p className="text-[#1A1A1A] font-bold">
            ${product.price.toLocaleString()}
          </p>
          <p className="text-[#1A1A1A]/25 text-xs">one-time</p>
        </div>
        <p className="text-xs text-[#1A1A1A]/35">{product.sales} sales</p>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function WishlistPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

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
      if (data.success) setSubmitted(true);
    } catch (err) {
      console.error("Failed to subscribe:", err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Grid background */}
      <div
        className="pointer-events-none -z-10 fixed inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(#D4D0C8 1px, transparent 1px), linear-gradient(90deg, #D4D0C8 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient glows */}
      <div className="pointer-events-none fixed top-[-5%] right-[10%] w-[600px] h-[600px] rounded-full bg-[#2D5BE3] opacity-[0.06] blur-[120px]" />
      <div className="pointer-events-none fixed bottom-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-[#2D5BE3] opacity-[0.04] blur-[100px]" />

      {/* ── Nav ─────────────────────────────────────────────────── */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 md:px-16">
        <span className="font-medium text-2xl tracking-tight text-[#1A1A1A]">
          own<span className="text-[#2D5BE3]">ie</span>
        </span>
        <Link
          href="https://x.com/ownieapp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1A1A1A]/30 hover:text-[#1A1A1A] transition-colors duration-200"
          aria-label="Follow on X/Twitter"
        >
          <XIcon />
        </Link>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="relative z-10 flex flex-col items-center justify-center px-6 text-center pt-12 pb-6">
        <div
          className={`transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <AcceptingSellersBadge />
        </div>

        <h1
          className={`text-5xl md:text-7xl lg:text-[88px] font-bold leading-[0.93] tracking-tight mb-6 max-w-5xl text-[#1A1A1A] mt-6 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          Stop renting
          <br />
          <span className="italic text-[#2D5BE3]">your</span> software.
          <br />
          <span className="relative inline-block">
            Own it.
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 300 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 8 C80 2, 220 2, 296 8"
                stroke="#2D5BE3"
                strokeWidth="3"
                strokeLinecap="round"
                className="underline-draw"
              />
            </svg>
          </span>
        </h1>

        <p
          className={`text-[#1A1A1A]/50 text-lg md:text-xl max-w-xl mb-3 leading-relaxed font-light transition-all duration-700 delay-200 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          A curated marketplace of complete, self-hosted alternatives to
          expensive SaaS tools. Buy once. Own the code. Pay nothing monthly.
        </p>

        <p
          className={`text-[#1A1A1A]/40 text-sm mb-10 tracking-wide transition-all duration-700 delay-300 ${mounted ? "opacity-100" : "opacity-0"}`}
        >
          Replace <span className="text-[#1A1A1A]/70 font-medium">HubSpot</span>
          . Replace{" "}
          <span className="text-[#1A1A1A]/70 font-medium">Monday</span>. Replace{" "}
          <span className="text-[#1A1A1A]/70 font-medium">Notion</span>.{" "}
          Forever.
        </p>

        <div
          className={`transition-all w-full duration-700 delay-[400ms] ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <EmailForm
            submitted={submitted}
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            focused={focused}
            setFocused={setFocused}
            loading={loading}
          />
        </div>

        <p
          className={`text-xs text-[#1A1A1A]/25 mt-4 transition-all duration-700 delay-500 ${mounted ? "opacity-100" : "opacity-0"}`}
        >
          No spam. Just a launch notification. Unsubscribe anytime.
        </p>
      </section>

      {/* ── Marquee ─────────────────────────────────────────────── */}
      <div className="relative z-10 mt-12 mb-6">
        <p className="text-center text-xs text-[#1A1A1A]/25 uppercase tracking-widest mb-5">
          Replace any of these, forever
        </p>
        <Marquee />
      </div>

      {/* ── Stats ───────────────────────────────────────────────── */}
      {/* <section className="relative z-10 w-full max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: 847, suffix: "+", label: "People waiting" },
            { value: 12, suffix: "", label: "Sellers onboarding" },
            { value: 94, suffix: "%", label: "Would switch from SaaS" },
            { value: 6, suffix: "k+", label: "Avg. annual SaaS spend saved" },
          ].map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 bg-white/60 border border-[#1A1A1A]/[0.07] rounded-2xl backdrop-blur-sm"
            >
              <p
                className="text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-1"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs text-[#1A1A1A]/40 leading-relaxed">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section> */}

      {/* ── Floating product previews ────────────────────────────── */}
      <section className="relative z-10 w-full max-w-6xl mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/30 mb-3">
            Coming to the marketplace
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-[#1A1A1A]"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            Real products.{" "}
            <span className="italic text-[#2D5BE3]">Real ownership.</span>
          </h2>
          <p className="text-[#1A1A1A]/45 mt-4 max-w-lg mx-auto leading-relaxed">
            Every product on Ownie is a complete, production-ready system, not a
            template, not a boilerplate. Source code, docs, and setup included.
          </p>
        </div>

        {/* Cards row */}
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory md:justify-center">
          {mockProducts.map((product, i) => (
            <FloatingProductCard
              key={product.name}
              product={product}
              delay={i * 0.15}
              className="snap-start"
            />
          ))}
          {/* Teaser card */}
          <div
            className="float-card bg-[#F7F5F0] border border-dashed border-[#1A1A1A]/20 rounded-2xl p-5 w-64 shrink-0 flex flex-col items-center justify-center text-center snap-start"
            style={{ animationDelay: "0.45s" }}
          >
            <div className="w-10 h-10 rounded-full bg-white border border-[#1A1A1A]/[0.07] flex items-center justify-center mb-3">
              <ArrowRight className="w-4 h-4 text-[#1A1A1A]/30" />
            </div>
            <p className="text-sm font-medium text-[#1A1A1A]/50">
              More at launch
            </p>
            <p className="text-xs text-[#1A1A1A]/30 mt-1">
              Finance · HR · Support · Analytics
            </p>
          </div>
        </div>

        {/* Included features list */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: Shield,
              title: "Full code ownership",
              desc: "You get every line of source code. Host it yourself. Fork it. Build on top of it.",
            },
            {
              icon: RefreshCw,
              title: "Updates from the builder",
              desc: "Sellers commit to delivering bug fixes and updates included in your one-time price.",
            },
            {
              icon: Zap,
              title: "Setup assistance",
              desc: "Most sellers offer guided deployment on Vercel, Supabase, Docker, or your own VPS.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex gap-4 p-5 bg-white/60 border border-[#1A1A1A]/[0.07] rounded-2xl"
            >
              <div className="w-9 h-9 rounded-xl bg-[#2D5BE3]/8 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[#2D5BE3]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1A1A1A]">{title}</p>
                <p className="text-xs text-[#1A1A1A]/45 mt-1 leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────── */}
      <section className="relative z-10 w-full max-w-6xl py-20 mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/30 mb-3">
            The model
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-[#1A1A1A]"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            How Ownie works
          </h2>
          <p className="text-[#1A1A1A]/40 mt-4 max-w-sm mx-auto">
            The next-gen marketplace, connecting builders with buyers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* For Buyers */}
          <div className="space-y-8 p-8 bg-white rounded-2xl border border-[#1A1A1A]/[0.07] shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#2D5BE3]/10 flex items-center justify-center">
                <ShoppingCart className="text-[#2D5BE3] w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold">For Buyers</h3>
                <p className="text-xs text-[#1A1A1A]/35">
                  SMBs & teams 10–500 people
                </p>
              </div>
            </div>

            <ul className="space-y-6">
              {[
                {
                  n: "01",
                  title: "Discover Alternatives",
                  body: "Browse curated replacements for HubSpot, Monday, and Notion. Filter by category, stack, and hosting method.",
                },
                {
                  n: "02",
                  title: "Pick Your Stack",
                  body: "Choose software built for your infrastructure - Docker, Vercel, Supabase. Setup help is usually included.",
                },
                {
                  n: "03",
                  title: "Buy Once. Done.",
                  body: "Pay once, get full source code, and gain lifetime control over your data. No subscriptions. No lock-in.",
                },
              ].map((item) => (
                <li key={item.n} className="flex gap-4">
                  <span className="text-[#2D5BE3] font-mono font-bold shrink-0">
                    {item.n}.
                  </span>
                  <p className="text-sm text-[#1A1A1A]/60 leading-relaxed">
                    <strong className="text-[#1A1A1A] block">
                      {item.title}
                    </strong>
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>

            <div className="bg-[#F7F5F0] rounded-xl p-4 mt-2">
              <p className="text-xs text-[#1A1A1A]/50 leading-relaxed">
                <strong className="text-[#1A1A1A]">Example:</strong> A team
                paying $300/mo for HubSpot ($3,600/yr) can buy an equivalent CRM
                on Ownie for $2,000 once, and own it forever.
              </p>
            </div>
          </div>

          {/* For Sellers */}
          <div className="space-y-8 p-8 bg-[#1A1A1A] text-white rounded-2xl shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                <CodeIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">For Sellers</h3>
                <p className="text-xs text-white/35">
                  Indie devs & small teams
                </p>
              </div>
            </div>

            <ul className="space-y-6">
              {[
                {
                  n: "01",
                  title: "Professional Onboarding",
                  body: "Register as an individual or a team. Build trust through our verified, curated listing process.",
                },
                {
                  n: "02",
                  title: "Ship Complete Products",
                  body: "Set your own price, add documentation, and offer setup help. We handle payments via Stripe Connect.",
                },
                {
                  n: "03",
                  title: "Brand Ownership",
                  body: "Your product page is your portfolio. Reach buyers actively looking to ditch subscriptions.",
                },
              ].map((item) => (
                <li key={item.n} className="flex gap-4">
                  <span className="text-[#2D5BE3] font-mono font-bold shrink-0">
                    {item.n}.
                  </span>
                  <p className="text-sm text-white/60 leading-relaxed">
                    <strong className="text-white block">{item.title}</strong>
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>

            <div className="bg-white/[0.06] rounded-xl p-4 mt-2">
              <p className="text-xs text-white/50 leading-relaxed">
                <strong className="text-white">Revenue example:</strong> 10
                sales/month at $2,500 avg = $25,000/mo in gross revenue. Ownie
                takes 15–20%.
              </p>
              <div className="grid grid-cols-3 gap-3 mt-3">
                {["$25k", "$50k", "$100k+"].map((v, i) => (
                  <div
                    key={i}
                    className="text-center p-2 bg-white/[0.06] rounded-lg"
                  >
                    <p className="text-white font-semibold text-sm">{v}</p>
                    <p className="text-white/30 text-xs">
                      {[10, 20, 40][i]} sales/mo
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why not just subscribe ─────────────────────────────── */}
      <section className="relative z-10 w-full max-w-4xl mx-auto px-6 py-8 mb-8">
        <div className="bg-white border border-[#1A1A1A]/[0.07] rounded-3xl p-8 md:p-12 shadow-sm">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/30 mb-3">
                The math
              </p>
              <h3
                className="text-3xl md:text-4xl font-bold text-[#1A1A1A] leading-tight"
                style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
              >
                SaaS costs you
                <br />
                <span className="italic text-[#2D5BE3]">more every year.</span>
              </h3>
              <p className="text-[#1A1A1A]/50 mt-4 leading-relaxed text-sm">
                The average SMB spends $500-$2,000/month on software
                subscriptions. That&apos;s up to $24,000 a year, and the price
                only goes up.
              </p>
              <p className="text-[#1A1A1A]/50 mt-3 leading-relaxed text-sm">
                Ownie flips the model. Pay once. Own it. The tool doesn&apos;t
                disappear because a startup pivots or raises prices.
              </p>
            </div>
            <div className="space-y-3">
              {[
                {
                  saas: "HubSpot CRM",
                  saasPrice: "$3,600/yr",
                  ownie: "~$2,000 once",
                  saving: "Breakeven: 7 months",
                },
                {
                  saas: "Monday.com",
                  saasPrice: "$1,560/yr",
                  ownie: "~$1,200 once",
                  saving: "Breakeven: 9 months",
                },
                {
                  saas: "Notion (team)",
                  saasPrice: "$960/yr",
                  ownie: "~$800 once",
                  saving: "Breakeven: 10 months",
                },
              ].map((row) => (
                <div
                  key={row.saas}
                  className="flex items-center justify-between p-4 bg-[#F7F5F0] rounded-xl border border-[#1A1A1A]/[0.07]"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A]">
                      {row.saas}
                    </p>
                    <p className="text-xs text-[#1A1A1A]/35 line-through">
                      {row.saasPrice}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#2D5BE3]">
                      {row.ownie}
                    </p>
                    <p className="text-xs text-[#1A1A1A]/40">{row.saving}</p>
                  </div>
                </div>
              ))}
              <p className="text-xs text-[#1A1A1A]/25 px-1">
                *Illustrative estimates. Actual prices vary by seller and team
                size.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Second CTA ──────────────────────────────────────────── */}
      <section className="relative z-10 w-full max-w-3xl mx-auto px-6 py-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/30 mb-4">
          Launching soon
        </p>
        <h2
          className="text-4xl md:text-6xl font-bold text-[#1A1A1A] leading-tight mb-6"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          Get early access
          <br />
          <span className="italic text-[#2D5BE3]">before we open.</span>
        </h2>
        <p className="text-[#1A1A1A]/45 mb-10 max-w-md mx-auto">
          Be the first to know when Ownie launches.
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

        <div className="flex items-center justify-center gap-6 mt-8">
          {["No credit card required", "Zero spam", "Unsubscribe anytime"].map(
            (item) => (
              <span
                key={item}
                className="flex items-center gap-1.5 text-xs text-[#1A1A1A]/35"
              >
                <Check className="w-3 h-3 text-[#2D5BE3]" />
                {item}
              </span>
            ),
          )}
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-[#1A1A1A]/[0.07] px-8 py-6 md:px-16 flex items-center justify-between bg-[#F7F5F0] mt-auto">
        <span className="text-[#1A1A1A]/25 text-xs">© 2026 Ownie</span>
        <Link
          href="https://x.com/ownieapp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1A1A1A]/25 hover:text-[#1A1A1A]/60 transition-colors text-xs flex items-center gap-1.5"
        >
          <XIcon size={12} />
          @Ownie
        </Link>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

        /* Marquee */
        .marquee-track {
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        /* Floating cards */
        .float-card {
          animation: floatUp 0.6s ease both;
        }
        @keyframes floatUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* SVG underline draw */
        .underline-draw {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: drawLine 0.8s ease 0.8s forwards;
        }
        @keyframes drawLine {
          to { stroke-dashoffset: 0; }
        }

        /* Hide scrollbar for product cards row */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
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

"use client";

import { useState } from "react";
import Link from "next/link";
import { Product } from "@/lib/types/product";
import ContactSellerModal from "@/app/components/ContactSellerModal";
import ScreenshotSection from "@/app/components/ScreenshotSection";
import DemoVideoSection from "@/app/components/DemoVideoSection";

interface ProductDetailPageClientProps {
  product: Product;
  conversationId: string | null;
  userId: string | null;
}

function formatPrice(price: number) {
  return `$${price.toLocaleString()}`;
}

export default function ProductDetailPageClient({
  product,
  conversationId,
  userId,
}: ProductDetailPageClientProps) {
  const [contactOpen, setContactOpen] = useState(false);
  const [tab, setTab] = useState<"overview" | "technical">("overview");
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  const isMe = product.seller.id === userId;
  const hasVideo = product.demoUrl;
  const hasScreenshots = product.screenshots?.length > 0;

  return (
    <>
      <div className="max-w-6xl flex flex-col mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-[#1A1A1A]/35 mb-8 font-medium">
          <Link href="/" className="hover:text-[#2D5BE3] transition-colors">
            Marketplace
          </Link>
          <span>/</span>
          {product.category[0] && (
            <>
              <Link
                href={`/products?category=${product.category[0].name}`}
                className="hover:text-[#2D5BE3] transition-colors"
              >
                {product.category[0].name}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-[#1A1A1A]/55">{product.name}</span>
        </nav>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10">
          {/* ── Left column ── */}
          <div>
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-1.5 mb-4">
                {product.category.map((cat) => (
                  <span
                    key={cat.id}
                    className="text-xs bg-[#F7F5F0] border border-[#1A1A1A]/[0.07] text-[#1A1A1A]/40 px-2.5 py-1 rounded-md"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
              <h1
                className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1A1A1A] mb-3"
                /* style={{ fontFamily: "'Instrument Serif', Georgia, serif" }} */
              >
                {product.name}
              </h1>
              <p className="text-[#1A1A1A]/50 text-lg leading-relaxed max-w-2xl">
                {product.tagline}
              </p>

              <div className="flex items-center gap-2 mt-5 text-sm text-[#1A1A1A]/35">
                <span>
                  <span className="text-[#1A1A1A]/70 font-semibold">
                    {product.sales}
                  </span>{" "}
                  sales
                </span>
                <span>·</span>
                <span>
                  by{" "}
                  <span className="text-[#1A1A1A]/70">
                    @{product.seller.name}
                  </span>
                </span>
              </div>
            </div>

            {hasScreenshots && (
              <ScreenshotSection
                screenshots={product.screenshots}
                activeScreenshot={activeScreenshot}
                setActiveScreenshot={setActiveScreenshot}
              />
            )}

            {/* Tabs */}
            <div className="border-b border-[#1A1A1A]/[0.07] my-6 flex gap-6">
              {(["overview", "technical"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`pb-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px ${
                    tab === t
                      ? "border-[#2D5BE3] text-[#2D5BE3]"
                      : "border-transparent text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70"
                  }`}
                >
                  {t === "overview" ? "Overview" : "Technical info"}
                </button>
              ))}
            </div>

            {tab === "overview" && (
              <div className="space-y-4">
                {product.description.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="text-[#1A1A1A]/60 text-sm leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            )}

            {tab === "technical" && (
              <div className="space-y-6">
                {product.stack.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/30 mb-3">
                      Tech stack
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {product.stack.map((s) => (
                        <span
                          key={s.id}
                          className="text-xs px-2.5 py-1 rounded-md bg-[#F7F5F0] text-[#1A1A1A]/50 border border-[#1A1A1A]/[0.07]"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {product.hosting.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/30 mb-3">
                      Hosting options
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {product.hosting.map((h) => (
                        <span
                          key={h.id}
                          className="text-xs px-2.5 py-1 rounded-md bg-[#F7F5F0] text-[#1A1A1A]/50 border border-[#1A1A1A]/[0.07]"
                        >
                          {h.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="border-t border-[#1A1A1A]/[0.05] mt-12" />

            {hasVideo && product.demoUrl && (
              <DemoVideoSection demoUrl={product.demoUrl} />
            )}

            {/* What's included */}
            <div className="mt-12">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/30 mb-4">
                What&apos;s included
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(
                  [
                    {
                      label: "Full source code",
                      desc: "You own the code outright after purchase.",
                    },
                    product.setupIncluded
                      ? {
                          label: "Setup assistance",
                          desc: "The seller helps you deploy and go live.",
                        }
                      : null,
                    product.updatesIncluded
                      ? {
                          label: "Updates included",
                          desc: "All future updates and bug fixes, forever.",
                        }
                      : null,
                    {
                      label: "Documentation",
                      desc: "Full technical docs and a getting-started guide.",
                    },
                    {
                      label: "No subscription, ever",
                      desc: "Pay once. No lock-in, no price hikes.",
                    },
                  ] as ({ label: string; desc: string } | null)[]
                )
                  .filter(
                    (item): item is { label: string; desc: string } =>
                      item !== null,
                  )
                  .map((item) => (
                    <div
                      key={item.label}
                      className="flex gap-3 p-4 rounded-xl border border-[#1A1A1A]/[0.07] bg-white hover:border-[#2D5BE3]/20 hover:shadow-sm transition-all duration-200"
                    >
                      <span className="text-[#2D5BE3] font-bold text-sm mt-0.5 shrink-0">
                        →
                      </span>
                      <div>
                        <p className="text-[#1A1A1A] font-semibold text-sm">
                          {item.label}
                        </p>
                        <p className="text-[#1A1A1A]/40 text-xs mt-0.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="border-t border-[#1A1A1A]/[0.05] my-8" />

            {/* Seller */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/30 mb-4">
                Seller
              </p>
              <div className="flex items-center justify-between p-5 rounded-xl border border-[#1A1A1A]/[0.07] bg-white shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white font-semibold text-sm shrink-0">
                    {product.seller.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A1A1A] text-sm">
                      @{product.seller.name}
                    </p>
                    <p className="text-[#1A1A1A]/35 text-xs">
                      {product.sales} sales
                    </p>
                  </div>
                </div>
                {!isMe &&
                  (conversationId ? (
                    <Link
                      href={`/conversations/${conversationId}`}
                      className="text-xs font-medium text-[#2D5BE3] hover:underline transition-colors"
                    >
                      Go to chat →
                    </Link>
                  ) : (
                    <button
                      disabled={isMe}
                      onClick={() => setContactOpen(true)}
                      className="text-xs font-medium text-[#2D5BE3] hover:underline transition-colors"
                    >
                      Contact →
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* ── Right sidebar ── */}
          <aside>
            <div
              className="border border-[#1A1A1A]/[0.07] rounded-xl bg-white shadow-sm p-6 space-y-5"
              style={{ position: "sticky", top: "2rem" }}
            >
              {isMe && (
                <div className="px-2.5 mb-4 w-full text-center py-3 rounded-md bg-orange-200/50 border border-orange-300">
                  <p className="text-sm text-orange-500">
                    This is a preview of your product
                  </p>
                </div>
              )}
              {/* Price */}
              <div>
                <p
                  className="text-3xl font-bold text-[#1A1A1A]"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  {formatPrice(product.price)}
                </p>
                <p className="text-[#1A1A1A]/35 text-sm mt-0.5">
                  one-time payment
                </p>
              </div>

              {/* Feature badges */}
              <div className="flex flex-wrap gap-1.5">
                {product.updatesIncluded && (
                  <span className="text-xs px-2.5 py-1 rounded-md bg-[#2D5BE3]/8 text-[#2D5BE3] border border-[#2D5BE3]/15">
                    Updates included
                  </span>
                )}
                {product.setupIncluded && (
                  <span className="text-xs px-2.5 py-1 rounded-md bg-[#2D5BE3]/8 text-[#2D5BE3] border border-[#2D5BE3]/15">
                    Setup included
                  </span>
                )}
                <span className="text-xs px-2.5 py-1 rounded-md bg-[#F7F5F0] text-[#1A1A1A]/40 border border-[#1A1A1A]/[0.07]">
                  You own the code
                </span>
              </div>

              <div className="border-t border-[#1A1A1A]/[0.05]" />

              {/* CTAs */}
              {!isMe && (
                <div className="space-y-2.5">
                  <button
                    disabled={isMe}
                    className="w-full py-3 rounded-full bg-[#1A1A1A] text-white font-medium text-sm hover:bg-[#2D5BE3] transition-colors duration-200"
                  >
                    Buy now - {formatPrice(product.price)}
                  </button>
                  {conversationId ? (
                    <Link
                      href={`/conversations/${conversationId}`}
                      className="w-full py-3 rounded-full border border-[#1A1A1A]/[0.12] text-[#1A1A1A] font-medium text-sm hover:border-[#2D5BE3]/40 hover:text-[#2D5BE3] transition-all duration-200 text-center block"
                    >
                      Go to chat
                    </Link>
                  ) : (
                    <button
                      disabled={isMe}
                      onClick={() => setContactOpen(true)}
                      className="w-full py-3 rounded-full border border-[#1A1A1A]/[0.12] text-[#1A1A1A] font-medium text-sm hover:border-[#2D5BE3]/40 hover:text-[#2D5BE3] transition-all duration-200"
                    >
                      Contact seller
                    </button>
                  )}
                </div>
              )}

              <p className="text-[#1A1A1A]/25 text-xs text-center leading-relaxed">
                Secure payment via Stripe.
                <br />
                Code delivered instantly after purchase.
              </p>

              {/* Stack + hosting in sidebar */}
              {product.stack.length > 0 && (
                <>
                  <div className="border-t border-[#1A1A1A]/[0.05]" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/25 mb-2">
                      Stack
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {product.stack.map((s) => (
                        <span
                          key={s.id}
                          className="text-xs px-2 py-0.5 rounded-md bg-[#F7F5F0] text-[#1A1A1A]/40 border border-[#1A1A1A]/[0.07]"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {product.hosting.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/25 mb-2">
                    Hosting
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {product.hosting.map((h) => (
                      <span
                        key={h.id}
                        className="text-xs px-2 py-0.5 rounded-md bg-[#F7F5F0] text-[#1A1A1A]/40 border border-[#1A1A1A]/[0.07]"
                      >
                        {h.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {/* TODO {isMe && (
                <button className="w-full p-1">
                  <p className="text-blue-400 hover:text-blue-600 text-sm transition-colors duration-200">
                    Edit page
                  </p>
                </button>
              )} */}
            </div>
          </aside>
        </div>
      </div>

      {contactOpen && (
        <ContactSellerModal
          onClose={() => setContactOpen(false)}
          sellerName={product.seller.name}
          sellerId={product.seller.id}
          productName={product.name}
          productId={product.id}
          userId={userId}
        />
      )}
    </>
  );
}

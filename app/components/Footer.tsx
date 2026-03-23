import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#1A1A1A]/[0.07] bg-[#F7F5F0]/80 backdrop-blur-sm px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <p className="text-sm font-semibold text-[#1A1A1A] mb-2">Ownie</p>
            <p className="text-xs text-[#1A1A1A]/40 leading-relaxed max-w-[180px]">
              Buy and sell complete software products. No subscriptions, ever.
            </p>
          </div>

          {/* Marketplace */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/30 mb-3">
              Marketplace
            </p>
            <div className="flex flex-col gap-2">
              {[
                { label: "Browse products", href: "/" },
                { label: "New arrivals", href: "/products/?sort=new" },
                { label: "List a product", href: "/products/new" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-xs text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/30 mb-3">
              Company
            </p>
            <div className="flex flex-col gap-2">
              {[
                { label: "FAQ", href: "/faq" },
                { label: "Terms of service", href: "/terms" },
                { label: "Privacy policy", href: "/privacy-policy" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-xs text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/30 mb-3">
              Connect
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="https://x.com/ownieapp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70 transition-colors flex items-center gap-1.5"
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                @ownieapp
              </Link>
              <Link
                href="mailto:hello@ownie.app"
                className="text-xs text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70 transition-colors"
              >
                hello@ownie.app
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#1A1A1A]/[0.05] pt-6 flex items-center justify-between">
          <span className="text-xs text-[#1A1A1A]/25">© 2026 Ownie</span>
          <button
            id="revoke-consent-btn"
            className="text-xs text-[#1A1A1A]/25 hover:text-[#1A1A1A]/50 transition-colors"
          >
            Cookie settings
          </button>
        </div>
      </div>
    </footer>
  );
}

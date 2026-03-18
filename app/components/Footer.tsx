import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[#1A1A1A]/[0.07] bg-[#F7F5F0]/80 backdrop-blur-sm px-6 py-8">
      <div className="max-w-6xl mx-auto flex items-start justify-between">
        <span className="text-[#1A1A1A]/25 text-xs">© 2026 Ownie</span>
        <div className="flex flex-col gap-1">
          <Link
            href="https://x.com/ownieapp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1A1A1A]/25 hover:text-[#1A1A1A]/60 transition-colors text-xs flex items-center gap-1.5"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            @ownieapp
          </Link>
          <button
            id="revoke-consent-btn"
            className="text-[#1A1A1A]/25 hover:text-[#1A1A1A]/60 transition-colors text-xs flex items-center gap-1.5"
          >
            Cookie Settings
          </button>
        </div>
      </div>
    </footer>
  );
}

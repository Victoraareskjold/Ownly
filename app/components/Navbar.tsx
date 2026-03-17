"use client";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import AddProductModal from "./AddProductModal";
import { useState } from "react";

export default function Navbar({ user }: { user: User | null }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <nav className="relative z-10 border-b border-[#1A1A1A]/[0.07] bg-[#F7F5F0]/80 backdrop-blur-sm sticky top-0">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-black text-2xl tracking-tight"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            own<span className="text-[#2D5BE3]">ie</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link
              href={user ? "/dashboard" : "/auth"}
              className="text-[#1A1A1A]/50 hover:text-[#1A1A1A] text-sm transition-colors"
            >
              {user ? "Dashboard" : "Sign in"}
            </Link>
            {user && (
              <>
                <Link
                  href="/conversations"
                  className="text-[#1A1A1A]/50 hover:text-[#1A1A1A] text-sm transition-colors"
                >
                  Messages
                </Link>
                <Link
                  href="/profile"
                  className="text-[#1A1A1A]/50 hover:text-[#1A1A1A] text-sm transition-colors"
                >
                  Profile
                </Link>
              </>
            )}
            <Link
              href={
                user
                  ? "/dashboard/products/new"
                  : "/auth?next=/dashboard/products/new"
              }
              className="px-4 py-2 bg-[#1A1A1A] text-white text-sm font-medium rounded-lg hover:bg-[#2D5BE3] transition-colors duration-200"
            >
              List product
            </Link>
          </div>
        </div>
      </nav>
      <AddProductModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

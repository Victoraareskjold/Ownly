"use client";

import { createClient } from "@/lib/supabase/client";
import { Profile } from "@/lib/types/profile";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

type ProfilePageClientProps = {
  profile: Profile | null;
};

export default function ProfilePageClient({ profile }: ProfilePageClientProps) {
  const supabase = createClient();
  const searchParams = useSearchParams();
  const [stripeLoading, setStripeLoading] = useState(false);

  useEffect(() => {
    const stripe = searchParams.get("stripe");
    if (stripe === "success") toast.success("Stripe account connected!");
    if (stripe === "refresh") toast.info("Please complete your Stripe setup.");
  }, [searchParams]);

  const handleSignOut = async (e: FormEvent) => {
    e.preventDefault();
    const confirmed = window.confirm("Are you sure you want to sign out?");
    if (!confirmed) return;
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Failed to sign out");
      return;
    }
    window.location.reload();
  };

  const handleStripeConnect = async () => {
    setStripeLoading(true);
    try {
      const res = await fetch("/api/stripe/connect", { method: "POST" });
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      window.location.href = url;
    } catch {
      toast.error("Failed to connect Stripe. Try again.");
      setStripeLoading(false);
    }
  };

  const labelClass =
    "block text-xs font-semibold uppercase tracking-widest text-[#1A1A1A]/30 mb-1";

  const rows = [
    { label: "Role", value: profile?.role },
    ...(profile?.role !== "buyer"
      ? [
          {
            label: "Seller approved",
            value: profile?.sellerApproved ? "✓ Approved" : "Not approved",
            highlight: profile?.sellerApproved,
          },
        ]
      : []),
    {
      label: "Member since",
      value: profile?.createdAt
        ? new Date(profile.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "—",
    },
  ];

  return (
    <div className="max-w-3xl flex flex-col mx-auto px-6 py-12 gap-8">
      <div>
        <h1 className="text-2xl font-medium tracking-tight text-[#1A1A1A]">
          Profile
        </h1>
        <p className="text-[#1A1A1A]/50 text-md leading-relaxed">
          Your account details and preferences.
        </p>
      </div>
      {/* Identity card */}
      <div className="rounded-xl border border-[#1A1A1A]/[0.07] bg-white shadow-sm p-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#2D5BE3]/10 flex items-center justify-center shrink-0">
            <span className="text-[#2D5BE3] font-semibold text-lg">
              {profile?.name?.[0]?.toUpperCase() ?? "?"}
            </span>
          </div>
          <div>
            <p className="text-lg font-semibold text-[#1A1A1A] leading-tight">
              {profile?.name ?? "—"}
            </p>
            <p className="text-sm text-[#1A1A1A]/40">{profile?.email ?? "—"}</p>
          </div>
        </div>

        <div className="border-t border-[#1A1A1A]/[0.05] pt-6 grid grid-cols-2 gap-6">
          {rows.map((row) => (
            <div key={row.label}>
              <p className={labelClass}>{row.label}</p>
              <p
                className={`text-sm font-medium capitalize ${row.highlight ? "text-[#2D5BE3]" : "text-[#1A1A1A]/70"}`}
              >
                {row.value ?? "—"}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Stripe — kun for sellers */}
      {profile?.role === "seller" && (
        <div className="rounded-xl border border-[#1A1A1A]/[0.07] bg-white shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[#1A1A1A]">
                Stripe payments
              </p>
              <p className="text-xs text-[#1A1A1A]/40 mt-0.5">
                {profile.stripeAccountId
                  ? `Connected · ${profile.stripeAccountId}`
                  : "Connect Stripe to receive payouts when you make a sale."}
              </p>
              {!profile.stripeAccountId && (
                <p className="text-xs text-[#1A1A1A]/40 mt-0.5">
                  Stripe requires identity verification. Setup typically takes
                  2-5 minutes.
                </p>
              )}
            </div>
            {profile.stripeAccountId ? (
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 font-medium">
                Connected
              </span>
            ) : (
              <button
                onClick={handleStripeConnect}
                disabled={stripeLoading}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1A] text-white text-xs font-medium hover:bg-[#2D5BE3] transition-colors disabled:opacity-50"
              >
                {stripeLoading && <Loader2 className="w-3 h-3 animate-spin" />}
                {stripeLoading ? "Redirecting..." : "Connect Stripe →"}
              </button>
            )}
          </div>
        </div>
      )}
      <div className="flex gap-3">
        <button
          onClick={handleSignOut}
          className="px-6 py-3 rounded-full bg-[#1A1A1A] text-white font-medium text-sm hover:bg-red-500 transition-colors duration-200"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}
